import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Cupertino',
  county: 'Santa Clara County',
  state: 'CA',
  slug: 'cupertino-ca',
  countySlug: 'santa-clara-county-ca',
  adjective: 'Premier',
  title: 'Premier ADU Contractors in Cupertino, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Cupertino's premier ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Cupertino',
    subtitle: 'From permit to keys in hand — we handle every detail of your Cupertino ADU project so you can focus on what matters.',
    badges: [
      '15+ years of Silicon Valley ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day Cupertino permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Cupertino Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a beautiful detached ADU on our Monta Vista property. The design perfectly complements our home and the build quality is exceptional. They navigated Cupertino's permitting with ease and finished on schedule. Our ADU is generating $3,800/month in rental income from an Apple employee. Best home investment we've made.",
      name: 'Wei L.',
      location: 'Monta Vista, Cupertino',
    },
    side: [
      {
        text: 'We built a two-story ADU for my parents and the quality is outstanding. Hamilton handled everything and the accessibility features they suggested were thoughtful.',
        name: 'Anita S.',
        location: 'Rancho Rinconada, Cupertino',
      },
      {
        text: 'Our garage conversion in Garden Gate turned into a gorgeous studio apartment. Hamilton managed the entire process seamlessly from permits to final walkthrough.',
        name: 'Brian & Kim N.',
        location: 'Garden Gate, Cupertino',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$230K - $430K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Custom design options'],
      highlighted: true,
      badge: 'Most Popular',
      badgeColor: 'yellow',
    },
    {
      title: 'Attached ADU',
      subtitle: 'Connected to your home',
      price: '$190K - $350K',
      sqft: '400 - 1,200 sq ft',
      features: ['Shared wall with main home', 'Lower construction costs', 'Separate entrance', 'Ideal for family members'],
    },
    {
      title: 'Junior ADU',
      subtitle: 'Within existing home',
      price: '$75K - $150K',
      sqft: 'Up to 500 sq ft',
      features: ['Most affordable option', 'Fastest build time', 'Minimal site work needed', 'Great starter rental'],
      badge: 'Best Value',
      badgeColor: 'green',
    },
    {
      title: 'Garage Conversion',
      subtitle: 'Transform your garage',
      price: '$95K - $185K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in Cupertino?',
    subtitle: "Home to Apple's global headquarters and top-rated schools, Cupertino properties command premium values — and ADUs amplify that investment.",
    stats: [
      {
        value: '$3,500+/mo',
        label: 'Rental Income',
        description: "Cupertino's proximity to Apple Park and world-class schools drives exceptional rental demand for your ADU.",
        icon: 'dollar',
      },
      {
        value: '25-35%',
        label: 'Home Value Increase',
        description: 'A well-built ADU can significantly increase your Cupertino property value in this ultra-competitive market.',
        icon: 'trend',
      },
      {
        value: 'Permit-Friendly',
        label: 'Streamlined Process',
        description: 'Cupertino has streamlined ADU regulations to encourage housing development with faster permit approvals.',
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Cupertino's Premier ADU Builders",
    paragraphs: [
      "With over 15 years of experience building ADUs in Cupertino and throughout Silicon Valley, we've earned the trust of homeowners across every neighborhood. Our in-house team handles every phase — from initial design and city permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew knows Cupertino's building codes inside and out, ensuring your ADU is built right the first time.",
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
        description: 'We assess your Cupertino property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans tailored to your lot and needs. We handle all Cupertino permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Modern Studio', location: 'Monta Vista, Cupertino', sqft: '720 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Rancho Rinconada, Cupertino', sqft: '1,100 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Garden Gate, Cupertino', sqft: '510 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Oak Valley, Cupertino', sqft: '800 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Homestead Villa, Cupertino', sqft: '470 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Family Unit', location: 'South Blaney, Cupertino', sqft: '1,180 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Cupertino & Silicon Valley',

  regulations: {
    title: "Why Cupertino Embraces ADU Construction",
    subtitle: "Cupertino has updated its ADU policies to encourage more housing options. Here are the key regulations.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Cupertino's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in Cupertino' },
      { value: 'City', label: 'Financing Programs', description: 'Cupertino supports ADU development with streamlined approvals' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Cupertino',
    subtitle: "We build ADUs across every Cupertino neighborhood, with deep knowledge of each area's unique building requirements and design standards.",
    items: [
      {
        title: 'Monta Vista & Rancho Rinconada',
        description: 'Premium neighborhoods with excellent schools and spacious lots. These highly desirable areas are perfect for detached ADUs that command top rental rates from Apple employees and tech families.',
        icon: 'home',
      },
      {
        title: 'Garden Gate & Oak Valley',
        description: 'Well-established neighborhoods near Apple Park with mature landscaping and generous lot sizes. Ideal for ADUs that serve as multigenerational housing or premium rental units.',
        icon: 'people',
      },
      {
        title: 'South Blaney & Homestead Villa',
        description: 'Centrally located neighborhoods with easy access to shopping and transit. ADUs here offer excellent rental returns from tech professionals who value convenience and community.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Cupertino permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Cupertino ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Sunnyvale, CA', href: '/service-areas/santa-clara-county-ca/sunnyvale-ca' },
      { title: 'ADU Contractors in Saratoga, CA', href: '/service-areas/santa-clara-county-ca/saratoga-ca' },
      { title: 'ADU Contractors in Santa Clara, CA', href: '/service-areas/santa-clara-county-ca/santa-clara-ca' },
    ],
    infoCards: [
      {
        title: "Cupertino's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Reduced parking requirements near VTA transit stops.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Cupertino?',
      answer: 'A typical Cupertino ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our local expertise helps minimize delays.',
    },
    {
      question: 'How much does an ADU cost in Cupertino?',
      answer: 'ADU costs in Cupertino range from $75,000 for a Junior ADU to $430,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Do I need a permit to build an ADU in Cupertino?',
      answer: "Yes, all ADUs in Cupertino require building permits. Cupertino has streamlined its ADU permitting process. We handle the entire permit process for you and guarantee approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in Cupertino?',
      answer: "In Cupertino, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs are limited to 500 square feet.",
    },
    {
      question: 'Can I rent out my Cupertino ADU?',
      answer: 'Yes. Cupertino has exceptional rental demand driven by Apple and other tech companies, plus its top-rated school district. Many homeowners earn $3,000-$4,500+ per month renting their ADU.',
    },
    {
      question: 'Does Cupertino charge impact fees for ADUs?',
      answer: 'Cupertino has waived most impact fees for ADUs under 750 square feet. For larger units, fees are significantly reduced compared to standard construction.',
    },
  ],
  faqTitle: 'Common Questions About Cupertino ADUs',

  contact: {
    title: 'Get Your Free Cupertino ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Cupertino ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Cupertino',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Cupertino ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Sunnyvale, CA',
        description: 'Explore our ADU construction services in neighboring Sunnyvale.',
        href: '/service-areas/santa-clara-county-ca/sunnyvale-ca',
      },
      {
        title: 'ADU Contractors in Saratoga, CA',
        description: 'Quality ADU solutions for Saratoga homeowners in Santa Clara County.',
        href: '/service-areas/santa-clara-county-ca/saratoga-ca',
      },
      {
        title: 'ADU Contractors in Santa Clara, CA',
        description: 'Professional ADU design and construction services in Santa Clara.',
        href: '/service-areas/santa-clara-county-ca/santa-clara-ca',
      },
    ],
    infoCards: [
      {
        title: "Cupertino's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "Cupertino requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Reduced parking near VTA transit.",
      },
    ],
  },
};
