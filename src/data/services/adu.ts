import type { ServicePageData } from '../../lib/service-page-types';
import { aduHero, serviceAdu, serviceAdditions, financingHouse, financingWorker } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'ADU Builder in the San Francisco Bay Area | Design & Construction Experts | Hamilton Exteriors',
  description:
    'Hamilton Exteriors is a full-service ADU builder in the Bay Area. Design, architecture, engineering, permitting, and construction — all under one roof.',
  announcementText: 'Limited Time: Free ADU Design Consultation + Permit Guarantee*',
  definition: 'An accessory dwelling unit (ADU) is a secondary housing unit built on a single-family residential lot — either as a detached backyard structure, attached addition, or garage conversion. California state law (AB 68, SB 9) streamlines ADU permitting, and Bay Area ADUs typically cost $80,000 to $350,000 while adding $150,000 to $300,000 in property value.',
  expertQuotes: [
    {
      quote: 'Our architects consistently find 10 to 15% more buildable area than homeowners expect on their lots. California\u2019s ADU laws override many local zoning restrictions — setback requirements, lot coverage limits, and parking mandates have all been relaxed since 2020.',
      author: 'Alexander Hamilton Li',
      credentials: 'Architect & General Contractor, CSLB #1082377',
    },
  ],
  hero: {
    headline: "Bay Area's Best ADU Builder",
    formTitle: 'Get a FREE ADU Consultation',
    formSubtitle:
      "We'll contact you in 3-5 minutes to discuss your ADU project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: aduHero,
    heroAlt: 'Accessory dwelling unit under construction in the Bay Area',
    serviceType: 'ADU',
    badges: [
      'Licensed Bonded & Insured',
      'Start with $0 Down',
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
    { type: 'faq' },
    { type: 'yellowBar', text: 'Schedule a FREE ADU Consultation', href: '#contact' },
    { type: 'cta' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
  localFaqs: [
    {
      question: 'How much does it cost to build an ADU in the Bay Area?',
      answer:
        'Bay Area ADU costs range from $150,000 to $350,000 for a detached unit and $100,000 to $200,000 for a garage conversion. Junior ADUs (JADUs under 500 sq ft) start around $80,000. Key cost factors include foundation type, utility connections, finishes, and local permit fees. Hamilton Exteriors provides itemized estimates with no hidden costs.',
    },
    {
      question: 'Do I need a permit to build an ADU in California?',
      answer:
        'Yes. California\u2019s ADU laws (AB 68, SB 13, AB 881) streamlined permitting statewide, but you still need building permits from your local jurisdiction. Most Bay Area cities must approve or deny ADU permits within 60 days. Hamilton Exteriors handles the full permitting process — architectural plans, engineering, plan check submittal, and inspection coordination.',
    },
    {
      question: 'How long does it take to build an ADU?',
      answer:
        'From permit approval, most detached ADUs complete in 4 to 6 months. Garage conversions are faster at 2 to 4 months since the shell already exists. The permitting phase adds 2 to 4 months depending on your city\u2019s backlog. Total timeline from design to move-in is typically 8 to 12 months. We provide a detailed schedule at contract signing.',
    },
    {
      question: 'Can I build an ADU on my property?',
      answer:
        'Under California law, most single-family residential lots can accommodate at least one ADU. Since January 2020, cities cannot impose minimum lot size requirements for ADUs under 800 sq ft. Setback requirements have been reduced to 4 feet for rear and side yards. Hamilton Exteriors evaluates your lot for utility access, setbacks, and local overlay zones during our free consultation.',
    },
    {
      question: 'Can I rent out my ADU?',
      answer:
        'Yes. California law explicitly allows homeowners to rent ADUs as long-term rentals. Some cities restrict short-term rentals (under 30 days) in ADUs, so check your local ordinance. An ADU in the Bay Area typically rents for $1,800 to $3,500 per month depending on size, location, and finishes — often covering the construction loan payment within a few years.',
    },
  ],
};
