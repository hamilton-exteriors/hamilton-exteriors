/**
 * Sub-service page data registry.
 *
 * Each entry maps a parent service + type slug to a focused landing page.
 * e.g., /roofing/asphalt-shingles, /siding/fiber-cement, /windows/casement
 *
 * Content extracted from the main service page "styles" sections and
 * restructured as individual pages for deeper SEO + better UX.
 */

import type { ImageMetadata } from 'astro';
import {
  roofingAsphalt as imgRoofingAsphalt,
  roofingMetal as imgRoofingMetal,
  roofingTile as imgRoofingTile,
  roofingFlat as imgRoofingFlat,
  sidingVinyl as imgSidingVinyl,
  sidingFiberCement as imgSidingFiberCement,
  sidingWood as imgSidingWood,
  sidingStucco as imgSidingStucco,
  windowDoubleHung as imgWindowDoubleHung,
  windowCasement as imgWindowCasement,
  windowSliding as imgWindowSliding,
  windowBay as imgWindowBay,
  windowPicture as imgWindowPicture,
  windowGarden as imgWindowGarden,
  serviceAdu as imgServiceAdu,
  financingHouse as imgFinancingHouse,
  financingWorker as imgFinancingWorker,
  serviceAdditions as imgServiceAdditions,
  serviceCustomHomes as imgServiceCustomHomes,
  designPlanning as imgDesignPlanning,
  designEngineering as imgDesignEngineering,
  serviceCustomHomesFull as imgServiceCustomHomesFull,
} from '../lib/images';

export interface SubServiceData {
  /** Parent service slug: roofing, siding, etc. */
  parentService: string;
  /** Parent service display name */
  parentName: string;
  /** Sub-service type slug: asphalt-shingles, metal, etc. */
  typeSlug: string;
  /** Page <title> */
  title: string;
  /** Meta description */
  description: string;
  /** Hero headline */
  headline: string;
  /** Hero image */
  heroImage: ImageMetadata;
  heroAlt: string;
  /** The detailed content — split into paragraphs */
  content: string[];
  /** Key facts shown as a stats strip */
  keyFacts: Array<{ value: string; label: string }>;
  /** 2-3 relevant FAQs */
  faqs: Array<{ question: string; answer: string }>;
}

// ── Roofing Sub-Services ──────────────────────────────────────────────────────

const roofingAsphaltShingles: SubServiceData = {
  parentService: 'roofing',
  parentName: 'Roofing',
  typeSlug: 'asphalt-shingles',
  title: 'Asphalt Shingle Roofing | Bay Area | Hamilton Exteriors',
  description: 'Asphalt composite shingle installation in the Bay Area. GAF Timberline HDZ, CertainTeed Landmark, Owens Corning Duration. Class A fire rated. 50-year warranty.',
  headline: 'Asphalt Shingle\nRoofing',
  heroImage: imgRoofingAsphalt,
  heroAlt: 'Asphalt shingle roof installation by Hamilton Exteriors in the Bay Area',
  content: [
    'Asphalt composite shingles are the most popular roofing material in the United States, covering roughly 75% of residential homes according to the Asphalt Roofing Manufacturers Association. Made from fiberglass mat coated with asphalt and ceramic-coated mineral granules, modern architectural shingles deliver Class A fire resistance and wind ratings up to 130 mph.',
    'In the Bay Area, we install GAF Timberline HDZ, CertainTeed Landmark, and Owens Corning Duration — all three manufacturers\u2019 flagship lines. Bay Area homeowners typically choose architectural shingles for their dimensional profile that mimics natural wood shake, strong performance in coastal fog and Pacific storm conditions, and competitive installed cost of $950\u2013$1,400 per roofing square.',
    'Our installations include synthetic underlayment, ice-and-water shield at valleys and eaves, and a manufacturer-backed system warranty covering both materials and labor for up to 50 years.',
  ],
  keyFacts: [
    { value: '$950–$1,400', label: 'Per Roofing Square' },
    { value: '130 mph', label: 'Wind Rating' },
    { value: '50 yr', label: 'System Warranty' },
    { value: 'Class A', label: 'Fire Resistance' },
  ],
  faqs: [
    { question: 'How long do asphalt shingles last in the Bay Area?', answer: 'Modern architectural asphalt shingles last 25–30 years in the Bay Area climate. Premium lines like GAF Timberline HDZ and CertainTeed Landmark PRO can reach 30–40 years with proper attic ventilation and regular maintenance.' },
    { question: 'What\'s the difference between 3-tab and architectural shingles?', answer: '3-tab shingles are flat, single-layer strips with a uniform appearance. Architectural (dimensional) shingles are thicker, multi-layered, and create a textured profile that mimics wood shake. Architectural shingles cost 15–25% more but last 10+ years longer and carry better wind ratings.' },
    { question: 'Are asphalt shingles fire-safe for Bay Area fire zones?', answer: 'Yes. All architectural asphalt shingles we install carry Class A fire resistance — the highest rating. They meet California WUI fire zone requirements when installed with proper underlayment and ember-resistant ridge vents.' },
  ],
};

const roofingMetal: SubServiceData = {
  parentService: 'roofing',
  parentName: 'Roofing',
  typeSlug: 'metal',
  title: 'Metal Roofing | Standing Seam | Bay Area | Hamilton Exteriors',
  description: 'Standing seam metal roofing in the Bay Area. 40–70 year lifespan, reflects 70% of solar heat. Steel and aluminum panels in 40+ colors. Class A fire rated.',
  headline: 'Standing Seam\nMetal Roofing',
  heroImage: imgRoofingMetal,
  heroAlt: 'Standing seam metal roof installation in the Bay Area by Hamilton Exteriors',
  content: [
    'Standing seam metal roofing is the fastest-growing residential roofing segment in California, with the Metal Roofing Alliance reporting a 25% increase in Bay Area installations since 2021. Metal roofs last 40\u201370 years with virtually zero maintenance — roughly double the lifespan of asphalt shingles.',
    'They reflect up to 70% of solar radiant heat according to the Oak Ridge National Laboratory, which can lower cooling costs by 20\u201325% in warmer East Bay and South Bay microclimates. We install 24-gauge steel and aluminum standing seam panels in over 40 color options, including Kynar 500 finishes rated for 30+ years of color retention.',
    'Metal roofing is also fully recyclable at end of life, making it one of the most sustainable choices available. For Bay Area homes in Wildland-Urban Interface fire zones, metal\u2019s Class A fire rating offers an additional layer of protection that many insurers reward with premium discounts.',
  ],
  keyFacts: [
    { value: '40–70 yr', label: 'Lifespan' },
    { value: '70%', label: 'Solar Heat Reflected' },
    { value: '40+', label: 'Color Options' },
    { value: 'Class A', label: 'Fire Rating' },
  ],
  faqs: [
    { question: 'Is a metal roof noisy in the rain?', answer: 'No. Modern standing seam installations include solid sheathing and synthetic underlayment that dampen sound. A metal roof over proper decking is no louder than asphalt shingles during Bay Area rainstorms.' },
    { question: 'How much does a metal roof cost vs. asphalt?', answer: 'Standing seam metal costs $1,200–$1,800 per roofing square installed, roughly 30–50% more than architectural asphalt. However, metal lasts 2–3x longer and requires almost no maintenance, making the lifetime cost comparable or lower.' },
    { question: 'Will a metal roof interfere with cell phone signal?', answer: 'In practice, no. Bay Area homes have enough windows and openings that cell signal is not noticeably affected. Wi-Fi routers inside the home are unaffected since they operate within the building envelope.' },
  ],
};

const roofingTile: SubServiceData = {
  parentService: 'roofing',
  parentName: 'Roofing',
  typeSlug: 'tile',
  title: 'Tile Roofing | Clay & Concrete | Bay Area | Hamilton Exteriors',
  description: 'Clay and concrete tile roofing for Bay Area homes. 75–100 year lifespan. Class A fire rated. Mediterranean, Spanish Colonial, and modern profiles. Free estimate.',
  headline: 'Clay & Concrete\nTile Roofing',
  heroImage: imgRoofingTile,
  heroAlt: 'Tile roof installation on a Bay Area home by Hamilton Exteriors',
  content: [
    'Clay and concrete tile roofing has protected Bay Area homes for over a century, with many original tile roofs in neighborhoods like Berkeley\u2019s Claremont and Palo Alto\u2019s Professorville still performing after 80+ years. According to the Tile Roofing Institute, a properly installed tile roof can last 75\u2013100 years.',
    'Tile provides natural thermal mass that keeps interiors cool during Bay Area heat events while offering Class A fire resistance critical in WUI-designated zones. We install both traditional barrel clay tiles that complement Mediterranean and Spanish Colonial architecture and modern flat concrete tiles suited to contemporary designs.',
    'Our tile installations include a complete waterproof underlayment system, copper or stainless steel flashing, and reinforced battens engineered for the added weight tile requires. Bay Area homeowners choosing tile roofing invest in a material with one of the highest return-on-investment rates for exterior renovations, according to Remodeling Magazine\u2019s annual Cost vs. Value report.',
  ],
  keyFacts: [
    { value: '75–100 yr', label: 'Lifespan' },
    { value: 'Class A', label: 'Fire Resistance' },
    { value: '80+ yr', label: 'Historic Performance' },
    { value: 'Highest', label: 'Resale ROI' },
  ],
  faqs: [
    { question: 'Can my existing roof structure support tile?', answer: 'It depends. Tile weighs 9–12 lbs per square foot vs. 2–4 lbs for asphalt. Our structural engineers assess your existing framing and may recommend reinforcement. Many Bay Area homes built before 1970 need rafter sistering or truss upgrades to carry tile safely.' },
    { question: 'Is tile roofing worth the cost?', answer: 'For homes you plan to keep long-term, yes. Tile costs $1,400–$2,500 per roofing square installed, but the 75–100 year lifespan means you may never re-roof again. In Bay Area fire zones, tile also earns insurance premium discounts.' },
    { question: 'What maintenance does a tile roof need?', answer: 'Tile roofs need minimal maintenance — annual inspection for cracked or slipped tiles, cleared valleys, and clean gutters. The underlayment beneath the tiles typically needs replacement at 30–40 years, which is a fraction of a full re-roof cost.' },
  ],
};

const roofingEnergy: SubServiceData = {
  parentService: 'roofing',
  parentName: 'Roofing',
  typeSlug: 'energy',
  title: 'GAF Energy Roof System | Solar Shingles | Bay Area | Hamilton Exteriors',
  description: 'GAF Energy Roof System with integrated solar shingles. 30% federal tax credit. Offsets 80–95% of electricity. Seamless appearance. GAF Master Elite installer.',
  headline: 'GAF Energy\nRoof System',
  heroImage: imgRoofingFlat,
  heroAlt: 'GAF Energy solar roof system installed on a Bay Area home',
  content: [
    'The GAF Energy Roof System integrates solar-generating shingles directly into the roofing surface, eliminating the need for rack-mounted panels while producing clean electricity. Each GAF Timberline Solar shingle generates power through embedded photovoltaic cells bonded to standard roofing material, creating a seamless appearance that passes most HOA reviews.',
    'The system qualifies for the 30% Federal Investment Tax Credit under the Inflation Reduction Act and California\u2019s Self-Generation Incentive Program. According to the California Energy Commission, Bay Area homes with solar roofing systems can offset 80\u201395% of annual electricity consumption.',
    'We are a GAF Master Elite contractor trained to integrate Energy Roof Systems with battery storage solutions including Tesla Powerwall and Enphase IQ. The combined roof-and-solar approach eliminates the need for two separate contractor projects, reducing total installed cost by 15\u201320% compared to a traditional re-roof plus retrofit panel installation.',
  ],
  keyFacts: [
    { value: '30%', label: 'Federal Tax Credit' },
    { value: '80–95%', label: 'Energy Offset' },
    { value: '15–20%', label: 'Cost Savings vs. Panels' },
    { value: 'Seamless', label: 'Appearance' },
  ],
  faqs: [
    { question: 'How does a solar roof compare to traditional solar panels?', answer: 'GAF Energy Roof shingles integrate directly into the roofing surface for a seamless look, while traditional panels mount on racks above the roof. Solar shingles cost more per watt but you save by combining roof replacement and solar installation into one project — typically 15–20% less than doing both separately.' },
    { question: 'What tax credits are available for solar roofing?', answer: 'The 30% Federal Investment Tax Credit (ITC) applies to the entire GAF Energy Roof System, including the roofing materials portion. California\'s Self-Generation Incentive Program provides additional rebates for battery storage. Combined, Bay Area homeowners can reduce total project cost by 35–45%.' },
    { question: 'How long does a GAF solar roof last?', answer: 'The GAF Energy Roof System carries a 25-year power output warranty and the same 50-year system warranty as standard GAF roofing. The solar cells are expected to produce 80%+ of their rated output after 25 years.' },
  ],
};

// ── Siding Sub-Services ───────────────────────────────────────────────────────

const sidingVinylPage: SubServiceData = {
  parentService: 'siding',
  parentName: 'Siding',
  typeSlug: 'vinyl',
  title: 'Vinyl Siding Installation | Bay Area | Hamilton Exteriors',
  description: 'Premium vinyl siding installation in the Bay Area. CertainTeed and Ply Gem. 60+ colors. R-2.0–3.5 insulated options. Lifetime owner warranty. Free estimate.',
  headline: 'Vinyl Siding\nInstallation',
  heroImage: imgSidingVinyl,
  heroAlt: 'Vinyl siding installation on a Bay Area home by Hamilton Exteriors',
  content: [
    'Vinyl siding remains the most widely installed exterior cladding in the United States, covering roughly 27% of existing homes according to the U.S. Census Bureau\u2019s American Housing Survey. Modern insulated vinyl delivers R-values of 2.0\u20133.5, improving thermal efficiency by up to 20% compared to hollow-back profiles.',
    'In the Bay Area, vinyl siding performs well in our mild coastal climate, resisting moisture, salt air, and UV degradation without painting, staining, or sealing. We install premium CertainTeed and Ply Gem vinyl systems in over 60 color and texture options, including profiles that replicate cedar shake and beaded clapboard.',
    'Bay Area homeowners typically choose vinyl for its exceptional value — installed cost averages $450\u2013$600 per square, roughly 50% less than fiber cement. Our installations include a full weather-resistant barrier, J-channel trim, soffit venting, and manufacturer warranty coverage lasting the lifetime of the original owner.',
  ],
  keyFacts: [
    { value: '$450–$600', label: 'Per Square Installed' },
    { value: '60+', label: 'Color Options' },
    { value: 'R-3.5', label: 'Insulated R-Value' },
    { value: 'Lifetime', label: 'Owner Warranty' },
  ],
  faqs: [
    { question: 'How long does vinyl siding last?', answer: 'Premium vinyl siding lasts 30–40 years in the Bay Area climate. It doesn\'t rot, warp, or need painting. CertainTeed and Ply Gem products carry lifetime warranties for the original homeowner, transferable on a prorated basis.' },
    { question: 'Does vinyl siding look cheap?', answer: 'Modern premium vinyl has come a long way from the flat, shiny profiles of the 1990s. Today\'s insulated vinyl replicates the look of cedar shake, beaded clapboard, and Dutch lap with realistic wood grain textures and matte finishes.' },
    { question: 'Is vinyl siding fire safe?', answer: 'Vinyl siding is self-extinguishing — it melts and deforms under direct flame but does not sustain combustion. For Bay Area WUI fire zones, we recommend fiber cement or stucco instead, as they carry the Class A fire rating required in high-risk areas.' },
  ],
};

const sidingFiberCementPage: SubServiceData = {
  parentService: 'siding',
  parentName: 'Siding',
  typeSlug: 'fiber-cement',
  title: 'James Hardie Fiber Cement Siding | Bay Area | Hamilton Exteriors',
  description: 'James Hardie Elite Preferred installer in the Bay Area. HZ5 fiber cement siding. Class A fire rated. 86% resale ROI. ColorPlus Technology. 30-year warranty.',
  headline: 'James Hardie\nFiber Cement Siding',
  heroImage: imgSidingFiberCement,
  heroAlt: 'James Hardie fiber cement siding on a Bay Area home installed by Hamilton Exteriors',
  content: [
    'James Hardie fiber cement siding is engineered specifically for regional climates — their HZ5 formulation is designed for the Bay Area\u2019s fog, moisture, and temperature swings. Made from Portland cement, sand, and cellulose fibers, Hardie products deliver Class A fire resistance, resist termite damage, and will not rot or warp in the coastal humidity that degrades wood siding within 10\u201315 years.',
    'As a James Hardie Elite Preferred installer, we offer the full ColorPlus Technology palette — factory-applied baked-on color with a 15-year fade and chip warranty, eliminating on-site painting and its associated VOC emissions. According to Remodeling Magazine\u2019s 2024 Cost vs. Value report, fiber cement siding replacement returns 86% of cost at resale in the Pacific West region, the highest ROI of any siding material.',
    'We install HardiePlank lap siding, HardieShingle staggered panels, and HardiePanel vertical board with manufacturer-specified flashing, joint treatment, and Hardie-approved fasteners for full system warranty eligibility.',
  ],
  keyFacts: [
    { value: '86%', label: 'Resale ROI' },
    { value: 'Class A', label: 'Fire Resistance' },
    { value: '30 yr', label: 'Product Warranty' },
    { value: 'HZ5', label: 'Bay Area Formulation' },
  ],
  faqs: [
    { question: 'Why choose James Hardie over other fiber cement brands?', answer: 'James Hardie\u2019s HZ5 formulation is specifically engineered for the Bay Area\u2019s Climate Zone 5 conditions — fog, moisture cycling, and salt air. Other brands use a single formulation nationwide. Hardie also offers ColorPlus factory-applied finish with a 15-year color warranty that no competitor matches.' },
    { question: 'How much does James Hardie siding cost installed?', answer: 'HardiePlank lap siding costs $800\u2013$1,200 per square installed in the Bay Area, including weather-resistant barrier, flashing, and trim. HardieShingle and HardiePanel products cost 10\u201320% more due to additional labor for installation patterns.' },
    { question: 'Does fiber cement siding need painting?', answer: 'ColorPlus factory-finished Hardie siding does not need painting for 15+ years. Primed-only Hardie products require field painting within 180 days and repainting every 10\u201315 years. We recommend ColorPlus for Bay Area installations.' },
  ],
};

const sidingStuccoPage: SubServiceData = {
  parentService: 'siding',
  parentName: 'Siding',
  typeSlug: 'stucco',
  title: 'Stucco Siding Installation & Repair | Bay Area | Hamilton Exteriors',
  description: 'Three-coat stucco and EIFS installation in the Bay Area. One-hour fire rated. 50–80 year lifespan. Mediterranean, Spanish Colonial, Craftsman styles. Free estimate.',
  headline: 'Stucco Siding\n& Repair',
  heroImage: imgSidingWood,
  heroAlt: 'Stucco siding application on a Bay Area home by Hamilton Exteriors',
  content: [
    'Three-coat stucco remains one of the Bay Area\u2019s most popular exterior finishes, particularly in neighborhoods with Mediterranean, Spanish Colonial, and Craftsman architecture. Applied over a metal lath base in three layers — scratch coat, brown coat, and finish coat — traditional stucco creates a monolithic, seamless exterior shell with inherent fire resistance and thermal mass that moderates indoor temperature swings.',
    'The California Building Standards Commission classifies stucco as a one-hour fire-rated assembly, making it especially valuable in WUI fire zones throughout the East Bay hills. We also install Exterior Insulation and Finish Systems (EIFS) for applications requiring enhanced R-value.',
    'Our stucco crews have 15+ years of Bay Area experience repairing earthquake-caused hairline cracking, matching existing textures on additions, and applying elastomeric finish coats that flex with seasonal movement. Properly maintained stucco lasts 50\u201380 years, and we back our installations with a 10-year workmanship warranty.',
  ],
  keyFacts: [
    { value: '50–80 yr', label: 'Lifespan' },
    { value: '1 hr', label: 'Fire Rating' },
    { value: '15+ yr', label: 'Crew Experience' },
    { value: '10 yr', label: 'Workmanship Warranty' },
  ],
  faqs: [
    { question: 'How much does stucco siding cost in the Bay Area?', answer: 'New three-coat stucco costs $800\u2013$1,100 per square installed. Stucco repairs and re-coating average $8\u201315 per square foot depending on crack severity and texture matching complexity. EIFS costs 10\u201320% more than traditional stucco due to the foam insulation layer.' },
    { question: 'Can you match my existing stucco texture?', answer: 'Yes. Our crews are experienced in replicating dash, lace, sand, smooth, and custom textures to seamlessly blend new stucco with existing walls. We create test patches for your approval before applying the full surface.' },
    { question: 'Is stucco good for Bay Area earthquake zones?', answer: 'Stucco performs well in seismic zones when properly installed with control joints that allow for building movement. Hairline cracking after earthquakes is normal and easily repaired with elastomeric coatings. The lath-and-stucco system adds lateral bracing to the wall assembly.' },
  ],
};

const sidingWaterproofingPage: SubServiceData = {
  parentService: 'siding',
  parentName: 'Siding',
  typeSlug: 'waterproofing',
  title: 'Exterior Waterproofing | Bay Area | Hamilton Exteriors',
  description: 'Complete exterior waterproofing for Bay Area homes. Elastomeric coatings, flashing replacement, foundation membranes. Tremco and Henry products. Free moisture assessment.',
  headline: 'Exterior\nWaterproofing',
  heroImage: imgSidingStucco,
  heroAlt: 'Exterior waterproofing application on a Bay Area home',
  content: [
    'Bay Area homes face unique moisture challenges — Pacific fog belt condensation, wind-driven rain, and aging stucco or wood cladding that allows water infiltration behind the building envelope. According to the Insurance Information Institute, water damage is the second most common homeowner insurance claim in California, averaging $12,500 per incident.',
    'Our waterproofing services create a continuous moisture barrier across the entire exterior envelope, including elastomeric coatings for stucco, flashing replacement at windows and doors, and below-grade foundation waterproofing membranes. We use Tremco and Henry commercial-grade waterproofing products rated for 15+ years of continuous protection.',
    'For older Bay Area homes with lath-and-plaster construction or original single-pane windows, we coordinate waterproofing with siding replacement to address the root cause rather than treating symptoms. Every project includes a moisture meter assessment documenting baseline readings, so you have measurable proof of improvement.',
  ],
  keyFacts: [
    { value: '$12,500', label: 'Avg. Water Damage Claim' },
    { value: '15+ yr', label: 'Product Protection' },
    { value: 'Full', label: 'Envelope Coverage' },
    { value: 'Metered', label: 'Baseline Assessment' },
  ],
  faqs: [
    { question: 'How do I know if my home needs waterproofing?', answer: 'Signs include peeling interior paint, musty smells in closets or corners, visible mold growth, staining on interior walls after rain, and efflorescence (white mineral deposits) on foundation walls. Our free moisture assessment uses pin and pinless meters to find hidden moisture before it causes damage.' },
    { question: 'What does exterior waterproofing include?', answer: 'A full exterior waterproofing project includes: elastomeric wall coatings, window and door flashing replacement, sealant at all penetrations, below-grade foundation membrane, and drainage improvements. We tailor the scope to your home\u2019s specific vulnerabilities.' },
    { question: 'How long does waterproofing last?', answer: 'Our Tremco and Henry commercial-grade coatings last 15–20 years. Foundation membranes last 25+ years. Flashing and sealants typically need re-inspection and touch-up at 10–15 years. We provide a 10-year workmanship warranty on all waterproofing installations.' },
  ],
};

// ── Windows Sub-Services ──────────────────────────────────────────────────────

const windowsSingleHung: SubServiceData = {
  parentService: 'windows',
  parentName: 'Windows',
  typeSlug: 'single-hung',
  title: 'Single Hung Windows | Bay Area | Hamilton Exteriors',
  description: 'Single hung window replacement in the Bay Area. Milgard and Andersen. U-factor 0.25. Title 24 compliant. 15–25% energy savings. Free quote.',
  headline: 'Single Hung\nWindows',
  heroImage: imgWindowDoubleHung,
  heroAlt: 'Single hung window replacement by Hamilton Exteriors in the Bay Area',
  content: [
    'Single hung windows are the most common window type in Bay Area homes built before 1990, featuring a fixed upper sash and a movable lower sash that slides vertically for ventilation. Modern single hung replacements from Milgard and Andersen use dual-pane Low-E glass with argon gas fill, achieving U-factors as low as 0.25 — exceeding California\u2019s Title 24 energy requirements by 15\u201320%.',
    'The fixed upper sash provides better air and water infiltration resistance than double hung designs, while the simpler mechanism keeps installed cost $75\u2013$100 lower per window. Bay Area homeowners replacing original aluminum single hung windows from the 1960s\u201380s typically see a 15\u201325% reduction in heating and cooling costs, according to the Department of Energy\u2019s ENERGY STAR program.',
    'We install single hung windows in vinyl, fiberglass, and wood-clad frames with tilt-in sash for easy interior cleaning — no ladder required.',
  ],
  keyFacts: [
    { value: '0.25', label: 'U-Factor' },
    { value: '15–25%', label: 'Energy Savings' },
    { value: 'Title 24', label: 'Compliant' },
    { value: 'Tilt-In', label: 'Easy Cleaning' },
  ],
  faqs: [
    { question: 'What\'s the difference between single hung and double hung?', answer: 'Single hung windows have one fixed sash (top) and one operable sash (bottom). Double hung windows have two independently operable sashes. Single hung costs less, seals tighter, and is simpler to maintain — ideal for most Bay Area applications.' },
    { question: 'How much do single hung replacement windows cost?', answer: 'Single hung replacement windows cost $600\u2013$1,200 per window installed in the Bay Area, depending on frame material (vinyl, fiberglass, or wood-clad) and glass options. Vinyl is most affordable; wood-clad matches historic home aesthetics.' },
  ],
};

const windowsSingleSlider: SubServiceData = {
  parentService: 'windows',
  parentName: 'Windows',
  typeSlug: 'single-slider',
  title: 'Single Slider Windows | Bay Area | Hamilton Exteriors',
  description: 'Single slider window installation in the Bay Area. Milgard Trinsic, Andersen 100 Series. No exterior clearance needed. Title 24 compliant. Free estimate.',
  headline: 'Single Slider\nWindows',
  heroImage: imgWindowCasement,
  heroAlt: 'Single slider window installation on a Bay Area home',
  content: [
    'Single slider windows feature one fixed pane and one horizontally sliding pane, making them ideal for rooms where an outward-opening window is impractical — above kitchen sinks, along walkways, or on ground-floor facades near landscaping. The horizontal operation requires no exterior clearance, which is why Bay Area homes with narrow side yards and zero-lot-line setbacks frequently choose sliders.',
    'We install Milgard Trinsic and Andersen 100 Series single sliders with dual-pane Low-E glass, achieving U-factors of 0.27 and qualifying for California utility rebate programs. The contemporary horizontal profile complements mid-century modern, ranch, and Eichler-style homes common throughout the South Bay and Peninsula.',
    'Our single slider installations include new exterior aluminum flashing, interior wood or PVC trim, and foam-sealed jambs that eliminate the air leaks responsible for up to 30% of residential energy loss according to the U.S. Department of Energy.',
  ],
  keyFacts: [
    { value: '0.27', label: 'U-Factor' },
    { value: 'No', label: 'Exterior Clearance' },
    { value: '30%', label: 'Air Leak Reduction' },
    { value: 'Rebate', label: 'Eligible' },
  ],
  faqs: [
    { question: 'Are slider windows energy efficient?', answer: 'Yes. Modern single sliders with dual-pane Low-E glass and argon fill achieve U-factors of 0.27, meeting Title 24 requirements. The compression seal on quality sliders provides good air tightness, though casement windows seal slightly tighter.' },
    { question: 'Where should I use slider windows vs. other types?', answer: 'Sliders are best for locations where you can\'t swing a window outward — above sinks, along walkways, near landscaping, or on ground floors facing patios. They\'re also the natural style choice for mid-century modern, ranch, and Eichler homes.' },
  ],
};

const windowsSlidingDoors: SubServiceData = {
  parentService: 'windows',
  parentName: 'Windows',
  typeSlug: 'sliding-glass-doors',
  title: 'Sliding Glass Doors | Bay Area | Hamilton Exteriors',
  description: 'Sliding glass door installation in the Bay Area. Milgard, Andersen, Marvin. 5–16 ft wide configurations. Multi-point locking. ADA-compliant options. Free estimate.',
  headline: 'Sliding Glass\nDoors',
  heroImage: imgWindowSliding,
  heroAlt: 'Sliding glass door installation connecting indoor and outdoor living space',
  content: [
    'Sliding glass doors transform how Bay Area homeowners connect indoor living spaces with patios, decks, and gardens — essential in a climate where outdoor living extends 9\u201310 months per year. Modern sliding glass doors from Milgard, Andersen, and Marvin feature dual or triple-pane Low-E glass with argon fill, stainless steel or fiberglass rollers rated for 75,000+ cycles, and multi-point locking hardware that meets California forced-entry resistance standards.',
    'Standard configurations range from 5 to 12 feet wide, with custom multi-panel options reaching 16+ feet for true indoor-outdoor flow. We install sliding glass doors with proper structural headers, recessed sill pans for waterproofing, and ADA-compliant thresholds where specified.',
    'Bay Area homeowners replacing single-pane aluminum sliders from the 1970s\u201380s gain dramatic improvements in noise reduction (STC ratings of 28\u201334), thermal insulation, and security.',
  ],
  keyFacts: [
    { value: '5–16 ft', label: 'Width Options' },
    { value: '75K+', label: 'Roller Cycles' },
    { value: 'STC 28–34', label: 'Noise Reduction' },
    { value: 'ADA', label: 'Compliant Options' },
  ],
  faqs: [
    { question: 'How much do sliding glass doors cost?', answer: 'Standard 6-foot sliding glass doors cost $1,500\u2013$3,500 installed in the Bay Area. Multi-panel configurations (8\u201316 ft) range from $4,000\u2013$12,000+ depending on frame material, glass options, and structural modifications needed.' },
    { question: 'Can you replace a sliding door without reframing?', answer: 'In most cases, yes. Replacement sliding doors are available in standard sizes that fit existing rough openings. If you want a wider opening, we handle the structural header modification and any load-bearing wall considerations.' },
  ],
};

const windowsPicture: SubServiceData = {
  parentService: 'windows',
  parentName: 'Windows',
  typeSlug: 'picture',
  title: 'Picture Windows | Bay Area | Hamilton Exteriors',
  description: 'Large fixed picture windows for Bay Area homes. U-factor 0.20 with triple-pane. Sizes up to 8x6 ft. Maximum light and views. Free estimate.',
  headline: 'Picture\nWindows',
  heroImage: imgWindowBay,
  heroAlt: 'Large picture window showcasing Bay Area views installed by Hamilton Exteriors',
  content: [
    'Picture windows are large, fixed-pane installations designed to maximize natural light, frame views, and create a focal point in any room. Because they do not open, picture windows achieve the highest energy efficiency ratings of any window type — U-factors as low as 0.20 with triple-pane glass — and provide superior air and water infiltration resistance.',
    'In the Bay Area, picture windows are especially popular in hillside homes throughout the Oakland Hills, Marin headlands, and Peninsula foothills where panoramic views of the Bay, the Golden Gate, or Mt. Tamalpais define the property\u2019s character. We install picture windows in sizes up to 8 feet wide and 6 feet tall, using tempered or laminated safety glass where required by California building code.',
    'Our installations include structural framing verification, exterior head flashing, and silicone-sealed perimeter joints that prevent the water intrusion common with Bay Area wind-driven rain.',
  ],
  keyFacts: [
    { value: '0.20', label: 'U-Factor (Triple)' },
    { value: '8×6 ft', label: 'Max Size' },
    { value: 'Highest', label: 'Energy Efficiency' },
    { value: 'Tempered', label: 'Safety Glass' },
  ],
  faqs: [
    { question: 'Can I put a picture window where a smaller window is now?', answer: 'Yes, we can enlarge window openings by modifying or adding structural headers. For load-bearing walls, our structural engineer designs the header to safely carry the load. The larger opening dramatically increases natural light and can transform a room.' },
    { question: 'Are picture windows more energy efficient than operable windows?', answer: 'Yes. Picture windows have no moving parts, so there are no air leaks at sash joints. With triple-pane Low-E glass, they achieve U-factors of 0.20 — about 20% better than the best casement or hung windows.' },
  ],
};

const windowsDoubleHung: SubServiceData = {
  parentService: 'windows',
  parentName: 'Windows',
  typeSlug: 'double-hung',
  title: 'Double Hung Windows | Bay Area | Hamilton Exteriors',
  description: 'Double hung window replacement for Bay Area homes. Andersen, Marvin, Pella. Natural convection ventilation. Period-accurate for Victorians and Craftsmans.',
  headline: 'Double Hung\nWindows',
  heroImage: imgWindowPicture,
  heroAlt: 'Double hung window replacement on a Bay Area Victorian home',
  content: [
    'Double hung windows are the classic American window style, featuring two independently operable sashes that slide vertically. The ability to open both top and bottom sashes simultaneously creates a natural convection loop — warm air exits through the top while cooler air enters from the bottom — reducing reliance on mechanical cooling during Bay Area\u2019s mild shoulder seasons.',
    'Modern double hung windows from Andersen, Marvin, and Pella include tilt-in sashes for safe interior cleaning, integrated window screens, and cam-action locks that compress weatherstripping for an airtight seal. We install double hung windows in wood, fiberglass, vinyl, and aluminum-clad frames.',
    'The traditional double hung profile is architecturally appropriate for Victorian, Craftsman, Colonial Revival, and Edwardian homes found throughout San Francisco, Berkeley, Oakland\u2019s Rockridge, and Alameda\u2019s Gold Coast — neighborhoods where period-accurate window replacements preserve both character and property value.',
  ],
  keyFacts: [
    { value: 'Both', label: 'Sashes Operable' },
    { value: 'Tilt-In', label: 'Easy Cleaning' },
    { value: 'Period', label: 'Accurate Profiles' },
    { value: '4', label: 'Frame Materials' },
  ],
  faqs: [
    { question: 'Are double hung windows good for historic Bay Area homes?', answer: 'Yes. Double hung is the historically correct window type for Victorians, Craftsmans, Edwardians, and Colonial Revival homes. Manufacturers like Marvin and Andersen offer narrow sightlines and divided-lite patterns that match original window proportions for preservation compliance.' },
    { question: 'How much do double hung replacement windows cost?', answer: 'Double hung windows cost $700\u2013$1,500 per window installed in the Bay Area. Vinyl frames are most affordable; wood and aluminum-clad options cost more but offer the authentic appearance required in historic districts.' },
  ],
};

const windowsCasement: SubServiceData = {
  parentService: 'windows',
  parentName: 'Windows',
  typeSlug: 'casement',
  title: 'Casement Windows | Bay Area | Hamilton Exteriors',
  description: 'Casement window installation in the Bay Area. 50–90% more airflow than sliding windows. U-factor 0.22. Tightest seal of any operable window. Andersen, Marvin, Milgard.',
  headline: 'Casement\nWindows',
  heroImage: imgWindowGarden,
  heroAlt: 'Casement window installation on a Bay Area home by Hamilton Exteriors',
  content: [
    'Casement windows open outward on side hinges via a crank mechanism, creating a fully unobstructed opening that captures 50\u201390% more airflow than sliding or hung windows according to the American Architectural Manufacturers Association. When closed, the sash compresses against the frame on all four sides, producing the tightest seal of any operable window type — U-factors as low as 0.22 with dual-pane Low-E glass.',
    'This superior seal makes casement windows the top choice for Bay Area fog belt homes in Daly City, Pacifica, and the Sunset District where wind-driven moisture penetration is a persistent challenge. We install casement windows from Andersen, Marvin, and Milgard in both traditional and contemporary profiles.',
    'The outward-opening design works best on upper floors or facing backyards where the open sash won\u2019t obstruct walkways. Our installations include folding crank hardware for easy operation, multi-point locking systems, and egress-compliant sizing for bedrooms as required by California building code.',
  ],
  keyFacts: [
    { value: '50–90%', label: 'More Airflow' },
    { value: '0.22', label: 'U-Factor' },
    { value: 'Tightest', label: 'Seal Rating' },
    { value: 'Egress', label: 'Compliant' },
  ],
  faqs: [
    { question: 'Are casement windows better than double hung?', answer: 'Casement windows seal tighter (better energy performance) and capture significantly more airflow when open. Double hung windows are better for traditional-style homes and locations where an outward-opening sash would obstruct a walkway or patio.' },
    { question: 'Can casement windows be used for bedroom egress?', answer: 'Yes. Casement windows provide the largest clear opening per unit size, making them ideal for meeting California bedroom egress requirements (5.7 sq ft clear opening, 24" minimum height, 20" minimum width). We size all bedroom casements to code.' },
  ],
};

// ── ADU Sub-Services ──────────────────────────────────────────────────────────

const aduDetached: SubServiceData = {
  parentService: 'adu',
  parentName: 'ADUs',
  typeSlug: 'detached',
  title: 'Detached ADU Builder | Bay Area | Hamilton Exteriors',
  description: 'Detached ADU construction in the Bay Area. 400–1,200 sq ft. Full design-build. 60-day permit guarantee. $150K–$350K. Adds $150K–$300K in property value.',
  headline: 'Detached ADU\nConstruction',
  heroImage: imgServiceAdu,
  heroAlt: 'Detached accessory dwelling unit built by Hamilton Exteriors in the Bay Area',
  content: [
    'Detached accessory dwelling units are standalone structures built in your backyard, offering maximum privacy, independent utility connections, and the highest rental income potential of any ADU type. California\u2019s AB 68 and SB 9 legislation streamlined ADU permitting statewide, and the Bay Area has led adoption — Alameda County alone approved over 1,200 ADU permits in 2024 according to the California Department of Housing and Community Development.',
    'Our detached ADUs range from 400 to 1,200 square feet and include full kitchens, bathrooms, living areas, and private entrances. We build on concrete slab or raised foundations depending on site conditions and local soil reports.',
    'Bay Area homeowners building detached ADUs typically see property value increases of $150,000\u2013$300,000 and rental income of $2,000\u2013$3,500 per month, making ADU construction one of the highest-ROI home improvements available in the current housing market.',
  ],
  keyFacts: [
    { value: '400–1,200', label: 'Square Feet' },
    { value: '$150K–$300K', label: 'Property Value Added' },
    { value: '$2K–$3.5K', label: 'Monthly Rental Income' },
    { value: '60 day', label: 'Permit Guarantee' },
  ],
  faqs: [
    { question: 'How much does a detached ADU cost in the Bay Area?', answer: 'Detached ADU construction costs $150,000–$350,000 depending on size, finishes, site conditions, and utility connection complexity. A 500 sq ft studio ADU starts around $150K; a 1,000 sq ft two-bedroom unit runs $250K–$350K. Hamilton Exteriors provides itemized estimates.' },
    { question: 'How long does it take to build a detached ADU?', answer: 'Typical timeline is 6–8 months total: 6–10 weeks for permitting (under our 60-day guarantee), then 8–14 weeks of construction depending on size and complexity.' },
    { question: 'Do I need to live on the property to build an ADU?', answer: 'California eliminated owner-occupancy requirements for ADUs permitted after January 1, 2020. You can build an ADU on a property you own without living there, and you can rent both the ADU and the primary home.' },
  ],
};

const aduDesign: SubServiceData = {
  parentService: 'adu',
  parentName: 'ADUs',
  typeSlug: 'design',
  title: 'ADU Design & Architecture | Bay Area | Hamilton Exteriors',
  description: 'Custom ADU floor plans and 3D renderings for Bay Area homes. BIM modeling. Maximize buildable area. Title 24 compliant designs. Free consultation.',
  headline: 'ADU Design\n& Architecture',
  heroImage: imgFinancingHouse,
  heroAlt: 'ADU architectural design and 3D rendering by Hamilton Exteriors',
  content: [
    'Our in-house architects create custom ADU floor plans, 3D renderings, and full construction document sets tailored to your specific lot dimensions, setback requirements, and personal vision. We use building information modeling (BIM) software to detect conflicts before construction begins, reducing change orders and delays.',
    'Every design maximizes usable square footage within local zoning codes while optimizing for natural light, cross-ventilation, and privacy from the main home and neighboring properties. Bay Area ADU zoning varies significantly by jurisdiction — Oakland allows ADUs up to 850 square feet on most residential lots, while San Jose permits up to 1,200 square feet with specific setback rules.',
    'Our architects navigate these variations daily, often finding 10\u201315% more buildable area than homeowners expect. Design packages include site plans, floor plans, elevations, electrical layouts, plumbing schematics, and Title 24 energy compliance calculations required for permit submission.',
  ],
  keyFacts: [
    { value: '10–15%', label: 'More Buildable Area' },
    { value: '3D', label: 'BIM Renderings' },
    { value: 'Full', label: 'Document Set' },
    { value: 'Title 24', label: 'Compliant' },
  ],
  faqs: [
    { question: 'Do I need an architect for my ADU?', answer: 'California requires stamped architectural and engineering drawings for ADU permits. Our in-house architects handle the full design package — floor plans, elevations, structural details, and energy compliance — as part of our design-build contract.' },
    { question: 'How big can I build my ADU?', answer: 'California allows detached ADUs up to 1,200 sq ft statewide, but local jurisdictions may set lower limits. Oakland caps at 850 sq ft, San Jose at 1,200 sq ft. Junior ADUs within the main home can be up to 500 sq ft. Our architects assess your specific lot to determine the maximum buildable size.' },
  ],
};

const aduPermits: SubServiceData = {
  parentService: 'adu',
  parentName: 'ADUs',
  typeSlug: 'permits',
  title: 'ADU Permitting Services | Bay Area | Hamilton Exteriors',
  description: 'Full ADU permit management in the Bay Area. 60-day permit guarantee. Structural engineering, Title 24, soils reports. Active relationships with Bay Area planning departments.',
  headline: 'ADU Engineering\n& Permits',
  heroImage: imgFinancingWorker,
  heroAlt: 'ADU permit plans and engineering documents by Hamilton Exteriors',
  content: [
    'ADU permitting in the Bay Area involves structural engineering, soils reports, Title 24 energy compliance, and coordination with planning, building, and fire departments — a process that overwhelms most homeowners attempting to self-manage. We handle the entire permit process from initial application through final inspection sign-off, backed by our 60-day permit guarantee for standard ADU projects.',
    'Our structural engineers design foundations, framing, and lateral bracing systems that meet California\u2019s Seismic Design Category D requirements, critical in the earthquake-active Bay Area. According to the UC Berkeley Terner Center for Housing Innovation, the average Bay Area ADU permit takes 4\u20138 months when self-managed versus 6\u201310 weeks with an experienced design-build firm.',
    'We maintain active relationships with permitting staff in Alameda, Contra Costa, Marin, Napa, and Santa Clara counties, which helps resolve plan check comments quickly and avoid costly resubmissions.',
  ],
  keyFacts: [
    { value: '60 day', label: 'Permit Guarantee' },
    { value: '6–10 wk', label: 'Typical Timeline' },
    { value: '5', label: 'County Relationships' },
    { value: 'Seismic D', label: 'Engineering Standard' },
  ],
  faqs: [
    { question: 'Why does ADU permitting take so long?', answer: 'Bay Area ADU permits require coordination between multiple departments: planning (zoning compliance), building (structural/energy review), fire (sprinkler/egress), and utilities (water/sewer capacity). Each has its own review timeline. Self-managed permits take 4–8 months; our process averages 6–10 weeks.' },
    { question: 'What is the 60-day permit guarantee?', answer: 'We guarantee your standard ADU permit will be submitted within 60 days of design approval. If we miss this timeline, we provide a credit toward your construction contract. This guarantee covers our design, engineering, and submittal process — review times by the jurisdiction are outside our control.' },
  ],
};

const aduGarageConversion: SubServiceData = {
  parentService: 'adu',
  parentName: 'ADUs',
  typeSlug: 'garage-conversions',
  title: 'Garage Conversion ADU | Bay Area | Hamilton Exteriors',
  description: 'Garage to ADU conversion in the Bay Area. 30–40% less than new construction. No replacement parking required. 8–12 week build time. Free consultation.',
  headline: 'Garage\nConversions',
  heroImage: imgServiceAdditions,
  heroAlt: 'Garage conversion to ADU by Hamilton Exteriors in the Bay Area',
  content: [
    'Garage conversions are the most cost-effective ADU option in the Bay Area, typically costing 30\u201340% less than new detached construction because the existing foundation, framing, and roof structure remain in place. California law (AB 68) prohibits cities from requiring replacement parking when converting a garage to an ADU, removing the most common historical barrier to this approach.',
    'Our garage conversion process includes structural assessment and reinforcement as needed, new insulation meeting Title 24 requirements, upgraded electrical service (typically from 100A to 200A panel), plumbing rough-in for kitchen and bathroom, drywall, flooring, and interior finishes. Most garage conversions complete in 8\u201312 weeks from permit approval.',
    'We also handle the exterior transformation — replacing the garage door opening with insulated wall, windows, and an entry door that blends seamlessly with your home\u2019s existing architecture.',
  ],
  keyFacts: [
    { value: '30–40%', label: 'Less Than New Build' },
    { value: '8–12 wk', label: 'Build Time' },
    { value: 'No', label: 'Parking Replacement' },
    { value: 'Seamless', label: 'Exterior Match' },
  ],
  faqs: [
    { question: 'How much does a garage conversion cost?', answer: 'Bay Area garage conversions cost $100,000–$200,000 depending on size, finishes, and structural modifications needed. A basic one-car garage conversion (200–250 sq ft) starts around $100K; a two-car garage conversion (400–500 sq ft) with high-end finishes runs $150K–$200K.' },
    { question: 'Do I lose my parking if I convert my garage?', answer: 'California law (AB 68) prohibits cities from requiring replacement parking when converting a garage to an ADU. You can legally convert your garage without providing new covered parking. Most homeowners use driveway or street parking instead.' },
    { question: 'Can any garage be converted to an ADU?', answer: 'Most attached and detached garages can be converted. Key requirements: minimum ceiling height (varies by jurisdiction, typically 7\'6"), adequate foundation condition, and feasible utility connections (water, sewer, electrical). Our free assessment evaluates your garage\'s conversion potential.' },
  ],
};

// ── Custom Homes Sub-Services ─────────────────────────────────────────────────

const customHomesGroundUp: SubServiceData = {
  parentService: 'custom-homes',
  parentName: 'Custom Homes',
  typeSlug: 'ground-up',
  title: 'Ground-Up Custom Home Construction | Bay Area | Hamilton Exteriors',
  description: 'Full-service ground-up custom home construction in the Bay Area. 2,000–5,000 sq ft. 10–18 month builds. Design-build under one contract. CSLB #1082377.',
  headline: 'Ground-Up\nConstruction',
  heroImage: imgServiceCustomHomes,
  heroAlt: 'Ground-up custom home construction in the Bay Area by Hamilton Exteriors',
  content: [
    'Ground-up custom home construction gives Bay Area homeowners complete control over layout, materials, energy systems, and architectural style — something no production builder or spec home can match. We manage every construction phase from site preparation and foundation pouring through framing, mechanical rough-ins, insulation, drywall, and final finishes.',
    'Our design-build approach keeps architecture, engineering, and construction under one contract with a single point of accountability, eliminating the finger-pointing and schedule delays that plague multi-contractor projects. Bay Area custom homes typically range from 2,000 to 5,000 square feet with construction timelines of 10\u201318 months depending on complexity.',
    'We build to exceed California\u2019s Title 24 energy standards, incorporating high-performance building envelopes, efficient HVAC systems, and solar-ready electrical panels. According to the National Association of Home Builders, custom homes retain 10\u201315% more value at resale than equivalent-sized production homes in the same neighborhood.',
  ],
  keyFacts: [
    { value: '2K–5K', label: 'Square Feet' },
    { value: '10–18 mo', label: 'Build Timeline' },
    { value: '10–15%', label: 'More Resale Value' },
    { value: '1', label: 'Contract, One Team' },
  ],
  faqs: [
    { question: 'How much does a custom home cost in the Bay Area?', answer: 'Bay Area custom home construction costs $350–$800 per square foot depending on finishes, site conditions, and complexity. A 2,500 sq ft home typically runs $900K–$2M including design, engineering, permits, and construction. Lot preparation adds $50K–$200K.' },
    { question: 'How long does it take to build a custom home?', answer: 'Total timeline is 14–24 months: 4–6 months for design and permitting, then 10–18 months of construction. Hillside sites, complex foundations, and custom finishes extend the timeline.' },
    { question: 'What is design-build and why does it matter?', answer: 'Design-build means one firm handles architecture, engineering, and construction under a single contract. You get one point of contact, aligned incentives (the builder designs for constructability), and faster timelines since construction can overlap with final design phases.' },
  ],
};

const customHomesDesign: SubServiceData = {
  parentService: 'custom-homes',
  parentName: 'Custom Homes',
  typeSlug: 'design',
  title: 'Custom Home Design & Architecture | Bay Area | Hamilton Exteriors',
  description: 'In-house custom home architects in the Bay Area. 3D BIM renderings. Site-specific design for topography, setbacks, and views. 15–20% fewer change orders.',
  headline: 'Design &\nArchitecture',
  heroImage: imgDesignPlanning,
  heroAlt: 'Custom home architectural design and 3D rendering by Hamilton Exteriors',
  content: [
    'Our in-house architects and designers collaborate with you from initial concept through construction-ready blueprints, using building information modeling (BIM) to create detailed 3D renderings that let you walk through your home virtually before a single board is cut.',
    'We design floor plans tailored to your lot\u2019s topography, setback requirements, solar orientation, and view corridors — maximizing natural light and cross-ventilation while maintaining privacy from neighboring properties. Bay Area lots present unique challenges including steep hillside grades, expansive clay soils, and wildfire-urban interface building requirements that generic plan sets cannot address.',
    'Our design packages include architectural plans, structural calculations, electrical and plumbing layouts, Title 24 energy compliance documentation, and landscape integration concepts. According to the American Institute of Architects, homeowners who invest in custom architectural design spend 15\u201320% less on construction change orders compared to those who begin building from incomplete or generic plans.',
  ],
  keyFacts: [
    { value: '3D', label: 'BIM Renderings' },
    { value: '15–20%', label: 'Fewer Change Orders' },
    { value: 'Full', label: 'Document Package' },
    { value: 'Site', label: 'Specific Design' },
  ],
  faqs: [
    { question: 'Do I need my own architect or do you provide one?', answer: 'We provide in-house architects as part of our design-build service. This ensures the designer and builder are aligned from day one, reducing miscommunication and change orders. If you already have an architect, we\'re happy to work with their plans as well.' },
    { question: 'What is BIM and how does it help?', answer: 'Building Information Modeling (BIM) creates a detailed 3D digital model of your home before construction begins. It catches conflicts between structural, mechanical, and electrical systems early — before they become expensive field changes. You also get virtual walk-throughs to experience the design before committing.' },
  ],
};

const customHomesPermits: SubServiceData = {
  parentService: 'custom-homes',
  parentName: 'Custom Homes',
  typeSlug: 'permits',
  title: 'Custom Home Permitting & Engineering | Bay Area | Hamilton Exteriors',
  description: 'Full permit management for Bay Area custom homes. Seismic Design Category D engineering. Geotechnical reports. Active relationships with 5 county planning departments.',
  headline: 'Engineering\n& Permits',
  heroImage: imgDesignEngineering,
  heroAlt: 'Custom home engineering and permit documents by Hamilton Exteriors',
  content: [
    'Bay Area custom home permitting involves coordinating with planning departments, building divisions, fire districts, utility companies, and environmental agencies — a process that can stretch 6\u201312 months without experienced management. We handle structural engineering designed to California\u2019s Seismic Design Category D requirements, geotechnical soils reports, Title 24 energy compliance calculations, and CalGreen mandatory green building standards.',
    'Our permit coordinators maintain active relationships with planning staff in Alameda, Contra Costa, Marin, Napa, and Santa Clara counties, which helps resolve plan check comments quickly and avoid costly redesigns.',
    'For hillside properties, we manage the additional requirements of geologic hazard assessments, grading permits, and drainage engineering that Bay Area jurisdictions require. According to the UC Berkeley Terner Center for Housing Innovation, permit processing time varies by 40\u201360% across Bay Area cities — our experience with each jurisdiction helps us set realistic timelines and avoid the delays that derail budgets.',
  ],
  keyFacts: [
    { value: '5', label: 'County Relationships' },
    { value: '40–60%', label: 'Time Variance by City' },
    { value: 'Seismic D', label: 'Engineering Standard' },
    { value: 'CalGreen', label: 'Compliant' },
  ],
  faqs: [
    { question: 'How long does custom home permitting take?', answer: '6–12 months for a full custom home permit in the Bay Area, depending on the jurisdiction and project complexity. Hillside sites with geologic review requirements take longer. Our relationships with local planning staff help keep the process moving.' },
    { question: 'What engineering reports does a custom home need?', answer: 'Typically: structural engineering (seismic design), geotechnical soils report, Title 24 energy compliance, and sometimes geologic hazard assessment, drainage engineering, and environmental impact review. We coordinate all required reports as part of our permit management service.' },
  ],
};

const customHomesAdditions: SubServiceData = {
  parentService: 'custom-homes',
  parentName: 'Custom Homes',
  typeSlug: 'additions-renovations',
  title: 'Home Additions & Renovations | Bay Area | Hamilton Exteriors',
  description: 'Home additions and major renovations in the Bay Area. Second stories, room extensions, kitchen expansions. Seamless integration with existing architecture. Free estimate.',
  headline: 'Additions &\nRenovations',
  heroImage: imgServiceAdditions,
  heroAlt: 'Home addition seamlessly integrated with existing Bay Area home architecture',
  content: [
    'Home additions and major renovations allow Bay Area homeowners to expand living space without the cost and disruption of selling and purchasing a new home — particularly compelling in a market where the median home price exceeds $1.2 million according to the California Association of Realtors.',
    'We specialize in second-story additions, room extensions, kitchen and bathroom expansions, and whole-house renovations that seamlessly integrate with your home\u2019s existing architecture. Our structural engineers assess load-bearing walls, foundation capacity, and lateral bracing requirements before construction begins, ensuring additions meet California seismic standards.',
    'We match existing rooflines, siding profiles, window styles, and interior finishes so the new construction looks original to the home. Most room additions complete in 10\u201316 weeks from permit approval. For gut renovations, we coordinate all trades under a single construction contract with weekly progress updates and transparent change order pricing.',
  ],
  keyFacts: [
    { value: '10–16 wk', label: 'Build Time' },
    { value: 'Seamless', label: 'Integration' },
    { value: 'All', label: 'Trades Under One Roof' },
    { value: 'Seismic', label: 'Engineered' },
  ],
  faqs: [
    { question: 'Can you match my home\'s existing style?', answer: 'Yes. We match existing rooflines, siding profiles, window casings, trim details, and interior finishes so additions look original to the home. Our finish carpenters specialize in replicating period details for Victorian, Craftsman, and mid-century homes.' },
    { question: 'Do I need to move out during a renovation?', answer: 'For room additions, usually not — we stage construction to maintain access to the rest of the home. For gut renovations that affect the kitchen, bathrooms, or entire floors, we recommend temporary relocation for 4–8 weeks during the most disruptive phases.' },
  ],
};

// ── Additions Sub-Services ────────────────────────────────────────────────────

const additionsSecondStory: SubServiceData = {
  parentService: 'additions',
  parentName: 'Home Additions',
  typeSlug: 'second-story',
  title: 'Second Story Additions | Bay Area | Hamilton Exteriors',
  description: 'Second story additions in the Bay Area. 800–1,500 sq ft. Seismic-engineered. 10–14 week builds. 65–75% resale ROI. No yard space sacrificed. Free consultation.',
  headline: 'Second Story\nAdditions',
  heroImage: imgServiceAdditions,
  heroAlt: 'Second story addition under construction on a Bay Area home',
  content: [
    'Second story additions are the most space-efficient way to expand a Bay Area home — doubling living area without sacrificing any yard space on lots that average just 5,000\u20137,000 square feet in cities like Oakland, Berkeley, and San Jose. Our structural engineers design reinforced foundations and framing systems that support the additional load while meeting California\u2019s Seismic Design Category D requirements for earthquake resistance.',
    'The process begins with a feasibility assessment of your existing foundation, wall framing, and soil conditions to determine whether reinforcement is needed before vertical construction begins. Most second story additions add 800\u20131,500 square feet and include 2\u20133 bedrooms, a bathroom, and often a primary suite with walk-in closet.',
    'Construction typically takes 10\u201314 weeks from permit approval. According to Remodeling Magazine\u2019s Cost vs. Value report, second-story additions in the Pacific West return 65\u201375% of construction cost at resale — and in the Bay Area\u2019s competitive housing market, the value recovery is often higher.',
  ],
  keyFacts: [
    { value: '800–1,500', label: 'Square Feet Added' },
    { value: '10–14 wk', label: 'Build Time' },
    { value: '65–75%', label: 'Resale ROI' },
    { value: '0', label: 'Yard Space Lost' },
  ],
  faqs: [
    { question: 'Does my foundation need reinforcement for a second story?', answer: 'It depends on the original foundation. Homes built before 1960 on unreinforced perimeter foundations typically need reinforcement. Our structural engineer assesses your foundation, soil conditions, and existing framing to determine what\'s needed — often foundation bolting and cripple wall bracing rather than a full replacement.' },
    { question: 'How much does a second story addition cost?', answer: 'Second story additions cost $200\u2013$400 per square foot in the Bay Area. A typical 1,000 sq ft addition (2 bedrooms + bath) runs $250K\u2013$400K including structural engineering, permits, and construction. Hamilton Exteriors provides detailed, itemized estimates.' },
  ],
};

const additionsRoomExtensions: SubServiceData = {
  parentService: 'additions',
  parentName: 'Home Additions',
  typeSlug: 'room-extensions',
  title: 'Room Extensions | Bay Area | Hamilton Exteriors',
  description: 'Room extensions and bump-outs in the Bay Area. Kitchens, bedrooms, living rooms, sunrooms. 200–600 sq ft. 8–12 week builds. Seamless integration.',
  headline: 'Room\nExtensions',
  heroImage: imgFinancingHouse,
  heroAlt: 'Room extension seamlessly integrated with Bay Area home',
  content: [
    'Room extensions expand your existing floor plan outward — adding square footage to kitchens, bedrooms, living rooms, or creating entirely new spaces like sunrooms and family rooms. In the Bay Area, where the median home was built before 1970 according to U.S. Census data, room extensions address the most common complaint among homeowners: floor plans designed for a different era that lack open-concept kitchens, primary suites, or home office space.',
    'We handle structural engineering for load-bearing wall removal, foundation extensions with proper tie-ins to existing footings, and roofline integration that makes the addition look original to the home. Our finish carpenters match existing trim profiles, window casings, and baseboard details so transitions between old and new construction are invisible.',
    'Most room extensions add 200\u2013600 square feet and complete in 8\u201312 weeks from permit approval. We coordinate all trades under a single contract — no juggling separate contractors for framing, electrical, plumbing, and finishes.',
  ],
  keyFacts: [
    { value: '200–600', label: 'Square Feet' },
    { value: '8–12 wk', label: 'Build Time' },
    { value: 'Seamless', label: 'Integration' },
    { value: '1', label: 'Contract, All Trades' },
  ],
  faqs: [
    { question: 'How much does a room extension cost?', answer: 'Bay Area room extensions cost $175\u2013$350 per square foot depending on scope. A 300 sq ft kitchen extension runs $100K\u2013$150K; a 400 sq ft family room addition with foundation work starts at $120K. Costs vary based on finishes, structural modifications, and utility relocations.' },
    { question: 'Can you remove a load-bearing wall as part of the extension?', answer: 'Yes. Our structural engineers design replacement headers or beams to carry the load, allowing us to open up floor plans while maintaining structural integrity. Load-bearing wall removal is one of the most common requests in Bay Area room extension projects.' },
  ],
};

const additionsAdus: SubServiceData = {
  parentService: 'additions',
  parentName: 'Home Additions',
  typeSlug: 'adus-guest-houses',
  title: 'ADUs & Guest Houses | Bay Area | Hamilton Exteriors',
  description: 'ADU and guest house construction in the Bay Area. Detached, garage conversion, and junior ADUs. 60-day permit guarantee. $150K–$300K property value increase.',
  headline: 'ADUs &\nGuest Houses',
  heroImage: imgServiceAdu,
  heroAlt: 'ADU guest house built by Hamilton Exteriors in the Bay Area',
  content: [
    'Accessory dwelling units are the Bay Area\u2019s fastest-growing housing type, with over 4,000 ADU permits issued across the five-county region in 2024 according to the California Department of Housing and Community Development. We build detached backyard ADUs from 400 to 1,200 square feet, convert existing garages into fully finished living spaces, and construct junior ADUs within the footprint of your existing home.',
    'Every ADU project includes design, engineering, permit management, and construction under our 60-day permit guarantee. California\u2019s AB 68 and SB 9 legislation eliminated most local barriers to ADU construction, including minimum lot size requirements, owner-occupancy mandates, and parking replacement rules for garage conversions.',
    'Bay Area homeowners building ADUs typically add $150,000\u2013$300,000 in property value while generating $2,000\u2013$3,500 per month in rental income — making ADU construction one of the highest-ROI improvements available in the current housing market.',
  ],
  keyFacts: [
    { value: '4,000+', label: 'Bay Area ADU Permits (2024)' },
    { value: '$150K–$300K', label: 'Property Value Added' },
    { value: '$2K–$3.5K', label: 'Monthly Rental' },
    { value: '60 day', label: 'Permit Guarantee' },
  ],
  faqs: [
    { question: 'What types of ADUs can I build?', answer: 'Three types: Detached ADU (standalone backyard structure, up to 1,200 sq ft), Garage Conversion (convert existing garage, most cost-effective), and Junior ADU (within the main home\'s footprint, up to 500 sq ft). You can build both a JADU and a detached ADU on the same property.' },
    { question: 'How much rental income can an ADU generate?', answer: 'Bay Area ADU rental income ranges from $2,000/month for a studio to $3,500+/month for a two-bedroom, depending on location, size, and finishes. This makes ADU construction one of the highest-ROI home improvements in the current market.' },
  ],
};

const additionsFullRemodels: SubServiceData = {
  parentService: 'additions',
  parentName: 'Home Additions',
  typeSlug: 'full-remodels',
  title: 'Whole House Remodel | Bay Area | Hamilton Exteriors',
  description: 'Full house remodels and gut renovations in the Bay Area. Electrical, plumbing, HVAC, insulation, finishes. 4–7 months. One contract, one project manager.',
  headline: 'Whole House\nRemodels',
  heroImage: imgServiceCustomHomesFull,
  heroAlt: 'Whole house remodel in progress by Hamilton Exteriors in the Bay Area',
  content: [
    'Whole-house remodels transform outdated Bay Area homes into modern living spaces while preserving the character and neighborhood context that make your location valuable. Our gut renovation process begins with selective demolition, followed by structural assessment and reinforcement where needed, updated electrical service (most pre-1980 Bay Area homes need panel upgrades from 100A to 200A), repiped plumbing replacing galvanized or polybutylene supply lines, modern insulation meeting current Title 24 energy standards, and complete interior finishing.',
    'We coordinate every trade — demolition, framing, electrical, plumbing, HVAC, insulation, drywall, flooring, cabinetry, and painting — under one construction contract with a single project manager providing weekly updates and transparent change order pricing.',
    'According to the National Association of Realtors, a major kitchen remodel alone returns 75% of cost at resale in the Pacific West region. Full remodels typically take 4\u20137 months depending on scope and permit requirements.',
  ],
  keyFacts: [
    { value: '4–7 mo', label: 'Typical Timeline' },
    { value: '75%', label: 'Kitchen Remodel ROI' },
    { value: 'All', label: 'Trades Coordinated' },
    { value: 'Weekly', label: 'Progress Updates' },
  ],
  faqs: [
    { question: 'How much does a whole house remodel cost?', answer: 'Bay Area whole house remodels cost $150\u2013$400 per square foot depending on scope. A gut renovation of a 1,500 sq ft home runs $225K\u2013$600K. Kitchen-focused remodels average $75K\u2013$150K. We provide itemized estimates broken down by trade and material.' },
    { question: 'Should I remodel or tear down and rebuild?', answer: 'Remodeling is usually more cost-effective if the foundation, framing, and layout are fundamentally sound. Tear-down makes sense when the foundation needs full replacement, the layout doesn\'t work at all, or you want to significantly increase the footprint. Our assessment helps you decide.' },
  ],
};

// ── Registry ──────────────────────────────────────────────────────────────────

/** All sub-service pages indexed by `${parentService}/${typeSlug}` */
export const SUB_SERVICES: Record<string, SubServiceData> = {
  // Roofing
  'roofing/asphalt-shingles': roofingAsphaltShingles,
  'roofing/metal': roofingMetal,
  'roofing/tile': roofingTile,
  'roofing/energy': roofingEnergy,
  // Siding
  'siding/vinyl': sidingVinylPage,
  'siding/fiber-cement': sidingFiberCementPage,
  'siding/stucco': sidingStuccoPage,
  'siding/waterproofing': sidingWaterproofingPage,
  // Windows
  'windows/single-hung': windowsSingleHung,
  'windows/single-slider': windowsSingleSlider,
  'windows/sliding-glass-doors': windowsSlidingDoors,
  'windows/picture': windowsPicture,
  'windows/double-hung': windowsDoubleHung,
  'windows/casement': windowsCasement,
  // ADU
  'adu/detached': aduDetached,
  'adu/design': aduDesign,
  'adu/permits': aduPermits,
  'adu/garage-conversions': aduGarageConversion,
  // Custom Homes
  'custom-homes/ground-up': customHomesGroundUp,
  'custom-homes/design': customHomesDesign,
  'custom-homes/permits': customHomesPermits,
  'custom-homes/additions-renovations': customHomesAdditions,
  // Additions
  'additions/second-story': additionsSecondStory,
  'additions/room-extensions': additionsRoomExtensions,
  'additions/adus-guest-houses': additionsAdus,
  'additions/full-remodels': additionsFullRemodels,
};

/** Get all sub-services for a given parent service */
export function getSubServicesForParent(parentService: string): SubServiceData[] {
  return Object.values(SUB_SERVICES).filter(s => s.parentService === parentService);
}
