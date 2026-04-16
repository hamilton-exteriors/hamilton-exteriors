# Hamilton Exteriors — Full SEO Audit Report

**Date:** April 16, 2026
**URL:** https://hamilton-exteriors.com
**Business type:** Hybrid Local Service (brick-and-mortar + SAB) — General Contractor / Roofing
**Framework:** Astro 6.1 SSR + Tailwind v4, Railway hosting

---

## SEO Health Score: 78 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 85/100 | 18.7 |
| Content Quality | 23% | 80/100 | 18.4 |
| On-Page SEO | 20% | 82/100 | 16.4 |
| Schema / Structured Data | 10% | 90/100 | 9.0 |
| Performance (CWV) | 10% | 55/100 | 5.5 |
| AI Search Readiness (GEO) | 10% | 84/100 | 8.4 |
| Images & Visual | 5% | 70/100 | 3.5 |
| **Total** | **100%** | | **79.9 ≈ 78** |

**Bonus: Local SEO Score: 76 / 100** (separate dimension)

---

## Executive Summary

### Top 5 Critical Issues

1. **Wrong CSLB license number on all Ghost CMS pages** — Service area pages display #1082377 (old) instead of #1078806 (correct). The recent sitewide fix only updated Astro templates, not Ghost content. This is a legal/trust issue.
2. **CLS 0.147 on mobile** — Above the 0.10 "Good" threshold. Caused by font swap on H1 and unsized certification logos.
3. **www→non-www redirect adding ~860ms** — Every www. URL pays a full redirect penalty before loading begins.
4. **Only 37 Google reviews** — Below competitive threshold (80-200+) for Bay Area contractors. 18-day review velocity cliff is an active risk.
5. **Two GBP listings need compliance verification** — The GC + Roofing department dual-listing risks suspension if it doesn't meet Google's department policy.

### Top 5 Quick Wins

1. Fix CSLB number in Ghost CMS content (all service area pages) — 1 hour via Ghost Admin API
2. Change `decoding="sync"` to `decoding="async"` on hero image — 1 line change, improves desktop LCP
3. Add `min-height: 44px` to social platform icon links (touch target fix) — 5 min CSS change
4. Correct BBB profile (wrong name suffix "Inc", wrong founding date 2024→2018) — 30 min via BBB portal
5. Source the unsourced statistics on location pages (Census, NOAA, Zillow) — 2 hours, big citability boost

---

## 1. Technical SEO — 85/100

### Security Headers — Excellent

| Header | Value | Status |
|--------|-------|--------|
| HSTS | `max-age=63072000; includeSubDomains; preload` | Excellent (2-year, preload) |
| CSP | Full policy with nonces, strict-dynamic, report-uri | Excellent |
| X-Frame-Options | SAMEORIGIN | Good |
| X-Content-Type-Options | nosniff | Good |
| Referrer-Policy | strict-origin-when-cross-origin | Good |
| Permissions-Policy | camera=(), microphone=(), geolocation=(self), payment=(), browsing-topics=() | Excellent |

**CSP report-uri** configured to `hamilton-exteriors.report-uri.com` — production-grade CSP monitoring.

### CDN & Caching

- Railway Edge CDN active (`x-railway-cdn-mode: full`)
- Fastly edge cache (`x-served-by: cache-sjc1000094-SJC`)
- Cache headers: `public, max-age=300, s-maxage=3600, stale-while-revalidate=86400`
- Note: TTFB of 870ms in Lighthouse was a cache MISS. Cached responses should be <100ms.

### Robots.txt — Expert-Level Configuration

- AI search crawlers explicitly allowed (GPTBot, PerplexityBot, ClaudeBot, ChatGPT-User, Google-Extended, Applebot-Extended)
- Training-only crawlers blocked (CCBot, anthropic-ai, cohere-ai, Bytespider)
- /api/ disallowed for all
- Crawl-delay: 1 for default user-agent
- Dual sitemaps declared (sitemap-index.xml + image-sitemap.xml)
- IndexNow key referenced

### Redirects

- **www→non-www redirect works** (301) but adds ~860-960ms on first load
- All internal links and canonical tags use non-www — correct
- Ensure ad destinations, email links, and external references use `https://hamilton-exteriors.com` (no www)

### SSL & HTTPS

- SSL active, HSTS preload enabled and submitted to hstspreload.org
- `upgrade-insecure-requests` in CSP

### Rendering

- Full SSR (Astro 6.1) — all content server-rendered, no JS rendering dependency for crawlers
- Third-party scripts lazy-loaded on interaction (GTM, Meta Pixel, OpenPanel, Mapbox)

### IndexNow

- Key file referenced in robots.txt
- Integration appears functional

### Issues

| Severity | Issue |
|----------|-------|
| Medium | www redirect penalty (~860ms) — ensure all external links use non-www |
| Low | HTTP Link header only includes llms.txt and llms-full.txt, missing ai.txt |

---

## 2. Content Quality — 80/100

### E-E-A-T Signals — Strong

- **Experience:** 500+ projects since 2018, real project photos via CompanyCam, live Google reviews via API
- **Expertise:** Architect + GC dual licensure (CSLB #1078806), manufacturer certifications (GAF Master Elite, etc.)
- **Authoritativeness:** Named author (Alexander Hamilton Li) on blog posts with credentials, Wikidata entities for company and founder
- **Trust:** License number prominently displayed, BBB listing (A-), live review widget, transparent pricing

### Blog Content Quality

- 15+ blog posts covering roofing, siding, windows, ADUs, fire zones
- External source citations (Oak Ridge National Lab DOI, ARMA, Remodeling Magazine, FTC, Freddie Mac, CA HCD)
- "From Alexander" editorial sections add genuine first-person expert voice
- FAQ sections on most blog posts with structured FAQPage schema
- Cost guides include specific per-square pricing ranges

### Content Issues

| Severity | Issue |
|----------|-------|
| Critical | **CSLB #1082377 (wrong) displayed on ALL Ghost-powered service area pages** — should be #1078806. Recent git fix only updated Astro templates, not Ghost CMS content. |
| High | Service area page statistics are unsourced (Oakland housing stock %, rainfall, median home value) — weakens citability |
| Medium | Warranty blog opens with rhetorical questions instead of a direct answer — poor for AI citation |
| Medium | Several blog sections run 350-520 words without H3 sub-breaks — harder for AI passage extraction |
| Medium | ADU FAQ answers exceed 80-word limit (85-110 words) per copy rules |
| Low | "How to choose a contractor" blog has zero question-based headings |

### Thin Content Risk (pSEO Pages)

Service area pages (~477 URLs) pass the doorway page test:
- Per-city data: neighborhoods, permit fees, fire zone info, drive time, weather
- Wikipedia sameAs on city entities
- City-specific regulatory content

Risk: as coverage expands, quality may regress toward templating. The 4 curated non-Google reviews rotate across all 477 pages.

---

## 3. On-Page SEO — 82/100

### Title Tags — Good

| Page | Title | Length |
|------|-------|--------|
| Homepage | Hamilton Exteriors \| Bay Area General Contractor \| Custom Homes, ADUs & Roofing | 79 chars |
| /roofing | Bay Area Roofing \| Shingles, Metal & Tile \| Hamilton Exteriors | 61 chars |
| /blog/roof-replacement-cost-bay-area | Roof Replacement Cost Bay Area 2026 \| $15K-$100K Pricing Guide \| Hamilton Exteriors | 84 chars |
| Oakland roofing | Roofing Contractor in Oakland, CA \| Licensed & 50-Year Warranty \| Hamilton Exteriors | 84 chars |
| About (Alex) | Alex Hamilton Li — Architect & GC \| Hamilton Exteriors | 54 chars |

Titles are well-optimized with target keywords, location, and brand. Some exceed 60-char display limit but include important modifiers.

### Meta Descriptions — Good

All sampled pages have unique, compelling meta descriptions with:
- Service keywords
- Location (Bay Area / city-specific)
- Trust signals (CSLB #, warranty, rating)
- Phone number on key pages

**Issue:** Oakland meta description contains wrong CSLB number (#1082377).

### Heading Structure

- H1 present and above-fold on all sampled pages
- Proper H2/H3 hierarchy on blog posts
- Service detail pages use question-based H2s (good for featured snippets)

### Internal Linking

| Signal | Status |
|--------|--------|
| Footer navigation to service areas | Present — all cities reachable in 1 click |
| Service area hub in footer | Present |
| Cross-linking within service pages | Present |
| Blog → city page links | Missing — blogs don't link to corresponding service area pages |
| Breadcrumb navigation | Not confirmed |

### Canonical Tags

- Correct self-referencing canonicals confirmed on all sampled pages
- Non-www domain used consistently

### Issues

| Severity | Issue |
|----------|-------|
| High | Blog posts don't systematically link to relevant service area pages — missed internal link equity |
| Medium | Homepage title at 79 chars may truncate in SERPs |
| Low | No breadcrumb navigation confirmed (BreadcrumbList schema opportunity) |

---

## 4. Schema / Structured Data — 90/100

### Homepage Schema — Comprehensive

The homepage JSON-LD `@graph` contains:

1. **GeneralContractor + RoofingContractor** (dual type)
   - Full NAP with PostalAddress
   - GeoCoordinates (5 decimal places)
   - OpeningHoursSpecification (Mon-Fri 7-6, Sat 8-2)
   - AggregateRating (4.8/37, live-fetched from Google API)
   - HasOfferCatalog (6 services)
   - HasCredential (CSLB license + 5 certifications)
   - KnowsAbout (10 topics with Wikipedia sameAs)
   - AreaServed (6 counties with Wikipedia sameAs)
   - Founder (Person with Wikidata sameAs)
   - Department (RoofingContractor with separate CID)
   - SameAs (10+ profiles)
   - 4 Review objects with ratings, dates, and publishers
   - PaymentAccepted, FoundingDate, LegalName, AlternateName

2. **WebSite** with SearchAction
3. **WebPage** with isPartOf, about references

### Blog Schema

- Article/BlogPosting schema on blog posts
- FAQPage schema on FAQ sections

### Issues

| Severity | Issue |
|----------|-------|
| Medium | `ratingCount` duplicates `reviewCount` in aggregateRating — remove or differentiate |
| Medium | `AggregateOffer` on city hub pages uses $400-$3,200 range — misleadingly wide |
| Low | `hasMap` uses Google Maps CID URL — valid but non-standard |
| Low | Missing HowTo schema on "How a Project Works" section |
| Low | Missing BreadcrumbList schema |

---

## 5. Performance (CWV) — 55/100

### Lighthouse Scores (Lab Data)

| Metric | Mobile | Desktop |
|--------|--------|---------|
| Performance | 85/100 | 63/100 |
| LCP | 3.1s (Needs Improvement) | 4.3s (Poor) |
| CLS | 0.147 (Needs Improvement) | 0.019 (Good) |
| TBT | 0ms (Good) | 0ms (Good) |
| FCP | 2.3s | 2.4s |
| TTFB | 870ms (cache miss) | 852ms (cache miss) |

**Important context:** Railway Edge CDN + Fastly is active. The 870ms TTFB was a cache MISS. Cached TTFB should be <100ms. Real-world CrUX data may be significantly better.

### Issues

| Severity | Issue | Est. Impact |
|----------|-------|-------------|
| Critical | www redirect adds ~860ms to every www URL | LCP -860ms |
| High | CLS 0.147 on mobile — H1 font swap + unsized cert logos | CLS |
| High | TTFB on cache miss — 870ms (Railway SSR cold start) | LCP |
| Medium | `decoding="sync"` on hero image — forces sync decode | Desktop LCP -40ms |
| Medium | Forced reflow ~92ms from inline script (Hero.astro) | LCP -90ms |
| Medium | Financing image wrong srcset variant on mobile (56% excess) | Payload |
| Medium | Satoshi-700 (25.7KB) preloaded — may not be above-fold critical | FCP -100-200ms |
| Low | BackOffice portfolio.js only 1hr cache TTL | Return visits |

### What's Already Right

- Self-hosted WOFF2 fonts with preload for LCP-critical fonts
- Hero image preloaded as responsive WebP with fetchpriority="high"
- All third-party scripts lazy-loaded on interaction
- Zero unused JS/CSS detected
- TBT of 0ms — excellent JS efficiency

---

## 6. AI Search Readiness (GEO) — 84/100

### Breakdown

| Dimension | Score |
|-----------|-------|
| Technical Accessibility | 10.0/10 |
| Citability | 8.5/10 |
| Structural Readability | 8.0/10 |
| Authority & Brand Signals | 8.5/10 |
| Multi-Modal Content | 6.5/10 |

### What's Excellent

- **robots.txt:** Expert-level AI crawler configuration with correct search vs. training distinction
- **llms.txt + llms-full.txt:** Spec-compliant, dynamically generated from Ghost CMS + Google Reviews API
- **HTML link headers:** Four AI-related rel attributes (ai-content-declaration, llms, llms-full, ai-policy)
- **RSL-1.0 license:** cite-with-attribution — correctly permits AI search citation while blocking training
- **Wikidata entities:** Company (Q139044457) and founder (Q139196186) linked
- **Blog posts:** Externally-sourced statistics with DOIs and named publications

### Platform Scores

| Platform | Score | Notes |
|----------|-------|-------|
| Google AI Overviews | 8.5/10 | Strong SSR, FAQPage schema, sourced stats, Wikidata |
| Perplexity | 8.5/10 | PerplexityBot allowed, DOI citations |
| ChatGPT | 7.5/10 | GPTBot allowed, llms.txt present, no Wikipedia article |
| Bing Copilot | 7.0/10 | IndexNow active |
| Apple Intelligence | 7.5/10 | Applebot-Extended allowed |

### Issues

| Severity | Issue |
|----------|-------|
| High | No YouTube presence — #1 correlation signal for AI citation |
| High | No Wikipedia article (Wikidata exists but Wikipedia does not) |
| Medium | Location page statistics unsourced |
| Medium | Warranty blog non-direct opening |
| Low | llms.txt missing "Optional" section |

---

## 7. Images & Visual — 70/100

### Issues

| Severity | Issue |
|----------|-------|
| High | 2 images missing alt attributes on homepage + /roofing |
| High | Social platform icon touch targets at 26x26px (need 44x44px) |
| Medium | Financing image wrong srcset variant on mobile (56% excess) |
| Medium | Body font measuring at 12px on mobile (needs verification) |
| Low | Services dropdown button only 20px tall |
| Low | Logo tap target 89x40px — 4px short |

---

## 8. Local SEO — 76/100

### Breakdown

| Dimension | Score |
|-----------|-------|
| Local On-Page SEO | 88/100 |
| Local Schema Markup | 90/100 |
| Reviews & Reputation | 78/100 |
| NAP Consistency | 72/100 |
| Local Link & Authority | 70/100 |
| GBP Signals | 64/100 |

### Key Issues

| Severity | Issue |
|----------|-------|
| Critical | Two GBP listings need department policy compliance verification |
| Critical | Only 37 reviews — below competitive threshold, 18-day velocity cliff risk |
| High | BBB profile: wrong name ("Inc"), wrong founding date (2024 not 2018) |
| High | Missing contractor directories: Houzz, Thumbtack, BuildZoom |
| Medium | No Google Maps embed on /contact page |
| Medium | Blog posts don't link back to city pages |
| Medium | Only 4 curated non-Google reviews for 477 pSEO pages |
| Low | No emergency/storm language on roofing page or GBP |

---

## Prioritized Action Plan

### Critical (Fix Immediately)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 1 | Fix CSLB #1082377 → #1078806 in ALL Ghost CMS content | Legal/Trust | 1 hour |
| 2 | Verify two-GBP-listing compliance with department policy | Suspension risk | 1 hour |

### High (Fix Within 1 Week)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 3 | Fix CLS 0.147: `font-display: optional` on hero H1, size cert logos | CWV | 2 hours |
| 4 | Change `decoding="sync"` → `decoding="async"` on hero image | Desktop LCP | 5 min |
| 5 | Ensure all external links use non-www URL | LCP -860ms | 1 hour |
| 6 | Implement post-project review request sequence | Local ranking | 2 hours |
| 7 | Add alt attributes to 2 missing images | A11y + SEO | 15 min |
| 8 | Source location page statistics (Census, NOAA, Zillow) | AI citability | 2 hours |
| 9 | Correct BBB profile | NAP consistency | 30 min |

### Medium (Fix Within 1 Month)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 10 | Add blog → service area page internal links | Link equity | 3 hours |
| 11 | Create YouTube channel with 3+ videos | AI citation | 1-2 weeks |
| 12 | Fix social icon touch targets to 44x44px | Mobile UX | 30 min |
| 13 | Rewrite warranty blog opening + add FAQPage schema | Citability | 1 hour |
| 14 | Create Houzz, Thumbtack, BuildZoom listings | Citations | 2 hours |
| 15 | Remove duplicate `ratingCount` from schema | Accuracy | 15 min |
| 16 | Fix financing image srcset/sizes mismatch | Performance | 30 min |
| 17 | Fix AggregateOffer price range on city pages | Rich results | 1 hour |
| 18 | Add Google Maps embed to /contact | GBP signal | 15 min |
| 19 | Expand curated reviews beyond 4 entries | pSEO quality | Ongoing |
| 20 | Investigate Hero.astro forced reflow (~92ms) | LCP | 1 hour |

### Low (Backlog)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 21 | Add BreadcrumbList schema | Rich results | 1 hour |
| 22 | Add HowTo schema on process section | Rich results | 30 min |
| 23 | Create Wikipedia article | Entity recognition | 4+ hours |
| 24 | Trim ADU FAQ answers to <80 words | Copy rules | 30 min |
| 25 | Add H3 sub-breaks to long blog sections | AI extraction | 2 hours |
| 26 | Verify Satoshi-700 preload necessity | FCP | 30 min |
| 27 | Add emergency/storm language to roofing + GBP | Local signal | 30 min |
| 28 | Add "Optional" section to llms.txt | AI search | 15 min |
| 29 | Increase BackOffice portfolio.js cache TTL | Return visits | 15 min |
| 30 | Reframe metal vs asphalt headings to question-form | Citability | 15 min |

---

## What's Already Excellent

1. **Schema markup** — Among the most comprehensive for any local business (dual-type, Wikidata, live ratings, department model)
2. **AI search readiness** — Best-in-class llms.txt architecture, expert robots.txt, DOI citations
3. **Security** — Enterprise-grade CSP with nonces + report-uri, HSTS preload, Permissions-Policy
4. **Technical SEO** — Full SSR, self-hosted fonts, lazy third-party scripts, proper canonicals
5. **Service area pages** — Pass doorway test with genuinely differentiated per-city content

---

## Audit Limitations

- CrUX field data not available — CWV scores are lab-only
- GBP dashboard access not available (API allowlist pending)
- Sitemap URL count not confirmed (estimated ~512 URLs)
- Yelp profile blocked (403)
- No competitor benchmarking (no paid tools)
- No Google Search Console data

---

*Audit generated by Claude Code SEO Audit — April 16, 2026*
