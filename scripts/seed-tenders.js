// scripts/seed-tenders.js
// Script to seed the database with initial tender data
// Run this script once to populate the database with sample tenders

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, serviceRoleKey);

// Sample tender data
const tenders = [
  {
    title: 'Construction of New Government Office Building',
    agency: 'Ministry of Public Works',
    description: `The Ministry of Public Works invites qualified contractors to submit proposals for the construction of a new 5-story government office building. The project includes:

- Total floor area: 15,000 square meters
- Modern office spaces with open floor plans
- Energy-efficient HVAC systems
- Sustainable building materials and green building certification
- Underground parking for 200 vehicles
- Advanced security systems and access controls
- Completion timeline: 18 months from contract award

Requirements:
- Minimum 10 years experience in commercial construction
- ISO 9001:2015 Quality Management certification
- Previous experience with government projects
- Financial capacity of at least $5 million
- Valid contractor license Grade A
- Safety certification (OHSAS 18001 or equivalent)

The successful contractor must demonstrate expertise in sustainable construction practices and have a proven track record of delivering projects on time and within budget.`,
    category: 'Construction',
    location: 'Kuala Lumpur',
    budget: 'RM 45,000,000',
    closingDate: new Date('2025-03-15').toISOString(),
    publishedDate: new Date('2025-01-15').toISOString(),
    tenderId: 'MPW/2025/BLDG/001',
    requirements: [
      'Minimum 10 years experience in commercial construction',
      'ISO 9001:2015 Quality Management certification',
      'Previous experience with government projects',
      'Financial capacity of at least $5 million',
      'Valid contractor license Grade A',
      'Safety certification (OHSAS 18001 or equivalent)'
    ],
    status: 'active',
    tags: ['Construction', 'Government', 'Office Building'],
    isFeatured: true,
    documents: [
      {
        name: 'Tender Document.pdf',
        path: 'scraper/tender-doc-001.pdf',
        size: 2457600,
        mimeType: 'application/pdf'
      },
      {
        name: 'Technical Specifications.pdf',
        path: 'scraper/tech-specs-001.pdf',
        size: 1843200,
        mimeType: 'application/pdf'
      }
    ]
  },
  {
    title: 'IT Infrastructure Modernization Project',
    agency: 'Department of Digital Services',
    description: `The Department of Digital Services seeks a qualified IT service provider to modernize the government's IT infrastructure. This comprehensive project includes:

- Migration to cloud-based systems (AWS/Azure)
- Implementation of cybersecurity frameworks
- Network infrastructure upgrades
- Data center consolidation
- Staff training and knowledge transfer
- 24/7 technical support for 3 years

Technical Requirements:
- Cloud architecture certification (AWS/Azure)
- ISO 27001 Information Security certification
- Minimum 5 years experience in large-scale IT projects
- Proven expertise in government sector IT solutions
- Local presence with certified technical staff

The project timeline is 12 months for implementation with ongoing support. Proposals must include detailed technical specifications, project timeline, and cost breakdown.`,
    category: 'IT Services',
    location: 'Putrajaya',
    budget: 'RM 12,500,000',
    closingDate: new Date('2025-02-28').toISOString(),
    publishedDate: new Date('2025-01-10').toISOString(),
    tenderId: 'DDS/2025/IT/002',
    requirements: [
      'Cloud architecture certification (AWS/Azure)',
      'ISO 27001 Information Security certification',
      'Minimum 5 years experience in large-scale IT projects',
      'Proven expertise in government sector IT solutions',
      'Local presence with certified technical staff'
    ],
    status: 'active',
    tags: ['IT', 'Cloud', 'Cybersecurity'],
    isFeatured: false,
    documents: [
      {
        name: 'IT Infrastructure RFP.pdf',
        path: 'scraper/it-rfp-002.pdf',
        size: 1843200,
        mimeType: 'application/pdf'
      }
    ]
  },
  {
    title: 'Healthcare Equipment Supply and Maintenance',
    agency: 'Ministry of Health',
    description: `The Ministry of Health requires a comprehensive healthcare equipment supply and maintenance contract for regional hospitals. The scope includes:

- Supply of medical diagnostic equipment
- Installation and commissioning
- Preventive maintenance programs
- Emergency repair services
- Staff training on equipment operation
- Spare parts supply for 5 years

Equipment Categories:
- X-ray and imaging systems
- Laboratory diagnostic equipment
- Patient monitoring systems
- Surgical instruments and tools
- Emergency medical equipment

Requirements:
- Medical device distributor license
- ISO 13485 Medical Device Quality certification
- Minimum 7 years experience in healthcare sector
- Local service center and certified technicians
- 24/7 emergency support capability
- Compliance with medical device regulations

The contract period is 5 years with annual performance reviews.`,
    category: 'Healthcare',
    location: 'Nationwide',
    budget: 'RM 28,000,000',
    closingDate: new Date('2025-04-10').toISOString(),
    publishedDate: new Date('2025-01-20').toISOString(),
    tenderId: 'MOH/2025/MED/003',
    requirements: [
      'Medical device distributor license',
      'ISO 13485 Medical Device Quality certification',
      'Minimum 7 years experience in healthcare sector',
      'Local service center and certified technicians',
      '24/7 emergency support capability',
      'Compliance with medical device regulations'
    ],
    status: 'active',
    tags: ['Healthcare', 'Medical Equipment', 'Maintenance'],
    isFeatured: true,
    documents: [
      {
        name: 'Healthcare Equipment Tender.pdf',
        path: 'scraper/healthcare-tender-003.pdf',
        size: 3145728,
        mimeType: 'application/pdf'
      },
      {
        name: 'Equipment Specifications.pdf',
        path: 'scraper/equipment-specs-003.pdf',
        size: 2097152,
        mimeType: 'application/pdf'
      }
    ]
  },
  {
    title: 'Urban Transportation System Upgrade',
    agency: 'Kuala Lumpur City Council',
    description: `Kuala Lumpur City Council is seeking proposals for a comprehensive upgrade of the city's transportation system. The project aims to improve urban mobility, reduce congestion, and enhance public transportation services. Key components include:

- Smart traffic management systems
- Public transportation integration
- Pedestrian-friendly infrastructure
- Bicycle lanes and sharing systems
- Electric vehicle charging stations
- Mobile app for transportation services

Requirements:
- Minimum 8 years experience in urban transportation projects
- Previous experience with smart city initiatives
- Expertise in traffic flow optimization
- Knowledge of sustainable transportation solutions
- Ability to integrate with existing infrastructure

The project will be implemented in phases over a 36-month period. Proposals should include detailed implementation plans, technology specifications, and cost estimates.`,
    category: 'Transportation',
    location: 'Kuala Lumpur',
    budget: 'RM 35,000,000',
    closingDate: new Date('2025-03-25').toISOString(),
    publishedDate: new Date('2025-01-25').toISOString(),
    tenderId: 'KLCC/2025/TRANS/004',
    requirements: [
      'Minimum 8 years experience in urban transportation projects',
      'Previous experience with smart city initiatives',
      'Expertise in traffic flow optimization',
      'Knowledge of sustainable transportation solutions',
      'Ability to integrate with existing infrastructure'
    ],
    status: 'active',
    tags: ['Transportation', 'Smart City', 'Urban Development'],
    isFeatured: false,
    documents: [
      {
        name: 'Transportation System RFP.pdf',
        path: 'scraper/transport-rfp-004.pdf',
        size: 4194304,
        mimeType: 'application/pdf'
      }
    ]
  },
  {
    title: 'Renewable Energy Installation for Government Buildings',
    agency: 'Ministry of Energy and Natural Resources',
    description: `The Ministry of Energy and Natural Resources is seeking proposals for the installation of renewable energy systems across government buildings in the Klang Valley. The project includes:

- Solar panel installation on rooftops
- Energy storage solutions
- Smart energy management systems
- Grid integration and net metering
- Energy efficiency upgrades
- Monitoring and reporting systems

Requirements:
- SEDA certification
- Minimum 5 years experience in renewable energy projects
- Previous experience with government or commercial installations
- Qualified engineers and technicians
- Compliance with national renewable energy standards
- Ability to provide maintenance services for 10 years

The project aims to reduce government energy costs and carbon footprint while promoting renewable energy adoption in the public sector.`,
    category: 'Energy',
    location: 'Klang Valley',
    budget: 'RM 18,500,000',
    closingDate: new Date('2025-04-05').toISOString(),
    publishedDate: new Date('2025-01-30').toISOString(),
    tenderId: 'MENR/2025/RE/005',
    requirements: [
      'SEDA certification',
      'Minimum 5 years experience in renewable energy projects',
      'Previous experience with government or commercial installations',
      'Qualified engineers and technicians',
      'Compliance with national renewable energy standards',
      'Ability to provide maintenance services for 10 years'
    ],
    status: 'active',
    tags: ['Renewable Energy', 'Solar', 'Energy Efficiency'],
    isFeatured: true,
    documents: [
      {
        name: 'Renewable Energy Tender.pdf',
        path: 'scraper/renewable-tender-005.pdf',
        size: 2621440,
        mimeType: 'application/pdf'
      }
    ]
  },
  {
    title: 'Water Treatment Plant Expansion',
    agency: 'National Water Services Commission',
    description: `The National Water Services Commission (SPAN) is inviting tenders for the expansion of the Sungai Semenyih Water Treatment Plant. The project aims to increase the plant's capacity from 545 MLD to 800 MLD to meet growing demand in the southern Klang Valley region. The scope includes:

- Design and construction of additional treatment modules
- Upgrading of intake structures
- Installation of advanced filtration systems
- Expansion of chemical treatment facilities
- Modernization of control and monitoring systems
- Construction of additional clear water tanks

Requirements:
- CIDB Grade G7 certification
- Minimum 10 years experience in water infrastructure projects
- Previous experience in water treatment plant construction
- Qualified civil, mechanical, and electrical engineers
- ISO 9001, ISO 14001, and ISO 45001 certifications
- Financial capability to handle projects of similar scale

The project duration is 36 months with a defect liability period of 24 months.`,
    category: 'Water Infrastructure',
    location: 'Selangor',
    budget: 'RM 320,000,000',
    closingDate: new Date('2025-05-15').toISOString(),
    publishedDate: new Date('2025-02-01').toISOString(),
    tenderId: 'SPAN/2025/WTP/006',
    requirements: [
      'CIDB Grade G7 certification',
      'Minimum 10 years experience in water infrastructure projects',
      'Previous experience in water treatment plant construction',
      'Qualified civil, mechanical, and electrical engineers',
      'ISO 9001, ISO 14001, and ISO 45001 certifications',
      'Financial capability to handle projects of similar scale'
    ],
    status: 'active',
    tags: ['Water', 'Infrastructure', 'Construction'],
    isFeatured: false,
    documents: [
      {
        name: 'Water Treatment Plant Tender.pdf',
        path: 'scraper/water-tender-006.pdf',
        size: 5242880,
        mimeType: 'application/pdf'
      }
    ]
  },
  {
    title: 'School Digital Transformation Program',
    agency: 'Ministry of Education',
    description: `The Ministry of Education is seeking proposals for a comprehensive digital transformation program for 100 secondary schools across Malaysia. The program aims to enhance teaching and learning through technology integration. The scope includes:

- High-speed internet connectivity
- Smart classroom equipment (interactive displays, tablets)
- Digital learning content development
- Teacher training and professional development
- Student digital literacy programs
- IT support and maintenance services

Requirements:
- Minimum 5 years experience in educational technology
- Previous implementation of similar projects
- Expertise in digital content development
- Qualified trainers and technical support staff
- Ability to provide nationwide coverage
- Comprehensive warranty and support plan

The project will be implemented in phases over 24 months with ongoing support for 36 months.`,
    category: 'Education',
    location: 'Nationwide',
    budget: 'RM 75,000,000',
    closingDate: new Date('2025-03-30').toISOString(),
    publishedDate: new Date('2025-02-05').toISOString(),
    tenderId: 'MOE/2025/EDU/007',
    requirements: [
      'Minimum 5 years experience in educational technology',
      'Previous implementation of similar projects',
      'Expertise in digital content development',
      'Qualified trainers and technical support staff',
      'Ability to provide nationwide coverage',
      'Comprehensive warranty and support plan'
    ],
    status: 'active',
    tags: ['Education', 'Digital Transformation', 'Technology'],
    isFeatured: true,
    documents: [
      {
        name: 'Education Digital Transformation RFP.pdf',
        path: 'scraper/education-rfp-007.pdf',
        size: 3670016,
        mimeType: 'application/pdf'
      }
    ]
  },
  {
    title: 'Coastal Protection and Erosion Control',
    agency: 'Department of Irrigation and Drainage',
    description: `The Department of Irrigation and Drainage (DID) is inviting tenders for coastal protection and erosion control works along the east coast of Peninsular Malaysia. The project aims to mitigate coastal erosion and protect coastal communities and infrastructure. The scope includes:

- Beach nourishment and restoration
- Construction of breakwaters and groynes
- Mangrove rehabilitation and planting
- Slope protection and stabilization
- Drainage improvement works
- Environmental monitoring systems

Requirements:
- CIDB Grade G6 or G7 certification
- Minimum 8 years experience in coastal engineering
- Previous experience in similar coastal protection projects
- Qualified coastal engineers and environmental specialists
- Environmental management certification
- Capability to handle marine construction works

The project will be implemented in multiple phases over 48 months with environmental monitoring continuing for 24 months after completion.`,
    category: 'Environmental',
    location: 'East Coast, Peninsular Malaysia',
    budget: 'RM 85,000,000',
    closingDate: new Date('2025-04-20').toISOString(),
    publishedDate: new Date('2025-02-10').toISOString(),
    tenderId: 'DID/2025/COAST/008',
    requirements: [
      'CIDB Grade G6 or G7 certification',
      'Minimum 8 years experience in coastal engineering',
      'Previous experience in similar coastal protection projects',
      'Qualified coastal engineers and environmental specialists',
      'Environmental management certification',
      'Capability to handle marine construction works'
    ],
    status: 'active',
    tags: ['Environmental', 'Coastal', 'Infrastructure'],
    isFeatured: false,
    documents: [
      {
        name: 'Coastal Protection Tender.pdf',
        path: 'scraper/coastal-tender-008.pdf',
        size: 4718592,
        mimeType: 'application/pdf'
      }
    ]
  }
];

// Function to seed tenders
async function seedTenders() {
  console.log('Starting tender seeding process...');
  
  // Check if tenders already exist
  const { data: existingTenders, error: checkError } = await supabase
    .from('tenders')
    .select('id')
    .limit(1);
  
  if (checkError) {
    console.error('Error checking existing tenders:', checkError);
    process.exit(1);
  }
  
  if (existingTenders && existingTenders.length > 0) {
    console.log('Tenders already exist in the database. Skipping seeding process.');
    process.exit(0);
  }

  // Process each tender
  for (const tender of tenders) {
    try {
      console.log(`Processing tender: ${tender.title}`);
      
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
          published_date: tender.publishedDate,
          tender_id: tender.tenderId,
          requirements: tender.requirements,
          status: tender.status,
          tags: tender.tags,
          is_featured: tender.isFeatured
        })
        .select()
        .single();
      
      if (tenderError) {
        console.error(`Error inserting tender "${tender.title}":`, tenderError);
        continue;
      }
      
      console.log(`Inserted tender: ${tenderData.title} (${tenderData.id})`);
      
      // Process documents
      if (tender.documents && tender.documents.length > 0) {
        for (const doc of tender.documents) {
          // Insert file metadata
          const { data: fileData, error: fileError } = await supabase
            .from('files')
            .insert({
              user_id: 'scraper', // Use 'scraper' as the user_id for seeded documents
              file_path: doc.path,
              file_name: doc.name,
              file_size: doc.size,
              mime_type: doc.mimeType,
              linked_entity: 'tender_doc',
              linked_id: tenderData.id
            })
            .select()
            .single();
          
          if (fileError) {
            console.error(`Error inserting file metadata for "${doc.name}":`, fileError);
            continue;
          }
          
          console.log(`Linked document: ${fileData.file_name} to tender ${tenderData.id}`);
        }
      }
    } catch (error) {
      console.error(`Error processing tender "${tender.title}":`, error);
    }
  }
  
  console.log('Tender seeding process completed successfully!');
}

// Run the seeding function
seedTenders()
  .catch(error => {
    console.error('Error in seed script:', error);
    process.exit(1);
  });