# Hamilton Exteriors — Full SEO Audit Report

**Audit Date:** April 2, 2026
**URL:** https://hamilton-exteriors-production.up.railway.app/
**Canonical Domain:** hamilton-exteriors.com
**Business Type:** Hybrid SAB — Home Services / Specialty Contractor (Multi-Trade)
**Pages in Sitemap:** 379 URLs
**Stack:** Astro 6.1 + Tailwind v4, static site on Railway

---

## Overall SEO Health Score: 70 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 72 | 15.8 |
| Content Quality | 23% | 71 | 16.3 |
| On-Page SEO | 20% | 65 | 13.0 |
| Schema / Structured Data | 10% | 70 | 7.0 |
| Performance (CWV) | 10% | 76 | 7.6 |
| AI Search Readiness (GEO) | 10% | 74 | 7.4 |
| Images | 5% | 58 | 2.9 |
| **Total** | **100%** | | **70.0** |

---

## Executive Summary

### Top 5 Critical Issues

1. **Custom domain not live** — All schema, canonicals, and sitemaps reference `hamilton-exteriors.com` but site serves from Railway URL. Every SEO signal is blocked until DNS is pointed.
2. **Duplicate meta descriptions at scale** — 150+ city/service pages share the identical generic description. Massive crawl signal dilution.
3. **Pricing dated "as of 2025"** — All three core service pages show stale pricing footnotes (now 15+ months old). Trust-eroding on $15k-$80k decisions.
4. **Review velocity stalled** — Most recent review is 69 days old. Sterling Sky 18-day rule = ranking cliff risk.
5. **Blog "Untitled" draft visible** — Unpublished post showing in blog index damages content quality perception.

### Top 5 Quick Wins

1. Update pricing footnotes from "2025" to "2026" (2-minute fix, 3 files)
2. Remove/fix broken SearchAction URL template pointing to non-existent `/blog?q=` endpoint
3. Add `<link rel="ai-content-declaration" href="/llms.txt">` to `<head>`
4. Fix `ItemList` on `/service-areas` — rename `url` to `item` in ListItem schema
5. Remove duplicate `faqJsonLd` from `/buy` page (mismatched with visible content)

---

## 1. Technical SEO (Score: 72/100)

### Crawlability & Indexability

**Strengths:**
- Astro static site = full SSR. All 379 pages are pre-rendered HTML. No CSR barrier for any crawler.
- robots.txt well-configured: AI search crawlers allowed, training crawlers blocked, `/api/` disallowed.
- GTM deferred to first user interaction — crawlers never trigger tracking scripts.
- Mapbox is interaction-gated — 1.5MB JS cost invisible to crawlers.
- RSS feed at `/blog/rss.xml` for content discovery.

**Issues:**

| Severity | Issue | Details |
|----------|-------|---------|
| Critical | Domain mismatch | All canonical URLs, schema `@id`, sitemap URLs point to `hamilton-exteriors.com` but site resolves at `hamilton-exteriors-production.up.railway.app`. Google cannot reconcile schema with crawled URLs. |
| Critical | Sitemap domain conflict | `sitemap-index.xml` → `sitemap-0.xml` both use `hamilton-exteriors.com` domain. Correct for production intent, but currently unreachable. |
| High | `/buy` missing canonical tag | No explicit canonical URL on the landing page. |
| High | `/siding` missing canonical tag | No explicit canonical on siding service page. |
| Medium | Single sitemap for 379 URLs | All URLs in one `sitemap-0.xml`. Should split by type as site grows. |
| Low | No `X-Robots-Tag` header verification | Verify noindex pages (`/opt-out`, `/terms`) send correct headers. |

### URL Structure

Clean, hierarchical structure:
```
/roofing, /siding, /windows, /adu, /custom-homes, /additions
/service-areas/[county]/[city]/[service]
/blog/[slug]
/buy
```

No URL structure issues. 4-level location hierarchy is best practice for multi-location SABs.

---

## 2. Content Quality (Score: 71/100)

### E-E-A-T Assessment

| Factor | Score | Key Signals |
|--------|-------|-------------|
| Experience | 62/100 | Named reviewers with photos, project gallery, owner byline. Missing: case studies, before/after narratives. |
| Expertise | 78/100 | Industry statistics with named sources (ARMA, ORNL, MRA), product SKUs, Bay Area-specific pricing. Strongest dimension. |
| Authoritativeness | 65/100 | CSLB #1082377, 5 manufacturer certifications. Missing: About page, directory listings, press. |
| Trustworthiness | 80/100 | Physical address, license, phone, privacy policy, CA privacy notice, EEO policy, consent on forms. |
| **Composite E-E-A-T** | **72/100** | |

### Page-by-Page Content Assessment

| Page | Words | Quality | Key Issues |
|------|-------|---------|------------|
| Homepage `/` | ~3,500 | Good | Single H1 confirmed. Generic hero copy. No city mentions in body. |
| `/roofing` | ~3,500-4,000 | Excellent | Best page. Expert descriptions with cited statistics. Pricing "as of 2025." |
| `/siding` | ~3,000 | Excellent | James Hardie HZ5 detail, Remodeling Magazine ROI citation. Pricing "as of 2025." |
| `/windows` | ~4,200 | Excellent | Most comprehensive. Bay Area neighborhood specificity. Pricing "as of 2025." |
| `/buy` | ~1,200 | Adequate | Unattributed claims ("$4,200 savings"). Missing GAF badge despite claiming it. |
| `/adu` | ~3,000 | Good | Service page template. "3-5 day install" badge is wrong for ADUs. |
| `/blog` | 3 posts | Thin | Insufficient for topical authority. "Untitled" draft visible. |
| City pages | ~2,800 | At Risk | Near-duplicate content across 150+ pages. |

### Duplicate Content Risk: MEDIUM-HIGH

Three duplication vectors across city/service pages:
1. **Meta description fallback** — `Layout.astro` line 36 uses default when Ghost CMS field is empty
2. **Hero headline templating** — Only city name swapped in H1
3. **Stats/badge sections** — Identical boilerplate including "3-5 day install" on ADU pages

### AI Citation Readiness: 68/100

**Strong:** Service page passages (134-167 words) with ARMA, ORNL, MRA, CEC citations and specific pricing data.
**Weak:** Blog articles have zero outbound citation links. Only 3 posts total. City pages have uncertain content quality.

---

## 3. On-Page SEO (Score: 65/100)

### Meta Descriptions — Critical Issue

| Severity | Issue |
|----------|-------|
| Critical | **150+ city/service pages share identical description:** "Bay Area exterior remodeling - roofing, siding, windows, and waterproofing. Licensed, bonded, insured. 50-year warranty. 3-5 day installs." |
| High | `/buy` page missing meta description entirely |
| High | `/service-areas` hub missing meta description |
| Medium | Oakland city page confirmed using generic fallback |

### Title Tags — Generally Good

Service page titles are well-crafted with primary keyword + variants + brand. Homepage title targets broad "Design-Build" phrase that may not align with primary commercial queries.

### Internal Linking Gaps

- City pages do NOT cross-link to nearby cities
- Blog has only 3 posts — insufficient link targets
- Footer links all 29 cities from every page (crawlability good, link equity diluted)

---

## 4. Schema & Structured Data (Score: 70/100)

### Implemented (Good)

- `RoofingContractor` with complete NAP, geo, credentials, hours
- `BreadcrumbList` on service and city pages
- `FAQPage` on `/buy` (6 Q&A)
- `BlogPosting` on blog posts with author attribution
- `Service` schema on city pages with `areaServed`
- `WebApplication` on `/buy` for roof scanner
- `AggregateRating` 4.8/5 (50 reviews)
- `hasCredential` with CSLB #1082377

### Issues

| Severity | Issue | File |
|----------|-------|------|
| Critical | FAQPage JSON-LD fires on all pages with FAQ component — no Google rich result eligibility on commercial pages since Aug 2023 | `FAQ.astro` |
| Critical | `/buy` duplicate FAQPage with mismatched truncated answers vs visible HTML | `buy/index.astro` |
| Critical | Service schema on city pages missing `description` | `[...slug].astro` |
| High | `SearchAction` target `/blog?q=` has no handler — may suppress sitelinks | `Layout.astro` |
| High | `BlogPosting` author fallback: org name as `@type: Person` (invalid) | `blog/[slug].astro` |
| High | Logo in schema = `favicon.png` 512x512, not a proper logo | `Layout.astro` |
| High | `CollectionPage` on `/blog` missing `@id`, `breadcrumb`, `isPartOf` | `blog/index.astro` |
| High | `BlogPosting` missing `keywords`, `articleSection`, `isPartOf` | `blog/[slug].astro` |
| Medium | **No Product/Offer schema on pricing tables** — highest-value rich result opportunity | `ServicePage.astro` |
| Medium | City pages missing city-specific `LocalBusiness` schema | `GeneralCityPage.astro` |
| Medium | Google Maps `sameAs` = search URL, not Place ID | `Layout.astro` |
| Medium | `/adu` and `/custom-homes` use `RoofingContractor` — should be `GeneralContractor` | `Layout.astro` |
| Medium | `hasCredential` uses wrong type (`EducationalOccupationalCredential` for contractor license) | `Layout.astro` |
| Low | `ItemList` on `/service-areas` uses `url` instead of `item` | `service-areas/index.astro` |

---

## 5. Performance / Core Web Vitals (Score: 76/100)

### Lighthouse Mobile Scores

| Metric | Value | Score | Status |
|--------|-------|-------|--------|
| Performance | — | **76/100** | Needs Work |
| FCP | 1.1s | 0.82 | Good |
| **LCP** | **3.0s** | **0.32** | **Poor** |
| TBT | 70ms | 0.99 | Excellent |
| CLS | 0 | 1.00 | Excellent |
| Speed Index | 2.3s | 0.50 | Needs Work |
| TTFB | 90ms | 1.00 | Excellent |

### Analysis

**LCP (3.0s) is the sole bottleneck.** With 90ms TTFB and zero CLS, the issue is almost certainly the hero image load time. Fixes:
- Add `fetchpriority="high"` and `loading="eager"` to hero image
- Serve hero in WebP/AVIF with `srcset`
- Add `<link rel="preload">` for above-fold hero
- Reduce hero dimensions/quality for mobile viewport

TBT is excellent (70ms) — Astro's minimal JS hydration working perfectly.

---

## 6. AI Search Readiness / GEO (Score: 74/100)

### Platform Scores

| Platform | Score | Key Factor |
|----------|-------|------------|
| Google AI Overviews | 71/100 | FAQ + citations strong; missing Article schema |
| ChatGPT | 68/100 | llms.txt present; no YouTube; thin reviews |
| Perplexity | 77/100 | Static HTML + RSS + cited stats = strong |
| Bing Copilot | 65/100 | No video; thin blog |
| Claude | 80/100 | ClaudeBot allowed; llms.txt well-formed; SSR |

### llms.txt: Present and Well-Formed

Both `/llms.txt` and `/llms-full.txt` exist. Issues:
- License statement informal (not RSL 1.0 or CC)
- No `<link>` head discovery element
- Windows pricing missing
- ADU/custom home content skeletal

### Brand Signal Gaps

| Signal | Status | Impact |
|--------|--------|--------|
| YouTube | **Missing** | Highest AI citation correlation (~0.737) |
| Wikipedia/Wikidata | Missing | Strongest brand disambiguation |
| Reddit presence | Missing | High-correlation citation pathway |
| Review volume (50) | Low | Below 100+ AI list threshold |

---

## 7. Local SEO (Score: 64/100)

### Dimension Breakdown

| Dimension | Score |
|-----------|-------|
| GBP Signals | 52/100 |
| Reviews & Reputation | 68/100 |
| Local On-Page SEO | 72/100 |
| NAP Consistency & Citations | 58/100 |
| Local Schema Markup | 78/100 |
| Local Link & Authority | 62/100 |

### NAP Consistency

Internally consistent across all schema. **Blocked** by unresolved `hamilton-exteriors.com` domain.

### Review Health

| Metric | Value | Status |
|--------|-------|--------|
| Rating | 4.8/5 | Good |
| Count | 50 | Below par (need 100+) |
| In schema | 4 reviews | Low |
| Recency | 69 days old | At risk (18-day rule) |
| All 5-star shown | 4/4 | Authenticity concern |

### Missing Tier 1 Citations

BBB, Angi, HomeAdvisor, Houzz, Thumbtack, Nextdoor — none confirmed. Only Yelp + social profiles in `sameAs`.

### Location Page Quality

| Layer | Unique Content | Verdict |
|-------|---------------|---------|
| City hubs | H1 + neighborhoods | Borderline passing |
| City-service (150+) | Only city name swap | Near doorway risk |
| County pages | County name only | Thin |

---

## 8. Images (Score: 58/100)

| Severity | Issue |
|----------|-------|
| Medium | OG image = same `/og-default.jpg` for all pages |
| Medium | Project gallery images have no `ImageObject` schema |
| Medium | No infographics for image search traffic |
| Low | Reviewer alt text bare ("Eric W" → should be "Eric W, Hamilton Exteriors customer") |
| Low | Schema logo = favicon, not proper business logo |

---

## Scoring Summary

```
Technical SEO:      72/100  ████████████████████░░░░░░░░  (22% → 15.8)
Content Quality:    71/100  ████████████████████░░░░░░░░  (23% → 16.3)
On-Page SEO:        65/100  ██████████████████░░░░░░░░░░  (20% → 13.0)
Schema:             70/100  ████████████████████░░░░░░░░  (10% →  7.0)
Performance:        76/100  █████████████████████░░░░░░░  (10% →  7.6)
AI Search (GEO):    74/100  █████████████████████░░░░░░░  (10% →  7.4)
Images:             58/100  ████████████████░░░░░░░░░░░░  ( 5% →  2.9)
═══════════════════════════════════════════════════════════
TOTAL:              70/100
```

---

*Generated by SEO Audit Agent — April 2, 2026*
