#!/usr/bin/env node
/**
 * seed-data-spine.mjs — generate seo/data-spine/{citySlug}.json skeletons
 * for every Bay Area city served by Hamilton Exteriors.
 *
 * Pre-populates known facts (county, climate zone, fire-hazard tier, building
 * dept URL anchors). Permit fees + service-specific data are filled in by:
 *   - scripts/scrape-permits.mjs (periodic, fills `permits.{service}` blocks)
 *   - the per-page agent during step 7 (writes back nothing, reads only)
 *
 * Idempotent: merges with existing spine files, preserves enriched data.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const SEO_DIR = join(REPO_ROOT, 'seo');
const SPINE_DIR = join(SEO_DIR, 'data-spine');
const cities = JSON.parse(readFileSync(join(SEO_DIR, 'cities.json'), 'utf8')).cities;

// Known anchors per city. Manually curated — these are the "find permit fees here" URLs.
// Empty entries flagged with `null` are TODOs for follow-up research.
const CITY_ANCHORS = {
  'oakland-ca':           { gov: 'https://www.oaklandca.gov', buildingDept: 'https://www.oaklandca.gov/topics/permits-and-construction', permitPortal: 'https://aca-prod.accela.com/oakland/Welcome.aspx', fireZone: 'https://www.oaklandca.gov/services/fire-prevention-bureau' },
  'berkeley-ca':          { gov: 'https://berkeleyca.gov', buildingDept: 'https://berkeleyca.gov/your-government/our-work/planning-development', permitPortal: 'https://berkeleyca.gov/your-government/our-work/planning-development/permit-service-center', fireZone: 'https://berkeleyca.gov/safety-health/disaster-prep-recovery/wildfire-zones' },
  'fremont-ca':           { gov: 'https://www.fremont.gov', buildingDept: 'https://www.fremont.gov/government/departments/community-development/building-and-safety', permitPortal: 'https://aca-prod.accela.com/FREMONT/Default.aspx', fireZone: null },
  'hayward-ca':           { gov: 'https://www.hayward-ca.gov', buildingDept: 'https://www.hayward-ca.gov/your-government/departments/development-services/building-division', permitPortal: null, fireZone: null },
  'castro-valley-ca':     { gov: 'https://www.acgov.org', buildingDept: 'https://www.acgov.org/cda/building/', permitPortal: null, fireZone: null },
  'san-leandro-ca':       { gov: 'https://www.sanleandro.org', buildingDept: 'https://www.sanleandro.org/depts/cd/permit/default.asp', permitPortal: null, fireZone: null },
  'antioch-ca':           { gov: 'https://www.antiochca.gov', buildingDept: 'https://www.antiochca.gov/community-development/building-inspection', permitPortal: null, fireZone: null },
  'concord-ca':           { gov: 'https://www.cityofconcord.org', buildingDept: 'https://www.cityofconcord.org/280/Building', permitPortal: null, fireZone: null },
  'richmond-ca':          { gov: 'https://www.ci.richmond.ca.us', buildingDept: 'https://www.ci.richmond.ca.us/172/Building-Division', permitPortal: null, fireZone: null },
  'san-ramon-ca':         { gov: 'https://www.sanramon.ca.gov', buildingDept: 'https://www.sanramon.ca.gov/our_city/departments_and_divisions/building', permitPortal: null, fireZone: null },
  'walnut-creek-ca':      { gov: 'https://www.walnut-creek.org', buildingDept: 'https://www.walnut-creek.org/departments/community-development/building-division', permitPortal: null, fireZone: null },
  'larkspur-ca':          { gov: 'https://www.cityoflarkspur.org', buildingDept: 'https://www.cityoflarkspur.org/137/Building-Division', permitPortal: null, fireZone: null },
  'mill-valley-ca':       { gov: 'https://www.cityofmillvalley.org', buildingDept: 'https://www.cityofmillvalley.org/142/Building', permitPortal: null, fireZone: null },
  'novato-ca':            { gov: 'https://www.novato.org', buildingDept: 'https://www.novato.org/departments/community-development/building', permitPortal: null, fireZone: null },
  'san-rafael-ca':        { gov: 'https://www.cityofsanrafael.org', buildingDept: 'https://www.cityofsanrafael.org/building/', permitPortal: null, fireZone: null },
  'american-canyon-ca':   { gov: 'https://www.cityofamericancanyon.org', buildingDept: null, permitPortal: null, fireZone: null },
  'calistoga-ca':         { gov: 'https://www.ci.calistoga.ca.us', buildingDept: null, permitPortal: null, fireZone: null },
  'napa-ca':              { gov: 'https://www.cityofnapa.org', buildingDept: 'https://www.cityofnapa.org/176/Building', permitPortal: null, fireZone: null },
  'st-helena-ca':         { gov: 'https://www.cityofsthelena.org', buildingDept: null, permitPortal: null, fireZone: null },
  'yountville-ca':        { gov: 'https://www.townofyountville.com', buildingDept: null, permitPortal: null, fireZone: null },
  'campbell-ca':          { gov: 'https://www.campbellca.gov', buildingDept: 'https://www.campbellca.gov/199/Building', permitPortal: null, fireZone: null },
  'cupertino-ca':         { gov: 'https://www.cupertino.org', buildingDept: 'https://www.cupertino.org/our-city/departments/community-development/building', permitPortal: null, fireZone: null },
  'los-gatos-ca':         { gov: 'https://www.losgatosca.gov', buildingDept: 'https://www.losgatosca.gov/153/Building', permitPortal: null, fireZone: null },
  'milpitas-ca':          { gov: 'https://www.milpitas.gov', buildingDept: 'https://www.milpitas.gov/government/community-development/building-safety', permitPortal: null, fireZone: null },
  'mountain-view-ca':     { gov: 'https://www.mountainview.gov', buildingDept: 'https://www.mountainview.gov/departments/community-development/building', permitPortal: null, fireZone: null },
  'palo-alto-ca':         { gov: 'https://www.cityofpaloalto.org', buildingDept: 'https://www.cityofpaloalto.org/Departments/Planning-Development-Services/Building-and-Inspection', permitPortal: null, fireZone: null },
  'san-jose-ca':          { gov: 'https://www.sanjoseca.gov', buildingDept: 'https://www.sanjoseca.gov/your-government/departments/planning-building-code-enforcement/building', permitPortal: 'https://www.sjpermits.org', fireZone: 'https://www.sanjoseca.gov/your-government/departments/fire-department' },
  'santa-clara-ca':       { gov: 'https://www.santaclaraca.gov', buildingDept: 'https://www.santaclaraca.gov/our-city/departments-g-z/permitting-division', permitPortal: null, fireZone: null },
  'saratoga-ca':          { gov: 'https://www.saratoga.ca.us', buildingDept: 'https://www.saratoga.ca.us/241/Building', permitPortal: null, fireZone: null },
  'sunnyvale-ca':         { gov: 'https://www.sunnyvale.ca.gov', buildingDept: 'https://www.sunnyvale.ca.gov/business/building-permits', permitPortal: null, fireZone: null },
};

// County-level facts shared across cities in that county
const COUNTY_FACTS = {
  'alameda-county-ca': {
    seismic: 'Hayward Fault and Calaveras Fault. Structural tie-down inspection scrutiny on additions and reroofs.',
    climate: 'Mild Mediterranean. Coastal cities (Oakland, Berkeley, Alameda) see fog corrosion. Inland (Livermore, Pleasanton) see 95°F+ summers.',
    fireRisk: 'Oakland Hills + Berkeley Hills are WUI Local Responsibility Areas — Class A roofing required.',
    cooperatingAuthorities: 'East Bay MUD (water), PG&E (gas/electric), Alameda County Public Works.',
  },
  'contra-costa-county-ca': {
    seismic: 'Hayward Fault, Concord Fault. Higher liquefaction risk in Antioch/Pittsburg delta zones.',
    climate: 'Hot inland summers (Walnut Creek, Concord, Antioch) reach 100°F+. Drives shingle thermal cycling and AC demand.',
    fireRisk: 'East Bay hills + Diablo Range are State Responsibility Area Very High FHSZ in parts of San Ramon, Lafayette, Orinda, Danville.',
    cooperatingAuthorities: 'East Bay MUD or Contra Costa Water District, PG&E.',
  },
  'marin-county-ca': {
    seismic: 'San Andreas Fault western edge. Most of Marin is moderate seismic.',
    climate: 'Coastal fog (Mill Valley, Larkspur). Inland (Novato) drier and warmer.',
    fireRisk: 'Most of Marin is in WUI High or Very High FHSZ. Strict Class A roofing + ember-resistant vents required.',
    cooperatingAuthorities: 'Marin Municipal Water District, PG&E, MarinCounty.org Building.',
  },
  'napa-county-ca': {
    seismic: 'West Napa Fault — moderate to high seismic risk. 2014 South Napa earthquake reference.',
    climate: 'Hot dry summers, mild wet winters. Wine-country aesthetic conventions on rural parcels.',
    fireRisk: 'Most of Napa County is WUI Very High FHSZ post-2017 wildfires. Defensible-space and Class A required.',
    cooperatingAuthorities: 'Napa County Building Dept, PG&E, local water districts.',
  },
  'santa-clara-county-ca': {
    seismic: 'San Andreas, Calaveras, Hayward faults. Liquefaction zones in San Jose alluvial plains.',
    climate: 'Hot summers in San Jose, Cupertino, Santa Clara (95°F+). Cooler in Los Gatos foothills.',
    fireRisk: 'Saratoga, Los Gatos hills, parts of Cupertino are WUI Very High FHSZ. Foothills require Class A roofing.',
    cooperatingAuthorities: 'Santa Clara Valley Water District, PG&E or Santa Clara Municipal Utilities (Santa Clara city).',
  },
  // Sonoma not in current city list but kept for future expansion
};

function blank() {
  return {
    citySlug: '',
    cityDisplay: '',
    county: '',
    countyDisplay: '',
    sourceUrls: { gov: null, buildingDept: null, permitPortal: null, fireZone: null },
    countyFacts: { seismic: null, climate: null, fireRisk: null, cooperatingAuthorities: null },
    permits: {
      roofing: { fee: null, feeStructure: null, turnaroundDays: null, inspectorQuirks: null, sourceUrl: null, lastFetched: null },
      siding: { fee: null, feeStructure: null, turnaroundDays: null, inspectorQuirks: null, sourceUrl: null, lastFetched: null },
      windows: { fee: null, feeStructure: null, turnaroundDays: null, inspectorQuirks: null, sourceUrl: null, lastFetched: null },
      adu: { fee: null, feeStructure: null, turnaroundDays: null, inspectorQuirks: null, sourceUrl: null, lastFetched: null },
      'custom-homes': { fee: null, feeStructure: null, turnaroundDays: null, inspectorQuirks: null, sourceUrl: null, lastFetched: null },
      additions: { fee: null, feeStructure: null, turnaroundDays: null, inspectorQuirks: null, sourceUrl: null, lastFetched: null },
      decks: { fee: null, feeStructure: null, turnaroundDays: null, inspectorQuirks: null, sourceUrl: null, lastFetched: null },
    },
    neighborhoods: [],
    notes: 'Skeleton. Permit fees pulled by scripts/scrape-permits.mjs. Per-service insights pulled by per-page agent.',
  };
}

let written = 0, merged = 0;
for (const city of cities) {
  const path = join(SPINE_DIR, `${city.slug}.json`);
  const skel = blank();
  skel.citySlug = city.slug;
  skel.cityDisplay = city.display;
  skel.county = city.county;
  skel.countyDisplay = city.countyDisplay;
  skel.sourceUrls = CITY_ANCHORS[city.slug] || skel.sourceUrls;
  skel.countyFacts = COUNTY_FACTS[city.county] || skel.countyFacts;

  if (existsSync(path)) {
    const existing = JSON.parse(readFileSync(path, 'utf8'));
    // Preserve any enriched permit data + neighborhoods
    const next = { ...skel, permits: existing.permits || skel.permits, neighborhoods: existing.neighborhoods?.length ? existing.neighborhoods : skel.neighborhoods };
    writeFileSync(path, JSON.stringify(next, null, 2));
    merged++;
  } else {
    writeFileSync(path, JSON.stringify(skel, null, 2));
    written++;
  }
}

console.log(`Seeded ${cities.length} city spine files (${written} new, ${merged} merged)`);
console.log('Cities lacking buildingDept URL (need follow-up research):');
for (const city of cities) {
  if (!CITY_ANCHORS[city.slug]?.buildingDept) console.log(`  ${city.slug}`);
}
