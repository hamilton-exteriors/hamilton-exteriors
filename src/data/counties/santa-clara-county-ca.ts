import type { CountyPageData } from '../../lib/county-page-types';
import { areaSanJose, areaPaloAlto, areaMountainView, areaSunnyvale, areaCupertino, areaSantaClara, areaSaratoga, areaLosGatos, areaCampbell, areaMilpitas } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Santa Clara County',
  countySlug: 'santa-clara-county-ca',
  state: 'CA',
  adjective: 'Trusted',
  title: 'Roofing, Siding, ADUs & Custom Homes in Santa Clara County | Hamilton Exteriors',
  description: 'Hamilton Exteriors is Santa Clara County\u2019s trusted design-build contractor. Roofing, siding, windows, ADUs, additions, and custom homes. Serving San Jose, Palo Alto, Mountain View, Sunnyvale, and more.',
  heroHeadline: 'Santa Clara County\u2019s Top  Roofing & Design-Build  Contractor',
  heroFormTitle: 'Get a FREE Estimate in Santa Clara County',
  proximity: '-121.89,37.33',

  cities: [
    { name: 'San Jose', slug: '/service-areas/santa-clara-county-ca/san-jose-ca', image: areaSanJose },
    { name: 'Palo Alto', slug: '/service-areas/santa-clara-county-ca/palo-alto-ca', image: areaPaloAlto },
    { name: 'Mountain View', slug: '/service-areas/santa-clara-county-ca/mountain-view-ca', image: areaMountainView },
    { name: 'Sunnyvale', slug: '/service-areas/santa-clara-county-ca/sunnyvale-ca', image: areaSunnyvale },
    { name: 'Cupertino', slug: '/service-areas/santa-clara-county-ca/cupertino-ca', image: areaCupertino },
    { name: 'Santa Clara', slug: '/service-areas/santa-clara-county-ca/santa-clara-ca', image: areaSantaClara },
    { name: 'Saratoga', slug: '/service-areas/santa-clara-county-ca/saratoga-ca', image: areaSaratoga },
    { name: 'Los Gatos', slug: '/service-areas/santa-clara-county-ca/los-gatos-ca', image: areaLosGatos },
    { name: 'Campbell', slug: '/service-areas/santa-clara-county-ca/campbell-ca', image: areaCampbell },
    { name: 'Milpitas', slug: '/service-areas/santa-clara-county-ca/milpitas-ca', image: areaMilpitas },
  ],
  citySectionStyle: 'heading',
};
