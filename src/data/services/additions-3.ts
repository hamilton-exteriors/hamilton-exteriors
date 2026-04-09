import type { ServicePageData } from '../../lib/service-page-types';
import { serviceCustomHomes, serviceAdditions, financingHouse, financingWorker } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'Custom Home Building in the Bay Area | Full Design-Build | Hamilton Exteriors',
  description:
    'Hamilton Exteriors is a full-service custom home builder in the Bay Area. Architecture, structural engineering, permitting, and construction — one team from concept to keys.',
  announcementText: 'Now Booking Summer 2026 Custom Homes — Free Design Consultation',
  hero: {
    headline: 'Custom Home  Building  From Concept  to Keys',
    formTitle: 'Get a FREE Consultation',
    formSubtitle:
      "Tell us about your dream home. We'll call within 5 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceCustomHomes,
    serviceType: 'Custom Home',
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
        heading: 'Our Design-Build Process',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Architecture & Design',
            description:
              'Our architects work with you from initial concept through construction documents. Floor plans, 3D renderings, material selections, and interior layouts — all designed around your lot, budget, and how you actually live.',
            image: serviceCustomHomes,
          },
          {
            title: 'Engineering & Permits',
            description:
              'Structural engineering, Title 24 energy compliance, soils reports, and every permit application. We sit in planning meetings, respond to plan check corrections, and get your approvals — Bay Area permitting is what we do.',
            image: financingWorker,
          },
          {
            title: 'Construction & Framing',
            description:
              'Site prep, foundation, framing, roofing, electrical, plumbing, HVAC — our crews build it all. One project manager coordinates every trade so your build stays on schedule and on budget.',
            image: serviceAdditions,
          },
          {
            title: 'Finishing & Handover',
            description:
              'Drywall, paint, flooring, cabinetry, countertops, fixtures, landscaping — the details that make a house feel like your home. We handle final inspections and walk you through everything before handing over the keys.',
            image: financingHouse,
          },
        ],
      },
    },
    { type: 'difference' },
    { type: 'projects' },
    { type: 'faq' },
    { type: 'yellowBar', text: 'Schedule a FREE Consultation', href: '#contact' },
    { type: 'cta' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
};
