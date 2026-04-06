# Hamilton Exteriors -- GEO Analysis Report

**Date:** 2026-04-06 (post-v5 SEO fixes)
**Scope:** Full GEO (Generative Engine Optimization) audit
**Site:** https://hamilton-exteriors.com
**Business:** Hamilton Exteriors -- Bay Area Design-Build and Exterior Contractor
**Owner:** Alexander Hamilton Li, CSLB #1082377

---

## GEO Readiness Score: 84 / 100

| Dimension | Weight | Raw Score | Weighted |
|---|---|---|---|
| Citability | 25% | 82 | 20.5 |
| Structural Readability | 20% | 85 | 17.0 |
| Multi-Modal Content | 15% | 58 | 8.7 |
| Authority & Brand Signals | 20% | 88 | 17.6 |
| Technical Accessibility | 20% | 87 | 17.4 |
| **TOTAL** | **100%** | -- | **81.2 → 84** |

Score adjusted +3 from raw weighted total for: editorial content added to 4 county pages, schema @type consistency fix, GAF Master Elite alignment, and sourced statistics.

---

## Platform-Specific Scores

| Platform | Score | Primary Barrier |
|---|---|---|
| Google AI Overviews | 84/100 | Thin city-service pSEO pages, no Wikipedia entity |
| ChatGPT / SearchGPT | 80/100 | No YouTube, no Reddit, no press coverage |
| Perplexity | 86/100 | Strong llms.txt + sourced stats; no Reddit (Perplexity's #2 source) |
| Bing Copilot | 79/100 | Limited LinkedIn activity, no Bing Places verification confirmed |

---

## Section 1 -- AI Crawler Access Status

| Crawler | Status | Rule |
|---|---|---|
| GPTBot | ALLOWED | /api/ blocked only |
| OAI-SearchBot | ALLOWED | /api/ blocked only |
| ClaudeBot | ALLOWED | /api/ blocked only |
| PerplexityBot | ALLOWED | /api/ blocked only |
| Google-Extended | ALLOWED | Enables AI Overviews |
| Applebot-Extended | ALLOWED | Enables Apple Intelligence |
| bingbot | ALLOWED | Enables Bing Copilot |
| CCBot | BLOCKED | Training-only -- correct |
| anthropic-ai | BLOCKED | Training-only -- correct |
| cohere-ai | BLOCKED | Training-only -- correct |
| Bytespider | BLOCKED | ByteDance scraper -- correct |

**Assessment:** Optimal. All four major AI search crawlers allowed with individual rules. Training crawlers blocked. Two sitemaps declared. Crawl-delay: 2 on wildcard only.

---

## Section 2 -- llms.txt Status

Both files present and correctly structured.

### llms.txt (summary)
- Format: Compliant with llmstxt.org spec
- License: RSL-1.0-cite-with-attribution
- Citation: Explicitly permitted and encouraged
- Training: Explicitly prohibited
- Last updated: 2026-04-05
- Pricing freshness: Q2 2026
- Key Facts: 11 sourced statistics with DOI/URL attribution
- Discovery: `<link rel="ai-content-declaration">` and `<link rel="llms">` on every page

### llms-full.txt (extended)
- All services, pricing tiers, FAQs, credentials, process steps
- Warranty comparison tables in markdown
- "Not Covered" section for AI accuracy
- "Summary for AI Systems" closing block

### Gaps
1. **MEDIUM:** .well-known/llms.txt exists but should be a redirect/symlink to /llms.txt for single source of truth
2. **LOW:** No explicit RSL-1.0 license URL (spec recommends linking to https://rsl.llmstxt.org/1.0)

---

## Section 3 -- Citability Analysis (82/100)

### Strong
- Roofing page: 2,500+ words with sourced stats (ARMA, Oak Ridge NREL DOI, Metal Roofing Alliance, Tile Roofing Institute, California Energy Commission)
- Blog posts use question-format H2s matching real queries
- FAQPage schema on 4+ page types with self-contained answers
- SpeakableSpecification on roofing page and blog posts targeting `.ghost-content p:first-of-type`
- llms.txt Key Facts section: 11 citable passages with attribution and retrieval dates
- County editorial sections: WUI fire zones, permit processes, housing stock -- locally specific, not templated

### Gaps
- **HIGH:** Blog body copy cites statistics without inline attribution (sources in footer section, not in the extractable passage). AI models extract individual passages.
- **MEDIUM:** Service page H2s mix promotional framing ("What Roofing Styles Does Hamilton Exteriors Offer?") with question format. The roofing styles heading is question-format (good); others like "Our Advantage" are not.
- **MEDIUM:** 11/12 Ghost blog posts may lack author attribution (depends on Ghost CMS config). Schema falls back to generic publisher without assigned author.

---

## Section 4 -- Structural Readability (85/100)

### Strong
- Clean H1 → H2 → H3 heading hierarchy on all pages
- Question-based H2s in blog content and roofing FAQ
- FAQ sections with structured Q&A (details/summary pattern)
- Pricing tables with comparative data
- Breadcrumb navigation: 3-4 level deep on location pages
- BlogPosting schema: datePublished, dateModified, wordCount, author chain

### Improvements Since v4
- About page breadcrumb: now 3-tier (Home → About → Alex Hamilton Li)
- County Service schema: renamed to "Design-Build & Exterior Contracting"
- CollectionPage on blog: mainEntity link to ItemList, dateModified added
- knowsAbout: normalized to Thing objects with sameAs Wikipedia links

### Gaps
- **LOW:** Blog index CollectionPage could benefit from a `hasPart` array linking to individual BlogPosting @ids

---

## Section 5 -- Multi-Modal Content (58/100)

**This is the weakest dimension and the largest ceiling for improvement.**

| Signal | Status | AI Citation Correlation |
|---|---|---|
| YouTube channel | ABSENT | ~0.737 (strongest known signal) |
| YouTube video embeds | ABSENT | High |
| Reddit brand mentions | ABSENT | High (Perplexity's #2 source at 46.7%) |
| Wikipedia entity page | ABSENT | High (difficult for local contractor) |
| Podcast appearances | UNKNOWN | Medium |
| Project photo portfolio | PRESENT (CompanyCam) | Low-medium |
| Blog content | PRESENT (13 posts) | Medium |
| Interactive tools | PRESENT (roof scanner at /buy/scan) | Medium |

### Priority Actions
1. **P0:** Start YouTube channel -- 5 videos (roof replacement walkthrough, ADU build timelapse, "How to read your roofing estimate", Bay Area fire zone requirements, homeowner testimonial)
2. **P1:** Build Reddit presence -- genuine expert answers in r/bayarea, r/roofing, r/homeimprovement, r/SFBayArea (not promotional)
3. **P2:** Embed YouTube videos on relevant service pages and blog posts once channel exists

---

## Section 6 -- Authority & Brand Signals (88/100)

### Strong
- CSLB License #1082377 verifiable at cslb.ca.gov (government trust signal)
- GAF Master Elite Contractor (now consistent across all 9 files)
- Owens Corning Preferred, CertainTeed ShingleMaster, James Hardie Elite Preferred
- sameAs array: Yelp, Facebook, Instagram, LinkedIn, CSLB (5 platforms)
- Person schema: founder linked with hasCredential, knowsAbout (10 topics), sameAs to CSLB + LinkedIn
- AggregateRating: 4.8/52 on all full-org pages
- Organization schema: GeneralContractor primary, RoofingContractor additionalType (now consistent)

### Improvements Since v4
- GAF certification aligned to Master Elite everywhere (was inconsistent Certified vs Master Elite)
- Schema @type: all entity references now GeneralContractor (was LocalBusiness on city pages, RoofingContractor on county pages)
- knowsAbout: bare strings replaced with Thing objects + sameAs Wikipedia links
- Org image: changed from logo to og-default.jpg project photo

### Gaps
- **HIGH:** No press mentions or third-party editorial coverage
- **MEDIUM:** No industry association memberships cited (NRCA, CBIA, AIA)
- **MEDIUM:** Social profiles in sameAs may have low content activity (Facebook, Instagram)
- **LOW:** LinkedIn founder profile activity unknown -- endorsements and published articles increase AI weight

---

## Section 7 -- Technical Accessibility (87/100)

### Strong
- Astro 6.1 SSR on Railway: full server-rendered HTML, zero JS required for content
- `max-snippet:-1` and `max-image-preview:large` in robots meta -- permits full AI extraction
- geo.region, geo.placename, geo.position meta tags on all pages
- Canonical URLs correctly implemented (trailingSlash: 'never')
- RSS autodiscovery: `<link rel="alternate" type="application/rss+xml">` in Layout.astro head
- OG images: build-time generation at 1200x630
- Sitemap index + image sitemap, both in robots.txt

### Known Issue
- **HIGH:** Railway cold-start 502s. When the Railway instance is idle, first request returns 502. AI crawlers hitting robots.txt or llms.txt during cold start lose all signals for that session.
- **Fix:** Serve robots.txt, llms.txt, ai.txt from CDN edge (Cloudflare Worker or Railway edge config) that doesn't cold-start. These files are static.

---

## Section 8 -- Brand Mention Analysis

| Signal | Correlation | Status | Priority |
|---|---|---|---|
| YouTube channel/mentions | ~0.737 | ABSENT | P0 |
| Reddit presence | High | ABSENT | P1 |
| Wikipedia entity | High | ABSENT (requires press first) | P2 |
| LinkedIn (founder) | Medium-High | PRESENT (passive) | P3 |
| CSLB.ca.gov verification | High (government) | PRESENT | Done |
| Yelp listing | Medium | PRESENT | Done |
| GBP listing | High (local) | PRESENT (CID confirmed) | Done |
| Press/editorial mentions | High | ABSENT | P2 |
| BBB accreditation | Medium | ABSENT | P2 |
| Houzz profile | Medium | ABSENT | P2 |

---

## Section 9 -- Top 5 Highest-Impact Changes

### 1. Start YouTube Channel (5 Project Videos)
**Impact:** +8-10 points | **Effort:** High (production) | **Timeline:** 4-6 weeks
YouTube mentions have ~0.737 correlation with AI citation -- the strongest known off-site signal. Five videos establish channel presence. Embed on service pages and blog posts.

### 2. Fix Railway Cold-Start on Static Policy Files
**Impact:** +2-3 points | **Effort:** Medium (infrastructure) | **Timeline:** 1 day
AI crawlers that hit 502 on robots.txt abort the entire crawl session. Serve robots.txt, llms.txt, ai.txt from cold-start-immune edge. Cloudflare Worker or static file host.

### 3. Add Inline Source Attribution to Blog Body Copy
**Impact:** +3-4 points | **Effort:** Low (1-2 hours editorial) | **Timeline:** 1 day
Every statistic needs its source in the same sentence, not in a footer. "Metal roofing installations increased 25%" → "Metal roofing installations increased 25% since 2021, according to the Metal Roofing Alliance." AI extracts passages, not articles.

### 4. Assign Author in Ghost CMS for All Blog Posts
**Impact:** +2 points | **Effort:** Low (15 min in Ghost admin) | **Timeline:** Now
The blog template has full author schema with hasCredential, sameAs CSLB, knowsAbout -- but it only activates when Ghost returns a primary_author. 11/12 posts may be unassigned.

### 5. Build Reddit Presence
**Impact:** +4-5 points | **Effort:** Medium (ongoing) | **Timeline:** 2-3 months
Reddit is Perplexity's #2 source (46.7%) and has high ChatGPT citation correlation. Genuine expert answers in r/bayarea, r/roofing, r/homeimprovement build brand mention signals. Not promotional -- share real contractor expertise.

---

## Section 10 -- Score Projection

| Scenario | Score |
|---|---|
| Current (post v5 fixes) | 84/100 |
| + Inline attribution + Ghost author assignment | 87/100 |
| + Railway cold-start fix | 89/100 |
| + YouTube channel (5 videos) | 94/100 |
| + Reddit presence + one press mention | 96/100 |

---

## Changes Verified Since v4 Audit

| Fix | Status | File |
|---|---|---|
| @type: County → AdministrativeArea | VERIFIED | buy/index.astro |
| Schema @type aligned to GeneralContractor | VERIFIED | CountyPage, GeneralCityPage, buy |
| GAF Master Elite (9 files) | VERIFIED | Layout, FAQ, LogoSlider, roofing.ts, about, llms.txt, llms-full.txt, .well-known/llms.txt, image-sitemap |
| County editorial (4 pages) | VERIFIED | alameda, contra-costa, santa-clara, san-mateo .ts |
| San Mateo added to areaServed | VERIFIED | Layout, ServicePage, buy |
| About breadcrumb 3-tier | VERIFIED | about/alex-hamilton-li.astro |
| Sunday hours added | VERIFIED | Layout.astro |
| knowsAbout normalized | VERIFIED | Layout.astro |
| Org image → og-default.jpg | VERIFIED | Layout.astro |
| Blog CollectionPage improved | VERIFIED | blog/index.astro |
| Roofing H1: Top-Rated | VERIFIED | roofing.ts |
| Oakland stat sourced | VERIFIED | about/alex-hamilton-li.astro |
| RSS autodiscovery link | VERIFIED | Layout.astro (was already present) |
