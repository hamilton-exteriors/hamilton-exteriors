# Hamilton Exteriors — Full SEO Audit Report

**Date:** April 5, 2026
**Site:** https://hamilton-exteriors.com
**Business:** Bay Area Design-Build & Exteriors Contractor
**Stack:** Astro 6.1 + Tailwind v4, SSR on Railway | Ghost CMS (headless)
**Pages indexed:** 402 URLs in sitemap

---

## Overall SEO Health Score: 75 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 74 | 16.3 |
| Content Quality | 23% | 63 | 14.5 |
| On-Page SEO | 20% | 82 | 16.4 |
| Schema / Structured Data | 10% | 75 | 7.5 |
| Performance (CWV) | 10% | 92 | 9.2 |
| AI Search Readiness | 10% | 74 | 7.4 |
| Images | 5% | 72 | 3.6 |
| **TOTAL** | | | **74.9** |

### Supplementary Scores

| Dimension | Score |
|-----------|-------|
| Local SEO | 74 / 100 |
| GEO / AI Readiness | 74 / 100 |
| E-E-A-T | 63 / 100 |
| AI Citation Readiness | 58 / 100 |

---

## Executive Summary

### Top 5 Critical Issues

1. **Identical FAQs across all 400+ pages** — Same 5 generic questions and answers on every service page and every city page. Google QRG flags this as low-quality templated content. This is the single biggest SEO risk on the site.

2. **Rating inconsistency** — Hero badge says "rated 5/5 based on 50 reviews" while the reviews section shows "4.8/5.0" — visible on every page. Factual contradictions directly impact trustworthiness scoring.

3. **Duplicate Service schema `@id` on /roofing** — Two Service blocks share the same `@id`, creating conflicting entity definitions. Google will merge or ignore one.

4. **Obsolete HowTo schema on /roofing and city+service pages** — Google removed HowTo rich results in September 2023. These blocks produce zero benefit and add page weight.

5. **San Mateo County missing from `areaServed` schema** — 5 of 6 counties listed in LocalBusiness schema. San Mateo has city pages live but is omitted from the entity graph.

### Top 5 Quick Wins

1. **Fix rating badge** — Change "5/5" to "4.8/5" in hero badge (1 hour, all pages)
2. **Update `reviewCount`** — Schema says 50, site shows 52 (10 minutes)
3. **Add San Mateo to `areaServed`** — One schema update (10 minutes)
4. **Remove HowTo schema blocks** — Dead weight removal (30 minutes)
5. **Fix duplicate Service `@id`** — Remove one of two blocks on /roofing (15 minutes)

---

## 1. Technical SEO — 74/100

### Lighthouse Scores (260 pages tested)

| Metric | Average | Min | Assessment |
|--------|---------|-----|------------|
| Performance | 92 | 86 | Excellent |
| Accessibility | 97 | 96 | Excellent |
| Best Practices | 100 | 100 | Perfect |
| SEO | 100 | 100 | Perfect |

### Key Pages

| Page | Perf | A11y | BP | SEO |
|------|------|------|----|-----|
| Homepage | 96 | 96 | 100 | 100 |
| /roofing | 93 | 97 | 100 | 100 |
| /siding | 94 | 97 | 100 | 100 |
| /windows | 97 | 97 | 100 | 100 |
| /blog | 100 | 100 | 100 | 100 |
| /service-areas | 98 | 100 | 100 | 100 |
| Oakland city page | 96 | 100 | 100 | 100 |
| Oakland/roofing | 91 | 96 | 100 | 100 |
| /buy | 0 | 0 | 0 | 0 |

**Note:** `/buy` page scores 0 across all metrics — likely requires client-side rendering that Lighthouse can't process, or the page is broken.

### Crawlability

- **robots.txt:** Well-architected with intent-based AI crawler grouping. AI search crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) allowed. Training scrapers (CCBot, anthropic-ai, cohere-ai, Bytespider) blocked. `/api/` protected.
- **Sitemaps:** sitemap-index.xml references sitemap-0.xml (402 URLs) and image-sitemap.xml (28 images). No `lastmod` on sitemap index itself.
- **Astro SSR:** Full HTML delivered to crawlers — no JavaScript rendering issues. Ideal for AI crawlers that don't execute JS.

### Indexability Issues

**HIGH — Blog meta description encoding bug**
The em-dash (`–`) in the roof cost blog meta description renders as `\uFFFD` (replacement character). This garbled character will appear in SERPs. Fix: ensure Ghost CMS content is decoded as UTF-8 throughout the Astro pipeline, or normalize em-dashes to regular hyphens in the description template.

**HIGH — Meta description apostrophe encoding**
Pages with possessives in meta descriptions (`Bay Area's`, `Oakland's`) may cause parser issues. While browsers handle it fine, encode apostrophes as `&#39;` in meta description attributes to guarantee clean parsing across all consumers.

**HIGH — No www redirect**
`www.hamilton-exteriors.com` does not resolve (connection refused). Should 301 to `https://hamilton-exteriors.com`. Users typing www get nothing, and any backlinks using www lose all equity.

**HIGH — No `/services/*` redirects**
`/services/roofing` and `/services/siding` return 404. If any external links use the `/services/` prefix, link equity is lost. Add 301 redirects: `/services/roofing` -> `/roofing`, `/services/siding` -> `/siding`.

**MEDIUM — Over-length title tags**
- About page: 85 chars (target: 55-60)
- Roofing: 66 chars
- Siding: 63 chars
Google will truncate these in SERPs.

**MEDIUM — About page meta description at 169 chars**
Exceeds 160-char soft limit. Will be truncated mid-sentence.

### Security Headers — 88/100

- HSTS: `max-age=63072000; includeSubDomains; preload` (2 years + preload) — excellent
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=(self)
- Comprehensive CSP covering GTM, GA4, Mapbox, Facebook, DoubleClick
- **Note:** CSP contains `'unsafe-inline'` for script-src and style-src (common with GTM, but weakens XSS protection)

### IndexNow — Not Implemented

No IndexNow protocol detected. This means Bing, Yandex, and Naver don't get instant URL notifications when pages are published/updated. Simple one-time setup with high ongoing crawl efficiency benefit.

### Gaps

- **San Mateo County pages not in Lighthouse batch** — 0 of ~35 expected pages were tested
- **`/buy` page broken in testing** — Scores 0/0/0/0
- **No `lastmod` in sitemap index** — Minor, but helps crawl budget prioritization
- **Service areas index says "5 Counties. 25+ Cities."** — Should be "6 Counties. 47+ Cities."
- **Homepage HTML 158KB, roofing 198KB** — Large SSR payloads; verify Brotli compression is active

---

## 2. Content Quality — 63/100

### E-E-A-T Breakdown

| Factor | Score | Key Issue |
|--------|-------|-----------|
| Experience | 12/20 | No named staff, no case studies, no before/after projects |
| Expertise | 17/25 | Strong technical depth but no named expert authors |
| Authoritativeness | 14/25 | Only 52 reviews, no press coverage, blog has 13 posts |
| Trustworthiness | 20/30 | Rating inconsistency (5/5 vs 4.8), no team photos |

### Cross-Cutting Content Issues

**1. Identical FAQs (CRITICAL)**
Every page uses the same 5 generic questions:
- How does pricing work — any hidden fees?
- Will you beat a competitor's quote?
- How does billing and financing work?
- How long does a typical project take?
- What warranties do you offer?

None are page-specific. A roofing page should answer roofing questions. An Oakland page should answer Oakland permitting questions. This pattern repeats across 400+ pages.

**2. Rating Inconsistency (HIGH)**
Hero badge: "rated 5/5 based on 50 reviews"
Reviews section: "4.8 Rated 4.8/5.0"
Schema: `reviewCount: 50` (should be 52)

Three different numbers on the same page.

**3. No Named Authors (MEDIUM)**
No individual at Hamilton Exteriors is named on any page. Blog articles have no bylines. For a $15k-$80k purchase, anonymous content reduces trust. The about page for Alex Hamilton Li exists but is not linked from blog posts or service pages.

**4. No Windows Pricing Table (MEDIUM)**
Roofing has 10 SKUs. Siding has 7 SKUs. Windows has none. Inconsistent experience that weakens the price-conscious buyer segment.

### Content Depth by Section

| Section | Pages | Avg Words | Unique % | Assessment |
|---------|-------|-----------|----------|------------|
| Service pages | 6 | ~2,400 | ~85% | Strong — technical depth, sourced stats |
| Blog posts | 13 | ~2,100 | ~90% | Good — locally specific, well-researched |
| City pages | 47 | ~1,700 | ~65% | Adequate — real local data differentiates |
| City+service | 282 | ~1,500 | ~60% | Risk zone — FAQ duplication hurts |
| County pages | 6 | ~1,200 | ~70% | Adequate |

### What's Working Well

- Service pages cite third-party sources (ARMA, Metal Roofing Alliance, Oak Ridge National Lab, Remodeling Magazine, Census Bureau)
- Bay Area neighborhood references are genuine and specific (Rockridge, Temescal, Montclair, Claremont, Sunset District, Alameda Gold Coast)
- Pricing tables with "Q1 2026, Castro Valley, CA" freshness signals
- WUI fire zone content at the neighborhood level — genuine local differentiator
- Blog "Ground Up" branding is distinctive

---

## 3. On-Page SEO — 82/100

### Title Tags & Meta Descriptions

- **Homepage:** "Bay Area Design-Build & Exteriors Contractor | Hamilton Exteriors" — Good, unique, under 60 chars
- **Service pages:** Well-targeted (e.g., "Reliable Roofing in Oakland, CA | Hamilton Exteriors")
- **Meta descriptions:** Present on all pages tested, include CTAs and differentiators

### Heading Structure

- H1 present on all pages
- Service pages use H2/H3 hierarchy correctly
- **Issue:** Some H2s are conversion-oriented ("Get a FREE ROOF INSPECTION") rather than keyword-targeted
- **Issue:** Long blog sections lack H3 subheadings — passages run 300-400 words without internal breaks

### Internal Linking

| Strength | Detail |
|----------|--------|
| Footer links | All city pages linked from footer |
| Breadcrumbs | Implemented on all pages with BreadcrumbList schema |
| Service cross-links | Service pages link to county-level sub-pages |

| Gap | Detail |
|-----|--------|
| No blog-to-service links | Roofing page doesn't link to roof cost blog post |
| No homepage-to-blog link | Blog gets zero homepage authority transfer |
| No cross-service links | Roofing doesn't suggest Siding for multi-project homeowners |
| 2 broken URL patterns | Oakland page links to `/service-areas/alameda/hayward` instead of `/service-areas/alameda-county-ca/hayward-ca` |

### Keyword Targeting

| Page | Primary Term | Density | Assessment |
|------|-------------|---------|------------|
| Homepage | "bay area" | 0.78% | Healthy |
| Roofing | "roofing" | 1.42% | Healthy |
| Roofing | "roof replacement" | 0.17% | Underused — high search volume term |
| Siding | "siding" | 1.67% | Strong |
| Windows | "milgard" | 0.15% | Under-leveraged local brand |

---

## 4. Schema / Structured Data — 75/100

### Current Implementation

| Page Type | Schema Present | Status |
|-----------|---------------|--------|
| Homepage | LocalBusiness (RoofingContractor+GeneralContractor), WebSite+SearchAction, ImageGallery (x3), FAQPage | Excellent |
| Service pages | BreadcrumbList, WebPage, Service, LocalBusiness (full copy), HowTo, ImageGallery (x3), FAQPage | Good with issues |
| Blog posts | BlogPosting, BreadcrumbList, FAQPage, LocalBusiness (stub) | Good with gaps |
| About page | BreadcrumbList, ProfilePage+Person, LocalBusiness (stub) | Strong E-E-A-T |
| Blog index | CollectionPage, ItemList, LocalBusiness (stub) | Good |
| City+service pages | Service, BreadcrumbList, HowTo, FAQPage | Good with dead weight |

### Critical Issues

1. **Duplicate Service `@id` on /roofing** — Two Service blocks share `https://hamilton-exteriors.com/roofing#service`. Remove one (keep the more complete block with `aggregateRating` and `dateModified`).

2. **HowTo schema (dead)** — Present on /roofing and city+service pages. Google removed HowTo rich results Sept 2023. Remove all instances.

### High Priority

3. **LocalBusiness stub blocks** — Blog posts, about page, and blog index carry empty shells (`@type` + `@id` but zero properties). Replace with `@id`-only reference or remove.

4. **`areaServed` missing San Mateo County** — 5 of 6 counties in schema. San Mateo has live pages but isn't declared.

5. **`reviewCount` stale** — Schema says 50, site shows 52.

### Missing Opportunities

- BlogPosting missing `@id` and `name` on all blog posts
- BlogPosting only has 16:9 image (Google prefers 3 ratios: 16:9, 4:3, 1:1)
- Person `image` on about page uses default OG image instead of actual headshot
- `areaServed` type inconsistency: LocalBusiness uses `AdministrativeArea`, Service uses `County`
- No `@id` on BreadcrumbList, ImageGallery, or FAQPage blocks

### What's Working Well

- Homepage LocalBusiness is genuinely well-built — `hasCredential` with CSLB, `founder` linked to Person entity, `hasOfferCatalog` with all services, `paymentAccepted`, `knowsAbout`, `additionalType` with Wikipedia URIs
- Blog author E-E-A-T chain: Person -> hasCredential -> CSLB + LinkedIn -> worksFor -> business entity
- ProfilePage + Person on about page is exactly what Google E-E-A-T docs recommend
- `dateModified` is being actively updated on content pages

---

## 5. Performance (CWV) — 92/100

### Site-Wide Lighthouse Averages (260 pages)

| Metric | Score |
|--------|-------|
| Performance | 92 |
| Accessibility | 97 |
| Best Practices | 100 |
| SEO | 100 |

### Performance Distribution

- **90-100:** ~75% of pages (excellent)
- **86-89:** ~25% of pages (good)
- **Below 86:** 0 pages (excluding /buy which is broken)
- **Lowest score:** 86 (1 blog post — metal-roof-vs-asphalt-shingles)

### Architecture Advantages

- Astro SSR delivers full HTML — zero JS rendering penalty
- Tailwind v4 produces minimal CSS bundle
- No SPA hydration overhead
- Ghost CMS is headless — no frontend bloat from CMS

### Concerns

- **3 custom fonts** (THE BOLD FONT, DM Sans, Satoshi) ��� font loading strategy needs verification
- **Mapbox + GTM** — third-party script impact on homepage/service pages
- **No San Mateo County data** — 35+ pages untested
- **/buy page broken** — 0/0/0/0 scores

---

## 6. AI Search Readiness — 74/100

### AI Crawler Access

| Crawler | Status | Surface |
|---------|--------|---------|
| GPTBot | Allowed | ChatGPT search |
| OAI-SearchBot | Allowed | ChatGPT search |
| ClaudeBot | Allowed | Claude search |
| PerplexityBot | Allowed | Perplexity |
| Google-Extended | Allowed | AI Overviews |
| Applebot-Extended | Allowed | Apple Intelligence |
| bingbot | Allowed | Copilot |
| CCBot | Blocked | Training only (correct) |
| anthropic-ai | Blocked | Training only (correct) |

**Verdict:** Correctly architected — allow search/inference, block training scrapers.

### llms.txt

- **Present** at `/llms.txt` with RSL-1.0 license
- **llms-full.txt** also present with detailed pricing, services, FAQs
- **Gap:** Not spec-compliant format (prose, not heading+link structure)
- **Gap:** No `Last-Updated:` field — AI can't assess data freshness
- **Gap:** No page-level URL mapping (no links from llms.txt to source pages)

### Platform Scores

| Platform | Score | Top Gap |
|----------|-------|---------|
| Google AI Overviews | 76 | CTA-heavy hero before substantive content |
| Perplexity | 78 | No external press/media mentions |
| ChatGPT | 71 | No YouTube channel (highest correlation signal) |
| Bing Copilot | 72 | LinkedIn depth unknown |

### Biggest Gap: No YouTube Channel

YouTube brand mentions have the strongest measured correlation with AI citation (~0.737). Three videos would create significant impact:
- Bay Area roof replacement walkthrough
- Roof cost breakdown (mirrors top blog post)
- James Hardie vs vinyl siding comparison

---

## 7. Images — 72/100

### Image Sitemap

- 28 images across 10 URLs
- 100% have title and caption tags
- Some captions truncated with ellipses
- One title/caption mismatch (wood filename labeled as stucco)

### Gaps

- Only 28 images in sitemap for a 402-page site — massive under-coverage
- No project portfolio images geo-tagged to specific cities
- No before/after photography
- Blog post hero images are stock photos (Pexels sourced)
- Person `image` in schema uses OG default instead of actual headshot

---

## 8. Local SEO — 74/100

### Scores by Dimension

| Dimension | Score |
|-----------|-------|
| GBP Signals | 68 |
| Reviews & Reputation | 82 |
| Local On-Page SEO | 85 |
| NAP Consistency | 72 |
| Local Schema | 75 |
| Local Links/Authority | 53 |

### NAP Consistency

NAP is consistent across all verifiable sources (homepage, city pages, BBB listing). Phone format differences (E.164 in schema vs local format on page) are fine — Google normalizes both.

### Critical Local Issues

1. **Yelp `sameAs` URL returns 404** — `yelp.com/biz/hamilton-exteriors-castro-valley` is dead. This is a broken entity graph link in schema. Either claim/fix the Yelp listing or update the URL.

2. **Review velocity concern** — Last schema-embedded review dated Jan 22, 2026 (73 days ago). Per Sterling Sky research, rankings can cliff if no new reviews for 18+ days. Needs immediate GBP investigation.

3. **GBP primary category unverified** — If set to "General Contractor" instead of "Roofing Contractor," the site is leaving significant ranking potential on the table. Primary category is the #1 local ranking factor.

### City/Service Area Pages — Not Doorway Pages

The pSEO pages pass the thin content test:
- Unique neighborhood references (4-5 named neighborhoods per city)
- City-specific median home values
- Permit authority names and phone numbers
- WUI fire zone data
- ~65% unique content per page
- 1,500-3,200 words per page

**However:** The identical FAQ across all pages is the weakest link. Every city page has the same 5 generic questions.

### Missing Citations

| Directory | Status | Priority |
|-----------|--------|----------|
| Thumbtack | Unknown | HIGH — integrates with ChatGPT, Alexa, Zillow |
| Nextdoor | Unknown | HIGH — neighbor recommendations |
| Houzz | Unknown | MEDIUM — premium Bay Area market |
| GAF/Owens Corning directories | Unknown | HIGH — dofollow manufacturer links |
| NRCA/WSRCA | Unknown | MEDIUM — industry association |
| Castro Valley Chamber | Unknown | MEDIUM — local authority signal |

---

## 9. Visual & Mobile

### Desktop (1440px)

All pages render cleanly. Strong above-the-fold experience:
- Homepage: Hero + trust signals + lead form visible
- Roofing: Hero + form + "Updated April 2026" datestamp visible
- Blog: Clean article header with author credentials

### Mobile (390px)

| Issue | Severity | Pages Affected |
|-------|----------|----------------|
| Lead form CTA button below fold | HIGH | Homepage, all service pages |
| No conversion CTA on blog posts | MEDIUM | All 13 blog posts |
| Mobile nav toggle visibility unclear | LOW | All pages |

**Recommendation:** Add a sticky bottom CTA bar on mobile ("Get a Free Quote" tap target) or reduce form field padding to push the yellow button above fold.

---

## Priority Action Plan

### Critical (Fix Immediately)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | Write page-specific FAQs for each service page and city page template | Eliminates the biggest content quality risk | 2-3 days |
| 2 | Fix rating badge from "5/5" to "4.8/5" across all pages | Removes factual contradiction | 1 hour |
| 3 | Remove duplicate Service `@id` on /roofing | Fixes schema conflict | 15 min |
| 4 | Remove HowTo schema from all pages | Removes dead weight | 30 min |

### High (Fix Within 1 Week)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 5 | Add San Mateo County to `areaServed` schema | Completes entity graph | 10 min |
| 6 | Update `reviewCount` from 50 to 52 in schema | Fixes data inconsistency | 10 min |
| 7 | Fix Yelp `sameAs` URL (404) | Repairs broken entity link | 1 hour |
| 8 | Fix "5 Counties. 25+ Cities." on /service-areas index | Factual accuracy | 10 min |
| 9 | Fix 2 broken internal links on Oakland page | Prevents 404 crawl errors | 30 min |
| 10 | Add windows pricing table | Matches roofing/siding parity | 2 hours |
| 11 | Link blog posts from service pages + homepage | Passes authority to editorial content | 1 hour |
| 12 | Replace LocalBusiness stub blocks with `@id`-only references | Cleaner entity graph | 30 min |
| 13 | Investigate review velocity on GBP | Prevents ranking cliff | 1 hour |

### Medium (Fix Within 1 Month)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 14 | Add named author bylines to all blog posts + service pages | E-E-A-T boost | 2 hours |
| 15 | Add `BlogPosting @id` and `name` to all blog posts | Schema completeness | 1 hour |
| 16 | Restructure llms.txt to spec-compliant format with URLs | AI citation improvement | 2-3 hours |
| 17 | Add H3 subheadings to long blog sections | Improves AI passage extraction | 1-2 hours/post |
| 18 | Add Google Maps iframe embed to city pages | GBP association signal | 2 hours |
| 19 | Claim Thumbtack + Nextdoor profiles | AI citation sources + local signals | 2 hours |
| 20 | Add sticky mobile CTA bar | Mobile conversion improvement | 2 hours |
| 21 | Confirm GBP primary category is "Roofing Contractor" | #1 local ranking factor | 10 min |
| 22 | Standardize `areaServed` type to `County` everywhere | Schema consistency | 30 min |
| 23 | Investigate /buy page (scoring 0/0/0/0) | Fix broken page | 1-2 hours |

### Low (Backlog)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 24 | Launch YouTube channel (3 videos) | Highest AI citation correlation signal | 2-3 weeks |
| 25 | Apply for GAF Master Elite / Owens Corning Platinum | Dofollow manufacturer links | 2-4 weeks |
| 26 | Seek one external media mention | Independent citation node | 2-4 weeks |
| 27 | Add multi-ratio images to BlogPosting schema | Rich result eligibility | 2 hours |
| 28 | Add `@id` to all BreadcrumbList, FAQPage, ImageGallery blocks | Entity graph completeness | 2 hours |
| 29 | Build blog content cadence (2/month across all services) | Long-term authority | Ongoing |
| 30 | Add before/after project photos geo-tagged to cities | Local experience signals | Ongoing |

---

*Audit compiled April 5, 2026. Based on 7 specialist analyses: Technical SEO, Content Quality/E-E-A-T, Schema/Structured Data, AI Search Readiness (GEO), Local SEO, Performance (CWV), and Visual/Mobile. Lighthouse data from 260-page batch run. Live page fetches for representative pages across all sections.*
