#!/usr/bin/env node
/**
 * seed-targets.mjs — generate seo/targets/*.json skeletons for every page
 * the SEO swarm should optimize. One file per page.
 *
 * Output schema (per the SEO-ACTION-PLAN.md §2):
 *   { pageUrl, pagePurpose, pageType, citySlug, service, primaryKeywords[],
 *     secondaryKeywords[], currentRankings, competitorSet, contentBrief, status }
 *
 * Page types:
 *   - cornerstone-service       → /{service}, /roofing, /adu, etc
 *   - cornerstone-subservice    → /{service}/{subtype}
 *   - service-area-county       → /service-areas/{county}
 *   - service-area-city         → /service-areas/{county}/{city}
 *   - service-area-city-service → /service-areas/{county}/{city}/{service}
 *   - cost-blog                 → /blog/{costTopic}-{city}  OR existing /blog/{costTopic}-bay-area
 *
 * Idempotent: re-running merges with existing target files (preserves
 * status/metrics, refreshes URL/keyword skeletons).
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const SEO_DIR = join(REPO_ROOT, 'seo');
const TARGETS_DIR = join(SEO_DIR, 'targets');
const SITE = 'https://hamilton-exteriors.com';

const cities = JSON.parse(readFileSync(join(SEO_DIR, 'cities.json'), 'utf8')).cities;
const services = JSON.parse(readFileSync(join(SEO_DIR, 'services.json'), 'utf8')).services;

// Existing service sub-pages already in the repo (from sitemap audit)
const SUBSERVICE_PAGES = [
  ['roofing', 'asphalt-shingles'],
  ['roofing', 'metal'],
  ['roofing', 'tile'],
  ['roofing', 'energy'],
  ['siding', 'vinyl'],
  ['siding', 'fiber-cement'],
  ['siding', 'stucco'],
  ['siding', 'waterproofing'],
  ['windows', 'single-hung'],
  ['windows', 'single-slider'],
  ['windows', 'sliding-glass-doors'],
  ['windows', 'picture'],
  ['windows', 'double-hung'],
  ['windows', 'casement'],
  ['adu', 'detached'],
  ['adu', 'design'],
  ['adu', 'permits'],
  ['adu', 'garage-conversions'],
  ['custom-homes', 'ground-up'],
  ['custom-homes', 'design'],
  ['custom-homes', 'permits'],
  ['custom-homes', 'additions-renovations'],
  ['additions', 'second-story'],
  ['additions', 'room-extensions'],
  ['additions', 'adus-guest-houses'],
  ['additions', 'full-remodels'],
];

// Existing Bay-Area-level cost blogs (already published, will be optimized in place)
const EXISTING_BAY_AREA_COST_BLOGS = [
  { slug: 'roof-replacement-cost-bay-area', service: 'roofing', topic: 'roof-replacement-cost' },
  { slug: 'adu-cost-bay-area', service: 'adu', topic: 'adu-cost' },
  { slug: 'second-story-addition-cost-bay-area', service: 'additions', topic: 'second-story-addition-cost' },
  // Window + siding Bay Area cost blogs do not yet exist; they'll be created via the per-city flow + a Bay Area umbrella
];

// Other published blogs that should run through the SEO loop
const EXISTING_INFORMATIONAL_BLOGS = [
  { slug: 'james-hardie-siding-bay-area', service: 'siding' },
  { slug: 'how-long-does-a-roof-replacement-take-bay-area-timeline', service: 'roofing' },
  { slug: 'metal-roof-vs-asphalt-shingles-bay-area', service: 'roofing' },
  { slug: 'bay-area-fire-zone-roofing-requirements', service: 'roofing' },
  { slug: 'what-does-roofing-warranty-cover', service: 'roofing' },
  { slug: 'how-to-choose-roofing-contractor-bay-area', service: 'roofing' },
  { slug: 'roof-maintenance-checklist-bay-area', service: 'roofing' },
  { slug: '7-warning-signs-you-need-a-new-roof-before-it-is-too-late', service: 'roofing' },
  { slug: 'when-is-the-best-time-to-replace-your-roof-in-the-bay-area', service: 'roofing' },
];

const targets = [];

function mkPageSlug(parts) {
  return parts.join('__').replace(/[^a-z0-9_-]/gi, '-');
}

function seedKeywords(pageType, ctx) {
  const { city, service } = ctx;
  if (pageType === 'cornerstone-service') {
    return {
      primary: [
        { kw: `bay area ${service.noun}`, priority: 1, intent: 'commercial' },
        { kw: `${service.noun} bay area`, priority: 1, intent: 'commercial' },
        { kw: `${service.verb} bay area`, priority: 1, intent: 'commercial' },
      ],
      secondary: [
        { kw: `${service.noun} san francisco`, priority: 2, intent: 'commercial' },
        { kw: `${service.noun} oakland`, priority: 2, intent: 'commercial' },
        { kw: `${service.noun} san jose`, priority: 2, intent: 'commercial' },
      ],
    };
  }
  if (pageType === 'service-area-city') {
    return {
      primary: [
        { kw: `${city.display.toLowerCase()} contractor`, priority: 1, intent: 'commercial' },
        { kw: `general contractor ${city.display.toLowerCase()}`, priority: 1, intent: 'commercial' },
        { kw: `home contractor ${city.display.toLowerCase()} ca`, priority: 2, intent: 'commercial' },
      ],
      secondary: [],
    };
  }
  if (pageType === 'service-area-city-service') {
    return {
      primary: [
        { kw: `${city.display.toLowerCase()} ${service.noun}`, priority: 1, intent: 'commercial' },
        { kw: `${service.noun} ${city.display.toLowerCase()}`, priority: 1, intent: 'commercial' },
        { kw: `${service.verb} ${city.display.toLowerCase()}`, priority: 1, intent: 'commercial' },
      ],
      secondary: [
        { kw: `${service.noun} ${city.display.toLowerCase()} ca`, priority: 2, intent: 'commercial' },
        { kw: `${service.display.toLowerCase()} contractor ${city.display.toLowerCase()}`, priority: 2, intent: 'commercial' },
      ],
    };
  }
  if (pageType === 'cost-blog') {
    return {
      primary: [
        { kw: `${service.verb} cost ${city.display.toLowerCase()}`, priority: 1, intent: 'informational' },
        { kw: `${service.display.toLowerCase()} cost ${city.display.toLowerCase()}`, priority: 1, intent: 'informational' },
        { kw: `how much does ${service.verb} cost in ${city.display.toLowerCase()}`, priority: 1, intent: 'informational' },
      ],
      secondary: [
        { kw: `${service.verb} price ${city.display.toLowerCase()}`, priority: 2, intent: 'informational' },
      ],
    };
  }
  return { primary: [], secondary: [] };
}

function blank() {
  return {
    pageUrl: '',
    pagePurpose: '',
    pageType: '',
    citySlug: null,
    service: null,
    primaryKeywords: [],
    secondaryKeywords: [],
    currentRankings: {},
    competitorSet: [],
    contentBrief: null,
    metrics: { indexedAt: null, t14: null, t30: null, t60: null },
    status: 'pending',
    iterations: 0,
    lastError: null,
    pageSlug: '',
  };
}

// 1. Cornerstone service pages: /{service}
for (const service of services) {
  const t = blank();
  t.pageUrl = `${SITE}/${service.slug}`;
  t.pagePurpose = `Convert Bay Area homeowners searching for ${service.noun} services. Top-of-funnel category page.`;
  t.pageType = 'cornerstone-service';
  t.service = service.slug;
  const k = seedKeywords('cornerstone-service', { service });
  t.primaryKeywords = k.primary;
  t.secondaryKeywords = k.secondary;
  t.pageSlug = mkPageSlug(['cornerstone', service.slug]);
  targets.push(t);
}

// 2. Cornerstone sub-service pages: /{service}/{subtype}
for (const [serviceSlug, subtype] of SUBSERVICE_PAGES) {
  const service = services.find(s => s.slug === serviceSlug);
  const t = blank();
  t.pageUrl = `${SITE}/${serviceSlug}/${subtype}`;
  t.pagePurpose = `${subtype.replace(/-/g, ' ')} sub-service of ${service?.display}. Bottom-of-funnel detail page for users specifying material/type.`;
  t.pageType = 'cornerstone-subservice';
  t.service = serviceSlug;
  t.primaryKeywords = [
    { kw: `${subtype.replace(/-/g, ' ')} bay area`, priority: 1, intent: 'commercial' },
    { kw: `${subtype.replace(/-/g, ' ')} ${service?.noun}`, priority: 1, intent: 'commercial' },
  ];
  t.pageSlug = mkPageSlug(['subservice', serviceSlug, subtype]);
  targets.push(t);
}

// 3. Service-area county pages: /service-areas/{county}  (one per county)
const counties = [...new Set(cities.map(c => c.county))];
for (const countySlug of counties) {
  const sample = cities.find(c => c.county === countySlug);
  const t = blank();
  t.pageUrl = `${SITE}/service-areas/${countySlug}`;
  t.pagePurpose = `${sample.countyDisplay} county-level service area page. Hub for the cities within it.`;
  t.pageType = 'service-area-county';
  t.primaryKeywords = [
    { kw: `${sample.countyDisplay.toLowerCase()} contractor`, priority: 1, intent: 'commercial' },
    { kw: `${sample.countyDisplay.toLowerCase()} home services`, priority: 2, intent: 'commercial' },
  ];
  t.pageSlug = mkPageSlug(['sa-county', countySlug]);
  targets.push(t);
}

// 4. Service-area city pages: /service-areas/{county}/{city}
for (const city of cities) {
  const t = blank();
  t.pageUrl = `${SITE}/service-areas/${city.county}/${city.slug}`;
  t.pagePurpose = `${city.display} city-level home services hub. Lists every service Hamilton offers in ${city.display}.`;
  t.pageType = 'service-area-city';
  t.citySlug = city.slug;
  const k = seedKeywords('service-area-city', { city });
  t.primaryKeywords = k.primary;
  t.secondaryKeywords = k.secondary;
  t.pageSlug = mkPageSlug(['sa-city', city.slug]);
  targets.push(t);
}

// 5. Service-area city-service pages: /service-areas/{county}/{city}/{service}
for (const city of cities) {
  for (const service of services) {
    const t = blank();
    t.pageUrl = `${SITE}/service-areas/${city.county}/${city.slug}/${service.slug}`;
    t.pagePurpose = `Convert ${city.display} homeowners searching for ${service.noun} services. Bottom-of-funnel commercial intent.`;
    t.pageType = 'service-area-city-service';
    t.citySlug = city.slug;
    t.service = service.slug;
    const k = seedKeywords('service-area-city-service', { city, service });
    t.primaryKeywords = k.primary;
    t.secondaryKeywords = k.secondary;
    t.pageSlug = mkPageSlug(['sa-city-service', city.slug, service.slug]);
    targets.push(t);
  }
}

// 6. Existing Bay-Area-level cost blogs (optimize in place, don't replace)
for (const blog of EXISTING_BAY_AREA_COST_BLOGS) {
  const service = services.find(s => s.slug === blog.service);
  const t = blank();
  t.pageUrl = `${SITE}/blog/${blog.slug}`;
  t.pagePurpose = `Bay Area-wide cost guide for ${service.display}. Convert informational searchers into leads via lower-funnel CTAs.`;
  t.pageType = 'cost-blog';
  t.service = blog.service;
  t.citySlug = null; // Bay Area level, no specific city
  t.primaryKeywords = [
    { kw: `${service.verb} cost bay area`, priority: 1, intent: 'informational' },
    { kw: `how much does ${service.verb} cost in the bay area`, priority: 1, intent: 'informational' },
  ];
  t.secondaryKeywords = [
    { kw: `${service.display.toLowerCase()} pricing bay area`, priority: 2, intent: 'informational' },
  ];
  t.pageSlug = mkPageSlug(['cost-blog', 'bay-area', blog.topic]);
  targets.push(t);
}

// 7. New per-city cost blogs: /blog/{costTopic}-{city}
for (const city of cities) {
  for (const service of services) {
    if (!service.costTopic) continue; // skip services without cost topic
    const t = blank();
    t.pageUrl = `${SITE}/blog/${service.costTopic}-${city.slug.replace(/-ca$/, '')}`;
    t.pagePurpose = `${city.display}-specific cost guide for ${service.display}. Convert informational searchers via local pricing data + permit context.`;
    t.pageType = 'cost-blog';
    t.service = service.slug;
    t.citySlug = city.slug;
    const k = seedKeywords('cost-blog', { city, service });
    t.primaryKeywords = k.primary;
    t.secondaryKeywords = k.secondary;
    t.pageSlug = mkPageSlug(['cost-blog', city.slug, service.costTopic]);
    targets.push(t);
  }
}

// 8. Existing informational blogs that should run through the loop
for (const blog of EXISTING_INFORMATIONAL_BLOGS) {
  const t = blank();
  t.pageUrl = `${SITE}/blog/${blog.slug}`;
  t.pagePurpose = `Existing ${blog.service} informational blog post. Refresh with current SERP analysis.`;
  t.pageType = 'informational-blog';
  t.service = blog.service;
  t.citySlug = null;
  t.primaryKeywords = []; // will be filled from current GSC queries in step 2 of the loop
  t.pageSlug = mkPageSlug(['info-blog', blog.slug]);
  targets.push(t);
}

// Write — merge with existing target files to preserve metrics/status
let written = 0, skipped = 0, merged = 0;
for (const t of targets) {
  const path = join(TARGETS_DIR, `${t.pageSlug}.json`);
  if (existsSync(path)) {
    const existing = JSON.parse(readFileSync(path, 'utf8'));
    // Preserve runtime fields, refresh skeleton fields
    const next = {
      ...t,
      currentRankings: existing.currentRankings || t.currentRankings,
      competitorSet: existing.competitorSet?.length ? existing.competitorSet : t.competitorSet,
      contentBrief: existing.contentBrief || t.contentBrief,
      metrics: existing.metrics || t.metrics,
      status: existing.status || 'pending',
      iterations: existing.iterations || 0,
      lastError: existing.lastError || null,
    };
    writeFileSync(path, JSON.stringify(next, null, 2));
    merged++;
  } else {
    writeFileSync(path, JSON.stringify(t, null, 2));
    written++;
  }
}

console.log(`Seeded ${targets.length} target files (${written} new, ${merged} merged, ${skipped} skipped)`);
console.log(`Page-type breakdown:`);
const byType = {};
for (const t of targets) byType[t.pageType] = (byType[t.pageType] || 0) + 1;
for (const [k, v] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(v).padStart(4)}  ${k}`);
}
