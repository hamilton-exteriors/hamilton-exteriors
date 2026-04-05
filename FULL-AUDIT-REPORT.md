# Hamilton Exteriors — Full SEO Audit Report

**Domain:** hamilton-exteriors.com
**Date:** April 5, 2026
**Business Type:** Service Area Business (SAB) — Exterior Contractor (Roofing + General)
**Tech Stack:** Astro 6.1 + Tailwind v4, static site on Railway
**Total Pages:** 262 (11 main + 13 blog + 238 pSEO service area)

---

## Overall SEO Health Score: 79 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 88 | 19.4 |
| Content Quality | 23% | 74 | 17.0 |
| On-Page SEO | 20% | 82 | 16.4 |
| Schema / Structured Data | 10% | 80 | 8.0 |
| Performance (CWV) | 10% | 85 | 8.5 |
| AI Search Readiness (GEO) | 10% | 74 | 7.4 |
| Images | 5% | 58 | 2.9 |
| **TOTAL** | **100%** | | **79.6** |

**Bonus: Local SEO Score:** 74 / 100 (tracked separately)

---

## Executive Summary

### Top 5 Critical Issues
1. **Inline review schema risk** — 4 hardcoded reviews in Layout.astro must match verbatim Google/Yelp reviews or risk manual action
2. **GBP Place ID missing** — All Google Maps URLs use text search, not canonical CID — breaks knowledge graph connection
3. **pSEO thin content risk** — ~80-85% template ratio on city+service pages; smaller cities (Yountville, Calistoga) at doorway page threshold
4. **No YouTube/video presence** — YouTube correlation with AI citation is 0.737; zero videos detected
5. **BBB entity name mismatch** — "Hamilton Exteriors, Inc" vs "Hamilton Exteriors" creates citation inconsistency

### Top 5 Quick Wins
1. Add direct-answer lede to cost blog post (30 min, high GEO impact)
2. Add Yelp URL to schema `sameAs` array (5 min)
3. Add physical address to footer HTML as visible text (10 min)
4. Stagger blog publish dates in Ghost CMS (30 min — all 13 posts share same date cluster)
5. Add `<link rel="llms" href="/llms.txt">` to `<head>` for AI crawler discovery (5 min)

---

## 1. Technical SEO — 88 / 100

### Strengths
- **Astro SSR = full HTML delivery** — No JS rendering dependency for crawlers
- **Clean URL structure** — `/service-areas/{county}/{city}/{service}` with proper 4-level hierarchy
- **Canonical tags** — Properly auto-generated from `Astro.url.pathname`, omitted on noindex pages
- **Meta robots** — Correct `index,follow` default; `noindex,nofollow` on utility pages (success, 404, legal, quote-calculator)
- **HTTPS** — Enforced site-wide
- **Sitemap** — 262 URLs properly indexed in `/sitemap-0.xml`, noindex pages correctly excluded via filter
- **robots.txt** — Well-structured with proper AI crawler segmentation
- **RSS feed** — Present at `/blog/rss.xml`
- **Breadcrumb schema** — 5-level depth on city+service pSEO pages
- **Resource hints** — Preconnect/dns-prefetch for GTM, BackOffice, CompanyCam, Mapbox (conditional)
- **Font preloading** — Critical fonts (THE BOLD FONT 700, DM Sans) preloaded as WOFF2

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| MEDIUM | `/success` page in Google index | Has correct `noindex` tag and sitemap exclusion. Use GSC URL Inspection to force re-crawl or Removals tool. |
| MEDIUM | Stale sitemap lastmod dates | All 238 pSEO pages show `2026-03-30`. Should update dynamically when content changes. |
| MEDIUM | Security headers unverified | HSTS, X-Content-Type-Options, X-Frame-Options, CSP not confirmed. Railway may handle some. |
| LOW | Single sitemap for 262 URLs | Acceptable now, but splitting by type (pages, blog, service-areas) improves diagnostics. |
| LOW | No `Crawl-delay` directive | Low risk at current scale. |

---

## 2. Content Quality — 74 / 100

### E-E-A-T Assessment

| Signal | Rating | Evidence |
|--------|--------|----------|
| **Experience** | Strong | 500+ completed projects, real job examples with pricing, CompanyCam project photos |
| **Expertise** | Strong | Licensed architect + GC (CSLB #1082377), 5 manufacturer certifications, technical fire zone/building code content |
| **Authoritativeness** | Moderate | Author bio page, Person schema entity, but no Wikipedia, limited press, no industry associations |
| **Trustworthiness** | Strong | CSLB verification link, BBB listed, 52 reviews at 4.8 stars, transparent pricing |

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| HIGH | Blog publish date clustering | All 13 posts share April 3-4 2026 dates. Mass-publishing pattern flagged by AI quality filters. Stagger across Q1-Q2. |
| HIGH | County hub pages lack editorial content | Marin: no BCDC coastal zone content. Napa: no wine country context. Pure city selectors with generic descriptions. |
| MEDIUM | Cost blog post missing direct-answer lede | First 60 words defer the price range. Need "$8,000-$25,000 for most homes" in opening sentence for AI extraction. |
| MEDIUM | Same 4 reviews on all 262 pages | No city-specific social proof. Oakland page shows identical reviews as Calistoga. |
| MEDIUM | pSEO thin content risk | ~80-85% template ratio. Smaller cities (Yountville, Calistoga, American Canyon) at doorway page threshold. |
| LOW | No emergency/storm damage content | Missing high-intent local queries ("emergency roofer Oakland", "roof insurance claim Bay Area"). |

---

## 3. On-Page SEO — 82 / 100

### Strengths
- Unique H1 per page with keyword targeting
- Dynamic title tags: `{Service} in {City}, CA | Hamilton Exteriors`
- Dynamic meta descriptions with phone, license, warranty
- Clean H1→H2→H3 hierarchy across all page types
- County→City→Service internal linking with sibling links and "Nearby Cities"
- FAQPage schema on service and city pages
- Complete OG/Twitter cards with auto-generated hero-based OG images

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| MEDIUM | No service→parent city internal link | Walnut Creek Roofing links to siblings but not `/walnut-creek-ca` hub. Missing link equity flow. |
| MEDIUM | Blog H2s declarative, not question-based | "What We See on Real Bay Area Jobs" → "What Does a Real Bay Area Roof Replacement Cost?" |
| LOW | "50+" vs "52" review count | Visible text says "50+ reviews" but schema says 52. Use specific number. |
| LOW | Founder LinkedIn = company page | Person schema `sameAs` links to company LinkedIn, not personal profile. |

---

## 4. Schema / Structured Data — 80 / 100

### Implemented Schema

| Schema Type | Quality | Notes |
|-------------|---------|-------|
| RoofingContractor + GeneralContractor | Excellent | Dual type, full properties, @id anchor |
| WebSite (homepage) | Good | Search action present |
| AggregateRating | Good | 4.8/52 reviews |
| Review (x4 inline) | **Risk** | Hardcoded — must verify against live platform reviews |
| EducationalOccupationalCredential | Excellent | CSLB with recognizedBy |
| Person (Founder) | Good | @id anchor, CSLB sameAs |
| OfferCatalog (6 services) | Good | @id references to service pages |
| BreadcrumbList | Good | 5-level depth on pSEO pages |
| Service + AggregateOffer | Good | City-specific pricing on pSEO pages |
| FAQPage | Good | Service + city pages |

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| HIGH | Inline reviews need verification | 4 hardcoded reviews in Layout.astro:264-297. Must match verbatim Google/Yelp reviews. Add `url` property if valid. |
| MEDIUM | Yelp missing from sameAs | Facebook, Instagram, LinkedIn, Google Maps present — Yelp omitted despite badge on-site. |
| MEDIUM | hasMap uses text-search URL | Should be canonical CID URL (`?cid=XXXXXXXXX`) for knowledge graph connection. |
| MEDIUM | pSEO pages get lean @id-only schema | 238 pages emit stub instead of full Organization. Valid but carries no standalone signal. |
| LOW | County pages missing geo coordinates | City pages have areaServed with coords; county pages don't have centroid. |

---

## 5. Performance (CWV) — 85 / 100

### Strengths
- Static pre-rendered HTML (no SSR latency)
- Responsive hero preloads: 768px/1440px WebP with `fetchpriority="high"`
- Self-hosted WOFF2 fonts preloaded in `<head>`
- GTM deferred via interaction trigger
- Mapbox conditional loading
- Preconnect/dns-prefetch for external domains

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| MEDIUM | BackOffice widget on every Projects section | Fetches from Railway + CompanyCam CDN on non-critical below-fold content. |
| MEDIUM | Image dimensions not verified everywhere | 53 responsive image attributes across 19 files. Verify ALL images (logos, reviewer photos) have explicit width/height for CLS. |
| LOW | Satoshi font not preloaded | Third font used for labels. Acceptable — secondary UI element. |
| LOW | No AVIF format | WebP used but AVIF offers 20-30% better compression. |

---

## 6. AI Search Readiness (GEO) — 74 / 100

### Platform Scores
| Platform | Score | Key Factor |
|----------|-------|------------|
| Google AI Overviews | 72 | Google-Extended allowed; FAQPage schema; weak entity |
| Perplexity | 79 | PerplexityBot allowed; strong structured data; direct-answer passages |
| ChatGPT Web Search | 71 | GPTBot + OAI-SearchBot allowed; pricing data highly citable; no Reddit/YouTube |
| Bing Copilot | 70 | Bingbot allowed; schema strong; brand entity not established externally |

### AI Crawler Access (All Correct)
| Crawler | Status |
|---------|--------|
| GPTBot / OAI-SearchBot | Allowed (except /api/) |
| PerplexityBot | Allowed (except /api/) |
| ClaudeBot | Allowed (except /api/) |
| Google-Extended | Allowed (except /api/) |
| Applebot-Extended | Allowed (except /api/) |
| CCBot / anthropic-ai / cohere-ai | Blocked (training) |

### llms.txt Status
Present, well-formed per llmstxt.org spec. Includes citation permission, "Key Facts for Citation" with external sources, per-SKU pricing in llms-full.txt. Above average for local contractors.

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| HIGH | No YouTube presence | 0.737 citation correlation — strongest measured GEO signal. Zero videos. |
| HIGH | No Reddit presence | Bay Area subreddits active for contractor recommendations. |
| MEDIUM | Cost blog missing direct-answer lede | AI extractors need the answer in first 60 words. |
| MEDIUM | GBP completeness unconfirmed | Google AIO for local queries draws primarily from GBP data. |
| MEDIUM | llms.txt citations lack retrieval dates | Reduces freshness scoring for AI systems. |
| LOW | No RSL 1.0 machine-readable license | Human-readable only. |

---

## 7. Images — 58 / 100

### Strengths
- Responsive WebP hero with `<picture>` (768w, 1280w, 1440w) + `fetchpriority="high"` preloads
- Auto-generated OG images from hero (1200x630 JPEG)
- 100% CLS prevention — all 85 images across 4 audited pages have width/height
- Correct eager/lazy split (ATF eager, BTF lazy)
- Astro build-time WebP conversion on managed images

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| CRITICAL | **Image sitemap 100% broken** | All 57 URLs in `/image-sitemap.xml` return 404. Astro hashes filenames (`hero-bg-2400.B0AiramO.jpg`) but sitemap hardcodes unhashed paths (`hero-bg.jpg`). Fix: dynamically resolve hashed paths at build time via image imports. |
| CRITICAL | **pSEO pages have zero unique images** | Oakland roofing shares 100% of images with `/roofing` template. All 238 city pages show identical hero, service cards, reviewer photos. Reinforces "template" signal for Google's helpful content system. |
| CRITICAL | **pSEO pages use fallback og-default.jpg** | All ~238 pages share same OG image. Identical link previews on social/Google Discover. Need programmatic city+service branded OG cards. |
| HIGH | **Blog images unoptimized JPEG** | All 8 blog content images served as raw JPEG from Ghost CMS (blog OG = 283KB). No WebP/AVIF conversion. Significant performance gap vs Astro-managed pages. |
| HIGH | **No srcset/sizes on Astro page images** | Hero uses `<picture>` (good) but all other images (service cards 566x292, CTA 1200x900) serve single resolution. Mobile downloads desktop-sized images. |
| HIGH | **Schema ImageObject missing on 3/4 page types** | Only blog has proper ImageObject in JSON-LD. Homepage/service/pSEO use bare URL string or nothing. Rich results require ImageObject with url/width/height. |
| MEDIUM | Decorative icons lack aria-hidden | Checkmark SVG `<img>` tags have bare `alt` (ambiguous). Need explicit `alt="" aria-hidden="true"`. |
| MEDIUM | 34/69 inline SVGs missing aria-hidden | Partial fix from commit 277cfed but ~50% remain. |
| MEDIUM | CTA image oversized | `cta-assistant.jpg` served at 1200x900 (144KB WebP) below fold. 800x600 at quality 65 would be ~60KB. |
| LOW | Blog images use stock filenames | `0-pexels-33043436-1.jpeg` — no SEO value. Rename to descriptive slugs. |
| LOW | No AVIF format | WebP used but AVIF offers 20-30% better compression (93% browser support). |
| LOW | Alt text slightly formulaic | "[Service] services by Hamilton Exteriors in the Bay Area" pattern across all service cards. |

---

## 8. Local SEO — 74 / 100

### Strengths
- NAP highly consistent across all pages
- RoofingContractor + GeneralContractor dual schema with full properties
- CSLB license prominently displayed and linked
- 5 manufacturer certifications in schema
- Textbook 4-level URL hierarchy with breadcrumbs
- City-specific content: neighborhoods, permit costs, fire zones, home values

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| CRITICAL | GBP Place ID missing | All Maps URLs use text search. Replace with `?cid=XXXXXXXXX`. Breaks knowledge graph entity connection. |
| HIGH | Review velocity risk | 52 reviews, last dated March 25. Approaching 18-day cliff. Need 3+/month minimum. |
| HIGH | BBB entity name mismatch | "Hamilton Exteriors, Inc" on BBB vs "Hamilton Exteriors" everywhere else. |
| HIGH | Manufacturer citations unclaimed | GAF, Owens Corning, CertainTeed contractor finders (DA 60+ each). |
| MEDIUM | No Nextdoor Business page | High-relevance for residential contractors in affluent Bay Area. |
| MEDIUM | No emergency/insurance claim content | Missing high-intent local queries. |
| MEDIUM | County hubs lack editorial depth | Marin (no BCDC content), Napa (no wine country context). |
| MEDIUM | No physical address in footer HTML | Phone and Maps link present but no visible street address text. |

---

## Prioritized Action Plan

### Critical (Fix Immediately)

| # | Action | Effort |
|---|--------|--------|
| 1 | Verify 4 inline reviews match real Google/Yelp reviews verbatim. Remove or add `url` property. | 1 hour |
| 2 | Add GBP canonical Place ID (`?cid=XXXXXXXXX`) to hasMap, sameAs, footer link. | 30 min |
| 3 | Fix BBB entity name to match schema exactly. | 15 min |

### High Priority (This Week)

| # | Action | Effort |
|---|--------|--------|
| 4 | Add direct-answer lede to cost blog post. | 30 min |
| 5 | Stagger blog publish dates in Ghost CMS across Q1-Q2 2026. | 30 min |
| 6 | Claim manufacturer citation listings (GAF, Owens Corning, CertainTeed). | 2 hours |
| 7 | Build review velocity system (text/email follow-up, direct Google review link). | 2 hours |
| 8 | Add Yelp URL to schema sameAs array. | 5 min |
| 9 | Request GSC removal of `/success` if still indexed. | 10 min |

### Medium Priority (This Month)

| # | Action | Effort |
|---|--------|--------|
| 10 | Add editorial content to Marin + Napa county pages (300+ words each). | 2 hours |
| 11 | Add emergency roofing + insurance claim content. | 2 hours |
| 12 | Create YouTube channel with 3 anchor videos. | 2-4 weeks |
| 13 | Add physical address to footer HTML. | 15 min |
| 14 | Convert blog H2s to question format. | 1 hour |
| 15 | Add service→parent city internal links. | 1 hour |
| 16 | Create Nextdoor Business page. | 1 hour |
| 17 | Add founder's personal LinkedIn to Person schema sameAs. | 10 min |
| 18 | Verify explicit width/height on ALL images. | 1 hour |

### Low Priority (Backlog)

| # | Action | Effort |
|---|--------|--------|
| 19 | Add GeoCoordinates to county-level Service schema. | 30 min |
| 20 | Add Crawl-delay to robots.txt. | 5 min |
| 21 | Split sitemap by page type. | 1 hour |
| 22 | Add AVIF format alongside WebP. | 2 hours |
| 23 | Establish Reddit presence on Bay Area threads. | Ongoing |
| 24 | Add retrieval dates/URLs to llms.txt citations. | 30 min |
| 25 | Add RSL 1.0 machine-readable license to llms.txt. | 15 min |
| 26 | Change "50+ reviews" to "52 verified reviews". | 5 min |

---

## Benchmarks

| Metric | Hamilton Exteriors | Industry Avg (Home Services) | Top 10% |
|--------|-------------------|------------------------------|---------|
| Overall SEO Health | **79** | 45-55 | 85+ |
| Technical SEO | **88** | 50-60 | 90+ |
| Content Quality | **74** | 40-50 | 85+ |
| Schema Richness | **80** | 20-30 | 85+ |
| GEO Readiness | **74** | 15-25 | 80+ |
| Local SEO | **74** | 55-65 | 85+ |

The site is significantly above home services industry average across all categories. The Astro static site, comprehensive schema, AI crawler access, and llms.txt place the technical foundation in the top tier for any local contractor.

**Primary growth vectors:**
1. Off-site signals (YouTube, Reddit, manufacturer citations, GBP) — binding constraint for AI citation
2. Content depth on county hubs and smaller city pSEO pages — doorway page risk mitigation
3. Review velocity — 52 reviews is below threshold for a 5-county SAB

---

*Generated by Claude Code SEO Audit — April 5, 2026*
