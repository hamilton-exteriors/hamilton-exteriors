import type { ServicePageData } from '../../lib/service-page-types';
import { aduHero, serviceAdu, serviceAdditions, financingHouse, financingWorker } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'ADU Builder in the San Francisco Bay Area | Design & Construction Experts | Hamilton Exteriors',
  description:
    'Hamilton Exteriors is a full-service ADU builder in the Bay Area. Design, architecture, engineering, permitting, and construction — all under one roof.',
  announcementText: 'Limited Time: Free ADU Design Consultation + Permit Guarantee*',
  hero: {
    headline: "Bay Area's Best ADU Builder",
    formTitle: 'Get a FREE ADU Consultation',
    formSubtitle:
      "We'll contact you in 3-5 minutes to discuss your ADU project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: aduHero,
    heroAlt: 'Accessory dwelling unit under construction in the Bay Area',
    serviceType: 'ADU',
    badges: [
      'Licensed Bonded & Insured',
      'Start with $0 Down',
      '50-Year Warranty',
      '8-12 Week Builds',
    ],
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
        heading: 'What ADU Services Does Hamilton Exteriors Offer?',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Detached ADUs',
            description:
              'Detached accessory dwelling units are standalone structures built in your backyard, offering maximum privacy, independent utility connections, and the highest rental income potential of any ADU type. California\u2019s AB 68 and SB 9 legislation streamlined ADU permitting statewide, and the Bay Area has led adoption\u2014Alameda County alone approved over 1,200 ADU permits in 2024 according to the California Department of Housing and Community Development. Our detached ADUs range from 400 to 1,200 square feet and include full kitchens, bathrooms, living areas, and private entrances. We build on concrete slab or raised foundations depending on site conditions and local soil reports. Bay Area homeowners building detached ADUs typically see property value increases of $150,000\u2013$300,000 and rental income of $2,000\u2013$3,500 per month, making ADU construction one of the highest-ROI home improvements available in the current housing market.',
            image: serviceAdu,
          },
          {
            title: 'Design & Architecture',
            description:
              'Our in-house architects create custom ADU floor plans, 3D renderings, and full construction document sets tailored to your specific lot dimensions, setback requirements, and personal vision. We use building information modeling (BIM) software to detect conflicts before construction begins, reducing change orders and delays. Every design maximizes usable square footage within local zoning codes while optimizing for natural light, cross-ventilation, and privacy from the main home and neighboring properties. Bay Area ADU zoning varies significantly by jurisdiction\u2014Oakland allows ADUs up to 850 square feet on most residential lots, while San Jose permits up to 1,200 square feet with specific setback rules. Our architects navigate these variations daily, often finding 10\u201315% more buildable area than homeowners expect. Design packages include site plans, floor plans, elevations, electrical layouts, plumbing schematics, and Title 24 energy compliance calculations required for permit submission.',
            image: financingHouse,
          },
          {
            title: 'Engineering & Permits',
            description:
              'ADU permitting in the Bay Area involves structural engineering, soils reports, Title 24 energy compliance, and coordination with planning, building, and fire departments\u2014a process that overwhelms most homeowners attempting to self-manage. We handle the entire permit process from initial application through final inspection sign-off, backed by our 60-day permit guarantee for standard ADU projects. Our structural engineers design foundations, framing, and lateral bracing systems that meet California\u2019s Seismic Design Category D requirements, critical in the earthquake-active Bay Area. According to the UC Berkeley Terner Center for Housing Innovation, the average Bay Area ADU permit takes 4\u20138 months when self-managed versus 6\u201310 weeks with an experienced design-build firm. We maintain active relationships with permitting staff in Alameda, Contra Costa, Marin, Napa, and Santa Clara counties, which helps resolve plan check comments quickly and avoid costly resubmissions.',
            image: financingWorker,
          },
          {
            title: 'Garage Conversions',
            description:
              'Garage conversions are the most cost-effective ADU option in the Bay Area, typically costing 30\u201340% less than new detached construction because the existing foundation, framing, and roof structure remain in place. California law (AB 68) prohibits cities from requiring replacement parking when converting a garage to an ADU, removing the most common historical barrier to this approach. Our garage conversion process includes structural assessment and reinforcement as needed, new insulation meeting Title 24 requirements, upgraded electrical service (typically from 100A to 200A panel), plumbing rough-in for kitchen and bathroom, drywall, flooring, and interior finishes. Most garage conversions complete in 8\u201312 weeks from permit approval. We also handle the exterior transformation\u2014replacing the garage door opening with insulated wall, windows, and an entry door that blends seamlessly with your home\u2019s existing architecture.',
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
  localFaqs: [
    {
      question: 'How much does it cost to build an ADU in the Bay Area?',
      answer:
        'Bay Area ADU costs range from $150,000 to $350,000 for a detached unit and $100,000 to $200,000 for a garage conversion. Junior ADUs (JADUs under 500 sq ft) start around $80,000. Key cost factors include foundation type, utility connections, finishes, and local permit fees. Hamilton Exteriors provides itemized estimates with no hidden costs.',
    },
    {
      question: 'Do I need a permit to build an ADU in California?',
      answer:
        'Yes. California\u2019s ADU laws (AB 68, SB 13, AB 881) streamlined permitting statewide, but you still need building permits from your local jurisdiction. Most Bay Area cities must approve or deny ADU permits within 60 days. Hamilton Exteriors handles the full permitting process — architectural plans, engineering, plan check submittal, and inspection coordination.',
    },
    {
      question: 'How long does it take to build an ADU?',
      answer:
        'From permit approval, most detached ADUs complete in 4 to 6 months. Garage conversions are faster at 2 to 4 months since the shell already exists. The permitting phase adds 2 to 4 months depending on your city\u2019s backlog. Total timeline from design to move-in is typically 8 to 12 months. We provide a detailed schedule at contract signing.',
    },
    {
      question: 'Can I build an ADU on my property?',
      answer:
        'Under California law, most single-family residential lots can accommodate at least one ADU. Since January 2020, cities cannot impose minimum lot size requirements for ADUs under 800 sq ft. Setback requirements have been reduced to 4 feet for rear and side yards. Hamilton Exteriors evaluates your lot for utility access, setbacks, and local overlay zones during our free consultation.',
    },
    {
      question: 'Can I rent out my ADU?',
      answer:
        'Yes. California law explicitly allows homeowners to rent ADUs as long-term rentals. Some cities restrict short-term rentals (under 30 days) in ADUs, so check your local ordinance. An ADU in the Bay Area typically rents for $1,800 to $3,500 per month depending on size, location, and finishes — often covering the construction loan payment within a few years.',
    },
  ],
};
