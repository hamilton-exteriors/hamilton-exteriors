import type { CountyPageData } from '../../lib/county-page-types';
import { areaLarkspur, areaMillValley, areaNovato, areaSanRafael } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Marin County',
  countySlug: 'marin-county-ca',
  state: 'CA',
  adjective: 'Experienced',
  title: 'Roofing, Siding, ADUs & Custom Homes in Marin County | Hamilton Exteriors',
  description: 'Hamilton Exteriors is Marin County\u2019s trusted design-build contractor. Roofing, siding, windows, ADUs, additions, and custom homes. Serving San Rafael, Mill Valley, Novato, and Larkspur.',
  heroHeadline: 'Marin County\u2019s Top  Design-Build &  Exteriors Contractor',
  heroFormTitle: 'Get Your Free Estimate in Marin County',
  proximity: '-122.57,38.05',

  cities: [
    { name: 'Larkspur', slug: '/service-areas/marin-county-ca/larkspur-ca', image: areaLarkspur },
    { name: 'Mill Valley', slug: '/service-areas/marin-county-ca/mill-valley-ca', image: areaMillValley },
    { name: 'Novato', slug: '/service-areas/marin-county-ca/novato-ca', image: areaNovato },
    { name: 'San Rafael', slug: '/service-areas/marin-county-ca/san-rafael-ca', image: areaSanRafael },
  ],
  citySectionStyle: 'heading',

  editorial: {
    heading: 'Building in Marin County: What Homeowners Need to Know',
    paragraphs: [
      'Marin County presents unique construction challenges that require a contractor who understands the local landscape. Much of the county falls within <strong>Wildland-Urban Interface (WUI) fire zones</strong>, particularly in Mill Valley, the hills above San Rafael, and western Novato. Homes in these zones must comply with California\u2019s Chapter 7A fire-resistant building standards, which mandate Class A fire-rated roofing, ember-resistant vents, and non-combustible exterior materials within specified setback distances.',
      'The <strong>Bay Conservation and Development Commission (BCDC)</strong> regulates construction within 100 feet of San Francisco Bay shoreline areas throughout eastern Marin. Projects in Larkspur, southern Mill Valley, and portions of San Rafael near the bay may require a BCDC permit in addition to standard city building permits. Permit processing times in Marin cities typically run 4\u20138 weeks for roofing and siding, though projects requiring design review in historic districts \u2014 particularly downtown San Rafael and Mill Valley\u2019s Throckmorton corridor \u2014 can take longer.',
      'Marin\u2019s coastal fog and high moisture levels make material selection critical. We recommend <strong>James Hardie HZ5 fiber cement siding</strong> for its resistance to moisture-driven rot and the county\u2019s salt air exposure. For roofing, GAF Timberline HDZ shingles with StainGuard Plus provide the algae resistance needed in Marin\u2019s shaded, fog-belt neighborhoods like Homestead Valley and Baltimore Canyon. Median home values in Marin exceed $1.4 million, and homeowners here expect premium craftsmanship that matches the character of their hillside and bayside homes.',
      'Hamilton Exteriors has completed roofing, siding, and exterior projects throughout Marin County \u2014 from fire-zone roof replacements in the hills above Mill Valley to full siding restorations on Novato ranch homes. Our crews are familiar with the county\u2019s permit requirements, inspection expectations, and the access challenges that come with Marin\u2019s narrow hillside roads.',
    ],
  },
};
