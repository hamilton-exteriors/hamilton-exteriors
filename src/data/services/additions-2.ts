import type { ServicePageData } from '../../lib/service-page-types';

export const data: ServicePageData = {
  title:
    'Home Additions Across the San Francisco Bay Area | Design & Construction Experts | Hamilton Exteriors',
  description:
    'Hamilton Exteriors builds quality home extensions in Castro Valley, CA.',
  hero: {
    headline: 'Quality Home Extensions in Castro Valley',
    formTitle: 'Get a FREE Consultaion',
    ctaText: 'Get A FREE Estimate Now!',
    ctaHref: '/quote-calculator',
    badges: [
      'Licensed Bonded & Insured',
      'Start with $0 Down',
      '50 year Warranty',
      'Increase Property Value',
    ],
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    {
      type: 'styles',
      data: {
        heading: 'Home Extension Services',
        cardVariant: 'adu',
        items: [
          {
            title: 'Room Additions',
            description:
              'Add bedrooms, bathrooms, or living areas that integrate seamlessly with your existing floor plan',
          },
          {
            title: 'Second Story Additions',
            description:
              'Expand upward to maximize your lot space without sacrificing your yard',
          },
          {
            title: 'Kitchen Extensions',
            description:
              'Create the open, spacious kitchen you have always wanted with a bump-out or full addition',
          },
          {
            title: 'Sunrooms & Enclosed Patios',
            description:
              'Enjoy natural light year-round with a beautiful enclosed living space',
          },
        ],
      },
    },
    { type: 'financing' },
    { type: 'reviewLogos' },
    { type: 'difference' },
    { type: 'projects' },
    { type: 'cta' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
};
