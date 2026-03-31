import type { ServicePageData } from '../../lib/service-page-types';
import { serviceAdditions, serviceAdu, serviceCustomHomes, financingHouse } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'Home Additions & Construction in the Bay Area | Hamilton Exteriors',
  description:
    'Hamilton Exteriors builds home additions, ADUs, second stories, and custom homes across the Bay Area. Design, engineering, permits, and construction — all under one roof.',
  announcementText: 'Limited Time: Free Design Consultation for Your Addition Project*',
  hero: {
    headline: 'Bay Areas  Best Home  Addition  Builder',
    formTitle: 'Get a FREE Consultation',
    formSubtitle:
      "We'll contact you in 3-5 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceAdditions,
    serviceType: 'Addition',
    serviceOptions: ['Second Story', 'Room Addition', 'ADU', 'Full Remodel'],
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'styles',
      data: {
        heading: 'What We Build',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Second Story Additions',
            description:
              'Double your living space without giving up yard. We handle structural engineering, load calculations, and permits for full second-story builds. Most projects completed in 8-12 weeks.',
            image: serviceAdditions,
          },
          {
            title: 'Room Extensions',
            description:
              'Expand your kitchen, add a bedroom, or open up your living area with a seamless room addition. We match your existing roofline, siding, and finishes so it looks like it was always there.',
            image: financingHouse,
          },
          {
            title: 'ADUs & Guest Houses',
            description:
              'Detached ADUs, garage conversions, and junior ADUs that add living space and rental income. Full design-build with our 60-day permit guarantee. Bay Area ADU experts since 2020.',
            image: serviceAdu,
          },
          {
            title: 'Full Remodels',
            description:
              'Gut renovations that transform your entire home. We handle demo, structural changes, electrical, plumbing, and finishing — one team managing every trade so nothing falls through the cracks.',
            image: serviceCustomHomes,
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
