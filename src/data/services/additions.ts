import type { ServicePageData } from '../../lib/service-page-types';
import { serviceAdditions, serviceAdu, serviceCustomHomes, financingHouse } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'Home Additions Across the San Francisco Bay Area | Design & Construction Experts | Hamilton Exteriors',
  description:
    'Hamilton Exteriors builds quality home additions in the Bay Area. ADUs, extensions, custom homes, and full remodels — design, engineering, permits, and construction.',
  announcementText: 'Limited Time: Free Design Consultation for Home Additions*',
  hero: {
    headline: 'Bay Areas  Best Home  Addition  Builder',
    formTitle: 'Get a FREE Consultation',
    formSubtitle:
      "We'll contact you in 3-5 minutes to discuss your addition project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceAdditions,
    serviceType: 'Addition',
    serviceOptions: ['Room Addition', 'Second Story', 'ADU', 'Full Remodel'],
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'styles',
      data: {
        heading: 'Addition Services Offered',
        cardVariant: 'roofing',
        items: [
          {
            title: 'ADUs',
            description:
              'Accessory Dwelling Units add flexible living space to your property — guest suites, rental units, or home offices. We handle design, architecture, engineering, permits, and construction from start to finish.',
            image: serviceAdu,
          },
          {
            title: 'Room Extensions',
            description:
              'Seamless additions to your existing home that create more living space while matching your architecture. Extra bedrooms, expanded kitchens, or new living areas — designed and built to blend perfectly.',
            image: serviceAdditions,
          },
          {
            title: 'Custom Homes',
            description:
              'Build a home designed around your life — no compromises. Our in-house architects and engineers create custom floor plans, and our construction team brings them to life with meticulous craftsmanship.',
            image: serviceCustomHomes,
          },
          {
            title: 'Full Remodels',
            description:
              'Transform your entire home with updated layouts, modern finishes, and improved functionality. We handle structural engineering, load-bearing changes, permits, and every detail of construction.',
            image: financingHouse,
          },
        ],
      },
    },
    { type: 'difference' },
    { type: 'projects' },
    { type: 'yellowBar', text: 'Schedule a FREE Consultation', href: '#contact' },
    { type: 'cta' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
};
