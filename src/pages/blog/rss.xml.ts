/**
 * RSS 2.0 feed for the Ground Up blog.
 *
 * Fetches posts from Ghost CMS and streams a valid RSS document.
 * Accessible at /blog/rss.xml — referenced in <head> via Layout.astro.
 *
 * Ghost's own RSS feed lives at /rss/ on the Ghost origin, but that URL
 * is never exposed to visitors. This endpoint re-exposes it on the
 * hamilton-exteriors.com domain so feed readers and social aggregators
 * resolve correctly.
 */

import type { APIContext } from 'astro';

const GHOST_URL = import.meta.env.PUBLIC_GHOST_URL || '';
const GHOST_KEY = import.meta.env.PUBLIC_GHOST_CONTENT_API_KEY || '';
const SITE_URL = 'https://hamilton-exteriors.com';

interface GhostPost {
  slug: string;
  title: string;
  excerpt: string | null;
  html: string | null;
  published_at: string;
  updated_at: string;
  feature_image: string | null;
  primary_tag: { name: string; slug: string } | null;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function fetchRecentPosts(limit = 20): Promise<GhostPost[]> {
  if (!GHOST_URL || !GHOST_KEY) return [];

  const url = new URL(`${GHOST_URL}/ghost/api/content/posts/`);
  url.searchParams.set('key', GHOST_KEY);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('page', '1');
  url.searchParams.set('fields', 'slug,title,excerpt,html,published_at,updated_at,feature_image');
  url.searchParams.set('include', 'tags');
  url.searchParams.set('formats', 'html');
  // Exclude internal service-area CMS posts
  url.searchParams.set(
    'filter',
    'tag:-hash-service-area-city+tag:-hash-service-area-county+tag:-hash-service-area-city-service+slug:-untitled',
  );

  const res = await fetch(url.toString(), { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`Ghost API ${res.status}`);
  const data = await res.json();
  return data?.posts ?? [];
}

function buildRss(posts: GhostPost[]): string {
  const now = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.published_at).toUTCString();
      const description = post.excerpt
        ? escapeXml(post.excerpt)
        : escapeXml(post.title);

      const imageTag = post.feature_image
        ? `<enclosure url="${escapeXml(post.feature_image)}" type="image/jpeg" length="0" />`
        : '';

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      ${imageTag}
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ground Up — Hamilton Exteriors</title>
    <link>${SITE_URL}/blog</link>
    <description>Expert insights on roofing, siding, ADUs, and home improvement across the Bay Area.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/og-default.jpg</url>
      <title>Ground Up — Hamilton Exteriors</title>
      <link>${SITE_URL}/blog</link>
    </image>
${items}
  </channel>
</rss>`;
}

export async function GET(_ctx: APIContext): Promise<Response> {
  try {
    const posts = await fetchRecentPosts(20);
    const xml = buildRss(posts);
    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        // Cache for 1 hour on the CDN / Railway edge
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (err) {
    // Return an empty but valid feed rather than a 500 that breaks readers
    const empty = buildRss([]);
    return new Response(empty, {
      status: 200,
      headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
  }
}
