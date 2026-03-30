import type { ServiceAreaCity } from '../../lib/service-area-types';

export const data: ServiceAreaCity = {
  city: 'San Ramon',
  county: 'Contra Costa County',
  state: 'CA',
  slug: 'san-ramon-ca',
  countySlug: 'contra-costa-county-ca',
  adjective: 'Skilled',
  title: 'Skilled ADU Contractors in San Ramon, CA | Hamilton Exteriors',
  description: 'Hamilton Exteriors provides skilled ADU contractors in San Ramon, CA. Expert design, permits, and construction. Call for a free consultation!',
  hero: {
    headline: 'Build Your Dream ADU in San Ramon',
    subtitle: 'From permit to keys in hand — we handle every detail of your San Ramon ADU project so you can focus on what matters.',
    badges: [
      '15+ years of San Ramon ADU expertise',
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
      question: 'How long does it take to build an ADU in San Ramon?',
      answer: 'A typical San Ramon ADU project takes 6-10 months from design to completion. This includes 2-4 weeks for design, 60 days for permits, and 4-6 months for construction. Our streamlined process and local expertise help minimize delays.',
    },
    {
      question: 'How much does an ADU cost in San Ramon?',
      answer: 'ADU costs in San Ramon range from $60,000 for a Junior ADU to $350,000+ for a large detached unit. The final cost depends on size, design complexity, site conditions, and finishes. We offer $0 down financing and free consultations to help you understand all costs upfront.',
    },
    {
      question: 'Do I need a permit to build an ADU in San Ramon?',
      answer: 'Yes, all ADUs in San Ramon require building permits. We handle the entire permit process for you and work to get your permits approved as quickly as possible.',
    },
  ],

  contact: {
    title: 'Get Your Free San Ramon ADU Consultation',
    subtitle: "Ready to build your dream ADU? Schedule a free consultation with our San Ramon ADU experts. We'll visit your property, discuss your goals, and provide a detailed estimate at no cost.",
    formTitle: 'Schedule Your Free Consultation',
    formSubtitle: 'Quick Response, Expert Assessment',
    formButtonText: 'Get My Free ADU Consultation',
    aduTypeOptions: ['Detached ADU', 'Attached ADU', 'Junior ADU', 'Garage Conversion', 'Not Sure'],
    showConsultationType: true,
  },

  whyChoose: {
    subtitle: 'Creative. Reliable. Precise.',
    paragraphs: [
      "Hamilton Exteriors provides skilled ADU contractors in San Ramon, CA who deliver precision craftsmanship that matches the high standards of this premier Tri-Valley community. San Ramon's well-maintained neighborhoods like Dougherty Valley, Gale Ranch, and Windemere are home to discerning homeowners who expect quality construction, and our skilled team delivers exactly that.",
      "Skilled construction means more than just competent building. It means precise measurements, clean joinery, thoughtful electrical and plumbing layouts, and interior finishes that look and feel like they belong in San Ramon's upscale residential market. We take the technical aspects of ADU building seriously because the details are what separate an average unit from an exceptional one.",
      "We handle San Ramon's permitting requirements, HOA coordination where applicable, and all construction phases with the precision and professionalism that homeowners in this community expect.",
    ],
    features: [
      { title: 'Custom Design', description: "We create ADU plans tailored to your neighborhood's architectural character, ensuring your new unit complements your existing home and property layout." },
      { title: 'Permit Handling', description: 'We manage the entire city permitting process from application to approval, eliminating the delays and confusion that come from navigating it yourself.' },
      { title: 'Premium Build', description: "High-end materials and expert craftsmanship that match the quality expectations of your neighborhood, delivering a finished product you'll be proud of." },
      { title: 'Timeline Control', description: 'On-schedule delivery with detailed milestone tracking and proactive communication, so your project stays on track from start to finish.' },
    ],
  },
  whyEssential: {
    subtitle: 'Function. Safety. Value.',
    paragraphs: [
      "San Ramon consistently ranks among the safest and most desirable cities in California, with top-rated schools and a strong local economy anchored by companies like Chevron and AT&T. Home values here are among the highest in Contra Costa County, and an ADU built by skilled contractors adds proportional value — a poorly built unit in this market stands out for all the wrong reasons.",
      "Skilled contractors are essential in San Ramon because the expectations are higher. Homebuyers and appraisers in this market scrutinize construction quality closely, and an ADU needs to reflect the same standard as the primary residence. This means proper structural engineering, quality HVAC systems, modern electrical work, and finishes that hold up to daily use while looking sharp.",
      "Investing in skilled ADU contractors protects the significant equity you've built in your San Ramon home. The result is a unit that functions beautifully, meets every safety standard, and enhances your property's overall value in one of the Bay Area's most competitive real estate markets.",
    ],
  },
};
