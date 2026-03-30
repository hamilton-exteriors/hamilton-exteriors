import type { CountyPageData } from '../../lib/county-page-types';
import { areaOakland, areaFremont, areaHayward, areaBerkeley, areaSanLeandro } from '../../lib/images';

export const data: CountyPageData = {
  county: 'Alameda County',
  countySlug: 'alameda-county-ca',
  state: 'CA',
  adjective: 'Trusted',
  title: 'Trusted ADU Contractors in Alameda County, CA | Hamilton Exteriors',
  description: 'Hamilton Exteriors provides expert ADU construction throughout Alameda County, CA. Serving Oakland, Berkeley, Fremont, Hayward, and San Leandro.',
  heroHeadline: 'Trusted  ADU  Contractors  in Alameda County',
  heroFormTitle: 'Get a FREE Estimate in Alameda County',

  cities: [
    { name: 'Oakland', slug: '/service-areas/alameda-county-ca/oakland-ca', image: areaOakland },
    { name: 'Fremont', slug: '/service-areas/alameda-county-ca/fremont-ca', image: areaFremont },
    { name: 'Hayward', slug: '/service-areas/alameda-county-ca/hayward-ca', image: areaHayward },
    { name: 'Berkeley', slug: '/service-areas/alameda-county-ca/berkeley-ca', image: areaBerkeley },
    { name: 'San Leandro', slug: '/service-areas/alameda-county-ca/san-leandro-ca', image: areaSanLeandro },
  ],
  citySectionStyle: 'heading',

  whyChoose: {
    heading: 'Why Homeowners Choose Hamilton Exteriors',
    paragraphs: [
      'Alameda County homeowners trust Hamilton Exteriors because we combine local expertise with proven construction methods. Our team understands the unique building codes across Oakland, Berkeley, Fremont, Hayward, and San Leandro \u2014 ensuring your ADU project moves smoothly from permits through final inspection.',
      'We handle every phase of your ADU project in-house, from architectural design and engineering to foundation, framing, electrical, plumbing, and finish work. No subcontractors means better quality control, clearer communication, and a single point of accountability throughout your build.',
      'Our commitment to transparency means you\u2019ll always know where your project stands. We provide detailed written estimates, realistic timelines, and regular progress updates so there are never any surprises.',
    ],
  },

  benefits: {
    heading: 'Benefits of Building an ADU in Alameda County',
    paragraphs: [
      'Alameda County is one of the Bay Area\u2019s most ADU-friendly jurisdictions. With streamlined permitting processes and strong rental demand, building an ADU is one of the smartest investments you can make as a homeowner.',
      'A well-built ADU can generate $2,000\u2013$3,500 per month in rental income, or provide private living space for aging parents, adult children, or a home office. With property values continuing to rise across Alameda County, an ADU can add 20\u201335% to your home\u2019s overall value.',
      'California\u2019s ADU laws have removed many traditional barriers \u2014 reduced setbacks, eliminated parking mandates near transit, and simplified permitting. Hamilton Exteriors navigates these regulations daily, ensuring your project takes full advantage of every available benefit.',
    ],
  },

  aduTypes: {
    heading: 'ADU Types We Build in Alameda County',
    subtitle: 'From detached backyard units to garage conversions and junior ADUs, we handle every type of accessory dwelling unit across Alameda County.',
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

  mobileProcess: {
    heading: 'Our ADU Construction Process',
    steps: [
      { title: '1. Free Consultation', description: 'We assess your property, discuss goals, and provide a detailed estimate with transparent pricing.' },
      { title: '2. Design & Permits', description: 'Custom plans tailored to your lot. We handle all city permitting \u2014 guaranteed approval within 60 days.' },
      { title: '3. Construction', description: 'In-house crew builds with premium materials. Regular updates keep you informed at every milestone.' },
      { title: '4. Final Walkthrough', description: 'Complete inspections, hand you the keys, and ensure every detail meets your expectations.' },
    ],
  },

  mobileWhyBuild: {
    heading: 'Why Build an ADU in Alameda County?',
    paragraphs: [
      'Alameda County is one of the Bay Area\u2019s most ADU-friendly jurisdictions. A well-built ADU can generate $2,000\u2013$3,500 per month in rental income while adding 20\u201335% to your home\u2019s overall value.',
      'California\u2019s streamlined ADU laws have removed traditional barriers \u2014 reduced setbacks, eliminated parking mandates near transit, and simplified permitting. Hamilton Exteriors navigates these daily.',
    ],
  },

  showSharedFaq: true,
};
