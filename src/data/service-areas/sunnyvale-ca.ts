import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Sunnyvale',
  county: 'Santa Clara County',
  state: 'CA',
  slug: 'sunnyvale-ca',
  countySlug: 'santa-clara-county-ca',
  adjective: 'Professional',
  title: 'Professional ADU Contractors in Sunnyvale, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Sunnyvale's professional ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Sunnyvale',
    subtitle: 'From permit to keys in hand — we handle every detail of your Sunnyvale ADU project so you can focus on what matters.',
    badges: [
      '15+ years of Silicon Valley ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day Sunnyvale permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Sunnyvale Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a fantastic detached ADU on our property in Lakewood Village. The modern design is beautiful and the build quality is top-notch. They handled Sunnyvale permitting smoothly and kept us updated throughout. Our ADU is now rented to an Apple engineer at $3,300/month. We couldn't be happier with the investment.",
      name: 'Michelle R.',
      location: 'Lakewood Village, Sunnyvale',
    },
    side: [
      {
        text: 'They converted our garage into a stunning rental unit. The craftsmanship is excellent and the process was completely hassle-free from start to finish.',
        name: 'Raj P.',
        location: 'Sunnyvale West',
      },
      {
        text: 'Our attached ADU for my parents is perfect. Hamilton thought of every detail — accessibility features, natural light, and a private entrance. Outstanding work.',
        name: 'Diana & Tom W.',
        location: 'Cherry Chase, Sunnyvale',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$210K - $400K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Custom design options'],
      highlighted: true,
      badge: 'Most Popular',
      badgeColor: 'yellow',
    },
    {
      title: 'Attached ADU',
      subtitle: 'Connected to your home',
      price: '$175K - $330K',
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
      price: '$90K - $175K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in Sunnyvale?',
    subtitle: "Centrally located in Silicon Valley between major tech campuses, Sunnyvale offers strong rental demand and excellent ADU investment returns.",
    stats: [
      {
        value: '$3,100+/mo',
        label: 'Rental Income',
        description: "Sunnyvale's central Silicon Valley location and proximity to Apple, Google, and LinkedIn means strong rental demand for your ADU.",
        icon: 'dollar',
      },
      {
        value: '25-35%',
        label: 'Home Value Increase',
        description: 'A well-built ADU can significantly boost your Sunnyvale property value in this competitive housing market.',
        icon: 'trend',
      },
      {
        value: 'Permit-Friendly',
        label: 'Streamlined Process',
        description: 'Sunnyvale has adopted ADU-friendly regulations with faster permitting to support housing development.',
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Sunnyvale's Professional ADU Builders",
    paragraphs: [
      "With over 15 years of experience building ADUs in Sunnyvale and throughout Silicon Valley, we've earned the trust of homeowners across every neighborhood. Our in-house team handles every phase — from initial design and city permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew knows Sunnyvale's building codes inside and out, ensuring your ADU is built right the first time.",
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
        description: 'We assess your Sunnyvale property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans tailored to your lot and needs. We handle all Sunnyvale permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Modern Studio', location: 'Lakewood Village, Sunnyvale', sqft: '700 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Cherry Chase, Sunnyvale', sqft: '1,080 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Sunnyvale West', sqft: '500 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Raynor Park, Sunnyvale', sqft: '780 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Ponderosa Park, Sunnyvale', sqft: '450 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Family Unit', location: 'Birdland, Sunnyvale', sqft: '1,150 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Sunnyvale & Silicon Valley',

  regulations: {
    title: "Why Sunnyvale Supports ADU Construction",
    subtitle: "Sunnyvale has adopted progressive ADU policies to help address housing needs. Here are the key regulations.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Sunnyvale's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in Sunnyvale' },
      { value: 'City', label: 'Financing Programs', description: 'Sunnyvale supports ADU development with streamlined approvals' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Sunnyvale',
    subtitle: "We build ADUs across every Sunnyvale neighborhood, with deep knowledge of each area's unique building requirements and character.",
    items: [
      {
        title: 'Lakewood Village & Cherry Chase',
        description: 'Established neighborhoods with well-maintained homes and generous lots. These family-friendly areas are perfect for detached ADUs that attract tech professionals and families.',
        icon: 'home',
      },
      {
        title: 'Sunnyvale West & Raynor Park',
        description: 'Walkable neighborhoods near downtown Murphy Avenue with charming homes. ADUs here benefit from proximity to dining, shopping, and Caltrain for excellent rental appeal.',
        icon: 'people',
      },
      {
        title: 'Birdland & Ponderosa Park',
        description: 'Popular residential areas near major tech campuses. ADUs in these neighborhoods command strong rental rates from professionals working at nearby Apple, Google, and Juniper Networks.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Sunnyvale permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Sunnyvale ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Mountain View, CA', href: '/service-areas/santa-clara-county-ca/mountain-view-ca' },
      { title: 'ADU Contractors in Cupertino, CA', href: '/service-areas/santa-clara-county-ca/cupertino-ca' },
      { title: 'ADU Contractors in Santa Clara, CA', href: '/service-areas/santa-clara-county-ca/santa-clara-ca' },
    ],
    infoCards: [
      {
        title: "Sunnyvale's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Reduced parking requirements near Caltrain and VTA stops.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Sunnyvale?',
      answer: 'A typical Sunnyvale ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our local expertise helps minimize delays.',
    },
    {
      question: 'How much does an ADU cost in Sunnyvale?',
      answer: 'ADU costs in Sunnyvale range from $70,000 for a Junior ADU to $400,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Do I need a permit to build an ADU in Sunnyvale?',
      answer: "Yes, all ADUs in Sunnyvale require building permits. Sunnyvale has streamlined its ADU permitting process. We handle the entire permit process for you and guarantee approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in Sunnyvale?',
      answer: "In Sunnyvale, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs are limited to 500 square feet.",
    },
    {
      question: 'Can I rent out my Sunnyvale ADU?',
      answer: 'Absolutely. Sunnyvale has excellent rental demand from tech professionals. Many homeowners earn $2,700-$4,000+ per month renting their ADU, making it a smart investment in the Silicon Valley market.',
    },
    {
      question: 'Does Sunnyvale charge impact fees for ADUs?',
      answer: 'Sunnyvale has waived most impact fees for ADUs under 750 square feet. For larger units, fees are significantly reduced compared to standard construction.',
    },
  ],
  faqTitle: 'Common Questions About Sunnyvale ADUs',

  contact: {
    title: 'Get Your Free Sunnyvale ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Sunnyvale ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Sunnyvale',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Sunnyvale ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Mountain View, CA',
        description: 'Explore our ADU construction services in neighboring Mountain View.',
        href: '/service-areas/santa-clara-county-ca/mountain-view-ca',
      },
      {
        title: 'ADU Contractors in Cupertino, CA',
        description: 'Quality ADU solutions for Cupertino homeowners in Santa Clara County.',
        href: '/service-areas/santa-clara-county-ca/cupertino-ca',
      },
      {
        title: 'ADU Contractors in Santa Clara, CA',
        description: 'Professional ADU design and construction services in Santa Clara.',
        href: '/service-areas/santa-clara-county-ca/santa-clara-ca',
      },
    ],
    infoCards: [
      {
        title: "Sunnyvale's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "Sunnyvale requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Reduced parking near Caltrain and VTA.",
      },
    ],
  },
};
