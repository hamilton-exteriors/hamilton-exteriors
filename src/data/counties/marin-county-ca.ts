import type { CountyPageData } from '../../lib/county-page-types';
import { areaLarkspur, areaMillValley, areaNovato, areaSanRafael } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Marin County',
  countySlug: 'marin-county-ca',
  state: 'CA',
  adjective: 'Experienced',
  title: 'Roofing, Siding, ADUs & Custom Homes in Marin County | Hamilton Exteriors',
  description: 'Hamilton Exteriors is Marin County\u2019s trusted design-build contractor. Roofing, siding, windows, ADUs, additions, and custom homes. Serving San Rafael, Mill Valley, Novato, and Larkspur.',
  heroHeadline: 'Marin County\u2019s Top  Roofing & Design-Build  Contractor',
  heroFormTitle: 'Get a FREE Estimate in Marin County',
  proximity: '-122.57,38.05',

  cities: [
    { name: 'Larkspur', slug: '/service-areas/marin-county-ca/larkspur-ca', image: areaLarkspur },
    { name: 'Mill Valley', slug: '/service-areas/marin-county-ca/mill-valley-ca', image: areaMillValley },
    { name: 'Novato', slug: '/service-areas/marin-county-ca/novato-ca', image: areaNovato },
    { name: 'San Rafael', slug: '/service-areas/marin-county-ca/san-rafael-ca', image: areaSanRafael },
  ],
  citySectionStyle: 'heading',
};
