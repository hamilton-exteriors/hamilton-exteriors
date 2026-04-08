const jwt = require('jsonwebtoken');
const https = require('https');

const GHOST_URL = 'https://ghost-production-42337.up.railway.app';
const ADMIN_API_KEY = '69c71d579c35510001523fba:2f9762c88acc7b71e89628048932a5ac6c1329bce7e72722a36218b500a07084';

const CITY_DATA = {
  'milpitas': { buildCost: '$350\u2013$550/sq ft', lotNote: 'Milpitas offers affordable East San Jose foothills lots with good freeway access for commuters', style: 'Contemporary and modern designs popular with tech professionals', permitTime: '3-5 months', medianHome: '$1,200,000', neighborhood: 'Sunnyhills' },
  'campbell': { buildCost: '$375\u2013$600/sq ft', lotNote: 'Campbell\'s central Silicon Valley location makes teardown-and-rebuild projects highly viable', style: 'Mid-century modern rebuilds and contemporary new construction', permitTime: '3-5 months', medianHome: '$1,400,000', neighborhood: 'Pruneyard' },
  'santa-clara': { buildCost: '$375\u2013$600/sq ft', lotNote: 'Santa Clara offers infill opportunities near tech campuses where new construction outperforms renovation', style: 'Modern contemporary with smart home integration', permitTime: '3-5 months', medianHome: '$1,500,000', neighborhood: 'Old Quad' },
  'yountville': { buildCost: '$450\u2013$800/sq ft', lotNote: 'Yountville\'s small-town charm and strict design standards require architects experienced with wine country aesthetics', style: 'Wine country luxury with indoor-outdoor living emphasis', permitTime: '4-8 months with design review', medianHome: '$1,200,000', neighborhood: 'Yountville proper' },
  'calistoga': { buildCost: '$400\u2013$700/sq ft', lotNote: 'Calistoga\'s geothermal activity and wildfire risk require specialized site assessment and materials', style: 'Rustic wine country character with modern amenities and fire-resistant construction', permitTime: '4-6 months', medianHome: '$900,000', neighborhood: 'downtown Calistoga' },
  'american-canyon': { buildCost: '$325\u2013$500/sq ft', lotNote: 'American Canyon offers the most affordable new construction opportunity in Napa County with newer infrastructure', style: 'Traditional and contemporary suburban styles', permitTime: '3-4 months', medianHome: '$650,000', neighborhood: 'Village Center' },
};

function getStyleAdditions(citySlug, cityData) {
  const city = citySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    'Ground-Up Construction': `In ${city}, ground-up custom homes typically cost ${cityData.buildCost} depending on finishes and complexity. ${cityData.lotNote}. ${cityData.style}, with homes in ${cityData.neighborhood} setting the standard for new construction quality.`,
    'Design & Architecture': `${city} custom homes benefit from architects who understand local design review requirements. ${cityData.style}. In ${cityData.neighborhood}, homes with thoughtful architecture command premium resale values in a market where the median home is ${cityData.medianHome}.`,
    'Engineering & Permits': `${city} permitting typically takes ${cityData.permitTime} for custom home construction. ${cityData.lotNote}. Working with engineers experienced in ${city}'s soil conditions and seismic requirements is essential for a smooth approval process.`,
    'Additions & Renovations': `Major additions and renovations in ${city} cost ${cityData.buildCost} for high-quality work. With a median home value of ${cityData.medianHome}, significant additions in ${cityData.neighborhood} often deliver strong ROI. ${cityData.style}.`,
  };
}

function makeToken() {
  const [id, secret] = ADMIN_API_KEY.split(':');
  return jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/',
  });
}

function ghostRequest(method, path, body) {
  const token = makeToken();
  const url = new URL(`/ghost/api/admin/${path}`, GHOST_URL);

  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method,
      headers: {
        'Authorization': `Ghost ${token}`,
        'Content-Type': 'application/json',
        'Accept-Version': 'v5.0',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed)}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${data.substring(0, 500)}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractCitySlug(postSlug) {
  const counties = ['alameda-county-ca', 'contra-costa-county-ca', 'marin-county-ca', 'napa-county-ca', 'santa-clara-county-ca'];
  for (const county of counties) {
    const suffix = '-ca-custom-homes';
    const prefix = `sa-city-${county}-`;
    if (postSlug.startsWith(prefix) && postSlug.endsWith(suffix)) {
      return postSlug.slice(prefix.length, -suffix.length);
    }
  }
  // fallback: try all known city slugs
  for (const citySlug of Object.keys(CITY_DATA)) {
    if (postSlug.includes(citySlug + '-ca-custom-homes')) return citySlug;
  }
  return null;
}

function modifyPostData(jsonData, citySlug, cityData) {
  const data = JSON.parse(JSON.stringify(jsonData));
  const city = citySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const additions = getStyleAdditions(citySlug, cityData);
  let modified = false;

  // Modify style items in sections[].data.items[]
  for (const section of (data.sections || [])) {
    if (section.type === 'styles' && section.data && Array.isArray(section.data.items)) {
      for (const item of section.data.items) {
        const addition = additions[item.title];
        if (addition && !item.description.includes(cityData.neighborhood)) {
          item.description = item.description.trimEnd() + ' ' + addition;
          modified = true;
        }
      }
    }
  }

  // Modify localFaqs
  if (data.localFaqs && Array.isArray(data.localFaqs)) {
    for (const faq of data.localFaqs) {
      const qLower = faq.question.toLowerCase();
      // Cost FAQ
      if (qLower.includes('cost') || qLower.includes('price') || qLower.includes('how much')) {
        if (!faq.answer.includes(cityData.buildCost)) {
          faq.answer = faq.answer.replace(
            /\$\d{3,}[–\-]\$?\d{1,},?\d{0,3}\s*(?:per square foot|\/sq(?:uare)?\s*f(?:oo)?t)/i,
            cityData.buildCost
          );
          if (!faq.answer.includes(cityData.buildCost)) {
            faq.answer = `In ${city}, custom home construction typically costs ${cityData.buildCost} depending on finishes and site conditions. ` + faq.answer;
          }
          modified = true;
        }
      }
      // Permit / timeline FAQ
      if (qLower.includes('permit') || qLower.includes('how long') || qLower.includes('timeline') || qLower.includes('time')) {
        if (!faq.answer.includes(cityData.permitTime)) {
          faq.answer = faq.answer.trimEnd() + ` In ${city}, expect the permitting process to take ${cityData.permitTime}.`;
          modified = true;
        }
      }
    }
  }

  return { data, modified };
}

async function main() {
  console.log('Fetching all custom-homes posts...');
  console.log(`Looking for 6 remaining cities: ${Object.keys(CITY_DATA).join(', ')}\n`);

  let allPosts = [];
  let page = 1;
  while (true) {
    const result = await ghostRequest('GET', `posts/?formats=mobiledoc&limit=100&page=${page}`);
    const posts = result.posts.filter(p => p.slug.startsWith('sa-city-') && p.slug.endsWith('-custom-homes'));
    allPosts.push(...posts);
    if (!result.meta.pagination.next) break;
    page++;
  }

  console.log(`Found ${allPosts.length} total custom-homes posts`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const post of allPosts) {
    const citySlug = extractCitySlug(post.slug);
    if (!citySlug || !CITY_DATA[citySlug]) {
      // Not one of our 6 target cities, silently skip
      continue;
    }

    const cityData = CITY_DATA[citySlug];
    console.log(`\nProcessing: ${post.slug} (city: ${citySlug})`);

    let mobiledoc;
    try {
      mobiledoc = JSON.parse(post.mobiledoc);
    } catch (e) {
      console.log(`  ERROR: Could not parse mobiledoc`);
      errors++;
      continue;
    }

    let cardIndex = -1;
    let htmlContent = '';
    for (let i = 0; i < mobiledoc.cards.length; i++) {
      if (mobiledoc.cards[i][0] === 'html' && mobiledoc.cards[i][1].html.includes('application/json')) {
        cardIndex = i;
        htmlContent = mobiledoc.cards[i][1].html;
        break;
      }
    }

    if (cardIndex === -1) {
      console.log(`  ERROR: No JSON script tag found in mobiledoc`);
      errors++;
      continue;
    }

    const scriptMatch = htmlContent.match(/<script\s+type="application\/json">([\s\S]*?)<\/script>/);
    if (!scriptMatch) {
      console.log(`  ERROR: Could not extract JSON from script tag`);
      errors++;
      continue;
    }

    let jsonData;
    try {
      jsonData = JSON.parse(scriptMatch[1]);
    } catch (e) {
      console.log(`  ERROR: Could not parse JSON data: ${e.message}`);
      errors++;
      continue;
    }

    const { data: newData, modified } = modifyPostData(jsonData, citySlug, cityData);

    if (!modified) {
      console.log(`  Already differentiated, skipping`);
      skipped++;
      continue;
    }

    const newJson = JSON.stringify(newData);
    const newHtml = htmlContent.replace(
      /<script\s+type="application\/json">[\s\S]*?<\/script>/,
      `<script type="application/json">${newJson}</script>`
    );

    mobiledoc.cards[cardIndex][1].html = newHtml;

    try {
      const updateBody = {
        posts: [{
          mobiledoc: JSON.stringify(mobiledoc),
          updated_at: post.updated_at,
        }]
      };

      const result = await ghostRequest('PUT', `posts/${post.id}/`, updateBody);
      console.log(`  UPDATED: ${result.posts[0].slug}`);
      updated++;
    } catch (e) {
      console.log(`  ERROR updating: ${e.message}`);
      errors++;
    }

    await sleep(1000);
  }

  console.log(`\n=== DONE ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
