const GHOST_URL = import.meta.env.PUBLIC_GHOST_URL || '';
const GHOST_KEY = import.meta.env.PUBLIC_GHOST_CONTENT_API_KEY || '';

export interface GhostPost {
  id: string;
  slug: string;
  title: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  updated_at: string;
  reading_time: number;
  meta_title: string | null;
  meta_description: string | null;
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
    throw new Error('Ghost CMS not configured. Set PUBLIC_GHOST_URL and PUBLIC_GHOST_CONTENT_API_KEY.');
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
    limit: String(options?.limit ?? 12),
    page: String(options?.page ?? 1),
    fields: 'id,slug,title,excerpt,feature_image,published_at,updated_at,reading_time,meta_title,meta_description',
  };
  // Exclude service area CMS pages from blog listings
  const excludeFilters = [
    'tag:-hash-service-area-city',
    'tag:-hash-service-area-county',
    'tag:-hash-service-area-city-service',
  ];
  const tagFilter = options?.tag ? `tag:${options.tag}` : '';
  params.filter = [tagFilter, ...excludeFilters].filter(Boolean).join('+');
  const data = await ghostFetch('posts', params);
  return { posts: data.posts, pagination: data.meta.pagination };
}

export async function getPost(slug: string): Promise<GhostPost | null> {
  const data = await ghostFetch(`posts/slug/${slug}`, {
    include: 'tags',
  });
  return data.posts?.[0] ?? null;
}

export interface GhostTag {
  name: string;
  slug: string;
  count: number;
}

export async function getTags(): Promise<GhostTag[]> {
  const data = await ghostFetch('tags', {
    include: 'count.posts',
    limit: 'all',
  });
  return (data.tags ?? [])
    .filter((t: any) => t.count?.posts > 0 && !t.slug.startsWith('hash-service-area'))
    .map((t: any) => ({ name: t.name, slug: t.slug, count: t.count.posts }));
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
import type { CountyPageData } from './county-page-types';
import type { CityServicePageData } from './city-service-types';

/**
 * Extract JSON data from Ghost HTML card.
 */
function extractJsonFromHtml(html: string): unknown | null {
  const match = html.match(/<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/);
  if (!match?.[1]) return null;
  try {
    return JSON.parse(match[1]);
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

  // Bulk-fetch all service area posts by tag — ~5 API calls instead of 400+
  const tags = ['hash-service-area-city', 'hash-service-area-county', 'hash-service-area-city-service'];
  for (const tag of tags) {
    let page = 1;
    let more = true;
    while (more) {
      try {
        const data = await ghostFetch('posts', {
          filter: `tag:${tag}`,
          include: 'tags',
          limit: '100',
          page: String(page),
        });
        const posts: GhostPost[] = data.posts ?? [];
        for (const post of posts) {
          _saCache.set(post.slug, post);
        }
        more = posts.length === 100;
        page++;
      } catch (e) {
        if (import.meta.env.DEV) console.error(`[ghost] Failed to fetch tag ${tag} page ${page}:`, e);
        more = false;
      }
    }
  }

  // Fallback: if no tagged posts found, fetch ALL posts and filter by slug prefix
  if (_saCache.size === 0) {
    let page = 1;
    let more = true;
    while (more) {
      try {
        const data = await ghostFetch('posts', {
          include: 'tags',
          limit: '100',
          page: String(page),
        });
        const posts: GhostPost[] = data.posts ?? [];
        for (const post of posts) {
          if (post.slug.startsWith('sa-')) {
            _saCache.set(post.slug, post);
          }
        }
        more = posts.length === 100;
        page++;
      } catch {
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
): Promise<ServiceAreaCity | null> {
  const ghostSlug = `sa-city-${countySlug}-${citySlug}`;

  const cached = cacheGet<ServiceAreaCity>(ghostSlug);
  if (cached) return cached;

  await ensureWarmed();
  const post = getServiceAreaPost(ghostSlug);
  if (!post?.html) return null;

  const data = extractJsonFromHtml(post.html) as ServiceAreaCity | null;
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
