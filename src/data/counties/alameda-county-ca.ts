import type { CountyPageData } from '../../lib/county-page-types';
import { areaOakland, areaFremont, areaHayward, areaBerkeley, areaSanLeandro } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Alameda County',
  countySlug: 'alameda-county-ca',
  state: 'CA',
  adjective: 'Trusted',
  title: 'Roofing, Siding, ADUs & Custom Homes in Alameda County | Hamilton Exteriors',
  description: 'Hamilton Exteriors is Alameda County\u2019s trusted design-build contractor. Roofing, siding, windows, ADUs, additions, and custom homes. Serving Oakland, Berkeley, Fremont, Hayward, San Leandro, Dublin, Pleasanton, Livermore, Union City, and Alameda.',
  heroHeadline: 'Alameda County\u2019s Top  Design-Build &  Exteriors Contractor',
  heroFormTitle: 'Get a FREE Estimate in Alameda County',
  proximity: '-122.08,37.65',

  cities: [
    { name: 'Oakland', slug: '/service-areas/alameda-county-ca/oakland-ca', image: areaOakland },
    { name: 'Fremont', slug: '/service-areas/alameda-county-ca/fremont-ca', image: areaFremont },
    { name: 'Hayward', slug: '/service-areas/alameda-county-ca/hayward-ca', image: areaHayward },
    { name: 'Berkeley', slug: '/service-areas/alameda-county-ca/berkeley-ca', image: areaBerkeley },
    { name: 'San Leandro', slug: '/service-areas/alameda-county-ca/san-leandro-ca', image: areaSanLeandro },
    { name: 'Dublin', slug: '/service-areas/alameda-county-ca/dublin-ca', image: areaFremont },
    { name: 'Pleasanton', slug: '/service-areas/alameda-county-ca/pleasanton-ca', image: areaFremont },
    { name: 'Livermore', slug: '/service-areas/alameda-county-ca/livermore-ca', image: areaFremont },
    { name: 'Union City', slug: '/service-areas/alameda-county-ca/union-city-ca', image: areaHayward },
    { name: 'Alameda', slug: '/service-areas/alameda-county-ca/alameda-ca', image: areaOakland },
  ],
  citySectionStyle: 'heading',
};
