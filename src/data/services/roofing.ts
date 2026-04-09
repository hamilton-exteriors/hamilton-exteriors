import type { ServicePageData } from '../../lib/service-page-types';
import { roofingAsphalt, roofingMetal, roofingTile, roofingFlat, heroRoofing } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Bay Area Roofing | Shingles, Metal & Tile | Hamilton Exteriors',
  description:
    'Top-rated Bay Area roofing contractor. Composite shingles, metal roofs, tile & GAF solar. 50-year warranty. Free inspection — call (650) 977-3351.',
  announcementText: 'Limited Time Get up to $2000 off your Roof Replacement*',
  hero: {
    headline: 'Bay Area\u2019s Top-Rated Roofing Contractor',
    formTitle: 'Get a FREE ROOF INSPECTION',
    formSubtitle:
      "We'll contact you in 3-5 minutes to schedule a FREE roof inspection.",
    ctaText: 'Call Now - We Answer Fast',
    serviceType: 'Roofing',
    // serviceOptions removed — service is known from page context, form is 2 steps
    heroImage: heroRoofing,
    heroAlt: 'Roof replacement in progress on a Bay Area home by Hamilton Exteriors',
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'styles',
      data: {
        heading: 'What Roofing Styles Does Hamilton Exteriors Offer?',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Asphalt Shingles',
            description: 'The most popular choice for Bay Area homes — architectural shingles from GAF, CertainTeed, and Owens Corning with a 50-year system warranty.',
            image: roofingAsphalt,
            href: '/roofing/asphalt-shingles',
          },
          {
            title: 'Metal Roofs',
            description: 'Standing seam steel and aluminum panels that last 40\u201370 years with virtually zero maintenance. Over 40 color options available.',
            image: roofingMetal,
            href: '/roofing/metal',
          },
          {
            title: 'Tile Roofing',
            description: 'Clay and concrete tile that protects your home for 75\u2013100 years. Perfect for Mediterranean, Spanish Colonial, and contemporary styles.',
            image: roofingTile,
            href: '/roofing/tile',
          },
          {
            title: 'Energy Roofs',
            description: 'GAF solar shingles that generate electricity with a seamless look — no rack-mounted panels. Qualifies for the 30% federal tax credit.',
            image: roofingFlat,
            href: '/roofing/energy',
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'pricing',
      data: {
        heading: 'How Much Does a New Roof Cost in the Bay Area?',
        tiers: [
          {
            name: 'Standard',
            rows: [
              { product: 'GAF Timberline HDZ', pricePerSq: '~$1,100', materialCost: '$425' },
              { product: 'CertainTeed Landmark', pricePerSq: '~$1,075', materialCost: '$400' },
              { product: 'Owens Corning Duration', pricePerSq: '~$1,125', materialCost: '$450' },
            ],
          },
          {
            name: 'Premium',
            rows: [
              { product: 'CertainTeed Landmark PRO', pricePerSq: '~$1,200', materialCost: '$500' },
              { product: 'GAF Timberline AS II', pricePerSq: '~$1,275', materialCost: '$550' },
              { product: 'Owens Corning Duration STORM', pricePerSq: '~$1,300', materialCost: '$575' },
            ],
          },
          {
            name: 'Designer / Luxury',
            rows: [
              { product: 'GAF Camelot II', pricePerSq: '~$1,400', materialCost: '$625' },
              { product: 'GAF Grand Sequoia', pricePerSq: '~$1,575', materialCost: '$700' },
              { product: 'CertainTeed Presidential Shake', pricePerSq: '~$1,650', materialCost: '$750' },
              { product: 'CertainTeed Grand Manor', pricePerSq: '~$1,800', materialCost: '$825' },
            ],
          },
        ],
        footnote: 'Prices per roofing square (100 sq ft) and reflect typical Bay Area installed costs including tear-off, materials, labor, underlayment, and cleanup. Actual pricing varies based on roof size, pitch, accessibility, number of layers, and local permit requirements. Contact us for a free, itemized estimate.',
      },
    },
    { type: 'projects' },
    { type: 'yellowBar', text: 'Schedule a FREE Inspection', href: '#contact' },
    { type: 'cta' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
  localFaqs: [
    {
      question: 'How much does a roof replacement cost in the Bay Area?',
      answer:
        'Bay Area roof replacement costs start around $15,000 and can exceed $100,000 for large or complex projects with premium materials. Composite asphalt shingles run $940 to $1,125 per roofing square (100 sq ft) installed. Premium architectural shingles and designer options range from $1,075 to $1,525 per square. Metal roofing costs $1,200 to $1,800 per square but lasts 40 to 70 years. Every Hamilton Exteriors estimate is itemized with no hidden fees — tear-off, underlayment, flashing, materials, labor, cleanup, and permit costs are all listed separately so you can see exactly where your money goes.',
    },
    {
      question: 'How long does a roof replacement take?',
      answer:
        'A standard asphalt shingle roof replacement typically takes 3 to 5 days from start to completion, including tear-off, underlayment, installation, flashing, and cleanup. Metal and tile roofs may take 5 to 7 days due to additional preparation. Every project gets a dedicated project manager who provides a specific timeline during your free inspection and keeps you updated daily.',
    },
    {
      question: 'What is included in a free roof inspection?',
      answer:
        'Our free roof inspection covers a full assessment of your existing roof\'s condition. A Hamilton Exteriors project manager will examine shingle wear, granule loss, cracked or missing shingles, flashing around vents and chimneys, gutter condition, signs of water intrusion in the attic, and overall structural integrity. You\'ll receive a written report with photos documenting any issues found, along with a detailed estimate if work is recommended. The inspection typically takes 30 to 45 minutes and there is no obligation to proceed.',
    },
    {
      question: 'What roofing materials do you recommend for Bay Area homes?',
      answer:
        'The best roofing material depends on your home\'s architecture, budget, and location. Composite asphalt shingles (GAF Timberline, Owens Corning Duration) are the most popular choice in the Bay Area — they offer excellent value, a 50-year warranty, and Class A fire rating. Metal roofing is ideal for fire-prone areas like the Oakland Hills and Berkeley Hills, reflecting 70% of solar radiant heat (Oak Ridge National Laboratory). Clay and concrete tile roofs are popular on Mediterranean and Spanish-style homes throughout the Peninsula. For homes with solar panels, we offer GAF DecoTech integrated solar roofing.',
    },
    {
      question: 'Do Bay Area homes in fire zones need special roofing?',
      answer:
        'Yes. Homes in California Wildland-Urban Interface (WUI) zones — common in the Berkeley Hills, Oakland Hills, parts of Marin, and Napa — must meet Chapter 7A fire-resistant building standards. This requires Class A fire-rated roofing materials, non-combustible vents, and fire-rated underlayment. Hamilton Exteriors specializes in WUI-compliant installations and will verify your property\'s fire zone designation during the free inspection. We handle all required documentation for building department approval.',
    },
    {
      question: 'Do you offer emergency roof repair or storm damage services?',
      answer:
        'Yes. Hamilton Exteriors provides emergency roof tarping and storm damage repair throughout the Bay Area. If your roof is leaking or has sustained wind, tree, or storm damage, call (650) 977-3351 and we\'ll prioritize getting a crew to your property — typically within 24 hours for active leaks. We can install temporary tarping to prevent further water intrusion while a permanent repair or replacement is planned. Our team also assists with insurance claims: we document all damage with photos and provide the detailed estimates your insurer requires to process the claim.',
    },
    {
      question: 'Can you help with a roofing insurance claim?',
      answer:
        'Yes. If your roof was damaged by a storm, fallen tree, or other covered event, Hamilton Exteriors will work alongside your insurance adjuster to ensure accurate damage documentation. We provide detailed, itemized repair estimates with photos that meet insurer requirements. Our project manager can be present during the adjuster\'s inspection to point out damage that may not be visible from the ground. We\'ve helped Bay Area homeowners navigate dozens of roofing insurance claims — you focus on your family, and we handle the paperwork and repairs.',
    },
  ],
};
