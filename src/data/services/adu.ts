import type { ServicePageData } from '../../lib/service-page-types';
import { aduHero, serviceAdu, serviceAdditions, financingHouse, financingWorker } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'ADU Builder in the San Francisco Bay Area | Design & Construction Experts | Hamilton Exteriors',
  description:
    'Hamilton Exteriors is a full-service ADU builder in the Bay Area. Design, architecture, engineering, permitting, and construction — all under one roof.',
  announcementText: 'Limited Time: Free ADU Design Consultation + Permit Guarantee*',
  hero: {
    headline: 'Bay Areas  Best ADU  Builder',
    formTitle: 'Get a FREE ADU Consultation',
    formSubtitle:
      "We'll contact you in 3-5 minutes to discuss your ADU project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: aduHero,
    serviceType: 'ADU',
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
        heading: 'ADU Services Offered',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Detached ADUs',
            description:
              'Standalone backyard homes that offer maximum privacy and flexibility. Perfect for guest suites, rental units, or home offices. We handle design, engineering, permits, and construction from start to finish.',
            image: serviceAdu,
          },
          {
            title: 'Design & Architecture',
            description:
              'Our in-house architects create custom ADU floor plans, 3D renderings, and construction documents tailored to your lot. We maximize square footage within local zoning codes and design for natural light, privacy, and flow.',
            image: financingHouse,
          },
          {
            title: 'Engineering & Permits',
            description:
              'We handle structural engineering, Title 24 energy compliance, and all permit applications. Our 60-day permit guarantee means your project stays on schedule. Bay Area ADU permitting is complex — we navigate it daily.',
            image: financingWorker,
          },
          {
            title: 'Garage Conversions',
            description:
              'Transform your existing garage into a fully functional living space. Garage conversions are the most cost-effective ADU option — no new foundation required. We handle structural modifications, utilities, and finishes.',
            image: serviceAdditions,
          },
        ],
      },
    },
    { type: 'difference' },
    { type: 'projects' },
    { type: 'yellowBar', text: 'Schedule a FREE ADU Consultation', href: '#contact' },
    { type: 'cta' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
};
