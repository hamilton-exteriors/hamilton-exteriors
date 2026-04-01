import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'American Canyon',
  county: 'Napa County',
  state: 'CA',
  slug: 'american-canyon-ca',
  countySlug: 'napa-county-ca',
  adjective: 'Expert',
  title: 'Expert ADU Contractors in American Canyon, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is American Canyon's expert ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in American Canyon',
    subtitle: 'American Canyon is the Gateway to Napa Valley — a fast-growing city of 21,000+ with spacious new developments, Wetlands Edge nature preserve, and some of the most ADU-friendly lot sizes in the county.',
    badges: [
      'American Canyon\'s fastest-growing ADU builder',
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
    sectionTitle: 'What American Canyon Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a gorgeous detached ADU in our backyard and we're thrilled with the result. They handled everything from design to permits to construction, and the quality is top-notch. Living at the gateway to Napa Valley, our ADU has been perfect for hosting family visiting wine country. The team was communicative, on-budget, and finished right on schedule.",
      name: 'Carlos & Diana S.',
      location: 'Canyon Estates, American Canyon',
    },
    side: [
      {
        text: 'Our garage conversion ADU turned out beautifully. Hamilton made the entire process easy and stress-free. The finished unit is modern, comfortable, and already generating rental income.',
        name: 'Patricia W.',
        location: 'Village Walk, American Canyon',
      },
      {
        text: 'We built a Junior ADU for my mother and it exceeded all our expectations. The attention to detail and craftsmanship is evident in every corner.',
        name: 'Kevin T.',
        location: 'Napa Junction, American Canyon',
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
      price: '$160K - $300K',
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
      price: '$85K - $160K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in American Canyon?',
    subtitle: "American Canyon offers spacious lots and growing demand at the gateway to Napa Valley. Here's why homeowners are adding ADUs to their properties.",
    stats: [
      {
        value: '$2,800+/mo',
        label: 'Rental Income',
        description: "American Canyon sits at the crossroads of Napa Valley wine country and the Bay Area — drawing renters who work in Vallejo, Napa, or commute south on I-80, with one-bedrooms commanding $2,400+/month.",
        icon: 'dollar',
      },
      {
        value: '20-30%',
        label: 'Home Value Increase',
        description: "American Canyon's population has doubled since 2000, driving steady home appreciation. A quality ADU adds $150K-$300K in appraised value while generating monthly cash flow.",
        icon: 'trend',
      },
      {
        value: 'Spacious Lots',
        label: 'Room to Build',
        description: "Unlike older Napa Valley towns, American Canyon's post-2000 developments like Canyon Estates and Village Walk feature 5,000-7,000+ sq ft lots with modern utilities already sized for ADU additions.",
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "American Canyon's Expert ADU Builders",
    paragraphs: [
      "With over 15 years of experience building ADUs across Napa County, we've earned the trust of homeowners in American Canyon's Canyon Estates, Village Walk, Napa Junction, and the newer Green Island and Eucalyptus Grove developments. Our in-house team handles every phase — from initial design through city permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew understands American Canyon's unique position as the county's youngest and fastest-growing city — with newer infrastructure, generous lot sizes in Wetlands Edge-adjacent developments, and building codes that reflect modern California standards rather than the historic preservation requirements of upper Napa Valley towns.",
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
        description: 'We assess your American Canyon property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans tailored to your lot and neighborhood. We handle all permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Modern Build', location: 'Canyon Estates, American Canyon', sqft: '750 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Village Walk, American Canyon', sqft: '1,050 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Napa Junction, American Canyon', sqft: '480 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Green Island, American Canyon', sqft: '700 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Town Center, American Canyon', sqft: '420 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Family Unit', location: 'Eucalyptus Grove, American Canyon', sqft: '1,100 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in American Canyon & Napa County',

  regulations: {
    title: "Why American Canyon is Great for ADU Construction",
    subtitle: "American Canyon has adopted ADU-friendly policies that make building easier and more affordable for homeowners.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Streamlined permitting gets your ADU project approved quickly" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Reduced impact fees for ADUs under 750 sq ft' },
      { value: 'Growing', label: 'Market Demand', description: 'Rapidly growing community with strong rental demand and rising property values' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across American Canyon',
    subtitle: "We build ADUs across every American Canyon neighborhood, with knowledge of each area's specific building requirements and community character.",
    items: [
      {
        title: 'Canyon Estates & Village Walk',
        description: 'Established neighborhoods with spacious lots perfect for detached ADUs. Family-friendly communities with strong rental demand from professionals commuting to Napa and the Bay Area.',
        icon: 'home',
      },
      {
        title: 'Napa Junction & Town Center',
        description: 'Centrally located neighborhoods near shopping and transit. Ideal for garage conversions and attached ADUs that serve long-term tenants or multigenerational families.',
        icon: 'people',
      },
      {
        title: 'Green Island & Eucalyptus Grove',
        description: 'Newer developments with generous lot sizes and modern infrastructure. These areas offer excellent opportunities for custom detached ADUs with contemporary designs.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'American Canyon ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Napa, CA', href: '/service-areas/napa-county-ca/napa-ca' },
      { title: 'ADU Contractors in Yountville, CA', href: '/service-areas/napa-county-ca/yountville-ca' },
      { title: 'ADU Contractors in Calistoga, CA', href: '/service-areas/napa-county-ca/calistoga-ca' },
    ],
    infoCards: [
      {
        title: "American Canyon's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Reduced parking requirements near transit.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in American Canyon?',
      answer: 'A typical American Canyon ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our streamlined process and local expertise help minimize delays.',
    },
    {
      question: 'How much does an ADU cost in American Canyon?',
      answer: 'ADU costs in American Canyon range from $65,000 for a Junior ADU to $380,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations to help you understand all costs upfront.',
    },
    {
      question: 'Do I need a permit to build an ADU in American Canyon?',
      answer: "Yes, all ADUs in American Canyon require building permits. The good news is the city has streamlined its ADU permitting process. We handle the entire permit process for you and guarantee approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in American Canyon?',
      answer: "In American Canyon, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs (JADUs) are limited to 500 square feet within the existing home.",
    },
    {
      question: 'Can I rent out my American Canyon ADU?',
      answer: 'Yes, ADU rentals are permitted in American Canyon. Many homeowners earn $2,500-$3,000+ per month renting their ADU. The city\'s location at the gateway to Napa Valley also creates potential for vacation rental income.',
    },
    {
      question: 'Is American Canyon a good place to build an ADU?',
      answer: 'Absolutely. American Canyon offers spacious lots, growing population, and strong rental demand from both Napa Valley workers and Bay Area commuters. The city\'s ADU-friendly policies and relatively affordable land make it an excellent investment.',
    },
  ],
  faqTitle: 'Common Questions About American Canyon ADUs',

  contact: {
    title: 'Get Your Free American Canyon ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Napa County ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in American Canyon',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More American Canyon ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Napa, CA',
        description: 'Explore our ADU construction services in Napa, just north of American Canyon.',
        href: '/service-areas/napa-county-ca/napa-ca',
      },
      {
        title: 'ADU Contractors in Yountville, CA',
        description: 'Quality ADU solutions for Yountville homeowners in the heart of Napa Valley.',
        href: '/service-areas/napa-county-ca/yountville-ca',
      },
      {
        title: 'ADU Contractors in Calistoga, CA',
        description: 'Professional ADU design and construction services in Calistoga.',
        href: '/service-areas/napa-county-ca/calistoga-ca',
      },
    ],
    infoCards: [
      {
        title: "American Canyon's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs (JADUs) max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "American Canyon requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Parking requirements are reduced near transit areas.",
      },
    ],
  },
};
