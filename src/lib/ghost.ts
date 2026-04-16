// Ghost config — server-only (no PUBLIC_ prefix = not bundled into client JS)
const GHOST_URL = import.meta.env.GHOST_URL || '';
const GHOST_KEY = import.meta.env.GHOST_CONTENT_API_KEY || '';

/**
 * Rewrite Ghost Railway domain to canonical domain in image URLs.
 * Ghost prepends its Railway subdomain to /content/images/ paths.
 * Our middleware proxies /content/images/* to Ghost, so we rewrite
 * these URLs to go through the canonical domain instead.
 *
 * Single source of truth for the Ghost origin — import GHOST_ORIGIN
 * anywhere you need the raw Railway URL (middleware, image sitemap, etc.)
 */
export const GHOST_ORIGIN = import.meta.env.GHOST_URL || '';
const CANONICAL_DOMAIN = 'https://hamilton-exteriors.com';

/** Rewrite Ghost Railway URLs to canonical domain. Exported for reuse. */
export function stripGhostDomain(post: any): any {
  if (!post || !GHOST_ORIGIN) return post;
  if (post.feature_image?.startsWith(GHOST_ORIGIN)) {
    post.feature_image = post.feature_image.replace(GHOST_ORIGIN, CANONICAL_DOMAIN);
  }
  if (post.html) {
    post.html = post.html.replaceAll(GHOST_ORIGIN + '/content/images/', CANONICAL_DOMAIN + '/content/images/');
  }
  return post;
}

export interface GhostPost {
  id: string;
  slug: string;
  title: string;
  html: string;
  excerpt: string;
  custom_excerpt: string | null;
  feature_image: string | null;
  published_at: string;
  updated_at: string;
  reading_time: number;
  meta_title: string | null;
  meta_description: string | null;
  primary_author?: { name: string; slug: string } | null;
  tags: { id: string; name: string; slug: string }[];
  primary_tag: { name: string; slug: string } | null;
}

export interface GhostPagination {
  page: number;
  limit: number;
  pages: number;
  total: number;
}

async function ghostFetch(endpoint: string, params: Record<string, string> = {}) {
  if (!GHOST_URL || !GHOST_KEY) {
    throw new Error('Ghost CMS not configured. Set GHOST_URL and GHOST_CONTENT_API_KEY env vars.');
  }
  const url = new URL(`${GHOST_URL}/ghost/api/content/${endpoint}/`);
  url.searchParams.set('key', GHOST_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString(), { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`Ghost API error: ${res.status}`);
  return res.json();
}

export async function getPosts(options?: {
  page?: number;
  limit?: number;
  tag?: string;
}): Promise<{ posts: GhostPost[]; pagination: GhostPagination }> {
  const params: Record<string, string> = {
    include: 'tags',
    formats: 'html',
    limit: String(options?.limit ?? 12),
    page: String(options?.page ?? 1),
    fields: 'id,slug,title,html,excerpt,feature_image,published_at,updated_at,reading_time,meta_title,meta_description',
  };
  // Exclude service area CMS pages from blog listings
  const excludeFilters = [
    'tag:-hash-service-area-city',
    'tag:-hash-service-area-county',
    'tag:-hash-service-area-city-service',
    'tag:-hash-hash-sub-service',
    'title:-Untitled',
  ];
  const tagFilter = options?.tag ? `tag:${options.tag}` : '';
  params.filter = [tagFilter, ...excludeFilters].filter(Boolean).join('+');
  const data = await ghostFetch('posts', params);
  return { posts: (data.posts || []).map(stripGhostDomain), pagination: data.meta.pagination };
}

export async function getPost(slug: string): Promise<GhostPost | null> {
  const data = await ghostFetch(`posts/slug/${slug}`, {
    include: 'tags',
    formats: 'html',
  });
  return stripGhostDomain(data.posts?.[0]) ?? null;
}

export interface GhostTag {
  name: string;
  slug: string;
  count: number;
}

/** Human-readable names for Ghost tag slugs */
const TAG_DISPLAY_NAMES: Record<string, string> = {
  'blog-post': 'Blog',
  'cost-guide': 'Cost Guide',
  'cost-guide-2': 'Cost Guide',
  'roofing': 'Roofing',
  'siding': 'Siding',
  'windows-doors': 'Windows & Doors',
  'adu-additions': 'ADU & Additions',
  'materials': 'Materials',
  'comparison': 'Comparison',
  'maintenance': 'Maintenance',
  'warranty': 'Warranty',
  'fire-safety': 'Fire Safety',
  'regulations': 'Regulations',
  'hiring-tips': 'Hiring Tips',
  'timeline': 'Timeline',
  'warning-signs': 'Warning Signs',
  'seasonal': 'Seasonal',
};

/** Tags to hide from the public filter UI — internal/structural tags only */
const HIDDEN_TAGS = new Set([
  'hash-service-area-city',
  'hash-service-area-county',
  'hash-service-area-city-service',
  'hash-hash-sub-service',
  'location_page',
  'blog-post',  // internal type tag, not a content category
]);

export async function getTags(): Promise<GhostTag[]> {
  const data = await ghostFetch('tags', {
    include: 'count.posts',
    limit: 'all',
  });
  return (data.tags ?? [])
    .filter((t: any) => t.count?.posts > 0 && !t.slug.startsWith('hash-') && !HIDDEN_TAGS.has(t.slug))
    .map((t: any) => ({
      name: TAG_DISPLAY_NAMES[t.slug] || t.name.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
      slug: t.slug,
      count: t.count.posts,
    }));
}

export function isGhostConfigured(): boolean {
  return Boolean(GHOST_URL && GHOST_KEY);
}


export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ── Service Area Pages (Ghost-powered) ────────────────────── */

import { cacheGet, cacheSet } from './ghost-cache';
import type { ServiceAreaCity } from './service-area-types';
import type { GeneralCityPageData } from './general-city-types';
import type { CountyPageData } from './county-page-types';
import type { CityServicePageData } from './city-service-types';

/**
 * Fix common UTF-8 mojibake patterns caused by Ghost's content pipeline
 * interpreting UTF-8 bytes as Windows-1252/Latin-1.
 */
function fixMojibake(text: string): string {
  return text
    .replace(/\u00e2\u0080\u0094/g, '\u2014')   // â€" → — (em dash)
    .replace(/\u00e2\u0080\u0093/g, '\u2013')   // â€" → – (en dash)
    .replace(/\u00e2\u0080\u0099/g, '\u2019')   // â€™ → ' (right single quote)
    .replace(/\u00e2\u0080\u0098/g, '\u2018')   // â€˜ → ' (left single quote)
    .replace(/\u00e2\u0080\u009c/g, '\u201c')   // â€œ → " (left double quote)
    .replace(/\u00e2\u0080\u009d/g, '\u201d')   // â€ → " (right double quote)
    .replace(/\u00c2\u00a0/g, '\u00a0');         // Â  → non-breaking space
}

/**
 * Extract JSON data from Ghost HTML card.
 */
function extractJsonFromHtml(html: string): unknown | null {
  const match = html.match(/<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/);
  if (!match?.[1]) return null;
  try {
    // Fix any mojibake before parsing — Ghost's content pipeline can corrupt
    // UTF-8 em dashes, smart quotes, etc. when stored via mobiledoc.
    const cleaned = fixMojibake(match[1]);
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

/**
 * Bulk-fetch ALL service area posts from Ghost in one request and cache them by slug.
 * Called once on first access — eliminates N+1 API calls that cause rate limiting.
 */
let _saWarmPromise: Promise<void> | null = null;
const _saCache = new Map<string, GhostPost>();

async function warmServiceAreaCache(): Promise<void> {
  if (_saCache.size > 0) return; // already warmed
  if (!isGhostConfigured()) return;

  // Bulk-fetch all service area posts by internal tag (~5 API calls total)
  const tags = ['hash-service-area-city', 'hash-service-area-county', 'hash-service-area-city-service'];

  for (const tag of tags) {
    let page = 1;
    let more = true;
    while (more) {
      try {
        const data = await ghostFetch('posts', {
          filter: `tag:${tag}`,
          include: 'tags',
          formats: 'html',
          limit: '100',
          page: String(page),
        });
        const posts: GhostPost[] = data?.posts ?? [];
        for (const post of posts) {
          _saCache.set(post.slug, post);
        }
        more = posts.length === 100;
        page++;
      } catch (e) {
        console.error(`[ghost] Failed to fetch tag ${tag} page ${page}:`, e);
        more = false;
      }
    }
  }

  console.log(`[ghost] Warmed service area cache: ${_saCache.size} posts`);
}

function ensureWarmed(): Promise<void> {
  if (!_saWarmPromise) {
    _saWarmPromise = warmServiceAreaCache();
  }
  return _saWarmPromise;
}

function getServiceAreaPost(slug: string): GhostPost | undefined {
  return _saCache.get(slug);
}

/** Fetch a service-area city page from Ghost CMS. */
export async function getServiceAreaCity(
  countySlug: string,
  citySlug: string,
): Promise<GeneralCityPageData | null> {
  const ghostSlug = `sa-city-${countySlug}-${citySlug}`;

  const cached = cacheGet<GeneralCityPageData>(ghostSlug);
  if (cached) return cached;

  await ensureWarmed();
  const post = getServiceAreaPost(ghostSlug);
  if (!post?.html) return null;

  const data = extractJsonFromHtml(post.html) as GeneralCityPageData | null;
  if (data) {
    if (post.meta_title) data.title = post.meta_title;
    if (post.meta_description) data.description = post.meta_description;
    cacheSet(ghostSlug, data);
  }
  return data;
}

/** Fetch a service-area county page from Ghost CMS. */
export async function getServiceAreaCounty(
  countySlug: string,
): Promise<CountyPageData | null> {
  const ghostSlug = `sa-county-${countySlug}`;

  const cached = cacheGet<CountyPageData>(ghostSlug);
  if (cached) return cached;

  await ensureWarmed();
  const post = getServiceAreaPost(ghostSlug);
  if (!post?.html) return null;

  const data = extractJsonFromHtml(post.html) as CountyPageData | null;
  if (data) {
    if (post.meta_title) data.title = post.meta_title;
    if (post.meta_description) data.description = post.meta_description;
    cacheSet(ghostSlug, data);
  }
  return data;
}

/** Fetch a service-area city+service page from Ghost CMS. */
export async function getServiceAreaCityService(
  countySlug: string,
  citySlug: string,
  serviceSlug: string,
): Promise<CityServicePageData | null> {
  const ghostSlug = `sa-city-${countySlug}-${citySlug}-${serviceSlug}`;

  const cached = cacheGet<CityServicePageData>(ghostSlug);
  if (cached) return cached;

  await ensureWarmed();
  const post = getServiceAreaPost(ghostSlug);
  if (!post?.html) return null;

  const data = extractJsonFromHtml(post.html) as CityServicePageData | null;
  if (data) {
    if (post.meta_title) data.title = post.meta_title;
    if (post.meta_description) data.description = post.meta_description;
    cacheSet(ghostSlug, data);
  }
  return data;
}

/* ── Sub-Service Pages (Ghost-powered) ──────────────────────── */

import type { SubServiceData } from '../data/sub-services';

/** Minimal sub-service info for cross-links and sitemap */
export interface SubServiceRef {
  parentService: string;
  parentName: string;
  typeSlug: string;
  headline: string;
}

/** In-memory cache for sub-service Ghost posts */
let _subWarmPromise: Promise<void> | null = null;
const _subCache = new Map<string, GhostPost>();

async function warmSubServiceCache(): Promise<void> {
  if (_subCache.size > 0) return;
  if (!isGhostConfigured()) return;

  let page = 1;
  let more = true;
  while (more) {
    try {
      const data = await ghostFetch('posts', {
        filter: 'tag:hash-hash-sub-service',
        include: 'tags',
        formats: 'html',
        limit: '100',
        page: String(page),
      });
      const posts: GhostPost[] = data?.posts ?? [];
      for (const post of posts) {
        _subCache.set(post.slug, post);
      }
      more = posts.length === 100;
      page++;
    } catch (e) {
      console.error(`[ghost] Failed to fetch sub-service posts page ${page}:`, e);
      more = false;
    }
  }
  console.log(`[ghost] Warmed sub-service cache: ${_subCache.size} posts`);
}

function ensureSubWarmed(): Promise<void> {
  if (!_subWarmPromise) {
    _subWarmPromise = warmSubServiceCache();
  }
  return _subWarmPromise;
}

/**
 * Fetch a sub-service page from Ghost CMS.
 * Slug format: sub-{parentService}-{typeSlug} e.g. sub-roofing-metal
 * Returns the text fields (content, faqs, keyFacts) — images still come from static data.
 */
export async function getSubService(
  parentService: string,
  typeSlug: string,
): Promise<Partial<SubServiceData> | null> {
  const slug = `sub-${parentService}-${typeSlug}`;

  const cached = cacheGet<Partial<SubServiceData>>(slug);
  if (cached) return cached;

  await ensureSubWarmed();
  const post = _subCache.get(slug);
  if (!post?.html) return null;

  const data = extractJsonFromHtml(post.html) as Partial<SubServiceData> | null;
  if (data) {
    // Override title/description from Ghost meta if set
    if (post.meta_title) data.title = post.meta_title;
    if (post.meta_description) data.description = post.meta_description;
    cacheSet(slug, data);
  }
  return data;
}

/** Fetch all service-area city posts (for index page / sitemap). */
export async function getAllServiceAreaCities(): Promise<
  Array<{ slug: string; countySlug: string; citySlug: string; title: string }>
> {
  const cacheKey = 'sa-city--all';
  const cached = cacheGet<Array<{ slug: string; countySlug: string; citySlug: string; title: string }>>(cacheKey);
  if (cached) return cached;

  await ensureWarmed();

  const results: Array<{ slug: string; countySlug: string; citySlug: string; title: string }> = [];
  for (const [slug, post] of _saCache) {
    if (!slug.startsWith('sa-city-')) continue;
    // Skip city+service posts (have 4+ segments after sa-city-)
    const withoutPrefix = slug.replace('sa-city-', '');
    const countyMatch = withoutPrefix.match(/^(.+-county-ca)-([^-]+-ca)$/);
    if (!countyMatch) continue; // not a plain city post
    results.push({
      slug,
      countySlug: countyMatch[1],
      citySlug: countyMatch[2],
      title: post.title,
    });
  }

  cacheSet(cacheKey, results);
  return results;
}

/** Get sibling sub-services for cross-linking (e.g. all roofing sub-services). */
export async function getSubServicesForParent(parentService: string): Promise<SubServiceRef[]> {
  await ensureSubWarmed();
  const results: SubServiceRef[] = [];
  for (const [slug, post] of _subCache) {
    if (!slug.startsWith(`sub-${parentService}-`)) continue;
    const data = extractJsonFromHtml(post.html) as Partial<SubServiceData> | null;
    if (data?.parentService === parentService && data.typeSlug && data.headline) {
      results.push({
        parentService: data.parentService,
        parentName: data.parentName || parentService,
        typeSlug: data.typeSlug,
        headline: data.headline,
      });
    }
  }
  return results;
}

/** Get all sub-service slugs for sitemap generation. */
export async function getAllSubServiceSlugs(): Promise<Array<{ parentService: string; typeSlug: string; updatedAt: string }>> {
  await ensureSubWarmed();
  const results: Array<{ parentService: string; typeSlug: string; updatedAt: string }> = [];
  for (const [, post] of _subCache) {
    const data = extractJsonFromHtml(post.html) as Partial<SubServiceData> | null;
    if (data?.parentService && data.typeSlug) {
      results.push({
        parentService: data.parentService,
        typeSlug: data.typeSlug,
        updatedAt: post.updated_at,
      });
    }
  }
  return results;
}
