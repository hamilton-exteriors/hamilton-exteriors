import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'San Jose',
  county: 'Santa Clara County',
  state: 'CA',
  slug: 'san-jose-ca',
  countySlug: 'santa-clara-county-ca',
  adjective: 'Trusted',
  title: 'Trusted ADU Contractors in San Jose, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is San Jose's trusted ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in San Jose',
    subtitle: 'From permit to keys in hand — we handle every detail of your San Jose ADU project so you can focus on what matters.',
    badges: [
      '15+ years of Silicon Valley ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day San Jose permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What San Jose Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built our detached ADU in Willow Glen and the quality is outstanding. From the initial design consultation to the final walkthrough, their team was professional, communicative, and detail-oriented. They navigated San Jose's permitting process with ease and finished ahead of schedule. Our ADU is now generating over $3,200/month in rental income. Best investment we've made.",
      name: 'James K.',
      location: 'Willow Glen, San Jose',
    },
    side: [
      {
        text: 'They built a beautiful detached ADU in our backyard for my aging parents. The whole process was seamless and the craftsmanship is top-notch. Highly recommend.',
        name: 'Priya M.',
        location: 'Almaden Valley, San Jose',
      },
      {
        text: 'Our garage conversion ADU in Cambrian turned out better than we imagined. Hamilton handled everything from permits to final inspection. Truly turnkey.',
        name: 'Robert & Linda C.',
        location: 'Cambrian, San Jose',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$200K - $400K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Custom design options'],
      highlighted: true,
      badge: 'Most Popular',
      badgeColor: 'yellow',
    },
    {
      title: 'Attached ADU',
      subtitle: 'Connected to your home',
      price: '$170K - $320K',
      sqft: '400 - 1,200 sq ft',
      features: ['Shared wall with main home', 'Lower construction costs', 'Separate entrance', 'Ideal for family members'],
    },
    {
      title: 'Junior ADU',
      subtitle: 'Within existing home',
      price: '$70K - $140K',
      sqft: 'Up to 500 sq ft',
      features: ['Most affordable option', 'Fastest build time', 'Minimal site work needed', 'Great starter rental'],
      badge: 'Best Value',
      badgeColor: 'green',
    },
    {
      title: 'Garage Conversion',
      subtitle: 'Transform your garage',
      price: '$90K - $170K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in San Jose?',
    subtitle: "As the capital of Silicon Valley, San Jose offers exceptional ADU investment potential. Here's why homeowners are adding ADUs to their properties.",
    stats: [
      {
        value: '$3,000+/mo',
        label: 'Rental Income',
        description: "San Jose's booming tech economy and housing demand means your ADU can generate significant monthly income from day one.",
        icon: 'dollar',
      },
      {
        value: '25-35%',
        label: 'Home Value Increase',
        description: 'A well-built ADU can increase your San Jose property value by hundreds of thousands of dollars in this high-value market.',
        icon: 'trend',
      },
      {
        value: 'Permit-Friendly',
        label: 'Streamlined Process',
        description: 'San Jose has simplified ADU regulations with reduced fees and faster permit approvals to address the housing shortage.',
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "San Jose's Trusted ADU Experts",
    paragraphs: [
      "With over 15 years of experience building ADUs in San Jose and across Silicon Valley, we've earned the trust of homeowners in every neighborhood. Our in-house team handles every phase of your project — from initial design and city permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew knows San Jose's building codes inside and out, ensuring your ADU is built right the first time.",
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
        description: 'We assess your San Jose property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans tailored to your lot and needs. We handle all San Jose permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Modern Studio', location: 'Willow Glen, San Jose', sqft: '700 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Almaden Valley, San Jose', sqft: '1,100 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Cambrian, San Jose', sqft: '520 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Rose Garden, San Jose', sqft: '800 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Evergreen, San Jose', sqft: '480 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Family Unit', location: 'Berryessa, San Jose', sqft: '1,200 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in San Jose & Silicon Valley',

  regulations: {
    title: "Why San Jose is One of California's Best Cities for ADU Construction",
    subtitle: "San Jose has embraced ADU-friendly policies to address its housing needs. Here are the key regulations that make it easier than ever to build.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "San Jose's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in San Jose' },
      { value: 'City', label: 'Financing Programs', description: 'San Jose offers city-backed ADU financing and incentive programs' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across San Jose',
    subtitle: "We build ADUs across every San Jose neighborhood, with deep knowledge of each area's unique building requirements and architectural styles.",
    items: [
      {
        title: 'Willow Glen & Rose Garden',
        description: 'Charming tree-lined neighborhoods with spacious lots ideal for detached ADUs. These sought-after areas command premium rental rates, making ADU investment highly profitable.',
        icon: 'home',
      },
      {
        title: 'Almaden Valley & Cambrian',
        description: 'Family-friendly neighborhoods with generous lot sizes and excellent schools. Perfect for larger detached ADUs that serve as multigenerational living or premium rental units.',
        icon: 'people',
      },
      {
        title: 'Evergreen & Berryessa',
        description: 'Growing neighborhoods near VTA light rail and the new BART extension. ADUs here offer excellent investment returns with strong rental demand from tech professionals.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee San Jose permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'San Jose ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Santa Clara, CA', href: '/service-areas/santa-clara-county-ca/santa-clara-ca' },
      { title: 'ADU Contractors in Campbell, CA', href: '/service-areas/santa-clara-county-ca/campbell-ca' },
      { title: 'ADU Contractors in Milpitas, CA', href: '/service-areas/santa-clara-county-ca/milpitas-ca' },
    ],
    infoCards: [
      {
        title: "San Jose's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking',
        description: '4-foot setback from side and rear lines. 16-foot height limit. No extra parking required near VTA or transit stops.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in San Jose?',
      answer: 'A typical San Jose ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our streamlined process and local expertise help minimize delays.',
    },
    {
      question: 'How much does an ADU cost in San Jose?',
      answer: 'ADU costs in San Jose range from $70,000 for a Junior ADU to $400,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations to help you understand all costs upfront.',
    },
    {
      question: 'Do I need a permit to build an ADU in San Jose?',
      answer: "Yes, all ADUs in San Jose require building permits. The good news is San Jose has streamlined its ADU permitting process significantly. We handle the entire permit process for you and guarantee permit approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in San Jose?',
      answer: "In San Jose, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs (JADUs) are limited to 500 square feet and must be within the existing home footprint.",
    },
    {
      question: 'Can I rent out my San Jose ADU?',
      answer: 'Absolutely. San Jose encourages ADU rentals as part of its housing strategy. Many homeowners earn $2,500-$4,000+ per month renting their ADU, making it an excellent investment in the Silicon Valley rental market.',
    },
    {
      question: 'Does San Jose charge impact fees for ADUs?',
      answer: 'San Jose has waived most impact fees for ADUs under 750 square feet. For larger units, fees are significantly reduced compared to standard construction. This is one of the reasons San Jose is among the most ADU-friendly cities in California.',
    },
  ],
  faqTitle: 'Common Questions About San Jose ADUs',

  contact: {
    title: 'Get Your Free San Jose ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our San Jose ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in San Jose',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More San Jose ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Santa Clara, CA',
        description: 'Explore our ADU construction services in neighboring Santa Clara.',
        href: '/service-areas/santa-clara-county-ca/santa-clara-ca',
      },
      {
        title: 'ADU Contractors in Campbell, CA',
        description: 'Quality ADU solutions for Campbell homeowners in Santa Clara County.',
        href: '/service-areas/santa-clara-county-ca/campbell-ca',
      },
      {
        title: 'ADU Contractors in Milpitas, CA',
        description: 'Professional ADU design and construction services in Milpitas.',
        href: '/service-areas/santa-clara-county-ca/milpitas-ca',
      },
    ],
    infoCards: [
      {
        title: "San Jose's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs (JADUs) max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "San Jose requires just a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. No extra parking required if you're within half a mile of VTA light rail or bus stops.",
      },
    ],
  },
};
