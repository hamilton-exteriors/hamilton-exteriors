import type { ServicePageData } from '../../lib/service-page-types';
import { sidingVinyl, sidingFiberCement, sidingWood, sidingStucco, serviceSiding } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Bay Area Siding | James Hardie & Vinyl | Hamilton Exteriors',
  description:
    'James Hardie Elite Preferred installer serving the Bay Area. Fiber cement, vinyl, stucco, and waterproofing. 50-year warranty, financing available. CSLB #1082377.',
  announcementText: 'Now Booking Summer 2026 Siding Projects — Schedule Your Inspection',
  definition: 'Siding replacement is the process of removing and reinstalling the exterior cladding that protects a home from moisture, wind, and temperature. Common materials include vinyl, James Hardie fiber cement, and stucco. James Hardie fiber cement delivers an 86% return on investment at resale according to Remodeling Magazine\u2019s 2024 Cost vs. Value Report.',
  expertQuotes: [
    {
      quote: 'In the Bay Area\u2019s fog belt — from Daly City through Pacifica and Half Moon Bay — fiber cement outperforms every other siding material for moisture resistance. James Hardie engineered their HZ10 product line specifically for high-humidity coastal climates like ours.',
      author: 'Alexander Hamilton Li',
      credentials: 'James Hardie Elite Preferred Installer, CSLB #1082377',
    },
    {
      quote: 'For homeowners in WUI fire zones, fiber cement siding is the clear choice. It carries a Class A fire rating and won\u2019t melt or ignite like vinyl. Combined with a Class A roof, it gives you full-perimeter fire protection that meets Chapter 7A requirements.',
      author: 'Alexander Hamilton Li',
      credentials: 'Architect & General Contractor, Hamilton Exteriors',
    },
  ],
  hero: {
    headline: "New Siding That Transforms Your Home's Curb Appeal",
    formTitle: 'Get Your Free Siding Inspection',
    formSubtitle:
      "We'll reach out within 3\u20135 minutes to schedule your inspection.",
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
          { value: '100%', label: 'Satisfaction Guaranteed' },
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
        footnote: 'Prices per 100 sq ft (one square) installed, reflecting typical Bay Area costs. Includes removal of existing siding, new weather barrier, materials, labor, trim, and cleanup. Actual pricing varies based on home size, stories, architectural details, and access. Contact us for an itemized estimate.',
      },
    },
    {
      type: 'comparison',
      data: {
        heading: 'Siding Material Comparison: Vinyl vs. Fiber Cement vs. Stucco',
        columns: ['Vinyl', 'James Hardie Fiber Cement', 'Stucco'],
        rows: [
          { feature: 'Lifespan', values: ['20–40 years', '50+ years', '50–80 years'] },
          { feature: 'Cost per sq (installed)', values: ['$975–$1,275', '$2,100–$2,325', '~$1,950'] },
          { feature: 'Fire rating', values: ['Melts, not rated', 'Class A', 'Non-combustible'] },
          { feature: 'Maintenance', values: ['Very low', 'Low (repaint every 15 yrs)', 'Low–moderate'] },
          { feature: 'ROI at resale', values: ['~70%', '86% (Remodeling Magazine)', '~80%'] },
          { feature: 'Moisture resistance', values: ['Excellent', 'Excellent (engineered for fog)', 'Good with maintenance'] },
          { feature: 'Best for', values: ['Budget, rental properties', 'Premium homes, fire zones', 'Mediterranean, Spanish Colonial'] },
        ],
        source: 'Remodeling Magazine 2024 Cost vs. Value Report, Hamilton Exteriors project data 2024–2026',
      },
    },
    { type: 'projects' },
    { type: 'faq' },
    { type: 'yellowBar', text: 'Schedule Your Free Siding Inspection', href: '#contact' },
    { type: 'cta' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
  localFaqs: [
    {
      question: 'How much does siding replacement cost in the Bay Area?',
      answer:
        'Bay Area siding costs vary by material. Vinyl siding runs $975 to $1,275 per 100 sq ft installed. James Hardie fiber cement siding — our most popular choice — costs $2,100 to $2,325 per 100 sq ft. Stucco remediation and re-application averages $1,950 per 100 sq ft. A typical 2,000 sq ft Bay Area home costs $12,500 to $28,000 for full siding replacement depending on the material chosen and the number of stories. Multi-story homes require scaffolding, which adds $1,500 to $4,000 to the project cost. Homes with significant dry rot or water damage behind the existing siding will also need sheathing repairs before new siding is installed. Every Hamilton Exteriors estimate is fully itemized — materials, labor, trim, weather barrier, and disposal costs are all listed separately so you can compare options.',
    },
    {
      question: 'Why is James Hardie fiber cement siding recommended for Bay Area homes?',
      answer:
        'James Hardie developed its HZ5 fiber cement formula specifically for coastal and high-humidity climates like the Bay Area. It resists moisture, fog, salt air, and temperature swings that cause wood and vinyl to deteriorate. Fiber cement siding delivers an 86% return on investment at resale (Remodeling Magazine, 2024 Cost vs. Value Report), making it one of the highest-ROI exterior upgrades available. Hamilton Exteriors is a James Hardie Elite Preferred installer — the highest certification level — meaning our crews are factory-trained and your installation carries an extended warranty.',
    },
    {
      question: 'How long does a siding installation take?',
      answer:
        'James Hardie fiber cement siding projects generally run 1 to 2 weeks depending on your home\'s square footage, number of stories, and architectural complexity. Vinyl siding is faster — typically 3 to 5 days. Every project includes removal of old siding, inspection and repair of underlying sheathing, installation of a weather-resistant barrier, new siding, and trim and caulking. If we discover moisture damage or dry rot during tear-off, repairs are completed before new siding goes on — this can add 1 to 3 days but prevents hidden problems from continuing behind the new material. We work in sections around your home so exposed walls are never left unprotected overnight. A dedicated project manager keeps you updated daily with progress photos.',
    },
    {
      question: 'What is the difference between fiber cement and vinyl siding?',
      answer:
        'Fiber cement (James Hardie) is made from cement, sand, and cellulose fibers — it will not melt, warp, or crack in Bay Area temperature swings. It carries a Class A fire rating, resists termites and rot, and can be painted any color. Vinyl siding costs less upfront but has a shorter lifespan (20 to 30 years vs. 50+ for fiber cement), can warp in direct sun, and melts in fire. For Bay Area homes — especially in fire zones or near the coast — fiber cement is the stronger long-term investment.',
    },
    {
      question: 'Can new siding help with water damage prevention?',
      answer:
        'Yes. The average water damage insurance claim in the Bay Area is $12,500, making prevention far more cost-effective than repair. Properly installed siding with a weather-resistant barrier (WRB) is your home\'s primary defense against water intrusion. Hamilton Exteriors installs a full WRB system behind every siding project, including flashing around all windows, doors, and penetrations. We use both peel-and-stick flashing at critical junctions and mechanically fastened house wrap across wall surfaces, creating a continuous drainage plane that channels water down and out. We inspect the underlying sheathing during removal and repair any existing moisture damage before new siding goes on. Bay Area coastal homes are especially vulnerable — salt-laden fog accelerates wood decay and can cause water damage behind siding that appears intact from the outside.',
    },
  ],
};
