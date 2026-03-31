import type { ServicePageData } from '../../lib/service-page-types';
import { serviceAdditions, serviceAdu, financingHouse, financingWorker } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'Home Extensions in the Bay Area | Room Additions & Second Stories | Hamilton Exteriors',
  description:
    'Hamilton Exteriors builds quality home extensions across the Bay Area. Room additions, second stories, kitchen expansions — design, engineering, permits, and construction.',
  announcementText: 'Limited Time: Free Design Consultation for Home Extensions*',
  hero: {
    headline: 'Bay Areas  Best Home  Extension  Builder',
    formTitle: 'Get a FREE Consultation',
    formSubtitle:
      "We'll contact you in 3-5 minutes to discuss your extension project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceAdditions,
    serviceType: 'Extension',
    serviceOptions: ['Room Addition', 'Second Story', 'Kitchen Extension', 'Sunroom'],
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'styles',
      data: {
        heading: 'Home Extension Services',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Room Additions',
            description:
              'Add bedrooms, bathrooms, or living areas that integrate seamlessly with your existing floor plan. We handle structural engineering, permits, and construction so every addition feels like it was always part of your home.',
            image: serviceAdditions,
          },
          {
            title: 'Second Story Additions',
            description:
              'Expand upward to maximize your lot space without sacrificing your yard. Our structural engineers design load-bearing systems that support a full second floor safely and to code.',
            image: financingHouse,
          },
          {
            title: 'Kitchen Extensions',
            description:
              'Create the open, spacious kitchen you\'ve always wanted with a bump-out or full addition. We handle plumbing, electrical, structural changes, and finishing — from demo to countertops.',
            image: financingWorker,
          },
          {
            title: 'Design & Engineering',
            description:
              'Our in-house architects and engineers create plans that maximize your space within local zoning codes. We handle Title 24 compliance, structural calculations, and all permit applications.',
            image: serviceAdu,
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
