import type { ServicePageData } from '../../lib/service-page-types';
import { serviceCustomHomes, serviceAdditions, financingHouse, financingWorker } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'Custom Home Building in the Bay Area | Design-Build Experts | Hamilton Exteriors',
  description:
    'Hamilton Exteriors builds custom homes in the Bay Area. Full design-build — architecture, engineering, permitting, and construction under one roof.',
  announcementText: 'Limited Time: Free Design Consultation for Custom Home Projects*',
  hero: {
    headline: 'Custom Home  Building in  the Bay Area',
    formTitle: 'Get a FREE Consultation',
    formSubtitle:
      "Tell us about your dream home. We'll call within 5 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceCustomHomes,
    serviceType: 'Custom Home',
    serviceOptions: ['Ground-Up Build', 'Major Renovation', 'Modern Farmhouse', 'Contemporary'],
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
            title: 'Design & Architecture',
            description:
              'Work with our in-house architects to design a home that reflects your vision, lifestyle, and budget. We create floor plans, 3D renderings, and full construction documents.',
            image: serviceCustomHomes,
          },
          {
            title: 'Foundation & Framing',
            description:
              'Solid structural work built to code with premium materials. Our engineers design foundations and framing systems that stand the test of time — from standard slabs to hillside engineering.',
            image: financingWorker,
          },
          {
            title: 'Interior Finishing',
            description:
              'From flooring to cabinetry, we handle every detail of your interior build-out. Custom millwork, tile, hardwood, paint — our finishing crews deliver craftsmanship you can see and feel.',
            image: financingHouse,
          },
          {
            title: 'Permits & Project Management',
            description:
              'We manage the full permitting process and keep your project on schedule and on budget. One project manager, one point of contact, clear communication throughout.',
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
