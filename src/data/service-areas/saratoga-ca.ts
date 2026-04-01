import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Saratoga',
  county: 'Santa Clara County',
  state: 'CA',
  slug: 'saratoga-ca',
  countySlug: 'santa-clara-county-ca',
  adjective: 'Leading',
  title: 'Leading ADU Contractors in Saratoga, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Saratoga's leading ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Saratoga',
    subtitle: 'Saratoga is Silicon Valley\'s most exclusive residential enclave — home to Hakone Gardens, the Montalvo Arts Center, and a charming Village downtown, with spacious hillside lots that are ideal for premium ADU construction.',
    badges: [
      '15+ years of Silicon Valley ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day Saratoga permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Saratoga Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a stunning detached ADU on our property near Saratoga Village. The design is elegant and perfectly matches our home's architectural style. They handled Saratoga's permitting process expertly and the craftsmanship is impeccable. We use it as a guest house and home office, and it's added tremendous value to our property.",
      name: 'Richard & Ellen M.',
      location: 'Saratoga Village',
    },
    side: [
      {
        text: 'We needed a high-end ADU for visiting family and Hamilton delivered beyond our expectations. The finishes are premium and every detail was thoughtfully executed.',
        name: 'Sunita J.',
        location: 'Saratoga Hills',
      },
      {
        text: 'Our ADU in the Saratoga foothills is a masterpiece. Hamilton worked with the sloped terrain beautifully and created a space that feels like a luxury retreat.',
        name: 'George & Nancy T.',
        location: 'Monte Sereno border, Saratoga',
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
    title: 'Why Build an ADU in Saratoga?',
    subtitle: "One of Silicon Valley's most prestigious communities, Saratoga's high property values and large lots make ADUs a premium investment opportunity.",
    stats: [
      {
        value: '$3,500+/mo',
        label: 'Rental Income',
        description: "Saratoga's ZIP code 95070 is among the wealthiest in California. With Apple, Netflix, and Google campuses within 15 minutes, tech executives and families pay premium rates for ADU rentals in this school district.",
        icon: 'dollar',
      },
      {
        value: '25-40%',
        label: 'Home Value Increase',
        description: "With median home prices exceeding $3.5 million and lots averaging half an acre or more, a Saratoga ADU adds $400K-$600K in appraised value — among the highest ADU ROI in the Bay Area.",
        icon: 'trend',
      },
      {
        value: 'Permit-Friendly',
        label: 'Streamlined Process',
        description: "Saratoga's Community Development Department processes ADU permits in line with California AB 68/SB 13 mandates, with reduced fees and streamlined review for properties with qualifying lot sizes.",
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Saratoga's Leading ADU Builders",
    paragraphs: [
      "With over 15 years of experience building ADUs in Saratoga, we've earned the trust of homeowners from the charming Village downtown along Big Basin Way to the Saratoga Hills and foothills estates, the Brookglen and Quito Village family neighborhoods near the Saratoga Avenue corridor, and the luxury properties along Saratoga-Sunnyvale Road near Hakone Gardens and Congress Springs.",
      "We don't subcontract critical work. Our licensed crew understands Saratoga's specific challenges — the hillside grading and geotechnical requirements for properties along Monte Sereno's border, the design standards that reflect this city's commitment to preserving its semi-rural character, and the mature oak and redwood preservation requirements that apply to many Saratoga lots.",
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
        description: 'We assess your Saratoga property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans that honor Saratoga design standards. We handle all permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Luxury Studio', location: 'Saratoga Village', sqft: '750 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Saratoga Hills', sqft: '1,200 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Saratoga Foothills', sqft: '520 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Saratoga Woods', sqft: '850 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Brookglen, Saratoga', sqft: '480 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Guest House', location: 'Quito Village, Saratoga', sqft: '1,150 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Saratoga & the West Valley',

  regulations: {
    title: "Why Saratoga Homeowners Are Building ADUs",
    subtitle: "Saratoga's large lots and updated ADU regulations create ideal conditions for building. Here are the key regulations.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Saratoga's process gets your permits approved efficiently" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in Saratoga' },
      { value: 'Large', label: 'Lot Sizes', description: "Saratoga's generous lots provide ample space for premium ADU designs" },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Saratoga',
    subtitle: "We build ADUs across every Saratoga neighborhood, with deep knowledge of each area's unique design standards and terrain considerations.",
    items: [
      {
        title: 'Saratoga Village & Downtown',
        description: 'The charming heart of Saratoga with walkable streets and upscale dining. Properties here benefit from ADUs that complement the area\'s refined character and attract premium tenants.',
        icon: 'home',
      },
      {
        title: 'Saratoga Hills & Foothills',
        description: 'Hillside properties with stunning views and expansive lots. We specialize in ADU designs that work with sloped terrain while maximizing living space and natural light.',
        icon: 'people',
      },
      {
        title: 'Brookglen & Quito Village',
        description: 'Family-oriented neighborhoods with excellent schools and generous lot sizes. Perfect for ADUs that serve as multigenerational housing or upscale rental units.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Saratoga permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Saratoga ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Cupertino, CA', href: '/service-areas/santa-clara-county-ca/cupertino-ca' },
      { title: 'ADU Contractors in Los Gatos, CA', href: '/service-areas/santa-clara-county-ca/los-gatos-ca' },
      { title: 'ADU Contractors in Campbell, CA', href: '/service-areas/santa-clara-county-ca/campbell-ca' },
    ],
    infoCards: [
      {
        title: "Saratoga's ADU Size Limits",
        description: 'Detached ADUs up to 1,200 sq ft. Attached ADUs up to 1,000 sq ft. Junior ADUs max 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Terrain',
        description: '4-foot setback from side and rear lines. 16-foot height limit. Special considerations for hillside properties with slopes.',
      },
    ],
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in Saratoga?',
      answer: 'A typical Saratoga ADU project takes 7-11 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-7 months for construction. Hillside properties may require additional time for site preparation.',
    },
    {
      question: 'How much does an ADU cost in Saratoga?',
      answer: 'ADU costs in Saratoga range from $80,000 for a Junior ADU to $450,000+ for a large detached unit. The final cost depends on size, design complexity, terrain, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Do I need a permit to build an ADU in Saratoga?',
      answer: "Yes, all ADUs in Saratoga require building permits. We handle the entire permit process for you and guarantee approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in Saratoga?',
      answer: "In Saratoga, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs are limited to 500 square feet.",
    },
    {
      question: 'Can I rent out my Saratoga ADU?',
      answer: 'Yes. California state law allows ADU rentals. Saratoga\'s premium location means ADUs command top rental rates, with many homeowners earning $3,000-$4,500+ per month.',
    },
    {
      question: 'Can I build an ADU on a hillside property in Saratoga?',
      answer: 'Yes, we specialize in building ADUs on Saratoga hillside properties. Our architects design ADUs that work with sloped terrain, and our crew has extensive experience with hillside construction, foundations, and grading.',
    },
  ],
  faqTitle: 'Common Questions About Saratoga ADUs',

  contact: {
    title: 'Get Your Free Saratoga ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Saratoga ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Saratoga',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Saratoga ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Cupertino, CA',
        description: 'Explore our ADU construction services in neighboring Cupertino.',
        href: '/service-areas/santa-clara-county-ca/cupertino-ca',
      },
      {
        title: 'ADU Contractors in Los Gatos, CA',
        description: 'Quality ADU solutions for Los Gatos homeowners in Santa Clara County.',
        href: '/service-areas/santa-clara-county-ca/los-gatos-ca',
      },
      {
        title: 'ADU Contractors in Campbell, CA',
        description: 'Professional ADU design and construction services in Campbell.',
        href: '/service-areas/santa-clara-county-ca/campbell-ca',
      },
    ],
    infoCards: [
      {
        title: "Saratoga's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Building Rules',
        description: "Saratoga requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Hillside properties may have additional requirements.",
      },
    ],
  },
};
