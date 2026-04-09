import type { CountyPageData } from '../../lib/county-page-types';
import { areaRedwoodCity, areaSanMateo, areaBurlingame, areaDalyCity, areaSouthSanFrancisco } from '../../lib/images';

export const data: CountyPageData = {
  county: 'San Mateo County',
  countySlug: 'san-mateo-county-ca',
  state: 'CA',
  adjective: "Peninsula's",
  title: 'Roofing, Siding, ADUs & Custom Homes in San Mateo County | Hamilton Exteriors',
  description: 'Hamilton Exteriors serves San Mateo County \u2014 roofing, siding, windows, ADUs, additions, and custom homes. Serving Redwood City, San Mateo, Burlingame, Daly City, and South San Francisco.',
  heroHeadline: 'San Mateo County\u2019s Architect-Led  Custom Home  & Exteriors Contractor',
  heroFormTitle: 'Get Your Free Estimate in San Mateo County',
  proximity: '-122.33,37.55',

  cities: [
    { name: 'Redwood City', slug: '/service-areas/san-mateo-county-ca/redwood-city-ca', image: areaRedwoodCity },
    { name: 'San Mateo', slug: '/service-areas/san-mateo-county-ca/san-mateo-ca', image: areaSanMateo },
    { name: 'Burlingame', slug: '/service-areas/san-mateo-county-ca/burlingame-ca', image: areaBurlingame },
    { name: 'Daly City', slug: '/service-areas/san-mateo-county-ca/daly-city-ca', image: areaDalyCity },
    { name: 'South San Francisco', slug: '/service-areas/san-mateo-county-ca/south-san-francisco-ca', image: areaSouthSanFrancisco },
  ],
  citySectionStyle: 'heading',

  editorial: {
    heading: 'Building in San Mateo County: What Homeowners Need to Know',
    paragraphs: [
      'San Mateo County spans the Peninsula from the coastal communities of Pacifica and Half Moon Bay to the bayside cities of San Mateo, Burlingame, and Redwood City. The county\u2019s proximity to the Pacific Ocean creates a <strong>marine-layer microclimate</strong> that demands careful material selection — persistent fog, salt air, and moisture accelerate deterioration on conventional roofing and siding materials faster than in inland Bay Area communities.',
      'Coastal fog is particularly aggressive on the western side of the county. Homes in Pacifica, Moss Beach, and the hillside neighborhoods above Daly City experience near-constant moisture exposure from October through June. We recommend <strong>GAF Timberline HDZ shingles with StainGuard Plus</strong> for algae and moisture resistance in these areas, paired with James Hardie HZ5 fiber cement siding engineered specifically for high-moisture coastal environments. For the warmer, sunnier bayside cities like Redwood City and San Carlos, cool-roof-rated materials help offset the Peninsula\u2019s rising summer temperatures.',
      'Permit processes in San Mateo County vary by city. Redwood City and San Mateo both offer <strong>over-the-counter roofing permits</strong> for standard replacements, typically processed in 1\u20133 business days. Burlingame\u2019s planning department may require design review for exterior changes in the Broadway and Burlingame Park neighborhoods. Daly City and South San Francisco follow streamlined permitting for residential roof and siding projects. ADU construction has surged across the Peninsula \u2014 San Mateo County\u2019s pre-approved ADU plan program and California\u2019s AB 68 provisions have made accessory dwellings a practical path for homeowners looking to add rental income or multi-generational living space.',
      'Hamilton Exteriors has completed roofing, siding, window, and ADU projects throughout San Mateo County — from full exterior renovations on Burlingame Craftsman bungalows to roof replacements on Redwood City mid-century homes and new ADU construction in Daly City. Our crews understand the Peninsula\u2019s building code nuances, HOA requirements in planned communities, and the access challenges that come with the county\u2019s hillside lots and narrow driveways.',
    ],
  },
};
