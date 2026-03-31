import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Milpitas',
  county: 'Santa Clara County',
  state: 'CA',
  slug: 'milpitas-ca',
  countySlug: 'santa-clara-county-ca',
  adjective: 'Trusted',
  title: 'Trusted ADU Contractors in Milpitas, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Milpitas's trusted ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Milpitas',
    subtitle: 'From permit to keys in hand — we handle every detail of your Milpitas ADU project so you can focus on what matters.',
    badges: [
      '15+ years of Silicon Valley ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day Milpitas permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Milpitas Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a beautiful detached ADU on our property in Sunnyhills. The modern design is fantastic and the build quality is exceptional. They handled Milpitas permitting smoothly and finished ahead of schedule. Our ADU is now rented at $2,800/month to a tech professional working in nearby Fremont. An excellent investment for our family.",
      name: 'Arun & Priya S.',
      location: 'Sunnyhills, Milpitas',
    },
    side: [
      {
        text: 'We converted our garage into a rental unit and the transformation is amazing. Hamilton managed everything and the final product looks brand new.',
        name: 'Tony L.',
        location: 'Calaveras Hills, Milpitas',
      },
      {
        text: 'Our attached ADU for my in-laws is perfect. Hamilton included all the accessibility features we requested and the quality is outstanding.',
        name: 'Sarah & Mike D.',
        location: 'Summitpointe, Milpitas',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$195K - $370K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Custom design options'],
      highlighted: true,
      badge: 'Most Popular',
      badgeColor: 'yellow',
    },
    {
      title: 'Attached ADU',
      subtitle: 'Connected to your home',
      price: '$160K - $300K',
      sqft: '400 - 1,200 sq ft',
      features: ['Shared wall with main home', 'Lower construction costs', 'Separate entrance', 'Ideal for family members'],
    },
    {
      title: 'Junior ADU',
      subtitle: 'Within existing home',
      price: '$60K - $125K',
      sqft: 'Up to 500 sq ft',
      features: ['Most affordable option', 'Fastest build time', 'Minimal site work needed', 'Great starter rental'],
      badge: 'Best Value',
      badgeColor: 'green',
    },
    {
      title: 'Garage Conversion',
      subtitle: 'Transform your garage',
      price: '$80K - $160K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in Milpitas?',
    subtitle: "Strategically located at the crossroads of Silicon Valley and the East Bay, Milpitas offers strong rental demand and growing property values.",
    stats: [
      {
        value: '$2,700+/mo',
        label: 'Rental Income',
        description: "Milpitas's proximity to major tech employers and the new BART station means steady rental demand for your ADU.",
        icon: 'dollar',
      },
      {
        value: '25-35%',
        label: 'Home Value Increase',
        description: 'A well-built ADU can significantly boost your Milpitas property value as the area continues to grow.',
        icon: 'trend',
      },
      {
        value: 'Permit-Friendly',
        label: 'Streamlined Process',
        description: 'Milpitas has adopted ADU-friendly regulations with streamlined permitting to encourage housing development.',
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Milpitas's Trusted ADU Experts",
    paragraphs: [
      "With over 15 years of experience building ADUs in Milpitas and throughout Silicon Valley, we've earned the trust of homeowners across every neighborhood. Our in-house team handles every phase — from initial design and city permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew knows Milpitas's building codes inside and out, ensuring your ADU is built right the first time.",
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
        description: 'We assess your Milpitas property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans tailored to your lot and needs. We handle all Milpitas permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Modern Studio', location: 'Sunnyhills, Milpitas', sqft: '660 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Calaveras Hills, Milpitas', sqft: '1,050 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Summitpointe, Milpitas', sqft: '480 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Jacklin Road area, Milpitas', sqft: '740 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Midtown Milpitas', sqft: '440 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Family Unit', location: 'Serra Center, Milpitas', sqft: '1,100 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Milpitas & North Silicon Valley',

  regulations: {
    title: "Why Milpitas is Great for ADU Construction",
    subtitle: "Milpitas has embraced ADU-friendly policies to support its growing community. Here are the key regulations.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Milpitas's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in Milpitas' },
      { value: 'BART', label: 'Transit Access', description: "Milpitas BART station boosts rental demand and eliminates parking requirements nearby" },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Milpitas',
    subtitle: "We build ADUs across every Milpitas neighborhood, with deep knowledge of each area's unique building requirements.",
    items: [
      {
        title: 'Sunnyhills & Calaveras Hills',
        description: 'Established hillside neighborhoods with spacious lots and family-friendly communities. These areas are ideal for detached ADUs that offer privacy and attractive rental income.',
        icon: 'home',
      },
      {
        title: 'Summitpointe & Serra Center',
        description: 'Newer neighborhoods with modern homes near shopping and dining at the Great Mall area. ADUs here attract tech professionals who want convenient living near major employers.',
        icon: 'people',
      },
      {
        title: 'Midtown & Transit Village',
        description: 'Centrally located neighborhoods near the Milpitas BART station. ADUs in these transit-rich areas are in high demand, with no extra parking requirements, making them ideal investments.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Milpitas permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Milpitas ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in San Jose, CA', href: '/service-areas/santa-clara-county-ca/san-jose-ca' },
      { title: 'ADU Contractors in Santa Clara, CA', href: '/service-areas/santa-clara-county-ca/santa-clara-ca' },
      { title: 'ADU Contractors in Sunnyvale, CA', href: '/service-areas/santa-clara-county-ca/sunnyvale-ca' },
    ],
    infoCards: [
      {
        title: "Milpitas's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking',
        description: '4-foot setback from side and rear lines. 16-foot height limit. No extra parking required near BART station.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Milpitas?',
      answer: 'A typical Milpitas ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our local expertise helps minimize delays.',
    },
    {
      question: 'How much does an ADU cost in Milpitas?',
      answer: 'ADU costs in Milpitas range from $60,000 for a Junior ADU to $370,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Do I need a permit to build an ADU in Milpitas?',
      answer: "Yes, all ADUs in Milpitas require building permits. Milpitas has streamlined its ADU permitting process. We handle the entire permit process for you and guarantee approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in Milpitas?',
      answer: "In Milpitas, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs are limited to 500 square feet.",
    },
    {
      question: 'Can I rent out my Milpitas ADU?',
      answer: 'Absolutely. Milpitas has strong rental demand especially near the BART station. Many homeowners earn $2,400-$3,500+ per month renting their ADU to tech professionals.',
    },
    {
      question: 'Does Milpitas charge impact fees for ADUs?',
      answer: 'Milpitas has waived most impact fees for ADUs under 750 square feet. For larger units, fees are significantly reduced compared to standard construction.',
    },
  ],
  faqTitle: 'Common Questions About Milpitas ADUs',

  contact: {
    title: 'Get Your Free Milpitas ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Milpitas ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Milpitas',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Milpitas ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in San Jose, CA',
        description: 'Explore our ADU construction services in neighboring San Jose.',
        href: '/service-areas/santa-clara-county-ca/san-jose-ca',
      },
      {
        title: 'ADU Contractors in Santa Clara, CA',
        description: 'Quality ADU solutions for Santa Clara homeowners.',
        href: '/service-areas/santa-clara-county-ca/santa-clara-ca',
      },
      {
        title: 'ADU Contractors in Sunnyvale, CA',
        description: 'Professional ADU design and construction services in Sunnyvale.',
        href: '/service-areas/santa-clara-county-ca/sunnyvale-ca',
      },
    ],
    infoCards: [
      {
        title: "Milpitas's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "Milpitas requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. No parking required near BART.",
      },
    ],
  },
};
