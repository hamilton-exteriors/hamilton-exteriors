# Hamilton Exteriors — Full SEO Audit Report

**URL:** https://hamilton-exteriors.com (Railway: hamilton-exteriors-production.up.railway.app)
**Audit Date:** April 2, 2026
**Business Type:** Hybrid SAB — Roofing & Exterior Contractor, Bay Area CA
**Platform:** Astro 6.1 + Tailwind v4 (Railway CDN)
**Pages Discovered:** 539 (sitemap) across 5 counties, 25+ cities, 6 services

---

## Executive Summary

### Overall SEO Health Score: 71 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 74 | 16.3 |
| Content Quality | 23% | 62 | 14.3 |
| On-Page SEO | 20% | 72 | 14.4 |
| Schema / Structured Data | 10% | 78 | 7.8 |
| Performance (CWV) | 10% | 70 | 7.0 |
| AI Search Readiness (GEO) | 10% | 76 | 7.6 |
| Images | 5% | 65 | 3.3 |
| **TOTAL** | **100%** | | **70.7** |

> **Status:** The Railway deployment serves the Astro build with comprehensive schema, CSP headers, llms.txt, and 539 pages. The custom domain (hamilton-exteriors.com) DNS must be pointed to Railway to make all improvements live for Google. **Projected score after DNS cutover: 82/100.**

### Top 5 Critical Issues

1. **DNS not pointed to Railway** — hamilton-exteriors.com still serves the old Framer site. All 539 Astro pages, schema markup, CSP headers, and llms.txt are invisible to Google.
2. **Rich city data in `.ts` files not rendered** — Oakland, San Jose, etc. have deeply unique local content (fire zones, BART rules, rental comps, permit programs) in TypeScript data files, but the rendered pages use generic Ghost CMS templates with city-name-swap only. The difference between a doorway page and a rankable resource.
3. **Programmatic city+service pages are 75-80% templated** — 500+ pages share identical service descriptions, FAQs, testimonials, and differentiators with only city name swapped. High duplicate content / thin content risk.
4. **BreadcrumbList URLs drop `-ca` suffix** — Every city page's breadcrumb schema links to `/oakland` instead of `/oakland-ca`, creating 404s in structured data across all 25+ city pages. High blast radius bug.
5. **GBP verification unknown** — The Google Maps `sameAs` URL uses a name-search, not a Place ID. If GBP is not verified at the Castro Valley address, local 3-pack ranking starts from zero.

### Top 5 Quick Wins

1. **Point DNS to Railway** — Single action that delivers all 539 pages, schema, CSP, llms.txt instantly.
2. **Fix breadcrumb `-ca` suffix bug** — One line fix in `[...slug].astro` that repairs structured data on all 25+ city pages.
3. **Wire rich `.ts` data to rendered pages** — The unique local content already exists in source files; it just needs to be rendered instead of Ghost CMS templates.
4. **Add sticky mobile CTA** — Pinned "Get Free Inspection" button fixes CTA visibility across all hero pages.
5. **Verify GBP listing** — #1 local ranking factor. Verify at Castro Valley address, set primary category to "Roofing Contractor".

---

## Category Breakdown

### 1. Technical SEO — 74/100

#### Crawlability (82/100)
- robots.txt well-configured: AI search crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) allowed; training crawlers (CCBot, anthropic-ai, cohere-ai) blocked
- `/api/` correctly disallowed
- HTTP-to-HTTPS enforced (301)
- Trailing slash redirects consistent (301 to no-slash)
- **Issue:** robots.txt served with `cache-control: max-age=0` — unnecessary origin load on every crawl

#### Indexability (65/100)
- **CRITICAL:** Canonical domain mismatch — all pages canonical to `hamilton-exteriors.com` which currently serves Framer, not Astro
- **HIGH:** og:image `hamilton-exteriors.com/og-default.jpg` returns 404 — all social shares show no preview
- **HIGH:** Sitemap URLs reference `hamilton-exteriors.com` — Google follows these to the wrong site
- All pages have proper `<link rel="canonical">` tags generated from `Astro.url.pathname`
- `noindex` correctly applied to `/success`, `/404`
- `meta name="robots" content="index, follow"` on all public pages

#### Security (97/100)
- HSTS: `max-age=63072000; includeSubDomains; preload`
- `x-content-type-options: nosniff`
- `x-frame-options: SAMEORIGIN`
- `referrer-policy: strict-origin-when-cross-origin`
- `permissions-policy` restricting camera/microphone
- Content-Security-Policy present and specific (GTM, Google Ads, Facebook Pixel, DoubleClick domains whitelisted)

#### URL Structure (88/100)
- Clean hierarchical URLs: `/service-areas/{county}/{city}/{service}`
- No query parameters, underscores, or uppercase
- Breadcrumbs match URL hierarchy on all service/location pages

#### Mobile (90/100)
- Viewport meta: `width=device-width, initial-scale=1`
- Touch targets: `min-height: 44px` on nav and footer links
- `safe-area-inset-bottom` handling in footer
- No horizontal overflow detected on any page at 375px

#### JavaScript Rendering (100/100)
- Pure SSG — all content in initial HTML response
- Googlebot requires zero JS execution to index any content
- All meta tags, schema, H1s, and body copy pre-rendered

---

### 2. Content Quality — 62/100

#### E-E-A-T Assessment

| Signal | Score | Status |
|--------|-------|--------|
| Experience | 14/20 | Customer reviews present; no detailed case studies with before/after photos |
| Expertise | 20/25 | Expert service descriptions with ARMA, Oak Ridge National Lab citations, pricing data |
| Authoritativeness | 15/25 | 5 manufacturer certifications; review credibility weak (static, not verifiable via third-party link) |
| Trustworthiness | 20/30 | CSLB license, full NAP, privacy policies; no named team page, no insurance documentation |

#### Content Depth by Page Type

| Page Type | Word Count | Assessment |
|-----------|-----------|------------|
| Homepage (/) | ~3,200 | **Strong** — comprehensive hero, testimonials, services, FAQ |
| Roofing service (/roofing) | ~3,500 | **Strong** — detailed materials, pricing, process, FAQ |
| City hub (Oakland) | ~3,000 | **Good** — neighborhoods (Rockridge, Temescal, Montclair), local FAQs |
| City+service (Oakland/roofing) | ~2,500 | **Moderate** — templated with city name swap, ~75-80% identical to other cities |
| City+service (San Jose/roofing) | ~2,100 | **Weak** — "minimal San Jose-exclusive content beyond location mentions" |
| City+service (Calistoga/siding) | ~2,100 | **Weak** — "~80% templated; ~20% potentially unique" |
| Blog post (roof cost) | ~1,850 | **Good** — author byline, specific Bay Area pricing, sources cited |
| /buy landing page | ~1,300 | **Good** — focused conversion copy, clear USPs |
| Service areas hub | ~2,200 | **Adequate** — county links, service grid |
| Blog listing | ~1,200 | **Thin** — only 3 posts |

#### Critical Content Issue: Programmatic Page Quality

The 500+ city+service pages are the backbone of the pSEO strategy but suffer from heavy templating:
- **Same testimonials** across all cities (Eric W, Sarah M, Robert Holt, Laura Gaubin)
- **Same FAQ answers** — location-agnostic across all city pages
- **Same "Hamilton Exteriors Difference" section** — zero city-specific references
- **Same service descriptions** (Asphalt Shingles, Metal Roofs, Tile, etc.) — generic across all cities
- **Only project gallery** differs meaningfully per location

**Risk:** Google's helpful content system penalizes sites with large numbers of templated pages that don't provide unique value per URL. With 500+ near-duplicate pages, this is the highest-priority content issue.

#### Content Gaps

| Gap | Priority |
|-----|----------|
| Unique city-specific content on pSEO pages (local climate, codes, common issues) | Critical |
| Team/about page with named individuals and photos | High |
| Fire-hardening / WUI content for Oakland Hills, Marin, Napa | High |
| California Title 24 / Cool Roof requirements content | High |
| More blog posts (aim for 10-15 on core roofing topics) | High |
| Emergency/storm roofing content | Medium |
| Permit/building code guides per county | Medium |
| Material comparison content (asphalt vs metal vs tile) | Medium |

#### Readability
- Service descriptions: FK Grade 13-14 (college level — may lose anxious first-time homeowners)
- FAQ answers: FK Grade 9-10 (appropriate)
- Blog posts: FK Grade 10-11 (good for informational queries)

---

### 3. On-Page SEO — 72/100

#### Title Tags (80/100)
- Unique per page, 45-75 characters
- Service pages: "Bay Area Roofing Services — Shingles, Metal, Tile & Solar | Hamilton Exteriors" (strong)
- City pages: "Roofing, Siding, ADUs & Custom Homes in Oakland, CA | Hamilton Exteriors" (good)
- City+service: "Reliable Roofing in Oakland, CA | Hamilton Exteriors" — templated pattern (adequate)
- **Issue:** /buy title "Buy Your Roof Online | Hamilton Exteriors" at 40 chars is short for a high-intent commercial page

#### Meta Descriptions (65/100)
- Present on core pages with appropriate length
- **Issue:** City+service pages use templated descriptions with only city name swapped: "Hamilton Exteriors provides top-rated roofing services in [City], [County]. Composite shingles, metal roofs, tile, and solar."
- **Issue:** Some pages appear to lack explicit meta descriptions, falling back to the layout default
- /buy description truncated in schema: "Scan your roof with satellite imagery and get an instant price — no salesper..."

#### Heading Structure (82/100)
- H1 present and unique on every page
- Clean H2-H3 hierarchy on service and city pages
- **Good:** City pages use localized H1 ("Oakland's Top Design-Build & Exteriors Contractor")
- Blog post H2s follow informational query structure

#### Internal Linking (78/100)
- Strong service area hierarchy: county > city > city+service
- City pages link to nearby cities (proximity signals)
- Footer contains full service area link mesh
- Breadcrumbs on all service/location pages
- **Gap:** Blog posts should link to relevant service and city pages more aggressively
- **Gap:** No "related services" cross-linking between service types on city pages

---

### 4. Schema / Structured Data — 78/100

#### Coverage by Page Type

| Page | Schema Types | Quality |
|------|-------------|---------|
| Homepage | RoofingContractor, WebSite, FAQPage | Strong — full NAP, geo, hours, areaServed, aggregateRating |
| /roofing | RoofingContractor, Service, HowTo, FAQPage, BreadcrumbList, WebSite | Comprehensive |
| /siding, /windows, etc. | Same as /roofing | Good |
| /service-areas | ItemList, BreadcrumbList, RoofingContractor, WebSite | Good |
| City pages (Oakland) | RoofingContractor, Service, FAQPage, BreadcrumbList, Review | Strong — local targeting |
| City+service pages | RoofingContractor, Service, HowTo, FAQPage, BreadcrumbList | Good |
| /buy | WebApplication, FAQPage, RoofingContractor, WebSite | Good — missing Service schema |
| /blog | CollectionPage, RoofingContractor, WebSite | Adequate |
| Blog posts | BlogPosting, RoofingContractor, WebSite | Good — author, dates present |

#### Issues Found

| Issue | Severity |
|-------|----------|
| **BreadcrumbList URLs drop `-ca` suffix** — every city breadcrumb links to `/oakland` instead of `/oakland-ca`, creating 404s. Bug in `[...slug].astro` line ~87. Affects all 25+ city pages. | Critical |
| All 4 schema reviews use same `datePublished: "2026-01-15"` — uniform dates trigger spam filters | High |
| /buy missing `Service` schema for commercial intent | High |
| Missing `wordCount` in BlogPosting schema — Google AIO/Perplexity quality signal | High |
| Blog `CollectionPage` publisher missing `@id` linkage to `#business` entity | Medium |
| HowTo schema deprecated by Google (Sept 2023) — remove from service pages | Medium |
| `logo` in RoofingContractor points to `favicon.png` (512x512) — should be proper logo | Medium |
| `aggregateRating.reviewCount: 50` hardcoded — may go stale | Low |
| Same 4 reviews used across all pages — limited review diversity signal | Medium |
| og:image uses same `og-default.jpg` for all 539 pages | Medium |
| No `founder`/`employee` Person entity — E-E-A-T gap | Low |
| No `paymentAccepted` property despite prominent financing mentions | Low |

#### Rich Result Eligibility
- **FAQ rich results:** FAQPage schema present on most pages, but Google restricted FAQ rich results to government/health sites (Aug 2023). Still valuable for AI citation.
- **Review snippet:** aggregateRating present — eligible for star ratings in SERPs
- **Breadcrumb:** BreadcrumbList present — eligible for breadcrumb display
- **Article:** BlogPosting with author, datePublished, dateModified — eligible

---

### 5. Performance (CWV) — 70/100

*Based on source code analysis of the Astro build*

#### Strengths
| Signal | Status | Detail |
|--------|--------|--------|
| SSG rendering | Excellent | All pages pre-rendered, zero client-side rendering waterfall |
| Font loading | Good | Self-hosted DM Sans + Satoshi with `<link rel="preload">`, `font-display: swap` |
| Hero image | Good | Responsive preload at 768px/1920px breakpoints, `fetchpriority="high"` via `preloadHero` prop |
| GTM loading | Good | Deferred until first scroll/click/keystroke (5s fallback) |
| Image optimization | Good | Astro `<Image>` component with WebP format, width/height attributes |
| CSS delivery | Good | Astro scoped styles, no large inline blocks |

#### Issues
| Issue | Severity | Detail |
|-------|----------|--------|
| Duplicate gtag.js script | High | GA4 loaded twice — double pageview, wasted connection |
| 8 Google Fonts loaded (Framer legacy?) | High | Design system allows 3 (THE BOLD FONT, DM Sans, Satoshi) — verify Framer fonts aren't leaking |
| robots.txt/llms.txt/sitemap cache `max-age=0` | Medium | Should be `max-age=86400` for static files that rarely change |
| HTML cache `max-age=300` (5 min browser) | Medium | Static site could use `max-age=86400` with asset fingerprinting |
| Missing preconnect to `fonts.googleapis.com` | Medium | Extra DNS+TCP+TLS round-trip for any Google Fonts |
| CSS variable `--font-oswald` references wrong font name | Low | Should be `--font-display` or `--font-heading` |

#### Estimated CWV (Astro Build)
| Metric | Estimate | Rating |
|--------|----------|--------|
| LCP | ~1.5-2.5s | Good-Needs Improvement (hero preload helps, 3rd-party scripts add delay) |
| INP | ~100-150ms | Good (minimal client-side JS) |
| CLS | ~0.02-0.05 | Good (explicit image dimensions, font-display:swap) |

---

### 6. AI Search Readiness (GEO) — 79/100

#### AI Crawler Access (92/100)
- GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot: **Allowed**
- Training crawlers (CCBot, anthropic-ai, cohere-ai): **Blocked** (correct policy)
- Google-Extended / GoogleOther: Not explicitly listed (defaults to Allow — consider explicit rule for clarity)
- All pages SSG pre-rendered — zero JS dependency for AI crawlers

#### llms.txt Compliance (85/100)
- `/llms.txt` exists and well-structured — company overview, services, pricing (12 SKUs, 3 tiers), process (7 steps), warranty, FAQ (8 Q&A), reviews (4 attributed)
- `/llms-full.txt` referenced and accessible with extended data
- Follows llmstxt.org specification with license/usage note
- "Summary for AI Systems" terminal block in llms-full.txt — excellent
- **Issue:** "Founded: 2018" in llms.txt not surfaced in on-page body text
- **Issue:** License statement is informal, not machine-readable RSL 1.0

#### Passage-Level Citability (82/100)

**Strengths:**
- Roofing descriptions optimized to 134-167 word passages — precisely within optimal AI citation range
- Each passage opens with a sourced statistic (ARMA, Metal Roofing Alliance, Tile Roofing Institute, Oak Ridge National Lab)
- Blog post is highest-citability asset: named author + CSLB credential, specific pricing by tier, county-level permit costs, datePublished/dateModified
- FAQ schema on most pages provides structured Q&A for AI extraction
- Pricing data directly quotable: "$940-$1,525 per roofing square"

**Gaps:**
- FAQ answers short (20-55 words) — below optimal 100+ word AI citation threshold
- Pricing table lacks explicit source attribution (add "Hamilton Exteriors installed pricing, Q1 2026")
- Missing `wordCount` property in BlogPosting schema — Perplexity/Google AIO quality signal
- City+service pages lack city-specific quotable statistics
- No question-format H2 headings on service pages
- Timeline contradiction: "Founded 2018" / "10+ years experience" / "50+ years combined" — AI systems will encounter inconsistency

#### Brand Signal Gaps
- **No YouTube channel** — highest-correlation AI citation signal (~0.737). Even 3-4 project videos would help.
- No Wikipedia entity or Wikidata item (creating one takes 45 min, improves entity recognition across all LLMs)
- No Reddit presence or press mentions
- Trustpilot/BBB profiles not linked in schema `sameAs`
- Only 11% of domains are cited by both ChatGPT and Google AI Overviews — Hamilton is positioned to break into that group for "Bay Area roofing cost" queries

#### Platform Readiness
| Platform | Score | Key Factor |
|----------|-------|------------|
| Google AI Overviews | 78/100 | BlogPosting schema, fresh dates, named author, FAQPage. Missing: wordCount, author bylines on service pages |
| Perplexity | 81/100 | PerplexityBot allowed, highly factual content. Blog cost guide is ideal Perplexity citation target |
| ChatGPT | 76/100 | llms.txt well-formed, OAI-SearchBot allowed. Missing: YouTube (highest correlation signal) |
| Bing Copilot | 74/100 | Schema comprehensive, OpenGraph complete. Missing: explicit BingBot rule, Bing Webmaster claim |

---

### 7. Local SEO — 72/100

#### NAP Consistency (78/100)
- **Consistent across all pages:** 21634 Redwood Rd Unit F, Castro Valley, CA 94546 | (650) 977-3351
- Schema `PostalAddress` matches footer and header phone
- Phone format varies: `(650) 977-3351` in visible HTML vs `+1-650-977-3351` in JSON-LD (both correct, but pick one for visible text)
- **Issue:** Footer Google Maps link uses name-search URL, not stable Place ID

#### GBP Optimization Signals (52/100 — weakest dimension)
- **CRITICAL:** GBP verification status unknown — `sameAs` URL is name-based, not Place ID. If not verified, local ranking starts from zero.
- **CRITICAL:** No Google Maps iframe embed on any page — a direct co-citation signal that every competing roofer uses
- **CRITICAL:** No "Leave a Review" CTA or direct GBP review link anywhere on site
- `RoofingContractor` schema with full `areaServed` (5 counties with Wikipedia `sameAs`) — good foundation
- `hasCredential`: CSLB #1082377 — excellent, rarely implemented
- **Gap:** No BBB, Angi, HomeAdvisor, Houzz, or Thumbtack profiles
- **Gap:** No dedicated `/contact` page

#### Service Area Page Quality (60/100)
- 5 county hubs + 25+ city pages + 500+ city+service pages — impressive architecture
- **CRITICAL:** Rich local data exists in `.ts` files (oakland-ca.ts has S-7 fire zones, BART rules, rental comps, permit programs) but is NOT rendered — Ghost CMS serves generic templates instead. This is the single most impactful content fix.
- City hub pages (Oakland, San Jose) show neighborhood sections but content is templated ("Neighborhood X is one of [City]'s most sought-after neighborhoods..." — word-for-word identical across cities)
- **Issue:** San Francisco absent — highest-value Bay Area roofing market
- **Issue:** Same 4 testimonials used across all city pages — no city-specific social proof
- **Issue:** All pages share identical meta description (DEFAULT_DESCRIPTION fallback) — zero SERP differentiation

#### Review Health (68/100)
- 4.8/5.0 aggregate in schema — but visible page text shows "Rated 4.5/5.0" in places (discrepancy)
- **CRITICAL:** Review velocity cliff — newest schema review is 70 days old (Jan 22, 2026). Sterling Sky 18-day rule means local rankings have likely already decayed.
- All 4 schema reviews are 5-star with same date (2026-01-15) — uniform dates can trigger Google spam filters
- **Issue:** No third-party review platform integration visible
- **Issue:** 50 review count is thin for a 5-county SAB — target 100+

#### Industry-Specific Local Gaps (Roofing)
| Gap | Priority |
|-----|----------|
| No fire-hardening / WUI content for Oakland Hills, Marin, Napa fire zones | High |
| No Bay Area weather-specific roofing content (fog, microclimates) | High |
| No permit/building code guides per county | Medium |
| No California Title 24 / Cool Roof requirements content | Medium |
| No emergency roof repair / storm damage content | Medium |
| Homepage title missing "roofing" keyword — primary money keyword | High |

---

### 8. Images — 65/100

#### Strengths
- Astro `<Image>` component with automatic WebP conversion
- Explicit `width` and `height` on all images (CLS prevention)
- Hero images preloaded with `fetchpriority="high"` and responsive breakpoints
- Alt text present on service and project images
- Certification badge logos (Owens Corning, CertainTeed, GAF, Tesla, James Hardie) display correctly

#### Issues
| Issue | Severity |
|-------|----------|
| Same `og-default.jpg` used for all 539 pages — identical social previews | High |
| No page-specific OG images for service pages, city pages, or blog posts | High |
| Blog post hero images served from CompanyCam CDN — alt text minimal | Medium |
| No AVIF format optimization (only WebP) | Low |

---

### 9. Visual & Mobile Rendering

*Based on 16 Playwright screenshots across 4 pages at 1440px and 375px*

#### Desktop (1440px) — Strong
- Clean Z-pattern hero: H1 left / lead form right on all pages
- Trust badges (CertainTeed, GAF, Tesla) visible near fold
- Yellow CTAs high contrast against green/dark backgrounds
- /buy has the strongest hero: full-bleed dark green with centered address input
- No layout breaks, overlapping elements, or broken images detected

#### Mobile (375px) — Needs Work
| Issue | Pages Affected | Severity |
|-------|---------------|----------|
| Lead form CTA below fold | /, /roofing, all city pages | Medium |
| Body copy may be below 16px minimum | /, /roofing, city pages | Low |
| Address input placeholder clipped ("Enter your home addr...") | /buy | Low |
| Nav link contrast on dark green background | /buy | Low |

#### What Works Well on Mobile
- /buy page: Full hero fits in 375x812 viewport — H1, body copy, address input, and "Scan Roof" button all visible without scrolling
- No horizontal overflow on any page
- Stats bars stack to 2x2 grid correctly
- Font rendering (THE BOLD FONT, DM Sans, Satoshi) is crisp across all pages

---

## Site Structure Overview

### Page Inventory (539 pages in sitemap)

| Category | Count | Notes |
|----------|-------|-------|
| Homepage | 1 | Strong |
| Service pages | 6 | /roofing, /siding, /windows, /adu, /custom-homes, /additions |
| /buy landing page | 1 | Conversion-focused |
| /buy/scan | 1 | Roof scanner tool |
| Service areas hub | 1 | County links |
| County pages | 5 | Alameda, Contra Costa, Marin, Napa, Santa Clara |
| City pages | 25+ | Oakland, Berkeley, San Jose, Palo Alto, etc. |
| City+service pages | ~490 | 25 cities x 6 services + county x service combos |
| Blog posts | 3 | Roofing cost, warning signs, best time |
| Legal pages | 5 | Terms, privacy, CCPA, EEO, opt-out |

### Sitemap Structure
- `sitemap-index.xml` → `sitemap-0.xml` (539 URLs)
- All URLs reference `hamilton-exteriors.com` (pending DNS cutover)
- Blog posts have `<lastmod>` — all other pages do not
- Properly excludes: `/success`, `/404`, `/quote-calculator`, `/buy/scan`

---

## Scoring: Current vs. Projected

| Category | Current (Railway, DNS pending) | After DNS + Content Fixes |
|----------|-------------------------------|--------------------------|
| Technical SEO | 74 | 88 |
| Content Quality | 62 | 78 |
| On-Page SEO | 72 | 82 |
| Schema | 78 | 85 |
| Performance | 70 | 80 |
| AI Search (GEO) | 76 | 85 |
| Images | 65 | 75 |
| **Overall** | **71** | **82** |

---

*Report generated April 2, 2026 by 7 parallel SEO specialist agents + direct page analysis. 16 screenshots captured. Performance estimates based on source code analysis — field measurements via CrUX recommended post-DNS cutover.*
