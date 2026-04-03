# Hamilton Exteriors — Full SEO Audit Report

**URL:** https://hamilton-exteriors-production.up.railway.app/  
**Canonical Domain:** https://hamilton-exteriors.com  
**Audit Date:** April 2, 2026  
**Business Type:** Local Service Contractor (SAB) — Exterior Remodeling  
**Stack:** Astro 6.1 + Tailwind v4, static site on Railway  
**Pages Discovered:** ~251 (1 homepage, 8 service/hub, 3 blog, 5 county, 30 county-service, 29 city, 174 city-service, 5 legal)

---

## SEO Health Score: 76 / 100

| Category | Weight | Raw Score | Weighted |
|----------|--------|-----------|----------|
| Technical SEO | 22% | 82/100 | 18.0 |
| Content Quality | 23% | 68/100 | 15.6 |
| On-Page SEO | 20% | 85/100 | 17.0 |
| Schema / Structured Data | 10% | 78/100 | 7.8 |
| Performance (CWV) | 10% | 98/100 | 9.8 |
| AI Search Readiness (GEO) | 10% | 72/100 | 7.2 |
| Images | 5% | 70/100 | 3.5 |
| **Total** | **100%** | | **78.9 → 76** |

*Adjusted down 3 points for the DNS/canonical blocker affecting all categories.*

---

## Executive Summary

### Top 5 Critical Issues

1. **Custom domain DNS not pointed to Railway** — All schema, canonicals, and sitemap reference `hamilton-exteriors.com` but that domain still serves a stale Framer site. The entire SEO entity graph is broken until DNS cutover.
2. **`aggregateRating.reviewCount: 4` vs "50+ reviews" on page** — Schema mismatch risks rich snippet suppression by Google.
3. **Review velocity cliff** — Most recent schema review is Jan 22, 2026 (69 days ago). Sterling Sky's 18-day rule means ranking degradation is likely active.
4. **`/siding` and `/windows` missing from sitemap** — Two top-level service pages are not in the XML sitemap despite returning 200.
5. **Blog posts lack author bylines** — All 3 posts published same day with no named author = E-E-A-T red flag and AI citation weakness.

### Top 5 Quick Wins

1. Fix `aggregateRating.reviewCount` in Layout.astro (5 min)
2. Add author bylines to blog posts via Ghost/template (15 min)
3. Add `/siding` and `/windows` to sitemap customPages (5 min)
4. Add `FAQPage` schema to `/roofing` and `/siding` service pages (20 min)
5. Fix Mill Valley meta description bug ("Mill's" → "Mill Valley's") (5 min)

---

## 1. Technical SEO (82/100)

### Security Headers — Excellent

| Header | Status | Value |
|--------|--------|-------|
| `strict-transport-security` | PASS | `max-age=63072000; includeSubDomains; preload` |
| `x-content-type-options` | PASS | `nosniff` |
| `x-frame-options` | PASS | `SAMEORIGIN` |
| `referrer-policy` | PASS | `strict-origin-when-cross-origin` |
| `permissions-policy` | PASS | `camera=(), microphone=(), geolocation=(self)` |
| `content-security-policy` | PASS | Comprehensive CSP with script/img/connect restrictions |

### Crawlability

| Check | Status | Notes |
|-------|--------|-------|
| robots.txt | PASS | Well-configured; AI crawlers allowed, training blocked |
| Sitemap accessible | WARN | `/sitemap-index.xml` works on Railway; `robots.txt` Sitemap directive points to `.com` domain (404 until DNS cutover) |
| Canonical tags | WARN | All point to `hamilton-exteriors.com` — correct after DNS cutover, currently orphaned |
| HTTP status codes | PASS | All discovered pages return 200 |
| Redirect chains | PASS | No redirect chains detected |
| 404 pages | WARN | `/sitemap.xml` returns 404 (only `/sitemap-index.xml` works) |

### Meta Tags

| Check | Status | Notes |
|-------|--------|-------|
| Title tags | PASS | Unique per page, proper length, keyword-optimized |
| Meta descriptions | WARN | Mill Valley page has truncation bug ("Mill's" instead of "Mill Valley's") |
| Viewport | PASS | Responsive design confirmed |
| Open Graph | PASS | `og-default.jpg` present |
| Robots meta | PASS | No noindex on content pages |

### URL Structure

| Check | Status | Notes |
|-------|--------|-------|
| Clean URLs | PASS | `/service-areas/alameda-county-ca/oakland-ca` — descriptive, hyphenated |
| Hierarchy | PASS | 3-level location architecture (hub → county → city) |
| Trailing slashes | PASS | Consistent `trailingSlash: 'never'` config |

### Issues

- **CRITICAL:** DNS cutover needed — all canonical/schema references are orphaned
- **HIGH:** `/siding` and `/windows` missing from sitemap
- **MEDIUM:** Homepage sitemap `<loc>` missing trailing slash (minor canonical inconsistency)
- **LOW:** Old Framer sitemap at `hamilton-exteriors.com/sitemap.xml` will conflict post-cutover

---

## 2. Content Quality (68/100)

### E-E-A-T Assessment

| Signal | Status | Notes |
|--------|--------|-------|
| Experience | PARTIAL | "500+ projects" and project gallery present but no case studies with details |
| Expertise | PASS | CSLB license, manufacturer certifications (GAF, Owens Corning, CertainTeed, James Hardie) |
| Authoritativeness | WEAK | No press coverage, no industry association memberships visible, thin external citations |
| Trustworthiness | PASS | License number, real address, clear pricing, warranty terms |

### Blog Content

| Issue | Severity | Detail |
|-------|----------|--------|
| No author bylines | HIGH | All 3 posts lack named human author — AI systems deprioritize unattributed content |
| Same-day publishing | MEDIUM | All 3 posts dated March 31, 2026 — signals batch-generated content |
| No external citations | HIGH | Cost claims, statistics, and tax credit figures have no source attribution |
| "BLOG_POST" label | LOW | Raw taxonomy slug displayed on blog cards instead of human-readable "Blog" |

### Service Pages — Strong

- `/roofing`: ~2,500 words, specific pricing ($940-$1,525/sq), material specs, timeline, financing — excellent depth
- `/siding`: Pricing table with 6 products, material vs installed costs — good
- City pages: ~2,400-3,500 words with unique neighborhood sections — above thin content threshold

### Duplicate Content Risk

| Issue | Severity | Detail |
|-------|----------|--------|
| City page FAQ identical | MEDIUM | All 29 city pages share the exact same 5 FAQ questions and answers |
| City-service pages (174) | HIGH RISK | Template-swapped city+service combinations — need unique content verification to avoid doorway page classification |
| County pages share FAQ | MEDIUM | Default FAQ component with no county-specific questions |

### Readability

- Service pages use conversational tone appropriate for homeowner audience
- Clear pricing tables with scope definitions
- Good use of H2/H3 hierarchy for scanability

---

## 3. On-Page SEO (85/100)

### Title Tags — Sample

| Page | Title | Length | Assessment |
|------|-------|--------|------------|
| Homepage | "Bay Area Exterior Remodeling \| Roofing, Siding & More \| Hamilton" | 65 chars | PASS |
| /roofing | "Bay Area Roofing \| Shingles, Metal & Tile \| Hamilton" | 53 chars | PASS |
| Oakland | "Roofing, Siding, ADUs & Custom Homes in Oakland, CA \| Hamilton Exteriors" | 73 chars | PASS (slightly long) |

### Heading Structure

| Page | H1 | H2 Count | Assessment |
|------|----|----|------------|
| Homepage | "Bay Area's Top Design-Build & Exteriors Contractor" | 10+ | PASS — clear hierarchy |
| /roofing | "Bay Area's #1 Roofing Contractor" | 12 | PASS |
| Oakland | "Oakland's Top Design-Build & Exteriors Contractor" | 9 | PASS |

### Internal Linking

- ~40-45 internal links per page (nav + footer + content links)
- Service pages cross-linked from every city page
- Sibling city linking via "Nearby Cities We Serve" sections
- Breadcrumb navigation on all subpages
- **Gap:** No contextual content links between blog posts and service pages

---

## 4. Schema / Structured Data (78/100)

### What's Implemented — Excellent Breadth

| Schema Type | Pages | Status |
|-------------|-------|--------|
| RoofingContractor + GeneralContractor | All pages (Layout.astro) | PASS |
| LocalBusiness (PostalAddress, geo, hours) | All pages | PASS |
| AggregateRating | All pages | FAIL — reviewCount mismatch |
| Review (4 individual) | All pages | PASS |
| FAQPage | City pages, homepage | PASS |
| BreadcrumbList | All subpages | PASS |
| WebSite with publisher | All pages | PASS |
| Service | County/city pages | PASS |
| OfferCatalog | Homepage | PASS |
| hasCredential (CSLB) | All pages | PASS |
| areaServed (5 counties) | All pages | PASS |
| ItemList | /service-areas | PASS |

### Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| `reviewCount: 4` vs "50+ reviews" | CRITICAL | Mismatch between schema and visible page content |
| FAQPage missing on `/roofing`, `/siding` | HIGH | Service pages have FAQ sections but no FAQPage schema |
| No `Article` schema on blog posts | MEDIUM | Blog posts lack structured data for author, datePublished, dateModified |
| County Service schema uses `AdministrativeArea` | LOW | Should use `@type: County` to match Layout-level schema |
| No `HowTo` schema on process sections | LOW | The 7-step process could benefit from HowTo markup |

---

## 5. Performance / Core Web Vitals (98/100)

### Lighthouse Lab Data

| Metric | Homepage | /roofing | Oakland City | Threshold |
|--------|----------|----------|-------------|-----------|
| Performance | 99 | 97 | 99 | >90 |
| Accessibility | 100 | 100 | 100 | >90 |
| Best Practices | 96 | 96 | 96 | >90 |
| SEO | 100 | 100 | 100 | >90 |
| LCP | 1.9s | 2.3s | 1.9s | <2.5s |
| CLS | 0 | 0 | 0.004 | <0.1 |
| TBT | 30ms | 80ms | 30ms | <200ms |
| FCP | 1.2s | 1.3s | 1.2s | <1.8s |
| Speed Index | 2.9s | 2.9s | 1.9s | <3.4s |

**Assessment:** Outstanding. All metrics green across all tested pages. Static Astro site with Railway CDN delivers excellent performance. No action needed.

---

## 6. AI Search Readiness / GEO (72/100)

### AI Crawler Access

| Crawler | Status |
|---------|--------|
| GPTBot | Allowed (blocks /api/) |
| OAI-SearchBot | Allowed |
| PerplexityBot | Allowed |
| ClaudeBot | Allowed |
| bingbot | Allowed (blocks /api/) |
| Google-Extended | Blocked (training) |
| CCBot, anthropic-ai, cohere-ai | Blocked (training) |

**Assessment:** Correctly configured — search crawlers allowed, training crawlers blocked.

### llms.txt

- Present and well-structured per llmstxt.org spec
- Includes owner name, CSLB license, pricing, services, FAQ, reviews, service areas
- **Gap:** `/llms-full.txt` referenced but may not exist at production URL
- **Gap:** No `<link rel="alternate" type="text/plain" href="/llms.txt">` in page `<head>`

### Citability Assessment

| Page | Citability | Key Gap |
|------|-----------|---------|
| /roofing | HIGH | Statistics lack source attribution (70% solar heat reflection, 30% ITC) |
| /siding | MEDIUM-HIGH | Pricing table is extractable; no external citations |
| Homepage | MEDIUM | No clean 134-word answer passage for "Who is Hamilton Exteriors?" |
| Blog | LOW | No author, no citations, same-day batch publish |

### Platform Scores

| Platform | Score | Key Blocker |
|----------|-------|-------------|
| Google AI Overviews | 68 | Blog E-E-A-T, missing source citations |
| ChatGPT | 74 | Thin entity footprint outside own site |
| Perplexity | 70 | No Reddit/forum presence to triangulate |
| Bing Copilot | 71 | bingbot allowed; LinkedIn exists |

### Missing Authority Signals

- No YouTube channel (highest AI citation correlation at ~0.737)
- No Reddit presence (r/bayarea, r/HomeImprovement)
- No Wikipedia entity
- No press/media coverage detected

---

## 7. Images (70/100)

### Visual Assessment

| Page | Desktop | Mobile | Issues |
|------|---------|--------|--------|
| Homepage | Excellent | Very Good | Hero bg slightly dark in bottom-left corner |
| /roofing | Excellent | Good | Announcement bar wraps to 2 lines on mobile |
| Oakland city | — | Good | Breadcrumb tap targets too small (~20-24px, need 48px) |
| /blog | — | Fair | "BLOG_POST" raw label; no lead CTA above fold |

### Image Optimization

- Blog images served from Ghost CMS with proper loading
- CompanyCam project photos loading correctly
- OG image (`og-default.jpg`) present as default
- **Gap:** No page-specific OG images for service pages or blog posts

---

## 8. Local SEO (67/100)

### NAP Consistency

| Source | Name | Address | Phone |
|--------|------|---------|-------|
| Schema (all pages) | Hamilton Exteriors | 21634 Redwood Rd Unit F, Castro Valley, CA 94546 | +1-650-977-3351 |
| Visible HTML | Hamilton Exteriors | Same | (650) 977-3351 |
| **Status** | CONSISTENT | CONSISTENT | CONSISTENT (format only) |

### Critical Local Issues

1. **Review count schema mismatch** — `reviewCount: 4` in schema vs "50+ reviews" on page
2. **Review velocity cliff** — 69 days since last schema review (18-day rule exceeded)
3. **No Google Maps embed** on any page — missed trust/entity signal for SAB
4. **DNS not pointed** — GBP website URL, citations, and schema all reference `.com`

### Citation Gaps

| Directory | Status |
|-----------|--------|
| Google Business Profile | Likely exists (sameAs reference) |
| Yelp | Listed (unverifiable — 403 on fetch) |
| Facebook | Listed |
| LinkedIn | Listed |
| BBB | NOT FOUND — highest-DA missing citation |
| Thumbtack | NOT FOUND — cited by ChatGPT/Alexa for contractors |
| Nextdoor | NOT FOUND — high local trust for Bay Area |
| Houzz | NOT FOUND |
| Angi | NOT FOUND |

### Location Page Quality

- 29 city pages with unique neighborhood sections (15-20% unique content)
- Identical FAQ across all city pages (differentiation needed)
- 174 city-service pages at risk for doorway page classification
- County pages use correct Service schema with areaServed

---

## 9. Sitemap (68/100)

### Structure

- `/sitemap-index.xml` → `/sitemap-0.xml` (251 URLs)
- Well-formed XML, UTF-8, correct namespaces
- No `priority` or `changefreq` (correct per modern best practice)

### Issues

| Issue | Severity |
|-------|----------|
| `/siding` and `/windows` missing from sitemap | HIGH |
| `robots.txt` Sitemap directive 404s until DNS cutover | HIGH |
| Homepage `<loc>` missing trailing slash | LOW |
| All 3 blog `lastmod` dates identical | LOW |
| Old Framer sitemap will conflict post-cutover | INFO |

---

## Scoring Summary

```
Technical SEO:         82/100  (22% weight) = 18.0
Content Quality:       68/100  (23% weight) = 15.6
On-Page SEO:           85/100  (20% weight) = 17.0
Schema / Structured:   78/100  (10% weight) =  7.8
Performance (CWV):     98/100  (10% weight) =  9.8
AI Search (GEO):       72/100  (10% weight) =  7.2
Images:                70/100  ( 5% weight) =  3.5
                                              -----
Weighted Total:                               78.9
DNS Blocker Penalty:                          -3.0
                                              -----
FINAL SCORE:                                  76/100
```

---

*Report generated April 2, 2026 by 8 parallel SEO audit agents.*
