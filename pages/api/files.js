// pages/api/files.js
// API endpoint for file uploads and management with Supabase Storage

import { createClient } from '@supabase/supabase-js';
import { fileOperations } from '../../lib/database';
import busboy from 'busboy';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser for file uploads
  },
};

export default async function handler(req, res) {
  console.log(`[Files API] ${req.method} request received`);

  try {
    // Get the authorization token from the request headers
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      console.error('[Files API] No authorization token provided');
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[Files API] Missing Supabase environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Verify the JWT token and get user information
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('[Files API] Authentication error:', authError);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    console.log(`[Files API] User authenticated: ${user.id}`);

    // Handle file upload (POST)
    if (req.method === 'POST') {
      console.log('[Files API] Processing file upload');
      
      const bb = busboy({ headers: req.headers });
      
      let fileBuffer;
      let fileName;
      let mimeType;
      let fileSize;
      let linkedEntity = 'general_document';
      let linkedId = null;

      // Process file upload
      bb.on('file', (fieldname, file, info) => {
        console.log(`[Files API] Processing file: ${info.filename}`);
        fileName = info.filename;
        mimeType = info.mimeType;
        fileSize = 0;
        const chunks = [];
        
        file.on('data', (chunk) => {
          chunks.push(chunk);
          fileSize += chunk.length;
        });
        
        file.on('end', () => {
          fileBuffer = Buffer.concat(chunks);
          console.log(`[Files API] File processed: ${fileName}, size: ${fileSize} bytes`);
        });
      });

      // Process form fields
      bb.on('field', (fieldname, val) => {
        console.log(`[Files API] Field: ${fieldname}, value: ${val}`);
        if (fieldname === 'linkedEntity') {
          linkedEntity = val;
        } else if (fieldname === 'linkedId') {
          linkedId = val;
        }
      });

      // Handle completion
      bb.on('close', async () => {
        if (!fileBuffer) {
          console.error('[Files API] No file uploaded');
          return res.status(400).json({ error: 'No file uploaded' });
        }

        try {
          // Generate unique file name to prevent collisions
          const fileExtension = fileName.split('.').pop().toLowerCase();
          const uniqueId = uuidv4();
          const uniqueFileName = `${uniqueId}-${fileName}`;
          
          // Create path: documents/<USER_ID>/<UNIQUE_ID>-<originalFileName>
          const filePath = `${user.id}/${uniqueFileName}`;
          
          console.log(`[Files API] Uploading to Supabase Storage: ${filePath}`);
          
          // Upload file to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, fileBuffer, {
              contentType: mimeType,
              upsert: false,
            });

          if (uploadError) {
            console.error('[Files API] Supabase Storage upload error:', uploadError);
            return res.status(500).json({ 
              error: 'Failed to upload file to storage', 
              details: uploadError.message 
            });
          }

          console.log(`[Files API] File uploaded successfully to Storage`);
          
          // Generate signed URL for the file (valid for 1 hour)
          const { data: urlData } = await supabase.storage
            .from('documents')
            .createSignedUrl(filePath, 3600);
          
          const signedUrl = urlData?.signedUrl;
          
          if (!signedUrl) {
            console.error('[Files API] Failed to generate signed URL');
            return res.status(500).json({ error: 'Failed to generate file URL' });
          }

          // Insert file metadata into database
          const fileMetadata = {
            filePath: filePath,
            fileName: fileName,
            fileSize: fileSize,
            mimeType: mimeType,
            linkedEntity: linkedEntity,
            linkedId: linkedId
          };

          console.log(`[Files API] Inserting file metadata into database`);
          
          const fileRecord = await fileOperations.insertFileMetadata(
            supabase, 
            user.id, 
            fileMetadata
          );

          console.log(`[Files API] File metadata inserted successfully, ID: ${fileRecord.id}`);
          
          // Return success response with file details
          return res.status(200).json({
            success: true,
            file: {
              id: fileRecord.id,
              name: fileRecord.file_name,
              size: fileRecord.file_size,
              type: fileRecord.mime_type,
              filePath: fileRecord.file_path,
              signedUrl: signedUrl,
              uploadedAt: fileRecord.created_at
            }
          });
        } catch (error) {
          console.error('[Files API] Error processing upload:', error);
          return res.status(500).json({ 
            error: 'Failed to process file upload', 
            details: error.message 
          });
        }
      });

      // Pipe request to busboy for processing
      req.pipe(bb);
      return;
    }
    
    // Handle file deletion (DELETE)
    else if (req.method === 'DELETE') {
      console.log('[Files API] Processing file deletion');
      
      const { filePath } = req.query;
      
      if (!filePath) {
        console.error('[Files API] No file path provided for deletion');
        return res.status(400).json({ error: 'File path is required' });
      }

      try {
        console.log(`[Files API] Deleting file from Storage: ${filePath}`);
        
        // Delete file from Supabase Storage
        const { error: storageError } = await supabase.storage
          .from('documents')
          .remove([filePath]);

        if (storageError) {
          console.error('[Files API] Supabase Storage delete error:', storageError);
          return res.status(500).json({ 
            error: 'Failed to delete file from storage', 
            details: storageError.message 
          });
        }

        console.log(`[Files API] File deleted from Storage, now deleting metadata`);
        
        // Delete file metadata from database
        await fileOperations.deleteFileMetadata(supabase, user.id, filePath);
        
        console.log(`[Files API] File metadata deleted successfully`);
        
        return res.status(200).json({ 
          success: true, 
          message: 'File deleted successfully' 
        });
      } catch (error) {
        console.error('[Files API] Error deleting file:', error);
        return res.status(500).json({ 
          error: 'Failed to delete file', 
          details: error.message 
        });
      }
    }
    
    // Get files for a linked entity (GET)
    else if (req.method === 'GET') {
      console.log('[Files API] Processing file retrieval request');
      
      const { linkedEntity, linkedId } = req.query;
      
      if (!linkedEntity || !linkedId) {
        console.error('[Files API] Missing linkedEntity or linkedId parameters');
        return res.status(400).json({ error: 'linkedEntity and linkedId are required' });
      }

      try {
        console.log(`[Files API] Fetching files for ${linkedEntity} with ID ${linkedId}`);
        
        // Get files from database
        const files = await fileOperations.getFilesByLinkedEntity(
          supabase, 
          user.id, 
          linkedEntity, 
          linkedId
        );
        
        console.log(`[Files API] Found ${files.length} files`);
        
        // Generate signed URLs for each file
        const filesWithUrls = await Promise.all(files.map(async (file) => {
          const { data } = await supabase.storage
            .from('documents')
            .createSignedUrl(file.file_path, 3600);
          
          return {
            id: file.id,
            name: file.file_name,
            size: file.file_size,
            type: file.mime_type,
            filePath: file.file_path,
            signedUrl: data?.signedUrl,
            uploadedAt: file.created_at
          };
        }));
        
        return res.status(200).json({ 
          success: true, 
          files: filesWithUrls 
        });
      } catch (error) {
        console.error('[Files API] Error retrieving files:', error);
        return res.status(500).json({ 
          error: 'Failed to retrieve files', 
          details: error.message 
        });
      }
    }
    
    // Method not allowed
    else {
      console.log(`[Files API] Method ${req.method} not allowed`);
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('[Files API] Unexpected error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
}