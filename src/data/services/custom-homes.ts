import type { ServicePageData } from '../../lib/service-page-types';
import { serviceCustomHomesFull, serviceCustomHomes, serviceAdditions, designEngineering, designPlanning } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Custom Home Builder in the Bay Area | Hamilton Exteriors',
  description:
    'Full-service custom home builder in the Bay Area. Design, architecture, engineering, permits & construction — all under one roof.',
  announcementText: 'Now Booking Summer 2026 Custom Homes — Schedule Your Consultation',
  definition: 'Custom home construction is the process of designing and building a new residence from the ground up — ground-up new construction tailored entirely to the homeowner\u2019s specifications, lot conditions, and lifestyle. In the Bay Area, ground-up custom homes cost $350 to $800 per square foot including design, architecture, engineering, permits, and construction.',
  expertQuotes: [
    {
      quote: 'The biggest cost driver in Bay Area custom homes is site preparation — hillside lots in the Oakland Hills or Marin headlands can add $100,000 to $200,000 in foundation engineering alone. Design-build under one contract eliminates the coordination gaps between separate architects, engineers, and builders that cause 80% of budget overruns.',
      author: 'Alexander Hamilton Li',
      credentials: 'Architect & General Contractor, CSLB #1078806',
    },
    {
      quote: 'Ground-up construction gives you complete control over layout, materials, and energy systems in ways that renovation never can. We design every custom home around the specific lot conditions — sun exposure, views, slope, and soil — so the house works with the land instead of fighting it.',
      author: 'Alexander Hamilton Li',
      credentials: 'Architect & General Contractor, CSLB #1078806',
    },
  ],
  hero: {
    headline: "Bay Area Custom Home Builder. One Team From Design to Move-In",
    formTitle: 'Get Your Free Consultation',
    formSubtitle:
      "Tell us about your dream home. We'll call within 5 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceCustomHomesFull,
    heroAlt: 'Custom home build in progress by Hamilton Exteriors in the Bay Area',
    serviceType: 'Custom Home',
    badges: [
      'Licensed Bonded & Insured',
      'Financing Available',
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
      type: 'pricing',
      data: {
        heading: 'How Much Does It Cost to Build a Custom Home in the Bay Area?',
        tiers: [
          {
            name: 'Standard Construction',
            rows: [
              { product: 'Single-story ranch (1,500-2,000 sq ft)', pricePerSq: '~$750,000/project', materialCost: '$300,000' },
              { product: 'Two-story traditional (2,000-2,500 sq ft)', pricePerSq: '~$1,000,000/project', materialCost: '$400,000' },
            ],
          },
          {
            name: 'Premium Construction',
            rows: [
              { product: 'Contemporary design (2,500-3,500 sq ft)', pricePerSq: '~$1,500,000/project', materialCost: '$600,000' },
              { product: 'Hillside custom (2,000-3,000 sq ft)', pricePerSq: '~$1,750,000/project', materialCost: '$700,000' },
            ],
          },
          {
            name: 'Luxury Construction',
            rows: [
              { product: 'Estate home (3,500-5,000 sq ft)', pricePerSq: '~$2,500,000/project', materialCost: '$1,000,000' },
              { product: 'Architect showcase (4,000+ sq ft)', pricePerSq: '~$3,500,000+/project', materialCost: '$1,400,000' },
            ],
          },
        ],
        footnote: 'Prices reflect typical Bay Area ground-up construction costs including architecture, engineering, permitting, site preparation, foundation, framing, MEP, finishes, and landscaping. Actual costs depend on lot conditions, soil type, slope, finish level, and local jurisdiction requirements. Hamilton Exteriors provides fully itemized estimates at every phase.',
      },
    },
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
    { type: 'serviceAreas', data: { heading: 'Custom Home Building Across the Bay Area', serviceSlug: 'custom-homes' } },
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
        'Bay Area custom home construction costs $350 to $800 per square foot depending on finishes, site conditions, and architectural complexity. A 2,500 sq ft custom home typically costs $900,000 to $2,000,000 including design, engineering, permits, and construction. Lot preparation, grading, and utility connections add $50,000 to $200,000 depending on the site — hillside lots with difficult access or poor soil conditions tend toward the higher end. Permit fees in Bay Area cities range from $30,000 to $80,000 for new construction, including plan check, school impact fees, and utility connection charges. Hamilton Exteriors provides detailed, itemized estimates at every stage of design and construction, with a guaranteed maximum price at contract signing so there are no surprises during the build.',
    },
    {
      question: 'How long does it take to build a custom home?',
      answer:
        'Custom home construction in the Bay Area takes 12 to 18 months from permit approval. The design and permitting phase adds 4 to 8 months depending on architectural complexity and local plan review timelines — San Francisco and some Peninsula cities have longer review cycles than East Bay jurisdictions. Total timeline from initial consultation to move-in is typically 18 to 24 months. The foundation and framing phases together account for roughly 4 to 6 months of construction, with mechanical rough-in, drywall, and finishes completing the remaining timeline. Your dedicated project manager provides weekly progress updates, real-time schedule tracking, and coordinates all subcontractor sequencing to prevent the scheduling gaps that commonly cause delays on custom home projects.',
    },
    {
      question: 'What is the design-build process?',
      answer:
        'Design-build means one company handles architecture, engineering, permitting, and construction under a single contract. This eliminates the coordination gaps between separate architects, engineers, and builders that cause delays and cost overruns — the most common source of budget surprises on custom home projects. Hamilton Exteriors\' in-house architect designs your home while our construction team provides real-time cost feedback, so the design stays within budget from day one. Every material and system choice is priced during design, not after. The result is a guaranteed maximum price before construction begins, with a single point of accountability from concept through move-in. Design-build typically saves 10 to 15% compared to the traditional architect-then-bid approach because it eliminates redesign cycles when bids come in over budget.',
    },
    {
      question: 'Do I need an architect to build a custom home in California?',
      answer:
        'California law requires a licensed architect or engineer to design residential structures over two stories or exceeding certain size thresholds. Even for single-story custom homes, detailed architectural plans with structural engineering are required for building permits in every Bay Area jurisdiction. Hiring a separate architect typically costs 8 to 15% of construction cost and adds months of back-and-forth before construction can begin. Hamilton Exteriors\' founder Alexander Hamilton Li is a licensed architect and general contractor (CSLB #1078806), so design and construction are handled in-house under one contract — no separate architect needed. This means design decisions account for construction feasibility and cost from the start, eliminating the expensive redesign cycles that commonly happen when architects and builders work separately.',
    },
    {
      question: 'Can I build a custom home on a hillside lot in the Bay Area?',
      answer:
        'Yes, but hillside construction requires specialized engineering for foundations, retaining walls, drainage, and seismic bracing. Bay Area hillside lots in the Oakland Hills, Marin headlands, and Los Gatos mountains often require geotechnical reports, soil testing, and engineered pier-and-grade-beam foundations rather than standard slab-on-grade. Retaining walls for hillside sites typically cost $200 to $500 per linear foot depending on height and soil conditions. Many hillside lots also fall within Wildland-Urban Interface fire zones, requiring Chapter 7A compliant exterior materials and defensible space planning. Access for construction equipment is another key factor — narrow hillside roads may require specialized delivery logistics that add to the project timeline. Hamilton Exteriors has experience with hillside construction across Alameda, Contra Costa, and Marin counties and coordinates all geotechnical and civil engineering as part of our design-build process.',
    },
    {
      question: 'How much does it cost to build a house from the ground up in the Bay Area?',
      answer:
        'Ground-up custom homes in the Bay Area cost $400 to $700 per square foot, or $750,000 to $3,500,000+ for a complete project. Key cost drivers include lot preparation (grading, retaining walls, utilities), foundation type (slab vs. raised), finish level, and permit fees. Bay Area construction costs run 20-30% above the national average due to labor rates, seismic engineering requirements, and strict energy code compliance. Hamilton Exteriors provides phase-by-phase itemized estimates.',
    },
    {
      question: 'How long does it take to build a custom home in the Bay Area?',
      answer:
        'Ground-up custom homes typically take 12 to 24 months from permit approval to move-in. Design and permitting add 4 to 8 months before construction begins. Foundation and framing take 3 to 5 months, followed by MEP rough-in, insulation, drywall, finishes, and final inspections. Total timeline from initial consultation to keys is 18 to 30 months. Hamilton Exteriors assigns a dedicated project manager who provides weekly milestone updates.',
    },
    {
      question: 'Can I build a new home on an existing lot in the Bay Area?',
      answer:
        'Yes. Many Bay Area homeowners tear down aging homes to build new on existing lots, especially in established neighborhoods with desirable locations. This avoids the cost of land acquisition. Zoning determines maximum building envelope, setbacks, and height. Some jurisdictions offer streamlined permitting for rebuild projects on previously developed lots. Hamilton Exteriors evaluates your lot for buildability during the free consultation.',
    },
    {
      question: 'What is the difference between custom homes and spec homes?',
      answer:
        'Custom homes are designed from scratch for a specific homeowner and lot. You control every decision from floor plan to finishes. Spec homes are built by developers to sell on the open market, with standard layouts and finishes chosen for broad appeal. Custom homes cost more per square foot but deliver exactly what you want. Hamilton Exteriors builds custom only — every project starts with your vision and your lot.',
    },
    {
      question: 'Do I need an architect to build a custom home?',
      answer:
        'California requires licensed architect or engineer stamped plans for any new residential construction. Hamilton Exteriors is architect-led — Alexander Hamilton Li, our founder, is both a licensed architect and general contractor (CSLB #1078806). Having design and construction under one roof eliminates the communication gaps that cause budget overruns and delays on custom home projects.',
    },
  ],
};
