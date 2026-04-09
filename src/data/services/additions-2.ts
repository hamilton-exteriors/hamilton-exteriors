import type { ServicePageData } from '../../lib/service-page-types';
import { serviceAdditions, financingHouse, financingWorker, serviceAdu } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'Room Additions & Second Stories in the Bay Area | Hamilton Exteriors',
  description:
    'Hamilton Exteriors builds room additions, second stories, and kitchen extensions across the Bay Area. Design, structural engineering, permits, and construction.',
  announcementText: 'Now Booking Summer 2026 Room Additions — Free Design Consultation',
  hero: {
    headline: 'Room Additions  & Second  Stories',
    formTitle: 'Get Your Free Consultation',
    formSubtitle:
      "We'll reach out within 3\u20135 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceAdditions,
    serviceType: 'Extension',
    // serviceOptions removed — service is known from page context, form is 2 steps
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'styles',
      data: {
        heading: 'Extension Services',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Second Story Additions',
            description:
              'Add a full second floor when your lot is maxed out. We design the structural system, reinforce your existing foundation if needed, and build upward — bedrooms, bathrooms, even a rooftop deck.',
            image: serviceAdditions,
          },
          {
            title: 'Room Additions',
            description:
              'Expand outward with a new bedroom, family room, or home office that blends seamlessly with your existing home. We match rooflines, siding, and interior finishes so it never looks like an afterthought.',
            image: financingHouse,
          },
          {
            title: 'Kitchen & Living Extensions',
            description:
              'Open up your floor plan with a kitchen bump-out, great room expansion, or indoor-outdoor living space. We handle structural wall removal, electrical, plumbing, and everything through to countertops.',
            image: financingWorker,
          },
          {
            title: 'ADUs & In-Law Suites',
            description:
              'Add a detached or attached unit for family, guests, or rental income. Full design-build with our 60-day permit guarantee. The most popular addition in the Bay Area right now.',
            image: serviceAdu,
          },
        ],
      },
    },
    { type: 'difference' },
    { type: 'projects' },
    { type: 'faq' },
    { type: 'yellowBar', text: 'Schedule Your Free Consultation', href: '#contact' },
    { type: 'cta' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
};
