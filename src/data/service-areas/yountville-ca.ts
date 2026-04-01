import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Yountville',
  county: 'Napa County',
  state: 'CA',
  slug: 'yountville-ca',
  countySlug: 'napa-county-ca',
  adjective: 'Experienced',
  title: 'Experienced ADU Contractors in Yountville, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Yountville's experienced ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Yountville',
    subtitle: 'Yountville is Napa Valley\'s culinary capital — home to The French Laundry, the Napa Valley Veterans Home, and just 3,000 residents in the most walkable wine country town in California. ADU demand here is extraordinary.',
    badges: [
      'Yountville\'s premier wine country ADU builder',
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
    sectionTitle: 'What Yountville Homeowners Say',
    featured: {
      text: "Hamilton Exteriors designed and built a gorgeous detached ADU on our Yountville property that feels like a boutique wine country retreat. The craftsmanship is impeccable — every detail from the custom millwork to the landscape integration was executed flawlessly. Our ADU is now one of the most sought-after vacation rentals in the area. Hamilton understood exactly what Yountville demands.",
      name: 'Richard & Anne C.',
      location: 'Washington Street, Yountville',
    },
    side: [
      {
        text: 'They converted our detached garage into a stunning guest suite with a gourmet kitchenette. The design perfectly matches Yountville\'s refined aesthetic. Outstanding work from start to finish.',
        name: 'Susan M.',
        location: 'Yount Street, Yountville',
      },
      {
        text: 'Our attached ADU for visiting family is beautifully done. Hamilton navigated the town\'s requirements with ease and delivered a unit that feels like it was always part of the home.',
        name: 'Paul & Janet D.',
        location: 'Oak Circle, Yountville',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$220K - $420K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Culinary capital-worthy design'],
      highlighted: true,
      badge: 'Most Popular',
      badgeColor: 'yellow',
    },
    {
      title: 'Attached ADU',
      subtitle: 'Connected to your home',
      price: '$180K - $340K',
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
      price: '$95K - $180K',
      sqft: '200 - 600 sq ft',
      features: ['Use existing structure', 'No new foundation needed', 'Quick turnaround', 'Cost-effective conversion'],
    },
  ],

  whyBuildStats: {
    title: 'Why Build an ADU in Yountville?',
    subtitle: "Yountville's world-renowned dining scene, art galleries, and walkable charm make it one of the most desirable addresses in Napa Valley for ADU investment.",
    stats: [
      {
        value: '$4,200+/mo',
        label: 'Rental Income',
        description: "Home to The French Laundry, Bottega, and Bouchon — plus luxury hotels like Bardessono and the Napa Valley Lodge — Yountville visitors pay $350-$600/night for private vacation rental stays.",
        icon: 'dollar',
      },
      {
        value: '30-40%',
        label: 'Home Value Increase',
        description: "With just 3,000 residents and extremely limited housing inventory, Yountville median home prices exceed $1.5 million. A well-designed ADU adds $350K-$500K in this supply-constrained market.",
        icon: 'trend',
      },
      {
        value: 'Walkable',
        label: 'Town Center',
        description: "Yountville's 1.5-mile walkable main strip — from the Napa Valley Museum to Domaine Chandon — means ADU guests enjoy Michelin dining, art galleries, and tasting rooms without needing a car.",
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Yountville's Experienced ADU Experts",
    paragraphs: [
      "With over 15 years of experience building ADUs in Napa Valley, we understand what Yountville homeowners expect. From the Washington Street corridor steps from The French Laundry and Bouchon Bakery, to the residential streets of Yount Street and Oak Circle, to the Finnell Road properties bordering Dominus Estate and Opus One vineyards — our in-house team delivers the quality this town demands.",
      "We don't subcontract critical work. Our licensed crew understands Yountville's architectural standards — the town's commitment to maintaining its intimate village character, the Veterans Home campus adjacency considerations, and the design expectations in a community that hosts more Michelin stars per capita than anywhere else in America.",
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
        description: 'We assess your Yountville property, discuss your vision, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans that honor Yountville\'s refined character. We handle all town permitting — guaranteed approval within 60 days.',
      },
      {
        title: 'Construction',
        description: 'Our in-house crew builds your ADU with premium materials and meticulous craftsmanship. Regular updates keep you informed at every milestone.',
      },
      {
        title: 'Final Walkthrough',
        description: 'We complete all inspections, hand you the keys, and ensure every detail meets your expectations. Your new ADU is ready to enjoy.',
      },
    ],
  },

  projects: [
    { title: 'Detached ADU - Wine Country Suite', location: 'Washington Street, Yountville', sqft: '800 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Yount Street, Yountville', sqft: '1,100 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Oak Circle, Yountville', sqft: '500 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Finnell Road, Yountville', sqft: '750 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Madison Street, Yountville', sqft: '460 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Gourmet Retreat', location: 'Mulberry Street, Yountville', sqft: '1,200 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Yountville & Central Napa Valley',

  regulations: {
    title: "Why Yountville is Ideal for Premium ADU Construction",
    subtitle: "Yountville's small-town governance and high design standards ensure ADUs add lasting value. Here are the key regulations.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Streamlined permitting with attention to architectural consistency" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Reduced impact fees for ADUs under 750 sq ft' },
      { value: 'Ultra', label: 'Premium Market', description: 'Michelin-starred dining and luxury tourism drive exceptional rental rates' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Yountville',
    subtitle: "We build ADUs throughout Yountville, with deep understanding of the town's design expectations and building requirements.",
    items: [
      {
        title: 'Washington Street & Town Center',
        description: 'The walkable heart of Yountville, steps from The French Laundry and world-class tasting rooms. ADUs here command the highest vacation rental rates in all of Napa Valley.',
        icon: 'home',
      },
      {
        title: 'Yount Street & Oak Circle',
        description: 'Established residential streets with mature landscaping and charming homes. These properties offer excellent opportunities for ADUs that blend seamlessly with the neighborhood\'s refined character.',
        icon: 'people',
      },
      {
        title: 'Finnell Road & Vineyard Adjacent',
        description: 'Properties bordering vineyards with panoramic views of the Mayacamas and Vaca mountain ranges. ADUs here serve as premium guest retreats in a truly world-class setting.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee permit approval within 60 days and deliver the quality Yountville demands.',
    resourcesTitle: 'Yountville ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Napa, CA', href: '/service-areas/napa-county-ca/napa-ca' },
      { title: 'ADU Contractors in St. Helena, CA', href: '/service-areas/napa-county-ca/st-helena-ca' },
      { title: 'ADU Contractors in American Canyon, CA', href: '/service-areas/napa-county-ca/american-canyon-ca' },
    ],
    infoCards: [
      {
        title: "Yountville's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Design Standards & Setbacks',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Yountville maintains high architectural design standards.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Yountville?',
      answer: 'A typical Yountville ADU project takes 7-11 months from design to completion. This includes 3-5 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our local expertise ensures we meet Yountville\'s design standards efficiently.',
    },
    {
      question: 'How much does an ADU cost in Yountville?',
      answer: 'ADU costs in Yountville range from $75,000 for a Junior ADU to $420,000+ for a large detached unit with premium finishes. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Can I use my Yountville ADU as a vacation rental?',
      answer: "Yountville's world-class dining and wine scene makes ADUs exceptionally attractive for vacation rentals, subject to local regulations. Premium ADUs can generate $4,200+ per month. We design units that meet the expectations of Yountville's discerning visitors.",
    },
    {
      question: 'What design standards apply to Yountville ADUs?',
      answer: "Yountville maintains high architectural standards to preserve the town's character. ADU designs typically need to complement existing structures and the community's aesthetic. Our architects are experienced with Yountville's expectations and create designs that enhance your property.",
    },
    {
      question: 'What is the maximum size for an ADU in Yountville?',
      answer: "In Yountville, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs (JADUs) are limited to 500 square feet within the existing home.",
    },
    {
      question: 'Does building an ADU increase my Yountville property value?',
      answer: "In Yountville's ultra-premium market, a well-built ADU can increase property value by 30-40%. This is one of the highest returns in all of Napa County. Combined with exceptional vacation rental income, an ADU is an outstanding Yountville investment.",
    },
  ],
  faqTitle: 'Common Questions About Yountville ADUs',

  contact: {
    title: 'Get Your Free Yountville ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Napa Valley ADU experts. We'll visit your property, discuss your vision, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Yountville',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Yountville ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Napa, CA',
        description: 'Explore our ADU construction services in Napa, the county seat.',
        href: '/service-areas/napa-county-ca/napa-ca',
      },
      {
        title: 'ADU Contractors in St. Helena, CA',
        description: 'Quality ADU solutions for St. Helena homeowners in the heart of Napa Valley.',
        href: '/service-areas/napa-county-ca/st-helena-ca',
      },
      {
        title: 'ADU Contractors in American Canyon, CA',
        description: 'Professional ADU design and construction services in American Canyon.',
        href: '/service-areas/napa-county-ca/american-canyon-ca',
      },
    ],
    infoCards: [
      {
        title: "Yountville's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs (JADUs) max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Design Standards & Setback Rules',
        description: "Yountville requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. The town maintains high architectural standards for all new construction.",
      },
    ],
  },
};
