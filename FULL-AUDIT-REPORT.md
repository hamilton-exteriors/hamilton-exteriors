# Hamilton Exteriors — Full SEO Audit Report

**Site:** hamilton-exteriors-production.up.railway.app (canonical: hamilton-exteriors.com)
**Audit Date:** April 2, 2026
**Pages in sitemap:** 251
**Business type:** Hybrid SAB — Roofing Contractor (primary) + General Contractor
**Stack:** Astro 6.1 + Tailwind v4, static SSR, Railway hosting

---

## SEO Health Score: 68 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 74 | 16.3 |
| Content Quality | 23% | 55 | 12.7 |
| On-Page SEO | 20% | 72 | 14.4 |
| Schema / Structured Data | 10% | 70 | 7.0 |
| Performance (CWV) | 10% | 82 | 8.2 |
| AI Search Readiness (GEO) | 10% | 74 | 7.4 |
| Images | 5% | 65 | 3.3 |
| **Total** | **100%** | | **69.3** |

### Local SEO Score: 64 / 100 (separate dimension)

---

## Executive Summary

### Top 5 Critical Issues

1. **DNS not pointed** — All canonicals, schema, and sitemap reference `hamilton-exteriors.com` but DNS doesn't resolve there yet. No page is being submitted for crawl via sitemap. This blocks everything.

2. **203 near-duplicate pSEO pages** — City+service pages have 89-97% content overlap after city-name normalization. Only 8-10% unique content per page. Fails Google's doorway page test at scale.

3. **BlogPosting schema has placeholder values** — `keywords: "blog_post"`, `articleSection: "blog_post"`, `wordCount: 1000` (hardcoded). Author is Organization instead of Person.

4. **AggregateRating claims 50 reviews but only 4 exist in schema** — Google can flag this as misleading. Same 4 testimonials repeated on every page.

5. **Blog hero images from CompanyCam: 474 KB JPEG, no WebP, no preload** — Primary LCP risk, estimated 3.5-5s on mobile.

### Top 5 Quick Wins

1. **Point DNS** — 5 minutes, unblocks all SEO
2. **Fix blog schema placeholders** — 30 minutes, removes embarrassing raw slugs
3. **Add `fetchpriority="high"` to blog hero image** — 10 minutes, improves blog LCP
4. **Trim title tags to <=60 chars** — 30 minutes, prevents SERP truncation on 5 pages
5. **Implement IndexNow** — 1 hour, instant Bing/Yandex submission for 251 pages

---

## Technical SEO (Score: 74/100)

### Crawlability — PASS
- robots.txt well-structured: AI search crawlers allowed, training crawlers blocked, `/api/` blocked
- All content server-rendered (Astro SSR) — no JS dependency for crawling
- 404 handling correct (returns HTTP 404, not soft 404)
- Trailing slash redirects work (`/roofing/` -> 301 -> `/roofing`)

### Indexability — ISSUES FOUND
- **CRITICAL:** Sitemap references `hamilton-exteriors.com` which doesn't resolve yet — 0 pages submitted via sitemap
- Canonical URLs correctly point to production domain (not Railway URL)
- `noindex` correctly applied to utility pages (`/buy/scan`, `/privacy-policy`, `/terms`, etc.)

### Security — GOOD
- HSTS: `max-age=63072000` with `includeSubDomains; preload` (2 years, preload-eligible)
- `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff` present
- `Referrer-Policy: strict-origin-when-cross-origin` correct
- **MEDIUM:** CSP uses `unsafe-inline` for script-src (XSS risk, GTM-related)
- Missing: COOP, COEP, CORP headers (low priority for static site)

### URL Structure — EXCELLENT
- Clean hierarchical URLs: `/service-areas/{county}/{city}/{service}`
- Consistent lowercase, hyphens, no trailing slashes
- No case confusion (uppercase returns 404)

### Mobile — EXCELLENT
- Viewport correctly set on all pages
- Navigation collapses to hamburger, touch targets adequate
- No horizontal scroll detected on any page
- Phone number clickable in mobile header

### IndexNow — NOT IMPLEMENTED
- No IndexNow key file found. Free, 1-hour setup for instant Bing/Yandex/Naver submission.

---

## Content Quality (Score: 55/100)

### Page Word Counts

| Page | Words | Assessment |
|------|-------|------------|
| / (homepage) | 1,805 | Good |
| /roofing | 2,335 | Good |
| /siding | 2,333 | Good |
| /windows | 2,615 | Good |
| /buy | 738 | Appropriate for tool page |
| Blog: roof cost | 1,490 | Adequate, could be deeper |
| Oakland/roofing (pSEO) | 1,809 | Good word count, but mostly templated |
| San Rafael (pSEO) | 1,714 | Good word count, but mostly templated |

### E-E-A-T Signals — STRONG
- CSLB license #1082377 visible in schema, footer, FAQ text, and llms.txt
- Named author on blog posts with license credentials
- Specific warranty terms (50-year shingle, 35-year labor)
- Real project photos in portfolio gallery
- Manufacturer certifications listed (GAF, CertainTeed, Owens Corning, James Hardie)

### Thin/Duplicate Content — CRITICAL ISSUE
- **203 city+service and city index pSEO pages have 89-97% content overlap**
- After normalizing city names, only ~8-10% unique content per page
- Same 4 testimonials (Eric W, Sarah M, Robert Holt, Laura Gaubin) on every page
- Structural sections (FAQ, financing, certifications) 100% identical across all cities
- Unique per-city data exists (neighborhoods, permits, climate) but is insufficient volume
- Berkeley vs Saratoga: 91.4% identical sentences after city-name swap
- Berkeley vs Mill Valley: 98.5% vocabulary overlap

### Blog Content
- 3 blog posts total — thin blog section
- No H3 subheadings in blog posts (hurts AI extraction)
- Blog post H2 sections are declarative, not question-format
- "BLOG_POST" raw slug visible as category label (Ghost CMS tag issue)

### Heading Structure
- Homepage H1 is a brand claim ("Bay Area's Top Design-Build & Exteriors Contractor")
- `/service-areas` hub H1 is the homepage tagline (shared Hero component bug)
- Service pages have appropriate H1s with geo modifiers

---

## On-Page SEO (Score: 72/100)

### Title Tags

| Page | Length | Issue |
|------|--------|-------|
| Homepage | 71c | Over by 11 |
| /roofing | 84c | Over by 24 — heavily truncated |
| /siding | 86c | Over by 26 |
| /windows | 89c | Over by 29 |
| /blog | 68c | Over by 8 |
| /blog/roof-cost | 65c | Over by 5 |
| /service-areas | 73c | Over by 13 |
| /buy | 41c | OK |
| Oakland/roofing pSEO | 52c | OK |

5 of 9 sampled pages have titles >60 characters — will be truncated in SERPs.

### Meta Descriptions
4 of 7 pages exceed 160 characters. Blog post at 173c. Truncation reduces SERP visibility.

### Internal Linking
- Service pages cross-link to city pages and back to county hubs
- Blog posts lack cross-links to service pages
- No conversion CTA on the blog index page
- `/service-areas` hub is mostly a card grid with minimal editorial narrative

---

## Schema / Structured Data (Score: 70/100)

### What's Implemented Well

| Schema | Coverage | Quality |
|--------|----------|---------|
| RoofingContractor + GeneralContractor | All pages (Layout.astro) | Excellent |
| BreadcrumbList | Service + pSEO pages | Good |
| FAQPage | Homepage + service pages | Good (no Google rich results on commercial pages since Aug 2023, but valuable for AI) |
| Service | Service + pSEO pages | Good — areaServed with Wikipedia sameAs |
| BlogPosting | Blog posts | Has issues |
| WebSite | All pages | Clean |
| WebApplication | /buy | Good |

### Schema Issues

| Issue | Severity |
|-------|----------|
| BlogPosting `keywords: "blog_post"` and `articleSection: "blog_post"` | Critical |
| BlogPosting `wordCount: 1000` hardcoded | Critical |
| Homepage missing BreadcrumbList | Critical |
| AggregateRating `reviewCount: 50` but only 4 Review objects | High |
| BlogPosting author is Organization, not Person | High |
| BlogPosting missing BreadcrumbList | High |
| Service blocks on /roofing and /siding missing `serviceType` | High |
| Service blocks missing `offers` / pricing | High |
| Google Maps sameAs is generic URL, not Place ID | High |
| Full LocalBusiness schema duplicated on all 251 pages | Medium |
| No HowTo schema | Medium |
| No WebPage/ServicePage schema | Medium |
| Oakland BreadcrumbList URL bug (missing `-ca` suffix) | Medium |
| `review.itemReviewed` inconsistent @type | Low |

---

## Performance / Core Web Vitals (Score: 82/100)

### Server & Compression — PASS
- Brotli compression active on all responses (82% reduction)
- TTFB: 240-340ms (acceptable)
- HTML sizes: 17-33 KB compressed

### LCP Estimates

| Page | LCP Candidate | Est. LCP | Status |
|------|--------------|----------|--------|
| Homepage | Hero WebP (58 KB mobile, preloaded) | ~1.8-2.2s | Good |
| /roofing | Hero WebP (114 KB, preloaded) | ~2.0-2.4s | Good |
| /buy | Text/form (no hero image) | ~1.2-1.5s | Good |
| Blog post | CompanyCam JPEG (474 KB, no preload) | ~3.5-5s | Poor |
| Oakland pSEO | Hero WebP (193 KB, preloaded) | ~2.0-2.5s | Good |

### CLS — PASS
All images have explicit width/height. Fonts preloaded with `font-display: swap`.

### INP — LIKELY PASS
Total first-party JS: ~8.8 KB. GTM deferred. Mapbox loaded on field focus only.

### Performance Issues

| Issue | Severity |
|-------|----------|
| Blog hero: 474 KB JPEG from CompanyCam, no WebP, no preload | High |
| Blog first image missing `fetchpriority="high"` | Medium |
| Font cache TTL only 7 days (should be 1 year immutable) | Medium |
| Missing Satoshi font file (404 on `/fonts/satoshi.woff2`) | Medium |
| /roofing hero source is PNG (377 KB) | Low |

---

## AI Search Readiness / GEO (Score: 74/100)

### AI Crawler Access — EXCELLENT

| Crawler | Status |
|---------|--------|
| GPTBot, OAI-SearchBot | Allowed |
| PerplexityBot | Allowed |
| ClaudeBot | Allowed |
| bingbot | Allowed |
| CCBot, anthropic-ai, cohere-ai (training) | Blocked |

### llms.txt — GOOD
- Well-structured markdown with company info, pricing, FAQs, service areas
- `/llms-full.txt` includes warranty tables, process steps, pricing tiers
- **Missing:** `dateModified`, named human author, GBP URL

### Citability — GOOD
- FAQ answers in 134-167 word optimal citation windows
- Pricing tables directly citable
- Blog post has named author with CSLB credentials

### GEO Gaps

| Gap | Impact |
|-----|--------|
| No YouTube/video content (highest AI citation correlation: 0.737) | High |
| Blog posts lack H3 subheadings | High |
| No HowTo schema | High |
| Declarative H2s instead of question-format | Medium |
| No `dateModified` in llms.txt | Medium |
| No SpeakableSpecification schema | Low |

### Platform Scores

| Platform | Score |
|----------|-------|
| Google AI Overviews | 76/100 |
| Perplexity | 79/100 |
| ChatGPT Web Search | 72/100 |
| Bing Copilot | 68/100 |

---

## Local SEO (Score: 64/100)

### NAP Consistency — PASS
Name, address, phone consistent across all pages, schema, and visible content.

### GBP Signals — WEAK (52/100)
- No embedded Google Map on the site
- Google Maps sameAs is a generic search URL, not a Place ID/CID link
- No GBP post embeds or references
- Review velocity concern: last schema review date Jan 22, 2026 (70+ days ago)

### Service Area Pages — NEEDS WORK
- Good 3-tier hierarchy: hub -> county -> city -> city+service
- City pages have local data (neighborhoods, permits, climate) but insufficient volume
- 89-97% overlap after city-name normalization — doorway page risk

### Citations

| Present | Missing |
|---------|---------|
| Yelp, Facebook, Instagram, LinkedIn | BBB, Thumbtack, Nextdoor, Houzz, Angi |

### Industry-Specific — STRONG
- CSLB license prominently displayed with `hasCredential` schema
- Specific warranty terms stated
- Manufacturer certifications listed (not linked to verification pages)
- "Licensed, bonded, insured" present (no specific coverage amounts)

---

## Visual / Mobile Audit

### Cross-Page Findings

| Finding | Severity | Pages |
|---------|----------|-------|
| Lead form CTA button below fold on mobile | Medium | /, /roofing, pSEO pages |
| pSEO pages share homepage hero photo | Medium | All pSEO |
| "BLOG_POST" raw slug as category label | Low | /blog |
| No conversion CTA on blog index | Low | /blog |
| /buy page: best mobile above-fold experience | Pass | /buy |
| Custom fonts loading correctly | Pass | All |
| No broken images | Pass | All |
| Brand colors consistent | Pass | All |

---

## Sitemap Audit

### Structure — GOOD
- 251 URLs, canonical domain, valid XML
- No deprecated `priority`/`changefreq` tags
- Utility pages correctly excluded

### Issues

| Issue | Severity |
|-------|----------|
| 248/251 URLs share identical build-time lastmod | Medium |
| Sitemap index missing `<lastmod>` tag | Low |
| RSS feed `/blog/rss.xml` returns 302 redirect | Medium |
