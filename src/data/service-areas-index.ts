import type { ImageMetadata } from 'astro';
import { areaOakland, areaFremont, areaHayward, areaBerkeley, areaSanLeandro } from '../lib/images';

import { data as alameda } from './counties/alameda-county-ca';
import { data as contraCosta } from './counties/contra-costa-county-ca';
import { data as napa } from './counties/napa-county-ca';
import { data as santaClara } from './counties/santa-clara-county-ca';
import { data as marin } from './counties/marin-county-ca';

/* ── Page metadata ────────────────────────────────────────────── */

export const pageTitle =
  'Service Areas for ADU Contractor in Castro valley, CA | Hamilton Exteriors';

export const pageDescription =
  'Hamilton Exteriors serves the entire Bay Area. Find your local service area for expert ADU construction, roofing, siding, and window services.';

export const heroHeadline = 'Service Areas  ADU Contractor  Castro Valley';
export const heroFormTitle = 'Get a FREE QUOTE';

/* ── County card images (one representative photo per county) ── */

const countyCardImages: Record<string, ImageMetadata> = {
  'alameda-county-ca': areaOakland,
  'contra-costa-county-ca': areaFremont,
  'napa-county-ca': areaHayward,
  'santa-clara-county-ca': areaBerkeley,
  'marin-county-ca': areaSanLeandro,
};

/* ── County list (derived from data files) ────────────────────── */

export interface CountyCard {
  name: string;
  slug: string;
  image: ImageMetadata;
  cities: string[];
}

const allCountyData = [alameda, contraCosta, napa, santaClara, marin];

export const counties: CountyCard[] = allCountyData.map((c) => ({
  name: `${c.county}, ${c.state}`,
  slug: `/service-areas/${c.countySlug}`,
  image: countyCardImages[c.countySlug],
  cities: c.cities?.map((city) => city.name) ?? [],
}));
