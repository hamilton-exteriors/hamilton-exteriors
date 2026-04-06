# Hamilton Exteriors — Full SEO Audit Report

**Audit Date:** April 6, 2026 (v3)
**Site:** https://hamilton-exteriors.com
**Business Type:** Service Area Business (SAB) — Design-Build Contractor
**Location:** Castro Valley, CA | Serving 6 Bay Area Counties
**Stack:** Astro 6.1 + Tailwind v4, SSR on Railway, Ghost CMS (headless)

---

## Executive Summary

### SEO Health Score: 79 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 20% | 88/100 | 17.6 |
| Content Quality | 20% | 75/100 | 15.0 |
| On-Page SEO | 15% | 85/100 | 12.8 |
| Schema / Structured Data | 10% | 71/100 | 7.1 |
| Performance (CWV) | 10% | 92/100 | 9.2 |
| AI Search Readiness (GEO) | 10% | 74/100 | 7.4 |
| Local SEO | 10% | 67/100 | 6.7 |
| Images | 5% | 70/100 | 3.5 |
| **Total** | | | **79.3** |

*v3 changes: Added Local SEO as standalone category (was folded into On-Page). Schema and GEO scores lowered after deeper analysis found SpeakableSpecification gap, /buy zero-schema, inline attribution gaps, and 18-day review cliff severity.*

### Top 5 Critical Issues

1. **Review velocity stalled — 74 days past 18-day cliff** — Most recent schema review is 74 days old, past the Sterling Sky 18-day threshold. 52 total reviews is below Bay Area competitive floor (~100+). Actively suppressing Local Pack positions. (Local)
2. **Templated city page reviews** — Same reviewer names (Sarah M., David K., Jennifer L.) appear across all city pages with only neighborhood names swapped. Risk of manual action. (Content/Local)
3. **Zero schema on /buy page** — Primary conversion page has pricing, reviews, FAQ but emits no structured data at all. (Schema)
4. **No SpeakableSpecification on any page** — The most direct Google AI Overview signal is completely absent. Service pages and blog posts need `cssSelector`-based SpeakableSpecification. (GEO)
5. **SearchAction points to non-functional search** — `?q=` parameter on /blog is unhandled; may trigger GSC warnings. (Schema)

### Top 5 Quick Wins

1. Fix `dateModified` to use static dates instead of `new Date()` (1 file change)
2. Add null guard to `BlogPosting.datePublished` (1 line fix)
3. Change `contactPoint.areaServed` from "US" to "CA" (1 line fix)
4. Fix "Hamilton Exteriors, Inc." → "Hamilton Exteriors" everywhere (NAP consistency)
5. Create `/public/ai.txt` or remove the `<link rel="ai-policy">` tag (fixes 404 on every page load)

---

## Site Inventory

| Section | Pages | Avg Performance | SEO Score |
|---------|-------|----------------|-----------|
| Homepage | 1 | 96 | 100 |
| Service pages | 6 | 92 | 100 |
| County pages | 6 | 97 | 100 |
| City pages | ~47 | 96 | 100 |
| City+Service pages | ~282 | 92 | 100 |
| Blog posts | 13 | 93 | 100 |
| Blog index | 1 | 100 | 100 |
| Service areas hub | 1 | 98 | 100 |
| Other (about, /buy) | 2+ | N/A | N/A |
| **Total in sitemap** | **373** | **92 avg** | **100 avg** |

---

## 1. Technical SEO (Score: 88/100)

### Security Headers — Excellent

| Header | Status | Value |
|--------|--------|-------|
| Strict-Transport-Security | Present | max-age=63072000; includeSubDomains; preload |
| Content-Security-Policy | Present | Comprehensive policy with script/style/img/connect/frame directives |
| X-Content-Type-Options | Present | nosniff |
| X-Frame-Options | Present | SAMEORIGIN |
| Referrer-Policy | Present | strict-origin-when-cross-origin |
| Permissions-Policy | Present | camera=(), microphone=(), geolocation=(self) |

### Redirects — Correct

- HTTP → HTTPS: 301 redirect (working)
- www → non-www: 301 redirect (working)
- /sitemap.xml → /sitemap-index.xml: 301 redirect (working)

### Robots.txt — Excellent

- Well-structured AI crawler taxonomy
- AI search crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended) explicitly allowed
- AI training crawlers (CCBot, anthropic-ai, cohere-ai, Bytespider) blocked
- `/api/` disallowed for all bots
- `Crawl-delay: 2` for default user-agent
- Sitemap references: sitemap-index.xml + image-sitemap.xml

### Sitemaps — Good

- **Sitemap index:** 2 child sitemaps (sitemap-0.xml + image-sitemap.xml)
- **Total URLs:** 373 pages in sitemap-0.xml
- **Image sitemap:** Present and serving (200)
- **Content-type:** image-sitemap.xml returns `application/xml; charset=utf-8` but with full HTML CSP headers (SSR route, not static file)

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| Intermittent 502 errors | HIGH | robots.txt and sitemap returned 502 during initial WebFetch attempts. Railway edge caching may mask SSR startup latency. If Googlebot hits a 502 during crawl, it will retry but may reduce crawl rate. |
| Image sitemap served via SSR | LOW | The image-sitemap.xml includes full CSP/security headers typical of an SSR page. Should be a static file with minimal headers for faster serving. |
| No IndexNow implementation | LOW | IndexNow protocol not detected. Would allow instant notification to Bing/Yandex when pages update. |
| /buy page returns 0 scores | MEDIUM | Lighthouse scored /buy at 0/0/0/0 — page may be broken or requires JS hydration that Lighthouse couldn't complete. |

---

## 2. Content Quality (Score: 75/100)

### E-E-A-T Signals — Strong

| Signal | Status | Assessment |
|--------|--------|------------|
| Author identity | Present | Alexander Hamilton Li, Architect & GC |
| Professional credentials | Excellent | CSLB #1082377 with live verification link |
| Founder schema | Present | Person entity with LinkedIn sameAs |
| Insurance disclosure | Excellent | $2M GL + workers' comp on service pages |
| Manufacturer certifications | Excellent | 5 named certifications (GAF, OC, CertainTeed, Hardie, Tesla) |
| Real project photos | Present | CompanyCam/BackOffice CDN integration |
| Customer reviews | Present | 4.8 stars, 52 reviews (but see velocity issue) |
| Blog authorship | Present | Licensed contractor byline on all posts |

### Content Depth

| Page Type | Avg Word Count | Assessment |
|-----------|---------------|------------|
| Service pages | 4,500-9,000 | Excellent depth |
| Blog posts | 2,100+ | Good for informational queries |
| City pages | 4,200 | Good length, but ~75% templated |
| City+Service combo pages | ~3,500 | Adequate, heavily templated |

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| City page templated content | HIGH | 75-80% of city page content is shared template. Effective unique content is only ~700-900 words per city. At 47+ cities, this risks Helpful Content System flags. |
| Templated fake reviews on city pages | CRITICAL | Sarah M., David K., Jennifer L. appear on multiple city pages with only the neighborhood name swapped. Google Quality Rater Guidelines specifically flag fabricated reviews on location pages. |
| Windows page excessive length | MEDIUM | At ~9,000 words, the windows page may suffer from content fatigue. Consider splitting into sub-pages (e.g., window types, window cost guide). |
| Blog hero image missing alt text | MEDIUM | Blog post featured images have empty or missing alt text on some posts. |
| No video content | MEDIUM | No YouTube/video presence detected. Video is high-leverage for contractor trust and AI overview inclusion. |
| Content gaps | MEDIUM | Missing pages for: financing details, warranty specifics, emergency services, gallery/portfolio, process/timeline |

---

## 3. On-Page SEO (Score: 85/100)

### Title Tags — Good

| Page | Title | Length | Assessment |
|------|-------|--------|------------|
| Homepage | "Bay Area Design-Build & Exteriors Contractor \| Hamilton Exteriors" | 65 chars | Good but generic — consider leading with "Roofing" |
| /roofing | "Bay Area Roofing \| Shingles, Metal & Tile \| Hamilton Exteriors" | 63 chars | Excellent |
| /siding | "Bay Area Siding \| James Hardie & Vinyl \| Hamilton Exteriors" | 60 chars | Excellent |
| /windows | "Bay Area Windows \| Casement, Hung & Sliding \| Hamilton Exteriors" | 65 chars | Excellent |
| /adu | "ADU Builder in the San Francisco Bay Area \| ... \| Hamilton Exteriors" | 78 chars | Slightly long |
| /blog | "Ground Up — Roofing & Home Tips \| Hamilton Exteriors" | 52 chars | Good |

### Heading Structure — Good

All service pages follow proper H1 → H2 → H3 hierarchy. Each page has a single H1. H2s are descriptive and keyword-rich. FAQ sections use proper heading levels.

### Internal Linking — Good

- Footer links to 5 counties x 5 cities (25 city pages)
- City pages link to "Nearby Cities" (4 neighbors each)
- County pages link to all cities within
- Blog posts cross-link to service pages
- **Gap:** Service pages don't link to city-specific service pages (missed opportunity)

### Meta Descriptions — Good

All service pages and blog posts have unique, keyword-rich meta descriptions under 160 characters. City pages have templated but city-specific descriptions.

---

## 4. Schema & Structured Data (Score: 71/100)

### Current Implementation

| Page Type | Schema Types |
|-----------|-------------|
| Homepage | Organization (full), WebSite+SearchAction, FAQPage |
| Service pages | Service+AggregateOffer, BreadcrumbList, WebPage, FAQPage, full Organization |
| City hub pages | BreadcrumbList, WebPage, LocalBusiness with reviews |
| City+Service pSEO pages | BreadcrumbList, Service (city-targeted), FAQPage |
| Blog posts | BlogPosting, BreadcrumbList, FAQPage (conditional on question H2s) |
| Blog index | CollectionPage, ItemList |
| About page | ProfilePage, Person (mainEntity), BreadcrumbList |
| County index pages | BreadcrumbList, Service (no @id) |
| Service areas index | ItemList, BreadcrumbList |
| /buy, /buy/scan | **Nothing** (only lean Organization @id-ref) |

### NAP Consistency in Schema — One Discrepancy

Name, address, phone mostly match. **Exception:** Schema and most pages use "Hamilton Exteriors" while About page and BBB listing use "Hamilton Exteriors, Inc." — pick one and apply everywhere.

### Critical Errors (6)

1. **SearchAction target is unhandled** — `Layout.astro`, WebSite schema. `/blog?q={search_term_string}` has no handler. Remove `potentialAction` block until search is wired up.

2. **`dateModified` uses `new Date()` on every Service page** — `ServicePage.astro`. Google sees a different date on every crawl. Replace with a static ISO 8601 string per service.

3. **`BlogPosting.datePublished` can emit `null`** — `blog/[slug].astro`. If Ghost returns no `published_at`, schema outputs `"datePublished": null`. Add: `post.published_at || post.updated_at || new Date().toISOString()`.

4. **`Person.image` on /about is the generic OG placeholder** — `/og-default.jpg`. Google People results require a real headshot. Upload photo and update reference.

5. **GeoCoordinates on county pages — verify lat/lng not swapped** — `CountyPage.astro`. The `data.proximity` string is `"lng,lat"` format. Verify latitude is in 37.x range (Bay Area), longitude in -122.x range. If reversed, county places in the ocean.

6. **Zero schema on /buy** — The primary conversion page has pricing comparison, reviews, FAQ but emits no structured data. Add Service schema with AggregateOffer at minimum.

### High Priority Errors (4)

7. **`contactPoint.areaServed` is "US" not "CA"** — `Layout.astro`. Signals national coverage rather than Bay Area focus.

8. **`Review.datePublished` missing on city hub pages** — `GeneralCityPage.astro`. Required for Review rich results. Add ISO 8601 dates to each review in seed data.

9. **`AggregateRating` absent from city `LocalBusiness` block** — Same file. Google needs AggregateRating alongside individual Reviews for star snippets. Add 4.8 / 52 aggregate values.

10. **County Service block has no `@id`** — `CountyPage.astro`. Service entity cannot be referenced without an `@id`. Add `'https://hamilton-exteriors.com/service-areas/${data.countySlug}#service'`.

### Warnings (7)

1. **BlogPosting.image uses same URL with false dimensions** — Three ImageObject entries share one URL but claim 1200x630, 1200x900, 1200x1200.

2. **Duplicate Service schema on county pages** — CountyPage.astro emits inline Service without `@id`, while catch-all route emits keyed Service.

3. **CollectionPage embeds BreadcrumbList inline** — Blog index nests breadcrumb under CollectionPage.breadcrumb.

4. **`additionalType` uses Wikipedia URLs** — Should be in `sameAs`, not `additionalType`.

5. **No `SpeakableSpecification`** — Absent from all pages. Direct Google AIO signal for passage extraction. Add to BlogPosting and Service schemas with `cssSelector`.

6. **No `articleBody` in BlogPosting schema** — Some AI systems use this for direct article indexing.

7. **`WebPage.about` on county pages uses relative anchor** — Should be absolute URL.

### Rich Results Eligibility

| Type | Eligible | Status |
|------|----------|--------|
| LocalBusiness (Knowledge Panel) | Yes | Working |
| BreadcrumbList | Yes | Working (except blog index) |
| BlogPosting / Article | Yes | Fix image + date issues first |
| AggregateRating (stars) | Yes | Working on homepage — missing on city hubs |
| WebSite + SearchAction | No | Search is non-functional |
| FAQPage | No | Restricted to govt/health since Aug 2023 (keep for AI value) |
| Review (stars on city pages) | No | Missing datePublished, missing AggregateRating |

### Projected Score After Fixes

- Fix Critical + High (items 1-10): **87 / 100**
- Add /buy schema + city hub AggregateRating + SpeakableSpecification + headshot: **93 / 100**

---

## 5. Performance & Core Web Vitals (Score: 92/100)

### Lighthouse Scores (260 pages analyzed, excluding /buy)

| Metric | Average | Min | Max |
|--------|---------|-----|-----|
| Performance | 92 | 86 | 100 |
| Accessibility | 97 | 96 | 100 |
| Best Practices | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 |

### Homepage CWV (Lab Data)

| Metric | Value | Score | Target | Status |
|--------|-------|-------|--------|--------|
| FCP | 1.2s | 0.99 | < 1.8s | Pass |
| LCP | 1.9s | 0.98 | < 2.5s | Pass |
| CLS | 0 | 1.0 | < 0.1 | Pass |
| TBT | 30ms | 1.0 | < 200ms | Pass |
| Speed Index | 2.9s | 0.95 | < 3.4s | Pass |

### Pages Below 90 Performance (9 of 260)

| Page | Score | Likely Cause |
|------|-------|-------------|
| /blog/metal-roof-vs-asphalt-shingles-bay-area | 86 | Heavy images |
| /blog/what-does-roofing-warranty-cover | 87 | Heavy images |
| /blog/adu-cost-bay-area-2026 | 88 | Heavy images |
| /blog/bay-area-fire-zone-roofing-requirements | 88 | Heavy images |
| /service-areas/.../calistoga-ca/adu | 88 | SSR latency |
| /blog/second-story-addition-cost-bay-area | 89 | Heavy images |
| /custom-homes | 89 | Image-heavy |
| /service-areas/.../richmond-ca/windows | 89 | SSR latency |
| /service-areas/.../novato-ca/custom-homes | 89 | SSR latency |

### Issues

| Issue | Severity | Details |
|-------|----------|---------|
| /buy page scores 0/0/0/0 | HIGH | Page appears broken or requires client-side JS that Lighthouse can't execute |
| Blog images driving lower scores | MEDIUM | Blog posts with multiple Pexels/Unsplash images score 86-89. Consider lazy loading optimization or WebP conversion. |
| Some pSEO pages < 90 | LOW | A few deep city+service pages score 88-89, likely due to SSR cold start on Railway |

---

## 6. AI Search Readiness / GEO (Score: 74/100)

### GEO Dimension Breakdown

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|----------|
| Citability | 25% | 72/100 | 18.0 |
| Structural Readability | 20% | 80/100 | 16.0 |
| Multi-Modal Content | 15% | 58/100 | 8.7 |
| Authority & Brand Signals | 20% | 82/100 | 16.4 |
| Technical Accessibility | 20% | 76/100 | 15.2 |

### AI Crawler Access — Excellent (robots.txt is flawless)

| Crawler | Purpose | Status |
|---------|---------|--------|
| GPTBot | ChatGPT + SearchGPT | Allowed |
| OAI-SearchBot | OpenAI real-time search | Allowed |
| ClaudeBot | Anthropic search | Allowed |
| PerplexityBot | Perplexity AI | Allowed |
| Google-Extended | Google AI Overviews | Allowed |
| Applebot-Extended | Apple Intelligence | Allowed |
| bingbot | Bing Copilot | Allowed |
| CCBot | Common Crawl (training) | Blocked |
| anthropic-ai | Anthropic training | Blocked |
| cohere-ai | Cohere training | Blocked |
| Bytespider | ByteDance/TikTok | Blocked |

### llms.txt — Best-in-class for a local contractor (Grade: A-)

- RSL-1.0 license explicitly permits AI citation with attribution
- "Key Facts for Citation" block with named sources and DOI links
- "Not Covered" section prevents hallucination about excluded services
- Pricing data timestamped to Q2 2026
- Pointer to `/llms-full.txt` for extended data
- Declared in `<head>` on every page via `<link>` tags
- **Gap:** `/llms-full.txt` returned 502 during audit — extended content unavailable to crawlers
- **Gap:** No RSS feed URL in llms.txt for content discovery

### Platform-Specific Estimates

| Platform | Score | Key Friction |
|----------|-------|-------------|
| Google AI Overviews | 71/100 | No SpeakableSpecification; review dates future-dated |
| ChatGPT / SearchGPT | 76/100 | Strong llms.txt; no YouTube or Wikipedia entity |
| Perplexity | 79/100 | Structured pricing tables, sourced statistics, FAQPage schema all help |
| Bing Copilot | 70/100 | bingbot allowed; missing author profile photo limits E-E-A-T |

### Citability — What's Working

- **Statistics with source attribution** — Service pages and llms.txt attribute stats to Oak Ridge National Lab, ARMA, Remodeling Magazine, U.S. DOE, Insurance Information Institute
- **Pricing tables are specific and consistent** — $940-$960/sq standard, $1,000-$1,080 premium, $1,175-$1,525 designer — with county permit breakdowns
- **FAQ schema auto-generated from question-format H2s** — Blog template detects and builds FAQPage JSON-LD programmatically

### Citability — What's Not Working

- **Opening paragraphs bury the direct answer** — Service pages lead with hero form, not prose. AI models prefer the first 40-60 words to answer the heading's question
- **Source attribution is footer-only, not inline** — Blog cost guide lists sources at bottom. A stat with inline attribution ("according to the Metal Roofing Alliance") is more citation-safe than one with a footnote
- **FAQ answers exceed 180-word citation window** — Homepage FAQ answer about service areas is 195 words, licensing answer is 280 words. AI truncates or paraphrases blocks above 167 words

### Brand Mention Analysis

| Signal | Status | Correlation | Notes |
|--------|--------|-------------|-------|
| YouTube | **Absent** | ~0.737 | **Highest-ROI gap in entire audit** |
| Reddit | **Absent** | High | No posts in r/bayarea, r/homeimprovement |
| Wikipedia entity | **Absent** | High | Topics linked but no business entity |
| LinkedIn (founder) | Present | Medium-High | In author schema on every blog post |
| Yelp | Present | Medium | In llms.txt and schema sameAs |
| CSLB.ca.gov | Present | High (gov trust) | Verifiable government source |
| GBP | Present | High | Linked from footer |

### Issues

| Issue | Severity | Details |
|-------|----------|---------|
| No SpeakableSpecification schema | CRITICAL | The most direct Google AIO signal. Absent from all pages. Add `cssSelector`-based specification to blog and service pages. |
| No YouTube/video presence | HIGH | Highest-correlation brand signal (~0.737). Even 5 project walkthroughs would materially improve AI citation. |
| No Reddit brand presence | HIGH | Reddit heavily cited in AI overviews for contractor recommendations. |
| `/llms-full.txt` returns 502 | HIGH | Extended content file referenced in llms.txt is unreachable. |
| `ai.txt` referenced but doesn't exist | HIGH | Layout emits `<link rel="ai-policy" href="/ai.txt">` but no `/public/ai.txt` in repo — 404 on every page load. |
| Service page H2s not question-formatted | MEDIUM | "Our Advantage" contains no extractable Q&A structure. Rewrite as "Why Do Bay Area Homeowners Choose Hamilton Exteriors?" |
| No comparison tables on service pages | MEDIUM | Tables are among the most reliably extracted content for AI Overviews. |
| No Wikipedia entity | MEDIUM | Limits entity disambiguation in AI models. |
| Inline source attribution missing | MEDIUM | Blog statistics have no in-sentence source, reducing per-passage citation confidence. |
| No third-party press mentions found | MEDIUM | SFGate, East Bay Times, Patch mentions would build off-site citation gravity. |

---

## 7. Images (Score: 70/100)

### What's Working

- Image sitemap present (image-sitemap.xml)
- Real project photos from CompanyCam/BackOffice CDN
- Most service page images have descriptive alt text

### Issues

| Issue | Severity | Details |
|-------|----------|---------|
| Blog hero images missing alt text | MEDIUM | Some blog posts have empty or missing alt attributes on featured images |
| BlogPosting schema: fake image dimensions | MEDIUM | Three ImageObject entries claim different dimensions for same URL |
| No WebP/AVIF format optimization detected | LOW | Blog images from Pexels/Unsplash served in original format. Consider next-gen format conversion. |
| Person.image uses generic OG fallback | MEDIUM | About page Person schema uses site-wide OG image, not Alex's headshot |
| No project gallery page | LOW | CompanyCam photos exist but no dedicated portfolio/gallery page for image SEO |

---

## 8. Local SEO (Score: 67/100)

### Local SEO Dimension Breakdown

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| GBP Signals | 25% | 52/100 | 13.0 |
| Reviews & Reputation | 20% | 60/100 | 12.0 |
| Local On-Page SEO | 20% | 82/100 | 16.4 |
| NAP Consistency & Citations | 15% | 75/100 | 11.3 |
| Local Schema Markup | 10% | 78/100 | 7.8 |
| Local Link & Authority Signals | 10% | 65/100 | 6.5 |

### Strengths

- Active GBP profile (CID: 3578771346418026097)
- CSLB license with live verification link sitewide
- $2M insurance disclosure on all service pages
- 5 manufacturer certifications (GAF, OC, CertainTeed, Hardie, Tesla)
- 47 city pages across 6 counties with city+service combos (282 deep pages)
- Schema uses `["RoofingContractor", "GeneralContractor"]` — correct industry subtype
- `areaServed` with 6 counties, each with Wikipedia `sameAs`
- `hasCredential` models all certifications as `EducationalOccupationalCredential`
- Strong local keyword targeting in titles and H1s
- WUI fire zone expertise (Bay Area differentiator)

### Critical Issues

| Issue | Severity | Impact |
|-------|----------|--------|
| **Review velocity stalled (74 days since last)** | CRITICAL | Past 18-day Sterling Sky threshold — actively suppressing Local Pack positions. 52 reviews vs Bay Area floor of ~100+. |
| **Templated reviews on city pages** | CRITICAL | Sarah M., David K., Jennifer L. appear on Oakland, Berkeley, Walnut Creek with only neighborhood names swapped. Near-identical text risks manual action. |
| **No Google Maps embed on site** | HIGH | No iframe embed anywhere ties website to GBP listing. An embed is a documented trust signal. |
| **GBP primary category unknown** | HIGH | Must be "Roofing Contractor" (not "General Contractor"). This is #1 local ranking factor per Whitespark 2026. |
| **Missing Tier 1 citations** | HIGH | Not on BuildZoom (auto-generates from CSLB data — just claim it), Houzz (dominant photo directory), or Nextdoor (high Bay Area impact). |
| **Manufacturer locator pages not verified** | HIGH | GAF, Owens Corning, and James Hardie all run "Find a Contractor" locators. Free Tier 1 authority links if listed. |
| **NAP inconsistency** | MEDIUM | Schema uses "Hamilton Exteriors" but About page and BBB use "Hamilton Exteriors, Inc." |
| **BBB listed but NOT accredited** | MEDIUM | A- rating but no accreditation badge. Accreditation is $600-900/year — matters at quote-decision stage for $15k+ jobs. |
| **No GBP Posts activity detected** | MEDIUM | Direct local pack ranking signal. |
| **Blog posts don't link to city service pages** | MEDIUM | "Bay Area Fire Zone Roofing" should link to `/service-areas/.../oakland-ca/roofing`. Missing throughout the blog. |
| **City hub unique content only 25-35%** | MEDIUM | FAQ sections and "Why Choose" blocks are verbatim across cities. Below 40% threshold. |
| **geo.position hardcoded to Castro Valley on city pages** | LOW | City pages show "Oakland, CA" geoPlacename but Castro Valley coordinates. |

---

## 9. Visual & Mobile (Assessment)

### Critical: Global Nav Rendering Bug

All pages tested show the same issue: the mobile navigation menu renders in an always-open state, creating a duplicate text list of nav links below the primary nav bar. This affects:

- **Desktop:** Wastes ~80px of prime viewport real estate
- **Mobile (375px):** Pushes hero content well below fold, logo "Hamilton" overflows viewport width

### Page-by-Page Findings

| Page | H1 Above Fold | CTA Visible | Nav Bug | Logo Overflow | Rating |
|------|---------------|-------------|---------|---------------|--------|
| Desktop Homepage | No | Text only | Yes | No | Poor |
| Mobile Homepage | No | Text only | Yes | Yes (clipped) | Critical |
| Desktop /roofing | No | Text only | Yes | No | Poor |
| Mobile /roofing | No | Text only | Yes | Yes (clipped) | Critical |
| Mobile /blog | Yes | Text only | Yes | Yes (clipped) | Fair |

### Key Visual Issues

1. **No H1 visible above fold** on homepage or service pages (except blog)
2. **CTA styled as nav link** — "Get Your Free Inspection" appears as underlined text, not a filled button
3. **No social proof above fold** — star ratings and review count only visible after scrolling
4. **Touch targets too small** — phone number and CTA links ~20-24px height (below 44px minimum)
5. **Blog page performs best** — H1, authority signals (CSLB#), and search bar all visible above fold

---

## Priority Action Plan

### Critical (Fix Immediately)

| # | Issue | Impact | Files to Edit | Effort |
|---|-------|--------|---------------|--------|
| 1 | **Launch review velocity campaign** | 74 days past 18-day cliff — actively suppressing Local Pack. Text/email every job from last 60 days. Target 8-10 reviews in 30 days, then 2-4/month. | Off-site (GBP process) | Ongoing |
| 2 | **Replace templated city page reviews** | Same 3 reviewers across 47 cities — manual action risk. Use real anonymized reviews or remove per-city reviews. | GeneralCityPage.astro | Medium |
| 3 | **Add SpeakableSpecification to blog + service pages** | Most direct Google AIO signal, completely absent. Add `cssSelector` pointing to article body + first FAQ answer. | blog/[slug].astro, ServicePage.astro | Medium |
| 4 | **Add schema to /buy page** | Primary conversion page has zero structured data. Add Service + AggregateOffer at minimum. | /buy page | Small |
| 5 | **Fix or remove SearchAction** | `/blog?q=` is unhandled. Remove `potentialAction` block until search is wired up. | Layout.astro | Small |

### High (Fix Within 1 Week)

| # | Issue | Impact | Files to Edit | Effort |
|---|-------|--------|---------------|--------|
| 6 | **Verify GBP primary category** | Must be "Roofing Contractor" — #1 local ranking factor (Whitespark score: 193). | Off-site (GBP console) | Tiny |
| 7 | **Fix `dateModified` to static dates** | `new Date()` on SSR inflates freshness. Add `lastModified` to service data files. | ServicePage.astro + data files | Small |
| 8 | **Fix `/llms-full.txt` 502 + create `/public/ai.txt`** | Extended AI content unreachable. Layout `<link rel="ai-policy">` points to nonexistent file — 404 on every page load. | public/llms-full.txt, public/ai.txt or Layout.astro | Small |
| 9 | **Claim BuildZoom + Houzz** | BuildZoom auto-generates from CSLB — just claim. Houzz needs CompanyCam photos. Both rank page 1 for Bay Area contractor queries. | Off-site | Medium |
| 10 | **Fix `datePublished` null guard** | `post.published_at \|\| post.updated_at \|\| new Date().toISOString()`. | blog/[slug].astro | Tiny |
| 11 | **Fix `contactPoint.areaServed: "US"` → "CA"** | Bay Area SAB claiming entire US dilutes geographic relevance. | Layout.astro | Tiny |
| 12 | **Fix BlogPosting image dimensions** | Same URL with false dimensions. Use Ghost resize API or single ImageObject. | blog/[slug].astro | Small |
| 13 | **Standardize NAP everywhere** | "Hamilton Exteriors" — not "Hamilton Exteriors, Inc." Update schema, footer, BBB, all directories. | Footer.astro, off-site | Tiny |
| 14 | **Add `AggregateRating` + `Review.datePublished` to city hubs** | Missing from city LocalBusiness blocks — needed for star snippets. | GeneralCityPage.astro | Small |

### Medium (Fix Within 1 Month)

| # | Issue | Impact | Files to Edit | Effort |
|---|-------|--------|---------------|--------|
| 15 | **Rewrite service page H2s as questions** | "Our Advantage" → "Why Do Bay Area Homeowners Choose Hamilton Exteriors?" Add direct-answer lead sentences. | Service page components | Medium |
| 16 | **Move inline source attribution into blog text** | Stats need in-sentence sources for per-passage citation confidence. | Blog content (copy edit) | Low |
| 17 | **Create YouTube channel + 5 project walkthroughs** | Highest-correlation brand signal (~0.737). One per service type. | Off-site | Large |
| 18 | **Replace Person.image with real headshot** | Knowledge Panel + author card + E-E-A-T for AI entity graph. | about/alex-hamilton-li.astro | Tiny |
| 19 | **Add Google Maps embed** | No iframe embed ties website to GBP. Add to homepage and contact. | Homepage component | Small |
| 20 | **Increase city hub unique content to 40%+** | Write county-specific FAQs (6 sets) covering permit costs, fire zones, HOA considerations. | City page data/components | Medium |
| 21 | **Add blog → city internal links** | Blog posts should link to relevant city+service pages. Missing throughout. | Blog content | Medium |
| 22 | **Verify manufacturer locator listings** | GAF, Owens Corning, James Hardie "Find a Contractor" pages. Free Tier 1 authority links. | Off-site | Small |
| 23 | **Start Reddit brand presence** | r/bayarea, r/homeimprovement, r/roofing. AMA-style posts + community responses. | Off-site | Ongoing |
| 24 | **Pursue BBB accreditation** | $600-900/year. Badge matters at quote-decision stage for $15k+ jobs. | Off-site | Small |
| 25 | **Activate weekly GBP Posts** | Project photos, seasonal tips. Direct local pack signal. | Off-site | Ongoing |
| 26 | **Fix GeoCoordinates on county pages** | Verify lat/lng not swapped (lat 37.x, lng -122.x for Bay Area). | CountyPage.astro | Tiny |
| 27 | **Trim FAQ answers > 180 words** | Break at logical points for AI extraction window. | FAQ.astro | Small |
| 28 | **Add RSS feed URL to llms.txt** | One line: `- RSS: https://hamilton-exteriors.com/blog/rss.xml` | public/llms.txt | Tiny |

### Low (Backlog)

| # | Issue | Impact | Files to Edit | Effort |
|---|-------|--------|---------------|--------|
| 29 | Fix additionalType Wikipedia → sameAs | Layout.astro | Tiny |
| 30 | Extract BreadcrumbList from CollectionPage | blog/index.astro | Tiny |
| 31 | Implement IndexNow | New endpoint | Small |
| 32 | WebP/AVIF blog image optimization | Image pipeline | Medium |
| 33 | Create portfolio/gallery page | New page | Medium |
| 34 | Verify @hamiltonexteriors Twitter handle | Off-site | Tiny |
| 35 | Normalize knowsAbout schema | Layout.astro | Tiny |
| 36 | Add `articleBody` to BlogPosting schema | blog/[slug].astro | Small |
| 37 | Remove duplicate Service schema from CountyPage | CountyPage.astro | Small |
| 38 | Fix county page `WebPage.about` relative anchor → absolute URL | CountyPage.astro | Tiny |
| 39 | Pursue one third-party press mention (SFGate, East Bay Times, Berkeleyside) | Off-site | Medium |
| 40 | Create city-specific blog posts for top 5 markets | New content | Large |

---

## Key Files for Code Fixes

| File | Issues |
|------|--------|
| `src/layouts/Layout.astro` | SearchAction (#5), areaServed (#11), ai.txt link (#8), additionalType (#29) |
| `src/components/ServicePage.astro` | dateModified (#7), SpeakableSpecification (#3) |
| `src/pages/blog/[slug].astro` | datePublished null guard (#10), image dimensions (#12), SpeakableSpecification (#3), articleBody (#36) |
| `src/pages/blog/index.astro` | BreadcrumbList extraction (#30) |
| `src/components/CountyPage.astro` | GeoCoordinates (#26), duplicate Service (#37), relative @id (#38) |
| `src/components/GeneralCityPage.astro` | Templated reviews (#2), AggregateRating + Review.datePublished (#14) |
| `src/pages/about/alex-hamilton-li.astro` | Person.image (#18) |
| `src/components/Footer.astro` | NAP inconsistency (#13) |
| `public/llms.txt` | RSS feed URL (#28) |
| `public/llms-full.txt` | 502 fix (#8) |
| `public/ai.txt` | Create or remove link (#8) |
| `/buy` page | Schema (#4) |

---

## Scoring Methodology

| Category | Weight | What Was Measured |
|----------|--------|-------------------|
| Technical SEO (88) | 20% | Security headers (excellent), redirects (correct), robots.txt (excellent), sitemaps (good), intermittent 502s (-5), no IndexNow (-2), /buy broken (-5) |
| Content Quality (75) | 20% | E-E-A-T signals (excellent), content depth (excellent), templated city content (-10), fake reviews (-10), no video (-5) |
| On-Page SEO (85) | 15% | Title tags (good), heading structure (good), internal linking (good), meta descriptions (good), service-to-city gap (-5), blog→city links missing (-5), mobile nav bug (-5) |
| Schema (71) | 10% | Rich implementation (+20), 6 critical errors (-18), 4 high errors (-8), 7 warnings (-7), no /buy schema (-6), no SpeakableSpecification (-10) |
| Performance (92) | 10% | 260 pages avg 92, accessibility 97, best practices 100, SEO 100, /buy broken (-3), some blog pages < 90 (-5) |
| AI/GEO (74) | 10% | Crawler config (excellent +20), llms.txt (excellent +15), no SpeakableSpecification (-10), no YouTube (-8), no Reddit (-5), inline attribution missing (-5), /llms-full.txt 502 (-5), ai.txt 404 (-3), service H2s declarative (-5) |
| Local SEO (67) | 10% | GBP signals weak (52/100), reviews stalled 74 days (60/100), on-page local strong (82/100), NAP mostly consistent (75/100), local schema good (78/100), authority signals moderate (65/100) |
| Images (70) | 5% | Image sitemap (good), alt text gaps (-10), fake schema dimensions (-10), no next-gen formats (-5), no gallery (-5) |

---

## Projected Score After Fixes

| Scenario | Estimated Score |
|----------|----------------|
| Critical fixes only (#1-5) | 83/100 |
| Critical + High (#1-14) | 88/100 |
| All code fixes (#1-28) | 91/100 |
| All fixes including off-site (#1-40) | 94/100 |

---

*Audit conducted April 6, 2026 (v3) using: 7 parallel specialist agents (Technical, Content, Schema, GEO, Local, Sitemap, Performance), WebFetch (live crawl of 15+ pages), Lighthouse (lab data from 260 pages), codebase schema analysis, curl HTTP header inspection, sitemap parsing. Detailed Local SEO report in LOCAL-SEO-AUDIT.md. Field CWV data from CrUX was not available. PageSpeed Insights API quota was exhausted during audit.*
