# Hamilton Exteriors — Full SEO Audit Report

**Audit Date:** April 2, 2026
**Site:** https://hamilton-exteriors-production.up.railway.app
**Canonical Domain:** https://hamilton-exteriors.com
**Pages in Sitemap:** 251 (465 expected)
**Business Type:** Local Service Contractor (Hybrid SAB) — Exterior Remodeling & Design-Build
**Location:** Castro Valley, CA | Service Area: 5 Bay Area Counties

---

## SEO Health Score: 75 / 100

| Category | Weight | Raw Score | Weighted |
|----------|--------|-----------|----------|
| Technical SEO | 22% | 78/100 | 17.2 |
| Content Quality | 23% | 65/100 | 15.0 |
| On-Page SEO | 20% | 80/100 | 16.0 |
| Schema / Structured Data | 10% | 80/100 | 8.0 |
| Performance (CWV) | 10% | 85/100 | 8.5 |
| AI Search Readiness | 10% | 72/100 | 7.2 |
| Images | 5% | 68/100 | 3.4 |
| **Total** | **100%** | | **75.3** |

---

## Executive Summary

Hamilton Exteriors has a technically strong Astro static site with best-in-class security headers, correct canonical tagging, and a comprehensive schema graph. The site's biggest strengths are its security posture (95/100), static rendering (100/100 JS rendering), and local on-page SEO structure. The biggest weaknesses are: thin programmatic city pages that risk doorway page penalties, a sitemap missing ~214 pages, weak GBP on-page signals, and blog post title tag duplication. The llms.txt implementation is ahead of most competitors but has a licensing conflict.

### Top 5 Critical Issues
1. **Blog post titles duplicate brand name** — All blog posts show `Title | Hamilton Exteriors | Hamilton Exteriors` in SERPs
2. **Sitemap missing ~214 pages** — Only 251 of 465 pages in sitemap-0.xml
3. **logo-schema.png returns 404** — Schema logo property references a missing file
4. **Thin city-service pages** — ~174 programmatic pages with templated content and no city-specific data outside top-tier cities
5. **Google Maps sameAs URL is non-specific** — Uses name search, not Place ID/CID

### Top 5 Quick Wins
1. Fix blog title template bug (1 line of code)
2. Add `logo-schema.png` to `/public/` (5 minutes)
3. Remove unused `fonts.googleapis.com` preconnects (5 minutes)
4. Preload THE BOLD FONT woff2 (1 line)
5. Fix llms.txt license declaration and stale 2025 date (10 minutes)

---

## 1. Technical SEO (78/100)

### Crawlability (70/100)

**robots.txt — PASS**
- AI search crawlers allowed (GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot)
- AI training crawlers blocked (CCBot, anthropic-ai, cohere-ai)
- `/api/` correctly blocked
- llms.txt discovery comment present
- Sitemap directive correctly points to `hamilton-exteriors.com/sitemap-index.xml`

**Sitemap — HIGH ISSUE**
- sitemap-index.xml -> sitemap-0.xml contains only 251 URLs
- Expected 465 pages based on site structure
- ~214 pages (46%) invisible to search engines via sitemap
- All 251 URLs have `<lastmod>` (good), no `<priority>` values

**Internal Linking — PASS**
- Service areas hub links to 29 city pages
- Footer contains county and major city links globally
- Breadcrumbs at all hierarchy levels (HTML + JSON-LD)
- Gap: Service pages (`/roofing`) don't link to county-specific service pages

### Indexability (82/100)

**Canonical Tags — PASS**
- All pages self-reference to `hamilton-exteriors.com`
- Railway URL correctly canonicalized to production domain

**meta robots — PASS**
- Content pages: `index, follow`
- Correctly noindexed: `/terms`, `/privacy-policy`, `/buy/scan`, `/blog/untitled`

**CRITICAL: Blog title duplication**
All blog posts append `| Hamilton Exteriors` twice:
- `Roof Replacement Cost in the Bay Area (2026) | Hamilton Exteriors | Hamilton Exteriors` (86 chars)
- `7 Warning Signs You Need a New Roof | Hamilton Exteriors | Hamilton Exteriors` (77 chars)
- `Best Time to Replace Your Roof in the Bay Area | Hamilton Exteriors | Hamilton Exteriors` (88 chars)

Template bug: blog layout appends brand, then site-wide Layout appends again.

**MEDIUM: `/blog/untitled` linked from blog index**
Correctly noindexed but wastes crawl budget. Remove link or redirect.

### Security (95/100)

| Header | Value | Status |
|--------|-------|--------|
| HTTPS | Enforced via Railway | Pass |
| HSTS | `max-age=63072000; includeSubDomains; preload` | Pass |
| CSP | Full policy with explicit allowlists | Pass |
| X-Frame-Options | `SAMEORIGIN` | Pass |
| X-Content-Type-Options | `nosniff` | Pass |
| Referrer-Policy | `strict-origin-when-cross-origin` | Pass |
| Permissions-Policy | `camera=(), microphone=(), geolocation=(self)` | Pass |

Minor: CSP uses `unsafe-inline` for scripts (required for Astro island hydration — acceptable trade-off).

### URL Structure (98/100)
- Clean hierarchical URLs: `/service-areas/[county]/[city]/[service]`
- Trailing slash normalization working (301 redirect)
- HTTP->HTTPS redirect working
- Proper 404 handling (not soft-404)

### Mobile (97/100)
- Correct viewport meta on all pages
- Responsive CSS with mobile-first breakpoints
- Skip-to-main-content link present
- Logo with eager loading and explicit dimensions

### JavaScript Rendering (100/100)
- Astro 6.1 static output — all content in initial HTML response
- No JS required to render indexable content
- GTM deferred until first interaction or 5s timeout
- Mapbox Search JS (1.5MB) lazy-loaded on input focus only

### IndexNow (0/100)
Not implemented. No key file found. Easy win for Bing/Yandex/Naver index freshness.

---

## 2. Content Quality (65/100)

### E-E-A-T Assessment

**Experience:** Strong. Project photos, specific pricing, "29 cities served" claims, 50-year warranty language, CSLB license displayed site-wide.

**Expertise:** Strong on service pages and blog. Roofing page has detailed material comparisons with specific stats (metal reflects 70% solar heat, tile lasts 75-100 years). Blog post has named author with credentials.

**Authority:** Moderate. CSLB license, manufacturer certifications (GAF, Owens Corning, CertainTeed, James Hardie). Missing: no external source citations on statistics, no Wikipedia entity, no Reddit/YouTube presence.

**Trust:** Strong on-site signals (license, insurance, warranty, pricing transparency, financing). Weak external signals (no BBB profile confirmed, limited citation presence).

### Content Depth by Page Type

| Page Type | Word Count | Depth | Unique Content |
|-----------|-----------|-------|----------------|
| Homepage | ~2,500 | Strong | Yes |
| /roofing | ~3,000 | Strong | Yes — best citability page |
| Blog posts | ~1,000 | Moderate | Yes but thin for AI citation (1,500-2,500 optimal) |
| City hub (Oakland) | ~2,000 | Moderate-Strong | Yes — has neighborhood sections (Rockridge, Temescal, Montclair) |
| City-service (Oakland/roofing) | ~2,400 | Moderate | Partially templated |
| City-service (Walnut Creek/roofing) | ~2,400 | Weak | Fully templated — no neighborhoods, no local data |

### Thin Content Risk — HIGH

**Programmatic city-service pages:**
- Top-tier cities (Oakland, Berkeley, San Jose) have neighborhood sections and some unique content
- Tier-2 cities (Walnut Creek, Antioch, American Canyon) are pure template swaps — city name changes, everything else identical
- ~174 city-service pages at risk of doorway page classification
- No city-specific stats (permit costs, housing stock age, local regulations)
- FAQ sections identical across all city pages

### Blog Content Gaps
- Only 3 published blog posts
- No FAQ section within blog articles (missed featured snippet opportunity)
- No external source citations on statistics
- Word count (~1,000) below optimal for AI citation (1,500-2,500)
- Author is "Organization" in schema, not "Person"

---

## 3. On-Page SEO (80/100)

### Title Tags
- Homepage: "Bay Area's Top Design-Build & Exteriors Contractor | Hamilton Exteriors" — Good
- Service pages: Well-targeted ("Bay Area Roofing Services — Shingles, Metal, Tile & Solar | Hamilton Exteriors")
- City pages: Good ("Oakland's Top Design-Build & Exteriors Contractor | Hamilton Exteriors")
- Blog posts: BROKEN — double brand suffix

### Meta Descriptions
- Present on all tested pages
- Good keyword targeting and CTA language
- Include phone number and warranty on key pages

### Heading Structure
- Logical H1-H6 hierarchy on all tested pages
- H1 on each page unique and keyword-targeted

### Internal Linking Gaps
- Homepage -> City-service pages: 4 clicks deep
- **Gap:** Service pages don't cross-link to city-service pages (severs PageRank flow)
- **Gap:** No service-to-county-service cross-links

---

## 4. Schema / Structured Data (80/100)

### Implementation Summary

| Page Type | Schema Types |
|-----------|-------------|
| All pages | RoofingContractor (@id anchored), WebSite |
| Homepage / Service pages | + BreadcrumbList |
| /buy | + WebApplication, Service |
| Blog index | + CollectionPage |
| Blog posts | + BlogPosting |
| County/City pages | + BreadcrumbList, Service, FAQPage |

### Strengths
- Consistent `@id` anchor creates coherent entity graph
- CSLB license in `hasCredential` with `recognizedBy`
- `AggregateRating` (4.8/5, 50 reviews)
- `areaServed` with Wikipedia `sameAs` for all 5 counties
- `hasOfferCatalog` with 6 services

### Issues
1. **HIGH:** `logo-schema.png` returns 404
2. **HIGH:** Google Maps `sameAs` is non-specific (name search, not Place ID)
3. **MEDIUM:** Missing `@type` array — should include `GeneralContractor` for ADU/custom homes
4. **MEDIUM:** City `areaServed` lacks Wikipedia `sameAs` (counties have them)
5. **MEDIUM:** `og:type` is "website" on blog posts (should be "article")
6. **MEDIUM:** All pages share same `og:image`
7. **LOW:** Blog author is Organization, not Person
8. **LOW:** City pages lack `geo` coordinates

---

## 5. Performance / Core Web Vitals (85/100)

### LCP — Good
- Hero images preloaded with responsive `media` attributes
- `fetchpriority="high"` on preloads
- WebP via Astro `/_image`
- **Gap:** THE BOLD FONT not preloaded — causes heading FOUT

### CLS — Good
- All `<img>` have `width` and `height`
- `font-display: swap` on all @font-face
- Only 2 stylesheets (45KB combined)

### INP — Excellent
- GTM deferred until interaction or 5s
- Mapbox lazy-loaded on focus
- Zero synchronous scripts at parse

### Minor Issues
- Font cache TTL only 7 days (should be 1 year immutable)
- Unused preconnects to fonts.googleapis.com
- `favicon.png` returns 404
- Satoshi 500 weight not preloaded

---

## 6. AI Search Readiness / GEO (72/100)

### AI Crawler Access — Well Configured (83/100)
All major AI search crawlers explicitly allowed. Missing explicit rules for GoogleOther and Bingbot.

### llms.txt — Strong with Issues (74/100)
- Well-structured, granular pricing data, FAQ in Q:/A: format
- **CRITICAL:** CC BY 4.0 license conflicts with robots.txt training blocks
- **MINOR:** Stale "2025" pricing date
- **MINOR:** No `## Optional` section with page URLs

### Citability
| Page | Score | Notes |
|------|-------|-------|
| Blog (roof cost) | 79/100 | Strongest asset — named author, dates, query headings |
| /roofing | 76/100 | Specific stats and pricing — no external citations |
| Homepage | 72/100 | Strong stats — FAQ answers too short (20-40 words) |
| City pages | 51/100 | Templated — no city-specific extractable facts |

### Entity Gaps
- No Wikipedia entity, no Reddit presence, no YouTube channel
- YouTube correlates 0.737 with AI citation frequency

---

## 7. Local SEO (67/100)

### NAP Consistency — Internally Consistent (72/100)
- Consistent across schema, HTML, meta
- Google Maps `sameAs` non-specific (no Place ID)
- Geo coordinates ~350m off from actual address

### GBP Signals — Weakest Area (52/100)
- No Google Maps iframe embed anywhere
- Reviews hardcoded (4 displayed, 50 claimed)
- No Place ID on site
- Most recent visible review: Jan 22, 2026 (69+ days old)

### Service Area Hub — Strong Structure
```
/service-areas                → Hub
  /[county]-county-ca         → 5 counties
    /[city]-ca                → ~29 cities
      /[service]              → ~174 city+service pages
```

### Citation Gaps
Missing: BBB, Thumbtack, NextDoor, Houzz, Angi/HomeAdvisor

---

## 8. Images (68/100)

- WebP format via Astro /_image endpoint
- Explicit width/height on all imgs (CLS prevention)
- Responsive hero preloads
- **Gap:** All pages share `og-default.jpg`
- **Gap:** `favicon.png` returns 404
- **Gap:** No before/after project photos

---

## Screenshots Captured

| Page | Desktop | Mobile |
|------|---------|--------|
| Homepage | `screenshots/audit_homepage_desktop.png` | `screenshots/audit_homepage_mobile.png` |
| Roofing | `screenshots/audit_roofing_desktop.png` | `screenshots/audit_roofing_mobile.png` |
| Oakland/Roofing | `screenshots/audit_city_oakland_desktop.png` | `screenshots/audit_city_oakland_mobile.png` |
| /buy | `screenshots/audit_buy_desktop.png` | `screenshots/audit_buy_mobile.png` |

Full-page versions also captured with `_full` suffix.

---

## Limitations

- GBP profile status not verified (requires authenticated access)
- Local pack rankings not available (requires DataForSEO)
- CrUX field data not available (lab data only)
- GA4 organic traffic not available (requires GSC/GA4 access)
- Third-party citation NAP not verified (Yelp returned 403)
- Index status of pSEO pages unknown (requires GSC)

---

*Generated by SEO Audit Suite — April 2, 2026*
