const jwt = require('jsonwebtoken');
const https = require('https');

const GHOST_URL = 'https://ghost-production-42337.up.railway.app';
const ADMIN_API_KEY = '69c71d579c35510001523fba:2f9762c88acc7b71e89628048932a5ac6c1329bce7e72722a36218b500a07084';

const CITY_DATA = {
  'oakland': { buildCost: '$350\u2013$600/sq ft', additionCost: '$225\u2013$400/sq ft', lotNote: 'Oakland hillside lots in Montclair and Piedmont offer stunning views but require specialized foundation engineering', style: 'Modern farmhouse and contemporary designs are trending in Oakland\'s premium neighborhoods', permitTime: '3-6 months for full plan review', medianHome: '$850,000', neighborhood: 'Montclair', homeAge: 'Many Oakland homes built in the 1920s\u20131950s may need foundation reinforcement before adding a second story' },
  'berkeley': { buildCost: '$400\u2013$700/sq ft', additionCost: '$260\u2013$470/sq ft', lotNote: 'Berkeley\'s strict design review process requires experienced architects familiar with local guidelines', style: 'Sustainable and passive house designs align with Berkeley\'s environmental values', permitTime: '4-8 months including design review', medianHome: '$1,400,000', neighborhood: 'Berkeley Hills', homeAge: 'Berkeley\'s pre-war Craftsman homes often have robust foundations but require seismic retrofitting before second-story additions' },
  'fremont': { buildCost: '$350\u2013$550/sq ft', additionCost: '$225\u2013$370/sq ft', lotNote: 'Fremont offers larger lots in the Mission San Jose hills suitable for custom home construction', style: 'Modern Mediterranean and contemporary styles are popular', permitTime: '3-5 months', medianHome: '$1,350,000', neighborhood: 'Mission San Jose', homeAge: 'Fremont\'s 1960s\u20131980s ranch homes typically have slab foundations that may need engineering review for second-story additions' },
  'hayward': { buildCost: '$300\u2013$500/sq ft', additionCost: '$195\u2013$335/sq ft', lotNote: 'Hayward Hills offers affordable hillside lots with Bay views for custom construction', style: 'Contemporary and transitional styles complement Hayward\'s diverse neighborhoods', permitTime: '3-5 months', medianHome: '$850,000', neighborhood: 'Hayward Hills', homeAge: 'Many Hayward homes from the 1950s\u20131970s have perimeter foundations suitable for second-story additions with proper engineering' },
  'san-leandro': { buildCost: '$300\u2013$500/sq ft', additionCost: '$195\u2013$335/sq ft', lotNote: 'San Leandro\'s central East Bay location provides convenient access while offering competitive land prices', style: 'Mid-century modern renovations and new contemporary builds', permitTime: '3-5 months', medianHome: '$800,000', neighborhood: 'Bay-O-Vista', homeAge: 'San Leandro\'s post-war homes from the 1940s\u20131960s often need foundation upgrades before supporting a second story' },
  'walnut-creek': { buildCost: '$400\u2013$650/sq ft', additionCost: '$260\u2013$435/sq ft', lotNote: 'Premium lots near the Iron Horse Trail and downtown command top prices but offer excellent resale', style: 'Transitional and modern farmhouse designs dominate new construction', permitTime: '3-6 months', medianHome: '$1,100,000', neighborhood: 'Alamo Creek', homeAge: 'Walnut Creek\'s 1960s\u20131980s homes generally have adequate foundations, but a structural engineer should verify capacity for second-story loads' },
  'concord': { buildCost: '$300\u2013$500/sq ft', additionCost: '$195\u2013$335/sq ft', lotNote: 'Concord offers more affordable land for custom builds compared to closer-to-Bay cities', style: 'Contemporary ranch and farmhouse styles are popular', permitTime: '3-4 months', medianHome: '$700,000', neighborhood: 'Lime Ridge', homeAge: 'Concord\'s 1960s\u20131980s tract homes were typically built on slab foundations that may need reinforcement for vertical additions' },
  'san-ramon': { buildCost: '$400\u2013$650/sq ft', additionCost: '$260\u2013$435/sq ft', lotNote: 'San Ramon\'s master-planned communities may have HOA architectural requirements for new construction', style: 'Luxury contemporary and Mediterranean Revival styles', permitTime: '3-6 months plus HOA review', medianHome: '$1,300,000', neighborhood: 'Gale Ranch', homeAge: 'San Ramon\'s newer homes (1980s\u20132000s) often have engineered foundations suitable for additions, but HOA approval may be required' },
  'richmond': { buildCost: '$300\u2013$500/sq ft', additionCost: '$195\u2013$335/sq ft', lotNote: 'Richmond\'s waterfront and Point Richmond locations offer unique sites for custom homes with Bay views', style: 'Contemporary coastal designs leverage waterfront locations', permitTime: '3-5 months', medianHome: '$650,000', neighborhood: 'Point Richmond', homeAge: 'Richmond\'s older homes from the 1940s\u20131960s typically need seismic and foundation upgrades before second-story additions' },
  'antioch': { buildCost: '$275\u2013$450/sq ft', additionCost: '$180\u2013$300/sq ft', lotNote: 'Antioch offers the most affordable new construction land in the East Bay', style: 'Traditional and farmhouse styles are most common', permitTime: '2-4 months', medianHome: '$575,000', neighborhood: 'Deer Valley', homeAge: 'Antioch\'s mix of newer and older homes varies widely \u2014 homes built after 1990 are more likely to support second-story additions without major foundation work' },
  'san-rafael': { buildCost: '$400\u2013$700/sq ft', additionCost: '$260\u2013$470/sq ft', lotNote: 'Marin County\'s limited building sites make each custom home project unique', style: 'California contemporary blending indoor-outdoor living', permitTime: '4-8 months', medianHome: '$1,200,000', neighborhood: 'Dominican', homeAge: 'San Rafael\'s mid-century homes often have good bones for additions, but Marin\'s strict building codes require thorough structural review' },
  'mill-valley': { buildCost: '$500\u2013$900/sq ft', additionCost: '$325\u2013$600/sq ft', lotNote: 'Mill Valley\'s redwood forest setting demands architects experienced with hillside construction and environmental sensitivity', style: 'Organic modern designs that integrate with the natural landscape', permitTime: '6-12 months with environmental review', medianHome: '$1,800,000', neighborhood: 'Homestead Valley', homeAge: 'Mill Valley\'s hillside homes require careful structural analysis \u2014 the combination of slope, soil conditions, and older foundations demands expert engineering for any vertical addition' },
  'novato': { buildCost: '$375\u2013$600/sq ft', additionCost: '$245\u2013$400/sq ft', lotNote: 'Novato\'s larger lots and less restrictive zoning make it one of Marin\'s most accessible custom home markets', style: 'Ranch and contemporary farmhouse styles', permitTime: '3-6 months', medianHome: '$950,000', neighborhood: 'Indian Valley', homeAge: 'Novato\'s 1970s\u20131990s homes typically have foundations that can be cost-effectively upgraded to support second-story additions' },
  'larkspur': { buildCost: '$450\u2013$800/sq ft', additionCost: '$290\u2013$535/sq ft', lotNote: 'Larkspur\'s proximity to downtown San Francisco via ferry makes it desirable for luxury custom builds', style: 'Modern Marin aesthetic with clean lines and natural materials', permitTime: '4-8 months', medianHome: '$1,600,000', neighborhood: 'Baltimore Park', homeAge: 'Larkspur\'s established homes often have solid foundations, but the city\'s design review process for additions is thorough' },
  'napa': { buildCost: '$375\u2013$600/sq ft', additionCost: '$245\u2013$400/sq ft', lotNote: 'Napa offers vineyard-adjacent lots where custom wine country homes command premium values', style: 'Wine country farmhouse and modern ranch styles', permitTime: '3-6 months', medianHome: '$750,000', neighborhood: 'Browns Valley', homeAge: 'Napa\'s diverse housing stock ranges from historic downtown homes needing full foundation upgrades to newer builds ready for expansion' },
  'st-helena': { buildCost: '$500\u2013$900/sq ft', additionCost: '$325\u2013$600/sq ft', lotNote: 'St. Helena is one of the most prestigious addresses in Napa Valley for custom home construction', style: 'Luxury wine country estates with vineyard views', permitTime: '4-8 months with design review', medianHome: '$1,500,000', neighborhood: 'Meadowood', homeAge: 'St. Helena\'s historic homes may have preservation requirements that influence how additions are designed and approved' },
  'palo-alto': { buildCost: '$500\u2013$1,000/sq ft', additionCost: '$325\u2013$670/sq ft', lotNote: 'Palo Alto land values often exceed the construction cost \u2014 lot acquisition is the primary investment', style: 'Modern contemporary and sustainable designs reflect Silicon Valley innovation', permitTime: '6-12 months with Architectural Review Board', medianHome: '$3,500,000', neighborhood: 'Professorville', homeAge: 'Palo Alto\'s Eichler and mid-century homes have distinctive rooflines that require creative engineering solutions for second-story additions' },
  'saratoga': { buildCost: '$500\u2013$900/sq ft', additionCost: '$325\u2013$600/sq ft', lotNote: 'Saratoga\'s hillside lots offer panoramic Silicon Valley views but require specialized geotechnical engineering', style: 'Luxury contemporary and Mediterranean estates', permitTime: '4-8 months', medianHome: '$3,200,000', neighborhood: 'Monte Sereno border', homeAge: 'Saratoga\'s luxury homes often have robust foundations designed for expansion, but hillside properties require geotechnical review' },
  'los-gatos': { buildCost: '$450\u2013$850/sq ft', additionCost: '$290\u2013$570/sq ft', lotNote: 'Los Gatos offers a mix of downtown infill and hillside estate lots', style: 'Modern farmhouse and California contemporary', permitTime: '4-8 months with possible historic review', medianHome: '$2,200,000', neighborhood: 'Shannon Hills', homeAge: 'Los Gatos\'s historic downtown homes may face preservation constraints for additions, while hillside properties need slope-specific engineering' },
  'san-jose': { buildCost: '$350\u2013$550/sq ft', additionCost: '$225\u2013$370/sq ft', lotNote: 'San Jose\'s diverse neighborhoods offer teardown-and-rebuild opportunities in established areas', style: 'Modern contemporary and transitional designs', permitTime: '3-5 months', medianHome: '$1,300,000', neighborhood: 'Willow Glen', homeAge: 'San Jose\'s wide range of home ages means foundation capacity varies significantly \u2014 always get a structural engineer\'s assessment before planning a second story' },
  'mountain-view': { buildCost: '$400\u2013$700/sq ft', additionCost: '$260\u2013$470/sq ft', lotNote: 'Mountain View\'s proximity to Google campus drives demand for high-end custom homes', style: 'Mid-century modern rebuilds and contemporary new construction', permitTime: '3-6 months', medianHome: '$2,000,000', neighborhood: 'Old Mountain View', homeAge: 'Mountain View\'s 1950s ranch homes were not designed for second stories \u2014 expect foundation reinforcement as part of any vertical addition' },
  'sunnyvale': { buildCost: '$400\u2013$650/sq ft', additionCost: '$260\u2013$435/sq ft', lotNote: 'Sunnyvale offers teardown opportunities where new construction value far exceeds renovation cost', style: 'Contemporary and modern farmhouse styles', permitTime: '3-5 months', medianHome: '$1,800,000', neighborhood: 'Heritage District', homeAge: 'Sunnyvale\'s 1950s\u20131970s homes frequently need foundation upgrades for second-story additions, but the ROI at current home values makes it worthwhile' },
  'cupertino': { buildCost: '$400\u2013$700/sq ft', additionCost: '$260\u2013$470/sq ft', lotNote: 'Cupertino school district reputation makes custom home investment exceptionally strong for resale', style: 'Modern contemporary with smart home integration', permitTime: '3-6 months', medianHome: '$2,500,000', neighborhood: 'Rancho Rinconada', homeAge: 'Cupertino\'s 1960s\u20131980s homes typically sit on slab foundations that need structural evaluation before supporting a second story' },
};

function getStyleAdditions(citySlug, cityData) {
  const city = citySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    'Second Story Additions': `${cityData.homeAge}. In ${city}, second-story additions typically cost ${cityData.additionCost}. With a median home value of ${cityData.medianHome}, adding a second story in ${cityData.neighborhood} can significantly increase your home's value while preserving yard space.`,
    'Room Extensions': `In ${city}, room extensions cost ${cityData.additionCost} for quality construction. ${cityData.lotNote.includes('lot') ? cityData.lotNote : 'Lot size and setback requirements in ' + city + ' will determine the maximum footprint for your extension'}. Homes in ${cityData.neighborhood} benefit from ${cityData.style.toLowerCase().includes('modern') ? 'modern' : 'thoughtful'} design that integrates the new space seamlessly.`,
    'ADUs & Guest Houses': `${city} ADU construction typically costs ${cityData.additionCost} depending on size and finishes. California's ADU-friendly laws combined with ${city}'s median home value of ${cityData.medianHome} make accessory dwelling units an excellent investment in ${cityData.neighborhood}. ${cityData.style}.`,
    'Full Remodels': `Full home remodels in ${city} range from ${cityData.additionCost} for comprehensive renovations. At the current median home value of ${cityData.medianHome}, a well-executed full remodel in ${cityData.neighborhood} typically delivers 60-80% ROI while transforming your living experience. ${cityData.style}.`,
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
  // Actual slug pattern: sa-city-{county}-county-ca-{citySlug}-ca-additions
  // e.g. sa-city-alameda-county-ca-oakland-ca-additions
  const counties = ['alameda-county-ca', 'contra-costa-county-ca', 'marin-county-ca', 'napa-county-ca', 'santa-clara-county-ca'];
  for (const county of counties) {
    const suffix = '-ca-additions';
    const prefix = `sa-city-${county}-`;
    if (postSlug.startsWith(prefix) && postSlug.endsWith(suffix)) {
      return postSlug.slice(prefix.length, -suffix.length);
    }
  }
  // fallback: try all known city slugs
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
      // Cost FAQ
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
      // Permit / timeline FAQ
      if (qLower.includes('permit') || qLower.includes('how long') || qLower.includes('timeline') || qLower.includes('time')) {
        if (!faq.answer.includes(cityData.permitTime)) {
          faq.answer = faq.answer.trimEnd() + ` In ${city}, expect the permitting process to take ${cityData.permitTime}.`;
          modified = true;
        }
      }
      // Foundation / structural FAQ
      if (qLower.includes('foundation') || qLower.includes('second story') || qLower.includes('structural') || qLower.includes('support')) {
        if (!faq.answer.includes(cityData.homeAge)) {
          faq.answer = faq.answer.trimEnd() + ' ' + cityData.homeAge + '.';
          faq.answer = faq.answer.replace(/\.\./g, '.');
          modified = true;
        }
      }
    }
  }

  return { data, modified };
}

async function main() {
  console.log('Fetching all additions posts...');

  let allPosts = [];
  let page = 1;
  while (true) {
    const result = await ghostRequest('GET', `posts/?formats=mobiledoc&limit=100&page=${page}`);
    const posts = result.posts.filter(p => p.slug.startsWith('sa-city-') && p.slug.endsWith('-additions'));
    allPosts.push(...posts);
    if (!result.meta.pagination.next) break;
    page++;
  }

  console.log(`Found ${allPosts.length} additions posts`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const post of allPosts) {
    const citySlug = extractCitySlug(post.slug);
    if (!citySlug || !CITY_DATA[citySlug]) {
      console.log(`SKIP: ${post.slug} -- no city data for "${citySlug}"`);
      skipped++;
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
  console.log(`Total: ${allPosts.length}`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
