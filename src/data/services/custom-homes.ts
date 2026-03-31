import type { ServicePageData } from '../../lib/service-page-types';
import { serviceCustomHomesFull, serviceCustomHomes, serviceAdditions, financingHouse, financingWorker } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Custom Home Builder in the Bay Area | Hamilton Exteriors',
  description:
    'Hamilton Exteriors is a full-service custom home builder in the Bay Area. Design, architecture, engineering, permitting, and construction — all under one roof.',
  announcementText: 'Limited Time: Free Design Consultation for Custom Home Projects*',
  hero: {
    headline: 'Bay Areas  Best Custom  Home Builder',
    formTitle: 'Get a FREE Consultation',
    formSubtitle:
      "Tell us about your dream home. We'll call within 5 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceCustomHomesFull,
    serviceType: 'Custom Home',
    serviceOptions: ['Ground-Up Build', 'Major Renovation', 'Second Story Addition', 'Modern Farmhouse'],
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'styles',
      data: {
        heading: 'Custom Home Services',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Ground-Up Construction',
            description:
              'Build your dream home from the ground up. We manage every phase — site prep, foundation, framing, electrical, plumbing, and finishing. One team, one point of contact, no miscommunication.',
            image: serviceCustomHomes,
          },
          {
            title: 'Design & Architecture',
            description:
              'Our in-house architects and designers work with you from concept to blueprints. We create floor plans, 3D renderings, and construction documents that bring your vision to life — tailored to your lot, budget, and lifestyle.',
            image: financingHouse,
          },
          {
            title: 'Engineering & Permits',
            description:
              'We handle structural engineering, Title 24 energy compliance, soils reports, and all permit applications. Bay Area permitting is complex — we navigate city planning departments daily so you don\'t have to.',
            image: financingWorker,
          },
          {
            title: 'Additions & Renovations',
            description:
              'Expand your home with second story additions, room additions, or full-scale renovations. We handle structural engineering, load-bearing wall removal, and seamless integration with your existing home.',
            image: serviceAdditions,
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
