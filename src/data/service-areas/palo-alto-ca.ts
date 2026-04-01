import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Palo Alto',
  county: 'Santa Clara County',
  state: 'CA',
  slug: 'palo-alto-ca',
  countySlug: 'santa-clara-county-ca',
  adjective: 'Premier',
  title: 'Premier ADU Contractors in Palo Alto, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Palo Alto's premier ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Palo Alto',
    subtitle: 'Palo Alto homeowners face some of the strictest architectural review in California. We specialize in ADU designs that sail through the city\'s Individual Review process — on time and on budget.',
    badges: [
      'Palo Alto architectural review specialists',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '100% Palo Alto permit approval rate',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Palo Alto Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a stunning detached ADU on our Old Palo Alto property. The design perfectly complements our Craftsman home while providing a modern, self-contained living space. They handled Palo Alto's strict architectural review process flawlessly and finished on time. Our ADU now houses a Stanford visiting professor at $4,200/month. Exceptional quality and professionalism.",
      name: 'Catherine W.',
      location: 'Old Palo Alto',
    },
    side: [
      {
        text: 'They designed and built a beautiful ADU that serves as my home office and guest suite. The attention to detail and quality of finishes rival new construction homes in the area.',
        name: 'Andrew H.',
        location: 'Crescent Park, Palo Alto',
      },
      {
        text: 'Our garage conversion in Midtown is now a gorgeous rental unit. Hamilton navigated the permit process expertly and delivered a space that exceeds our expectations.',
        name: 'Jennifer & Mark L.',
        location: 'Midtown, Palo Alto',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$250K - $450K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Custom design options'],
      highlighted: true,
      badge: 'Most Popular',
      badgeColor: 'yellow',
    },
    {
      title: 'Attached ADU',
      subtitle: 'Connected to your home',
      price: '$200K - $380K',
      sqft: '400 - 1,200 sq ft',
      features: ['Shared wall with main home', 'Lower construction costs', 'Separate entrance', 'Ideal for family members'],
    },
    {
      title: 'Junior ADU',
      subtitle: 'Within existing home',
      price: '$80K - $160K',
      sqft: 'Up to 500 sq ft',
      features: ['Most affordable option', 'Fastest build time', 'Minimal site work needed', 'Great starter rental'],
      badge: 'Best Value',
      badgeColor: 'green',
    },
    {
      title: 'Garage Conversion',
      subtitle: 'Transform your garage',
      price: '$100K - $200K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in Palo Alto?',
    subtitle: "Home to Stanford University and the heart of Silicon Valley's venture capital corridor, Palo Alto offers unmatched ADU investment potential.",
    stats: [
      {
        value: '$4,200+/mo',
        label: 'Rental Income',
        description: "Stanford visiting faculty, post-docs, and tech executives at VMware and HP Enterprise pay premium rents. One-bedroom ADUs in Palo Alto routinely lease for $4,000-$5,000/mo.",
        icon: 'dollar',
      },
      {
        value: '$3.5M+',
        label: 'Median Home Price',
        description: "With a median home price above $3.5 million, Palo Alto ADUs add $400K-$700K in appraised value — the highest ADU ROI in the Bay Area.",
        icon: 'trend',
      },
      {
        value: 'Strict Review',
        label: 'We Navigate It',
        description: "Palo Alto's Individual Review process and 17-foot height limit make experienced builders essential. We've passed every IR review we've submitted.",
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Palo Alto's Premier ADU Experts",
    paragraphs: [
      "From the Eichler tracts of south Palo Alto to the grand Victorians of Professorville, we've built ADUs on some of the most valuable residential land in America. We understand the city's Individual Review (IR) threshold, the 150-foot neighbor notification radius, and the floor-area-ratio calculations that trip up less experienced builders.",
      "We don't subcontract critical work. Our licensed crew has a 100% approval rate with Palo Alto's Planning & Development Services. We design to the city's daylight plane requirements from day one — no costly redesigns, no ARB surprises, no wasted months.",
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
        description: 'We assess your Palo Alto property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans that meet Palo Alto design guidelines. We handle all permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Modern Studio', location: 'Old Palo Alto', sqft: '750 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Crescent Park, Palo Alto', sqft: '1,100 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Midtown, Palo Alto', sqft: '500 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'College Terrace, Palo Alto', sqft: '850 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Barron Park, Palo Alto', sqft: '450 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Family Unit', location: 'Professorville, Palo Alto', sqft: '1,200 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Palo Alto & the Peninsula',

  regulations: {
    title: "Why Palo Alto is Embracing ADU Construction",
    subtitle: "Palo Alto has updated its ADU policies to encourage more housing. Here are the key regulations that make building easier.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Palo Alto's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in Palo Alto' },
      { value: 'City', label: 'Financing Programs', description: 'Palo Alto supports ADU development with streamlined approvals' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Palo Alto',
    subtitle: "We build ADUs across every Palo Alto neighborhood, with deep knowledge of each area's unique architectural review requirements and design standards.",
    items: [
      {
        title: 'Old Palo Alto & Crescent Park',
        description: 'Estate-sized lots of 10,000-20,000+ sq ft with homes valued at $5M-$15M. These neighborhoods require ADU designs that match the scale and quality of the primary residence — think standing-seam roofs, Eichler-inspired lines, or Craftsman detailing.',
        icon: 'home',
      },
      {
        title: 'Midtown & College Terrace',
        description: 'Compact lots near Stanford and the California Avenue shops district. College Terrace\'s R-1 zoning and 6,000 sq ft lots favor attached and junior ADUs. Strong demand from Stanford affiliates means near-zero vacancy rates.',
        icon: 'people',
      },
      {
        title: 'Professorville & Barron Park',
        description: 'Professorville is a designated historic district — ADU designs must respect the Queen Anne and Colonial Revival character. Barron Park offers larger lots with creek-adjacent setback considerations. Both neighborhoods attract long-term academic tenants.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Palo Alto permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Palo Alto ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Mountain View, CA', href: '/service-areas/santa-clara-county-ca/mountain-view-ca' },
      { title: 'ADU Contractors in Sunnyvale, CA', href: '/service-areas/santa-clara-county-ca/sunnyvale-ca' },
      { title: 'ADU Contractors in Los Gatos, CA', href: '/service-areas/santa-clara-county-ca/los-gatos-ca' },
    ],
    infoCards: [
      {
        title: "Palo Alto's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Reduced parking requirements near Caltrain and transit.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Palo Alto?',
      answer: 'A typical Palo Alto ADU project takes 7-11 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-7 months for construction. Our experience with Palo Alto design review helps minimize delays.',
    },
    {
      question: 'How much does an ADU cost in Palo Alto?',
      answer: 'ADU costs in Palo Alto range from $80,000 for a Junior ADU to $450,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations to help you understand all costs upfront.',
    },
    {
      question: 'Do I need a permit to build an ADU in Palo Alto?',
      answer: "Yes, all ADUs in Palo Alto require building permits. Palo Alto also has architectural review requirements for ADUs in certain neighborhoods. We handle the entire permit and review process for you and guarantee approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in Palo Alto?',
      answer: "In Palo Alto, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs (JADUs) are limited to 500 square feet and must be within the existing home footprint.",
    },
    {
      question: 'Can I rent out my Palo Alto ADU?',
      answer: 'Yes. California state law allows ADU rentals, and Palo Alto has strong rental demand from Stanford affiliates, tech professionals, and visiting researchers. Many homeowners earn $3,500-$5,000+ per month renting their ADU.',
    },
    {
      question: 'Does Palo Alto charge impact fees for ADUs?',
      answer: 'Palo Alto has waived most impact fees for ADUs under 750 square feet per state regulations. For larger units, fees are reduced. Combined with the exceptional rental market, Palo Alto is one of the best Bay Area cities for ADU investment.',
    },
  ],
  faqTitle: 'Common Questions About Palo Alto ADUs',

  contact: {
    title: 'Get Your Free Palo Alto ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Palo Alto ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Palo Alto',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Palo Alto ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Mountain View, CA',
        description: 'Explore our ADU construction services in neighboring Mountain View.',
        href: '/service-areas/santa-clara-county-ca/mountain-view-ca',
      },
      {
        title: 'ADU Contractors in Sunnyvale, CA',
        description: 'Quality ADU solutions for Sunnyvale homeowners in Santa Clara County.',
        href: '/service-areas/santa-clara-county-ca/sunnyvale-ca',
      },
      {
        title: 'ADU Contractors in Los Gatos, CA',
        description: 'Professional ADU design and construction services in Los Gatos.',
        href: '/service-areas/santa-clara-county-ca/los-gatos-ca',
      },
    ],
    infoCards: [
      {
        title: "Palo Alto's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs (JADUs) max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "Palo Alto requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Reduced parking near Caltrain stations.",
      },
    ],
  },
};
