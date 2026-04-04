# Hamilton Exteriors — Full SEO Audit Report

**Date:** April 4, 2026
**Site:** hamilton-exteriors-production.up.railway.app (staging) / hamilton-exteriors.com (canonical)
**Business:** Hamilton Exteriors | Castro Valley, CA | CSLB #1082377
**Stack:** Astro 6.1 + Tailwind v4, Railway CDN
**Pages discovered:** ~261 (55 core + 174 city+service + legal/utility)

---

## Overall SEO Health Score: 71 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 74/100 | 16.3 |
| Content Quality | 23% | 78/100 | 17.9 |
| On-Page SEO | 20% | 76/100 | 15.2 |
| Schema / Structured Data | 10% | 68/100 | 6.8 |
| Performance (CWV) | 10% | 85/100 | 8.5 |
| AI Search Readiness | 10% | 74/100 | 7.4 |
| Images | 5% | 88/100 | 4.4 |
| **Total** | **100%** | | **76.5 → 71** |

*Score adjusted from 76.5 to 71 due to critical blockers: canonical domain not yet on Railway, wrong sameAs links, and reviewCount schema mismatch.*

---

## Executive Summary

### Top 5 Critical Issues

1. **hamilton-exteriors.com still on Framer** — DNS not pointed to Railway. Canonical domain serves Framer site, not the Astro app. Google is indexing the wrong site.
2. **sameAs links point to wrong business** — Angi and HomeAdvisor URLs link to "ABR Quality Resources Inc" in Citrus Heights, actively poisoning the Knowledge Graph entity.
3. **reviewCount schema says 4, site claims 50+** — Google will display 4 reviews in rich results. Major credibility gap.
4. **174 city+service pages risk doorway page penalty** — If content is template-swapped without genuine differentiation, this is the highest algorithmic risk.
5. **IndexNow key file returns 404** — IndexNow implementation is broken; new/updated pages aren't being pinged.

### Top 5 Quick Wins

1. Fix sameAs URLs (remove wrong Angi/HomeAdvisor links) — 10 minutes
2. Update reviewCount in schema to actual Google review count — 5 minutes
3. Fix llms.txt license language to explicitly permit AI citations — 5 minutes
4. Add `alt=""` to decorative checkmark icons — 5 minutes
5. Restore IndexNow key file — 10 minutes

---

## 1. Technical SEO (Score: 74/100)

### Crawlability

| Check | Status | Notes |
|-------|--------|-------|
| robots.txt | PASS | Well-configured. AI search crawlers allowed, training crawlers blocked, /api/ disallowed |
| Sitemap | PARTIAL | sitemap-index.xml works on Railway but child URL points to hamilton-exteriors.com (404 on Framer) |
| Crawl budget | PASS | 261 pages, well within limits |
| Redirect chains | PASS | No chains detected. www → non-www (308) works correctly |
| Trailing slashes | PASS | Both /roofing and /roofing/ return 200 |
| 404 handling | PASS | Returns proper 404 status code |

### Indexability

| Check | Status | Notes |
|-------|--------|-------|
| Canonical tags | PASS | All pages point to hamilton-exteriors.com |
| Dual domain risk | CRITICAL | hamilton-exteriors.com is still on Framer. Railway app and Framer serve different content on the same canonical domain |
| noindex tags | PASS | None detected on indexable pages |
| Duplicate content | MEDIUM | City pages share ~55-65% templated content (FAQ, value props, footer) |

### Security Headers

| Header | Status | Value |
|--------|--------|-------|
| HSTS | PASS | max-age=63072000; includeSubDomains; preload |
| CSP | PASS | Comprehensive policy with script/style/connect sources |
| X-Content-Type-Options | PASS | nosniff |
| X-Frame-Options | PASS | SAMEORIGIN |
| Referrer-Policy | PASS | strict-origin-when-cross-origin |
| Permissions-Policy | PASS | camera=(), microphone=(), geolocation=(self) |

### URL Structure

| Pattern | Example | Assessment |
|---------|---------|------------|
| Service pages | /roofing, /siding, /windows | Clean, keyword-rich |
| County hubs | /service-areas/alameda-county-ca | Good hierarchy |
| City hubs | /service-areas/alameda-county-ca/oakland-ca | Proper nesting |
| City+service | /service-areas/.../oakland-ca/roofing | Correct pSEO pattern |
| Blog | /blog/how-much-does-a-roof-replacement-cost... | Question-based, SEO-friendly |
| Legal | /privacy-policy, /terms | Clean |

### IndexNow

- Key file at /indexnow-key.txt returns **404** — implementation is broken
- Recent commit mentions "add IndexNow" but the key file is not being served

### llms.txt

- Present at /llms.txt and /llms-full.txt
- Discovered via `<link rel="ai-content-declaration">` in `<head>` — excellent
- 370 lines of structured, machine-readable content in llms-full.txt
- Last updated: 2026-04-02

---

## 2. Content Quality (Score: 78/100)

### Page-by-Page Assessment

| Page | Words | Title Len | Meta Desc Len | H2s | FAQs |
|------|-------|-----------|---------------|-----|------|
| / (homepage) | ~2,200 | 68 | Truncated | 9 | 0 |
| /roofing | 2,320 | 56 | 152 | 10 | 5 |
| /siding | 2,319 | 63 | 160 | 10 | 5 |
| /windows | 2,600 | 58 | 156 | 10 | 5 |
| Oakland city | 1,939 | 73 | — | 7 | 10 |
| Walnut Creek city | 1,975 | 78 | — | 7 | 10 |
| San Jose city | 1,991 | 74 | — | 7 | 10 |
| Blog: Roof Cost | 2,520 | 66 | — | 11 | 0 |

### E-E-A-T Signals

| Signal | Status | Notes |
|--------|--------|-------|
| Experience | STRONG | Real project photos, specific Bay Area examples ("1,500 sq ft ranch in Oakland") |
| Expertise | STRONG | CSLB license displayed, manufacturer certifications (GAF, CertainTeed, Owens Corning, James Hardie, Tesla) |
| Authoritativeness | MEDIUM | Blog attributed to Alexander Hamilton Li. Missing: standalone author bio page, Person schema |
| Trustworthiness | STRONG | License, bonding, insurance claims. Transparent pricing. Real customer names on reviews |

### Content Depth

- **Service pages (2,300-2,600 words):** Strong. Sourced statistics (ARMA, Census Bureau, Remodeling Magazine), detailed pricing tables, material comparisons, process explanations
- **City hub pages (~1,950 words):** Adequate but templated. ~35-45% unique content per city (neighborhoods, home values, climate data). FAQ section identical across all cities
- **Blog posts (2,500+ words):** Excellent. Question-based H1s, sourced data, county-specific permit tables, real-world cost examples
- **City+service pages (174 total):** High doorway-page risk if content is template-swapped. Needs content audit.

---

## 3. On-Page SEO (Score: 76/100)

### Title Tags

| Page Type | Pattern | Assessment |
|-----------|---------|------------|
| Homepage | "Bay Area's Top Design-Build & Exteriors Contractor \| Hamilton Exteriors" | Good — 68 chars |
| Service | "Bay Area Roofing \| Shingles, Metal & Tile \| Hamilton" | Good — keyword-rich, 56 chars |
| City hub | "Roofing, Siding, ADUs & Custom Homes in [City], CA \| Hamilton Exteriors" | Good — 73-78 chars |
| Blog | "Roof Replacement Cost in the Bay Area (2026) \| Hamilton Exteriors" | Excellent — year, location, topic |

### H1 Issues

- **City hub pages:** H1 is "[City]'s Top Design-Build & Exteriors Contractor" — "Design-Build" and "Exteriors Contractor" are not high-volume search terms. Should lead with primary service keywords.
- **Homepage meta description** appears truncated to "Bay Area" — needs fix

### Internal Linking

- Service pages: 99 internal links each (strong cross-linking)
- Hub-and-spoke architecture properly implemented
- **Gap:** Homepage doesn't link directly to top priority cities
- **Gap:** /roofing doesn't cross-link to city+service variants

---

## 4. Schema / Structured Data (Score: 68/100)

### Implementation Summary

All pages have JSON-LD schema. Homepage has 4 blocks (BreadcrumbList, RoofingContractor+GeneralContractor, WebSite, FAQPage). Service pages add WebPage and Service blocks. Blog posts have BlogPosting with all Google-required fields.

### Critical Issues

| Issue | Severity | Fix |
|-------|----------|-----|
| sameAs links to "ABR Quality Resources Inc" (wrong business) | CRITICAL | Remove or replace with correct Hamilton Exteriors profiles |
| reviewCount: 4 but site claims 50+ | CRITICAL | Update to actual Google review count |
| HTML artifacts in BlogPosting FAQ answers (`id="..."` leaking) | HIGH | Strip HTML from FAQ answer text in template |
| Slim business entity on blog/city pages (missing sameAs, logo, geo) | MEDIUM | Use full entity block on all page types |
| WebPage block missing from city pages | MEDIUM | Add WebPage with isPartOf reference |
| No Person schema for Alexander Hamilton Li | LOW | Add standalone Person entity |

### Rich Result Eligibility

| Type | Status |
|------|--------|
| Breadcrumb | Eligible |
| Article/BlogPosting | Eligible |
| Local Business stars | Degraded (wrong sameAs, low reviewCount) |
| FAQ | Not eligible (Google restricted since Aug 2023) |

---

## 5. Performance / Core Web Vitals (Score: 85/100)

### Page Load Metrics (Lab)

| Page | TTFB | Total Load | Size |
|------|------|------------|------|
| / | 363ms | 448ms | 135 KB |
| /roofing | 270ms | 443ms | 149 KB |
| Oakland city | 265ms | 381ms | 128 KB |
| /blog | 383ms | 474ms | 92 KB |

### CWV Estimates

| Metric | Estimate | Status |
|--------|----------|--------|
| LCP | ~1.5-2.0s | Good — hero image preloaded as WebP with fetchpriority |
| INP | <100ms | Excellent — static site, minimal JS |
| CLS | <0.05 | Good — fonts preloaded, images have dimensions |
| TTFB | 265-383ms | Good — Railway CDN edge caching |

### Resource Efficiency

- 2 CSS files, 2 JS files, 2 fonts (all optimized)
- Hero images preloaded in 2 sizes (1080w, 1920w WebP)
- 25/27 images lazy-loaded on homepage
- GTM deferred until user interaction — no LCP impact
- Mapbox lazy-loaded on focus/click
- Railway CDN: s-maxage=604800 (7 day edge cache)

**Performance is a strength. No critical issues.**

---

## 6. AI Search Readiness (Score: 74/100)

### Platform Scores

| Platform | Score | Key Factor |
|----------|-------|------------|
| Google AI Overviews | 78/100 | Google-Extended allowed, sourced stats, FAQPage schema |
| ChatGPT / SearchGPT | 72/100 | llms.txt excellent, GPTBot allowed. Gap: no YouTube |
| Perplexity | 76/100 | PerplexityBot allowed, direct-answer blog blocks |
| Bing Copilot | 70/100 | bingbot allowed. Gap: reviewCount mismatch |

### Strengths

- llms.txt + llms-full.txt with 370 lines of structured content, pricing, and "Summary for AI Systems" section
- All major AI crawlers explicitly allowed in robots.txt
- `<link rel="ai-content-declaration">` in every page head
- Blog posts have direct-answer blocks with specific dollar ranges and sourced statistics
- FAQ accordions render in static HTML (no JS required for AI crawlers)

### Top Gaps

1. **No YouTube channel** — highest correlation (0.737) with AI citations
2. **License language may discourage citation** — needs explicit permission clause
3. **City pages lack genuine local specificity** for AI citation
4. **No Reddit brand signals** — missing from r/BayAreaHomeOwners discussions
5. **Certifications missing from llms-full.txt**

---

## 7. Images (Score: 88/100)

- All images converted to WebP via Astro image pipeline
- Responsive sizes with srcset
- Hero images preloaded with fetchpriority="high"
- 22/24 images on roofing page have descriptive alt text (brand, location, material type)
- 2 decorative checkmark icons missing alt — should use `alt=""`
- Image sitemap unreachable on canonical domain (Framer)

---

## 8. Local SEO (Score: 61/100)

### NAP Consistency: PASS (except sameAs errors)

Consistent across all site pages: Hamilton Exteriors, 21634 Redwood Rd Unit F, Castro Valley, CA 94546, (650) 977-3351

### Critical Local Issues

1. **sameAs Angi/HomeAdvisor → wrong business** (entity poisoning)
2. **reviewCount 4 vs "50+" claim** (credibility gap)
3. **BBB name discrepancy:** "Hamilton Exteriors, Inc" vs "Hamilton Exteriors"
4. **No Google Maps embed** anywhere on site
5. **Same 4 testimonials on every city page** (no city-specific social proof)
6. **Missing citations:** Thumbtack, Houzz, Nextdoor not present

### City Page Quality

- 29 city hubs pass doorway page swap test (genuinely different neighborhood/climate data)
- ~35-45% unique content per city hub (above doorway threshold but below elite pSEO)
- FAQ sections identical across all cities — should be localized
- 174 city+service pages need content differentiation audit

### Contractor-Specific Signals

CSLB license, bonding, insurance, manufacturer certifications, 50-year warranty, and financing all properly displayed. Missing: service area map, Google Maps embed, city-specific project examples.

---

## Scoring Breakdown

```
Technical SEO:     74/100  × 22% = 16.3
Content Quality:   78/100  × 23% = 17.9
On-Page SEO:       76/100  × 20% = 15.2
Schema:            68/100  × 10% =  6.8
Performance:       85/100  × 10% =  8.5
AI Readiness:      74/100  × 10% =  7.4
Images:            88/100  ×  5% =  4.4
                                   -----
Raw weighted:                       76.5
Critical blocker penalty:           -5.5
                                   -----
FINAL SCORE:                        71/100
```

---

*Report generated April 4, 2026. Data based on live fetches from hamilton-exteriors-production.up.railway.app.*
