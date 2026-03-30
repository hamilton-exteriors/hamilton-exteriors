import type { ServicePageData } from '../../lib/service-page-types';
import { roofingAsphalt, roofingMetal, roofingTile, roofingFlat } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Reliable Roofing in Castro Valley, CA | Hamilton Exteriors',
  description:
    'Hamilton Exteriors provides top-rated roofing services in Castro Valley, CA. Composite shingles, metal roofs, tile, and solar. Call Now!',
  announcementText: 'Limited Time Get up to $2000 off your Roof Replacement*',
  hero: {
    headline: 'Best Roofing  Company in  Castro Valley',
    formTitle: 'Get a FREE ROOF INSPECTION',
    formSubtitle:
      "We'll contact you in 3-5 minutes to schedule a FREE roof inspection.",
    ctaText: 'Call Now - We Answer Fast',
    serviceType: 'Roofing',
    serviceOptions: ['Asphalt Shingles', 'Metal Roofing', 'Tile Roofing', 'Flat Roof'],
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'cta' },
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
    { type: 'projects' },
    { type: 'yellowBar', text: 'Schedule a FREE Inspection', href: '#contact' },
    { type: 'financing' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
};
