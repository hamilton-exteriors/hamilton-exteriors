import type { CountyPageData } from '../../lib/county-page-types';
import { areaNapa, areaCalistoga, areaStHelena, areaYountville, areaAmericanCanyon } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Napa County',
  countySlug: 'napa-county-ca',
  state: 'CA',
  adjective: 'Skilled',
  title: 'Roofing, Siding, ADUs & Custom Homes in Napa County | Hamilton Exteriors',
  description: 'Hamilton Exteriors serves Napa County with expert roofing, siding, windows, ADUs, additions, and custom homes. Serving Napa, American Canyon, St. Helena, Calistoga, and Yountville.',
  heroHeadline: 'Napa County\u2019s Top  Design-Build &  Exteriors Contractor',
  heroFormTitle: 'Get a FREE Estimate in Napa County',
  proximity: '-122.33,38.50',

  cities: [
    { name: 'Napa', slug: '/service-areas/napa-county-ca/napa-ca', image: areaNapa },
    { name: 'American Canyon', slug: '/service-areas/napa-county-ca/american-canyon-ca', image: areaAmericanCanyon },
    { name: 'St. Helena', slug: '/service-areas/napa-county-ca/st-helena-ca', image: areaStHelena },
    { name: 'Calistoga', slug: '/service-areas/napa-county-ca/calistoga-ca', image: areaCalistoga },
    { name: 'Yountville', slug: '/service-areas/napa-county-ca/yountville-ca', image: areaYountville },
  ],
  citySectionStyle: 'heading',
};
