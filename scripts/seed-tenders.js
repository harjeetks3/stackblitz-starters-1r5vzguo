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
module.exports.tenders = [
// tender #1
{
  "title": "ISLAMIC COOKED FOOD PREPARATION AND SUPPLY SERVICES TO DETENTIONS (OKT) AT KAMPUNG SELAMAT REMAN DETENTION CENTRE, NATIONAL ANTI-DRUG AGENCY OF MALAYSIA, PENANG STATE",
  "agency": "NATIONAL ANTI-DRUG AGENCY (AADK) – MINISTRY OF INTERIOR",
  "description": "Two-year contract (24 months) to cook, package, and deliver halal meals—breakfast, lunch, tea, and dinner—for approximately 71 detainees daily at the Kampung Selamat Reman Detention Centre, Penang.  Menu cycles, nutritional portions, hygiene standards, delivery frequency, and service KPIs are defined in the tender's Spesifikasi and Jadual Kekerapan.  Strict compliance with Islamic dietary rules, food-safety regulations, and AADK security protocols is mandatory.  Tender includes supply of ingredients, labour, transport, and on-site service supervisors.",
  "category": "Food & Catering Services",
  "location": "Penang, Malaysia",
  "budget": "RM 779,580.00 (departmental indicative price)",
  "closingDate": "2025-07-04T12:00:00Z",
  "publishedDate": "2025-06-13T12:00:00Z",
  "tenderId": "QT250000000013773",
  "requirements": [
    "Supplier status: Open; all Malaysian states eligible",
    "Field code 040103 – FOOD, BEVERAGES AND RAW MATERIALS → Islamic cooked food",
    "Offer validity: 180 days (expires 2025-12-31)",
    "Menu & nutrition: follow 7-day cycle in '06_Spesifikasi.pdf'",
    "Service frequency: 24 monthly cycles over 24 months (see '03_Jadual_Kekerapan.pdf')",
    "Financial & technical compliance checklists in '07' and '08' PDFs must be uploaded",
    "Comply with all general and special conditions in '05_Syarat_Syarat_Am_…pdf'",
    "Performance bond: 2.5 % or 5 % of contract value per clause 18 (if awarded)",
    "Programme PROTÉGÉ-RTW declaration required (per PP/PK 1.12)"
  ],
  "status": "active",
  "tags": ["Halal Catering", "Detention Centre", "Government Tender"],
  "isFeatured": false,
  documents: [
      // NOTE: Update size: 0 with actual file sizes in bytes for all documents
      { name: "01_Kenyataan_Tawaran_Pembekal (1).pdf",  path: "scraper/QT250000000013773/01_Kenyataan_Tawaran_Pembekal (1).pdf",  size: 492229, mimeType: "application/pdf" },
      { name: "02_Sampel_Surat_Akuan_Pembida (1).pdf",  path: "scraper/QT250000000013773/02_Sampel_Surat_Akuan_Pembida (1).pdf",  size: 88202, mimeType: "application/pdf" },
      { name: "03_Jadual_Kekerapan.pdf",                path: "scraper/QT250000000013773/03_Jadual_Kekerapan.pdf",                size: 64267, mimeType: "application/pdf" },
      { name: "05_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", path: "scraper/QT250000000013773/05_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", size: 40302, mimeType: "application/pdf" },
      { name: "06_Spesifikasi.pdf",                     path: "scraper/QT250000000013773/06_Spesifikasi.pdf",                     size: 73220, mimeType: "application/pdf" },
      { name: "07_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", path: "scraper/QT250000000013773/07_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", size: 50007, mimeType: "application/pdf" },
      { name: "08_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", path: "scraper/QT250000000013773/08_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", size: 63795, mimeType: "application/pdf" },
      { name: "09_Sampel_Surat_Setuju_Terima.pdf",           path: "scraper/QT250000000013773/09_Sampel_Surat_Setuju_Terima.pdf",           size: 152928, mimeType: "application/pdf" },
      { name: "10_9_MAKLUMAT_HARGA_DAN_PEMARKAHAN_PENILAIAN_TENDER_AADK_PULAU_PINANG_FINAL.pdf", path: "scraper/QT250000000013773/10_9_MAKLUMAT_HARGA_DAN_PEMARKAHAN_PENILAIAN_TENDER_AADK_PULAU_PINANG_FINAL.pdf", size: 25206, mimeType: "application/pdf" },
      { name: "ISLAMIC COOKED FOOD PREPARATION AND SUPPLY SERVICES TO DETENTIONS.docx", path: "scraper/QT250000000013773/ISLAMIC COOKED FOOD PREPARATION AND SUPPLY SERVICES TO DETENTIONS.docx", size: 15076, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    ]
},

// tender #2
{
  "title": "SUPPLY AND DELIVERY OF PRINTER TONER / CARTRIDGES / INK FOR A PERIOD OF SEVEN (7) MONTHS FOR THE USE OF PTJ 101000 FINANCE DIVISION, MINISTRY OF PUBLIC WORKS",
  "agency": "MINISTRY OF PUBLIC WORKS – KKR Finance Division",
  "description": "Seven-month framework agreement to supply original OEM printer toner, cartridges and ink for multiple OKI and HP models (full list in Spesifikasi). Deliveries are door-to-door to KKR Finance Division, Kompleks Kerja Raya, Kuala Lumpur, with replacement of defective items within 7 working days. Contract value is indicatively RM 247,908.71; suppliers must meet MoF code 020601 and comply with all general and special conditions in the tender pack.",
  "category": "Office Supplies & Stationery",
  "location": "Kuala Lumpur • Putrajaya • Selangor",
  "budget": "RM 247,908.71 (indicative)",
  "closingDate": "2025-07-02T12:00:00Z",
  "publishedDate": "2025-06-25T12:00:00Z",
  "tenderId": "QT250000000020666",
  "requirements": [
    "Supplier status: Open",
    "Field code 020601 – Furniture, Office Equipment & Supplies → Typing Tools (non-paper)",
    "Offer validity: 7 days (expires 2025-07-09)",
    "Deliver to: KKR Finance Division, Jalan Sultan Salahuddin, KL (see 03_Delivery_Address.pdf)",
    "Provide only original OEM consumables dated 2024 onward (see 05_Spesifikasi.pdf)",
    "Replace damaged/defective items within 7 working days",
    "Complete technical & financial compliance checklists (06_ and 07_ PDFs)",
    "Adhere to all general & special conditions in 04_Syarat_Syarat_Am_….pdf"
  ],
  "status": "active",
  "tags": ["Office Supplies", "Toner & Ink", "Government Quotation"],
  "isFeatured": false,
  documents: [
      // NOTE: Update size: 0 with actual file sizes in bytes for all documents
      { name: "01_Kenyataan_Tawaran_Pembekal (1).pdf",  path: "scraper/QT250000000020666/01_Kenyataan_Tawaran_Pembekal (1).pdf",  size: 495381, mimeType: "application/pdf" },
      { name: "02_Sampel_Surat_Akuan_Pembida (1).pdf",  path: "scraper/QT250000000020666/02_Sampel_Surat_Akuan_Pembida (1).pdf",  size: 88679, mimeType: "application/pdf" },
      { name: "03_Delivery_Address.pdf",                path: "scraper/QT250000000020666/03_Delivery_Address.pdf",                size: 50236, mimeType: "application/pdf" },
      { name: "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", path: "scraper/QT250000000020666/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", size: 7565, mimeType: "application/pdf" },
      { name: "05_Spesifikasi.pdf",                     path: "scraper/QT250000000020666/05_Spesifikasi.pdf",                     size: 81145, mimeType: "application/pdf" },
      { name: "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", path: "scraper/QT250000000020666/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", size: 47943, mimeType: "application/pdf" },
      { name: "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", path: "scraper/QT250000000020666/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", size: 61832, mimeType: "application/pdf" },
      { name: "08_Sampel_Surat_Setuju_Terima.pdf",      path: "scraper/QT250000000020666/08_Sampel_Surat_Setuju_Terima.pdf",      size: 152884, mimeType: "application/pdf" },
      { name: "INK .docx",                              path: "scraper/QT250000000020666/INK .docx",                              size: 16723, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    ]
},


// tender #3
{
  "title": "QUOTE FOR SUPPLY, DELIVERY, TESTING AND COMMISSIONING OF TWO (2) DENTAL TECHNOLOGIST WORKSTATIONS FOR ORAL & MAXILLOFACIAL SURGERY (OMF) DENTAL SPECIALIST CLINIC AT KOTA SETAR / PENDANG DISTRICT DENTAL HEALTH OFFICE",
  "agency": "MINISTRY OF HEALTH – Kota Setar District Dental Health Office",
  "description": "Procurement of two complete dental technologist workstations—including bench, suction, dust-collection, lab micromotor, ergonomic chair, compressor (JKKP-certified) and accessory set—for the OMF Specialist Clinic, Hospital Sultanah Bahiyah, Kedah. Scope covers supply, door-to-door delivery, on-site installation, commissioning, one-year warranty, and operator/technical training. Technical specifications (dimensions, power, airflow, accessories) are defined in 05_Spesifikasi.pdf.",
  "category": "Healthcare Equipment",
  "location": "Alor Setar, Kedah (clinic delivery) – but open to suppliers in all states listed in tender",
  "budget": "RM 90,000.00 (indicative)",
  "closingDate": "2025-07-03T12:00:00Z",
  "publishedDate": "2025-06-26T12:00:00Z",
  "tenderId": "QT250000000021042",
  "requirements": [
    "Field code 050102 – Hospital, Medical, Drugs & Pharmaceutical Equipment → Medical Equipment/Supplies",
    "Supplier status: Bumiputera (Native people) eligible",
    "Offer validity: 90 days (until 2025-10-01)",
    "Delivery address: OMF Specialist Clinic, Hospital Sultanah Bahiyah, Alor Setar (see 03_Delivery_Address.pdf)",
    "Provide brochures, MDA establishment licence, and complete technical checklist (06_)",
    "Provide bank statements, TCC, MOF cert, and financial checklist (07_)",
    "Comply with General & Special Conditions in 04_Syarat_Syarat_Am_….pdf"
  ],
  "status": "active",
  "tags": ["Dental", "Medical Equipment", "Kedah"],
  "isFeatured": false,
  documents: [
  // NOTE: Update size: 0 with actual file sizes in bytes for all documents
  { name: "01_Kenyataan_Tawaran_Pembekal (1).pdf",  path: "scraper/QT250000000021042/01_Kenyataan_Tawaran_Pembekal (1).pdf",  size: 496478, mimeType: "application/pdf" },
      { name: "02_Sampel_Surat_Akuan_Pembida (1).pdf",  path: "scraper/QT250000000021042/02_Sampel_Surat_Akuan_Pembida (1).pdf",  size: 88785, mimeType: "application/pdf" },
      { name: "03_Delivery_Address.pdf",                path: "scraper/QT250000000021042/03_Delivery_Address.pdf",                size: 49673, mimeType: "application/pdf" },
      { name: "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", path: "scraper/QT250000000021042/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", size: 7560, mimeType: "application/pdf" },
      { name: "05_Spesifikasi.pdf",                     path: "scraper/QT250000000021042/05_Spesifikasi.pdf",                     size: 69959, mimeType: "application/pdf" },
      { name: "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", path: "scraper/QT250000000021042/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", size: 54176, mimeType: "application/pdf" },
      { name: "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", path: "scraper/QT250000000021042/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", size: 63266, mimeType: "application/pdf" },
      { name: "08_Sampel_Surat_Setuju_Terima.pdf",      path: "scraper/QT250000000021042/08_Sampel_Surat_Setuju_Terima.pdf",      size: 152997, mimeType: "application/pdf" },
      { name: "Dental Technologist Workstation.docx",   path: "scraper/QT250000000021042/Dental Technologist Workstation.docx",   size: 17567, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    ]
  },

  // tender #4
{
  "title": "SEBUT HARGA MEMBEKAL, MENGHANTAR, MEMASANG, MENGUJI GUNA DAN MENTAULIAH PERALATAN BENGKEL ASAS PASTRI BAGI KEMAHIRAN VOKASIONAL SPESIFIK (KVS) PROGRAM PENDIDIKAN KHAS INTEGRASI KE SEKOLAH MENENGAH DI BAWAH JPN TERENGGANU TAHUN 2025",
  "agency": "TERENGGANU STATE EDUCATION DEPARTMENT – MINISTRY OF EDUCATION",
  "description": "Quotation to supply, deliver, install, test, and commission a complete set of bakery-workshop and sequence-workshop equipment (heavy-duty mixers, ovens, chillers, waffle makers, freezers, food processors, etc.) for Special Education Vocational Skills (KVS) programmes in multiple secondary schools under JPN Terengganu. Scope includes door-to-door delivery to the schools listed in the specification, on-site installation, functional testing, user training, one-year warranty, and handing-over of all manuals and certificates.",
  "category": "Technical & Vocational Equipment",
  "location": "Terengganu (primary) • Kelantan • Pahang • Selangor • Wilayah Persekutuan Kuala Lumpur",
  "budget": "RM 143,112.00 (total indicative price)",
  "closingDate": "2025-07-06T12:00:00Z",
  "publishedDate": "2025-06-29T12:00:00Z",
  "tenderId": "QT250000000021826",
  "requirements": [
    "Supplier status: Open (all Malaysian states)",
    "Offer validity: 90 days (until 2025-10-04)",
    "Field codes 020301 & 020401 – Electrical/Electronic Equipment and Domestic Appliances",
    "Delivery address list supplied in 03_Delivery_Address.pdf; each item must be shipped to designated schools",
    "Comply with detailed equipment specs in 05_Spesifikasi.pdf (24 heavy-duty mixers 5 L, industrial ovens, chillers, freezers, waffle makers, food processors, etc.)",
    "Complete technical compliance checklist (06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf)",
    "Complete financial compliance checklist (07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf)",
    "Adhere to all General & Special Conditions in 04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf",
    "Quotation method: ePerolehan; one quotation per supplier; partial bids accepted by item"
  ],
  "status": "active",
  "tags": ["Vocational", "Bakery Equipment", "Special Education"],
  "isFeatured": false,
  documents: [
      // NOTE: Update size: 0 with actual file sizes in bytes for all documents
      { name: "01_Kenyataan_Tawaran_Pembekal (1).pdf",  path: "scraper/QT250000000021826/01_Kenyataan_Tawaran_Pembekal (1).pdf",  size: 496835, mimeType: "application/pdf" },
      { name: "02_Sampel_Surat_Akuan_Pembida (1).pdf",  path: "scraper/QT250000000021826/02_Sampel_Surat_Akuan_Pembida (1).pdf",  size: 88810, mimeType: "application/pdf" },
      { name: "03_Delivery_Address.pdf",                path: "scraper/QT250000000021826/03_Delivery_Address.pdf",                size: 47874, mimeType: "application/pdf" },
      { name: "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", path: "scraper/QT250000000021826/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", size: 7560, mimeType: "application/pdf" },
      { name: "05_Spesifikasi.pdf",                     path: "scraper/QT250000000021826/05_Spesifikasi.pdf",                     size: 87836, mimeType: "application/pdf" },
      { name: "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", path: "scraper/QT250000000021826/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", size: 53010, mimeType: "application/pdf" },
      { name: "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", path: "scraper/QT250000000021826/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", size: 66247, mimeType: "application/pdf" },
      { name: "08_Sampel_Surat_Setuju_Terima.pdf",      path: "scraper/QT250000000021826/08_Sampel_Surat_Setuju_Terima.pdf",      size: 153387, mimeType: "application/pdf" },
      { name: "QUOTATION FOR SUPPLY, DELIVERY, INSTALLATION, TESTING AND COMMISSIONING OF EQUIPMENT FOR BAKERY WORKSHOPS AND SEQUENCE WORKSHOPS.docx", path: "scraper/QT250000000021826/QUOTATION FOR SUPPLY, DELIVERY, INSTALLATION, TESTING AND COMMISSIONING OF EQUIPMENT FOR BAKERY WORKSHOPS AND SEQUENCE WORKSHOPS.docx", size: 18194, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    ]
  },

// tender #5
{
  "title": "SUPPLY, DELIVERY, TESTING AND COMMISSIONING ONE (1) PORTABLE RADIONUCLIDE DETECTOR – SH.82/2025",
  "agency": "MINISTRY OF SCIENCE, TECHNOLOGY & INNOVATION – Malaysian Nuclear Agency",
  "description": "Single-unit procurement of a handheld radionuclide identification detector for the Malaysian Nuclear Agency, Bangi. Scope covers supply, door-to-door delivery, on-site installation, functional testing, commissioning, one-year warranty, operator training for five staff, and after-sales support. Technical specifications require a NaI(Tl) gamma detector + ZnS neutron detector, energy range 25 keV–3 MeV, IP67 housing, Bluetooth/GPS, internal 8 GB storage, Windows 11 integration, plus rugged transport case. Delivery within 3 months of contract award.",
  "category": "Scientific Instrumentation",
  "location": "Kajang, Selangor (delivery) – open nationwide to suppliers",
  "budget": "RM 150,000.00 (indicative)",
  "closingDate": "2025-07-02T12:00:00Z",
  "publishedDate": "2025-06-25T12:00:00Z",
  "tenderId": "QT250000000017045",
  "requirements": [
    "Supplier status: Open (all states)",
    "Field code 120502 – Defense & Security → Monitoring and Detection Equipment",
    "Offer validity: 90 days (expires 2025-09-30)",
    "Delivery address: Nuclear Malaysia, BKS Block 13, 43000 Bangi (see 03_Delivery_Address.pdf)",
    "Full compliance with technical spec in 05_Spesifikasi.pdf (IP67, ≤2 kg, Nal + ZnS, ANSI N42.34, etc.)",
    "Upload technical & financial checklists (06_ & 07_)",
    "Adhere to General & Special Conditions (04_) and Additional Terms (09_8)",
    "Performance bond: 2.5 % (>RM200k≤RM500k) or 5 % (>RM500k) as per Additional Terms",
    "Programme PROTÉGÉ participation encouraged (see 09_8 §4)",
    "Late-delivery penalty: 2 % × (days/30) × contract value (09_8 §2)",
    "Prohibit company/price info inside technical uploads (09_8 §6)"
  ],
  "status": "active",
  "tags": ["Radiation Detection", "Science", "Security Equipment"],
  "isFeatured": false,
  documents: [
      // NOTE: Update size: 0 with actual file sizes in bytes for all documents
      { name: "01_Kenyataan_Tawaran_Pembekal (1).pdf",  path: "scraper/QT250000000017045/01_Kenyataan_Tawaran_Pembekal (1).pdf",  size: 493860, mimeType: "application/pdf" },
      { name: "02_Sampel_Surat_Akuan_Pembida (1).pdf",  path: "scraper/QT250000000017045/02_Sampel_Surat_Akuan_Pembida (1).pdf",  size: 88746, mimeType: "application/pdf" },
      { name: "03_Delivery_Address.pdf",                path: "scraper/QT250000000017045/03_Delivery_Address.pdf",                size: 49684, mimeType: "application/pdf" },
      { name: "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", path: "scraper/QT250000000017045/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", size: 7560, mimeType: "application/pdf" },
      { name: "05_Spesifikasi.pdf",                     path: "scraper/QT250000000017045/05_Spesifikasi.pdf",                     size: 82468, mimeType: "application/pdf" },
      { name: "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", path: "scraper/QT250000000017045/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", size: 50938, mimeType: "application/pdf" },
      { name: "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", path: "scraper/QT250000000017045/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", size: 63255, mimeType: "application/pdf" },
      { name: "08_Sampel_Surat_Setuju_Terima.pdf",      path: "scraper/QT250000000017045/08_Sampel_Surat_Setuju_Terima.pdf",      size: 152711, mimeType: "application/pdf" },
      { name: "09_8_Syarat-syarat_Tambahan.pdf",        path: "scraper/QT250000000017045/09_8_Syarat-syarat_Tambahan.pdf",        size: 475430, mimeType: "application/pdf" },
      { name: "Portable Radionuclide Detector.docx",    path: "scraper/QT250000000017045/Portable Radionuclide Detector.docx",    size: 16444, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    ]
  },

// tender #6
{
  "title": "WEB APPLICATION FIREWALL (WAF) SERVICE FOR A PERIOD OF THREE (3) YEARS AT THE HEADQUARTERS OF THE FIRE AND RESCUE DEPARTMENT OF MALAYSIA (JBPM) 2025-2028",
  "agency": "FIRE AND RESCUE DEPARTMENT OF MALAYSIA (JBPM) – MINISTRY OF LOCAL GOVERNMENT DEVELOPMENT",
  "description": "Three-year managed Web Application Firewall (WAF) subscription covering supply, deployment, configuration, high-availability (active-standby) setup, and 24×7 support for the JBPM headquarters data-centre in Putrajaya. The solution must deliver 1 Gbps throughput per appliance, OWASP Top-10 & API protection, SSL offload, load balancing, caching, SNMP/syslog, centralised Analyzer V2 reporting VM, and support both private-cloud (VMware, KVM, Xen, OpenStack, HCI) and public-cloud (AWS, Azure, NHN) environments. Scope includes professional services (design, migration, UAT), preventive maintenance every 6 months, firmware patching, and a three-day technical training course for five JBPM officers outside Klang Valley. All performance, SLA, and spec items are detailed in 05_Spesifikasi.pdf.",
  "category": "IT Security / Cybersecurity",
  "location": "Putrajaya (primary installation) • Selangor • Kuala Lumpur",
  "budget": "RM 167,600.00 (indicative)",
  "closingDate": "2025-07-09T12:00:00Z",
  "publishedDate": "2025-06-25T12:00:00Z",
  "tenderId": "QT250000000019695",
  "requirements": [
    "Supplier status: Open",
    "Field codes 210104 & 210107 – ICT Security / Firewall, Encryption, PKI, Anti-Virus",
    "Offer validity: 90 days (expires 2025-10-07)",
    "Delivery/Service address: IT Branch, 4th Floor HQ JBPM, Lebuh Wawasan, Presint 7 (see 03_Delivery_Address.pdf)",
    "Technical spec: 1 Gbps WAAP virtual appliance ×2, Analyzer V2 reporting VM, active-standby + active-active modes, full OWASP protection list (see 05_Spesifikasi.pdf)",
    "Upload completed Technical & Financial checklists (06_ & 07_) ",
    "Adhere to General & Special Conditions in 04_Syarat_Syarat_Am_….pdf",
    "Additional terms & performance-bond clauses in 09_8_Syarat-syarat_Tambahan.pdf",
    "No company/price data in technical uploads; PROTÉGÉ-RTW programme encouraged"
  ],
  "status": "active",
  "tags": ["Cybersecurity", "WAF", "Managed Service"],
  "isFeatured": false,
  documents: [
      // NOTE: Update size: 0 with actual file sizes in bytes for all documents
      { name: "01_Kenyataan_Tawaran_Pembekal (1).pdf",  path: "scraper/QT250000000019695/01_Kenyataan_Tawaran_Pembekal (1).pdf",  size: 496020, mimeType: "application/pdf" },
      { name: "02_Sampel_Surat_Akuan_Pembida (1).pdf",  path: "scraper/QT250000000019695/02_Sampel_Surat_Akuan_Pembida (1).pdf",  size: 89368, mimeType: "application/pdf" },
      { name: "03_Delivery_Address.pdf",                path: "scraper/QT250000000019695/03_Delivery_Address.pdf",                size: 50989, mimeType: "application/pdf" },
      { name: "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", path: "scraper/QT250000000019695/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", size: 7560, mimeType: "application/pdf" },
      { name: "05_Spesifikasi.pdf",                     path: "scraper/QT250000000019695/05_Spesifikasi.pdf",                     size: 86824, mimeType: "application/pdf" },
      { name: "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", path: "scraper/QT250000000019695/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", size: 57581, mimeType: "application/pdf" },
      { name: "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", path: "scraper/QT250000000019695/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", size: 61012, mimeType: "application/pdf" },
      { name: "08_Sampel_Surat_Setuju_Terima.pdf",      path: "scraper/QT250000000019695/08_Sampel_Surat_Setuju_Terima.pdf",      size: 152797, mimeType: "application/pdf" },
      { name: "WEB APPLICATION FIREWALL (WAF) SERVICE.docx", path: "scraper/QT250000000019695/WEB APPLICATION FIREWALL (WAF) SERVICE.docx", size: 16938, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    ]
  },

// tender #7
{
  "title": "SUPPLY OF SUPPORT SOFTWARE FOR THE BIOMETRIC DEVELOPMENT PROGRAMME FOR LAND-USE AND FOREST CONSERVATION IN SABAH",
  "agency": "MINISTRY OF NATURAL RESOURCES AND NATURAL SUSTAINABILITY – Sabah Forestry Department",
  "description": "Single-lot quotation to supply, license, deliver, install and provide one-day online technical training for image-analysis software required by the Sabah Forestry Department's Biometric Land-Use & Forest-Conservation Programme. Items include: (i) ENVI + IDL v11.4 perpetual licence for pixel-based remote-sensing and spectral processing, and (ii) Trimble eCognition Developer NPO v10.4 licence for object-based image analysis. Delivery to the Forestry Research Centre, Sandakan; vendor must provide activation, configuration and troubleshooting support for 12 months. Detailed functional and training requirements are in 05_Spesifikasi.pdf.",
  "category": "Software / Remote-Sensing GIS",
  "location": "Sabah (primary service at Sandakan; work covers all listed districts)",
  "budget": "RM 280,000.00 (indicative)",
  "closingDate": "2025-07-04T12:00:00Z",
  "publishedDate": "2025-06-27T12:00:00Z",
  "tenderId": "QT250000000018131",
  "requirements": [
    "Supplier status: Open; MoF field code 210104 (ICT → Software / System Dev / Maintenance)",
    "Offer validity: 90 days (until 2025-10-02)",
    "Delivery & service address: Forestry Research Centre, Sepilok, Sandakan (see 03_Delivery_Address.pdf)",
    "Provide ENVI + IDL v11.4 and eCognition Developer v10.4 licences incl. one-day technical training (05_Spesifikasi.pdf)",
    "Complete Technical & Financial compliance checklists (06_ & 07_) ",
    "Adhere to General & Special Conditions (04_Syarat_Syarat_Am_…).",
    "PROTÉGÉ-RTW programme encouraged if contract exceeds threshold (see draft SST letter 08_)."
  ],
  "status": "active",
  "tags": ["Software", "Biometrics", "Forestry", "GIS"],
  "isFeatured": false,
  documents: [
      // NOTE: Update size: 0 with actual file sizes in bytes for all documents
      { name: "01_Kenyataan_Tawaran_Pembekal (1).pdf",  path: "scraper/QT250000000018131/01_Kenyataan_Tawaran_Pembekal (1).pdf",  size: 500039, mimeType: "application/pdf" },
      { name: "02_Sampel_Surat_Akuan_Pembida (1).pdf",  path: "scraper/QT250000000018131/02_Sampel_Surat_Akuan_Pembida (1).pdf",  size: 87964, mimeType: "application/pdf" },
      { name: "03_Delivery_Address.pdf",                path: "scraper/QT250000000018131/03_Delivery_Address.pdf",                size: 54096, mimeType: "application/pdf" },
      { name: "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", path: "scraper/QT250000000018131/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", size: 7560, mimeType: "application/pdf" },
      { name: "05_Spesifikasi.pdf",                     path: "scraper/QT250000000018131/05_Spesifikasi.pdf",                     size: 63851, mimeType: "application/pdf" },
      { name: "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", path: "scraper/QT250000000018131/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", size: 54088, mimeType: "application/pdf" },
      { name: "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", path: "scraper/QT250000000018131/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", size: 61325, mimeType: "application/pdf" },
      { name: "08_Sampel_Surat_Setuju_Terima.pdf",      path: "scraper/QT250000000018131/08_Sampel_Surat_Setuju_Terima.pdf",      size: 152732, mimeType: "application/pdf" },
      { name: "SUPPLY SUPPORT SOFTWARE.docx",           path: "scraper/QT250000000018131/SUPPLY SUPPORT SOFTWARE.docx",           size: 16582, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
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
              user_id: process.env.SUPABASE_SEED_USER_ID, // should be set to the UUID of an authenticated user.
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

