/**
 * update-ghost-adu.cjs
 * Updates all ~29 Ghost CMS city-ADU posts with differentiated content
 * per city: style descriptions, FAQ cost/zoning/types answers.
 */

const jwt = require('jsonwebtoken');
const https = require('https');

const GHOST_URL = 'https://ghost-production-42337.up.railway.app';
const ADMIN_KEY = '69c71d579c35510001523fba:2f9762c88acc7b71e89628048932a5ac6c1329bce7e72722a36218b500a07084';
const [KEY_ID, KEY_SECRET] = ADMIN_KEY.split(':');

function makeToken() {
  return jwt.sign({}, Buffer.from(KEY_SECRET, 'hex'), {
    keyid: KEY_ID,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/',
  });
}

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, GHOST_URL);
    const opts = {
      method,
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      headers: {
        Authorization: `Ghost ${makeToken()}`,
        'Content-Type': 'application/json',
      },
    };
    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(d) });
        } catch {
          reject(new Error(`Non-JSON response (${res.statusCode}): ${d.substring(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- CITY DATA ----------

const CITY_DATA = {
  'oakland': { lotSize: 'Oakland lots average 4,000-6,000 sq ft', aduCost: '$150,000–$350,000', zoning: 'Oakland has been a leader in ADU-friendly zoning since AB 2299', permitTime: '6-10 weeks', popular: 'Detached backyard ADUs are most popular in Oakland\'s flatland neighborhoods', neighborhood: 'Rockridge', medianHome: '$850,000', rentalIncome: '$1,800–$2,800/month' },
  'berkeley': { lotSize: 'Berkeley lots are typically 4,000-5,000 sq ft with narrow setbacks', aduCost: '$175,000–$400,000', zoning: 'Berkeley\'s Planning Department has specific design guidelines for ADUs', permitTime: '8-12 weeks', popular: 'Garage conversions are popular in Berkeley where backyard space is limited', neighborhood: 'Elmwood', medianHome: '$1,400,000', rentalIncome: '$2,200–$3,200/month' },
  'fremont': { lotSize: 'Fremont lots are often 5,000-7,000 sq ft', aduCost: '$150,000–$350,000', zoning: 'Fremont has streamlined its ADU permitting process', permitTime: '6-8 weeks', popular: 'Detached ADUs are common in Fremont\'s larger suburban lots', neighborhood: 'Mission San Jose', medianHome: '$1,350,000', rentalIncome: '$2,000–$3,000/month' },
  'hayward': { lotSize: 'Hayward lots average 5,000-6,000 sq ft', aduCost: '$140,000–$320,000', zoning: 'Hayward offers pre-approved ADU plans to speed permitting', permitTime: '4-8 weeks', popular: 'Junior ADUs (JADUs) converted from existing space are popular for budget-conscious homeowners', neighborhood: 'Hayward Hills', medianHome: '$850,000', rentalIncome: '$1,600–$2,400/month' },
  'san-leandro': { lotSize: 'San Leandro lots average 5,000-6,000 sq ft', aduCost: '$140,000–$320,000', zoning: 'San Leandro has adopted ADU-friendly ordinances', permitTime: '6-8 weeks', popular: 'Garage conversions offer the most affordable path to ADU rental income', neighborhood: 'Estudillo Estates', medianHome: '$800,000', rentalIncome: '$1,500–$2,200/month' },
  'walnut-creek': { lotSize: 'Walnut Creek lots are often 6,000-10,000 sq ft', aduCost: '$175,000–$400,000', zoning: 'Walnut Creek allows ADUs on most single-family lots per state law', permitTime: '6-10 weeks', popular: 'Detached ADUs with separate entrances are preferred for privacy', neighborhood: 'Northgate', medianHome: '$1,100,000', rentalIncome: '$2,000–$3,000/month' },
  'concord': { lotSize: 'Concord lots are typically 5,000-7,000 sq ft', aduCost: '$140,000–$320,000', zoning: 'Concord has embraced ADU development as part of housing goals', permitTime: '4-8 weeks', popular: 'Affordable lot prices make new-build detached ADUs viable', neighborhood: 'Dana Estates', medianHome: '$700,000', rentalIncome: '$1,500–$2,200/month' },
  'san-ramon': { lotSize: 'San Ramon lots average 5,000-8,000 sq ft', aduCost: '$175,000–$400,000', zoning: 'San Ramon allows both attached and detached ADUs', permitTime: '6-10 weeks', popular: 'Homeowners use ADUs for multi-generational living with aging parents', neighborhood: 'Dougherty Valley', medianHome: '$1,300,000', rentalIncome: '$2,200–$3,200/month' },
  'richmond': { lotSize: 'Richmond lots vary from 3,000-6,000 sq ft', aduCost: '$130,000–$300,000', zoning: 'Richmond actively promotes ADU construction for housing density', permitTime: '4-8 weeks', popular: 'Garage conversions are the most common ADU type in Richmond', neighborhood: 'Point Richmond', medianHome: '$650,000', rentalIncome: '$1,400–$2,000/month' },
  'antioch': { lotSize: 'Antioch lots are often larger at 5,000-8,000 sq ft', aduCost: '$120,000–$280,000', zoning: 'Antioch offers some of the most affordable ADU construction in the Bay Area', permitTime: '4-6 weeks', popular: 'Larger lots mean more flexibility for detached ADU placement', neighborhood: 'Rivertown', medianHome: '$575,000', rentalIncome: '$1,200–$1,800/month' },
  'san-rafael': { lotSize: 'San Rafael lots average 5,000-7,000 sq ft', aduCost: '$175,000–$400,000', zoning: 'Marin County has high ADU demand due to limited housing supply', permitTime: '6-10 weeks', popular: 'ADUs in San Rafael command premium rents due to Marin\'s housing shortage', neighborhood: 'Gerstle Park', medianHome: '$1,200,000', rentalIncome: '$2,200–$3,200/month' },
  'mill-valley': { lotSize: 'Mill Valley lots vary widely due to hillside terrain', aduCost: '$200,000–$450,000', zoning: 'Hillside lots may require additional engineering for ADU foundations', permitTime: '8-12 weeks', popular: 'Custom-designed detached ADUs that complement hillside architecture', neighborhood: 'Cascade Canyon', medianHome: '$1,800,000', rentalIncome: '$2,800–$4,000/month' },
  'novato': { lotSize: 'Novato lots average 6,000-8,000 sq ft', aduCost: '$160,000–$375,000', zoning: 'Novato welcomes ADU development on single-family lots', permitTime: '6-8 weeks', popular: 'Spacious lots make Novato ideal for full-sized detached ADUs', neighborhood: 'Hamilton', medianHome: '$950,000', rentalIncome: '$1,800–$2,600/month' },
  'larkspur': { lotSize: 'Larkspur lots are typically 4,000-6,000 sq ft', aduCost: '$185,000–$425,000', zoning: 'Larkspur requires ADU designs compatible with neighborhood character', permitTime: '8-10 weeks', popular: 'High-end ADUs designed as guest suites or home offices', neighborhood: 'Greenbrae', medianHome: '$1,600,000', rentalIncome: '$2,500–$3,500/month' },
  'napa': { lotSize: 'Napa lots average 5,000-7,000 sq ft', aduCost: '$160,000–$375,000', zoning: 'Napa has embraced ADUs to address wine country housing needs', permitTime: '6-10 weeks', popular: 'ADUs are popular for vineyard worker housing and short-term rentals', neighborhood: 'Old Town', medianHome: '$750,000', rentalIncome: '$1,600–$2,400/month' },
  'american-canyon': { lotSize: 'American Canyon lots are often 5,000-7,000 sq ft', aduCost: '$140,000–$320,000', zoning: 'American Canyon follows state ADU guidelines', permitTime: '4-6 weeks', popular: 'Newer lots with good utility access make ADU construction straightforward', neighborhood: 'Village Center', medianHome: '$650,000', rentalIncome: '$1,400–$2,000/month' },
  'st-helena': { lotSize: 'St. Helena lots vary from small downtown to large estate properties', aduCost: '$200,000–$500,000', zoning: 'Historic district properties may have additional design review', permitTime: '8-12 weeks', popular: 'Premium ADUs designed as guest houses for wine country visitors', neighborhood: 'downtown', medianHome: '$1,500,000', rentalIncome: '$2,500–$4,000/month' },
  'calistoga': { lotSize: 'Calistoga lots average 5,000-8,000 sq ft', aduCost: '$160,000–$375,000', zoning: 'Calistoga allows ADUs per state law on most residential lots', permitTime: '6-8 weeks', popular: 'ADUs serve as vacation rentals given Calistoga\'s tourism economy', neighborhood: 'downtown', medianHome: '$900,000', rentalIncome: '$1,800–$3,000/month' },
  'yountville': { lotSize: 'Yountville lots are small but highly valued', aduCost: '$185,000–$425,000', zoning: 'Yountville has strict design standards for ADU construction', permitTime: '8-10 weeks', popular: 'ADUs in Yountville are used for guest accommodations and rental income', neighborhood: 'Yountville proper', medianHome: '$1,200,000', rentalIncome: '$2,200–$3,500/month' },
  'san-jose': { lotSize: 'San Jose lots average 5,000-7,000 sq ft', aduCost: '$150,000–$350,000', zoning: 'San Jose has one of the most ADU-friendly policies in the Bay Area', permitTime: '4-8 weeks', popular: 'Multi-generational housing is a major driver for ADU construction', neighborhood: 'Willow Glen', medianHome: '$1,300,000', rentalIncome: '$1,800–$2,800/month' },
  'palo-alto': { lotSize: 'Palo Alto lots average 6,000-8,000 sq ft', aduCost: '$225,000–$500,000', zoning: 'Palo Alto has detailed ADU design guidelines and review process', permitTime: '8-12 weeks', popular: 'High rents make ADU ROI exceptionally strong in Palo Alto', neighborhood: 'Old Palo Alto', medianHome: '$3,500,000', rentalIncome: '$3,000–$4,500/month' },
  'mountain-view': { lotSize: 'Mountain View lots average 5,000-6,000 sq ft', aduCost: '$175,000–$400,000', zoning: 'Mountain View actively promotes ADU construction', permitTime: '6-8 weeks', popular: 'Tech worker demand drives strong ADU rental income', neighborhood: 'Cuesta Park', medianHome: '$2,000,000', rentalIncome: '$2,500–$3,500/month' },
  'sunnyvale': { lotSize: 'Sunnyvale lots average 5,000-6,000 sq ft', aduCost: '$175,000–$400,000', zoning: 'Sunnyvale has streamlined ADU permitting', permitTime: '4-8 weeks', popular: 'Garage conversions are popular where lot size limits new construction', neighborhood: 'Lakewood', medianHome: '$1,800,000', rentalIncome: '$2,200–$3,200/month' },
  'cupertino': { lotSize: 'Cupertino lots average 6,000-8,000 sq ft', aduCost: '$185,000–$425,000', zoning: 'Cupertino follows California state ADU guidelines', permitTime: '6-10 weeks', popular: 'ADUs for multi-generational families are extremely common in Cupertino', neighborhood: 'Monta Vista', medianHome: '$2,500,000', rentalIncome: '$2,500–$3,500/month' },
  'santa-clara': { lotSize: 'Santa Clara lots average 5,000-6,000 sq ft', aduCost: '$160,000–$375,000', zoning: 'Santa Clara permits ADUs on single-family and multi-family lots', permitTime: '6-8 weeks', popular: 'Proximity to tech employers drives strong ADU rental demand', neighborhood: 'Old Quad', medianHome: '$1,500,000', rentalIncome: '$2,000–$3,000/month' },
  'saratoga': { lotSize: 'Saratoga lots are often 10,000+ sq ft', aduCost: '$225,000–$550,000', zoning: 'Large lots in Saratoga provide ample space for premium ADU designs', permitTime: '8-12 weeks', popular: 'High-end detached ADUs with full kitchens and premium finishes', neighborhood: 'Saratoga Village', medianHome: '$3,200,000', rentalIncome: '$3,000–$4,500/month' },
  'los-gatos': { lotSize: 'Los Gatos lots vary from compact downtown to large hillside', aduCost: '$200,000–$475,000', zoning: 'Historic properties require design compatibility review', permitTime: '8-10 weeks', popular: 'ADU guest houses complement Los Gatos\'s charming community character', neighborhood: 'Los Gatos downtown', medianHome: '$2,200,000', rentalIncome: '$2,800–$4,000/month' },
  'campbell': { lotSize: 'Campbell lots average 5,000-6,000 sq ft', aduCost: '$150,000–$350,000', zoning: 'Campbell follows Santa Clara County ADU guidelines', permitTime: '4-8 weeks', popular: 'Central location makes Campbell ADU rentals highly sought-after', neighborhood: 'Pruneyard', medianHome: '$1,400,000', rentalIncome: '$2,000–$2,800/month' },
  'milpitas': { lotSize: 'Milpitas lots average 5,000-6,000 sq ft', aduCost: '$150,000–$350,000', zoning: 'Milpitas has adopted ADU-friendly ordinances', permitTime: '4-8 weeks', popular: 'Newer infrastructure makes utility connections straightforward', neighborhood: 'Sunnyhills', medianHome: '$1,200,000', rentalIncome: '$1,800–$2,800/month' },
};

// Map city slugs to county slugs based on the Ghost slug pattern
const COUNTY_MAP = {
  'oakland': 'alameda', 'berkeley': 'alameda', 'fremont': 'alameda',
  'hayward': 'alameda', 'san-leandro': 'alameda',
  'walnut-creek': 'contra-costa', 'concord': 'contra-costa',
  'san-ramon': 'contra-costa', 'richmond': 'contra-costa', 'antioch': 'contra-costa',
  'san-rafael': 'marin', 'mill-valley': 'marin', 'novato': 'marin', 'larkspur': 'marin',
  'napa': 'napa', 'american-canyon': 'napa', 'st-helena': 'napa',
  'calistoga': 'napa', 'yountville': 'napa',
  'san-jose': 'santa-clara', 'palo-alto': 'santa-clara',
  'mountain-view': 'santa-clara', 'sunnyvale': 'santa-clara',
  'cupertino': 'santa-clara', 'santa-clara': 'santa-clara',
  'saratoga': 'santa-clara', 'los-gatos': 'santa-clara',
  'campbell': 'santa-clara', 'milpitas': 'santa-clara',
};

function ghostSlug(cityKey) {
  const county = COUNTY_MAP[cityKey];
  return `sa-city-${county}-county-ca-${cityKey}-ca-adu`;
}

function titleCase(s) {
  return s.split('-').map(w => w === 'st' ? 'St.' : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ---------- CONTENT MODIFICATION ----------

function modifyData(data, cityKey) {
  const cd = CITY_DATA[cityKey];
  if (!cd) return null;

  const cityName = data.city || titleCase(cityKey);

  // 1. Modify style descriptions
  const stylesSection = data.sections?.find(s => s.type === 'styles');
  if (stylesSection?.data?.items) {
    for (const item of stylesSection.data.items) {
      switch (item.title) {
        case 'Detached ADUs':
          item.description = `Standalone backyard homes that offer maximum privacy and flexibility. Perfect for guest suites, rental units, or home offices. We handle design, engineering, permits, and construction from start to finish. ${cd.lotSize}, and ${cd.popular.charAt(0).toLowerCase() + cd.popular.slice(1)}.`;
          break;
        case 'Design & Architecture':
          item.description = `Our in-house architects create custom ADU floor plans, 3D renderings, and construction documents tailored to your lot. We maximize square footage within local zoning codes and design for natural light, privacy, and flow. In ${cityName}'s ${cd.neighborhood} neighborhood and beyond, we design ADUs that complement the existing home styles and add value to properties with a median price of ${cd.medianHome}.`;
          break;
        case 'Engineering & Permits':
          item.description = `We handle structural engineering, Title 24 energy compliance, and all permit applications. ${cd.zoning}, and our team typically secures permits in ${cd.permitTime}. Our 60-day permit guarantee means your project stays on schedule.`;
          break;
        case 'Garage Conversions':
          item.description = `Transform your existing garage into a fully functional living space. Garage conversions are the most cost-effective ADU option — no new foundation required. We handle structural modifications, utilities, and finishes. In ${cityName}, a garage conversion typically costs 30-40% less than a new detached build, with ADU costs starting at the lower end of the ${cd.aduCost} range. Rental income of ${cd.rentalIncome} makes the investment worthwhile.`;
          break;
      }
    }
  }

  // 2. Modify FAQ answers
  if (data.localFaqs) {
    for (const faq of data.localFaqs) {
      // FAQ: cost question
      if (faq.question.toLowerCase().includes('how much') && faq.question.toLowerCase().includes('cost')) {
        faq.answer = `ADU costs in ${cityName} typically range from ${cd.aduCost} depending on size, finishes, and whether it's a new build or garage conversion. With median home prices at ${cd.medianHome}, an ADU can add significant value and generate ${cd.rentalIncome} in rental income. We provide free consultations with detailed estimates.`;
      }
      // FAQ: zoning/permit question ("can I build")
      if (faq.question.toLowerCase().includes('can i build')) {
        faq.answer = `California's ADU laws make it possible to build on most residential lots in ${cityName}. ${cd.zoning}, and the permitting process typically takes ${cd.permitTime}. We evaluate your property's potential during our free consultation, including setbacks, utility access, and local zoning requirements.`;
      }
      // FAQ: types question
      if (faq.question.toLowerCase().includes('what types')) {
        faq.answer = `In ${cityName}, you can build detached ADUs (up to 1,200 sq ft), garage conversions, attached additions, and junior ADUs (up to 500 sq ft). ${cd.popular}. Many homeowners in ${cd.neighborhood} are choosing ADUs for rental income of ${cd.rentalIncome} or multi-generational living.`;
      }
    }
  }

  return data;
}

// ---------- MAIN ----------

async function main() {
  const cities = Object.keys(CITY_DATA);
  console.log(`Updating ${cities.length} city ADU posts...\n`);

  let updated = 0;
  let failed = 0;

  for (const cityKey of cities) {
    const slug = ghostSlug(cityKey);
    const cityName = titleCase(cityKey);

    try {
      // Fetch the post
      const fetchRes = await request('GET', `/ghost/api/admin/posts/?filter=slug:${slug}&formats=mobiledoc`);
      const post = fetchRes.data.posts?.[0];
      if (!post) {
        console.log(`SKIP ${cityName}: post not found (slug: ${slug})`);
        failed++;
        await sleep(1000);
        continue;
      }

      // Parse mobiledoc
      const mobiledoc = JSON.parse(post.mobiledoc);
      const html = mobiledoc.cards[0][1].html;
      const jsonMatch = html.match(/<script type="application\/json">(.*?)<\/script>/s);
      if (!jsonMatch) {
        console.log(`SKIP ${cityName}: no JSON data found in mobiledoc`);
        failed++;
        await sleep(1000);
        continue;
      }

      // Parse and modify data
      const data = JSON.parse(jsonMatch[1]);
      const modified = modifyData(data, cityKey);
      if (!modified) {
        console.log(`SKIP ${cityName}: no city data`);
        failed++;
        await sleep(1000);
        continue;
      }

      // Rebuild HTML with modified JSON
      const newJson = JSON.stringify(modified);
      const newHtml = html.replace(
        /<script type="application\/json">.*?<\/script>/s,
        `<script type="application/json">${newJson}</script>`
      );

      // Rebuild mobiledoc
      mobiledoc.cards[0][1].html = newHtml;
      const newMobiledoc = JSON.stringify(mobiledoc);

      // Update the post
      const updateRes = await request('PUT', `/ghost/api/admin/posts/${post.id}/`, {
        posts: [{
          mobiledoc: newMobiledoc,
          updated_at: post.updated_at,
        }],
      });

      if (updateRes.status === 200) {
        console.log(`OK   ${cityName} (${slug})`);
        updated++;
      } else {
        const errMsg = updateRes.data?.errors?.[0]?.message || JSON.stringify(updateRes.data).substring(0, 200);
        console.log(`FAIL ${cityName}: ${updateRes.status} - ${errMsg}`);
        failed++;
      }
    } catch (err) {
      console.log(`ERR  ${cityName}: ${err.message}`);
      failed++;
    }

    await sleep(1000);
  }

  console.log(`\nDone. Updated: ${updated}, Failed: ${failed}`);
}

main().catch(console.error);
