/**
 * Second-story addition city pages — content and metadata for the
 * /additions/second-story-addition-{city}-ca content cluster.
 *
 * Self-contained data (independent of Ghost CMS and src/data/services/*.ts)
 * so this cluster ships without dependencies on the shared service registry.
 *
 * Hub: /additions/second-story (Ghost CMS, sub-additions-second-story).
 * Each city page links back to the hub and to its parent service-area page.
 */

export interface SecondStoryCityFaq {
  question: string;
  answer: string;
}

export interface SecondStoryCity {
  /** URL slug fragment, e.g. "san-francisco" → /additions/second-story-addition-san-francisco-ca */
  slug: string;
  /** Display name, e.g. "San Francisco" */
  city: string;
  /** County display name, e.g. "San Francisco County" */
  county: string;
  /** Service-area URL for the parent county+city page */
  serviceAreaHref: string;
  /** Building department display name */
  buildingDept: string;
  /** Optional URL to the building department's residential permit page */
  buildingDeptUrl?: string;
  /** Geo coordinates [lng, lat] for schema.org */
  geo: [number, number];
  /** Local jurisdiction notes — seismic, zoning, FAR rules */
  zoningNotes: string;
  /** Cost range in USD per square foot */
  costPerSqFt: { low: number; high: number };
  /** Typical project total range in USD */
  projectTotal: { low: number; high: number };
  /** SEO meta */
  title: string;
  description: string;
  /** Hero headline (sentence case, no em dashes) */
  headline: string;
  /** Intro paragraph(s) — city-specific opener */
  intro: string[];
  /** Body sections after the intro */
  sections: Array<{ heading: string; body: string }>;
  /** City-specific FAQ entries (4-5) */
  faqs: SecondStoryCityFaq[];
}

const CSLB = 'CSLB #1078806';

export const SECOND_STORY_CITIES: SecondStoryCity[] = [
  {
    slug: 'san-francisco',
    city: 'San Francisco',
    county: 'San Francisco County',
    serviceAreaHref: '/service-areas/san-mateo-county-ca',
    buildingDept: 'San Francisco Department of Building Inspection',
    buildingDeptUrl: 'https://sfdbi.org/',
    geo: [-122.4194, 37.7749],
    zoningNotes:
      'San Francisco residential lots fall under RH-1, RH-2, or RH-3 zoning, and most second story additions require a 311 neighborhood notice plus a Discretionary Review hearing if a neighbor objects. The Planning Department enforces strict rear yard setbacks, height limits of 35-40 feet depending on district, and shadow studies for additions near public open space.',
    costPerSqFt: { low: 425, high: 650 },
    projectTotal: { low: 340000, high: 750000 },
    title: 'Second Story Addition San Francisco | Architect Led',
    description:
      'Architect-led second story additions in San Francisco. In-house structural engineer, DBI permits, 311 notices, costs from $425/sq ft. CSLB #1078806.',
    headline: 'Second story additions in San Francisco',
    intro: [
      'San Francisco lots are some of the smallest in California, with median residential parcels of 2,500-3,000 square feet. Going up is the only way to add real living space without losing the backyard or breaking RH-1 lot coverage limits. Hamilton Exteriors has been designing and building second story additions across the city since 2018, with an in-house licensed architect and structural engineer who handle every drawing set, every Section 311 neighborhood notice, and every Department of Building Inspection submittal.',
      'San Francisco is also one of the most demanding permitting environments in the Bay Area. Most second story projects trigger a Section 311 notice to neighbors within 150 feet, and any project in an RH-1 or RH-2 zone may face Discretionary Review at the Planning Commission. Our team has shepherded projects through DBI and Planning since 2018 and we plan for the timeline upfront so the build phase moves on schedule.',
    ],
    sections: [
      {
        heading: 'San Francisco permit and planning process',
        body: 'A typical second story addition in San Francisco goes through three review tracks: Planning Department review for zoning and neighborhood notice, DBI plan check for structural and life safety, and Public Works for sidewalk and curb cuts if access changes. Projects in historic districts (Alamo Square, Pacific Heights, Liberty Hill) also require Historic Preservation Commission review. Total permit timelines run 6-12 months from application to issued permit, with active build time of 18-24 weeks once permits clear.',
      },
      {
        heading: 'Seismic and structural requirements',
        body: 'San Francisco enforces Seismic Design Category D, the most stringent in California. Pre-1978 single-family homes typically need foundation bolting, cripple wall bracing, and shear wall reinforcement before a second story load can be added. Our structural engineer assesses the existing foundation and framing during the feasibility phase, and 70% of pre-1970 SF homes need some form of seismic upgrade as part of the addition. We model these costs into the upfront estimate so there are no mid-build surprises.',
      },
      {
        heading: 'San Francisco cost range and what it includes',
        body: `Second story additions in San Francisco run $425-$650 per square foot finished, putting a typical 800-1,200 sq ft addition at $340,000-$750,000. That range covers architectural design, structural engineering, full DBI and Planning permit fees ($18,000-$45,000 in SF, higher than any other Bay Area city), construction, finishes, and the seismic retrofit work most projects require. Hamilton Exteriors itemizes every line so you see exactly where the money goes. ${CSLB}.`,
      },
    ],
    faqs: [
      {
        question: 'How much does a second story addition cost in San Francisco?',
        answer:
          'Second story additions in San Francisco typically run $425 to $650 per square foot, putting an 800-1,200 sq ft addition at roughly $340,000 to $750,000 fully built. Costs are higher than the broader Bay Area because of DBI and Planning permit fees, mandatory seismic upgrades on pre-1978 homes, and the prevailing labor rates in the city. Every Hamilton Exteriors estimate is fully itemized so you see exactly what each phase costs.',
      },
      {
        question: 'Do I need a Section 311 notice for a second story addition in San Francisco?',
        answer:
          'Yes. Almost every second story addition in San Francisco triggers a Section 311 neighborhood notice, which gives neighbors within 150 feet 30 days to request a Discretionary Review hearing at the Planning Commission. Our team prepares the notice package and walks you through what to expect. We have shepherded projects through DR hearings and design well within RH-1 and RH-2 zoning to minimize the chance of a contested hearing.',
      },
      {
        question: 'How long does the permit process take in San Francisco?',
        answer:
          'Plan on 6 to 12 months from application to issued building permit for a second story addition in San Francisco. Planning review takes 3 to 5 months, the 311 neighborhood notice adds 30 days, and DBI plan check runs 2 to 4 months in parallel. Active construction is typically 18 to 24 weeks once permits issue. We start the permit process immediately after design approval so we can stack timelines.',
      },
      {
        question: 'Will I need to move out during construction in San Francisco?',
        answer:
          'For most second story additions in San Francisco, you can stay in the home for the first 8 to 12 weeks while we build the addition above the existing roof under temporary weather protection. The 4 to 6 week window where we cut into the existing ceiling and tie in stairs typically requires temporary relocation. We coordinate move-out timing in your project schedule and build it into the contract.',
      },
      {
        question: 'Which San Francisco neighborhoods do you serve for second story additions?',
        answer:
          'We build second story additions across all of San Francisco, including the Sunset, Richmond, Noe Valley, Bernal Heights, Glen Park, the Mission, Potrero Hill, Pacific Heights, and the Marina. We pay particular attention to historic districts like Alamo Square and Liberty Hill where Historic Preservation Commission review applies, and we have completed projects in every major SF zoning district.',
      },
    ],
  },
  {
    slug: 'san-jose',
    city: 'San Jose',
    county: 'Santa Clara County',
    serviceAreaHref: '/service-areas/santa-clara-county-ca/san-jose-ca',
    buildingDept: 'San Jose Building Division',
    buildingDeptUrl: 'https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement',
    geo: [-121.8863, 37.3382],
    zoningNotes:
      'San Jose residential additions fall under R-1 zoning with a typical 35-foot height limit and 50% maximum floor area ratio. The Building Division uses the city-developed PermitSJ portal for online plan submittal, which streamlines review for second story projects that meet objective design standards.',
    costPerSqFt: { low: 275, high: 425 },
    projectTotal: { low: 220000, high: 510000 },
    title: 'Second Story Addition San Jose | Architect Led',
    description:
      'Architect-led second story additions in San Jose. In-house structural engineer, PermitSJ submittal, costs from $275/sq ft. Bay Area since 2018. CSLB #1078806.',
    headline: 'Second story additions in San Jose',
    intro: [
      'San Jose has the largest residential lot inventory in the Bay Area, but most homes built between 1950 and 1980 were single-story ranch designs that owners are now expanding. Second story additions are the fastest way to add 800 to 1,500 square feet of bedrooms, bathrooms, and primary suites without giving up backyard space or losing parking. Hamilton Exteriors has built second story additions across San Jose since 2018, with an in-house licensed architect and structural engineer handling everything from the feasibility study through PermitSJ submittal.',
      'San Jose is also one of the more permit-friendly cities in the Bay Area, particularly for projects that meet the objective design standards published by the Planning Division. We design to those standards from day one, which means most of our second story projects in San Jose clear plan check in 8 to 14 weeks instead of the 4 to 6 months typical for cities with discretionary review.',
    ],
    sections: [
      {
        heading: 'San Jose permit process and PermitSJ',
        body: 'San Jose runs all residential plan submittals through the PermitSJ online portal, which is one of the most modern permit systems in the Bay Area. A typical second story addition goes through structural plan check, fire department review, and a single Planning Division review for zoning conformance. Total permit timeline runs 8 to 14 weeks for projects that meet objective standards, longer if a variance is needed for height or setback. Active construction averages 16 to 22 weeks.',
      },
      {
        heading: 'Seismic and structural requirements',
        body: 'San Jose sits in Seismic Design Category D, the same as the rest of the Bay Area. Pre-1980 homes often need foundation upgrades and shear wall reinforcement before a second story can be added. Our structural engineer performs a foundation assessment during feasibility and identifies any required upgrades upfront. The flat lots common across San Jose make foundation work simpler than in San Francisco or Berkeley, which is one reason San Jose costs run lower than other Bay Area cities.',
      },
      {
        heading: 'San Jose cost range and what it includes',
        body: `Second story additions in San Jose run $275 to $425 per square foot finished, putting a typical 800 to 1,500 sq ft addition at $220,000 to $510,000. That range covers architectural design, structural engineering, full PermitSJ permit fees ($8,000 to $18,000 in San Jose), construction, finishes, and any required seismic work on the existing structure. ${CSLB}.`,
      },
    ],
    faqs: [
      {
        question: 'How much does a second story addition cost in San Jose?',
        answer:
          'Second story additions in San Jose typically run $275 to $425 per square foot, so an 800 to 1,500 sq ft addition costs $220,000 to $510,000 fully built. San Jose is one of the more affordable Bay Area cities for second story work because of flatter lots, faster permit timelines, and lower municipal fees compared to San Francisco or Berkeley. Every Hamilton Exteriors estimate is itemized line by line.',
      },
      {
        question: 'How long does it take to permit a second story addition in San Jose?',
        answer:
          'Through the PermitSJ portal, most second story addition permits in San Jose take 8 to 14 weeks from submittal to issued permit when the design meets objective standards. Projects requiring a variance or discretionary review can extend to 4 to 6 months. We design to objective standards from day one, which keeps the typical timeline on the short end.',
      },
      {
        question: 'Do I need to move out during construction in San Jose?',
        answer:
          'Most San Jose homes have flat lots and accessible second-floor access points, which means you can typically stay in the home for the first 10 to 14 weeks of construction while we frame the addition above the existing roof under temporary weather protection. A 3 to 5 week window when we cut into the existing ceiling for stairs and HVAC tie-ins usually requires temporary relocation.',
      },
      {
        question: 'What permit fees should I expect in San Jose?',
        answer:
          'Permit fees for a second story addition in San Jose typically run $8,000 to $18,000 depending on square footage and valuation. That covers building permit, plan check, school district fees, and the Park In-Lieu fee that applies to substantial residential additions. We itemize permit fees as a pass-through line in your estimate so you see actual city costs without markup.',
      },
      {
        question: 'Which San Jose neighborhoods do you serve?',
        answer:
          'We build second story additions across all of San Jose, including Willow Glen, Cambrian, Almaden, Rose Garden, Berryessa, Evergreen, and East San Jose. We have completed projects in every major San Jose Planning area and we know the specific zoning quirks that apply in older neighborhoods like Naglee Park and Hanchett Park.',
      },
    ],
  },
  {
    slug: 'oakland',
    city: 'Oakland',
    county: 'Alameda County',
    serviceAreaHref: '/service-areas/alameda-county-ca/oakland-ca',
    buildingDept: 'Oakland Bureau of Building',
    buildingDeptUrl: 'https://www.oaklandca.gov/departments/planning-and-building',
    geo: [-122.2711, 37.8044],
    zoningNotes:
      'Oakland residential additions fall under RD-1 or RM-1 zoning, with height limits of 30-35 feet in most flatlands neighborhoods and 25-30 feet in the Oakland Hills due to fire access requirements. Wildland Urban Interface (WUI) homes in the Hills must use Class A roofing, ignition-resistant siding, and ember-resistant venting on additions.',
    costPerSqFt: { low: 325, high: 500 },
    projectTotal: { low: 260000, high: 600000 },
    title: 'Second Story Addition Oakland | Architect Led',
    description:
      'Architect-led second story additions in Oakland. In-house structural engineer, Bureau of Building permits, WUI compliance. From $325/sq ft. CSLB #1078806.',
    headline: 'Second story additions in Oakland',
    intro: [
      'Oakland has the most diverse housing stock in the Bay Area, from 1900s Victorians in West Oakland to mid-century ranches in the flatlands and modern hillside homes above 580. Second story additions are particularly common in Rockridge, Glenview, Trestle Glen, and the upper Dimond, where lot coverage limits make outward expansion impractical. Hamilton Exteriors has been designing and building second story additions across Oakland since 2018, with an in-house licensed architect and structural engineer.',
      'Oakland Hills projects have unique requirements due to Wildland Urban Interface fire codes, and our team has worked through every relevant fire-zone restriction. We design to current WUI standards and coordinate with the Oakland Fire Department on access and defensible space from the start.',
    ],
    sections: [
      {
        heading: 'Oakland permit and zoning process',
        body: 'A typical second story addition in Oakland goes through Bureau of Building plan check (8 to 12 weeks), Planning Department zoning review (3 to 6 weeks, parallel), and Oakland Fire Department review for any project in the Hills WUI zone. Total permit timeline runs 12 to 18 weeks. Active construction is typically 16 to 22 weeks. The Bureau of Building uses the Accela permit portal which allows online submittal and tracking.',
      },
      {
        heading: 'Oakland Hills seismic and fire requirements',
        body: 'Homes in the Oakland Hills sit in both Seismic Design Category D and the WUI fire zone. Pre-1980 hillside homes typically need foundation tie-downs, cripple wall bracing, and shear wall reinforcement before a second story is added. Additions also need Class A roofing, ignition-resistant siding (fiber cement, stucco, or metal), and ember-resistant attic venting. Our team handles every WUI compliance detail at the design phase so the build does not stall during fire department inspection.',
      },
      {
        heading: 'Oakland cost range and what it includes',
        body: `Second story additions in Oakland run $325 to $500 per square foot finished, with hillside projects on the upper end due to access challenges and WUI material requirements. A typical 800 to 1,500 sq ft addition runs $260,000 to $600,000. The estimate covers architectural design, structural engineering, full Bureau of Building and Planning permit fees ($10,000 to $25,000 in Oakland), construction, finishes, and any required seismic and WUI upgrades. ${CSLB}.`,
      },
    ],
    faqs: [
      {
        question: 'How much does a second story addition cost in Oakland?',
        answer:
          'Second story additions in Oakland typically run $325 to $500 per square foot. An 800 to 1,500 sq ft addition costs $260,000 to $600,000 fully built. Hillside projects in the Oakland Hills run on the upper end of the range due to WUI fire-resistant material requirements (Class A roofing, fiber cement siding, ember-resistant venting) and harder site access. Flatlands projects in Rockridge or Glenview tend toward the middle of the range.',
      },
      {
        question: 'Do Oakland Hills additions need WUI fire compliance?',
        answer:
          'Yes. Any second story addition in the Oakland Hills WUI zone (most areas above Highway 13 and 580) must use Class A roofing, ignition-resistant siding, and ember-resistant attic venting. The Oakland Fire Department reviews every WUI permit for compliance with defensible space and access requirements. We design to current WUI standards from day one, so plan check and fire inspection move quickly.',
      },
      {
        question: 'How long does the permit process take in Oakland?',
        answer:
          'Plan on 12 to 18 weeks from application to issued permit for a second story addition in Oakland. Bureau of Building plan check runs 8 to 12 weeks, Planning Department zoning review runs 3 to 6 weeks in parallel, and any WUI hillside project adds 2 to 3 weeks for Oakland Fire Department review. Active construction is typically 16 to 22 weeks once permits issue.',
      },
      {
        question: 'Will my Oakland home need seismic upgrades for a second story?',
        answer:
          'Most pre-1980 Oakland homes need some seismic work before adding a second story. Foundation bolting and cripple wall bracing are typical for flatlands homes, and hillside homes often need additional shear wall reinforcement. Our structural engineer performs a foundation assessment during the feasibility phase and prices any required upgrades into the upfront estimate.',
      },
      {
        question: 'Which Oakland neighborhoods do you serve?',
        answer:
          'We build second story additions across all of Oakland, including Rockridge, Glenview, Trestle Glen, Dimond, Montclair, Crocker Highlands, Lakeshore, Temescal, Grand Lake, and the West Oakland Victorian district. We pay particular attention to hillside fire-zone compliance and to historic district guidelines in older neighborhoods.',
      },
    ],
  },
  {
    slug: 'concord',
    city: 'Concord',
    county: 'Contra Costa County',
    serviceAreaHref: '/service-areas/contra-costa-county-ca/concord-ca',
    buildingDept: 'Concord Building Division',
    buildingDeptUrl: 'https://www.cityofconcord.org/200/Building',
    geo: [-122.0311, 37.9780],
    zoningNotes:
      'Concord residential additions fall under R-6 single-family zoning with a 30-foot height limit and 40% maximum lot coverage. The Concord Building Division uses the Accela portal and runs one of the more responsive plan check processes in the Bay Area.',
    costPerSqFt: { low: 250, high: 400 },
    projectTotal: { low: 200000, high: 480000 },
    title: 'Second Story Addition Concord | Architect Led',
    description:
      'Architect-led second story additions in Concord, CA. In-house structural engineer, Concord Building Division permits, costs from $250/sq ft. CSLB #1078806.',
    headline: 'Second story additions in Concord',
    intro: [
      'Concord has one of the largest stocks of single-story ranch homes in the Bay Area, most built between 1955 and 1975 on flat 7,000 to 9,000 sq ft lots. Adding a second story is the fastest way to add bedrooms and a primary suite without losing yard space, and the flat lots and straightforward zoning make Concord one of the simpler permit environments in the region. Hamilton Exteriors has been building second story additions in Concord since 2018, with an in-house licensed architect and structural engineer handling every plan set.',
      'Concord is part of Contra Costa County and benefits from a Building Division that runs efficient plan reviews. Most of our second story projects in Concord clear plan check in 6 to 10 weeks, which is among the fastest in the Bay Area.',
    ],
    sections: [
      {
        heading: 'Concord permit process',
        body: 'A typical second story addition in Concord goes through Building Division plan check (6 to 10 weeks) and a brief Planning Division zoning review for setback and height conformance. Total permit timeline runs 8 to 12 weeks, faster than most Bay Area cities. Active construction is typically 14 to 20 weeks. The Concord Building Division uses the Accela online portal for submittals and inspections.',
      },
      {
        heading: 'Seismic and structural considerations',
        body: 'Concord sits in Seismic Design Category D, the same as the rest of the Bay Area, but the city is far enough east that ground shaking is generally less severe than in cities along the Hayward Fault. Pre-1980 homes still typically need foundation bolting and cripple wall bracing before a second story is added. The flat lots common across Concord make this work straightforward, with no hillside excavation or retaining walls.',
      },
      {
        heading: 'Concord cost range and what it includes',
        body: `Second story additions in Concord run $250 to $400 per square foot finished, putting a typical 800 to 1,500 sq ft addition at $200,000 to $480,000. Concord is one of the most affordable Bay Area cities for second story work due to flat lot conditions, fast permit turnaround, and lower municipal fees ($6,000 to $12,000 typical). The estimate covers architectural design, structural engineering, permits, construction, finishes, and any required seismic upgrades. ${CSLB}.`,
      },
    ],
    faqs: [
      {
        question: 'How much does a second story addition cost in Concord?',
        answer:
          'Second story additions in Concord typically run $250 to $400 per square foot, so an 800 to 1,500 sq ft addition costs $200,000 to $480,000 fully built. Concord is among the most affordable Bay Area cities for second story work because of flat lot conditions, fast permit turnaround, and lower city fees. Every Hamilton Exteriors estimate is itemized so you see exactly where each dollar goes.',
      },
      {
        question: 'How long does the Concord permit process take?',
        answer:
          'Most second story addition permits in Concord clear plan check in 8 to 12 weeks, faster than most Bay Area cities. The Concord Building Division uses the Accela online portal for submittals, and plan reviewers are responsive to revisions. Active construction is typically 14 to 20 weeks once permits issue.',
      },
      {
        question: 'Will my Concord home need seismic upgrades?',
        answer:
          'Most pre-1980 Concord homes need foundation bolting and cripple wall bracing before a second story is added. The flat lots common in Concord make this work straightforward, with no hillside excavation needed. Our structural engineer performs a foundation assessment during feasibility and prices any required upgrades into the upfront estimate.',
      },
      {
        question: 'Can I stay in my Concord home during construction?',
        answer:
          'For most Concord second story additions, you can stay in the home for the first 10 to 14 weeks of construction while we frame the addition above the existing roof under temporary weather protection. A 3 to 5 week window when we cut into the existing ceiling for stairs and HVAC tie-ins usually requires temporary relocation.',
      },
      {
        question: 'Which Concord neighborhoods do you serve?',
        answer:
          'We build second story additions across all of Concord, including Crystyl Ranch, Dana Estates, Holbrook Heights, Sun Terrace, Ygnacio Valley, Clayton Valley, and the Todos Santos downtown area. We have completed projects in every Concord zoning district.',
      },
    ],
  },
  {
    slug: 'berkeley',
    city: 'Berkeley',
    county: 'Alameda County',
    serviceAreaHref: '/service-areas/alameda-county-ca/berkeley-ca',
    buildingDept: 'Berkeley Permit Service Center',
    buildingDeptUrl: 'https://berkeleyca.gov/community-recreation/permit-service-center',
    geo: [-122.2727, 37.8716],
    zoningNotes:
      'Berkeley residential additions fall under R-1 or R-1A zoning, with strict height limits (28-30 feet in most districts), Floor Area Ratio caps, and Berkeley Hills WUI fire compliance for any home above the Hayward Fault zone. The Zoning Adjustments Board reviews most second story projects through an Administrative Use Permit, which adds 60 to 90 days to the timeline.',
    costPerSqFt: { low: 400, high: 575 },
    projectTotal: { low: 320000, high: 690000 },
    title: 'Second Story Addition Berkeley | Architect Led',
    description:
      'Architect-led second story additions in Berkeley. In-house structural engineer, AUP filings, WUI compliance, costs from $400/sq ft. CSLB #1078806.',
    headline: 'Second story additions in Berkeley',
    intro: [
      'Berkeley has some of the most architecturally significant residential stock in the Bay Area, from Maybeck and Morgan-designed Craftsman bungalows in North Berkeley to mid-century moderns in the Berkeley Hills. Second story additions in Berkeley require careful attention to zoning, neighborhood character, and Berkeley Hills WUI fire compliance. Hamilton Exteriors has been designing and building second story additions across Berkeley since 2018, with an in-house licensed architect who understands the design review expectations of the Zoning Adjustments Board.',
      'Berkeley is one of the more procedurally complex Bay Area cities for additions, primarily because most second story projects require an Administrative Use Permit (AUP) that goes before the Zoning Adjustments Board. We design to Berkeley standards from day one and prepare AUP packages that present cleanly to ZAB.',
    ],
    sections: [
      {
        heading: 'Berkeley AUP and permit process',
        body: 'A typical second story addition in Berkeley goes through three review tracks: Zoning Adjustments Board for the Administrative Use Permit (60 to 90 days), Permit Service Center plan check for structural and life safety (8 to 14 weeks), and Berkeley Fire Department review for any home in the WUI hillside zone. Total permit timeline runs 4 to 7 months. Active construction is typically 18 to 24 weeks. AUP applications can be appealed by neighbors, which is why our designs prioritize neighbor compatibility from the start.',
      },
      {
        heading: 'Berkeley Hills WUI and seismic requirements',
        body: 'Homes in the Berkeley Hills sit in both Seismic Design Category D and the WUI fire zone. Pre-1980 hillside homes typically need foundation tie-downs and shear wall reinforcement before a second story is added. WUI compliance requires Class A roofing, ignition-resistant siding (fiber cement, stucco, or metal), and ember-resistant attic venting. Our team handles every WUI detail at the design phase. Berkeley sits very close to the Hayward Fault, so seismic detailing is more conservative than for Concord or Walnut Creek.',
      },
      {
        heading: 'Berkeley cost range and what it includes',
        body: `Second story additions in Berkeley run $400 to $575 per square foot finished, with hillside projects on the upper end. A typical 800 to 1,200 sq ft addition runs $320,000 to $690,000. The estimate covers architectural design, structural engineering, AUP application and ZAB hearing prep, full Permit Service Center fees ($14,000 to $32,000 in Berkeley), construction, finishes, and any required seismic and WUI upgrades. ${CSLB}.`,
      },
    ],
    faqs: [
      {
        question: 'How much does a second story addition cost in Berkeley?',
        answer:
          'Second story additions in Berkeley typically run $400 to $575 per square foot. An 800 to 1,200 sq ft addition costs $320,000 to $690,000 fully built. Costs in Berkeley are higher than the broader Bay Area because of AUP application requirements, mandatory seismic upgrades on pre-1978 homes near the Hayward Fault, and WUI material requirements for hillside projects.',
      },
      {
        question: 'Do I need an Administrative Use Permit in Berkeley?',
        answer:
          'Yes. Most second story additions in Berkeley require an Administrative Use Permit (AUP) that goes before the Zoning Adjustments Board. AUPs are reviewable for neighbor appeal, which is why our designs prioritize neighborhood compatibility, height stepping, and respectful massing from the first sketch. Our team prepares the full AUP application package and presents at ZAB hearings as needed.',
      },
      {
        question: 'How long does the Berkeley permit process take?',
        answer:
          'Plan on 4 to 7 months from application to issued building permit in Berkeley. The Administrative Use Permit takes 60 to 90 days at the Zoning Adjustments Board, Permit Service Center plan check runs 8 to 14 weeks in parallel, and Berkeley Fire Department review adds 2 to 3 weeks for any WUI hillside project. Active construction is typically 18 to 24 weeks once permits issue.',
      },
      {
        question: 'Are there special requirements for Berkeley Hills additions?',
        answer:
          'Yes. Any second story addition in the Berkeley Hills WUI zone (most areas above the Hayward Fault) must use Class A roofing, ignition-resistant siding, and ember-resistant attic venting. Berkeley Fire Department reviews every WUI permit for compliance with defensible space and access requirements. Our designs incorporate these standards from day one.',
      },
      {
        question: 'Which Berkeley neighborhoods do you serve?',
        answer:
          'We build second story additions across all of Berkeley, including North Berkeley, Elmwood, Claremont, Berkeley Hills, Westbrae, the Gourmet Ghetto area, Le Conte, and Halcyon. We pay particular attention to historic Maybeck and Morgan homes in the hills and to AUP design review in every district.',
      },
    ],
  },
  {
    slug: 'walnut-creek',
    city: 'Walnut Creek',
    county: 'Contra Costa County',
    serviceAreaHref: '/service-areas/contra-costa-county-ca/walnut-creek-ca',
    buildingDept: 'Walnut Creek Building Division',
    buildingDeptUrl: 'https://www.walnut-creek.org/departments/community-development/building',
    geo: [-122.0652, 37.9101],
    zoningNotes:
      'Walnut Creek residential additions fall under R-6 or R-7 single-family zoning, with 30-35 foot height limits and 40-45% maximum lot coverage depending on district. The Building Division uses the Accela portal and projects in the Northgate hillside area must comply with WUI fire requirements.',
    costPerSqFt: { low: 285, high: 425 },
    projectTotal: { low: 230000, high: 510000 },
    title: 'Second Story Addition Walnut Creek | Architect Led',
    description:
      'Architect-led second story additions in Walnut Creek. In-house structural engineer, Building Division permits, costs from $285/sq ft. CSLB #1078806.',
    headline: 'Second story additions in Walnut Creek',
    intro: [
      'Walnut Creek has one of the strongest single-family housing markets in the East Bay, with median home values that justify substantial investment in additions and remodels. Second story additions are particularly common in Northgate, Walnut Heights, and the Saranap, where lot coverage limits make outward expansion impractical. Hamilton Exteriors has been designing and building second story additions across Walnut Creek since 2018, with an in-house licensed architect and structural engineer handling every plan set.',
      'Walnut Creek runs an efficient Building Division, and most of our second story projects in the city clear plan check in 8 to 12 weeks. Hillside projects in the Northgate area require additional WUI fire compliance, which our team handles at the design phase.',
    ],
    sections: [
      {
        heading: 'Walnut Creek permit process',
        body: 'A typical second story addition in Walnut Creek goes through Building Division plan check (8 to 12 weeks), Planning Division zoning review (3 to 5 weeks, parallel), and Contra Costa County Fire Protection District review for any project in the Northgate WUI zone. Total permit timeline runs 10 to 14 weeks. Active construction is typically 14 to 20 weeks. The Building Division uses the Accela online portal for submittals and inspections.',
      },
      {
        heading: 'Seismic and hillside considerations',
        body: 'Walnut Creek sits in Seismic Design Category D, but is far enough east of the Hayward Fault that ground shaking is moderate compared to Berkeley or Oakland. Pre-1980 homes still typically need foundation bolting and cripple wall bracing before a second story is added. Hillside homes in Northgate may also need retaining wall reinforcement and WUI fire-resistant materials (Class A roofing, fiber cement siding, ember-resistant venting).',
      },
      {
        heading: 'Walnut Creek cost range and what it includes',
        body: `Second story additions in Walnut Creek run $285 to $425 per square foot finished, putting a typical 800 to 1,500 sq ft addition at $230,000 to $510,000. Hillside projects in Northgate run on the upper end due to WUI material requirements and harder site access. The estimate covers architectural design, structural engineering, permits ($8,000 to $16,000 typical), construction, finishes, and any required seismic and WUI upgrades. ${CSLB}.`,
      },
    ],
    faqs: [
      {
        question: 'How much does a second story addition cost in Walnut Creek?',
        answer:
          'Second story additions in Walnut Creek typically run $285 to $425 per square foot, so an 800 to 1,500 sq ft addition costs $230,000 to $510,000 fully built. Northgate hillside projects run on the upper end due to WUI fire-resistant material requirements. Flatlands projects in Walnut Heights or the Saranap fall in the middle of the range.',
      },
      {
        question: 'How long does the Walnut Creek permit process take?',
        answer:
          'Plan on 10 to 14 weeks from application to issued permit in Walnut Creek. Building Division plan check runs 8 to 12 weeks, Planning Division zoning review runs 3 to 5 weeks in parallel, and any Northgate hillside project adds 2 to 3 weeks for Contra Costa County Fire Protection District review. Active construction is typically 14 to 20 weeks once permits issue.',
      },
      {
        question: 'Do Northgate hillside additions need WUI fire compliance?',
        answer:
          'Yes. Any second story addition in the Northgate WUI zone (most homes above Geary Road in the eastern hills) must use Class A roofing, ignition-resistant siding, and ember-resistant attic venting. Contra Costa County Fire Protection District reviews every WUI permit for compliance with defensible space and access requirements. Our designs incorporate WUI standards from day one.',
      },
      {
        question: 'Will my Walnut Creek home need seismic upgrades?',
        answer:
          'Most pre-1980 Walnut Creek homes need foundation bolting and cripple wall bracing before a second story is added. Walnut Creek is east of the Hayward Fault, so seismic detailing is moderate compared to Berkeley or Oakland. Our structural engineer performs a foundation assessment during feasibility and prices any required upgrades into the upfront estimate.',
      },
      {
        question: 'Which Walnut Creek neighborhoods do you serve?',
        answer:
          'We build second story additions across all of Walnut Creek, including Northgate, Walnut Heights, Saranap, Rudgear Estates, Parkmead, Woodlands, and the downtown area. We have completed projects in every Walnut Creek zoning district and we know the specific design review expectations that apply in the more visible hillside neighborhoods.',
      },
    ],
  },
];

/** Lookup map by slug for fast page resolution */
export const SECOND_STORY_CITY_MAP: Record<string, SecondStoryCity> = Object.fromEntries(
  SECOND_STORY_CITIES.map(c => [c.slug, c]),
);

/** All city slugs (for sitemap / linking) */
export const SECOND_STORY_CITY_SLUGS = SECOND_STORY_CITIES.map(c => c.slug);
