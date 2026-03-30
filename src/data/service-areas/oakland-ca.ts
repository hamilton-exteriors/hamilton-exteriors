import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Oakland',
  county: 'Alameda County',
  state: 'CA',
  slug: 'oakland-ca',
  countySlug: 'alameda-county-ca',
  adjective: 'Affordable',
  title: 'Affordable ADU Contractors in Oakland, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Oakland's trusted ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Oakland',
    subtitle: 'From permit to keys in hand — we handle every detail of your Oakland ADU project so you can focus on what matters.',
    badges: [
      '15+ years of Oakland ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day Oakland permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Oakland Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built our detached ADU in Rockridge and we couldn't be happier. From the initial design consultation to the final walkthrough, their team was professional, communicative, and detail-oriented. They handled all the permits with the city and finished on schedule. Our ADU is now rented out and generating over $3,000/month in income. Best investment we've ever made.",
      name: 'Michael T.',
      location: 'Rockridge, Oakland',
    },
    side: [
      {
        text: 'They converted our garage into a beautiful ADU for my mother-in-law. The whole process was seamless and the quality of work exceeded our expectations.',
        name: 'Sarah L.',
        location: 'Temescal, Oakland',
      },
      {
        text: 'Our two-story ADU in Montclair turned out amazing. Hamilton handled everything from permits to final inspection. Truly a turnkey experience.',
        name: 'David & Maria R.',
        location: 'Montclair, Oakland',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$180K - $350K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Custom design options'],
      highlighted: true,
      badge: 'Most Popular',
      badgeColor: 'yellow',
    },
    {
      title: 'Attached ADU',
      subtitle: 'Connected to your home',
      price: '$150K - $280K',
      sqft: '400 - 1,200 sq ft',
      features: ['Shared wall with main home', 'Lower construction costs', 'Separate entrance', 'Ideal for family members'],
    },
    {
      title: 'Junior ADU',
      subtitle: 'Within existing home',
      price: '$60K - $120K',
      sqft: 'Up to 500 sq ft',
      features: ['Most affordable option', 'Fastest build time', 'Minimal site work needed', 'Great starter rental'],
      badge: 'Best Value',
      badgeColor: 'green',
    },
    {
      title: 'Garage Conversion',
      subtitle: 'Transform your garage',
      price: '$80K - $150K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in Oakland?',
    subtitle: "Oakland is one of the best cities in California for ADU investment. Here's why homeowners are adding ADUs to their properties.",
    stats: [
      {
        value: '$2,500+/mo',
        label: 'Rental Income',
        description: "Oakland's strong rental market means your ADU can generate significant monthly income from day one.",
        icon: 'dollar',
      },
      {
        value: '20-30%',
        label: 'Home Value Increase',
        description: 'A well-built ADU can increase your Oakland property value by hundreds of thousands of dollars.',
        icon: 'trend',
      },
      {
        value: 'Permit-Friendly',
        label: 'Streamlined Process',
        description: 'Oakland has simplified ADU regulations with reduced fees and faster permit approvals to encourage development.',
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Oakland's Trusted ADU Experts",
    paragraphs: [
      "With over 15 years of experience building ADUs in Oakland, we've earned the trust of homeowners across every neighborhood. Our in-house team handles every phase of your project — from initial design and city permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew knows Oakland's building codes inside and out, ensuring your ADU is built right the first time.",
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
        description: 'We assess your property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans tailored to your lot and needs. We handle all Oakland permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Modern Studio', location: 'Rockridge, Oakland', sqft: '650 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Temescal, Oakland', sqft: '1,100 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Montclair, Oakland', sqft: '480 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Oakland Hills', sqft: '750 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'West Oakland', sqft: '450 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Family Unit', location: 'Jack London District', sqft: '1,200 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Oakland & the East Bay',

  regulations: {
    title: "Why Oakland is California's Best City for ADU Construction",
    subtitle: "Oakland is one of California's most ADU-friendly cities. Here are the key regulations that make it easier than ever to build.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Oakland's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in Oakland' },
      { value: 'City', label: 'Financing Programs', description: 'Oakland offers city-backed ADU financing and incentive programs' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Oakland',
    subtitle: "We build ADUs across every Oakland neighborhood, with deep knowledge of each area's unique building requirements and architectural styles.",
    items: [
      {
        title: 'Rockridge & Temescal',
        description: 'Classic Craftsman homes with spacious backyards ideal for detached ADUs. These walkable neighborhoods command top rental rates, making ADU investment highly profitable.',
        icon: 'home',
      },
      {
        title: 'Oakland Hills & Montclair',
        description: 'Hillside properties with stunning views. We specialize in ADU designs that work with sloped terrain and complement the natural surroundings while maximizing living space.',
        icon: 'people',
      },
      {
        title: 'West Oakland & Jack London',
        description: 'Rapidly developing areas where ADUs offer exceptional investment returns. Urban lots benefit from garage conversions and attached ADUs that maximize compact spaces.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Oakland permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Oakland ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Berkeley, CA', href: '/service-areas/alameda-county-ca/berkeley-ca' },
      { title: 'ADU Contractors in San Leandro, CA', href: '/service-areas/alameda-county-ca/san-leandro-ca' },
      { title: 'ADU Contractors in Fremont, CA', href: '/service-areas/alameda-county-ca/fremont-ca' },
    ],
    infoCards: [
      {
        title: "Oakland's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking',
        description: '4-foot setback from side and rear lines. 16-foot height limit. No extra parking near BART or bus stops.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Oakland?',
      answer: 'A typical Oakland ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our streamlined process and local expertise help minimize delays.',
    },
    {
      question: 'How much does an ADU cost in Oakland?',
      answer: 'ADU costs in Oakland range from $60,000 for a Junior ADU to $350,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations to help you understand all costs upfront.',
    },
    {
      question: 'Do I need a permit to build an ADU in Oakland?',
      answer: "Yes, all ADUs in Oakland require building permits. The good news is Oakland has streamlined its ADU permitting process significantly. We handle the entire permit process for you and guarantee permit approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in Oakland?',
      answer: "In Oakland, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs (JADUs) are limited to 500 square feet and must be within the existing home footprint.",
    },
    {
      question: 'Can I rent out my Oakland ADU?',
      answer: 'Absolutely. Oakland encourages ADU rentals as part of its housing strategy. There are no owner-occupancy requirements for properties with ADUs in Oakland. Many homeowners earn $2,000-$3,500+ per month renting their ADU, making it an excellent investment.',
    },
    {
      question: 'Does Oakland charge impact fees for ADUs?',
      answer: 'Oakland has waived most impact fees for ADUs under 750 square feet. For larger units, fees are significantly reduced compared to standard construction. This is one of the reasons Oakland is one of the most ADU-friendly cities in California.',
    },
  ],
  faqTitle: 'Common Questions About Oakland ADUs',

  contact: {
    title: 'Get Your Free Oakland ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Oakland ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Oakland',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Oakland ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Berkeley, CA',
        description: 'Explore our ADU construction services in Berkeley, just minutes from Oakland.',
        href: '/service-areas/alameda-county-ca/berkeley-ca',
      },
      {
        title: 'ADU Contractors in San Leandro, CA',
        description: 'Quality ADU solutions for San Leandro homeowners in Alameda County.',
        href: '/service-areas/alameda-county-ca/san-leandro-ca',
      },
      {
        title: 'ADU Contractors in Fremont, CA',
        description: 'Professional ADU design and construction services in Fremont.',
        href: '/service-areas/alameda-county-ca/fremont-ca',
      },
    ],
    infoCards: [
      {
        title: "Oakland's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs (JADUs) max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "Oakland requires just a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. No extra parking required if you're within half a mile of BART or bus stops.",
      },
    ],
  },
};
