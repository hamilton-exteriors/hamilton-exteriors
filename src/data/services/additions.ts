import type { ServicePageData } from '../../lib/service-page-types';
import { serviceAdditions, serviceAdu, serviceCustomHomes, financingHouse } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'Home Additions & Construction in the Bay Area | Hamilton Exteriors',
  description:
    'Bay Area home additions, second stories & ADUs. Design, permits & construction under one roof. 50-year warranty. Call (650) 977-3351.',
  announcementText: 'Now Booking Summer 2026 Additions — Schedule Your Consultation',
  definition: 'A home addition expands an existing residence by adding new living space — either outward (room extension), upward (second story), or as a detached unit (ADU). Bay Area home additions typically cost $200 to $500 per square foot and require building permits from the local jurisdiction.',
  expertQuotes: [
    {
      quote: 'Second-story additions are the fastest-growing project type in the Bay Area because lot sizes average just 5,000 to 7,000 square feet — there is nowhere to go but up. Our structural engineers assess every existing foundation before we quote, because 60% of pre-1970 Bay Area homes need some reinforcement before adding a second floor.',
      author: 'Alexander Hamilton Li',
      credentials: 'Architect & General Contractor, CSLB #1082377',
    },
  ],
  hero: {
    headline: "Bay Area Home Additions —  Second Story to Ground Floor",
    formTitle: 'Get Your Free Consultation',
    formSubtitle:
      "We'll reach out within 3\u20135 minutes to discuss your project.",
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
        heading: 'What Types of Home Additions Does Hamilton Exteriors Build?',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Second Story Additions',
            description: 'Double your living area without sacrificing any yard space. 800\u20131,500 sq ft of new bedrooms, bathrooms, and primary suites built above your existing home.',
            image: serviceAdditions,
            href: '/additions/second-story',
          },
          {
            title: 'Room Extensions',
            description: 'Expand kitchens, bedrooms, and living rooms outward with additions that look original to your home. Most projects complete in 8\u201312 weeks.',
            image: financingHouse,
            href: '/additions/room-extensions',
          },
          {
            title: 'ADUs & Guest Houses',
            description: 'Detached backyard ADUs, garage conversions, and junior ADUs that add living space and $2,000\u2013$3,500/month in rental income.',
            image: serviceAdu,
            href: '/additions/adus-guest-houses',
          },
          {
            title: 'Full Remodels',
            description: 'Transform your outdated home into a modern living space while preserving the character that makes your neighborhood special.',
            image: serviceCustomHomes,
            href: '/additions/full-remodels',
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'comparison',
      data: {
        heading: 'Home Addition Comparison: Second Story vs. Room Extension vs. ADU vs. Full Remodel',
        columns: ['Second Story', 'Room Extension', 'ADU / Guest House', 'Full Remodel'],
        rows: [
          { feature: 'Cost per sq ft', values: ['$200–$400', '$175–$350', '$150–$350', '$150–$400'] },
          { feature: 'Typical size', values: ['800–1,500 sq ft', '200–600 sq ft', '400–1,200 sq ft', 'Entire home'] },
          { feature: 'Build time', values: ['16–24 weeks', '8–12 weeks', '4–6 months', '4–7 months'] },
          { feature: 'Yard space used', values: ['None', 'Some', 'Backyard footprint', 'None'] },
          { feature: 'Structural work', values: ['Foundation + framing', 'Foundation extension', 'New foundation', 'Assessment + reinforcement'] },
          { feature: 'Permits required', values: ['Full building permit', 'Building permit', 'ADU permit (streamlined)', 'Building permit'] },
          { feature: 'Resale ROI', values: ['65–75% (Remodeling Mag.)', '50–65%', '$150K–$300K value add', '75% (kitchen-focused)'] },
          { feature: 'Best for', values: ['Maximizing space, no yard loss', 'Targeted room expansion', 'Rental income, multigenerational', 'Outdated homes, full refresh'] },
        ],
        source: 'Remodeling Magazine 2024 Cost vs. Value Report (Pacific West), California Department of Housing and Community Development, Hamilton Exteriors project data 2024–2026',
      },
    },
    { type: 'projects' },
    { type: 'faq' },
    { type: 'yellowBar', text: 'Schedule Your Free Consultation', href: '#contact' },
    { type: 'cta' },
    { type: 'contactUs' },
    { type: 'footer' },
  ],
  localFaqs: [
    {
      question: 'How much does a home addition cost in the Bay Area?',
      answer:
        'Bay Area home additions typically cost $200 to $500 per square foot depending on scope and finishes. A 400 sq ft second-story addition runs $150,000 to $250,000 including structural engineering, permits, and construction. Room additions on the ground floor are generally $120,000 to $200,000. Kitchen and living extensions that require foundation work start at $175,000. Permit fees for additions in most Bay Area cities range from $5,000 to $15,000 depending on the scope and whether plan check expediting is available. Homes in older neighborhoods may also require seismic upgrades to the existing structure as a condition of the building permit — this typically adds $10,000 to $25,000 but brings your entire home up to current code. Every Hamilton Exteriors estimate is fully itemized so you can see exactly where your money goes.',
    },
    {
      question: 'Do I need a permit for a home addition in the Bay Area?',
      answer:
        'Yes. All home additions in the Bay Area require building permits from your local jurisdiction. This includes structural, electrical, plumbing, and mechanical permits. Most cities also require Title 24 energy compliance documentation and, for additions over a certain size, a fire sprinkler system that meets NFPA 13D standards. Hamilton Exteriors handles the entire permitting process — we prepare architectural drawings, structural engineering, Title 24 energy calculations, submit plans, schedule inspections, and coordinate with your city building department. Permit timelines vary: 4 to 8 weeks for most East Bay cities and 6 to 12 weeks in San Francisco and parts of the Peninsula. We submit plans digitally where jurisdictions allow it, which can reduce review times by 1 to 2 weeks.',
    },
    {
      question: 'How long does a home addition take to build?',
      answer:
        'Most Bay Area home additions complete in 12 to 20 weeks from permit approval. Second-story additions take 16 to 24 weeks due to the structural complexity of roof removal, floor framing, and re-roofing. Room extensions on an existing foundation complete faster at 10 to 14 weeks. The framing phase — when your addition takes physical shape — typically accounts for 3 to 5 weeks of the total timeline. Mechanical rough-in for electrical, plumbing, and HVAC follows, with drywall, finishes, and final inspections completing the project. Weather delays are uncommon during Bay Area dry season but can add 1 to 2 weeks during winter months. Your project manager provides a detailed schedule at contract signing and weekly progress updates with photos throughout construction.',
    },
    {
      question: 'Can I add a second story to my Bay Area home?',
      answer:
        'Most single-story Bay Area homes can support a second-story addition with proper structural engineering. Our structural engineers assess your existing foundation, framing, and soil conditions to determine if reinforcement is needed. Common upgrades include foundation bolting, cripple wall bracing, and moment frame installation to meet current California seismic standards (CBC Section 1613). The cost of structural reinforcement typically adds $15,000 to $40,000 to the project but brings your entire home up to modern earthquake resistance requirements. Second-story additions are especially popular in neighborhoods like Alameda, San Mateo, and parts of the South Bay where lot sizes limit ground-floor expansion. Adding a second story also avoids the need for additional foundation work, which can be the most expensive single line item on a ground-floor addition.',
    },
    {
      question: 'Will a home addition increase my property value?',
      answer:
        'Yes. According to Remodeling Magazine\'s 2024 Cost vs. Value report, well-executed home additions in the Pacific West region recoup 50 to 70% of their cost at resale. In the Bay Area\'s high-value market, additions that add bedrooms, bathrooms, or living space often return even more — particularly in neighborhoods where comparable homes with the added square footage sell at a significant premium. A 500 sq ft second-story master suite can add $200,000 or more to a Bay Area home\'s value depending on the neighborhood and school district. The key to maximizing return is designing the addition so it flows naturally with the existing home rather than looking like an afterthought. Hamilton Exteriors\' architect-led approach ensures every addition is designed to match the original architecture and maximize the home\'s long-term resale appeal.',
    },
  ],
};
