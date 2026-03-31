import type { CountyPageData } from '../../lib/county-page-types';
import { areaAntioch, areaConcord, areaWalnutCreek, areaSanRamon, areaRichmond } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Contra Costa County',
  countySlug: 'contra-costa-county-ca',
  state: 'CA',
  adjective: 'Experienced',
  title: 'Experienced ADU Contractors in Contra Costa County, CA | Hamilton Exteriors',
  description: 'Hamilton Exteriors provides experienced ADU contractors throughout Contra Costa County, CA. We manage design, permits, and construction with precision. Get a free estimate today.',
  heroHeadline: 'Experienced  ADU  Contractors  in Contra Costa County',
  heroFormTitle: 'Get a FREE Estimate in Contra Costa County',

  cities: [
    { name: 'Antioch', slug: '/service-areas/contra-costa-county-ca/antioch-ca', image: areaAntioch },
    { name: 'Walnut Creek', slug: '/service-areas/contra-costa-county-ca/walnut-creek-ca', image: areaWalnutCreek },
    { name: 'Concord', slug: '/service-areas/contra-costa-county-ca/concord-ca', image: areaConcord },
    { name: 'San Ramon', slug: '/service-areas/contra-costa-county-ca/san-ramon-ca', image: areaSanRamon },
    { name: 'Richmond', slug: '/service-areas/contra-costa-county-ca/richmond-ca', image: areaRichmond },
  ],
  citySectionStyle: 'label',

  whySection: {
    heading: 'Why Experienced ADU Contractors Matter in Contra Costa County, CA?',
    introParagraphs: [
      'Building an ADU in Contra Costa County requires navigating unique zoning requirements that vary across each city \u2014 from Walnut Creek\u2019s hillside overlay zones to Richmond\u2019s waterfront regulations. An experienced contractor who knows these jurisdictions saves you months of delays and thousands in costly revisions.',
      'With Contra Costa County\u2019s median home values continuing to rise, a professionally built ADU can add $150,000\u2013$250,000 in property value while generating $2,000\u2013$3,200 per month in rental income. The right contractor ensures your investment is built to last and fully compliant with local building codes.',
    ],
    cards: [
      {
        title: 'Space. Value. Versatility.',
        description: 'Experienced ADU contractors in Contra Costa County, CA help homeowners create livable square footage on existing lots. A well-planned ADU supports aging parents, adult children, or tenants while preserving yard space and maintaining neighborhood character\u2014turning unused areas into productive, income-generating assets.',
      },
      {
        title: 'Compliance & Safety',
        description: 'Working with experienced ADU contractors in Contra Costa County, CA reduces risks tied to drainage, egress, fire separation, and structural loads. Professional execution means electrical, plumbing, and ventilation systems are installed to code, improving durability, indoor air quality, and long-term safety for occupants.',
      },
      {
        title: 'Energy Performance',
        description: 'Purpose-built ADUs outperform quick conversions. With experienced ADU contractors in Contra Costa County, CA, assemblies are insulated correctly, thermal bridges are minimized, and HVAC is right-sized\u2014resulting in quieter, more comfortable spaces with lower utility costs and a smaller environmental footprint.',
      },
    ],
  },

  aduServicesDesktop: {
    label: 'WHAT WE BUILD',
    heading: 'ADU Types We Specialize In',
    items: [
      { title: 'Detached ADUs', description: 'Standalone backyard units up to 1,200 sq ft with full kitchens, bathrooms, and separate entrances. Ideal for rental income or multigenerational living with complete privacy.' },
      { title: 'Garage Conversions', description: 'Transform your existing garage into a comfortable living space. The most cost-effective ADU option, with lower construction costs and faster completion timelines.' },
      { title: 'Junior ADUs', description: 'Up to 500 sq ft units built within your existing home footprint. Perfect for a home office, guest suite, or compact rental \u2014 with minimal site disruption.' },
    ],
  },

  aduServicesMobile: {
    heading: 'ADU Types We Build',
    paragraphs: [
      'We build detached ADUs up to 1,200 sq ft, garage conversions, and junior ADUs across Contra Costa County. Every unit includes full kitchens, bathrooms, and premium finishes \u2014 built to code and designed for comfort.',
    ],
  },

  customFaqs: [
    {
      question: 'What services do experienced ADU contractors provide in Contra Costa County, CA?',
      answer: 'Experienced ADU contractors in Contra Costa County, CA handle every phase of the project including site assessment, architectural design, permit acquisition, utility coordination, foundation work, framing, electrical, plumbing, HVAC installation, and final inspections. We manage the entire build so you have a single point of contact from concept to move-in.',
    },
    {
      question: 'How long does an ADU project take in Contra Costa County, CA?',
      answer: 'Most ADU projects in Contra Costa County, CA take between 6 and 12 months from initial design through completion. Timelines vary based on unit size, site conditions, permit processing, and customization level. Our experienced team keeps your project on schedule with clear milestones and proactive communication throughout the build.',
    },
    {
      question: 'Are ADUs customizable for rental or multigenerational use in Contra Costa County, CA?',
      answer: 'Absolutely. ADUs in Contra Costa County, CA can be fully customized for rental income, multigenerational living, home offices, or guest quarters. We design flexible floor plans with separate entrances, full kitchens, accessible bathrooms, and privacy features tailored to your specific needs and local zoning requirements.',
    },
  ],
  showSharedFaq: false,
  showReviewLogos: false,
};
