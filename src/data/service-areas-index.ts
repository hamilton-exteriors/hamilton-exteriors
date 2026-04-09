import type { ImageMetadata } from 'astro';
import { areaOakland, areaFremont, areaNapa, areaSanJose, areaMillValley, areaRedwoodCity } from '../lib/images';

import { data as alameda } from './counties/alameda-county-ca';
import { data as contraCosta } from './counties/contra-costa-county-ca';
import { data as napa } from './counties/napa-county-ca';
import { data as santaClara } from './counties/santa-clara-county-ca';
import { data as marin } from './counties/marin-county-ca';
import { data as sanMateo } from './counties/san-mateo-county-ca';

/* ── Page metadata ────────────────────────────────────────────── */

export const pageTitle =
  'Bay Area Service Areas | Hamilton Exteriors';

export const pageDescription =
  'Hamilton Exteriors serves Alameda, Contra Costa, Marin, Napa, Santa Clara & San Mateo counties. Expert roofing, siding, windows, and ADU construction across the Bay Area.';

export const heroHeadline = "Serving 6 Counties  Across the  Bay Area";
export const heroFormTitle = 'Get Your Free Quote';

/* ── County card images (one representative photo per county) ── */

const countyCardImages: Record<string, ImageMetadata> = {
  'alameda-county-ca': areaOakland,
  'contra-costa-county-ca': areaFremont,
  'napa-county-ca': areaNapa,
  'santa-clara-county-ca': areaSanJose,
  'marin-county-ca': areaMillValley,
  'san-mateo-county-ca': areaRedwoodCity,
};

/* ── County list (derived from data files) ────────────────────── */

export interface CountyCard {
  name: string;
  slug: string;
  image: ImageMetadata;
  cities: string[];
}

const allCountyData = [alameda, contraCosta, napa, santaClara, marin, sanMateo];

export const counties: CountyCard[] = allCountyData.map((c) => ({
  name: `${c.county}, ${c.state}`,
  slug: `/service-areas/${c.countySlug}`,
  image: countyCardImages[c.countySlug],
  cities: c.cities?.map((city) => city.name) ?? [],
}));
