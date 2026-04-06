# Hamilton Exteriors — Full SEO Audit Report

**URL:** https://hamilton-exteriors.com
**Date:** April 5, 2026
**Business Type:** Hybrid SAB (Service Area Business + physical office)
**Industry:** Home Services / Contracting (Roofing, Siding, Windows, ADUs, Custom Homes)
**Stack:** Astro 6.1 + Tailwind v4, SSR on Railway, Ghost CMS (headless)
**Pages crawled:** 660+ (10 main, 18 blog, 6 county hubs, 47+ city pages, 650+ city/service pSEO)

---

## Overall SEO Health Score: 80 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 81 | 17.8 |
| Content Quality | 23% | 74 | 17.0 |
| On-Page SEO | 20% | 88 | 17.6 |
| Schema / Structured Data | 10% | 74 | 7.4 |
| Performance (CWV) | 10% | 88 | 8.8 |
| AI Search Readiness (GEO) | 10% | 79 | 7.9 |
| Images | 5% | 78 | 3.9 |
| **Total** | | | **80.4** |

---

## Executive Summary

Hamilton Exteriors has a strong technical foundation. Astro SSR delivers 100/100 Lighthouse SEO scores across all 260+ audited pages, CLS is near-zero, and the site has one of the most complete robots.txt + llms.txt configurations seen on a contractor site. Schema markup is extensive with proper RoofingContractor typing and breadcrumbs everywhere.

### Top 5 Critical Issues

1. **Security headers completely absent** -- No HSTS, CSP, X-Frame-Options, or X-Content-Type-Options. 6 lines of code to fix in `server.mjs`.
2. **pSEO thin content risk** -- 650+ city/service pages may have >60% content overlap. Must audit Ghost CMS content differentiation before Google's helpful content classifier flags them.
3. **Review volume too low** -- 52 reviews vs. 150-300+ for Bay Area competitors. If no new reviews since Jan 2026, velocity cliff is already happening.
4. **Homepage and blog index missing OG images** -- Highest-traffic pages fall back to generic `og-default.jpg` on social shares.
5. **TTFB spikes on cold-start pSEO pages** -- 7 pages exceed 600ms (worst: 1,592ms) due to Railway container cold starts.

### Top 5 Quick Wins

1. Add 6 security headers to `server.mjs` (30 min, Critical)
2. Pass `heroImage` prop on homepage + blog index Layout calls (10 min, High)
3. Add `/adu`, `/custom-homes`, `/additions` to `image-sitemap.xml.ts` (10 min, Medium)
4. Fix llms.txt review count discrepancy (52 vs "50+") (5 min, Low)
5. Add `dateModified` to blog post schema (30 min, Medium)

---

## 1. Technical SEO -- 81/100

### Crawlability (93/100)
- **robots.txt:** Textbook-correct. AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), training scrapers blocked (CCBot, cohere-ai, Bytespider). `/api/` correctly disallowed.
- **Sitemap:** `sitemap-index.xml` -> `sitemap-0.xml` (660+ URLs) + `image-sitemap.xml`. All lastmod dates current.
- **Internal linking:** 3-4 click depth from homepage to any page. Breadcrumbs on all pages.

### Indexability (88/100)
- **Canonicals:** Present on every page, auto-derived from `Astro.url.pathname`. No trailing-slash conflicts.
- **noindex:** Correctly applied to 404, /buy, /buy/scan, legal pages, and draft routes.
- **OG tags:** Full implementation (title, description, type, url, image) on all pages.

### Security Headers (35/100) -- CRITICAL
Zero security headers set anywhere in the stack. Railway does not inject these. Missing:
- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `Content-Security-Policy`

**Fix:** Add all 6 in `server.mjs` `res.writeHead` intercept.

### URL Structure (95/100)
- Clean hierarchical pattern: `/service-areas/{county}/{city}/{service}`
- No query parameters, no ID-based URLs
- Consistent lowercase with hyphens

### Mobile (95/100)
- Viewport meta correct on all pages
- No tap-target failures
- Responsive images with srcset

### Core Web Vitals (lab data, 260 pages)

| Metric | Best | Worst | Status |
|--------|------|-------|--------|
| LCP | 1.2s (homepage) | 3.3s (/adu) | 7 pages "Needs Improvement" |
| CLS | 0.000 | 0.011 | All GOOD |
| TBT/INP | 0ms | 28ms | All GOOD |

LCP bottleneck: TTFB on cold-start Railway containers (up to 1,592ms on low-traffic pSEO routes). Secondary: 2 render-blocking CSS files (Layout 9.2KB + Reviews 1.4KB).

### Other Technical Issues
- 4 IndexNow key files in `/public/` -- likely only 1 is active per engine. Clean up stale keys.
- No automated IndexNow pings on pSEO content updates
- `additions-2.astro` and `additions-3.astro` are noindex drafts still deployable -- delete or move
- Oswald font referenced in `/service-areas` inline styles, not in design system

---

## 2. Content Quality -- 74/100

### E-E-A-T Assessment

| Factor | Score | Key Signals |
|--------|-------|-------------|
| Experience | 78 | Founder narrative, real project photos, specific timelines. Missing: dated case studies. |
| Expertise | 82 | CSLB #1082377 verifiable, ARMA/Oak Ridge citations, manufacturer certs. |
| Authoritativeness | 68 | 52 reviews is thin for this price tier. No press mentions, no NRCA/trade association membership. |
| Trustworthiness | 81 | Consistent NAP, license in schema, privacy policies, physical address. |

### Content Depth by Page Type

| Page Type | Count | Word Count | Quality |
|-----------|-------|------------|---------|
| Homepage | 1 | ~3,000 | Strong |
| Service pages | 5 | 5,500-7,000 | Excellent depth |
| Blog posts | 18 | 1,500-2,500 | Good -- specific data, author attribution |
| pSEO city/service | 650+ | 3,500-4,000 | **AT RISK** -- templated, must verify Ghost CMS differentiation |
| County hubs | 6 | 2,000-2,500 | Adequate |

### Critical Content Issues
1. **pSEO doorway page risk** -- Must audit 5+ city pairs for content overlap. If >60% shared, add city-specific sections.
2. **Review staleness** -- 4 inline reviews date from Nov 2025-Jan 2026. No fresh injection mechanism.
3. **No author bylines on service/pSEO pages** -- Named-person authorship is stronger for YMYL content.
4. **Blog missing `dateModified`** -- Pricing/permit content needs visible "Last updated" signals.

---

## 3. On-Page SEO -- 88/100

- All pages have unique, keyword-optimized titles under 60 chars
- Meta descriptions present on all pages, 140-160 chars
- **Lighthouse SEO: 100/100 across all 260 audited pages**
- H1 present and unique on every page
- BreadcrumbList schema matches visual breadcrumbs
- Service pages link to related blog posts; blog posts link back to service pages
- Footer links to all 6 service types
- Missing: `twitter:site` handle, blog index hero preload

---

## 4. Schema / Structured Data -- 74/100

### Working Well
- `["RoofingContractor", "GeneralContractor"]` dual typing
- BreadcrumbList on every page
- GeoCoordinates with 5-decimal precision
- OfferCatalog, payment methods, `hasCredential` for CSLB license
- `hasMap` with Google CID for GBP linkage

### Issues

**Critical:**
- FAQPage on commercial pages won't render rich results (restricted since Aug 2023). Keep for AI discoverability only.
- ImageGallery is not a Google-supported type -- replace with ImageObject arrays.

**High:**
- Duplicate @type blocks on homepage. Merge into single block with array type.
- Service pricing lacks `priceCurrency: "USD"` and proper `PriceSpecification`.
- BlogPosting missing `publisher` property (required for Article rich results).
- Review `author` may lack `@type: "Person"`.

**Medium:**
- pSEO pages share identical org schema -- need city-scoped `areaServed`.
- No `Person` schema for Alexander Hamilton Li on `/about` page.
- `aggregateRating` on city Service schemas conflicts with org-level rating.

---

## 5. Performance -- 88/100

### Lighthouse Scores (260 pages)

| Metric | Average | Range |
|--------|---------|-------|
| Performance | 93 | 86-100 |
| Accessibility | 97 | 96-100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

### Standout Results
- Blog index: 100/100 across all 4 categories
- CLS: Near-zero site-wide
- TBT/INP: Under 30ms everywhere

### Issues
- TTFB on cold-start pSEO routes (7 pages >600ms, worst 1,592ms)
- 2 render-blocking CSS files on 251/260 pages
- `/buy` page scores 0/0/0/0 -- broken or non-functional

---

## 6. AI Search Readiness (GEO) -- 79/100

### AI Crawler Access (92/100)
All major AI search crawlers allowed. Training-only crawlers blocked. Textbook configuration.

### llms.txt (85/100)
Both `/llms.txt` and `/llms-full.txt` present with:
- RSL-1.0 license with explicit citation permission
- Pricing timestamped to Q2 2026
- `## Key Facts for Citation` block with DOI/URL sources
- Warranty comparison table in Markdown

Gaps: date mismatch (04-04 vs 04-05), review count inconsistency, no scope boundaries section.

### Citability (82/100)
- FAQ answers 30-70 words -- good extraction length
- Per-SKU pricing highly citable
- Third-party citations (Oak Ridge, DOE, ARMA) boost authority
- Gap: blog passages not mirrored in llms-full.txt
- Gap: section openers are brand statements, not answer-first

### Platform Scores

| Platform | Score | Bottleneck |
|----------|-------|------------|
| Perplexity | 85 | Best positioned -- Yelp, SSR, citation license |
| Bing Copilot | 80 | LinkedIn present, bingbot allowed |
| Google AI Overviews | 78 | No video content |
| ChatGPT Browse | 74 | No YouTube, no Reddit |

### Biggest Gap
**No YouTube channel.** Highest correlation (~0.737) with AI citation. Even 3-5 videos would have outsized impact.

---

## 7. Images -- 78/100

### Working Well
- Image sitemap present
- Alt text on 100% of images
- Astro-optimized WebP with responsive srcset
- OG images on ~85% of pages (1200x630, JPEG, 140KB)

### Issues
- **Homepage and blog index** don't pass `heroImage` to Layout -- generic OG fallback
- `/adu`, `/custom-homes`, `/additions` missing from image sitemap
- `og-default.jpg` needs brand text overlay

---

## 8. Local SEO -- 72/100

| Dimension | Score |
|-----------|-------|
| GBP Signals | 68 |
| Reviews & Reputation | 72 |
| Local On-Page SEO | 82 |
| NAP Consistency | 80 |
| Local Schema | 78 |
| Local Link & Authority | 45 |

### NAP Consistency
Consistent across footer HTML, JSON-LD schema, and meta tags. Unit F consistently included.

### GBP Gaps
- No Google Maps iframe embed on any page
- No "Leave a Review" or "View on Google Maps" link
- Must verify primary category is "Roofing Contractor" in GBP dashboard

### Citation Gaps (5 of 12+ present)
Missing: BBB, Angi/HomeAdvisor, Houzz, Nextdoor, Thumbtack, manufacturer dealer locators (GAF, James Hardie, Owens Corning).

### Review Velocity Risk
52 reviews is below Bay Area contractor competitive threshold (150-300+). If no new reviews since Jan 2026, the 18-day velocity cliff has passed.

---

## Score Summary

```
Technical SEO  81  ████████░░  (22%)
Content        74  ███████░░░  (23%)
On-Page        88  █████████░  (20%)
Schema         74  ███████░░░  (10%)
Performance    88  █████████░  (10%)
AI/GEO         79  ████████░░  (10%)
Images         78  ████████░░  (5%)
───────────────────────────────────
OVERALL        80  ████████░░  / 100
```

---

*Audit performed by 7 parallel specialist agents. Lighthouse data from 260-page batch run (v13.0.3). Live page fetches April 5, 2026.*
