import type { ServicePageData } from '../../lib/service-page-types';
import { aduHero, serviceAdu, serviceAdditions, financingHouse, financingWorker } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'ADU Builder in the San Francisco Bay Area | Design & Construction Experts | Hamilton Exteriors',
  description:
    'Hamilton Exteriors is a full-service ADU builder in the Bay Area. Design, architecture, engineering, permitting, and construction — all under one roof.',
  announcementText: 'Now Booking Summer 2026 ADU Projects — Schedule Your Consultation',
  definition: 'An accessory dwelling unit (ADU) is a secondary housing unit built on a single-family residential lot — either as a detached backyard structure, attached addition, or garage conversion. California state law (AB 68, SB 9) streamlines ADU permitting, and Bay Area ADUs typically cost $80,000 to $350,000 while adding $150,000 to $300,000 in property value.',
  expertQuotes: [
    {
      quote: 'Our architects consistently find 10 to 15% more buildable area than homeowners expect on their lots. California\u2019s ADU laws override many local zoning restrictions — setback requirements, lot coverage limits, and parking mandates have all been relaxed since 2020.',
      author: 'Alexander Hamilton Li',
      credentials: 'Architect & General Contractor, CSLB #1082377',
    },
  ],
  hero: {
    headline: "Bay Area ADU Builder. We Design, Permit, and Build It All",
    formTitle: 'Get Your Free ADU Consultation',
    formSubtitle:
      "We'll reach out within 3\u20135 minutes to discuss your ADU project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: aduHero,
    heroAlt: 'Accessory dwelling unit under construction in the Bay Area',
    serviceType: 'ADU',
    badges: [
      'Licensed Bonded & Insured',
      'Financing Available',
      '50-Year Warranty',
      '8-12 Week Builds',
    ],
    // serviceOptions removed — service is known from page context, form is 2 steps
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'styles',
      data: {
        heading: 'What ADU Services Does Hamilton Exteriors Offer?',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Detached ADUs',
            description: 'Standalone backyard units from 400 to 1,200 sq ft with full kitchens, bathrooms, and private entrances. Adds $150K\u2013$300K in property value.',
            image: serviceAdu,
            href: '/adu/detached',
          },
          {
            title: 'Design & Architecture',
            description: 'Custom floor plans and 3D renderings tailored to your lot. Our architects often find 10\u201315% more buildable area than homeowners expect.',
            image: financingHouse,
            href: '/adu/design',
          },
          {
            title: 'Engineering & Permits',
            description: 'We handle the entire permit process from application through final inspection, backed by our 60-day permit guarantee.',
            image: financingWorker,
            href: '/adu/permits',
          },
          {
            title: 'Garage Conversions',
            description: 'The most cost-effective ADU option \u2014 30\u201340% less than new construction. No replacement parking required under California law.',
            image: serviceAdditions,
            href: '/adu/garage-conversions',
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'comparison',
      data: {
        heading: 'ADU Type Comparison: Detached vs. Garage Conversion vs. Junior ADU',
        columns: ['Detached ADU', 'Garage Conversion', 'Junior ADU (JADU)'],
        rows: [
          { feature: 'Size', values: ['400–1,200 sq ft', '200–500 sq ft', 'Up to 500 sq ft'] },
          { feature: 'Cost range', values: ['$150,000–$350,000', '$100,000–$200,000', '$80,000–$150,000'] },
          { feature: 'Build time', values: ['4–6 months', '2–4 months', '2–3 months'] },
          { feature: 'Foundation', values: ['New slab or raised', 'Existing (reinforced)', 'Existing home'] },
          { feature: 'Privacy', values: ['Maximum (separate structure)', 'Moderate', 'Shared wall with home'] },
          { feature: 'Rental income', values: ['$2,000–$3,500/mo', '$1,800–$2,800/mo', '$1,200–$2,000/mo'] },
          { feature: 'Property value added', values: ['$150K–$300K', '$100K–$200K', '$75K–$125K'] },
          { feature: 'Parking required', values: ['No (CA law)', 'No (AB 68)', 'No'] },
          { feature: 'Best for', values: ['Maximum ROI, rental income', 'Budget-friendly, faster', 'Aging parents, home office'] },
        ],
        source: 'California Department of Housing and Community Development, Hamilton Exteriors project data 2024–2026',
      },
    },
    { type: 'projects' },
    { type: 'serviceAreas', data: { heading: 'ADU Construction Across the Bay Area', serviceSlug: 'adu' } },
    { type: 'faq' },
    { type: 'yellowBar', text: 'Schedule Your Free ADU Consultation', href: '#contact' },
    { type: 'cta' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
  localFaqs: [
    {
      question: 'How much does it cost to build an ADU in the Bay Area?',
      answer:
        'Bay Area ADU costs range from $150,000 to $350,000 for a detached unit and $100,000 to $200,000 for a garage conversion. Junior ADUs (JADUs under 500 sq ft) start around $80,000. Key cost factors include foundation type, utility connections, interior finishes, and local permit fees — which range from $5,000 to $15,000 depending on the city. Detached ADUs with separate utility meters cost more upfront but allow independent billing for rental income. Site preparation including grading, trenching for utilities, and concrete work typically adds $20,000 to $40,000. Hamilton Exteriors provides fully itemized estimates at every phase — design, permitting, and construction costs are all broken out so you can plan your budget before committing.',
    },
    {
      question: 'Do I need a permit to build an ADU in California?',
      answer:
        'Yes. California\'s ADU laws (AB 68, SB 13, AB 881) streamlined permitting statewide, but you still need building permits from your local jurisdiction. Most Bay Area cities must approve or deny ADU permits within 60 days under state law. Required permits typically include building, electrical, plumbing, and mechanical — and some jurisdictions require a separate grading permit if site work is involved. Cities cannot require owner-occupancy for ADUs built after January 2020, and impact fees have been eliminated for units under 750 sq ft. Hamilton Exteriors handles the full permitting process — architectural plans, structural engineering, Title 24 energy compliance calculations, plan check submittal, and inspection coordination throughout construction.',
    },
    {
      question: 'How long does it take to build an ADU?',
      answer:
        'From permit approval, most detached ADUs complete in 4 to 6 months. Garage conversions are faster at 2 to 4 months since the shell already exists. The permitting phase adds 2 to 4 months depending on your city\'s plan review backlog — San Francisco and some Peninsula cities tend toward the longer end, while most East Bay cities process within 60 days. Total timeline from design to move-in is typically 8 to 12 months. The longest single phase is usually foundation and framing at 6 to 8 weeks for a detached unit. Your project manager provides a detailed construction schedule at contract signing with weekly milestone updates so you can plan your rental listing or family move-in date accordingly.',
    },
    {
      question: 'Can I build an ADU on my property?',
      answer:
        'Under California law, most single-family residential lots can accommodate at least one ADU. Since January 2020, cities cannot impose minimum lot size requirements for ADUs under 800 sq ft. Setback requirements have been reduced to 4 feet for rear and side yards. You are also allowed to build one JADU (junior ADU up to 500 sq ft) inside your existing home in addition to a detached ADU, for a total of two accessory units on a single-family lot. The main factors that affect feasibility are utility access — sewer and water connections must reach the ADU location — and any easements or deed restrictions on your property. Hamilton Exteriors evaluates your lot for utility access, setbacks, fire department access, and local overlay zones during your initial consultation at no cost.',
    },
    {
      question: 'Can I rent out my ADU?',
      answer:
        'Yes. California law explicitly allows homeowners to rent ADUs as long-term rentals (30 days or more). Some Bay Area cities — including San Francisco, Oakland, and Berkeley — restrict or prohibit short-term rentals under 30 days in ADUs, so check your local ordinance before planning an Airbnb-style rental. An ADU in the Bay Area typically rents for $1,800 to $3,500 per month depending on size, location, and finishes. A well-built 600 sq ft one-bedroom ADU in Alameda County can generate $2,200 to $2,800 per month in rental income, often covering the construction loan payment within 3 to 5 years. Many homeowners also use ADUs for aging parents, adult children, or home offices rather than rental income — the flexibility adds long-term value regardless of how you use the space.',
    },
  ],
};
