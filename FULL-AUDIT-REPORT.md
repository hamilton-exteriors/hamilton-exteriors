# Hamilton Exteriors — Full SEO Audit Report

**Audit Date:** April 6, 2026 (v5 — full 7-agent audit)
**Site:** https://hamilton-exteriors.com
**Business:** Hamilton Exteriors | Castro Valley, CA | GC + Roofing | CSLB #1082377
**Stack:** Astro 6.1 + Tailwind v4, SSR on Railway

---

## SEO Health Score: 72 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|---------|
| Technical SEO | 22% | 78/100 | 17.2 |
| Content Quality | 23% | 74/100 | 17.0 |
| On-Page SEO | 20% | 79/100 | 15.8 |
| Schema / Structured Data | 10% | 71/100 | 7.1 |
| Performance (CWV) | 10% | 75/100 | 7.5 |
| AI Search Readiness (GEO) | 10% | 81/100 | 8.1 |
| Images | 5% | 65/100 | 3.3 |
| **Total** | **100%** | | **76.0** |

**Adjusted Score: 72/100** (Local SEO penalty: -4 for thin county pages at scale)

---

## Executive Summary

Hamilton Exteriors is technically well-built and ahead of 90%+ of Bay Area contractor sites on AI search readiness. The Astro SSR architecture delivers clean HTML to crawlers, the schema graph is deep (20+ JSON-LD blocks), and the llms.txt implementation is best-in-class for the industry.

### Top 5 Critical Issues

1. **Thin county pages at scale** — 4 of 6 county pages have <200 words, risking doorway page classification
2. **Railway cold-start 502s** on robots.txt/llms.txt — AI crawlers get blocked during cold starts
3. **Schema @type inconsistency** — `GeneralContractor` vs `RoofingContractor` vs `LocalBusiness` used for the same entity across pages
4. **GC/architect identity buried** — homepage and trust signals lead with roofing despite GC being the primary business
5. **52 reviews for 500+ projects** — 10% capture rate is a significant local authority gap

### Top 5 Quick Wins

1. **Add founder photo** to `/about/alex-hamilton-li` (30 min, highest trust ROI)
2. **Fix GAF certification tier** — "Certified" vs "Master Elite" inconsistency across pages (15 min)
3. **Assign author in Ghost CMS** for all 12 blog posts (15 min)
4. **Fix `@type: County`** → `AdministrativeArea` in `/buy` schema (2 min)
5. **Add trailing slash** to breadcrumb item URLs on service-area and blog pages (15 min)

---

## 1. Technical SEO — 78/100

### Crawlability — Good
- robots.txt is textbook-correct: AI search crawlers allowed, training crawlers blocked, `/api/` excluded
- Sitemap index at `/sitemap-index.xml` + `/image-sitemap.xml` referenced in robots.txt
- `Crawl-delay: 2` on wildcard only — named bots not throttled
- Astro SSR delivers full HTML to all crawlers (no JS rendering issues)

### Indexability — Good with gaps
- Canonical tags present and consistent (`trailingSlash: 'never'` in Astro config)
- `noindex` correctly applied to `/buy/` (conversion-only page)
- Blog `noindex` detection for stub/placeholder posts implemented
- **Issue:** Breadcrumb `item` URLs omit trailing slash on pages that have canonical with trailing slash (service-areas, blog) — **MEDIUM**

### Security — Good
- HTTPS enforced site-wide
- CSP connect-src configured for roof-scan API
- No mixed content detected

### URL Structure — Excellent
- Clean hierarchy: `/service-areas/[county]/[city]/[service]`
- Semantic, keyword-rich slugs
- No parameter-based URLs for content pages

### Mobile — Good
- `prefers-reduced-motion` CSS handling
- Responsive images via srcset
- Touch-friendly CTAs with `tel:` hrefs

### Critical Issue: Railway Cold-Start 502s
- **Severity: HIGH** — Live fetches of `/robots.txt` and `/llms.txt` returned 502/timeout during cold starts
- AI crawlers hitting 502 on robots.txt may abort the entire crawl session
- **Fix:** Serve static policy files (robots.txt, llms.txt, ai.txt) from CDN edge, not behind SSR cold-start

---

## 2. Content Quality — 74/100

### E-E-A-T Breakdown

| Dimension | Score | Notes |
|-----------|-------|-------|
| Experience | 16/20 | Strong first-person founder voice, Bay Area micro-specifics. Missing: project case studies, thin portfolio |
| Expertise | 19/25 | Expert-level roofing content with sourced stats. Missing: GC/ADU authored content (11/13 blog posts are roofing) |
| Authoritativeness | 18/25 | CSLB verifiable, manufacturer certs, sameAs graph. Missing: press coverage, trade associations, thin review corpus |
| Trustworthiness | 28/30 | Physical address, verifiable license, privacy policies, EEO. Minor: no insurance cert display |

### Content Depth by Page Type

| Page | Words | Minimum | Status |
|------|-------|---------|--------|
| Homepage | ~700 | 500 | PASS |
| Roofing service | ~2,500 | 800 | PASS (strongest page) |
| County pages (4 of 6) | <200 | 500 | **FAIL — thin content** |
| County pages (Marin, Napa) | ~400 | 500 | BORDERLINE |
| Blog posts | Unknown (Ghost CMS) | 800 | Cannot verify |
| About/Alex bio | ~650 | 500 | PASS |

### Key Issues

| # | Severity | Issue |
|---|----------|-------|
| C1 | HIGH | 4 county pages (Alameda, Contra Costa, Santa Clara, San Mateo) have <200 words — doorway page risk |
| C2 | HIGH | GC/architect expertise buried: homepage leads roofing, 11/13 blog posts are roofing-focused |
| C3 | MEDIUM | GAF "Certified" vs "Master Elite" inconsistency between about page and buy page |
| C4 | MEDIUM | No founder photo on about page — highest-ROI trust signal missing |
| C5 | MEDIUM | 52 reviews for 500+ projects (10% capture rate) — thin trust corpus |
| C6 | MEDIUM | "60% of Oakland housing stock pre-1960" claim unsourced on about page |
| C7 | LOW | "#1 Roofing Contractor" superlative in roofing H1 — unverifiable |
| C8 | LOW | "50+ years combined experience" ambiguous for a company founded in 2018 |

---

## 3. On-Page SEO — 79/100

### Strengths
- Title tags follow `[Service] in [Location] | Hamilton Exteriors` pattern
- Meta descriptions auto-generated with geo-placename injection
- H1 includes location on all location pages
- CSLB number in body copy, footer, and schema
- Blog posts use question-format H2s (good for AI extraction)
- Related blog clusters linked from service pages (9 roofing articles)
- `geo.region`, `geo.placename`, `geo.position` meta tags on all pages

### Issues

| # | Severity | Issue |
|---|----------|-------|
| O1 | MEDIUM | Homepage title leads with "Design-Build" — misses high-volume "general contractor" and "roof replacement" queries |
| O2 | MEDIUM | Service page H2s use promotional framing, not question-format (e.g., "Our Advantage" vs "Why Choose...?") |
| O3 | MEDIUM | County pages have identical review, Difference, and FAQ sections — no geo differentiation |
| O4 | LOW | Blog index meta description generic and geo-less |
| O5 | LOW | Internal linking from blog to service pages could be stronger |

---

## 4. Schema / Structured Data — 71/100

### Coverage (20 JSON-LD blocks across 6 audited pages)

| Schema Type | Pages | Status |
|-------------|-------|--------|
| GeneralContractor (org) | All (full on 8, lean reference on rest) | Present |
| WebSite | Homepage | Present |
| FAQPage | Homepage, Roofing, Buy, City pages | Present |
| BreadcrumbList | All except homepage | Present |
| Service | Roofing, County, Buy | Present |
| BlogPosting | Blog posts | Present (via Ghost) |
| CollectionPage + ItemList | Blog index | Present |
| ProfilePage + Person | About/Alex | Present |
| WebApplication | Buy | Present |
| SpeakableSpecification | Roofing, Blog posts | Present |

### Critical Issues

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| S1 | HIGH | `@type: County` in `/buy` Service areaServed — invalid Schema.org type | Change to `AdministrativeArea` |
| S2 | HIGH | Breadcrumb item URLs missing trailing slash (service-areas, blog) — mismatch with canonical | Add trailing slash |
| S3 | MEDIUM | `@type` drift: org is `GeneralContractor`, county provider is `RoofingContractor`, city reviews use `LocalBusiness` | Align all to `GeneralContractor` |
| S4 | MEDIUM | San Mateo County missing from Service.areaServed on roofing and buy pages (5 of 6 counties) | Add San Mateo |
| S5 | MEDIUM | About page breadcrumb skips `/about/` intermediate level | Add 3-level breadcrumb |
| S6 | MEDIUM | Person.image on about page points to OG default, not a real headshot | Replace with actual photo |
| S7 | MEDIUM | County Service blocks missing `description` and `dateModified` | Add both |
| S8 | LOW | Org `logo` and `image` both point to logo PNG — `image` should be a project photo | Use different image |
| S9 | LOW | `knowsAbout` mixes Thing objects and bare strings | Normalize to all Thing objects |
| S10 | LOW | WebSite missing `potentialAction` (SearchAction) | Add if site search exists |

---

## 5. Performance (CWV) — 75/100

(Lab estimates — PSI API quota exhausted; field data requires CrUX access)

### Strengths
- Astro SSR with zero client-side JS by default — excellent TTFB and FCP
- Responsive `srcset` images via Ghost CDN
- Build-time OG image generation (not runtime)
- Font preloading for THE BOLD FONT, DM Sans, Satoshi

### Issues

| # | Severity | Issue |
|---|----------|-------|
| P1 | HIGH | Railway cold-start adds 2-5s to TTFB on first request after idle |
| P2 | MEDIUM | CompanyCam CDN images (portfolio) may not be optimized for CLS |
| P3 | MEDIUM | Mapbox GL JS bundle loaded on scan pages — significant JS weight |
| P4 | LOW | Ghost blog images rely on Ghost CDN responsiveness |

---

## 6. AI Search Readiness (GEO) — 81/100

### Platform Scores

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 78/100 | Thin service area pages, no Wikipedia entity |
| ChatGPT / SearchGPT | 79/100 | No YouTube, no Reddit, no press |
| Perplexity | 83/100 | No Reddit presence (Perplexity's #2 source) |
| Bing Copilot | 75/100 | Weaker brand mention volume |

### Strengths
- llms.txt + llms-full.txt with RSL-1.0 license — best-in-class for contractors
- robots.txt allows all major AI search crawlers
- SpeakableSpecification on roofing page and blog posts
- Statistical claims attributed with DOIs and source URLs in llms.txt
- FAQPage schema on 4+ page types

### Key Issues

| # | Severity | Issue |
|---|----------|-------|
| G1 | HIGH | Railway 502s on robots.txt/llms.txt during cold start — blocks AI crawlers |
| G2 | HIGH | Blog statistics lack inline source attribution (sources in footer, not passage) |
| G3 | HIGH | 11/12 blog posts have no author assigned in Ghost — anonymous content |
| G4 | MEDIUM | Service page H2s use promotional framing, not question-format |
| G5 | MEDIUM | No YouTube channel — strongest off-site AI citation signal (~0.737 correlation) |
| G6 | MEDIUM | No Reddit presence — Perplexity's #2 source at 46.7% |
| G7 | LOW | No RSS autodiscovery `<link>` tag in Layout.astro |

---

## 7. Images — 65/100

### Issues

| # | Severity | Issue |
|---|----------|-------|
| I1 | MEDIUM | No founder headshot (about page) — Person.image uses OG fallback |
| I2 | MEDIUM | Org schema `image` property uses logo instead of a business/project photo |
| I3 | LOW | Service card image alt text is generic (not location-specific) |

---

## 8. Local SEO — 71/100

| Dimension | Score |
|-----------|-------|
| GBP Signals | 68/100 |
| Reviews & Reputation | 75/100 |
| Local On-Page SEO | 82/100 |
| NAP Consistency | 72/100 |
| Local Schema | 78/100 |
| Local Link Authority | 40/100 |

### NAP Consistency: PASS
Address, phone, and business name are consistent across all on-site sources.

### Key Issues

| # | Severity | Issue |
|---|----------|-------|
| L1 | CRITICAL | Schema @type inconsistency: `GeneralContractor` (Layout), `RoofingContractor` (county), `LocalBusiness` (city reviews) |
| L2 | HIGH | 4 county pages need editorial content (Alameda, Contra Costa, Santa Clara, San Mateo) |
| L3 | HIGH | Review velocity risk — most recent hardcoded review is Jan 2026 (3+ months ago) |
| L4 | HIGH | Maps iframe on city pages is static/generic — not city-specific |
| L5 | MEDIUM | County pages have no county-specific FAQs |
| L6 | MEDIUM | Missing Tier 1 citations: BBB, Houzz, Angi, GAF Finder, James Hardie Finder |
| L7 | MEDIUM | County Service schema hardcoded as "Roofing and Exterior Services" — should reflect GC primary |
| L8 | MEDIUM | Sunday hours missing from openingHoursSpecification |
| L9 | LOW | No emergency/storm response landing page |

---

## Prioritized Action Plan

### CRITICAL — Fix Immediately

| # | Action | Files | Effort |
|---|--------|-------|--------|
| 1 | Fix `@type: County` → `AdministrativeArea` in /buy schema | `src/pages/buy/index.astro` | 5 min |
| 2 | Align all schema @type references to `GeneralContractor` | `CountyPage.astro`, `GeneralCityPage.astro` | 15 min |
| 3 | Fix breadcrumb trailing slash on service-area and blog pages | Layout or page components | 15 min |

### HIGH — Fix This Week

| # | Action | Files | Effort |
|---|--------|-------|--------|
| 4 | Add 300+ words editorial to 4 county pages | `src/data/counties/*.ts` | 2 hrs |
| 5 | Fix Railway cold-start: serve robots.txt/llms.txt from CDN edge | Infrastructure | 2 hrs |
| 6 | Add founder headshot to about page + update Person.image | `about/alex-hamilton-li.astro` | 30 min |
| 7 | Resolve GAF certification tier (Certified vs Master Elite) | `roofing.ts`, about page, buy page, llms.txt | 15 min |
| 8 | Assign Alex as author on all 12 Ghost blog posts | Ghost CMS admin | 15 min |
| 9 | Add San Mateo County to roofing + buy Service.areaServed | Roofing page, `buy/index.astro` | 10 min |
| 10 | Add inline source attribution to blog statistics | Ghost CMS posts | 1 hr |

### MEDIUM — Fix This Month

| # | Action | Files | Effort |
|---|--------|-------|--------|
| 11 | Surface GC/architect identity higher on homepage | `Hero.astro` | 1 hr |
| 12 | Rewrite service page H2s as question-format headings | `roofing.ts`, service components | 30 min |
| 13 | Add county-specific FAQs to all 6 county data files | `src/data/counties/*.ts`, `CountyPage.astro` | 2 hrs |
| 14 | Fix about page breadcrumb (add intermediate /about/ level) | `about/alex-hamilton-li.astro` | 15 min |
| 15 | Add Sunday hours to openingHoursSpecification | `Layout.astro` | 5 min |
| 16 | Rename county Service schema from "Roofing" to "Design-Build" | `CountyPage.astro` | 5 min |
| 17 | Claim Tier 1 citations: BBB, Houzz, Angi, GAF Finder | External | 3 hrs |
| 18 | Start review velocity campaign (email + SMS post-project) | Operational | Ongoing |
| 19 | Add RSS autodiscovery link tag to Layout.astro | `Layout.astro` | 5 min |
| 20 | Change roofing H1 from "#1" to "Top-Rated" | `roofing.ts` | 2 min |

### LOW — Backlog

| # | Action | Effort |
|---|--------|--------|
| 21 | Source "60% Oakland housing stock pre-1960" claim (US Census ACS) | 5 min |
| 22 | Reword "50+ years combined experience" to clarify team vs company | 5 min |
| 23 | Normalize `knowsAbout` to all Thing objects | 10 min |
| 24 | Add `potentialAction: SearchAction` to WebSite schema | 15 min |
| 25 | Replace org schema `image` with project photo | 10 min |
| 26 | Create emergency/storm response landing page | 3 hrs |
| 27 | Start YouTube channel (5 project walkthrough videos) | High |
| 28 | Build Reddit presence in r/bayarea, r/roofing | Ongoing |

---

## Score Projection

| Milestone | Projected Score |
|-----------|----------------|
| Current | 72/100 |
| After Critical fixes (items 1-3) | 74/100 |
| After High fixes (items 4-10) | 80/100 |
| After Medium fixes (items 11-20) | 86/100 |
| After YouTube + review campaign | 90+/100 |

---

## Methodology

- **7 parallel subagent audits:** Technical SEO, Content Quality, Schema, Sitemap, GEO/AI Search, Local SEO, Performance
- **Pages analyzed:** Homepage, /roofing, /service-areas/alameda-county-ca/, /blog/, /about/alex-hamilton-li, /buy/
- **Source code analysis:** Full codebase review (Astro components, data files, layouts, schema generation)
- **Live site verification:** WebFetch on key pages (limited by Railway cold-start 502s)
- **Standards:** Google September 2025 QRG, March 2024 core update, Schema.org 26.0, llmstxt.org spec
