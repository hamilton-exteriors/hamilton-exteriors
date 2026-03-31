import type { CountyPageData } from '../../lib/county-page-types';
import { areaBerkeley } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Santa Clara County',
  countySlug: 'santa-clara-county-ca',
  state: 'CA',
  adjective: 'Trusted',
  title: 'Trusted ADU Contractors in Santa Clara County, CA | Hamilton Exteriors',
  description: 'Hamilton Exteriors provides trusted ADU contractors throughout Santa Clara County, CA. Expert design, permits, and construction for accessory dwelling units.',
  heroHeadline: 'Trusted  ADU  Contractors  in Santa Clara County',
  heroFormTitle: 'Get a FREE Estimate in Santa Clara County',

  cities: [
    { name: 'San Jose', slug: '/service-areas/santa-clara-county-ca', image: areaBerkeley },
    { name: 'Palo Alto', slug: '/service-areas/santa-clara-county-ca', image: areaBerkeley },
    { name: 'Mountain View', slug: '/service-areas/santa-clara-county-ca', image: areaBerkeley },
    { name: 'Sunnyvale', slug: '/service-areas/santa-clara-county-ca', image: areaBerkeley },
    { name: 'Cupertino', slug: '/service-areas/santa-clara-county-ca', image: areaBerkeley },
    { name: 'Santa Clara', slug: '/service-areas/santa-clara-county-ca', image: areaBerkeley },
    { name: 'Saratoga', slug: '/service-areas/santa-clara-county-ca', image: areaBerkeley },
    { name: 'Los Gatos', slug: '/service-areas/santa-clara-county-ca', image: areaBerkeley },
    { name: 'Campbell', slug: '/service-areas/santa-clara-county-ca', image: areaBerkeley },
    { name: 'Milpitas', slug: '/service-areas/santa-clara-county-ca', image: areaBerkeley },
  ],

  whyChooseExpanded: {
    heading: 'Why Choose Hamilton Exteriors as Your Trusted ADU Contractors in Santa Clara County, CA?',
    subtitle: 'Reliable. Efficient. Professional.',
    paragraphs: [
      'Hamilton Exteriors provides trusted ADU contractors in Santa Clara County, CA who deliver reliable, high-quality accessory dwelling units for homeowners across Silicon Valley. From San Jose to Cupertino, Mountain View to Sunnyvale, our team understands the specific building codes and permitting processes across every jurisdiction in the county.',
      'Our trusted contractors handle every phase of your ADU project \u2014 from architectural design and engineering to city permitting and final construction. We build detached units, attached additions, garage conversions, and junior ADUs that maximize your property\u2019s potential in one of California\u2019s most competitive housing markets.',
    ],
    featureCards: [
      { title: 'End-to-End Project Management', description: 'Our trusted ADU contractors in Santa Clara County manage design, permits, and construction with a single point of contact throughout your project.' },
      { title: 'Silicon Valley Code Knowledge', description: 'We navigate the varying ADU regulations across Santa Clara County\u2019s many cities, ensuring smooth permitting and code compliance.' },
      { title: 'High-Value Construction', description: 'Premium materials and skilled craftsmanship that match the high standards expected in Santa Clara County\u2019s real estate market.' },
      { title: 'Flexible Financing Options', description: '$0 down financing and competitive rates make it easy to start building your Santa Clara County ADU today.' },
    ],
  },

  whyBuild: {
    heading: 'Why Build with Trusted ADU Contractors in Santa Clara County, CA?',
    subtitle: 'Growth. Value. Versatility.',
    paragraphs: [
      'Santa Clara County\u2019s housing shortage and high property values make ADUs one of the smartest investments a homeowner can make. A well-designed accessory dwelling unit can generate $2,500\u2013$4,500 per month in rental income while adding 25\u201340% to your property\u2019s overall value.',
      'With California\u2019s streamlined ADU laws and Santa Clara County\u2019s supportive permitting process, building an ADU has never been more accessible. Whether you need a rental unit, a home office, or space for extended family, our trusted contractors deliver ADUs that meet your specific needs and exceed your expectations.',
    ],
  },

  showSharedFaq: true,
  showReviewLogos: false,
};
