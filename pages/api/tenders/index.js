// pages/api/tenders/index.js
// API endpoint for listing all active tenders from Supabase database

import { createClient } from '@supabase/supabase-js';
import { tenderOperations } from '../../../lib/database';

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
    
    // Process files for each tender
    const processedTenders = tenders.map(tender => {
      // Generate signed URLs for files if they exist
      const documents = tender.files && tender.files.length > 0 
        ? tender.files.map(file => ({
            id: file.id,
            name: file.file_name,
            size: file.file_size,
            type: file.mime_type,
            path: file.file_path,
            // We'll generate signed URLs on demand in the frontend to avoid generating too many at once
          }))
        : [];

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
        documents: documents,
        contactInfo: tender.contact_info,
        status: tender.status,
        tags: tender.tags,
        isNew: tender.is_featured || false, // Map is_featured to isNew for compatibility
        createdAt: tender.created_at,
        updatedAt: tender.updated_at
      };
    });

    res.status(200).json(processedTenders);
  } catch (error) {
    console.error('Error fetching tenders:', error);
    res.status(500).json({ error: 'Failed to fetch tenders' });
  }
}