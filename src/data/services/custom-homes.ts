import type { ServicePageData } from '../../lib/service-page-types';
import { serviceCustomHomesFull, serviceCustomHomes, serviceAdditions, designEngineering, designPlanning } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Custom Home Builder in the Bay Area | Hamilton Exteriors',
  description:
    'Full-service custom home builder in the Bay Area. Design, architecture, engineering, permits & construction — all under one roof.',
  announcementText: 'Limited Time: Free Design Consultation for Custom Home Projects*',
  hero: {
    headline: "Bay Area's Best Custom Home Builder",
    formTitle: 'Get a FREE Consultation',
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
    { type: 'projects' },
    { type: 'faq' },
    { type: 'yellowBar', text: 'Schedule a FREE Consultation', href: '#contact' },
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
