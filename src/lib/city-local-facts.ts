/**
 * City-specific local facts for programmatic service area pages.
 * Each city gets 2-3 sentences of locally-sourced data to differentiate
 * from templated content and improve AI citability.
 *
 * Keyed by city slug (without -ca suffix).
 */

interface CityFacts {
  housingNote: string;
  permitNote: string;
  weatherNote?: string;
  medianHomeValue: string;
  population: string;
  roofingCostRange: string;
  sidingCostRange: string;
  windowCostRange: string;
  permitAuthority: string;
  permitPhone?: string;
  fireZone: boolean;
  fireZoneNote?: string;
  topNeighborhoods: string[];
  driveTime: string;
  localTip: string;

  /**
   * Optional per-city overrides used to push templated pages out of page 2-3.
   * All optional so the existing 56 cities keep working unchanged.
   */
  /** Page <title> override. When set, replaces Ghost's meta_title. */
  metaTitle?: string;
  /** Meta description override. When set, replaces Ghost's meta_description. */
  metaDescription?: string;
  /** 2-3 specific neighborhoods served (named, not "all neighborhoods"). */
  neighborhoodsServed?: Array<{ name: string; note: string }>;
  /** City building department for permits. */
  buildingDeptName?: string;
  /** One-line note about permitting cadence/quirks. */
  buildingDeptNote?: string;
  /** Climate / siding / roofing consideration specific to this city. */
  localConsideration?: { heading: string; body: string };
  /** City-specific FAQ appended to the standard FAQ list. */
  cityFaq?: { question: string; answer: string };
  /** Internal cross-links to /roofing, /siding, /adu, /additions, /custom-homes, and nearby cities. */
  crossLinks?: Array<{ label: string; href: string }>;
}

/**
 * Optional county-level overrides (parallel to CityFacts) used to give county
 * pages city-specific titles/meta and richer comparison content.
 */
interface CountyOverride {
  metaTitle?: string;
  metaDescription?: string;
  /** Top cities in this county with a 1-line differentiator each. */
  cityComparison?: Array<{ name: string; href: string; note: string }>;
  /** County-level building / permit context. */
  countyPermitContext?: { heading: string; body: string };
}

const CITY_FACTS: Record<string, CityFacts> = {
  // Alameda County
  'oakland': {
    housingNote: 'Oakland has over 150,000 housing units, with roughly 60% of homes built before 1960. Many older neighborhoods like Rockridge, Temescal, and Montclair have original roofing that is past its expected 25-30 year lifespan.',
    permitNote: 'Oakland requires building permits for roof replacements. Permit fees typically range from $200 to $600 depending on project valuation. The City of Oakland Building Bureau processes most residential roofing permits within 5-10 business days.',
    weatherNote: 'Oakland receives approximately 23 inches of rain annually, concentrated between November and March. The mild Mediterranean climate is ideal for asphalt shingles, though hillside homes in the Oakland Hills should consider Class A fire-rated materials per California WUI zone requirements.',
    medianHomeValue: '$850,000',
    population: '433,000',
    roofingCostRange: '$10,000–$28,000',
    sidingCostRange: '$15,000–$40,000',
    windowCostRange: '$600–$1,800 per window',
    permitAuthority: 'City of Oakland Building Bureau',
    permitPhone: '(510) 238-3891',
    fireZone: true,
    fireZoneNote: 'Oakland Hills neighborhoods above Highway 13 are designated WUI fire zones requiring Class A fire-rated roofing materials. The 1991 Oakland Hills firestorm led to some of the strictest fire-safety building codes in the East Bay.',
    topNeighborhoods: ['Rockridge', 'Temescal', 'Montclair', 'Piedmont Ave', 'Crocker Highlands'],
    driveTime: '15 minutes',
    localTip: 'Oakland\'s flat-fee permit structure makes it one of the most affordable cities in the East Bay for roofing permit costs. The city also allows over-the-counter permits for simple re-roofs with no structural changes.',
  },
  'berkeley': {
    housingNote: 'Berkeley has approximately 47,000 housing units. The city\'s historic neighborhoods — including the Elmwood, Rockridge, and Thousand Oaks districts — feature many Craftsman-style homes from the early 1900s that require specialized roofing care.',
    permitNote: 'The City of Berkeley requires permits for all roof replacements and re-roofing projects. Berkeley is known for thorough plan review, so homeowners should expect 2-3 weeks for permit processing. Hamilton Exteriors handles all permit applications on your behalf.',
    weatherNote: 'Berkeley\'s proximity to the Bay creates microclimates that vary by neighborhood — hilltop homes experience more wind exposure while flatland areas see more fog moisture. Both conditions affect shingle longevity and material selection.',
    medianHomeValue: '$1,400,000',
    population: '124,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$18,000–$50,000',
    windowCostRange: '$800–$2,200 per window',
    permitAuthority: 'City of Berkeley Building & Safety Division',
    permitPhone: '(510) 981-7440',
    fireZone: true,
    fireZoneNote: 'Berkeley Hills neighborhoods east of Grizzly Peak Boulevard fall within a designated WUI fire zone. The 1923 Berkeley Fire and proximity to wildland areas drive strict Class A fire-rated material requirements.',
    topNeighborhoods: ['Elmwood', 'Rockridge', 'Thousand Oaks', 'Claremont', 'North Berkeley'],
    driveTime: '25 minutes',
    localTip: 'Berkeley\'s Landmarks Preservation Commission may review roof changes on homes in the designated historic districts. If your home is a designated landmark or in a historic zone, plan for an extra 2-4 weeks of review time.',
  },
  'fremont': {
    housingNote: 'Fremont is the fourth-largest city in the Bay Area with over 75,000 housing units. Many homes in the Warm Springs, Mission San Jose, and Irvington districts were built between 1960 and 1990, putting them at the age where roof replacement becomes necessary.',
    permitNote: 'Fremont\'s Development Services Center typically processes residential roofing permits within 1-2 weeks. Permit fees are based on project valuation and generally range from $250 to $500 for a standard re-roof.',
    medianHomeValue: '$1,350,000',
    population: '230,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$18,000–$48,000',
    windowCostRange: '$700–$2,000 per window',
    permitAuthority: 'City of Fremont Development Services Center',
    permitPhone: '(510) 494-4460',
    fireZone: false,
    topNeighborhoods: ['Mission San Jose', 'Warm Springs', 'Irvington', 'Niles', 'Centerville'],
    driveTime: '20 minutes',
    localTip: 'Fremont\'s Mission San Jose district sits at a higher elevation with more wind exposure than the flatlands, meaning roofs there tend to wear 3-5 years faster. Homes in this area benefit from impact-resistant shingles rated for higher wind speeds.',
    metaTitle: 'Fremont, CA Roofing, Siding & ADUs | Hamilton Exteriors (CSLB #1078806)',
    metaDescription: 'Fremont contractor for roofing, James Hardie siding, windows, ADUs and additions. Serving Mission San Jose, Warm Springs and Irvington. Hayward Fault seismic detailing. CSLB #1078806.',
    neighborhoodsServed: [
      { name: 'Mission San Jose', note: 'Older hillside homes near Mission Peak with steeper pitches and more wind exposure than the flatlands.' },
      { name: 'Warm Springs', note: '1970s-1990s tract homes around the Tesla and BART corridor due for first or second re-roofs.' },
      { name: 'Irvington', note: 'Mature ranch-style homes east of Fremont Boulevard, often with original asbestos cement siding ready for James Hardie replacement.' },
    ],
    buildingDeptName: 'City of Fremont Development Services Center',
    buildingDeptNote: 'Online portal with 1-2 week residential re-roof turnaround; over-the-counter approval available for like-for-like replacements with no structural changes.',
    localConsideration: {
      heading: 'Hayward Fault and WUI fringe — what Fremont homes need',
      body: 'The Hayward Fault runs directly through Fremont, with the strongest shaking risk in Mission San Jose and Niles. Re-roofs and additions in these neighborhoods should include diaphragm nailing upgrades, properly fastened sheathing and Simpson hardware at the top plate connection. Hillside parcels above Mission Boulevard also fall on the fringe of Cal Fire State Responsibility Area maps, so we install Class A fire-rated assemblies and ember-resistant vents on those projects by default.',
    },
    cityFaq: {
      question: 'Do I need a permit for a roof replacement in Fremont?',
      answer: 'Yes. The City of Fremont Development Services Center requires a building permit for any roof replacement, including like-for-like re-roofs. Standard residential re-roof permits cost roughly $250-$500 and are typically issued within 1-2 weeks; simple replacements with no structural change can usually be approved over the counter. Hamilton Exteriors pulls and closes the permit, schedules inspection and handles Title 24 cool-roof documentation as part of every project.',
    },
    crossLinks: [
      { label: 'Roofing in Fremont', href: '/service-areas/alameda-county-ca/fremont-ca/roofing' },
      { label: 'Siding in Fremont', href: '/service-areas/alameda-county-ca/fremont-ca/siding' },
      { label: 'ADUs in Fremont', href: '/service-areas/alameda-county-ca/fremont-ca/adu' },
      { label: 'Custom homes in Fremont', href: '/service-areas/alameda-county-ca/fremont-ca/custom-homes' },
      { label: 'Additions in Fremont', href: '/service-areas/alameda-county-ca/fremont-ca/additions' },
      { label: 'Nearby: Union City', href: '/service-areas/alameda-county-ca/union-city-ca' },
      { label: 'Nearby: Hayward', href: '/service-areas/alameda-county-ca/hayward-ca' },
      { label: 'Nearby: Milpitas', href: '/service-areas/santa-clara-county-ca/milpitas-ca' },
    ],
  },
  'hayward': {
    housingNote: 'Hayward has approximately 52,000 housing units spread across flatland and hillside neighborhoods. Homes in the Hayward Hills and Fairview areas often face increased wind exposure that can reduce roof lifespan.',
    permitNote: 'The City of Hayward Building Division requires permits for roof replacement projects. Hayward offers an expedited over-the-counter permit process for straightforward re-roofing jobs, often completing approval the same day.',
    medianHomeValue: '$850,000',
    population: '162,000',
    roofingCostRange: '$10,000–$28,000',
    sidingCostRange: '$14,000–$38,000',
    windowCostRange: '$600–$1,800 per window',
    permitAuthority: 'City of Hayward Building Division',
    permitPhone: '(510) 583-4200',
    fireZone: false,
    topNeighborhoods: ['Hayward Hills', 'Fairview', 'Southgate', 'Tennyson'],
    driveTime: '10 minutes',
    localTip: 'Hayward\'s same-day over-the-counter permit process for standard re-roofs is one of the fastest in the East Bay. This can shave a full week off your project timeline compared to cities that require plan review.',
  },
  'san-leandro': {
    housingNote: 'San Leandro has approximately 31,000 housing units, with a significant portion of the housing stock built in the 1940s-1960s during the post-war suburban expansion. Many of these homes have had one or two roof replacements already.',
    permitNote: 'San Leandro\'s Community Development Department processes residential roofing permits within 5-7 business days on average. The city requires a separate permit for any structural repair discovered during tear-off.',
    medianHomeValue: '$800,000',
    population: '91,000',
    roofingCostRange: '$10,000–$28,000',
    sidingCostRange: '$14,000–$38,000',
    windowCostRange: '$600–$1,800 per window',
    permitAuthority: 'City of San Leandro Community Development Department',
    permitPhone: '(510) 577-3405',
    fireZone: false,
    topNeighborhoods: ['Estudillo Estates', 'Washington Manor', 'Bay-O-Vista', 'Broadmoor'],
    driveTime: '10 minutes',
    localTip: 'San Leandro\'s proximity to the Bay means homes in the western flatlands see more fog and salt air than inland neighborhoods. Choosing corrosion-resistant flashing and galvanized fasteners adds years to your roof in these areas.',
    metaTitle: 'San Leandro Roofing & James Hardie Siding | Hamilton Exteriors (CSLB #1078806)',
    metaDescription: 'San Leandro architect-led contractor for roofing, fiber cement siding, windows and ADUs. Bay-air corrosion detailing, stucco repair and Title 24 cool-roof installs. Free estimate.',
    neighborhoodsServed: [
      { name: 'Estudillo Estates', note: '1920s-1940s Spanish revival and bungalows where original stucco and clay tile often need targeted restoration rather than full replacement.' },
      { name: 'Bay-O-Vista', note: 'Hillside mid-century homes with steep roof pitches and view-line constraints that affect material and color choice.' },
      { name: 'Washington Manor', note: 'Post-war flatland tract homes near the shoreline where bay-air corrosion dictates galvanized or stainless flashing on every re-roof.' },
    ],
    buildingDeptName: 'City of San Leandro Community Development Department',
    buildingDeptNote: 'Roofing permits issued in 5-7 business days; a separate structural permit is required if dry rot or sheathing damage is discovered during tear-off, so we budget that contingency upfront.',
    localConsideration: {
      heading: 'Bay-air corrosion and stucco maintenance in San Leandro',
      body: 'San Leandro\'s western neighborhoods sit within a mile of the bay shoreline, so salt-laden fog accelerates the failure of galvanized flashing, plain-steel fasteners and field-painted stucco. We default to hot-dipped galvanized or stainless fasteners, copper or pre-painted aluminum step flashing and James Hardie ColorPlus fiber cement when replacing original stucco. On older homes we also re-skin chimney saddles and add ice-and-water shield in valleys, which is where coastal moisture quietly rots out 1950s-era roof decks.',
    },
    cityFaq: {
      question: 'Do I need a permit for a roof replacement in San Leandro?',
      answer: 'Yes. San Leandro\'s Community Development Department requires a building permit for every re-roof, including like-for-like asphalt shingle replacements. Standard residential permits are typically issued in 5-7 business days. If we uncover sheathing damage or structural rot during tear-off, the city requires a separate structural repair permit, which we coordinate so the project stays on schedule. We pull the permit in your name and stay onsite for the final inspection.',
    },
    crossLinks: [
      { label: 'Roofing in San Leandro', href: '/service-areas/alameda-county-ca/san-leandro-ca/roofing' },
      { label: 'Siding in San Leandro', href: '/service-areas/alameda-county-ca/san-leandro-ca/siding' },
      { label: 'Windows in San Leandro', href: '/service-areas/alameda-county-ca/san-leandro-ca/windows' },
      { label: 'ADUs in San Leandro', href: '/service-areas/alameda-county-ca/san-leandro-ca/adu' },
      { label: 'Additions in San Leandro', href: '/service-areas/alameda-county-ca/san-leandro-ca/additions' },
      { label: 'Custom homes in San Leandro', href: '/service-areas/alameda-county-ca/san-leandro-ca/custom-homes' },
      { label: 'Nearby: Castro Valley', href: '/service-areas/alameda-county-ca/castro-valley-ca' },
      { label: 'Nearby: Hayward', href: '/service-areas/alameda-county-ca/hayward-ca' },
      { label: 'Nearby: Oakland', href: '/service-areas/alameda-county-ca/oakland-ca' },
    ],
  },
  'castro-valley': {
    housingNote: 'Castro Valley is an unincorporated community of approximately 61,000 residents with roughly 23,000 housing units. Most homes were built between the 1950s and 1970s during the suburban expansion of the East Bay, meaning many roofs and exteriors are original or on their second replacement cycle.',
    permitNote: 'As an unincorporated area, Castro Valley building permits are issued by the Alameda County Building Inspection Department, not a city building department. Permit processing typically takes 5-10 business days for straightforward roof replacements. Hamilton Exteriors handles all county permit applications on your behalf.',
    weatherNote: 'Castro Valley sits in a sheltered inland valley that experiences slightly warmer summers and cooler winters than bayside communities. The area receives about 20 inches of rain annually, and homes in the hillside areas above the valley floor face increased wind exposure.',
    medianHomeValue: '$1,050,000',
    population: '61,000',
    roofingCostRange: '$10,000–$30,000',
    sidingCostRange: '$14,000–$40,000',
    windowCostRange: '$600–$1,800 per window',
    permitAuthority: 'Alameda County Building Inspection Department',
    permitPhone: '(510) 670-5400',
    fireZone: false,
    topNeighborhoods: ['Five Canyons', 'Proctor', 'Palomares Hills', 'Greenridge', 'Castro Village'],
    driveTime: '5 minutes',
    localTip: 'Castro Valley is Hamilton Exteriors\' home base. As an unincorporated community, permits go through Alameda County rather than a city building department. The county process is straightforward and we know the inspectors and requirements well from years of local projects.',
  },
  // Contra Costa County
  'walnut-creek': {
    housingNote: 'Walnut Creek has approximately 33,000 housing units. The city\'s location in the inland East Bay means higher summer temperatures, which can accelerate asphalt shingle aging compared to coastal cities.',
    permitNote: 'Walnut Creek requires building permits for all re-roofing projects. The city is within a Wildland-Urban Interface (WUI) zone, so Class A fire-rated roofing materials are required for many neighborhoods, particularly those adjacent to open space.',
    weatherNote: 'Walnut Creek\'s inland location produces summer highs regularly exceeding 90°F. Metal and tile roofs are increasingly popular here as they better withstand heat cycling. Reflective "cool roof" options can reduce cooling costs by 20-25%.',
    medianHomeValue: '$1,100,000',
    population: '70,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$18,000–$48,000',
    windowCostRange: '$700–$2,200 per window',
    permitAuthority: 'City of Walnut Creek Building Division',
    permitPhone: '(925) 943-5834',
    fireZone: true,
    fireZoneNote: 'Neighborhoods bordering Shell Ridge Open Space, Acalanes Ridge, and the eastern hills are in WUI fire zones. Class A fire-rated materials are mandatory, and defensible space clearance is enforced during inspections.',
    topNeighborhoods: ['Rossmoor', 'Northgate', 'Saranap', 'Lakewood', 'Parkmead'],
    driveTime: '25 minutes',
    localTip: 'Walnut Creek\'s extreme summer heat means cool roof coatings and radiant barrier underlayment deliver real energy savings here — homeowners report 20-25% lower cooling bills after upgrading to reflective roofing materials.',
  },
  'concord': {
    housingNote: 'Concord is one of the largest cities in Contra Costa County with over 45,000 housing units. Large-scale housing developments from the 1960s-1980s in neighborhoods like Dana Estates and Meadow Homes are now reaching the age where roof replacement is a priority.',
    permitNote: 'Concord\'s Building Division offers online permit applications for residential re-roofing. Standard processing time is 5-10 business days, with fees based on project valuation.',
    medianHomeValue: '$700,000',
    population: '129,000',
    roofingCostRange: '$8,000–$22,000',
    sidingCostRange: '$12,000–$35,000',
    windowCostRange: '$500–$1,600 per window',
    permitAuthority: 'City of Concord Building Division',
    permitPhone: '(925) 671-3152',
    fireZone: false,
    topNeighborhoods: ['Dana Estates', 'Meadow Homes', 'Holbrook Heights', 'Lime Ridge'],
    driveTime: '30 minutes',
    localTip: 'Concord\'s online permit portal is one of the most user-friendly in Contra Costa County, allowing contractors to submit and track re-roof permits entirely digitally — which speeds up project start dates.',
  },
  'antioch': {
    housingNote: 'Antioch has experienced significant growth over the past two decades, with many newer homes built after 2000 in the eastern portions of the city. However, older homes in the downtown and Rivertown districts may need roof attention.',
    permitNote: 'The City of Antioch Building Division requires permits for all roof replacements. Antioch is one of the more affordable areas in Contra Costa County, and roofing costs here tend to be slightly lower than in closer-to-Bay cities due to reduced material transport distances.',
    medianHomeValue: '$575,000',
    population: '115,000',
    roofingCostRange: '$8,000–$22,000',
    sidingCostRange: '$10,000–$30,000',
    windowCostRange: '$500–$1,500 per window',
    permitAuthority: 'City of Antioch Building Division',
    permitPhone: '(925) 779-7035',
    fireZone: false,
    topNeighborhoods: ['Rivertown', 'Black Diamond', 'Sand Creek', 'Deer Valley'],
    driveTime: '45 minutes',
    localTip: 'Antioch\'s Delta breeze cools summer evenings but also carries moisture that can promote algae growth on north-facing roof slopes. Algae-resistant shingles with copper granules are a smart choice for homes in this area.',
  },
  'richmond': {
    housingNote: 'Richmond has approximately 38,000 housing units. The city\'s waterfront neighborhoods like Point Richmond and Marina Bay are exposed to salt air and moisture that can reduce the lifespan of certain roofing materials.',
    permitNote: 'Richmond\'s Building Services Division processes residential roofing permits within 5-10 business days. Homes in the Point Richmond and Hilltop districts may have additional historic preservation considerations.',
    medianHomeValue: '$650,000',
    population: '116,000',
    roofingCostRange: '$8,000–$22,000',
    sidingCostRange: '$12,000–$32,000',
    windowCostRange: '$500–$1,600 per window',
    permitAuthority: 'City of Richmond Building Services Division',
    permitPhone: '(510) 620-6511',
    fireZone: false,
    topNeighborhoods: ['Point Richmond', 'Marina Bay', 'Hilltop', 'El Cerrito Hills'],
    driveTime: '35 minutes',
    localTip: 'Richmond\'s bayfront location means salt air exposure is a real factor for roofing longevity. Homes within a mile of the shoreline should use stainless steel or hot-dipped galvanized fasteners to prevent premature corrosion.',
  },
  'san-ramon': {
    housingNote: 'San Ramon is a newer city with most homes built between 1980 and 2010. Many homes in Dougherty Valley and Gale Ranch are approaching or have passed the 20-year mark where roof inspections become essential.',
    permitNote: 'San Ramon\'s Building Division processes permits efficiently, typically within 5-7 business days. The city is partially within a WUI fire zone, requiring Class A fire-rated roofing for affected properties.',
    medianHomeValue: '$1,300,000',
    population: '84,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$18,000–$48,000',
    windowCostRange: '$700–$2,200 per window',
    permitAuthority: 'City of San Ramon Building Division',
    permitPhone: '(925) 973-2560',
    fireZone: true,
    fireZoneNote: 'Homes along the eastern ridgeline near Bollinger Canyon and parts of Dougherty Valley border wildland areas classified as WUI fire zones. Class A fire-rated roofing is required for these properties.',
    topNeighborhoods: ['Dougherty Valley', 'Gale Ranch', 'Bollinger Canyon', 'Canyon Lakes', 'Windemere'],
    driveTime: '20 minutes',
    localTip: 'San Ramon HOAs are among the most active in the Tri-Valley — many have pre-approved color palettes for roofing. Check your CC&Rs before selecting materials, as HOA approval can add 2-3 weeks to your project timeline.',
    metaTitle: 'San Ramon Cool-Roof, Siding & ADU Contractor | Hamilton Exteriors',
    metaDescription: 'Architect-led roofing, James Hardie siding, windows and ADUs in San Ramon, CA. Cool-roof shingles for hot Tri-Valley summers, HOA-friendly color palettes, CSLB #1078806.',
    neighborhoodsServed: [
      { name: 'Dougherty Valley', note: 'Master-planned 1990s-2000s homes with active HOAs and pre-approved color palettes that gate roofing and siding choices.' },
      { name: 'Gale Ranch', note: 'Larger custom production homes with complex rooflines and steep south-facing exposures that benefit from cool-roof granules.' },
      { name: 'Canyon Lakes', note: 'Original 1980s tract homes near the golf course where most original wood-shake roofs have been replaced once and are due again.' },
    ],
    buildingDeptName: 'City of San Ramon Building Division',
    buildingDeptNote: 'Re-roof permits typically issued in 5-7 business days; HOA architectural approval is required for almost every Dougherty Valley and Windemere home and adds 2-3 weeks, so we submit that package in parallel with the city.',
    localConsideration: {
      heading: 'Hot inland summers and cool-roof requirements',
      body: 'San Ramon sits in the inland Tri-Valley where summer highs routinely exceed 95°F and attic temperatures push past 140°F. Title 24 already requires cool-roof rated shingles on most re-roofs in this climate zone, and we go further by specifying GAF Timberline HDZ Reflector Series or TimberCrest cool-color shingles paired with radiant-barrier underlayment and balanced ridge/soffit ventilation. Eastern-ridge homes near Bollinger Canyon also fall inside Cal Fire WUI maps, so we install Class A assemblies, ember-resistant O\'Hagin vents and non-combustible drip edge as a baseline.',
    },
    cityFaq: {
      question: 'Do I need a permit for a roof replacement in San Ramon?',
      answer: 'Yes. The City of San Ramon Building Division requires a permit for every re-roof, and Title 24 cool-roof compliance documentation is required on most homes. Permits typically issue in 5-7 business days. If your home is in Dougherty Valley, Windemere, Gale Ranch or another HOA community, you also need architectural review approval for color and material — we submit both packages in parallel so the project still starts on time.',
    },
    crossLinks: [
      { label: 'Roofing in San Ramon', href: '/service-areas/contra-costa-county-ca/san-ramon-ca/roofing' },
      { label: 'Siding in San Ramon', href: '/service-areas/contra-costa-county-ca/san-ramon-ca/siding' },
      { label: 'Windows in San Ramon', href: '/service-areas/contra-costa-county-ca/san-ramon-ca/windows' },
      { label: 'ADUs in San Ramon', href: '/service-areas/contra-costa-county-ca/san-ramon-ca/adu' },
      { label: 'Additions in San Ramon', href: '/service-areas/contra-costa-county-ca/san-ramon-ca/additions' },
      { label: 'Custom homes in San Ramon', href: '/service-areas/contra-costa-county-ca/san-ramon-ca/custom-homes' },
      { label: 'Nearby: Danville', href: '/service-areas/contra-costa-county-ca/danville-ca' },
      { label: 'Nearby: Walnut Creek', href: '/service-areas/contra-costa-county-ca/walnut-creek-ca' },
      { label: 'Nearby: Pleasanton', href: '/service-areas/alameda-county-ca/pleasanton-ca' },
    ],
  },
  // Marin County
  'san-rafael': {
    housingNote: 'San Rafael is Marin County\'s largest city with approximately 23,000 housing units. The mix of mid-century homes in the Dominican and Gerstle Park neighborhoods alongside newer developments means a wide range of roofing needs.',
    permitNote: 'Marin County and the City of San Rafael both require building permits for roof replacements. San Rafael\'s Community Development Department typically processes residential permits within 1-2 weeks.',
    medianHomeValue: '$1,200,000',
    population: '62,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$18,000–$48,000',
    windowCostRange: '$800–$2,200 per window',
    permitAuthority: 'City of San Rafael Community Development Department',
    permitPhone: '(415) 485-3085',
    fireZone: false,
    topNeighborhoods: ['Dominican', 'Gerstle Park', 'Sun Valley', 'Terra Linda', 'Fair Hills'],
    driveTime: '45 minutes',
    localTip: 'San Rafael\'s Terra Linda neighborhood was one of the first master-planned communities in Marin — most homes there were built in the 1950s-1960s and are on their second or third roof. Original low-slope designs benefit from TPO or modified bitumen instead of standard shingles.',
    metaTitle: 'San Rafael Fiber Cement Siding & Roofing | Hamilton Exteriors (CSLB #1078806)',
    metaDescription: 'San Rafael contractor for fog-resistant fiber cement siding, Class A roofing, windows and ADUs. Serving Dominican, Gerstle Park and Terra Linda. Marin permit and WUI compliance included.',
    neighborhoodsServed: [
      { name: 'Dominican', note: 'Wooded hillside lots near Dominican University with mature oaks shading roofs and accelerating moss and algae buildup.' },
      { name: 'Gerstle Park', note: 'Early-1900s craftsman and Victorian homes with original wood siding and complex multi-pitch roofs that need a careful, code-compliant retrofit.' },
      { name: 'Terra Linda', note: 'Eichler and 1950s low-slope ranches where standard shingles are the wrong material — TPO, modified bitumen or standing-seam metal is the durable answer.' },
    ],
    buildingDeptName: 'City of San Rafael Community Development Department',
    buildingDeptNote: 'Residential re-roof and re-side permits typically issued in 1-2 weeks; properties in the Wildland-Urban Interface overlay (much of west and north San Rafael) require Class A assemblies and ember-resistant venting per Marin County code.',
    localConsideration: {
      heading: 'Fog, mildew and the case for fiber cement in San Rafael',
      body: 'Marin\'s persistent marine layer means San Rafael homes — especially shaded properties in Dominican, Sun Valley and the western canyons — stay damp far longer than inland Bay Area cities. Wood and engineered-wood siding mildew, swell and rot in this climate, and field-painted stucco chalks within a few seasons. We specify James Hardie HardiePlank or HardieShingle ColorPlus fiber cement as the default re-side and pair re-roofs with zinc or copper ridge strips that inhibit moss and algae growth, which alone adds 5-10 years to roof life on shaded lots.',
    },
    cityFaq: {
      question: 'Do I need a permit for a roof replacement in San Rafael?',
      answer: 'Yes. The City of San Rafael Community Development Department requires a building permit for every re-roof, and homes within the Wildland-Urban Interface overlay (much of west and north San Rafael) must use Class A fire-rated assemblies and ember-resistant vents under Marin County code. Standard residential permits are usually issued in 1-2 weeks. We pull and close the permit in your name and handle Marin\'s WUI documentation as part of the project.',
    },
    crossLinks: [
      { label: 'Roofing in San Rafael', href: '/service-areas/marin-county-ca/san-rafael-ca/roofing' },
      { label: 'Siding in San Rafael', href: '/service-areas/marin-county-ca/san-rafael-ca/siding' },
      { label: 'Windows in San Rafael', href: '/service-areas/marin-county-ca/san-rafael-ca/windows' },
      { label: 'ADUs in San Rafael', href: '/service-areas/marin-county-ca/san-rafael-ca/adu' },
      { label: 'Additions in San Rafael', href: '/service-areas/marin-county-ca/san-rafael-ca/additions' },
      { label: 'Custom homes in San Rafael', href: '/service-areas/marin-county-ca/san-rafael-ca/custom-homes' },
      { label: 'Nearby: Mill Valley', href: '/service-areas/marin-county-ca/mill-valley-ca' },
      { label: 'Nearby: Larkspur', href: '/service-areas/marin-county-ca/larkspur-ca' },
      { label: 'Nearby: Novato', href: '/service-areas/marin-county-ca/novato-ca' },
    ],
  },
  'mill-valley': {
    housingNote: 'Mill Valley\'s hillside location and proximity to redwood forests create unique roofing challenges. Homes nestled among trees deal with increased debris accumulation, moisture retention, and limited sun exposure that can promote moss and algae growth.',
    permitNote: 'Mill Valley is within a high fire severity zone. The city requires Class A fire-rated roofing materials for all new and replacement roofs. Composite and metal roofing are popular choices that meet both the fire code and the city\'s aesthetic standards.',
    medianHomeValue: '$1,800,000',
    population: '15,000',
    roofingCostRange: '$15,000–$40,000',
    sidingCostRange: '$22,000–$55,000',
    windowCostRange: '$900–$2,500 per window',
    permitAuthority: 'City of Mill Valley Building Division',
    permitPhone: '(415) 388-4033',
    fireZone: true,
    fireZoneNote: 'All of Mill Valley is classified as a Very High Fire Hazard Severity Zone. Class A fire-rated roofing is mandatory. The city also requires vegetation management within 100 feet of structures and ember-resistant vents.',
    topNeighborhoods: ['Tamalpais Valley', 'Homestead Valley', 'Blithedale Canyon', 'Alto', 'Strawberry'],
    driveTime: '45 minutes',
    localTip: 'Mill Valley\'s canopy cover means many roofs rarely dry out completely during winter months. Zinc or copper ridge strips that inhibit moss and algae growth are a worthwhile add-on — they can prevent the biological damage that shortens roof life by 5-10 years in shaded environments.',
  },
  'novato': {
    housingNote: 'Novato has approximately 20,000 housing units, making it one of the larger communities in Marin County. Many homes in the Hamilton and Bel Marin Keys areas were built in the 1970s-1990s and are due for roof replacement.',
    permitNote: 'The City of Novato requires building permits for all re-roofing projects. Permit processing times are typically 5-10 business days. Novato\'s inland Marin location means summer temperatures are warmer than coastal areas.',
    medianHomeValue: '$950,000',
    population: '55,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$16,000–$45,000',
    windowCostRange: '$700–$2,000 per window',
    permitAuthority: 'City of Novato Community Development Department',
    permitPhone: '(415) 899-8900',
    fireZone: true,
    fireZoneNote: 'Portions of western Novato bordering open space and the Stafford Lake area are designated WUI fire zones. Homes in Indian Valley and Black Point neighborhoods may require Class A fire-rated materials.',
    topNeighborhoods: ['Hamilton', 'Bel Marin Keys', 'Indian Valley', 'Pacheco Valle', 'Loma Verde'],
    driveTime: '55 minutes',
    localTip: 'Novato\'s Hamilton neighborhood is built on the former Hamilton Air Force Base — the flat terrain and uniform lot sizes make it one of the most efficient areas in Marin for roofing crews, often resulting in faster project completion.',
  },
  'larkspur': {
    housingNote: 'Larkspur is a small community with approximately 6,000 housing units. Many homes in this affluent Marin County city feature premium architectural details that require specialized roofing craftsmanship.',
    permitNote: 'Larkspur, like much of Marin County, falls within fire severity zones that require Class A fire-rated roofing. The city\'s historic downtown area may have additional design review requirements for visible roof changes.',
    medianHomeValue: '$1,600,000',
    population: '13,000',
    roofingCostRange: '$15,000–$40,000',
    sidingCostRange: '$20,000–$52,000',
    windowCostRange: '$900–$2,500 per window',
    permitAuthority: 'City of Larkspur Planning Department',
    permitPhone: '(415) 927-5038',
    fireZone: true,
    fireZoneNote: 'Larkspur\'s hillside neighborhoods adjacent to King Mountain and Baltimore Canyon are in Very High Fire Hazard Severity Zones. Class A fire-rated roofing and ember-resistant construction are required.',
    topNeighborhoods: ['Baltimore Park', 'Madrone Canyon', 'Hillview', 'Greenbrae'],
    driveTime: '45 minutes',
    localTip: 'Larkspur\'s narrow, winding hillside streets can make material delivery challenging — coordinating a crane drop for larger roofing projects is common here and should be factored into project planning and cost.',
  },
  // Napa County
  'napa': {
    housingNote: 'The city of Napa has approximately 30,000 housing units. The historic Old Town district features homes from the late 1800s and early 1900s, while newer developments in the Browns Valley and Silverado areas have homes from the 1980s-2000s.',
    permitNote: 'The City of Napa Building Division requires permits for roof replacements. Napa\'s inland valley location produces hot summers, and many homeowners are upgrading to reflective cool roofing to reduce energy costs.',
    weatherNote: 'Napa Valley\'s hot summers (regularly exceeding 95°F) and cool wet winters create significant thermal cycling that stresses roofing materials. Premium architectural shingles and metal roofing handle these temperature swings better than basic 3-tab products.',
    medianHomeValue: '$750,000',
    population: '80,000',
    roofingCostRange: '$10,000–$28,000',
    sidingCostRange: '$14,000–$40,000',
    windowCostRange: '$600–$1,800 per window',
    permitAuthority: 'City of Napa Building Division',
    permitPhone: '(707) 257-9530',
    fireZone: false,
    topNeighborhoods: ['Old Town', 'Browns Valley', 'Silverado', 'Alta Heights', 'Bel Aire'],
    driveTime: '60 minutes',
    localTip: 'Napa\'s valley floor location means dramatic temperature swings — it\'s not unusual to see 40°F mornings and 100°F afternoons in summer. This thermal cycling is harder on roofing than steady heat, making proper underlayment and ventilation critical.',
  },
  'american-canyon': {
    housingNote: 'American Canyon is one of Napa County\'s newest and fastest-growing cities. Much of the housing stock was built after 1990, meaning most homes are not yet at the typical 25-30 year roof replacement threshold.',
    permitNote: 'American Canyon\'s Building Division processes residential roofing permits efficiently. The city\'s newer building codes mean most homes already meet current energy efficiency and fire-resistance requirements.',
    medianHomeValue: '$650,000',
    population: '24,000',
    roofingCostRange: '$8,000–$22,000',
    sidingCostRange: '$12,000–$32,000',
    windowCostRange: '$500–$1,600 per window',
    permitAuthority: 'City of American Canyon Building Division',
    permitPhone: '(707) 647-4360',
    fireZone: false,
    topNeighborhoods: ['Canyon Estates', 'Meadow Park', 'Village Walk', 'Napa Junction'],
    driveTime: '50 minutes',
    localTip: 'American Canyon sits at the southern gateway to Napa Valley where Bay breezes funnel through the Carquinez Strait — sustained winds here are higher than in Napa proper, making wind-rated shingles (130 mph+) a worthwhile upgrade.',
  },
  'st-helena': {
    housingNote: 'St. Helena is a small, affluent Napa Valley city with approximately 2,500 housing units. Many homes here feature premium materials and architectural details that reflect the community\'s high-end character.',
    permitNote: 'St. Helena\'s Community Development Department reviews all building permit applications. The city has strict design guidelines in its historic downtown area that may influence roofing material and color selection.',
    medianHomeValue: '$1,500,000',
    population: '6,100',
    roofingCostRange: '$15,000–$40,000',
    sidingCostRange: '$20,000–$52,000',
    windowCostRange: '$900–$2,500 per window',
    permitAuthority: 'City of St. Helena Community Development Department',
    permitPhone: '(707) 968-2740',
    fireZone: false,
    topNeighborhoods: ['Downtown', 'Vineyard Valley', 'Sulphur Springs', 'Pope Valley Road'],
    driveTime: '75 minutes',
    localTip: 'St. Helena\'s historic downtown district has design review requirements that can affect roofing material and color choices. Natural-looking architectural shingles in earth tones are consistently approved and complement the town\'s wine country aesthetic.',
  },
  'calistoga': {
    housingNote: 'Calistoga is a small community at the northern end of Napa Valley with approximately 2,000 housing units. The combination of hot springs geothermal activity and extreme summer heat creates unique material considerations.',
    permitNote: 'Calistoga requires building permits for roof replacements. The city is surrounded by wildfire-prone areas, and Class A fire-rated roofing materials are strongly recommended for all properties.',
    medianHomeValue: '$900,000',
    population: '5,800',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$16,000–$45,000',
    windowCostRange: '$700–$2,000 per window',
    permitAuthority: 'City of Calistoga Building Department',
    permitPhone: '(707) 942-2763',
    fireZone: true,
    fireZoneNote: 'Calistoga is surrounded by wildland areas and was directly impacted by the 2020 Glass Fire. The city strongly recommends and often requires Class A fire-rated roofing. Metal and composite roofing are increasingly popular post-fire.',
    topNeighborhoods: ['Downtown', 'Tubbs Lane', 'Bennett Lane', 'Foothill'],
    driveTime: '85 minutes',
    localTip: 'After the 2020 Glass Fire, many Calistoga homeowners upgraded to metal or Class A composite roofing. The city\'s experience with wildfire has made fire-resistant materials the default choice, and insurers may offer discounts for verified fire-rated roofs.',
  },
  'yountville': {
    housingNote: 'Yountville is one of the smallest cities in California with approximately 1,500 housing units. The charming town is known for its well-maintained properties and premium home values in the heart of Napa Valley wine country.',
    permitNote: 'Yountville\'s small size means building permit applications receive personalized attention. The town has design review requirements for properties visible from main thoroughfares.',
    medianHomeValue: '$1,200,000',
    population: '3,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$18,000–$48,000',
    windowCostRange: '$800–$2,200 per window',
    permitAuthority: 'Town of Yountville Community Development',
    permitPhone: '(707) 944-8851',
    fireZone: false,
    topNeighborhoods: ['Downtown', 'Vineyard Knolls', 'Yountville Hills', 'Ranch Estates'],
    driveTime: '65 minutes',
    localTip: 'Yountville\'s tiny town government means permit applications are handled personally — expect a more collaborative process than in larger cities. However, design review for properties on Washington Street can add time if your roof is visible from the main road.',
  },
  // Santa Clara County
  'san-jose': {
    housingNote: 'San Jose is the Bay Area\'s largest city with over 330,000 housing units. Neighborhoods like Willow Glen, Rose Garden, and Cambrian feature a mix of pre-war bungalows and mid-century ranch homes that are prime candidates for roof replacement.',
    permitNote: 'The City of San Jose requires building permits for all roof replacements. San Jose offers an online permit portal that has streamlined the application process. Standard residential re-roof permits are typically processed within 1-2 weeks.',
    weatherNote: 'San Jose\'s South Bay location makes it one of the warmest cities in the Bay Area, with summer highs routinely exceeding 85°F. Cool roof materials and proper attic ventilation are especially important here for energy efficiency.',
    medianHomeValue: '$1,300,000',
    population: '1,013,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$18,000–$48,000',
    windowCostRange: '$700–$2,200 per window',
    permitAuthority: 'City of San Jose Department of Planning, Building and Code Enforcement',
    permitPhone: '(408) 535-3555',
    fireZone: false,
    topNeighborhoods: ['Willow Glen', 'Rose Garden', 'Cambrian', 'Almaden Valley', 'Evergreen'],
    driveTime: '35 minutes',
    localTip: 'San Jose\'s online permit system is one of the most advanced in the Bay Area — re-roof permits can be submitted, tracked, and approved entirely online, often cutting a week off the traditional timeline.',
  },
  'palo-alto': {
    housingNote: 'Palo Alto has approximately 27,000 housing units. The city\'s prestigious neighborhoods — including Old Palo Alto, Professorville, and Crescent Park — feature many historic homes with complex rooflines that require expert craftsmanship.',
    permitNote: 'Palo Alto has some of the most rigorous building permit requirements in the Bay Area. The city\'s Development Services Department conducts detailed plan review, and properties in the Professorville Historic District may need Architectural Review Board approval.',
    medianHomeValue: '$3,500,000',
    population: '68,000',
    roofingCostRange: '$15,000–$40,000',
    sidingCostRange: '$25,000–$60,000',
    windowCostRange: '$1,000–$2,800 per window',
    permitAuthority: 'City of Palo Alto Development Services Department',
    permitPhone: '(650) 329-2496',
    fireZone: false,
    topNeighborhoods: ['Old Palo Alto', 'Professorville', 'Crescent Park', 'Barron Park', 'College Terrace'],
    driveTime: '40 minutes',
    localTip: 'Palo Alto\'s Architectural Review Board process for historic districts can add 4-6 weeks to a roofing project. If your home is in Professorville or a designated historic zone, starting the review process early is critical to staying on schedule.',
  },
  'mountain-view': {
    housingNote: 'Mountain View has approximately 33,000 housing units. Rapid tech-driven growth has increased demand for home improvements. Many ranch-style homes in the Cuesta Park and Waverly Park neighborhoods were built in the 1950s-1960s and are past due for roof replacement.',
    permitNote: 'Mountain View\'s Community Development Department processes residential roofing permits within 5-10 business days. The city has a Title 24 energy compliance requirement for all re-roofing projects.',
    medianHomeValue: '$2,000,000',
    population: '82,000',
    roofingCostRange: '$15,000–$40,000',
    sidingCostRange: '$22,000–$55,000',
    windowCostRange: '$900–$2,500 per window',
    permitAuthority: 'City of Mountain View Community Development Department',
    permitPhone: '(650) 903-6313',
    fireZone: false,
    topNeighborhoods: ['Cuesta Park', 'Waverly Park', 'Old Mountain View', 'Rex Manor', 'Martens-Carmelita'],
    driveTime: '40 minutes',
    localTip: 'Mountain View strictly enforces Title 24 cool roof requirements for re-roofing. Choose shingles with a solar reflectance index (SRI) of 16 or higher to pass inspection — this eliminates most dark-colored options unless you use specially coated products.',
  },
  'sunnyvale': {
    housingNote: 'Sunnyvale has approximately 55,000 housing units, many built during the 1950s-1970s tech boom. The Lakewood, Sunnyvale West, and Cherry Chase neighborhoods have a high concentration of homes in the 30-50 year age range where roof replacement is overdue.',
    permitNote: 'Sunnyvale\'s Building Division offers streamlined permit processing for residential re-roofing. Online applications are available, with standard turnaround of 5-7 business days.',
    medianHomeValue: '$1,800,000',
    population: '155,000',
    roofingCostRange: '$15,000–$40,000',
    sidingCostRange: '$20,000–$52,000',
    windowCostRange: '$800–$2,200 per window',
    permitAuthority: 'City of Sunnyvale Building Division',
    permitPhone: '(408) 730-7444',
    fireZone: false,
    topNeighborhoods: ['Lakewood', 'Sunnyvale West', 'Cherry Chase', 'Ponderosa', 'Birdland'],
    driveTime: '35 minutes',
    localTip: 'Sunnyvale\'s "Birdland" neighborhood (streets named after birds) has one of the highest concentrations of original 1950s roofs in the South Bay. Many of these low-pitch roofs need modified bitumen or TPO instead of standard architectural shingles.',
  },
  'cupertino': {
    housingNote: 'Cupertino has approximately 21,000 housing units. The city\'s excellent school district drives high property values, making roof maintenance and replacement a smart investment in protecting home equity.',
    permitNote: 'Cupertino requires building permits for all re-roofing projects. The city\'s Building Division typically processes residential permits within 5-10 business days.',
    medianHomeValue: '$2,500,000',
    population: '60,000',
    roofingCostRange: '$15,000–$40,000',
    sidingCostRange: '$22,000–$55,000',
    windowCostRange: '$900–$2,500 per window',
    permitAuthority: 'City of Cupertino Building Division',
    permitPhone: '(408) 777-3228',
    fireZone: false,
    topNeighborhoods: ['Rancho Rinconada', 'Monta Vista', 'Oak Valley', 'Garden Gate', 'Seven Springs'],
    driveTime: '40 minutes',
    localTip: 'Cupertino\'s top-rated school district means home values are among the highest in Santa Clara County. A new roof with premium architectural shingles consistently ranks as one of the best ROI home improvements here, recovering 65-70% of cost at resale.',
  },
  'santa-clara': {
    housingNote: 'The city of Santa Clara has approximately 43,000 housing units. Older neighborhoods near Santa Clara University and the downtown area feature homes from the 1930s-1960s, while newer developments in north Santa Clara date to the 1990s-2000s.',
    permitNote: 'Santa Clara\'s Planning and Building Division requires permits for roof replacements. The city offers both online and in-person permit applications with typical processing times of 5-7 business days.',
    medianHomeValue: '$1,500,000',
    population: '127,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$18,000–$48,000',
    windowCostRange: '$700–$2,200 per window',
    permitAuthority: 'City of Santa Clara Planning and Building Division',
    permitPhone: '(408) 615-2450',
    fireZone: false,
    topNeighborhoods: ['Old Quad', 'University Park', 'Pomeroy Green', 'Rivermark', 'Northside'],
    driveTime: '35 minutes',
    localTip: 'Santa Clara\'s Old Quad neighborhood near the university has some of the oldest homes in the South Bay — many with original clay tile roofs from the 1920s-1930s. Tile restoration rather than full replacement is often possible and preserves historic character.',
  },
  'saratoga': {
    housingNote: 'Saratoga is an affluent community with approximately 11,000 housing units. Many homes in this hillside city feature large roof areas and complex architectural designs including multi-level rooflines, dormers, and steep pitches.',
    permitNote: 'Saratoga\'s Community Development Department processes building permits for residential projects. The city\'s hillside location means many homes are in WUI fire zones, requiring Class A fire-rated roofing materials.',
    medianHomeValue: '$3,200,000',
    population: '31,000',
    roofingCostRange: '$15,000–$40,000',
    sidingCostRange: '$25,000–$60,000',
    windowCostRange: '$1,000–$2,800 per window',
    permitAuthority: 'City of Saratoga Community Development Department',
    permitPhone: '(408) 868-1222',
    fireZone: true,
    fireZoneNote: 'Homes in the western foothills along the Monte Sereno border and near Saratoga Gap are in WUI fire zones. Class A fire-rated roofing and ember-resistant vents are required. The 2020 CZU Lightning Complex fire heightened awareness.',
    topNeighborhoods: ['Saratoga Woods', 'Saratoga Country Club', 'Brookglen', 'Azule', 'Quito Village'],
    driveTime: '40 minutes',
    localTip: 'Saratoga\'s large custom homes often have 3,000+ sq ft roof areas with complex geometry — steep pitches, multiple dormers, and valleys. These projects require detailed planning and typically take 5-7 days versus the 2-3 days typical for simpler homes.',
  },
  'los-gatos': {
    housingNote: 'Los Gatos has approximately 12,000 housing units. The charming downtown area features historic homes from the early 1900s, while hillside neighborhoods offer larger custom homes with premium roofing requirements.',
    permitNote: 'Los Gatos requires building permits for all roof replacements. Properties in the Historic Preservation Zone have additional review requirements to ensure roofing materials are compatible with the home\'s architectural character.',
    medianHomeValue: '$2,200,000',
    population: '33,000',
    roofingCostRange: '$15,000–$40,000',
    sidingCostRange: '$22,000–$55,000',
    windowCostRange: '$900–$2,500 per window',
    permitAuthority: 'Town of Los Gatos Community Development Department',
    permitPhone: '(408) 354-6874',
    fireZone: true,
    fireZoneNote: 'Hillside neighborhoods in the Santa Cruz Mountains foothills, including areas near Lexington Reservoir, are in designated WUI fire zones. Class A fire-rated materials are required, and brush clearance is enforced.',
    topNeighborhoods: ['Downtown', 'Almond Grove', 'Blossom Hill', 'Shannon', 'Monte Sereno border'],
    driveTime: '40 minutes',
    localTip: 'Los Gatos\'s Historic Preservation Zone covers much of downtown — roofing projects on designated properties require compatibility review. Natural wood shake look-alikes in composite material are the most popular approved alternative to original wood roofs.',
  },
  'campbell': {
    housingNote: 'Campbell has approximately 17,000 housing units. The city\'s central Silicon Valley location and mid-century housing stock — many homes built between 1950 and 1975 — make it a hub for roof replacement activity.',
    permitNote: 'Campbell\'s Community Development Department processes residential roofing permits efficiently, typically within 5-7 business days. The city follows standard Santa Clara County building codes for re-roofing projects.',
    medianHomeValue: '$1,400,000',
    population: '43,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$18,000–$48,000',
    windowCostRange: '$700–$2,200 per window',
    permitAuthority: 'City of Campbell Community Development Department',
    permitPhone: '(408) 866-2140',
    fireZone: false,
    topNeighborhoods: ['Downtown', 'Ainsley Park', 'Hacienda', 'San Tomas', 'White Oaks'],
    driveTime: '35 minutes',
    localTip: 'Campbell\'s compact downtown and flat terrain make it one of the easiest cities in the South Bay for roofing logistics — easy material delivery, no steep access roads, and straightforward permit processing. Projects here often come in on the lower end of cost estimates.',
  },
  'milpitas': {
    housingNote: 'Milpitas has approximately 22,000 housing units. The city has seen significant new construction in the past decade, but older neighborhoods in the Sunnyhills and Calaveras Hills areas have homes from the 1960s-1980s that are approaching roof replacement age.',
    permitNote: 'Milpitas offers online building permit applications for residential re-roofing through its Building Safety Division. Standard processing time is 5-7 business days.',
    medianHomeValue: '$1,200,000',
    population: '80,000',
    roofingCostRange: '$12,000–$32,000',
    sidingCostRange: '$16,000–$45,000',
    windowCostRange: '$700–$2,000 per window',
    permitAuthority: 'City of Milpitas Building Safety Division',
    permitPhone: '(408) 586-3240',
    fireZone: false,
    topNeighborhoods: ['Sunnyhills', 'Calaveras Hills', 'Summitpointe', 'Augustine', 'Berryessa'],
    driveTime: '25 minutes',
    localTip: 'Milpitas is the closest Santa Clara County city to Castro Valley, making it our most efficient South Bay service area. The shorter drive means lower mobilization costs — savings we pass on to homeowners.',
  },
};

/**
 * Get local facts for a city.
 * Accepts slugs with or without -ca suffix.
 */
export function getCityLocalFacts(citySlug: string): CityFacts | undefined {
  const normalized = citySlug.replace(/-ca$/, '');
  return CITY_FACTS[normalized];
}

/**
 * Per-county overrides for unique title/meta and county-page specific content.
 * Keyed by full county slug (e.g. "santa-clara-county-ca"). All optional.
 */
const COUNTY_OVERRIDES: Record<string, CountyOverride> = {
  'santa-clara-county-ca': {
    metaTitle: 'Santa Clara County Roofing, Siding & ADUs | Hamilton Exteriors (CSLB #1078806)',
    metaDescription: 'Architect-led roofing, James Hardie siding, windows, ADUs and custom homes across Santa Clara County. San Jose, Palo Alto, Mountain View, Sunnyvale, Cupertino, Saratoga and Los Gatos. Title 24 cool-roof and WUI compliance built in.',
    cityComparison: [
      { name: 'San Jose', href: '/service-areas/santa-clara-county-ca/san-jose-ca', note: 'South Bay\'s largest city, online permit portal, hot summers favor cool-roof shingles and tile.' },
      { name: 'Palo Alto', href: '/service-areas/santa-clara-county-ca/palo-alto-ca', note: 'Strict Architectural Review Board for historic districts (Professorville, Crescent Park) — plan 4-6 extra weeks.' },
      { name: 'Mountain View', href: '/service-areas/santa-clara-county-ca/mountain-view-ca', note: 'Strict Title 24 enforcement; SRI 16+ cool-roof shingles required on most re-roofs.' },
      { name: 'Sunnyvale', href: '/service-areas/santa-clara-county-ca/sunnyvale-ca', note: 'Streamlined online permits in 5-7 days; many original 1950s-1970s low-pitch roofs need TPO, not shingles.' },
      { name: 'Cupertino', href: '/service-areas/santa-clara-county-ca/cupertino-ca', note: 'High-value market where premium architectural shingles deliver the best resale ROI.' },
      { name: 'Saratoga', href: '/service-areas/santa-clara-county-ca/saratoga-ca', note: 'Hillside WUI fire zones require Class A assemblies, ember-resistant vents and defensible space.' },
      { name: 'Los Gatos', href: '/service-areas/santa-clara-county-ca/los-gatos-ca', note: 'Historic Preservation Zone in downtown — composite shake look-alikes are the standard approved upgrade.' },
      { name: 'Milpitas', href: '/service-areas/santa-clara-county-ca/milpitas-ca', note: 'Closest South Bay city to our Castro Valley shop, online permits in about a week.' },
    ],
    countyPermitContext: {
      heading: 'Santa Clara County permit context',
      body: 'Permitting is generally efficient across Santa Clara County. San Jose\'s Department of Planning, Building and Code Enforcement runs an express over-the-counter track for like-for-like re-roofs, while Palo Alto\'s Architectural Review Board can add four to six weeks for projects in Professorville and Crescent Park historic districts. Mountain View and Sunnyvale both enforce Title 24 cool-roof requirements (SRI 16+) on most re-roofs, and the western foothills of Los Gatos and Saratoga sit in Cal Fire WUI zones requiring Class A roof assemblies, ember-resistant vents and defensible-space inspections. Hamilton Exteriors pulls every permit in your name, schedules inspections and handles WUI documentation as part of the project.',
    },
  },
};

/**
 * Get county-level overrides (title, meta, comparison block, permit context).
 * Accepts the full county slug e.g. "santa-clara-county-ca".
 */
export function getCountyOverride(countySlug: string): CountyOverride | undefined {
  return COUNTY_OVERRIDES[countySlug];
}
