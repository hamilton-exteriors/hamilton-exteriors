import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Campbell',
  county: 'Santa Clara County',
  state: 'CA',
  slug: 'campbell-ca',
  countySlug: 'santa-clara-county-ca',
  adjective: 'Professional',
  title: 'Professional ADU Contractors in Campbell, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Campbell's professional ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Campbell',
    subtitle: 'From permit to keys in hand — we handle every detail of your Campbell ADU project so you can focus on what matters.',
    badges: [
      '15+ years of Silicon Valley ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day Campbell permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Campbell Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a fantastic detached ADU on our property near downtown Campbell. The design is modern and functional, and the quality of construction is excellent. They handled all the permits with the city and finished on schedule. Our ADU is now generating $2,900/month in rental income. One of the best investments we've made for our family.",
      name: 'Jason & Amy L.',
      location: 'Downtown Campbell',
    },
    side: [
      {
        text: 'They converted our garage into a beautiful rental unit. The transformation is incredible — you would never know it was a garage. Highly recommend Hamilton.',
        name: 'Nicole H.',
        location: 'Central Campbell',
      },
      {
        text: 'Our attached ADU for my parents is exactly what we needed. Hamilton thought of everything and the accessibility features are perfect. Great team.',
        name: 'Chris & Tina M.',
        location: 'Hacienda Park, Campbell',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$200K - $380K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Custom design options'],
      highlighted: true,
      badge: 'Most Popular',
      badgeColor: 'yellow',
    },
    {
      title: 'Attached ADU',
      subtitle: 'Connected to your home',
      price: '$165K - $310K',
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
      price: '$85K - $165K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in Campbell?',
    subtitle: "With its vibrant downtown, excellent location, and strong housing demand, Campbell is one of the best small cities in Silicon Valley for ADU investment.",
    stats: [
      {
        value: '$2,800+/mo',
        label: 'Rental Income',
        description: "Campbell's walkable downtown and central Silicon Valley location means strong rental demand for your ADU from day one.",
        icon: 'dollar',
      },
      {
        value: '25-35%',
        label: 'Home Value Increase',
        description: 'A well-built ADU can significantly boost your Campbell property value in this desirable West Valley market.',
        icon: 'trend',
      },
      {
        value: 'Permit-Friendly',
        label: 'Streamlined Process',
        description: 'Campbell has adopted ADU-friendly regulations with streamlined permitting to encourage housing development.',
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Campbell's Professional ADU Builders",
    paragraphs: [
      "With over 15 years of experience building ADUs in Campbell and throughout Silicon Valley, we've earned the trust of homeowners across every neighborhood. Our in-house team handles every phase — from initial design and city permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew knows Campbell's building codes inside and out, ensuring your ADU is built right the first time.",
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
        description: 'We assess your Campbell property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans tailored to your lot and needs. We handle all Campbell permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Modern Studio', location: 'Downtown Campbell', sqft: '680 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Central Campbell', sqft: '1,050 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Hacienda Park, Campbell', sqft: '490 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Ainsley Park, Campbell', sqft: '750 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'San Tomas, Campbell', sqft: '450 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Family Unit', location: 'White Oaks, Campbell', sqft: '1,100 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Campbell & the West Valley',

  regulations: {
    title: "Why Campbell is Great for ADU Construction",
    subtitle: "Campbell has adopted progressive ADU policies that make building on your property easier than ever.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Campbell's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in Campbell' },
      { value: 'City', label: 'Financing Programs', description: 'Campbell supports ADU development with streamlined approvals' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Campbell',
    subtitle: "We build ADUs across every Campbell neighborhood, with deep knowledge of each area's unique building requirements.",
    items: [
      {
        title: 'Downtown & Central Campbell',
        description: 'Walkable neighborhoods near the vibrant Pruneyard and downtown Campbell Avenue. ADUs here benefit from exceptional location appeal and attract tenants who value walkability and nightlife.',
        icon: 'home',
      },
      {
        title: 'Hacienda Park & Ainsley Park',
        description: 'Established residential neighborhoods with spacious lots and mature landscaping. These family-friendly areas are ideal for detached ADUs that serve as rentals or multigenerational housing.',
        icon: 'people',
      },
      {
        title: 'San Tomas & White Oaks',
        description: 'Well-connected neighborhoods with easy access to highways and transit. ADUs here offer excellent rental returns from professionals commuting to tech campuses across Silicon Valley.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Campbell permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Campbell ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in San Jose, CA', href: '/service-areas/santa-clara-county-ca/san-jose-ca' },
      { title: 'ADU Contractors in Los Gatos, CA', href: '/service-areas/santa-clara-county-ca/los-gatos-ca' },
      { title: 'ADU Contractors in Saratoga, CA', href: '/service-areas/santa-clara-county-ca/saratoga-ca' },
    ],
    infoCards: [
      {
        title: "Campbell's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Reduced parking requirements near VTA light rail stops.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Campbell?',
      answer: 'A typical Campbell ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our local expertise helps minimize delays.',
    },
    {
      question: 'How much does an ADU cost in Campbell?',
      answer: 'ADU costs in Campbell range from $65,000 for a Junior ADU to $380,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Do I need a permit to build an ADU in Campbell?',
      answer: "Yes, all ADUs in Campbell require building permits. Campbell has streamlined its ADU permitting process. We handle the entire permit process for you and guarantee approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in Campbell?',
      answer: "In Campbell, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs are limited to 500 square feet.",
    },
    {
      question: 'Can I rent out my Campbell ADU?',
      answer: 'Absolutely. Campbell has strong rental demand thanks to its central location and vibrant downtown. Many homeowners earn $2,500-$3,500+ per month renting their ADU.',
    },
    {
      question: 'Does Campbell charge impact fees for ADUs?',
      answer: 'Campbell has waived most impact fees for ADUs under 750 square feet. For larger units, fees are significantly reduced compared to standard construction.',
    },
  ],
  faqTitle: 'Common Questions About Campbell ADUs',

  contact: {
    title: 'Get Your Free Campbell ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Campbell ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Campbell',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Campbell ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in San Jose, CA',
        description: 'Explore our ADU construction services in neighboring San Jose.',
        href: '/service-areas/santa-clara-county-ca/san-jose-ca',
      },
      {
        title: 'ADU Contractors in Los Gatos, CA',
        description: 'Quality ADU solutions for Los Gatos homeowners in Santa Clara County.',
        href: '/service-areas/santa-clara-county-ca/los-gatos-ca',
      },
      {
        title: 'ADU Contractors in Saratoga, CA',
        description: 'Professional ADU design and construction services in Saratoga.',
        href: '/service-areas/santa-clara-county-ca/saratoga-ca',
      },
    ],
    infoCards: [
      {
        title: "Campbell's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "Campbell requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Reduced parking near VTA light rail.",
      },
    ],
  },
};
