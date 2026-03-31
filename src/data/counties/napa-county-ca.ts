import type { CountyPageData } from '../../lib/county-page-types';
import { areaNapa, areaCalistoga, areaStHelena, areaYountville, areaAmericanCanyon } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Napa County',
  countySlug: 'napa-county-ca',
  state: 'CA',
  adjective: 'Skilled',
  title: 'Skilled ADU Contractors in Napa County, CA | Hamilton Exteriors',
  description: 'Hamilton Exteriors provides skilled ADU contractors throughout Napa County, CA. Expert design, permits, and construction for accessory dwelling units.',
  heroHeadline: 'Skilled  ADU  Contractors  in Napa County',
  heroFormTitle: 'Get a FREE Estimate in Napa County',

  cities: [
    { name: 'Napa', slug: '/service-areas/napa-county-ca/napa-ca', image: areaNapa },
    { name: 'American Canyon', slug: '/service-areas/napa-county-ca/american-canyon-ca', image: areaAmericanCanyon },
    { name: 'St. Helena', slug: '/service-areas/napa-county-ca/st-helena-ca', image: areaStHelena },
    { name: 'Calistoga', slug: '/service-areas/napa-county-ca/calistoga-ca', image: areaCalistoga },
    { name: 'Yountville', slug: '/service-areas/napa-county-ca/yountville-ca', image: areaYountville },
  ],
  citySectionStyle: 'heading',

  whyChooseExpanded: {
    heading: 'Why Choose Hamilton Exteriors as Your Skilled ADU Contractors in Napa County, CA?',
    subtitle: 'Quality. Expertise. Trust.',
    paragraphs: [
      'Hamilton Exteriors provides skilled ADU contractors in Napa County, CA who bring precision craftsmanship and deep local knowledge to every accessory dwelling unit project. From vineyard estates in St. Helena to downtown Napa properties, our team understands the unique architectural character and building requirements of Napa County.',
      'Our skilled contractors manage every aspect of your ADU project, from initial design and city permitting to foundation work and final finishes. We specialize in units that complement Napa County\u2019s distinctive wine country aesthetic while maximizing functionality and rental income potential.',
    ],
    featureCards: [
      { title: 'Full-Service ADU Development', description: 'Our skilled ADU contractors in Napa County handle design, engineering, permits, and construction under one roof \u2014 no subcontractors, no middlemen.' },
      { title: 'Napa County Code Expertise', description: 'We navigate Napa County\u2019s specific zoning regulations, setback requirements, and fire-safe construction standards with confidence.' },
      { title: 'Wine Country Design Standards', description: 'ADU designs that respect Napa County\u2019s architectural heritage while incorporating modern amenities and energy-efficient features.' },
      { title: '$0 Down Financing Available', description: 'Flexible financing options make it easy to start your Napa County ADU project without a large upfront investment.' },
    ],
  },

  whyBuild: {
    heading: 'Why Build with Skilled ADU Contractors in Napa County, CA?',
    subtitle: 'Value. Space. Lifestyle.',
    paragraphs: [
      'Napa County\u2019s strong tourism economy and high property values make ADUs an exceptional investment. A well-built accessory dwelling unit can generate significant rental income from short-term vacation rentals or long-term tenants, while adding substantial equity to your property.',
      'Working with skilled ADU contractors ensures your unit meets all county regulations, passes inspections efficiently, and is built to last. From detached backyard studios to attached in-law suites, our team delivers ADUs that enhance both your property value and quality of life in Napa County.',
    ],
  },

  showSharedFaq: true,
  showReviewLogos: false,
};
