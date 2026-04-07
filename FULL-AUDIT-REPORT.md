# Hamilton Exteriors — Full SEO Audit Report

**Site:** https://hamilton-exteriors.com
**Date:** 2026-04-06 (v6 — 8-agent comprehensive audit)
**Pages Crawled:** ~700 (6 core + 6 service + 13 blog + 600+ pSEO + city+service pages)
**Business Type:** Local Service — General Contractor / Roofing Contractor (Hybrid SAB)

---

## Executive Summary

### Overall SEO Health Score: 77/100

Hamilton Exteriors has a **solid SEO foundation** — excellent performance scores (93 mobile), comprehensive schema markup, and strong AI search readiness with a best-in-class llms.txt. However, the audit uncovered several critical issues: programmatic pages have thin/duplicate content, a schema bug doubles "County" in Wikipedia URLs across all pSEO pages, review velocity has stalled (74 days since last review), and title tags on 600+ pages are truncated in SERPs.

**Top 5 Critical Issues:**
1. **"County County" schema bug** — Wikipedia sameAs URLs are malformed on all pSEO pages (e.g., `Alameda_County_County,_California`)
2. **pSEO content is thin** — Neighborhood blurbs follow identical 3-sentence template with only name swaps; same 4 reviews on every page
3. **Review velocity stalled** — Last schema review dated Jan 22, 2026 (74 days ago); Sterling Sky 18-day rule in effect
4. **pSEO title tags truncated** — Template runs 73-78 chars; Google truncates at ~60
5. **Conflicting promo banners** — /siding shows "$2000 off" AND "20% off" simultaneously

**Top 5 Quick Wins:**
1. Fix "County County" bug — one-line regex fix in pSEO template, fixes 600+ pages
2. Shorten pSEO title template to under 60 chars (e.g., `"Oakland Roofing & Exteriors | Hamilton Exteriors"`)
3. Add CertainTeed ShingleMaster to schema hasCredential (missing from all pages)
4. Fix render-blocking CSS (2 files blocking ~400ms) to push LCP under 2.5s
5. Add datePublished to pSEO review schemas

---

## Category Scores

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 78/100 | 17.2 |
| Content Quality & E-E-A-T | 23% | 74/100 | 17.0 |
| On-Page SEO | 20% | 74/100 | 14.8 |
| Schema / Structured Data | 10% | 78/100 | 7.8 |
| Performance (CWV) | 10% | 88/100 | 8.8 |
| AI Search Readiness | 10% | 79/100 | 7.9 |
| Images | 5% | 72/100 | 3.6 |
| **Total** | **100%** | | **77.1** |

---

## 1. Technical SEO (78/100)

### Crawlability -- Strong

**robots.txt** — Well configured
- Allows: Googlebot, bingbot, GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended
- Blocks: CCBot, anthropic-ai, cohere-ai, Bytespider (training crawlers only)
- Blocks `/api/` path correctly
- Crawl-delay: 2 seconds (applies to wildcard only, not named bots)
- References sitemap index

**Sitemaps** — Present and functional
- Sitemap index at `/sitemap-index.xml` with 2 child sitemaps
- `/sitemap-0.xml`: ~700 URLs covering all page types
- `/image-sitemap.xml`: 66 images across 16 URLs, properly formatted
- lastmod dates are meaningful (2026-03-30 to 2026-04-05)

### Indexability Issues

| Issue | Severity | Pages Affected |
|-------|----------|----------------|
| Missing canonical tags on some pages | **High** | /roofing, /windows, /about/alex-hamilton-li |
| Missing OG meta tags | **Medium** | /roofing, /about/alex-hamilton-li |
| Missing meta description | **Medium** | /about/alex-hamilton-li |
| /buy and /buy/scan missing from sitemap | **Medium** | Verify if intentional |

### URL Structure -- Excellent
- Clean, hierarchical: `/service-areas/{county}/{city}` and `/service-areas/{county}/{city}/{service}`
- Lowercase, hyphenated, descriptive
- Breadcrumb navigation matches URL hierarchy
- Legacy short slug redirects (301) in place

---

## 2. Content Quality & E-E-A-T (74/100)

### E-E-A-T Scores

| Factor | Weight | Score |
|--------|--------|-------|
| Experience | 20% | 16/20 |
| Expertise | 25% | 21/25 |
| Authoritativeness | 25% | 17/25 |
| Trustworthiness | 30% | 20/30 |

### Strengths
- Blog cost guide (/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026) is the best content on the site — specific job prices, county permit fees, named neighborhoods, practitioner voice (89/100)
- Service pages have strong technical depth with third-party citations (Oak Ridge National Lab, Remodeling Magazine, DOE, Tile Roofing Institute)
- All service pages carry author byline: "Reviewed by Alexander Hamilton Li, Architect & General Contractor, CSLB #1082377"
- CSLB license verification link is clickable and prominent

### Critical Content Issues

**1. Programmatic page content is thin (CRITICAL)**
Comparing Oakland, San Jose, and Mill Valley side-by-side:
- Same 4 reviews appear verbatim on every page (Eric W's roofing review even appears on siding pages)
- FAQ answers are word-for-word identical across all 600+ pages
- "Our Advantage" section is identical across all pages and homepage
- Neighborhood blurbs follow identical 3-sentence template:
  - Sentence 1: "[Neighborhood] is one of [City]'s most sought-after neighborhoods..."
  - Sentence 2: "We understand the architectural character..."
  - Sentence 3: "[Neighborhood] residents choose Hamilton Exteriors..."
- **Estimated unique content ratio: ~40-50% unique, ~50-60% shared template**

**2. "Our Latest Projects" shows seed data (CRITICAL)**
Three portfolio entries all dated "December 31, 2024" — clearly a CMS seed data artifact. Appears fabricated to any careful reader.

**3. Conflicting promotional banners on /siding (CRITICAL)**
"Get up to $2000 off" in header AND "Get up to 20% off" in sub-banner simultaneously. These conflict and appear arbitrary. No end date on "Limited Time" offer.

**4. 50-year warranty badge on /windows may be misleading (HIGH)**
The 50-year warranty applies to roofing shingles. Window manufacturer warranties are typically 10-20 years. If /windows inherits a global badge component, this is a potential QRG red flag.

**5. /about/alex-hamilton-li is severely underdeveloped (HIGH)**
- Only 555 words (below 800-word practical floor for a trust page)
- No educational background (critical for "Architect" title)
- No professional history before founding Hamilton Exteriors
- No specific project case studies
- No author photo confirmed in text layer

**6. Two blog posts under 1,500-word minimum (HIGH)**
- `/blog/bay-area-fire-zone-roofing-requirements`: 1,316 words
- `/blog/james-hardie-siding-bay-area`: 1,255 words

### Content Depth by Page Type

| Page Type | Word Count | Quality Score |
|-----------|------------|--------------|
| Homepage | ~1,554 | 68/100 |
| /roofing | ~2,962 | 82/100 |
| /siding | ~2,685 | 78/100 |
| /windows | ~2,981 | 80/100 |
| /about/alex-hamilton-li | ~555 | 65/100 |
| Blog: roof cost guide | ~2,368 | 89/100 |
| Blog: fire zone | ~1,316 | 81/100 |
| pSEO pages (Oakland/SJ/MV) | ~1,700-1,750 | **48/100** |

---

## 3. On-Page SEO (74/100)

### Title Tags -- Needs Work

| Page | Title | Chars | Issue |
|------|-------|-------|-------|
| Homepage | Bay Area Design-Build & Exteriors Contractor \| Hamilton Exteriors | 69 | 9 over; "Design-Build" is not a search query |
| Roofing | Bay Area Roofing \| Shingles, Metal & Tile \| Hamilton Exteriors | 66 | 6 over |
| Siding | Bay Area Siding \| James Hardie & Vinyl \| Hamilton Exteriors | 63 | Borderline OK |
| Windows | Bay Area Windows \| Casement, Hung & Sliding \| Hamilton Exteriors | 68 | 8 over; redundant sub-types |
| Oakland pSEO | Roofing, Siding, ADUs & Custom Homes in Oakland, CA \| Hamilton Exteriors | **76** | **16 over -- CRITICAL** |
| Palo Alto pSEO | Roofing, Siding, ADUs & Custom Homes in Palo Alto, CA \| Hamilton Exteriors | **78** | **18 over -- CRITICAL** |

**All pSEO titles are truncated in SERPs.** Google cuts at ~60 chars, meaning the city name or brand name is cut off on 600+ pages.

Suggested fix: `"{City} Roofing, Siding & ADUs | Hamilton Exteriors"` (50-58 chars depending on city)

### H1 Issues

| Issue | Page | Severity |
|-------|------|----------|
| Garbled apostrophe (`???`) in H1 | /roofing | Medium |
| "Design-Build" in H1 doesn't match search intent | Homepage | Medium |
| H1s are clean and unique | All other pages | OK |

### FAQ Schema Duplication -- HIGH

The same 4 FAQ questions appear identically on every page across the site:
- "What areas in the Bay Area do you serve?"
- "How does billing and financing work?"
- "Are you licensed and insured?"
- "Do I need a permit for my exterior project?"

Google's Sept 2025 QRG flags mass-duplicated FAQ as thin content. The roofing page should have roofing FAQs; Oakland should have Oakland permit FAQs.

### Missing Alt Text

The `icon-checkmark-circle.svg` renders without `alt` attribute on every page (appears 2x per page = 1,400+ instances across the site). WCAG 2.1 AA violation. Add `alt=""` if decorative.

### Internal Linking -- Strong
- 45-47+ internal links per page
- Service pages cross-link to all services
- pSEO pages link to nearby cities and county hubs
- Footer links 30 cities but misses San Mateo County entirely (HIGH -- one of the highest-value markets)

---

## 4. Schema & Structured Data (78/100)

### Schema Inventory

| Page Type | Schema Types |
|-----------|-------------|
| Homepage | GeneralContractor, RoofingContractor, WebSite, FAQPage, AggregateRating, Review (x4) |
| Service pages | Service, WebPage, FAQPage, BreadcrumbList, AggregateOffer, speakable |
| Blog posts | BlogPosting, Person (author), BreadcrumbList, FAQPage |
| Blog index | CollectionPage, ItemList, BreadcrumbList |
| City pSEO | Service (LocalBusiness), GeneralContractor, BreadcrumbList, WebPage, FAQPage, Review (x3) |
| City+service | Service, GeneralContractor, RoofingContractor, AggregateOffer, FAQPage, BreadcrumbList |
| Founder | ProfilePage, Person (with knowsAbout, credential) |

### Critical Schema Issues

**1. "County County" Wikipedia URL bug (CRITICAL)**
File: `src/pages/service-areas/[...slug].astro`, line ~143

The `areaServed` `sameAs` URL doubles "County":
```
"name": "Alameda County County"
"sameAs": "https://en.wikipedia.org/wiki/Alameda_county_County,_California"
```
These URLs 404. Affects ALL city-level pSEO pages (600+). Breaks entity disambiguation.

**Fix:** Strip "county" from the slug before appending `_County,_California`.

**2. Duplicate BreadcrumbList on /roofing and /siding (CRITICAL)**
Two identical BreadcrumbList schemas emitted per page (one with `@id`, one without). Google flags as ambiguous.

**Fix:** Remove the second BreadcrumbList emission from the layout component.

**3. pSEO reviews missing datePublished (HIGH)**
City page reviews have no `datePublished`. Homepage reviews correctly include dates. Reduces rich result eligibility.

**4. Homepage missing WebPage schema (HIGH)**
Has GeneralContractor, WebSite, FAQPage but no WebPage. Should declare itself as WebPage with `isPartOf` linking to WebSite.

**5. CertainTeed ShingleMaster missing from hasCredential (HIGH)**
4 of 5 certifications are in schema; CertainTeed is omitted despite being displayed on-page.

**6. Duplicate FAQ across site (MEDIUM)**
Same 4 questions on homepage, /roofing, /siding, Oakland, etc. Google may ignore FAQ rich results when identical questions repeat site-wide.

---

## 5. Performance / Core Web Vitals (88/100)

### Lighthouse Scores (Lab Data)

| Page | Mobile | Desktop |
|------|--------|---------|
| Homepage | **93** | **100** |
| /roofing | **93** | -- |
| Oakland pSEO | **93** | -- |

**The site performs very well.** Astro SSR with minimal client JS pays off.

### Core Web Vitals (Mobile)

| Metric | Homepage | Roofing | Oakland | Target | Status |
|--------|----------|---------|---------|--------|--------|
| **LCP** | 2.8s | 2.8s | 2.8s | < 2.5s | **FAIL** (300ms over) |
| **TBT** (INP proxy) | 0ms | 0ms | 0ms | < 200ms | **PASS** |
| **CLS** | 0.002 | 0.002 | 0.000 | < 0.1 | **PASS** |
| FCP | 2.3s | 2.3s | 2.1s | < 1.8s | WARN |
| Speed Index | 2.3s | 2.7s | 2.9s | < 3.4s | PASS |
| TTFB | 350ms | 650ms | 190ms | < 800ms | PASS |

### The One Fix That Matters

**Two render-blocking CSS files** are the sole cause of the LCP failure:
1. `Layout.CRAu_gA2.css` (45 KiB) — blocks ~300ms
2. `Reviews.yJ4rpm6z.css` (5 KiB) — blocks ~150ms

**Fix:** Inline critical CSS in `<head>`, load full stylesheets async with `media="print" onload="this.media='all'"`. This alone should push LCP under 2.5s and mobile score to 95-97+.

### Other Optimizations
- /roofing TTFB at 650ms (double homepage) — suggests uncached Ghost CMS fetch; enable edge caching
- Font files missing long-term cache headers — set `max-age=31536000, immutable`
- AVIF format not used (WebP only) — 20-30% additional compression available

---

## 6. AI Search Readiness (79/100)

### AI Crawler Access -- Excellent
All 7 AI search bots allowed, all 4 training crawlers blocked. Textbook configuration.

### llms.txt -- Best-in-Class
- `/llms.txt` present with link to `/llms-full.txt`
- `/llms-full.txt` is 3,000+ words: complete business overview, all 6 services with pricing, warranties, FAQs, service areas, customer reviews
- Citation license explicitly permits AI citation with attribution
- "Not Covered" section prevents hallucination (no SF County, no conventional solar, no interior-only remodels)
- "Summary for AI Systems" section at bottom

### Platform-Specific Scores

| Platform | Score | Key Factor |
|----------|-------|------------|
| Google AI Overviews | 82 | SSR, FAQPage, speakable spec, local signals |
| ChatGPT Browse | 74 | llms.txt strong, but no YouTube or Reddit presence |
| Perplexity | 78 | Hyperlocal data on pSEO pages, blog direct-answers |
| Bing Copilot | 80 | bingbot allowed, good schema |

### Key Gaps

**1. No YouTube channel (VERY HIGH impact)**
YouTube presence has the highest measured correlation (~0.737) with AI citation frequency. Even 5-8 short videos (roof inspection walkthrough, before/after installations, ADU timelapse, roof scanner demo) would materially increase ChatGPT and Perplexity citations.

**2. No Reddit presence (HIGH impact)**
Second-highest correlating off-site signal. 2-3 substantive posts in r/bayarea or r/homeowners about WUI fire zones, ADU permitting, or roofing costs would build entity co-occurrence.

**3. Service page H2s are not question-format (MEDIUM)**
Blog posts partially use question H2s. Service and pSEO pages use descriptive H2s ("Roofing Types We Install" instead of "What Types of Roofs Do We Install in Oakland?"). Question-format H2s have measurable lift on AI extraction.

**4. Missing source attribution on service pages (MEDIUM)**
Blog posts cite Oak Ridge National Lab, Remodeling Magazine, DOE. Service pages state statistics without attribution (e.g., "Metal roofs reflect up to 70% of solar radiant heat" — no source).

---

## 7. Images (72/100)

### Image Pipeline -- Strong
- Astro image pipeline converts PNGs to WebP on delivery
- `fetchpriority="high"` + `decoding="sync"` on hero LCP images
- `loading="lazy"` + `decoding="async"` on all below-fold images
- Width/height attributes present on all images (CLS prevention)
- Responsive srcset with 768w and 1440w breakpoints

### Issues

| Issue | Severity |
|-------|----------|
| pSEO pages render generic homepage hero, not city-specific images (despite city images being preloaded in `<head>`) | **Critical** |
| Hero alt text identical across all pSEO pages ("Hamilton Exteriors -- Bay Area roofing...") | **High** |
| `icon-checkmark-circle.svg` missing alt on every page (1,400+ instances) | **High** |
| Image sitemap only covers 16 URLs / 66 images (site has 700+ pages) | **Medium** |
| No AVIF format (20-30% better than WebP) | **Low** |
| Blog posts use Pexels stock photos instead of real project photos | **Medium** |

---

## 8. Local SEO (74/100)

### Local SEO Dimension Scores

| Dimension | Score |
|-----------|-------|
| GBP Signals | 68/100 |
| Reviews & Reputation | 82/100 |
| Local On-Page SEO | 85/100 |
| NAP Consistency & Citations | 65/100 |
| Local Schema Markup | 72/100 |
| Local Link & Authority | 65/100 |

### NAP Consistency -- Perfect
Name, address, phone consistent across all pages, schema, and constants file. E.164 format in schema, display format in UI. No discrepancies.

### Critical Local Issues

**1. Review velocity stalled (CRITICAL)**
Most recent schema review: January 22, 2026 — **74 days ago**. Sterling Sky's 18-day rule: rankings drop when no new reviews appear for 3+ weeks. At 74 days, well past the cliff. 52 reviews is also subcompetitive (Bay Area GCs average 100-200+).

**2. Missing manufacturer directory citations (HIGH)**
As a certified installer, Hamilton qualifies for free, high-DA listings on:
- GAF Find a Contractor directory
- James Hardie Contractor Locator
- Owens Corning Contractor Locator
- Tesla Certified Installer directory

These are not referenced anywhere on the site. They're citation gold for contractors.

**3. Missing Tier 1 citations (HIGH)**
Not detected on-site: BBB, Thumbtack ($400M platform integrated with ChatGPT/Alexa), Nextdoor, Angi, Houzz.

**4. San Mateo County missing from footer (MEDIUM)**
Footer shows 5 of 6 counties. San Mateo County (Redwood City, San Mateo, Burlingame, Daly City, South San Francisco) — one of the highest-income counties — is entirely absent from the site-wide footer.

---

## 9. Sitemap Analysis (84/100)

### Structure -- Good
- Sitemap index, main sitemap (~700 URLs), image sitemap (66 images)
- Referenced in robots.txt
- lastmod dates meaningful and recent
- Image sitemap properly formatted with loc, title, caption

### Issues
| Issue | Severity |
|-------|----------|
| Image sitemap only covers 16/700+ page URLs | Medium |
| /buy and /buy/scan missing from sitemap | Medium |
| No lastmod on sitemap index entries | Low |

---

## Prioritized Action Plan

### Critical -- Fix Immediately (Score Impact: +8-10 pts)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | **Fix "County County" schema bug** in `[...slug].astro` line ~143 | 15 min | Fixes entity disambiguation on 600+ pages |
| 2 | **Solicit new Google reviews immediately** — implement post-project SMS/email workflow, target 2-3/month | 2 hrs setup | Review velocity is #1 local ranking risk |
| 3 | **Shorten pSEO title template** to under 60 chars, city-first | 15 min | Fixes SERP truncation on 600+ pages |
| 4 | **Fix conflicting promo banners** on /siding ($2000 vs 20%) | 15 min | Trust/QRG signal |
| 5 | **Fix "Latest Projects" seed data** (Dec 31, 2024 dates) | 30 min | Remove or replace with real project data |
| 6 | **Remove duplicate BreadcrumbList** on /roofing and /siding | 30 min | Schema validation fix |

### High -- Fix Within 1 Week (Score Impact: +5-7 pts)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 7 | **Inline critical CSS / defer render-blocking stylesheets** | 2 hrs | Pushes LCP under 2.5s, mobile score to 95+ |
| 8 | **Add CertainTeed ShingleMaster to schema hasCredential** | 15 min | Complete certification coverage |
| 9 | **Add datePublished to pSEO review schemas** | 30 min | Rich result eligibility |
| 10 | **Add WebPage schema to homepage** | 30 min | Entity declaration |
| 11 | **Add meta description to /about/alex-hamilton-li** | 5 min | Key E-E-A-T page |
| 12 | **Claim manufacturer directory listings** (GAF, James Hardie, Owens Corning, Tesla) | 2 hrs | High-DA free citations |
| 13 | **Add San Mateo County to footer city grid** | 30 min | Internal link equity for high-value market |
| 14 | **Fix pSEO hero image rendering** (city images preloaded but not rendered) | 1 hr | Local relevance signal |

### Medium -- Fix Within 1 Month (Score Impact: +4-6 pts)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 15 | **Enrich pSEO pages** — unique FAQs, city-specific stats, location-matched reviews | Ongoing | Biggest content quality lift |
| 16 | **Expand /about/alex-hamilton-li** to 1,200+ words (education, case studies, timeline) | 2 hrs | E-E-A-T foundation |
| 17 | **Verify 50-year warranty badge on /windows** (roofing warranty, not windows) | 15 min | Accuracy/trust |
| 18 | **Convert H2s to question format** on service + pSEO pages | 2 hrs | AI extraction lift |
| 19 | **Create YouTube channel** with 5-8 short videos | 4-8 hrs | Highest AI citation correlation |
| 20 | **Build BBB + Thumbtack profiles** | 2 hrs | Tier 1 citations |
| 21 | **Add source attribution** to service page statistics | 1 hr | AI citability |
| 22 | **Bring 2 thin blog posts to 1,500+ words** (fire zone, Hardie siding) | 2 hrs | Content minimum |
| 23 | **Add HowTo schema to relevant blog posts** | 1 hr | Rich results |
| 24 | **Expand image sitemap** to all pages | 1 hr | Image search visibility |
| 25 | **Fix roofing H1 garbled apostrophe** | 5 min | UX/trust |

### Low -- Backlog

| # | Action |
|---|--------|
| 26 | Add SameAs social links in Organization schema |
| 27 | Add AVIF format support |
| 28 | Create /llms-pricing.txt for AI systems |
| 29 | Add Reddit presence (2-3 targeted posts in r/bayarea, r/homeowners) |
| 30 | Replace stock blog photos with real project photos |
| 31 | Add material comparison table to /roofing |
| 32 | Add pricing section to /windows page |
| 33 | Audit thin pSEO pages for Tier 3 small cities (Yountville, Calistoga, St. Helena) |
| 34 | Consider consolidating small-city pages under county pages |

---

## Score Projection

| Action Set | Estimated Score |
|-----------|----------------|
| Current state | 77/100 |
| After Critical fixes (#1-6) | 82/100 |
| After High fixes (#7-14) | 87/100 |
| After Medium fixes (#15-25) | 92/100 |

---

## What's Working Well

- **Performance: 93 mobile / 100 desktop** — Astro SSR pays off; TBT=0ms, CLS=0.002
- **llms.txt** — Best-in-class for local contractors; comprehensive pricing, citation license, AI summary
- **Schema depth** — GeneralContractor, Service, FAQPage, BlogPosting, Person, BreadcrumbList across all page types
- **Blog content** — Roof cost guide (89/100) is genuinely citation-ready with practitioner-sourced data
- **E-E-A-T signals** — CSLB verification link, author bylines, 5 manufacturer certifications
- **NAP consistency** — Perfect across all pages
- **URL structure** — Clean hierarchical pSEO with 4-level breadcrumbs
- **Internal linking** — 45+ links per page, nearby-cities widget, footer city grid
- **speakable spec** — Present on service pages (forward-looking AI/voice signal)
- **AI crawler policy** — Textbook robots.txt split (search bots allowed, training bots blocked)

---

## Key Source Files Referenced

| File | Issues Found |
|------|-------------|
| `src/pages/service-areas/[...slug].astro` ~line 143 | "County County" Wikipedia URL bug |
| `src/components/GeneralCityPage.astro` | Missing datePublished in review schema |
| `src/layouts/Layout.astro` | CertainTeed missing from hasCredential; duplicate BreadcrumbList |
| `src/components/Footer.astro` | San Mateo County missing from city grid |

---

*Audit conducted 2026-04-06 by 8 specialist agents + direct analysis*
*18 live pages sampled across all page types*
*Lab performance data via Lighthouse 13.1*
