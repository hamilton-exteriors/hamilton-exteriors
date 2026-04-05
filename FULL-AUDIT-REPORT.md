# Hamilton Exteriors — Full SEO Audit Report

**Site:** hamilton-exteriors.com
**Audit Date:** April 5, 2026
**Pages Crawled:** 534 (sitemap) / 262 (Lighthouse tested)
**Business Type:** Service Area Business (SAB) — Bay Area Exterior Contractor
**Stack:** Astro 6.1 + Tailwind v4, SSR on Railway, Ghost CMS (blog)

---

## SEO Health Score: 79 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 88 | 19.4 |
| Content Quality | 23% | 72 | 16.6 |
| On-Page SEO | 20% | 85 | 17.0 |
| Schema / Structured Data | 10% | 78 | 7.8 |
| Performance (CWV) | 10% | 95 | 9.5 |
| AI Search Readiness | 10% | 74 | 7.4 |
| Images | 5% | 80 | 4.0 |
| **TOTAL** | **100%** | | **81.7** |

### Adjustments
- Content quality penalized for pSEO template duplication risk (-5)
- Local SEO cross-score: 74/100 (not weighted separately but informs on-page and content)
- **Final adjusted score: 79/100**

---

## Executive Summary

### Top 5 Critical Issues

1. **County+service pages are ~90% identical to their first city's page** — 30 pages at risk of Google's "scaled content" filter. The county roofing page uses Oakland's seed data verbatim.
2. **`/roofing` and `/siding` pages missing `Service` schema blocks** — `WebPage.about` references IDs that don't exist, breaking entity resolution.
3. **Only 52 Google reviews for a 5-county premium contractor** — below the Sterling Sky 18-day velocity threshold. No "Leave a Review" CTA anywhere on site.
4. **Rich city-specific seed data (`roofingNote`, `sidingNote`, `windowNote`, `homeStyles`, `climateFactor`, `commonIssue`) exists in code but is NOT rendered on pages** — the biggest missed content differentiation opportunity.
5. **`/buy` page returns all zeros in Lighthouse** — page appears broken or entirely client-side rendered.

### Top 5 Quick Wins

1. **Wire unused seed data into pSEO templates** — `roofingNote`, `sidingNote`, `windowNote` are already written per city but never rendered. Instant unique content.
2. **Fix Sunday `openingHoursSpecification`** — remove the Sunday entry (currently reads as "open 24h").
3. **Add "Leave a Google Review" CTA** to footer and post-estimate confirmation page.
4. **Add `Service` schema to `/roofing` and `/siding`** — copy the pattern already used on county pages.
5. **Fix Unicode replacement characters** in author ProfilePage name and BlogPosting descriptions (em-dashes corrupted in Ghost-to-Astro pipeline).

---

## 1. Technical SEO — Score: 88/100

### Crawlability
- **robots.txt:** Well-configured. Allows major search + AI crawlers, blocks `/api/`, blocks training-only crawlers (CCBot, anthropic-ai, cohere-ai). Crawl-delay: 2. References both sitemaps and llms.txt.
- **Sitemaps:** `sitemap-index.xml` -> `sitemap-0.xml` (534 URLs) + `image-sitemap.xml`. No priority/changefreq values (acceptable -- Google ignores these). All lastmod dates March 30 - April 5, 2026.
- **Crawl budget:** 534 URLs is well within budget for a site this size. The 507 pSEO pages are SSR-rendered HTML -- no JS rendering barrier.

### Indexability
- **Canonical tags:** Present on all pages, derived from `Astro.url.pathname` with no trailing slash -- consistent with sitemap format.
- **Meta robots:** Not explicitly set on any audited page (defaults to index,follow -- correct).
- **No noindex issues detected.**

### URL Structure
- Clean hierarchical URLs: `/service-areas/{county}/{city}/{service}`
- No parameterized URLs in sitemap
- Consistent slug format with `-ca` suffix on geographic pages

### Security
- HTTPS enforced (Railway default)

### Issues
| Issue | Severity |
|-------|----------|
| `/buy` page scores 0/0/0/0 in Lighthouse -- broken or CSR-only | Critical |
| 11 H1 tags on homepage (should be 1) | Medium |
| No `<meta name="robots">` tag on any page (relies on default) | Low |
| Missing Open Graph tags on homepage | Medium |

---

## 2. Content Quality — Score: 72/100

### E-E-A-T Assessment
**Strong.** Named founder (Alex Hamilton Li) with verifiable CSLB license (#1082377), architect background, and detailed ProfilePage. Author byline on every blog post with credentials. Manufacturer certifications (GAF, Owens Corning, CertainTeed, James Hardie Elite) prominently displayed. 50-year warranty is a genuine differentiator.

### Blog Content (13 posts)
Well-written, Bay Area-specific content. The fire zone roofing article is the highest-citability content on the site -- external citations (CAL FIRE, PRC 4291, Chapter 7A), named data (1991 Oakland Hills Fire statistics), itemized cost breakdowns. Blog posts average 1,500-2,500+ words -- good depth.

### pSEO Content Quality (507 pages)

**What's unique per page:**
- City name, county name, 3-10 neighborhood names (rotated by hash)
- Median home price, population, keyFeature
- County-specific FAQ content (seismic codes, fire zones, coastal climate, ADU law, Title 24)
- City-specific FAQ content (3 questions using neighborhoods, home prices, key features)

**What's duplicated across pages (same service):**
- Entire "Styles Offered" section -- word-for-word identical descriptions
- FAQ answer structures -- only city/neighborhood tokens change
- Hero form title/subtitle
- All section ordering and boilerplate sections

**Critical: Unused seed data**
The `city-seed-data.ts` file contains rich, genuinely unique content per city that is **never rendered**:
- `homeStyles` -- e.g., "1920s Craftsman bungalows and Tudor Revivals in Rockridge/Temescal"
- `climateFactor` -- e.g., "marine fog in West Oakland, 10-15F warmer in the Hills, VHFHSZ fire zones above Highway 13"
- `commonIssue` -- e.g., "extensive dry rot in original redwood siding on pre-war homes"
- `roofingNote` -- e.g., "Hills above Highway 13 are VHFHSZ -- Class A fire-rated roofing required"
- `sidingNote` -- e.g., "Original redwood shiplap on pre-1940 homes, many covered with asbestos shingles"
- `windowNote` -- e.g., "Noise from I-880, I-580, and BART drives demand for STC 35+ glazing"
- `microclimate`, `eraBreakdown`, `climateZone`

**Wiring this data into templates is the single highest-impact content improvement available.**

### Content Duplication Risk Matrix

| Comparison | Similarity | Risk |
|-----------|-----------|------|
| County+service vs first city+service (e.g., Alameda roofing vs Oakland roofing) | ~90% | **HIGH** |
| Same-county city+service pages (e.g., Oakland roofing vs Berkeley roofing) | ~75% | Medium |
| Cross-county city+service pages (e.g., Oakland roofing vs San Jose roofing) | ~70% | Medium |
| Same city, different service (e.g., Oakland roofing vs Oakland siding) | ~40% | Low |

---

## 3. On-Page SEO — Score: 85/100

### Title Tags
- Homepage: "Bay Area Design-Build & Exteriors Contractor | Hamilton Exteriors" -- good
- County pages: "[County] County Roofing & Exteriors | Hamilton Exteriors" -- good
- City pages: "Roofing & Exteriors in [City], CA | Hamilton Exteriors" -- good
- Service pages: "Reliable Roofing in [City], CA | Hamilton Exteriors" -- good

### Meta Descriptions
- County meta descriptions include phone number and CSLB# -- strong SERP trust signals
- City pages: 155-character range with city name and service keywords

### Heading Structure
- **Homepage: 11 H1 tags** -- should be exactly 1. Each section has its own H1.
- Inner pages: properly structured with single H1

### Internal Linking
- pSEO pages link to nearby cities within same county only -- no cross-county links
- Blog posts do not interlink with pSEO city pages (missed opportunity)
- Service pages link down to city+service pages via county hub

### Geo Meta Tags
- `geo.region` and `geo.placename` implemented in Layout.astro with dynamic props -- good

### Issues
| Issue | Severity |
|-------|----------|
| Homepage has 11 H1 tags | High |
| No Open Graph tags on homepage | Medium |
| No cross-county internal links on city pages | Medium |
| Blog posts don't link to relevant city pages | Medium |
| H2s are statement-format not question-format (hurts AI extraction) | Medium |

---

## 4. Schema / Structured Data — Score: 78/100

### Current Implementation

| Page Type | Schema Types | Status |
|-----------|-------------|--------|
| Homepage | Organization (dual-type), WebSite, ImageGallery x3, FAQPage | Good -- 6 blocks |
| Service pages (/roofing, /siding) | BreadcrumbList, WebPage, Organization | **Missing Service block** |
| Blog index | CollectionPage, ItemList, Organization (stripped) | Good |
| Blog posts | BlogPosting, BreadcrumbList, FAQPage, Organization (stripped) | Good -- excellent author E-E-A-T |
| County pages | Organization (stripped), BreadcrumbList, Service, FAQPage | Good |
| City pages | Service, Organization (stripped), BreadcrumbList, WebPage, FAQPage | Most complete |
| Author page | BreadcrumbList, ProfilePage, Organization (stripped) | Good |

### Issues

| Issue | Severity |
|-------|----------|
| `/roofing` and `/siding` missing `Service` schema -- broken entity refs | Critical |
| Sunday `openingHoursSpecification` reads as "open 24h" | High |
| Unicode replacement chars in author name and blog descriptions | High |
| `WebPage.about` on city pages points to org entity not service entity | Medium |
| Duplicate Google Maps URL in `hasMap` and `sameAs` | Low |
| `ImageGallery` blocks use placeholder date `2024-12-31` | Low |
| Stripped Organization block on inner pages (only 6 properties) | Low |

### What's Working Well
- `hasCredential` with CSLB license -- industry best practice
- `Person` schema for founder with `sameAs` to LinkedIn and CSLB
- `Service` with `areaServed: City` on pSEO pages -- correct SAB pattern
- `AggregateRating` (4.8/5, 52 reviews) consistent across pages
- `BreadcrumbList` on all inner pages
- `BlogPosting` with full author E-E-A-T markup

---

## 5. Performance (Core Web Vitals) — Score: 95/100

### Lighthouse Scores (262 pages tested, April 5 2026)

| Metric | Range | Average | Assessment |
|--------|-------|---------|------------|
| Performance | 86-100 | ~93 | Excellent |
| Accessibility | 96-100 | ~97 | Excellent |
| Best Practices | 100 | 100 | Perfect |
| SEO | 100 | 100 | Perfect |

### Score Distribution

| Page Type | Perf Range | Notes |
|-----------|-----------|-------|
| Homepage | 96 | Excellent |
| Blog index | 100 | Perfect |
| Blog posts | 86-97 | Good to excellent |
| Service pages | 89-97 | Good to excellent |
| Service areas index | 98 | Excellent |
| County pages | 96-99 | Excellent |
| City pages | 96-99 | Excellent |
| City+service pages | 88-98 | Good, clustering ~91 |
| `/buy` | **0** | **Broken** |

**No CWV concerns.** Astro SSR is delivering exceptional performance across 534 pages.

---

## 6. AI Search Readiness (GEO) — Score: 74/100

### AI Crawler Access

| Crawler | Status |
|---------|--------|
| GPTBot (ChatGPT) | Allowed |
| OAI-SearchBot | Allowed |
| PerplexityBot | Allowed |
| ClaudeBot | Allowed |
| Google-Extended (AI Overviews) | Allowed |
| Applebot-Extended | Allowed |
| bingbot (Copilot) | Allowed |
| CCBot, anthropic-ai, cohere-ai | Blocked (training) |

### llms.txt
**Exemplary.** Includes timestamped pricing (Q2 2026), 12 shingle SKUs with per-square prices, 14 FAQ pairs, 9 process blocks, "Summary for AI Systems" section, named author with CSLB#. One of the best-structured AI disclosure files for a local contractor.

### Platform Scores

| Platform | Score | Key Factor |
|----------|-------|------------|
| Perplexity | 78 | Best-positioned: recent dates, external citations, itemized pricing |
| ChatGPT | 71 | GPTBot allowed, llms-full.txt strong, no YouTube/Reddit presence |
| Bing Copilot | 70 | Good schema, missing Bing entity page |
| Google AI Overviews | 68 | Statement-format H2s reduce extraction |
| Apple Intelligence | 65 | Limited optimization available |

### Issues

| Issue | Severity |
|-------|----------|
| No YouTube channel -- strongest AI citation correlator (0.737) absent | High |
| No Reddit/press mentions | Medium |
| H2 headings are statement-format, not question-format | Medium |
| FAQ answers average 70-120 words (optimal: 134-167 for AI extraction) | Medium |

---

## 7. Local SEO — Score: 74/100

### NAP Consistency
**Perfect.** Name, address, phone consistent across all audited pages, both in visible HTML and JSON-LD. Phone in E.164 format in schema.

### GBP Signals
- GBP confirmed claimed (CID: `3578771346418026097`)
- `aggregateRating` 4.8/5 from 52 reviews
- Opening hours in schema
- **Missing:** No "Leave a Review" CTA, no embedded Google Maps, no GBP review link

### Citations

| Directory | Status |
|-----------|--------|
| Google Business Profile | Confirmed |
| Yelp | Confirmed |
| Facebook | Confirmed |
| BBB | **Missing** |
| Angi | **Missing** |
| HomeAdvisor | **Missing** |
| Houzz | **Missing** |
| Nextdoor | **Missing** |

### Coverage Gaps
- **San Mateo County** -- lies between existing Alameda and Santa Clara coverage, high-value market
- **Tri-Valley (Livermore/Pleasanton/Dublin)** -- fast-growing east Alameda County, absent
- **San Francisco County** -- adjacent to Marin, major Bay Area market

### Issues

| Issue | Severity |
|-------|----------|
| Verify GBP is in SAB mode (address hidden) | Critical |
| Only 52 reviews for 5-county SAB -- need review velocity system | High |
| Missing Tier 1 citations: BBB, Angi, Houzz, HomeAdvisor | High |
| No "Leave a Google Review" CTA on any page | High |
| Cross-county internal links missing on city pages | Medium |
| County+service pages use first city's seed data | Medium |

---

## 8. Images — Score: 80/100

### Image Sitemap
- Dedicated `image-sitemap.xml` present -- good

### Lighthouse Accessibility
- All pages score 96-100 on accessibility (includes alt text checks)

### Issues
| Issue | Severity |
|-------|----------|
| `ImageGallery` schema uses placeholder date `2024-12-31` | Low |
| Some blog posts score 86-88 performance (likely unoptimized images) | Low |
| No Open Graph images detected on homepage | Medium |

---

## Prioritized Action Plan

### Critical (Fix Immediately)

| # | Issue | Impact | Effort | File/Location |
|---|-------|--------|--------|---------------|
| 1 | Wire unused seed data into pSEO templates | Eliminates duplicate content risk across 507 pages | Medium | `src/lib/pseo/generate.ts`, `service-templates.ts` |
| 2 | Add `Service` schema to `/roofing` and `/siding` | Fixes broken entity resolution | Low | Service page Astro components |
| 3 | Fix `/buy` page (scores 0/0/0/0) | Page is completely broken | Medium | `src/pages/buy/` |
| 4 | Verify GBP is in SAB mode | Foundational entity consistency | Low | Google Business Profile dashboard |

### High (Fix Within 1 Week)

| # | Issue | Impact | Effort | File/Location |
|---|-------|--------|--------|---------------|
| 5 | Add "Leave a Google Review" CTA to footer + post-estimate page | Increases review velocity | Low | Layout component, success page |
| 6 | Fix Sunday `openingHoursSpecification` -- remove Sunday entry | Prevents "open 24h" misread | Low | `src/layouts/Layout.astro` |
| 7 | Fix Unicode replacement chars in author name and blog descriptions | Broken characters in rich results | Low | Ghost-to-Astro rendering pipeline |
| 8 | Reduce homepage to 1 H1 tag | Heading hierarchy best practice | Low | Homepage component |
| 9 | Build citations on BBB, Angi, Houzz, HomeAdvisor | Local ranking signals | Medium | External directories |
| 10 | Add Open Graph tags to homepage and all page types | Social sharing + AI crawlers | Low | `src/layouts/Layout.astro` |

### Medium (Fix Within 1 Month)

| # | Issue | Impact | Effort | File/Location |
|---|-------|--------|--------|---------------|
| 11 | Differentiate county+service pages from city+service pages | Reduces 90% content overlap on 30 pages | Medium | `src/lib/pseo/generate.ts` line 572+ |
| 12 | Rewrite H2 headings to question format | Improves AI Overview extraction | Low | Homepage, service pages |
| 13 | Expand FAQ answers to 134-167 words | Optimal AI citation window | Medium | Ghost CMS + pSEO templates |
| 14 | Add cross-county internal links on city pages | Improves link equity flow | Low | `src/lib/pseo/generate.ts` line 292 |
| 15 | Interlink blog posts with relevant pSEO city pages | Content hub strategy | Medium | Blog post content |
| 16 | Fix `WebPage.about` on city pages to point to service entity | Schema accuracy | Low | City page Astro component |
| 17 | Add `Review` schema to individual city pages | Local SERP rich snippets | Low | `GeneralCityPage.astro` |
| 18 | Add CSLB license URL to `sameAs` array | Entity graph strengthening | Low | `src/layouts/Layout.astro` |

### Low (Backlog)

| # | Issue | Impact | Effort | File/Location |
|---|-------|--------|--------|---------------|
| 19 | Start YouTube channel (5-10 Bay Area-specific videos) | Strongest AI citation signal | High | External |
| 20 | Build Reddit presence in r/BayArea, r/HomeImprovement | Brand mention signals | Medium | External |
| 21 | Expand to San Mateo County (6-8 cities) | Geographic coverage gap | Medium | `src/lib/pseo/city-seed-data.ts` |
| 22 | Add Tri-Valley cities (Livermore, Pleasanton, Dublin) | Alameda County coverage gap | Low | `src/lib/pseo/city-seed-data.ts` |
| 23 | Remove duplicate Maps URL from `sameAs` array | Schema cleanup | Low | `src/layouts/Layout.astro` |
| 24 | Update `ImageGallery` placeholder dates | Schema accuracy | Low | Homepage component |
| 25 | Add `alumniOf` and `award` to Person schema | E-E-A-T enrichment | Low | Author page component |

---

*Generated by Claude Code SEO Audit -- April 5, 2026*
*Site: hamilton-exteriors.com | 534 pages analyzed*
