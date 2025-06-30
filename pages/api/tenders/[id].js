// pages/api/tenders/[id].js
// API endpoint for fetching a specific tender by ID from Supabase database

import { createClient } from '@supabase/supabase-js';
import { tenderOperations, fileOperations } from '../../../lib/database';
import Badge from "../ui/badge";

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    // Validate environment variables - check both client and server-side variables
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[Tender Details API] Missing Supabase environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Get tender by ID
    const tender = await tenderOperations.getById(supabase, id);
    
    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }

    // Fetch documents explicitly for this tender
    // We don't need to specify a user ID for tender documents as they're public
    const fetchedDocuments = await fileOperations.getFilesByLinkedEntity(supabase, null, 'tender_doc', tender.id);

    // Generate signed URLs for files if they exist
    const documents = [];
    if (fetchedDocuments && fetchedDocuments.length > 0) {
      for (const file of fetchedDocuments) {
        try {
          const { data } = await supabase.storage
            .from('documents')
            .createSignedUrl(file.file_path, 3600); // 1 hour expiry
          
          documents.push({
            id: file.id,
            name: file.file_name,
            size: file.file_size,
            type: file.mime_type,
            path: file.file_path,
            signedUrl: data?.signedUrl
          });
        } catch (urlError) {
          console.error('Error generating signed URL:', urlError);
          // Add file without signed URL
          documents.push({
            id: file.id,
            name: file.file_name,
            size: file.file_size,
            type: file.mime_type,
            path: file.file_path
          });
        }
      }
    }

    // Transform data to match frontend expectations (snake_case to camelCase)
    const transformedTender = {
      id: tender.id,
      title: tender.title,
      description: tender.description,
      agency: tender.agency,
      category: tender.category,
      location: tender.location,
      budget: tender.budget,
      closingDate: tender.closing_date,
      publishedDate: tender.published_date,
      tenderId: tender.tender_id,
      requirements: tender.requirements,
      documents: documents,
      contactInfo: tender.contact_info,
      status: tender.status,
      tags: tender.tags,
      isNew: tender.is_featured || false,
      createdAt: tender.created_at,
      updatedAt: tender.updated_at
    };

    res.status(200).json(transformedTender);
  } catch (error) {
    console.error('Error fetching tender:', error);
    if (error.code === 'PGRST116') {
      res.status(404).json({ error: 'Tender not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch tender' });
    }
  }
}