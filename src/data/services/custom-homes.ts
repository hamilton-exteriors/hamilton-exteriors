import type { ServicePageData } from '../../lib/service-page-types';
import { serviceCustomHomesFull, serviceCustomHomes, serviceAdditions, designEngineering, designPlanning } from '../../lib/images';

export const data: ServicePageData = {
  title: 'Custom Home Builder in the Bay Area | Hamilton Exteriors',
  description:
    'Full-service custom home builder in the Bay Area. Design, architecture, engineering, permits & construction — all under one roof.',
  announcementText: 'Limited Time: Free Design Consultation for Custom Home Projects*',
  hero: {
    headline: "Bay Area's Best Custom Home Builder",
    formTitle: 'Get a FREE Consultation',
    formSubtitle:
      "Tell us about your dream home. We'll call within 5 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceCustomHomesFull,
    serviceType: 'Custom Home',
    badges: [
      'Licensed Bonded & Insured',
      'Start with $0 Down',
      '50-Year Warranty',
      'Custom Project Timelines',
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
        heading: 'Custom Home Services',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Ground-Up Construction',
            description:
              'Ground-up custom home construction gives Bay Area homeowners complete control over layout, materials, energy systems, and architectural style\u2014something no production builder or spec home can match. We manage every construction phase from site preparation and foundation pouring through framing, mechanical rough-ins, insulation, drywall, and final finishes. Our design-build approach keeps architecture, engineering, and construction under one contract with a single point of accountability, eliminating the finger-pointing and schedule delays that plague multi-contractor projects. Bay Area custom homes typically range from 2,000 to 5,000 square feet with construction timelines of 10\u201318 months depending on complexity. We build to exceed California\u2019s Title 24 energy standards, incorporating high-performance building envelopes, efficient HVAC systems, and solar-ready electrical panels. According to the National Association of Home Builders, custom homes retain 10\u201315% more value at resale than equivalent-sized production homes in the same neighborhood.',
            image: serviceCustomHomes,
          },
          {
            title: 'Design & Architecture',
            description:
              'Our in-house architects and designers collaborate with you from initial concept through construction-ready blueprints, using building information modeling (BIM) to create detailed 3D renderings that let you walk through your home virtually before a single board is cut. We design floor plans tailored to your lot\u2019s topography, setback requirements, solar orientation, and view corridors\u2014maximizing natural light and cross-ventilation while maintaining privacy from neighboring properties. Bay Area lots present unique challenges including steep hillside grades, expansive clay soils, and wildfire-urban interface building requirements that generic plan sets cannot address. Our design packages include architectural plans, structural calculations, electrical and plumbing layouts, Title 24 energy compliance documentation, and landscape integration concepts. According to the American Institute of Architects, homeowners who invest in custom architectural design spend 15\u201320% less on construction change orders compared to those who begin building from incomplete or generic plans.',
            image: designPlanning,
          },
          {
            title: 'Engineering & Permits',
            description:
              'Bay Area custom home permitting involves coordinating with planning departments, building divisions, fire districts, utility companies, and environmental agencies\u2014a process that can stretch 6\u201312 months without experienced management. We handle structural engineering designed to California\u2019s Seismic Design Category D requirements, geotechnical soils reports, Title 24 energy compliance calculations, and CalGreen mandatory green building standards. Our permit coordinators maintain active relationships with planning staff in Alameda, Contra Costa, Marin, Napa, and Santa Clara counties, which helps resolve plan check comments quickly and avoid costly redesigns. For hillside properties, we manage the additional requirements of geologic hazard assessments, grading permits, and drainage engineering that Bay Area jurisdictions require. According to the UC Berkeley Terner Center for Housing Innovation, permit processing time varies by 40\u201360% across Bay Area cities\u2014our experience with each jurisdiction helps us set realistic timelines and avoid the delays that derail budgets.',
            image: designEngineering,
          },
          {
            title: 'Additions & Renovations',
            description:
              'Home additions and major renovations allow Bay Area homeowners to expand living space without the cost and disruption of selling and purchasing a new home\u2014particularly compelling in a market where the median home price exceeds $1.2 million according to the California Association of Realtors. We specialize in second-story additions, room extensions, kitchen and bathroom expansions, and whole-house renovations that seamlessly integrate with your home\u2019s existing architecture. Our structural engineers assess load-bearing walls, foundation capacity, and lateral bracing requirements before construction begins, ensuring additions meet California seismic standards. We match existing rooflines, siding profiles, window styles, and interior finishes so the new construction looks original to the home. Most room additions complete in 10\u201316 weeks from permit approval. For gut renovations, we coordinate all trades\u2014demolition, framing, electrical, plumbing, HVAC, insulation, drywall, and finishing\u2014under a single construction contract with weekly progress updates and transparent change order pricing.',
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
