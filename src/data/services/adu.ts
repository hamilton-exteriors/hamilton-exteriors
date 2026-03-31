import type { ServicePageData } from '../../lib/service-page-types';
import { aduHero } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'ADU Builder in the San Francisco Bay Area | Design & Construction Experts | Hamilton Exteriors',
  description:
    'Hamilton Exteriors builds beautiful ADUs across the Bay Area. Attached, detached, conversions, and full permitting.',
  announcementText: 'Limited Time: Free ADU Design Consultation + Permit Guarantee*',
  hero: {
    headline: 'Bay Areas  Best ADU  Builder',
    formTitle: 'Get a FREE Consultation',
    formSubtitle:
      "We'll contact you in 3-5 minutes to discuss your ADU project.",
    badges: [
      'Licensed Bonded & Insured',
      'Start with $0 Down',
      '60-Day Permit Guarantee',
      'Full Design-Build',
    ],
    serviceType: 'ADU',
    serviceOptions: ['Detached ADU', 'Garage Conversion', 'Addition', 'Junior ADU'],
  },
  sections: [
    {
      type: 'imageBanner',
      data: {
        image: aduHero,
        alt: 'ADU construction in the Bay Area',
        height: 400,
      },
    },
    { type: 'logoSlider' },
    {
      type: 'styles',
      data: {
        heading: 'Construction Services Offered',
        cardVariant: 'adu',
        items: [
          {
            title: 'Attached ADUS',
            description:
              "Attached Accessory Dwelling Units (ADUs) are integrated additions to your existing home that expand your living space while enhancing functionality and value. Whether used as a private suite for family, a rental unit for extra income, or a dedicated workspace, attached ADUs seamlessly blend with your home's design while providing flexibility and long-term property benefits.",
          },
          {
            title: 'Detached ADUS',
            description:
              "Detached Accessory Dwelling Units (ADUs) are standalone backyard homes that offer maximum privacy, flexibility, and value. Perfect for guest suites, rental units, or home offices, these independent structures create additional living space while maintaining separation from the main house. A detached ADU enhances your property's functionality, provides potential rental income, and adds lasting value to your home.",
          },
          {
            title: 'Conversions',
            description:
              "Conversion Accessory Dwelling Units (ADUs) transform existing spaces\u2014such as garages, basements, or attics\u2014into fully functional living areas. This type of ADU is a cost-effective way to maximize your home's potential without expanding its footprint. Whether you're creating a rental unit, a private suite for family, or a modern home office, conversion ADUs add versatility, comfort, and long-term value to your property.",
          },
          {
            title: 'Plans & Permits',
            description:
              'We simplify the planning and permitting process so you can focus on your project, not the paperwork. Our experienced team handles every detail\u2014from design plans and site assessments to submitting permit applications and coordinating with local building departments. We ensure your project meets all code requirements and moves smoothly from concept to construction, saving you time, stress, and costly delays.',
          },
        ],
      },
    },
    { type: 'reviews' },
    { type: 'reviewLogos' },
    {
      type: 'stats',
      data: {
        desktopOnly: true,
        items: [
          { value: '60', label: 'Day Permit Guarantee' },
          { value: '$0', label: 'Down Payment Required' },
          { value: '15+', label: 'Years of Bay Area Experience' },
        ],
      },
    },
    { type: 'difference' },
    { type: 'projects' },
    { type: 'cta' },
    { type: 'yellowBar', text: 'Schedule a FREE ADU Consultation', href: '#contact' },
    { type: 'financing' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
  extraStyles: `
    @media (max-width: 767px) {
      :global(#financing) { padding: 40px 0 !important; }
      :global(#financing .relative.h-\\[400px\\]) { height: 240px !important; }
      :global(#quote) { }
      :global(#quote > div) { padding-top: 15px !important; padding-bottom: 15px !important; gap: 1.25rem !important; }
    }
  `,
};
