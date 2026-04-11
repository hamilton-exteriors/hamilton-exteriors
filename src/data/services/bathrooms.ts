import type { ServicePageData } from '../../lib/service-page-types';
import { serviceCustomHomes, serviceAdditions, financingHouse, designEngineering } from '../../lib/images';

export const data: ServicePageData = {
  title:
    'Bathroom Remodeling in the Bay Area | Hamilton Exteriors',
  description:
    'Full-service bathroom remodeling across the Bay Area. Custom tile, walk-in showers, vanities & fixtures. Design-build under one roof. CSLB #1082377. Call (650) 977-3351.',
  announcementText: 'Now Booking Summer 2026 Remodels — Schedule Your Consultation',
  definition: 'A bathroom remodel transforms an outdated or dysfunctional bathroom into a modern, efficient space — from cosmetic updates like tile and vanities to full gut renovations with new plumbing, waterproofing, and layout changes. Bay Area bathroom remodels typically cost $25,000 to $75,000 depending on scope and finishes.',
  expertQuotes: [
    {
      quote: 'The biggest mistake homeowners make with bathroom remodels is treating waterproofing as an afterthought. In the Bay Area, where homes shift on clay soils, proper waterproofing behind tile — Kerdi membrane or equivalent — is non-negotiable. We waterproof every shower and tub surround to prevent the mold and rot issues that plague 30 to 40 year old Bay Area bathrooms.',
      author: 'Alexander Hamilton Li',
      credentials: 'Architect & General Contractor, CSLB #1082377',
    },
  ],
  hero: {
    headline: 'Bay Area Bathroom Remodeling. Designed and Built Right',
    formTitle: 'Get Your Free Consultation',
    formSubtitle:
      "We'll reach out within 3\u20135 minutes to discuss your project.",
    ctaText: 'Call Now - We Answer Fast',
    heroImage: serviceCustomHomes,
    heroAlt: 'Modern bathroom remodel with custom tile and walk-in shower in the Bay Area',
    serviceType: 'Bathroom Remodel',
  },
  sections: [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    {
      type: 'styles',
      data: {
        heading: 'What Types of Bathroom Remodels Does Hamilton Exteriors Build?',
        cardVariant: 'roofing',
        items: [
          {
            title: 'Full Bathroom Renovations',
            description: 'Complete gut-and-rebuild of your bathroom — new layout, plumbing, tile, vanity, fixtures, and lighting. Most projects complete in 6 to 10 weeks.',
            image: serviceCustomHomes,
          },
          {
            title: 'Walk-In Shower Conversions',
            description: 'Replace outdated tub-shower combos with spacious, curbless walk-in showers featuring custom tile, frameless glass, and built-in niches.',
            image: financingHouse,
          },
          {
            title: 'Primary Suite Bathrooms',
            description: 'Luxury primary bathrooms with dual vanities, freestanding tubs, heated floors, and custom cabinetry designed to match your home.',
            image: designEngineering,
          },
          {
            title: 'Guest & Hall Bathrooms',
            description: 'Efficient, stylish updates for secondary bathrooms — new tile, modern vanities, and updated fixtures that elevate the entire home.',
            image: serviceAdditions,
          },
        ],
      },
    },
    { type: 'difference' },
    {
      type: 'comparison',
      data: {
        heading: 'Bathroom Remodel Comparison: Full Renovation vs. Cosmetic Update vs. Primary Suite vs. Guest Bath',
        columns: ['Full Renovation', 'Cosmetic Update', 'Primary Suite', 'Guest Bath'],
        rows: [
          { feature: 'Cost range', values: ['$40K–$75K', '$15K–$30K', '$50K–$100K', '$20K–$40K'] },
          { feature: 'Timeline', values: ['6–10 weeks', '2–4 weeks', '8–12 weeks', '4–6 weeks'] },
          { feature: 'Scope', values: ['Gut to studs', 'Surfaces & fixtures', 'Layout + luxury finishes', 'Fixtures & tile'] },
          { feature: 'Plumbing changes', values: ['Full re-pipe option', 'Fixture swap only', 'Layout relocation', 'Minor updates'] },
          { feature: 'Permits required', values: ['Yes (plumbing/electrical)', 'Usually not', 'Yes', 'Depends on scope'] },
          { feature: 'Waterproofing', values: ['Full membrane system', 'Spot repair', 'Full membrane system', 'Shower area only'] },
          { feature: 'ROI at resale', values: ['60–70%', '80–90% (low cost)', '55–65%', '65–75%'] },
          { feature: 'Best for', values: ['Outdated 1970s–90s baths', 'Quick refresh on budget', 'Dream bath, long-term home', 'Pre-sale or rental prep'] },
        ],
        source: 'Remodeling Magazine 2024 Cost vs. Value Report (Pacific West), Hamilton Exteriors project data 2024–2026',
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
      question: 'How much does a bathroom remodel cost in the Bay Area?',
      answer:
        'Bay Area bathroom remodels typically cost $25,000 to $75,000 depending on scope and finishes. A cosmetic refresh with new tile, vanity, and fixtures runs $15,000 to $30,000. A full gut renovation with layout changes, new plumbing, and custom tile starts at $40,000. Primary suite bathrooms with luxury finishes like heated floors, freestanding tubs, and frameless glass showers range from $50,000 to $100,000. Every Hamilton Exteriors estimate is fully itemized so you can see exactly where your money goes.',
    },
    {
      question: 'How long does a bathroom remodel take?',
      answer:
        'Most Bay Area bathroom remodels complete in 4 to 10 weeks from demolition to final walkthrough. Cosmetic updates with no plumbing changes take 2 to 4 weeks. Full renovations that move plumbing, install new waterproofing, and add custom tile take 6 to 10 weeks. The demolition and rough-in phase is typically 1 to 2 weeks, followed by waterproofing, tile installation, and fixture setting. Your project manager provides a detailed schedule at contract signing and weekly progress updates with photos.',
    },
    {
      question: 'Do I need a permit for a bathroom remodel?',
      answer:
        'In most Bay Area cities, you need permits if your remodel involves plumbing changes, electrical work, or structural modifications. Cosmetic updates like new tile, paint, and fixture swaps on existing connections typically do not require permits. Moving a toilet, adding a shower drain, or relocating electrical outlets all require building permits. Hamilton Exteriors handles the entire permitting process — we prepare plans, submit to your city, and schedule all inspections.',
    },
    {
      question: 'Should I replace my tub with a walk-in shower?',
      answer:
        'Walk-in showers are the most requested bathroom upgrade in the Bay Area. They add usable space, improve accessibility, and give bathrooms a modern look. A curbless walk-in shower with custom tile and frameless glass typically costs $8,000 to $15,000 as part of a larger remodel. One consideration: if your home has only one bathtub, some real estate agents recommend keeping at least one tub for resale value, particularly in homes marketed to families.',
    },
    {
      question: 'What waterproofing does Hamilton Exteriors use?',
      answer:
        'Every shower and tub surround we build gets a full waterproofing membrane — either Schluter Kerdi or equivalent sheet membrane — applied to all wet-area surfaces before any tile is set. This prevents moisture from reaching the wall framing, which is the leading cause of mold and rot in Bay Area bathrooms. We also use fiber cement backer board instead of standard drywall in all wet areas, and apply waterproofing at all seams, corners, and penetrations. Our waterproofing approach exceeds the minimum requirements of the Tile Council of North America (TCNA) handbook.',
    },
  ],
};
