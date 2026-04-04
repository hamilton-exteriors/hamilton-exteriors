import type { APIRoute } from 'astro';

const SITE = 'https://hamilton-exteriors.com';

// Key pages and their primary images with SEO-optimized captions
const pageImages: { page: string; images: { loc: string; title: string; caption: string }[] }[] = [
  {
    page: '/',
    images: [
      { loc: '/_astro/hero-bg-2400', title: 'Hamilton Exteriors Bay Area contractor', caption: 'Bay Area roofing, siding, and exterior remodeling by Hamilton Exteriors' },
      { loc: '/_astro/logo-cert-1', title: 'Owens Corning Preferred Contractor certification', caption: 'Hamilton Exteriors is an Owens Corning Preferred Contractor' },
      { loc: '/_astro/logo-partner-1', title: 'CertainTeed ShingleMaster certification', caption: 'CertainTeed ShingleMaster certified installer' },
      { loc: '/_astro/logo-gaf', title: 'GAF Certified Installer', caption: 'GAF Certified Installer for residential roofing' },
      { loc: '/_astro/logo-partner-2', title: 'James Hardie Elite Preferred installer', caption: 'James Hardie Elite Preferred siding installer in the Bay Area' },
    ],
  },
  {
    page: '/roofing',
    images: [
      { loc: '/_astro/hero-roofing', title: 'Bay Area roofing services', caption: 'Professional roof installation by Hamilton Exteriors in the Bay Area' },
      { loc: '/_astro/roofing-asphalt', title: 'Asphalt composite shingle roof', caption: 'Asphalt composite shingle installation — most popular roofing material in the Bay Area' },
      { loc: '/_astro/roofing-metal', title: 'Standing seam metal roof', caption: 'Standing seam metal roofing installation in the Bay Area — 50+ year lifespan' },
      { loc: '/_astro/roofing-tile', title: 'Clay and concrete tile roof', caption: 'Tile roofing installation — fire-resistant Class A rated for California homes' },
      { loc: '/_astro/roofing-solar', title: 'Solar energy roofing system', caption: 'Integrated solar roofing system — clean energy with roof protection' },
    ],
  },
  {
    page: '/siding',
    images: [
      { loc: '/_astro/service-siding', title: 'Bay Area siding installation', caption: 'Professional siding installation by Hamilton Exteriors — James Hardie Elite Preferred' },
      { loc: '/_astro/siding-vinyl', title: 'Vinyl siding installation', caption: 'Premium vinyl siding installation in the Bay Area — CertainTeed and Ply Gem systems' },
      { loc: '/_astro/siding-fiber-cement', title: 'James Hardie fiber cement siding', caption: 'James Hardie fiber cement siding — HZ5 formulation for Bay Area climate' },
      { loc: '/_astro/siding-wood', title: 'Stucco siding application', caption: 'Three-coat stucco installation — fire-rated for East Bay WUI zones' },
      { loc: '/_astro/siding-stucco', title: 'Exterior waterproofing', caption: 'Commercial-grade exterior waterproofing for Bay Area homes' },
    ],
  },
  {
    page: '/windows',
    images: [
      { loc: '/_astro/hero-windows', title: 'Bay Area window replacement', caption: 'Window replacement and installation by Hamilton Exteriors' },
    ],
  },
  {
    page: '/service-areas',
    images: [
      { loc: '/_astro/area-oakland', title: 'Oakland CA exterior services', caption: 'Hamilton Exteriors serving Oakland, Alameda County' },
      { loc: '/_astro/area-san-jose', title: 'San Jose CA exterior services', caption: 'Hamilton Exteriors serving San Jose, Santa Clara County' },
      { loc: '/_astro/area-walnut-creek', title: 'Walnut Creek CA exterior services', caption: 'Hamilton Exteriors serving Walnut Creek, Contra Costa County' },
    ],
  },
];

export const GET: APIRoute = async () => {
  // Build image sitemap XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  for (const entry of pageImages) {
    xml += '  <url>\n';
    xml += `    <loc>${SITE}${entry.page}</loc>\n`;
    for (const img of entry.images) {
      xml += '    <image:image>\n';
      // Use a pattern match since Astro hashes filenames — point to the canonical image path
      xml += `      <image:loc>${SITE}${img.loc}</image:loc>\n`;
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
      'Cache-Control': 'public, max-age=86400',
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
