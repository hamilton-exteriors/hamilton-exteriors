# Hamilton Exteriors — SEO Action Plan

**Generated:** April 6, 2026 (v4) | **Current Score:** 76/100 | **Target:** 90/100

---

## Critical — Fix Immediately

### 1. Fix geo.position on all pSEO pages
**Impact:** 350+ pages | **Effort:** 30 min | **Category:** Technical + Local SEO
- **File:** `src/layouts/Layout.astro:122`
- **Problem:** `<meta name="geo.position" content="37.69427;-122.07887">` is hardcoded to Castro Valley HQ on every page, including Oakland, San Jose, Walnut Creek, etc.
- **Fix:** Make dynamic using city coordinates already available via `getCityProximity()` or city data props. Accept `geoPosition` prop similar to existing `geoPlacename` prop.
- **Score impact:** +3 points (Technical + Local)

### 2. Fix Organization schema @type array
**Impact:** Site-wide | **Effort:** 15 min | **Category:** Schema
- **File:** `src/layouts/Layout.astro` (Organization schema block)
- **Problem:** `"@type": ["RoofingContractor", "GeneralContractor"]` — Google requires single primary type for LocalBusiness rich results.
- **Fix:** Change to `"@type": "RoofingContractor"` and add `"additionalType": "https://schema.org/GeneralContractor"`.
- **Also fix in:** `GeneralCityPage.astro` (LocalBusiness block) — either match the type or convert to pure @id stub.
- **Score impact:** +2 points (Schema)

### 3. Launch review acquisition campaign
**Impact:** Local pack rankings | **Effort:** 2-4 hours setup | **Category:** Local SEO
- **Problem:** Last visible review dated Jan 22, 2026 — 74 days stale. Exceeds 18-day velocity cliff (Sterling Sky research).
- **Fix:** Email/SMS every customer from past 90 days with direct Google review link. Target 5-8 new reviews in 30 days.
- **Also:** Update the 4 hardcoded schema review objects in Layout.astro. Establish quarterly refresh cadence.
- **Score impact:** +3 points (Local + Content)

---

## High — Fix Within 1 Week

### 4. Add pSEO pages to image sitemap
**Impact:** 350+ pages | **Effort:** 1-2 hours | **Category:** Images
- **File:** `src/pages/image-sitemap.xml.ts`
- **Problem:** Filter explicitly excludes service-area posts. Only 21/373 pages have image entries.
- **Fix:** Add pSEO pages with at least hero image per page. Build entries from the static image map or query Ghost for service-area posts.
- **Score impact:** +2 points (Images)

### 5. Fix "Contra Costa County County" schema typo
**Impact:** All Contra Costa city pages | **Effort:** 15 min | **Category:** Schema + On-Page
- **Problem:** Double "County" in containedInPlace schema. Also wrong Wikipedia URL casing (`Contra_costa_county_County`).
- **Fix:** Fix in pSEO template's containedInPlace logic.
- **Score impact:** +1 point (Schema)

### 6. Shorten pSEO city-level title tags
**Impact:** ~47 city pages | **Effort:** 1 hour | **Category:** On-Page
- **Problem:** "Roofing, Siding, ADUs & Custom Homes in Walnut Creek, CA | Hamilton Exteriors" = 80 chars, truncated in SERPs.
- **Fix:** Use pattern like "Walnut Creek Contractor | Hamilton Exteriors" (under 60 chars). City+service pages already have shorter titles.

### 7. Revise pSEO H1 pattern
**Impact:** ~350 pages | **Effort:** 1 hour | **Category:** On-Page + Content
- **Problem:** "Best [Service] Company in [City]" is superlative keyword-stuffing.
- **Fix:** Use natural alternatives: "Roofing Contractors in [City], CA" or "[City] Roof Replacement — Hamilton Exteriors"

### 8. Add SpeakableSpecification to service pages
**Impact:** 6 core service pages | **Effort:** 1 hour | **Category:** GEO
- **Files:** roofing.astro, siding.astro, windows.astro, adu.astro, custom-homes.astro, additions.astro
- **Problem:** SpeakableSpec only on blog posts (via articleJsonLd), not on highest-traffic commercial pages.
- **Fix:** Add `"speakable": { "@type": "SpeakableSpecification", "cssSelector": [".service-hero p", ".faq-answer", "h2 + p"] }` to WebPage schema.
- **Score impact:** +2 points (GEO)

### 9. Remove `author` from Service schema
**Impact:** All service pages | **Effort:** 30 min | **Category:** Schema
- **File:** `src/components/ServicePage.astro`
- **Problem:** `author` is not a valid property on `Service` type.
- **Fix:** Remove from Service block. Add to the WebPage block instead.

### 10. Remove Wikipedia concept pages from sameAs
**Impact:** Site-wide | **Effort:** 15 min | **Category:** Schema
- **File:** `src/layouts/Layout.astro`
- **Remove:** `/wiki/Roofing`, `/wiki/Siding`, `/wiki/General_contractor` from Organization `sameAs`.
- **Keep:** Social profiles, Yelp, CSLB verification URL.

---

## Medium — Fix Within 1 Month

### 11. Create Thumbtack profile
**Impact:** AI search visibility | **Effort:** 2-3 hours | **Category:** Local SEO
- Thumbtack integrates with ChatGPT plugin and Amazon Alexa for contractor discovery.
- Create complete profile with all 6 services, add photos, solicit first 5 reviews.

### 12. Fix llms.txt and llms-full.txt gaps
**Impact:** AI citation accuracy | **Effort:** 30 min | **Category:** GEO
- Add 5 missing blog posts to llms.txt `## Blog & Guides` section
- Add San Mateo County cities to llms-full.txt service areas list
- Add Google Business Profile URL to both files

### 13. Add Blog schema on /blog index
**Impact:** 1 page + all blog posts | **Effort:** 30 min | **Category:** Schema
- **File:** `src/pages/blog/index.astro`
- **Problem:** BlogPosting `isPartOf` references `blog#collection` @id that doesn't exist.
- **Fix:** Add `Blog` or `CollectionPage` schema with `@id: "https://hamilton-exteriors.com/blog#collection"`.

### 14. Add alt text to CompanyCam portfolio images
**Impact:** All pages with project gallery | **Effort:** 2 hours | **Category:** Images + Accessibility
- Use pattern: "[Service] project in [City] by Hamilton Exteriors"
- Even generic descriptive alts are better than empty.

### 15. Create /contact page
**Impact:** Local SEO + citations | **Effort:** 2-3 hours | **Category:** Local + Technical
- Build standalone page with: full NAP in `<address>`, Google Map embed, hours table, service area list, contact form, LocalBusiness schema.
- Link from main nav and footer.

### 16. Create /financing redirect or landing page
**Impact:** Organic traffic capture | **Effort:** 1 hour | **Category:** Technical
- Currently 404s. At minimum, redirect `/financing` to `/#financing`.
- Better: create dedicated landing page for "hamilton exteriors financing" queries.

### 17. Resolve BBB entity name mismatch
**Impact:** Citation matching | **Effort:** 30 min | **Category:** Local SEO
- BBB: "Hamilton Exteriors, Inc" vs everywhere else: "Hamilton Exteriors"
- If legal entity includes "Inc", update schema + GBP. If not, correct BBB listing.

### 18. Fix `areaServed` schema type
**Impact:** Schema validation | **Effort:** 15 min | **Category:** Schema
- **File:** Layout.astro:214-220
- Change `"@type": "County"` to `"@type": "AdministrativeArea"` (County is not a Schema.org type).

### 19. Add `@context` to lean schema reference
**Impact:** Non-full-org pages | **Effort:** 15 min | **Category:** Schema
- **File:** Layout.astro:341-346
- Add `"@context": "https://schema.org"` to the lean @id-only stub.

### 20. Replace Person.image with actual headshot
**Impact:** About page E-E-A-T | **Effort:** 30 min | **Category:** Schema + Content
- **File:** `src/pages/about/alex-hamilton-li.astro:26`
- Replace `/og-default.jpg` with actual photo of Alex. Minimum 300x300px.

### 21. Add emergency roofing content to top city pages
**Impact:** High-converting traffic | **Effort:** 2-3 hours | **Category:** Content + Local
- Add "Emergency Roof Repair in [City]" section to Oakland, San Jose, and other top city roofing pages.
- "Emergency roof repair [city]" is a highest-converting intent currently going to competitors.

### 22. Expand short meta descriptions
**Impact:** CTR improvement | **Effort:** 1 hour | **Category:** On-Page
- Extend to 150-160 chars: /roofing (144), /blog (125), blog cost post (135), pSEO template.

### 23. Add srcset to service card images
**Impact:** Mobile performance | **Effort:** 1 hour | **Category:** Images + Performance
- **Files:** ServiceCard.astro, ServicePage.astro style cards
- Add srcset at [300, 450, 566] with proper `sizes` attribute.

---

## Low — Backlog

### 24. Create YouTube channel with 3 core videos
**Impact:** Highest brand-citation correlation (~0.737) | **Effort:** 1-2 weeks
- Suggested videos: "Bay Area Roof Replacement Cost 2026", "How to Read a Roofing Estimate", "James Hardie vs Vinyl Siding: Bay Area Comparison"

### 25. Create Wikidata entity
**Impact:** Entity resolution for AI systems | **Effort:** 1-2 hours
- Free, no Wikipedia notability required. Strengthens entity graph.

### 26. Add Google Business Profile URL to schema sameAs
**Impact:** Entity linking | **Effort:** 15 min
- The 52 verified reviews live on GBP. Link the on-site entity to GBP.

### 27. Fix og:type on blog posts
**Impact:** Minor social sharing signal | **Effort:** 15 min
- Pass `type="article"` in blog post layout instead of default "website".

### 28. Fix blog index heading semantics
**Impact:** Minor | **Effort:** 15 min
- Make subtitle a `<p>` instead of H2 that duplicates H1.

### 29. Replace stock blog images with original photos
**Impact:** E-E-A-T signals | **Effort:** Ongoing
- Swap top-performing posts to CompanyCam project photos first.

### 30. Verify security headers on Railway
**Effort:** 30 min
- Check HSTS, CSP, X-Frame-Options, Permissions-Policy via `curl -I`.
- Add via Railway middleware or astro.config.mjs if missing.

### 31. Add `max-snippet:-1` meta tag
**Effort:** 15 min
- `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`
- Allows Google maximum text extraction for AI Overviews.

### 32. Pursue BBB Accreditation
**Effort:** $500/year
- Upgrades A- to A/A+, adds blue seal trust badge. Appeals to price-conscious and first-timer segments.

### 33. Add Amazonbot to robots.txt
**Effort:** 5 min
- Explicitly allow Amazon's AI assistant crawler.

### 34. Grow review count to 100+
**Effort:** Ongoing (operational)
- Post-project automated review request workflow. 100+ reviews is the confident AI citation threshold.

---

## Score Projection

If items 1-10 are completed:
- **Technical:** 82 -> 88 (+6)
- **Content:** 72 -> 75 (+3)
- **On-Page:** 79 -> 86 (+7)
- **Schema:** 75 -> 86 (+11)
- **GEO:** 81 -> 86 (+5)
- **Projected overall: 76 -> 84 (+8 points)**

If items 1-23 are completed:
- **Projected overall: 76 -> 91 (+15 points)**
