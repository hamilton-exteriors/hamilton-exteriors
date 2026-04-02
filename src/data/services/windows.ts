import type { ServicePageData } from '../../lib/service-page-types';
import {
  heroWindows,
  windowDoubleHung,
  windowCasement,
  windowSliding,
  windowBay,
  windowPicture,
  windowGarden,
} from '../../lib/images';

export const data: ServicePageData = {
  title: 'Bay Area Window Installation — Double Hung, Casement & Sliding | Hamilton Exteriors',
  description:
    'Energy-efficient window installation across the Bay Area. Double hung, casement, sliding, bay, and picture windows. 50-year warranty. Free quote — (650) 977-3351.',
  hero: {
    headline: 'Best Window  Company in  the Bay Area',
    formTitle: 'Get A FREE Window Quote',
    formSubtitle:
      "We'll contact you in 3-5 minutes to schedule a FREE Window inspection.",
    ctaText: 'Call Now (650) 977-3351',
    heroImage: heroWindows,
    serviceType: 'Windows',
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
        heading: 'Window Styles Offered',
        cardVariant: 'windows',
        columns: 3,
        bgClass: 'bg-cream',
        items: [
          {
            title: 'Single Hung',
            image: windowDoubleHung,
            description:
              "A single-hung window features a fixed upper sash and a movable lower sash that slides vertically. It's space-efficient, easy to use, and offers great ventilation with a classic, versatile design.",
          },
          {
            title: 'Single Slider',
            image: windowCasement,
            description:
              "A single slider window has one fixed pane and one sliding pane for easy horizontal operation. It's space-efficient, versatile, and offers excellent ventilation with a modern look.",
          },
          {
            title: 'Sliding Glass Doors',
            image: windowSliding,
            description:
              'A sliding glass door features large glass panels that glide smoothly on tracks, offering easy access, natural light, and a sleek, space-saving design.',
          },
          {
            title: 'Picture Windows',
            image: windowBay,
            description:
              'A picture window is a large, fixed-pane window that provides expansive views and abundant natural light. Its clean, modern design enhances any space while improving energy efficiency.',
          },
          {
            title: 'Double Hung',
            image: windowPicture,
            description:
              'A double-hung window has two movable sashes that slide vertically, offering versatile ventilation and easy cleaning. Its classic design fits a variety of architectural styles.',
          },
          {
            title: 'Casement Windows',
            image: windowGarden,
            description:
              'A casement window features a single sash that opens outward on side hinges, operated by a crank mechanism. It provides excellent ventilation, unobstructed views, and a tight seal for superior energy efficiency. Perfect for modern and traditional styles alike.',
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'pricing',
      data: {
        heading: 'Window Pricing',
        tiers: [
          {
            name: 'Standard Windows',
            rows: [
              { product: 'Single Hung (per window)', pricePerSq: '~$650', materialCost: '$250' },
              { product: 'Double Hung (per window)', pricePerSq: '~$750', materialCost: '$300' },
              { product: 'Single Slider (per window)', pricePerSq: '~$600', materialCost: '$225' },
            ],
          },
          {
            name: 'Specialty Windows',
            rows: [
              { product: 'Casement (per window)', pricePerSq: '~$800', materialCost: '$350' },
              { product: 'Picture Window (per window)', pricePerSq: '~$700', materialCost: '$275' },
              { product: 'Bay / Bow Window', pricePerSq: '~$2,500', materialCost: '$1,200' },
            ],
          },
          {
            name: 'Doors',
            rows: [
              { product: 'Sliding Glass Door', pricePerSq: '~$2,800', materialCost: '$1,400' },
              { product: 'French Door (pair)', pricePerSq: '~$3,200', materialCost: '$1,600' },
            ],
          },
        ],
        footnote: 'Prices per unit installed. Includes removal of existing window, new flashing, materials, labor, trim, and cleanup. Energy-efficient Low-E glass standard on all windows. Prices valid as of 2025.',
      },
    },
    { type: 'projects' },
    { type: 'yellowBar', text: 'Schedule a FREE Inspection', href: '#contact' },
    { type: 'cta' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
};
