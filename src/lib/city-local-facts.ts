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
}

const CITY_FACTS: Record<string, CityFacts> = {
  // Alameda County
  'oakland': {
    housingNote: 'Oakland has over 150,000 housing units, with roughly 60% of homes built before 1960. Many older neighborhoods like Rockridge, Temescal, and Montclair have original roofing that is past its expected 25-30 year lifespan.',
    permitNote: 'Oakland requires building permits for roof replacements. Permit fees typically range from $200 to $600 depending on project valuation. The City of Oakland Building Bureau processes most residential roofing permits within 5-10 business days.',
    weatherNote: 'Oakland receives approximately 23 inches of rain annually, concentrated between November and March. The mild Mediterranean climate is ideal for asphalt shingles, though hillside homes in the Oakland Hills should consider Class A fire-rated materials per California WUI zone requirements.',
  },
  'berkeley': {
    housingNote: 'Berkeley has approximately 47,000 housing units. The city\'s historic neighborhoods — including the Elmwood, Rockridge, and Thousand Oaks districts — feature many Craftsman-style homes from the early 1900s that require specialized roofing care.',
    permitNote: 'The City of Berkeley requires permits for all roof replacements and re-roofing projects. Berkeley is known for thorough plan review, so homeowners should expect 2-3 weeks for permit processing. Hamilton Exteriors handles all permit applications on your behalf.',
    weatherNote: 'Berkeley\'s proximity to the Bay creates microclimates that vary by neighborhood — hilltop homes experience more wind exposure while flatland areas see more fog moisture. Both conditions affect shingle longevity and material selection.',
  },
  'fremont': {
    housingNote: 'Fremont is the fourth-largest city in the Bay Area with over 75,000 housing units. Many homes in the Warm Springs, Mission San Jose, and Irvington districts were built between 1960 and 1990, putting them at the age where roof replacement becomes necessary.',
    permitNote: 'Fremont\'s Development Services Center typically processes residential roofing permits within 1-2 weeks. Permit fees are based on project valuation and generally range from $250 to $500 for a standard re-roof.',
  },
  'hayward': {
    housingNote: 'Hayward has approximately 52,000 housing units spread across flatland and hillside neighborhoods. Homes in the Hayward Hills and Fairview areas often face increased wind exposure that can reduce roof lifespan.',
    permitNote: 'The City of Hayward Building Division requires permits for roof replacement projects. Hayward offers an expedited over-the-counter permit process for straightforward re-roofing jobs, often completing approval the same day.',
  },
  'san-leandro': {
    housingNote: 'San Leandro has approximately 31,000 housing units, with a significant portion of the housing stock built in the 1940s-1960s during the post-war suburban expansion. Many of these homes have had one or two roof replacements already.',
    permitNote: 'San Leandro\'s Community Development Department processes residential roofing permits within 5-7 business days on average. The city requires a separate permit for any structural repair discovered during tear-off.',
  },
  // Contra Costa County
  'walnut-creek': {
    housingNote: 'Walnut Creek has approximately 33,000 housing units. The city\'s location in the inland East Bay means higher summer temperatures, which can accelerate asphalt shingle aging compared to coastal cities.',
    permitNote: 'Walnut Creek requires building permits for all re-roofing projects. The city is within a Wildland-Urban Interface (WUI) zone, so Class A fire-rated roofing materials are required for many neighborhoods, particularly those adjacent to open space.',
    weatherNote: 'Walnut Creek\'s inland location produces summer highs regularly exceeding 90\u00B0F. Metal and tile roofs are increasingly popular here as they better withstand heat cycling. Reflective "cool roof" options can reduce cooling costs by 20-25%.',
  },
  'concord': {
    housingNote: 'Concord is one of the largest cities in Contra Costa County with over 45,000 housing units. Large-scale housing developments from the 1960s-1980s in neighborhoods like Dana Estates and Meadow Homes are now reaching the age where roof replacement is a priority.',
    permitNote: 'Concord\'s Building Division offers online permit applications for residential re-roofing. Standard processing time is 5-10 business days, with fees based on project valuation.',
  },
  'antioch': {
    housingNote: 'Antioch has experienced significant growth over the past two decades, with many newer homes built after 2000 in the eastern portions of the city. However, older homes in the downtown and Rivertown districts may need roof attention.',
    permitNote: 'The City of Antioch Building Division requires permits for all roof replacements. Antioch is one of the more affordable areas in Contra Costa County, and roofing costs here tend to be slightly lower than in closer-to-Bay cities due to reduced material transport distances.',
  },
  'richmond': {
    housingNote: 'Richmond has approximately 38,000 housing units. The city\'s waterfront neighborhoods like Point Richmond and Marina Bay are exposed to salt air and moisture that can reduce the lifespan of certain roofing materials.',
    permitNote: 'Richmond\'s Building Services Division processes residential roofing permits within 5-10 business days. Homes in the Point Richmond and Hilltop districts may have additional historic preservation considerations.',
  },
  'san-ramon': {
    housingNote: 'San Ramon is a newer city with most homes built between 1980 and 2010. Many homes in Dougherty Valley and Gale Ranch are approaching or have passed the 20-year mark where roof inspections become essential.',
    permitNote: 'San Ramon\'s Building Division processes permits efficiently, typically within 5-7 business days. The city is partially within a WUI fire zone, requiring Class A fire-rated roofing for affected properties.',
  },
  // Marin County
  'san-rafael': {
    housingNote: 'San Rafael is Marin County\'s largest city with approximately 23,000 housing units. The mix of mid-century homes in the Dominican and Gerstle Park neighborhoods alongside newer developments means a wide range of roofing needs.',
    permitNote: 'Marin County and the City of San Rafael both require building permits for roof replacements. San Rafael\'s Community Development Department typically processes residential permits within 1-2 weeks.',
  },
  'mill-valley': {
    housingNote: 'Mill Valley\'s hillside location and proximity to redwood forests create unique roofing challenges. Homes nestled among trees deal with increased debris accumulation, moisture retention, and limited sun exposure that can promote moss and algae growth.',
    permitNote: 'Mill Valley is within a high fire severity zone. The city requires Class A fire-rated roofing materials for all new and replacement roofs. Composite and metal roofing are popular choices that meet both the fire code and the city\'s aesthetic standards.',
  },
  'novato': {
    housingNote: 'Novato has approximately 20,000 housing units, making it one of the larger communities in Marin County. Many homes in the Hamilton and Bel Marin Keys areas were built in the 1970s-1990s and are due for roof replacement.',
    permitNote: 'The City of Novato requires building permits for all re-roofing projects. Permit processing times are typically 5-10 business days. Novato\'s inland Marin location means summer temperatures are warmer than coastal areas.',
  },
  'larkspur': {
    housingNote: 'Larkspur is a small community with approximately 6,000 housing units. Many homes in this affluent Marin County city feature premium architectural details that require specialized roofing craftsmanship.',
    permitNote: 'Larkspur, like much of Marin County, falls within fire severity zones that require Class A fire-rated roofing. The city\'s historic downtown area may have additional design review requirements for visible roof changes.',
  },
  // Napa County
  'napa': {
    housingNote: 'The city of Napa has approximately 30,000 housing units. The historic Old Town district features homes from the late 1800s and early 1900s, while newer developments in the Browns Valley and Silverado areas have homes from the 1980s-2000s.',
    permitNote: 'The City of Napa Building Division requires permits for roof replacements. Napa\'s inland valley location produces hot summers, and many homeowners are upgrading to reflective cool roofing to reduce energy costs.',
    weatherNote: 'Napa Valley\'s hot summers (regularly exceeding 95\u00B0F) and cool wet winters create significant thermal cycling that stresses roofing materials. Premium architectural shingles and metal roofing handle these temperature swings better than basic 3-tab products.',
  },
  'american-canyon': {
    housingNote: 'American Canyon is one of Napa County\'s newest and fastest-growing cities. Much of the housing stock was built after 1990, meaning most homes are not yet at the typical 25-30 year roof replacement threshold.',
    permitNote: 'American Canyon\'s Building Division processes residential roofing permits efficiently. The city\'s newer building codes mean most homes already meet current energy efficiency and fire-resistance requirements.',
  },
  'st-helena': {
    housingNote: 'St. Helena is a small, affluent Napa Valley city with approximately 2,500 housing units. Many homes here feature premium materials and architectural details that reflect the community\'s high-end character.',
    permitNote: 'St. Helena\'s Community Development Department reviews all building permit applications. The city has strict design guidelines in its historic downtown area that may influence roofing material and color selection.',
  },
  'calistoga': {
    housingNote: 'Calistoga is a small community at the northern end of Napa Valley with approximately 2,000 housing units. The combination of hot springs geothermal activity and extreme summer heat creates unique material considerations.',
    permitNote: 'Calistoga requires building permits for roof replacements. The city is surrounded by wildfire-prone areas, and Class A fire-rated roofing materials are strongly recommended for all properties.',
  },
  'yountville': {
    housingNote: 'Yountville is one of the smallest cities in California with approximately 1,500 housing units. The charming town is known for its well-maintained properties and premium home values in the heart of Napa Valley wine country.',
    permitNote: 'Yountville\'s small size means building permit applications receive personalized attention. The town has design review requirements for properties visible from main thoroughfares.',
  },
  // Santa Clara County
  'san-jose': {
    housingNote: 'San Jose is the Bay Area\'s largest city with over 330,000 housing units. Neighborhoods like Willow Glen, Rose Garden, and Cambrian feature a mix of pre-war bungalows and mid-century ranch homes that are prime candidates for roof replacement.',
    permitNote: 'The City of San Jose requires building permits for all roof replacements. San Jose offers an online permit portal that has streamlined the application process. Standard residential re-roof permits are typically processed within 1-2 weeks.',
    weatherNote: 'San Jose\'s South Bay location makes it one of the warmest cities in the Bay Area, with summer highs routinely exceeding 85\u00B0F. Cool roof materials and proper attic ventilation are especially important here for energy efficiency.',
  },
  'palo-alto': {
    housingNote: 'Palo Alto has approximately 27,000 housing units. The city\'s prestigious neighborhoods — including Old Palo Alto, Professorville, and Crescent Park — feature many historic homes with complex rooflines that require expert craftsmanship.',
    permitNote: 'Palo Alto has some of the most rigorous building permit requirements in the Bay Area. The city\'s Development Services Department conducts detailed plan review, and properties in the Professorville Historic District may need Architectural Review Board approval.',
  },
  'mountain-view': {
    housingNote: 'Mountain View has approximately 33,000 housing units. Rapid tech-driven growth has increased demand for home improvements. Many ranch-style homes in the Cuesta Park and Waverly Park neighborhoods were built in the 1950s-1960s and are past due for roof replacement.',
    permitNote: 'Mountain View\'s Community Development Department processes residential roofing permits within 5-10 business days. The city has a Title 24 energy compliance requirement for all re-roofing projects.',
  },
  'sunnyvale': {
    housingNote: 'Sunnyvale has approximately 55,000 housing units, many built during the 1950s-1970s tech boom. The Lakewood, Sunnyvale West, and Cherry Chase neighborhoods have a high concentration of homes in the 30-50 year age range where roof replacement is overdue.',
    permitNote: 'Sunnyvale\'s Building Division offers streamlined permit processing for residential re-roofing. Online applications are available, with standard turnaround of 5-7 business days.',
  },
  'cupertino': {
    housingNote: 'Cupertino has approximately 21,000 housing units. The city\'s excellent school district drives high property values, making roof maintenance and replacement a smart investment in protecting home equity.',
    permitNote: 'Cupertino requires building permits for all re-roofing projects. The city\'s Building Division typically processes residential permits within 5-10 business days.',
  },
  'santa-clara': {
    housingNote: 'The city of Santa Clara has approximately 43,000 housing units. Older neighborhoods near Santa Clara University and the downtown area feature homes from the 1930s-1960s, while newer developments in north Santa Clara date to the 1990s-2000s.',
    permitNote: 'Santa Clara\'s Planning and Building Division requires permits for roof replacements. The city offers both online and in-person permit applications with typical processing times of 5-7 business days.',
  },
  'saratoga': {
    housingNote: 'Saratoga is an affluent community with approximately 11,000 housing units. Many homes in this hillside city feature large roof areas and complex architectural designs including multi-level rooflines, dormers, and steep pitches.',
    permitNote: 'Saratoga\'s Community Development Department processes building permits for residential projects. The city\'s hillside location means many homes are in WUI fire zones, requiring Class A fire-rated roofing materials.',
  },
  'los-gatos': {
    housingNote: 'Los Gatos has approximately 12,000 housing units. The charming downtown area features historic homes from the early 1900s, while hillside neighborhoods offer larger custom homes with premium roofing requirements.',
    permitNote: 'Los Gatos requires building permits for all roof replacements. Properties in the Historic Preservation Zone have additional review requirements to ensure roofing materials are compatible with the home\'s architectural character.',
  },
  'campbell': {
    housingNote: 'Campbell has approximately 17,000 housing units. The city\'s central Silicon Valley location and mid-century housing stock — many homes built between 1950 and 1975 — make it a hub for roof replacement activity.',
    permitNote: 'Campbell\'s Community Development Department processes residential roofing permits efficiently, typically within 5-7 business days. The city follows standard Santa Clara County building codes for re-roofing projects.',
  },
  'milpitas': {
    housingNote: 'Milpitas has approximately 22,000 housing units. The city has seen significant new construction in the past decade, but older neighborhoods in the Sunnyhills and Calaveras Hills areas have homes from the 1960s-1980s that are approaching roof replacement age.',
    permitNote: 'Milpitas offers online building permit applications for residential re-roofing through its Building Safety Division. Standard processing time is 5-7 business days.',
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
