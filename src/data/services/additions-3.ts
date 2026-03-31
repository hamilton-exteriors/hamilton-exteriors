import type { ServicePageData } from '../../lib/service-page-types';

export const data: ServicePageData = {
  title:
    'Home Additions Across the San Francisco Bay Area | Design & Construction Experts | Hamilton Exteriors',
  description:
    'Hamilton Exteriors builds custom homes in Castro Valley, CA.',
  hero: {
    headline: 'Custom Home Building in Castro Valley',
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
        heading: 'Custom Home Services',
        cardVariant: 'adu',
        items: [
          {
            title: 'Design & Architecture',
            description:
              'Work with our team to design a home that reflects your vision, lifestyle, and budget',
          },
          {
            title: 'Foundation & Framing',
            description:
              'Solid structural work built to code with premium materials that stand the test of time',
          },
          {
            title: 'Interior Finishing',
            description:
              'From flooring to cabinetry, we handle every detail of your interior build-out',
          },
          {
            title: 'Permits & Project Management',
            description:
              'We manage the full permitting process and keep your project on schedule and on budget',
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
