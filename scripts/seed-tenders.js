const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('[Seed Script] Script started.'); // ADD THIS LINE

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log(`[Seed Script] SUPABASE_URL: ${supabaseUrl ? 'Loaded' : 'NOT LOADED'}`); // ADD THIS LINE
console.log(`[Seed Script] SUPABASE_SERVICE_ROLE_KEY: ${serviceRoleKey ? 'Loaded' : 'NOT LOADED'}`); // ADD THIS LINE

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
  "description": "AADK seeks a certified catering contractor to provide, for 24 consecutive months (Aug 2025 → Jul 2027), four Halal-compliant meals per day (breakfast, lunch, tea, dinner) to an average of 71 detainees at the Kampung Selamat Reman Detention Centre, Penang.  The provider must: (1) develop, cook, package and deliver the 7-day rotating menus stipulated in ‘06_Spesifikasi.pdf’ (e.g., nasi lemak Fridays, full rice–protein–vegetable sets at lunch, hot beverages and biscuits for tea); (2) meet the exact gram-weight portions, calorie targets and beverage volumes per meal; (3) observe all Islamic dietary laws, Malaysian food-safety regulations and AADK security protocols; (4) furnish all raw ingredients, cooking gas, labour, PPE, transport and on-site supervisors; (5) deliver on the 24 monthly dates listed in ‘03_Jadual_Kekerapan.pdf’; (6) maintain kitchen hygiene, temperature logs, pest control and waste-handling records for audit; (7) provide replacement meals within 60 minutes if any delivery is rejected; (8) absorb ePerolehan service fees and comply with all General & Special Conditions (‘05_…pdf’) including insurance, price-fixing prohibitions and integrity clauses; (9) post a performance bond (2.5 %–5 % of contract value) and participate in the PROTÉGÉ-RTW youth-placement programme if triggered.  Total indicative price: RM 779,580 for the 24-month contract, with payments made monthly against verified meal counts.",
  "category": "Food & Catering Services",
  "location": "Penang, Malaysia",
  "budget": "RM 779,580.00 (departmental indicative price)",
  "closingDate": "2025-07-04T12:00:00Z",
  "publishedDate": "2025-06-13T12:00:00Z",
  "tenderId": "QT250000000013773",
  "requirements": [
    "Contract duration: 24 months (Aug 2025 → Jul 2027) – see 03_Jadual_Kekerapan.pdf",
    "Daily meal count: 71 detainees × 4 meals = 284 portions/day (≈ 8,544/month)",
    "Menu: follow full 7-day cycle and gram-weight portions in 06_Spesifikasi.pdf for breakfast, lunch, tea, dinner",
    "Halal certification for kitchen, suppliers and all ingredients",
    "Field code 040103 – FOOD, BEVERAGES AND RAW MATERIALS → Islamic cooked food (01_Kenyataan_Tawaran_Pembekal.pdf)",
    "Supplier status: Open – all Malaysian states eligible",
    "Offer validity: 180 days (expires 31 Dec 2025)",
    "Price inclusive of packaging, transport, labour, ePerolehan 0.4 % service fee (05_Syarat_Syarat_Am_…pdf §12)",
    "Security & delivery protocol: sealed containers, vehicle search on entry, service supervisor must sign gate log (06_Spesifikasi.pdf §8)",
    "Food-safety & hygiene: kitchen temp ≤ 7 °C chilled, ≥ 75 °C hot-hold, monthly pest-control certificate (06_Spesifikasi.pdf §10)",
    "Replacement meals must arrive within 60 min if rejected (06_Spesifikasi.pdf §12)",
    "Performance bond: 2.5 % (RM200k–RM500k) or 5 % (> RM500k) of contract value – 05_Syarat_Syarat_Am_…pdf §18",
    "Technical checklist documents to upload – 07_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf",
    "Financial checklist documents to upload – 08_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf (bank statements, TCC, audited accounts)",
    "Signed Bidder Integrity Declaration – 02_Sampel_Surat_Akuan_Pembida.pdf",
    "PROTÉGÉ-RTW programme declaration if contract above threshold – 05_Syarat_Syarat_Am_…pdf §13",
    "No company name / pricing in technical uploads (05_Syarat_Syarat_Am_…pdf §1.2)",
    "Payment terms: monthly invoices via ePerolehan; 0.4 % service fee applies",
    "Liquidated damages: 2 % × (days late/30) × contract value for late deliveries (05_Syarat_Syarat_Am_…pdf §5)",
    "Contract governed by Malaysian law; disputes under Malaysian courts (§20)",
    "Contact person for queries: Farah Nadilah Binti Rahmat, AADK, farah.nadilah@aadk.gov.my (ISLAMIC_COOKED_FOOD_DOCX)"
  ],
  "status": "active",
  "tags": ["Halal Catering", "Detention Centre", "Government Tender"],
  "isFeatured": false,
  "documents": [
      { "name": "01_Kenyataan_Tawaran_Pembekal (1).pdf", "path": "scraper/QT250000000013773/01_Kenyataan_Tawaran_Pembekal (1).pdf", "size": 492229, "mimeType": "application/pdf" },
      { "name": "02_Sampel_Surat_Akuan_Pembida (1).pdf", "path": "scraper/QT250000000013773/02_Sampel_Surat_Akuan_Pembida (1).pdf", "size": 88202, "mimeType": "application/pdf" },
      { "name": "03_Jadual_Kekerapan.pdf", "path": "scraper/QT250000000013773/03_Jadual_Kekerapan.pdf", "size": 64267, "mimeType": "application/pdf" },
      { "name": "05_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "path": "scraper/QT250000000013773/05_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "size": 40302, "mimeType": "application/pdf" },
      { "name": "06_Spesifikasi.pdf", "path": "scraper/QT250000000013773/06_Spesifikasi.pdf", "size": 73220, "mimeType": "application/pdf" },
      { "name": "07_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "path": "scraper/QT250000000013773/07_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "size": 50007, "mimeType": "application/pdf" },
      { "name": "08_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "path": "scraper/QT250000000013773/08_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "size": 63795, "mimeType": "application/pdf" },
      { "name": "09_Sampel_Surat_Setuju_Terima.pdf", "path": "scraper/QT250000000013773/09_Sampel_Surat_Setuju_Terima.pdf", "size": 152928, "mimeType": "application/pdf" },
      { "name": "10_9_MAKLUMAT_HARGA_DAN_PEMARKAHAN_PENILAIAN_TENDER_AADK_PULAU_PINANG_FINAL.pdf", "path": "scraper/QT250000000013773/10_9_MAKLUMAT_HARGA_DAN_PEMARKAHAN_PENILAIAN_TENDER_AADK_PULAU_PINANG_FINAL.pdf", "size": 25206, "mimeType": "application/pdf" },
      { "name": "ISLAMIC COOKED FOOD PREPARATION AND SUPPLY SERVICES TO DETENTIONS.docx", "path": "scraper/QT250000000013773/ISLAMIC COOKED FOOD PREPARATION AND SUPPLY SERVICES TO DETENTIONS.docx", "size": 15076, "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
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
  "description": "The Kota Setar / Pendang District Dental Health Office requests a **seven-day open quotation** to supply, deliver, install, test, commission **two complete Dental Technologist (lab) workstations** for the Oral & Maxillofacial Surgery (OMF) Specialist Clinic, Hospital Sultanah Bahiyah, Alor Setar, Kedah.  \n\n**Equipment & configuration**  \n• **Single-station workbench** (2 units) – 140 × 60 × 80–85 cm, 103 kg, 220 V 50 Hz, 500 W, airflow ≥ 175 m³ h⁻¹, noise ≤ 65 dB, vacuum pressure –16 kPa.  \n• Integrated components per station: high-density fire-resistant desktop, stainless side-plate, magnifying-lamp, complete steel shelving, drawer locker, air-gun, forearm support, tempered-glass dust hood, dust collector, aux dust assistant, suction assembly, three reusable trays.  \n• **Accessories**:  \n  – NSK ULTIMATE XL Lab Micromotor (230 V, 6 N·cm, digital display, low-noise)  \n  – Wax pot, induction (no-flame) burner  \n  – Ergonomic chair (adjustable, medical-grade vinyl)  \n  – SWAN DR-115 oil-less compressor with **JKKP pressure-vessel certificate**  \n  – Dental-lab instrument kit (adam plier, Lecron carver, wax knife, shears)  \n• **Warranty**: one (1) year on parts & labour from commissioning date.  \n• **Services**: door-to-door delivery; on-site installation, testing & calibration; operator + technician training; hand-over of manuals, warranty cards, MDA product dossier and preventive-maintenance schedule.  \n\n**Contract highlights**  \n• Indicative ceiling **RM 90 000.00**; subject to 0.8 % ePerolehan fee (max RM 9 600).  \n• Completion within **8 weeks** from SST; single-lot award, no partial bids.  \n• Goods must be new, genuine, medical-device compliant and supported by the manufacturer; CIF door-to-door pricing in RM.  \n• Quotation validity **90 days** (until 1 Oct 2025).  \n• Project underpins MOH’s 2025 upgrade of dental-prosthetics capability for OMF trauma and oncology cases in northern Malaysia.",
  "category": "Healthcare Equipment",
  "location": "Alor Setar, Kedah (clinic delivery) – but open to suppliers in Johor, Kedah, Melaka, Negeri Sembilan, Perak, Perlis, Pulau Pinang, Selangor, WP Kuala Lumpur & WP Putrajaya",
  "budget": "RM 90,000.00 (indicative ceiling)",
  "closingDate": "2025-07-03T12:00:00Z",
  "publishedDate": "2025-06-26T12:00:00Z",
  "tenderId": "QT250000000021042",
  "requirements": [
    "Procurement method: Open quotation via ePerolehan, reference QT250000000021042 (01_Kenyataan_Tawaran_Pembekal.pdf)",
    "Supplier status: Bumiputera (‘Native people’) eligibility required",
    "Field code 050102 – Hospital, Medical, Drugs & Pharmaceutical Equipment → Medical Equipment / Supplies",
    "Locality eligibility: Johor, Kedah, Melaka, Negeri Sembilan, Perak, Perlis, Pulau Pinang, Selangor, WP Kuala Lumpur, WP Putrajaya",
    "Offer validity: 90 days (expires 01 Oct 2025)",
    "Total indicative price must not exceed RM 90 000 and must include 0.8 % ePerolehan fee",
    "Delivery & service address: OMF Specialist Clinic, Hospital Sultanah Bahiyah, Km 6 Jalan Langgar, 05460 Alor Setar, Kedah (03_Delivery_Address.pdf)",
    "Supply two single-station Dental Technologist workbenches with full accessories as specified in 05_Spesifikasi.pdf (dimensions, airflow, suction, micromotor, compressor JKKP certified, ergonomic chair, lab tool kit)",
    "Goods must be new, genuine, medical-device compliant; include manuals, warranty cards and MDA product registration",
    "One-year on-site warranty covering manufacturing defects; supplier bears all expenses for warranty service",
    "Provide on-site installation, calibration, functional testing and commissioning; submit commissioning report to PTJ within 7 days",
    "Provide operator & technician training (usage, maintenance, safety) immediately after commissioning; training certificates to be issued",
    "Upload the following in Technical Compliance Checklist (06_Senarai_Semak_Teknikal.pdf): product brochures, NSK micromotor datasheet, Wax pot spec, compressor JKKP certificate, MDA establishment licence, training syllabus",
    "Upload the following in Financial Compliance Checklist (07_Senarai_Semak_Kewangan.pdf): 3-month bank statements, Company-info declaration, Tax Compliance Certificate, Beneficial Owner declaration, Anti-Trafficking & Forced-Labour affidavit, MOF registration cert",
    "Sign and upload Bidder Integrity Declaration (02_Sampel_Surat_Akuan_Pembida.pdf)",
    "Comply with General & Special Conditions (04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf): goods must be new; price fixed for 90 days; CIF door-to-door; Malaysian-law jurisdiction; single offer per supplier; documents classified SULIT",
    "Liquidated damages for late delivery: 2 % × (days / 30) × contract value (04_Syarat §9)",
    "No company or price data allowed in technical uploads (04_Syarat §2.2 (d))",
    "Performance Bond not required (contract value below RM 200 000)",
    "Programme PROTÉGÉ-RTW encouraged if contract exceeds threshold (08_Sampel_SST.pdf §6)",
    "Payment terms: net 30 days after acceptance; invoicing via ePerolehan",
    "Contact officer: Sharifah Nur Farhana Syed Abd Malek (+6 04-731 0824, s.nurfarhana@moh.gov.my) – Dental_Technologist_Workstation.docx"
  ],
  "status": "active",
  "tags": ["Dental", "Medical Equipment", "Kedah"],
  "isFeatured": false,
  "documents": [
      { "name": "01_Kenyataan_Tawaran_Pembekal (1).pdf", "path": "scraper/QT250000000021042/01_Kenyataan_Tawaran_Pembekal (1).pdf", "size": 492229, "mimeType": "application/pdf" },
      { "name": "02_Sampel_Surat_Akuan_Pembida (1).pdf", "path": "scraper/QT250000000021042/02_Sampel_Surat_Akuan_Pembida (1).pdf", "size": 88202, "mimeType": "application/pdf" },
      { "name": "03_Delivery_Address.pdf", "path": "scraper/QT250000000021042/03_Delivery_Address.pdf", "size": 64267, "mimeType": "application/pdf" },
      { "name": "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "path": "scraper/QT250000000021042/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "size": 40302, "mimeType": "application/pdf" },
      { "name": "05_Spesifikasi.pdf", "path": "scraper/QT250000000021042/05_Spesifikasi.pdf", "size": 73220, "mimeType": "application/pdf" },
      { "name": "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "path": "scraper/QT250000000021042/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "size": 50007, "mimeType": "application/pdf" },
      { "name": "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "path": "scraper/QT250000000021042/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "size": 63795, "mimeType": "application/pdf" },
      { "name": "08_Sampel_Surat_Setuju_Terima.pdf", "path": "scraper/QT250000000021042/08_Sampel_Surat_Setuju_Terima.pdf", "size": 152928, "mimeType": "application/pdf" },
      { "name": "Dental Technologist Workstation.docx", "path": "scraper/QT250000000021042/Dental Technologist Workstation.docx", "size": 15076, "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
  ]
},

  // tender #4
{
  "title": "SEBUT HARGA MEMBEKAL, MENGHANTAR, MEMASANG, MENGUJI GUNA DAN MENTAULIAH PERALATAN BENGKEL ASAS PASTRI BAGI KEMAHIRAN VOKASIONAL SPESIFIK (KVS) PROGRAM PENDIDIKAN KHAS INTEGRASI KE SEKOLAH MENENGAH DI BAWAH JPN TERENGGANU TAHUN 2025",
  "agency": "TERENGGANU STATE EDUCATION DEPARTMENT – MINISTRY OF EDUCATION",
  "description": "Seven-day open quotation for a **turn-key fit-out of pastry-training workshops** in Special Education (PPKI) secondary schools across Terengganu.  The contractor must **supply, door-to-door deliver, install, function-test, commission and hand-over** a mixed lot of **55 separate bakery / kitchen appliances** and accessories, then train teachers on safe operation.  \n\n**Scope of supply (full specs in 05_Spesifikasi.pdf)**  \n• **Heavy-duty 5 L mixers × 24** with non-stick bowls + matching 5 L stainless bowls × 24.  \n• **Industrial open-stand 4-burner stoves × 17** (BERJAYA OB4FS-17 or equivalent, 80 000 Btu).  \n• **Pastry-line chillers**: tabletop glass cake showcase × 2, 4-ft cake chiller × 1, single-door display chiller × 1, two-door display chiller × 2, upright freezer 570 L × 3.  \n• **Cooking / baking appliances**: electric ovens 68 L × 5, two-layer four-tray industrial ovens × 2, microwave ovens 32 L × 2, rice cookers 1 L × 18.  \n• **Food-processing machines**: 2 L heavy-duty blenders × 26, double waffle makers × 11, waffle-stick machine × 1, pancake maker × 1, double-boiler SS × 10, chocolate melter × 1, heavy-duty band sealer × 3, cake-cream spreader × 2, 35 L water boilers × 3, gas steamer × 1, electric insect killer × 1.  \n• **Services**: on-site installation at each school; functional testing & commissioning report; **user & preventive-maintenance training** for teachers; one-year on-site warranty; supply of operating manuals and spare-parts catalogue.  \n• Goods must be **new, original, fully compliant** with the technical data (power ratings, capacities, dimensions) and delivered **CIF door-to-door** to the addresses in 03_Delivery_Address.pdf within eight weeks of SST.  \n• Indicative contract value **RM 210 212.00** inclusive of 0.8 % ePerolehan fee; quotation validity 90 days (to 04 Oct 2025).  \n• Project supports MOE’s 2025 Special-Education Vocational Pastry Skills (KVS) rollout; single-lot award (no partial bids) but suppliers may quote equivalent products provided full spec compliance is proven.",
  "category": "Technical & Vocational Equipment",
  "location": "Terengganu (primary) • Kelantan • Pahang • Selangor • WP Kuala Lumpur",
  "budget": "RM 210,212.00 (total indicative price)",
  "closingDate": "2025-07-06T12:00:00Z",
  "publishedDate": "2025-06-29T12:00:00Z",
  "tenderId": "QT250000000021826",
  "requirements": [
    "Procurement method: Open quotation via ePerolehan (01_Kenyataan_Tawaran_Pembekal.pdf)",
    "Ad duration: 7 days; quotation window 29 Jun → 6 Jul 2025, 12:00 PM",
    "Supplier status: Open (all Malaysian states listed under Locality)",
    "Field codes: 020301 (Electrical/Electronic Equipment) & 020401 (Domestic Appliances)",
    "Offer validity: 90 days (until 04 Oct 2025) – no price escalation allowed",
    "Total indicative price must include 0.8 % ePerolehan fee, capped RM 9 600 per invoice",
    "Single quotation per supplier; alternative bids not permitted",
    "Delivery & installation addresses: JPN Terengganu HQ Jalan Bukit Kecil + individual schools per Jadual Pematuhan Spesifikasi (03_Delivery_Address.pdf)",
    "Supply quantities & detailed specs for 22 equipment lines as listed in 05_Spesifikasi.pdf (mixers, chillers, ovens, blenders, waffle makers, rice cookers, etc.) – exact power ratings, capacities, dimensions, materials",
    "Goods must be new, genuine, CE/IEC-compliant where applicable; stainless-steel bodies for food-contact equipment",
    "Provide installation, functional test, commissioning certificate and user training; submit commissioning report within 7 days",
    "One-year on-site warranty on parts & labour; supplier to respond within 48 h of breakdown report",
    "Upload Technical Compliance Checklist (06_Senarai_Semak_Teknikal.pdf): product brochures, spec sheet, brand & model evidence, compliance table",
    "Upload Financial Compliance Checklist (07_Senarai_Semak_Kewangan.pdf): 3-month bank statements, TCC, SSM & MOF certs, beneficial-owner declaration, anti-trafficking affidavit",
    "Sign Bidder Integrity Declaration (02_Sampel_Surat_Akuan_Pembida.pdf) – no bribery, no bid-rigging; offences under MACC Act & Competition Act highlighted",
    "Comply with General & Special Conditions (04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf): goods must be new; 90-day price validity; CIF door-to-door; Malaysian-law jurisdiction; documents classified SULIT",
    "Partial delivery allowed by item but award is single lot; equivalent brands accepted if spec-compliant and accompanied by brochures",
    "Liquidated damages: 2 % × (days/30) × contract value for late delivery (04_Syarat §9)",
    "Performance bond: Not applicable (contract below RM 200 000 threshold)",
    "PROTÉGÉ-RTW programme encouraged if final contract exceeds PP/PK 1.12 threshold (08_Sampel_SST.pdf)",
    "Payment terms: net 30 days after acceptance via ePerolehan; all invoices in RM"
  ],
  "status": "active",
  "tags": ["Vocational", "Bakery Equipment", "Special Education"],
  "isFeatured": false,
  "documents": [
    { "name": "01_Kenyataan_Tawaran_Pembekal (1).pdf",  "path": "scraper/QT250000000021826/01_Kenyataan_Tawaran_Pembekal (1).pdf",  "size": 0, "mimeType": "application/pdf" },
    { "name": "02_Sampel_Surat_Akuan_Pembida (1).pdf",  "path": "scraper/QT250000000021826/02_Sampel_Surat_Akuan_Pembida (1).pdf",  "size": 0, "mimeType": "application/pdf" },
    { "name": "03_Delivery_Address.pdf",                "path": "scraper/QT250000000021826/03_Delivery_Address.pdf",                "size": 0, "mimeType": "application/pdf" },
    { "name": "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "path": "scraper/QT250000000021826/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "size": 0, "mimeType": "application/pdf" },
    { "name": "05_Spesifikasi.pdf",                     "path": "scraper/QT250000000021826/05_Spesifikasi.pdf",                     "size": 0, "mimeType": "application/pdf" },
    { "name": "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "path": "scraper/QT250000000021826/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "size": 0, "mimeType": "application/pdf" },
    { "name": "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "path": "scraper/QT250000000021826/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "size": 0, "mimeType": "application/pdf" },
    { "name": "08_Sampel_Surat_Setuju_Terima.pdf",      "path": "scraper/QT250000000021826/08_Sampel_Surat_Setuju_Terima.pdf",      "size": 0, "mimeType": "application/pdf" },
    { "name": "QUOTATION FOR SUPPLY, DELIVERY, INSTALLATION, TESTING AND COMMISSIONING OF EQUIPMENT FOR BAKERY WORKSHOPS AND SEQUENCE WORKSHOPS.docx", "path": "scraper/QT250000000021826/QUOTATION FOR SUPPLY, DELIVERY, INSTALLATION, TESTING AND COMMISSIONING OF EQUIPMENT FOR BAKERY WORKSHOPS AND SEQUENCE WORKSHOPS.docx", "size": 0, "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
  ]
},

// tender #5
{
  "title": "SUPPLY, DELIVERY, TESTING AND COMMISSIONING ONE (1) PORTABLE RADIONUCLIDE DETECTOR – SH.82/2025",
  "agency": "MINISTRY OF SCIENCE, TECHNOLOGY AND INNOVATION – Malaysian Nuclear Agency",
  "description": "The Malaysian Nuclear Agency (BKS Division, Bangi) invites an open quotation to supply, deliver, install, test, commission and warranty one (1) fully-featured handheld Radionuclide Identification Device (RID). The contract is door-to-door, CIF Bangi, and must be completed within 3 months of an official Purchase Order.  \n\n**Operational purpose** – field identification and dose-rate monitoring of gamma and neutron sources for homeland-security, laboratory and border-control tasks.  \n\n**Core hardware** – scintillation NaI(Tl) gamma detector plus ZnS neutron detector integrated in a single IP67-rated handheld unit ≤ 2 kg, powered by long-life rechargeable batteries, with a rugged waterproof/shockproof carry case.  The detector must cover 25 keV–3 MeV, ≥ 1610 cps / Sv h gamma sensitivity (Cs-137), neutron sensitivity 4 cps / n v, ≥ 1024-channel spectrum, 7 % FWHM @ 662 keV, real-time linearisation, ANSI N42.34 nuclide library (SNM, IND, MED, NORM) and library update facility.  Built-in GPS & BLE 5.0, dual USB-C, ≥ 8 GB internal memory, Windows 11 data-acquisition compatibility, real-time dose & spectral display readable through polarised glasses.  \n\n**Environment & safety** – operate –30 °C … 60 °C, 10 – 93 % RH, storage –10 °C … 35 °C; include all PPE, site‐specific Job Safety Analysis and compliance with OSHA & Akta 304 radiation regulations.  \n\n**Scope of supply & services** – packaging, freight, insurance, customs, unloading, placement, installation, IQ/OQ/PQ, functional tests witnessed by Agency staff, calibration certificates traceable to national/ISO standards, three (3) hard-copy + soft-copy manuals, one-day on-site operator & maintenance training for five personnel, one-year comprehensive warranty with scheduled preventive maintenance, < 1-month spare-parts availability and five-year after-sales support commitment letter.  \n\n**Commercial terms** – indicative contract ceiling RM 150 000.00; price must absorb ePerolehan 0.8 % service fee, all taxes/duties, and insurance.  Payment on successful commissioning.  Failure to meet schedule incurs LAD 2 % × (days / 30) × contract value; quality shortfalls incur 1 % per 7 days (max 5 %).  Performance Bond 2.5 % (RM 200 k–500 k) / 5 % (> RM 500 k) valid to 12 months after contract end.  Participation in PROTÉGÉ-RTW strongly encouraged.  All bids valid 90 days; one offer per supplier; no company or price data may appear in technical uploads; compliance checklists and integrity declarations are mandatory.",
  "category": "Scientific Instrumentation",
  "location": "Kajang, Selangor (delivery) – open nationwide to suppliers",
  "budget": "RM 150 000.00 (indicative)",
  "closingDate": "2025-07-02T12:00:00Z",
  "publishedDate": "2025-06-25T12:00:00Z",
  "tenderId": "QT250000000017045",
  "requirements": [
    "Procurement method: Open quotation via ePerolehan; reference QT250000000017045",
    "Field code 120502 – Defence & Security → Monitoring and Detection Equipment",
    "Supplier status: Open to all Malaysian-registered companies with MoF code 120502",
    "Offer validity: 90 days (until 30 Sep 2025)",
    "Delivery address: BKS, Block 13, Malaysian Nuclear Agency, 43000 Bangi, Selangor (03_Delivery_Address.pdf)",
    "Completion timeframe: full delivery, installation & commissioning within 3 months of PO",
    "Detector specifications (05_Spesifikasi.pdf): NaI(Tl) gamma + ZnS neutron; 25 keV–3 MeV; ≥ 1610 cps / Sv h; 7 % FWHM @ 662 keV; IP67 housing; ≤ 2 kg; ≥ 8 GB storage; BLE 5.0; dual USB-C; ANSI N42.34 library",
    "Accessories: ≥ 2 rechargeable batteries, USB-C serial adapter, 12 V power adapter, rugged waterproof case",
    "Environmental operation: –30 °C … 60 °C; 10 – 93 % RH; storage –10 °C … 35 °C",
    "Included services: door-to-door freight & insurance, unpacking, placement, IQ/OQ/PQ, calibration certificates traceable to NMIM/ISO, one-day on-site training for 5 staff, schedule of preventive maintenance in warranty period",
    "Warranty: ≥ 1 year parts & labour; free service visits; declaration of spare-parts stock (< 1-month lead time)",
    "After-sales support: letter guaranteeing service/spares availability ≥ 5 years; local trained service team credentials required",
    "Manuals: three printed sets + 1 USB flash drive containing install, operation, service manuals in BM/English",
    "Compliance: Akta Tenaga Atom 1984 licence for radioactive sources (if any); Strategic Trade Act 2010 export control; OSHA safety training for contractor staff",
    "Financial checklist uploads (07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf): 3-month bank statements, TCC, beneficial-owner declaration, anti-trafficking affidavit",
    "Technical checklist uploads (06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf): brochures, spec-conformance tables, calibration certificates",
    "Bidder Integrity Declaration to be signed (02_Sampel_Surat_Akuan_Pembida.pdf)",
    "General & Special Conditions (04_Syarat_Syarat_Am_…). key clauses: goods must be new; prices inclusive CIF & eP 0.8 % fee; 90-day price fix; one quotation only; Malaysia law applies",
    "Additional Terms (09_8_Syarat-syarat_Tambahan.pdf): performance bond 2.5 %/5 %; liquidated damages 2 % formula; technical docs must omit price/company info; PROTÉGÉ participation encouraged; ICP not applicable",
    "Payment terms: net 30 days post-acceptance via ePerolehan; invoices subject to 0.8 % fee cap RM 9 600",
    "No alternate or partial bids; equivalent items acceptable if full spec compliance proven",
    "Contact officers for clarification: Hasbi Hussein Bin Sulkifli / Rafidah Binti Omar, Malaysian Nuclear Agency (03-8911 2000, hasbi@nm.gov.my / rafidah_o@nm.gov.my)",
    "Contract governed by Malaysian law; disputes under Malaysian courts"
  ],
  "status": "active",
  "tags": ["Radiation Detection", "Security Equipment", "Science"],
  "isFeatured": false,
  "documents": [
      { "name": "01_Kenyataan_Tawaran_Pembekal (1).pdf", "path": "scraper/QT250000000017045/01_Kenyataan_Tawaran_Pembekal (1).pdf", "size": 492229, "mimeType": "application/pdf" },
      { "name": "02_Sampel_Surat_Akuan_Pembida (1).pdf", "path": "scraper/QT250000000017045/02_Sampel_Surat_Akuan_Pembida (1).pdf", "size": 88202, "mimeType": "application/pdf" },
      { "name": "03_Delivery_Address.pdf", "path": "scraper/QT250000000017045/03_Delivery_Address.pdf", "size": 64267, "mimeType": "application/pdf" },
      { "name": "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "path": "scraper/QT250000000017045/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "size": 40302, "mimeType": "application/pdf" },
      { "name": "05_Spesifikasi.pdf", "path": "scraper/QT250000000017045/05_Spesifikasi.pdf", "size": 73220, "mimeType": "application/pdf" },
      { "name": "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "path": "scraper/QT250000000017045/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "size": 50007, "mimeType": "application/pdf" },
      { "name": "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "path": "scraper/QT250000000017045/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "size": 63795, "mimeType": "application/pdf" },
      { "name": "08_Sampel_Surat_Setuju_Terima.pdf", "path": "scraper/QT250000000017045/08_Sampel_Surat_Setuju_Terima.pdf", "size": 152928, "mimeType": "application/pdf" },
      { "name": "09_8_Syarat-syarat_Tambahan.pdf", "path": "scraper/QT250000000017045/09_8_Syarat-syarat_Tambahan.pdf", "size": 25206, "mimeType": "application/pdf" },
      { "name": "Portable Radionuclide Detector.docx", "path": "scraper/QT250000000017045/Portable Radionuclide Detector.docx", "size": 15076, "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
  ]
},

// tender #6
{
  "title": "WEB APPLICATION FIREWALL (WAF) SERVICE FOR A PERIOD OF THREE (3) YEARS AT THE HEADQUARTERS OF THE FIRE AND RESCUE DEPARTMENT OF MALAYSIA (JBPM) 2025-2028",
  "agency": "FIRE AND RESCUE DEPARTMENT OF MALAYSIA (JBPM) – MINISTRY OF LOCAL GOVERNMENT DEVELOPMENT",
  "description": "JBPM seeks an open-quotation supplier to provide a **three-year managed Web Application Firewall (WAF) and Web-Application-&-API-Protection (WAAP) service** for its headquarters data-centre in Putrajaya.  The winning bidder must:\n\n• **Supply & deploy two (2) virtual WAAP appliances** (1 Gbps throughput each, 8 vCPU | 16 GB RAM | 100 GB HDD) plus **one (1) Analyzer V2 reporting VM** (4 vCPU | 8 GB RAM | 500 GB HDD).  \n• Configure high-availability in **active-standby *and* active-active** modes; integrate SSL off-load, load-balancing, caching, compression and QoS.  \n• Ensure full coverage of **OWASP Top-10 & OWASP API Top-10** threats; include URL/server cloaking, captcha/JS challenges, smart selector traffic sorting, mTLS, API token auth, JSON field inspection, rate-limiting, and dynamic application proxy.  \n• Support private-cloud hypervisors (VMware, KVM, Xen, OpenStack, HCI) *and* public clouds (AWS, Azure, NHN) with IPv6 management & SSL off-load.  \n• Deliver a complete **professional-services work-package**: design, migration, configuration, integration, UAT, commissioning and detailed documentation **within eight (8) weeks** of SST.  \n• Provide **24 × 7 help-desk**, remote & telephone support, on-site preventive maintenance **every 6 months**, firmware/OS patching, and change-request assistance for the full contract term.  \n• Conduct a **3-day technical training course for five (5) JBPM officers** outside Putrajaya/Klang Valley; supply training manuals and issue certificates.  \n• Guarantee appliance performance (2048-bit RSA decrypt), real-time monitoring, SNMP/syslog export, email alerting, centralised log analytics and visual reports (traffic, system, bandwidth, DB, availability).  \n\nContract value is capped at **RM 167 600.00** and includes the 0.4 % ePerolehan fee.  The solution underpins JBPM’s 2025-2028 cybersecurity hardening roadmap, protecting mission-critical public-safety applications and APIs that serve nationwide fire-and-rescue operations.",
  "category": "IT Security / Cybersecurity",
  "location": "Putrajaya (primary installation) • Selangor • Kuala Lumpur",
  "budget": "RM 167,600.00 (indicative ceiling price)",
  "closingDate": "2025-07-09T12:00:00Z",
  "publishedDate": "2025-06-25T12:00:00Z",
  "tenderId": "QT250000000019695",
  "requirements": [
    "Procurement reference QT250000000019695 – Web Application Firewall service, 3 years (01_Kenyataan_Tawaran_Pembekal.pdf)",
    "Procurement method: Open quotation; one offer per supplier; no alternative bids (04_Syarat_Syarat_Am_§2.2)",
    "Offer validity: 90 days (valid until 2025-10-07)",
    "Supplier status: Open; MoF field codes 210104 (Software/System Dev & Maintenance) and 210107 (ICT Security & Firewall, Encryption, PKI, Anti-Virus)",
    "Locality eligibility: Selangor, WP Kuala Lumpur, WP Putrajaya",
    "Total indicative price must not exceed RM 167 600; includes 0.4 % ePerolehan fee (cap RM 4 800 per invoice)",
    "Delivery & service address: IT Branch, 4th Floor HQ JBPM, Lebuh Wawasan, Presint 7, 62250 Putrajaya (03_Delivery_Address.pdf)",
    "Provide two WAAP virtual appliances @ ≥1 Gbps each; Analyzer V2 central reporting VM (05_Spesifikasi.pdf)",
    "Virtual appliances must run on QEMU/KVM, VMware, Xen, OpenStack & HCI; support public clouds AWS, Azure, NHN (05_Spesifikasi.pdf §6, 18–19)",
    "Core WAAP functions: full OWASP Top-10 + API Top-10, request/response checks, signature & behavioural learning, URL/server cloaking, JSON field tests, mTLS, CAPTCHA/JS auth (05_Spesifikasi.pdf §7-17)",
    "Traffic optimisation: smart selector, load-balancing, caching, compression, QoS, IP-, session- & URL-based DoS mitigation (05_Spesifikasi.pdf §20-25, 50-53)",
    "Security controls: SQLi, XSS, CSRF, command injection, buffer overflow, cookie & header protection, file-upload limits, privacy-leak blocking (05_Spesifikasi.pdf §25-55)",
    "Administrative features: web-GUI, auto-update, multi-config slots, SNMP, syslog, backup/restore, real-time monitoring, email alerts (05_Spesifikasi.pdf §57-76)",
    "High-availability: active-standby *and* active-active; seamless fail-over; secondary appliance activation assistance (05_Spesifikasi.pdf §68-69; support clause in §3 ‘Penyelenggaraan’)",
    "Professional services: design, configuration, migration, integration, testing, commissioning, detailed report; complete within 8 weeks of SST (05_Spesifikasi.pdf §1.1-1.6)",
    "Preventive maintenance: every 6 months; provide report each visit; patch firmware/OS promptly (05_Spesifikasi.pdf §3 ‘Khidmat Sokongan’)",
    "24 × 7 help-desk (remote/phone/email); SLA-driven resolution; on-call engineer for fail-over events (05_Spesifikasi.pdf §3)",
    "Training: 3-day technical course for ≥5 JBPM staff at location outside Putrajaya/Klang Valley; include manuals & certificates (05_Spesifikasi.pdf §4)",
    "Performance Bond: 2.5 % of contract value for contracts RM 200 k–≤RM 500 k (04_Syarat_Syarat_Am_§18)",
    "Liquidated damages for late delivery: 2 % × (days/30) × contract value (04_Syarat_Syarat_Am_§9)",
    "All goods/software must be new, genuine, licensed and supported; include warranty for entire 3-year term (04_Syarat_Syarat_Am_§1, 1.8-1.10)",
    "Technical compliance checklist items 1-7 must be uploaded with brochures, principal letter, project team, help-desk flow, implementation schedule (06_Senarai_Semak_Teknikal.pdf)",
    "Financial compliance checklist items 1-7: TCC, beneficial-owner declaration, bank letter, bidder declaration, company info, experience list (07_Senarai_Semak_Kewangan.pdf)",
    "Signed Bidder Integrity Declaration required (02_Sampel_Surat_Akuan_Pembida.pdf)",
    "Programme PROTÉGÉ-RTW encouraged if contract exceeds threshold; number of trainees calculated per PP/PK 1.12 (08_Sampel_SST.pdf §6)",
    "No company or price information allowed in technical uploads; all documents classified SULIT until award (04_Syarat_Syarat_Am_§2.2(d) & §6)",
    "Contract governed by Malaysian law; disputes under Malaysian courts (04_Syarat_Syarat_Am_§10)",
    "Payment terms: net 30 days after satisfactory commissioning and acceptance test",
    "Contact officers: Azyyati Zainal Abidin (+603-8892 7685), Sarah Hafizan Ismail (+603-8892 7688), TC Mohammad Husen Muzir (+603-8892 7885) — details in WEB_APPLICATION_FIREWALL_SERVICE.docx"
  ],
  "status": "active",
  "tags": ["Cybersecurity", "WAF", "Managed Service", "WAAP"],
  "isFeatured": false,
  "documents": [
      { "name": "01_Kenyataan_Tawaran_Pembekal (1).pdf", "path": "scraper/QT250000000019695/01_Kenyataan_Tawaran_Pembekal (1).pdf", "size": 492229, "mimeType": "application/pdf" },
      { "name": "02_Sampel_Surat_Akuan_Pembida (1).pdf", "path": "scraper/QT250000000019695/02_Sampel_Surat_Akuan_Pembida (1).pdf", "size": 88202, "mimeType": "application/pdf" },
      { "name": "03_Delivery_Address.pdf", "path": "scraper/QT250000000019695/03_Delivery_Address.pdf", "size": 64267, "mimeType": "application/pdf" },
      { "name": "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "path": "scraper/QT250000000019695/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "size": 40302, "mimeType": "application/pdf" },
      { "name": "05_Spesifikasi.pdf", "path": "scraper/QT250000000019695/05_Spesifikasi.pdf", "size": 73220, "mimeType": "application/pdf" },
      { "name": "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "path": "scraper/QT250000000019695/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "size": 50007, "mimeType": "application/pdf" },
      { "name": "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "path": "scraper/QT250000000019695/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "size": 63795, "mimeType": "application/pdf" },
      { "name": "08_Sampel_Surat_Setuju_Terima.pdf", "path": "scraper/QT250000000019695/08_Sampel_Surat_Setuju_Terima.pdf", "size": 152928, "mimeType": "application/pdf" },
      { "name": "WEB APPLICATION FIREWALL (WAF) SERVICE.docx", "path": "scraper/QT250000000019695/WEB APPLICATION FIREWALL (WAF) SERVICE.docx", "size": 15076, "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
  ]
},

// tender #7
{
  "title": "SUPPLY OF SUPPORT SOFTWARE FOR THE BIOMETRIC DEVELOPMENT PROGRAMME FOR LAND-USE AND FOREST CONSERVATION IN SABAH",
  "agency": "MINISTRY OF NATURAL RESOURCES AND NATURAL SUSTAINABILITY – Sabah Forestry Department",
  "description": "The Sabah Forestry Department (SFD) invites an open quotation to supply, license, deliver, install, configure and provide one-day online technical training for two high-end remote-sensing image-analysis software packages required by the State’s **Biometric Land-Use & Forest-Conservation Programme (BLFCP)**.  \n\n**Software to be supplied**  \n• **ENVI + IDL v11.4** – perpetual licence for pixel-based image processing, spectral un-mixing, atmospheric correction, and advanced GIS plug-ins.  \n• **Trimble eCognition Developer NPO v10.4** – perpetual licence for object-based image analysis (OBIA), rule-set scripting, and machine-learning classification.  \n\n**Scope of work**  \n1. Obtain and transfer original vendor licences to SFD; activate on two workstations and one floating network dongle.  \n2. Configure licence server, environment variables and START-up scripts; verify operation with SFD sample orthomosaic.  \n3. Provide **one-day live online technical training** (max 15 pax) covering orbital imagery pre-processing, land-cover classification workflows, change-detection and export to ArcGIS/QGIS.  \n4. Supply user & admin manuals (PDF + printed), rule-set templates, sample datasets, and a post-course quiz.  \n5. Deliver all items **CIF Forestry Research Centre, Sepilok, Sandakan** (door-to-door, customs-cleared).  \n6. Furnish 12-month e-mail & remote-desktop support, bug-fix patches, and free minor-version upgrades.  \n\n**Contract & commercial**  \n• Indicative ceiling price RM 280 000.00; supplier absorbs 0.4 % ePerolehan service fee.  \n• Performance Bond **2.5 %** of contract value (value range RM 200 k–≤RM 500 k) valid until 12 months after contract end.  \n• Completion: delivery + activation + training within **60 calendar days** of Purchase Order.  \n• Price validity **90 days**; one quotation per supplier; partial bids not accepted.  \n• Contract governed by Malaysian law; disputes under Malaysian courts.  \n\nThis procurement underpins SFD’s 2025-2030 plan to automate biomass estimation, REDD+ MRV reporting and illegal-logging alerts across 35 administrative districts listed in the invitation.  Successful implementation will enable faster land-use change mapping and transparent conservation reporting to the Federal government and international donors.",
  "category": "Software / Remote-Sensing GIS",
  "location": "Sabah (primary service at Sandakan; work covers all listed districts)",
  "budget": "RM 280,000.00 (indicative)",
  "closingDate": "2025-07-04T12:00:00Z",
  "publishedDate": "2025-06-27T12:00:00Z",
  "tenderId": "QT250000000018131",
  "requirements": [
    "Procurement method: Open quotation via ePerolehan – reference QT250000000018131 (01_Kenyataan_Tawaran_Pembekal.pdf)",
    "Supplier status: Open; MoF field code 210104 – ICT → Software / System Development / Customisation & Maintenance",
    "Offer validity: 90 days (expires 02 Oct 2025)",
    "Total indicative price ceiling: RM 280 000.00; quotation to include 0.4 % ePerolehan service fee (cap RM 4 800 per invoice)",
    "Delivery & service address: Forestry Research Centre, Batu 14 Jalan Sepilok, 90715 Sandakan, Sabah (03_Delivery_Address.pdf)",
    "Deliver, install and activate ENVI + IDL v11.4 (pixel-based) and Trimble eCognition Developer NPO v10.4 (object-based) on two PCs + 1 network dongle (05_Spesifikasi.pdf)",
    "Provide one-day live online technical training (max 15 participants) covering image pre-processing, OBIA rule-set building, spectral analysis, change detection and report generation (05_Spesifikasi.pdf)",
    "Supply printed & electronic manuals, licence files, training slides, sample rule-sets and datasets",
    "12-month post-installation e-mail and remote-desktop support; free minor-version upgrades",
    "Completion timeframe: delivery, activation and training within 60 calendar days of PO",
    "Performance Bond: 2.5 % of contract value (value range RM 200 k–≤RM 500 k) – General Conditions §18 (04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf)",
    "Technical compliance checklist (06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf) with detailed spec-by-spec affirmation and vendor datasheets must be uploaded",
    "Financial compliance checklist (07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf): 3-month bank statements, TCC, company‐owner declaration, anti-trafficking affidavit",
    "Signed Bidder Integrity Declaration (02_Sampel_Surat_Akuan_Pembida.pdf) mandatory",
    "General & Special Conditions (04_Syarat_Syarat_Am_…) apply: goods must be new; price fixed for validity period; CIF door-to-door; packaging & insurance included; Malaysian law jurisdiction",
    "No company or price information permitted in technical uploads (04_Syarat_Syarat_Am_ §1.2)",
    "Late delivery liquidated damages: 2 % × (days / 30) × contract value (04_Syarat_Syarat_Am_ §5)",
    "Programme PROTÉGÉ-RTW participation encouraged (08_Sampel_Surat_Setuju_Terima §6)",
    "Industrial Collaboration Programme (ICP) not applicable (contract below ICP threshold)",
    "Contact officers: Nadia Abdul Jalil (+6089-242 500, nadia.abduljalil@sabah.gov.my); Reuben Nilus (+6089-537 097, reuben.nilus@sabah.gov.my); Zubaidah Kaffle (+6089-242 500, zubaidah.kaffle@sabah.gov.my) – SUPPLY_SUPPORT_SOFTWARE.docx",
    "Bidder may quote only one offer; equivalent software acceptable if full compliance proven",
    "Payment terms: net 30 days after successful commissioning, via ePerolehan invoice"
  ],
  "status": "active",
  "tags": ["Software", "Remote-Sensing", "Forestry", "GIS"],
  "isFeatured": false,
  "documents": [
      { "name": "01_Kenyataan_Tawaran_Pembekal (1).pdf", "path": "scraper/QT250000000018131/01_Kenyataan_Tawaran_Pembekal (1).pdf", "size": 492229, "mimeType": "application/pdf" },
      { "name": "02_Sampel_Surat_Akuan_Pembida (1).pdf", "path": "scraper/QT250000000018131/02_Sampel_Surat_Akuan_Pembida (1).pdf", "size": 88202, "mimeType": "application/pdf" },
      { "name": "03_Delivery_Address.pdf", "path": "scraper/QT250000000018131/03_Delivery_Address.pdf", "size": 64267, "mimeType": "application/pdf" },
      { "name": "04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "path": "scraper/QT250000000018131/04_Syarat_Syarat_Am_Arahan_Syarat_Syarat_Khas.pdf", "size": 40302, "mimeType": "application/pdf" },
      { "name": "05_Spesifikasi.pdf", "path": "scraper/QT250000000018131/05_Spesifikasi.pdf", "size": 73220, "mimeType": "application/pdf" },
      { "name": "06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "path": "scraper/QT250000000018131/06_Senarai_Semak_untuk_Pematuhan_Teknikal.pdf", "size": 50007, "mimeType": "application/pdf" },
      { "name": "07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "path": "scraper/QT250000000018131/07_Senarai_Semak_untuk_Pematuhan_Kewangan.pdf", "size": 63795, "mimeType": "application/pdf" },
      { "name": "08_Sampel_Surat_Setuju_Terima.pdf", "path": "scraper/QT250000000018131/08_Sampel_Surat_Setuju_Terima.pdf", "size": 152928, "mimeType": "application/pdf" },
      { "name": "SUPPLY SUPPORT SOFTWARE.docx", "path": "scraper/QT250000000018131/SUPPLY SUPPORT SOFTWARE.docx", "size": 15076, "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
  ]
}

];


// Function to seed tenders
async function seedTenders() {
  try { // ADD THIS TRY BLOCK
    console.log('Starting tender seeding process...');

    // First, clear existing tenders and related files
    console.log('[Seed Tenders] Clearing existing tenders and files...');

    // Get all existing tenders
    const { data: existingTendersToDelete, error: fetchError } = await supabase
      .from('tenders')
      .select('id');

    if (fetchError) {
      console.error('[Seed Tenders] Error fetching existing tenders:', fetchError);
      // Do not exit here, let the outer catch handle it
      throw fetchError; // THROW THE ERROR TO BE CAUGHT BY THE OUTER TRY/CATCH
    }

    if (existingTendersToDelete && existingTendersToDelete.length > 0) {
      // Delete all files linked to tenders
      for (const tender of existingTendersToDelete) {
        const { error: filesDeleteError } = await supabase
          .from('files')
          .delete()
          .eq('linked_entity', 'tender_doc')
          .eq('linked_id', tender.id);

        if (filesDeleteError) {
          console.error(`[Seed Tenders] Error deleting files for tender ${tender.id}:`, filesDeleteError);
          // Do not exit here
        }
      }

      // Delete all tenders
      const { error: tendersDeleteError } = await supabase
        .from('tenders')
        .delete()
        .in('id', existingTendersToDelete.map(t => t.id));

      if (tendersDeleteError) {
        console.error('[Seed Tenders] Error deleting existing tenders:', tendersDeleteError);
        // Do not exit here
        throw tendersDeleteError; // THROW THE ERROR TO BE CAUGHT BY THE OUTER TRY/CATCH
      }

      console.log(`[Seed Tenders] Cleared ${existingTendersToDelete.length} existing tenders and their files`);
    }

    // Get the admin user ID from environment variables
    const adminUserId = process.env.SUPABASE_ADMIN_USER_ID;

    console.log(`[Seed Script] SUPABASE_ADMIN_USER_ID: ${adminUserId ? 'Loaded' : 'NOT LOADED'}`); // THIS LINE IS ALREADY THERE

    if (!adminUserId) {
      console.error('SUPABASE_ADMIN_USER_ID environment variable is not set');
      throw new Error('SUPABASE_ADMIN_USER_ID is required for seeding documents.'); // THROW A NEW ERROR
    }

    console.log(`[Seed Tenders] Processing ${module.exports.tenders.length} tenders using admin user ID: ${adminUserId}`);

    // Process each tender
    for (const tender of module.exports.tenders) { // Use module.exports.tenders here
      try {
        console.log(`Processing tender: ${tender.title}`);

        // Validate required fields
        if (!tender.title || !tender.description || !tender.agency) {
          console.error('[Seed Tenders] Missing required fields for tender:', tender.title);
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
                user_id: adminUserId, // Use the admin user ID for seeded documents
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
      } catch (tenderProcessingError) { // Catch errors for individual tenders
        console.error(`[Seed Tenders] Error processing tender "${tender.title}":`, tenderProcessingError);
      }
    }

    console.log('Tender seeding process completed successfully!');
  } catch (error) { // CATCH BLOCK FOR THE ENTIRE FUNCTION
    console.error('An unexpected error occurred during seeding:', error);
    process.exit(1); // Exit with an error code
  }
}

// Run the seed function
seedTenders(); // CALL THE ASYNC FUNCTION