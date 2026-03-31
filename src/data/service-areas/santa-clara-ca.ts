import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Santa Clara',
  county: 'Santa Clara County',
  state: 'CA',
  slug: 'santa-clara-ca',
  countySlug: 'santa-clara-county-ca',
  adjective: 'Trusted',
  title: 'Trusted ADU Contractors in Santa Clara, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Santa Clara's trusted ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Santa Clara',
    subtitle: 'From permit to keys in hand — we handle every detail of your Santa Clara ADU project so you can focus on what matters.',
    badges: [
      '15+ years of Silicon Valley ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day Santa Clara permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Santa Clara Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built an incredible detached ADU in our backyard in the Old Quad neighborhood. The modern design is stunning and the build quality rivals new construction. They handled Santa Clara's permitting smoothly and delivered on time. Our ADU is now rented at $3,100/month to a tech professional. An amazing return on our investment.",
      name: 'Tom G.',
      location: 'Old Quad, Santa Clara',
    },
    side: [
      {
        text: 'We converted our garage into a beautiful in-law suite. Hamilton made the whole process easy and the finished product is better than we ever imagined.',
        name: 'Maria V.',
        location: 'Washington Square, Santa Clara',
      },
      {
        text: 'Our attached ADU is perfect for my elderly mother. Hamilton included every accessibility feature we needed and finished the project on schedule.',
        name: 'Paul & Susan K.',
        location: 'Rivermark, Santa Clara',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$200K - $390K',
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
      price: '$65K - $130K',
      sqft: 'Up to 500 sq ft',
      features: ['Most affordable option', 'Fastest build time', 'Minimal site work needed', 'Great starter rental'],
      badge: 'Best Value',
      badgeColor: 'green',
    },
    {
      title: 'Garage Conversion',
      subtitle: 'Transform your garage',
      price: '$85K - $170K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in Santa Clara?',
    subtitle: "Home to Intel, Nvidia, and Santa Clara University, the city offers strong rental demand and excellent ADU investment potential.",
    stats: [
      {
        value: '$2,900+/mo',
        label: 'Rental Income',
        description: "Santa Clara's tech employers and university community create consistent rental demand for your ADU from day one.",
        icon: 'dollar',
      },
      {
        value: '25-35%',
        label: 'Home Value Increase',
        description: 'A well-built ADU can significantly boost your Santa Clara property value in this growing market.',
        icon: 'trend',
      },
      {
        value: 'Permit-Friendly',
        label: 'Streamlined Process',
        description: 'Santa Clara has streamlined ADU regulations with reduced fees and faster permit approvals.',
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Santa Clara's Trusted ADU Experts",
    paragraphs: [
      "With over 15 years of experience building ADUs in Santa Clara and throughout Silicon Valley, we've earned the trust of homeowners across every neighborhood. Our in-house team handles every phase — from initial design and city permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew knows Santa Clara's building codes inside and out, ensuring your ADU is built right the first time.",
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
        description: 'We assess your Santa Clara property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans tailored to your lot and needs. We handle all Santa Clara permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Modern Studio', location: 'Old Quad, Santa Clara', sqft: '680 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Washington Square, Santa Clara', sqft: '1,050 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Rivermark, Santa Clara', sqft: '490 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Agnew, Santa Clara', sqft: '760 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Central Park, Santa Clara', sqft: '450 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Family Unit', location: 'Briarwood, Santa Clara', sqft: '1,150 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Santa Clara & Silicon Valley',

  regulations: {
    title: "Why Santa Clara Supports ADU Construction",
    subtitle: "Santa Clara has adopted ADU-friendly policies to support housing development. Here are the key regulations.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Santa Clara's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in Santa Clara' },
      { value: 'City', label: 'Financing Programs', description: 'Santa Clara supports ADU development with streamlined approvals' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Santa Clara',
    subtitle: "We build ADUs across every Santa Clara neighborhood, with deep knowledge of each area's unique building requirements.",
    items: [
      {
        title: 'Old Quad & Washington Square',
        description: 'Historic neighborhoods near Santa Clara University with charming homes and mature trees. These walkable areas are ideal for ADUs that attract university staff, students, and young professionals.',
        icon: 'home',
      },
      {
        title: 'Rivermark & Agnew',
        description: 'Modern neighborhoods with newer homes and growing communities. ADUs here benefit from proximity to major tech campuses and excellent amenities.',
        icon: 'people',
      },
      {
        title: 'Central Park & Briarwood',
        description: 'Established residential areas with well-maintained homes and convenient access to transit. ADUs in these neighborhoods offer solid rental returns from tech professionals.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Santa Clara permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Santa Clara ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in San Jose, CA', href: '/service-areas/santa-clara-county-ca/san-jose-ca' },
      { title: 'ADU Contractors in Sunnyvale, CA', href: '/service-areas/santa-clara-county-ca/sunnyvale-ca' },
      { title: 'ADU Contractors in Campbell, CA', href: '/service-areas/santa-clara-county-ca/campbell-ca' },
    ],
    infoCards: [
      {
        title: "Santa Clara's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Reduced parking requirements near Caltrain and VTA.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Santa Clara?',
      answer: 'A typical Santa Clara ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our local expertise helps minimize delays.',
    },
    {
      question: 'How much does an ADU cost in Santa Clara?',
      answer: 'ADU costs in Santa Clara range from $65,000 for a Junior ADU to $390,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Do I need a permit to build an ADU in Santa Clara?',
      answer: "Yes, all ADUs in Santa Clara require building permits. Santa Clara has streamlined its ADU permitting process. We handle the entire permit process for you and guarantee approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in Santa Clara?',
      answer: "In Santa Clara, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs are limited to 500 square feet.",
    },
    {
      question: 'Can I rent out my Santa Clara ADU?',
      answer: 'Yes. Santa Clara has strong rental demand from Intel, Nvidia, and Santa Clara University employees. Many homeowners earn $2,500-$3,800+ per month renting their ADU.',
    },
    {
      question: 'Does Santa Clara charge impact fees for ADUs?',
      answer: 'Santa Clara has waived most impact fees for ADUs under 750 square feet. For larger units, fees are significantly reduced compared to standard construction.',
    },
  ],
  faqTitle: 'Common Questions About Santa Clara ADUs',

  contact: {
    title: 'Get Your Free Santa Clara ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Santa Clara ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Santa Clara',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Santa Clara ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in San Jose, CA',
        description: 'Explore our ADU construction services in neighboring San Jose.',
        href: '/service-areas/santa-clara-county-ca/san-jose-ca',
      },
      {
        title: 'ADU Contractors in Sunnyvale, CA',
        description: 'Quality ADU solutions for Sunnyvale homeowners in Santa Clara County.',
        href: '/service-areas/santa-clara-county-ca/sunnyvale-ca',
      },
      {
        title: 'ADU Contractors in Campbell, CA',
        description: 'Professional ADU design and construction services in Campbell.',
        href: '/service-areas/santa-clara-county-ca/campbell-ca',
      },
    ],
    infoCards: [
      {
        title: "Santa Clara's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "Santa Clara requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Reduced parking near Caltrain and VTA.",
      },
    ],
  },
};
