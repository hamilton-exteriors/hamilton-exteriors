import type { ServicePageData } from '../../lib/service-page-types';
import { serviceAdditions, serviceAdu, serviceCustomHomes, financingHouse } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'Home Additions & Construction in the Bay Area | Hamilton Exteriors',
  description:
    'Bay Area home additions, second stories & ADUs. Design, permits & construction under one roof. 50-year warranty. Call (650) 977-3351.',
  announcementText: 'Limited Time: Free Design Consultation for Your Addition Project*',
  hero: {
    headline: "Bay Area's Best Home Addition Builder",
    formTitle: 'Get a FREE Consultation',
    formSubtitle:
      "We'll contact you in 3-5 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceAdditions,
    heroAlt: 'Home addition and second-story expansion in the Bay Area',
    serviceType: 'Addition',
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
        heading: 'What We Build',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Second Story Additions',
            description:
              'Second story additions are the most space-efficient way to expand a Bay Area home\u2014doubling living area without sacrificing any yard space on lots that average just 5,000\u20137,000 square feet in cities like Oakland, Berkeley, and San Jose. Our structural engineers design reinforced foundations and framing systems that support the additional load while meeting California\u2019s Seismic Design Category D requirements for earthquake resistance. The process begins with a feasibility assessment of your existing foundation, wall framing, and soil conditions to determine whether reinforcement is needed before vertical construction begins. Most second story additions add 800\u20131,500 square feet and include 2\u20133 bedrooms, a bathroom, and often a primary suite with walk-in closet. Construction typically takes 10\u201314 weeks from permit approval. According to Remodeling Magazine\u2019s Cost vs. Value report, second-story additions in the Pacific West return 65\u201375% of construction cost at resale\u2014and in the Bay Area\u2019s competitive housing market, the value recovery is often higher.',
            image: serviceAdditions,
          },
          {
            title: 'Room Extensions',
            description:
              'Room extensions expand your existing floor plan outward\u2014adding square footage to kitchens, bedrooms, living rooms, or creating entirely new spaces like sunrooms and family rooms. In the Bay Area, where the median home was built before 1970 according to U.S. Census data, room extensions address the most common complaint among homeowners: floor plans designed for a different era that lack open-concept kitchens, primary suites, or home office space. We handle structural engineering for load-bearing wall removal, foundation extensions with proper tie-ins to existing footings, and roofline integration that makes the addition look original to the home. Our finish carpenters match existing trim profiles, window casings, and baseboard details so transitions between old and new construction are invisible. Most room extensions add 200\u2013600 square feet and complete in 8\u201312 weeks from permit approval. We coordinate all trades under a single contract\u2014no juggling separate contractors for framing, electrical, plumbing, and finishes.',
            image: financingHouse,
          },
          {
            title: 'ADUs & Guest Houses',
            description:
              'Accessory dwelling units are the Bay Area\u2019s fastest-growing housing type, with over 4,000 ADU permits issued across the five-county region in 2024 according to the California Department of Housing and Community Development. We build detached backyard ADUs from 400 to 1,200 square feet, convert existing garages into fully finished living spaces, and construct junior ADUs within the footprint of your existing home. Every ADU project includes design, engineering, permit management, and construction under our 60-day permit guarantee. California\u2019s AB 68 and SB 9 legislation eliminated most local barriers to ADU construction, including minimum lot size requirements, owner-occupancy mandates, and parking replacement rules for garage conversions. Bay Area homeowners building ADUs typically add $150,000\u2013$300,000 in property value while generating $2,000\u2013$3,500 per month in rental income\u2014making ADU construction one of the highest-ROI improvements available in the current housing market.',
            image: serviceAdu,
          },
          {
            title: 'Full Remodels',
            description:
              'Whole-house remodels transform outdated Bay Area homes into modern living spaces while preserving the character and neighborhood context that make your location valuable. Our gut renovation process begins with selective demolition, followed by structural assessment and reinforcement where needed, updated electrical service (most pre-1980 Bay Area homes need panel upgrades from 100A to 200A), repiped plumbing replacing galvanized or polybutylene supply lines, modern insulation meeting current Title 24 energy standards, and complete interior finishing. We coordinate every trade\u2014demolition, framing, electrical, plumbing, HVAC, insulation, drywall, flooring, cabinetry, and painting\u2014under one construction contract with a single project manager providing weekly updates and transparent change order pricing. According to the National Association of Realtors, a major kitchen remodel alone returns 75% of cost at resale in the Pacific West region. Full remodels typically take 4\u20137 months depending on scope and permit requirements.',
            image: serviceCustomHomes,
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
