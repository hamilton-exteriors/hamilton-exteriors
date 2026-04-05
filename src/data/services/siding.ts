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
            description:
              'Vinyl siding remains the most widely installed exterior cladding in the United States, covering roughly 27% of existing homes according to the U.S. Census Bureau\u2019s American Housing Survey. Modern insulated vinyl delivers R-values of 2.0\u20133.5, improving thermal efficiency by up to 20% compared to hollow-back profiles. In the Bay Area, vinyl siding performs well in our mild coastal climate, resisting moisture, salt air, and UV degradation without painting, staining, or sealing. We install premium CertainTeed and Ply Gem vinyl systems in over 60 color and texture options, including profiles that replicate cedar shake and beaded clapboard. Bay Area homeowners typically choose vinyl for its exceptional value\u2014installed cost averages $450\u2013$600 per square, roughly 50% less than fiber cement. Our installations include a full weather-resistant barrier, J-channel trim, soffit venting, and manufacturer warranty coverage lasting the lifetime of the original owner.',
          },
          {
            title: 'Fiber Cement Siding',
            image: sidingFiberCement,
            description:
              'James Hardie fiber cement siding is engineered specifically for regional climates\u2014their HZ5 formulation is designed for the Bay Area\u2019s fog, moisture, and temperature swings. Made from Portland cement, sand, and cellulose fibers, Hardie products deliver Class A fire resistance, resist termite damage, and will not rot or warp in the coastal humidity that degrades wood siding within 10\u201315 years. As a James Hardie Elite Preferred installer, we offer the full ColorPlus Technology palette\u2014factory-applied baked-on color with a 15-year fade and chip warranty, eliminating on-site painting and its associated VOC emissions. According to Remodeling Magazine\u2019s 2024 Cost vs. Value report, fiber cement siding replacement returns 86% of cost at resale in the Pacific West region, the highest ROI of any siding material. We install HardiePlank lap siding, HardieShingle staggered panels, and HardiePanel vertical board with manufacturer-specified flashing, joint treatment, and Hardie-approved fasteners for full system warranty eligibility.',
          },
          {
            title: 'Stucco Siding',
            image: sidingWood,
            description:
              'Three-coat stucco remains one of the Bay Area\u2019s most popular exterior finishes, particularly in neighborhoods with Mediterranean, Spanish Colonial, and Craftsman architecture. Applied over a metal lath base in three layers\u2014scratch coat, brown coat, and finish coat\u2014traditional stucco creates a monolithic, seamless exterior shell with inherent fire resistance and thermal mass that moderates indoor temperature swings. The California Building Standards Commission classifies stucco as a one-hour fire-rated assembly, making it especially valuable in WUI fire zones throughout the East Bay hills. We also install Exterior Insulation and Finish Systems (EIFS) for applications requiring enhanced R-value. Our stucco crews have 15+ years of Bay Area experience repairing earthquake-caused hairline cracking, matching existing textures on additions, and applying elastomeric finish coats that flex with seasonal movement. Properly maintained stucco lasts 50\u201380 years, and we back our installations with a 10-year workmanship warranty.',
          },
          {
            title: 'Waterproofing',
            image: sidingStucco,
            description:
              'Bay Area homes face unique moisture challenges\u2014Pacific fog belt condensation, wind-driven rain, and aging stucco or wood cladding that allows water infiltration behind the building envelope. According to the Insurance Information Institute, water damage is the second most common homeowner insurance claim in California, averaging $12,500 per incident. Our waterproofing services create a continuous moisture barrier across the entire exterior envelope, including elastomeric coatings for stucco, flashing replacement at windows and doors, and below-grade foundation waterproofing membranes. We use Tremco and Henry commercial-grade waterproofing products rated for 15+ years of continuous protection. For older Bay Area homes with lath-and-plaster construction or original single-pane windows, we coordinate waterproofing with siding replacement to address the root cause rather than treating symptoms. Every project includes a moisture meter assessment documenting baseline readings, so you have measurable proof of improvement.',
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
    { type: 'yellowBar', text: 'Schedule a FREE Siding Inspection', href: '#contact' },
    { type: 'cta' },
    { type: 'faq' },
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
