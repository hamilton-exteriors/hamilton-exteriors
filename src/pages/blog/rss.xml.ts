/**
 * RSS 2.0 feed for the Ground Up blog.
 *
 * Uses @astrojs/rss for standards-compliant output and reuses getPosts()
 * from ghost.ts instead of duplicating fetch logic.
 *
 * Accessible at /blog/rss.xml — referenced in <head> via Layout.astro.
 */

import rss from '@astrojs/rss';
import { getPosts, isGhostConfigured, type GhostPost } from '../../lib/ghost';
import sanitizeHtml from 'sanitize-html';

const SITE_URL = 'https://hamilton-exteriors.com';

export async function GET(): Promise<Response> {
  if (!isGhostConfigured()) {
    // Return empty valid feed if Ghost isn't configured
    return rss({
      title: 'Ground Up — Hamilton Exteriors',
      description: 'Expert insights on roofing, siding, ADUs, and home improvement across the Bay Area.',
      site: SITE_URL,
      items: [],
    });
  }

  let posts: GhostPost[] = [];
  try {
    const result = await getPosts({ limit: 20, page: 1 });
    posts = result.posts;
  } catch {
    // Return empty valid feed on error — don't break RSS readers
    return rss({
      title: 'Ground Up — Hamilton Exteriors',
      description: 'Expert insights on roofing, siding, ADUs, and home improvement across the Bay Area.',
      site: SITE_URL,
      items: [],
    });
  }

  const response = await rss({
    title: 'Ground Up — Hamilton Exteriors',
    description: 'Expert insights on roofing, siding, ADUs, and home improvement across the Bay Area.',
    site: SITE_URL,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: [
      `<language>en-us</language>`,
      `<atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />`,
      `<image><url>${SITE_URL}/og-default.jpg</url><title>Ground Up — Hamilton Exteriors</title><link>${SITE_URL}/blog</link></image>`,
    ].join(''),
    items: posts.map((post) => ({
      title: post.title,
      link: `${SITE_URL}/blog/${post.slug}`,
      pubDate: new Date(post.published_at),
      description: post.custom_excerpt || post.excerpt || post.title,
      // Include full HTML content for readers that support it
      content: post.html
        ? sanitizeHtml(post.html, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedAttributes: {
              ...sanitizeHtml.defaults.allowedAttributes,
              img: ['src', 'alt', 'width', 'height', 'loading'],
            },
          })
        : undefined,
      ...(post.primary_tag && { categories: [post.primary_tag.name] }),
      ...(post.feature_image && {
        enclosure: {
          url: post.feature_image,
          type: 'image/jpeg',
          length: 0, // Ghost doesn't expose file sizes via API
        },
      }),
    })),
  });

  // Override cache headers for CDN caching
  response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');

  return response;
}
