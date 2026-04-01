/**
 * Seed Ghost CMS with all service area pages.
 *
 * Generates city+service and county+service pages from templates,
 * then creates them as Ghost posts via the Admin API.
 *
 * Usage: bun run scripts/seed-ghost.ts
 */

import jwt from 'jsonwebtoken';
import { CITY_SEEDS } from '../src/lib/pseo/city-seed-data';
import { getServiceTemplate } from '../src/lib/pseo/service-templates';
import { generateCityServicePage, generateCountyServicePage, generateGeneralCityPage } from '../src/lib/pseo/generate';

// ── Config ──────────────────────────────────────────────────────────────────

const GHOST_URL = process.env.PUBLIC_GHOST_URL || '';
const GHOST_ADMIN_KEY = process.env.GHOST_ADMIN_API_KEY || '';
const GHOST_CONTENT_KEY = process.env.PUBLIC_GHOST_CONTENT_API_KEY || '';

if (!GHOST_URL || !GHOST_ADMIN_KEY) {
  console.error('Missing GHOST_URL or GHOST_ADMIN_API_KEY');
  process.exit(1);
}

const [adminId, adminSecret] = GHOST_ADMIN_KEY.split(':');

const SERVICES = ['roofing', 'siding', 'windows', 'adu', 'custom-homes', 'additions'];

const COUNTY_SLUGS = [
  'alameda-county-ca',
  'contra-costa-county-ca',
  'marin-county-ca',
  'napa-county-ca',
  'santa-clara-county-ca',
];

const COUNTY_SHORT_MAP: Record<string, string> = {
  'alameda-county-ca': 'alameda',
  'contra-costa-county-ca': 'contra-costa',
  'marin-county-ca': 'marin',
  'napa-county-ca': 'napa',
  'santa-clara-county-ca': 'santa-clara',
};

const CITY_URL_MAP: Record<string, string> = {};
for (const seed of CITY_SEEDS) {
  CITY_URL_MAP[seed.slug] = `${seed.slug}-ca`;
}

// ── Ghost Admin API helpers ─────────────────────────────────────────────────

function makeToken(): string {
  const iat = Math.floor(Date.now() / 1000);
  return jwt.sign({}, Buffer.from(adminSecret, 'hex'), {
    keyid: adminId,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/',
  });
}

async function ghostAdminFetch(endpoint: string, options: RequestInit = {}) {
  const token = makeToken();
  const url = `${GHOST_URL}/ghost/api/admin/${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Ghost ${token}`,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Ghost Admin API ${res.status}: ${body}`);
  }
  return res.json();
}

async function ghostContentFetch(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${GHOST_URL}/ghost/api/content/${endpoint}/`);
  url.searchParams.set('key', GHOST_CONTENT_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString());
  if (!res.ok) return null;
  return res.json();
}

async function postExists(slug: string): Promise<boolean> {
  try {
    const data = await ghostContentFetch(`posts/slug/${slug}`);
    return data?.posts?.length > 0;
  } catch {
    return false;
  }
}

function makeLexical(jsonData: unknown): string {
  const htmlContent = `<script type="application/json">${JSON.stringify(jsonData)}</script>`;
  return JSON.stringify({
    root: {
      children: [
        {
          type: 'html',
          version: 1,
          html: htmlContent,
        },
      ],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  });
}

async function createOrUpdatePost(slug: string, title: string, metaTitle: string, metaDescription: string, jsonData: unknown, tags: string[]): Promise<'created' | 'updated' | 'failed'> {
  const lexical = makeLexical(jsonData);

  // Check if post exists
  try {
    const existing = await ghostAdminFetch(`posts/slug/${slug}/`, { method: 'GET' });
    if (existing?.posts?.[0]) {
      // Update existing post with correct lexical content
      const post = existing.posts[0];
      await ghostAdminFetch(`posts/${post.id}/`, {
        method: 'PUT',
        body: JSON.stringify({
          posts: [{
            lexical,
            meta_title: metaTitle,
            meta_description: metaDescription,
            updated_at: post.updated_at,
          }],
        }),
      });
      return 'updated';
    }
  } catch {
    // Post doesn't exist, create it
  }

  try {
    await ghostAdminFetch('posts/', {
      method: 'POST',
      body: JSON.stringify({
        posts: [{
          title,
          slug,
          lexical,
          status: 'published',
          meta_title: metaTitle,
          meta_description: metaDescription,
          tags: tags.map(t => ({ name: t })),
        }],
      }),
    });
    return 'created';
  } catch (e: any) {
    console.error(`  FAIL: ${slug} — ${e.message}`);
    return 'failed';
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  let created = 0;
  let updated = 0;
  let failed = 0;

  // 1. City+service pages (29 cities x 6 services = 174 pages)
  console.log('\n=== City+Service Pages ===');
  for (const seed of CITY_SEEDS) {
    for (const serviceSlug of SERVICES) {
      const template = getServiceTemplate(serviceSlug);
      if (!template) { failed++; continue; }

      const data = generateCityServicePage(seed, template);
      if (!data) { failed++; continue; }

      const countyUrlSlug = `${seed.countySlug}-county-ca`;
      const cityUrlSlug = `${seed.slug}-ca`;
      const ghostSlug = `sa-city-${countyUrlSlug}-${cityUrlSlug}-${serviceSlug}`;

      const result = await createOrUpdatePost(
        ghostSlug,
        `${data.serviceName} in ${data.city}, CA`,
        data.title,
        data.description,
        data,
        ['#service-area-city-service'],
      );
      if (result === 'created') { created++; console.log(`  CREATED: ${ghostSlug}`); }
      else if (result === 'updated') { updated++; console.log(`  UPDATED: ${ghostSlug}`); }
      else { failed++; }
    }
  }

  // 2. County+service pages (5 counties x 6 services = 30 pages)
  console.log('\n=== County+Service Pages ===');
  for (const countySlug of COUNTY_SLUGS) {
    for (const serviceSlug of SERVICES) {
      const template = getServiceTemplate(serviceSlug);
      if (!template) { failed++; continue; }

      const data = generateCountyServicePage(countySlug, template);
      if (!data) { failed++; continue; }

      const ghostSlug = `sa-city-${countySlug}-${countySlug}-${serviceSlug}`;

      const result = await createOrUpdatePost(
        ghostSlug,
        data.title,
        data.title,
        data.description,
        data,
        ['#service-area-city-service'],
      );
      if (result === 'created') { created++; console.log(`  CREATED: ${ghostSlug}`); }
      else if (result === 'updated') { updated++; console.log(`  UPDATED: ${ghostSlug}`); }
      else { failed++; }
    }
  }

  // 3. General city pages (29 cities)
  console.log('\n=== General City Pages ===');
  for (const seed of CITY_SEEDS) {
    const countyUrlSlug = `${seed.countySlug}-county-ca`;
    const cityUrlSlug = `${seed.slug}-ca`;
    const ghostSlug = `sa-city-${countyUrlSlug}-${cityUrlSlug}`;

    const data = generateGeneralCityPage(seed);
    if (!data) { failed++; continue; }

    const result = await createOrUpdatePost(
      ghostSlug,
      `${data.city} Home Services`,
      data.title,
      data.description,
      data,
      ['#service-area-city'],
    );
    if (result === 'created') { created++; console.log(`  CREATED: ${ghostSlug}`); }
    else if (result === 'updated') { updated++; console.log(`  UPDATED: ${ghostSlug}`); }
    else { failed++; }
  }

  // 4. County pages (5 counties) — just check, these are manually managed
  console.log('\n=== County Pages ===');
  for (const countySlug of COUNTY_SLUGS) {
    const ghostSlug = `sa-county-${countySlug}`;
    try {
      const data = await ghostAdminFetch(`posts/slug/${ghostSlug}/`, { method: 'GET' });
      if (data?.posts?.[0]) {
        console.log(`  OK: ${ghostSlug}`);
      } else {
        console.log(`  MISSING: ${ghostSlug}`);
        failed++;
      }
    } catch {
      console.log(`  MISSING: ${ghostSlug}`);
      failed++;
    }
  }

  console.log(`\n=== Done ===`);
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed/Missing: ${failed}`);
}

main().catch(console.error);
