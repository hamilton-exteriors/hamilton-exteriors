import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'Richmond',
  county: 'Contra Costa County',
  state: 'CA',
  slug: 'richmond-ca',
  countySlug: 'contra-costa-county-ca',
  adjective: 'Experienced',
  title: 'Experienced ADU Contractors in Richmond, CA | Hamilton Exteriors',
  description: 'Hamilton Exteriors provides experienced ADU contractors in Richmond, CA. Expert design, permits, and construction. Call for a free consultation!',
  hero: {
    headline: 'Build Your Dream ADU in Richmond',
    subtitle: 'From permit to keys in hand — we handle every detail of your Richmond ADU project so you can focus on what matters.',
    badges: [
      '15+ years of Richmond ADU expertise',
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
      question: 'How long does it take to build an ADU in Richmond?',
      answer: 'A typical Richmond ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits, and 4-6 months for construction. Our streamlined process and local expertise help minimize delays.',
    },
    {
      question: 'How much does an ADU cost in Richmond?',
      answer: 'ADU costs in Richmond range from $60,000 for a Junior ADU to $350,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations to help you understand all costs upfront.',
    },
    {
      question: 'Do I need a permit to build an ADU in Richmond?',
      answer: 'Yes, all ADUs in Richmond require building permits. We handle the entire permit process for you and work to get your permits approved as quickly as possible.',
    },
  ],

  contact: {
    title: 'Get Your Free Richmond ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our Richmond ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  whyChoose: {
    subtitle: 'Proven. Skilled. Reliable.',
    paragraphs: [
      "Hamilton Exteriors provides experienced ADU contractors in Richmond, CA who understand the unique character and potential of this waterfront city. Richmond's diverse neighborhoods — from the Point Richmond hills to the El Cerrito border, from Hilltop to Marina Bay — each present distinct opportunities for ADU construction, and our years of experience mean we know how to navigate them all.",
      "Experience matters when building ADUs because every property is different. Older Richmond homes may need updated utility connections, hillside lots require careful foundation work, and properties in certain zones have specific design requirements. Our team has encountered and solved these challenges many times over, giving you the benefit of lessons learned across dozens of completed projects.",
      "We guide you through Richmond's permit process, design a unit that complements your existing home, and build with the attention to detail that only comes from years of hands-on ADU construction experience.",
    ],
    features: [
      { title: 'Custom Design', description: "We create ADU plans tailored to your neighborhood's architectural character, ensuring your new unit complements your existing home and property layout." },
      { title: 'Permit Management', description: 'We handle all city permits and approvals, streamlining a process that can otherwise take months of back-and-forth with the building department.' },
      { title: 'Quality Materials', description: "Premium construction materials selected for durability, energy efficiency, and long-term value that stand up to the Bay Area's unique climate conditions." },
      { title: 'On-Time Delivery', description: 'We build realistic schedules and stick to them, keeping your ADU project moving forward without the drawn-out timelines that plague unreliable contractors.' },
    ],
  },
  whyEssential: {
    subtitle: 'Knowledge. Value. Confidence.',
    paragraphs: [
      "Richmond is experiencing a renaissance, with new investment in its waterfront, arts district, and residential communities driving property values upward. For homeowners, ADUs represent one of the best ways to capitalize on this growth — adding rentable square footage in a city where housing demand consistently outpaces supply, especially near BART stations and the Richmond Ferry terminal.",
      "Experienced contractors are essential in Richmond because many properties were built decades ago and present construction challenges that newer subdivisions don't. Outdated electrical panels, aging sewer laterals, and non-standard lot configurations require a contractor who has seen these issues before and knows the most cost-effective way to address them during an ADU build.",
      "When you work with experienced ADU contractors, you benefit from their accumulated knowledge — better material choices, faster problem resolution, and a finished product that reflects the quality and care that comes from doing this work year after year in the communities they serve.",
    ],
  },
};
