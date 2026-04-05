import type { CountyPageData } from '../../lib/county-page-types';
import { areaAntioch, areaConcord, areaWalnutCreek, areaSanRamon, areaRichmond } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Contra Costa County',
  countySlug: 'contra-costa-county-ca',
  state: 'CA',
  adjective: 'Experienced',
  title: 'Roofing, Siding, ADUs & Custom Homes in Contra Costa County | Hamilton Exteriors',
  description: 'Hamilton Exteriors serves Contra Costa County with full-service roofing, siding, windows, ADUs, additions, and custom homes. Serving Walnut Creek, Concord, San Ramon, Lafayette, Orinda, Danville, Antioch, Brentwood, Pittsburg, and Richmond.',
  heroHeadline: 'Contra Costa County\u2019s Top  Design-Build &  Exteriors Contractor',
  heroFormTitle: 'Get a FREE Estimate in Contra Costa County',
  proximity: '-121.93,37.92',

  cities: [
    { name: 'Antioch', slug: '/service-areas/contra-costa-county-ca/antioch-ca', image: areaAntioch },
    { name: 'Walnut Creek', slug: '/service-areas/contra-costa-county-ca/walnut-creek-ca', image: areaWalnutCreek },
    { name: 'Concord', slug: '/service-areas/contra-costa-county-ca/concord-ca', image: areaConcord },
    { name: 'San Ramon', slug: '/service-areas/contra-costa-county-ca/san-ramon-ca', image: areaSanRamon },
    { name: 'Richmond', slug: '/service-areas/contra-costa-county-ca/richmond-ca', image: areaRichmond },
    { name: 'Lafayette', slug: '/service-areas/contra-costa-county-ca/lafayette-ca', image: areaWalnutCreek },
    { name: 'Orinda', slug: '/service-areas/contra-costa-county-ca/orinda-ca', image: areaWalnutCreek },
    { name: 'Danville', slug: '/service-areas/contra-costa-county-ca/danville-ca', image: areaSanRamon },
    { name: 'Brentwood', slug: '/service-areas/contra-costa-county-ca/brentwood-ca', image: areaAntioch },
    { name: 'Pittsburg', slug: '/service-areas/contra-costa-county-ca/pittsburg-ca', image: areaAntioch },
  ],
  citySectionStyle: 'label',
};
