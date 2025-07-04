// lib/database.js
// Updated database utility functions for Supabase operations with enhanced company profile support
// Provides type-safe database operations for the Tenderly application

// Company operations
export const companyOperations = {
  // Get company profile for current user
  async getProfile(supabaseInstance, userId) {
    const { data, error } = await supabaseInstance
      .from('companies')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }
    
    return data;
  },

  // Create or update company profile
  async upsertProfile(supabaseInstance, userId, profileData) {
    // Map camelCase to snake_case for database with enhanced fields
    const dbData = {
      user_id: userId,
      name: profileData.name,
      registration_number: profileData.registrationNumber,
      address: profileData.address,
      phone: profileData.contactPhone,
      email: profileData.contactEmail,
      website: profileData.website,
      established_year: profileData.establishedYear,
      certifications: profileData.certifications,
      experience: profileData.experience,
      contact_email: profileData.contactEmail,
      contact_phone: profileData.contactPhone,
      // Enhanced fields from the new migration
      cidb_grade: profileData.cidbGrade,
      cidb_expiry: profileData.cidbExpiry,
      iso9001: profileData.iso9001,
      iso14001: profileData.iso14001,
      ohsas18001: profileData.ohsas18001,
      contractor_license: profileData.contractorLicense,
      license_expiry: profileData.licenseExpiry,
      years_in_operation: profileData.yearsInOperation,
      total_projects: profileData.totalProjects,
      total_value: profileData.totalValue,
      specialties: profileData.specialties,
      major_projects: profileData.majorProjects,
      total_employees: profileData.totalEmployees,
      engineers_count: parseInt(profileData.engineersCount) || 0,
      supervisors_count: parseInt(profileData.supervisorsCount) || 0,
      technicians_count: parseInt(profileData.techniciansCount) || 0,
      laborers_count: parseInt(profileData.laborersCount) || 0,
      key_personnel: profileData.keyPersonnel,
      preferred_categories: profileData.preferredCategories,
      preferred_locations: profileData.preferredLocations,
      budget_range: profileData.budgetRange,
      custom_certifications: profileData.customCertifications,
      verification_status: profileData.verificationStatus || 'pending',
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabaseInstance
      .from('companies')
      .upsert(dbData, {
        onConflict: 'user_id'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Tender operations
export const tenderOperations = {
  // Get all active tenders
  async getAll(supabaseInstance) {
    const { data, error } = await supabaseInstance
      .from('tenders')
      .select('*')
      .eq('status', 'active')
      .order('closing_date', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Get tender by ID
  async getById(supabaseInstance, id) {
    const { data, error } = await supabaseInstance
      .from('tenders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Search tenders
  async search(supabaseInstance, query, filters = {}) {
    let queryBuilder = supabaseInstance
      .from('tenders')
      .select('*')
      .eq('status', 'active');

    // Add text search
    if (query) {
      queryBuilder = queryBuilder.textSearch('title,description,agency', query);
    }

    // Add category filter
    if (filters.category) {
      queryBuilder = queryBuilder.eq('category', filters.category);
    }

    // Add location filter
    if (filters.location) {
      queryBuilder = queryBuilder.eq('location', filters.location);
    }

    // Add date range filter
    if (filters.closingAfter) {
      queryBuilder = queryBuilder.gte('closing_date', filters.closingAfter);
    }

    const { data, error } = await queryBuilder
      .order('closing_date', { ascending: true });
    
    if (error) throw error;
    return data;
  }
};

// File operations
export const fileOperations = {
  // Insert file metadata
  async insertFileMetadata(supabaseInstance, userId, metadata) {
    const { data, error } = await supabaseInstance
      .from('files')
      .insert({
        user_id: userId,
        file_path: metadata.filePath,
        file_name: metadata.fileName,
        file_size: metadata.fileSize,
        mime_type: metadata.mimeType,
        linked_entity: metadata.linkedEntity,
        linked_id: metadata.linkedId
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete file metadata
  async deleteFileMetadata(supabaseInstance, userId, filePath) {
    const { error } = await supabaseInstance
      .from('files')
      .delete()
      .eq('user_id', userId)
      .eq('file_path', filePath);
    
    if (error) throw error;
    return true;
  },

  // Get files by linked entity and ID
  async getFilesByLinkedEntity(supabaseInstance, ownerId, linkedEntity, linkedId) {
    let query = supabaseInstance
      .from('files')
      .select('*')
      .eq('linked_entity', linkedEntity)
      .eq('linked_id', linkedId);

    // Conditionally apply ownerId filter
    if (linkedEntity === 'tender_doc') {
      // Tender documents are public and can be accessed by anyone
      // No user_id filter for tender documents
    } else {
      // Other documents are owned by the user
      query = query.eq('user_id', ownerId);
    }
    
    const { data, error } = await query;

    if (error) throw error;
    return data;
  },
  
  // Get all files for a user
  async getUserFiles(supabaseInstance, userId) {
    const { data, error } = await supabaseInstance
      .from('files')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// Proposal operations
export const proposalOperations = {
  // Get all proposals for user
  async getByUser(supabaseInstance, userId) {
    const { data, error } = await supabaseInstance
      .from('proposals')
      .select(`
        *,
        tenders (
          title,
          agency,
          closing_date
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get proposal by ID
  async getById(supabaseInstance, id) {
    const { data, error } = await supabaseInstance
      .from('proposals')
      .select(`
        *,
        tenders (
          title,
          agency,
          closing_date,
          category
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create new proposal
  async create(supabaseInstance, userId, proposalData) {
    // Get user's company ID
    const { data: company } = await supabaseInstance
      .from('companies')
      .select('id')
      .eq('user_id', userId)
      .single();

    const { data, error } = await supabaseInstance
      .from('proposals')
      .insert({
        user_id: userId,
        company_id: company?.id,
        tender_id: proposalData.tender_id,
        title: proposalData.title,
        content: proposalData.content,
        status: 'draft',
        version: 1
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update proposal
  async update(supabaseInstance, id, userId, updates) {
    const { data, error } = await supabaseInstance
      .from('proposals')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Save proposal version
  async saveVersion(supabaseInstance, proposalId, content, summary) {
    // Get the current highest version number for this proposal
    const { data: existingVersions } = await supabaseInstance
      .from('proposal_versions')
      .select('version')
      .eq('proposal_id', proposalId)
      .order('version', { ascending: false })
      .limit(1);

    const nextVersion = existingVersions && existingVersions.length > 0 
      ? existingVersions[0].version + 1 
      : 1;

    const { data, error } = await supabaseInstance
      .from('proposal_versions')
      .insert({
        proposal_id: proposalId,
        content,
        changes_summary: summary,
        version: nextVersion
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get proposal versions
  async getVersions(supabaseInstance, proposalId, userId) {
    // First verify the user owns the proposal
    const { data: proposal } = await supabaseInstance
      .from('proposals')
      .select('user_id')
      .eq('id', proposalId)
      .single();

    if (!proposal || proposal.user_id !== userId) {
      throw new Error('Proposal not found or access denied');
    }

    const { data, error } = await supabaseInstance
      .from('proposal_versions')
      .select('*')
      .eq('proposal_id', proposalId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// Attestation operations
export const attestationOperations = {
  // Get all attestations for user
  async getByUser(supabaseInstance, userId) {
    const { data, error } = await supabaseInstance
      .from('attestations')
      .select('*')
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Create new attestation
  async create(supabaseInstance, userId, attestationData) {
    const { data, error } = await supabaseInstance
      .from('attestations')
      .insert({
        user_id: userId,
        ...attestationData
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// User profile operations
export const userProfileOperations = {
  // Get user profile
  async getProfile(supabaseInstance, userId) {
    const { data, error } = await supabaseInstance
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return data;
  },

  // Create or update user profile
  async upsertProfile(supabaseInstance, userId, profileData) {
    const { data, error } = await supabaseInstance
      .from('user_profiles')
      .upsert({
        user_id: userId,
        ...profileData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Utility functions
export const dbUtils = {
  // Check if user has completed company profile
  async hasCompanyProfile(supabaseInstance, userId) {
    const profile = await companyOperations.getProfile(supabaseInstance, userId);
    return profile && profile.name && profile.email;
  },

  // Get user's proposal count
  async getProposalCount(supabaseInstance, userId) {
    const { count, error } = await supabaseInstance
      .from('proposals')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    if (error) throw error;
    return count;
  },

  // Get user's attestation count
  async getAttestationCount(supabaseInstance, userId) {
    const { count, error } = await supabaseInstance
      .from('attestations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    if (error) throw error;
    return count;
  },
  
  // Generate a signed URL for a file
  async getSignedUrl(supabaseInstance, filePath, expiresIn = 3600) {
    const { data, error } = await supabaseInstance.storage
      .from('documents')
      .createSignedUrl(filePath, expiresIn);
    
    if (error) throw error;
    return data.signedUrl;
  }
};