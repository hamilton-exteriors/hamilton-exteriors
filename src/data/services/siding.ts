import type { ServicePageData } from '../../lib/service-page-types';
import { sidingVinyl, sidingFiberCement, sidingWood, sidingStucco, serviceSiding } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Bay Area Siding | James Hardie & Vinyl | Hamilton Exteriors',
  description:
    'James Hardie Elite Preferred installer serving the Bay Area. Fiber cement, vinyl, stucco, and waterproofing. 50-year warranty, $0 down financing. Free estimate.',
  announcementText: 'Limited Time Get up to 20% off your Siding Replacement',
  hero: {
    headline: "Bay Area's  Best Siding  Installers",
    formTitle: 'Get a FREE SIDING INSPECTION',
    formSubtitle:
      "We'll contact you in 3-5 minutes to schedule a FREE SIDING inspection.",
    ctaText: 'Call Now - We Answer Fast',
    serviceType: 'Siding',
    // serviceOptions removed — service is known from page context, form is 2 steps
    heroImage: serviceSiding,
    heroAlt: 'James Hardie fiber cement siding installation on a Bay Area home',
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'stats',
      data: {
        items: [
          { value: '50', label: 'Year Warranty' },
          { value: '$0', label: 'Down Payment Required' },
          { value: '3-5', label: 'Day Installation' },
        ],
      },
    },
    {
      type: 'styles',
      data: {
        heading: 'What Siding Styles Does Hamilton Exteriors Offer?',
        cardVariant: 'siding',
        items: [
          {
            title: 'Vinyl Siding',
            image: sidingVinyl,
            description: 'Premium CertainTeed and Ply Gem vinyl in 60+ colors and textures — the best value for a fresh, low-maintenance exterior.',
            href: '/siding/vinyl',
          },
          {
            title: 'Fiber Cement Siding',
            image: sidingFiberCement,
            description: 'James Hardie fiber cement engineered for Bay Area fog and moisture. Class A fire rated with the highest resale ROI of any siding material.',
            href: '/siding/fiber-cement',
          },
          {
            title: 'Stucco Siding',
            image: sidingWood,
            description: 'Traditional three-coat stucco and EIFS for Mediterranean, Spanish Colonial, and Craftsman homes. Lasts 50\u201380 years with proper care.',
            href: '/siding/stucco',
          },
          {
            title: 'Waterproofing',
            image: sidingStucco,
            description: 'Complete exterior moisture protection — elastomeric coatings, flashing, and foundation membranes to stop water damage before it starts.',
            href: '/siding/waterproofing',
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'pricing',
      data: {
        heading: 'How Much Does New Siding Cost in the Bay Area?',
        tiers: [
          {
            name: 'Vinyl Siding',
            rows: [
              { product: 'Standard Vinyl', pricePerSq: '~$975', materialCost: '$325' },
              { product: 'Insulated Vinyl', pricePerSq: '~$1,275', materialCost: '$475' },
            ],
          },
          {
            name: 'Fiber Cement (James Hardie)',
            rows: [
              { product: 'HardiePlank Lap Siding', pricePerSq: '~$2,100', materialCost: '$825' },
              { product: 'HardieShingle Siding', pricePerSq: '~$2,325', materialCost: '$925' },
              { product: 'HardiePanel Vertical', pricePerSq: '~$2,175', materialCost: '$850' },
            ],
          },
          {
            name: 'Stucco & Specialty',
            rows: [
              { product: 'Three-Coat Stucco', pricePerSq: '~$1,950', materialCost: '$675' },
              { product: 'Exterior Waterproofing', pricePerSq: '~$825', materialCost: '$250' },
            ],
          },
        ],
        footnote: 'Prices per 100 sq ft (one square) installed, reflecting typical Bay Area costs. Includes removal of existing siding, new weather barrier, materials, labor, trim, and cleanup. Actual pricing varies based on home size, stories, architectural details, and access. Contact us for a free, itemized estimate.',
      },
    },
    { type: 'projects' },
    { type: 'faq' },
    { type: 'yellowBar', text: 'Schedule a FREE Siding Inspection', href: '#contact' },
    { type: 'cta' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
  localFaqs: [
    {
      question: 'How much does siding replacement cost in the Bay Area?',
      answer:
        'Bay Area siding costs vary by material. Vinyl siding runs $975 to $1,275 per 100 sq ft installed. James Hardie fiber cement siding — our most popular choice — costs $2,100 to $2,325 per 100 sq ft. Stucco remediation and re-application averages $1,950 per 100 sq ft. A typical 2,000 sq ft Bay Area home costs $12,500 to $28,000 for full siding replacement. Every Hamilton Exteriors estimate is itemized with no hidden fees.',
    },
    {
      question: 'Why is James Hardie fiber cement siding recommended for Bay Area homes?',
      answer:
        'James Hardie developed its HZ5 fiber cement formula specifically for coastal and high-humidity climates like the Bay Area. It resists moisture, fog, salt air, and temperature swings that cause wood and vinyl to deteriorate. Fiber cement siding delivers an 86% return on investment at resale (Remodeling Magazine, 2024 Cost vs. Value Report), making it one of the highest-ROI exterior upgrades available. Hamilton Exteriors is a James Hardie Elite Preferred installer — the highest certification level — meaning our crews are factory-trained and your installation carries an extended warranty.',
    },
    {
      question: 'How long does a siding installation take?',
      answer:
        'James Hardie fiber cement siding projects generally run 1 to 2 weeks depending on your home\'s square footage, number of stories, and architectural complexity. Vinyl siding is faster — typically 3 to 5 days. Every project includes removal of old siding, inspection and repair of underlying sheathing, installation of a weather-resistant barrier, new siding, and trim and caulking. A dedicated project manager keeps you updated daily.',
    },
    {
      question: 'What is the difference between fiber cement and vinyl siding?',
      answer:
        'Fiber cement (James Hardie) is made from cement, sand, and cellulose fibers — it will not melt, warp, or crack in Bay Area temperature swings. It carries a Class A fire rating, resists termites and rot, and can be painted any color. Vinyl siding costs less upfront but has a shorter lifespan (20 to 30 years vs. 50+ for fiber cement), can warp in direct sun, and melts in fire. For Bay Area homes — especially in fire zones or near the coast — fiber cement is the stronger long-term investment.',
    },
    {
      question: 'Can new siding help with water damage prevention?',
      answer:
        'Yes. The average water damage insurance claim in the Bay Area is $12,500. Properly installed siding with a weather-resistant barrier (WRB) is your home\'s primary defense against water intrusion. Hamilton Exteriors installs a full WRB system behind every siding project, including flashing around all windows, doors, and penetrations. We inspect the underlying sheathing during removal and repair any existing moisture damage before new siding goes on.',
    },
  ],
};
