/**
 * Service templates for the pSEO system.
 *
 * Each template defines patterns that get interpolated with city data
 * to produce unique city+service pages. Patterns use {city}, {county},
 * {serviceName}, and {keyFeature} placeholders.
 *
 * Content sourced from existing service data files in src/data/services/.
 */

export interface ServiceTemplate {
  serviceSlug: string;
  serviceName: string;
  heroHeadlinePattern: string;
  heroFormTitle: string;
  heroFormSubtitle: string;
  serviceType: string;
  serviceOptions?: string[];
  heroImageKey: string;
  titlePattern: string;
  descriptionPattern: string;
  faqTemplates: Array<{ questionPattern: string; answerPattern: string }>;
  stylesHeading: string;
  stylesItems: Array<{ title: string; description: string; imageKey: string }>;
}

export const SERVICE_TEMPLATES: ServiceTemplate[] = [
  // ── Roofing ───────────────────────────────────────────────────────────
  {
    serviceSlug: 'roofing',
    serviceName: 'Roofing',
    heroHeadlinePattern: 'Architect-Led Roofing in {city}',
    heroFormTitle: 'Get Your Free Roof Inspection',
    heroFormSubtitle:
      "We'll contact you in 3-5 minutes to schedule your inspection.",
    serviceType: 'Roofing',
    heroImageKey: 'heroRoofing',
    titlePattern: 'Reliable Roofing in {city}, CA | Hamilton Exteriors',
    descriptionPattern:
      'Hamilton Exteriors provides architect-led roofing services in {city}, {county} County, CA. Composite shingles, metal roofs, tile, and solar. CSLB #1082377.',
    faqTemplates: [
      {
        questionPattern: 'How much does a new roof cost in {city}?',
        answerPattern:
          'Roof replacement in {city} starts around $15,000 and can exceed $100,000 depending on size, pitch, material, and complexity. With median home prices at {medianHomePrice} in {city}, a new roof is one of the best investments you can make. We provide inspections with exact pricing.',
      },
      {
        questionPattern: 'What roofing materials work best for {city} homes?',
        answerPattern:
          'For {city} homes in {county} County, we most often recommend asphalt architectural shingles for their balance of durability and value. Tile roofing is popular in neighborhoods like {neighborhood} for its aesthetic appeal, and metal roofs are ideal for energy efficiency in the Bay Area climate.',
      },
      {
        questionPattern: 'How long does a roof replacement take in {city}?',
        answerPattern:
          'Most roof replacements in {city} take 3-5 days depending on the size and complexity. We handle all permits required by {county} County and keep your property clean throughout the process.',
      },
      {
        questionPattern: 'Does Hamilton Exteriors offer roof financing in {city}?',
        answerPattern:
          'Yes, we offer flexible financing options for {city} homeowners, including low down payment plans with monthly payments that fit your budget. Get pre-qualified during your roof inspection.',
      },
      {
        questionPattern: 'Is Hamilton Exteriors licensed to work in {city}?',
        answerPattern:
          'Absolutely. Hamilton Exteriors is fully licensed, bonded, and insured to perform roofing work throughout {county} County, including {city} and surrounding neighborhoods. We carry a California CSLB license and comprehensive liability coverage.',
      },
    ],
    stylesHeading: 'What Roofing Styles Are Available?',
    stylesItems: [
      {
        title: 'Asphalt Shingles',
        description:
          'Composite shingles are durable roofing materials made from a mixture of fiberglass, asphalt, and mineral granules. They offer excellent weather resistance and come in a variety of styles and colors to suit different architectural designs.',
        imageKey: 'roofingAsphalt',
      },
      {
        title: 'Metal Roofs',
        description:
          'Metal roofs offer outstanding longevity and energy efficiency, lasting up to 50 years or more. They come in various styles and colors, providing excellent protection against extreme weather while reflecting solar radiant heat to reduce cooling costs.',
        imageKey: 'roofingMetal',
      },
      {
        title: 'Tile Shingles',
        description:
          'Tile roofing offers exceptional durability and aesthetic appeal, with options ranging from traditional clay to modern concrete designs. These versatile materials provide excellent insulation and fire resistance, making them a popular choice for homeowners seeking long-lasting, attractive roofing solutions.',
        imageKey: 'roofingTile',
      },
      {
        title: 'Energy Roofs',
        description:
          'The GAF Energy roof integrates solar technology directly into roofing materials, combining energy production with traditional roof protection. This innovative system offers a sleek, low-profile alternative to conventional solar panels while providing clean energy and potential savings on electricity bills.',
        imageKey: 'roofingFlat',
      },
    ],
  },

  // ── Siding ────────────────────────────────────────────────────────────
  {
    serviceSlug: 'siding',
    serviceName: 'Siding',
    heroHeadlinePattern: 'James Hardie Elite Preferred Siding in {city}',
    heroFormTitle: 'Get Your Free Siding Inspection',
    heroFormSubtitle:
      "We'll contact you in 3-5 minutes to schedule your inspection.",
    serviceType: 'Siding',
    heroImageKey: 'serviceSiding',
    titlePattern: 'Durable Siding in {city}, CA | Hamilton Exteriors',
    descriptionPattern:
      'Hamilton Exteriors — James Hardie Elite Preferred siding installer in {city}, {county} County. Fiber cement, vinyl, stucco, and waterproofing. CSLB #1082377.',
    faqTemplates: [
      {
        questionPattern: 'How much does siding replacement cost in {city}?',
        answerPattern:
          'Siding replacement in {city} typically ranges from $8,000 to $30,000 depending on your home size and material choice. James Hardie fiber cement is our most popular option for {county} County homes. We provide inspections with detailed estimates.',
      },
      {
        questionPattern: 'What siding material is best for {city} weather?',
        answerPattern:
          'For {city} homes, we recommend James Hardie fiber cement siding for its superior weather resistance and 30-year warranty. It handles the Bay Area\'s marine air and temperature swings better than wood or vinyl. Many homes in {neighborhood} have switched to fiber cement.',
      },
      {
        questionPattern: 'How long does siding installation take in {city}?',
        answerPattern:
          'Most siding projects in {city} take 1-2 weeks depending on home size. We handle all {county} County permits and protect your landscaping throughout the installation.',
      },
      {
        questionPattern: 'Do you offer waterproofing with siding in {city}?',
        answerPattern:
          'Yes. Every siding installation in {city} includes comprehensive waterproofing — moisture barriers, flashing, and caulking. This is especially important for homes in {county} County where seasonal rain can cause hidden damage.',
      },
      {
        questionPattern: 'Does Hamilton Exteriors offer siding financing in {city}?',
        answerPattern:
          'Yes, we offer financing for siding projects in {city} with approved credit. Get pre-qualified during your inspection — most homeowners pay between $150-$300/month.',
      },
    ],
    stylesHeading: 'What Siding Options Are Available?',
    stylesItems: [
      {
        title: 'Vinyl Siding',
        description:
          'Vinyl siding is a versatile and durable exterior cladding made from PVC resin. It provides excellent resistance to weather, pests, and moisture, while requiring minimal maintenance. Available in a wide range of colors, textures, and styles.',
        imageKey: 'sidingVinyl',
      },
      {
        title: 'Fiber Cement Siding',
        description:
          'Fiber cement siding, particularly James Hardie products, is a premium exterior cladding made from a blend of cement, sand, and cellulose fibers. Renowned for its durability, it resists fire, pests, and harsh weather conditions while requiring minimal maintenance.',
        imageKey: 'sidingFiberCement',
      },
      {
        title: 'Stucco Siding',
        description:
          'Stucco is a timeless and durable exterior finish made from a mixture of cement, sand, lime, and water. Known for its excellent weather resistance and energy efficiency, stucco provides a seamless, textured look that enhances both traditional and modern architectural designs.',
        imageKey: 'sidingWood',
      },
      {
        title: 'Waterproofing',
        description:
          "Waterproofing ensures a home's exterior is protected from moisture, preventing water damage and mold. By creating a reliable barrier, it enhances the durability of siding materials and helps maintain a home's structural integrity in all weather conditions.",
        imageKey: 'sidingStucco',
      },
    ],
  },

  // ── Windows ───────────────────────────────────────────────────────────
  {
    serviceSlug: 'windows',
    serviceName: 'Windows',
    heroHeadlinePattern: 'Energy-Efficient Window Installation in {city}',
    heroFormTitle: 'Get Your Free Window Quote',
    heroFormSubtitle:
      "We'll contact you in 3-5 minutes to schedule your inspection.",
    serviceType: 'Windows',
    heroImageKey: 'heroWindows',
    titlePattern: 'Energy-Efficient Windows in {city}, CA | Hamilton Exteriors',
    descriptionPattern:
      'Hamilton Exteriors provides energy-efficient window installation in {city}, {county} County. Single hung, double hung, sliding, casement, and more. CSLB #1082377.',
    faqTemplates: [
      {
        questionPattern: 'How much do replacement windows cost in {city}?',
        answerPattern:
          'Replacement windows in {city} typically cost $400-$1,200 per window depending on size, style, and glass options. With {county} County energy rebates, many {city} homeowners save on the total cost. We provide in-home quotes with detailed pricing.',
      },
      {
        questionPattern: 'What window style is best for {city} homes?',
        answerPattern:
          'The best window style depends on your home\'s architecture and ventilation needs. Double hung windows are our most popular in {city} for their classic look and easy cleaning. For homes in {neighborhood}, casement windows offer superior airflow and modern aesthetics.',
      },
      {
        questionPattern: 'How long does window replacement take in {city}?',
        answerPattern:
          'Most window replacement projects in {city} take 1-2 days for a full home. We install from the exterior whenever possible to minimize disruption to your daily life.',
      },
      {
        questionPattern: 'Are energy-efficient windows worth it in {city}?',
        answerPattern:
          'Absolutely. {city} homeowners with dual-pane Low-E windows typically save 15-25% on energy bills. With median home prices at {medianHomePrice}, new windows also boost resale value. Many {county} County utility rebates are available.',
      },
      {
        questionPattern: 'Does Hamilton Exteriors install bay windows in {city}?',
        answerPattern:
          'Yes, we install bay, bow, picture, garden, and specialty windows throughout {city} and {county} County. Bay windows are especially popular in neighborhoods like {neighborhood} where they maximize natural light and views.',
      },
    ],
    stylesHeading: 'What Window Styles Are Available?',
    stylesItems: [
      {
        title: 'Single Hung',
        description:
          "A single-hung window features a fixed upper sash and a movable lower sash that slides vertically. It's space-efficient, easy to use, and offers great ventilation with a classic, versatile design.",
        imageKey: 'windowDoubleHung',
      },
      {
        title: 'Single Slider',
        description:
          "A single slider window has one fixed pane and one sliding pane for easy horizontal operation. It's space-efficient, versatile, and offers excellent ventilation with a modern look.",
        imageKey: 'windowCasement',
      },
      {
        title: 'Sliding Glass Doors',
        description:
          'A sliding glass door features large glass panels that glide smoothly on tracks, offering easy access, natural light, and a sleek, space-saving design.',
        imageKey: 'windowSliding',
      },
      {
        title: 'Picture Windows',
        description:
          'A picture window is a large, fixed-pane window that provides expansive views and abundant natural light. Its clean, modern design enhances any space while improving energy efficiency.',
        imageKey: 'windowBay',
      },
      {
        title: 'Double Hung',
        description:
          'A double-hung window has two movable sashes that slide vertically, offering versatile ventilation and easy cleaning. Its classic design fits a variety of architectural styles.',
        imageKey: 'windowPicture',
      },
      {
        title: 'Casement Windows',
        description:
          'A casement window features a single sash that opens outward on side hinges, operated by a crank mechanism. It provides excellent ventilation, unobstructed views, and a tight seal for superior energy efficiency.',
        imageKey: 'windowGarden',
      },
    ],
  },

  // ── ADU ────────────────────────────────────────────────────────────────
  {
    serviceSlug: 'adu',
    serviceName: 'ADU',
    heroHeadlinePattern: 'ADU Builders in {city} — Design Through Occupancy',
    heroFormTitle: 'Get Your Free ADU Consultation',
    heroFormSubtitle:
      "We'll contact you in 3-5 minutes to discuss your ADU project.",
    serviceType: 'ADU',
    heroImageKey: 'aduHero',
    titlePattern: 'ADU Builder in {city}, CA | Design & Construction | Hamilton Exteriors',
    descriptionPattern:
      'Hamilton Exteriors is a full-service ADU builder in {city}, {county} County. Design, architecture, engineering, permitting, and construction — all under one roof.',
    faqTemplates: [
      {
        questionPattern: 'How much does an ADU cost in {city}?',
        answerPattern:
          'ADU costs in {city} typically range from $150,000 to $350,000 depending on size, finishes, and whether it\'s a new build or garage conversion. With median home prices at {medianHomePrice}, an ADU can add significant value. We provide consultations with detailed estimates.',
      },
      {
        questionPattern: 'Can I build an ADU on my property in {city}?',
        answerPattern:
          'California\'s ADU laws make it possible to build on most residential lots in {city}. {county} County has streamlined the permitting process. We evaluate your property\'s potential during your initial consultation, including setbacks, utility access, and local zoning.',
      },
      {
        questionPattern: 'How long does it take to build an ADU in {city}?',
        answerPattern:
          'From design to move-in, most ADU projects in {city} take 8-12 months. The {county} County permitting process typically takes 60-90 days, and construction runs 4-6 months. Our 60-day permit guarantee keeps your timeline on track.',
      },
      {
        questionPattern: 'Does Hamilton Exteriors handle ADU permits in {city}?',
        answerPattern:
          'Yes. We handle all ADU permitting in {city} and throughout {county} County — architectural plans, structural engineering, Title 24 energy compliance, and city submissions. Our 60-day permit guarantee means we manage the entire process.',
      },
      {
        questionPattern: 'What types of ADUs can I build in {city}?',
        answerPattern:
          'In {city}, you can build detached ADUs (up to 1,200 sq ft), garage conversions, attached additions, and junior ADUs (up to 500 sq ft). Many homeowners in {neighborhood} are choosing detached ADUs for rental income or multi-generational living.',
      },
    ],
    stylesHeading: 'What ADU Services Are Available?',
    stylesItems: [
      {
        title: 'Detached ADUs',
        description:
          'Standalone backyard homes that offer maximum privacy and flexibility. Perfect for guest suites, rental units, or home offices. We handle design, engineering, permits, and construction from start to finish.',
        imageKey: 'serviceAdu',
      },
      {
        title: 'Design & Architecture',
        description:
          'Our in-house architects create custom ADU floor plans, 3D renderings, and construction documents tailored to your lot. We maximize square footage within local zoning codes and design for natural light, privacy, and flow.',
        imageKey: 'financingHouse',
      },
      {
        title: 'Engineering & Permits',
        description:
          'We handle structural engineering, Title 24 energy compliance, and all permit applications. Our 60-day permit guarantee means your project stays on schedule. Bay Area ADU permitting is complex — we navigate it daily.',
        imageKey: 'financingWorker',
      },
      {
        title: 'Garage Conversions',
        description:
          'Transform your existing garage into a fully functional living space. Garage conversions are the most cost-effective ADU option — no new foundation required. We handle structural modifications, utilities, and finishes.',
        imageKey: 'serviceAdditions',
      },
    ],
  },

  // ── Custom Homes ──────────────────────────────────────────────────────
  {
    serviceSlug: 'custom-homes',
    serviceName: 'Custom Homes',
    heroHeadlinePattern: 'Custom Home Builders in {city} — Architect-Led',
    heroFormTitle: 'Get Your Free Consultation',
    heroFormSubtitle:
      "Tell us about your dream home. We'll call within 5 minutes to discuss your project.",
    serviceType: 'Custom Home',
    heroImageKey: 'serviceCustomHomesFull',
    titlePattern: 'Custom Home Builder in {city}, CA | Hamilton Exteriors',
    descriptionPattern:
      'Hamilton Exteriors is a full-service custom home builder in {city}, {county} County. Design, architecture, engineering, permitting, and construction — all under one roof.',
    faqTemplates: [
      {
        questionPattern: 'How much does it cost to build a custom home in {city}?',
        answerPattern:
          'Custom home construction in {city} typically costs $350-$600 per square foot depending on finishes, complexity, and lot conditions. With land values at {medianHomePrice} in {city}, a custom build can be more cost-effective than buying. We provide detailed estimates during your initial consultation.',
      },
      {
        questionPattern: 'How long does it take to build a custom home in {city}?',
        answerPattern:
          'Most custom homes in {city} take 12-18 months from design to completion. The {county} County permitting process adds 2-4 months. We manage every phase so there are no gaps between design, permits, and construction.',
      },
      {
        questionPattern: 'Does Hamilton Exteriors handle permits for custom homes in {city}?',
        answerPattern:
          'Yes. We handle all custom home permitting in {city} and {county} County — architectural plans, structural engineering, soils reports, Title 24 energy compliance, and city submissions. We navigate {city} planning departments daily.',
      },
      {
        questionPattern: 'Can I build a modern farmhouse in {city}?',
        answerPattern:
          'Absolutely. Modern farmhouse is one of our most requested styles in {city}. We design and build everything from contemporary modern to craftsman and Mediterranean. Many homeowners in {neighborhood} are choosing modern designs that complement the neighborhood character.',
      },
      {
        questionPattern: 'Do you build on hillside lots in {city}?',
        answerPattern:
          'Yes. Many lots in {city} and {county} County are on slopes. We have extensive experience with hillside construction, including retaining walls, custom foundations, and grading. Our engineers evaluate every lot for feasibility.',
      },
    ],
    stylesHeading: 'What Custom Home Services Are Available?',
    stylesItems: [
      {
        title: 'Ground-Up Construction',
        description:
          'Build your dream home from the ground up. We manage every phase — site prep, foundation, framing, electrical, plumbing, and finishing. One team, one point of contact, no miscommunication.',
        imageKey: 'serviceCustomHomes',
      },
      {
        title: 'Design & Architecture',
        description:
          'Our in-house architects and designers work with you from concept to blueprints. We create floor plans, 3D renderings, and construction documents that bring your vision to life — tailored to your lot, budget, and lifestyle.',
        imageKey: 'designPlanning',
      },
      {
        title: 'Engineering & Permits',
        description:
          "We handle structural engineering, Title 24 energy compliance, soils reports, and all permit applications. Bay Area permitting is complex — we navigate city planning departments daily so you don't have to.",
        imageKey: 'designEngineering',
      },
      {
        title: 'Additions & Renovations',
        description:
          'Expand your home with second story additions, room additions, or full-scale renovations. We handle structural engineering, load-bearing wall removal, and seamless integration with your existing home.',
        imageKey: 'serviceAdditions',
      },
    ],
  },

  // ── Additions ─────────────────────────────────────────────────────────
  {
    serviceSlug: 'additions',
    serviceName: 'Home Additions',
    heroHeadlinePattern: 'Home Additions in {city} — Second Story to Ground Floor',
    heroFormTitle: 'Get Your Free Consultation',
    heroFormSubtitle:
      "We'll contact you in 3-5 minutes to discuss your project.",
    serviceType: 'Addition',
    heroImageKey: 'serviceAdditions',
    titlePattern: 'Home Additions & Construction in {city}, CA | Hamilton Exteriors',
    descriptionPattern:
      'Hamilton Exteriors builds home additions, ADUs, second stories, and custom homes in {city}, {county} County. Design, engineering, permits, and construction — all under one roof.',
    faqTemplates: [
      {
        questionPattern: 'How much does a home addition cost in {city}?',
        answerPattern:
          'Home additions in {city} typically cost $200-$500 per square foot depending on scope and finishes. A second story addition usually runs $250,000-$500,000. With median home prices at {medianHomePrice} in {city}, adding space is often more economical than moving. Consultations available.',
      },
      {
        questionPattern: 'Can I add a second story to my home in {city}?',
        answerPattern:
          'Most single-story homes in {city} can support a second story addition with proper structural engineering. We evaluate your foundation, framing, and local zoning during your initial consultation. Many homes in {neighborhood} have successfully added second stories.',
      },
      {
        questionPattern: 'How long does a home addition take in {city}?',
        answerPattern:
          'Most home additions in {city} take 3-6 months from permit to completion. Second story additions are typically 4-6 months. We handle all {county} County permits and manage construction so you have one point of contact.',
      },
      {
        questionPattern: 'Does Hamilton Exteriors handle permits for additions in {city}?',
        answerPattern:
          'Yes. We handle all permitting for home additions in {city} and {county} County — architectural plans, structural engineering, and city submissions. We work with {city} planning departments regularly.',
      },
      {
        questionPattern: 'Can I live in my home during the addition in {city}?',
        answerPattern:
          'In most cases, yes. We phase construction to minimize disruption. For second story additions, there may be a brief period where certain rooms are inaccessible. We create a detailed plan before starting so you know exactly what to expect.',
      },
    ],
    stylesHeading: 'What Types of Home Additions Are Available?',
    stylesItems: [
      {
        title: 'Second Story Additions',
        description:
          'Double your living space without giving up yard. We handle structural engineering, load calculations, and permits for full second-story builds. Most projects completed in 8-12 weeks.',
        imageKey: 'serviceAdditions',
      },
      {
        title: 'Room Extensions',
        description:
          'Expand your kitchen, add a bedroom, or open up your living area with a seamless room addition. We match your existing roofline, siding, and finishes so it looks like it was always there.',
        imageKey: 'financingHouse',
      },
      {
        title: 'ADUs & Guest Houses',
        description:
          'Detached ADUs, garage conversions, and junior ADUs that add living space and rental income. Full design-build with our 60-day permit guarantee. Bay Area ADU experts since 2018.',
        imageKey: 'serviceAdu',
      },
      {
        title: 'Full Remodels',
        description:
          'Gut renovations that transform your entire home. We handle demo, structural changes, electrical, plumbing, and finishing — one team managing every trade so nothing falls through the cracks.',
        imageKey: 'serviceCustomHomes',
      },
    ],
  },
];

/**
 * Look up a service template by slug.
 */
export function getServiceTemplate(
  serviceSlug: string,
): ServiceTemplate | undefined {
  return SERVICE_TEMPLATES.find((t) => t.serviceSlug === serviceSlug);
}

/**
 * All service slugs in the system.
 */
export const SERVICE_SLUGS = SERVICE_TEMPLATES.map(
  (t) => t.serviceSlug,
) as string[];
