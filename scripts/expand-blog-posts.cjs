/**
 * Expand 3 existing blog posts on Ghost CMS with additional content,
 * internal/external links, and first-hand experience paragraphs.
 *
 * Usage: node scripts/expand-blog-posts.cjs
 * Requires: GHOST_ADMIN_API_KEY env var (format id:secret)
 */

const jwt = require('jsonwebtoken');

// ── Config ──────────────────────────────────────────────────────────────────

const GHOST_URL = process.env.PUBLIC_GHOST_URL || 'https://ghost-production-42337.up.railway.app';
const GHOST_ADMIN_KEY = process.env.GHOST_ADMIN_API_KEY || '';

if (!GHOST_ADMIN_KEY) {
  console.error('Missing GHOST_ADMIN_API_KEY env var (format: id:secret)');
  process.exit(1);
}

const [adminId, adminSecret] = GHOST_ADMIN_KEY.split(':');

// ── Ghost Admin API helpers ─────────────────────────────────────────────────

function makeToken() {
  return jwt.sign({}, Buffer.from(adminSecret, 'hex'), {
    keyid: adminId,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/',
  });
}

async function ghostGet(endpoint) {
  const token = makeToken();
  const url = `${GHOST_URL}/ghost/api/admin/${endpoint}`;
  const res = await fetch(url, {
    headers: { Authorization: `Ghost ${token}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Ghost GET ${res.status}: ${body}`);
  }
  return res.json();
}

async function ghostPut(endpoint, body) {
  const token = makeToken();
  const url = `${GHOST_URL}/ghost/api/admin/${endpoint}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Ghost ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ghost PUT ${res.status}: ${text}`);
  }
  return res.json();
}

// ── Lexical node builders ───────────────────────────────────────────────────

function textNode(text, format = 0) {
  return {
    type: 'text',
    text,
    format,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  };
}

function linkNode(text, url) {
  return {
    type: 'link',
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    rel: 'noopener',
    target: null,
    title: '',
    url,
  };
}

function extLinkNode(text, url) {
  return {
    type: 'link',
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    rel: 'noopener noreferrer',
    target: '_blank',
    title: '',
    url,
  };
}

function paragraphNode(children) {
  return {
    type: 'paragraph',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  };
}

function headingNode(tag, text) {
  return {
    type: 'heading',
    tag,
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  };
}

// ── Find insertion point ────────────────────────────────────────────────────

/**
 * Find the index of a heading node whose text includes `searchText`.
 * Returns -1 if not found.
 */
function findHeadingIndex(nodes, searchText) {
  const lower = searchText.toLowerCase();
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.type === 'heading' && n.children) {
      const headingText = n.children.map(c => c.text || '').join('').toLowerCase();
      if (headingText.includes(lower)) return i;
    }
  }
  return -1;
}

/**
 * Find the end of a section starting at headingIndex.
 * A section ends at the next heading of same or higher level, or end of doc.
 */
function findSectionEnd(nodes, headingIndex) {
  const headingTag = nodes[headingIndex].tag || 'h2';
  const level = parseInt(headingTag.replace('h', ''), 10);
  for (let i = headingIndex + 1; i < nodes.length; i++) {
    if (nodes[i].type === 'heading') {
      const thisLevel = parseInt((nodes[i].tag || 'h2').replace('h', ''), 10);
      if (thisLevel <= level) return i;
    }
  }
  return nodes.length;
}

/**
 * Insert nodes after a section identified by heading text.
 * Returns true if insertion happened.
 */
function insertAfterSection(nodes, sectionHeadingText, newNodes) {
  const idx = findHeadingIndex(nodes, sectionHeadingText);
  if (idx === -1) {
    console.log(`    WARNING: Could not find section "${sectionHeadingText}", appending before last section`);
    // Insert before last 2 nodes as fallback
    const insertAt = Math.max(nodes.length - 2, 0);
    nodes.splice(insertAt, 0, ...newNodes);
    return true;
  }
  const end = findSectionEnd(nodes, idx);
  nodes.splice(end, 0, ...newNodes);
  return true;
}

// ── Post expansion content ──────────────────────────────────────────────────

function getCostPostExpansion() {
  // Section 1: "What We See on Real Bay Area Jobs" — after "What Drives the Price"
  const section1 = [
    headingNode('h2', 'What We See on Real Bay Area Jobs'),

    paragraphNode([
      textNode('We completed over 80 '),
      linkNode('roof replacements', '/roofing'),
      textNode(' in Alameda County last year alone, so we have a pretty clear picture of what homeowners actually pay. A standard tear-off and re-roof on a 1,500 sq ft ranch in '),
      linkNode('Oakland', '/service-areas/alameda-county-ca/oakland-ca'),
      textNode(' typically lands between $14,000 and $18,000 with GAF Timberline HDZ shingles. That same job in the Oakland Hills costs $2,000\u2013$4,000 more because of steep slopes, limited truck access, and fire-zone compliance requirements.'),
    ]),

    paragraphNode([
      textNode('In San Jose, we see slightly lower labor costs than the East Bay, but permit fees are higher. A 2,000 sq ft home in Willow Glen ran $19,500 last month with premium shingles at $1,040 per square. Over in Walnut Creek, the same square footage job came to $21,000 because the two-story colonial had a 10/12 pitch and three dormers. Steep roofs mean more safety equipment, slower work, and more waste\u2014all of which show up on the invoice.'),
    ]),

    paragraphNode([
      textNode('The biggest price variable we see isn\u2019t material grade\u2014it\u2019s access and complexity. A simple gable roof with walk-around access? That\u2019s a two-day job. A cut-up hip roof with skylights, a chimney, and no staging area? That\u2019s four days. If you want to understand whether your roof is actually due for replacement, check our guide on '),
      linkNode('7 warning signs you need a new roof', '/blog/7-warning-signs-you-need-a-new-roof-before-it-is-too-late'),
      textNode('.'),
    ]),
  ];

  // Section 2: "Permit Costs by County" — after "Bay Area Specific Factors"
  const section2 = [
    headingNode('h2', 'Permit Costs by County'),

    paragraphNode([
      textNode('Permit fees are one of those line items that surprise homeowners. They vary a lot by jurisdiction, and some cities inside a county charge their own fees on top. Here\u2019s what we typically see in 2026:'),
    ]),

    paragraphNode([
      textNode('Alameda County', 1),
      textNode(': $500\u2013$800 depending on city. Oakland and Berkeley run on the higher end. Fremont is usually around $550.'),
    ]),

    paragraphNode([
      textNode('Contra Costa County', 1),
      textNode(': $400\u2013$700. Walnut Creek and Concord are mid-range. Unincorporated areas go through the county office and tend to be cheaper.'),
    ]),

    paragraphNode([
      textNode('Marin County', 1),
      textNode(': $600\u2013$900. Marin has some of the highest permit fees in the Bay Area. San Rafael and Mill Valley are at the top.'),
    ]),

    paragraphNode([
      textNode('Napa County', 1),
      textNode(': $350\u2013$600. Generally the most affordable in our service area. The city of Napa runs about $400.'),
    ]),

    paragraphNode([
      textNode('Santa Clara County', 1),
      textNode(': $450\u2013$750. San Jose is mid-range at around $500. Palo Alto and Los Gatos are higher. We handle all permit pulling as part of our '),
      linkNode('roofing service', '/roofing'),
      textNode(' so you don\u2019t have to deal with the building department.'),
    ]),
  ];

  // Section 3: "Sources & Further Reading" — at bottom
  const section3 = [
    headingNode('h2', 'Sources & Further Reading'),

    paragraphNode([
      textNode('For more information on roofing products and standards, check these resources:'),
    ]),

    paragraphNode([
      textNode('\u2022 '),
      extLinkNode('GAF Timberline HDZ Shingles', 'https://www.gaf.com/en-us/roofing/residential/roofing-shingles/timberline-hdz'),
      textNode(' \u2014 product specs and warranty details for the most popular shingle in America'),
    ]),

    paragraphNode([
      textNode('\u2022 '),
      extLinkNode('ENERGY STAR Roof Products', 'https://www.energystar.gov/products/building_products/roof_products'),
      textNode(' \u2014 energy-efficient roofing products that can reduce cooling costs by 10\u201315%'),
    ]),

    paragraphNode([
      textNode('\u2022 '),
      extLinkNode('CSLB License Lookup', 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx'),
      textNode(' \u2014 verify any California contractor\u2019s license (ours is #1082377)'),
    ]),

    paragraphNode([
      textNode('Related posts: '),
      linkNode('When Is the Best Time to Replace Your Roof in the Bay Area', '/blog/when-is-the-best-time-to-replace-your-roof-in-the-bay-area'),
      textNode(' | '),
      linkNode('7 Warning Signs You Need a New Roof', '/blog/7-warning-signs-you-need-a-new-roof-before-it-is-too-late'),
    ]),
  ];

  return [
    { after: 'what drives the price', nodes: section1 },
    { after: 'bay area specific', nodes: section2 },
    { after: null, nodes: section3 }, // append at end
  ];
}

function getWarningSignsExpansion() {
  // Section 1: "What Bay Area Homeowners Should Watch For" — after "20+ Years Old"
  const section1 = [
    headingNode('h2', 'What Bay Area Homeowners Should Watch For'),

    paragraphNode([
      textNode('The Bay Area throws some unique challenges at your roof that you won\u2019t read about in generic roofing advice. In our experience working in the '),
      linkNode('Oakland', '/service-areas/alameda-county-ca/oakland-ca'),
      textNode(' Hills fire zone, we see homes where the building department requires Class A fire-rated roofing materials. If your home was built before the 1991 fire, there\u2019s a good chance your current roof doesn\u2019t meet current fire code\u2014and that\u2019s something your insurance company is starting to pay attention to.'),
    ]),

    paragraphNode([
      textNode('Over in Marin County, fog is the silent roof killer. That persistent coastal moisture promotes moss and algae growth on north-facing slopes. We pull off shingles in San Rafael and Tiburon that look fine from the street but are completely deteriorated underneath from years of moisture sitting on the surface. If you see green or black streaking on your roof, don\u2019t ignore it\u2014that\u2019s biological growth breaking down the shingle surface.'),
    ]),

    paragraphNode([
      textNode('Contra Costa County has the opposite problem. Inland heat in Walnut Creek, Concord, and Antioch pushes summer temperatures over 100\u00b0F regularly. That thermal cycling\u2014hot days, cool nights\u2014accelerates granule loss on asphalt shingles. One thing we see constantly in Contra Costa County homes built in the 1970s is original plywood decking that\u2019s delaminating from decades of heat exposure. When we tear off those roofs, we end up replacing 30\u201340% of the decking, which adds $1,500\u2013$3,000 to the job.'),
    ]),
  ];

  // Section 2: "Our Experience: What We Find During Inspections" — after "Rising Energy Bills"
  const section2 = [
    headingNode('h2', 'Our Experience: What We Find During Inspections'),

    paragraphNode([
      textNode('In the last year we\u2019ve inspected over 200 roofs across the Bay Area, and the patterns are consistent. About 60% of the roofs we inspect have at least one issue the homeowner didn\u2019t know about. The most common surprise is failed pipe boot flashings\u2014those rubber collars around plumbing vents that dry out and crack after 10\u201312 years. They\u2019re a $15 part that can cause $5,000 in water damage if ignored.'),
    ]),

    paragraphNode([
      textNode('We also find a lot of roofs where a previous contractor did a second layer over the original shingles. California allows two layers, but we almost never recommend it. The added weight stresses the structure, the new shingles don\u2019t lay flat, and you can\u2019t inspect the decking underneath. If your roof has two layers, plan on a full tear-off next time. For a full breakdown of what replacement costs look like, see our '),
      linkNode('Bay Area roof replacement cost guide', '/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026'),
      textNode('.'),
    ]),

    paragraphNode([
      textNode('Here\u2019s what separates a real inspection from a sales pitch: we get on the roof, walk every slope, check every penetration, and take photos. We\u2019ll tell you if your roof has three years left in it\u2014even if that means we don\u2019t get the job today. That\u2019s just how Alexander runs things at Hamilton Exteriors. If you want to know when the timing is right, read our post on '),
      linkNode('the best time to replace your roof in the Bay Area', '/blog/when-is-the-best-time-to-replace-your-roof-in-the-bay-area'),
      textNode('. And when you\u2019re ready, '),
      linkNode('get a free quote here', '/#quote'),
      textNode('.'),
    ]),
  ];

  // Section 3: Sources
  const section3 = [
    headingNode('h2', 'Sources & Further Reading'),

    paragraphNode([
      textNode('\u2022 '),
      extLinkNode('GAF Timberline HDZ Shingles', 'https://www.gaf.com/en-us/roofing/residential/roofing-shingles/timberline-hdz'),
      textNode(' \u2014 industry-leading wind and algae resistance specs'),
    ]),

    paragraphNode([
      textNode('\u2022 '),
      extLinkNode('CSLB License Lookup', 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx'),
      textNode(' \u2014 always verify your contractor is licensed (Hamilton Exteriors: CSLB #1082377)'),
    ]),

    paragraphNode([
      textNode('\u2022 '),
      extLinkNode('ENERGY STAR Roof Products', 'https://www.energystar.gov/products/building_products/roof_products'),
      textNode(' \u2014 certified energy-efficient roofing options'),
    ]),
  ];

  return [
    { after: '20+ years old', nodes: section1 },
    { after: 'rising energy bills', nodes: section2 },
    { after: null, nodes: section3 },
  ];
}

function getBestTimeExpansion() {
  // Section 1: "How Weather Affects Your Timeline" — after "Best Months"
  const section1 = [
    headingNode('h2', 'How Weather Affects Your Timeline'),

    paragraphNode([
      textNode('The Bay Area doesn\u2019t have one climate\u2014it has a dozen microclimates, and they all affect roofing work differently. The coastal fog belt from Pacifica through San Francisco up to Marin means morning moisture on roofs until 10 or 11 AM for much of the summer. That\u2019s not a deal-breaker, but it means crews start later on foggy days and the shingles need to be dry before they\u2019ll seal properly.'),
    ]),

    paragraphNode([
      textNode('Inland valleys\u2014Walnut Creek, Concord, Livermore, San Jose\u2014get genuine heat. When it\u2019s 95\u00b0F+ on a black roof, the surface temperature hits 150\u00b0F or higher. That\u2019s rough on crews and it actually affects material handling. Shingles get soft and can scuff if walked on, and sealant strips activate faster than intended. We adjust our start times in July and August to get the critical work done before noon.'),
    ]),

    paragraphNode([
      textNode('Rain is the real schedule-wrecker. The Bay Area averages 20\u201325 inches of rain per year, almost all of it between November and March. We can\u2019t install shingles on a wet deck, and we won\u2019t tear off a roof if there\u2019s rain in the 48-hour forecast. That\u2019s why winter jobs take longer\u2014not because the work itself is slower, but because we lose days to weather holds. If you\u2019re planning a winter replacement, budget an extra week in your timeline.'),
    ]),
  ];

  // Section 2: "Our Scheduling Advice" — after "Permit Timing"
  const section2 = [
    headingNode('h2', 'Our Scheduling Advice'),

    paragraphNode([
      textNode('After running roofing crews across the Bay Area for years, here\u2019s what we tell every homeowner: book 4\u20136 weeks ahead during peak season (May through October). We\u2019re typically running 3\u20134 crews and scheduling 2\u20133 weeks out minimum during summer. If you call in July wanting a roof next week, it\u2019s probably not happening unless you have an active leak.'),
    ]),

    paragraphNode([
      textNode('Our fastest availability is usually in January and February\u2014the dead of winter. We\u2019ll have openings within 1\u20132 weeks, and we often run pricing incentives during those months because we want to keep our crews busy. March and April are the sweet spot: weather is improving, but we haven\u2019t hit the summer rush yet. If you can time your project for late March through April, you get good weather and short wait times.'),
    ]),

    paragraphNode([
      textNode('One more thing: permits add time. Some Bay Area cities turn permits around in 3\u20135 business days. Others take 2\u20133 weeks. We pull permits as part of every '),
      linkNode('roofing project', '/roofing'),
      textNode(' and we know the timelines for every jurisdiction in our service area. If you want to understand what the full project will cost, read our '),
      linkNode('Bay Area roof replacement cost guide', '/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026'),
      textNode('. Not sure if your roof actually needs replacing? Check out '),
      linkNode('7 warning signs it\u2019s time for a new roof', '/blog/7-warning-signs-you-need-a-new-roof-before-it-is-too-late'),
      textNode('.'),
    ]),
  ];

  // Section 3: "Real Talk: What Most Contractors Won't Tell You" — after "Off-Season Advantages"
  const section3 = [
    headingNode('h2', 'Real Talk: What Most Contractors Won\u2019t Tell You'),

    paragraphNode([
      textNode('Some contractors push emergency replacements because it\u2019s easier to close a scared homeowner than an informed one. Here\u2019s the honest truth from someone who\u2019d rather earn your trust than your panic: most roof issues are not emergencies. A missing shingle, some granule loss in the gutters, a small stain on the ceiling\u2014these are signals, not sirens.'),
    ]),

    paragraphNode([
      textNode('When is it genuinely urgent? When you have active water intrusion during a storm, when decking is visibly sagging, or when a tree has damaged structural members. Those situations need a tarp today and a crew this week. Everything else? You have time to get two or three quotes, check licenses on the '),
      extLinkNode('CSLB website', 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx'),
      textNode(', read reviews, and make an informed decision.'),
    ]),

    paragraphNode([
      textNode('Alexander\u2019s rule at Hamilton Exteriors: if we inspect your roof and it has 3\u20135 years left, we\u2019ll tell you that. We\u2019d rather you call us in three years when you\u2019re ready than pressure you into a job you don\u2019t need yet. That\u2019s how you build a business that lasts. When you are ready, '),
      linkNode('request a free quote', '/#quote'),
      textNode(' and we\u2019ll get you on the schedule.'),
    ]),
  ];

  // Section 4: Sources
  const section4 = [
    headingNode('h2', 'Sources & Further Reading'),

    paragraphNode([
      textNode('\u2022 '),
      extLinkNode('GAF Timberline HDZ Shingles', 'https://www.gaf.com/en-us/roofing/residential/roofing-shingles/timberline-hdz'),
      textNode(' \u2014 warranty and performance specs for the Bay Area\u2019s most-installed shingle'),
    ]),

    paragraphNode([
      textNode('\u2022 '),
      extLinkNode('ENERGY STAR Roof Products', 'https://www.energystar.gov/products/building_products/roof_products'),
      textNode(' \u2014 cool roof options that can reduce attic temperatures by up to 30\u00b0F'),
    ]),

    paragraphNode([
      textNode('\u2022 '),
      extLinkNode('CSLB License Lookup', 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx'),
      textNode(' \u2014 verify contractor licenses before signing anything'),
    ]),
  ];

  return [
    { after: 'best months', nodes: section1 },
    { after: 'permit', nodes: section2 },
    { after: 'off-season', nodes: section3 },
    { after: null, nodes: section4 },
  ];
}

// ── Main ────────────────────────────────────────────────────────────────────

const POSTS = [
  {
    slug: 'how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026',
    name: 'Cost Post',
    getExpansion: getCostPostExpansion,
  },
  {
    slug: '7-warning-signs-you-need-a-new-roof-before-it-is-too-late',
    name: 'Warning Signs Post',
    getExpansion: getWarningSignsExpansion,
  },
  {
    slug: 'when-is-the-best-time-to-replace-your-roof-in-the-bay-area',
    name: 'Best Time Post',
    getExpansion: getBestTimeExpansion,
  },
];

async function expandPost(postConfig) {
  const { slug, name, getExpansion } = postConfig;

  console.log(`\n=== ${name} ===`);
  console.log(`  Fetching: ${slug}`);

  // Fetch the post
  const data = await ghostGet(`posts/slug/${slug}/?formats=lexical`);
  const post = data.posts?.[0];
  if (!post) {
    console.error(`  ERROR: Post not found: ${slug}`);
    return false;
  }

  console.log(`  Found post: "${post.title}" (id: ${post.id})`);

  // Parse lexical
  let lexical;
  try {
    lexical = JSON.parse(post.lexical);
  } catch (e) {
    console.error(`  ERROR: Failed to parse lexical JSON: ${e.message}`);
    return false;
  }

  const root = lexical.root;
  if (!root || !root.children) {
    console.error('  ERROR: Unexpected lexical structure (no root.children)');
    return false;
  }

  const nodes = root.children;
  const originalCount = nodes.length;

  // Log existing headings for debugging
  console.log('  Existing headings:');
  nodes.forEach((n, i) => {
    if (n.type === 'heading') {
      const text = n.children?.map(c => c.text || '').join('') || '';
      console.log(`    [${i}] ${n.tag}: "${text}"`);
    }
  });

  // Get expansion sections
  const expansions = getExpansion();

  // Process expansions in reverse order to preserve indices
  // First, separate the "append at end" ones from the "after section" ones
  const appendAtEnd = expansions.filter(e => e.after === null);
  const insertions = expansions.filter(e => e.after !== null);

  // Append "at end" sections first (these go at the very bottom)
  for (const expansion of appendAtEnd) {
    nodes.push(...expansion.nodes);
    console.log(`  Appended sources section (${expansion.nodes.length} nodes)`);
  }

  // Now do insertions in reverse order of their target position
  // so earlier insertions don't shift indices of later ones
  const insertionPoints = insertions.map(exp => {
    const idx = findHeadingIndex(nodes, exp.after);
    const end = idx >= 0 ? findSectionEnd(nodes, idx) : -1;
    return { ...exp, targetIndex: end };
  });

  // Sort by targetIndex descending
  insertionPoints.sort((a, b) => b.targetIndex - a.targetIndex);

  for (const insertion of insertionPoints) {
    if (insertion.targetIndex >= 0) {
      nodes.splice(insertion.targetIndex, 0, ...insertion.nodes);
      console.log(`  Inserted after "${insertion.after}" at index ${insertion.targetIndex} (${insertion.nodes.length} nodes)`);
    } else {
      // Fallback: insert before sources section
      const sourcesIdx = findHeadingIndex(nodes, 'sources');
      const insertAt = sourcesIdx >= 0 ? sourcesIdx : nodes.length;
      nodes.splice(insertAt, 0, ...insertion.nodes);
      console.log(`  Fallback insert for "${insertion.after}" at index ${insertAt} (${insertion.nodes.length} nodes)`);
    }
  }

  console.log(`  Nodes: ${originalCount} -> ${nodes.length}`);

  // Update the post
  const updatedLexical = JSON.stringify(lexical);

  await ghostPut(`posts/${post.id}/`, {
    posts: [{
      lexical: updatedLexical,
      updated_at: post.updated_at,
    }],
  });

  console.log(`  UPDATED successfully`);
  return true;
}

async function main() {
  console.log('Expanding blog posts on Ghost CMS...');
  console.log(`Ghost URL: ${GHOST_URL}`);

  let success = 0;
  let failed = 0;

  for (const postConfig of POSTS) {
    try {
      const ok = await expandPost(postConfig);
      if (ok) success++;
      else failed++;
    } catch (e) {
      console.error(`  FAILED: ${postConfig.slug} — ${e.message}`);
      failed++;
    }
  }

  console.log(`\n=== Done ===`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
