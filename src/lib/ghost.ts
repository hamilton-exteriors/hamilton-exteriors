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
  if (options?.tag) params.filter = `tag:${options.tag}`;
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
    .filter((t: any) => t.count?.posts > 0)
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
 * Ghost wraps raw HTML in Koenig card markers; we extract the JSON from
 * a <script type="application/json"> tag inside the html field.
 */
function extractJsonFromHtml(html: string): unknown | null {
  // Match JSON inside <script type="application/json">...</script>
  const match = html.match(/<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/);
  if (!match?.[1]) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

/** Fetch a service-area city page from Ghost CMS. */
export async function getServiceAreaCity(
  countySlug: string,
  citySlug: string,
): Promise<ServiceAreaCity | null> {
  // Ghost normalizes -- to - in slugs
  const ghostSlug = `sa-city-${countySlug}-${citySlug}`;
  const cacheKey = ghostSlug;

  const cached = cacheGet<ServiceAreaCity>(cacheKey);
  if (cached) return cached;

  if (!isGhostConfigured()) return null;

  try {
    const post = await getPost(ghostSlug);
    if (!post?.html) return null;
    const data = extractJsonFromHtml(post.html) as ServiceAreaCity | null;
    if (data) {
      // Overlay Ghost SEO fields if present
      if (post.meta_title) data.title = post.meta_title;
      if (post.meta_description) data.description = post.meta_description;
      if (import.meta.env.DEV) console.log(`[ghost] city ${ghostSlug} — json desc: ${(data as any).description?.slice(0,60) ?? 'MISSING'}, meta_desc: ${post.meta_description?.slice(0,60) ?? 'null'}`);
      cacheSet(cacheKey, data);
    }
    return data;
  } catch {
    return null;
  }
}

/** Fetch a service-area county page from Ghost CMS. */
export async function getServiceAreaCounty(
  countySlug: string,
): Promise<CountyPageData | null> {
  const ghostSlug = `sa-county-${countySlug}`;
  const cacheKey = ghostSlug;

  const cached = cacheGet<CountyPageData>(cacheKey);
  if (cached) return cached;

  if (!isGhostConfigured()) return null;

  try {
    const post = await getPost(ghostSlug);
    if (!post?.html) return null;
    const data = extractJsonFromHtml(post.html) as CountyPageData | null;
    if (data) {
      if (post.meta_title) data.title = post.meta_title;
      if (post.meta_description) data.description = post.meta_description;
      cacheSet(cacheKey, data);
    }
    return data;
  } catch {
    return null;
  }
}

/** Fetch a service-area city+service page from Ghost CMS. */
export async function getServiceAreaCityService(
  countySlug: string,
  citySlug: string,
  serviceSlug: string,
): Promise<CityServicePageData | null> {
  const ghostSlug = `sa-city-${countySlug}-${citySlug}-${serviceSlug}`;
  const cacheKey = ghostSlug;

  const cached = cacheGet<CityServicePageData>(cacheKey);
  if (cached) return cached;

  if (!isGhostConfigured()) return null;

  try {
    const post = await getPost(ghostSlug);
    if (!post?.html) return null;
    const data = extractJsonFromHtml(post.html) as CityServicePageData | null;
    if (data) {
      if (post.meta_title) data.title = post.meta_title;
      if (post.meta_description) data.description = post.meta_description;
      if (import.meta.env.DEV) console.log(`[ghost] cityService ${ghostSlug} — json desc: ${(data as any).description?.slice(0,60) ?? 'MISSING'}, meta_desc: ${post.meta_description?.slice(0,60) ?? 'null'}`);
      cacheSet(cacheKey, data);
    }
    return data;
  } catch {
    return null;
  }
}

/** Fetch all service-area city posts (for index page / sitemap). */
export async function getAllServiceAreaCities(): Promise<
  Array<{ slug: string; countySlug: string; citySlug: string; title: string }>
> {
  const cacheKey = 'sa-city--all';
  const cached = cacheGet<Array<{ slug: string; countySlug: string; citySlug: string; title: string }>>(cacheKey);
  if (cached) return cached;

  if (!isGhostConfigured()) return [];

  try {
    const data = await ghostFetch('posts', {
      filter: 'tag:hash-service-area-city',
      fields: 'slug,title',
      limit: 'all',
    });
    const results = (data.posts ?? []).map((p: { slug: string; title: string }) => {
      // Slug format: sa-city-{countySlug}-{citySlug} (Ghost normalizes -- to -)
      // Parse by removing prefix and splitting on known county suffixes
      const withoutPrefix = p.slug.replace('sa-city-', '');
      // Find the county slug (ends with -county-ca)
      const countyMatch = withoutPrefix.match(/^(.+-county-ca)-(.+)$/);
      const parts = countyMatch ? [countyMatch[1], countyMatch[2]] : withoutPrefix.split('-');
      return {
        slug: p.slug,
        countySlug: parts[0] || '',
        citySlug: parts[1] || '',
        title: p.title,
      };
    });
    cacheSet(cacheKey, results);
    return results;
  } catch {
    return [];
  }
}
