import type { CountyPageData } from '../../lib/county-page-types';
import { areaOakland, areaFremont, areaHayward, areaBerkeley, areaSanLeandro, areaDublin, areaPleasanton, areaLivermore, areaUnionCity, areaAlameda } from '../../lib/images';

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
    { name: 'Dublin', slug: '/service-areas/alameda-county-ca/dublin-ca', image: areaDublin },
    { name: 'Pleasanton', slug: '/service-areas/alameda-county-ca/pleasanton-ca', image: areaPleasanton },
    { name: 'Livermore', slug: '/service-areas/alameda-county-ca/livermore-ca', image: areaLivermore },
    { name: 'Union City', slug: '/service-areas/alameda-county-ca/union-city-ca', image: areaUnionCity },
    { name: 'Alameda', slug: '/service-areas/alameda-county-ca/alameda-ca', image: areaAlameda },
  ],
  citySectionStyle: 'heading',

  editorial: {
    heading: 'Building in Alameda County: What Homeowners Need to Know',
    paragraphs: [
      'Alameda County is the Bay Area\u2019s most diverse building environment, spanning dense urban neighborhoods in Oakland and Berkeley to suburban communities in Dublin, Pleasanton, and Livermore. Roughly <strong>60% of Oakland\u2019s housing stock was built before 1960</strong> (U.S. Census Bureau, 2020 American Community Survey), meaning many homes require structural evaluation before new roofing or siding can be installed. Aging plywood sheathing, outdated flashing details, and original single-pane windows are common across the county\u2019s older neighborhoods.',
      'The <strong>Oakland Hills and Berkeley Hills</strong> fall within California\u2019s Wildland-Urban Interface (WUI) fire zones — a designation that became critically important after the 1991 Oakland Hills firestorm. Homes in these zones must comply with Chapter 7A fire-resistant building standards, requiring Class A fire-rated roofing, ember-resistant vents, non-combustible siding within setback distances, and fire-rated underlayment. Hamilton Exteriors specializes in WUI-compliant installations and handles all required fire zone documentation for the Oakland and Berkeley building departments.',
      'Permit processes vary across Alameda County\u2019s 14 incorporated cities. Oakland\u2019s Planning and Building Department typically processes roofing permits in 3\u20135 business days, while Berkeley\u2019s Design Review Committee may require additional review for exterior changes visible from the street. Fremont, Hayward, and San Leandro follow streamlined over-the-counter permitting for straightforward roof replacements. ADU permits in Oakland now benefit from the city\u2019s pre-approved ADU plan program, reducing approval timelines from months to weeks.',
      'The county\u2019s microclimates significantly affect material selection. Coastal fog in Oakland and Alameda accelerates algae growth on roofing surfaces — we recommend GAF Timberline HDZ shingles with StainGuard Plus for these areas. The Tri-Valley cities (Dublin, Pleasanton, Livermore) experience 15\u201320\u00b0F hotter summers than the bayside, making cool-roof-rated materials and energy-efficient windows a practical investment. Hamilton Exteriors has completed hundreds of projects across Alameda County, from fire-zone roof replacements in the Oakland Hills to full exterior renovations on Fremont ranch homes and ADU builds in Dublin.',
    ],
  },
};
