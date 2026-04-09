import type { CountyPageData } from '../../lib/county-page-types';
import { areaSanJose, areaPaloAlto, areaMountainView, areaSunnyvale, areaCupertino, areaSantaClara, areaSaratoga, areaLosGatos, areaCampbell, areaMilpitas } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Santa Clara County',
  countySlug: 'santa-clara-county-ca',
  state: 'CA',
  adjective: 'Trusted',
  title: 'Roofing, Siding, ADUs & Custom Homes in Santa Clara County | Hamilton Exteriors',
  description: 'Hamilton Exteriors is Santa Clara County\u2019s trusted design-build contractor. Roofing, siding, windows, ADUs, additions, and custom homes. Serving San Jose, Palo Alto, Mountain View, Sunnyvale, and more.',
  heroHeadline: 'Santa Clara County\u2019s Top  Design-Build &  Exteriors Contractor',
  heroFormTitle: 'Get Your Free Estimate in Santa Clara County',
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

  editorial: {
    heading: 'Building in Santa Clara County: What Homeowners Need to Know',
    paragraphs: [
      'Santa Clara County is the Bay Area\u2019s largest county by population, spanning the tech corridors of Mountain View and Sunnyvale, the historic neighborhoods of San Jose, and the upscale hillside communities of Saratoga and Los Gatos. With <strong>median home values exceeding $1.6 million</strong> countywide, homeowners expect premium materials and craftsmanship that protect their investment for decades.',
      'The western foothills — including portions of Los Gatos, Saratoga, and the Monte Sereno area — fall within <strong>Wildland-Urban Interface (WUI) fire zones</strong>. The Santa Clara County Fire Department requires Class A fire-rated roofing, ember-resistant vents, and non-combustible exterior materials within defensible space zones. The 2020 SCU Lightning Complex fires reinforced these requirements, and Hamilton Exteriors maintains current certification in all WUI-compliant installation methods.',
      'Permit processes across Santa Clara County are generally efficient. San Jose\u2019s Department of Planning, Building and Code Enforcement offers express over-the-counter permits for straightforward roof replacements. Palo Alto\u2019s Architectural Review Board may require design review for exterior changes on homes in designated historic districts, including Professorville and Crescent Park. Mountain View and Sunnyvale both support streamlined permitting for energy-efficiency upgrades including window replacements and cool-roof installations. ADU permits in San Jose benefit from the city\u2019s adopted pre-approved plans, cutting approval time significantly.',
      'Santa Clara County\u2019s climate is warmer and sunnier than the coastal Bay Area, with inland cities like San Jose averaging 300+ days of sunshine annually. This UV exposure accelerates fading on field-painted siding — we recommend <strong>James Hardie ColorPlus factory-finished fiber cement</strong> for its 15-year color warranty and superior UV resistance. For roofing, tile remains popular on the county\u2019s many Mediterranean and Spanish Colonial homes, particularly in Palo Alto and Los Gatos. Hamilton Exteriors has completed projects across the county — from tile roof restorations on Palo Alto Eichlers to full exterior renovations in the Cambrian neighborhood of San Jose and ADU construction in Campbell and Milpitas.',
    ],
  },
};
