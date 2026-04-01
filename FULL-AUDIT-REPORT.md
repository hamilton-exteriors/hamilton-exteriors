# Hamilton Exteriors — Full SEO Audit Report

**Date:** 2026-04-01
**URL audited:** hamilton-exteriors-production.up.railway.app
**Canonical domain:** hamilton-exteriors.com (DNS not yet pointed)
**Business type:** Service Area Business (SAB) — Roofing Contractor
**Stack:** Astro 6.1 + Tailwind v4 (static), Railway deployment
**Pages crawled:** 40+ (homepage, 6 service pages, 5 county pages, 29 city pages, blog, legal pages)

---

## Overall SEO Health Score: 64 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 62 | 13.6 |
| Content Quality | 23% | 58 | 13.3 |
| On-Page SEO | 20% | 65 | 13.0 |
| Schema / Structured Data | 10% | 55 | 5.5 |
| Performance (CWV) | 10% | 78 | 7.8 |
| AI Search Readiness | 10% | 74 | 7.4 |
| Images | 5% | 80 | 4.0 |
| **TOTAL** | **100%** | | **64.6** |

### Bonus: Local SEO Score: 67 / 100 (not weighted into overall — separate dimension)

---

## Executive Summary

### Top 5 Critical Issues

1. **Ghost CMS content leaking into /blog** — 10 service-area posts indexed as blog posts + 1 "Untitled" draft live. Creates duplicate content and quality signals.
2. **Sitemap broken** — `/sitemap.xml` returns 404 (exists at `/sitemap-index.xml`). Image sitemap referenced in robots.txt doesn't exist.
3. **Schema encoding bug** — Em-dashes and apostrophes are double-encoded (mojibake) across all pages' JSON-LD.
4. **Wrong schema type** — Using `HomeAndConstructionBusiness` instead of `RoofingContractor` on all pages.
5. **Duplicate meta descriptions** — Roofing, siding, and windows pages all share the homepage's generic meta description.

### Top 5 Quick Wins

1. **Fix meta descriptions** — Write unique descriptions for each service page (30 min, high impact)
2. **Delete/noindex Ghost blog leaks** — Remove the 10 `sa-city-*` posts and "Untitled" from Ghost (10 min)
3. **Add sitemap.xml redirect** — Redirect `/sitemap.xml` to `/sitemap-index.xml` (1 line)
4. **Fix schema type** — Find-replace `HomeAndConstructionBusiness` to `RoofingContractor` (15 min)
5. **Fix siding H1 typo** — "Bay Areas Best" should be "Bay Area's Best" (1 min)

---

## 1. Technical SEO — 62/100

### Critical

| # | Issue | Details |
|---|-------|---------|
| C1 | Canonicals point to hamilton-exteriors.com | Correct for production, but DNS isn't pointed yet. Zero indexing value until DNS cutover. |
| C2 | /sitemap.xml returns 404 | File exists at `/sitemap-index.xml` but `/sitemap.xml` (conventional path) returns 404. |
| C3 | image-sitemap.xml returns 404 | robots.txt references it but the file doesn't exist on the deployment. |

### High

| # | Issue | Details |
|---|-------|---------|
| H1 | Ghost CMS service-area posts leaking into /blog | 10 posts like `/blog/sa-city-napa-county-ca-yountville-ca` are live, indexed, with double-appended title tags ("... \| Hamilton Exteriors \| Hamilton Exteriors"). Creates duplicate content with `/service-areas/` routes. |
| H2 | /blog/untitled is publicly indexed | Draft post with no content, generic meta description, empty BlogPosting schema. |
| H3 | Missing HSTS header | HTTP→HTTPS redirect works (301) but no `Strict-Transport-Security` header. SSL stripping risk. |
| H4 | Missing Content-Security-Policy | No CSP header present. Site handles contact form data. |

### Medium

| # | Issue | Details |
|---|-------|---------|
| M1 | lastmod in sitemap uses build timestamp | All 248 URLs get the same `lastmod` on every deploy. Googlebot will ignore it. |
| M2 | Layout.css is 45KB uncompressed | Tailwind v4 with purge should produce a smaller bundle. Render-blocking. |
| M3 | pSEO city-service pages have identical word counts | 174 pages (29 cities x 6 services) differ only in city name substitution. |

### Low

| # | Issue | Details |
|---|-------|---------|
| L1 | 3 images missing alt text | Likely decorative, should use `alt=""` explicitly for WCAG AA. |
| L2 | 1 image missing width/height | CLS contributor — bypasses Astro's Image component. |
| L3 | IndexNow not implemented | Missed opportunity for Bing/Yandex/Naver freshness. |
| L4 | Cache TTL for HTML is 5 minutes | No purge mechanism visible for post-publish freshness. |

### Passing

- HTTP→HTTPS redirect (301) working
- Trailing slash consistency enforced (`trailingSlash: 'never'`)
- robots.txt AI crawler handling well-structured
- Full SSR — no JavaScript required for content
- X-Frame-Options, X-Content-Type-Options, Referrer-Policy all set
- noindex correctly applied to utility pages (/success, /quote-calculator, /privacy-policy, /terms)
- Font preloading with correct crossorigin + WOFF2
- Viewport meta correct on all pages

---

## 2. Content Quality — 58/100

### Critical

| # | Issue | Details |
|---|-------|---------|
| C1 | Duplicate meta descriptions | Roofing, siding, and windows pages all use the homepage meta description: "Bay Area exterior remodeling — roofing, siding, windows, and waterproofing..." |
| C2 | Siding page H1 typo | "Bay Areas Best Siding Installers" — missing apostrophe in "Area's" |

### High

| # | Issue | Details |
|---|-------|---------|
| H1 | No named author anywhere on site | No blog bylines, no "About the Team" page, no founder bio. Significant E-E-A-T gap for a $15K-$80K service. |
| H2 | City page neighborhood content is pure template | 3-paragraph sections are word-for-word identical except city/neighborhood name substitution. 60-70% boilerplate across 29+ pages. |
| H3 | No blog content | Blog infrastructure exists (Ghost CMS) but zero genuine posts published. Zero informational query coverage. |
| H4 | No question-format headings | Service pages use declarative H2s ("Roofing Styles Offered") instead of question-format ("What Roofing Styles Are Available?"). Hurts AI Overview and featured snippet eligibility. |

### Medium

| # | Issue | Details |
|---|-------|---------|
| M1 | Homepage has no citable prose paragraph | Hero is headline + form only. No 2-3 sentence descriptive block for AI citation. |
| M2 | Service page intros are form-first, not prose-first | Substantive content about services starts deep in the page. Short average prose passages (~40-60 words vs. 134-167 word target). |
| M3 | FAQ in details/summary tags | Content is in DOM but hidden behind accordion. First FAQ item should have `open` attribute for crawler accessibility. |

### E-E-A-T Assessment

| Signal | Status |
|--------|--------|
| **Experience** | Weak — no case studies, project narratives, or before/after content |
| **Expertise** | Moderate — certifications listed (GAF, CertainTeed, Owens Corning, Tesla, James Hardie) but no technical content |
| **Authoritativeness** | Moderate — CSLB license visible, 4.8/5 rating, but no Wikipedia/Wikidata entity, no YouTube, no press mentions |
| **Trustworthiness** | Strong — consistent NAP, visible license number, real reviews, pricing transparency |

---

## 3. On-Page SEO — 65/100

### Title Tags

| Page | Title | Assessment |
|------|-------|------------|
| Homepage | Bay Area Roofing, Siding, ADUs & Custom Homes \| Hamilton Exteriors | Good — clear, keyword-rich, branded |
| /roofing | Bay Area Roofing Services — Shingles, Metal, Tile & Solar \| Hamilton Exteriors | Good |
| /siding | Bay Area Siding Installation — James Hardie, Vinyl & Stucco \| Hamilton Exteriors | Good |
| /windows | Bay Area Window Installation — Double Hung, Casement & Sliding \| Hamilton Exteriors | Good |
| /service-areas | Bay Area Roofing, Siding & Exteriors \| Service Areas \| Hamilton Exteriors | Good |
| Oakland | Roofing, Siding, ADUs & Custom Homes in Oakland, CA \| Hamilton Exteriors | Good |
| /blog | Bay Area Roofing & Home Improvement Blog \| Hamilton Exteriors | Good |
| Blog leaks | Double-branded: "... \| Hamilton Exteriors \| Hamilton Exteriors" | Broken |

### Meta Descriptions

| Page | Unique? | Notes |
|------|---------|-------|
| Homepage | Yes | "Bay Area exterior remodeling — roofing, siding, windows..." |
| /roofing | **NO** | Uses homepage description |
| /siding | **NO** | Uses homepage description |
| /windows | **NO** | Uses homepage description |
| /service-areas | Missing | No meta description detected |
| Oakland | **NO** | Schema shows homepage description as fallback |
| /blog | Yes | "Expert insights on ADU construction, roofing..." |

### Heading Structure

All pages have a single H1 — correct. H2 hierarchy is logical on all pages. No heading skip issues detected.

### Internal Linking

- Service area hub links to all 5 counties and 29 cities
- City pages link to parent county, 3-4 sibling cities, and service area hub
- **Issue:** Some nearby-city links use wrong URL pattern (e.g., `/service-areas/alameda/berkeley` instead of `/service-areas/alameda-county-ca/berkeley-ca`)
- Footer contains comprehensive service area links across all pages

---

## 4. Schema / Structured Data — 55/100

### Critical

| # | Issue | Details |
|---|-------|---------|
| C1 | Character encoding bug (mojibake) | Em-dashes render as `\u00e2\u20ac\u201d` and apostrophes as `\u00e2\u20ac\u2122` in all JSON-LD. Double UTF-8 encoding issue. |
| C2 | Review schema missing `datePublished` and `itemReviewed` | All 4 review objects lack required properties for rich result eligibility. |

### High

| # | Issue | Details |
|---|-------|---------|
| H1 | Wrong schema type | `HomeAndConstructionBusiness` used everywhere. Should be `RoofingContractor`. |
| H2 | Logo uses OG image (1200x630) | Schema `logo` should be square (~400x400). Current image suppresses Knowledge Panel logo. |
| H3 | BreadcrumbList missing | Only Oakland city page has breadcrumbs in schema. Missing from homepage, /roofing, /siding, /service-areas. |
| H4 | Business schema fragmented across multiple blocks | Same `@id` split across 2-3 separate `<script>` tags per page. Google may not merge them. |

### Medium

| # | Issue | Details |
|---|-------|---------|
| M1 | Service schema `areaServed` says "State: California" | Should list actual 5 counties served, not all of California. |
| M2 | WebSite missing SearchAction | No Sitelinks Searchbox eligibility. |
| M3 | WebPage entity missing on all pages | No `datePublished`/`dateModified` on any page. |
| M4 | City pages missing Service schema | No structured service data on location pages. |
| M5 | BreadcrumbList last item missing `item` URL | Oakland page breadcrumb final item has no URL property. |

### What's Working

- HomeAndConstructionBusiness with correct NAP, hours, geo coordinates
- FAQPage schema on all pages with FAQ sections
- AggregateRating (4.8/5, 50 reviews) present globally
- WebSite schema with publisher reference
- Service schema on /roofing and /siding pages
- ItemList on service-areas hub page

---

## 5. Performance — 78/100

### Strengths

- Static Astro build — zero client-side rendering required
- Images: 41/44 use `loading="lazy"`, hero uses `loading="eager"` correctly
- Astro image pipeline generating WebP with explicit dimensions
- Font preloading (3 fonts) with WOFF2 + crossorigin
- Static assets cached with `max-age=31536000, immutable`
- GTM lazy-loaded on user interaction (not blocking)
- Mapbox lazy-loaded on address field focus

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| Medium | 45KB CSS bundle | Render-blocking. Tailwind purge may not be fully configured. |
| Medium | Font-display strategy unconfirmed | Need to verify `font-display: swap` is set in @font-face rules. |
| Low | No resource hints for third-party origins | No `dns-prefetch` or `preconnect` for Google Fonts, GTM, Mapbox. |

---

## 6. AI Search Readiness (GEO) — 74/100

| Dimension | Score |
|-----------|-------|
| Technical Accessibility | 91/100 |
| Structural Readability | 80/100 |
| Citability | 72/100 |
| Authority & Brand Signals | 68/100 |
| Multi-Modal Content | 55/100 |

### Platform Scores

| Platform | Score | Primary Bottleneck |
|----------|-------|--------------------|
| Perplexity | 79 | Needs more citable prose passages |
| ChatGPT | 76 | Needs named author, YouTube presence |
| Google AI Overviews | 71 | No question-format headings, no blog content |
| Bing Copilot | 72 | Needs blog posts with date metadata |

### What's Best-in-Class

- robots.txt correctly separates AI search crawlers (allowed) from training crawlers (blocked)
- `llms-full.txt` with dedicated "Summary for AI Systems" section — rare and sophisticated
- Pricing transparency with tier breakdown — highly citable
- Static site generation = optimal for AI crawler accessibility
- FAQPage JSON-LD on all FAQ sections

### Key Gaps

| Severity | Issue |
|----------|-------|
| High | No question-format headings on service pages |
| High | No Wikidata entity for Hamilton Exteriors |
| High | No YouTube channel (0.737 citation correlation factor) |
| High | No named author on any page |
| Medium | llms.txt summary block too thin — missing license, founding year, phone |
| Medium | llms-full.txt link broken from Railway staging domain |

---

## 7. Images — 80/100

### Strengths

- WebP generation via Astro image pipeline
- 41/44 images lazy-loaded
- Hero/logo images eager-loaded correctly
- Explicit width/height on 43/44 images

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| Low | 3 images missing alt text | Likely decorative — add `alt=""` |
| Low | 1 image missing dimensions | CLS risk — raw `<img>` bypassing Astro Image component |
| Low | Hero image is lumber framing | Doesn't reinforce roofing as primary service |
| Low | /roofing page uses same hero as homepage | Should have roofing-specific imagery |

---

## 8. Local SEO — 67/100

| Dimension | Score |
|-----------|-------|
| NAP Consistency & Citations | 80/100 |
| Local On-Page SEO | 78/100 |
| Reviews & Reputation | 72/100 |
| Local Schema Markup | 62/100 |
| Local Link & Authority | 58/100 |
| GBP Signals | 52/100 |

### Critical

| # | Issue | Details |
|---|-------|---------|
| C1 | Wrong schema type for local | `HomeAndConstructionBusiness` → `RoofingContractor`. Generic category is #1 negative local ranking factor. |
| C2 | City page content is templated | Neighborhood paragraphs are word-for-word identical (name substitution only). Helpful Content risk. |

### High

| # | Issue | Details |
|---|-------|---------|
| H1 | No GBP Place ID in Maps link or schema | Footer uses name-search URL, not Place ID. Missing from `sameAs`. |
| H2 | `areaServed` uses plain strings | Should be Place entities with Wikidata `sameAs` for disambiguation. |
| H3 | Nearby city link URLs may be wrong | Oakland links show `/service-areas/alameda/berkeley` — missing `-county-ca` suffix. |

### Medium

| # | Issue | Details |
|---|-------|---------|
| M1 | Review count is 50 | Competitive market needs 75-100+. Rating (4.8) is strong. |
| M2 | No emergency service language | "Emergency roof repair" is high-converting. Missing if Hamilton serves emergency calls. |
| M3 | BBB and Thumbtack citations unknown | Only Yelp confirmed from Tier 1 home services directories. |
| M4 | Schema `@id` reused across all city pages | Can't distinguish city-level business signals. |
| M5 | CSLB license not in schema | Visible in footer but not structured as `hasCredential`. |

### NAP Consistency: PASS

Name, address, and phone are consistent across all on-site sources. Phone format differs between visible text `(650) 977-3351` and schema `+1-650-977-3351` — acceptable (E.164 in schema).

### Proximity Note

Castro Valley to Napa is ~55 miles, to Mill Valley ~40 miles. Per Search Atlas ML study, proximity to verification address accounts for 55.2% of ranking variance. Remote cities (Napa, Calistoga, Yountville, Mill Valley) will be structurally disadvantaged regardless of on-page optimization.

---

## 9. Visual & Mobile Audit

### Above-the-Fold Assessment

| Page | Verdict | Key Issue |
|------|---------|-----------|
| Desktop Homepage | Good | Hero, trust bullets, form all visible ATF. Strong social proof placement. |
| Mobile Homepage | Needs Work | Form CTA partially below fold — "Full Name" field barely visible. |
| Desktop /roofing | Good | Page-specific H1, contextualized form CTA. |
| Mobile Oakland | Needs Work | 4-level breadcrumb wraps 2 lines, pushes H1 down. |

### Issues

| Severity | Issue | Page |
|----------|-------|------|
| Medium | Form CTA partially below fold on mobile | Mobile Homepage |
| Medium | 4-level breadcrumb consumes vertical space on mobile | Mobile Oakland |
| Medium | Mobile homepage is 12,930px tall — key content buried | Mobile Homepage |
| Low | Hero image (lumber framing) doesn't reinforce roofing | Desktop Home, Roofing |
| Low | /roofing uses same hero as homepage | Desktop Roofing |
| Low | "#1 Roofing Contractor" claim has no supporting credential | Desktop Roofing |
| Low | Dense footer slow to scroll past on mobile | All mobile pages |

---

## Prioritized Action Plan

### Critical — Fix Immediately

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Complete DNS cutover to hamilton-exteriors.com | DNS config | Unblocks all indexing |
| 2 | Delete/noindex 10 `sa-city-*` Ghost posts + "Untitled" | 10 min | Removes duplicate content + quality signal |
| 3 | Fix sitemap: redirect `/sitemap.xml` → `/sitemap-index.xml` | 1 line | Fixes crawl errors |
| 4 | Remove or generate image-sitemap.xml | 5 min | Fixes crawl error in robots.txt |
| 5 | Fix schema encoding bug (mojibake em-dashes/apostrophes) | 15 min | Unblocks rich results |

### High — Fix Within 1 Week

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 6 | Write unique meta descriptions for /roofing, /siding, /windows, /service-areas | 30 min | Improves CTR for all service pages |
| 7 | Change schema type to `RoofingContractor` across 4 files | 15 min | Correct entity type for local + AI search |
| 8 | Add `datePublished` to all Review schema objects | 20 min | Enables review rich results |
| 9 | Fix siding H1 typo: "Bay Areas" → "Bay Area's" | 1 min | Professionalism signal |
| 10 | Replace OG image with square logo in schema `logo` property | 15 min | Knowledge Panel logo eligibility |
| 11 | Add GBP Place ID to Maps link + `sameAs` schema | 15 min | Strengthens GBP-to-entity connection |
| 12 | Add HSTS + CSP headers via railway.toml | 30 min | Security + trust signals |
| 13 | Consolidate fragmented HomeAndConstructionBusiness schema blocks | 1 hr | Reliable rich result merging |
| 14 | Add BreadcrumbList schema to /roofing, /siding, /service-areas | 1 hr | SERP breadcrumb rich results |
| 15 | Convert FAQ headings to question-format H2/H3 on service pages | 1-2 hrs | AI Overview + featured snippet eligibility |

### Medium — Fix Within 1 Month

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 16 | Upgrade city page neighborhood content from template to genuine copy | 2-4 hrs/city | Helpful Content compliance, local relevance |
| 17 | Add founder/team bio page with named author | 1-2 hrs | E-E-A-T authority signal |
| 18 | Publish 3 blog posts targeting informational queries | 3-6 hrs | Covers informational query gap |
| 19 | Create Wikidata entity for Hamilton Exteriors | 30 min | AI entity resolution |
| 20 | Fix `areaServed` from "California" to actual 5 counties | 30 min | Local relevance accuracy |
| 21 | Add `Service` schema to city pages | 1-2 hrs | "[service] in [city]" rich results |
| 22 | Fix nearby city link URL slugs | 1 hr | Internal link equity flow |
| 23 | Nudge mobile form card up so CTA is visible ATF | 15 min CSS | Lead form conversion |
| 24 | Collapse mobile breadcrumbs to last 2 segments | 30 min | Recovers mobile hero space |
| 25 | Enrich llms.txt summary block (add license, founding year, phone) | 15 min | AI citation completeness |

### Low — Backlog

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 26 | Create YouTube channel with 3 videos | 4-8 hrs | Highest citation correlation signal (0.737) |
| 27 | Fix lastmod to use real dates in sitemap | 30 min | Crawl prioritization accuracy |
| 28 | Implement IndexNow for Bing/Yandex/Naver | 30 min | Non-Google search freshness |
| 29 | Add 3 missing `alt=""` to decorative images | 10 min | WCAG AA compliance |
| 30 | Claim BBB + Thumbtack listings | 1-2 hrs | Tier 1 citation coverage |
| 31 | Add mid-page sticky CTA on mobile | 1 hr | Mobile conversion optimization |
| 32 | Add `WebPage` entity with datePublished/dateModified | 1 hr | E-E-A-T freshness signals |
| 33 | Add SearchAction to WebSite schema | 15 min | Sitelinks Searchbox (if search exists) |
| 34 | Add `hasCredential` for CSLB license in schema | 15 min | Structured trust signal |

---

## Screenshots

Saved to `C:\Users\admin\hamilton-exteriors\screenshots\`:

| File | Description |
|------|-------------|
| `desktop_home_atf.jpg` | Desktop homepage, above the fold |
| `desktop_home_full.jpg` | Desktop homepage, full page |
| `mobile_home_atf.jpg` | Mobile homepage, above the fold |
| `mobile_home_full.jpg` | Mobile homepage, full page |
| `desktop_roofing_atf.jpg` | Desktop /roofing, above the fold |
| `desktop_roofing_full.jpg` | Desktop /roofing, full page |
| `mobile_oakland_atf.jpg` | Mobile Oakland city page, above the fold |
| `mobile_oakland_full.jpg` | Mobile Oakland city page, full page |

---

## What's Already Best-in-Class

These are worth noting — many contractor sites do none of them:

1. **AI crawler management** — robots.txt correctly separates search crawlers (allowed) from training crawlers (blocked). Intentional, rare, correct.
2. **llms-full.txt with AI summary section** — Sophisticated practice most enterprise sites don't implement.
3. **Pricing transparency** — Full tier breakdown with materials + labor, per roofing square. Most citable commercial fact on the site.
4. **Static site generation (Astro)** — Optimal for crawl accessibility. Zero JS required for content.
5. **Service area architecture** — 4-level hierarchy (hub → county → city → city+service) with proper internal linking.
6. **Schema breadth** — FAQPage, WebSite, HomeAndConstructionBusiness, Service, BreadcrumbList, AggregateRating, Review — more schema types than 95% of contractor sites.
7. **Canonical URL strategy** — Correct canonical tags, proper noindex on utility pages, trailing slash enforcement.

---

*Audit performed by 7 parallel SEO subagents: Technical, Content, Schema, Performance, AI/GEO, Local, and Visual/Mobile.*
