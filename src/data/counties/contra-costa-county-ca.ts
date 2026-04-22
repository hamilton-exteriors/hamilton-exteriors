import type { CountyPageData } from '../../lib/county-page-types';
import { areaAntioch, areaConcord, areaWalnutCreek, areaSanRamon, areaRichmond, areaLafayette, areaOrinda, areaDanville, areaBrentwood, areaPittsburg } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Contra Costa County',
  countySlug: 'contra-costa-county-ca',
  state: 'CA',
  adjective: 'Experienced',
  title: 'Contra Costa County Contractor — Roofing, Siding, ADUs & Custom Homes',
  description: 'Hamilton Exteriors serves Contra Costa County with full-service roofing, siding, windows, ADUs, additions, and custom homes. Serving Walnut Creek, Concord, San Ramon, Lafayette, Orinda, Danville, Antioch, Brentwood, Pittsburg, and Richmond.',
  heroHeadline: 'Contra Costa County\u2019s Architect-Led  Custom Home  & Exteriors Contractor',
  heroFormTitle: 'Get Your Free Estimate in Contra Costa County',
  proximity: '-121.93,37.92',

  cities: [
    { name: 'Antioch', slug: '/service-areas/contra-costa-county-ca/antioch-ca', image: areaAntioch },
    { name: 'Walnut Creek', slug: '/service-areas/contra-costa-county-ca/walnut-creek-ca', image: areaWalnutCreek },
    { name: 'Concord', slug: '/service-areas/contra-costa-county-ca/concord-ca', image: areaConcord },
    { name: 'San Ramon', slug: '/service-areas/contra-costa-county-ca/san-ramon-ca', image: areaSanRamon },
    { name: 'Richmond', slug: '/service-areas/contra-costa-county-ca/richmond-ca', image: areaRichmond },
    { name: 'Lafayette', slug: '/service-areas/contra-costa-county-ca/lafayette-ca', image: areaLafayette },
    { name: 'Orinda', slug: '/service-areas/contra-costa-county-ca/orinda-ca', image: areaOrinda },
    { name: 'Danville', slug: '/service-areas/contra-costa-county-ca/danville-ca', image: areaDanville },
    { name: 'Brentwood', slug: '/service-areas/contra-costa-county-ca/brentwood-ca', image: areaBrentwood },
    { name: 'Pittsburg', slug: '/service-areas/contra-costa-county-ca/pittsburg-ca', image: areaPittsburg },
  ],
  citySectionStyle: 'label',

  editorial: {
    heading: 'Building in Contra Costa County: What Homeowners Need to Know',
    paragraphs: [
      'Contra Costa County stretches from the affluent Lamorinda corridor (Lafayette, Orinda, Moraga) through the commercial centers of Walnut Creek and Concord to the rapidly growing eastern communities of Brentwood, Antioch, and Pittsburg. This geographic range creates distinct building requirements — hillside homes in Orinda face different permit, material, and access challenges than tract homes in Antioch or mid-century ranches in Richmond.',
      'The <strong>Lamorinda area and parts of the Diablo foothills</strong> fall within Wildland-Urban Interface (WUI) fire zones. After the 2017 and 2019 fire seasons, the Moraga-Orinda Fire District and Contra Costa County Fire Protection District tightened enforcement of Chapter 7A fire-resistant building standards. Roof replacements in these zones require Class A fire-rated materials, ember-resistant ridge and soffit vents, and fire-rated underlayment. Hamilton Exteriors handles all WUI documentation and coordinates directly with fire district inspectors.',
      'Permit timelines in Contra Costa County vary by jurisdiction. Walnut Creek\u2019s Community Development Department processes standard roofing permits in 1\u20133 business days over the counter. Concord, San Ramon, and Danville follow similar streamlined processes. Unincorporated county areas — common in the hills between Lafayette and Orinda — route through the County Building Inspection Division, which can add 1\u20132 weeks. ADU construction in San Ramon and Danville benefits from the Town\u2019s adopted pre-approved ADU plans, expediting the approval process.',
      'Contra Costa\u2019s inland climate is the hottest in the Bay Area, with summer temperatures in eastern cities like Brentwood and Antioch regularly exceeding 100\u00b0F. This heat drives demand for <strong>cool-roof-rated shingles</strong> and energy-efficient window replacements that reduce cooling costs. In the western part of the county, Richmond and El Cerrito experience more fog and moisture, requiring algae-resistant roofing materials. Hamilton Exteriors has completed projects throughout Contra Costa County — from custom home builds in Danville to full roof replacements on Walnut Creek mid-century homes and siding restoration on Brentwood stucco homes.',
    ],
  },
};
