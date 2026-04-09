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
  title: 'Bay Area Windows | Casement, Hung & Sliding | Hamilton Exteriors',
  description:
    'Energy-efficient window installation across the Bay Area. Double hung, casement, sliding & bay windows. 50-year warranty. Free quote — (650) 977-3351.',
  definition: 'Window replacement involves removing old or failing windows and installing new energy-efficient units with modern Low-E glass, improved seals, and better insulation. ENERGY STAR-certified replacement windows save homeowners $125 to $465 per year on energy bills according to the U.S. Department of Energy.',
  expertQuotes: [
    {
      quote: 'Most Bay Area homes built before 1990 have single-pane aluminum windows that lose 30 to 40% of heating and cooling energy. Upgrading to dual-pane Low-E windows exceeds California Title 24 energy requirements by 15 to 20% and pays for itself in energy savings within 8 to 12 years.',
      author: 'Alexander Hamilton Li',
      credentials: 'Architect & General Contractor, CSLB #1082377',
    },
  ],
  hero: {
    headline: 'Best Window  Company in  the Bay Area',
    formTitle: 'Get Your Free Window Quote',
    formSubtitle:
      "We'll reach out within 3\u20135 minutes to schedule your free inspection.",
    ctaText: 'Call Now (650) 977-3351',
    heroImage: heroWindows,
    heroAlt: 'Energy-efficient window replacement on a Bay Area home by Hamilton Exteriors',
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
        heading: 'What Window Styles Does Hamilton Exteriors Offer?',
        cardVariant: 'windows',
        columns: 3,
        bgClass: 'bg-cream',
        items: [
          {
            title: 'Single Hung',
            image: windowDoubleHung,
            description: 'The most common Bay Area replacement — a fixed top sash and operable bottom sash with tilt-in cleaning. 15\u201325% energy savings over original aluminum frames.',
            href: '/windows/single-hung',
          },
          {
            title: 'Single Slider',
            image: windowCasement,
            description: 'Slides horizontally with no exterior clearance needed — ideal above kitchen sinks, along walkways, and in Eichler-style homes throughout the Peninsula.',
            href: '/windows/single-slider',
          },
          {
            title: 'Sliding Glass Doors',
            image: windowSliding,
            description: 'Connect your indoor and outdoor living spaces with modern multi-pane sliders from Milgard, Andersen, and Marvin. Configurations up to 16 feet wide.',
            href: '/windows/sliding-glass-doors',
          },
          {
            title: 'Picture Windows',
            image: windowBay,
            description: 'Large fixed-pane windows that maximize natural light and frame Bay Area views. The most energy-efficient window type available — sizes up to 8\u00d76 feet.',
            href: '/windows/picture',
          },
          {
            title: 'Double Hung',
            image: windowPicture,
            description: 'The classic American window with two operable sashes. Period-accurate profiles for Victorians, Craftsmans, and Edwardians throughout the Bay Area.',
            href: '/windows/double-hung',
          },
          {
            title: 'Casement Windows',
            image: windowGarden,
            description: 'Crank-open windows that capture 50\u201390% more airflow than sliders and seal tighter than any other operable window — perfect for fog belt homes.',
            href: '/windows/casement',
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'pricing',
      data: {
        heading: 'How Much Do New Windows Cost in the Bay Area?',
        tiers: [
          {
            name: 'Standard Windows',
            rows: [
              { product: 'Single Hung (per window)', pricePerSq: '~$850', materialCost: '$325' },
              { product: 'Double Hung (per window)', pricePerSq: '~$950', materialCost: '$375' },
              { product: 'Single Slider (per window)', pricePerSq: '~$800', materialCost: '$300' },
            ],
          },
          {
            name: 'Specialty Windows',
            rows: [
              { product: 'Casement (per window)', pricePerSq: '~$1,050', materialCost: '$425' },
              { product: 'Picture Window (per window)', pricePerSq: '~$950', materialCost: '$375' },
              { product: 'Bay / Bow Window', pricePerSq: '~$4,500', materialCost: '$2,000' },
            ],
          },
          {
            name: 'Doors',
            rows: [
              { product: 'Sliding Glass Door', pricePerSq: '~$3,800', materialCost: '$1,800' },
              { product: 'French Door (pair)', pricePerSq: '~$4,200', materialCost: '$2,000' },
            ],
          },
        ],
        footnote: 'Prices per unit installed, reflecting typical Bay Area costs. Includes removal of existing window, new flashing, materials, labor, trim, and cleanup. Energy-efficient Low-E glass standard on all windows. Actual pricing varies based on window size, frame material, glass options, and installation complexity. Contact us for a free, itemized estimate.',
      },
    },
    {
      type: 'comparison',
      data: {
        heading: 'Window Style Comparison: Single Hung vs. Double Hung vs. Casement vs. Slider',
        columns: ['Single Hung', 'Double Hung', 'Casement', 'Slider', 'Picture'],
        rows: [
          { feature: 'Cost per window (installed)', values: ['$600–$1,200', '$700–$1,500', '$800–$1,500', '$600–$1,100', '$800–$2,500'] },
          { feature: 'Airflow', values: ['Bottom sash only', 'Both sashes (convection)', '50–90% more (AAMA)', 'Half the opening', 'None (fixed)'] },
          { feature: 'Energy efficiency (U-factor)', values: ['0.25', '0.27', '0.22', '0.27', '0.20 (triple)'] },
          { feature: 'Seal tightness', values: ['Good', 'Good', 'Best (4-side compression)', 'Fair', 'Best (no moving parts)'] },
          { feature: 'Cleaning', values: ['Tilt-in sash', 'Tilt-in both sashes', 'Crank open (interior)', 'Removable sash', 'Interior only'] },
          { feature: 'Exterior clearance needed', values: ['No', 'No', 'Yes (outward swing)', 'No', 'No'] },
          { feature: 'Best for', values: ['Most Bay Area homes', 'Victorians, Craftsmans', 'Fog belt, upper floors', 'Eichlers, kitchens', 'Views, hillside homes'] },
        ],
        source: 'American Architectural Manufacturers Association (AAMA), U.S. Department of Energy ENERGY STAR program, Hamilton Exteriors project data 2024–2026',
      },
    },
    { type: 'projects' },
    { type: 'faq' },
    { type: 'yellowBar', text: 'Schedule Your Free Window Consultation', href: '#contact' },
    { type: 'cta' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
  localFaqs: [
    {
      question: 'How much do replacement windows cost in the Bay Area?',
      answer:
        'Bay Area replacement window costs depend on style and frame material. Standard double-hung vinyl windows run $650 to $950 per unit installed. Premium fiberglass casement windows cost $1,000 to $1,500 per unit. Bay and bow windows range from $2,800 to $4,500 installed. A typical Bay Area home with 15 to 20 windows costs $12,000 to $25,000 for a full replacement. Every Hamilton Exteriors estimate is itemized — window units, trim, flashing, labor, and cleanup listed separately.',
    },
    {
      question: 'How do energy-efficient windows reduce utility bills?',
      answer:
        'ENERGY STAR certified windows can save Bay Area homeowners $125 to $465 per year on energy bills (U.S. Department of Energy, 2024). The key spec is the U-factor — lower is better. Hamilton Exteriors installs windows with U-factors as low as 0.25, exceeding California Title 24 requirements by 15 to 20%. Low-E glass coatings reflect infrared heat while letting visible light through, keeping homes cooler in summer and warmer in winter. For fog belt homes in Daly City, Pacifica, and the coast side, argon-filled double-pane glass provides the best balance of insulation and condensation resistance.',
    },
    {
      question: 'How long does a window replacement take?',
      answer:
        'Window replacements average 1 to 2 days for a typical Bay Area home with 10 to 15 windows. Each window takes approximately 45 to 90 minutes to remove, prep, install, insulate, flash, and trim. Larger projects (20+ windows or custom sizes) may take 3 days. We install one window at a time and seal each opening before moving to the next, so your home is never left open to the elements.',
    },
    {
      question: 'What window styles work best for Bay Area homes?',
      answer:
        'The best window style depends on your home\'s architecture and ventilation needs. Casement windows (hinged, crank-open) provide the best airflow and seal — ideal for Bay Area homes that rely on natural cooling. Double-hung windows are the most versatile and popular in Craftsman and Victorian homes. Sliding windows work well in mid-century modern and Eichler-style homes common in Sunnyvale, Palo Alto, and the South Bay. Bay and bow windows add light and space to living rooms — especially popular in San Francisco Victorians and Marin County homes.',
    },
    {
      question: 'Do replacement windows qualify for energy rebates in California?',
      answer:
        'Yes. ENERGY STAR certified windows may qualify for federal tax credits of up to $600 under the Inflation Reduction Act (through 2032). California also offers rebates through utility programs — PG&E and other Bay Area utilities periodically offer incentives for energy-efficient window upgrades. The NFRC (National Fenestration Rating Council) label on each window verifies the U-factor and Solar Heat Gain Coefficient that qualify for these programs. Hamilton Exteriors provides all documentation needed for rebate and tax credit applications.',
    },
  ],
};
