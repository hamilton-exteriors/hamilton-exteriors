import type { ServicePageData } from '../../lib/service-page-types';
import { roofingAsphalt, roofingMetal, roofingTile, roofingFlat, heroRoofing } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Bay Area Roofing Services — Shingles, Metal, Tile & Solar | Hamilton Exteriors',
  description:
    'Top-rated Bay Area roofing contractor. Composite shingles, metal roofs, tile, flat roofs, and GAF solar. 50-year warranty. Free inspection — call (650) 977-3351.',
  announcementText: 'Limited Time Get up to $2000 off your Roof Replacement*',
  hero: {
    headline: 'Bay Area\u2019s  #1 Roofing  Contractor',
    formTitle: 'Get a FREE ROOF INSPECTION',
    formSubtitle:
      "We'll contact you in 3-5 minutes to schedule a FREE roof inspection.",
    ctaText: 'Call Now - We Answer Fast',
    serviceType: 'Roofing',
    serviceOptions: ['Asphalt Shingles', 'Metal Roofing', 'Tile Roofing', 'Flat Roof'],
    heroImage: heroRoofing,
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'styles',
      data: {
        heading: 'Roofing Styles Offered',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Asphalt Shingles',
            description:
              'Composite shingles are durable roofing materials made from a mixture of fiberglass, asphalt, and mineral granules. They offer excellent weather resistance and come in a variety of styles and colors to suit different architectural designs.',
            image: roofingAsphalt,
          },
          {
            title: 'Metal Roofs',
            description:
              'Metal roofs offer outstanding longevity and energy efficiency, lasting up to 50 years or more. They come in various styles and colors, providing excellent protection against extreme weather while reflecting solar radiant heat to reduce cooling costs.',
            image: roofingMetal,
          },
          {
            title: 'Tile Shingles',
            description:
              'Tile roofing offers exceptional durability and aesthetic appeal, with options ranging from traditional clay to modern concrete designs. These versatile materials provide excellent insulation and fire resistance, making them a popular choice for homeowners seeking long-lasting, attractive roofing solutions.',
            image: roofingTile,
          },
          {
            title: 'Energy Roofs',
            description:
              'The GAF Energy roof integrates solar technology directly into roofing materials, combining energy production with traditional roof protection. This innovative system offers a sleek, low-profile alternative to conventional solar panels while providing clean energy and potential savings on electricity bills.',
            image: roofingFlat,
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'pricing',
      data: {
        heading: 'Roofing Pricing',
        tiers: [
          {
            name: 'Standard',
            rows: [
              { product: 'GAF Timberline HDZ', pricePerSq: '~$950', materialCost: '$350' },
              { product: 'CertainTeed Landmark', pricePerSq: '~$940', materialCost: '$340' },
              { product: 'Owens Corning Duration', pricePerSq: '~$960', materialCost: '$360' },
            ],
          },
          {
            name: 'Premium',
            rows: [
              { product: 'CertainTeed Landmark PRO', pricePerSq: '~$1,000', materialCost: '$400' },
              { product: 'GAF Timberline AS II', pricePerSq: '~$1,050', materialCost: '$450' },
              { product: 'Owens Corning Duration STORM', pricePerSq: '~$1,080', materialCost: '$480' },
            ],
          },
          {
            name: 'Designer / Luxury',
            rows: [
              { product: 'GAF Camelot II', pricePerSq: '~$1,175', materialCost: '$500' },
              { product: 'GAF Grand Sequoia', pricePerSq: '~$1,330', materialCost: '$580' },
              { product: 'CertainTeed Presidential Shake', pricePerSq: '~$1,400', materialCost: '$650' },
              { product: 'CertainTeed Grand Manor', pricePerSq: '~$1,525', materialCost: '$700' },
            ],
          },
        ],
        footnote: 'Includes tear-off, materials, labor, underlayment, starter strip, ridge cap, nails, and full cleanup. Prices valid as of 2025.',
      },
    },
    { type: 'projects' },
    { type: 'yellowBar', text: 'Schedule a FREE Inspection', href: '#contact' },
    { type: 'cta' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
};
