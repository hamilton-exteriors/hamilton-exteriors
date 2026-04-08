const jwt = require('jsonwebtoken');
const https = require('https');

const GHOST_URL = 'https://ghost-production-42337.up.railway.app';
const ADMIN_API_KEY = '69c71d579c35510001523fba:2f9762c88acc7b71e89628048932a5ac6c1329bce7e72722a36218b500a07084';

const CITY_DATA = {
  'oakland': { climate: 'mild with Bay breezes', medianHome: '$850,000', windowCost: '$600–$2,200 per window', homeStyle: 'Craftsman and Victorian with original wood frames', energyNote: 'Dual-pane Low-E glass reduces heating costs during foggy winters', neighborhood: 'Rockridge' },
  'berkeley': { climate: 'coastal fog and wind exposure', medianHome: '$1,400,000', windowCost: '$800–$2,800 per window', homeStyle: 'historic Craftsman with period-specific requirements', energyNote: 'Energy-efficient windows are especially valuable in drafty pre-war homes', neighborhood: 'Elmwood' },
  'fremont': { climate: 'warmer inland with sun exposure', medianHome: '$1,350,000', windowCost: '$600–$2,500 per window', homeStyle: 'ranch-style with large window areas', energyNote: 'Solar heat gain coefficient matters in Fremont\'s warm climate', neighborhood: 'Mission San Jose' },
  'hayward': { climate: 'moderate with hillside wind', medianHome: '$850,000', windowCost: '$500–$2,000 per window', homeStyle: 'mid-century suburban', energyNote: 'Replacing single-pane windows with dual-pane can cut energy bills 15-25%', neighborhood: 'Hayward Hills' },
  'san-leandro': { climate: 'moderate coastal influence', medianHome: '$800,000', windowCost: '$500–$1,800 per window', homeStyle: 'post-war homes with original aluminum frames', energyNote: 'Many older homes still have original single-pane aluminum windows', neighborhood: 'Estudillo Estates' },
  'walnut-creek': { climate: 'hot inland summers above 90°F', medianHome: '$1,100,000', windowCost: '$700–$2,500 per window', homeStyle: 'suburban with large window walls', energyNote: 'Low-E coatings are critical for reducing cooling costs in hot Walnut Creek summers', neighborhood: 'Northgate' },
  'concord': { climate: 'warm inland', medianHome: '$700,000', windowCost: '$500–$2,000 per window', homeStyle: '1960s-1980s tract homes', energyNote: 'Window replacement offers strong ROI in Concord\'s affordable market', neighborhood: 'Dana Estates' },
  'san-ramon': { climate: 'inland East Bay warmth', medianHome: '$1,300,000', windowCost: '$700–$2,500 per window', homeStyle: 'newer planned community', energyNote: 'Many San Ramon homes already have dual-pane but may benefit from triple-pane upgrades', neighborhood: 'Dougherty Valley' },
  'richmond': { climate: 'coastal salt air exposure', medianHome: '$650,000', windowCost: '$500–$2,000 per window', homeStyle: 'waterfront and historic', energyNote: 'Salt air corrosion makes vinyl or fiberglass frames preferable to aluminum', neighborhood: 'Point Richmond' },
  'antioch': { climate: 'hot delta climate', medianHome: '$575,000', windowCost: '$450–$1,800 per window', homeStyle: 'mixed newer and older', energyNote: 'Heat-reflective coatings are essential in Antioch\'s extreme summer temperatures', neighborhood: 'Rivertown' },
  'san-rafael': { climate: 'Marin marine influence', medianHome: '$1,200,000', windowCost: '$700–$2,500 per window', homeStyle: 'mid-century mixed', energyNote: 'Sound-dampening windows are popular near the 101 corridor', neighborhood: 'Gerstle Park' },
  'mill-valley': { climate: 'cool redwood shade with moisture', medianHome: '$1,800,000', windowCost: '$900–$3,200 per window', homeStyle: 'hillside custom with view windows', energyNote: 'Large picture windows framing Mt. Tam views are a Mill Valley signature', neighborhood: 'Cascade Canyon' },
  'novato': { climate: 'warmer inland Marin', medianHome: '$950,000', windowCost: '$600–$2,200 per window', homeStyle: '1970s-1990s suburban', energyNote: 'Upgrading to Low-E glass provides measurable energy savings in Novato\'s warm summers', neighborhood: 'Hamilton' },
  'larkspur': { climate: 'sheltered Marin with fog', medianHome: '$1,600,000', windowCost: '$800–$3,000 per window', homeStyle: 'premium architectural', energyNote: 'Custom window shapes often required for Larkspur\'s distinctive architecture', neighborhood: 'Greenbrae' },
  'napa': { climate: 'hot valley summers, cool winters', medianHome: '$750,000', windowCost: '$600–$2,200 per window', homeStyle: 'historic and newer', energyNote: 'Thermal cycling between hot days and cool nights stresses window seals', neighborhood: 'Old Town' },
  'american-canyon': { climate: 'transitional Napa', medianHome: '$650,000', windowCost: '$500–$1,800 per window', homeStyle: 'newer post-1990', energyNote: 'Many newer homes already have efficient windows but may need seal replacement', neighborhood: 'Village Center' },
  'st-helena': { climate: 'extreme Napa heat', medianHome: '$1,500,000', windowCost: '$900–$3,200 per window', homeStyle: 'wine country estate', energyNote: 'Premium Marvin or Andersen windows are common in St. Helena\'s luxury market', neighborhood: 'downtown' },
  'calistoga': { climate: 'extreme heat with geothermal', medianHome: '$900,000', windowCost: '$600–$2,500 per window', homeStyle: 'small-town character', energyNote: 'Heat-resistant glazing is especially important given Calistoga\'s extreme summers', neighborhood: 'downtown' },
  'yountville': { climate: 'Napa Valley heat', medianHome: '$1,200,000', windowCost: '$700–$2,800 per window', homeStyle: 'premium maintained', energyNote: 'Wine country aesthetics favor wood-clad or fiberglass frames over vinyl', neighborhood: 'Yountville proper' },
  'san-jose': { climate: 'warmest Bay Area city', medianHome: '$1,300,000', windowCost: '$600–$2,200 per window', homeStyle: 'bungalow to ranch', energyNote: 'San Jose\'s heat makes solar heat gain coefficient the most important spec', neighborhood: 'Willow Glen' },
  'palo-alto': { climate: 'mild Peninsula', medianHome: '$3,500,000', windowCost: '$1,000–$4,000 per window', homeStyle: 'historic with complex fenestration', energyNote: 'Palo Alto\'s strict Title 24 requirements may mandate specific glazing specs', neighborhood: 'Old Palo Alto' },
  'mountain-view': { climate: 'moderate South Bay', medianHome: '$2,000,000', windowCost: '$700–$3,000 per window', homeStyle: '1950s-1960s ranch', energyNote: 'Large single-pane ranch windows are prime upgrade candidates', neighborhood: 'Cuesta Park' },
  'sunnyvale': { climate: 'moderate South Bay', medianHome: '$1,800,000', windowCost: '$700–$2,800 per window', homeStyle: '1950s-1970s', energyNote: 'Sunnyvale\'s tech-savvy homeowners often choose smart glass or motorized options', neighborhood: 'Lakewood' },
  'cupertino': { climate: 'moderate Silicon Valley', medianHome: '$2,500,000', windowCost: '$800–$3,200 per window', homeStyle: '1960s-1980s suburban', energyNote: 'High property values make premium window upgrades a smart equity investment', neighborhood: 'Monta Vista' },
  'santa-clara': { climate: 'moderate South Bay', medianHome: '$1,500,000', windowCost: '$600–$2,500 per window', homeStyle: 'mixed eras', energyNote: 'Older homes near SCU often have original single-pane windows ready for replacement', neighborhood: 'Old Quad' },
  'saratoga': { climate: 'hillside with wind', medianHome: '$3,200,000', windowCost: '$1,200–$4,500 per window', homeStyle: 'large custom estates', energyNote: 'Floor-to-ceiling windows are common in Saratoga\'s luxury homes', neighborhood: 'Saratoga Village' },
  'los-gatos': { climate: 'foothill microclimate', medianHome: '$2,200,000', windowCost: '$900–$3,500 per window', homeStyle: 'historic to hillside custom', energyNote: 'Historic downtown properties may require custom-sized replacement windows', neighborhood: 'Los Gatos downtown' },
  'campbell': { climate: 'central Silicon Valley', medianHome: '$1,400,000', windowCost: '$600–$2,500 per window', homeStyle: '1950s-1975 mid-century', energyNote: 'Mid-century homes often have sliding glass doors that benefit from dual-pane upgrades', neighborhood: 'Pruneyard' },
  'milpitas': { climate: 'moderate foothills', medianHome: '$1,200,000', windowCost: '$600–$2,200 per window', homeStyle: '1960s-2010s mixed', energyNote: 'Newer Milpitas developments may already meet Title 24 but older areas need upgrades', neighborhood: 'Sunnyhills' },
};

// City-specific additions for each window style
function getStyleAdditions(citySlug, cd) {
  const city = citySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    'Single Hung': `A popular choice for ${city}'s ${cd.homeStyle} homes, single hung windows handle ${cd.climate} conditions well. Homeowners in ${cd.neighborhood} often choose this style for its classic look and easy maintenance.`,
    'Single Slider': `Ideal for ${city}'s ${cd.homeStyle} properties where horizontal space is available. In ${cd.climate} weather, the tight seal of a single slider helps maintain indoor comfort.`,
    'Sliding Glass Doors': `Perfect for connecting indoor and outdoor living in ${city}'s ${cd.climate} climate. ${cd.homeStyle.charAt(0).toUpperCase() + cd.homeStyle.slice(1)} homes in ${cd.neighborhood} benefit from the natural light and ventilation sliding doors provide.`,
    'Picture Windows': `A stunning option for ${city} homes, especially in ${cd.neighborhood} where views matter. ${cd.energyNote}. Picture windows pair beautifully with ${cd.homeStyle} architecture.`,
    'Double Hung': `The go-to replacement window for ${city}'s ${cd.homeStyle} homes. Double hung windows offer superior ventilation for ${cd.climate} conditions, with both sashes tilting in for easy cleaning.`,
    'Casement Windows': `Excellent for capturing breezes in ${city}'s ${cd.climate} climate. Casement windows crank open fully, making them ideal for ${cd.homeStyle} homes where maximum airflow is desired.`,
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
    const req = https.request({
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method,
      headers: {
        'Authorization': `Ghost ${token}`,
        'Content-Type': 'application/json',
        'Accept-Version': 'v5.0',
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed).substring(0, 500)}`));
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

// Extract city slug from post slug like: sa-city-alameda-county-ca-oakland-ca-windows
function extractCitySlug(postSlug) {
  for (const citySlug of Object.keys(CITY_DATA)) {
    if (postSlug.includes(`-${citySlug}-ca-windows`)) return citySlug;
  }
  return null;
}

function modifyPostData(jsonData, citySlug, cityData) {
  const data = JSON.parse(JSON.stringify(jsonData)); // deep clone
  const city = citySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const additions = getStyleAdditions(citySlug, cityData);
  let modified = false;

  // 1. Modify style descriptions in sections[].data.items[]
  for (const section of data.sections) {
    if (section.type === 'styles' && section.data && section.data.items) {
      for (const item of section.data.items) {
        const addition = additions[item.title];
        if (addition && !item.description.includes(cityData.neighborhood)) {
          item.description = item.description.trimEnd() + ' ' + addition;
          modified = true;
        }
      }
    }
  }

  // 2. Modify FAQs
  if (data.localFaqs && Array.isArray(data.localFaqs)) {
    for (const faq of data.localFaqs) {
      const qLower = faq.question.toLowerCase();

      // Cost FAQ — replace generic $400-$1,200 with city-specific windowCost
      if (qLower.includes('cost') || qLower.includes('price') || qLower.includes('how much')) {
        if (!faq.answer.includes(cityData.windowCost)) {
          // Replace the generic cost range
          const costReplaced = faq.answer.replace(
            /\$\d{3,}[–\-]\$\d{1,},?\d{0,3}\s*per window/i,
            cityData.windowCost
          );
          if (costReplaced !== faq.answer) {
            faq.answer = costReplaced;
            modified = true;
          } else {
            // Prepend city-specific cost if regex didn't match
            faq.answer = `In ${city}, expect to pay ${cityData.windowCost} installed. ` + faq.answer;
            modified = true;
          }
        }
      }

      // Energy FAQ — append city-specific energyNote
      if (qLower.includes('energy') || qLower.includes('efficient') || qLower.includes('worth it')) {
        if (!faq.answer.includes(cityData.energyNote)) {
          faq.answer = faq.answer.trimEnd() + ' ' + cityData.energyNote + '.';
          faq.answer = faq.answer.replace(/\.\./g, '.');
          modified = true;
        }
      }
    }
  }

  return { data, modified };
}

async function main() {
  console.log('Fetching all windows posts...');

  let allPosts = [];
  let page = 1;
  while (true) {
    const result = await ghostRequest('GET', `posts/?filter=slug:~'windows'&formats=mobiledoc&limit=50&page=${page}`);
    const windowsPosts = result.posts.filter(p => p.slug.endsWith('-windows'));
    allPosts.push(...windowsPosts);
    console.log(`  Page ${page}: ${result.posts.length} posts, ${windowsPosts.length} windows posts`);
    if (!result.meta.pagination.next) break;
    page++;
  }

  console.log(`\nTotal windows posts found: ${allPosts.length}`);

  // Filter to only city posts (not county-level posts)
  const cityPosts = allPosts.filter(p => {
    const citySlug = extractCitySlug(p.slug);
    return citySlug && CITY_DATA[citySlug];
  });

  console.log(`City posts with matching data: ${cityPosts.length}\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const post of cityPosts) {
    const citySlug = extractCitySlug(post.slug);
    const cityData = CITY_DATA[citySlug];
    const city = citySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    console.log(`Processing: ${post.slug} (${city})`);

    // Parse mobiledoc
    let mobiledoc;
    try {
      mobiledoc = JSON.parse(post.mobiledoc);
    } catch (e) {
      console.log(`  ERROR: Could not parse mobiledoc`);
      errors++;
      continue;
    }

    // Find the HTML card with JSON data
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
      console.log(`  ERROR: No JSON script tag found`);
      errors++;
      continue;
    }

    // Extract JSON
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

    // Modify the data
    const { data: newData, modified } = modifyPostData(jsonData, citySlug, cityData);

    if (!modified) {
      console.log(`  Already differentiated, skipping`);
      skipped++;
      continue;
    }

    // Rebuild HTML with new JSON
    const newJson = JSON.stringify(newData);
    const newHtml = htmlContent.replace(
      /<script\s+type="application\/json">[\s\S]*?<\/script>/,
      `<script type="application/json">${newJson}</script>`
    );

    mobiledoc.cards[cardIndex][1].html = newHtml;

    // Update via PUT
    try {
      const updateBody = {
        posts: [{
          mobiledoc: JSON.stringify(mobiledoc),
          updated_at: post.updated_at,
        }]
      };

      const result = await ghostRequest('PUT', `posts/${post.id}/`, updateBody);
      console.log(`  UPDATED successfully`);
      updated++;
    } catch (e) {
      console.log(`  ERROR updating: ${e.message}`);
      errors++;
    }

    await sleep(1000);
  }

  console.log(`\n========== DONE ==========`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors:  ${errors}`);
  console.log(`Total city posts: ${cityPosts.length}`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
