const jwt = require('jsonwebtoken');
const https = require('https');

const GHOST_URL = 'https://ghost-production-42337.up.railway.app';
const ADMIN_API_KEY = '69c71d579c35510001523fba:2f9762c88acc7b71e89628048932a5ac6c1329bce7e72722a36218b500a07084';

const CITY_DATA = {
  'milpitas': { additionCost: '$225\u2013$400/sq ft', homeAge: '1960s-2010s mixed housing stock', lotSize: 'Milpitas lots average 5,000-6,000 sq ft with room for extensions', foundation: 'Most Milpitas homes have slab foundations that can support second story additions with proper engineering', medianHome: '$1,200,000', neighborhood: 'Sunnyhills', permitTime: '3-5 months' },
  'campbell': { additionCost: '$250\u2013$425/sq ft', homeAge: '1950s-1975 mid-century homes are prime candidates for additions', lotSize: 'Campbell lots average 5,000-6,000 sq ft \u2014 room extensions are popular where second stories aren\'t feasible', foundation: 'Many mid-century Campbell homes have perimeter foundations that need reinforcement for second story additions', medianHome: '$1,400,000', neighborhood: 'Pruneyard', permitTime: '3-5 months' },
  'santa-clara': { additionCost: '$250\u2013$425/sq ft', homeAge: '1930s-2000s mixed \u2014 older homes near SCU often benefit most from additions', lotSize: 'Santa Clara lots average 5,000-6,000 sq ft', foundation: 'Homes from the 1930s-1960s may need foundation upgrades before adding a second story', medianHome: '$1,500,000', neighborhood: 'Old Quad', permitTime: '3-5 months' },
  'yountville': { additionCost: '$300\u2013$550/sq ft', homeAge: 'Premium maintained homes in wine country', lotSize: 'Yountville lots are small but highly valued \u2014 room extensions maximize existing footprint', foundation: 'Yountville\'s design review board ensures additions are compatible with the town\'s character', medianHome: '$1,200,000', neighborhood: 'Yountville proper', permitTime: '4-8 months with design review' },
  'calistoga': { additionCost: '$275\u2013$500/sq ft', homeAge: 'Small-town character homes with potential for expansion', lotSize: 'Calistoga lots average 5,000-8,000 sq ft \u2014 room for detached guest houses', foundation: 'Calistoga\'s geothermal activity means soil assessment is critical before any foundation work', medianHome: '$900,000', neighborhood: 'downtown Calistoga', permitTime: '4-6 months' },
  'american-canyon': { additionCost: '$200\u2013$375/sq ft', homeAge: 'Mostly post-1990 homes \u2014 newer foundations handle additions well', lotSize: 'American Canyon lots are often 5,000-7,000 sq ft with flexible setbacks', foundation: 'Newer construction means most homes already have foundations engineered to current seismic standards', medianHome: '$650,000', neighborhood: 'Village Center', permitTime: '3-4 months' },
};

function getStyleAdditions(citySlug, cityData) {
  const city = citySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    'Second Story Additions': `${cityData.foundation}. ${city}'s ${cityData.homeAge} means a structural engineer's assessment is the essential first step for any second-story project.`,
    'Room Extensions': `${cityData.lotSize}. In the ${cityData.neighborhood} area, room extensions are a popular way to add living space without the complexity of going vertical.`,
    'ADUs & Guest Houses': `With a median home value of ${cityData.medianHome}, ${city} homeowners can expect strong rental income from an ADU \u2014 often $2,000\u2013$3,500/month depending on size and finishes.`,
    'Full Remodels': `Full remodels in ${city} typically cost ${cityData.additionCost}. At the current median home value of ${cityData.medianHome}, a comprehensive remodel in ${cityData.neighborhood} typically delivers 60\u201380% ROI.`,
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
    const suffix = '-ca-additions';
    const prefix = `sa-city-${county}-`;
    if (postSlug.startsWith(prefix) && postSlug.endsWith(suffix)) {
      return postSlug.slice(prefix.length, -suffix.length);
    }
  }
  for (const citySlug of Object.keys(CITY_DATA)) {
    if (postSlug.includes(citySlug + '-ca-additions')) return citySlug;
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

      // Cost FAQ — replace generic cost range with city-specific
      if (qLower.includes('cost') || qLower.includes('price') || qLower.includes('how much')) {
        if (!faq.answer.includes(cityData.additionCost)) {
          faq.answer = faq.answer.replace(
            /\$\d{3,}[–\-]\$?\d{1,},?\d{0,3}\s*(?:per square foot|\/sq(?:uare)?\s*f(?:oo)?t)/i,
            cityData.additionCost
          );
          if (!faq.answer.includes(cityData.additionCost)) {
            faq.answer = `In ${city}, home additions typically cost ${cityData.additionCost} depending on scope and finishes. ` + faq.answer;
          }
          modified = true;
        }
      }

      // Permit / timeline FAQ — add permitTime
      if (qLower.includes('permit') || qLower.includes('how long') || qLower.includes('timeline') || qLower.includes('time')) {
        if (!faq.answer.includes(cityData.permitTime)) {
          faq.answer = faq.answer.trimEnd() + ` In ${city}, expect the permitting process to take ${cityData.permitTime}.`;
          modified = true;
        }
      }

      // "Can I live in my home" FAQ — add city-specific note about home age and duration
      if (qLower.includes('live in') || qLower.includes('stay in') || qLower.includes('live at') || qLower.includes('during construction') || qLower.includes('move out')) {
        if (!faq.answer.includes(cityData.homeAge)) {
          faq.answer = faq.answer.trimEnd() + ` In ${city}, with ${cityData.homeAge}, most addition projects take 4\u20138 months \u2014 many homeowners stay on-site for room extensions but choose to relocate temporarily for full second-story builds.`;
          modified = true;
        }
      }
    }
  }

  return { data, modified };
}

async function main() {
  console.log('Fetching all additions posts (looking for 6 remaining cities)...');
  console.log('Target cities:', Object.keys(CITY_DATA).join(', '));

  let allPosts = [];
  let page = 1;
  while (true) {
    const result = await ghostRequest('GET', `posts/?formats=mobiledoc&limit=100&page=${page}`);
    const posts = result.posts.filter(p => p.slug.startsWith('sa-city-') && p.slug.endsWith('-additions'));
    allPosts.push(...posts);
    if (!result.meta.pagination.next) break;
    page++;
  }

  console.log(`Found ${allPosts.length} total additions posts`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const post of allPosts) {
    const citySlug = extractCitySlug(post.slug);
    if (!citySlug || !CITY_DATA[citySlug]) {
      // Not one of our 6 target cities, skip silently
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
  console.log(`Target cities: ${Object.keys(CITY_DATA).length}`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
