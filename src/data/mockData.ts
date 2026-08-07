import { NewsArticle, HelpArticle, ResourceItem, EventItem, User } from '../types';

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'AIMA Updates Residence Permit Renewal Process for CPLP and Article 88 Holders',
    slug: 'aima-updates-residence-permit-renewal-process',
    summary60: 'Portugal’s Agency for Integration, Migration and Asylum (AIMA) has launched a new online portal stream simplifying renewals for CPLP visa holders and Article 88/89 applicants. Documents can now be submitted online with digital fee payment to reduce physical queue waiting times.',
    content: `The Agency for Integration, Migration and Asylum (AIMA) in Portugal has rolled out a major update to its digital portal. Immigrants holding CPLP Mobility Visas and those registered under Articles 88 and 89 can now initiate renewals online without in-person appointments at first instance.

According to official guidelines published on gov.pt, applicants will receive an email notification with a secure link to upload updated employment contracts, tax authority (Finanças) status, and Social Security (NISS) contributions. Upon automated document validation, digital residence certificates will be issued, followed by physical card mailing.

Immigrant rights associations in Lisbon and Sintra have welcomed the measure, noting it will address processing backlogs affecting thousands of South Asian workers across Greater Lisbon, Porto, and the Algarve.

**Key Steps for Applicants:**
1. Check your email registered with AIMA or portal.aima.pt
2. Ensure NIF and NISS tax declarations for 2025/2026 are up to date
3. Pay the processing fee digitally via Multibanco reference
4. Download the temporary digital declaration valid across all public services`,
    category: 'AIMA',
    tags: ['AIMA', 'Residency', 'CPLP', 'Renewal', 'Portugal Immigration'],
    authorName: 'Editorial Desk',
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80', // Lisbon street
    publishedAt: '2026-08-05T14:30:00Z',
    updatedAt: '2026-08-06T09:15:00Z',
    status: 'PUBLISHED',
    sourceName: 'Gov.pt / AIMA Official Announcement',
    sourceUrl: 'https://aima.gov.pt',
    officialSourceUrl: 'https://aima.gov.pt/pt/renovacao-titulos',
    isOfficialUpdate: true,
    viewsCount: 3420,
    affectedPeople: 'All CPLP residence permit holders, Article 88/89 employment visa applicants',
    requiredActions: 'Check AIMA portal account, verify NIF/NISS contribution status, await email link for document upload',
    seoTitle: 'AIMA Portugal Online Renewal Guide for Residence Permits',
    metaDescription: 'AIMA launches digital portal for CPLP and Article 88 residence permit renewals in Portugal.',
    suggestedSocialPost: '🚨 Important AIMA Update for Desi Community in Portugal: Residence permit renewals can now be processed online via portal.aima.pt. Details on TheDesi.news!',
    verifiedByEditor: true,
  },
  {
    id: 'news-2',
    title: 'SNS Health Centre Registration Rules Clarified for Immigrants Without Final Card',
    slug: 'sns-health-centre-registration-rules-clarified',
    summary60: 'Portugal’s National Health Service (SNS) reiterates that ALL residents in Portugal, regardless of immigration status, have the constitutional right to register at local Health Centres (Centro de Saúde) using an active NIF and proof of address.',
    content: `Portugal’s Ministry of Health and the National Health Service (SNS) have issued revised instructions to local Health Centres (Centros de Saúde) across all municipalities including Lisbon, Sintra, Oeiras, Porto, and Faro.

Under Portuguese law, access to primary healthcare is a universal right. Immigrants awaiting their AIMA residence card can register at their local Centro de Saúde by presenting:
1. Valid Passport
2. Tax Identification Number (NIF)
3. Proof of Residence (Junta de Freguesia attestation or rental contract)
4. AIMA manifestation of interest or appointment proof (if available)

Upon registration, users receive an SNS Number (Número de Utente), giving them access to general practitioners, emergency medical assistance, vaccinations, and prenatal care.

Community helpers in Lisbon Martim Moniz and Arroios report that some health centers previously turned away applicants without physical residence cards. This official directive enforces uniform compliance across all health units.`,
    category: 'Healthcare',
    tags: ['SNS', 'Healthcare', 'Centro de Saúde', 'Número de Utente', 'Health Rights'],
    authorName: 'Dr. Tariq Rahman',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80', // Hospital / Health
    publishedAt: '2026-08-04T10:00:00Z',
    updatedAt: '2026-08-04T10:00:00Z',
    status: 'PUBLISHED',
    sourceName: 'SNS - Health Ministry Portal',
    sourceUrl: 'https://www.sns.gov.pt',
    officialSourceUrl: 'https://www.sns.gov.pt/cidadao/inscricao-centro-saude',
    isOfficialUpdate: true,
    viewsCount: 2890,
    affectedPeople: 'Newly arrived immigrants, workers awaiting AIMA card, families without SNS number',
    requiredActions: 'Visit local Centro de Saúde with passport, NIF, and Junta de Freguesia proof of address',
    seoTitle: 'How to Get SNS Número de Utente in Portugal as an Immigrant',
    metaDescription: 'Clear guide on SNS registration in Portugal for immigrants without residence card.',
    suggestedSocialPost: '🏥 Healthcare Rights in Portugal: You do NOT need a final AIMA card to get your SNS Health Number. Learn how to register today on TheDesi.news!',
    verifiedByEditor: true,
  },
  {
    id: 'news-3',
    title: 'Free Portuguese Language (PLA) Classes Announced Across Greater Lisbon and Porto',
    slug: 'free-portuguese-language-pla-classes-announced',
    summary60: 'The Institute for Employment and Vocational Training (IEFP) alongside High Commission for Migration partners has announced 120 new free Portuguese for Speakers of Other Languages (PLA) courses starting September 2026.',
    content: `Learning Portuguese is a required step for obtaining permanent residency and citizenship (A2 level requirement). IEFP has expanded its free Portuguese Language for Speakers of Other Languages (Português Língua de Acolhimento - PLA) program for 2026-2027.

Classes are available in morning, evening, and weekend batches across municipalities including Lisbon, Amadora, Sintra, Loures, Vila Nova de Gaia, and Porto.

Courses cover A1/A2 and B1/B2 levels and award an official IEFP certificate accepted by AIMA and the Institute of Registries and Notaries (IRN) for nationality applications.

**Eligibility:**
- Non-native Portuguese speakers with valid passport & NIF
- Open to employed, self-employed, or job-seeking residents
- No tuition fees; study materials provided free of charge`,
    category: 'Education',
    tags: ['Portuguese Language', 'PLA', 'IEFP', 'A2 Certificate', 'Education'],
    authorName: 'Fatima Chowdhury',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', // Education/Classroom
    publishedAt: '2026-08-02T16:45:00Z',
    updatedAt: '2026-08-03T08:20:00Z',
    status: 'PUBLISHED',
    sourceName: 'IEFP - Instituto do Emprego e Formação Profissional',
    sourceUrl: 'https://www.iefp.pt',
    officialSourceUrl: 'https://www.iefp.pt/formacao-portugues-lingua-de-acolhimento',
    isOfficialUpdate: true,
    viewsCount: 1940,
    affectedPeople: 'Immigrants planning permanent residency or citizenship applications needing A2 certificate',
    requiredActions: 'Register online via IEFP portal or visit nearest IEFP employment center with passport & NIF',
    seoTitle: 'Free A2 Portuguese Classes in Portugal - IEFP PLA Program',
    metaDescription: 'Register for free IEFP Portuguese language courses (PLA A1/A2) in Lisbon and Porto.',
    suggestedSocialPost: '📚 Master Portuguese for Free! IEFP opens new PLA A2 certificate classes required for AIMA and citizenship. Read more on TheDesi.news',
    verifiedByEditor: true,
  },
  {
    id: 'news-4',
    title: 'Desi Entrepreneurship in Lisbon: South Asian Gastronomy & Tech Startups Recognized in Oeiras',
    slug: 'desi-entrepreneurship-in-lisbon-tech-startups-recognized',
    summary60: 'The Municipal Council of Oeiras and Startup Lisboa honored 15 South Asian-led small businesses and tech ventures at the annual Portugal Multicultural Business Summit, highlighting contributions to local economy and employment.',
    content: `South Asian entrepreneurs in Portugal are making significant strides in technology, logistics, agriculture, and hospitality. At the 2026 Portugal Multicultural Business Summit in Oeiras, several Bangladeshi, Indian, and Nepalese business owners were awarded commendations.

The summit featured workshops on navigating Finanças tax incentives for startups, applying for Portugal Golden/Startup visas, and accessing Banco Português de Fomento business loans for immigrant-owned micro-enterprises.

Community leaders highlighted the importance of compliance, certified accounting (TOC/CC), and social security contributions for small business resilience.`,
    category: 'Community',
    tags: ['Business', 'Entrepreneurship', 'Desi Business', 'Oeiras', 'Community'],
    authorName: 'Rajesh Sharma',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80', // Business meeting
    publishedAt: '2026-07-30T11:00:00Z',
    updatedAt: '2026-07-30T11:00:00Z',
    status: 'PUBLISHED',
    sourceName: 'TheDesi.news Community Desk',
    sourceUrl: 'https://thedesi.news',
    isOfficialUpdate: false,
    viewsCount: 1410,
    affectedPeople: 'Business owners, freelancers, restaurant operators, and tech founders in Portugal',
    requiredActions: 'Explore business grants and certified accounting support via TheDesi.news Resource Directory',
    verifiedByEditor: true,
  }
];

export const INITIAL_HELP_ARTICLES: HelpArticle[] = [
  {
    id: 'help-nif',
    title: 'How to Obtain a NIF (Número de Identificação Fiscal) in Portugal',
    slug: 'how-to-obtain-nif-portugal',
    category: 'Finanças & Tax',
    summary: 'The NIF is your Portuguese tax identification number, required for opening bank accounts, signing leases, working, and accessing government services.',
    content: `The NIF (Número de Identificação Fiscal) is the foundational document for living, working, or doing business in Portugal. Issued by Autoridade Tributária e Aduaneira (Finanças), it is a 9-digit number.

### Required Documents for Non-EU Residents:
1. Valid Passport
2. Proof of address in country of origin (or Portuguese address)
3. Fiscal Representative (Representante Fiscal) if residing outside the EU/EEA, or self-representation if holding a Portuguese residence permit/CPLP visa.

### Steps to Apply:
1. **Online via E-Balcão:** A Portuguese tax representative logs into Finanças portal and submits passport scan + representation agreement.
2. **In-Person at Loja do Cidadão / Serviço de Finanças:** Book an appointment via SIGÄ or gov.pt, visit Finanças with passport and representative.
3. Receive NIF document immediately upon processing (free of official government fee if generated directly).`,
    steps: [
      'Gather valid passport and proof of address',
      'Arrange a Portuguese fiscal representative (if non-EU resident)',
      'Book appointment or submit online via E-Balcão portal',
      'Download and safely store your NIF tax certificate'
    ],
    requiredDocuments: ['Valid Passport', 'Proof of Foreign/Local Address', 'Fiscal Representative ID (if applicable)'],
    officialSourceUrl: 'https://portaldasfinancas.gov.pt',
    officialSourceTitle: 'Autoridade Tributária e Aduaneira (Finanças)',
    lastVerifiedDate: '2026-08-01',
    informationProvider: 'TheDesi.news Legal & Tax Helpdesk',
    status: 'VERIFIED',
    disclaimer: 'Information provided for general guidance. Tax regulations may vary based on residency status.',
    viewsCount: 5210,
  },
  {
    id: 'help-niss',
    title: 'Social Security Number (NISS Na Hora) Application Guide for Workers',
    slug: 'social-security-niss-application-guide',
    category: 'Segurança Social',
    summary: 'NISS (Número de Identificação da Segurança Social) is mandatory for employment, monthly contributions, healthcare access, and AIMA residency filings.',
    content: `NISS Na Hora allows foreign citizens in Portugal to request a Social Security Number directly online.

### Requirements:
- Valid Passport or National ID
- NIF Number
- Portuguese phone number and active email
- Proof of employment contract, work offer, or self-employment registration (Atividade)

### Online Application via Segurança Social Direta:
1. Access the official portal: \`seg-social.pt/pedir-niss-cidadao-estrangeiro\`
2. Upload passport image and NIF document
3. Fill personal details matching passport exactly
4. Receive email confirmation with NISS number within 3-10 working days`,
    steps: [
      'Ensure you have obtained your NIF',
      'Fill the digital form at seg-social.pt',
      'Attach passport PDF scan and employment details',
      'Receive NISS confirmation code via email'
    ],
    requiredDocuments: ['Passport', 'NIF Certificate', 'Work Contract or Promise of Contract'],
    officialSourceUrl: 'https://www.seg-social.pt/pedir-niss-cidadao-estrangeiro',
    officialSourceTitle: 'Segurança Social Direta',
    lastVerifiedDate: '2026-08-02',
    informationProvider: 'TheDesi.news Community Support Desk',
    status: 'VERIFIED',
    disclaimer: 'NISS issuance is strictly managed by Segurança Social. Avoid third-party fees.',
    viewsCount: 4890,
  },
  {
    id: 'help-aima-renewal',
    title: 'AIMA Residence Permit Renewal Checklist & Portal Walkthrough',
    slug: 'aima-residence-permit-renewal-checklist',
    category: 'AIMA & Visas',
    summary: 'Complete guide to renewing temporary residence permits in Portugal, maintaining social security contributions, and resolving portal issues.',
    content: `Renewing your Portuguese Residence Permit (Título de Residência) must be initiated within 30 days prior to expiration.

### Required Documentation Checklist:
- Current Residence Card & Passport
- Proof of Address (Junta de Freguesia declaration)
- Finanças Tax Clearance (Certidão de Não Dívida)
- Segurança Social Clearance (Certidão de Regularidade Contributiva)
- Active Employment Contract / Pay Slips (Recibos de Vencimento) or Recibos Verdes
- Criminal Record Certificate from country of origin (if requested)

### Process:
1. Log into \`portal.aima.pt\`
2. Select 'Renovação do Título de Residência'
3. Confirm personal data and upload PDF attachments
4. Pay generated DUC (Documento Único de Cobrança) fee via Multibanco / Homebanking
5. Download digital validation receipt valid until physical card arrival`,
    steps: [
      'Collect Finanças & Social Security clearance certificates online',
      'Request updated Junta de Freguesia residence proof',
      'Log into portal.aima.pt and upload document scans',
      'Pay fee reference and keep digital receipt'
    ],
    requiredDocuments: ['Passport & Current Card', 'Finanças Tax Clearance', 'Segurança Social Regularity Certificate', 'Junta de Freguesia Proof', 'Pay Slips / Recibos'],
    officialSourceUrl: 'https://aima.gov.pt/pt/renovacao-titulos',
    officialSourceTitle: 'AIMA - Agência para a Integração, Migrações e Asilo',
    lastVerifiedDate: '2026-08-05',
    informationProvider: 'TheDesi.news Verified Immigration Desk',
    status: 'VERIFIED',
    disclaimer: 'Always verify document requirements on the official AIMA portal.',
    viewsCount: 8940,
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    name: 'CNAIM Lisboa - High Commission for Migration Center',
    category: 'Government Office',
    description: 'National Support Centre for Immigrant Integration providing free multi-lingual support for legal, employment, health, and family reunification.',
    address: 'Rua do Benformoso 101, 1150-083 Lisboa (Martim Moniz)',
    municipality: 'Lisbon',
    phone: '+351 218 106 100',
    email: 'cnaim.lisboa@acm.gov.pt',
    website: 'https://www.acm.gov.pt',
    openingHours: 'Mon-Fri: 08:30 - 17:30',
    languagesSpoken: ['English', 'Portuguese', 'Bangla', 'Hindi', 'Urdu', 'Arabic'],
    servicesOffered: ['Legal Advice', 'Healthcare Guidance', 'Employment Support', 'Education Equivalence', 'AIMA Referral'],
    eligibility: 'Free for all immigrants in Portugal regardless of documentation status',
    officialSource: 'Gov.pt / High Commission for Migration',
    lastVerifiedDate: '2026-08-01',
    isVerified: true,
  },
  {
    id: 'res-2',
    name: 'Centro de Saúde de Martim Moniz & Olaias',
    category: 'Healthcare',
    description: 'Public health centre specializing in foreign resident registration, general consultation, child vaccinations, and maternal healthcare.',
    address: 'Alameda D. Afonso Henriques 64, Lisboa',
    municipality: 'Lisbon',
    phone: '+351 218 437 200',
    email: 'cs.martimmoniz@sns.min-saude.pt',
    website: 'https://www.sns.gov.pt',
    openingHours: 'Mon-Fri: 08:00 - 20:00',
    languagesSpoken: ['Portuguese', 'English', 'Bangla', 'Hindi'],
    servicesOffered: ['SNS Number Registration', 'General Doctor Consultations', 'Vaccinations', 'Maternal Health'],
    eligibility: 'All residents with Passport, NIF, and address proof',
    officialSource: 'SNS - Serviço Nacional de Saúde',
    lastVerifiedDate: '2026-07-28',
    isVerified: true,
  },
  {
    id: 'res-3',
    name: 'Loja do Cidadão de Sintra (Cacém)',
    category: 'Government Office',
    description: 'One-stop administrative office containing Finanças, Segurança Social, Registos (IRN), and municipal support desks.',
    address: 'Rua Elias Garcia, Agualva-Cacém, Sintra',
    municipality: 'Sintra',
    phone: '+351 219 238 500',
    email: 'loja.cidadao@sintra.pt',
    website: 'https://www.eportugal.gov.pt',
    openingHours: 'Mon-Fri: 09:00 - 19:00, Sat: 09:00 - 13:00',
    languagesSpoken: ['Portuguese', 'English'],
    servicesOffered: ['NIF Registration', 'Segurança Social Attendance', 'Junta de Freguesia Proof', 'AIMA Desks'],
    eligibility: 'General public with appointment via SIGÄ app',
    officialSource: 'ePortugal / Municipality of Sintra',
    lastVerifiedDate: '2026-08-03',
    isVerified: true,
  },
  {
    id: 'res-4',
    name: 'Desi Legal & Community Advisory Circle Oeiras',
    category: 'Legal Help',
    description: 'Pro bono community legal clinic offering certified lawyer advice on employment contracts, lease agreements, and CPLP visa regularisation.',
    address: 'Avenida das Descobertas 12, Oeiras',
    municipality: 'Oeiras',
    phone: '+351 214 410 999',
    email: 'legal@thedesi.news',
    website: 'https://thedesi.news/help',
    openingHours: 'Tue & Thu: 14:00 - 18:00 (By Appointment)',
    languagesSpoken: ['English', 'Portuguese', 'Bangla', 'Urdu'],
    servicesOffered: ['Contract Review', 'Immigration Legal Referrals', 'Labor Dispute Consultation'],
    eligibility: 'Registered members of TheDesi.news platform',
    officialSource: 'TheDesi.news Verified Partner Network',
    lastVerifiedDate: '2026-08-05',
    isVerified: true,
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'AIMA & Immigration Law Workshop 2026: Navigating Renewals & Family Reunification',
    description: 'Interactive session with Portuguese immigration attorneys and AIMA advisors detailing the latest CPLP, Article 88, and family reunification rules.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    date: '2026-08-18',
    time: '18:00 - 20:00 WET',
    location: 'CNAIM Lisboa Auditorium & Online Zoom Stream',
    isOnline: true,
    meetingUrl: 'https://zoom.us/j/thedesinews-aima-workshop',
    capacity: 150,
    registeredCount: 82,
    speaker: 'Adv. Manuel Silva & Farhana Ahmed (AIMA Specialist)',
    language: 'English, Portuguese & Bangla Translation',
    category: 'Immigration Workshop',
  },
  {
    id: 'evt-2',
    title: 'Free Intensive Portuguese A2 Exam Prep & Conversation Practice',
    description: 'Practice Portuguese speaking, listening, and grammar modules required for the official CAPLE/IEFP A2 language certification exam.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    date: '2026-08-22',
    time: '11:00 - 13:00 WET',
    location: 'Sintra Community Cultural Centre, Cacém',
    isOnline: false,
    capacity: 40,
    registeredCount: 29,
    speaker: 'Prof. Sofia Santos & Aminul Islam',
    language: 'Portuguese & English',
    category: 'Portuguese Class',
  },
  {
    id: 'evt-3',
    title: 'Desi Entrepreneurship & Tax Compliance Meetup Lisbon',
    description: 'Learn how to register Recibos Verdes, handle IVA taxes, and apply for SME government incentives in Portugal.',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    date: '2026-08-28',
    time: '15:00 - 17:30 WET',
    location: 'Startup Lisboa Hub, Baixa',
    isOnline: false,
    capacity: 60,
    registeredCount: 41,
    speaker: 'TOC Accountant Carlos Mendes & Rahul Verma',
    language: 'English & Hindi',
    category: 'Business & Employment',
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-super-admin',
    name: 'Suhail Khan (Super Admin)',
    email: 'admin@thedesi.news',
    phone: '+351 912 345 678',
    role: 'SUPER_ADMIN',
    preferredLanguage: 'en',
    municipality: 'Lisbon',
    interests: ['Immigration', 'Visa', 'Residency', 'Business'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'user-editor',
    name: 'Ananya Roy (Editor)',
    email: 'editor@thedesi.news',
    phone: '+351 923 456 789',
    role: 'EDITOR',
    preferredLanguage: 'bn',
    municipality: 'Sintra',
    interests: ['Immigration', 'Healthcare', 'Education'],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'user-support',
    name: 'Imran Hussain (Support Staff)',
    email: 'support@thedesi.news',
    phone: '+351 934 567 890',
    role: 'SUPPORT_STAFF',
    preferredLanguage: 'ur',
    municipality: 'Oeiras',
    interests: ['Jobs', 'Housing', 'Legal'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'user-helper',
    name: 'Priya Sharma (Community Helper)',
    email: 'helper@thedesi.news',
    phone: '+351 945 678 901',
    role: 'HELPER',
    preferredLanguage: 'hi',
    municipality: 'Lisbon',
    interests: ['Healthcare', 'Portuguese Language', 'Family'],
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-03-12T00:00:00Z',
  },
  {
    id: 'user-manager',
    name: 'David Silva (Help Centre Manager)',
    email: 'manager@thedesi.news',
    phone: '+351 956 789 012',
    role: 'HELP_CENTRE_MANAGER',
    preferredLanguage: 'pt',
    municipality: 'Porto',
    interests: ['AIMA', 'Finanças', 'Segurança Social'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-04-05T00:00:00Z',
  },
  {
    id: 'user-member',
    name: 'Rashed Chowdhury (Community Member)',
    email: 'member@thedesi.news',
    phone: '+351 967 890 123',
    role: 'MEMBER',
    preferredLanguage: 'bn',
    municipality: 'Sintra',
    interests: ['Immigration', 'NIF', 'Portuguese Language', 'Healthcare'],
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-05-20T00:00:00Z',
  }
];
