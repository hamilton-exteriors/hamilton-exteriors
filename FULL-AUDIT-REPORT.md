# Hamilton Exteriors — Full SEO Audit Report

**Domain:** hamilton-exteriors.com
**Audit Date:** April 5, 2026
**Business Type:** Service Area Business (SAB) — Roofing & Exterior Contractor
**Stack:** Astro 6.1 + Tailwind v4, SSR on Railway
**Pages in Sitemap:** 596

---

## Executive Summary

### Overall SEO Health Score: 74 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 82/100 | 18.0 |
| Content Quality | 23% | 72/100 | 16.6 |
| On-Page SEO | 20% | 78/100 | 15.6 |
| Schema / Structured Data | 10% | 74/100 | 7.4 |
| Performance (CWV) | 10% | 70/100 | 7.0 |
| AI Search Readiness | 10% | 81/100 | 8.1 |
| Images | 5% | 76/100 | 3.8 |
| **Total** | **100%** | | **76.5** |

### Top 5 Critical Issues

1. **78% content overlap across city-service sub-pages** — 550+ pSEO pages share nearly identical content, creating massive thin content risk
2. **Blog post images point to internal Ghost Railway hostname** — blocks Article rich result eligibility
3. **City page business schema missing aggregateRating** — inconsistent @id graph may suppress star ratings
4. **Blog "Sources and Further Reading" section is non-functional** — cost guide with 60 price claims has zero citations
5. **YouTube channel absent or unlinked** — highest-correlation AI citation signal is entirely missing

### Top 5 Quick Wins

1. Add `sameAs` to Person schema on `/about/alex-hamilton-li` (5 min)
2. Fix `llms.txt` contact metadata to spec-compliant header block (5 min)
3. Remove single-item BreadcrumbList from homepage (5 min)
4. Add SearchAction to WebSite schema block (10 min)
5. Add author attribution block to service pages ("Reviewed by Alexander Hamilton Li, CSLB #1082377") (15 min)

---

## 1. Technical SEO — 82/100

### Crawlability — 90/100

**Robots.txt: Excellent**
- AI search crawlers (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended, bingbot) all allowed
- AI training crawlers (CCBot, anthropic-ai, cohere-ai) correctly blocked
- `/api/` disallowed for all crawlers
- Default crawl-delay: 2 seconds (reasonable)
- Two sitemaps declared: `sitemap-index.xml` and `image-sitemap.xml`

**Sitemap: Good**
- Sitemap index structure with `sitemap-0.xml` + `image-sitemap.xml`
- 596 URLs in sitemap-0.xml
- `lastmod` dates present (March 30 – April 5, 2026)
- Missing: `changefreq` and `priority` attributes (minor)

**Internal Linking: Strong**
- Clear hierarchy: Homepage → County → City → Service
- Footer contains full service area directory (29+ cities)
- Blog linked from main nav ("Ground Up")
- Cross-county links present on city pages

Issues:
- **[Medium]** 6 blog posts in sitemap but not visible in blog index — receiving no internal link equity
- **[Low]** No `changefreq` or `priority` in sitemap URLs

### Indexability — 80/100

**Canonicals:** Present on key pages (blog uses canonical without query params to prevent tag/page duplicates)
- `/buy` page correctly noindexed (commit `6840f2f`)

Issues:
- **[Critical]** 550+ pSEO pages with 78% content overlap create massive duplicate/thin content risk for Google's Helpful Content evaluation
- **[Medium]** City-service sub-pages (e.g., `/service-areas/alameda-county-ca/oakland-ca/roofing`) share identical heading structures across all cities

### URL Structure — 92/100

Clean, hierarchical URL patterns:
- `/service-areas/{county}-ca/{city}-ca` — city pages
- `/service-areas/{county}-ca/{city}-ca/{service}` — city+service pages
- `/blog/{slug}` — blog posts
- `/{service}` — main service pages

No issues detected.

### Security — 78/100

- HTTPS: Yes
- SSL certificate: Valid

Issues:
- **[Medium]** Security headers not verified (HSTS, CSP, X-Frame-Options, X-Content-Type-Options should be confirmed)

### Mobile Optimization — 88/100

- Astro SSR delivers fully rendered HTML
- Images served as optimized WebP via Astro image pipeline
- Responsive viewport meta tag present
- Mobile hamburger menu implemented

### JavaScript Rendering — 95/100

- Astro 6.1 SSR on Railway = fully server-side rendered HTML
- AI crawlers receive complete HTML without JS execution
- GTM lazy-loaded on user interaction (no render blocking)
- Mapbox loaded only on address input focus
- Portfolio widget loads from BackOffice (potential JS-only content for crawlers — see Content audit M2)

---

## 2. Content Quality — 72/100

### E-E-A-T Assessment

| Signal | Score | Notes |
|--------|-------|-------|
| Experience | 78/100 | Field-specific data in blog ("We completed over 80 roof replacements in Alameda County last year") |
| Expertise | 80/100 | Author schema with CSLB #1082377, 60 price data points in cost blog |
| Authoritativeness | 62/100 | **Weakest dimension** — no press mentions, no industry associations, no external citations |
| Trustworthiness | 76/100 | Address/license verifiable, reviews unanchored to platforms |

### Content Depth

- **Homepage:** ~3,000 words total, ~700 unique body content (thin for homepage)
- **Blog posts:** 12 visible articles, 18 in sitemap. Roofing cost guide is 2,381 words (should be 2,500-3,000 for this query class)
- **City pages:** ~3,200 words each, but only 200-300 words unique per city after removing shared template
- **Service pages:** /roofing at 2,014 words with genuine pricing table — best-in-class among service pages

### Duplicate Content Risk — CRITICAL

| Page Pair | Overlap |
|-----------|---------|
| Walnut Creek roofing vs Berkeley roofing | **78%** |
| Oakland city vs Walnut Creek roofing | 51% |
| Oakland city vs Berkeley roofing | 51% |

At 550+ pages with 6 service sub-pages each, this pattern means thousands of near-identical pages.

### Blog Topic Coverage

| Category | Posts | Gap Assessment |
|----------|-------|----------------|
| Roofing | 9 | Strong |
| ADU & Additions | 2 | Moderate gap |
| Siding | 1 | **Severe gap** |
| Windows | 1 | **Severe gap** |

Missing high-value topics: Bay Area permitting process, seismic considerations, fire insurance requirements, ADU permitting timeline by county, Title 24 compliance, contractor selection checklist.

### AI Citation Readiness — 71/100

- FAQ answers average 95-125 words — below the 134-167 word optimal extraction window
- Question-format H2 headings already in place (good)
- Blog sections occasionally bury the direct answer 2-3 sentences in
- No `speakable` property in schema
- No `HowTo` schema on service pages

Issues:
- **[Critical]** C1 — 78% content overlap between same-type city service sub-pages
- **[Critical]** C2 — Blog "Sources and Further Reading" section non-functional (no actual source links)
- **[High]** H1 — Reviews undated and unplatformed (no verifiable source)
- **[High]** H2 — No external links to manufacturer certification verification pages
- **[High]** H3 — Service pages have no author attribution
- **[High]** H4 — About page not linked from blog posts or service content
- **[Medium]** M1 — Homepage unique body content thin (~700 words)
- **[Medium]** M2 — City pages limited to 3 named neighborhoods each
- **[Medium]** M5 — Blog category severe imbalance (9 roofing / 1 siding / 1 windows)

---

## 3. On-Page SEO — 78/100

### Title Tags — 85/100

- Homepage: "Bay Area Design-Build & Exteriors Contractor | Hamilton Exteriors" — clear, branded
- City pages: "Roofing, Siding, ADUs & Custom Homes in Oakland, CA | Hamilton Exteriors" — well-templated
- Blog: "Ground Up — Roofing & Home Tips | Hamilton Exteriors" — clear
- Blog posts: Article title format — good

### Meta Descriptions — 80/100

- City pages: "Oakland's trusted design-build contractor. Roofing, siding, windows, ADUs & custom homes in Alameda County." — good, city-specific
- Blog index: "Ground Up is the Hamilton Exteriors blog. Expert insights on roofing, siding, ADUs, and home improvement across the Bay Area." — good

### Heading Structure — 82/100

- Single H1 on homepage ("Bay Area's Top Design-Build & Exteriors Contractor") — correct
- Single H1 per city page with city name — correct
- Question-format H2 headings throughout (recent strategic improvement)
- Service cards use H3 — correct hierarchy

Issues:
- **[Medium]** Duplicate H2 headings across all city sub-pages ("Get a FREE ROOF INSPECTION", "What Homeowners Say", etc.)

### Internal Linking — 75/100

- Strong county → city → service hierarchy
- Footer directory with all 29+ cities
- Cross-county links on city pages

Issues:
- **[High]** About page not discoverable from blog or service pages
- **[Medium]** 6 blog posts in sitemap but missing from blog index
- **[Medium]** Blog posts don't link to related service pages or city pages

---

## 4. Schema / Structured Data — 74/100

### Implementation Summary

| Page Type | Schema Blocks | Key Types |
|-----------|---------------|-----------|
| Homepage | 4 | RoofingContractor+GeneralContractor, WebSite, FAQPage, BreadcrumbList |
| Service pages | 6 | Service, WebPage, Business ref, WebSite, FAQPage, BreadcrumbList |
| City pages | 6 | Service, Business ref, WebSite, FAQPage, WebPage, BreadcrumbList |
| Blog posts | 4 | BlogPosting, BreadcrumbList, Business ref, WebSite |

### Strengths

- Well-architected @id graph with `#business` defined on homepage, referenced everywhere
- Dual `@type: ["RoofingContractor", "GeneralContractor"]` — correct
- `hasCredential` for CSLB license with verification URL — excellent
- `knowsAbout` with 11 topics — above average
- `founder` Person schema with `sameAs` — good
- City-level Service schema with `areaServed` geo coordinates — correct
- BreadcrumbList on city pages (4-level hierarchy) — correct

### Rich Result Eligibility

| Page | Type | Eligible? |
|------|------|-----------|
| Homepage | Local Business stars | Yes (conditional on GBP) |
| Homepage | FAQ accordion | No (commercial restriction) |
| Homepage | Sitelinks Searchbox | No (SearchAction missing) |
| Blog | Article rich result | **Blocked** (Ghost image URL) |
| City pages | BreadcrumbList | Yes |

Issues:
- **[Critical]** C1 — Blog image URLs point to Ghost Railway hostname (`ghost-production-42337.up.railway.app`)
- **[Critical]** C2 — City page business block re-declares `#business` without `aggregateRating`
- **[High]** H1 — FAQPage won't generate Google rich results (commercial restriction since Aug 2023) — retain for AI extraction
- **[High]** H2 — Review markup: all 4 reviews are 5-star, no source attribution
- **[High]** H3 — WebSite block missing SearchAction (no Sitelinks Searchbox)
- **[High]** H4 — `sameAs` missing Yelp and GBP canonical URLs
- **[Medium]** M1 — BlogPosting author missing `sameAs` and `image`
- **[Medium]** M2 — BlogPosting `isPartOf` references undefined `@id`
- **[Medium]** M3 — City Service `areaServed` skips County level in hierarchy
- **[Medium]** M4 — Homepage BreadcrumbList is 1-item stub (no rich result eligibility)
- **[Low]** L1 — `ratingCount` and `reviewCount` both set to 52 (should differ)
- **[Low]** L2 — `County` type not Google-supported (use `AdministrativeArea`)

---

## 5. Performance (CWV) — 70/100

*Note: PageSpeed Insights API returned 429 (rate limited). Scores estimated from architecture analysis.*

### Architecture Assessment

**Positive signals:**
- Astro 6.1 SSR — minimal client-side JS
- Images optimized to WebP via Astro image pipeline with `srcset` and `sizes`
- GTM lazy-loaded on user interaction (scroll/click/touchstart/keydown) or 5-second timeout — not render-blocking
- Mapbox loaded on demand (address input focus only)
- Hero image has `fetchpriority="high"` and `loading="eager"` — correct LCP optimization

**Risk factors:**
- 3 custom web fonts (THE BOLD FONT, DM Sans, Satoshi) — font loading strategy needs verification for CLS
- BackOffice portfolio widget loaded as external script — potential third-party blocking
- CompanyCam images loaded from external CDN — no control over delivery speed

### Estimated CWV

| Metric | Estimated | Target | Status |
|--------|-----------|--------|--------|
| LCP | ~2.0-3.0s | < 2.5s | Borderline |
| INP | ~100-150ms | < 200ms | Likely passing |
| CLS | ~0.05-0.15 | < 0.1 | Risk from fonts |
| FCP | ~1.5-2.5s | < 1.8s | Borderline |
| TTFB | ~200-500ms | < 800ms | Good (Railway SSR) |

Issues:
- **[High]** 3 custom fonts may cause CLS if not using `font-display: swap` or preloaded
- **[Medium]** BackOffice portfolio widget is an external render-blocking risk
- **[Medium]** CompanyCam images have no size control — potential CLS from external images
- **[Low]** No `preload` detected for hero image (has `fetchpriority` but `preload` in `<head>` is faster)

---

## 6. AI Search Readiness (GEO) — 81/100

### GEO Health Breakdown

| Dimension | Score |
|-----------|-------|
| Citability | 82/100 |
| Structural Readability | 88/100 |
| Multi-Modal Content | 62/100 |
| Authority & Brand Signals | 79/100 |
| Technical Accessibility | 90/100 |

### What's Working

- **robots.txt** — perfectly configured for AI search vs training separation
- **llms.txt + llms-full.txt** — present, well-structured, with cited sources and "Key Facts for Citation" section
- **SSR architecture** — full HTML delivered to all crawlers including JS-disabled ones
- **Question-format H2s** — already implemented site-wide
- **FAQPage schema** — deployed on all page types with direct answers
- **llms-full.txt** has 11 externally-sourced statistics with DOI/URL citations — exceptional

### Platform-Specific Scores

| Platform | Score | Key Factor |
|----------|-------|------------|
| Google AI Overviews | 84/100 | FAQPage schema + question H2s + freshness |
| Bing Copilot | 82/100 | bingbot allowed, BreadcrumbList well-formed |
| Claude.ai | 80/100 | ClaudeBot allowed, RSL-1.0 license permits citation |
| Perplexity | 79/100 | llms-full.txt with cited sources |
| ChatGPT | 75/100 | GPTBot allowed, but no YouTube (highest correlation) |

Issues:
- **[Critical]** FAQ answers below 134-word citability threshold across all 550+ city pages
- **[Critical]** YouTube channel absent or unlinked (0.737 correlation with AI citations)
- **[High]** Blog articles lack "Key Facts for Citation" pattern from llms-full.txt
- **[High]** No Reddit presence for corroboration signals
- **[High]** Person schema on about page missing `sameAs` links
- **[Medium]** Direct answers buried in some blog sections
- **[Medium]** Projects section may be JS-only for AI crawlers

---

## 7. Images — 76/100

### Strengths

- All images have descriptive alt text (e.g., "Custom Homes services by Hamilton Exteriors in Oakland")
- Images served as optimized WebP via Astro image pipeline
- Appropriate `width`/`height` attributes for CLS prevention
- `srcset` and `sizes` implemented for responsive delivery
- Separate `image-sitemap.xml` for image indexing
- Hero image uses `fetchpriority="high"` and `loading="eager"`
- Below-fold images use `loading="lazy"`

### Issues

- **[High]** Blog post images use Ghost Railway hostname in schema (not canonical domain)
- **[Medium]** CompanyCam portfolio images loaded from external CDN — no optimization control
- **[Medium]** No `ImageObject` schema for portfolio project images
- **[Low]** Nav logo has no visible alt text in extraction

---

## 8. Local SEO Assessment

### Business Profile

- **NAP:** Hamilton Exteriors, 21634 Redwood Rd Unit F, Castro Valley, CA 94546
- **Phone:** (650) 977-3351 — consistent across all pages
- **Email:** support@hamilton-exteriors.com
- **CSLB:** #1082377 — linked to live verification
- **Rating:** 4.8 stars, 52 reviews
- **Google Maps CID:** 3578771346418026097
- **Hours:** M-F 7am-6pm, Sat 8am-2pm

### Service Area Coverage

- 6 counties: Alameda, Contra Costa, Santa Clara, Marin, Napa, San Mateo
- 29+ cities with dedicated pages
- County → City → Service URL hierarchy
- City-specific reviews on city pages (neighborhood-tagged)
- City-specific FAQ with local pricing

### Social Profiles

| Platform | Status |
|----------|--------|
| Google Business | Present (CID linked) |
| Yelp | Present |
| Facebook | Present |
| Instagram | Present |
| LinkedIn | Present |
| YouTube | **Missing** |
| BBB | Not detected |

### Issues

- **[High]** Reviews in schema not linked to verifiable third-party platforms
- **[High]** No Google Business Profile review widget or embedded reviews
- **[Medium]** `sameAs` missing Yelp URL and GBP canonical URL
- **[Medium]** No BBB, NRCA, or industry association membership signals
- **[Low]** Saturday hours (8-2) may limit lead capture opportunities

---

## Priority Action Plan

### Critical — Fix Immediately

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| C1 | Fix blog image URLs from Ghost Railway hostname to canonical domain | Medium | Unblocks Article rich results |
| C2 | Fix city page business schema — pure @id reference or include aggregateRating | Low | Consistent star ratings in Local Pack |
| C3 | Address 78% content overlap on pSEO city-service sub-pages | High | Prevents Helpful Content penalty at scale |
| C4 | Fix blog "Sources and Further Reading" — add actual citations | Low | Fixes E-E-A-T expertise signal |
| C5 | Extend FAQ answers to 134+ words across all city pages | Medium | Crosses AI citation extraction threshold |

### High — Fix Within 1 Week

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| H1 | Create/link YouTube channel with project walkthrough videos | High | Highest-ROI AI citation signal |
| H2 | Add author attribution to service pages | Low | E-E-A-T signal on YMYL content |
| H3 | Add SearchAction to WebSite schema | Low | Sitelinks Searchbox eligibility |
| H4 | Add `sameAs` to Person schema (LinkedIn + CSLB URLs) | Low | Verifiable identity graph |
| H5 | Link About page from blog posts and service content | Low | Authority chain completion |
| H6 | Add external links to manufacturer certification pages | Low | Verifiable trust signals |
| H7 | Add "Key Facts for Citation" blocks to top blog posts | Low | AI passage extraction |
| H8 | Date reviews with absolute dates, link to review platforms | Medium | Review verifiability |

### Medium — Fix Within 1 Month

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| M1 | Add unique city-specific intro paragraphs to pSEO pages | High | Content differentiation |
| M2 | Expand city neighborhood coverage (6-8 per city vs 3) | Medium | Local relevance depth |
| M3 | Fix city Service areaServed to include County in hierarchy | Low | Schema accuracy |
| M4 | Remove 1-item BreadcrumbList from homepage | Low | Schema cleanup |
| M5 | Add BlogPosting author `sameAs`, `image` properties | Low | E-E-A-T schema signals |
| M6 | Write 3-4 siding and windows blog posts | Medium | Topic authority balance |
| M7 | Add `HowTo` schema to service pages | Low | AI snippet eligibility |
| M8 | Verify font loading strategy for CLS | Low | Core Web Vitals |
| M9 | Add city-specific project gallery images | Medium | Local differentiation |
| M10 | Fix BlogPosting `isPartOf` undefined @id reference | Low | Schema graph integrity |

### Low — Backlog

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| L1 | Fix `ratingCount` vs `reviewCount` distinction | Low | Schema accuracy |
| L2 | Change `County` to `AdministrativeArea` in schema | Low | Spec compliance |
| L3 | Block Bytespider in robots.txt (no citation benefit) | Low | IP protection |
| L4 | Add prose summaries before markdown tables in llms-full.txt | Low | Parser compatibility |
| L5 | Add `preload` for hero image in `<head>` | Low | LCP improvement |
| L6 | Start Reddit presence in r/bayarea, r/homeowners | Medium | Corroboration signal |

---

## Appendix: Pages Analyzed

- Homepage (https://hamilton-exteriors.com)
- Roofing service page (/roofing)
- Oakland city page (/service-areas/alameda-county-ca/oakland-ca)
- Walnut Creek roofing (/service-areas/contra-costa-county-ca/walnut-creek-ca/roofing)
- Berkeley roofing (/service-areas/alameda-county-ca/berkeley-ca/roofing)
- Palo Alto city page (/service-areas/santa-clara-county-ca/palo-alto-ca)
- Blog index (/blog)
- Blog post — roof replacement cost
- robots.txt
- sitemap-index.xml / sitemap-0.xml
- llms.txt / llms-full.txt

---

*Generated by Claude Code SEO Audit — April 5, 2026*
