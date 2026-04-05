import type { APIRoute } from 'astro';

// Import images so Astro resolves their hashed filenames at build time
import { heroBg, logoCert1, logoPartner1, logoGaf, logoPartner2 } from '../lib/images';
import { heroRoofing, roofingAsphalt, roofingMetal, roofingTile } from '../lib/images';
import { serviceSiding, sidingVinyl, sidingFiberCement, sidingWood, sidingStucco } from '../lib/images';
import { heroWindows } from '../lib/images';
import { areaOakland, areaSanJose, areaWalnutCreek } from '../lib/images';

import { GHOST_ORIGIN } from '../lib/ghost';

const SITE = 'https://hamilton-exteriors.com';
const GHOST_URL = import.meta.env.GHOST_URL || '';
const GHOST_KEY = import.meta.env.GHOST_CONTENT_API_KEY || '';

// Key pages and their primary images with SEO-optimized captions
const pageImages: { page: string; images: { src: string; title: string; caption: string }[] }[] = [
  {
    page: '/',
    images: [
      { src: heroBg.src, title: 'Hamilton Exteriors Bay Area contractor', caption: 'Bay Area roofing, siding, and exterior remodeling by Hamilton Exteriors' },
      { src: logoCert1.src, title: 'Owens Corning Preferred Contractor certification', caption: 'Hamilton Exteriors is an Owens Corning Preferred Contractor' },
      { src: logoPartner1.src, title: 'CertainTeed ShingleMaster certification', caption: 'CertainTeed ShingleMaster certified installer' },
      { src: logoGaf.src, title: 'GAF Certified Installer', caption: 'GAF Certified Installer for residential roofing' },
      { src: logoPartner2.src, title: 'James Hardie Elite Preferred installer', caption: 'James Hardie Elite Preferred siding installer in the Bay Area' },
    ],
  },
  {
    page: '/roofing',
    images: [
      { src: heroRoofing.src, title: 'Bay Area roofing services', caption: 'Professional roof installation by Hamilton Exteriors in the Bay Area' },
      { src: roofingAsphalt.src, title: 'Asphalt composite shingle roof', caption: 'Asphalt composite shingle installation — most popular roofing material in the Bay Area' },
      { src: roofingMetal.src, title: 'Standing seam metal roof', caption: 'Standing seam metal roofing installation in the Bay Area — 50+ year lifespan' },
      { src: roofingTile.src, title: 'Clay and concrete tile roof', caption: 'Tile roofing installation — fire-resistant Class A rated for California homes' },
    ],
  },
  {
    page: '/siding',
    images: [
      { src: serviceSiding.src, title: 'Bay Area siding installation', caption: 'Professional siding installation by Hamilton Exteriors — James Hardie Elite Preferred' },
      { src: sidingVinyl.src, title: 'Vinyl siding installation', caption: 'Premium vinyl siding installation in the Bay Area — CertainTeed and Ply Gem systems' },
      { src: sidingFiberCement.src, title: 'James Hardie fiber cement siding', caption: 'James Hardie fiber cement siding — HZ5 formulation for Bay Area climate' },
      { src: sidingWood.src, title: 'Stucco siding application', caption: 'Three-coat stucco installation — fire-rated for East Bay WUI zones' },
      { src: sidingStucco.src, title: 'Exterior waterproofing', caption: 'Commercial-grade exterior waterproofing for Bay Area homes' },
    ],
  },
  {
    page: '/windows',
    images: [
      { src: heroWindows.src, title: 'Bay Area window replacement', caption: 'Window replacement and installation by Hamilton Exteriors' },
    ],
  },
  {
    page: '/service-areas',
    images: [
      { src: areaOakland.src, title: 'Oakland CA exterior services', caption: 'Hamilton Exteriors serving Oakland, Alameda County' },
      { src: areaSanJose.src, title: 'San Jose CA exterior services', caption: 'Hamilton Exteriors serving San Jose, Santa Clara County' },
      { src: areaWalnutCreek.src, title: 'Walnut Creek CA exterior services', caption: 'Hamilton Exteriors serving Walnut Creek, Contra Costa County' },
    ],
  },
];

/**
 * Fetch blog posts from Ghost CMS and return their feature images.
 * Automatically picks up new posts — no manual updates needed.
 */
async function fetchBlogImages(): Promise<{ page: string; images: { src: string; title: string; caption: string }[] }[]> {
  if (!GHOST_URL || !GHOST_KEY) return [];

  try {
    const entries: { page: string; images: { src: string; title: string; caption: string }[] }[] = [];
    let page = 1;
    let more = true;

    while (more) {
      const url = new URL(`${GHOST_URL}/ghost/api/content/posts/`);
      url.searchParams.set('key', GHOST_KEY);
      url.searchParams.set('limit', '100');
      url.searchParams.set('page', String(page));
      url.searchParams.set('fields', 'slug,title,feature_image,excerpt');
      url.searchParams.set('filter', 'tag:-hash-service-area-city+tag:-hash-service-area-county+tag:-hash-service-area-city-service');

      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(10_000) });
      if (!res.ok) break;

      const data = await res.json();
      const posts = data?.posts ?? [];

      for (const post of posts) {
        if (!post.feature_image) continue;

        // Rewrite Ghost Railway domain to canonical domain
        const imgUrl = GHOST_ORIGIN && post.feature_image.startsWith(GHOST_ORIGIN)
          ? post.feature_image.replace(GHOST_ORIGIN, SITE)
          : post.feature_image;

        const caption = post.excerpt
          ? post.excerpt.slice(0, 200).replace(/\s+/g, ' ').trim()
          : post.title;

        entries.push({
          page: `/blog/${post.slug}`,
          images: [{
            src: imgUrl.startsWith(SITE) ? imgUrl.replace(SITE, '') : imgUrl,
            title: post.title,
            caption,
          }],
        });
      }

      more = posts.length === 100;
      page++;
    }

    return entries;
  } catch (e) {
    console.warn('[image-sitemap] Could not fetch Ghost posts:', (e as Error).message);
    return [];
  }
}

export const GET: APIRoute = async () => {
  // Fetch blog images from Ghost CMS (auto-updates when posts are added)
  const blogImages = await fetchBlogImages();
  const allPages = [...pageImages, ...blogImages];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  for (const entry of allPages) {
    xml += '  <url>\n';
    xml += `    <loc>${SITE}${entry.page}</loc>\n`;
    for (const img of entry.images) {
      // Use absolute URL: if src starts with http, use as-is; otherwise prepend SITE
      const imgLoc = img.src.startsWith('http') ? img.src : `${SITE}${img.src}`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${escapeXml(imgLoc)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(img.title)}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(img.caption)}</image:caption>\n`;
      xml += '    </image:image>\n';
    }
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
