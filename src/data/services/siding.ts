import type { ServicePageData } from '../../lib/service-page-types';
import { sidingVinyl, sidingFiberCement, sidingWood, sidingStucco, serviceSiding } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Bay Area Siding Installation — James Hardie, Vinyl & Stucco | Hamilton Exteriors',
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
    serviceOptions: ['James Hardie', 'Vinyl Siding', 'Wood Siding', 'Fiber Cement'],
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
              'Vinyl siding is a versatile and durable exterior cladding made from PVC resin. It provides excellent resistance to weather, pests, and moisture, while requiring minimal maintenance. Available in a wide range of colors, textures, and styles, vinyl siding enhances curb appeal and complements various architectural designs.',
          },
          {
            title: 'Fiber Cement Siding',
            image: sidingFiberCement,
            description:
              'Fiber cement siding, particularly James Hardie products, is a premium exterior cladding made from a blend of cement, sand, and cellulose fibers. Renowned for its durability, it resists fire, pests, and harsh weather conditions while requiring minimal maintenance. Available in a variety of colors and textures, James Hardie siding adds long-lasting beauty and enhances the character of any home',
          },
          {
            title: 'Stucco Siding',
            image: sidingWood,
            description:
              'Stucco is a timeless and durable exterior finish made from a mixture of cement, sand, lime, and water. Known for its excellent weather resistance and energy efficiency, stucco provides a seamless, textured look that enhances both traditional and modern architectural designs. Available in various colors and finishes, it offers a versatile and low-maintenance solution for exterior cladding.',
          },
          {
            title: 'Waterproofing',
            image: sidingStucco,
            description:
              "Waterproofing ensures a home's exterior is protected from moisture, preventing water damage and mold. By creating a reliable barrier, it enhances the durability of siding materials and helps maintain a home's structural integrity in all weather conditions.",
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'pricing',
      data: {
        heading: 'Siding Pricing',
        tiers: [
          {
            name: 'Vinyl Siding',
            rows: [
              { product: 'Standard Vinyl', pricePerSq: '~$450', materialCost: '$150' },
              { product: 'Insulated Vinyl', pricePerSq: '~$600', materialCost: '$250' },
            ],
          },
          {
            name: 'Fiber Cement (James Hardie)',
            rows: [
              { product: 'HardiePlank Lap Siding', pricePerSq: '~$1,100', materialCost: '$450' },
              { product: 'HardieShingle Siding', pricePerSq: '~$1,250', materialCost: '$500' },
              { product: 'HardiePanel Vertical', pricePerSq: '~$1,150', materialCost: '$475' },
            ],
          },
          {
            name: 'Stucco & Specialty',
            rows: [
              { product: 'Three-Coat Stucco', pricePerSq: '~$1,000', materialCost: '$350' },
              { product: 'Exterior Waterproofing', pricePerSq: '~$400', materialCost: '$100' },
            ],
          },
        ],
        footnote: 'Prices per 100 sq ft (one square) installed. Includes removal of existing siding, new weather barrier, materials, labor, trim, and cleanup. Prices valid as of 2025.',
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
