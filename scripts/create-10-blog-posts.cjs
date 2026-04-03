/**
 * Create 10 SEO blog posts in Ghost CMS.
 *
 * Usage: node scripts/create-10-blog-posts.cjs
 * Requires: PUBLIC_GHOST_URL, GHOST_ADMIN_API_KEY (format id:secret)
 */

const jwt = require('jsonwebtoken');

// ── Config ──────────────────────────────────────────────────────────────────

const GHOST_URL = process.env.PUBLIC_GHOST_URL || '';
const GHOST_ADMIN_KEY = process.env.GHOST_ADMIN_API_KEY || '';

if (!GHOST_URL || !GHOST_ADMIN_KEY) {
  console.error('Missing PUBLIC_GHOST_URL or GHOST_ADMIN_API_KEY env var');
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

async function ghostPost(endpoint, body) {
  const token = makeToken();
  const url = `${GHOST_URL}/ghost/api/admin/${endpoint}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Ghost ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ghost POST ${res.status}: ${text}`);
  }
  return res.json();
}

// ── Lexical node builders ───────────────────────────────────────────────────

function t(text, format = 0) {
  return { type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1 };
}

function link(text, url) {
  return {
    type: 'link', children: [t(text)], direction: 'ltr', format: '', indent: 0,
    version: 1, rel: 'noopener', target: null, title: '', url,
  };
}

function extLink(text, url) {
  return {
    type: 'link', children: [t(text)], direction: 'ltr', format: '', indent: 0,
    version: 1, rel: 'noopener noreferrer', target: '_blank', title: '', url,
  };
}

function p(...children) {
  return {
    type: 'paragraph', children, direction: 'ltr', format: '', indent: 0,
    version: 1, textFormat: 0, textStyle: '',
  };
}

function h2(text) {
  return {
    type: 'heading', tag: 'h2', children: [t(text)], direction: 'ltr',
    format: '', indent: 0, version: 1,
  };
}

function h3(text) {
  return {
    type: 'heading', tag: 'h3', children: [t(text)], direction: 'ltr',
    format: '', indent: 0, version: 1,
  };
}

function ul(items) {
  return {
    type: 'list', tag: 'ul', children: items.map((item, i) => ({
      type: 'listitem',
      children: Array.isArray(item) ? item : [t(item)],
      direction: 'ltr', format: '', indent: 0, version: 1, value: i + 1,
    })),
    direction: 'ltr', format: '', indent: 0, version: 1, listType: 'bullet', start: 1,
  };
}

function ol(items) {
  return {
    type: 'list', tag: 'ol', children: items.map((item, i) => ({
      type: 'listitem',
      children: Array.isArray(item) ? item : [t(item)],
      direction: 'ltr', format: '', indent: 0, version: 1, value: i + 1,
    })),
    direction: 'ltr', format: '', indent: 0, version: 1, listType: 'number', start: 1,
  };
}

function lexical(children) {
  return JSON.stringify({
    root: { children, direction: 'ltr', format: '', indent: 0, type: 'root', version: 1 },
  });
}

// ── Blog post content ───────────────────────────────────────────────────────

function post1_roofReplaceTimeline() {
  return {
    title: 'How Long Does a Roof Replacement Take? A Bay Area Timeline',
    slug: 'how-long-does-a-roof-replacement-take-bay-area-timeline',
    meta_title: 'How Long Does a Roof Replacement Take? Bay Area Timeline',
    meta_description: 'Realistic roof replacement timelines for Bay Area homes. From permits to final inspection, here is what to expect for asphalt, tile, and metal roofs.',
    lexical: lexical([
      p(t("If you're planning a roof replacement in the Bay Area, the first question is usually: how long is this going to take? The answer depends on your roof size, material, permit requirements, and weather. Here's a straight breakdown from someone who's done hundreds of roofs across Alameda, Contra Costa, and Marin counties.")),

      h2('The Short Answer'),
      p(t('Most asphalt shingle roofs on a standard single-story home take '), t('3 to 5 working days', 1), t('. Tile roofs run 7 to 10 days. Metal roofs land somewhere in between at 5 to 7 days. These are working days — not counting weekends, rain delays, or permit wait times.')),

      h2('Day-by-Day Breakdown: Asphalt Shingle Roof'),
      p(t('Here is what a typical asphalt shingle replacement looks like on a 2,000 sq ft Bay Area home:')),

      h3('Day 1: Tear-Off'),
      p(t("The crew arrives early — usually around 7 AM. We lay tarps around the entire perimeter of your home and set up our dump trailer. The old shingles, underlayment, and any rotted decking come off. By end of day, you're looking at bare plywood (or OSB). We inspect every inch of decking for rot, soft spots, and proper nailing.")),

      h3('Day 2: Decking Repairs and Underlayment'),
      p(t("Any damaged decking gets replaced. On Bay Area homes, especially in coastal areas like Marin or near the Oakland Hills, we commonly find moisture damage from years of fog exposure. After repairs, we install ice-and-water shield in valleys and around penetrations, then roll out synthetic underlayment across the entire roof deck.")),

      h3('Day 3: Shingle Installation Begins'),
      p(t('Starter strips go down first, then courses of shingles from the eaves up. Ridge vents and hip caps follow. On a straightforward roof, the crew can get 70-80% of shingles down on day 3.')),

      h3('Day 4: Finish Shingles, Flashings, and Details'),
      p(t('Remaining shingles, all pipe boot flashings, wall flashings, and any chimney or skylight work. This is the detail day — the stuff that separates a 5-year roof from a 30-year roof.')),

      h3('Day 5: Cleanup and Final Walk'),
      p(t("Full magnetic sweep of the yard and driveway for stray nails, gutter cleaning, and final inspection. We walk the roof with you (photos if you'd rather stay on the ground) and make sure every flashing, every edge, every vent is right.")),

      h2('Tile Roof Timeline: 7-10 Days'),
      p(t('Concrete and clay tile roofs take longer for good reason. Tile is heavier, requires battens, and each piece needs individual attention. The tear-off alone can take 2 days on a tile roof because of the weight. Then you have batten installation, underlayment (we use two layers on tile jobs), and the tile setting itself, which requires careful alignment and cutting.')),
      p(t("In cities like Los Gatos, Saratoga, and parts of the East Bay Hills where tile roofs are common, plan for about two weeks from start to finish. That's actual working time — it can stretch to three weeks if you factor in a rainy stretch.")),

      h2('Metal Roof Timeline: 5-7 Days'),
      p(t("Standing seam metal roofs are faster than tile but slower than shingles. The panels are custom-measured and ordered ahead of time, so the install itself is efficient. The extra time comes from the precision work — every panel has to be perfectly aligned, and the fastening system is more involved. Metal roofs are increasingly popular in "), link('WUI fire zones', '/blog/bay-area-fire-zone-roofing-requirements'), t(' across the Bay Area because of their Class A fire rating.')),

      h2('The Permit Factor'),
      p(t('Every Bay Area city requires a permit for a roof replacement. How long that takes varies wildly:')),
      ul([
        [t('Alameda County', 1), t(' cities (Oakland, Berkeley, Fremont): 1-3 weeks for permit approval')],
        [t('Contra Costa County', 1), t(' (Walnut Creek, Concord, Martinez): Usually 1-2 weeks')],
        [t('Marin County', 1), t(' (San Rafael, Mill Valley, Novato): 2-4 weeks, sometimes longer')],
        [t('Santa Clara County', 1), t(' (San Jose, Sunnyvale, Palo Alto): 1-3 weeks')],
        [t('Napa County', 1), t(' (Napa, St. Helena): Typically 1-2 weeks')],
      ]),
      p(t("We pull permits before scheduling your job, so by the time our crew shows up, the permit is posted and we're ready to go. No surprise delays.")),

      h2('Weather Delays in the Bay Area'),
      p(t("The Bay Area's Mediterranean climate is actually great for roofing — we can work about 9-10 months out of the year without weather issues. The rainy season (November through March) is when delays happen. We won't install shingles in the rain — not because we can't, but because moisture trapped under new shingles leads to problems down the road.")),
      p(t('If your roof is actively leaking and you need emergency work during the rainy season, we can do a temporary dry-in (underlayment and tarps) to protect your home until conditions are right for the full install.')),

      h2('What Can Slow Things Down'),
      ul([
        [t('Hidden decking damage', 1), t(' — we budget for some, but extensive rot can add 1-2 days')],
        [t('Multiple roof layers', 1), t(' — some older Bay Area homes have 2-3 layers of shingles that all need removal')],
        [t('Complex roof geometry', 1), t(' — lots of valleys, dormers, and pitch changes add time')],
        [t('Skylight replacement', 1), t(' — if you are adding or replacing skylights during a reroof, budget an extra day')],
        [t('HOA approvals', 1), t(' — some communities require architectural review before you can start')],
      ]),

      h2('From Alexander: Setting Honest Expectations'),
      p(t("I've been doing roofs in the Bay Area for over a decade, and I've learned that homeowners appreciate honesty over optimism. When a contractor tells you they'll knock out your roof in two days, be skeptical. A quality tear-off-and-replace on a typical Bay Area home takes the time it takes. We'd rather spend an extra day getting your flashings right than rush through and leave you with a leak in two years.", 2)),
      p(t("If you want an honest timeline for your specific roof, "), link('request a quote', '/#quote'), t(" and we'll walk it with you — no pressure, no games.")),

      h2('Plan Ahead: Best Time to Replace Your Roof'),
      p(t("The best time to schedule a "), link('roof replacement', '/roofing'), t(" in the Bay Area is late spring through early fall (April through October). That's when weather is most predictable and our crews can work uninterrupted. Booking 3-4 weeks out during peak season is normal.")),
      p(t("Check your roof's condition with our "), link('maintenance checklist', '/blog/roof-maintenance-checklist-bay-area'), t(" or contact us directly for an inspection. We serve all of "), link('Alameda County', '/service-areas/alameda-county-ca'), t(', '), link('Contra Costa County', '/service-areas/contra-costa-county-ca'), t(', and surrounding Bay Area communities.')),

      h2('Bottom Line'),
      p(t("Plan for 3-5 days for asphalt, 5-7 for metal, and 7-10 for tile — plus 1-4 weeks of permit lead time depending on your city. The roof replacement itself is one of the faster home improvement projects. The permit process is usually what takes the most patience.")),
    ]),
  };
}

function post2_metalVsAsphalt() {
  return {
    title: 'Metal Roof vs Asphalt Shingles: Which Is Better for Bay Area Homes?',
    slug: 'metal-roof-vs-asphalt-shingles-bay-area',
    meta_title: 'Metal Roof vs Asphalt Shingles for Bay Area Homes (2026)',
    meta_description: 'Comparing metal roofs and asphalt shingles for Bay Area homes. Cost, lifespan, fire resistance, and energy savings explained by a local contractor.',
    lexical: lexical([
      p(t("This is the most common question I get from Bay Area homeowners: should I go metal or stick with asphalt shingles? Both are solid choices, but the right answer depends on your budget, your home's style, and where you live. Let me break it down honestly.")),

      h2('Cost Comparison'),
      p(t("Let's start with what everyone wants to know — price.")),
      ul([
        [t('Asphalt shingles: $8-$14 per square foot installed', 1), t(' (including tear-off, underlayment, and labor)')],
        [t('Standing seam metal: $15-$25 per square foot installed', 1)],
        [t('Metal shingle panels: $12-$18 per square foot installed', 1)],
      ]),
      p(t('For a typical 2,000 sq ft Bay Area roof, that translates to roughly $16,000-$28,000 for asphalt and $30,000-$50,000 for standing seam metal. Yes, metal costs about twice as much upfront. But the math changes when you factor in lifespan.')),

      h2('Lifespan: Where Metal Pulls Ahead'),
      ul([
        [t('Asphalt shingles: 20-30 years', 1), t(' (architectural/dimensional shingles on the higher end)')],
        [t('Metal roof: 40-70 years', 1), t(' depending on material and coating quality')],
      ]),
      p(t("If you're planning to stay in your home long-term, a metal roof can be a one-and-done investment. Most Bay Area homeowners who choose asphalt will need at least one more roof replacement in their lifetime. Spread the cost over decades and metal often wins on a per-year basis.")),

      h2('Fire Resistance: Critical for Bay Area Homes'),
      p(t("This is where things get serious for Bay Area homeowners. If you live in a "), link('WUI (Wildland-Urban Interface) fire zone', '/blog/bay-area-fire-zone-roofing-requirements'), t(", your roofing material isn't just a preference — it's a safety decision.")),
      ul([
        [t('Metal roofs: Class A fire rating', 1), t(' (the highest) — they will not ignite from embers or radiant heat')],
        [t('Asphalt shingles: Class A fire rating available', 1), t(' with fiberglass-mat products from '), extLink('GAF', 'https://www.gaf.com/en-us/roofing/residential/shingles'), t(' and similar manufacturers')],
      ]),
      p(t("Both can achieve Class A, but metal is inherently noncombustible. In neighborhoods like the Oakland Hills, Orinda, Lafayette, and parts of Marin where wildfire risk is real, metal gives homeowners genuine peace of mind. After the 1991 Oakland Hills fire, many rebuilt homes went with metal roofs specifically for this reason.")),

      h2('Bay Area Climate Factors'),
      p(t("The Bay Area's climate is actually kind to both materials, but with some differences worth noting:")),

      h3('Coastal Fog and Moisture'),
      p(t("Homes in San Francisco, Daly City, Pacifica, and coastal Marin get hammered by salt air and moisture. Metal roofs with proper coatings (Kynar/PVDF finishes) handle this well. Standard asphalt shingles also perform fine in fog, but algae growth is more common on north-facing slopes — those dark streaks you see on roofs in Mill Valley and Tiburon.")),

      h3('Heat and UV Exposure'),
      p(t("East Bay cities like Walnut Creek, Concord, Pleasanton, and Livermore see significantly more heat than the coast. Metal roofs reflect solar radiation and can reduce cooling costs by 10-25% according to the "), extLink('Department of Energy', 'https://www.energy.gov/energysaver/cool-roofs'), t('. Asphalt absorbs more heat, though lighter-colored shingles help.')),

      h3('Wind'),
      p(t("Bay Area wind — especially in the Altamont Pass corridor and coastal ridgelines — can be harsh. Metal panels lock together mechanically and handle high winds better than shingles. Most standing seam systems are rated for 110+ mph winds. Architectural shingles are typically rated 110-130 mph but can lift at edges if improperly installed.")),

      h2('Appearance'),
      p(t("Historically, metal roofs looked industrial. That's changed dramatically. Modern standing seam metal comes in dozens of colors and has a clean, contemporary look that works well on Bay Area homes — especially mid-century modern, ranch, and contemporary styles common in the East Bay Hills and Silicon Valley.")),
      p(t("Asphalt shingles offer the widest variety of profiles and colors. If you have a Craftsman bungalow in Berkeley or a Victorian in Alameda, dimensional asphalt shingles may be the better aesthetic match.")),
      p(t("Neither material is objectively better-looking. It depends on your home's architecture.")),

      h2('Energy Savings'),
      p(t("California's "), extLink('Title 24 energy code', 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards'), t(' has specific cool roof requirements that affect material choices. Metal roofs with reflective coatings naturally meet cool roof requirements. Asphalt shingles need to be specifically "cool roof" rated products to comply.')),
      p(t("For Bay Area homes with air conditioning (increasingly common in the East Bay and South Bay), a metal roof can save $200-$500/year on cooling costs. Homes closer to the coast that rarely use AC won't see as much savings.")),

      h2('Sound and Hail'),
      p(t('A common concern: "won\'t a metal roof be loud in the rain?" With proper solid-deck installation (not open purlins) and underlayment, a metal roof is no louder than asphalt during rain. Hail is rare in the Bay Area, but metal handles it better than shingles when it does happen.')),

      h2('Resale Value'),
      p(t("In the Bay Area housing market, a new roof of either type adds value. Metal roofs tend to get called out as a selling point in MLS listings more often because buyers recognize the longevity and fire resistance. A new asphalt shingle roof is expected — it doesn't get the same attention.")),
      p(t("According to "), extLink('Remodeling Magazine\'s Cost vs. Value report', 'https://www.remodeling.hw.net/cost-vs-value/2024/'), t(', a new asphalt roof recovers about 60-65% of its cost at resale. Metal roof data is less standardized but generally runs higher in fire-prone markets like the Bay Area.')),

      h2('From Alexander: My Honest Take'),
      p(t("I install both materials and I don't push one over the other. Here's how I think about it: if your budget is tight and your home needs a roof now, asphalt shingles are a proven, reliable choice. If you can afford the upfront cost and plan to stay in your home 15+ years (or you're in a fire zone), metal is the smarter long-term investment.", 2)),
      p(t("What I won't do is talk you into a $45,000 metal roof when a $22,000 asphalt roof solves your problem just as well. That's not how we operate at Hamilton Exteriors.", 2)),

      h2('Which Should You Choose?'),
      p(t('Go with ', 1), t('asphalt shingles', 1), t(' if:')),
      ul([
        'Budget is your primary concern',
        'You plan to sell within 10-15 years',
        'Your home has a traditional style that suits shingles',
        "You're not in a high fire risk zone",
      ]),
      p(t('Go with ', 1), t('metal', 1), t(' if:')),
      ul([
        "You're staying long-term and want a lifetime roof",
        'Fire resistance is a priority',
        "You want maximum energy efficiency",
        'Your home suits a modern or clean-line aesthetic',
      ]),
      p(t('Ready to get specific pricing for your home? '), link('Get a free quote', '/#quote'), t(' or learn more about our '), link('roofing services', '/roofing'), t('. We serve the entire Bay Area including '), link('Alameda County', '/service-areas/alameda-county-ca'), t(', '), link('Contra Costa County', '/service-areas/contra-costa-county-ca'), t(', '), link('Marin County', '/service-areas/marin-county-ca'), t(', and '), link('Santa Clara County', '/service-areas/santa-clara-county-ca'), t('.')),
    ]),
  };
}

function post3_jamesHardieSiding() {
  return {
    title: 'James Hardie Siding: Why Bay Area Contractors Recommend It',
    slug: 'james-hardie-siding-bay-area',
    meta_title: 'James Hardie Siding for Bay Area Homes | Fiber Cement Guide',
    meta_description: 'Why Bay Area contractors recommend James Hardie fiber cement siding. Cost, moisture resistance, fire rating, and color options compared to vinyl and wood.',
    lexical: lexical([
      p(t("If you talk to enough Bay Area contractors about siding, the same name keeps coming up: James Hardie. There's a reason for that. After installing thousands of squares of siding across the East Bay, Marin, and South Bay, I can tell you that fiber cement — and Hardie board specifically — handles our climate better than any other siding material.")),

      h2('What Is James Hardie Siding?'),
      p(t("James Hardie is the brand name for a fiber cement siding product. It's made from cement, sand, and cellulose fibers — pressed and cured into planks, shingles, or panels. It looks and feels like real wood but doesn't rot, warp, or attract termites.")),
      p(t("James Hardie makes several product lines, but the most popular for Bay Area homes are HardiePlank (horizontal lap siding), HardieShingle (cedar shake look), and HardiePanel (vertical board-and-batten).")),

      h2('Why Fiber Cement Beats Other Materials in the Bay Area'),

      h3('Fog and Moisture Resistance'),
      p(t("The Bay Area's coastal fog is murder on wood siding. Homes in San Francisco, Half Moon Bay, Marin County, and the coastal parts of Alameda County deal with constant moisture cycling — wet in the morning, dry by afternoon. Wood siding swells and contracts with every cycle, eventually cracking, warping, and rotting.")),
      p(t("Fiber cement doesn't absorb moisture the way wood does. It's dimensionally stable, meaning it holds its shape through fog, rain, and dry heat. This is the single biggest reason Bay Area contractors default to Hardie.")),

      h3('Fire Rating'),
      p(t("James Hardie siding is noncombustible and carries a 1-hour fire rating. For homes in "), link('WUI fire zones', '/blog/bay-area-fire-zone-roofing-requirements'), t(' — which covers large sections of the Oakland Hills, Orinda, Lafayette, Moraga, and hillside Marin — fiber cement siding meets all fire code requirements without needing additional fire-resistant barriers.')),
      p(t('Vinyl siding melts. Wood siding burns. Fiber cement does neither.')),

      h3('Termite Resistance'),
      p(t("Subterranean termites are active across the Bay Area, especially in older homes in Berkeley, Oakland, Hayward, and San Jose. Fiber cement contains nothing termites want to eat. Wood siding — even treated wood — is always at risk.")),

      h2('Cost Comparison: Fiber Cement vs Vinyl vs Wood'),
      p(t('Installed costs per square foot in the Bay Area (2026):')),
      ul([
        [t('Vinyl siding: $4-$8/sq ft', 1), t(' — cheapest upfront, but looks cheap and doesn\'t hold up')],
        [t('James Hardie fiber cement: $10-$16/sq ft', 1), t(' — mid-range, best long-term value')],
        [t('Real wood (cedar/redwood): $12-$22/sq ft', 1), t(' — beautiful but high maintenance')],
        [t('Engineered wood (LP SmartSide): $8-$12/sq ft', 1), t(' — decent alternative but less proven in fog')],
      ]),
      p(t("For a typical 1,500 sq ft of siding (exterior coverage, not floor area), you're looking at roughly $15,000-$24,000 for James Hardie installed. That includes removal of old siding, weather barrier, and trim.")),

      h2('ColorPlus Technology'),
      p(t("One of Hardie's standout features is their ColorPlus factory finish. Instead of painting on site, the color is baked on at the factory — multiple coats, UV-resistant, with a 15-year warranty against fading, peeling, and cracking.")),
      p(t("This matters in the Bay Area because UV exposure varies dramatically. A south-facing wall in Walnut Creek gets blasted with sun, while a north-facing wall in Marin sits in fog half the day. ColorPlus handles both extremes better than field-applied paint.")),
      p(t("Hardie offers over 30 ColorPlus colors. The most popular in the Bay Area right now are Iron Gray, Arctic White, Boothbay Blue, and Monterey Taupe. You can also get primed boards and paint them any color you want — we do this for custom color matches on historic homes.")),

      h2('Warranty Details'),
      p(t("James Hardie offers a "), extLink('30-year non-prorated warranty', 'https://www.jameshardie.com/warranty'), t(" on their fiber cement products and a 15-year warranty on ColorPlus finish. Compare that to vinyl (lifetime but heavily prorated after 5-10 years) or wood (no manufacturer warranty on the material itself).")),
      p(t("The Hardie warranty covers defects in materials — cracking, delamination, rot. It does not cover improper installation, which is why you need a contractor who follows Hardie's specific installation best practices. We're trained on their system and follow their nailing, gapping, and flashing specifications to the letter.")),

      h2('Installation: What Makes the Difference'),
      p(t("Fiber cement is heavier than vinyl or wood and requires specific tools (carbide-tipped blades, not standard wood saws). It also needs proper gapping at butt joints (typically 3/16\") and specific nailing patterns.")),
      p(t("Common installation mistakes we see on Bay Area homes when other contractors cut corners:")),
      ul([
        'Butt joints too tight — leads to cracking when the material expands',
        'Nails driven too deep — cracks the board and voids the warranty',
        'Missing kick-out flashings at roof-to-wall intersections',
        'No back-priming — Hardie requires at least the cut edges to be sealed',
        'Wrong fasteners — galvanized nails corrode in coastal air; stainless steel is the move',
      ]),

      h2('From Alexander: Real Talk on Siding'),
      p(t("I've replaced vinyl siding that was 8 years old and already chalking and cracking. I've replaced wood siding that rotted through in 12 years on a fog-belt home. And I've seen 25-year-old Hardie board that still looks solid.", 2)),
      p(t("If someone asks me what siding to put on their Bay Area home, my default answer is James Hardie. Not because it's the most profitable for me — the install takes longer and requires better tools. But because it's what I'd put on my own home.", 2)),

      h2('Is Fiber Cement Right for Your Home?'),
      p(t('James Hardie works on almost every Bay Area home style:')),
      ul([
        'Craftsman bungalows — HardiePlank or HardieShingle for a period-appropriate look',
        'Mid-century modern — HardiePanel in clean board-and-batten',
        'Victorian and Edwardian — HardieTrim for detailed millwork profiles',
        'Contemporary and new construction — mixed HardiePanel and HardiePlank',
      ]),
      p(t("The only situation where I'd steer you away from Hardie is if you're set on a real wood look and you're willing to commit to repainting every 5-7 years and watching for rot. Real cedar and redwood are beautiful — they just require more attention.")),

      p(t('Learn more about our '), link('siding services', '/siding'), t(' or '), link('get a quote', '/#quote'), t(' for your Bay Area home. We serve all of '), link('Alameda County', '/service-areas/alameda-county-ca'), t(', '), link('Contra Costa County', '/service-areas/contra-costa-county-ca'), t(', and '), link('Marin County', '/service-areas/marin-county-ca'), t('.')),
    ]),
  };
}

function post4_aduCost() {
  return {
    title: 'ADU Cost in the Bay Area: What to Budget in 2026',
    slug: 'adu-cost-bay-area-2026',
    meta_title: 'ADU Cost in the Bay Area 2026 | Budget Guide',
    meta_description: 'Bay Area ADU costs broken down by type. Detached, attached, and garage conversions with permit costs, timelines, and financing options for 2026.',
    lexical: lexical([
      p(t("Building an ADU (Accessory Dwelling Unit) in the Bay Area is one of the smartest investments you can make right now. But smart doesn't mean cheap. Here's an honest breakdown of what ADUs actually cost in 2026, based on what we're building across Alameda, Contra Costa, and Santa Clara counties.")),

      h2('ADU Cost by Type'),

      h3('Detached ADU (New Construction)'),
      p(t('A standalone detached ADU built from the ground up in your backyard.')),
      ul([
        [t('400-500 sq ft (studio/1BR): $180,000-$280,000', 1)],
        [t('500-750 sq ft (1BR/2BR): $250,000-$400,000', 1)],
        [t('750-1,200 sq ft (2BR/2BA): $350,000-$550,000', 1)],
      ]),
      p(t('These ranges include everything: plans, permits, foundation, framing, electrical, plumbing, HVAC, interior finish, and landscaping repair. The wide range reflects differences in finish level (builder-grade vs. custom), site conditions (slope, access, utilities), and city.')),

      h3('Attached ADU (Addition to Existing Home)'),
      p(t("An addition built onto your existing house, typically extending off the back or side.")),
      ul([
        [t('400-600 sq ft: $150,000-$280,000', 1)],
        [t('600-1,000 sq ft: $250,000-$400,000', 1)],
      ]),
      p(t('Attached ADUs can be slightly cheaper than detached because you share a wall with the main house — saving on foundation and exterior finish. But structural tie-ins and matching the existing home can add complexity.')),

      h3('Garage Conversion'),
      p(t('Converting an existing garage into a living space.')),
      ul([
        [t('1-car garage (200-250 sq ft): $80,000-$150,000', 1)],
        [t('2-car garage (400-500 sq ft): $120,000-$220,000', 1)],
      ]),
      p(t('Garage conversions are the most affordable ADU option because the shell (walls, roof, foundation) already exists. Costs cover insulation, drywall, flooring, a kitchenette, bathroom, windows, electrical upgrades, and plumbing.')),
      p(t("One important note: most Bay Area cities no longer require replacement parking when you convert a garage to an ADU, thanks to California's AB 2097. This was a major barrier that's now gone.")),

      h2('What Drives ADU Costs in the Bay Area'),

      h3('Labor'),
      p(t("Bay Area construction labor is among the most expensive in the country. Skilled framers, electricians, and plumbers charge $70-$120/hour. This isn't price gouging — it's the cost of living here. A framer paying $3,500/month rent in Hayward needs to earn accordingly.")),

      h3('Permits and Fees'),
      p(t('Permit and impact fees vary wildly by city:')),
      ul([
        [t('Oakland: ', 1), t('$8,000-$15,000 total (reduced fees for ADUs under recent ordinance)')],
        [t('San Jose: ', 1), t('$5,000-$12,000')],
        [t('Walnut Creek: ', 1), t('$10,000-$18,000')],
        [t('Berkeley: ', 1), t('$6,000-$14,000')],
        [t('Fremont: ', 1), t('$7,000-$13,000')],
      ]),
      p(t("California law (SB 13 and subsequent bills) has reduced or eliminated many impact fees for ADUs, but plan check fees, utility connection fees, and school fees can still add up. We handle the full permit process for our clients — you shouldn't have to figure out which fees apply.")),

      h3('Site Conditions'),
      p(t("Flat lot with easy access? Costs stay reasonable. Hillside lot in the Oakland Hills or Orinda with limited truck access, retaining walls needed, and a septic system instead of sewer? That adds $30,000-$80,000 to the project.")),

      h3('Utility Connections'),
      p(t("Your ADU needs its own electrical panel (or subpanel), water connection, and sewer/septic tie-in. If your main house's electrical panel is already maxed out, you'll need a panel upgrade ($3,000-$6,000). If the sewer lateral is old, the city may require replacement ($8,000-$15,000).")),

      h2('Permit Timeline by County'),
      p(t("California law requires cities to approve ADU permits within 60 days of a complete application. In practice:")),
      ul([
        [t('Alameda County cities: ', 1), t('6-12 weeks (Oakland can be faster due to their streamlined ADU program)')],
        [t('Contra Costa County: ', 1), t('8-14 weeks')],
        [t('Santa Clara County: ', 1), t('6-10 weeks (San Jose has a dedicated ADU team)')],
        [t('Marin County: ', 1), t('8-16 weeks')],
        [t('Napa County: ', 1), t('6-12 weeks')],
      ]),
      p(t('The design and engineering phase before permit submittal typically takes 6-10 weeks. So from "I want to build an ADU" to "my permit is approved" is usually 3-6 months.')),

      h2('Total Project Timeline'),
      p(t('From initial call to move-in ready:')),
      ul([
        [t('Garage conversion: 4-6 months', 1)],
        [t('Attached ADU: 6-10 months', 1)],
        [t('Detached ADU: 8-14 months', 1)],
      ]),
      p(t("These timelines are realistic for the Bay Area in 2026. Anyone promising a detached ADU in 4 months isn't accounting for permits, inspections, and the reality of construction scheduling.")),

      h2('Financing Your ADU'),
      p(t("Most Bay Area homeowners finance their ADU through one of these options:")),
      ul([
        [t('Home equity loan or HELOC: ', 1), t('Most common. You borrow against existing equity at relatively low rates.')],
        [t('Cash-out refinance: ', 1), t('Good if your rate is already high and you want to consolidate.')],
        [t('Construction loan: ', 1), t('Converts to a mortgage after completion. More complex but useful if equity is limited.')],
        [t('ADU-specific lending: ', 1), t('Companies like RenoFi and Figure offer ADU-focused products.')],
      ]),

      h2('Rental Income Potential'),
      p(t('Bay Area ADU rental income (2026 market rates):')),
      ul([
        [t('Studio (350-450 sq ft): $1,800-$2,500/month', 1)],
        [t('1BR (500-650 sq ft): $2,200-$3,200/month', 1)],
        [t('2BR (750-1,000 sq ft): $2,800-$4,000/month', 1)],
      ]),
      p(t("At these rents, a $250,000 ADU can pay for itself in 8-12 years — while also increasing your property value by $150,000-$300,000. That's a return you won't find in many investments.")),

      h2('From Alexander: Why I Believe in ADUs'),
      p(t("I've built ADUs for clients who wanted rental income, who needed space for aging parents, and who just wanted a home office that wasn't a converted closet. Every project is different, but the common thread is that ADUs solve real problems for Bay Area families.", 2)),
      p(t("As both an architect and general contractor (CSLB #1082377), I handle the full process — design through construction. Having one point of contact through the entire project eliminates the finger-pointing that happens when your architect and contractor don't communicate well.", 2)),

      h2('Next Steps'),
      p(t('If you are considering an ADU, start with these:')),
      ol([
        [t('Check your lot: '), t('most Bay Area lots can accommodate an ADU under current zoning')],
        [t('Set your budget: '), t('use the ranges above as a starting point')],
        [t('Talk to us: '), link('request a consultation', '/#quote'), t(" and we'll visit your property to discuss what's possible")],
      ]),
      p(t('Learn more about our '), link('ADU design and construction services', '/adu'), t('. We build ADUs across '), link('Alameda County', '/service-areas/alameda-county-ca'), t(', '), link('Contra Costa County', '/service-areas/contra-costa-county-ca'), t(', '), link('Santa Clara County', '/service-areas/santa-clara-county-ca'), t(', and the greater Bay Area.')),
    ]),
  };
}

function post5_chooseRoofingContractor() {
  return {
    title: 'How to Choose a Roofing Contractor in the Bay Area',
    slug: 'how-to-choose-roofing-contractor-bay-area',
    meta_title: 'How to Choose a Roofing Contractor in the Bay Area',
    meta_description: 'What to look for when hiring a Bay Area roofing contractor. License verification, insurance, red flags, and the right questions to ask before signing.',
    lexical: lexical([
      p(t("Your roof is a $15,000-$50,000 decision. Picking the wrong contractor can turn that into a $30,000-$70,000 problem. Here's how to find a good roofer in the Bay Area — and how to spot the bad ones before they touch your house.")),

      h2('Step 1: Verify Their Contractor License'),
      p(t("California requires all contractors performing work over $500 to hold a valid CSLB (Contractors State License Board) license. For roofing, you want a C-39 Roofing Contractor license or a B General Building Contractor license.")),
      p(t("Check any contractor's license at "), extLink('the CSLB website', 'https://www.cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx'), t('. Look for:')),
      ul([
        [t('License status: Active', 1)],
        [t('Workers\' compensation insurance: Current', 1)],
        [t('Bond status: Current', 1)],
        [t('Any complaints or disciplinary actions', 1)],
      ]),
      p(t("For reference, Hamilton Exteriors operates under CSLB license #1082377 — you can look us up. We carry a B General Building license, which covers roofing, siding, windows, and full construction.")),

      h2('Step 2: Confirm Insurance'),
      p(t('Every roofing contractor should carry:')),
      ul([
        [t('General liability insurance: ', 1), t('$1 million minimum. Covers damage to your property during the job.')],
        [t('Workers\' compensation insurance: ', 1), t('Required by California law if they have employees. Covers worker injuries on your property.')],
      ]),
      p(t("Ask for a certificate of insurance (COI) and verify it's current. If a contractor doesn't have workers' comp and one of their guys falls off your roof, you could be liable. This is not theoretical — it happens in the Bay Area every year.")),

      h2('Step 3: Get Multiple Quotes (But Don\'t Just Pick the Cheapest)'),
      p(t("Get at least three quotes. Compare them line by line. A good roofing quote should specify:")),
      ul([
        'Material brand and product line (e.g., "GAF Timberline HDZ" not just "architectural shingles")',
        'Underlayment type and brand',
        'Flashing materials and approach',
        'Number of layers to be removed',
        'Whether they\'re replacing decking (and what\'s included vs. extra)',
        'Permit costs',
        'Cleanup and debris disposal',
        'Warranty terms — both manufacturer and workmanship',
        'Payment schedule',
      ]),
      p(t("If a quote is significantly cheaper than the others, ask yourself what they're leaving out. Common corners to cut: single-layer underlayment instead of two, reusing old flashings, skipping drip edge, or using subcontracted labor with no workers' comp.")),

      h2('Step 4: Check Reviews and References'),
      p(t('Look at Google reviews, Yelp, and the BBB. But go beyond the star rating:')),
      ul([
        'Read the 3-star reviews — they\'re usually the most honest',
        'Look for reviews that mention specific details about the work',
        'Check how the contractor responds to negative reviews',
        'Ask the contractor for 3-5 references from jobs completed in the last 12 months — and actually call them',
      ]),
      p(t("When you call references, ask: Did the crew show up on time? Did the final cost match the estimate? How did they handle unexpected issues? Would you hire them again?")),

      h2('Step 5: Ask the Right Questions'),
      p(t('Before signing, ask these:')),
      ol([
        [t('"Who will be on my roof — your employees or subcontractors?"', 1), t(' Direct employees generally mean better quality control.')],
        [t('"What happens if you find rot or damage under the shingles?"', 1), t(' Get their per-sheet decking price in writing before work starts.')],
        [t('"Do you pull the permit, or do I?"', 1), t(' The contractor should pull the permit. Period.')],
        [t('"What\'s your payment schedule?"', 1), t(' Never pay more than 10% upfront or $1,000 (whichever is less). This is California law (B&P Code 7159).')],
        [t('"What warranty do you offer on workmanship?"', 1), t(' Manufacturer warranties cover defective shingles. Workmanship warranties cover installation errors. You need both.')],
      ]),

      h2('Red Flags to Watch For'),
      ul([
        [t('Door knockers after a storm: ', 1), t('"We noticed your roof has damage..." Storm chasers follow weather events, do shoddy work, and disappear.')],
        [t('No physical address: ', 1), t('If they operate out of a P.O. box or you can\'t find their office, be cautious.')],
        [t('Cash-only requests: ', 1), t('Legitimate contractors accept checks, credit cards, and financing.')],
        [t('Pressure to sign today: ', 1), t('"This price is only good until Friday" is a sales tactic, not a real deadline.')],
        [t('No written contract: ', 1), t('Everything should be in writing. California law requires written contracts for jobs over $750.')],
        [t('Way too cheap: ', 1), t('If they\'re 30-40% below other quotes, something is wrong — no insurance, no permit, or they\'ll hit you with change orders later.')],
      ]),

      h2('What a Good Contract Should Include'),
      p(t('California law (B&P Code 7159) requires specific elements in home improvement contracts:')),
      ul([
        'Full scope of work with materials specified',
        'Total price with payment schedule',
        'Estimated start and completion dates',
        'Contractor\'s license number',
        'Three-day right to cancel (Notice of Cancellation form)',
        'Warranty terms',
        'How change orders will be handled',
      ]),

      h2('From Alexander: What I\'d Tell My Own Family'),
      p(t("If my mother needed a new roof and I couldn't do it myself, here's what I'd tell her: get three quotes, verify every license and insurance certificate, and don't sign anything the day of the estimate. A good contractor won't pressure you.", 2)),
      p(t("I started Hamilton Exteriors because I saw too many Bay Area homeowners get burned by contractors who cut corners or disappeared after the first payment. We're not perfect — construction never is. But we show up, we communicate, and we stand behind our work with a real warranty.", 2)),

      h2('Ready to Get Started?'),
      p(t('If you need a '), link('roof replacement', '/roofing'), t(' in the Bay Area, '), link('request a quote from Hamilton Exteriors', '/#quote'), t('. We\'ll give you a detailed proposal with everything spelled out — no surprises, no hidden costs. We serve '), link('Alameda County', '/service-areas/alameda-county-ca'), t(', '), link('Contra Costa County', '/service-areas/contra-costa-county-ca'), t(', '), link('Marin County', '/service-areas/marin-county-ca'), t(', '), link('Napa County', '/service-areas/napa-county-ca'), t(', and '), link('Santa Clara County', '/service-areas/santa-clara-county-ca'), t('.')),
    ]),
  };
}

function post6_fireZoneRoofing() {
  return {
    title: 'Bay Area Fire Zone Roofing: What Homeowners Need to Know',
    slug: 'bay-area-fire-zone-roofing-requirements',
    meta_title: 'Bay Area Fire Zone Roofing Requirements (WUI Zones)',
    meta_description: 'Fire zone roofing requirements for Bay Area homes. WUI zones, Class A materials, insurance impacts, and which neighborhoods are affected.',
    lexical: lexical([
      p(t("If you live in the hills, near open space, or anywhere the urban edge meets wildland, your roof isn't just keeping out rain — it's your first line of defense against wildfire. Here's what Bay Area homeowners in fire zones need to know about roofing materials, building codes, and insurance.")),

      h2('What Are WUI Zones?'),
      p(t("WUI stands for Wildland-Urban Interface. These are areas where homes sit close to undeveloped wildland vegetation. California maps WUI zones through CAL FIRE's Fire Hazard Severity Zone (FHSZ) system, which classifies areas as Moderate, High, or Very High fire hazard.")),
      p(t("In the Bay Area, large sections of the following areas are in High or Very High fire zones:")),
      ul([
        [t('Oakland Hills and Montclair', 1)],
        [t('Berkeley Hills', 1)],
        [t('Orinda, Lafayette, Moraga', 1)],
        [t('Walnut Creek (eastern portions)', 1)],
        [t('Much of Marin County', 1), t(' — Mill Valley, San Anselmo, Fairfax, Lucas Valley')],
        [t('Parts of Napa Valley', 1)],
        [t('Los Gatos, Saratoga, Los Altos Hills', 1)],
        [t('Fremont (Mission Peak area)', 1)],
      ]),
      p(t("You can check your property's fire zone at "), extLink("CAL FIRE's FHSZ map", 'https://osfm.fire.ca.gov/fire-hazard-severity-zones'), t('.')),

      h2('The Oakland Hills Fire: A Lesson That Still Matters'),
      p(t("On October 20, 1991, a firestorm tore through the Oakland Hills. 25 people died, 150 were injured, and 3,354 homes were destroyed in a matter of hours. The fire jumped an 8-lane freeway.")),
      p(t("The investigation found that wood shake roofs were a primary factor in how quickly the fire spread. Burning embers landed on wood shake roofs blocks ahead of the fire front, igniting new fires. The homes that survived were disproportionately those with tile, slate, or composition roofs.")),
      p(t("This fire changed California building codes permanently. Chapter 7A of the California Building Code now requires specific fire-resistant construction in WUI zones — and the roof is the most important element.")),

      h2('Chapter 7A Roofing Requirements'),
      p(t("If your home is in a designated WUI zone and you're doing a reroof (replacing more than 50% of the roof covering), you must comply with Chapter 7A. Here's what that means for your roof:")),
      ul([
        [t('Class A fire-rated roofing assembly', 1), t(' — this includes the roofing material, underlayment, and deck, tested together')],
        [t('No wood shakes or shingles', 1), t(' — even "fire-treated" wood shakes are no longer allowed in Very High FHSZ')],
        [t('Ember-resistant vents', 1), t(' — attic and ridge vents must be ember-resistant (1/16" or 1/8" mesh)')],
        [t('Gutters', 1), t(' — noncombustible gutters required (no vinyl)')],
      ]),

      h2('Which Roofing Materials Meet Fire Zone Requirements?'),
      p(t('All of these achieve Class A fire rating when properly installed:')),

      h3('Asphalt Shingles (Class A)'),
      p(t("Most modern fiberglass-mat asphalt shingles are Class A rated. Products like "), extLink("GAF Timberline HDZ", 'https://www.gaf.com/en-us/roofing/residential/shingles/timberline-hdz-shingles'), t(" and CertainTeed Landmark carry Class A ratings and are the most affordable fire-code-compliant option. They won't ignite from ember exposure.")),

      h3('Metal Roofing (Class A)'),
      p(t("Metal is inherently noncombustible. Standing seam steel and aluminum roofs are the gold standard for fire resistance. They're increasingly popular in Bay Area fire zones — we've seen a significant uptick in "), link('metal roof installations', '/blog/metal-roof-vs-asphalt-shingles-bay-area'), t(' in Oakland Hills and Marin since 2020.')),

      h3('Concrete and Clay Tile (Class A)'),
      p(t("Tile roofs are noncombustible and common on Mediterranean and Spanish-style Bay Area homes. They meet Chapter 7A requirements and add a hefty layer of protection. The downside is weight — your roof structure needs to handle it.")),

      h3('Composite/Synthetic Shingles (Class A)'),
      p(t('Products like DaVinci and Brava synthetic shake give you the wood look without the fire risk. They are Class A rated and look convincing from the ground.')),

      h2('Insurance and Fire Zones'),
      p(t("This is where things get real for Bay Area homeowners. Insurance companies are pulling out of fire-prone areas at an alarming rate. State Farm, Allstate, and others have stopped writing new policies in parts of the Oakland Hills, Marin, and the East Bay hills.")),
      p(t("If you can get insurance, your roofing material matters. Many carriers offer discounts (10-20%) for Class A fire-rated roofs, and some specifically discount metal roofs. Conversely, a wood shake roof in a fire zone can make your home uninsurable on the standard market.")),
      p(t('When we reroof homes in fire zones, we provide documentation of the fire rating for every component — roofing, underlayment, vents, gutters — so homeowners can submit it to their insurance company.')),

      h2('Cost Impact of Fire Zone Requirements'),
      p(t("The honest truth: roofing in a fire zone doesn't have to cost dramatically more than standard roofing. Class A asphalt shingles cost the same as any other asphalt shingle. The extra costs come from:")),
      ul([
        [t('Ember-resistant vents: ', 1), t('$300-$800 more than standard vents')],
        [t('Noncombustible gutters: ', 1), t('Aluminum instead of vinyl — marginal cost difference')],
        [t('Enhanced underlayment: ', 1), t('Some fire zones require specific fire-resistant underlayment — adds $500-$1,500')],
        [t('Inspection requirements: ', 1), t('Additional inspections may be required — typically $200-$500 in fees')],
      ]),
      p(t('Total additional cost for Chapter 7A compliance on a typical reroof: $1,000-$3,000. Not nothing, but not the budget-buster some people fear.')),

      h2('Defensible Space: The Other Half of the Equation'),
      p(t("Your roof is only part of the picture. California law (PRC 4291) requires homeowners in fire zones to maintain defensible space:")),
      ul([
        [t('Zone 0 (0-5 feet from home): ', 1), t('Noncombustible materials only — no plants, mulch, or fencing touching the house')],
        [t('Zone 1 (5-30 feet): ', 1), t('Lean, clean, and green — trimmed, well-watered vegetation, no dead plants')],
        [t('Zone 2 (30-100 feet): ', 1), t('Reduced fuel — spaced trees, cleared undergrowth')],
      ]),
      p(t("The best roof in the world won't save your home if dead brush is stacked against the foundation.")),

      h2('From Alexander: Building in Fire Country'),
      p(t("I've reroofed dozens of homes in the Oakland Hills and Marin fire zones. The homeowners who sleep best at night are the ones who took a whole-house approach — fire-rated roof, ember-resistant vents, hardened eaves, fiber cement siding, and maintained defensible space. It's not just about checking a code box. It's about actually protecting your family and your biggest investment.", 2)),
      p(t("If you're in a fire zone and your roof is aging, don't wait. The combination of fire risk and insurance pressure means this is a project that gets more expensive and more urgent every year.", 2)),

      h2('Get a Fire Zone Roof Assessment'),
      p(t('We offer free roof assessments for Bay Area homes in fire zones. We\'ll evaluate your current roof, identify compliance gaps, and provide a detailed quote for bringing your home up to Chapter 7A standards. '), link('Request your assessment', '/#quote'), t('.')),
      p(t('Learn more about our '), link('roofing services', '/roofing'), t(' or explore our '), link('service areas', '/service-areas/alameda-county-ca'), t(' across the Bay Area.')),
    ]),
  };
}

function post7_windowReplacementCost() {
  return {
    title: 'Window Replacement Cost in the Bay Area (2026 Guide)',
    slug: 'window-replacement-cost-bay-area-2026',
    meta_title: 'Window Replacement Cost Bay Area 2026 | Price Guide',
    meta_description: 'Bay Area window replacement costs by type and material. Vinyl, fiberglass, and wood window prices, energy savings, and Title 24 requirements for 2026.',
    lexical: lexical([
      p(t("Replacing windows in the Bay Area is a project where costs can range wildly depending on window type, material, and your home's construction. Here's an honest breakdown of what Bay Area homeowners are paying in 2026, based on our project data across the East Bay, Marin, and South Bay.")),

      h2('Cost Per Window by Type'),
      p(t('Installed prices including removal of old window, installation, trim, and cleanup:')),
      ul([
        [t('Vinyl double-hung: $600-$1,000 per window', 1)],
        [t('Fiberglass double-hung: $900-$1,400 per window', 1)],
        [t('Wood double-hung (Andersen/Marvin): $1,200-$2,200 per window', 1)],
        [t('Vinyl sliding: $500-$900 per window', 1)],
        [t('Fiberglass casement: $1,000-$1,600 per window', 1)],
        [t('Wood casement: $1,400-$2,500 per window', 1)],
        [t('Picture window (fixed): $400-$1,200 depending on size', 1)],
        [t('Bay window: $2,500-$5,000', 1)],
        [t('Specialty/custom shapes: $1,500-$4,000+', 1)],
      ]),
      p(t('For a whole-house replacement (15-20 windows on a typical Bay Area home), budget $12,000-$35,000 for vinyl, $18,000-$45,000 for fiberglass, or $25,000-$60,000 for wood.')),

      h2('Vinyl vs Fiberglass vs Wood: Which Material?'),

      h3('Vinyl Windows'),
      p(t("The most affordable option and the workhorse of the replacement window market. Modern vinyl windows from Milgard, Simonton, and Anlin are solid performers — good energy ratings, low maintenance, and decent aesthetics. They've improved dramatically from the cheap vinyl of the '90s.")),
      p(t("The downside: vinyl has limited color options (usually white, almond, tan, and a few others), can't be painted, and doesn't have the visual depth of wood or fiberglass. In upscale Bay Area neighborhoods (Piedmont, Los Gatos, Ross), vinyl can look out of place on a $2M home.")),

      h3('Fiberglass Windows'),
      p(t("Fiberglass is the sweet spot for many Bay Area homeowners. Brands like Marvin Elevate, Pella Impervia, and Milgard Ultra offer the strength of fiberglass with paintable exteriors and clean sight lines. They handle the Bay Area's temperature swings without expanding or contracting.")),
      p(t('Fiberglass frames are narrow, which means more glass area and more natural light. They accept paint, so you can match any color. And they last 30-40+ years with minimal maintenance.')),

      h3('Wood Windows'),
      p(t("If you have a Craftsman in Berkeley, a Victorian in Alameda, or a period home anywhere in the Bay Area, wood windows might be the right call — especially if you're in a historic district. Andersen, Marvin, and Pella all make premium wood windows with aluminum or fiberglass cladding on the exterior.")),
      p(t("The premium is significant — wood windows cost 2-3x vinyl. But on certain homes, they're the only appropriate choice. Historic preservation guidelines in cities like Berkeley, Oakland, and San Francisco sometimes require wood windows in visible locations.")),

      h2('Energy Savings and Title 24'),
      p(t("California's "), extLink('Title 24 energy code', 'https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards'), t(' sets minimum energy performance requirements for replacement windows. As of the 2025 code cycle (in effect through 2028), replacement windows in the Bay Area (Climate Zone 3-4) must meet:')),
      ul([
        [t('U-factor: 0.30 or lower', 1), t(' (measures heat transfer — lower is better)')],
        [t('SHGC: 0.23 or lower', 1), t(' (Solar Heat Gain Coefficient — how much solar heat the window lets in)')],
      ]),
      p(t("Almost all dual-pane Low-E windows from major manufacturers meet these requirements. If you're replacing single-pane windows (still common in pre-1980 Bay Area homes), the energy improvement is substantial.")),

      h3('Real Energy Savings'),
      p(t('Replacing single-pane windows with dual-pane Low-E windows typically saves:')),
      ul([
        [t('Heating: 15-25% reduction', 1), t(' — significant for homes in cooler Bay Area microclimates (fog belt, coastal Marin)')],
        [t('Cooling: 20-30% reduction', 1), t(' — matters most in the East Bay (Walnut Creek, Concord, Pleasanton)')],
        [t('Annual savings: $300-$800/year', 1), t(' depending on home size, window count, and HVAC system')],
      ]),
      p(t("There's also a comfort factor that doesn't show up in dollar figures: no more cold drafts, no more condensation on window panes, and significantly better noise reduction. Homes near BART tracks, highways, or Oakland Airport notice a dramatic difference.")),

      h2('Bay Area-Specific Factors'),

      h3('Salt Air Corrosion'),
      p(t('Homes within a few miles of the ocean (Pacifica, Half Moon Bay, coastal Marin, parts of Alameda) deal with salt air that corrodes metal hardware and degrades certain frame materials. Fiberglass and vinyl handle salt air best. If you go with wood, make sure the exterior cladding is aluminum or fiberglass — not bare wood.')),

      h3('Fog and Condensation'),
      p(t("The fog belt running from SF through Daly City and down the coast creates persistent moisture. Single-pane windows in these areas are constantly fogged with condensation, which damages sills and surrounding wall material. Upgrading to dual-pane virtually eliminates this because the interior pane stays closer to room temperature.")),

      h3('Seismic Considerations'),
      p(t("This doesn't affect window selection directly, but if your home needs structural retrofit work (common in pre-1950 Bay Area homes), coordinating window replacement with a seismic retrofit can save money — the walls are already opened up.")),

      h2('ENERGY STAR and Tax Credits'),
      p(t("Windows meeting "), extLink('ENERGY STAR', 'https://www.energystar.gov/about/federal-tax-credits'), t(" Most Efficient criteria qualify for a federal tax credit of 30% of product cost, up to $600. For a $20,000 window project, that's potentially $600 back. Not life-changing, but worth claiming.")),

      h2('From Alexander: Straight Talk on Windows'),
      p(t("Windows are where I see the biggest gap between contractor quotes. One company quotes $400/window installed (using bottom-tier product and day-labor installers), another quotes $2,500/window (premium product with proper flashing and finish work). Both call themselves window replacement companies.", 2)),
      p(t("The difference is in the installation. A window that's not properly flashed and sealed will leak — maybe not this year, but within 5 years. Water gets into the wall cavity, rots the framing, and you're looking at a $5,000+ repair per window. I've seen it dozens of times on Bay Area homes. The cheap window job ends up being the most expensive.", 2)),

      h2('Get a Window Quote'),
      p(t("We offer free in-home consultations for "), link('window replacement', '/windows'), t(' projects throughout the Bay Area. We\'ll measure every window, discuss material options, and provide a fixed-price quote — no games, no bait-and-switch. '), link('Schedule your consultation', '/#quote'), t('.')),
      p(t('We install windows in '), link('Alameda County', '/service-areas/alameda-county-ca'), t(', '), link('Contra Costa County', '/service-areas/contra-costa-county-ca'), t(', '), link('Marin County', '/service-areas/marin-county-ca'), t(', and '), link('Santa Clara County', '/service-areas/santa-clara-county-ca'), t('.')),
    ]),
  };
}

function post8_roofMaintenanceChecklist() {
  return {
    title: 'Roof Maintenance Checklist for Bay Area Homeowners',
    slug: 'roof-maintenance-checklist-bay-area',
    meta_title: 'Roof Maintenance Checklist for Bay Area Homeowners',
    meta_description: 'Seasonal roof maintenance guide for Bay Area homes. What to inspect, when to clean gutters, moss prevention, and when to call a professional roofer.',
    lexical: lexical([
      p(t("A little maintenance goes a long way with your roof. Most of the premature roof failures I see in the Bay Area aren't from bad shingles — they're from neglected gutters, unchecked moss, and small problems that grew into big ones. Here's a practical checklist that covers the Bay Area's specific climate challenges.")),

      h2('Spring Checklist (March-May)'),
      p(t("After the rainy season, your roof needs a checkup. This is the best time to catch problems before summer.")),
      ul([
        [t('Inspect from the ground with binoculars', 1), t(' — look for missing, cracked, or curled shingles')],
        [t('Check flashings around chimneys, vents, and skylights', 1), t(' — look for rust, gaps, or lifted caulking')],
        [t('Clean gutters and downspouts', 1), t(' — Bay Area oak and eucalyptus trees drop massive amounts of debris from January through April')],
        [t('Check attic for water stains', 1), t(' — go up there on a dry day and look at the underside of the decking for discoloration')],
        [t('Look for moss and algae', 1), t(" — if you're in a shaded or fog-belt area (Marin, Oakland Hills, coastal), moss may have taken hold over winter")],
        [t('Check that roof vents are clear and unobstructed', 1)],
      ]),

      h2('Summer Checklist (June-August)'),
      p(t("Bay Area summers are dry and mild — the perfect time for roof work if anything needs attention.")),
      ul([
        [t('Trim back overhanging branches', 1), t(' — keep branches at least 6 feet from the roof surface. Trees touching your roof accelerate shingle wear and provide rodent highways into your attic')],
        [t('Check for lifted or popped nails', 1), t(' — heat cycling can work nails up over time, especially on south-facing slopes')],
        [t('Inspect caulking and sealants', 1), t(' — UV exposure dries out roofing sealant faster than you\'d expect, especially in East Bay heat')],
        [t('Make sure attic ventilation is working', 1), t(' — proper soffit-to-ridge ventilation keeps your attic temperature reasonable and extends shingle life')],
      ]),

      h2('Fall Checklist (September-November)'),
      p(t("This is the critical prep window before the rainy season hits.")),
      ul([
        [t('Clean gutters again', 1), t(' — fall leaf drop fills gutters fast. Clean them in November before the first real rain')],
        [t('Inspect and repair any damaged shingles or flashings', 1), t(' — don\'t let a small issue turn into a leak over winter')],
        [t('Check valley flashings', 1), t(' — valleys collect debris and are the most common leak point')],
        [t('Test downspout drainage', 1), t(' — run a hose into each gutter and make sure water flows away from the foundation')],
        [t('Install or check gutter guards', 1), t(' — if your home is under oak, eucalyptus, or redwood trees, gutter guards can save you hours of cleaning')],
      ]),

      h2('Winter Checklist (December-February)'),
      p(t("During the rainy season, your job is mostly observation.")),
      ul([
        [t('After heavy rain, check the attic for leaks', 1), t(' — catch them early before they cause ceiling damage')],
        [t('After storms with wind over 40 mph, do a visual inspection', 1), t(' — look for missing shingles, damaged ridge cap, or debris on the roof')],
        [t('Keep gutters clear of debris', 1), t(' — backed-up gutters cause fascia rot and can push water under the roof edge')],
        [t('Watch for ice dams', 1), t(' — rare in the Bay Area but possible at higher elevations (Mt. Diablo area, Los Gatos mountains) during cold snaps')],
      ]),

      h2('Moss and Algae: A Bay Area Special'),
      p(t("Moss is the silent roof destroyer in the Bay Area. It thrives on north-facing slopes, under tree canopy, and in fog-belt neighborhoods. Moss holds moisture against your shingles, accelerating granule loss and shortening roof life.")),

      h3('Prevention'),
      ul([
        [t('Zinc or copper strips at the ridge line', 1), t(' — when it rains, metal ions wash down the roof surface and inhibit moss growth')],
        [t('Keep trees trimmed', 1), t(' to reduce shade and allow the roof to dry')],
        [t('Ensure good attic ventilation', 1), t(' — a warmer roof surface discourages moss')],
      ]),

      h3('Removal'),
      ul([
        [t('Never pressure wash asphalt shingles', 1), t(' — it strips the protective granules and voids most warranties')],
        [t('Use a soft brush and moss killer (zinc sulfate solution)', 1)],
        [t('For heavy moss, hire a professional', 1), t(' — we do moss treatment as part of our roof maintenance service')],
      ]),

      h2('Gutter Cleaning Schedule for Bay Area Trees'),
      p(t("Bay Area trees dictate your gutter cleaning schedule:")),
      ul([
        [t('Coast live oaks: ', 1), t('Clean gutters in April (leaf drop) and November (acorn debris)')],
        [t('Eucalyptus: ', 1), t('Clean every 3-4 months — these trees shed bark, leaves, and seedpods year-round')],
        [t('Redwood and cedar: ', 1), t('Clean in fall and spring — needle accumulation clogs gutters and downspouts')],
        [t('Deciduous trees (maple, elm, birch): ', 1), t('Main cleanup in November-December after leaf drop')],
      ]),

      h2('When to Call a Professional'),
      p(t("Some roof issues are DIY-friendly; others need a pro. Call a "), link('roofing contractor', '/blog/how-to-choose-roofing-contractor-bay-area'), t(' when you see:')),
      ul([
        [t('Active leaks', 1), t(' — water coming into your home needs professional attention, not a YouTube fix')],
        [t('Multiple missing or damaged shingles', 1), t(' — one or two is a repair; a pattern suggests bigger issues')],
        [t('Sagging in the roof deck', 1), t(' — this indicates structural damage and should be evaluated immediately')],
        [t('Damaged flashing around chimneys or skylights', 1), t(' — improper flashing repair is the #1 cause of persistent leaks')],
        [t('Your roof is 20+ years old', 1), t(' — time for a professional inspection to assess remaining life')],
      ]),

      h2('From Alexander: A 30-Minute Investment'),
      p(t("Twice a year — once after the rain stops and once before it starts — spend 30 minutes looking at your roof from the ground. Use binoculars. Check the gutters. Walk around the house and look at the condition of your fascia and soffits. This simple routine catches 90% of problems while they're still small and affordable to fix.", 2)),
      p(t("And if you see anything that looks off, don't ignore it. A $300 repair today prevents a $5,000 problem next winter.", 2)),

      h2('Need a Roof Inspection?'),
      p(t('Hamilton Exteriors offers professional roof inspections throughout the Bay Area. We\'ll give you an honest assessment of your roof\'s condition and remaining lifespan — no pressure, no obligation. '), link('Schedule your inspection', '/#quote'), t('.')),
      p(t('Learn more about our '), link('roofing services', '/roofing'), t(' or check how long your '), link('roof replacement might take', '/blog/how-long-does-a-roof-replacement-take-bay-area-timeline'), t('.')),
    ]),
  };
}

function post9_roofingWarranty() {
  return {
    title: 'What Does a Roofing Warranty Actually Cover?',
    slug: 'what-does-roofing-warranty-cover',
    meta_title: 'What Does a Roofing Warranty Actually Cover?',
    meta_description: 'Understanding roofing warranties: manufacturer vs workmanship, what voids coverage, and what GAF, CertainTeed, and Owens Corning actually guarantee.',
    lexical: lexical([
      p(t("Roofing warranties sound great in the sales pitch — \"50-year warranty!\" \"Lifetime protection!\" But what do they actually cover? And what are the catches? Here's a clear breakdown of how roofing warranties really work, from someone who's dealt with both sides of warranty claims.")),

      h2('Two Types of Roofing Warranties'),
      p(t("Every roof should come with two separate warranties. They cover different things, and understanding the difference matters.")),

      h3('Manufacturer Warranty (Material Warranty)'),
      p(t("This is the warranty from the shingle manufacturer — "), extLink('GAF', 'https://www.gaf.com/en-us/roofing/residential/warranties'), t(', '), extLink('CertainTeed', 'https://www.certainteed.com/residential-roofing/warranties/'), t(', or '), extLink('Owens Corning', 'https://www.owenscorning.com/en-us/roofing/warranties'), t(". It covers defects in the roofing material itself — shingles that crack, delaminate, lose granules prematurely, or fail to perform as specified.")),
      p(t("What it covers:")),
      ul([
        'Manufacturing defects in shingle materials',
        'Premature failure of roofing product',
        'Algae growth (on algae-resistant product lines)',
      ]),
      p(t("What it does NOT cover:")),
      ul([
        'Damage from storms, hail, falling trees, or other external events',
        'Damage from foot traffic on the roof',
        'Problems caused by improper installation',
        'Normal wear and tear',
        'Issues caused by poor ventilation or moisture from inside the home',
      ]),

      h3('Workmanship Warranty (Contractor Warranty)'),
      p(t("This is the warranty from your contractor — it covers the installation work. This is actually the more important warranty because the majority of roof problems come from installation errors, not material defects.")),
      p(t("Hamilton Exteriors offers workmanship warranties of up to "), t('50 years on premium installations and 35 years on standard installations', 1), t(". That means if a leak develops because of how we installed the roof — improper flashing, missed nailing patterns, bad underlayment overlap — we fix it at no cost to you.")),

      h2('The Fine Print on \"50-Year\" and \"Lifetime\" Warranties'),
      p(t("Here's where the marketing gets ahead of reality.")),

      h3('Prorated vs Non-Prorated'),
      p(t("Most manufacturer warranties are fully non-prorated for a limited period, then prorated after that.")),
      p(t('Example with GAF Timberline HDZ:')),
      ul([
        [t('Years 1-10: Full coverage', 1), t(' — GAF pays 100% of material and labor for a legitimate claim')],
        [t('Years 11-40: Prorated', 1), t(' — GAF pays a declining percentage based on how old the roof is')],
        [t('After year 40: Minimal coverage', 1), t(' — you\'re paying most of the replacement cost yourself')],
      ]),
      p(t("A \"50-year warranty\" doesn't mean GAF will hand you a new roof in year 49 for free. It means the shingles are warranted against defects for up to 50 years, with declining coverage.")),

      h3('Enhanced Warranties Through Certified Contractors'),
      p(t("Major manufacturers offer enhanced warranties when the roof is installed by a certified contractor. GAF's system works like this:")),
      ul([
        [t('Standard warranty (any contractor): ', 1), t('10 years on materials, limited coverage')],
        [t('GAF System Plus (certified contractor): ', 1), t('50-year non-prorated materials warranty')],
        [t('GAF Golden Pledge (Master Elite contractor): ', 1), t('50-year non-prorated materials + 25-year workmanship')],
      ]),
      p(t("CertainTeed and Owens Corning have similar tiered systems. The takeaway: who installs your roof directly affects your warranty coverage.")),

      h2('What Voids a Roofing Warranty'),
      p(t("This is critical. Here are the most common ways homeowners accidentally void their warranty:")),
      ul([
        [t('Improper ventilation: ', 1), t('If your attic ventilation doesn\'t meet manufacturer specs (usually 1 sq ft of net free ventilation per 150 sq ft of attic space), the warranty can be voided. Poor ventilation causes premature shingle aging from heat buildup.')],
        [t('Pressure washing: ', 1), t('Pressure washing your roof strips granules and voids most manufacturer warranties instantly. See our '), link('maintenance guide', '/blog/roof-maintenance-checklist-bay-area'), t(' for proper cleaning methods.')],
        [t('Walking on the roof: ', 1), t('Excessive foot traffic damages shingles. Satellite dish installers, holiday light hangers, and painters walking on your roof can cause warranty issues.')],
        [t('Adding penetrations without proper flashing: ', 1), t('Mounting a satellite dish, solar panels, or anything else that penetrates the roof surface must be done correctly or the warranty is void at that penetration.')],
        [t('Layering over existing shingles: ', 1), t('Some warranties require a complete tear-off to bare decking. Layering new shingles over old (\"reroof over\") may void the warranty.')],
      ]),

      h2('Manufacturer Warranty Comparison'),
      p(t('Here is how the three major shingle manufacturers compare on their premium lines:')),
      ul([
        [t('GAF Timberline HDZ: ', 1), t('50-year limited warranty, 15-year non-prorated period, 130 mph wind warranty. Enhanced to 50-year non-prorated with certified contractor.')],
        [t('CertainTeed Landmark Pro: ', 1), t('Lifetime limited warranty (50 years for second owner), 10-year non-prorated. Enhanced with SureStart Plus to 50-year non-prorated.')],
        [t('Owens Corning Duration: ', 1), t('Limited lifetime warranty, 10-year non-prorated period. Enhanced to lifetime non-prorated with Platinum Preferred contractor.')],
      ]),
      p(t("All three are good products. The differences in warranty terms are marginal — what matters more is who installs them and whether the installation meets manufacturer specifications.")),

      h2('Hamilton\'s Warranty: What We Actually Promise'),
      p(t("Here's what our workmanship warranty covers, in plain language:")),
      ul([
        'Any leaks caused by installation errors — we come back and fix them, no charge',
        'Flashing failures at chimneys, walls, skylights, and vents — if our flashing work fails, we repair it',
        'Underlayment issues — if our underlayment work lets water through, we fix it',
        'Lifted or improperly secured shingles — if our nailing was wrong, we fix it',
      ]),
      p(t("What our warranty does NOT cover (same as any honest contractor):")),
      ul([
        'Storm damage, fallen trees, or acts of nature — that\'s your insurance',
        'Damage from other trades working on your roof after us',
        'Normal wear and aging of materials',
        'Problems caused by homeowner modifications to the roof',
      ]),
      p(t('Our warranty is backed by our '), extLink('CSLB license (#1082377)', 'https://www.cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx'), t(' and our reputation in the Bay Area. We\'ve been doing this for over a decade and we plan to be here for decades more.')),

      h2('From Alexander: Why Warranties Matter Less Than You Think'),
      p(t("Here's what I tell every customer: the best warranty is a roof that never needs one. A properly installed roof with quality materials will last its full rated life without a warranty claim. The warranty is your safety net, not your plan.", 2)),
      p(t("Focus less on which manufacturer offers 50 vs 55 years, and more on who's doing the installation. A great installer with a 20-year workmanship warranty is worth more than a sloppy installer with a 50-year shingle warranty. The shingles are only as good as the hands that nail them down.", 2)),

      h2('Questions About Your Roof Warranty?'),
      p(t("If you have questions about an existing warranty or want to understand what coverage you'll get with a new roof, "), link('contact us', '/#quote'), t(". We're happy to explain warranty options and help you make an informed decision.")),
      p(t('Learn more about our '), link('roofing services', '/roofing'), t(' or read about '), link('how to choose a roofing contractor', '/blog/how-to-choose-roofing-contractor-bay-area'), t(' in the Bay Area.')),
    ]),
  };
}

function post10_secondStoryAddition() {
  return {
    title: 'Second Story Addition Cost in the Bay Area',
    slug: 'second-story-addition-cost-bay-area',
    meta_title: 'Second Story Addition Cost in the Bay Area (2026)',
    meta_description: 'Bay Area second story addition costs from $200-400 per sq ft. Engineering, permits, timeline, and ROI for adding a second floor to your home.',
    lexical: lexical([
      p(t("Adding a second story to your Bay Area home is one of the biggest residential construction projects you can take on — and one of the most rewarding. You double your living space without losing yard. But it's a major undertaking that requires honest budgeting. Here's what it really costs.")),

      h2('Typical Costs: $200-$400 Per Square Foot'),
      p(t('For a second story addition in the Bay Area (2026 pricing):')),
      ul([
        [t('Budget level ($200-$275/sq ft): ', 1), t('Standard finishes, builder-grade fixtures, straightforward floor plan')],
        [t('Mid-range ($275-$350/sq ft): ', 1), t('Upgraded finishes, hardwood floors, custom cabinetry in bathrooms, higher-end windows')],
        [t('High-end ($350-$400+/sq ft): ', 1), t('Custom everything — designer fixtures, specialty materials, complex architecture')],
      ]),
      p(t("For a typical 800 sq ft second story addition (2 bedrooms, 1 bathroom, hallway), you're looking at:")),
      ul([
        [t('Budget: $160,000-$220,000', 1)],
        [t('Mid-range: $220,000-$280,000', 1)],
        [t('High-end: $280,000-$320,000+', 1)],
      ]),
      p(t("A larger 1,200 sq ft addition (3 bedrooms, 2 bathrooms) ranges from $240,000 to $480,000.")),

      h2('What Drives the Cost'),

      h3('Structural Engineering'),
      p(t("This is the biggest variable that separates a second story from other additions. Your existing home was designed to support one story. Adding a second story means the foundation, walls, and connections all need to handle the additional weight.")),
      p(t("Engineering requirements typically include:")),
      ul([
        [t('Foundation reinforcement: ', 1), t('Most pre-1980 Bay Area homes need foundation work — adding piers, widening footings, or sistering the existing foundation. Cost: $20,000-$60,000 depending on soil and existing foundation condition.')],
        [t('Shear wall upgrades: ', 1), t('First floor walls need to transfer lateral loads (earthquake forces) from the new second story to the foundation. This often means adding plywood shear panels, hold-downs, and new connections. Cost: $15,000-$35,000.')],
        [t('First floor framing reinforcement: ', 1), t('Existing ceiling joists (now your second floor joists) may need to be sistered or replaced to handle floor loads. Cost: $8,000-$20,000.')],
      ]),
      p(t("Engineering fees alone run $8,000-$20,000 for a second story project in the Bay Area. This is not a place to cut corners — we're in earthquake country.")),

      h3('Temporary Roof Removal'),
      p(t("Your existing roof comes off entirely. A temporary weather protection system goes up (think industrial-scale tarping) to keep your home dry during construction. This adds $5,000-$15,000 to the project and is logistically one of the most complex parts of the build.")),

      h3('New Roof'),
      p(t("Every second story addition includes a complete new "), link('roof', '/roofing'), t(". The roof cost is typically $15,000-$35,000 depending on material and complexity, built into the per-square-foot price.")),

      h3('Stairs'),
      p(t("You need a staircase to get upstairs. Stairs consume 80-120 sq ft of your first floor — that's space you lose downstairs but gain in access. A standard staircase costs $5,000-$15,000; a custom design with hardwood treads and a distinctive railing can run $15,000-$30,000.")),

      h3('HVAC Extension'),
      p(t("Your existing heating and cooling system probably can't handle the added square footage. Options:")),
      ul([
        [t('Extend existing ductwork + upgrade furnace: ', 1), t('$8,000-$15,000')],
        [t('Add mini-split system for second floor: ', 1), t('$6,000-$12,000 (popular choice — independent climate control)')],
        [t('Complete HVAC replacement: ', 1), t('$15,000-$25,000')],
      ]),

      h2('Permit Timeline'),
      p(t("Second story additions require more extensive permitting than a simple remodel. Expect:")),
      ul([
        [t('Design and engineering: ', 1), t('8-16 weeks')],
        [t('Plan check (city review): ', 1), t('6-12 weeks (varies significantly by city)')],
        [t('Total pre-construction: ', 1), t('4-7 months before the first hammer swings')],
      ]),
      p(t('Cities with historically longer review times for second story additions:')),
      ul([
        [t('Berkeley: ', 1), t('Design review required if visible from the street. Can add 2-3 months.')],
        [t('Piedmont: ', 1), t('Very detailed design review process. 3-4 months for approvals.')],
        [t('Mill Valley and Marin cities: ', 1), t('Neighborhood notification and potential design review. 2-4 months.')],
        [t('Palo Alto: ', 1), t('Stringent privacy protections and setback rules. 2-3 months.')],
      ]),

      h2('Construction Timeline'),
      p(t("Once permits are approved:")),
      ul([
        [t('Foundation work: ', 1), t('2-4 weeks')],
        [t('First floor structural upgrades: ', 1), t('2-3 weeks')],
        [t('Roof removal and second floor framing: ', 1), t('3-5 weeks')],
        [t('Rough mechanical (electrical, plumbing, HVAC): ', 1), t('2-3 weeks')],
        [t('Insulation and drywall: ', 1), t('2-3 weeks')],
        [t('Finish work (flooring, trim, paint, fixtures): ', 1), t('4-6 weeks')],
        [t('Final inspections and punch list: ', 1), t('1-2 weeks')],
      ]),
      p(t('Total construction time: ', 1), t('4-6 months for a typical second story addition.')),
      p(t('From design kickoff to move-in: expect ', 1), t('9-14 months total.')),

      h2('Living Arrangements During Construction'),
      p(t("Can you live in your home during a second story addition? Technically, sometimes. Practically, it's rough.")),
      p(t("During the roof removal and framing phase (4-8 weeks), your home is effectively a construction site with limited weather protection. Most families move out during this phase — either to a rental, a family member's home, or a short-term rental. Budget $3,000-$8,000/month for temporary housing in the Bay Area.")),
      p(t("Once the new roof is on and the home is weathertight again, many families move back in and live through the finish work. It's noisy and dusty but doable if you're patient.")),

      h2('ROI: Is a Second Story Worth It?'),
      p(t("In the Bay Area housing market, the math usually works:")),
      ul([
        [t('Average cost of 800 sq ft second story: ~$240,000', 1)],
        [t('Value added to home: $300,000-$500,000+', 1), t(' depending on neighborhood and quality')],
        [t('Net ROI: 25-100%+', 1)],
      ]),
      p(t("In desirable neighborhoods (Rockridge, Crocker Highlands, parts of San Mateo, Los Gatos), a second story can add significantly more than it costs. A 3BR/1BA home that becomes a 5BR/3BA home jumps into an entirely different buyer pool.")),
      p(t("Compare this to buying a bigger home: in many Bay Area neighborhoods, the price difference between a 1,400 sq ft home and a 2,200 sq ft home is $400,000-$800,000. Building up is almost always cheaper than buying up.")),

      h2('Second Story vs Other Options'),
      p(t("Before committing to a second story, consider whether these alternatives meet your needs:")),
      ul([
        [t('Rear addition: ', 1), t('Cheaper per square foot but uses yard space. Good if you only need 200-400 sq ft.')],
        [link('ADU', '/adu'), t(': Separate structure in your backyard. Good for rental income or multigenerational living, but doesn\'t expand your main home.')],
        [t('Basement conversion: ', 1), t('Not common in the Bay Area (most homes don\'t have basements), but possible in some older homes.')],
      ]),

      h2('From Alexander: The Honest Truth About Second Stories'),
      p(t("A second story addition is the most complex residential project we do. It touches every system in your home — structural, electrical, plumbing, HVAC, and the roof. It requires an architect, a structural engineer, and a general contractor who can coordinate all of it.", 2)),
      p(t("I hold both an architecture background and a general contractor's license (CSLB #1082377) specifically because projects like this suffer when design and construction don't talk to each other. When I design a second story, I'm thinking about how to build it efficiently. When I build it, I know exactly what the design intent is. That coordination saves time, money, and headaches.", 2)),

      h2('Ready to Explore a Second Story?'),
      p(t("If you're thinking about adding a second floor to your Bay Area home, the first step is a feasibility assessment. We'll look at your existing foundation, framing, and lot to determine what's possible — and give you a realistic budget range. "), link('Request a consultation', '/#quote'), t('.')),
      p(t('We design and build second story additions across '), link('Alameda County', '/service-areas/alameda-county-ca'), t(', '), link('Contra Costa County', '/service-areas/contra-costa-county-ca'), t(', '), link('Santa Clara County', '/service-areas/santa-clara-county-ca'), t(', and the greater Bay Area.')),
    ]),
  };
}

// ── Main ────────────────────────────────────────────────────────────────────

const ALL_POSTS = [
  post1_roofReplaceTimeline,
  post2_metalVsAsphalt,
  post3_jamesHardieSiding,
  post4_aduCost,
  post5_chooseRoofingContractor,
  post6_fireZoneRoofing,
  post7_windowReplacementCost,
  post8_roofMaintenanceChecklist,
  post9_roofingWarranty,
  post10_secondStoryAddition,
];

async function ensureTag(tagSlug, tagName) {
  // Check if tag exists
  try {
    const data = await ghostGet(`tags/slug/${tagSlug}/`);
    if (data.tags && data.tags.length > 0) {
      console.log(`  Tag "${tagSlug}" already exists (id: ${data.tags[0].id})`);
      return data.tags[0];
    }
  } catch (e) {
    // Tag doesn't exist, create it
  }

  const data = await ghostPost('tags/', {
    tags: [{ name: tagName, slug: tagSlug }],
  });
  console.log(`  Created tag "${tagSlug}" (id: ${data.tags[0].id})`);
  return data.tags[0];
}

async function postExists(slug) {
  try {
    const data = await ghostGet(`posts/slug/${slug}/`);
    return data.posts && data.posts.length > 0 ? data.posts[0] : null;
  } catch (e) {
    return null;
  }
}

async function main() {
  console.log('Creating 10 blog posts in Ghost CMS...\n');

  // Ensure blog_post tag exists
  const tag = await ensureTag('blog-post', 'Blog Post');

  let created = 0;
  let skipped = 0;

  for (const postFn of ALL_POSTS) {
    const postData = postFn();
    console.log(`\n[${created + skipped + 1}/10] ${postData.title}`);

    // Check if slug already exists
    const existing = await postExists(postData.slug);
    if (existing) {
      console.log(`  SKIPPED — slug "${postData.slug}" already exists`);
      skipped++;
      continue;
    }

    // Create the post
    try {
      const result = await ghostPost('posts/', {
        posts: [{
          title: postData.title,
          slug: postData.slug,
          lexical: postData.lexical,
          status: 'published',
          tags: [{ id: tag.id }],
          meta_title: postData.meta_title,
          meta_description: postData.meta_description,
        }],
      });
      console.log(`  CREATED — id: ${result.posts[0].id}`);
      created++;
    } catch (err) {
      console.error(`  ERROR — ${err.message}`);
    }
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
