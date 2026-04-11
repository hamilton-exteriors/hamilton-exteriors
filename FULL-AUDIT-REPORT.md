# Hamilton Exteriors — Full SEO Audit Report

**Date:** April 11, 2026 (v10 — post-fix re-audit)
**Site:** https://hamilton-exteriors.com
**Business type:** Service Area Business (SAB) — General Contractor, Bay Area CA
**Pages crawled:** 713 URLs in sitemap (2 redirects removed) + redirect pages
**Auditor:** Claude Code SEO Audit Suite
**Lighthouse:** Performance 98 | Accessibility 100 | Best Practices 100 | SEO 100

---

## Executive Summary

### Overall SEO Health Score: 84 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 88 | 19.4 |
| Content Quality | 23% | 76 | 17.5 |
| On-Page SEO | 20% | 86 | 17.2 |
| Schema / Structured Data | 10% | 80 | 8.0 |
| Performance (CWV) | 10% | 96 | 9.6 |
| AI Search Readiness | 10% | 82 | 8.2 |
| Images | 5% | 78 | 3.9 |
| **Total** | **100%** | | **83.8** |

### Fixed Since Pre-Audit (v9 → v10)

1. ~~CSP blocks OpenPanel analytics~~ — verified already correct in deployed CSP
2. ~~`/contact` and `/financing` 301s in sitemap~~ — removed from sitemap filter
3. ~~Review count inconsistency~~ — static llms.txt deleted, dynamic endpoints serve live counts
4. ~~pSEO meta description duplication~~ — "County, County" bug fixed with post-interpolation dedup
5. ~~Homepage title uses "Top" superlative~~ — now "Bay Area General Contractor | Roofing, ADUs & More"
6. ~~llms.txt blog index only 3 posts~~ — now dynamic from Ghost CMS (15 posts auto-listed)
7. ~~Footer contrast fails WCAG AA~~ — white/80 → white/90, Lighthouse accessibility now 100
8. ~~Legacy slug `/alameda-ca` 404~~ — added `-ca` suffix variants to redirect map
9. ~~Meta descriptions >155 chars~~ — trimmed on homepage, about, service areas, blog

### Remaining Top 5 Issues

1. **GBP primary category may be misaligned** — must verify "General Contractor" is primary (manual GBP check)
2. **City+service pages (264) are 35-40% unique** — borderline thin content risk at scale
3. **Blog posts lack inline source citations** — cost figures need parenthetical attribution in prose
4. **No dedicated contact page** — `/contact` still redirects to `/#contact`, no ContactPage schema
5. **No FAQPage schema on service pages** — /roofing, /siding, /windows etc. miss FAQ rich results

### Top 5 Quick Wins Remaining

1. Add FAQPage schema to 6 service page templates (2-3 hrs)
2. Add inline source attribution to blog cost figures (Ghost CMS edits)
3. Create dedicated `/contact` page with NAP, map, ContactPage schema (3-4 hrs)
4. Verify GBP primary category = "General Contractor" (5 min)
5. Normalize Angi/HomeAdvisor trade name to "Hamilton Exteriors" (30 min)

---

## 1. Technical SEO (88/100)

### Crawlability — Strong

| Check | Status |
|-------|--------|
| robots.txt | Well-configured. AI crawlers allowed, training bots blocked |
| Sitemap | sitemap-index.xml → sitemap-0.xml (715 URLs) + image-sitemap.xml (1,050 images) |
| IndexNow | Configured and verified (key file returns 200) |
| Crawl-delay | 1 second on wildcard — does not affect named bots |
| SSR rendering | Astro SSR — full HTML delivered server-side, no JS-gated content |
| HSTS | `max-age=63072000; includeSubDomains; preload` — correct |
| HTTP→HTTPS | Single 301, clean chain |
| www→non-www | Single 301, clean chain |

### Indexability — Issues Found

| Check | Status | Severity |
|-------|--------|----------|
| Canonical tags | Properly implemented on all indexable pages | Pass |
| noindex usage | Correct: 404, /buy, /buy/scan, legal pages, /success, blog tags | Pass |
| 301 redirects in sitemap | ~~`/contact` and `/financing` removed~~ | **Fixed** |
| `/about` redirect | 301 → `/about/alex-hamilton-li` (not in sitemap — correct) | Pass |
| Legacy slug redirects | Short county slugs properly 301 to canonical form | Pass |
| Canonical/sitemap trailing slash | Astro `trailingSlash: 'never'` — consistent | Pass |
| robots meta | `max-snippet:-1, max-image-preview:large, max-video-preview:-1` on all indexed pages | Pass |

### Security

| Check | Status |
|-------|--------|
| HTTPS | Enforced site-wide |
| HSTS preload | Active — correct header values |
| www redirect | Single 301 via Railway |
| CSP | **Broken** — blocks `api.openpanel.dev` in `connect-src` |

### Core Web Vitals (Lab Data — Lighthouse)

| Metric | Value | Status | Threshold |
|--------|-------|--------|-----------|
| LCP | 2.6–3.3s | Needs Improvement | <2.5s Good |
| CLS | 0 | Good | <0.1 Good |
| TBT | 0ms | Good | <200ms Good |
| FCP | 2.2s | Needs Improvement | <1.8s Good |
| Speed Index | 2.5s | Good | — |
| TTFB | 430ms | Good | — |
| Lighthouse Performance | 70-88 | Variable | — |
| Lighthouse Accessibility | 96 | Good | — |
| Lighthouse Best Practices | 92 | Issues (CSP errors) | — |

### Issues Found

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| T1 | CSP blocks OpenPanel analytics | **Critical** | `api.openpanel.dev` not in `connect-src` directive. 6+ console errors per page. Analytics data silently lost in production. Fix CSP immediately. |
| T2 | 301 redirect URLs in sitemap | Critical | `/contact` and `/financing` are 301 redirects but listed in sitemap-0.xml. Remove from sitemap generator. |
| T3 | LCP 2.6-3.3s (needs improvement) | High | Hero image `hero-bg-2400.jpg` served oversized for mobile (412px render from 768px source). Add `w=480` srcset variant at q=60, target <80KB. Cold cache hit (`x-cache: MISS`) also contributed. |
| T4 | No dedicated contact page | High | `/contact.astro` is a bare 301 redirect. No standalone NAP, map, or ContactPage schema. |
| T5 | pSEO meta description duplication | High | County-level pages show "in Alameda County, Alameda County, CA" — template interpolation bug across 344+ pages. |
| T6 | 6 meta descriptions >155 chars | High | Homepage (158), Siding (162), Windows (157), About (169), Service Areas (174), Blog (164). Phone/CSLB getting truncated in SERPs. |
| T7 | 5 page titles >60 chars | High | Homepage (68), Roofing (66), Windows (68), Siding (63), About (67). Google rewrites long titles on mobile. |
| T8 | Homepage title uses "Top" | Medium | Violates brand copy rule against unverifiable superlatives. |
| T9 | Footer contrast fails WCAG AA | Medium | Copyright text `#6e8077` on green background = 3.63:1 ratio (need 4.5:1). |
| T10 | Canonical/sitemap trailing slash mismatch | Medium | Canonical uses trailing slash, sitemap omits it. Standardize to one form. |
| T11 | No dedicated financing page | Medium | Redirects to `/#financing`. Standalone page could capture queries. |
| T12 | Legacy city slug gap | Medium | `/service-areas/alameda-ca` returns 404. |
| T13 | `/about` internal link audit needed | Medium | Any nav/footer links pointing to `/about` trigger unnecessary 301 chain. Verify all point to `/about/alex-hamilton-li`. |
| T14 | Image over-delivery | Medium | Cert logos served 280px for 90px render. Nav logo 469px for 143px render. 144 KiB wasted. |

---

## 2. Content Quality (74/100)

### E-E-A-T Assessment — Strong

| Signal | Status | Details |
|--------|--------|---------|
| **Experience** | Strong | 500+ projects since 2018. Real project examples with costs in blog posts. |
| **Expertise** | Strong | Alexander Hamilton Li — licensed architect & GC (CSLB #1082377). GAF Master Elite (top 2%). ProfilePage schema. |
| **Authoritativeness** | Good | 5 manufacturer certifications. Wikidata entity Q139044457. Missing: no press, no YouTube, no Wikipedia. |
| **Trustworthiness** | Strong | Transparent pricing ($940-$1,525/sq). CSLB license verifiable. 4.8 star rating. |

### Content Depth by Page Type

| Page Type | Count | Avg Words | Unique % | Assessment |
|-----------|-------|-----------|----------|------------|
| Homepage | 1 | ~2,800 | 100% | Strong conversion page |
| Service pages | 6 | 2,500-4,000 | 100% | Substantial, well-optimized |
| Service subtypes | ~20 | 1,500-2,500 | 85% | Good depth |
| City hub pages | ~44 | 2,800-3,200 | 70% | Strong — local facts, neighborhoods, permits |
| City+service pages | ~264 | 1,200-1,400 | 35-40% | **Borderline thin** |
| County+service pages | ~36 | ~1,200 | 50% | Adequate |
| Blog posts | 14 | 1,700+ | 100% | Excellent |
| About/founder | 1 | ~2,000 | 100% | Strong bio with credentials |

### Issues Found

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| C1 | City+service pages 35-40% unique | High | 264+ pages where 60-65% is shared boilerplate. At scale, thin content risk. |
| C2 | Blog posts lack inline source citations | High | Cost figures need parenthetical source co-located in the prose. |
| C3 | Review count discrepancy | High | 37 (homepage hero) vs 41 (/roofing schema) vs 26 (llms.txt). |
| C4 | H1 uses "Best" on city+service pages | High | Violates brand copy rules against unverifiable superlatives. Ghost CMS fix. |
| C5 | H1 uses "Top" on county pages | Medium | Same brand rule violation. |
| C6 | County+service pages thin | Medium | BreadcrumbList only, no Service schema or descriptive prose. |

---

## 3. On-Page SEO (86/100)

### Strengths
- Title tags: Locally targeted with good keyword placement
- Meta descriptions: Present on all key pages with phone number
- H1: One per page, descriptive
- Internal linking: Excellent cross-linking across hierarchy
- Breadcrumbs: Implemented with BreadcrumbList schema
- Geo meta tags: `geo.region`, `geo.placename`, `geo.position` on all city pages

### Issues Found

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| O1 | 6 meta descriptions truncated | High | Homepage (158 chars), Siding (162), Windows (157), About (169), Service Areas (174), Blog (164). Trust signals (phone, CSLB) getting cut off. Trim to <155 chars. |
| O2 | 5 page titles >60 chars | High | Homepage (68), Roofing (66), Windows (68), Siding (63), About (67). Google rewrites on mobile. Tighten to 55-60 chars. |
| O3 | pSEO meta description duplication | High | "in Alameda County, Alameda County, CA" — template interpolation doubles county name across 344+ pages. |
| O4 | Homepage title uses "Top" | Medium | Violates brand copy rule. Should use "Architect-Led" or similar factual differentiator. |
| O5 | Homepage title buries primary category | Medium | "Custom Home & Exteriors" — should lead with "General Contractor" if that's GBP primary. |
| O6 | llms.txt blog index incomplete | Low | Only 3 of 14 blog posts listed in llms.txt. |

---

## 4. Schema / Structured Data (80/100)

### Current Implementation — Comprehensive

| Schema Type | Where | Status |
|-------------|-------|--------|
| GeneralContractor + RoofingContractor | All full-org pages | Valid |
| AggregateRating | All full-org pages | Dynamic (Google API + curated) |
| Review (individual) | Homepage, service pages, city pages | Multi-platform |
| Service | Service pages, city+service pages | With areaServed + pricing |
| BreadcrumbList | All subpages | Hierarchically correct |
| ProfilePage + Person | /about/alex-hamilton-li | With credentials, Wikidata |
| ArticlePosting / BlogPosting | Blog posts | Author, dates, publisher |
| FAQPage | Blog posts (dynamic) | Only fires on question-format H2s |
| WebSite + WebPage | Homepage | Standard |
| SpeakableSpecification | Service pages | Good for voice/AI |

### Issues Found

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| S1 | No FAQPage schema on service pages | High | Service pages have FAQ sections but no FAQPage JSON-LD. Add static FAQPage to templates. |
| S2 | City pages lack LocalBusiness node | Medium | Only Service schema with provider @id reference. Best practice: lightweight GeneralContractor per city. |
| S3 | ReviewCount may drift | Medium | Fallback to 26 if Google API fails, mismatching displayed count. |
| S4 | County+service pages: no Service schema | Low | Only BreadcrumbList emitted. |
| S5 | Geo coordinates precision | Low | Some city pages use 4 decimal places instead of 5. |
| S6 | No ContactPage schema | Medium | No dedicated contact page exists to attach it to. |

---

## 5. Performance / CWV (96/100)

### Lighthouse Results (Lab — April 11, 2026)

| Metric | Value | Score | Status |
|--------|-------|-------|--------|
| LCP | 2.0s | 0.96 | Good |
| CLS | 0.031 | 1.0 | Good |
| TBT | 0ms | 1.0 | Good |
| FCP | 1.5s | 0.95 | Good |
| Speed Index | 2.3s | 0.99 | Good |
| TTI | 2.1s | 0.99 | Good |
| **Performance** | | **98** | |
| **Accessibility** | | **100** | |
| **Best Practices** | | **100** | |
| **SEO** | | **100** | |

### Strengths
- Astro SSR: Full server rendering, TBT 0ms, no hydration penalty
- Font loading: WOFF2 + `font-display: swap` for all 3 fonts
- CLS: Perfect 0 — all images have explicit width/height
- Minimal JS: Astro islands architecture

### Issues Found

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| P1 | LCP 2.6-3.3s — hero image oversized | High | Hero `hero-bg-2400.jpg` renders at 412px on mobile but served from 768px source. Add `w=480` srcset at q=60, target <80KB. |
| P2 | CSP blocks OpenPanel analytics | Critical | (See T1) 6+ console errors per page. Lighthouse Best Practices score drops to 92. |
| P3 | Image over-delivery (144 KiB wasted) | Medium | Cert logos served 280px for 90px render. Nav logo 469px for 143px. Reduce source `w=` params. |
| P4 | Roofing hero is PNG not WebP | Medium | Inconsistent format vs homepage JPG/WebP hero. |
| P5 | Cold cache penalty | Medium | `x-cache: MISS` on audit run. Railway CDN warm cache reduces LCP significantly. Verify cache-control headers. |
| P6 | Certification logos are PNG | Low | 5 cert logos could be SVG. |
| P7 | No CrUX field data | Info | Real-user CWV requires Google CrUX API. |

---

## 6. AI Search Readiness (82/100)

### Strengths
- **robots.txt**: AI crawlers properly allowed, training bots blocked
- **llms.txt + llms-full.txt**: Best-in-class implementation for local contractors (9/10)
- **SSR**: All content crawler-accessible without JS execution
- **Wikidata entity**: Q139044457 linked in llms.txt
- **SpeakableSpecification**: Present on service pages

### Platform Scores

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 72 | Thin FAQ schema on service pages |
| ChatGPT | 68 | No YouTube/Reddit signals |
| Perplexity | 76 | Strong blog passage density |
| Bing Copilot | 65 | No explicit Bingbot rule, no Bing Webmaster Tools |

### Issues Found

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| G1 | Blog posts lack inline source attribution | High | LLM passage extractors weight claims where source is co-located in same sentence. |
| G2 | No YouTube presence | High | Strongest single correlation (~0.737) with AI citation frequency. |
| G3 | Review count inconsistency | High | AI systems flag conflicting numbers as quality issue. |
| G4 | llms.txt blog index incomplete | Medium | 3 of 14 posts listed. |
| G5 | No Reddit presence | Medium | Brand signals in r/bayarea, r/HomeImprovement correlate with AI citations. |
| G6 | ADU cost guide H2s are statements not questions | Medium | Doesn't trigger dynamic FAQPage schema. Ghost CMS fix. |

---

## 7. Images (74/100)

| Check | Status |
|-------|--------|
| Image sitemap | 1,050 images properly mapped |
| Alt text | Present on key images |
| Astro Image component | srcset, WebP conversion |
| OG image | 1200x630 standard |

### Issues Found

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| I1 | Image over-delivery (144 KiB wasted) | Medium | Cert logos 280px→90px, nav logo 469px→143px. Reduce source widths. |
| I2 | Roofing hero PNG | Medium | Should be WebP/JPG like homepage hero. |
| I3 | PNG cert logos | Low | SVG would be smaller and sharper. |
| I4 | No page-specific OG images | Low | All pages share `og-default.jpg`. |

---

## 8. Local SEO (74/100)

### Score Breakdown

| Dimension | Score |
|-----------|-------|
| GBP Signals | 72 |
| Reviews & Reputation | 78 |
| Local On-Page SEO | 82 |
| NAP Consistency | 70 |
| Local Schema | 85 |
| Local Authority | 55 |

### Critical Issues

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| L1 | GBP primary category | Critical | Must be "General Contractor." Wrong category = #1 negative ranking factor. |
| L2 | Angi/HomeAdvisor name mismatch | High | Profiles show "ABR Quality Resources" instead of "Hamilton Exteriors." |
| L3 | No dedicated contact page | High | No embedded map, no ContactPage schema, no standalone NAP display. |
| L4 | Review velocity risk | High | 41 reviews total. 3-week gap = GBP ranking regression (18-day rule). |
| L5 | No GBP Posts | High | Weekly posts needed for engagement signals. |
| L6 | Missing citation directories | Medium | Not on Thumbtack, BuildZoom, or verified Nextdoor Business. |

---

## What's Working Well

- robots.txt AI crawler configuration — among the best for any local contractor
- llms.txt + llms-full.txt — genuinely best-in-class for this business category
- Schema pipeline — dynamic review injection, Organization + Service + Breadcrumb + ProfilePage + Article
- E-E-A-T signals — licensed architect/GC, 5 manufacturer certs, Wikidata entity
- Service area URL architecture — clean hierarchy, legacy redirects, geo meta tags
- City hub pages — 70% unique with genuine local expertise
- Blog content — 1,700+ word guides with specific pricing, author attribution, proper dates
- Canonical tag implementation — consistent, no trailing slash issues
- Image sitemap — 1,050 images properly mapped
- IndexNow — configured for instant submission

---

## 9. Accessibility (96/100 Lighthouse)

| Check | Status |
|-------|--------|
| Lighthouse Accessibility Score | 96 |
| ARIA attributes | Present on mobile menu, form elements |
| Keyboard navigation | Supported |
| Skip-to-content link | Present |
| Focus-visible states | Present |

### Issues Found

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| A1 | Footer copyright text contrast | Medium | `#6e8077` on green background = 3.63:1 ratio. WCAG AA requires 4.5:1 for body text. Increase text opacity or use full opaque cream/white. |

---

## Limitations

- CrUX field data requires Google CrUX API
- Live GBP data requires GBP API or DataForSEO
- Local pack positions require SERP API
- Backlink profile requires Ahrefs/Moz
- Competitor benchmarking requires DataForSEO/BrightLocal
- INP measurement requires real browser instrumentation

---

*Generated by Claude Code SEO Audit Suite — April 10, 2026*
