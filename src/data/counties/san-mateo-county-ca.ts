import type { CountyPageData } from '../../lib/county-page-types';
import { areaRedwoodCity, areaSanMateo, areaBurlingame, areaDalyCity, areaSouthSanFrancisco } from '../../lib/images';

export const data: CountyPageData = {
  county: 'San Mateo County',
  countySlug: 'san-mateo-county-ca',
  state: 'CA',
  adjective: "Peninsula's",
  title: 'Roofing, Siding, ADUs & Custom Homes in San Mateo County | Hamilton Exteriors',
  description: 'Hamilton Exteriors serves San Mateo County \u2014 roofing, siding, windows, ADUs, additions, and custom homes. Serving Redwood City, San Mateo, Burlingame, Daly City, and South San Francisco.',
  heroHeadline: 'San Mateo County\u2019s Top  Design-Build &  Exteriors Contractor',
  heroFormTitle: 'Get a FREE Estimate in San Mateo County',
  proximity: '-122.33,37.55',

  cities: [
    { name: 'Redwood City', slug: '/service-areas/san-mateo-county-ca/redwood-city-ca', image: areaRedwoodCity },
    { name: 'San Mateo', slug: '/service-areas/san-mateo-county-ca/san-mateo-ca', image: areaSanMateo },
    { name: 'Burlingame', slug: '/service-areas/san-mateo-county-ca/burlingame-ca', image: areaBurlingame },
    { name: 'Daly City', slug: '/service-areas/san-mateo-county-ca/daly-city-ca', image: areaDalyCity },
    { name: 'South San Francisco', slug: '/service-areas/san-mateo-county-ca/south-san-francisco-ca', image: areaSouthSanFrancisco },
  ],
  citySectionStyle: 'heading',
};
