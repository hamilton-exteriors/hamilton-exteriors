import type { ServicePageData } from '../../lib/service-page-types';

export const data: ServicePageData = {
  title:
    'Home Additions Across the San Francisco Bay Area | Design & Construction Experts | Hamilton Exteriors',
  description:
    'Hamilton Exteriors builds quality home additions in Castro Valley. ADUs, extensions, custom homes, and full remodels.',
  hero: {
    headline: '',
    formTitle: 'Get a FREE Consultaion',
    badges: [
      'Licensed Bonded & Insured',
      'Start with $0 Down',
      '50 year Warranty',
      'Increase Property Value',
    ],
  },
  sections: [
    { type: 'logoSlider' },
    {
      type: 'styles',
      data: {
        heading: 'Construction Services Offered',
        cardVariant: 'adu',
        items: [
          {
            title: 'ADUS',
            description:
              'Accessory Dwelling Units (ADUs) are additions or standalone backyard homes that add flexible living space and complement your property\u2019s style. They can be used for guests, a home office, family, or rentals\u2014often generating income and boosting long-term property value.',
            href: '/adu',
          },
          {
            title: 'Extensions',
            description:
              'Home extensions are seamless additions to your existing house, designed to create more living space while enhancing comfort and style. They blend with your home\u2019s architecture, add value, and can be customized for anything from extra bedrooms to expanded kitchens or living areas.',
            href: '/additions-2',
          },
          {
            title: 'Custom Homes',
            description:
              'Custom homes let you build a space that fits your life\u2014no compromises or cookie-cutter layouts. Designed around your needs and style, you choose the floor plan and finishes to create a one-of-a-kind home that boosts comfort, curb appeal, and long-term value.',
            href: '/additions-3',
          },
          {
            title: 'Full Remodal',
            description:
              'Full remodels transform your entire home with updated layouts, modern finishes, and improved functionality. They breathe new life into your space, enhance comfort, and boost property value while tailoring every detail to your lifestyle and design vision.',
          },
        ],
      },
    },
    { type: 'reviews' },
    { type: 'reviewLogos' },
    { type: 'difference' },
    { type: 'projects' },
    { type: 'cta' },
    { type: 'financing' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
};
