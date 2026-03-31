import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Los Gatos',
  county: 'Santa Clara County',
  state: 'CA',
  slug: 'los-gatos-ca',
  countySlug: 'santa-clara-county-ca',
  adjective: 'Expert',
  title: 'Expert ADU Contractors in Los Gatos, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Los Gatos's expert ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Los Gatos',
    subtitle: 'From permit to keys in hand — we handle every detail of your Los Gatos ADU project so you can focus on what matters.',
    badges: [
      '15+ years of Silicon Valley ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day Los Gatos permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Los Gatos Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a gorgeous detached ADU on our property near downtown Los Gatos. The design is beautiful — modern yet perfectly in keeping with the town's character. They navigated the permitting process seamlessly and the build quality is exceptional. We use it as a rental and it's generating $3,800/month. Worth every penny.",
      name: 'Karen & Steve B.',
      location: 'Downtown Los Gatos',
    },
    side: [
      {
        text: 'They built a stunning hillside ADU for us that takes full advantage of the views. The engineering and craftsmanship are outstanding. Truly a premium builder.',
        name: 'David F.',
        location: 'Los Gatos Hills',
      },
      {
        text: 'Our garage conversion is now a charming studio that perfectly matches our home. Hamilton made the process effortless and the result is magazine-worthy.',
        name: 'Laura & Chris R.',
        location: 'Blossom Hill, Los Gatos',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$240K - $440K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Custom design options'],
      highlighted: true,
      badge: 'Most Popular',
      badgeColor: 'yellow',
    },
    {
      title: 'Attached ADU',
      subtitle: 'Connected to your home',
      price: '$195K - $370K',
      sqft: '400 - 1,200 sq ft',
      features: ['Shared wall with main home', 'Lower construction costs', 'Separate entrance', 'Ideal for family members'],
    },
    {
      title: 'Junior ADU',
      subtitle: 'Within existing home',
      price: '$80K - $155K',
      sqft: 'Up to 500 sq ft',
      features: ['Most affordable option', 'Fastest build time', 'Minimal site work needed', 'Great starter rental'],
      badge: 'Best Value',
      badgeColor: 'green',
    },
    {
      title: 'Garage Conversion',
      subtitle: 'Transform your garage',
      price: '$95K - $190K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in Los Gatos?',
    subtitle: "With its charming downtown, top-rated schools, and proximity to Silicon Valley tech campuses, Los Gatos is an ideal location for ADU investment.",
    stats: [
      {
        value: '$3,500+/mo',
        label: 'Rental Income',
        description: "Los Gatos's desirability and limited housing supply means your ADU can command premium rents from tech executives and professionals.",
        icon: 'dollar',
      },
      {
        value: '25-40%',
        label: 'Home Value Increase',
        description: 'A well-built ADU adds substantial value to your Los Gatos property in this highly sought-after market.',
        icon: 'trend',
      },
      {
        value: 'Permit-Friendly',
        label: 'Streamlined Process',
        description: 'Los Gatos has updated ADU regulations in line with state law, making it easier to add housing to your property.',
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Los Gatos's Expert ADU Builders",
    paragraphs: [
      "With over 15 years of experience building ADUs in Los Gatos and throughout Silicon Valley, we've earned the trust of homeowners across every neighborhood. Our in-house team handles every phase — from initial design and town permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew understands Los Gatos's design expectations and building codes, ensuring your ADU is built right the first time.",
    ],
    ctaText: 'Start Your ADU Project',
    ctaHref: '#contact',
    stats: [
      { value: '150+', label: 'ADUs Completed' },
      { value: '15+', label: 'Years Experience' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '$0', label: 'Down to Start' },
    ],
  },

  process: {
    title: 'Our ADU Construction Process',
    steps: [
      {
        title: 'Free Consultation',
        description: 'We assess your Los Gatos property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans that complement Los Gatos architectural character. We handle all permitting — guaranteed approval within 60 days.',
      },
      {
        title: 'Construction',
        description: 'Our in-house crew builds your ADU with premium materials and expert craftsmanship. Regular updates keep you informed at every milestone.',
      },
      {
        title: 'Final Walkthrough',
        description: 'We complete all inspections, hand you the keys, and ensure every detail meets your expectations. Your new ADU is ready to enjoy.',
      },
    ],
  },

  projects: [
    { title: 'Detached ADU - Luxury Studio', location: 'Downtown Los Gatos', sqft: '720 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Los Gatos Hills', sqft: '1,150 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Blossom Hill, Los Gatos', sqft: '500 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Shannon Park, Los Gatos', sqft: '820 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Vasona, Los Gatos', sqft: '470 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Guest House', location: 'Belgatos, Los Gatos', sqft: '1,200 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Los Gatos & the West Valley',

  regulations: {
    title: "Why Los Gatos Homeowners Are Building ADUs",
    subtitle: "Los Gatos has embraced ADU-friendly policies that make building on your property easier than ever.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Los Gatos's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in Los Gatos' },
      { value: 'Town', label: 'Design Support', description: 'Los Gatos supports ADU development that complements town character' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Los Gatos',
    subtitle: "We build ADUs across every Los Gatos neighborhood, with deep knowledge of each area's unique character and terrain.",
    items: [
      {
        title: 'Downtown & North Los Gatos',
        description: 'Walkable neighborhoods near charming downtown with restaurants and boutiques. Properties here benefit from ADUs that attract professionals who want small-town living with Silicon Valley access.',
        icon: 'home',
      },
      {
        title: 'Los Gatos Hills & Belgatos',
        description: 'Hillside properties with panoramic views and spacious lots. We specialize in ADU designs that work with sloped terrain while capturing stunning mountain and valley views.',
        icon: 'people',
      },
      {
        title: 'Blossom Hill & Shannon Park',
        description: 'Family-friendly neighborhoods with excellent schools and well-maintained homes. Ideal for ADUs that serve as multigenerational housing or generate strong rental income.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Los Gatos permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Los Gatos ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Saratoga, CA', href: '/service-areas/santa-clara-county-ca/saratoga-ca' },
      { title: 'ADU Contractors in Campbell, CA', href: '/service-areas/santa-clara-county-ca/campbell-ca' },
      { title: 'ADU Contractors in San Jose, CA', href: '/service-areas/santa-clara-county-ca/san-jose-ca' },
    ],
    infoCards: [
      {
        title: "Los Gatos's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Terrain',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Special considerations for hillside lots.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Los Gatos?',
      answer: 'A typical Los Gatos ADU project takes 7-11 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-7 months for construction. Hillside sites may require additional preparation time.',
    },
    {
      question: 'How much does an ADU cost in Los Gatos?',
      answer: 'ADU costs in Los Gatos range from $80,000 for a Junior ADU to $440,000+ for a large detached unit. The final cost depends on size, design complexity, terrain, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Do I need a permit to build an ADU in Los Gatos?',
      answer: "Yes, all ADUs in Los Gatos require building permits. We handle the entire permit process for you and guarantee approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in Los Gatos?',
      answer: "In Los Gatos, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs are limited to 500 square feet.",
    },
    {
      question: 'Can I rent out my Los Gatos ADU?',
      answer: 'Yes. Los Gatos has exceptional rental demand. Many homeowners earn $3,000-$4,500+ per month renting their ADU to tech professionals who want the small-town lifestyle.',
    },
    {
      question: 'Can I build an ADU on a hillside lot in Los Gatos?',
      answer: 'Yes. We have extensive experience building ADUs on Los Gatos hillside properties. Our architects design ADUs that work with sloped terrain, and our crew specializes in hillside construction and foundations.',
    },
  ],
  faqTitle: 'Common Questions About Los Gatos ADUs',

  contact: {
    title: 'Get Your Free Los Gatos ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Los Gatos ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Los Gatos',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Los Gatos ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Saratoga, CA',
        description: 'Explore our ADU construction services in neighboring Saratoga.',
        href: '/service-areas/santa-clara-county-ca/saratoga-ca',
      },
      {
        title: 'ADU Contractors in Campbell, CA',
        description: 'Quality ADU solutions for Campbell homeowners in Santa Clara County.',
        href: '/service-areas/santa-clara-county-ca/campbell-ca',
      },
      {
        title: 'ADU Contractors in San Jose, CA',
        description: 'Professional ADU design and construction services in San Jose.',
        href: '/service-areas/santa-clara-county-ca/san-jose-ca',
      },
    ],
    infoCards: [
      {
        title: "Los Gatos's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Building Rules',
        description: "Los Gatos requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Hillside lots may have additional requirements.",
      },
    ],
  },
};
