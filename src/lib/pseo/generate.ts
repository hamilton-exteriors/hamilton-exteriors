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
import type { HeroProps, SectionBlock } from '../service-page-types';
import type { CitySeed } from './city-seed-data';
import type { ServiceTemplate } from './service-templates';
import { CITY_SEEDS } from './city-seed-data';


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
    ...extra,
  };
}

// ── 1. General City Page ────────────────────────────────────────────────────

const SERVICE_DEFS = [
  {
    title: 'Custom Homes',
    slug: 'custom-homes',
    imageKey: 'serviceCustomHomes',
    descFn: (city: string) =>
      `Ground-up custom homes designed and built for ${city} homeowners. Architecture, engineering, permitting, and construction — all under one roof.`,
  },
  {
    title: 'Home Additions',
    slug: 'additions',
    imageKey: 'serviceAdditions',
    descFn: (city: string) =>
      `Second story additions, room extensions, and full remodels in ${city}. We handle structural engineering, permits, and construction.`,
  },
  {
    title: 'ADUs',
    slug: 'adu',
    imageKey: 'serviceAdu',
    descFn: (city: string) =>
      `Detached ADUs, garage conversions, and junior ADUs in ${city}. Full design-build with our 60-day permit guarantee.`,
  },
  {
    title: 'Roofing',
    slug: 'roofing',
    imageKey: 'serviceRoofing',
    descFn: (city: string) =>
      `Roof replacement and repair in ${city}. Asphalt shingles, metal, tile, and energy roofs with manufacturer-backed warranties.`,
  },
  {
    title: 'Siding',
    slug: 'siding',
    imageKey: 'serviceSiding',
    descFn: (city: string) =>
      `James Hardie fiber cement, vinyl, stucco, and waterproofing for ${city} homes. 30-year product warranties included.`,
  },
  {
    title: 'Windows',
    slug: 'windows',
    imageKey: 'serviceWindows',
    descFn: (city: string) =>
      `Energy-efficient window replacement in ${city}. Double hung, casement, sliding, bay, and specialty windows.`,
  },
] as const;

export function generateGeneralCityPage(seed: CitySeed): GeneralCityPageData {
  const { city, county, state, slug, countySlug, neighborhoods } = seed;
  const countyUrlSlug = `${countySlug}-county-ca`;
  const cityUrlSlug = `${slug}-ca`;
  const basePath = `/service-areas/${countyUrlSlug}/${cityUrlSlug}`;

  // Services grid
  const services = SERVICE_DEFS.map((s) => ({
    title: s.title,
    description: s.descFn(city),
    imageKey: s.imageKey,
    href: `${basePath}/${s.slug}`,
  }));

  // Badges
  const badges = [
    `Serving ${city} & ${county} County`,
    `${neighborhoods.length}+ neighborhoods covered`,
    `Median home price: ${seed.medianHomePrice}`,
    `Population: ${seed.population}`,
  ];

  // Reviews — three deterministic reviews using real neighborhoods
  const n0 = neighborhoods[0];
  const n1 = neighborhoods[Math.min(1, neighborhoods.length - 1)];
  const n2 = neighborhoods[Math.min(2, neighborhoods.length - 1)];

  const reviews = {
    sectionTitle: `What ${city} Homeowners Are Saying`,
    featured: {
      text: `Hamilton Exteriors completely transformed our ${n0} home. From the initial consultation to the final walkthrough, their team was professional, on schedule, and meticulous about every detail. The craftsmanship is outstanding — our neighbors keep asking who did the work.`,
      name: 'Sarah M.',
      location: `${n0}, ${city}`,
    },
    side: [
      {
        text: `We got three bids for our roof replacement in ${n1} and Hamilton was the clear winner — not the cheapest, but the most thorough. They explained everything, handled all the permits, and finished a day early. Highly recommend.`,
        name: 'David K.',
        location: `${n1}, ${city}`,
      },
      {
        text: `Our ADU project in ${n2} was a big investment and Hamilton made it stress-free. They managed design, engineering, permits, and construction seamlessly. The finished unit looks like it was always part of the property.`,
        name: 'Jennifer L.',
        location: `${n2}, ${city}`,
      },
    ],
  };

  // Neighborhoods section — three descriptions using real neighborhoods
  const neighborhoodItems = neighborhoods.slice(0, 3).map((n, i) => {
    const descriptions = [
      `${n} is one of ${city}'s most sought-after neighborhoods, and Hamilton Exteriors has completed dozens of projects here — from full roof replacements to custom ADUs. We understand the architectural character and local permitting requirements that make ${n} unique.`,
      `Homeowners in ${n} trust Hamilton Exteriors for everything from siding upgrades to second story additions. Our team knows ${county} County building codes inside and out, and we take pride in work that enhances the neighborhood's character.`,
      `From energy-efficient window installations to ground-up custom homes, ${n} residents choose Hamilton Exteriors for our design-build expertise. We handle architecture, engineering, permits, and construction — one team, one point of contact.`,
    ];
    return {
      title: n,
      description: descriptions[i % descriptions.length],
    };
  });

  // FAQs
  const faqs = [
    {
      question: `What services does Hamilton Exteriors offer in ${city}?`,
      answer: `Hamilton Exteriors is a full-service design-build contractor in ${city}, ${county} County. We specialize in roofing, siding, windows, ADUs, home additions, and custom homes. Every project includes architecture, engineering, permitting, and construction — all managed by one team.`,
    },
    {
      question: `How much does a home renovation cost in ${city}?`,
      answer: `Costs vary by project scope. Roof replacements in ${city} start around $8,000, siding from $8,000, and window replacements from $400 per window. ADUs range from $150,000 to $350,000, and custom homes from $350 to $600 per square foot. With median home values at ${seed.medianHomePrice}, these improvements are strong investments. We provide free estimates for every project.`,
    },
    {
      question: `Is Hamilton Exteriors licensed to work in ${county} County?`,
      answer: `Yes. Hamilton Exteriors is fully licensed, bonded, and insured to work throughout ${county} County, including ${city} and all surrounding communities. We carry a California CSLB license, general liability coverage, and workers' compensation insurance.`,
    },
    {
      question: `Does Hamilton Exteriors offer financing in ${city}?`,
      answer: `Yes. We offer flexible financing for ${city} homeowners — $0 down payment with affordable monthly installments. Get pre-qualified during your free consultation. Most homeowners are approved in minutes.`,
    },
    {
      question: `How do I get started with Hamilton Exteriors in ${city}?`,
      answer: `Getting started is simple. Call us or fill out the form above for a free consultation. We'll discuss your project, visit your property for measurements and assessment, and provide a detailed written estimate — typically within 48 hours. No pressure, no obligation.`,
    },
  ];

  // Nearby cities — same county, excluding self
  const nearbyCities = CITY_SEEDS.filter(
    (c) => c.countySlug === countySlug && c.slug !== slug,
  ).map((c) => ({
    name: c.city,
    href: `/service-areas/${c.countySlug}/${c.slug}`,
  }));

  // Stats
  const stats = [
    { value: '500+', label: 'Projects Completed' },
    { value: '10+', label: 'Years Experience' },
    { value: '50yr', label: 'Warranty Coverage' },
    { value: '4.9', label: 'Average Rating' },
  ];

  return {
    city,
    county,
    state,
    slug,
    countySlug,
    title: `Roofing, Siding, ADUs & Custom Homes in ${city}, CA | Hamilton Exteriors`,
    description: `${city}'s trusted design-build contractor. Roofing, siding, windows, ADUs & custom homes in ${county} County. Licensed, insured. Free estimates.`,
    hero: {
      headline: `${city}'s Top  Design-Build  Contractor`,
      formTitle: 'Get a FREE Estimate',
      formSubtitle:
        "Tell us about your project. We'll call within 5 minutes to discuss next steps.",
      badges,
    },
    services,
    reviews,
    neighborhoods: {
      title: `Serving ${city}'s Best Neighborhoods`,
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
  'santa-clara': 'Top-Rated',
};

const COUNTY_PROXIMITY: Record<string, string> = {
  'alameda': '-122.08,37.65',
  'contra-costa': '-122.00,37.95',
  'marin': '-122.53,37.95',
  'napa': '-122.30,38.30',
  'santa-clara': '-121.89,37.34',
};

const COUNTY_SECTION_STYLES: Record<string, 'heading' | 'label'> = {
  'alameda': 'heading',
  'contra-costa': 'label',
  'marin': 'heading',
  'napa': 'heading',
  'santa-clara': 'heading',
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
    title: `Roofing, Siding & Exteriors in ${displayCounty} County, CA | Hamilton Exteriors`,
    description: `Hamilton Exteriors serves ${displayCounty} County with expert roofing, siding, windows, ADUs & custom homes. Licensed, insured. Free estimates — call (650) 977-3351.`,
    heroHeadline: `${displayCounty} County's  Top  Design-Build  Contractor`,
    heroFormTitle: 'Get a FREE Estimate',
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
    heroImageKey,
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

  // Styles section — store imageKey as string; ServicePage.astro resolves at render time
  const stylesSection: SectionBlock = {
    type: 'styles',
    data: {
      heading: stylesHeading,
      items: stylesItems.map((item) => ({
        title: item.title,
        description: item.description,
        ...(item.imageKey ? { image: item.imageKey } : {}),
      })),
      cardVariant: cardVariantForService(serviceSlug),
    },
  };

  // Ordered sections array
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

  // Nearby city services — same service in other cities in the same county
  const nearbyCityServices = CITY_SEEDS.filter(
    (c) => c.countySlug === countySlug && c.slug !== citySlug,
  ).map((c) => ({
    name: `${serviceName} in ${c.city}`,
    href: `/service-areas/${c.countySlug}/${c.slug}/${serviceSlug}`,
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
};

const COUNTY_NAME_MAP: Record<string, string> = {
  'alameda-county-ca': 'Alameda County',
  'contra-costa-county-ca': 'Contra Costa County',
  'marin-county-ca': 'Marin County',
  'napa-county-ca': 'Napa County',
  'santa-clara-county-ca': 'Santa Clara County',
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

  // Use the first city's seed for neighborhood data and interpolation
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

  // Build vars using county name instead of city
  const vars: Record<string, string> = {
    city: countyName,
    county: countyName.replace(' County', ''),
    neighborhood: primarySeed.neighborhoods[0],
    medianHomePrice: primarySeed.medianHomePrice,
    population: primarySeed.population,
    keyFeature: primarySeed.keyFeature,
    serviceName,
  };

  const title = interpolate(titlePattern, vars);
  const description = interpolate(descriptionPattern, vars);
  const heroHeadline = interpolate(heroHeadlinePattern, vars);

  const cityList = countyCities.map(c => c.city).join(', ');

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

  // FAQs scoped to county
  const localFaqs = faqTemplates.map((faq, i) => {
    const faqVars = { ...vars, neighborhood: primarySeed.neighborhoods[i % primarySeed.neighborhoods.length] };
    return {
      question: interpolate(faq.questionPattern, faqVars),
      answer: interpolate(faq.answerPattern, faqVars),
    };
  });

  const stylesSection: SectionBlock = {
    type: 'styles',
    data: {
      heading: stylesHeading,
      items: stylesItems.map(item => ({
        title: item.title,
        description: item.description,
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
    href: `/service-areas/${countySlug}/${c.slug}-ca/${serviceSlug}`,
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
    neighborhoods: primarySeed.neighborhoods,
    nearbyCityServices,
  };
}
