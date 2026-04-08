#!/usr/bin/env node
/**
 * update-ghost-pseo.js
 *
 * Differentiates city-service roofing pages in Ghost CMS by adding
 * city-specific content to style descriptions and FAQ answers.
 *
 * Usage:
 *   node update-ghost-pseo.js --dry-run   # preview changes
 *   node update-ghost-pseo.js             # apply changes
 */

const jwt = require('jsonwebtoken');
const https = require('https');
const url = require('url');

// ── Config ──────────────────────────────────────────────────────────────────
const GHOST_URL = 'https://ghost-production-42337.up.railway.app';
const ADMIN_API_KEY = '69c71d579c35510001523fba:2f9762c88acc7b71e89628048932a5ac6c1329bce7e72722a36218b500a07084';
const DRY_RUN = process.argv.includes('--dry-run');

// ── City data ───────────────────────────────────────────────────────────────
const CITY_DATA = {
  'oakland': { climate: 'mild Mediterranean with 23 inches annual rain', fireZone: true, fireNote: 'Oakland Hills homes require Class A fire-rated materials', homeAge: 'pre-1960', medianHome: '$850,000', roofCost: '$10,000–$28,000' },
  'berkeley': { climate: 'Bay-adjacent with coastal fog and wind exposure', fireZone: true, fireNote: 'Berkeley Hills is in a WUI fire zone requiring Class A materials', homeAge: '1900s Craftsman-era', medianHome: '$1,400,000', roofCost: '$12,000–$32,000' },
  'fremont': { climate: 'warmer inland East Bay climate', fireZone: false, homeAge: '1960s-1990s ranch-style', medianHome: '$1,350,000', roofCost: '$12,000–$32,000' },
  'hayward': { climate: 'moderate Bay Area climate with hillside wind exposure', fireZone: false, homeAge: '1950s-1970s', medianHome: '$850,000', roofCost: '$10,000–$28,000' },
  'san-leandro': { climate: 'moderate coastal influence', fireZone: false, homeAge: '1940s-1960s post-war', medianHome: '$800,000', roofCost: '$10,000–$26,000' },
  'walnut-creek': { climate: 'hot inland summers exceeding 90°F', fireZone: true, fireNote: 'Many neighborhoods adjacent to open space require Class A fire-rated roofing', homeAge: '1970s-1990s', medianHome: '$1,100,000', roofCost: '$12,000–$32,000' },
  'concord': { climate: 'warm inland climate with summer heat', fireZone: false, homeAge: '1960s-1980s', medianHome: '$700,000', roofCost: '$8,000–$24,000' },
  'san-ramon': { climate: 'inland East Bay with warm summers', fireZone: true, fireNote: 'Parts of San Ramon are in WUI fire zones', homeAge: '1980s-2010s', medianHome: '$1,300,000', roofCost: '$12,000–$32,000' },
  'richmond': { climate: 'coastal with salt air and moisture exposure', fireZone: false, homeAge: '1940s-1960s', medianHome: '$650,000', roofCost: '$8,000–$24,000' },
  'antioch': { climate: 'hot inland delta climate', fireZone: false, homeAge: 'mixed new and older', medianHome: '$575,000', roofCost: '$8,000–$22,000' },
  'san-rafael': { climate: 'Marin County marine influence with mild temperatures', fireZone: false, homeAge: 'mid-century mixed', medianHome: '$1,200,000', roofCost: '$12,000–$32,000' },
  'mill-valley': { climate: 'cool coastal with redwood canopy shade and moisture', fireZone: true, fireNote: 'Mill Valley is in a high fire severity zone — Class A fire-rated materials required', homeAge: 'hillside custom homes', medianHome: '$1,800,000', roofCost: '$15,000–$40,000' },
  'novato': { climate: 'warmer inland Marin with moderate summers', fireZone: true, fireNote: 'Some Novato neighborhoods border open space requiring fire-rated roofing', homeAge: '1970s-1990s', medianHome: '$950,000', roofCost: '$10,000–$30,000' },
  'larkspur': { climate: 'sheltered Marin climate with coastal fog', fireZone: true, fireNote: 'Larkspur falls within fire severity zones requiring Class A roofing', homeAge: 'premium architectural', medianHome: '$1,600,000', roofCost: '$15,000–$38,000' },
  'napa': { climate: 'hot valley summers exceeding 95°F with cool wet winters', fireZone: false, homeAge: 'historic Old Town to 2000s development', medianHome: '$750,000', roofCost: '$10,000–$28,000' },
  'american-canyon': { climate: 'Napa County transitional climate', fireZone: false, homeAge: 'mostly post-1990', medianHome: '$650,000', roofCost: '$8,000–$24,000' },
  'st-helena': { climate: 'Napa Valley wine country heat with significant thermal cycling', fireZone: true, fireNote: 'Surrounded by wildfire-prone areas', homeAge: 'premium wine country estates', medianHome: '$1,500,000', roofCost: '$15,000–$40,000' },
  'calistoga': { climate: 'extreme Napa Valley heat with geothermal activity', fireZone: true, fireNote: 'Surrounded by wildfire-prone terrain — Class A materials strongly recommended', homeAge: 'small-town mixed', medianHome: '$900,000', roofCost: '$10,000–$30,000' },
  'yountville': { climate: 'Napa Valley wine country with hot summers', fireZone: false, homeAge: 'well-maintained premium', medianHome: '$1,200,000', roofCost: '$12,000–$35,000' },
  'san-jose': { climate: 'warmest Bay Area city with summer highs above 85°F', fireZone: false, homeAge: 'pre-war to mid-century ranch', medianHome: '$1,300,000', roofCost: '$10,000–$30,000' },
  'palo-alto': { climate: 'mild Peninsula climate with coastal influence', fireZone: false, homeAge: 'historic and complex rooflines', medianHome: '$3,500,000', roofCost: '$15,000–$45,000' },
  'mountain-view': { climate: 'moderate South Bay with tech-driven demand', fireZone: false, homeAge: '1950s-1960s ranch-style', medianHome: '$2,000,000', roofCost: '$12,000–$35,000' },
  'sunnyvale': { climate: 'moderate South Bay climate', fireZone: false, homeAge: '1950s-1970s tech boom era', medianHome: '$1,800,000', roofCost: '$12,000–$35,000' },
  'cupertino': { climate: 'moderate Silicon Valley climate', fireZone: false, homeAge: '1960s-1980s', medianHome: '$2,500,000', roofCost: '$12,000–$38,000' },
  'santa-clara': { climate: 'moderate South Bay', fireZone: false, homeAge: '1930s-2000s mixed', medianHome: '$1,500,000', roofCost: '$10,000–$32,000' },
  'saratoga': { climate: 'hillside microclimate with some wind exposure', fireZone: true, fireNote: 'Many hillside homes are in WUI fire zones', homeAge: 'large custom homes', medianHome: '$3,200,000', roofCost: '$18,000–$50,000' },
  'los-gatos': { climate: 'foothill microclimate transitioning from valley to mountains', fireZone: true, fireNote: 'Hillside properties may require fire-rated materials', homeAge: 'historic downtown to hillside custom', medianHome: '$2,200,000', roofCost: '$15,000–$45,000' },
  'campbell': { climate: 'central Silicon Valley moderate climate', fireZone: false, homeAge: '1950s-1975 mid-century', medianHome: '$1,400,000', roofCost: '$10,000–$30,000' },
  'milpitas': { climate: 'moderate East San Jose foothills', fireZone: false, homeAge: '1960s-2010s mixed', medianHome: '$1,200,000', roofCost: '$10,000–$30,000' },
};

// ── Helpers ─────────────────────────────────────────────────────────────────

function makeToken() {
  const [id, secret] = ADMIN_API_KEY.split(':');
  const iat = Math.floor(Date.now() / 1000);
  return jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/',
  });
}

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(path, GHOST_URL);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.pathname + parsed.search,
      method,
      headers: {
        'Authorization': `Ghost ${makeToken()}`,
        'Content-Type': 'application/json',
        'Accept-Version': 'v5.0',
      },
    };
    if (body) {
      const data = JSON.stringify(body);
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }
    const req = https.request(options, (res) => {
      let chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${text.slice(0, 500)}`));
        } else {
          resolve(JSON.parse(text));
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function cityName(slug) {
  // sa-city-alameda-county-ca-oakland-ca-roofing -> oakland
  // sa-city-napa-county-ca-napa-ca-roofing -> napa
  // Also handle county-level pages (skip them)
  const m = slug.match(/^sa-city-[a-z-]+-county-ca-([a-z-]+)-ca-roofing$/);
  if (!m) return null;
  return m[1];
}

function displayName(key) {
  // san-jose -> San Jose, st-helena -> St. Helena
  return key
    .split('-')
    .map((w) => {
      if (w === 'st') return 'St.';
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

// ── Content generation ──────────────────────────────────────────────────────

function generateStyleSuffix(styleSlug, city, data) {
  const name = displayName(city);
  switch (styleSlug) {
    case 'asphalt-shingles':
      return ` In ${name}'s ${data.climate}, architectural shingles typically last 25\u201330 years with proper installation.`;
    case 'metal-roofs': {
      let s = ` For ${name} homeowners, metal roofing is especially beneficial given the ${data.climate}.`;
      if (data.fireZone) s += ` ${data.fireNote}.`;
      return s;
    }
    case 'tile-shingles':
      return ` Tile is a popular choice among ${name} homeowners with ${data.homeAge} homes for its durability and timeless curb appeal.`;
    case 'energy-roofs':
      return ` With median home values at ${data.medianHome} in ${name}, a GAF Energy roof can increase property value while reducing electricity costs.`;
    default:
      return '';
  }
}

// Map display names to style slugs for matching
const STYLE_SLUG_MAP = {
  'Asphalt Shingles': 'asphalt-shingles',
  'Metal Roofs': 'metal-roofs',
  'Metal Roof': 'metal-roofs',
  'Tile Shingles': 'tile-shingles',
  'Tile Roof': 'tile-shingles',
  'Energy Roofs': 'energy-roofs',
  'Energy Roof': 'energy-roofs',
  'GAF Energy': 'energy-roofs',
};

function guessStyleSlug(styleName) {
  // Try exact match first
  if (STYLE_SLUG_MAP[styleName]) return STYLE_SLUG_MAP[styleName];
  // Try case-insensitive partial match
  const lower = styleName.toLowerCase();
  if (lower.includes('asphalt') || lower.includes('shingle')) return 'asphalt-shingles';
  if (lower.includes('metal')) return 'metal-roofs';
  if (lower.includes('tile')) return 'tile-shingles';
  if (lower.includes('energy') || lower.includes('solar') || lower.includes('gaf')) return 'energy-roofs';
  return null;
}

// ── Main logic ──────────────────────────────────────────────────────────────

async function main() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE UPDATE'}\n`);

  // Fetch all posts with slug pattern sa-*-roofing
  let page = 1;
  let posts = [];
  while (true) {
    const res = await request('GET',
      `/ghost/api/admin/posts/?filter=slug:~'sa-'&formats=mobiledoc&limit=50&page=${page}`
    );
    posts = posts.concat(res.posts);
    if (res.meta.pagination.pages <= page) break;
    page++;
  }

  // Filter to roofing posts only
  posts = posts.filter((p) => p.slug.match(/^sa-.+-roofing$/));
  console.log(`Found ${posts.length} roofing posts\n`);

  let updated = 0;
  let skipped = 0;

  for (const post of posts) {
    const city = cityName(post.slug);
    if (!city || !CITY_DATA[city]) {
      console.log(`SKIP: ${post.slug} — no city data for "${city}"`);
      skipped++;
      continue;
    }

    const data = CITY_DATA[city];
    const name = displayName(city);
    console.log(`\n── ${name} (${post.slug}, id=${post.id}) ──`);

    // Parse mobiledoc
    let mobiledoc;
    try {
      mobiledoc = JSON.parse(post.mobiledoc);
    } catch (e) {
      console.log(`  ERROR: Could not parse mobiledoc: ${e.message}`);
      skipped++;
      continue;
    }

    // Find HTML card
    const htmlCardIndex = mobiledoc.cards.findIndex((c) => c[0] === 'html');
    if (htmlCardIndex === -1) {
      console.log('  ERROR: No HTML card found');
      skipped++;
      continue;
    }

    const htmlContent = mobiledoc.cards[htmlCardIndex][1].html;
    // Extract JSON from <script type="application/json">...</script>
    const scriptMatch = htmlContent.match(/<script\s+type="application\/json">([\s\S]*?)<\/script>/);
    if (!scriptMatch) {
      console.log('  ERROR: No JSON script tag found in HTML card');
      skipped++;
      continue;
    }

    let pageData;
    try {
      pageData = JSON.parse(scriptMatch[1]);
    } catch (e) {
      console.log(`  ERROR: Could not parse page JSON: ${e.message}`);
      skipped++;
      continue;
    }

    let changes = [];

    // 1. Update style descriptions (in sections[] where type === 'styles')
    const stylesSection = (pageData.sections || []).find(s => s.type === 'styles');
    if (stylesSection && stylesSection.data && Array.isArray(stylesSection.data.items)) {
      for (const style of stylesSection.data.items) {
        const slug = guessStyleSlug(style.title || style.name || '');
        if (!slug) continue;

        const suffix = generateStyleSuffix(slug, city, data);
        if (!suffix) continue;

        const desc = style.description || '';
        // Check if already customized (avoid double-appending)
        if (desc.includes(name + '\u2019s') || desc.includes(name + ' homeowners') || desc.includes('median home values at')) {
          continue;
        }

        style.description = desc + suffix;
        changes.push(`  Style "${style.title}": appended city-specific sentence`);
      }
    }

    // 2. Update FAQ cost answer + materials answer (in localFaqs[])
    const faqs = pageData.localFaqs || pageData.faq || [];
    if (Array.isArray(faqs)) {
      for (const item of faqs) {
        const q = (item.question || '').toLowerCase();
        const a = item.answer || '';

        // Cost FAQ
        if (q.includes('cost') || q.includes('how much') || q.includes('price')) {
          if (a.includes('$8,000 to $25,000') || a.includes('$8,000\u2013$25,000') || a.includes('$8,000 \u2013 $25,000')) {
            item.answer = a
              .replace(/\$8,000\s*(?:to|\u2013|\u2014|-)\s*\$25,000/g, data.roofCost.replace('\u2013', ' to '));
            changes.push(`  FAQ cost: replaced generic range with ${data.roofCost}`);
          }
        }

        // Materials FAQ — add fire zone note
        if (data.fireZone && data.fireNote) {
          if (q.includes('material') || q.includes('what type') || q.includes('best roof') || q.includes('work best')) {
            if (!a.includes('fire') && !a.includes('Class A')) {
              item.answer = a + ` Note: ${data.fireNote}.`;
              changes.push(`  FAQ materials: added fire zone note`);
            }
          }
        }
      }
    }

    if (changes.length === 0) {
      console.log('  No changes needed (already customized or structure mismatch)');
      skipped++;
      continue;
    }

    for (const c of changes) console.log(c);

    if (DRY_RUN) {
      console.log('  [DRY RUN] Would update this post');
      updated++;
      continue;
    }

    // Re-serialize
    const newJson = JSON.stringify(pageData);
    const newHtml = htmlContent.replace(
      /<script\s+type="application\/json">[\s\S]*?<\/script>/,
      `<script type="application/json">${newJson}</script>`
    );
    mobiledoc.cards[htmlCardIndex][1].html = newHtml;

    // PUT update
    try {
      await request('PUT', `/ghost/api/admin/posts/${post.id}/`, {
        posts: [{
          mobiledoc: JSON.stringify(mobiledoc),
          updated_at: post.updated_at,
        }],
      });
      console.log(`  UPDATED successfully`);
      updated++;
    } catch (e) {
      console.log(`  ERROR updating: ${e.message}`);
    }

    await sleep(1000);
  }

  console.log(`\n── Summary ──`);
  console.log(`${DRY_RUN ? 'Would update' : 'Updated'}: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total posts: ${posts.length}`);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
