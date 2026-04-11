import type { ServicePageData } from '../../lib/service-page-types';
import { serviceAdditions, financingHouse, serviceCustomHomes, designEngineering } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'Deck Building & Remodeling in the Bay Area | Hamilton Exteriors',
  description:
    'Custom deck building and remodeling across the Bay Area. Composite, hardwood & pressure-treated decks. Design-build under one roof. CSLB #1082377. Call (650) 977-3351.',
  announcementText: 'Now Booking Summer 2026 Decks — Schedule Your Consultation',
  definition: 'A deck is an elevated outdoor platform attached to or adjacent to a home, built for dining, entertaining, and extending indoor living space outdoors. Bay Area decks are typically built from composite lumber, redwood, or pressure-treated wood and cost $15,000 to $60,000 depending on size, materials, and structural complexity.',
  expertQuotes: [
    {
      quote: 'Bay Area deck projects are more complex than most homeowners expect because of our seismic requirements and hillside lot conditions. Every deck we build is engineered to current California Building Code standards — that means proper ledger board connections with through-bolts, not lag screws, and post-to-beam hardware rated for lateral loads. We see failed decks every year from contractors who skip the engineering.',
      author: 'Alexander Hamilton Li',
      credentials: 'Architect & General Contractor, CSLB #1082377',
    },
  ],
  hero: {
    headline: 'Bay Area Deck Building. Your Outdoor Living Room',
    formTitle: 'Get Your Free Consultation',
    formSubtitle:
      "We'll reach out within 3\u20135 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceAdditions,
    heroAlt: 'Custom composite deck with outdoor dining area in the Bay Area',
    serviceType: 'Deck',
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'styles',
      data: {
        heading: 'What Types of Decks Does Hamilton Exteriors Build?',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Composite Decks',
            description: 'Low-maintenance Trex and TimberTech composite decking that resists fading, staining, and mold. 25-year manufacturer warranty with no annual sealing required.',
            image: serviceAdditions,
          },
          {
            title: 'Hardwood Decks',
            description: 'Ipe, redwood, and cedar decks with natural beauty and durability. Ideal for Bay Area homes where the deck is the centerpiece of outdoor living.',
            image: financingHouse,
          },
          {
            title: 'Multi-Level Decks',
            description: 'Tiered deck designs for hillside and sloped lots — common across the East Bay hills, Marin, and Peninsula. Engineered for Bay Area soil and seismic conditions.',
            image: designEngineering,
          },
          {
            title: 'Deck Remodels & Repairs',
            description: 'Replace rotting boards, upgrade railings, add built-in seating, and bring aging decks up to current code. Most deck remodels complete in 2 to 4 weeks.',
            image: serviceCustomHomes,
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'comparison',
      data: {
        heading: 'Deck Material Comparison: Composite vs. Hardwood vs. Pressure-Treated vs. Cedar',
        columns: ['Composite', 'Ipe / Hardwood', 'Pressure-Treated', 'Cedar / Redwood'],
        rows: [
          { feature: 'Cost per sq ft (installed)', values: ['$35–$60', '$45–$75', '$20–$35', '$30–$50'] },
          { feature: 'Lifespan', values: ['25–30 years', '30–50 years', '10–15 years', '15–20 years'] },
          { feature: 'Maintenance', values: ['Wash annually', 'Oil 1–2x/year', 'Seal every 1–2 years', 'Seal every 1–2 years'] },
          { feature: 'Fade resistance', values: ['Excellent', 'Good (oils help)', 'Poor (grays quickly)', 'Moderate'] },
          { feature: 'Scratch resistance', values: ['Good', 'Excellent (hardest)', 'Poor', 'Moderate'] },
          { feature: 'Bay Area suitability', values: ['Best for fog/coast', 'Best for sheltered areas', 'Budget-friendly', 'Native wood, ages well'] },
          { feature: 'Environmental', values: ['Recycled content', 'Sustainably harvested', 'Chemical treatment', 'Naturally rot-resistant'] },
          { feature: 'Best for', values: ['Low maintenance, families', 'Premium look, entertaining', 'Budget builds, utility areas', 'Natural aesthetic'] },
        ],
        source: 'Decking manufacturer specifications, Hamilton Exteriors project data 2024–2026',
      },
    },
    { type: 'projects' },
    { type: 'faq' },
    { type: 'yellowBar', text: 'Schedule Your Free Consultation', href: '#contact' },
    { type: 'cta' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
  localFaqs: [
    {
      question: 'How much does a new deck cost in the Bay Area?',
      answer:
        'Bay Area deck costs range from $15,000 to $60,000 depending on size, materials, and site conditions. A standard 300 sq ft composite deck on a flat lot runs $15,000 to $25,000. Hardwood decks with Ipe or redwood cost $20,000 to $35,000 for the same size. Multi-level decks on hillside lots require structural engineering and deeper footings, pushing costs to $35,000 to $60,000 or more. Permit fees in most Bay Area cities range from $1,500 to $5,000 for deck projects. Every Hamilton Exteriors estimate is fully itemized.',
    },
    {
      question: 'Do I need a permit to build a deck in the Bay Area?',
      answer:
        'Yes. All new decks and most major deck remodels in the Bay Area require building permits. This includes structural, and in some cases electrical permits if you are adding outdoor lighting or outlets. Decks over 30 inches above grade also require guardrails meeting current California Building Code requirements — 42-inch minimum height with balusters spaced no more than 4 inches apart. Hamilton Exteriors handles the entire permitting process including structural engineering drawings, plan submittal, and inspection coordination.',
    },
    {
      question: 'How long does it take to build a deck?',
      answer:
        'Most Bay Area deck projects complete in 2 to 6 weeks from permit approval. A standard ground-level composite deck on a flat lot takes 2 to 3 weeks. Elevated decks requiring concrete footings and structural framing take 3 to 5 weeks. Multi-level hillside decks with engineering and complex foundations take 4 to 6 weeks. The footing and framing phase typically accounts for half the total timeline, with decking, railings, and finish work completing the project. Weather delays are uncommon during dry season but can add 1 to 2 weeks in winter.',
    },
    {
      question: 'What is the best decking material for the Bay Area climate?',
      answer:
        'Composite decking (Trex, TimberTech) is the most popular choice for Bay Area homes because it handles fog, coastal moisture, and UV exposure without annual sealing. Homes near the coast benefit from composite resistance to salt air corrosion. For inland areas with more sun exposure, Ipe hardwood offers superior scratch and heat resistance. Pressure-treated pine is the most affordable option but requires sealing every 1 to 2 years and will gray and crack without maintenance. Redwood and cedar are locally native and age beautifully but also need regular maintenance.',
    },
    {
      question: 'Can I build a deck on a hillside lot?',
      answer:
        'Yes. Hillside decks are one of the most common projects across the East Bay hills, Marin, and parts of the Peninsula. They require structural engineering to account for slope stability, soil conditions, and seismic loads. Typical construction uses steel post bases anchored to concrete piers drilled to stable soil — often 4 to 8 feet deep depending on the slope. Hillside decks cost 30 to 50 percent more than flat-lot decks due to the engineering, deeper footings, and additional structural lumber required. Hamilton Exteriors has built hillside decks across Castro Valley, Oakland hills, Mill Valley, and San Mateo — our architect reviews every hillside project.',
    },
  ],
};
