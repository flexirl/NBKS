import { Sector, Course } from './types';

export const INITIAL_SECTORS: Sector[] = [
  {
    id: 'agriculture',
    title: 'Agriculture',
    description: 'Empowering farmers with modern techniques and organic farming practices.',
    detailedDescription: 'Offering training workshops in soil testing, composting, drip irrigation, and introducing hybrid seeds to boost crop yields while preserving rural ecology.',
    iconName: 'Agriculture'
  },
  {
    id: 'welfare',
    title: 'Child Welfare',
    description: 'Protecting rights and providing safety nets for vulnerable children.',
    detailedDescription: 'Running bridge schools for child laborers, sponsoring nutrition drives, and maintaining child protection committees across Bihar.',
    iconName: 'ChildCare'
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Bridging the gap in quality education for rural students.',
    detailedDescription: 'Offering free coaching, distributing learning materials and digital tablets, and establishing library resource centers in remote villages.',
    iconName: 'School'
  },
  {
    id: 'health',
    title: 'Health',
    description: 'Organizing medical camps and promoting hygiene awareness.',
    detailedDescription: 'Running weekly free medical camps, distributing essential block medicines, and holding active workshops on menstrual health and sanitization.',
    iconName: 'HealthAndSafety'
  },
  {
    id: 'women',
    title: 'Women Emp.',
    description: 'Skill development and financial independence for women.',
    detailedDescription: 'Aiding self-help groups (SHGs), teaching tailoring, setting up local retail micro-businesses, and spreading legal and financial literacy.',
    iconName: 'Groups'
  }
];

export const COURSES: Course[] = [
  {
    id: 'grad-pg',
    title: 'Graduation & PG',
    description: 'State-recognized degree support programs helping students achieve university graduation in humanities, sciences, and commerce.',
    duration: '3 Years',
    eligibility: '12th Pass (Any Stream)',
    details: [
      'Affiliated guidance for leading State Universities',
      'Regular test reviews and mock examinations',
      'Study materials and reading resource libraries provided',
      'Special online and offline bridge lectures'
    ]
  },
  {
    id: 'technical',
    title: 'Technical Courses',
    description: 'Hands-on hardware and mechanical technical modules for preparing industrial maintenance staff and engineers.',
    duration: '2 Years',
    eligibility: '10th Class Pass',
    details: [
      'Focus on practical wiring, household electricals, and motor repairs',
      'Safety protocols and electronic toolkit workshops',
      'Partnership links with regional construction operators',
      'State technical certifications'
    ]
  },
  {
    id: 'nursing',
    title: 'Nursing & Med',
    description: 'Comprehensive educational curriculum in Auxiliary Nursing & Midwifery and General Nursing assistance.',
    duration: '2-3 Years',
    eligibility: '12th Pass (PCB/Science Stream preferred)',
    details: [
      'Clinical laboratory practice and emergency rescue training',
      'Local hospital internship and internship credits',
      'Focus on infant nutrition and child welfare protocols',
      'Highly demanded nursing job preparation modules'
    ]
  },
  {
    id: 'comp-sci',
    title: 'Computer Science',
    description: 'Information technology, programming, web design, bookkeeping systems, and basic databases.',
    duration: '1 Year',
    eligibility: '12th Pass',
    details: [
      'Modules: Java Scripting, HTML layouts, Tailwind styling',
      'Hands-on excel bookkeeping, accounting ledgers',
      'Basic networking and operating system commands',
      'Mock company project assignments'
    ]
  },
  {
    id: 'professional',
    title: 'Professional Ed',
    description: 'Essential professional communications, corporate interview preparation, administrative processes, and soft skills.',
    duration: '1 Year',
    eligibility: 'Any Graduate',
    details: [
      'Written correspondence and customer communication training',
      'Resume reviews and public speaking practices',
      'Office setup tools (Word, Excel, PowerPoint, Emails)',
      'Aptitude tests and interview simulations'
    ]
  },
  {
    id: 'vocational',
    title: 'Vocational training',
    description: 'Tailoring, sewing machine operations, traditional embroidery, beauty therapy, and micro-merchant training.',
    duration: '6 Months',
    eligibility: '8th Class Pass',
    details: [
      'Practical stitching, garment design, cutting systems',
      'Marketing skills for rural market stalls and fairs',
      'Self-help credit union loan access education',
      'Small business planning workshops'
    ]
  }
];

export const GALLERY_IMAGES = [
  {
    id: 'gal-1',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgL4BAky3zfLMoUu30vlJ9byGpFdlv8e24EhuMcUy4SeCzPoR07QeHY1S-uwvy6fcEkyn8p63_6x0m4Lqmpf5dzEkrAMlCu9ohD3ZgqEJNTbqFgJYNYZA1vF6uATEdmlOvgZO_WTcGMy8J4cecKvFFXX-tIVjHpxp_Z0tCYr1UX982bL7ITp4IXVyaq-NEyBhPElQyEImM8WR2f-MFT3-GKp8V5JWVIsP0XBR-rwJ3hDteq9x_Y39x76jx5RdNYjBr1FOXOAXkAPU',
    alt: 'Sapling plantation drive',
    title: 'Environmental Protection Meet',
    desc: 'Local community volunteers and tribal heads join forces in Vaishali to plant over 1,500 evergreen saplings to combat deforestation.'
  },
  {
    id: 'gal-2',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKMciEGSrIxvjgncLcqhAGrXeuZG2YfXvz9XILq-Xvg6CeEFMBm2gsFRsPTbYPjalsn1vTm4NqmcxbJO_tIL9aDOxGZG6EiNxLOjjr_kFSnuxQDectrCWs3WMjazSkyhXrjki_J1Ujg1m46HXybODWgIIK753OXg1OmdPJzT_h1egr50q4cgAY66vhIrOVMvNxKTHRsgKbXlSjHDRfPToq8_UGuhmcKCIZbfvaT01tMiKKT08y2PegHWVql6P--nP_9HNthgkHPdk',
    alt: 'Children reading books',
    title: 'Rural Library & Literacy Center',
    desc: 'A regular study day in the library where rural children get free coaching materials, newspapers, and guidance.'
  },
  {
    id: 'gal-3',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuYTIfYfwNiouF8vExNmH-S4rxm2DEC-aAiHHoH7Sru_sPmQExI1XxnM-mlRG7OkFx9PztMwiVZYTg_N3D78LlEDOuO3QTMZla651l4Llr1TZWVxga2t2sQcWsxMABQudEryLlwtLvRDQcrqdtV27K78sT5tCVXk7r766aQBSPONZkuC5wzuxSrk1souBQzXSNGrYqd_RP_Mb850DXHBDEt-ezDWYxU26LF7gJU2YCgWQGxi9b-YtPbKSVAF7jCIxNzhcwO5840_E',
    alt: 'Traditional fabric weaving',
    title: 'Women Empowerment Weaving Loop',
    desc: 'Empowered local rural women creating detailed traditional textiles. Their output is marketed through global channels.'
  },
  {
    id: 'gal-4',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC0Bk5eS_rutoGwN-myRVQ5ibh-6vNa3kznGTaOh4TSmShtW1I-8JyKtToyN5Qfss2McfjeDLEj3nUfQ1pzJ5JXCbFc232tVH8OTWw6PuYNWBwqXE0pOwrwaXASDW9QrPMQ0T24Rocy__MRGMMRsz7eXXIzoi5xqbh5QkaMr2NxKOJJX8iJuaK3rqB_b2VJmuxCQkXq-MZN0UiN2wXyQUQobFwpxbHmvfTyvJjC6Xbeo7eUy0p0nzP83wEWneVmkaEPWRI4dm65co',
    alt: 'Project completion celebration',
    title: 'Community Project Graduation',
    desc: 'Celebrating successful block program completion. Volunteers gather with beneficiary families for a group lunch.'
  },
  {
    id: 'gal-5',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsASY0DHl07hVn6hVnNyTprGAiwyjpwqc_cYF5CkBGlS3c1SS6JKC0m9O4yu4Llm-RV4rve6Iwbn3dsVDKBM3ZPcwzQyfhbU3Rhcgujm92ayGBbQ2ZexyfMi50c5FkXuaF5Wbe5Rktq0cHfLkHzezQ1v9-RK_LtAGlCGxNFPGmhgoyr6EAB9b8N8w_buTsPl_3w9_UxEU7XtzIfasfPKlRwAQ00PgtJ_aiEEwH5lvGSO0-6yDmfDbieuZ_lXPWfXp3cLSod1mdkQI',
    alt: 'Modern computer lab with students',
    title: 'Digital Empowerment Center',
    desc: 'Equipped with the latest technology, MAA Solution Hub computer rooms are packed with secondary school students learning Web essentials.'
  }
];
