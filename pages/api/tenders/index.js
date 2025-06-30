// pages/api/tenders/index.js
// API endpoint for listing all active tenders from Supabase database

import { createClient } from '@supabase/supabase-js';
import { tenderOperations, fileOperations } from '../../../lib/database';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate environment variables - check both client and server-side variables
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[Tenders API] Missing Supabase environment variables');
      console.error('[Tenders API] SUPABASE_URL:', !!supabaseUrl);
      console.error('[Tenders API] SUPABASE_SERVICE_ROLE_KEY:', !!serviceRoleKey);
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Get all active tenders
    const tenders = await tenderOperations.getAll(supabase);
    
    // Get the user ID from the auth token or use a default admin user ID
    // This is a temporary solution until we implement proper file access control
    const userId = process.env.SUPABASE_ADMIN_USER_ID || '00000000-0000-0000-0000-000000000000';
    
    // Process tenders and fetch associated files
    const processedTenders = await Promise.all(tenders.map(async (tender) => {
      // Fetch documents for each tender
      const documents = await fileOperations.getFilesByLinkedEntity(supabase, userId, 'tender_doc', tender.id);

      // Transform data to match frontend expectations (snake_case to camelCase)
      return {
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
        documents: documents.map(file => ({
          id: file.id,
          name: file.file_name,
          size: file.file_size,
          type: file.mime_type,
          path: file.file_path,
          // signedUrl is generated on demand in the frontend for list view
        })),
        contactInfo: tender.contact_info,
        status: tender.status,
        tags: tender.tags,
        isNew: tender.is_featured || false, // Map is_featured to isNew for compatibility
        createdAt: tender.created_at,
        updatedAt: tender.updated_at
      };
    }));

    res.status(200).json(processedTenders);
  } catch (error) {
    console.error('Error fetching tenders:', error);
    res.status(500).json({ error: 'Failed to fetch tenders' });
  }
}