# Hamilton Exteriors — Full SEO Audit Report

**Audit date:** April 10, 2026
**Site:** https://hamilton-exteriors.com
**Business type:** Hybrid SAB — General Contractor (primary), Roofing Contractor (secondary)
**Stack:** Astro 6.1 SSR + Tailwind v4, deployed on Railway
**CMS:** Ghost (headless)

---

## Executive Summary

### Overall SEO Health Score: 81 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 85/100 | 18.7 |
| Content Quality | 23% | 78/100 | 17.9 |
| On-Page SEO | 20% | 80/100 | 16.0 |
| Schema / Structured Data | 10% | 82/100 | 8.2 |
| Performance (CWV) | 10% | 92/100 | 9.2 |
| AI Search Readiness | 10% | 74/100 | 7.4 |
| Images | 5% | 72/100 | 3.6 |

### Lighthouse Scores (Homepage)

| Category | Score |
|----------|-------|
| Performance | 98 / 100 |
| Accessibility | 100 / 100 |
| Best Practices | 100 / 100 |
| SEO | 100 / 100 |

### Top 5 Critical Issues

1. **"County County" schema bug** — All 6 county pages emit `"Alameda County County"` in areaServed and broken Wikipedia sameAs URLs
2. ~~Review velocity gap~~ — **FALSE POSITIVE.** Curated reviews file is dated Jan 2026, but live Google Reviews API is actively pulling fresh reviews (25 in the last 3 days). Review velocity is strong.
3. ~~Announcement-bar H1s on service pages~~ — **FALSE POSITIVE.** H1s are actually topical ("Bay Area's Architect-Led Roofing Contractors", etc.). The announcement text is a separate `<AnnouncementBar>` component, not the H1.
4. **No FAQ on 308 pSEO city pages** — City pages have `#faq` anchor links but no FAQ content or FAQPage schema; llms.txt promises citable FAQ that doesn't exist
5. **YouTube channel in sameAs may be empty** — @HamiltonExteriors declared on every page; if no videos exist, this is a broken entity signal (YouTube has ~0.737 AI citation correlation)

### Top 5 Quick Wins

1. Fix County County string interpolation in `[...slug].astro` (~15 min code fix)
2. Add `font-display: optional` to Satoshi 700 and Bold Font 400 weight (eliminates FOUT)
3. Reduce hero image quality from 82 to 75 on mobile preload (-60-80ms LCP)
4. Fix homepage URL in image-sitemap.xml.ts: change `page: '/'` to `page: ''`
5. Upgrade `connect.facebook.net` from dns-prefetch to preconnect (-100-200ms Meta Pixel load)

---

## 1. Technical SEO — 85/100

### Strengths
- **SSR architecture** — All pages render as full HTML; no JavaScript-gating of content
- **Canonical tags** — Centralized in Layout.astro with trailing-slash normalization matching `trailingSlash: 'never'`
- **robots.txt** — Comprehensive AI crawler rules; search crawlers allowed, training crawlers blocked
- **Meta robots** — `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1` on all indexable pages
- **noindex correctly applied** — /success, /404, legal pages excluded from sitemap
- **Skip-to-content link** — Present for accessibility
- **GTM deferred** — Loads on first user interaction or after 5s timeout; protects LCP/TBT
- **Mapbox lazy-loaded** — Only loads on address input focus; prevents 1.5MB initial JS
- **IndexNow integration** — Ghost webhook triggers instant URL submission to Bing/Yandex
- **RSS feed** — `/blog/rss.xml` for blog syndication

### Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| TTFB at 526ms | High | Railway SSR without edge caching; Google Reviews API fetch blocks HTML response on cache miss |
| No hreflang tags | Info | Single-language site (en-US); not required but `<html lang="en">` is present |
| Unused XML namespaces in sitemap | Info | `@astrojs/sitemap` injects unused `xmlns:news`, `xmlns:xhtml`, `xmlns:video` — harmless |

---

## 2. Content Quality — 78/100

### Strengths
- **Blog posts** — Well-sourced with statistics (ARMA, DOE, Census data), author bylines, publication dates
- **Service detail pages** — Excellent depth (e.g., asphalt-shingles at ~2,800 words with product-level pricing)
- **City pages** — Genuinely unique content per city (housing stock data, fire zone specifics, neighborhood names, permit timelines)
- **County pages** — Strong local differentiation (WUI zones, Chapter 7A requirements, micro-climate factors)
- **E-E-A-T signals** — CSLB license #1082377, architect credentials, manufacturer certifications, real project data

### Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| Main service page content is thin for AI citation | Medium | /roofing, /siding, etc. are conversion-focused with no extractable passages for AI search |
| Blog posts average ~1,000 words | Low | Below the 1,200-1,500 optimal range for AI citation; density is good but volume is thin |
| "Best Roofing Company in Oakland" H1 on city pages | Medium | Violates brand anti-superlative rule and reduces AI citation credibility |
| Financing section in blog is vague | Low | "Financing Your ADU" lacks specific figures needed for citability |

---

## 3. On-Page SEO — 80/100

### Strengths
- **Title tags** — Centralized default with per-page overrides; includes brand name
- **Meta descriptions** — Auto-generated for location pages with city-specific text; explicit on key pages
- **Open Graph + Twitter cards** — Complete on all pages with auto-generated OG images from hero
- **Heading hierarchy** — Proper H1>H2>H3 structure on blog and detail pages
- **Internal linking** — 4-tier service area hierarchy (index > county > city > city+service)
- **Breadcrumb schema** — Implemented at all tiers of the service area hierarchy

### Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| ~~H1s on service pages~~ | ~~High~~ | **FALSE POSITIVE** — H1s are topical ("Bay Area's Architect-Led Roofing Contractors"). Announcement is a separate component. |
| No cross-links from service pages to city pages | Medium | /roofing doesn't link to /service-areas/.../oakland-ca/roofing — missed PageRank distribution |
| Blog H2s use declarative style, not questions | Medium | ADU cost post uses "ADU Cost by Type" instead of "How much does a Bay Area ADU cost?" — misses FAQPage schema auto-detection |
| 47-city count in /service-areas may be stale | Low | Hard-coded "47 cities" in headline and FAQ — verify against current Ghost CMS data |

---

## 4. Schema / Structured Data — 82/100

### Strengths
- **Single @graph architecture** — All structured data consolidated into one JSON-LD block via Layout.astro
- **Dual business typing** — `["GeneralContractor", "RoofingContractor"]` correctly applied
- **Rich Organization schema** — Full org with AggregateRating, hasCredential (6 certifications), knowsAbout (10 topics with Wikipedia sameAs), hasOfferCatalog, founder Person, paymentAccepted
- **Live review data** — AggregateRating dynamically populated from Google Reviews API + curated multi-platform reviews
- **SpeakableSpecification** — Present on all service pages and blog posts (rare competitive advantage for Google AIO)
- **Wikidata entity** — Q139044457 linked in schema, llms.txt, and about page
- **Full vs. lean schema strategy** — Full org on homepage + top service pages; lean @id reference elsewhere

### Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| **"County County" bug** — 6 county pages emit "Alameda County County" in areaServed.name | Critical | String interpolation appends "County" when source name already contains it; Wikipedia sameAs URLs are broken (404) |
| FAQPage schema missing on 308 city pages | High | FAQ.astro component exists but is not wired into CountyPage.astro or GeneralCityPage.astro |
| FAQPage schema missing on blog posts with non-question H2s | Medium | Auto-FAQ detection in blog/[slug].astro only fires for question-format H2 headings |
| FAQPage emitted as separate JSON-LD block | Low | FAQ.astro outputs standalone script instead of merging into the @graph |
| Geo precision is 4 decimal places | Low | Schema uses 37.6942 / -122.0788 (11m precision); 5 decimals recommended (1m) |
| `contactPoint.areaServed` is state-level ("CA") | Low | Should match the 6-county areaServed array for specificity |

---

## 5. Performance (CWV) — 92/100

### Core Web Vitals (Lab Data — Homepage)

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| LCP | 2.0s | 2.5s | PASS |
| INP | Not measurable (lab) | 200ms | — |
| CLS | 0.031 | 0.1 | PASS |
| FCP | 1.5s | — | Good |
| TBT | 0ms | — | Excellent |
| TTI | 2.1s | — | Good |
| TTFB | 526ms | 200ms target | Elevated |
| Speed Index | 2.3s | — | Good |

### Issues (Priority Order)

| Issue | Severity | Est. Impact |
|-------|----------|-------------|
| TTFB 526ms — no edge caching on Railway SSR | High | -450ms LCP/FCP if reduced to ~100ms |
| Bold Font 400 weight on critical path but not preloaded | Medium | -100-150ms LCP |
| Hero image quality:82 — 32KB wasted | Medium | -60-80ms LCP on 4G |
| financing-house.jpeg at q=90 — 157KB wasted | High | -150KB page weight |
| Logo nav: PNG at 400x166, displayed at 250x104 — 18KB wasted | Medium | -18KB per page load |
| Meta Pixel: dns-prefetch instead of preconnect for connect.facebook.net | Medium | -100-200ms Pixel load |
| Satoshi 700: font-display:swap causes FOUT | Low | Use font-display:optional |
| Font cache TTL: 7 days (should be 1 year immutable) | Low | Repeat visit improvement |
| BackOffice widget: 1-hour cache (should be 7 days) | Low | Repeat visit -6KB |

---

## 6. AI Search Readiness (GEO) — 74/100

### Sub-Scores

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Citability | 25% | 76/100 | 19.0 |
| Structural Readability | 20% | 82/100 | 16.4 |
| Multi-Modal Content | 15% | 42/100 | 6.3 |
| Authority & Brand Signals | 20% | 84/100 | 16.8 |
| Technical Accessibility | 20% | 78/100 | 15.6 |

### Strengths
- **llms.txt + llms-full.txt** — Dynamically generated with live review data, pricing, FAQs; among the best in the contractor vertical
- **ai.txt** — Clear citation-allowed / training-blocked policy with attribution requirement
- **All AI search crawlers allowed** — GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Google-Extended, Applebot-Extended
- **SpeakableSpecification** on service and blog pages — rare competitive advantage
- **SSR** — No JS-gating of content; AI crawlers get full HTML
- **max-snippet:-1** — No snippet length restriction
- **Wikidata entity** — Strong disambiguation signal

### Platform Scores

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 78/100 | Service page H1s; no FAQ on city pages |
| ChatGPT / SearchGPT | 72/100 | YouTube sameAs gap; blog FAQ schema gap |
| Perplexity | 76/100 | City page FAQ gap; no Reddit presence |
| Bing Copilot | 68/100 | No HowTo schema; weak service page headings |

### Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| No FAQ content on 308 city pages despite llms.txt promise | High | llms.txt references citable FAQ on city pages that doesn't exist |
| YouTube channel may be empty | High | @HamiltonExteriors in sameAs on every page; 0.737 AI citation correlation |
| No Reddit presence | Medium | Bay Area homeowners actively research on r/bayarea, r/homeowners |
| Blog posts lack FAQPage schema (non-question H2s) | Medium | ADU cost and second story posts miss FAQ extraction pathway |
| Main service pages have zero extractable passages | Medium | Conversion-focused design offers nothing for AI citation |

---

## 7. Images — 72/100

### Strengths
- **Hero preload strategy** — Mobile (768px) and desktop (1440px) breakpoints with WebP, fetchpriority="high"
- **Responsive images** — Astro `<Image>` component generates srcset
- **Image sitemap** — Dedicated `/image-sitemap.xml` with per-page image entries
- **OG images** — Auto-generated from hero images at 1200x630 JPEG

### Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| financing-house.jpeg: 222KB at q=90 | High | Reduce to q=75 or switch to AVIF; saves ~157KB |
| Hero-bg: 84KB at q=82 | Medium | Reduce to q=75 on mobile; saves ~32KB, improves LCP |
| Nav logo: PNG at 400x166, displayed at 250x104 | Medium | Serve at display size + WebP; saves ~18KB |
| /contact missing from image sitemap | High | Indexable page with no image entry |
| /about/alex-hamilton-li missing from image sitemap | Low | Bio page with likely headshot has no image entry |
| Homepage URL inconsistency in image sitemap | Medium | Image sitemap uses trailing slash `/`; main sitemap does not |

---

## 8. Local SEO — 73/100

### Sub-Scores

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| GBP Signals | 25% | 68/100 | 17.0 |
| Reviews & Reputation | 20% | 72/100 | 14.4 |
| Local On-Page SEO | 20% | 80/100 | 16.0 |
| NAP Consistency | 15% | 82/100 | 12.3 |
| Local Schema | 10% | 74/100 | 7.4 |
| Local Link & Authority | 10% | 55/100 | 5.5 |

### NAP Consistency

| Source | Name | Match |
|--------|------|-------|
| Website / GBP | Hamilton Exteriors | Primary |
| BBB | Hamilton Exteriors, Inc | Minor variation |
| Angi / HomeAdvisor | ABR Quality Resources | **Mismatch** |

Address and phone are consistent across all sources.

### Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| ~~Review velocity~~ | ~~Critical~~ | **FALSE POSITIVE** — Live Google API shows 25 reviews in last 3 days; curated-reviews.ts dates are stale but irrelevant to velocity |
| Angi/HomeAdvisor listed under "ABR Quality Resources" | High | Tier 1 citations not attributed to primary brand name |
| No on-site Google review request CTA | High | Zero paths lead users toward leaving a Google review |
| GBP primary category unverified | High | Must confirm "General Contractor" is primary, not "Roofing Contractor" |
| No GBP Posts evidence | Medium | No signals of active GBP posting |
| No FAQ on county/city pages | High | FAQ component exists but not wired into location page templates |
| County pages use office geo coordinates | Medium | Should use county centroids |
| No manufacturer locator citations in sameAs | Medium | GAF, Owens Corning, James Hardie, CertainTeed locator URLs missing |
| Service pages don't cross-link to city pages | Medium | /roofing should link to top city roofing pages |
| Not BBB accredited | Low | A- rating, "Not Accredited" — trust gap for premium positioning |

---

## 9. Sitemap — 85/100

### Structure
- `/sitemap-index.xml` references `/sitemap-0.xml` (395 URLs) + `/image-sitemap.xml`
- No deprecated `<priority>` or `<changefreq>` tags
- All 395 URLs have `<lastmod>`

### Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| /contact missing from image sitemap | High | Indexable page with no image entry |
| Homepage trailing slash mismatch between sitemaps | Medium | sitemap-0: no slash; image-sitemap: with slash |
| 271 pages share identical lastmod (2026-03-30) | Low | Ghost CMS data gap; Google may deprioritize lastmod signal |
| Stale `seo_sitemap.xml` in repo root | Info | Old draft, not served; safe to delete |
| 308 location pages exceed quality gate threshold | Warning | Monitor GSC for "Crawled - currently not indexed" |
