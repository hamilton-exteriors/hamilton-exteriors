import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'St. Helena',
  county: 'Napa County',
  state: 'CA',
  slug: 'st-helena-ca',
  countySlug: 'napa-county-ca',
  adjective: 'Premier',
  title: 'Premier ADU Contractors in St. Helena, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is St. Helena's premier ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in St. Helena',
    subtitle: 'St. Helena is the heart of Napa Valley — where Main Street wineries, Michelin-starred restaurants, and vineyard estates create one of California\'s most exclusive addresses. We build ADUs worthy of this setting.',
    badges: [
      'St. Helena\'s Main Street & vineyard estate ADU experts',
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
    sectionTitle: 'What St. Helena Homeowners Say',
    featured: {
      text: "Hamilton Exteriors designed and built a stunning detached ADU on our vineyard property that perfectly complements our main residence. The attention to detail was remarkable — from the stone accents to the custom cabinetry. They navigated St. Helena's strict design requirements effortlessly and delivered a guest cottage that our wine country visitors absolutely love. Worth every penny.",
      name: 'William & Catherine H.',
      location: 'Spring Mountain, St. Helena',
    },
    side: [
      {
        text: 'They built an exquisite attached ADU for my mother on our Main Street property. The design seamlessly blends with the historic character of our home. Flawless execution.',
        name: 'Margaret L.',
        location: 'Downtown, St. Helena',
      },
      {
        text: 'Our garage conversion ADU is now a beautiful wine country guest suite. Hamilton understood exactly the level of quality and design we expected. Truly premier craftsmanship.',
        name: 'Thomas & Rebecca N.',
        location: 'Meadowood, St. Helena',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$220K - $420K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Wine country estate design'],
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
    title: 'Why Build an ADU in St. Helena?',
    subtitle: "St. Helena's prestigious address and world-class wine country setting make it one of the most rewarding places to build an ADU. Here's why homeowners are investing.",
    stats: [
      {
        value: '$4,000+/mo',
        label: 'Rental Income',
        description: "With Charles Krug, Beringer, and dozens of tasting rooms along Main Street, St. Helena ADUs attract wine country visitors willing to pay $300+/night — generating $4,000+/month in vacation rental income.",
        icon: 'dollar',
      },
      {
        value: '25-40%',
        label: 'Home Value Increase',
        description: "With a median home price exceeding $2.5 million, St. Helena is among the priciest small towns in California. A well-designed ADU adds $300K-$500K in appraised value to these already-premium properties.",
        icon: 'trend',
      },
      {
        value: 'World-Class',
        label: 'Location Appeal',
        description: "Home to the Culinary Institute of America at Greystone, Meadowood Napa Valley, and 100+ wineries within 10 minutes, St. Helena ADUs attract premium guests year-round — not just harvest season.",
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "St. Helena's Premier ADU Experts",
    paragraphs: [
      "With over 15 years of experience building ADUs in Napa Valley, we've earned the trust of St. Helena homeowners from the historic Main Street corridor and the Meadowood resort neighborhood to the Spring Mountain and Sulphur Springs vineyard estates. Our in-house team handles every phase — from initial design and city permits to construction and final inspection.",
      "We don't subcontract critical work. Our licensed crew understands St. Helena's strict design standards — including the historic overlay requirements for properties near the downtown National Register Historic District, the agricultural preserve setbacks for vineyard-adjacent parcels, and the fire-safe construction mandates for hillside properties along Spring Mountain Road and Crystal Springs Road.",
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
        description: 'We assess your St. Helena property, discuss your vision, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans that honor St. Helena\'s architectural heritage. We handle all city permitting — guaranteed approval within 60 days.',
      },
      {
        title: 'Construction',
        description: 'Our in-house crew builds your ADU with premium materials and meticulous craftsmanship befitting St. Helena\'s standards. Regular updates keep you informed.',
      },
      {
        title: 'Final Walkthrough',
        description: 'We complete all inspections, hand you the keys, and ensure every detail meets your expectations. Your new ADU is ready to enjoy.',
      },
    ],
  },

  projects: [
    { title: 'Detached ADU - Vineyard Guest Cottage', location: 'Spring Mountain, St. Helena', sqft: '850 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Downtown, St. Helena', sqft: '1,100 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Meadowood, St. Helena', sqft: '520 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Sulphur Springs, St. Helena', sqft: '780 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Main Street, St. Helena', sqft: '480 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Estate Unit', location: 'Crystal Springs, St. Helena', sqft: '1,200 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in St. Helena & Upper Napa Valley',

  regulations: {
    title: "Why St. Helena is Ideal for Premium ADU Construction",
    subtitle: "St. Helena balances preservation of its historic character with forward-thinking ADU policies. Here are the key regulations.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Streamlined permitting with design review for architectural consistency" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Reduced impact fees for ADUs under 750 sq ft' },
      { value: 'Premium', label: 'Rental Market', description: 'World-class wine country location commands top rental rates' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across St. Helena',
    subtitle: "We build ADUs throughout St. Helena, with expertise in each area's unique design requirements and architectural character.",
    items: [
      {
        title: 'Downtown & Main Street',
        description: 'Historic properties in the heart of St. Helena\'s charming downtown. ADUs here must complement the area\'s vintage architecture while offering modern amenities to vacation rental guests.',
        icon: 'home',
      },
      {
        title: 'Spring Mountain & Meadowood',
        description: 'Estate properties surrounded by vineyards and world-class wineries. We design ADUs that serve as elegant guest cottages, perfectly integrated into these prestigious settings.',
        icon: 'people',
      },
      {
        title: 'Sulphur Springs & Crystal Springs',
        description: 'Residential neighborhoods with established homes on generous lots. These areas offer excellent opportunities for detached ADUs with valley views and vineyard surroundings.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee permit approval within 60 days and deliver craftsmanship that meets St. Helena\'s exacting standards.',
    resourcesTitle: 'St. Helena ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Napa, CA', href: '/service-areas/napa-county-ca/napa-ca' },
      { title: 'ADU Contractors in Calistoga, CA', href: '/service-areas/napa-county-ca/calistoga-ca' },
      { title: 'ADU Contractors in Yountville, CA', href: '/service-areas/napa-county-ca/yountville-ca' },
    ],
    infoCards: [
      {
        title: "St. Helena's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Design Review & Setbacks',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Design review may apply for historic district properties.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in St. Helena?',
      answer: 'A typical St. Helena ADU project takes 7-11 months from design to completion. This includes 3-5 weeks for design (allowing for design review), 60 days for permits (our guarantee), and 4-6 months for construction. Our local expertise helps navigate any additional requirements efficiently.',
    },
    {
      question: 'How much does an ADU cost in St. Helena?',
      answer: 'ADU costs in St. Helena range from $75,000 for a Junior ADU to $420,000+ for a large detached unit with premium finishes. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Do I need design review for my St. Helena ADU?',
      answer: "St. Helena has design guidelines to maintain the town's historic character. Depending on your property's location, your ADU may require design review. We handle this entire process and design ADUs that meet all requirements while reflecting your personal style.",
    },
    {
      question: 'Can I use my St. Helena ADU as a vacation rental?',
      answer: "St. Helena's world-class wine country setting makes ADUs ideal for vacation rentals, subject to local short-term rental regulations. Premium ADUs in St. Helena can generate $4,000+ per month. We design units that appeal to discerning wine country visitors.",
    },
    {
      question: 'What is the maximum size for an ADU in St. Helena?',
      answer: "In St. Helena, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs (JADUs) are limited to 500 square feet within the existing home.",
    },
    {
      question: 'Does building an ADU increase my St. Helena property value?',
      answer: "In St. Helena's premium real estate market, a well-built ADU can increase property value by 25-40%. Combined with exceptional rental income potential, an ADU is one of the smartest investments for St. Helena homeowners.",
    },
  ],
  faqTitle: 'Common Questions About St. Helena ADUs',

  contact: {
    title: 'Get Your Free St. Helena ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Napa Valley ADU experts. We'll visit your property, discuss your vision, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in St. Helena',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More St. Helena ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Napa, CA',
        description: 'Explore our ADU construction services in Napa, the county seat.',
        href: '/service-areas/napa-county-ca/napa-ca',
      },
      {
        title: 'ADU Contractors in Calistoga, CA',
        description: 'Quality ADU solutions for Calistoga homeowners at the north end of Napa Valley.',
        href: '/service-areas/napa-county-ca/calistoga-ca',
      },
      {
        title: 'ADU Contractors in Yountville, CA',
        description: 'Professional ADU design and construction services in Yountville.',
        href: '/service-areas/napa-county-ca/yountville-ca',
      },
    ],
    infoCards: [
      {
        title: "St. Helena's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs (JADUs) max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Design Review & Setback Rules',
        description: "St. Helena requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Properties in historic areas may require additional design review.",
      },
    ],
  },
};
