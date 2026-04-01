import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Calistoga',
  county: 'Napa County',
  state: 'CA',
  slug: 'calistoga-ca',
  countySlug: 'napa-county-ca',
  adjective: 'Skilled',
  title: 'Skilled ADU Contractors in Calistoga, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Calistoga's skilled ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Calistoga',
    subtitle: 'Calistoga is Napa Valley\'s hot springs capital — a town of 5,000 where Old Faithful Geyser, world-class spas, and Silver Rose winery create year-round tourism demand that makes ADU investment exceptionally rewarding.',
    badges: [
      'Calistoga\'s resort-town ADU specialists',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Calistoga Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a charming detached ADU on our Calistoga property and it's absolutely perfect. They understood the small-town character we wanted to preserve while creating a modern, comfortable guest cottage. The team handled all the permits, worked around our hot springs schedule, and delivered a unit that now earns fantastic vacation rental income. Couldn't recommend them more highly.",
      name: 'Steven & Karen B.',
      location: 'Silverado Trail, Calistoga',
    },
    side: [
      {
        text: 'Our garage conversion turned into a beautiful spa-inspired guest suite. Hamilton brought incredible craftsmanship and creativity to a project that perfectly fits Calistoga\'s resort-town character.',
        name: 'Linda F.',
        location: 'Downtown, Calistoga',
      },
      {
        text: 'Built a Junior ADU for rental income and the quality exceeded expectations. Hamilton made the permitting process painless and the finished unit is generating great returns.',
        name: 'James & Mia R.',
        location: 'Tubbs Lane, Calistoga',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$210K - $400K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Resort-town inspired design'],
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
    title: 'Why Build an ADU in Calistoga?',
    subtitle: "Calistoga's hot springs, world-class wineries, and resort-town appeal make it a prime location for ADU investment. Here's why homeowners are building.",
    stats: [
      {
        value: '$3,800+/mo',
        label: 'Rental Income',
        description: "With Indian Springs, Solage, and Dr. Wilkinson's drawing spa visitors year-round, plus Chateau Montelena and Sterling Vineyards nearby, Calistoga ADUs command $250-$400/night as vacation rentals.",
        icon: 'dollar',
      },
      {
        value: '25-35%',
        label: 'Home Value Increase',
        description: "In a town of just 5,000 residents where median home prices approach $1 million, a well-built ADU adds $200K-$350K in appraised value while generating vacation rental income.",
        icon: 'trend',
      },
      {
        value: 'Year-Round',
        label: 'Tourism Demand',
        description: "Unlike seasonal wine regions, Calistoga's hot springs — including the famous Old Faithful Geyser — draw visitors even in winter, ensuring 70%+ occupancy rates for well-appointed vacation rental ADUs.",
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Calistoga's Skilled ADU Experts",
    paragraphs: [
      "With over 15 years of experience building ADUs in Napa Valley, we've earned the trust of Calistoga homeowners from the Silverado Trail corridor to the Bennett Lane vineyard properties, from the walkable Lincoln Avenue downtown to the Diamond Mountain hillside estates and Tubbs Lane rural parcels. Our in-house team handles every phase — from initial design through permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew understands Calistoga's unique challenges — the fire-safe construction mandates for properties in the WUI zone following the 2017 Tubbs Fire, the geothermal considerations near the city's hot springs, and the small-town design standards that keep Calistoga's charming character intact while allowing modern ADU additions.",
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
        description: 'We assess your Calistoga property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans that reflect Calistoga\'s charming resort-town aesthetic. We handle all permitting — guaranteed approval within 60 days.',
      },
      {
        title: 'Construction',
        description: 'Our in-house crew builds your ADU with premium materials and skilled craftsmanship. Regular updates keep you informed at every milestone.',
      },
      {
        title: 'Final Walkthrough',
        description: 'We complete all inspections, hand you the keys, and ensure every detail meets your expectations. Your new ADU is ready to enjoy.',
      },
    ],
  },

  projects: [
    { title: 'Detached ADU - Spa Guest Cottage', location: 'Silverado Trail, Calistoga', sqft: '750 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Downtown, Calistoga', sqft: '1,050 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Tubbs Lane, Calistoga', sqft: '480 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Bennett Lane, Calistoga', sqft: '720 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Lincoln Avenue, Calistoga', sqft: '450 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Vineyard Retreat', location: 'Diamond Mountain, Calistoga', sqft: '1,100 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Calistoga & Upper Napa Valley',

  regulations: {
    title: "Why Calistoga is Perfect for ADU Investment",
    subtitle: "Calistoga's tourism economy and ADU-friendly policies create an ideal environment for homeowners looking to build.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Streamlined permitting gets your Calistoga ADU project moving quickly" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Reduced impact fees for ADUs under 750 sq ft' },
      { value: 'Resort', label: 'Town Appeal', description: 'Hot springs and wine country tourism drive year-round rental demand' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Calistoga',
    subtitle: "We build ADUs throughout Calistoga, with knowledge of each area's unique character, fire safety requirements, and design standards.",
    items: [
      {
        title: 'Downtown & Lincoln Avenue',
        description: 'The heart of Calistoga\'s charming resort town. Properties here benefit from walkability to hot springs, restaurants, and tasting rooms — commanding premium vacation rental rates.',
        icon: 'home',
      },
      {
        title: 'Silverado Trail & Bennett Lane',
        description: 'Vineyard-adjacent properties with stunning views of the Palisades and surrounding mountains. ADUs here serve as elegant guest retreats in an unparalleled wine country setting.',
        icon: 'people',
      },
      {
        title: 'Tubbs Lane & Diamond Mountain',
        description: 'Spacious rural properties surrounded by vineyards and natural beauty. These areas offer generous lot sizes ideal for detached ADUs with fire-safe construction standards.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee permit approval within 60 days and build to Calistoga\'s exacting standards.',
    resourcesTitle: 'Calistoga ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in St. Helena, CA', href: '/service-areas/napa-county-ca/st-helena-ca' },
      { title: 'ADU Contractors in Napa, CA', href: '/service-areas/napa-county-ca/napa-ca' },
      { title: 'ADU Contractors in Yountville, CA', href: '/service-areas/napa-county-ca/yountville-ca' },
    ],
    infoCards: [
      {
        title: "Calistoga's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Fire Safety & Setbacks',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Fire-safe construction standards apply in wildfire zones.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Calistoga?',
      answer: 'A typical Calistoga ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Properties in fire zones may require additional review time.',
    },
    {
      question: 'How much does an ADU cost in Calistoga?',
      answer: 'ADU costs in Calistoga range from $70,000 for a Junior ADU to $400,000+ for a large detached unit. The final cost depends on size, design complexity, fire-safe requirements, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Are there fire safety requirements for Calistoga ADUs?',
      answer: "Yes, many Calistoga properties are in or near wildfire zones, which may require fire-resistant materials, defensible space, and specific construction standards. Our team is experienced with these requirements and ensures your ADU meets all fire safety codes.",
    },
    {
      question: 'Can I use my Calistoga ADU as a vacation rental?',
      answer: "Calistoga's resort-town economy makes ADUs ideal for vacation rentals, subject to local short-term rental regulations. Premium ADUs can generate $3,800+ per month. We design units that appeal to wine country and hot springs visitors.",
    },
    {
      question: 'What is the maximum size for an ADU in Calistoga?',
      answer: "In Calistoga, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs (JADUs) are limited to 500 square feet within the existing home.",
    },
    {
      question: 'Does building an ADU increase my Calistoga property value?',
      answer: "Absolutely. In Calistoga's premium market, a well-built ADU can increase property value by 25-35%. Combined with strong vacation rental income from year-round tourism, an ADU is an excellent investment for Calistoga homeowners.",
    },
  ],
  faqTitle: 'Common Questions About Calistoga ADUs',

  contact: {
    title: 'Get Your Free Calistoga ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Napa Valley ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Calistoga',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Calistoga ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in St. Helena, CA',
        description: 'Explore our ADU construction services in St. Helena, just south of Calistoga.',
        href: '/service-areas/napa-county-ca/st-helena-ca',
      },
      {
        title: 'ADU Contractors in Napa, CA',
        description: 'Quality ADU solutions for homeowners in the city of Napa.',
        href: '/service-areas/napa-county-ca/napa-ca',
      },
      {
        title: 'ADU Contractors in Yountville, CA',
        description: 'Professional ADU design and construction services in Yountville.',
        href: '/service-areas/napa-county-ca/yountville-ca',
      },
    ],
    infoCards: [
      {
        title: "Calistoga's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs (JADUs) max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Fire Safety & Setback Rules',
        description: "Calistoga requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Properties in wildfire zones must meet additional fire-safe construction standards.",
      },
    ],
  },
};
