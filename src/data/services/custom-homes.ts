import type { ServicePageData } from '../../lib/service-page-types';
import { serviceCustomHomesFull, serviceCustomHomes, serviceAdditions, designEngineering, designPlanning } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Custom Home Builder in the Bay Area | Hamilton Exteriors',
  description:
    'Full-service custom home builder in the Bay Area. Design, architecture, engineering, permits & construction — all under one roof.',
  announcementText: 'Now Booking Summer 2026 Custom Homes — Schedule Your Consultation',
  definition: 'Custom home construction is the process of designing and building a new residence from the ground up, tailored to the homeowner\u2019s specifications. In the Bay Area, custom homes cost $350 to $800 per square foot including design, architecture, engineering, permits, and construction.',
  expertQuotes: [
    {
      quote: 'The biggest cost driver in Bay Area custom homes is site preparation — hillside lots in the Oakland Hills or Marin headlands can add $100,000 to $200,000 in foundation engineering alone. Design-build under one contract eliminates the coordination gaps between separate architects, engineers, and builders that cause 80% of budget overruns.',
      author: 'Alexander Hamilton Li',
      credentials: 'Architect & General Contractor, CSLB #1082377',
    },
  ],
  hero: {
    headline: "Bay Area Custom Home Builders —  Architect-Led, CSLB #1082377",
    formTitle: 'Get Your Free Consultation',
    formSubtitle:
      "Tell us about your dream home. We'll call within 5 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceCustomHomesFull,
    heroAlt: 'Custom home build in progress by Hamilton Exteriors in the Bay Area',
    serviceType: 'Custom Home',
    badges: [
      'Licensed Bonded & Insured',
      'Start with $0 Down',
      '50-Year Warranty',
      'Custom Project Timelines',
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
        heading: 'What Custom Home Services Does Hamilton Exteriors Offer?',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Ground-Up Construction',
            description: 'Complete control over every detail \u2014 layout, materials, energy systems, and style. Design-build under one contract from foundation to finishing touches.',
            image: serviceCustomHomes,
            href: '/custom-homes/ground-up',
          },
          {
            title: 'Design & Architecture',
            description: 'In-house architects create 3D renderings so you can walk through your home before a single board is cut. Floor plans tailored to your lot.',
            image: designPlanning,
            href: '/custom-homes/design',
          },
          {
            title: 'Engineering & Permits',
            description: 'We coordinate planning, building, fire, and utility departments so you don\u2019t have to. Active relationships with staff in 5 Bay Area counties.',
            image: designEngineering,
            href: '/custom-homes/permits',
          },
          {
            title: 'Additions & Renovations',
            description: 'Expand your living space without selling. Second stories, room extensions, and whole-house renovations that blend seamlessly with your existing home.',
            image: serviceAdditions,
            href: '/custom-homes/additions-renovations',
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'comparison',
      data: {
        heading: 'Custom Home Build Comparison: Ground-Up vs. Major Addition vs. Whole-House Remodel',
        columns: ['Ground-Up Construction', 'Major Addition', 'Whole-House Remodel'],
        rows: [
          { feature: 'Cost per sq ft', values: ['$350–$800', '$200–$500', '$150–$400'] },
          { feature: 'Typical project cost', values: ['$900K–$2M+', '$150K–$500K', '$225K–$600K'] },
          { feature: 'Timeline', values: ['12–18 months (build)', '10–24 weeks', '4–7 months'] },
          { feature: 'Design flexibility', values: ['Complete (layout, style, systems)', 'Moderate (within existing footprint)', 'Limited (existing structure)'] },
          { feature: 'Permits', values: ['Full building + planning', 'Building permit', 'Building permit'] },
          { feature: 'Living on-site during work', values: ['No', 'Usually yes', 'Often no (gut phase)'] },
          { feature: 'Energy efficiency', values: ['Exceeds Title 24 (new build)', 'New section meets Title 24', 'Upgraded to current code'] },
          { feature: 'Best for', values: ['Full custom vision, vacant lots', 'More space, keep location', 'Modernize without rebuilding'] },
        ],
        source: 'National Association of Home Builders, Remodeling Magazine 2024 Cost vs. Value Report, Hamilton Exteriors project data 2024–2026',
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
      question: 'How much does it cost to build a custom home in the Bay Area?',
      answer:
        'Bay Area custom home construction costs $350 to $800 per square foot depending on finishes, site conditions, and architectural complexity. A 2,500 sq ft custom home typically costs $900,000 to $2,000,000 including design, engineering, permits, and construction. Lot preparation, grading, and utility connections add $50,000 to $200,000 depending on the site. Hamilton Exteriors provides detailed, itemized estimates at every stage.',
    },
    {
      question: 'How long does it take to build a custom home?',
      answer:
        'Custom home construction in the Bay Area takes 12 to 18 months from permit approval. The design and permitting phase adds 4 to 8 months depending on architectural complexity and local plan review timelines. Total timeline from initial consultation to move-in is typically 18 to 24 months. Your dedicated project manager provides weekly progress updates and a real-time schedule.',
    },
    {
      question: 'What is the design-build process?',
      answer:
        'Design-build means one company handles architecture, engineering, permitting, and construction under a single contract. This eliminates the coordination gaps between separate architects, engineers, and builders that cause delays and cost overruns. Hamilton Exteriors\u2019 in-house architect designs your home while our construction team provides real-time cost feedback — so the design stays within budget from day one.',
    },
    {
      question: 'Do I need an architect to build a custom home in California?',
      answer:
        'California law requires a licensed architect or engineer to design residential structures over two stories or exceeding certain size thresholds. Even for single-story homes, architectural plans are required for building permits. Hamilton Exteriors\u2019 founder Alexander Hamilton Li is a licensed architect (CSLB #1082377), so design and construction are handled in-house — no separate architect needed.',
    },
    {
      question: 'Can I build a custom home on a hillside lot in the Bay Area?',
      answer:
        'Yes, but hillside construction requires specialized engineering for foundations, retaining walls, drainage, and seismic bracing. Bay Area hillside lots in the Oakland Hills, Marin headlands, and Los Gatos mountains often require geotechnical reports, soil testing, and engineered pier-and-grade-beam foundations. Hamilton Exteriors has experience with hillside construction across Alameda, Contra Costa, and Marin counties.',
    },
  ],
};
