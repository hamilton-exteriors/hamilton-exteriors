import type { ServicePageData } from '../../lib/service-page-types';
import { serviceCustomHomesFull } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Custom Home Builder in the Bay Area | Hamilton Exteriors',
  description:
    'Hamilton Exteriors builds custom homes across the San Francisco Bay Area. From design to completion — licensed, bonded, and insured. Call for a free consultation.',
  announcementText: 'Limited Time: Free Design Consultation for Custom Home Projects*',
  hero: {
    headline: 'Custom Homes  Built for  Bay Area  Living',
    formTitle: 'Get a FREE Consultation',
    formSubtitle:
      "Tell us about your dream home. We'll call within 5 minutes to discuss your project.",
    badges: [
      'Licensed Bonded & Insured',
      'Start with $0 Down',
      'Full Design-Build',
      'Bay Area Experts',
    ],
    serviceType: 'Custom Home',
    serviceOptions: ['Ground-Up Build', 'Major Renovation', 'Second Story Addition', 'Modern Farmhouse'],
  },
  sections: [
    {
      type: 'imageBanner',
      data: {
        image: serviceCustomHomesFull,
        alt: 'Custom home construction in the Bay Area',
        height: 420,
      },
    },
    { type: 'logoSlider' },
    {
      type: 'styles',
      data: {
        heading: 'Custom Home Services',
        cardVariant: 'adu',
        items: [
          {
            title: 'Ground-Up Construction',
            description:
              'Build your dream home from the ground up. We handle everything from site preparation and foundation to framing, electrical, plumbing, and finishing. Our design-build approach means one team manages your entire project — no miscommunication between architects, engineers, and builders.',
          },
          {
            title: 'Major Renovations',
            description:
              'Transform your existing home with a full-scale renovation. Whether you want to open up your floor plan, modernize your kitchen and bathrooms, or completely reimagine your living space, our experienced crews deliver high-quality craftsmanship on time and on budget.',
          },
          {
            title: 'Second Story Additions',
            description:
              'Double your living space without expanding your footprint. A second story addition is the most cost-effective way to add bedrooms, bathrooms, and living areas when your lot is maxed out. We handle structural engineering, permits, and construction seamlessly.',
          },
          {
            title: 'Design & Permitting',
            description:
              'We simplify the entire planning process. Our in-house team handles architectural design, structural engineering, permit applications, and city approvals. Bay Area permitting is complex — we navigate it daily so you don\'t have to.',
          },
        ],
      },
    },
    { type: 'reviews' },
    { type: 'reviewLogos' },
    {
      type: 'stats',
      data: {
        desktopOnly: true,
        items: [
          { value: '50+', label: 'Custom Projects Completed' },
          { value: '$0', label: 'Down Payment Required' },
          { value: '15+', label: 'Years of Bay Area Experience' },
        ],
      },
    },
    { type: 'difference' },
    { type: 'projects' },
    { type: 'yellowBar', text: 'Schedule a FREE Consultation', href: '#contact' },
    { type: 'financing' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
};
