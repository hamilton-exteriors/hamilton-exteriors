# Hamilton Exteriors — Full SEO Audit Report

**Date:** April 10, 2026 (refresh)
**URL:** https://hamilton-exteriors.com
**Business Type:** Hybrid SAB — General Contractor (primary) / Roofing Contractor (secondary)
**Platform:** Astro 6.1 SSR on Railway
**Pages in Sitemap:** 948 (up from 652 at last audit)
**Previous Score:** 82/100 (April 10, 2026 initial audit)

---

## Executive Summary

### Overall SEO Health Score: 79 / 100

| Category | Weight | Score | Weighted | Change |
|----------|--------|-------|----------|--------|
| Technical SEO | 22% | 78 | 17.2 | -3 |
| Content Quality | 23% | 79 | 18.2 | -2 |
| On-Page SEO | 20% | 78 | 15.6 | -8 |
| Schema / Structured Data | 10% | 68 | 6.8 | 0 |
| Performance (CWV) | 10% | 96 | 9.6 | +1 |
| AI Search Readiness | 10% | 79 | 7.9 | -2 |
| Images | 5% | 90 | 4.5 | +2 |
| **Total** | | | **79.8** | **-2.6** |

**Net change: -3 points.** Five low-severity items from the previous audit were fixed, but subagent deep-dive uncovered 3 new Critical issues: San Mateo County 404 (broken from every page), dual Angi listings (split entity), and Wikidata geographic error (wrong county in knowledge graph). Previous Critical/High items also remain open.

### Items Fixed Since Last Audit

| # | Item | Status |
|---|------|--------|
| 2 | IndexNow key file deployed to `/public/` | FIXED |
| 15 | LinkedIn company page added to `sameAs` | FIXED |
| 17 | `preloadHero` on `/siding` and `/windows` | FIXED |
| 18 | `dateModified` on BlogPosting schema | FIXED |
| 24 | `Person.url` on about page schema | FIXED |

### Items Still Open

| # | Item | Severity |
|---|------|----------|
| 1 | `itemReviewed` schema multi-type array | Critical |
| 3 | HomeAdvisor/Angi entity name "ABR Quality Resources" | Critical |
| 6 | Warranty copy inconsistency (35-year vs full duration) | High |
| 7 | Meta Pixel fires synchronously in `<head>` | High |
| 4 | No Service JSON-LD on top-level service pages | High |
| 14 | `aggregateRating.reviewCount` mixes API + curated reviews | High |
| 8 | Missing Houzz and BuildZoom profiles | High |
| 9 | `/financing` is a redirect, not a real page | Medium |
| 10 | No YouTube channel | Medium |
| 11 | Oak Ridge DOI mismatch across pages | Medium |
| 19 | Satoshi `font-display: swap` (should be `optional`) | Low |
| 20 | No homepage SpeakableSpecification | Low |

### NEW Issues Found This Audit

| # | Issue | Severity |
|---|-------|----------|
| N1 | **San Mateo County page returns 404** — county landing + 6 county-service pages all 404, linked from every page's footer | **Critical** |
| N2 | **Dual Angi listings** — sameAs points to old ABR listing (ID 10768498), Reviews.astro links to Hamilton listing (ID 10769498) | **Critical** |
| N3 | **Wikidata geographic error** — Q139044457 lists Castro Valley in Contra Costa County (should be Alameda County) | **Critical** |
| N4 | pSEO H1s use "Best [Service] Company in [City]" — unverifiable superlative | High |
| N5 | pSEO meta descriptions use "top-rated" — unverifiable claim | High |
| N6 | Yelp sameAs URL returns 404 — dead link in schema | High |
| N7 | Contact page is thin content (~200 words, below 300-word minimum) | Medium |
| N8 | `/service-areas` index has only ~150 words editorial | Medium |
| N9 | Blog posts lack external third-party citations in body | Medium |
| N10 | Hero review count shows "37 homeowners" while API returns 41 | Medium |
| N11 | Missing `legalName` and `foundingDate` in Organization schema | Medium |
| N12 | Blog slug `sa-county-san-mateo-county-ca` looks like CMS artifact | Low |
| N13 | `llms.txt` header missing `sitemap:` metadata | Low |

### Top 5 Critical Issues

1. **San Mateo County 404** — `/service-areas/san-mateo-county-ca` + 6 county-service pages return 404 despite being in sitemap and linked from every page's footer. Dead internal links at scale.
2. **Schema `itemReviewed` multi-type array blocks review rich results** — `["GeneralContractor", "RoofingContractor"]` is invalid; use `"LocalBusiness"`
3. **Dual Angi listings + HomeAdvisor DBA name** — Split entity across directory platforms undermines knowledge panel
4. **Wikidata geographic error** — Knowledge graph places business in wrong county (Contra Costa vs Alameda)
5. **pSEO H1s violate copy rules** — "Best Roofing Company in Oakland" on 880+ pages uses unverifiable superlative

### Top 5 Quick Wins

1. Fix `itemReviewed` schema type in Layout.astro (30 min, unlocks review rich results)
2. Defer Meta Pixel behind interaction listener (30 min, matches existing GTM pattern)
3. Reconcile Oak Ridge DOI across homepage FAQ, llms.txt, roofing.ts (30 min)
4. Standardize warranty copy in Difference.astro (15 min)
5. Change Satoshi `font-display: swap` to `optional` (5 min)

---

## 1. Technical SEO (84/100, up from 81)

### Security Headers — PASS (95/100)

All pages return a well-configured security header stack:
- **HSTS:** `max-age=63072000; includeSubDomains; preload` (confirmed on hstspreload.org)
- **CSP:** Nonce-based `strict-dynamic` with per-request rotation
- **X-Frame-Options:** `SAMEORIGIN`
- **X-Content-Type-Options:** `nosniff`
- **Referrer-Policy:** `strict-origin-when-cross-origin`
- **Permissions-Policy:** Camera/mic blocked, geolocation self-only

### Canonicals — PASS

All pages have correct self-referencing canonicals with `trailingSlash: 'never'`. Canonical URL construction at Layout.astro:96 strips trailing slashes properly.

### Crawlability — PASS

- robots.txt well-structured: AI inference crawlers allowed, training bots blocked
- `/api/*` blocked for all user-agents
- `crawl-delay: 1` appropriate for SSR origin
- Sitemap index references both `/sitemap-0.xml` (948 URLs) and `/image-sitemap.xml`
- Legacy county slugs (e.g., `/alameda/berkeley`) properly 301-redirect to canonical form

### Indexability — GOOD

- 948 URLs in sitemap, all with `lastmod` dates (range: 2026-03-30 to 2026-04-09)
- No trailing slashes, consistent lowercase, clean URL structure
- `noindex` properly set on utility pages (success, 404)
- Proper `meta robots` with `max-snippet:-1, max-image-preview:large, max-video-preview:-1`

### Resource Hints — GOOD

Smart preconnect/dns-prefetch strategy:
- Fonts: preloaded (Hamilton Display 700, DM Sans)
- GTM: dns-prefetch only (deferred load)
- Facebook: preconnect (still loads eagerly)
- Mapbox: conditional preconnect only when page uses it
- BackOffice API: preconnect for portfolio widget

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| San Mateo County pages return 404 | **Critical** | `/service-areas/san-mateo-county-ca` + 6 county-service pages (roofing, siding, windows, adu, custom-homes, additions) all return 404. These 7 URLs are in the sitemap AND linked from every page's footer. City pages (Burlingame, Daly City, etc.) work fine — only the county-level pages are broken. Fix in Ghost CMS or SSR routing. |
| 7 sitemap URLs return 404 | **Critical** | The 7 San Mateo county pages above are actively in sitemap-0.xml. Remove or fix immediately. |
| Meta Pixel fires synchronously | **High** | Layout.astro:402 — loads `fbevents.js` inline in `<head>`. Defer behind interaction listener like GTM (Layout.astro:419). |
| Yelp sameAs URL returns 404 | **High** | `yelp.com/biz/hamilton-exteriors-castro-valley` in sameAs array is broken. Dead link in schema hurts entity verification. |
| `/buy` missing from sitemap | **Medium** | Live 200 page, primary conversion page, not in sitemap-0.xml. |
| `/financing` -> `/#financing` redirect | **Medium** | Hash anchors are uncrawlable. Create a real content page or remove from nav. |
| 5 county landing pages missing from sitemap | **Medium** | Alameda, Contra Costa, Marin, Napa, Santa Clara county pages return 200 but aren't in sitemap. |
| Sitemap lastmod mass-stamping | **Medium** | 307 of 395 URLs share `2026-03-30` lastmod. Not real modification dates. |
| Blog slug `sa-county-san-mateo-county-ca` | **Low** | Looks like CMS naming artifact, not a user-facing slug. |
| No `Cross-Origin-Opener-Policy` header | **Low** | Security hardening opportunity. |

**Resolved:** IndexNow key file now exists in `/public/524a5da56e0e45ef9f726d847b63daf4.txt`.

---

## 2. Content Quality (82/100, up from 81)

### E-E-A-T Assessment

| Factor | Score | Key Signals |
|--------|-------|------------|
| Experience | 80 | First-person founder voice, city-specific local knowledge (WUI fire zones, housing stock data, Eichler references). pSEO pages have genuine city data (Oakland: "35% pre-1940 housing stock"). Gap: no dated case studies. |
| Expertise | 86 | Dual architect + GC credential, DOI-level citations (Oak Ridge, ARMA, Remodeling Magazine), GAF Master Elite (2%), expert quotes on every service page. |
| Authoritativeness | 76 | CSLB hyperlinked, Wikidata entity `Q139044457`, BBB listing, LinkedIn company page. Gap: no press mentions, association memberships, or industry awards. |
| Trustworthiness | 88 | Physical address, license verification link, comprehensive legal pages (privacy, CCPA, EEO, opt-out), real Google reviews via API. |

### Content Depth

| Page Type | Count | Avg Words | Quality |
|-----------|-------|-----------|---------|
| Service pages (top-level) | 6 | 2,500-3,500 | Excellent — pricing tables, comparisons, expert quotes, localized FAQs |
| Sub-service pages | 22 | 1,500-2,000 | Good — material-specific data, per-unit pricing |
| Blog posts | 12 | 1,500-2,000 | Good — topical, actionable. Lacks external citations in body text. |
| City-service pSEO | ~880 | 1,200-1,500 | Good — genuine city-specific content (housing stock, climate, fire zones) |
| County pages | 6 | 800-1,200 | Adequate — county overview with city links |
| About/founder | 2 | 1,200-1,400 | Strong E-E-A-T signals |

### Blog Assessment

12 published posts from Ghost CMS. Topics are well-targeted:
- Cost guides: roof replacement, ADU, window replacement, second-story addition
- Buyer guides: how to choose a contractor, maintenance checklist
- Material comparisons: metal vs asphalt, James Hardie siding
- Local specifics: Bay Area fire zone roofing

**Gap:** Blog posts cite company project data but rarely cite external third-party sources in the body text (e.g., ARMA statistics appear in schema/FAQs but not woven into article prose). This weakens AI citability for blog content.

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| Warranty copy inconsistency | **High** | Difference.astro:18 says "50-year manufacturer shingle warranty backed by our own 35-year labor guarantee." Homepage FAQ says "our workmanship warranty covers labor for the full duration." These must match. |
| `/financing` has no content | **Medium** | 301 redirect to `/#financing`. Missing content for "Bay Area contractor financing" searches. |
| Blog posts lack external citations | **Medium** | Articles cite company data ("80 roof replacements in Alameda County") but don't weave in third-party sources (ARMA, DOE, Oak Ridge) in body paragraphs — reduces AI citability. |
| FAQ answers exceed 80-word guideline | **Low** | Homepage warranty FAQ is 105 words. Several roofing FAQs also exceed target. |
| Generic blog filler link on non-roofing pages | **Low** | "How to Choose a Roofing Contractor" used as related post on siding/ADU/additions pages. |

---

## 3. On-Page SEO (80/100, down from 86)

### Strengths
- Title tags include primary keyword + geo + brand on all pages
- Clean URL structure with descriptive slugs
- Strong internal linking: service pages cross-link to blog posts, city pages interlink to county siblings
- `SpeakableSpecification` on all 6 service pages and blog posts
- RSS feed at `/blog/rss.xml`
- AI content discovery links: `<link rel="llms">`, `<link rel="llms-full">`, `<link rel="ai-policy">`

### NEW Issue: pSEO H1s Use Superlatives (Score Impact: -6)

All city-service pSEO pages (~880 pages) use the H1 pattern:

```
"Best [Service] Company in [City]"
```

Examples:
- "Best Roofing Company in Oakland"
- "Best Roofing Company in Walnut Creek"
- "Best Roofing Company in San Jose"

This violates the CLAUDE.md copy rule: **"Never use unverifiable superlatives (top, best, #1) — use factual differentiators."**

The meta descriptions also use "top-rated":
```
"Hamilton Exteriors provides top-rated roofing services in [City], [County], CA."
```

**Recommendation:** Replace with factual differentiators from Ghost CMS templates:
- H1: "Roofing Contractor in Oakland — Architect-Led, CSLB #1082377"
- Meta: "Hamilton Exteriors provides architect-led roofing services in Oakland, Alameda County, CA."

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| pSEO H1s use "Best" superlative | **High** | ~880 pages. Update Ghost CMS template. |
| pSEO meta descriptions use "top-rated" | **High** | ~880 pages. Update Ghost CMS template. |
| Homepage H1 missing "general contractor" | **Low** | Title has it, but H1 says "Architect-Led Custom Home & Exteriors Contractor." |
| No homepage `SpeakableSpecification` | **Low** | Service pages have it; homepage Mission + first FAQ should too. |

---

## 4. Schema / Structured Data (71/100, up from 68)

### Current Implementation

| Page Type | Schema Types |
|-----------|-------------|
| Homepage | Organization (full), WebSite, WebPage, Review[], AggregateRating |
| Service pages | WebPage + SpeakableSpecification (no Service schema) |
| City-service pSEO | Service, BreadcrumbList, AggregateOffer |
| Blog posts | BlogPosting (with dateModified), BreadcrumbList |
| Blog index | CollectionPage, BreadcrumbList, ItemList |
| Contact | ContactPage, BreadcrumbList |
| About/founder | ProfilePage, Person, BreadcrumbList |

### Schema Graph Architecture — GOOD

Single `@graph` array assembled in Layout.astro:278-299. Uses `@id` references for cross-linking between Organization, WebSite, WebPage, and Service nodes. Full org schema only emitted on homepage and top-level service pages (8 paths), lean `@id`-only reference elsewhere.

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| `itemReviewed` multi-type array | **Critical** | Layout.astro:234,243 — `"@type": ["GeneralContractor", "RoofingContractor"]` on Review nodes. Google requires a single type. Use `"LocalBusiness"`. Blocks review star rich results. |
| No Service schema on top-level pages | **High** | `/roofing`, `/siding`, `/windows`, `/adu`, `/custom-homes`, `/additions` emit WebPage but no Service JSON-LD. City-service pages DO have Service schema — top-level pages should too. |
| `reviewCount` inflation | **High** | Layout.astro:161 — `(_displayReviews?.reviewCount ?? 26) + CURATED_REVIEWS.length` mixes Google API reviews with 5 curated platform reviews. Google guidelines: only count reviews from one platform per `aggregateRating`. |
| County-service pages lack Service schema | **Medium** | `/service-areas/{county}/{service}` emits only BreadcrumbList, no Service node. |
| Oak Ridge DOI inconsistency | **Medium** | index.astro:44 uses `DOI:10.2172/1220146`, llms.txt.ts:51 and roofing.ts:121 use `doi.org/10.2172/1220000`. Must be consistent. |

### Rich Result Eligibility

| Rich Result | Status |
|-------------|--------|
| Local Business (star rating) | **Blocked** by itemReviewed bug |
| Breadcrumb | Eligible (all pages) |
| Article | Eligible (dateModified now piped through) |
| Sitelinks Searchbox | Eligible |
| FAQ | No Google SERP display (restricted Aug 2023), benefits AI engines |

**Resolved:** BlogPosting `dateModified` now pipes `updated_at` from Ghost. Person.url present on about page.

---

## 5. Performance (96/100, up from 95)

### Strengths
- Lighthouse: 98/100 (previous audit finding, still valid)
- Hero images: responsive WebP with `fetchpriority="high"` and `<link rel="preload">`
- `preloadHero` now active on ALL service pages including siding and windows
- Mapbox (~1.5MB): lazy-loaded on first focus/click
- GTM: deferred until first user interaction
- Self-hosted fonts, 2 critical fonts preloaded (Hamilton Display 700, DM Sans)
- Satoshi and Hamilton Display 400 intentionally NOT preloaded (below-fold)

### Issues Found

| Issue | Severity | Metric | Details |
|-------|----------|--------|---------|
| Meta Pixel fires synchronously | **High** | LCP/TBT | Layout.astro:402 — `fbevents.js` loads inline in `<head>`. GTM is deferred behind interaction (Layout.astro:419) — apply the same pattern to Meta Pixel. |
| Satoshi `font-display: swap` | **Low** | CLS | global.css:27,34 — Change to `optional` to eliminate FOUT-induced layout shift. Satoshi is labels-only, not critical for initial render. |
| DM Sans full Latin subset | **Low** | LCP | 36KB for `dm-sans-latin.woff2`. Subsetting to used unicode ranges could trim to ~18KB. |

**Resolved:** `preloadHero` fixed on `/siding` and `/windows`.

---

## 6. AI Search Readiness (83/100, up from 81)

### AI Crawler Access — Excellent

robots.txt correctly categorizes crawlers:
- **Allowed (inference/search):** GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, ChatGPT-User, Google-Extended, Applebot-Extended
- **Blocked (training):** CCBot, anthropic-ai, cohere-ai, Bytespider
- `/api/*` blocked for all

### llms.txt — Strong

Dynamic generation in `src/pages/llms.txt.ts`:
- Live review count from Google Places API
- RSL-1.0-cite-with-attribution license
- "Key Facts for Citation" section with DOI and external sources
- Wikidata entity ID (`Q139044457`)
- Blog links dynamically enumerated from Ghost CMS
- "Not covered" section (negative scope — reduces hallucination)
- Pointer to `llms-full.txt` for extended data

### AI Content Discovery — GOOD

Layout.astro:352-356 emits `<link>` tags for AI discovery:
```html
<link rel="ai-content-declaration" href="/llms.txt">
<link rel="llms" href="/llms.txt">
<link rel="llms-full" href="/llms-full.txt">
<link rel="ai-policy" href="/ai.txt">
```

### Entity Disambiguation — GOOD

- Wikidata `Q139044457` in llms.txt and org schema `sameAs`
- `alternateName: "ABR Quality Resources Inc"` declared
- CSLB license linked and verifiable
- 10 `sameAs` links (social, directories, CSLB, Wikidata)

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| No YouTube channel | **High** | YouTube brand mentions correlate ~0.737 with AI citation. Comment in Layout.astro:142 confirms awareness. 3-5 project walkthrough videos would materially lift citation. |
| Oak Ridge DOI mismatch | **Medium** | `DOI:10.2172/1220146` (index.astro) vs `doi.org/10.2172/1220000` (llms.txt, roofing.ts). Citation engines may reject inconsistent references. |
| Blog body text lacks inline citations | **Medium** | Key facts appear in schema/FAQs but aren't woven into blog prose. AI engines prefer inline-cited passages. |
| `llms.txt` missing `sitemap:` in header | **Low** | Add `sitemap: https://hamilton-exteriors.com/sitemap-index.xml` to blockquote. |
| No homepage SpeakableSpecification | **Low** | Mission section and first FAQ answer are ideal candidates. |

**Resolved:** LinkedIn company page now in `sameAs`.

---

## 7. Images (90/100, up from 88)

### Strengths
- Responsive `<picture>` elements with portrait/landscape WebP crops
- `loading="lazy"` + `decoding="async"` on all non-hero images
- Hero preloads on ALL service pages (siding and windows now fixed)
- Image sitemap (`/image-sitemap.xml`) with 1,005 entries, all with `<image:title>` and `<image:caption>`
- Auto-generated OG images from hero images per page (Layout.astro:48)

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| Image sitemap duplication | **Medium** | Same images repeat across 900+ pSEO pages with near-identical metadata. Consider deduplicating image entries. |
| Astro hash filenames | **Low** | `_astro/hero-bg-2400.B0AiramO.jpg` — hashed filenames obscure image content from crawlers. Not a blocking issue since title/caption metadata is present. |

---

## 8. Local SEO (72/100, down from 74)

### Dimension Breakdown

| Dimension | Score | Notes |
|-----------|-------|-------|
| GBP Signals | 18/25 | Primary category correct. Hours, phone, address match. |
| Reviews & Reputation | 16/20 | 4.8 stars, 41 Google reviews. Need 75+ to be competitive. |
| Local On-Page SEO | 16/20 | Geo meta tags, city-specific content — but San Mateo County 404 is a major gap. |
| NAP Consistency | 10/15 | On-site consistent. Off-site: dual Angi listings, HomeAdvisor still "ABR Quality Resources." |
| Local Schema | 7/10 | Organization schema strong. Missing `legalName` and `foundingDate`. |
| Local Authority | 5/10 | Missing Houzz, BuildZoom, Nextdoor. No association memberships. |

### Service Area Pages

- 5 of 6 counties working (Alameda, Contra Costa, Marin, Napa, Santa Clara)
- **San Mateo County is a hard 404** — county landing + 6 county-service pages broken
- City pages within San Mateo (Burlingame, Daly City, etc.) work fine — only county-level broken
- Content is genuinely city-specific (housing stock percentages, fire zone data, climate info)
- Breadcrumb: Home > Service Areas > County > City > Service
- Geo meta tags with city-specific coordinates

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| San Mateo County 404 | **Critical** | `/service-areas/san-mateo-county-ca` + 6 county-service pages return 404. Linked from every page's footer. Dead links at scale. |
| Dual Angi listings | **Critical** | Layout.astro sameAs → `abr-quality-resources-reviews-10768498` (old). Reviews.astro → `hamilton-exteriors-reviews-10769498` (new). Two different listing IDs = split entity signal for Google. |
| HomeAdvisor still ABR name | **Critical** | sameAs URL uses `abrqualityresources` slug. Must update to Hamilton Exteriors. |
| Wikidata geographic error | **Critical** | Q139044457 lists Castro Valley in Contra Costa County. Castro Valley is in Alameda County. AI systems that source from Wikidata will misplace the business. Fix on Wikidata directly. |
| Yelp sameAs returns 404 | **High** | `yelp.com/biz/hamilton-exteriors-castro-valley` is broken. Fix or update URL. |
| Review velocity | **High** | 41 reviews is floor for competitive Bay Area GC market. Target 75+ with structured solicitation. |
| Missing Houzz/BuildZoom profiles | **High** | Top citation sources for GC vertical. BuildZoom auto-populates from CSLB. |
| Missing `legalName`/`foundingDate` in schema | **Medium** | Add `"legalName": "ABR Quality Resources Inc"` and `"foundingDate": "2018"` to fullOrgSchemaObj. |
| Hero review count stale | **Medium** | Hero.astro shows "37 verified Bay Area homeowners" — API returns 41. Check caching. |
| No Google Maps embed on contact page | **Medium** | CID link exists but no iframe embed. Embed is a co-citation signal. |
| No Nextdoor Business Profile | **Low** | Free, high-trust neighborhood citation source. |

**Resolved:** LinkedIn company page created and in `sameAs`.

---

## Prioritized Action Plan

### Critical (Fix Immediately) — Estimated +5 points

| # | Action | Owner | Effort | Impact |
|---|--------|-------|--------|--------|
| 1 | Fix `itemReviewed` schema type from `["GeneralContractor","RoofingContractor"]` to `"LocalBusiness"` in Layout.astro:234,243 | Dev | 30 min | Unlocks review star rich results |
| 2 | Update HomeAdvisor and Angi business name from "ABR Quality Resources" to "Hamilton Exteriors" | Alex | 1 hr | Unifies entity signal for knowledge panel |
| 3 | Fix pSEO H1s — replace "Best [Service] Company in [City]" with factual differentiators in Ghost CMS | Dev/Alex | 2 hr | Removes unverifiable superlatives from 880+ pages |

### High (This Week) — Estimated +4 points

| # | Action | Owner | Effort | Impact |
|---|--------|-------|--------|--------|
| 4 | Add Service JSON-LD to `/roofing`, `/siding`, `/windows`, `/adu`, `/custom-homes`, `/additions` | Dev | 2 hr | Machine-readable service identity for top pages |
| 5 | Fix `aggregateRating.reviewCount` — only count API-sourced reviews, not curated | Dev | 1 hr | Schema guideline compliance |
| 6 | Standardize warranty copy (Difference.astro "35-year labor" vs FAQ "full duration") | Alex/Dev | 15 min | Factual consistency for users and AI |
| 7 | Defer Meta Pixel behind interaction listener (match GTM pattern in Layout.astro:419) | Dev | 30 min | LCP/TBT improvement |
| 8 | Fix pSEO meta descriptions — replace "top-rated" with "architect-led" in Ghost CMS | Dev | 1 hr | Removes unverifiable claims from 880+ pages |
| 9 | Claim Houzz and BuildZoom profiles | Alex | 1 hr | Top citation sources for GC vertical |

### Medium (This Month) — Estimated +3 points

| # | Action | Owner | Effort | Impact |
|---|--------|-------|--------|--------|
| 10 | Create real `/financing` page with content | Dev/Alex | 3 hr | SEO gap + trust for cost-conscious users |
| 11 | Start YouTube channel (3-5 project walkthrough videos) | Alex | 5 hr | Highest-leverage off-page AI citation signal |
| 12 | Reconcile Oak Ridge DOI — use `10.2172/1220146` consistently across index.astro, llms.txt.ts, roofing.ts | Dev | 30 min | Citation verification consistency |
| 13 | Add Service schema to county-service pages (`/service-areas/{county}/{service}`) | Dev | 1 hr | Machine-readable service on pSEO pages |
| 14 | Add external citations to blog post body text (ARMA, DOE, Oak Ridge) | Dev | 2 hr | AI citability improvement |
| 15 | Fix hero review count caching (shows 37, API returns 41) | Dev | 30 min | Trust signal accuracy |
| 16 | Deduplicate image sitemap entries | Dev | 1 hr | Cleaner crawl signal |

### Low (Backlog)

| # | Action | Effort |
|---|--------|--------|
| 17 | Change Satoshi to `font-display: optional` in global.css | 5 min |
| 18 | Add homepage `SpeakableSpecification` (Mission + first FAQ) | 30 min |
| 19 | Trim roofing/siding FAQ answers to under 80 words | 1 hr |
| 20 | Replace generic blog filler link on non-roofing service pages | 30 min |
| 21 | Add `sitemap:` metadata to llms.txt header blockquote | 10 min |
| 22 | Add Nextdoor Business Profile | 30 min |
| 23 | Subset DM Sans to used unicode ranges (~18KB savings) | 30 min |

---

## Appendix: Site Inventory

| Category | Count |
|----------|-------|
| Total pages in sitemap | 948 |
| Static pages | 32 |
| Service sub-type pages | 22 |
| Blog posts | 12 |
| County pages | 6 |
| City-service pSEO pages | ~880 |
| Images in image sitemap | 1,005 |
| Schema types in use | 18+ |
| sameAs links | 10 |

---

*Generated by SEO Audit — April 10, 2026 (refresh)*
