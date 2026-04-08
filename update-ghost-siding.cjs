const jwt = require('jsonwebtoken');

const GHOST_URL = 'https://ghost-production-42337.up.railway.app';
const ADMIN_KEY = '69c71d579c35510001523fba:2f9762c88acc7b71e89628048932a5ac6c1329bce7e72722a36218b500a07084';

function makeToken() {
  const [id, secret] = ADMIN_KEY.split(':');
  return jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id, algorithm: 'HS256', expiresIn: '5m', audience: '/admin/'
  });
}

const CITY_DATA = {
  'oakland': { climate: 'mild Mediterranean with coastal fog', fireZone: true, homeStyle: 'Craftsman and Victorian', medianHome: '$850,000', sidingCost: '$12,000–$35,000', neighborhood: 'Rockridge' },
  'berkeley': { climate: 'Bay-adjacent with fog and wind', fireZone: true, homeStyle: 'Craftsman bungalow', medianHome: '$1,400,000', sidingCost: '$15,000–$40,000', neighborhood: 'Elmwood' },
  'fremont': { climate: 'warmer inland East Bay', fireZone: false, homeStyle: 'ranch-style', medianHome: '$1,350,000', sidingCost: '$12,000–$35,000', neighborhood: 'Mission San Jose' },
  'hayward': { climate: 'moderate with hillside exposure', fireZone: false, homeStyle: 'mid-century', medianHome: '$850,000', sidingCost: '$10,000–$30,000', neighborhood: 'Hayward Hills' },
  'san-leandro': { climate: 'moderate coastal influence', fireZone: false, homeStyle: 'post-war suburban', medianHome: '$800,000', sidingCost: '$10,000–$28,000', neighborhood: 'Estudillo Estates' },
  'walnut-creek': { climate: 'hot inland summers above 90°F', fireZone: true, homeStyle: 'suburban custom', medianHome: '$1,100,000', sidingCost: '$12,000–$38,000', neighborhood: 'Northgate' },
  'concord': { climate: 'warm inland', fireZone: false, homeStyle: '1960s-1980s tract', medianHome: '$700,000', sidingCost: '$10,000–$28,000', neighborhood: 'Dana Estates' },
  'san-ramon': { climate: 'inland East Bay warmth', fireZone: true, homeStyle: 'newer planned community', medianHome: '$1,300,000', sidingCost: '$12,000–$38,000', neighborhood: 'Dougherty Valley' },
  'richmond': { climate: 'coastal salt air and moisture', fireZone: false, homeStyle: 'waterfront and hillside', medianHome: '$650,000', sidingCost: '$10,000–$28,000', neighborhood: 'Point Richmond' },
  'antioch': { climate: 'hot delta climate', fireZone: false, homeStyle: 'mixed newer and older', medianHome: '$575,000', sidingCost: '$8,000–$25,000', neighborhood: 'Rivertown' },
  'san-rafael': { climate: 'Marin marine influence', fireZone: false, homeStyle: 'mid-century mixed', medianHome: '$1,200,000', sidingCost: '$12,000–$38,000', neighborhood: 'Gerstle Park' },
  'mill-valley': { climate: 'cool redwood canopy with moisture', fireZone: true, homeStyle: 'hillside custom', medianHome: '$1,800,000', sidingCost: '$18,000–$50,000', neighborhood: 'Cascade Canyon' },
  'novato': { climate: 'warmer inland Marin', fireZone: true, homeStyle: '1970s-1990s suburban', medianHome: '$950,000', sidingCost: '$12,000–$35,000', neighborhood: 'Hamilton' },
  'larkspur': { climate: 'sheltered Marin with fog', fireZone: true, homeStyle: 'premium architectural', medianHome: '$1,600,000', sidingCost: '$15,000–$45,000', neighborhood: 'Greenbrae' },
  'napa': { climate: 'hot valley summers, cool wet winters', fireZone: false, homeStyle: 'historic and newer development', medianHome: '$750,000', sidingCost: '$10,000–$32,000', neighborhood: 'Old Town' },
  'american-canyon': { climate: 'transitional Napa climate', fireZone: false, homeStyle: 'newer post-1990', medianHome: '$650,000', sidingCost: '$10,000–$28,000', neighborhood: 'Village Center' },
  'st-helena': { climate: 'extreme Napa heat with thermal cycling', fireZone: true, homeStyle: 'wine country estate', medianHome: '$1,500,000', sidingCost: '$18,000–$50,000', neighborhood: 'downtown historic' },
  'calistoga': { climate: 'extreme heat with geothermal activity', fireZone: true, homeStyle: 'small-town character', medianHome: '$900,000', sidingCost: '$12,000–$35,000', neighborhood: 'downtown' },
  'yountville': { climate: 'Napa Valley wine country heat', fireZone: false, homeStyle: 'premium maintained', medianHome: '$1,200,000', sidingCost: '$15,000–$40,000', neighborhood: 'Yountville proper' },
  'san-jose': { climate: 'warmest Bay Area city above 85°F summers', fireZone: false, homeStyle: 'bungalow to mid-century ranch', medianHome: '$1,300,000', sidingCost: '$12,000–$35,000', neighborhood: 'Willow Glen' },
  'palo-alto': { climate: 'mild Peninsula coastal influence', fireZone: false, homeStyle: 'historic with complex exteriors', medianHome: '$3,500,000', sidingCost: '$20,000–$55,000', neighborhood: 'Old Palo Alto' },
  'mountain-view': { climate: 'moderate South Bay', fireZone: false, homeStyle: '1950s-1960s ranch', medianHome: '$2,000,000', sidingCost: '$15,000–$42,000', neighborhood: 'Cuesta Park' },
  'sunnyvale': { climate: 'moderate South Bay', fireZone: false, homeStyle: '1950s-1970s', medianHome: '$1,800,000', sidingCost: '$12,000–$40,000', neighborhood: 'Lakewood' },
  'cupertino': { climate: 'moderate Silicon Valley', fireZone: false, homeStyle: '1960s-1980s suburban', medianHome: '$2,500,000', sidingCost: '$15,000–$45,000', neighborhood: 'Monta Vista' },
  'santa-clara': { climate: 'moderate South Bay', fireZone: false, homeStyle: '1930s-2000s mixed', medianHome: '$1,500,000', sidingCost: '$12,000–$38,000', neighborhood: 'Old Quad' },
  'saratoga': { climate: 'hillside with wind exposure', fireZone: true, homeStyle: 'large custom estates', medianHome: '$3,200,000', sidingCost: '$22,000–$60,000', neighborhood: 'Saratoga Village' },
  'los-gatos': { climate: 'foothill microclimate', fireZone: true, homeStyle: 'historic to hillside custom', medianHome: '$2,200,000', sidingCost: '$18,000–$50,000', neighborhood: 'Los Gatos downtown' },
  'campbell': { climate: 'central Silicon Valley moderate', fireZone: false, homeStyle: '1950s-1975 mid-century', medianHome: '$1,400,000', sidingCost: '$12,000–$35,000', neighborhood: 'Pruneyard' },
  'milpitas': { climate: 'moderate East San Jose foothills', fireZone: false, homeStyle: '1960s-2010s mixed', medianHome: '$1,200,000', sidingCost: '$12,000–$35,000', neighborhood: 'Sunnyhills' },
};

function cityName(slug) {
  return slug.split('-').map(w => {
    if (w === 'st') return 'St.';
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

// Base descriptions (what all cities currently have)
const BASE_VINYL = 'Vinyl siding is a versatile and durable exterior cladding made from PVC resin. It provides excellent resistance to weather, pests, and moisture, while requiring minimal maintenance. Available in a wide range of colors, textures, and styles.';
const BASE_FIBER = 'Fiber cement siding, particularly James Hardie products, is a premium exterior cladding made from a blend of cement, sand, and cellulose fibers. Renowned for its durability, it resists fire, pests, and harsh weather conditions while requiring minimal maintenance.';
const BASE_STUCCO = 'Stucco is a timeless and durable exterior finish made from a mixture of cement, sand, lime, and water. Known for its excellent weather resistance and energy efficiency, stucco provides a seamless, textured look that enhances both traditional and modern architectural designs.';
const BASE_WATERPROOF = 'Waterproofing ensures a home\'s exterior is protected from moisture, preventing water damage and mold. By creating a reliable barrier, it enhances the durability of siding materials and helps maintain a home\'s structural integrity in all weather conditions.';

function getVinylAppend(city, data) {
  const name = cityName(city);
  if (data.fireZone) {
    return ` In ${name}'s ${data.climate} climate, vinyl offers a cost-effective option for homeowners, though fire-zone properties should consider fiber cement for added protection.`;
  }
  return ` In ${name}'s ${data.climate} climate, vinyl is a cost-effective choice that holds up well with minimal upkeep — ideal for ${data.homeStyle} homes in the ${data.sidingCost} budget range.`;
}

function getFiberAppend(city, data) {
  const name = cityName(city);
  const isPremium = parseInt(data.medianHome.replace(/[$,]/g, '')) >= 1500000;
  let s = ` We recommend James Hardie fiber cement for ${name}'s ${data.homeStyle} homes, where ${data.climate} conditions demand long-term performance.`;
  if (data.fireZone) {
    s += ` As a designated fire zone area, fiber cement's Class A fire rating provides essential protection.`;
  }
  if (isPremium) {
    s += ` For a premium market like ${name} (median home ${data.medianHome}), James Hardie's design versatility matches the neighborhood's architectural standards.`;
  }
  return s;
}

function getStuccoAppend(city, data) {
  const name = cityName(city);
  return ` Stucco is especially popular on ${data.homeStyle} homes throughout ${name}'s ${data.neighborhood} neighborhood and surrounding areas, complementing the region's architectural character.`;
}

function getWaterproofAppend(city, data) {
  const name = cityName(city);
  if (data.climate.includes('fog') || data.climate.includes('moisture') || data.climate.includes('coastal') || data.climate.includes('marine') || data.climate.includes('salt')) {
    return ` In ${name}, where ${data.climate} creates persistent moisture exposure, comprehensive waterproofing is essential to prevent hidden damage behind siding.`;
  }
  if (data.climate.includes('hot') || data.climate.includes('heat') || data.climate.includes('warm') || data.climate.includes('above')) {
    return ` In ${name}'s ${data.climate}, waterproofing protects against thermal expansion stress and seasonal rain cycles that can drive moisture behind siding.`;
  }
  return ` ${name}'s ${data.climate} makes waterproofing a critical layer of defense, protecting your siding investment from seasonal weather shifts and moisture intrusion.`;
}

function modifyData(data, citySlug) {
  const cd = CITY_DATA[citySlug];
  if (!cd) return null;
  const name = cityName(citySlug);

  // 1. Modify style descriptions
  const stylesSection = data.sections.find(s => s.type === 'styles');
  if (stylesSection && stylesSection.data && stylesSection.data.items) {
    for (const item of stylesSection.data.items) {
      const title = item.title || '';
      if (title === 'Vinyl Siding') {
        item.description = BASE_VINYL + getVinylAppend(citySlug, cd);
      } else if (title === 'Fiber Cement Siding') {
        item.description = BASE_FIBER + getFiberAppend(citySlug, cd);
      } else if (title === 'Stucco Siding') {
        item.description = BASE_STUCCO + getStuccoAppend(citySlug, cd);
      } else if (title === 'Waterproofing') {
        item.description = BASE_WATERPROOF + getWaterproofAppend(citySlug, cd);
      }
    }
  }

  // 2. Modify FAQ cost answer
  for (const faq of data.localFaqs) {
    // Cost FAQ
    if (faq.question.toLowerCase().includes('cost')) {
      faq.answer = faq.answer.replace(
        /ranges from \$[\d,]+\s*(?:to|–)\s*\$[\d,]+/i,
        `ranges from ${cd.sidingCost.replace('–', ' to ')}`
      );
    }
    // Materials FAQ — add fire zone note and James Hardie premium note
    if (faq.question.toLowerCase().includes('material') || faq.question.toLowerCase().includes('best for')) {
      if (cd.fireZone && !faq.answer.includes('fire zone')) {
        faq.answer += ` Note: parts of ${name} are in a designated fire zone, making Class A fire-rated fiber cement the safest choice.`;
      }
      const isPremium = parseInt(cd.medianHome.replace(/[$,]/g, '')) >= 1800000;
      if (isPremium && !faq.answer.includes('premium')) {
        faq.answer += ` With ${name}'s median home value at ${cd.medianHome}, James Hardie's premium finishes protect both your home and your investment.`;
      }
    }
  }

  return data;
}

async function run() {
  const token = makeToken();
  const headers = { Authorization: 'Ghost ' + token, 'Content-Type': 'application/json' };

  // Fetch all posts (filter client-side since Ghost filter syntax is tricky)
  console.log('Fetching all posts...');
  const res = await fetch(`${GHOST_URL}/ghost/api/admin/posts/?limit=all&formats=mobiledoc`, { headers });
  const body = await res.json();

  // Filter to city-level siding posts (not county-level)
  // City-level: sa-city-alameda-county-ca-oakland-ca-siding
  // County-level: sa-city-alameda-county-ca-siding OR sa-city-alameda-county-ca-alameda-county-ca-siding
  const sidingPosts = body.posts.filter(p => {
    const slug = p.slug;
    if (!slug.startsWith('sa-city-') || !slug.endsWith('-siding')) return false;
    // Exclude county-level duplicates (slug contains county name twice)
    if (slug.includes('county-ca-') && slug.match(/county-ca/g).length >= 2) return false;
    // Must have a city segment between county-ca- and -ca-siding
    const match = slug.match(/county-ca-(.+?)-ca-siding$/);
    return !!match;
  });

  console.log(`Found ${sidingPosts.length} city-level siding posts`);

  let updated = 0;
  let skipped = 0;

  for (const post of sidingPosts) {
    const slug = post.slug;

    // Parse mobiledoc
    const mobiledoc = JSON.parse(post.mobiledoc);
    const html = mobiledoc.cards[0][1].html;
    const scriptMatch = html.match(/<script type="application\/json">([\s\S]*?)<\/script>/);
    if (!scriptMatch) {
      console.log(`SKIP ${slug}: no script tag found`);
      skipped++;
      continue;
    }

    const data = JSON.parse(scriptMatch[1]);
    const citySlug = data.citySlug;

    if (!citySlug || !CITY_DATA[citySlug]) {
      console.log(`SKIP ${slug}: citySlug="${citySlug}" not in CITY_DATA`);
      skipped++;
      continue;
    }

    // Modify the data
    const modified = modifyData(data, citySlug);
    if (!modified) {
      console.log(`SKIP ${slug}: modifyData returned null`);
      skipped++;
      continue;
    }

    // Rebuild mobiledoc
    const newJson = JSON.stringify(modified);
    const newHtml = html.replace(
      /<script type="application\/json">[\s\S]*?<\/script>/,
      `<script type="application/json">${newJson}</script>`
    );
    mobiledoc.cards[0][1].html = newHtml;

    // PUT update
    const updateRes = await fetch(`${GHOST_URL}/ghost/api/admin/posts/${post.id}/`, {
      method: 'PUT',
      headers: { Authorization: 'Ghost ' + makeToken(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        posts: [{
          mobiledoc: JSON.stringify(mobiledoc),
          updated_at: post.updated_at
        }]
      })
    });

    if (updateRes.ok) {
      const result = await updateRes.json();
      console.log(`OK ${slug} (${citySlug}) — updated_at: ${result.posts[0].updated_at}`);
      updated++;
    } else {
      const err = await updateRes.text();
      console.log(`FAIL ${slug}: ${updateRes.status} ${err.substring(0, 200)}`);
    }

    // 1 second delay
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
}

run().catch(e => { console.error(e); process.exit(1); });
