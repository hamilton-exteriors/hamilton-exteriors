import type { CountyPageData } from '../../lib/county-page-types';
import { areaNapa, areaCalistoga, areaStHelena, areaYountville, areaAmericanCanyon } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Napa County',
  countySlug: 'napa-county-ca',
  state: 'CA',
  adjective: 'Skilled',
  title: 'Roofing, Siding, ADUs & Custom Homes in Napa County | Hamilton Exteriors',
  description: 'Hamilton Exteriors serves Napa County with expert roofing, siding, windows, ADUs, additions, and custom homes. Serving Napa, American Canyon, St. Helena, Calistoga, and Yountville.',
  heroHeadline: 'Napa County\u2019s Top  Design-Build &  Exteriors Contractor',
  heroFormTitle: 'Get a FREE Estimate in Napa County',
  proximity: '-122.33,38.50',

  cities: [
    { name: 'Napa', slug: '/service-areas/napa-county-ca/napa-ca', image: areaNapa },
    { name: 'American Canyon', slug: '/service-areas/napa-county-ca/american-canyon-ca', image: areaAmericanCanyon },
    { name: 'St. Helena', slug: '/service-areas/napa-county-ca/st-helena-ca', image: areaStHelena },
    { name: 'Calistoga', slug: '/service-areas/napa-county-ca/calistoga-ca', image: areaCalistoga },
    { name: 'Yountville', slug: '/service-areas/napa-county-ca/yountville-ca', image: areaYountville },
  ],
  citySectionStyle: 'heading',

  editorial: {
    heading: 'Building in Napa County: What Homeowners Need to Know',
    paragraphs: [
      'Napa County blends wine country charm with demanding construction requirements. The county\u2019s <strong>Wildland-Urban Interface (WUI) zones</strong> extend across much of the valley\u2019s hillsides, from the slopes above Calistoga and St. Helena to the eastern ridges near American Canyon. After the 2017 Atlas and Tubbs fires and the 2020 Glass Fire, Napa County adopted some of California\u2019s strictest fire-resistant building standards. New roofing in WUI zones must meet Class A fire ratings, and siding materials must comply with SFM 12-7A-1 ignition-resistance testing.',
      'Permit requirements vary significantly across Napa County\u2019s jurisdictions. The City of Napa processes roofing permits in 3\u20135 business days for straightforward replacements, while unincorporated county areas \u2014 where many vineyard estates and rural homes are located \u2014 may require additional environmental review, particularly for properties adjacent to <strong>Napa County Agricultural Preserve</strong> land. St. Helena and Calistoga both have design review requirements for exterior modifications visible from their historic main streets.',
      'Napa\u2019s climate is hotter and drier than the rest of the Bay Area, with summer temperatures regularly exceeding 95\u00b0F in the upper valley. This heat drives material selection toward <strong>cool-roof-rated shingles</strong> that reflect solar radiant heat and reduce attic temperatures by up to 30\u00b0F. We install GAF Timberline CS shingles with Cool Series technology for Napa homeowners seeking both fire resistance and energy efficiency. For siding, James Hardie\u2019s ColorPlus factory-finished panels resist Napa\u2019s UV exposure better than field-painted alternatives.',
      'The architectural character of Napa County ranges from Victorian-era homes in downtown Napa to Mediterranean-style estates in Yountville and rustic modern farmhouses in St. Helena. Hamilton Exteriors works with each community\u2019s aesthetic, ensuring that roofing and siding selections complement the neighborhood character. Our team has completed projects throughout the valley \u2014 from post-fire rebuilds in the eastern hills to full exterior renovations on Yountville cottages and American Canyon tract homes.',
    ],
  },
};
