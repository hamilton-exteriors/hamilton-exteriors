import type { CountyPageData } from '../../lib/county-page-types';
import { areaOakland, areaFremont, areaHayward, areaBerkeley, areaSanLeandro } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Alameda County',
  countySlug: 'alameda-county-ca',
  state: 'CA',
  adjective: 'Trusted',
  title: 'Roofing, Siding, ADUs & Custom Homes in Alameda County | Hamilton Exteriors',
  description: 'Hamilton Exteriors is Alameda County\u2019s trusted design-build contractor. Roofing, siding, windows, ADUs, additions, and custom homes. Serving Oakland, Berkeley, Fremont, Hayward, and San Leandro.',
  heroHeadline: 'Alameda County\u2019s Top  Roofing & Design-Build  Contractor',
  heroFormTitle: 'Get a FREE Estimate in Alameda County',
  proximity: '-122.08,37.65',

  cities: [
    { name: 'Oakland', slug: '/service-areas/alameda-county-ca/oakland-ca', image: areaOakland },
    { name: 'Fremont', slug: '/service-areas/alameda-county-ca/fremont-ca', image: areaFremont },
    { name: 'Hayward', slug: '/service-areas/alameda-county-ca/hayward-ca', image: areaHayward },
    { name: 'Berkeley', slug: '/service-areas/alameda-county-ca/berkeley-ca', image: areaBerkeley },
    { name: 'San Leandro', slug: '/service-areas/alameda-county-ca/san-leandro-ca', image: areaSanLeandro },
  ],
  citySectionStyle: 'heading',
};
