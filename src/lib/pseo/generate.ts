/**
 * pSEO page generators.
 *
 * Produces fully-populated page data for:
 *   1. General city pages  (mini-homepages per city)
 *   2. City+service pages  (e.g. "Roofing in Oakland")
 *
 * All content is deterministic — no randomness — so builds are reproducible.
 * The {neighborhood} token rotates based on a simple hash of the interpolation
 * context so each page gets a different neighborhood without Math.random().
 */

import type { GeneralCityPageData } from '../general-city-types';
import type { CityServicePageData } from '../city-service-types';
import type { HeroProps, SectionBlock, LocalContextSection, CityPricingSection, NeighborhoodServiceSection } from '../service-page-types';
import type { CitySeed } from './city-seed-data';
import type { ServiceTemplate } from './service-templates';
import { CITY_SEEDS } from './city-seed-data';
import { getCountyLocalFaqs } from './local-faqs';


// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Simple string hash for deterministic neighborhood selection.
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // 32-bit int
  }
  return Math.abs(hash);
}

/**
 * Pick a neighborhood deterministically from the seed based on context string.
 */
function pickNeighborhood(seed: CitySeed, context: string): string {
  const idx = hashCode(context) % seed.neighborhoods.length;
  return seed.neighborhoods[idx];
}

/**
 * Replace template tokens with city-specific values.
 *
 * Supported tokens: {city}, {county}, {neighborhood}, {medianHomePrice},
 * {population}, {keyFeature}, {serviceName}, plus any extra vars.
 */
export function interpolate(
  pattern: string,
  vars: Record<string, string>,
): string {
  return pattern.replace(/\{(\w+)\}/g, (match, key) => vars[key] ?? match);
}

/**
 * Build the standard vars object from a CitySeed, using a context string
 * to deterministically pick a neighborhood.
 */
function buildVars(
  seed: CitySeed,
  context: string,
  extra: Record<string, string> = {},
): Record<string, string> {
  return {
    city: seed.city,
    county: seed.county,
    neighborhood: pickNeighborhood(seed, context),
    medianHomePrice: seed.medianHomePrice,
    population: seed.population,
    keyFeature: seed.keyFeature,
    homeStyles: seed.homeStyles,
    climateFactor: seed.climateFactor,
    commonIssue: seed.commonIssue,
    microclimate: seed.microclimate,
    eraBreakdown: seed.eraBreakdown,
    roofingNote: seed.roofingNote,
    sidingNote: seed.sidingNote,
    windowNote: seed.windowNote,
    climateZone: String(seed.climateZone),
    priceTier: seed.priceTier,
    ...extra,
  };
}

// ── Local FAQ Content ──────────────────────────────────────────────────────
// County-level FAQs imported from local-faqs.ts (single source of truth).
// City-level FAQs are generated below from seed data.

/**
 * Generate one city-specific FAQ using unique local context from the seed data.
 */
function getCityLocalFaqs(seed: CitySeed): Array<{ question: string; answer: string }> {
  const { city, county, medianHomePrice, keyFeature, neighborhoods, population, homeStyles, climateFactor, commonIssue, microclimate, roofingNote, sidingNote } = seed;
  const n0 = neighborhoods[0];
  const n1 = neighborhoods[Math.min(1, neighborhoods.length - 1)];

  return [
    {
      question: `Why do ${city} homeowners choose Hamilton Exteriors?`,
      answer: `${city} is ${keyFeature}, with housing stock that includes ${homeStyles}. These homes face specific challenges: ${commonIssue}. With median home values at ${medianHomePrice}, exterior work is a significant investment that demands a contractor who understands ${city}'s unique conditions. Hamilton Exteriors brings local knowledge of ${county} County building codes, Title 24 Climate Zone ${seed.climateZone} requirements, and climate-specific material selection to every project.`,
    },
    {
      question: `What neighborhoods in ${city} does Hamilton Exteriors serve?`,
      answer: `We serve all ${city} neighborhoods including ${neighborhoods.slice(0, 5).join(', ')}, and surrounding areas. With a population of ${population}, ${city} has a wide range of home styles — ${homeStyles}. Our crews are familiar with the architectural character of each neighborhood and carry materials suited to ${city}'s climate: ${microclimate}`,
    },
    {
      question: `What exterior problems are most common in ${city}?`,
      answer: `${city}'s climate — ${climateFactor} — creates specific challenges for homeowners. The most common issues we see are ${commonIssue}. For roofing, ${roofingNote} For siding, ${sidingNote} Hamilton Exteriors selects materials proven to perform in ${city}'s conditions and backs every installation with our 50-year warranty.`,
    },
    {
      question: `Does a new roof or siding increase home value in ${city}?`,
      answer: `Yes. With ${city}'s median home value at ${medianHomePrice}, exterior upgrades deliver strong ROI. A new roof recoups 60-65% of its cost at resale in the Bay Area, while fiber cement siding (James Hardie) recovers up to 86%. In competitive ${city} neighborhoods like ${n0} and ${n1}, curb appeal directly impacts days on market and final sale price. Hamilton Exteriors helps ${city} homeowners choose materials that maximize both protection and resale value.`,
    },
  ];
}

// ── Shared constants ──────────────────────────────────────────────────────

/** Price ranges by market tier — used by both general city and city+service pages */
const PRICE_RANGES: Record<string, { roof: string; siding: string; windows: string; adu: string; decks: string }> = {
  budget: { roof: '$15,000–$22,000', siding: '$14,000–$28,000', windows: '$350–$600 per window', adu: '$140,000–$375,000', decks: '$12,000–$25,000' },
  mid: { roof: '$18,000–$30,000', siding: '$18,000–$34,000', windows: '$450–$800 per window', adu: '$180,000–$400,000', decks: '$15,000–$45,000' },
  premium: { roof: '$18,000–$45,000', siding: '$24,000–$42,000', windows: '$500–$1,000 per window', adu: '$210,000–$450,000', decks: '$20,000–$60,000' },
  luxury: { roof: '$18,000–$40,000', siding: '$34,000–$65,000', windows: '$800–$1,500+ per window', adu: '$300,000–$600,000', decks: '$30,000–$100,000' },
};

/** Map service slug to the price key in PRICE_RANGES */
const SERVICE_PRICE_KEY: Record<string, 'roof' | 'siding' | 'windows' | 'adu' | 'decks'> = {
  roofing: 'roof',
  siding: 'siding',
  windows: 'windows',
  adu: 'adu',
  'custom-homes': 'adu',
  additions: 'adu',
  decks: 'decks',
};

// ── Climate-aware styles ──────────────────────────────────────────────────

/**
 * Climate-specific suffixes for roofing style descriptions.
 * Keyed by style title → climate zone or climate keyword.
 */
const ROOFING_CLIMATE_NOTES: Record<string, Record<string, string>> = {
  'Asphalt Shingles': {
    fire: 'In fire-prone areas, Class A–rated architectural shingles provide the fire resistance required by Chapter 7A while delivering strong curb appeal.',
    fog: 'In fog-heavy microclimates, algae-resistant shingles with copper granules prevent the dark streaking common on north-facing slopes.',
    heat: 'In inland areas with 90°F+ summers, cool-roof-rated shingles (like Owens Corning Duration COOL) reflect solar heat and meet Title 24 cool-roof requirements.',
    default: 'Architectural shingles rated for your local Title 24 climate zone balance durability, curb appeal, and code compliance.',
  },
  'Metal Roofs': {
    fire: 'Standing seam metal is inherently Class A fire-rated and ember-resistant — ideal for homes in Very High Fire Hazard Severity Zones.',
    fog: 'Factory-applied Kynar finishes resist the salt-air corrosion and moisture common in coastal and fog-belt areas.',
    heat: 'Metal\'s high solar reflectance index (SRI 25+) can reduce attic temperatures by 20-30°F in hot inland valleys.',
    default: 'Metal roofing\'s 50-year lifespan and energy efficiency make it a strong long-term investment for Bay Area homeowners.',
  },
  'Tile Shingles': {
    fire: 'Concrete and clay tile are non-combustible and naturally Class A fire-rated — the highest fire protection available for residential roofing.',
    fog: 'Tile\'s dense composition resists the moisture absorption that causes rot in wood products, but proper underlayment is critical in high-humidity zones.',
    heat: 'The thermal mass of tile creates an air gap above the deck that reduces heat transfer — a significant advantage in climate zones with extreme summer temperatures.',
    default: 'Tile roofing offers 50+ year durability with minimal maintenance, and its weight requires proper structural evaluation before installation.',
  },
  'Energy Roofs': {
    fire: 'GAF Energy solar shingles are Class A fire-rated and ICC-certified, meeting WUI requirements while generating clean energy.',
    fog: 'Solar output varies by microclimate — south-facing slopes above the fog line produce 15-20% more energy than coastal sites in the same city.',
    heat: 'High UV exposure in inland valleys means faster solar ROI — most homeowners recoup installation costs 2-3 years sooner than coastal counterparts.',
    default: 'The GAF Energy system integrates solar directly into roofing materials, combining energy production with traditional roof protection.',
  },
};

const SIDING_CLIMATE_NOTES: Record<string, Record<string, string>> = {
  'Vinyl Siding': {
    fire: 'In fire zones, vinyl alone doesn\'t meet Chapter 7A — pair it with fire-resistant sheathing or consider fiber cement for WUI-compliant installations.',
    fog: 'Marine-grade vinyl formulations resist the UV degradation and moisture issues common in fog-belt and coastal environments.',
    heat: 'Choose lighter colors in hot inland areas — dark vinyl can soften and warp when surface temperatures exceed 160°F on west-facing walls.',
    default: 'Vinyl siding offers low maintenance and decades of weather resistance at a lower price point than fiber cement or wood.',
  },
  'Fiber Cement Siding': {
    fire: 'James Hardie fiber cement is non-combustible and meets ASTM E136 — the preferred siding material for homes in Very High Fire Hazard Severity Zones.',
    fog: 'HardiePlank\'s ColorPlus finish resists the moisture and salt-air damage that deteriorates wood siding within 5-10 years in coastal microclimates.',
    heat: 'Fiber cement\'s dimensional stability means it won\'t expand, contract, or warp in the 40-degree temperature swings common in inland valleys.',
    default: 'James Hardie fiber cement siding carries a 30-year warranty and resists fire, pests, and moisture — the most durable option for Bay Area homes.',
  },
  'Stucco Siding': {
    fire: 'Three-coat stucco over metal lath provides a 1-hour fire rating — one of the most fire-resistant wall assemblies available for residential construction.',
    fog: 'Stucco in coastal zones requires elastomeric coating to prevent the hairline cracking that lets moisture penetrate behind the finish coat.',
    heat: 'Stucco\'s thermal mass moderates interior temperatures in hot climates, but expansion joints are critical where summer temperatures regularly exceed 95°F.',
    default: 'Stucco provides a seamless, durable exterior with excellent fire and weather resistance — a natural fit for California architecture.',
  },
  'Waterproofing': {
    fire: 'Fire-rated waterproofing membranes protect the building envelope even when exterior cladding is compromised during wildfire ember exposure.',
    fog: 'In fog-belt and coastal areas, waterproofing isn\'t optional — persistent moisture drives mold growth and structural rot behind siding within years, not decades.',
    heat: 'UV-stable waterproofing membranes prevent the thermal cycling damage that breaks down standard moisture barriers in high-heat climate zones.',
    default: 'Comprehensive waterproofing — moisture barriers, flashing, and caulking — protects your home\'s structure behind whatever siding material you choose.',
  },
};

const WINDOW_CLIMATE_NOTES: Record<string, Record<string, string>> = {
  'Single Hung': {
    fog: 'In fog-belt areas, choose vinyl or fiberglass frames — wood windows require constant maintenance in high-humidity microclimates.',
    heat: 'Low-E coatings with argon gas fill block solar heat gain while maintaining views — essential for comfort in inland climate zones.',
    default: 'A fixed upper sash and movable lower sash provide classic style and reliable ventilation with lower cost than double-hung options.',
  },
  'Single Slider': {
    fog: 'Weep holes and drainage channels are critical in fog-heavy areas to prevent condensation pooling along the sill track.',
    heat: 'Horizontal sliders maximize ventilation for cross-breezes that naturally cool homes in inland valleys where AC costs add up.',
    default: 'A horizontal slider is space-efficient and easy to operate, with one fixed pane and one sliding pane for controlled airflow.',
  },
  'Sliding Glass Doors': {
    fog: 'Marine-grade hardware and sealed tracks prevent the corrosion and sticking common in coastal and fog-belt installations.',
    heat: 'Dual-pane Low-E glass with Solar Heat Gain Coefficient under 0.25 keeps indoor temperatures comfortable without blocking natural light.',
    default: 'Large glass panels glide smoothly on tracks, offering easy indoor-outdoor access, natural light, and a sleek profile.',
  },
  'Picture Windows': {
    fog: 'Fixed panes are inherently more weather-tight than operable windows — ideal for exposed coastal walls where wind-driven rain is an issue.',
    heat: 'Spectrally selective Low-E coatings block infrared heat while transmitting visible light — views without the heat gain.',
    default: 'A large fixed-pane window provides expansive views and abundant natural light while improving energy efficiency.',
  },
  'Double Hung': {
    fog: 'Both sashes tilt in for cleaning — critical on upper floors where exterior access is limited by the steep lots common in hilly Bay Area cities.',
    heat: 'Open the top sash to vent hot air and the bottom sash to draw in cooler air — natural convection cooling that reduces AC load.',
    default: 'Two movable sashes provide versatile ventilation and easy tilt-in cleaning, fitting a wide range of architectural styles.',
  },
  'Casement Windows': {
    fog: 'Compression seals on all four sides make casement windows the most weather-tight operable option — important where wind-driven rain is common.',
    heat: 'Crank-open casements catch cross-breezes from any direction, providing the best natural ventilation of any window type for passive cooling.',
    default: 'A single sash opens outward on hinges via a crank, providing excellent ventilation, unobstructed views, and a tight seal.',
  },
};

/**
 * Determine the primary climate keyword for a city based on its seed data.
 * Used to select the right climate-specific style description variant.
 */
function getClimateKeyword(seed: CitySeed): 'fire' | 'fog' | 'heat' | 'default' {
  const cf = (seed.climateFactor + ' ' + seed.roofingNote).toLowerCase();
  // Fire zones take priority (life safety)
  if (cf.includes('vhfhsz') || cf.includes('fire zone') || cf.includes('fire-rated') || cf.includes('wildfire') || cf.includes('wui')) {
    return 'fire';
  }
  // Fog / coastal / marine next
  if (cf.includes('fog') || cf.includes('marine') || cf.includes('salt air') || cf.includes('coastal')) {
    return 'fog';
  }
  // Hot inland
  if (cf.includes('95') || cf.includes('100') || cf.includes('105') || cf.includes('hot') || cf.includes('inland')) {
    return 'heat';
  }
  return 'default';
}

/**
 * Get the climate notes lookup for a given service.
 */
function getClimateNotesForService(serviceSlug: string): Record<string, Record<string, string>> | null {
  switch (serviceSlug) {
    case 'roofing': return ROOFING_CLIMATE_NOTES;
    case 'siding': return SIDING_CLIMATE_NOTES;
    case 'windows': return WINDOW_CLIMATE_NOTES;
    default: return null;
  }
}

/**
 * Enhance a style item description with climate-specific context for a city.
 * For services without climate notes (ADU, custom-homes, additions), returns original description.
 */
function localizeStyleDescription(
  seed: CitySeed,
  serviceSlug: string,
  title: string,
  originalDescription: string,
): string {
  const notesMap = getClimateNotesForService(serviceSlug);
  if (!notesMap) return originalDescription;

  const styleNotes = notesMap[title];
  if (!styleNotes) return originalDescription;

  const keyword = getClimateKeyword(seed);
  const note = styleNotes[keyword] || styleNotes['default'] || '';
  if (!note) return originalDescription;

  // Append the climate-specific note to the original description
  return `${originalDescription} ${note}`;
}

// ── City+Service content helpers ──────────────────────────────────────────

/**
 * Get the service-specific note from seed data.
 * For ADU/custom-homes/additions, compose from multiple fields.
 */
function getServiceNote(seed: CitySeed, serviceSlug: string): string {
  switch (serviceSlug) {
    case 'roofing':
      return seed.roofingNote;
    case 'siding':
      return seed.sidingNote;
    case 'windows':
      return seed.windowNote;
    case 'adu':
      return `With ${seed.eraBreakdown.split(',')[0]?.trim() || 'a mix of housing eras'} in ${seed.city}, many properties have room for an ADU alongside the original structure. ${seed.commonIssue.split(',')[0]?.trim() || 'Aging homes'} often make ADU construction the ideal time to address deferred maintenance on the primary residence.`;
    case 'custom-homes':
      return `${seed.city}'s housing stock includes ${seed.homeStyles.split(',').slice(0, 2).join(' and ').trim() || 'diverse architectural styles'}. For homeowners who want something purpose-built for ${seed.city}'s climate and lifestyle, a ground-up custom home eliminates the compromises of renovating aging structures.`;
    case 'additions':
      return `Many ${seed.city} homes — especially ${seed.homeStyles.split(',')[0]?.trim() || 'older stock'} — were built when families and living patterns were smaller. ${seed.commonIssue.split(',')[0]?.trim() || 'Aging materials'} often surface during addition projects, and we address them as part of the build.`;
    default:
      return seed.roofingNote;
  }
}

/**
 * Build 2-3 unique paragraphs for the localContext section.
 */
function buildLocalContextParagraphs(
  seed: CitySeed,
  serviceSlug: string,
  serviceName: string,
): string[] {
  const note = getServiceNote(seed, serviceSlug);
  const paragraphs: string[] = [];

  // P1: Service-specific note (directly from seed or composed)
  paragraphs.push(note);

  // P2: Climate + common issues framed through the service
  paragraphs.push(
    `${seed.city}'s climate — ${seed.climateFactor.split(',').slice(0, 2).join(',').trim() || 'Bay Area conditions'} — directly impacts ${serviceName.toLowerCase()} performance and material selection. The most common issues we address in ${seed.city} include ${seed.commonIssue.split(',').slice(0, 2).join(' and ').trim() || 'aging exterior materials'}. Hamilton Exteriors selects materials proven for ${seed.city}'s Title 24 Climate Zone ${seed.climateZone} conditions and backs every installation with our 50-year warranty.`,
  );

  // P3: Era breakdown + home styles (skip if data is sparse)
  const eraInfo = seed.eraBreakdown;
  const styleInfo = seed.homeStyles;
  if (eraInfo.length > 20 && styleInfo.length > 20) {
    paragraphs.push(
      `${seed.city}'s housing stock spans ${eraInfo.split(',').slice(0, 3).join(',').trim()}. Architectural styles range from ${styleInfo.split(',').slice(0, 2).join(' to ').trim()}. Each era and style presents different ${serviceName.toLowerCase()} requirements — from material compatibility to structural considerations. Our crews know what to expect before they arrive on site.`,
    );
  }

  return paragraphs;
}

/**
 * Build 3 neighborhood items with service-specific descriptions.
 */
function buildNeighborhoodServiceItems(
  seed: CitySeed,
  serviceSlug: string,
  serviceName: string,
): Array<{ neighborhood: string; description: string }> {
  const items: Array<{ neighborhood: string; description: string }> = [];
  const note = getServiceNote(seed, serviceSlug);
  const noteSentences = note.split(/\.\s+/).filter(s => s.length > 10);

  for (let i = 0; i < 3 && i < seed.neighborhoods.length; i++) {
    const idx = hashCode(`${seed.slug}-${serviceSlug}-nbhd-${i}`) % seed.neighborhoods.length;
    const n = seed.neighborhoods[idx];

    // Each neighborhood gets a different framing
    let desc: string;
    if (i === 0) {
      desc = `${n} homeowners frequently choose Hamilton Exteriors for ${serviceName.toLowerCase()}. ${noteSentences[0] ? noteSentences[0] + '.' : ''} With ${seed.city}'s ${seed.microclimate.split('.')[0]?.trim() || 'variable climate'}, material selection in ${n} requires local expertise.`;
    } else if (i === 1) {
      const styleSnippet = seed.homeStyles.split(',')[Math.min(i, seed.homeStyles.split(',').length - 1)]?.trim() || 'diverse homes';
      desc = `In ${n}, homes are predominantly ${styleSnippet}. ${noteSentences[Math.min(1, noteSentences.length - 1)] ? noteSentences[Math.min(1, noteSentences.length - 1)] + '.' : ''} Our crews are familiar with ${n}'s architectural character and building requirements.`;
    } else {
      desc = `From ${n} to ${seed.neighborhoods[(idx + 2) % seed.neighborhoods.length]}, ${seed.city} homeowners trust Hamilton Exteriors for ${serviceName.toLowerCase()} that stands up to ${seed.climateFactor.split(',')[0]?.trim() || 'local conditions'}. We handle permits, engineering, and installation — you get a single point of contact.`;
    }
    items.push({ neighborhood: n, description: desc });
  }

  return items;
}

// ── 1. General City Page ────────────────────────────────────────────────────

const SERVICE_DEFS = [
  {
    title: 'Custom Homes',
    slug: 'custom-homes',
    imageKey: 'serviceCustomHomes',
    descFn: (city: string, _seed: CitySeed) =>
      `Ground-up custom home construction tailored to your vision. From foundation to finishing touches, our team manages every detail in ${city}.`,
  },
  {
    title: 'Home Additions',
    slug: 'additions',
    imageKey: 'serviceAdditions',
    descFn: (city: string, _seed: CitySeed) =>
      `Expand your living space with seamless room additions that match your ${city} home's existing style. We handle permits, design, and construction.`,
  },
  {
    title: 'ADUs',
    slug: 'adu',
    imageKey: 'serviceAdu',
    descFn: (city: string, _seed: CitySeed) =>
      `Detached ADUs, garage conversions, and junior ADUs that add living space and rental income to your ${city} property.`,
  },
  {
    title: 'Roofing',
    slug: 'roofing',
    imageKey: 'serviceRoofing',
    descFn: (city: string, _seed: CitySeed) =>
      `Full roof replacements and repairs in ${city} with GAF-certified shingles and a 50-year warranty. Most jobs done in 3\u20135 days.`,
  },
  {
    title: 'Siding',
    slug: 'siding',
    imageKey: 'serviceSiding',
    descFn: (city: string, _seed: CitySeed) =>
      `James Hardie fiber cement siding that protects your ${city} home and looks great for decades. We handle dry rot repair, full replacements, and fresh paint.`,
  },
  {
    title: 'Windows',
    slug: 'windows',
    imageKey: 'serviceWindows',
    descFn: (city: string, _seed: CitySeed) =>
      `Energy-efficient window replacements that transform your ${city} home's comfort and curb appeal. Professionally installed with a full warranty.`,
  },
] as const;

export function generateGeneralCityPage(seed: CitySeed): GeneralCityPageData {
  const { city, county, state, slug, countySlug, neighborhoods } = seed;
  const countyUrlSlug = `${countySlug}-county-ca`;
  const cityUrlSlug = `${slug}-ca`;
  const basePath = `/service-areas/${countyUrlSlug}/${cityUrlSlug}`;

  // Services grid — descriptions now use city-specific seed data
  const services = SERVICE_DEFS.map((s) => ({
    title: s.title,
    description: s.descFn(city, seed),
    imageKey: s.imageKey,
    href: `${basePath}/${s.slug}`,
  }));

  // Badges
  const badges = [
    `Serving ${city} & ${county} County`,
    'Licensed Bonded & Insured',
    'Financing Available',
    '50-Year Warranty',
  ];

  // Reviews — three deterministic reviews using real neighborhoods
  const n0 = neighborhoods[0];
  const n1 = neighborhoods[Math.min(1, neighborhoods.length - 1)];
  const n2 = neighborhoods[Math.min(2, neighborhoods.length - 1)];

  // Reviews — use city-specific context for authenticity
  const roofContext = seed.priceTier === 'luxury' || seed.priceTier === 'premium'
    ? 'They used premium materials and the attention to detail was exceptional'
    : 'They gave us an honest assessment and fair pricing';
  const sidingContext = seed.climateFactor.includes('fog') || seed.climateFactor.includes('moisture')
    ? 'fiber cement siding to handle the moisture'
    : seed.climateFactor.includes('fire') || seed.climateFactor.includes('Fire')
      ? 'fire-rated fiber cement siding for peace of mind'
      : 'new James Hardie siding that looks incredible';

  const reviews = {
    sectionTitle: `What ${city} Homeowners Are Saying`,
    featured: {
      text: `Hamilton Exteriors completely transformed our ${n0} home. ${roofContext}. From the initial consultation to the final walkthrough, their team was professional, on schedule, and meticulous about every detail. Our neighbors keep asking who did the work.`,
      name: 'Sarah M.',
      location: `${n0}, ${city}`,
    },
    side: [
      {
        text: `We got three bids for our roof replacement in ${n1} and Hamilton was the clear winner — not the cheapest, but the most thorough. They knew exactly what our ${seed.homeStyles.split(',')[0].replace(/^\d+s?-?\d*s?\s*/, '') || 'home'} needed. Handled all the permits and finished a day early.`,
        name: 'David K.',
        location: `${n1}, ${city}`,
      },
      {
        text: `We needed ${sidingContext} for our ${n2} home. Hamilton managed everything seamlessly — design, permits, construction. The finished result looks like it was always part of the property. Worth every penny.`,
        name: 'Jennifer L.',
        location: `${n2}, ${city}`,
      },
    ],
  };

  // Neighborhoods section — three descriptions using real neighborhoods + local context
  const neighborhoodItems = neighborhoods.slice(0, 3).map((n, i) => {
    const descriptions = [
      `${n} is one of ${city}'s most sought-after neighborhoods. Homes here — ${seed.homeStyles.split(',')[0] || 'a mix of architectural styles'} — face specific challenges from ${seed.climateFactor.split(',')[0] || 'the local climate'}. Hamilton Exteriors has completed dozens of projects in ${n}, from full roof replacements to custom ADUs.`,
      `Homeowners in ${n} trust Hamilton Exteriors for everything from siding upgrades to second story additions. Common issues we address here include ${seed.commonIssue.split(',')[0] || 'aging exterior materials'}. Our team knows ${county} County's Title 24 Climate Zone ${seed.climateZone} requirements and takes pride in work that enhances the neighborhood's character.`,
      `From energy-efficient window installations to ground-up custom homes, ${n} residents choose Hamilton Exteriors for our design-build expertise. With ${city}'s microclimate — ${seed.microclimate.split('.')[0] || 'varied Bay Area weather'} — material selection matters. We handle architecture, engineering, permits, and construction.`,
    ];
    return {
      title: n,
      description: descriptions[i % descriptions.length],
    };
  });

  // FAQs — combine city-specific questions with county-level local knowledge
  const countyLocalFaqs = getCountyLocalFaqs(countySlug, city, county);
  const cityLocalFaqs = getCityLocalFaqs(seed);

  const prices = PRICE_RANGES[seed.priceTier];

  const faqs = [
    {
      question: `How much does a home renovation cost in ${city}?`,
      answer: `Costs in ${city} reflect the ${seed.priceTier === 'luxury' ? 'premium' : seed.priceTier} market and local labor rates. Roof replacements typically run ${prices.roof} for a standard home, siding from ${prices.siding}, and window replacements from ${prices.windows} depending on type and frame material. ADUs range from ${prices.adu}. With median home values at ${seed.medianHomePrice} in ${city}, these improvements are strong investments. We provide free, fully itemized estimates for every project — every cost spelled out.`,
    },
    ...cityLocalFaqs,
    ...countyLocalFaqs,
  ];

  // Nearby cities — same county first, then adjacent counties for cross-county linking
  const ADJACENT_COUNTIES: Record<string, string[]> = {
    'alameda': ['contra-costa', 'santa-clara'],
    'contra-costa': ['alameda', 'marin', 'napa'],
    'marin': ['contra-costa', 'napa'],
    'napa': ['contra-costa', 'marin'],
    'santa-clara': ['alameda'],
    'san-mateo': ['alameda', 'santa-clara'],
  };

  const sameCountyCities = CITY_SEEDS.filter(
    (c) => c.countySlug === countySlug && c.slug !== slug,
  ).map((c) => ({
    name: c.city,
    href: `/service-areas/${c.countySlug}-county-ca/${c.slug}-ca`,
  }));

  const adjacentCountySlugs = ADJACENT_COUNTIES[countySlug] || [];
  const crossCountyCities = CITY_SEEDS.filter(
    (c) => adjacentCountySlugs.includes(c.countySlug),
  ).slice(0, 3).map((c) => ({
    name: c.city,
    href: `/service-areas/${c.countySlug}-county-ca/${c.slug}-ca`,
  }));

  const nearbyCities = [...sameCountyCities, ...crossCountyCities];

  // Stats
  const stats = [
    { value: '500+', label: 'Projects Completed' },
    { value: '10+', label: 'Years Experience' },
    { value: '50yr', label: 'Warranty Coverage' },
    { value: '4.8', label: 'Average Rating' },
  ];

  return {
    city,
    county,
    state,
    slug,
    countySlug,
    title: `Roofing, Siding & Exterior Contractor in ${city}, CA`,
    description: `${city}'s trusted design-build contractor. Roofing, siding, windows, ADUs & custom homes in ${county} County. Licensed, insured. Free estimates.`,
    hero: {
      headline: `Roofing, Siding &  Exterior Remodeling  in ${city}`,
      formTitle: 'Get Your Free Estimate',
      formSubtitle:
        "Tell us about your project. We'll call within 5 minutes to discuss next steps.",
      badges,
    },
    services,
    reviews,
    neighborhoods: {
      title: `Neighborhoods We Serve in ${city}`,
      subtitle: `Hamilton Exteriors has completed projects across ${city} — from ${neighborhoods[0]} to ${neighborhoods[neighborhoods.length - 1]}. Here are some of the communities we serve.`,
      items: neighborhoodItems,
    },
    faqs,
    nearbyCities,
    stats,
  };
}

// ── 1b. County Page ───────────────────────────────────────────────────────

export interface CountyPageSeedData {
  county: string;
  countySlug: string;
  state: string;
  adjective: string;
  title: string;
  description: string;
  heroHeadline: string;
  heroFormTitle: string;
  proximity?: string;
  cities: Array<{ name: string; slug: string; image: string }>;
  citySectionStyle: 'heading' | 'label';
}

const COUNTY_ADJECTIVES: Record<string, string> = {
  'alameda': 'Trusted',
  'contra-costa': 'Experienced',
  'marin': 'Premium',
  'napa': 'Expert',
  'santa-clara': 'Established',
  'san-mateo': 'Peninsula\'s',
};

const COUNTY_PROXIMITY: Record<string, string> = {
  'alameda': '-122.08,37.65',
  'contra-costa': '-122.00,37.95',
  'marin': '-122.53,37.95',
  'napa': '-122.30,38.30',
  'santa-clara': '-121.89,37.34',
  'san-mateo': '-122.33,37.55',
};

const COUNTY_SECTION_STYLES: Record<string, 'heading' | 'label'> = {
  'alameda': 'heading',
  'contra-costa': 'label',
  'marin': 'heading',
  'napa': 'heading',
  'santa-clara': 'heading',
  'san-mateo': 'heading',
};

/**
 * Convert city slug to image key.
 * e.g., "oakland" → "areaOakland"
 */
function cityImageKey(citySlug: string): string {
  return 'area' + citySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(/ /g, '');
}

export function generateCountyPage(countyUrlSlug: string): CountyPageSeedData | null {
  const shortCounty = COUNTY_SLUG_MAP[countyUrlSlug];
  if (!shortCounty) return null;

  const countyName = COUNTY_NAME_MAP[countyUrlSlug];
  if (!countyName) return null;

  const countyCities = CITY_SEEDS.filter(c => c.countySlug === shortCounty);
  if (countyCities.length === 0) return null;

  const displayCounty = countyName.replace(' County', '');

  return {
    county: displayCounty,
    countySlug: countyUrlSlug,
    state: 'CA',
    adjective: COUNTY_ADJECTIVES[shortCounty] || 'Trusted',
    title: `${displayCounty} County Roofing, Siding & Exteriors Contractor`,
    description: `Hamilton Exteriors serves ${displayCounty} County — roofing, siding, windows, ADUs & custom homes. 50-year warranty. CSLB #1078806. Free estimate: (650) 977-3351.`,
    heroHeadline: `Roofing, Siding &  Exterior Remodeling  in ${displayCounty} County`,
    heroFormTitle: 'Get Your Free Estimate',
    proximity: COUNTY_PROXIMITY[shortCounty],
    cities: countyCities.map(c => ({
      name: c.city,
      slug: `${countyUrlSlug}/${c.slug}-ca`,
      image: cityImageKey(c.slug),
    })),
    citySectionStyle: COUNTY_SECTION_STYLES[shortCounty] || 'heading',
  };
}

// ── 2. City + Service Page ──────────────────────────────────────────────────

/**
 * Map service slug to the card variant used by the styles section.
 */
function cardVariantForService(
  slug: string,
): 'roofing' | 'siding' | 'windows' | 'adu' {
  const map: Record<string, 'roofing' | 'siding' | 'windows' | 'adu'> = {
    roofing: 'roofing',
    siding: 'siding',
    windows: 'windows',
    adu: 'adu',
    'custom-homes': 'roofing', // similar card style
    additions: 'adu', // similar card style
  };
  return map[slug] ?? 'roofing';
}

export function generateCityServicePage(
  seed: CitySeed,
  template: ServiceTemplate,
): CityServicePageData {
  const { city, county, state, slug: citySlug, countySlug } = seed;
  const {
    serviceSlug,
    serviceName,
    heroHeadlinePattern,
    heroFormTitle,
    heroFormSubtitle,
    serviceType,
    serviceOptions,
    titlePattern,
    descriptionPattern,
    faqTemplates,
    stylesHeading,
    stylesItems,
  } = template;

  // Build interpolation vars — each FAQ gets its own neighborhood via context
  const baseVars = buildVars(seed, `${citySlug}-${serviceSlug}`, {
    serviceName,
  });

  const title = interpolate(titlePattern, baseVars);
  const description = interpolate(descriptionPattern, baseVars);
  const heroHeadline = interpolate(heroHeadlinePattern, baseVars);

  // Hero — uses string imageKey since these are generated at runtime, not
  // Astro ImageMetadata. The page template resolves keys to images.
  const hero: HeroProps = {
    headline: heroHeadline,
    formTitle: heroFormTitle,
    formSubtitle: heroFormSubtitle,
    serviceType,
    serviceOptions,
    badges: [
      `Serving ${city} & ${county} County`,
      'Licensed & Insured',
      'Free Estimates',
    ],
  };

  // FAQs — each question gets a unique neighborhood via its own context
  const localFaqs = faqTemplates.map((faq, i) => {
    const faqVars = buildVars(
      seed,
      `${citySlug}-${serviceSlug}-faq-${i}`,
      { serviceName },
    );
    return {
      question: interpolate(faq.questionPattern, faqVars),
      answer: interpolate(faq.answerPattern, faqVars),
    };
  });

  // Styles section — climate-localized descriptions per city
  const stylesSection: SectionBlock = {
    type: 'styles',
    data: {
      heading: stylesHeading,
      items: stylesItems.map((item) => ({
        title: item.title,
        description: localizeStyleDescription(seed, serviceSlug, item.title, item.description),
        ...(item.imageKey ? { image: item.imageKey } : {}),
      })),
      cardVariant: cardVariantForService(serviceSlug),
    },
  };

  // ── New unique content sections ──────────────────────────────────────────

  // 1. Local context — city+service expert narrative (150-200 words unique)
  const localContextSection: SectionBlock = {
    type: 'localContext',
    data: {
      heading: `${serviceName} in ${city}: What Local Homeowners Need to Know`,
      paragraphs: buildLocalContextParagraphs(seed, serviceSlug, serviceName),
    } satisfies LocalContextSection,
  };

  // 2. City pricing — service-specific pricing for this city's market tier
  const priceKey = SERVICE_PRICE_KEY[serviceSlug] || 'roof';
  const tierPrices = PRICE_RANGES[seed.priceTier];
  const tierLabel = seed.priceTier === 'luxury' ? 'premium' : seed.priceTier;
  const cityPricingSection: SectionBlock = {
    type: 'cityPricing',
    data: {
      heading: `${serviceName} Costs in ${city}`,
      city,
      priceTier: seed.priceTier,
      priceRange: tierPrices[priceKey],
      medianHomePrice: seed.medianHomePrice,
      footnote: `Prices reflect ${city}'s ${tierLabel} market and ${county} County labor rates. Actual costs depend on home size, materials, and project complexity. We provide free, fully itemized estimates — every cost spelled out.`,
    } satisfies CityPricingSection,
  };

  // 3. Neighborhood service — 3 neighborhoods with service-specific descriptions
  const neighborhoodServiceSection: SectionBlock = {
    type: 'neighborhoodService',
    data: {
      heading: `${serviceName} Across ${city} Neighborhoods`,
      items: buildNeighborhoodServiceItems(seed, serviceSlug, serviceName),
    } satisfies NeighborhoodServiceSection,
  };

  // Ordered sections array — new unique sections interspersed with shared components
  const sections: SectionBlock[] = [
    localContextSection,
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    cityPricingSection,
    { type: 'reviewLogos' },
    stylesSection,
    neighborhoodServiceSection,
    { type: 'difference' },
    { type: 'projects' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ];

  // Nearby city services — same service in other cities in the same county
  const nearbyCityServices = CITY_SEEDS.filter(
    (c) => c.countySlug === countySlug && c.slug !== citySlug,
  ).map((c) => ({
    name: `${serviceName} in ${c.city}`,
    href: `/service-areas/${c.countySlug}-county-ca/${c.slug}-ca/${serviceSlug}`,
  }));

  return {
    city,
    county,
    state,
    citySlug,
    countySlug,
    serviceSlug,
    serviceName,
    title,
    description,
    hero,
    sections,
    localFaqs,
    neighborhoods: seed.neighborhoods,
    nearbyCityServices,
  };
}

// ── 3. County + Service Page ────────────────────────────────────────────────

/**
 * County slug mapping for seed data lookup.
 * Seed data uses short county slugs ("alameda"), but URLs use full slugs ("alameda-county-ca").
 */
const COUNTY_SLUG_MAP: Record<string, string> = {
  'alameda-county-ca': 'alameda',
  'contra-costa-county-ca': 'contra-costa',
  'marin-county-ca': 'marin',
  'napa-county-ca': 'napa',
  'santa-clara-county-ca': 'santa-clara',
  'san-mateo-county-ca': 'san-mateo',
};

const COUNTY_NAME_MAP: Record<string, string> = {
  'alameda-county-ca': 'Alameda County',
  'contra-costa-county-ca': 'Contra Costa County',
  'marin-county-ca': 'Marin County',
  'napa-county-ca': 'Napa County',
  'santa-clara-county-ca': 'Santa Clara County',
  'san-mateo-county-ca': 'San Mateo County',
};

/**
 * Generate a county+service page (e.g., "Roofing in Alameda County").
 * Uses the same ServicePage template as city+service pages but scoped to the county.
 */
export function generateCountyServicePage(
  countySlug: string,
  template: ServiceTemplate,
): CityServicePageData | null {
  const countyName = COUNTY_NAME_MAP[countySlug];
  if (!countyName) return null;

  const shortCounty = COUNTY_SLUG_MAP[countySlug];
  const countyCities = CITY_SEEDS.filter(c => c.countySlug === shortCounty);
  if (countyCities.length === 0) return null;

  // Aggregate data across all cities in the county for differentiation
  const primarySeed = countyCities[0];
  const {
    serviceSlug,
    serviceName,
    heroHeadlinePattern,
    heroFormTitle,
    heroFormSubtitle,
    serviceType,
    serviceOptions,
    titlePattern,
    descriptionPattern,
    faqTemplates,
    stylesHeading,
    stylesItems,
  } = template;

  const displayCounty = countyName.replace(' County', '');
  const cityList = countyCities.map(c => c.city).join(', ');

  // Aggregate county-level stats instead of using a single city's data
  const prices = countyCities.map(c => parseInt(c.medianHomePrice.replace(/[$,]/g, ''), 10)).filter(Boolean);
  const avgPrice = prices.length ? `$${Math.round(prices.reduce((a, b) => a + b, 0) / prices.length).toLocaleString()}` : primarySeed.medianHomePrice;
  const totalPop = countyCities.reduce((sum, c) => sum + parseInt(c.population.replace(/,/g, ''), 10), 0);

  // Build vars using county-level aggregated data
  const vars: Record<string, string> = {
    city: countyName,
    county: displayCounty,
    neighborhood: cityList,
    medianHomePrice: avgPrice,
    population: totalPop.toLocaleString(),
    keyFeature: `home to ${cityList}`,
    serviceName,
  };

  const title = interpolate(titlePattern, vars);
  // Fix duplication: when {city} is "Alameda County" and template appends
  // "{county} County", the result is "Alameda County, Alameda County, CA".
  // Collapse to single instance: "Alameda County, CA".
  const rawDescription = interpolate(descriptionPattern, vars);
  const description = rawDescription.replace(`${countyName}, ${countyName}`, countyName);
  const heroHeadline = interpolate(heroHeadlinePattern, vars);

  const hero: HeroProps = {
    headline: heroHeadline,
    formTitle: heroFormTitle,
    formSubtitle: heroFormSubtitle,
    serviceType,
    serviceOptions,
    badges: [
      `Serving ${cityList}`,
      'Licensed & Insured',
      'Free Estimates',
    ],
  };

  // County-specific FAQs — reference multiple cities instead of one city's neighborhoods
  const countyFaqs = getCountyLocalFaqs(shortCounty, displayCounty, displayCounty);
  const localFaqs = [
    // County-wide pricing FAQ using aggregated data
    {
      question: `How much does ${serviceName.toLowerCase()} cost in ${displayCounty} County?`,
      answer: `${serviceName} costs in ${displayCounty} County vary by city — from ${countyCities[0].city} to ${countyCities[countyCities.length - 1].city}. With median home values averaging ${avgPrice} across the county, we see a range of project scopes. Hamilton Exteriors provides free, fully itemized estimates for every ${displayCounty} County project — every cost spelled out.`,
    },
    // Template FAQs with county-level vars
    ...faqTemplates.slice(1).map((faq, i) => {
      const faqVars = { ...vars, neighborhood: countyCities[i % countyCities.length].city };
      return {
        question: interpolate(faq.questionPattern, faqVars),
        answer: interpolate(faq.answerPattern, faqVars),
      };
    }),
    // County-level regulatory FAQs
    ...countyFaqs,
  ];

  // Styles section — climate-localized using primary city's data for the county
  const stylesSection: SectionBlock = {
    type: 'styles',
    data: {
      heading: stylesHeading,
      items: stylesItems.map(item => ({
        title: item.title,
        description: localizeStyleDescription(primarySeed, serviceSlug, item.title, item.description),
        ...(item.imageKey ? { image: item.imageKey } : {}),
      })),
      cardVariant: cardVariantForService(serviceSlug),
    },
  };

  const sections: SectionBlock[] = [
    { type: 'logoSlider' },
    { type: 'reviews' },
    { type: 'financing' },
    { type: 'reviewLogos' },
    stylesSection,
    { type: 'difference' },
    { type: 'projects' },
    { type: 'faq' },
    { type: 'contactUs' },
    { type: 'footer' },
  ];

  // Link to same service in each city
  const nearbyCityServices = countyCities.map(c => ({
    name: `${serviceName} in ${c.city}`,
    href: `/service-areas/${countySlug}-county-ca/${c.slug}-ca/${serviceSlug}`,
  }));

  return {
    city: countyName,
    county: countyName.replace(' County', ''),
    state: 'CA',
    citySlug: countySlug,
    countySlug,
    serviceSlug,
    serviceName,
    title,
    description,
    hero,
    sections,
    localFaqs,
    neighborhoods: countyCities.flatMap(c => c.neighborhoods.slice(0, 2)),
    nearbyCityServices,
  };
}
