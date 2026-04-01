import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Napa',
  county: 'Napa County',
  state: 'CA',
  slug: 'napa-ca',
  countySlug: 'napa-county-ca',
  adjective: 'Trusted',
  title: 'Trusted ADU Contractors in Napa, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Napa's trusted ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Napa',
    subtitle: 'Napa\'s tourism-driven economy and $900K+ median home values make ADUs one of the smartest investments in wine country — whether for vacation rentals, vineyard worker housing, or multigenerational living.',
    badges: [
      'Napa wine country ADU design specialists',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      'Vacation rental & long-term ADU experts',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Napa Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a beautiful detached ADU on our property in Old Town Napa and we couldn't be happier. From navigating local permits to the final walkthrough, their team was professional, communicative, and detail-oriented. The wine country aesthetic they incorporated is stunning. Our ADU is now generating over $3,500/month as a vacation rental. Best investment we've ever made.",
      name: 'Jennifer M.',
      location: 'Old Town, Napa',
    },
    side: [
      {
        text: 'They designed and built a guest cottage ADU that perfectly matches our main home. The craftsmanship is outstanding and the whole process was seamless from start to finish.',
        name: 'Robert & Lisa K.',
        location: 'Browns Valley, Napa',
      },
      {
        text: 'Our attached ADU for my aging parents turned out beautifully. Hamilton understood the wine country character we wanted and delivered beyond expectations.',
        name: 'Angela P.',
        location: 'Westwood, Napa',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$200K - $400K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Custom wine country design'],
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
    title: 'Why Build an ADU in Napa?',
    subtitle: "Napa's booming tourism economy and high property values make it one of the best places in California to invest in an ADU. Here's why homeowners are building.",
    stats: [
      {
        value: '$3,500+/mo',
        label: 'Rental Income',
        description: "Long-term rentals in Napa average $2,800/mo for a one-bedroom, but vacation-rental ADUs near downtown tasting rooms and the Oxbow Public Market can gross $5,000+/mo in peak harvest season (Aug-Oct).",
        icon: 'dollar',
      },
      {
        value: '$925K+',
        label: 'Median Home Price',
        description: "Napa's median home price exceeds $925,000 and has risen 40% in five years. A quality ADU adds $150K-$300K in appraised value while generating income from day one.",
        icon: 'trend',
      },
      {
        value: '3.5M+',
        label: 'Annual Visitors',
        description: "Napa Valley welcomes over 3.5 million visitors each year. With the city's vacation rental permit program, your ADU can tap into wine country's $2.23 billion tourism economy.",
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Napa's Trusted ADU Experts",
    paragraphs: [
      "From the Victorian cottages along the Napa River to the vineyard estates off Silverado Trail, we've built ADUs that honor Napa's unique character. We understand the city's Downtown Specific Plan overlay, the Napa County Agricultural Preserve setbacks for properties bordering vineyards, and the short-term rental permit requirements that let you legally list on Airbnb and VRBO.",
      "We don't subcontract critical work. Our licensed crew coordinates with the Napa Community Development Department and knows the fire-hardening requirements for WUI (Wildland-Urban Interface) zones in the hillside neighborhoods. That local expertise means fewer surprises and faster approvals.",
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
        description: 'We assess your Napa property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans that complement Napa\'s wine country character. We handle all city permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Wine Country Cottage', location: 'Old Town, Napa', sqft: '700 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Browns Valley, Napa', sqft: '1,100 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Westwood, Napa', sqft: '500 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Alta Heights, Napa', sqft: '800 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Downtown Napa', sqft: '450 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Guest House', location: 'Silverado, Napa', sqft: '1,200 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Napa & Wine Country',

  regulations: {
    title: "Why Napa is a Top City for ADU Construction",
    subtitle: "Napa has embraced ADU-friendly policies to address housing needs while preserving wine country character. Here are the key regulations.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Napa's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Reduced impact fees for ADUs under 750 sq ft in Napa' },
      { value: 'Strong', label: 'Rental Demand', description: 'Tourism-driven rental market supports excellent ADU investment returns' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Napa',
    subtitle: "We build ADUs across every Napa neighborhood, with deep knowledge of each area's unique building requirements and architectural character.",
    items: [
      {
        title: 'Old Town & Downtown Napa',
        description: 'Walk to the Oxbow Public Market, First Street tasting rooms, and the Napa River Trail. Historic Victorian and Craftsman lots of 5,000-8,000 sq ft are ideal for detached guest cottages that double as high-earning vacation rentals.',
        icon: 'home',
      },
      {
        title: 'Browns Valley & Westwood',
        description: 'Quiet, family-oriented neighborhoods near Westwood Hills Park with quarter-acre lots and mature oak canopy. Strong demand from Napa Valley Unified School District families makes these areas excellent for long-term rental ADUs averaging $2,800-$3,200/mo.',
        icon: 'people',
      },
      {
        title: 'Alta Heights & Silverado',
        description: 'Hillside properties with panoramic valley and vineyard views near the Silverado Resort. These lots often fall in WUI fire zones, requiring ember-resistant vents and Class A roofing — details our crew handles from the design phase.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Napa permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Napa ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in American Canyon, CA', href: '/service-areas/napa-county-ca/american-canyon-ca' },
      { title: 'ADU Contractors in St. Helena, CA', href: '/service-areas/napa-county-ca/st-helena-ca' },
      { title: 'ADU Contractors in Yountville, CA', href: '/service-areas/napa-county-ca/yountville-ca' },
    ],
    infoCards: [
      {
        title: "Napa's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Reduced parking requirements near transit stops.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Napa?',
      answer: 'A typical Napa ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our streamlined process and local expertise help minimize delays.',
    },
    {
      question: 'How much does an ADU cost in Napa?',
      answer: 'ADU costs in Napa range from $70,000 for a Junior ADU to $400,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations to help you understand all costs upfront.',
    },
    {
      question: 'Do I need a permit to build an ADU in Napa?',
      answer: "Yes, all ADUs in Napa require building permits. The good news is Napa has streamlined its ADU permitting process significantly. We handle the entire permit process for you and guarantee permit approval within 60 days.",
    },
    {
      question: 'Can I use my Napa ADU as a vacation rental?',
      answer: "Napa's tourism economy makes ADUs ideal for vacation rentals, though local short-term rental regulations apply. Many homeowners earn $3,500+ per month through vacation rental platforms. We can design your ADU to maximize appeal to wine country visitors.",
    },
    {
      question: 'What is the maximum size for an ADU in Napa?',
      answer: "In Napa, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs (JADUs) are limited to 500 square feet and must be within the existing home footprint.",
    },
    {
      question: 'Does building an ADU increase my Napa property value?',
      answer: 'Absolutely. In Napa\'s premium real estate market, a well-built ADU can increase your property value by 25-35%. Combined with strong rental income potential from tourism, an ADU is one of the best investments a Napa homeowner can make.',
    },
  ],
  faqTitle: 'Common Questions About Napa ADUs',

  contact: {
    title: 'Get Your Free Napa ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Napa ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Napa',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Napa ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in American Canyon, CA',
        description: 'Explore our ADU construction services in American Canyon, just south of Napa.',
        href: '/service-areas/napa-county-ca/american-canyon-ca',
      },
      {
        title: 'ADU Contractors in St. Helena, CA',
        description: 'Quality ADU solutions for St. Helena homeowners in the heart of Napa Valley.',
        href: '/service-areas/napa-county-ca/st-helena-ca',
      },
      {
        title: 'ADU Contractors in Yountville, CA',
        description: 'Professional ADU design and construction services in Yountville.',
        href: '/service-areas/napa-county-ca/yountville-ca',
      },
    ],
    infoCards: [
      {
        title: "Napa's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs (JADUs) max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "Napa requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Parking requirements are reduced near transit stops and downtown areas.",
      },
    ],
  },
};
