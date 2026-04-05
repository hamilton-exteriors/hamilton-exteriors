# Hamilton Exteriors — Full SEO Audit Report

**Audit Date:** April 4, 2026
**Site:** hamilton-exteriors-production.up.railway.app
**Canonical Domain:** hamilton-exteriors.com
**Stack:** Astro 6.1 + Tailwind v4, static site on Railway CDN
**Pages in Sitemap:** 243 URLs
**Business Type:** Service Area Business (SAB) — Multi-trade Contractor (Roofing, Siding, Windows, ADU, Custom Homes)

---

## Overall SEO Health Score: 62 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 58/100 | 12.8 |
| Content Quality | 23% | 70/100 | 16.1 |
| On-Page SEO | 20% | 76/100 | 15.2 |
| Schema / Structured Data | 10% | 75/100 | 7.5 |
| Performance (CWV) | 10% | 88/100 | 8.8 |
| AI Search Readiness (GEO) | 10% | 76/100 | 7.6 |
| Images | 5% | 65/100 | 3.3 |
| **TOTAL** | **100%** | | **71.3** |

> **Note:** The raw weighted score is 71, but the effective score is **62/100** because the #1 critical issue — DNS not pointing to Railway — means Google is indexing a different site at the canonical domain. No SEO value accrues until DNS is migrated.

---

## Executive Summary

### Top 5 Critical Issues

1. **DNS points hamilton-exteriors.com to a Framer site, not Railway** — Google is indexing the wrong site. All canonical tags, sitemap URLs, and schema @ids reference a domain that serves Framer content. This blocks 100% of SEO value.
2. **Duplicate Service `@id` on all ~174 pSEO pages** — Two conflicting Service schema blocks share the same `@id` on every city/service page. Google's parser produces undefined behavior.
3. **BBB name discrepancy** — BBB lists "Hamilton Exteriors, Inc" while all on-site references use "Hamilton Exteriors" (no Inc). NAP inconsistency at a Tier 1 directory.
4. **Hardcoded review count may not match GBP** — Schema says `reviewCount: 52`, copy says "50+". If GBP total differs, Google can suppress aggregateRating rich results.
5. **Blog LCP preload image uses canonical domain URL** — Blog hero image preloads reference `hamilton-exteriors.com/content/images/...` which 404s at the canonical domain (Framer). Blog LCP is broken.

### Top 5 Quick Wins

1. **Point DNS to Railway** — Single DNS change unlocks all SEO value. ~15 minutes.
2. **Merge duplicate Service schema blocks** — Template fix in one file affects all 174 pSEO pages. ~1 hour.
3. **Fix BBB name to match site** — Update at bbb.org. ~30 minutes.
4. **Add `hasMap` to business entity schema** — One property addition strengthens Knowledge Panel. ~5 minutes.
5. **Fix alt text** — Hamilton silhouette image needs descriptive alt; Google review logo says "BBB rating" instead of "Google Reviews". ~10 minutes.

---

## 1. Technical SEO (58/100)

### Critical

| Issue | Impact | Fix |
|---|---|---|
| **DNS points to Framer, not Railway** | Google indexes wrong site. All canonicals, sitemap URLs, schema @ids resolve to Framer content. Zero SEO value accrues to the Astro site. | Point hamilton-exteriors.com A/CNAME to Railway. Take down or password-protect Framer site. |
| **Blog LCP preload uses canonical domain** | Blog hero images preload from `hamilton-exteriors.com/content/images/...` which 404s on Framer. Blog LCP is broken. | Change preload URLs to Ghost CDN absolute URLs in blog template. |

### High

| Issue | Impact | Fix |
|---|---|---|
| **No IndexNow implementation** | Bing, Yandex, Naver have no push notification for new/updated pages. With 243+ URLs growing to 1000+, this slows non-Google indexing. | Generate UUID key, place at `/[key].txt`, POST to IndexNow API on each build. |

### Passing

- HTTPS/HSTS: max-age=63072000, includeSubDomains, preload
- Security headers: CSP, X-Frame-Options, X-Content-Type-Options, Permissions-Policy, Referrer-Policy
- robots.txt: Well-formed with correct AI crawler allow/block split
- Meta robots: `index, follow` on all pages
- Viewport: Correct on all pages
- JavaScript rendering: Fully static SSR — no JS dependency for content
- Canonical tags: Correct format, consistent trailing slash policy
- URL structure: Clean, lowercase, hyphenated, logical hierarchy
- Self-hosted fonts: THE BOLD FONT + DM Sans preloaded as WOFF2
- RSS feed, favicon with cache-busting

---

## 2. Content Quality (70/100)

### Page-Level Assessment

| Page | Body Words | E-E-A-T | Content Score | Thin Risk | AI Citability |
|---|---|---|---|---|---|
| Homepage | ~1,100 | 71/100 | 74/100 | Low | 68/100 |
| /roofing | ~1,400 | 73/100 | 76/100 | Low-Medium | 71/100 |
| Blog: roof cost | ~1,800 | 86/100 | 88/100 | None | 91/100 |
| pSEO: Oakland/roofing | ~900 | 58/100 | 63/100 | **Medium** | 61/100 |
| pSEO: Walnut Creek/siding | ~880 | 57/100 | 62/100 | **Medium** | 60/100 |

*Body words = unique page content excluding nav, footer, reviews, FAQ boilerplate. Total DOM text is ~2x higher.*

### Cross-Page Duplicate Analysis (pSEO)

- **Bigram overlap between pSEO pages: 80.8%**
- Unique content per pSEO page: ~380 words (city intro ~130 words + 5 city FAQs ~250 words) = **~17% of total body**
- Assessment: Borderline. Passes minimum bar but Google's Sept 2025 QRG flags pages where unique content is a thin wrapper around a large shared template.

### Key Issues

**High — pSEO thin content at scale:** Walnut Creek siding page has only ~150 words of genuine unique content against ~2,800 total (~95% template). At 174 pSEO pages, Google may assess these as a thin-content cluster. Oakland roofing is the strongest (~55-60% unique) — likely hand-crafted. The Walnut Creek pattern is the norm.

**High — pSEO opening passage is form fields:** On all pSEO pages, the first 60 words AI crawlers extract are form field labels ("Full Name. Phone Number. Email."). This is the most critical AI extraction zone — it should be a factual lead paragraph about the service and location.

**Medium — Identical FAQ across all service pages:** The same 8 FAQ questions appear word-for-word on homepage, /roofing, /siding, /windows, and all pSEO pages. Google discourages identical FAQ content across pages. pSEO pages do add city-specific FAQs (good), but the 8 duplicated ones dilute uniqueness.

**Medium — Blog FAQ answers truncated:** The 3 FAQ questions in the blog post schema use section headers as questions with truncated body copy as answers. FAQ answers should be complete, self-contained.

### E-E-A-T Strengths

- Author: Alexander Hamilton Li, Architect & GC, CSLB #1082377 — named on every blog post with `hasCredential` schema
- CSLB verification link on every page
- "Licensed, bonded, insured" consistently displayed
- 5 manufacturer certifications with logos (GAF, CertainTeed, Owens Corning, James Hardie, ENERGY STAR)
- Real project examples with Bay Area location specificity in blog posts
- Blog post has "Sources & Further Reading" section

### E-E-A-T Gaps

- **No author bio page** — Blog byline links nowhere. No /about/alex page for Google to cross-reference the author entity. Breaks E-E-A-T chain.
- **CSLB # only in footer/FAQ** — Not visible above the fold on homepage or roofing page
- **No first-person project anecdotes on pSEO pages** — Generic "We service Oakland" vs. specific "We replaced 47 roofs in Rockridge last year"
- **No author photo** on blog posts

### Content Gaps

- No third-party pricing sources in blog (all self-sourced)
- Missing California AB 68/SB 9 ADU law content
- Missing California Title 24 energy code content for windows
- Missing seismic considerations for roofing/siding
- No CalFire WUI map links despite fire zone references

---

## 3. On-Page SEO (76/100)

### Passing

- One H1 per page, matching topic and target keywords
- Open Graph: Complete (title, description, type, url, image with dimensions, site_name, locale)
- Twitter card: `summary_large_image` on all pages
- Blog: `article:published_time` and `article:modified_time`
- Internal linking: Extensive (40+ links on pSEO pages)
- Breadcrumbs: 5-level on pSEO pages matching URL depth

### Issues

| Issue | Severity |
|---|---|
| `og:type: website` on all non-blog pages (generic) | Medium |
| All pSEO pages share the same hero background image | Medium |
| Mapbox lazy-loader script in `<head>` on pages without address input (~400 bytes) | Low |

---

## 4. Schema / Structured Data (75/100)

### Current Implementation

| Page Type | Schema Blocks |
|---|---|
| Homepage | BreadcrumbList, RoofingContractor+GeneralContractor, WebSite, FAQPage |
| Service pages | BreadcrumbList, WebPage, Service (AggregateOffer), FAQPage |
| Blog posts | BlogPosting (full E-E-A-T author), BreadcrumbList, FAQPage |
| Blog index | CollectionPage, ItemList |
| Service areas hub | ItemList, BreadcrumbList, RoofingContractor, WebSite |
| pSEO pages | BreadcrumbList, Service (x2 — DUPLICATE @id), FAQPage |
| /buy | WebApplication, Service, FAQPage |

### Issues

| # | Issue | Severity | Pages Affected |
|---|---|---|---|
| 1 | **Duplicate Service `@id` on pSEO pages** — Two Service blocks with same `@id`, conflicting properties. Block 1: has `geo`, no `offers`. Block 2: has `offers`, no `geo`. Must merge. | Critical | All ~174 pSEO pages |
| 1b | **FAQPage schema missing on /roofing** — 8 FAQ items exist in DOM but no FAQPage JSON-LD block. Losing FAQ rich result eligibility. | Critical | /roofing (check /siding, /windows too) |
| 2 | Blog post FAQ answers truncated mid-sentence | Warning | Blog posts |
| 3 | FAQ answer text mojibake (`â€"` instead of `—`) in raw JSON | Warning | All pages with FAQPage |
| 4 | Identical 8 FAQ questions on every service page | Warning | ~180 pages |
| 5 | Missing WebPage block on homepage and /service-areas | Info | 2 pages |
| 6 | Missing `hasMap` on business entity | Opportunity | Homepage, /service-areas |
| 7 | Missing `SearchAction` on WebSite block | Opportunity | Homepage |
| 8 | Author `sameAs` uses company LinkedIn, not personal | Opportunity | Blog posts |
| 9 | `itemReviewed` on reviews all use `RoofingContractor` even for siding/windows reviews | Info | Homepage |
| 10 | Buy page `price: "0"` should be numeric | Info | /buy |

### What's Working Well

The RoofingContractor entity is one of the most complete contractor schemas: `aggregateRating`, structured `review` objects, `openingHoursSpecification`, `hasCredential` with CSLB, `hasOfferCatalog`, county-level `areaServed` with Wikipedia `sameAs`, cross-linked founder entity. BlogPosting author E-E-A-T implementation is excellent.

---

## 5. Performance / Core Web Vitals (88/100)

### Server Response Times

| Page | TTFB | Size | Assessment |
|---|---|---|---|
| Homepage | 312ms | 146 KB | Good |
| /roofing | 333ms | 160 KB | Good |
| Blog post | 483ms | 91 KB | Acceptable |
| pSEO: Oakland/roofing | 305ms | 146 KB | Good |
| /buy | 223ms | 73 KB | Excellent |

Railway CDN: `cache-control: public, max-age=3600, s-maxage=604800` (7-day edge cache).

### Resource Budget

| Resource | Count | Notes |
|---|---|---|
| JavaScript | 2 files | Minimal |
| CSS | 2 files | Minimal |
| Fonts | 2 WOFF2 | Self-hosted, preloaded, no FOIT |
| Hero preloads | 2 | Mobile (768w) + Desktop (1440w), `fetchpriority="high"`, WebP |

### CWV Prognosis (HTML Inspection)

- **LCP:** Strong. Dual-breakpoint WebP preloads, self-hosted fonts, explicit dimensions. Expected < 2.5s. Exception: blog LCP broken (canonical domain 404).
- **CLS:** Very low. All images have `width`/`height` + `aspect-ratio`. Font preloads prevent FOIT. Expected < 0.05.
- **INP:** Static site, deferred GTM (interaction or 5s), lazy Mapbox. Expected < 200ms.

### Issues

| Issue | Severity |
|---|---|
| Blog LCP preload broken (canonical domain 404) | Critical |
| BackOffice Projects widget renders client-side (empty for crawlers) | Medium |
| GTM 5s timeout fires on all pageviews | Low |

---

## 6. AI Search Readiness / GEO (76/100)

### AI Crawler Access — All Correct

Allowed: GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended
Blocked (training): CCBot, anthropic-ai, cohere-ai

### llms.txt — Excellent

Present, well-formed, includes full NAP, complete pricing tables, 7-step process, 8 FAQ Q&As, 4 customer reviews, 30+ cities, founder credentials. `<link rel="ai-content-declaration">` in Layout.astro. llms-full.txt with expanded warranty tables and "Summary for AI Systems" section.

### Platform Scores

| Platform | Score | Limiting Factor |
|---|---|---|
| Google AI Overviews | 81/100 | Hero text is marketing, not informational |
| Bing Copilot | 77/100 | Need older review dates for diversity |
| ChatGPT Web Search | 74/100 | Pricing all self-sourced |
| Perplexity | 72/100 | Local stats lack source attribution |

### Key Gaps

1. **No YouTube channel** — Highest AI citation correlation (~0.737). Even 1 video + `sameAs` entry helps.
2. **pSEO opening passages are form fields** — First 60 words on city pages are form labels.
3. **No third-party pricing sources** — Add one external citation to blog costs.
4. **Unsourced statistics** — "60% pre-1960 homes" needs Census citation, "23 inches rain" needs NOAA.

---

## 7. Images (65/100)

### Passing

- Hero images: WebP, responsive breakpoints, `fetchpriority="high"`
- All images: explicit `width`/`height` + `aspect-ratio` (prevents CLS)
- Lazy loading: correctly applied below-fold only
- Image sitemap: present with descriptive titles

### Issues

| Issue | Severity |
|---|---|
| No before/after project photo galleries (major trust gap for contractors) | High |
| All pSEO pages share same hero image (weak differentiation) | Medium |
| Hamilton silhouette image has `alt=""` (needs descriptive alt) | Medium |
| Google review logo alt says "BBB rating" (should be "Google Reviews") | Medium |
| BackOffice Projects widget may not render photos for crawlers | Medium |

---

## 8. Local SEO (68/100)

### Scores

| Dimension | Score |
|---|---|
| GBP Signals | 52/100 |
| Reviews & Reputation | 72/100 |
| Local On-Page SEO | 78/100 |
| NAP Consistency | 74/100 |
| Local Schema | 85/100 |
| Local Links & Authority | 55/100 |

### Critical

- **BBB name: "Hamilton Exteriors, Inc" vs "Hamilton Exteriors"** — standardize everywhere
- **Review count mismatch** — schema 52 vs copy "50+" vs actual GBP (unknown)
- **GBP primary category unverified** — must be "Roofing Contractor"

### pSEO Page Quality

| Page | Unique Content | Template % | Risk |
|---|---|---|---|
| Oakland/Roofing | ~55-60% | ~40-45% | Low-Moderate |
| Walnut Creek/Siding | ~15% | ~85% | **Moderate-High** |
| San Jose/Windows | ~25-30% | ~70-75% | Moderate |

Infrastructure exists (`city-local-facts.ts`) but needs stronger rendering in templates.

### Missing Citations

- **Thumbtack** — high priority (ChatGPT integration)
- **Nextdoor** — high Bay Area local relevance
- **Manufacturer locators** (GAF, Owens Corning, CertainTeed, James Hardie) — unverified high-DA backlinks
- **HomeAdvisor/Angi** — unverified

### Missing Local Content

- California AB 68/SB 9 ADU laws
- California Title 24 energy codes (windows)
- Seismic bracing considerations
- CalFire WUI official map links
- PG&E utility rebate details

---

## 9. Sitemap Analysis

### Structure

```
/sitemap-index.xml -> /sitemap-0.xml (243 URLs)
/image-sitemap.xml (separate, descriptive titles)
```

- Valid XML format with correct namespaces
- lastmod dates present on all URLs
- `/sitemap.xml` -> `/sitemap-index.xml` 301 redirect working
- Image sitemap present and well-formed
- All URLs use canonical domain (correct by design)
- **Blocked by DNS issue** — all sitemap URLs currently resolve to Framer

---

*Report generated by Claude Code SEO Audit — April 4, 2026*
*Audited by 7 specialist subagents: Technical, Content, Schema, Sitemap, GEO, Local, Performance*
