# Hamilton Exteriors — Full SEO Audit Report

**Site:** hamilton-exteriors-production.up.railway.app (hamilton-exteriors.com)
**Date:** April 3, 2026
**Pages crawled:** 524 (via sitemap) + manual inspection of 15+ key pages
**Business type:** Service Area Business (SAB) — Roofing Contractor & General Contractor
**Location:** Castro Valley, CA — serving 5 Bay Area counties, 29+ cities

---

## Executive Summary

### Overall SEO Health Score: 72 / 100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 70 | 22% | 15.4 |
| Content Quality | 76 | 23% | 17.5 |
| On-Page SEO | 75 | 20% | 15.0 |
| Schema / Structured Data | 74 | 10% | 7.4 |
| Performance (CWV) | 70 | 10% | 7.0 |
| AI Search Readiness | 74 | 10% | 7.4 |
| Images | 62 | 5% | 3.1 |
| **Total** | | **100%** | **72.8** |

**Local SEO Score: 71/100** (separate dimension, not weighted into overall)

### Top 7 Critical Issues
1. **Live empty draft post** at `/blog/untitled-2` — no title, no content, indexed
2. **Sitemap/schema domain mismatch** — all URLs reference `hamilton-exteriors.com` but DNS not pointed to Railway yet
3. **Owner name conflict in llms-full.txt** — says "Marcus Hamilton" while everything else says "Alexander Hamilton Li"
4. **Review velocity failure** — 70 days since last review, exceeding the 18-day velocity cliff (Sterling Sky)
5. **Full Organization schema blob (160 lines) duplicated on every page** — blog posts and city pages should reference by @id, not inline
6. **Blog post orphaned from index** — "7 Warning Signs You Need a New Roof" not listed on blog pages
7. **Yelp sameAs URL returns 404** — broken entity reference on every page

### Top 5 Quick Wins
1. Fix "Marcus Hamilton" -> "Alexander Hamilton Li" in `public/llms-full.txt` (2 min)
2. Delete or unpublish `/blog/untitled-2` (5 min)
3. Fix "Bay Areas" -> "Bay Area's" on 2 pages (2 min)
4. Fix Yelp sameAs URL or remove until verified (5 min)
5. Add "7 Warning Signs" post to blog index feed (5 min)

---

## 1. Technical SEO (Score: 72/100)

### Crawlability

| Check | Status | Notes |
|-------|--------|-------|
| robots.txt | PASS | Well-configured. AI search crawlers allowed, training crawlers blocked. /api/ blocked. |
| Sitemap index | PASS | sitemap-index.xml -> sitemap-0.xml, 524 URLs |
| Sitemap validity | WARN | All 524 URLs use `hamilton-exteriors.com` domain — if DNS isn't pointed, these won't resolve |
| Crawl depth | PASS | Max 4 levels deep (home -> service-areas -> county -> city -> service) |
| Internal linking | PASS | Strong cross-linking via nav, footer, and service area grids |

### Indexability

| Check | Status | Notes |
|-------|--------|-------|
| Canonical tags | NEEDS CHECK | Verify canonicals point to `hamilton-exteriors.com` not Railway URL |
| Noindex pages | PASS | No accidental noindex detected on key pages |
| Duplicate content | WARN | `/blog/untitled-2` is a duplicate shell page with no unique content |
| Orphan pages | WARN | "7 Warning Signs" blog post not linked from blog index |
| Pagination | PASS | Blog uses `?page=2` pagination correctly |

### URL Structure

| Check | Status | Notes |
|-------|--------|-------|
| URL format | PASS | Clean, lowercase, hyphenated slugs |
| Hierarchy | PASS | Logical: `/service-areas/county/city/service` |
| Trailing slashes | PASS | Consistent (no trailing slash) |
| Query parameters | PASS | Only used for blog pagination |

### Security

| Check | Status | Notes |
|-------|--------|-------|
| HTTPS | PASS | Railway provides SSL |
| HSTS | NEEDS CHECK | Verify HSTS header present |
| CSP | NEEDS CHECK | Content Security Policy header |
| X-Frame-Options | NEEDS CHECK | Clickjacking protection |

### Findings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| T1 | Sitemap domain mismatch | **Critical** | sitemap-0.xml references hamilton-exteriors.com URLs but site is live on Railway URL. If custom domain DNS isn't pointed, Google can't crawl sitemap URLs. |
| T2 | Live empty draft post | **Critical** | `/blog/untitled-2` is published with no title or content. Wastes crawl budget, hurts quality signals. |
| T3 | Legal pages missing from sitemap | **Medium** | `/terms`, `/privacy-policy`, `/privacy-notice-ca`, `/eeo-policy`, `/opt-out` not in sitemap |
| T4 | All lastmod dates identical | **Medium** | Every URL shows 2026-04-03. Google may ignore lastmod if it's clearly not accurate per-page. |
| T5 | Missing `<link rel="alternate">` for service area hierarchy | **Low** | County pages don't signal relationship to child city pages |

---

## 2. Content Quality (Score: 78/100)

### E-E-A-T Assessment

| Signal | Status | Details |
|--------|--------|---------|
| **Experience** | STRONG | Real project photos, specific job counts ("80+ roof replacements in Alameda County"), local knowledge |
| **Expertise** | STRONG | CSLB #1082377, architect credentials, manufacturer certifications (GAF, Owens Corning, CertainTeed, James Hardie, Tesla) |
| **Authority** | MODERATE | 4.8/5 rating (50 reviews), but reviews appear to be a fixed set repeated across pages |
| **Trust** | STRONG | Transparent pricing, license number visible, physical address, clear warranty terms |

### Page-by-Page Content Analysis

| Page | Words | Quality | Issues |
|------|-------|---------|--------|
| Homepage | ~3,000 | Good | Solid overview, strong social proof |
| /roofing | ~4,500 | Good | Comprehensive, 5 FAQs, 4 reviews |
| /siding | ~3,500 | Good | Product-focused, pricing transparent |
| /windows | ~4,500 | Good | Good depth, manufacturer mentions |
| /adu | ~4,500 | Good | Full service breakdown, design+permits covered |
| /custom-homes | ~3,800 | Good | H1 typo: "Bay Areas" |
| /additions | ~4,500 | Good | H1 typo: "Bay Areas" |
| /buy | ~1,100 | Thin | Landing page, could use more content for SEO |
| /blog (index) | ~500 | OK | Functional index, categories are messy |
| Blog posts | 1,500-2,100 | Good | Well-researched, Bay Area specific |
| Service area (county) | ~2,800 | Good | County-specific details |
| Service area (city) | ~3,500 | Good | City-specific neighborhoods, climate, permits |
| Service area (city+service) | ~3,200 | Good | Localized with city-specific stats and regulations |

### pSEO Quality Assessment

**Verdict: ABOVE AVERAGE for pSEO pages.**

The city+service pages (e.g., `/service-areas/alameda-county-ca/oakland-ca/roofing`) include:
- City-specific housing stock data (e.g., "150,000 housing units, 60% built before 1960")
- Local climate details (e.g., "23 inches of rain annually")
- Neighborhood mentions (Rockridge, Temescal, Montclair, Oakland Hills)
- City-specific permit costs and building bureau references
- Local WUI/fire zone requirements
- 10 FAQs with city-specific answers

Some shared elements (reviews, pricing, warranty sections) are templated across pages — expected and acceptable.

### Findings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| C1 | Empty draft published | **Critical** | `/blog/untitled-2` — no content, no title, tagged as "location page" |
| C2 | Blog post missing from index | **High** | "7 Warning Signs You Need a New Roof" is live and in sitemap but not on blog listing pages |
| C3 | Blog categories inconsistent | **High** | "Blog (3)" and "Blog-Post (10)" — confusing taxonomy, should be one category |
| C4 | Duplicate H2 headings | **Medium** | Cost blog post has "What We See on Real Bay Area Jobs" and "Sources & Further Reading" each appearing twice |
| C5 | H1 typos | **Medium** | `/custom-homes` and `/additions` — "Bay Areas Best" should be "Bay Area's Best" |
| C6 | /buy page thin content | **Medium** | Only ~1,100 words for a conversion page |
| C7 | Blog author attribution | **Medium** | Blog index shows "Hamilton" as author, not full name "Alexander Hamilton Li" |
| C8 | Same 4 reviews on every page | **Low** | Consider rotating or adding page-specific reviews |
| C9 | Stock image alt text | **Low** | Blog post image alt references "terracotta roof shingles in Provence, France" |

---

## 3. On-Page SEO (Score: 75/100)

### Title Tags

| Page Type | Example | Assessment |
|-----------|---------|------------|
| Homepage | "Bay Area's Top Design-Build & Exteriors Contractor \| Hamilton Exteriors" | Good |
| Service pages | "Bay Area Roofing \| Shingles, Metal & Tile \| Hamilton" | Good |
| City+service | "Reliable Roofing in Oakland, CA \| Hamilton Exteriors" | Good |
| Blog posts | "How Much Does a Roof Replacement Cost in the Bay Area (2026) \| Hamilton Exteriors" | Good |
| /buy | "Buy Your Roof Online \| Hamilton Exteriors" | Good |

### Meta Descriptions

| Check | Status | Notes |
|-------|--------|-------|
| Homepage | PASS | Present and compelling |
| Service pages | PASS | Include phone number, warranty, CTA |
| Blog posts | PASS | Include pricing ranges and year |
| /buy | **FAIL** | No `<meta description>` tag — only in schema |
| /adu | **FAIL** | No `<meta description>` tag — only in schema |

### Heading Structure

| Check | Status | Notes |
|-------|--------|-------|
| Single H1 per page | PASS | All checked pages have exactly one H1 |
| H1 keyword relevance | PASS | H1s target primary page keyword |
| H2/H3 hierarchy | WARN | Blog post has duplicate H2s |
| Heading keyword variety | PASS | Good use of related terms in subheadings |

### Internal Linking

| Check | Status | Notes |
|-------|--------|-------|
| Navigation | PASS | Consistent nav with service + area links |
| Footer links | PASS | County and city links in footer |
| Contextual links | PASS | Blog posts link to related articles and service pages |
| Breadcrumbs | PASS | BreadcrumbList schema on all pages |
| Cross-service linking | PASS | Service pages link to all other services |

### Findings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| O1 | Missing meta descriptions | **High** | `/buy` and `/adu` lack explicit `<meta name="description">` tags |
| O2 | Duplicate H2 headings | **Medium** | Blog cost post has 2 identical H2s |
| O3 | H1 grammar errors | **Medium** | "Bay Areas Best" on 2 pages |
| O4 | Blog "Untitled" H1 | **Critical** | `/blog/untitled-2` has H1 of "Untitled" |

---

## 4. Schema / Structured Data (Score: 85/100)

### Implementation Overview

| Schema Type | Pages | Status |
|-------------|-------|--------|
| Organization (RoofingContractor + GeneralContractor) | All | PASS |
| LocalBusiness | Service/area pages | PASS |
| BreadcrumbList | All inner pages | PASS |
| Service with AggregateOffer | Service pages | PASS |
| AggregateRating (4.8/5, 50 reviews) | All | PASS |
| Review (4 individual) | All | PASS |
| FAQPage (5-10 Qs) | Service + area pages | PASS |
| BlogPosting | Blog posts | PASS |
| WebApplication | /buy | PASS |
| CollectionPage | /blog | PASS |
| OfferCatalog | Multiple | PASS |
| EducationalOccupationalCredential | Blog posts | PASS |

### Strengths
- 12+ schema types, zero JSON parse errors across all pages
- Pricing in structured data (AggregateOffer with ranges)
- CSLB license credential markup with `recognizedBy`
- Consistent org data, ISO dates, absolute URLs throughout

### Findings (from deep schema validation)

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| S1 | Full 160-line Org block inlined everywhere | **Critical** | Blog posts and city pages carry the entire Organization block with ratings/reviews instead of a lean `@id` reference. Google may interpret ratings as applying to the blog article itself. **Fix:** Replace with `{"@id": "https://hamilton-exteriors.com/#business"}` on non-business pages. |
| S2 | BlogPosting missing `keywords`, `about`, `mentions` | **High** | Reduces AI/LLM extractability and topical disambiguation |
| S3 | Service schema missing `aggregateRating` | **High** | Only the Organization has the rating — Service entities should carry their own |
| S4 | `founder` Person missing `sameAs` | **Medium** | No LinkedIn or CSLB lookup URL for E-E-A-T verification |
| S5 | WebSite missing `SearchAction` | **Medium** | No sitelinks search box eligibility |
| S6 | FAQPage restricted for Google rich results | **Medium** | Since Aug 2023, FAQ rich results limited to gov/healthcare. Still valuable for AI citations. |
| S7 | Same 5 FAQ questions on every page | **Medium** | Duplicate Q&A wastes schema budget; use page-specific questions only |
| S8 | Review authors use abbreviated names | **Medium** | "Eric W", "Sarah M" — Google prefers full names for trust |
| S9 | `areaServed` skips County level | **Medium** | City > State, should be City > County > State chain |
| S10 | No `LocalBusiness` on city pages | **Low** | City pages could use `HomeAndConstructionBusiness` |
| S11 | No HowTo schema on checklist posts | **Low** | Rich result opportunity |
| S12 | BlogPosting `isPartOf` references undefined `@id` | **Low** | Blog index should emit a `Blog` entity with matching `@id` |

---

## 5. Performance / Core Web Vitals (Score: 70/100)

### Lab Estimates

| Metric | Estimate | Target | Status |
|--------|----------|--------|--------|
| LCP | ~2.0-2.5s | <2.5s | BORDERLINE |
| INP | <100ms | <200ms | PASS (static site) |
| CLS | ~0.05 | <0.1 | PASS |
| TTFB | ~300-500ms | <800ms | PASS |

### Findings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| P1 | Font loading strategy | **Medium** | 3 custom font families — verify preload hints for LCP-critical fonts |
| P2 | Hero image optimization | **Medium** | Large hero images — ensure WebP/AVIF and preload |
| P3 | Image lazy loading | **Low** | Verify above-fold images are NOT lazy loaded |
| P4 | Mapbox on /buy | **Low** | Third-party SDK impact on /buy page |

---

## 6. AI Search Readiness (Score: 80/100)

### AI Crawler Access

| Crawler | Access | Purpose |
|---------|--------|---------|
| GPTBot | ALLOWED | ChatGPT search |
| OAI-SearchBot | ALLOWED | OpenAI search |
| PerplexityBot | ALLOWED | Perplexity AI |
| ClaudeBot | ALLOWED | Anthropic search |
| Google-Extended | ALLOWED | Gemini/AI Overviews |
| Applebot-Extended | ALLOWED | Apple Intelligence |
| CCBot | BLOCKED | Training (correct) |
| anthropic-ai | BLOCKED | Training (correct) |
| cohere-ai | BLOCKED | Training (correct) |

**Assessment:** Best-in-class crawler policy.

### GEO Signals

| Signal | Status | Notes |
|--------|--------|-------|
| /llms.txt | PRESENT | Good format, follows llmstxt.org spec |
| /llms-full.txt | PRESENT | Extended version with business details |
| Quotable statistics | STRONG | Pricing, permit costs, job counts |
| FAQ format | STRONG | 5-10 Q&A per page |
| Tables | STRONG | Pricing comparisons, material specs |
| Author + credentials | STRONG | Named author with CSLB on blog posts |
| SSR (Astro) | STRONG | Full HTML at delivery — no JS required for AI crawlers |

### Findings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| A1 | **Owner name conflict in llms-full.txt** | **Critical** | Line 18 says "Marcus Hamilton, Owner" — everywhere else says "Alexander Hamilton Li". AI systems reading both files will see contradictory entity data. Fix immediately in `public/llms-full.txt`. |
| A2 | No page URL list in llms.txt | **High** | llmstxt.org spec recommends a `## Pages` section with canonical URLs for AI agent navigation. Currently missing. |
| A3 | No `SpeakableSpecification` schema | **High** | No page marks passages for voice/assistant read-aloud. Missing for Google Assistant and voice-based AI Overviews. |
| A4 | No YouTube presence | **High** | YouTube mentions have ~0.737 correlation with AI citation frequency. Zero channel presence is the biggest GEO gap. |
| A5 | Blog H2s are declarative, not question-format | **Medium** | Perplexity preferentially surfaces Q&A-matching content. Convert H2s to questions. |
| A6 | Blog "Ground Up" label obscures content type | **Medium** | AI crawlers parsing breadcrumbs won't recognize this as a blog/article section |
| A7 | No "Key Takeaways" boxes | **Low** | Blog posts could add highlighted summary for AI extraction |
| A8 | No Wikidata entity | **Low** | Knowledge graph anchor for entity disambiguation |

---

## 7. Images (Score: 62/100)

### Findings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| I1 | Irrelevant stock alt text | **High** | "terracotta roof shingles in Provence, France" on Bay Area roofing post |
| I2 | Inconsistent alt text quality | **Medium** | Some pages generic, others localized |
| I3 | Certification logo alt text | **Low** | Verify meaningful alt on cert logos |
| I4 | Gallery image descriptions | **Low** | Add service type + location to gallery alt text |

---

## 8. Local SEO (Score: 76/100)

### NAP Consistency: PERFECT

| Element | Value | Consistent? |
|---------|-------|-------------|
| Name | Hamilton Exteriors | YES |
| Address | 21634 Redwood Rd Unit F, Castro Valley, CA 94546 | YES |
| Phone | (650) 977-3351 | YES |
| Email | support@hamilton-exteriors.com | YES |

### Service Area Page Quality

| Level | Count | Words | Quality |
|-------|-------|-------|---------|
| County pages | 5 | ~2,800 | Good — county-specific |
| City pages | 29+ | ~3,500 | Good — neighborhood mentions |
| City+service | ~180 | ~3,200 | Good — localized FAQs, permit info |

### Findings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| L1 | Review velocity failure | **Critical** | 70 days since last review (Jan 22, 2026). Sterling Sky research shows rankings suppressed after 18-day gap. Need 2+ new GBP reviews per month minimum. |
| L2 | Yelp sameAs URL returns 404 | **High** | `yelp.com/biz/hamilton-exteriors-castro-valley` is in schema sameAs on every page but returns 404. Broken entity reference. Fix URL or remove. |
| L3 | Missing from Angi and HomeAdvisor | **High** | Two highest-authority home services directories (DA 91+) — absent from sameAs and likely unlisted |
| L4 | Walnut Creek pSEO only ~30% unique | **High** | Oakland pages are ~70% unique (good), but Walnut Creek drops to ~30%. At 174 city+service pages, this risks HCU devaluation at scale. |
| L5 | No cross-city lateral links | **Medium** | Oakland roofing doesn't link to Berkeley roofing or San Leandro roofing. Missing authority distribution across pSEO cluster. |
| L6 | Same reviews across all location pages | **Medium** | Consider location-specific testimonials |
| L7 | No Google Maps iframe embed | **Medium** | Only a Maps link — no embedded iframe for geo-relevance reinforcement |
| L8 | Missing manufacturer directory submissions | **Medium** | GAF, Owens Corning, CertainTeed, James Hardie each have "find a contractor" directories with high-DA inbound links |
| L9 | GBP primary category unverified | **Medium** | Must be "Roofing contractor" primary — verify in GBP dashboard |

---

## 9. Sitemap (Score: 68/100)

### Findings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| SM1 | Domain mismatch | **Critical** | URLs use hamilton-exteriors.com but DNS may not be pointed |
| SM2 | Legal pages missing | **Medium** | /terms, /privacy-policy, etc. not in sitemap |
| SM3 | All lastmod identical | **Medium** | Every URL: 2026-04-03. Should reflect actual changes. |
| SM4 | Untitled post not in sitemap | **Good** | Correctly excluded, but still linked from blog index |

---

## All Findings Summary

### Critical (7)
1. `/blog/untitled-2` live empty draft — no content, H1 is "Untitled"
2. Sitemap/schema domain mismatch — hamilton-exteriors.com DNS not pointed to Railway
3. Owner name conflict in `llms-full.txt` — "Marcus Hamilton" vs "Alexander Hamilton Li"
4. Review velocity failure — 70 days since last review (18-day cliff)
5. Full 160-line Organization schema inlined on every page (should use @id reference)
6. Yelp sameAs URL returns 404 on every page
7. GBP primary category unverified — #1 local ranking factor

### High (10)
8. "7 Warning Signs" blog post orphaned from blog index
9. Blog categories "Blog" + "Blog-Post" need consolidation
10. Missing meta descriptions on `/buy` and `/adu`
11. Stock photo alt text references "Provence, France"
12. BlogPosting missing `keywords`, `about`, `mentions` properties
13. Service schema missing `aggregateRating`
14. No page URL list in llms.txt
15. No `SpeakableSpecification` schema for voice/AI
16. No YouTube presence (~0.737 AI citation correlation)
17. Walnut Creek pSEO pages only ~30% unique (vs Oakland at ~70%)
18. Missing from Angi and HomeAdvisor directories

### Medium (16)
19. Duplicate H2 headings in cost blog post
20. H1 typos on `/custom-homes` and `/additions`
21. /buy page thin content (~1,100 words)
22. Blog author shows "Hamilton" not full name on index
23. Same 5 FAQ questions duplicated across all pages
24. Legal pages missing from sitemap
25. All lastmod dates identical
26. Font loading strategy (3 families)
27. Hero image optimization
28. Same reviews on all location pages
29. No cross-city lateral links in pSEO cluster
30. No Google Maps iframe embed on area pages
31. Missing manufacturer directory submissions (GAF, OC, etc.)
32. Blog H2s declarative, not question-format
33. Blog "Ground Up" label obscures content type for AI
34. `founder` Person missing `sameAs` (LinkedIn, CSLB)

### Low (8)
35-42. HowTo schema, ServiceArea schema, Key Takeaways boxes, Wikidata entity, WebPage entity, map embeds, gallery alt text, cert logo alt text

---

## What's Working Well

1. **Schema markup is excellent** — 12+ types, pricing in structured data, CSLB credential markup
2. **pSEO quality is above average** — City+service pages have genuine local content, not thin templates
3. **robots.txt is best-in-class** — Smart AI search vs training crawler policy
4. **E-E-A-T signals are strong** — Real credentials, named author, transparent pricing
5. **Content depth is good** — Service pages average 3,500-4,500 words
6. **Internal linking is comprehensive** — Strong nav, footer, breadcrumbs, contextual links
7. **URL structure is clean** — Logical hierarchy, lowercase, hyphenated
8. **llms.txt present** — Ahead of competitors on AI search readiness
9. **Blog is Bay Area specific** — County-specific permit costs and climate data
10. **NAP consistency is perfect** — Same across all 524 pages
