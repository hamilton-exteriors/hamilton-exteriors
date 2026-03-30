import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'San Leandro',
  county: 'Alameda County',
  state: 'CA',
  slug: 'san-leandro-ca',
  countySlug: 'alameda-county-ca',
  adjective: 'Reliable',
  title: 'Reliable ADU Contractors in San Leandro, CA | Hamilton Exteriors',
  description: 'Hamilton Exteriors provides reliable ADU contractors in San Leandro, CA. Expert design, permits, and construction. Call for a free consultation!',
  layout: 'single-column',
  hero: {
    headline: 'Build Your Dream ADU in San Leandro',
    subtitle: 'From permit to keys in hand — we handle every detail of your San Leandro ADU project so you can focus on what matters.',
    badges: [
      '15+ years of San Leandro ADU expertise',
      '$0 down financing available',
      'Design, permits & build — all in-house',
      '60-day permit guarantee',
    ],
    formTitle: 'Get Your FREE ADU Consultation',
    formSubtitle: "We'll contact you within 24 hours to discuss your ADU project.",
    formButtonText: 'Get My Free Consultation',
  },

  faqs: [
    {
      question: 'How long does it take to build an ADU in San Leandro?',
      answer: 'A typical San Leandro ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits, and 4-6 months for construction. Our streamlined process and local expertise help minimize delays.',
    },
    {
      question: 'How much does an ADU cost in San Leandro?',
      answer: 'ADU costs in San Leandro range from $60,000 for a Junior ADU to $350,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations to help you understand all costs upfront.',
    },
    {
      question: 'Do I need a permit to build an ADU in San Leandro?',
      answer: 'Yes, all ADUs in San Leandro require building permits. We handle the entire permit process for you and work to get your permits approved as quickly as possible.',
    },
  ],

  contact: {
    title: 'Get Your Free San Leandro ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our San Leandro ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  whyChoose: {
    subtitle: 'Efficient. Skilled. Reliable.',
    paragraphs: [
      "Hamilton Exteriors provides reliable ADU contractors in San Leandro, CA who deliver consistent results for homeowners across this well-established East Bay community. San Leandro's stable residential neighborhoods like Estudillo Estates, Washington Manor, and Bay-O-Vista feature the kind of properties that are ideal for ADU additions, and our team has the track record to prove we get the job done right.",
      "Reliability is the foundation of everything we do. When we commit to a timeline, a budget, and a scope of work, we follow through. Our process includes detailed pre-construction planning, clear communication at every milestone, and a structured approach to permitting with the City of San Leandro that avoids unnecessary delays. We understand that building an ADU is a major investment, and we treat every project with the care and professionalism it deserves.",
      "From garage conversions to new detached units, we build ADUs that meet San Leandro's building standards while providing comfortable, well-finished living spaces your family or tenants will appreciate. Our team handles everything from architectural design and engineering to foundation work, framing, electrical, plumbing, and finish carpentry — all under one roof so you never have to coordinate multiple contractors.",
    ],
    desktopOnlyParagraphs: [
      "San Leandro's proximity to BART, major freeways, and the Oakland waterfront makes it an increasingly popular area for young professionals and families. An ADU on your property can generate $1,800–$2,800 per month in rental income, or provide a private living space for aging parents or adult children — all while boosting your property value by an estimated 20–30%.",
    ],
    features: [
      { title: 'On-Time Delivery', description: 'We build realistic schedules and stick to them, keeping your ADU project moving forward without the drawn-out timelines that plague unreliable contractors.' },
      { title: 'Local Permit Expertise', description: "We know San Leandro's ADU regulations inside and out, including lot coverage limits, setback requirements, and utility connection standards." },
      { title: 'Clear Communication', description: "You'll always know where your project stands. We provide regular updates and are available to answer questions throughout every phase of construction." },
      { title: 'Warranty-Backed Work', description: 'Every ADU we build comes with a workmanship warranty, giving you peace of mind that your investment is protected long after we hand over the keys.' },
    ],
  },
  whyEssential: {
    subtitle: 'Value. Comfort. Compliance.',
    paragraphs: [
      "San Leandro has seen significant growth and revitalization in recent years, with new transit-oriented development and rising property values making it one of the East Bay's most attractive communities. Adding an ADU to your San Leandro property is one of the smartest investments you can make — it increases your home's appraised value while providing flexible space for family or rental income. With the City of San Leandro actively encouraging ADU development through streamlined permitting, there has never been a better time to build.",
      "Reliable contractors are essential because ADU construction involves coordinating multiple trades, managing city inspections, and meeting strict deadlines for permit renewals. An unreliable contractor can leave your project half-finished, burn through your budget on change orders, or fail inspections that set you back weeks. San Leandro homeowners deserve a builder they can count on from day one — someone who shows up, communicates clearly, and delivers quality work on schedule.",
    ],
    desktopOnlyParagraphs: [
      "With a reliable ADU contractor, you get a finished product that complies with all local building codes, passes every inspection, and delivers the comfortable, functional living space you envisioned when you started the project. From the initial design consultation through final walkthrough, our team ensures every detail is handled with precision and care.",
      "Whether you're building a detached studio in Bay-O-Vista, converting a garage in Washington Manor, or adding a junior ADU in Estudillo Estates, Hamilton Exteriors brings the experience, licensing, and local knowledge to make your San Leandro ADU project a success from start to finish.",
    ],
  },
  aduTypes: [
    { title: 'Detached ADUs', description: 'Standalone backyard units up to 1,200 sq ft with full kitchens, bathrooms, and separate entrances. Ideal for rental income or multigenerational living with complete privacy.' },
    { title: 'Garage Conversions', description: 'Transform your existing garage into a comfortable living space. The most cost-effective ADU option, with lower construction costs and faster completion timelines.' },
    { title: 'Junior ADUs', description: 'Up to 500 sq ft units built within your existing home footprint. Perfect for a home office, guest suite, or compact rental — with minimal site disruption.' },
  ],
};
