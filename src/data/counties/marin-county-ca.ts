import type { CountyPageData } from '../../lib/county-page-types';
import { areaOakland, areaFremont, areaHayward, areaBerkeley } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Marin County',
  countySlug: 'marin-county-ca',
  state: 'CA',
  adjective: 'Experienced',
  title: 'Experienced ADU Contractors in Marin County, CA | Hamilton Exteriors',
  description: 'Hamilton Exteriors provides expert ADU construction throughout Marin County, CA. Serving Larkspur, Mill Valley, Novato, and San Rafael.',
  heroHeadline: 'Experienced  ADU  Contractors  in Marin County',
  heroFormTitle: 'Get a FREE Estimate in Marin County',

  cities: [
    { name: 'Larkspur', slug: '/service-areas/marin-county-ca/larkspur-ca', image: areaOakland },
    { name: 'Mill Valley', slug: '/service-areas/marin-county-ca/mill-valley-ca', image: areaFremont },
    { name: 'Novato', slug: '/service-areas/marin-county-ca/novato-ca', image: areaHayward },
    { name: 'San Rafael', slug: '/service-areas/marin-county-ca/san-rafael-ca', image: areaBerkeley },
  ],
  citySectionStyle: 'heading',

  whyChoose: {
    heading: 'Why Marin County Homeowners Choose Us',
    paragraphs: [
      'Marin County\u2019s distinctive architecture and strict building standards demand an ADU contractor with local expertise. Our team navigates the unique permitting requirements across Larkspur, Mill Valley, Novato, and San Rafael \u2014 ensuring your project moves forward smoothly and on schedule.',
      'From design through final inspection, we handle every aspect of your ADU build in-house. No subcontractors, no middlemen \u2014 just quality craftsmanship backed by our workmanship warranty and transparent pricing.',
      'Whether you\u2019re adding a rental unit in Novato, a guest cottage in Mill Valley, or a home office in San Rafael, Hamilton Exteriors delivers ADUs that complement Marin\u2019s architectural character while maximizing your property\u2019s potential.',
    ],
  },

  benefits: {
    heading: 'Benefits of Building an ADU in Marin County',
    paragraphs: [
      'Marin County\u2019s high property values and strong rental market make ADUs an exceptional investment. A well-designed unit can generate $2,500\u2013$4,000 per month in rental income while adding significant equity to your property.',
      'With California\u2019s streamlined ADU laws and Marin County\u2019s growing support for accessory dwelling units, there has never been a better time to build. Reduced setback requirements, eliminated parking mandates near transit, and simplified permitting make the process faster and more accessible.',
      'Hamilton Exteriors navigates these regulations daily, ensuring your project takes full advantage of every available benefit \u2014 from design through final walkthrough.',
    ],
  },

  aduTypes: {
    heading: 'ADU Types We Build in Marin County',
    subtitle: 'From detached backyard units to garage conversions and junior ADUs, we handle every type of accessory dwelling unit across Marin County.',
    items: [
      { title: 'Detached ADUs', description: 'Standalone backyard units up to 1,200 sq ft with full kitchens, bathrooms, and separate entrances. Ideal for rental income or multigenerational living.' },
      { title: 'Garage Conversions', description: 'Transform your existing garage into a comfortable living space. The most cost-effective ADU option with lower construction costs and faster completion.' },
      { title: 'Junior ADUs', description: 'Up to 500 sq ft units built within your existing home footprint. Perfect for a home office, guest suite, or compact rental with minimal site disruption.' },
    ],
  },

  stats: [
    { value: '50+', label: 'Years Combined Experience' },
    { value: '$0', label: 'Down Payment Required' },
    { value: '60', label: 'Day Permit Guarantee' },
    { value: '4.8', label: 'Star Rating' },
  ],

  showReviewLogos: true,
  showSharedFaq: true,
};
