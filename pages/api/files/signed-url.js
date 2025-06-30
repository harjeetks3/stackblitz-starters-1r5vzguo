// pages/api/files/signed-url.js
// API endpoint for generating signed URLs for files in Supabase Storage

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filePath, expiresIn = 3600 } = req.query;

  if (!filePath) {
    return res.status(400).json({ error: 'filePath is required' });
  }

  try {
    // Get the authorization token from the request headers
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !serviceRoleKey) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Verify the JWT token and get user information
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Check if the file exists and belongs to the user
    const { data: fileData, error: fileError } = await supabase
      .from('files')
      .select('*')
      .eq('file_path', filePath)
      .single();

    if (fileError) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check if the user has access to this file
    // For tender documents, anyone can access them
    // For other file types, only the owner can access them
    if (fileData.linked_entity !== 'tender_doc' && fileData.user_id !== user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Generate signed URL
    const { data, error } = await supabase.storage
      .from('documents')
      .createSignedUrl(filePath, parseInt(expiresIn));

    if (error) {
      return res.status(500).json({ error: 'Failed to generate signed URL' });
    }

    res.status(200).json({
      signedUrl: data.signedUrl,
      expiresAt: new Date(Date.now() + parseInt(expiresIn) * 1000).toISOString()
    });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
}