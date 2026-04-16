/**
 * Location-specific FAQ content per county.
 *
 * These FAQs reference real local factors: fire zones, building codes,
 * climate conditions, permit processes, soil types, and regulations
 * that vary by county across the Bay Area.
 */

interface FAQ {
  question: string;
  answer: string;
}

/**
 * County-level FAQ mapping using short county slugs (e.g., "alameda").
 * Also accepts URL-form slugs ("alameda-county-ca") and normalizes them.
 */
export function getCountyLocalFaqs(
  countySlug: string,
  city: string,
  county: string,
): FAQ[] {
  // Normalize URL-form slugs to short form
  const short = countySlug.replace(/-county-ca$/, '');

  const faqsByCounty: Record<string, FAQ[]> = {
    'alameda': [
      {
        question: `Do ${city} homes need seismic upgrades when replacing a roof?`,
        answer: `Many older homes in ${city} and Alameda County were built before modern seismic codes. While a roof replacement alone doesn't trigger a seismic retrofit requirement, it's the ideal time to reinforce roof-to-wall connections — especially for homes near the Hayward Fault, which runs directly through the East Bay. Hamilton Exteriors uses Simpson Strong-Tie hurricane clips on every roof we install, which improves earthquake resistance and meets California's latest building standards at no extra cost.`,
      },
      {
        question: `Are there fire-hardening requirements for roofing in ${city}?`,
        answer: `Yes. Parts of ${city} and the East Bay Hills fall within Cal Fire's Very High Fire Hazard Severity Zones (VHFHSZ). After the 1991 Oakland Hills firestorm destroyed over 3,000 homes, Alameda County adopted some of the strictest fire-hardening rules in the state. Homes in these zones must use Class A fire-rated roofing materials — which includes the asphalt, metal, and tile options Hamilton Exteriors installs. We also ensure compliant ember-resistant vents and proper defensible space around the roofline.`,
      },
      {
        question: `How does ${city}'s proximity to the Bay affect exterior materials?`,
        answer: `Homes in western ${city} and the Alameda County flatlands sit close to San Francisco Bay, where salt-laden marine air accelerates corrosion on metal flashing, fasteners, and gutters. We use stainless steel or hot-dipped galvanized fasteners on Bay-facing homes rather than standard electro-galvanized hardware. For siding, James Hardie fiber cement resists salt damage far better than wood or vinyl. Our material recommendations factor in your home's specific exposure — a hillside home in the East Bay Hills faces different conditions than a flatland home near the Bay.`,
      },
      {
        question: `What is the permit process for exterior work in Alameda County?`,
        answer: `Alameda County uses a two-tier permit system. Cities like Oakland, Berkeley, and Fremont issue their own building permits through their local building departments, while unincorporated areas go through Alameda County Planning. Roof replacements, siding, and window changes all require permits in ${city}. Hamilton Exteriors handles the full permit process — application, plan submittal, and all required inspections. Typical turnaround is 5–10 business days for standard re-roofing permits, though Oakland and Berkeley can take longer during peak season.`,
      },
    ],
    'contra-costa': [
      {
        question: `What roofing materials work best for ${city}'s hot inland summers?`,
        answer: `Contra Costa County's inland valleys regularly hit 95–105°F in summer, which is 15–20 degrees warmer than San Francisco. This heat accelerates shingle granule loss and shortens roof life by several years compared to coastal Bay Area homes. We recommend cool-roof-rated asphalt shingles (like Owens Corning Duration COOL or GAF Timberline CS) that meet California's Title 24 energy code and reflect solar heat. Metal roofing is another strong choice for ${city} — it reflects up to 70% of solar radiant heat and lasts 40–70 years despite the temperature extremes.`,
      },
      {
        question: `Does ${city} have wildfire risk that affects roofing requirements?`,
        answer: `Yes. Eastern Contra Costa County — particularly areas near Mt. Diablo, the Briones hills, and the Concord–Walnut Creek ridge — falls within Cal Fire's Very High Fire Hazard Severity Zones. ${city} homeowners in mapped fire zones must use Class A fire-rated roofing and ember-resistant vents when replacing a roof. Even outside fire zones, Contra Costa County's dry grass hills create real wildfire risk during fire season (June–November). Hamilton Exteriors installs Class A fire-rated materials as our standard across all Contra Costa projects.`,
      },
      {
        question: `How does the Contra Costa County building department handle permits?`,
        answer: `Contra Costa County has a unique split system. Incorporated cities like ${city}, Walnut Creek, Concord, and San Ramon run their own building departments. Unincorporated areas (Alamo, Blackhawk, Bay Point, El Sobrante) go through the Contra Costa County Department of Conservation and Development in Martinez. Hamilton Exteriors knows which jurisdiction covers your address and handles the correct permit application, plan review, and inspection scheduling. Standard re-roof permits in most Contra Costa cities take 3–7 business days.`,
      },
      {
        question: `Are there HOA restrictions on exterior work in ${city}?`,
        answer: `Many Contra Costa County communities — particularly newer developments in San Ramon, Walnut Creek, and parts of ${city} — have active HOAs with exterior modification rules covering roof color, siding material, and window style. Some HOAs require architectural review board approval before any exterior changes. Hamilton Exteriors routinely works with Contra Costa HOAs and can submit material samples and color selections for pre-approval before work begins. We keep copies of common CC&R requirements for major ${county} County HOAs on file.`,
      },
    ],
    'marin': [
      {
        question: `Does ${city} have design review requirements for exterior work?`,
        answer: `Yes. Most Marin County communities have design review or architectural review processes that apply to exterior changes — especially in hillside zones, ridgeline view corridors, and historic districts. ${city} projects may require approval from the Marin County Community Development Agency or a local design review board before building permits are issued. The review looks at materials, colors, bulk, and neighborhood compatibility. Hamilton Exteriors is experienced with Marin's review process and prepares material boards and elevation drawings that satisfy reviewer requirements.`,
      },
      {
        question: `How does the Marin County coastal climate affect roofing and siding?`,
        answer: `${city}'s proximity to the Pacific means persistent fog, salt-laden marine air, higher annual moisture, and rapid temperature swings between sunny afternoons and foggy mornings. This climate is particularly hard on wood siding (rot, mold) and standard fasteners (corrosion). We recommend James Hardie fiber cement siding for Marin homes — it's specifically engineered for high-moisture coastal climates with a 30-year non-prorated warranty. For roofing, we use enhanced ice-and-water underlayment and stainless steel fasteners on every ${city} project to prevent moisture intrusion and corrosion.`,
      },
      {
        question: `What wildfire rules apply to ${city} homes?`,
        answer: `Marin County experienced the 2020 Woodward Fire on Point Reyes and faces ongoing wildfire risk in the Mt. Tamalpais watershed, Homestead Valley, and the Lucas Valley corridor. FIRESafe Marin and the Marin County Fire Department enforce defensible space requirements and WUI building codes for homes in mapped fire zones. If your ${city} home is in a VHFHSZ or State Responsibility Area, roof replacements must use Class A fire-rated materials with ember-resistant ridge and eave vents. Hamilton Exteriors confirms your fire zone status during the free inspection and ensures full compliance.`,
      },
      {
        question: `Why are exterior renovations more expensive in Marin County?`,
        answer: `Marin County exterior projects typically cost 10–20% more than East Bay equivalents for three reasons. First, Marin's narrow roads, hillside lots, and limited staging areas increase labor time — deliveries to homes in ${city}'s canyons or hillsides require smaller trucks and more manual material handling. Second, the design review process adds 2–4 weeks to the permit timeline. Third, Marin's stringent environmental protections (creek setbacks, heritage tree ordinances, grading restrictions) sometimes require engineered solutions. Hamilton Exteriors provides fully itemized estimates so you can see exactly where every dollar goes.`,
      },
    ],
    'napa': [
      {
        question: `What are the fire-hardening requirements for ${city} homes?`,
        answer: `After the 2017 Atlas and Tubbs fires destroyed 1,300+ structures and the 2020 Glass Fire burned through St. Helena and Deer Park, Napa County adopted California's strictest WUI building codes. Homes in ${city}'s mapped fire zones must use Class A fire-rated roofing, ember-resistant under-eave vents (1/8" mesh or intumescent), non-combustible siding or ignition-resistant material within 0–5 feet of the structure, and tempered or dual-pane windows. Hamilton Exteriors has rebuilt and fire-hardened dozens of Napa County homes since 2017 — we know these codes and ensure every detail passes final inspection.`,
      },
      {
        question: `Does Napa County have special rules for hillside or vineyard-adjacent properties?`,
        answer: `Yes. Napa County's hillside development ordinance (County Code Chapter 18.108) regulates grading, erosion control, and stormwater management on slopes above 5%. For ${city} properties on hillsides or adjacent to vineyards, exterior projects that disturb soil — like foundation work for ADUs or additions — may require a grading permit and erosion control plan in addition to the standard building permit. Agricultural buffer setbacks may also apply near active vineyards. Hamilton Exteriors manages these multi-permit situations and coordinates with Napa County Planning, Building, and Environmental Health as needed.`,
      },
      {
        question: `How does Napa Valley's climate affect roofing decisions in ${city}?`,
        answer: `Napa County has one of the Bay Area's most extreme microclimates — summer temperatures regularly exceed 100°F in the valley floor while winter nights drop below freezing in upper elevations. This 80°F+ annual temperature swing creates significant thermal expansion and contraction stress on roofing materials. We recommend architectural shingles rated for thermal cycling (like GAF Timberline HDZ) or standing-seam metal roofing that handles expansion without fastener fatigue. ${city}'s specific elevation and valley position affect material selection — we assess sun exposure, wind patterns, and slope orientation during your free inspection.`,
      },
      {
        question: `What exterior materials complement Napa Valley wine country homes?`,
        answer: `${city} homeowners often want exteriors that reflect Napa Valley's rustic-elegant character without formal design restrictions. Popular combinations include James Hardie board-and-batten siding in earthy tones (Monterey Taupe, Timber Bark, Woodstock Brown), natural stone wainscoting, standing-seam metal roofing in aged bronze or weathered copper, and wood-look composite accents. Hamilton Exteriors carries the full James Hardie ColorPlus palette and architectural shingle lines in slate, weathered-wood, and barkwood tones that complement wine country architecture. We bring physical samples to your property so you can see colors against your landscaping and surroundings.`,
      },
    ],
    'san-mateo': [
      {
        question: `How does the Peninsula climate affect roofing and siding in ${city}?`,
        answer: `${city} and San Mateo County sit between the Pacific fog belt and the warmer inland Peninsula. Homes in western and elevated neighborhoods experience persistent fog, moisture, and salt air that accelerate wood rot and metal corrosion. Eastern and lower-elevation homes see more sun and heat. Hamilton Exteriors selects materials based on your home's specific microclimate — fiber cement siding resists coastal moisture, while cool-roof-rated shingles manage heat on sun-exposed slopes. We use corrosion-resistant fasteners on all Bay-adjacent projects.`,
      },
      {
        question: `Does ${city} require permits for exterior renovations?`,
        answer: `Yes. San Mateo County and the city of ${city} require building permits for roof replacements, siding installations, and window changes. Some ${city} neighborhoods have additional design review requirements for exterior changes — particularly in older residential areas with historic character. Hamilton Exteriors handles all permit applications, plan submissions, and inspections as part of every project. Typical permit turnaround in ${city} is 2-3 weeks for standard residential work.`,
      },
      {
        question: `Are there earthquake retrofit considerations for ${city} homes?`,
        answer: `The San Andreas Fault runs through the San Mateo County coast, and the Peninsula's mix of fill soil and bedrock creates variable seismic risk. Older ${city} homes — especially those built before 1970 on cripple walls — should consider seismic retrofitting when doing major exterior work. A roof replacement is the ideal time to add Simpson Strong-Tie roof-to-wall connections. Hamilton Exteriors includes hurricane clips as standard on all Peninsula projects and can coordinate with structural engineers for full seismic evaluation.`,
      },
      {
        question: `What SFO airport noise considerations affect window choices in ${city}?`,
        answer: `Several San Mateo County cities including ${city} fall under SFO flight paths. For homes in high-noise areas, we recommend windows with STC (Sound Transmission Class) ratings of 35+ — dual-pane laminated glass with asymmetric pane thickness is the most effective noise reduction option. The FAA's Part 150 program and SFO's Airport/Community Roundtable may offer noise insulation funding for qualifying homes. Hamilton Exteriors can assess your noise exposure and recommend the right glazing package during your free consultation.`,
      },
    ],
    'santa-clara': [
      {
        question: `What are ${city}'s ADU permit requirements and timelines?`,
        answer: `Santa Clara County is California's most active ADU market. ${city} follows state ADU law (AB 68/SB 13/AB 2221) allowing detached ADUs up to 1,200 sq ft, junior ADUs up to 500 sq ft, and garage conversions on most single-family lots — typically without additional parking or owner-occupancy requirements. Many Santa Clara County cities including ${city} have adopted pre-approved ADU plans that cut permit review to 30 days or less. Hamilton Exteriors handles design, engineering, permit applications, and construction for the full ADU process. We maintain relationships with ${city}'s planning counter staff and know which plan configurations get approved fastest.`,
      },
      {
        question: `Does ${city} require Title 24 energy compliance for roof and window work?`,
        answer: `Yes. California Title 24 energy standards apply to all roof replacements and window changes in ${city}. Santa Clara County falls in Climate Zone 4, which requires cool-roof-rated materials on low-slope roofs (solar reflectance index ≥ 0.63) and window replacements that meet maximum U-factor (0.30) and SHGC (0.23) ratings. These energy requirements are stricter than many other California climate zones because of South Bay's high cooling loads. Hamilton Exteriors specifies compliant materials from the start and handles the mandatory CF-1R energy compliance forms that ${city}'s building department requires at permit and inspection.`,
      },
      {
        question: `How does South Bay's climate differ from the rest of the Bay Area for exterior work?`,
        answer: `The Santa Clara Valley gets 40% less rainfall than San Francisco and 15–20 degrees warmer summers, but the South Bay's clay-heavy expansive soils create unique foundation movement that affects exterior connections. Homes in ${city} on expansive clay experience seasonal soil heave — siding can crack, window frames bind, and roof flashing pulls away at wall connections if not properly detailed. Hamilton Exteriors uses flexible sealants and expansion-tolerant flashing details on South Bay projects. We also check for soil-related stucco cracking and siding separation during every free inspection.`,
      },
      {
        question: `Are there solar-ready requirements when replacing a roof in ${city}?`,
        answer: `Yes. California's 2022 Building Energy Efficiency Standards require new construction and major roof replacements to be "solar-ready" — meaning the roof structure must support future solar panel installation, and conduit pathways must be stubbed to the electrical panel. While a standard re-roof in ${city} doesn't trigger the full solar-ready requirement, it's the most cost-effective time to add solar. Hamilton Exteriors partners with licensed solar installers and can coordinate a combined roof-plus-solar project that qualifies for the 30% Federal Investment Tax Credit and avoids the cost of removing and reinstalling panels later.`,
      },
    ],
  };

  return faqsByCounty[short] || [
    {
      question: `Is Hamilton Exteriors licensed to work in ${county} County?`,
      answer: `Yes. Hamilton Exteriors is fully licensed, bonded, and insured to work throughout ${county} County, including ${city} and all surrounding communities. We carry California CSLB License #1078806, general liability coverage, and workers' compensation insurance.`,
    },
  ];
}
