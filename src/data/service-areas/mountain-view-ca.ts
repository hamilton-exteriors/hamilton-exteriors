import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Mountain View',
  county: 'Santa Clara County',
  state: 'CA',
  slug: 'mountain-view-ca',
  countySlug: 'santa-clara-county-ca',
  adjective: 'Expert',
  title: 'Expert ADU Contractors in Mountain View, CA | Hamilton Exteriors',
  description: "Hamilton Exteriors is Mountain View's expert ADU builder. From design and permits to construction — we handle every detail. $0 down financing available. Call for a free consultation!",

  hero: {
    headline: 'Build Your Dream ADU in Mountain View',
    subtitle: 'Mountain View is home to Google\'s global headquarters, the iconic Castro Street downtown, and Shoreline Amphitheatre — with 80,000+ residents and some of the strongest ADU rental demand in Silicon Valley.',
    badges: [
      '15+ years of Silicon Valley ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day Mountain View permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formTextareaPlaceholder: 'Tell us about your ADU project — type, size, timeline?',
    formButtonText: 'Get My Free Consultation',
  },

  reviews: {
    sectionTitle: 'What Mountain View Homeowners Say',
    featured: {
      text: "Hamilton Exteriors built a gorgeous detached ADU on our Cuesta Park property. The modern design fits perfectly with our neighborhood and the build quality is outstanding. They handled Mountain View's permitting process smoothly and communicated throughout. Our ADU is now rented to a Google engineer at $3,500/month. An incredible return on investment.",
      name: 'Steven C.',
      location: 'Cuesta Park, Mountain View',
    },
    side: [
      {
        text: 'We needed an ADU for my mother-in-law and Hamilton delivered a beautiful attached unit. The accessibility features they incorporated were thoughtful and well-executed.',
        name: 'Lisa T.',
        location: 'Old Mountain View',
      },
      {
        text: 'Our garage conversion turned into a sleek studio apartment. Hamilton managed everything and the final result far exceeded what we thought was possible with our space.',
        name: 'Kevin & Amy P.',
        location: 'Rex Manor, Mountain View',
      },
    ],
  },

  pricingCards: [
    {
      title: 'Detached ADU',
      subtitle: 'Standalone backyard unit',
      price: '$220K - $420K',
      sqft: '400 - 1,200 sq ft',
      features: ['Maximum privacy & flexibility', 'Full kitchen & bathroom', 'Highest rental income potential', 'Custom design options'],
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
    title: 'Why Build an ADU in Mountain View?',
    subtitle: "Home to Google and a thriving tech corridor, Mountain View has exceptional rental demand that makes ADU investment a smart choice.",
    stats: [
      {
        value: '$3,200+/mo',
        label: 'Rental Income',
        description: "With Google's 25,000+ Mountain View employees, plus LinkedIn, Intuit, and Samsung nearby, ADUs here rent within days of listing — especially within biking distance of the Googleplex along Shoreline Boulevard.",
        icon: 'dollar',
      },
      {
        value: '25-35%',
        label: 'Home Value Increase',
        description: "Mountain View's median home price exceeds $1.8 million. A quality ADU adds $250K-$400K in appraised value — making it one of the highest ROI home improvements in Silicon Valley.",
        icon: 'trend',
      },
      {
        value: 'Permit-Friendly',
        label: 'Streamlined Process',
        description: "Mountain View's Community Development Department has streamlined ADU permitting with online plan submission, reduced fees for units under 750 sq ft, and no parking requirements near Caltrain stations.",
        icon: 'document',
      },
    ],
  },

  trustedExperts: {
    title: "Mountain View's Expert ADU Builders",
    paragraphs: [
      "With over 15 years of experience building ADUs in Mountain View, we've earned the trust of homeowners from the walkable Old Mountain View neighborhood near Castro Street to the Cuesta Park bungalows, the Rex Manor mid-century homes, and the Monta Loma and Shoreline West neighborhoods adjacent to Google's Bayshore campus. Our in-house team handles every phase from design to final inspection.",
      "We don't subcontract critical work. Our licensed crew understands Mountain View's specific building requirements — including the R-1 zoning that covers most single-family neighborhoods, the Caltrain corridor proximity rules for properties near the downtown and San Antonio stations, and the unique considerations for lots near the Shoreline Regional Park wetlands that require specific drainage engineering.",
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
        description: 'We assess your Mountain View property, discuss your goals, and provide a detailed estimate with transparent pricing — no hidden fees or surprises.',
      },
      {
        title: 'Design & Permits',
        description: 'Our architects create custom plans tailored to your lot and needs. We handle all Mountain View permitting — guaranteed approval within 60 days.',
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
    { title: 'Detached ADU - Modern Studio', location: 'Cuesta Park, Mountain View', sqft: '680 sq ft', imageKey: 'serviceRoofing' },
    { title: 'Two-Story ADU Build', location: 'Old Mountain View', sqft: '1,050 sq ft', imageKey: 'serviceSiding' },
    { title: 'Garage Conversion ADU', location: 'Rex Manor, Mountain View', sqft: '480 sq ft', imageKey: 'serviceWindows' },
    { title: 'Attached ADU Suite', location: 'Waverly Park, Mountain View', sqft: '780 sq ft', imageKey: 'serviceAdu' },
    { title: 'Junior ADU Conversion', location: 'Monta Loma, Mountain View', sqft: '460 sq ft', imageKey: 'heroBg' },
    { title: 'Detached ADU - Family Unit', location: 'Shoreline West, Mountain View', sqft: '1,150 sq ft', imageKey: 'serviceRoofing' },
  ],
  projectsTitle: 'Recent ADU Projects in Mountain View & Silicon Valley',

  regulations: {
    title: "Why Mountain View Supports ADU Construction",
    subtitle: "Mountain View has embraced ADU-friendly policies to address its growing housing needs. Here are the key regulations.",
    items: [
      { value: '60', label: 'Day Permit Timeline', description: "Mountain View's streamlined process gets your permits approved fast" },
      { value: '1,200', label: 'Max Sq Ft Allowed', description: 'Build a spacious ADU up to 1,200 square feet on your property' },
      { value: '$0', label: 'Impact Fees*', description: 'Waived impact fees for ADUs under 750 sq ft in Mountain View' },
      { value: 'City', label: 'Financing Programs', description: 'Mountain View supports ADU development with streamlined approvals' },
    ],
  },

  neighborhoods: {
    title: 'ADU Construction Across Mountain View',
    subtitle: "We build ADUs across every Mountain View neighborhood, with deep knowledge of each area's unique building requirements and architectural character.",
    items: [
      {
        title: 'Old Mountain View & Cuesta Park',
        description: 'Walkable neighborhoods near downtown with charming older homes and generous lots. These areas are ideal for detached ADUs that attract tech professionals seeking proximity to Castro Street and transit.',
        icon: 'home',
      },
      {
        title: 'Waverly Park & Rex Manor',
        description: 'Family-friendly neighborhoods with mid-century homes and well-sized lots. Perfect for larger ADUs that serve as multigenerational living or premium rental units near top schools.',
        icon: 'people',
      },
      {
        title: 'Monta Loma & Shoreline West',
        description: 'Neighborhoods near Google and major tech campuses. ADUs here command top rental rates from tech workers who want to live close to work in a residential setting.',
        icon: 'building',
      },
    ],
  },

  mobileProcessResources: {
    processTitle: 'Our ADU Construction Process',
    processSummary: 'From free consultation and custom design through permitting, construction, and final walkthrough — our in-house team handles every step. We guarantee Mountain View permit approval within 60 days and keep you informed at every milestone.',
    resourcesTitle: 'Mountain View ADU Resources',
    nearbyLinks: [
      { title: 'ADU Contractors in Palo Alto, CA', href: '/service-areas/santa-clara-county-ca/palo-alto-ca' },
      { title: 'ADU Contractors in Sunnyvale, CA', href: '/service-areas/santa-clara-county-ca/sunnyvale-ca' },
      { title: 'ADU Contractors in Cupertino, CA', href: '/service-areas/santa-clara-county-ca/cupertino-ca' },
    ],
    infoCards: [
      {
        title: "Mountain View's ADU Size Limits",
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
      question: 'How long does it take to build an ADU in Mountain View?',
      answer: 'A typical Mountain View ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits (our guarantee), and 4-6 months for construction. Our local expertise helps minimize delays.',
    },
    {
      question: 'How much does an ADU cost in Mountain View?',
      answer: 'ADU costs in Mountain View range from $75,000 for a Junior ADU to $420,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations.',
    },
    {
      question: 'Do I need a permit to build an ADU in Mountain View?',
      answer: "Yes, all ADUs in Mountain View require building permits. Mountain View has streamlined its ADU permitting process. We handle the entire permit process for you and guarantee approval within 60 days.",
    },
    {
      question: 'What is the maximum size for an ADU in Mountain View?',
      answer: "In Mountain View, detached ADUs can be up to 1,200 square feet. Attached ADUs can be up to 50% of the existing home's living area or 1,200 sq ft, whichever is less. Junior ADUs are limited to 500 square feet.",
    },
    {
      question: 'Can I rent out my Mountain View ADU?',
      answer: 'Yes. Mountain View has strong rental demand driven by its thriving tech sector. Many homeowners earn $2,800-$4,200+ per month renting their ADU to tech professionals, making it an excellent investment.',
    },
    {
      question: 'Does Mountain View charge impact fees for ADUs?',
      answer: 'Mountain View has waived most impact fees for ADUs under 750 square feet. For larger units, fees are significantly reduced. This makes Mountain View one of the most attractive cities for ADU investment.',
    },
  ],
  faqTitle: 'Common Questions About Mountain View ADUs',

  contact: {
    title: 'Get Your Free Mountain View ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Mountain View ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    formAddressPlaceholder: 'Project Address in Mountain View',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  resources: {
    title: 'More Mountain View ADU Resources',
    subtitle: 'Explore cost guides, regulations, and neighborhood-specific ADU information',
    nearbyLinks: [
      {
        title: 'ADU Contractors in Palo Alto, CA',
        description: 'Explore our ADU construction services in neighboring Palo Alto.',
        href: '/service-areas/santa-clara-county-ca/palo-alto-ca',
      },
      {
        title: 'ADU Contractors in Sunnyvale, CA',
        description: 'Quality ADU solutions for Sunnyvale homeowners in Santa Clara County.',
        href: '/service-areas/santa-clara-county-ca/sunnyvale-ca',
      },
      {
        title: 'ADU Contractors in Cupertino, CA',
        description: 'Professional ADU design and construction services in Cupertino.',
        href: '/service-areas/santa-clara-county-ca/cupertino-ca',
      },
    ],
    infoCards: [
      {
        title: "Mountain View's ADU Size Limits",
        description: 'Detached ADUs can be up to 1,200 sq ft or 50% of your primary dwelling. Attached ADUs allow up to 1,000 sq ft. Junior ADUs max out at 500 sq ft within your existing home.',
      },
      {
        title: 'Setbacks & Parking Rules',
        description: "Mountain View requires a 4-foot setback from side and rear property lines. Detached ADUs are limited to 16 feet in height. Reduced parking near Caltrain and VTA.",
      },
    ],
  },
};
