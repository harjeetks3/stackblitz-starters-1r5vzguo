// pages/api/admin/seed-tenders.js
// Admin API endpoint for seeding tender data into the database
// This is a one-time use endpoint for populating the database with initial tender data

import { createClient } from '@supabase/supabase-js';
import { tenders } from '../../../scripts/seed-tenders';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for admin authorization token
  const adminToken = req.headers['x-admin-token'];
  if (!adminToken || adminToken !== process.env.ADMIN_API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // First, clear existing tenders and related files
    console.log('[Seed Tenders] Clearing existing tenders and files...');
    
    // Get all existing tenders
    const { data: existingTenders, error: fetchError } = await supabase
      .from('tenders')
      .select('id');
      
    if (fetchError) {
      console.error('[Seed Tenders] Error fetching existing tenders:', fetchError);
      return res.status(500).json({ error: 'Failed to fetch existing tenders' });
    }
    
    if (existingTenders && existingTenders.length > 0) {
      // Delete all files linked to tenders
      for (const tender of existingTenders) {
        const { error: filesDeleteError } = await supabase
          .from('files')
          .delete()
          .eq('linked_entity', 'tender_doc')
          .eq('linked_id', tender.id);
          
        if (filesDeleteError) {
          console.error(`[Seed Tenders] Error deleting files for tender ${tender.id}:`, filesDeleteError);
        }
      }
      
      // Delete all tenders
      const { error: tendersDeleteError } = await supabase
        .from('tenders')
        .delete()
        .in('id', existingTenders.map(t => t.id));
        
      if (tendersDeleteError) {
        console.error('[Seed Tenders] Error deleting existing tenders:', tendersDeleteError);
        return res.status(500).json({ error: 'Failed to delete existing tenders' });
      }
      
      console.log(`[Seed Tenders] Cleared ${existingTenders.length} existing tenders and their files`);
    }

    console.log(`[Seed Tenders] Processing ${tenders.length} tenders`);

    const results = [];
    const userId = process.env.SUPABASE_ADMIN_USER_ID || process.env.SUPABASE_SEED_USER_ID;
    
    if (!userId) {
      return res.status(500).json({ error: 'SUPABASE_ADMIN_USER_ID or SUPABASE_SEED_USER_ID must be set in .env.local' });
    }

    // Process each tender
    for (const tender of tenders) {
      try {
        // Validate required fields
        if (!tender.title || !tender.description || !tender.agency) {
          console.error('[Seed Tenders] Missing required fields for tender:', tender.title);
          results.push({
            title: tender.title || 'Unknown',
            status: 'error',
            error: 'Missing required fields'
          });
          continue;
        }

        // Insert tender into database
        const { data: tenderData, error: tenderError } = await supabase
          .from('tenders')
          .insert({
            title: tender.title,
            description: tender.description,
            agency: tender.agency,
            category: tender.category,
            location: tender.location,
            budget: tender.budget,
            closing_date: tender.closingDate,
            published_date: tender.publishedDate || new Date().toISOString(),
            tender_id: tender.tenderId,
            requirements: tender.requirements,
            status: tender.status || 'active',
            tags: tender.tags,
            is_featured: tender.isFeatured || false
          })
          .select()
          .single();

        if (tenderError) {
          console.error('[Seed Tenders] Error inserting tender:', tenderError);
          results.push({
            title: tender.title,
            status: 'error',
            error: tenderError.message
          });
          continue;
        }

        console.log(`[Seed Tenders] Inserted tender: ${tenderData.title} (${tenderData.id})`);

        // Process associated documents if any
        if (tender.documents && Array.isArray(tender.documents)) {
          for (const doc of tender.documents) {
            // Skip if document path is not provided
            if (!doc.path) {
              console.warn('[Seed Tenders] Document missing path:', doc);
              continue;
            }

            // Insert file metadata
            const { data: fileData, error: fileError } = await supabase
              .from('files')
              .insert({
                user_id: userId, // Use the admin user ID for seeded documents
                file_path: doc.path,
                file_name: doc.name || doc.path.split('/').pop(),
                file_size: doc.size || 0,
                mime_type: doc.mimeType || 'application/pdf',
                linked_entity: 'tender_doc',
                linked_id: tenderData.id
              })
              .select()
              .single();

            if (fileError) {
              console.error('[Seed Tenders] Error inserting file metadata:', fileError);
              continue;
            }

            console.log(`[Seed Tenders] Linked document: ${fileData.file_name} to tender ${tenderData.id}`);
          }
        }

        results.push({
          title: tenderData.title,
          id: tenderData.id,
          status: 'success'
        });
      } catch (tenderError) {
        console.error('[Seed Tenders] Unexpected error processing tender:', tenderError);
        results.push({
          title: tender.title || 'Unknown',
          status: 'error',
          error: tenderError.message
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: `Processed ${tenders.length} tenders`,
      results
    });
  } catch (error) {
    console.error('[Seed Tenders] Server error:', error);
    return res.status(500).json({
      error: 'Failed to seed tenders',
      details: error.message
    });
  }
}