# Hamilton Exteriors — Full SEO Audit Report

**URL:** https://hamilton-exteriors-production.up.railway.app/
**Domain:** hamilton-exteriors.com (STILL NOT CONNECTED — resolves to Framer)
**Audit Date:** 2026-04-02 (re-audit)
**Previous Audit:** 2026-04-02 (score: 64/100)
**Business Type:** Service Area Business (SAB) — Roofing Contractor + General Contractor
**Pages in Sitemap:** 251
**Stack:** Astro 6.1 + Tailwind v4, static site on Railway

---

## SEO Health Score: 65 / 100

| Category | Weight | Raw Score | Weighted | Change |
|---|---|---|---|---|
| Technical SEO | 22% | 62 / 100 | 13.6 | +4 |
| Content Quality | 23% | 74 / 100 | 17.0 | +2 |
| On-Page SEO | 20% | 58 / 100 | 11.6 | -8 |
| Schema / Structured Data | 10% | 78 / 100 | 7.8 | 0 |
| Performance (CWV) | 10% | 70 / 100 | 7.0 | -6 |
| AI Search Readiness | 10% | 74 / 100 | 7.4 | +6 |
| Images | 5% | 48 / 100 | 2.4 | -14 |
| **TOTAL** | **100%** | | **66.2 → 65*** | **+1** |

*\*Score adjusted due to the Critical domain-not-connected issue. Without this issue, projected score: ~82/100.*

---

## Executive Summary

### The #1 Issue: Domain STILL Not Connected

**`hamilton-exteriors.com` still resolves to the old Framer site** (Server: Framer/154a7c5). This was the #1 critical issue in the previous audit and remains unresolved. Until DNS is pointed to Railway, the entire site is invisible to search engines.

**What improved since last audit:**
- Blog posts expanded to 1,500+ words with E-E-A-T signals
- AggregateOffer pricing added to Service schema
- Breadcrumb URL and county schema bugs fixed
- Image pipeline re-run with vision scoring (avg score 91)
- 96 new pages added (347 total, up from 251)

**What got worse:**
- Image alt text is severely degraded — siding page: 1/23 images have alt text
- All service pages preload the wrong hero image (homepage hero instead of page-specific)
- City+service pages are ~60% boilerplate with only ~400-500 words of unique local content

### Top 5 Critical Issues

1. **hamilton-exteriors.com not connected to Railway** — blocks ALL indexation (unchanged)
2. **All city page geo coordinates point to Castro Valley HQ** — every city/service page carries `37.69427, -122.07887` instead of the served city's centroid. Google's local systems use `geo` on Service schema for geographic association.
3. **Image alt text crisis** — siding page: 1/23, roofing: ~6/20+ missing, certification logos universally bare across all pages
4. **BlogPosting `image` is a string, not ImageObject** — blocks article image rich results on all 3 blog posts
5. **Entity ambiguity: Marcus Hamilton vs Alexander Hamilton Li** — llms.txt lists owner as "Marcus Hamilton", blog byline says "Alexander Hamilton Li". AI systems cannot resolve this as the same entity.

### Top 5 Quick Wins (after domain connection)

1. Fix BlogPosting `image` → ImageObject array (unlocks article rich results, 15 min)
2. Add `@id` to all Service schema blocks (unlocks entity graph resolution, 30 min)
3. Add alt text to certification logos (1 component fix → all pages, 15 min)
4. Fix hero image preload to be page-specific (LCP improvement on every non-homepage, 1 hr)
5. Resolve entity ambiguity — clarify Marcus Hamilton vs Alexander Hamilton Li roles in llms.txt (10 min)

---

## 1. Technical SEO — 62 / 100

### Crawlability (48/100)

| Severity | Finding |
|---|---|
| CRITICAL | `robots.txt` Sitemap directive → `hamilton-exteriors.com/sitemap-index.xml` (Framer, not Railway) |
| CRITICAL | Custom domain resolves to Framer `Server: Framer/154a7c5`, not Railway |
| MEDIUM | `Google-Extended` fully blocked — site excluded from Google AI Overviews (confirm if intentional) |
| PASS | Googlebot, bingbot, GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot all allowed |
| PASS | Training crawlers correctly blocked (CCBot, anthropic-ai, cohere-ai) |
| PASS | `llms.txt` and `llms-full.txt` discoverable via `<link rel="ai-content-declaration">` |

### Indexability (40/100)

| Severity | Finding |
|---|---|
| CRITICAL | All canonical tags point to `hamilton-exteriors.com` (serves Framer, not this site) |
| CRITICAL | Duplicate content risk: Railway URL serves site but canonicals reference dead domain |
| HIGH | `og:image` hardcoded to `hamilton-exteriors.com/og-default.jpg` — social share previews broken |
| HIGH | OG URLs all reference hamilton-exteriors.com — social crawlers hit Framer instead |
| PASS | All pages have `<meta name="robots" content="index, follow">` |
| PASS | pSEO pages have unique titles, descriptions, and canonical paths |
| PASS | `lang="en"` on all pages |

### Security (88/100)

| Severity | Finding |
|---|---|
| PASS | HTTPS enforced |
| PASS | HSTS: `max-age=63072000; includeSubDomains; preload` (2 years) |
| PASS | Content-Security-Policy: comprehensive with named sources |
| PASS | X-Content-Type-Options: nosniff |
| PASS | X-Frame-Options: SAMEORIGIN |
| PASS | Referrer-Policy: strict-origin-when-cross-origin |
| PASS | Permissions-Policy: camera=(), microphone=(), geolocation=(self) |
| MEDIUM | CSP contains `'unsafe-inline'` in script-src and style-src (common with Astro) |
| LOW | No X-XSS-Protection (deprecated, but flagged by scanners) |

### URL Structure (90/100)

| Severity | Finding |
|---|---|
| PASS | Clean, lowercase, hyphenated URLs |
| PASS | Trailing slash → 301 → no-slash (consistent) |
| PASS | HTTP → HTTPS redirect |
| PASS | No redirect chains detected |
| PASS | pSEO hierarchy: `/service-areas/{county}/{city}/{service}` |
| PASS | 404 returns proper HTTP 404 status code |

### Mobile (92/100)

| Severity | Finding |
|---|---|
| PASS | `<meta name="viewport" content="width=device-width, initial-scale=1">` on all pages |
| PASS | Responsive `<picture>` elements with WebP and srcset breakpoints |
| PASS | Font preloading for FOUT prevention |
| PASS | `geo.region` and `geo.placename` meta tags present |

### JavaScript Rendering (95/100)

| Severity | Finding |
|---|---|
| PASS | Astro SSG — all pages are pre-rendered HTML, no JS required for content |
| PASS | Interactive components use partial hydration (`type="module"`) |
| LOW | `/buy/scan` (Mapbox) is fully client-side — needs static HTML fallback for crawlers |

---

## 2. Content Quality — 74 / 100

### E-E-A-T Assessment

| Signal | Score | Evidence |
|---|---|---|
| **Experience** | 78/100 | Project gallery with real CompanyCam photos, named customer testimonials, specific pricing per square, 80+ jobs cited |
| **Expertise** | 84/100 | 5 manufacturer certifications (GAF, Owens Corning, CertainTeed, Tesla, James Hardie), CSLB license, detailed material comparisons |
| **Authority** | 58/100 | Only 50 reviews, 3 blog posts (all same date), no YouTube, no Wikipedia entity, limited backlink profile |
| **Trust** | 82/100 | Transparent pricing ($940-$1,525/sq), CSLB #1082377, warranty details, physical address, financing terms |

### Content Depth by Page Type

| Page Type | Count | Word Count | Quality |
|---|---|---|---|
| Homepage | 1 | ~3,500 | Good — trust signals, services, reviews, CTAs |
| Service pages (roofing, siding, windows, ADU, custom-homes, additions) | 6 | 3,200-4,500 | Strong — pricing, materials, gallery, FAQs |
| County pages | 5 | ~2,500 | Adequate — geographic overview, city links |
| City pages | 29 | ~2,000+ | Good — neighborhood content, testimonials, FAQs |
| City+service pages (pSEO) | ~174 | ~3,200 | **Mixed** — ~60% boilerplate, ~400-500 words unique |
| Blog posts | 3 | 1,500-2,100 | Strong content but **critically low volume** |
| Service areas hub | 1 | ~2,800 | Good hub page with county cards and map |
| Legal pages | 5 | varies | Adequate |

### Thin Content Analysis

| Severity | Finding |
|---|---|
| HIGH | ~174 city+service pSEO pages share ~60% boilerplate content (warranty, financing, certs, FAQ structure) |
| HIGH | Unique local content per city+service page is only ~400-500 words (neighborhood mentions, permit timelines, climate notes) |
| MEDIUM | Neighborhood descriptions are brief and formulaic — "This is especially important for homes in [County] where [weather condition]" |
| MEDIUM | FAQ answers appear to use light city-name substitution rather than genuinely unique answers |
| LOW | County pages are thin bridges to city pages with limited standalone value |

### Blog Assessment

| Severity | Finding |
|---|---|
| HIGH | Only 3 blog posts total — all published March 31, 2026 (same day) |
| MEDIUM | No coverage of siding, windows, ADUs, custom homes, additions |
| MEDIUM | Blog hub page ("Ground Up") title doesn't signal topical authority |
| PASS | Blog posts that exist are comprehensive (1,500-2,100 words) with good E-E-A-T signals |
| PASS | Blog post on roof replacement cost is highly competitive for target keyword |

---

## 3. On-Page SEO — 58 / 100

### Title Tags (85/100)

| Severity | Finding |
|---|---|
| PASS | All pages have unique title tags |
| PASS | Service pages include location + service + brand |
| PASS | City+service pages include city name + service |
| LOW | Homepage title at 68 chars (ideal: 50-60) |
| LOW | ADU title at 89 chars — too long, will be truncated |

### Meta Descriptions (80/100)

| Severity | Finding |
|---|---|
| PASS | Unique per page with calls-to-action |
| PASS | Include phone number and key differentiators |
| PASS | Compelling with specific numbers ($0 down, 50-year warranty) |

### Heading Structure (75/100)

| Severity | Finding |
|---|---|
| PASS | Single H1 per page |
| PASS | H1s are descriptive and keyword-rich |
| LOW | ADU page H1 typo: "Bay Areas Best ADU Builder" (missing apostrophe) |
| LOW | Duplicate H2 "Ready to start?" on roofing page |
| LOW | Some "Why Hamilton" sections lack clear heading hierarchy |

### Image Alt Text (25/100) ← MAJOR DROP

| Severity | Finding |
|---|---|
| CRITICAL | Siding page: 1 of ~23 images have alt text |
| HIGH | Roofing page: ~6 of ~20+ images missing alt text (cert logos, project photos, reviewer avatars) |
| HIGH | Windows page: 11 images missing alt text |
| HIGH | Certification logos (5 logos) have NO alt text across ALL pages — affects every page sitewide |
| HIGH | Reviewer avatar images have NO alt text on any page |
| HIGH | CompanyCam project gallery photos have NO alt text |
| MEDIUM | Footer badge images (Google, Yelp) missing alt text |
| PASS | Window product images have descriptive alt text |
| PASS | Hero images on some pages have alt text |
| PASS | Financing house image has alt text across pages |

**Alt text summary by page:**

| Page | Images | With Alt | % |
|---|---|---|---|
| Siding | ~23 | 1 | 4% |
| Roofing | ~20 | ~7 | 35% |
| Windows | ~22 | ~11 | 50% |
| Homepage | ~20 | ~5 | 25% |

### Internal Linking (72/100)

| Severity | Finding |
|---|---|
| PASS | Service pages link to all service area pages in footer |
| PASS | City pages link to all service types |
| PASS | Breadcrumb navigation on all pSEO pages |
| MEDIUM | No contextual cross-service links on city+service pages (e.g., Oakland Roofing → Oakland Siding) |
| MEDIUM | Blog posts link to service pages but not to specific city pages |
| LOW | No "related posts" section on blog posts |

---

## 4. Schema / Structured Data — 85 / 100

### Implementation by Page Type

| Page Type | Schema Types | Status |
|---|---|---|
| Homepage | BreadcrumbList, RoofingContractor/GeneralContractor, WebSite | Complete |
| Service pages | BreadcrumbList, RoofingContractor, Service, FAQPage, AggregateOffer | Strong |
| City pages | BreadcrumbList, LocalBusiness, Service, Review, FAQPage | Comprehensive |
| City+service | BreadcrumbList, Service, LocalBusiness, FAQPage, AggregateOffer | Strong |
| Blog posts | BreadcrumbList, BlogPosting (to verify), Organization | Adequate |
| County pages | BreadcrumbList, LocalBusiness, Service | Adequate |

### Strengths

| Finding |
|---|
| AggregateOffer pricing ($940-$1,525/sq) on service pages — rich result eligible |
| AggregateRating (4.8/5, 50 reviews) consistently applied |
| CSLB license in hasCredential property |
| FAQ schema with comprehensive Q&A pairs (5-10 per page) |
| BreadcrumbList accurately reflects URL hierarchy |
| Service schema with detailed descriptions per offering |
| Review schema with named reviewers and dates |

### Issues

| Severity | Finding |
|---|---|
| CRITICAL | **BlogPosting `image` is a string, not ImageObject** — Google requires ImageObject with url/width/height for article rich results. All 3 blog posts affected. |
| CRITICAL | **Service schema missing `@id` on ALL pages** — prevents entity graph resolution and cross-page referencing |
| CRITICAL | **Santa Clara County Service has no `description` or `offers`** — most incomplete Service block on site |
| HIGH | All schema URLs reference `hamilton-exteriors.com` (Framer) — @id, url, sameAs all broken |
| HIGH | **`provider.@type` is `RoofingContractor` on siding/windows pages** — semantically incorrect for non-roofing services |
| HIGH | **City hub pages (Oakland etc.) missing `offers` and `description` on Service schema** — pricing signal absent on high-intent local pages |
| MEDIUM | Same 4 reviews (all 5-star) hardcoded across all pages — authenticity risk + schema duplication |
| MEDIUM | No HowTo schema on blog posts (e.g., "7 Warning Signs" is a natural fit) |
| MEDIUM | WebSite schema missing `potentialAction` SearchAction — missed Sitelinks Searchbox opportunity |
| MEDIUM | `keywords` and `inLanguage` missing from BlogPosting |
| LOW | Homepage BreadcrumbList has only 1 item (Home) — won't generate rich result |
| LOW | FAQPage won't show SERP accordions on commercial sites (Google policy since Aug 2023) — still valuable for GEO/LLM citation |

---

## 5. Performance (CWV) — 70 / 100

### Key Findings

| Severity | Finding |
|---|---|
| HIGH | **Wrong hero image preloaded on ALL non-homepage pages** — every page preloads `hero-bg-2400.B0AiramO.jpg` (homepage hero) instead of page-specific hero. Wastes bandwidth and delays actual LCP. |
| MEDIUM | Font preloads correct: the-bold-font.woff2 + dm-sans-latin.woff2. But Satoshi font not preloaded. |
| PASS | Railway CDN with edge caching (`cache-control: public, max-age=300, s-maxage=3600`) |
| PASS | Served from `cache-sjc1000119-SJC` (San Jose) — optimal for Bay Area audience |
| PASS | Astro image optimization: WebP conversion, responsive srcset, quality optimization |
| PASS | SSG — zero server-side rendering delay |
| PASS | Compression enabled (Vary: Accept-Encoding) |

### Hero Image Preload Bug (Detail)

Every page in the `<head>` contains:
```html
<link rel="preload" href="/_image?href=/_astro/hero-bg-2400.B0AiramO.jpg&w=1080&h=608&q=90&f=webp"
      as="image" type="image/webp" media="(max-width: 768px)" fetchpriority="high">
<link rel="preload" href="/_image?href=/_astro/hero-bg-2400.B0AiramO.jpg&w=2560&h=1440&q=88&f=webp"
      as="image" type="image/webp" media="(min-width: 769px)" fetchpriority="high">
```

This preloads the **homepage background** on the roofing, siding, windows, ADU, city, and all pSEO pages. The actual hero image for these pages is different. This causes:
- Wasted bandwidth (preloaded image not used)
- Delayed LCP (actual hero not preloaded)
- Potential CLS if images swap after load

### Caching Strategy

| Header | Value | Assessment |
|---|---|---|
| cache-control | `public, max-age=300, s-maxage=3600` | Good — 5 min browser, 1 hr CDN |
| HSTS | 63072000 (2 years) | Excellent |
| CDN | Railway Edge (Varnish) | Good |
| Edge location | us-west2 (SJC) | Optimal for Bay Area |

---

## 6. AI Search Readiness — 72 / 100

### AI Crawler Access

| Crawler | Access | Status |
|---|---|---|
| GPTBot (ChatGPT) | Allow / (Disallow /api/) | PASS |
| OAI-SearchBot | Allow / (Disallow /api/) | PASS |
| PerplexityBot | Allow / (Disallow /api/) | PASS |
| ClaudeBot | Allow / (Disallow /api/) | PASS |
| bingbot (Copilot) | Allow / (Disallow /api/) | PASS |
| Google-Extended (AI Overviews) | Disallow / | BLOCKED |
| Applebot-Extended (Apple Intelligence) | Disallow / | BLOCKED |

### llms.txt Compliance

| Severity | Finding |
|---|---|
| PASS | `/llms.txt` exists and is discoverable via `<link rel="ai-content-declaration">` |
| PASS | `/llms-full.txt` referenced for extended content |
| PASS | robots.txt includes llmstxt.org reference comment |
| MEDIUM | Google-Extended blocked — excludes site from Google AI Overviews (the largest AI search surface) |

### Citability Assessment

| Signal | Score | Evidence |
|---|---|---|
| Specific claims | 82/100 | "$940-$1,525 per roofing square", "50-year warranty", "3-5 day installs" |
| Quotable passages | 70/100 | Blog posts have clear statements but city pages lack standout quotes |
| Data density | 78/100 | Pricing tables, permit costs by county, material comparisons |
| Entity clarity | 75/100 | NAP consistent, CSLB license verifiable, 5 certifications named |
| Content structure | 80/100 | FAQ schema, clear H2 sections, numbered lists |

### Platform-Specific Optimization

| Platform | Score | Notes |
|---|---|---|
| Google AI Overviews | 71/100 | Strong schema, pricing data; hurt by undated service pages, duplicate H2s. Google-Extended blocked but AI Overviews use Googlebot (allowed). |
| Perplexity | 78/100 | llms.txt present, good FAQ structure, blog has author/date; hurt by missing table of contents |
| ChatGPT Search | 72/100 | GPTBot + OAI-SearchBot allowed; hurt by entity ambiguity (Marcus vs. Alexander) |
| Bing Copilot | 69/100 | Structured data good; no publication dates on service pages hurts freshness |
| Apple Intelligence | BLOCKED | Applebot-Extended: Disallow / |

### Critical GEO Findings

| Severity | Finding |
|---|---|
| HIGH | **Blog post buries the lead** — first 60 words warm up without stating a number. AI Overviews pull from the first extractable answer block. Should lead with "$14,000–$45,750 for a typical home" |
| HIGH | **No "Last Updated" dates on service pages** — blog posts have dates but /roofing, /siding, /windows, all city pages have no visible dateModified. AI systems discount undated pricing claims. |
| HIGH | **Entity ambiguity** — llms.txt: "Marcus Hamilton, Owner" vs blog byline: "Alexander Hamilton Li, Architect & General Contractor". AI entity resolution fails on this. |
| HIGH | **No table of contents on blog posts** — 2,107-word post has 9 H2 sections with no jump links. Perplexity and ChatGPT prefer independently extractable sections. |
| MEDIUM | **Siding pricing absent from llms.txt** — only "Contact us for estimate" while other services have full pricing tables |
| MEDIUM | **No YouTube presence** — YouTube mentions have highest AI citation correlation (~0.737) |

---

## 7. Images — 48 / 100

### Image Optimization

| Severity | Finding |
|---|---|
| PASS | Astro image pipeline: WebP conversion, responsive srcset |
| PASS | Image pipeline re-run with vision scoring (avg score 91) |
| PASS | Bad images replaced (5 fixed per git log) |
| PASS | Duplicate thumbnails fixed |

### Alt Text Crisis

| Severity | Finding |
|---|---|
| CRITICAL | **Certification logos have NO alt text on ANY page** — 5 logos (Owens Corning, CertainTeed, GAF, Tesla, James Hardie) × 251 pages = ~1,735 missing alt instances |
| CRITICAL | **Siding page: 4% alt text coverage** (1/23 images) |
| HIGH | Reviewer avatar images have no alt text sitewide |
| HIGH | CompanyCam project gallery photos have no alt text |
| HIGH | Footer badge images (Google, Yelp ratings) missing alt text |
| MEDIUM | Logo in navigation missing alt text |

### Image Format & Sizing

| Finding |
|---|
| PASS: WebP served via Astro `<Image>` component |
| PASS: Responsive `srcset` with multiple breakpoints |
| PASS: `fetchpriority="high"` on hero images (but wrong image preloaded — see Performance) |
| PASS: Lazy loading on below-fold images |

---

## 8. Local SEO — 71 / 100

### CRITICAL: Geo Coordinates Wrong on All City Pages

Every city and city+service page carries the HQ coordinates `37.69427, -122.07887` (Castro Valley) in its Service schema `geo` property. Google uses these coordinates to associate service entities with geographic areas.

| City | Current Geo | Correct Geo |
|---|---|---|
| Oakland | 37.69427, -122.07887 (Castro Valley) | 37.80437, -122.27080 |
| Walnut Creek | 37.69427, -122.07887 (Castro Valley) | 37.90603, -122.06487 |
| San Jose | 37.69427, -122.07887 (Castro Valley) | 37.33821, -121.88633 |
| San Rafael | 37.69427, -122.07887 (Castro Valley) | 37.97360, -122.53109 |
| All 29 cities | Castro Valley | City-specific centroids needed |

**Fix:** Build a coordinate lookup table keyed by city slug and inject into Service schema at build time.

### NAP Consistency

| Element | Value | Consistent? |
|---|---|---|
| Name | Hamilton Exteriors | YES — consistent across schema, content, footer |
| Address | 21634 Redwood Rd Unit F, Castro Valley, CA 94546 | YES — in schema, footer |
| Phone | (650) 977-3351 / +1-650-977-3351 | YES — consistent format |
| Email | support@hamilton-exteriors.com | YES |
| License | CSLB #1082377 | YES — in schema and visible content |

### Location Page Quality

| Page Type | Count | Quality | Issue |
|---|---|---|---|
| Service areas hub | 1 | Strong | Good hub with county cards, map, testimonials |
| County pages | 5 | Adequate | Bridge pages to cities, limited standalone value |
| City pages | 29 | Good | Neighborhoods, testimonials, 9 FAQs, 2,000+ words |
| City+service | ~174 | Mixed | **~60% boilerplate**, only 400-500 words unique |

### Local Signals

| Signal | Status |
|---|---|
| GBP listing | NOT VERIFIED (domain not connected) |
| CSLB license display | PASS — visible on all pages |
| Warranty details | PASS — 50-year warranty prominently featured |
| Before/after gallery | PARTIAL — project photos but not structured as before/after |
| Review count | WEAK — 50 reviews for 5-county coverage |
| Review diversity | WEAK — same 4 reviews repeated across all pages |
| Permit knowledge | PASS — county-specific permit timelines |
| Climate relevance | PASS — regional weather factors mentioned |

### Service Area Coverage

| County | Cities | City+Service Pages | Coverage |
|---|---|---|---|
| Alameda | 5 (Oakland, Berkeley, Fremont, Hayward, San Leandro) | 30 | Good |
| Contra Costa | 5 (Walnut Creek, Concord, San Ramon, Richmond, Antioch) | 30 | Good |
| Santa Clara | 9 (San Jose, Palo Alto, Sunnyvale, Mountain View, Cupertino, Campbell, Los Gatos, Milpitas, Santa Clara, Saratoga) | 54+ | Strong |
| Marin | 4 (San Rafael, Mill Valley, Novato, Larkspur) | 24 | Good |
| Napa | 5 (Napa, American Canyon, St. Helena, Calistoga, Yountville) | 30 | Good |

---

## Sitemap Analysis

### Structure

```
/sitemap-index.xml
  └── /sitemap-0.xml (347 URLs)
```

### Issues

| Severity | Finding |
|---|---|
| CRITICAL | Sitemap references `hamilton-exteriors.com` domain (Framer, not Railway) |
| HIGH | 248/251 URLs missing `lastmod` — only 3 blog posts have dates |
| HIGH | No `priority` values on any URLs |
| MEDIUM | `/sitemap.xml` standard path not tested (may still 404) |
| MEDIUM | Single sitemap for 347 URLs — should split by type for easier management |
| LOW | No changefreq values |

### URL Coverage

| Expected | In Sitemap? |
|---|---|
| Homepage | YES |
| 6 service pages | YES |
| /service-areas hub | YES |
| 5 county pages | YES |
| 29 city pages | YES |
| ~174 city+service pages | YES |
| 3 blog posts | YES |
| /blog hub | YES |
| /buy, /buy/scan | TO VERIFY |
| Legal pages | YES |

---

## Score Comparison: Previous vs. Current

| Category | Previous | Current | Change | Notes |
|---|---|---|---|---|
| Technical SEO | 58 | 62 | +4 | Breadcrumb bugs fixed, but domain still dead |
| Content Quality | 72 | 74 | +2 | Blog expanded, but pSEO still templated |
| On-Page SEO | 66 | 58 | -8 | Alt text severely degraded |
| Schema | 78 | 78 | 0 | AggregateOffer added, but missing @id, BlogPosting image bug, provider type mismatch |
| Performance | 76 | 70 | -6 | Wrong hero preload discovered |
| AI Readiness | 68 | 74 | +6 | llms.txt improved, AI declarations added, but entity ambiguity found |
| Images | 62 | 48 | -14 | Alt text crisis across service pages |
| **TOTAL** | **64** | **65** | **+1** | Minimal gain — schema issues offset improvements |

---

## Projected Scores

| Scenario | Score | Key Actions |
|---|---|---|
| **Current** | 65 | — |
| **After DNS connection** | 77 | Domain, canonicals, sitemap all resolve |
| **After DNS + P0 fixes** | 82 | + geo coords, schema @id, BlogPosting image, alt text, entity fix |
| **After DNS + P0 + P1** | 86 | + service page dates, blog lead rewrite, review diversity, cross-links |
| **After full roadmap** | 92+ | + YouTube, citations, GBP optimization, pSEO uniqueness |
