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
        heading: 'Siding Styles Offered',
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
              { product: 'Standard Vinyl', pricePerSq: '~$650', materialCost: '$225' },
              { product: 'Insulated Vinyl', pricePerSq: '~$850', materialCost: '$350' },
            ],
          },
          {
            name: 'Fiber Cement (James Hardie)',
            rows: [
              { product: 'HardiePlank Lap Siding', pricePerSq: '~$1,400', materialCost: '$550' },
              { product: 'HardieShingle Siding', pricePerSq: '~$1,550', materialCost: '$625' },
              { product: 'HardiePanel Vertical', pricePerSq: '~$1,450', materialCost: '$575' },
            ],
          },
          {
            name: 'Stucco & Specialty',
            rows: [
              { product: 'Three-Coat Stucco', pricePerSq: '~$1,300', materialCost: '$450' },
              { product: 'Exterior Waterproofing', pricePerSq: '~$550', materialCost: '$150' },
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
};
