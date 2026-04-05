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
  hero: {
    headline: 'Best Window  Company in  the Bay Area',
    formTitle: 'Get A FREE Window Quote',
    formSubtitle:
      "We'll contact you in 3-5 minutes to schedule a FREE Window inspection.",
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
            description:
              'Single hung windows are the most common window type in Bay Area homes built before 1990, featuring a fixed upper sash and a movable lower sash that slides vertically for ventilation. Modern single hung replacements from Milgard and Andersen use dual-pane Low-E glass with argon gas fill, achieving U-factors as low as 0.25\u2014exceeding California\u2019s Title 24 energy requirements by 15\u201320%. The fixed upper sash provides better air and water infiltration resistance than double hung designs, while the simpler mechanism keeps installed cost $75\u2013$100 lower per window. Bay Area homeowners replacing original aluminum single hung windows from the 1960s\u201380s typically see a 15\u201325% reduction in heating and cooling costs, according to the Department of Energy\u2019s ENERGY STAR program. We install single hung windows in vinyl, fiberglass, and wood-clad frames with tilt-in sash for easy interior cleaning\u2014no ladder required.',
          },
          {
            title: 'Single Slider',
            image: windowCasement,
            description:
              'Single slider windows feature one fixed pane and one horizontally sliding pane, making them ideal for rooms where an outward-opening window is impractical\u2014above kitchen sinks, along walkways, or on ground-floor facades near landscaping. The horizontal operation requires no exterior clearance, which is why Bay Area homes with narrow side yards and zero-lot-line setbacks frequently choose sliders. We install Milgard Trinsic and Andersen 100 Series single sliders with dual-pane Low-E glass, achieving U-factors of 0.27 and qualifying for California utility rebate programs. The contemporary horizontal profile complements mid-century modern, ranch, and Eichler-style homes common throughout the South Bay and Peninsula. Our single slider installations include new exterior aluminum flashing, interior wood or PVC trim, and foam-sealed jambs that eliminate the air leaks responsible for up to 30% of residential energy loss according to the U.S. Department of Energy.',
          },
          {
            title: 'Sliding Glass Doors',
            image: windowSliding,
            description:
              'Sliding glass doors transform how Bay Area homeowners connect indoor living spaces with patios, decks, and gardens\u2014essential in a climate where outdoor living extends 9\u201310 months per year. Modern sliding glass doors from Milgard, Andersen, and Marvin feature dual or triple-pane Low-E glass with argon fill, stainless steel or fiberglass rollers rated for 75,000+ cycles, and multi-point locking hardware that meets California forced-entry resistance standards. Standard configurations range from 5 to 12 feet wide, with custom multi-panel options reaching 16+ feet for true indoor-outdoor flow. We install sliding glass doors with proper structural headers, recessed sill pans for waterproofing, and ADA-compliant thresholds where specified. Bay Area homeowners replacing single-pane aluminum sliders from the 1970s\u201380s gain dramatic improvements in noise reduction (STC ratings of 28\u201334), thermal insulation, and security.',
          },
          {
            title: 'Picture Windows',
            image: windowBay,
            description:
              'Picture windows are large, fixed-pane installations designed to maximize natural light, frame views, and create a focal point in any room. Because they do not open, picture windows achieve the highest energy efficiency ratings of any window type\u2014U-factors as low as 0.20 with triple-pane glass\u2014and provide superior air and water infiltration resistance. In the Bay Area, picture windows are especially popular in hillside homes throughout the Oakland Hills, Marin headlands, and Peninsula foothills where panoramic views of the Bay, the Golden Gate, or Mt. Tamalpais define the property\u2019s character. We install picture windows in sizes up to 8 feet wide and 6 feet tall, using tempered or laminated safety glass where required by California building code (within 18 inches of the floor or adjacent to doors). Our installations include structural framing verification, exterior head flashing, and silicone-sealed perimeter joints that prevent the water intrusion common with Bay Area wind-driven rain.',
          },
          {
            title: 'Double Hung',
            image: windowPicture,
            description:
              'Double hung windows are the classic American window style, featuring two independently operable sashes that slide vertically. The ability to open both top and bottom sashes simultaneously creates a natural convection loop\u2014warm air exits through the top while cooler air enters from the bottom\u2014reducing reliance on mechanical cooling during Bay Area\u2019s mild shoulder seasons. Modern double hung windows from Andersen, Marvin, and Pella include tilt-in sashes for safe interior cleaning, integrated window screens, and cam-action locks that compress weatherstripping for an airtight seal. We install double hung windows in wood, fiberglass, vinyl, and aluminum-clad frames. The traditional double hung profile is architecturally appropriate for Victorian, Craftsman, Colonial Revival, and Edwardian homes found throughout San Francisco, Berkeley, Oakland\u2019s Rockridge, and Alameda\u2019s Gold Coast\u2014neighborhoods where period-accurate window replacements preserve both character and property value.',
          },
          {
            title: 'Casement Windows',
            image: windowGarden,
            description:
              'Casement windows open outward on side hinges via a crank mechanism, creating a fully unobstructed opening that captures 50\u201390% more airflow than sliding or hung windows according to the American Architectural Manufacturers Association. When closed, the sash compresses against the frame on all four sides, producing the tightest seal of any operable window type\u2014U-factors as low as 0.22 with dual-pane Low-E glass. This superior seal makes casement windows the top choice for Bay Area fog belt homes in Daly City, Pacifica, and the Sunset District where wind-driven moisture penetration is a persistent challenge. We install casement windows from Andersen, Marvin, and Milgard in both traditional and contemporary profiles. The outward-opening design works best on upper floors or facing backyards where the open sash won\u2019t obstruct walkways. Our installations include folding crank hardware for easy operation, multi-point locking systems, and egress-compliant sizing for bedrooms as required by California building code.',
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
    { type: 'projects' },
    { type: 'yellowBar', text: 'Schedule a FREE Inspection', href: '#contact' },
    { type: 'cta' },
    { type: 'faq' },
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
