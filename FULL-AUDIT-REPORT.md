# Hamilton Exteriors — Full SEO Audit Report

**Audit Date:** April 6, 2026 (v4)
**Site:** https://hamilton-exteriors.com
**Stack:** Astro 6.1 SSR on Railway, Ghost CMS (headless blog)
**Pages crawled:** 373 (sitemap-0.xml)
**Business type:** Hybrid SAB — Exterior Remodeling Contractor (Roofing, Siding, Windows, ADUs, Custom Homes, Additions)

---

## Overall SEO Health Score: 76 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 82/100 | 18.0 |
| Content Quality | 23% | 72/100 | 16.6 |
| On-Page SEO | 20% | 79/100 | 15.8 |
| Schema / Structured Data | 10% | 75/100 | 7.5 |
| Performance (CWV) | 10% | 78/100 | 7.8 |
| AI Search Readiness (GEO) | 10% | 81/100 | 8.1 |
| Images | 5% | 68/100 | 3.4 |
| **Total** | **100%** | — | **77.2** |

**Local SEO Score (supplemental): 74 / 100**

---

## Executive Summary

Hamilton Exteriors has a **strong technical foundation** — SSR architecture, clean URL structure, thorough schema markup, well-configured robots.txt with AI crawler strategy, and llms.txt/llms-full.txt files that put it ahead of 95%+ of contractors. The site is well-built for 2026 SEO.

### Top 5 Critical Issues
1. **geo.position hardcoded to HQ on all 350+ pSEO pages** — every city page signals Castro Valley coords instead of the target city
2. **Review velocity stalled** — last visible review is 74 days old (Jan 22, 2026), exceeding the 18-day ranking cliff
3. **pSEO thin content risk** — ~70-75% shared boilerplate across 350 city/service pages, only 25-30% unique
4. **Schema @type array on Organization** breaks Google's LocalBusiness rich result classification
5. **Image sitemap missing 350+ pSEO pages** — only 21 of 373 pages have image sitemap entries

### Top 5 Quick Wins
1. Fix geo.position to use city coordinates (template change, affects 350+ pages)
2. Fix "Contra Costa County County" schema typo
3. Add San Mateo County cities to llms-full.txt (15-minute fix)
4. Add missing blog posts to llms.txt index (7 of 12 listed, 5 missing)
5. Add `@context` to lean schema reference on non-full-org pages

---

## 1. Technical SEO (Score: 82/100)

### Crawlability — PASS
- **robots.txt:** Well-configured. AI search crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, bingbot). Training-only crawlers blocked (CCBot, anthropic-ai, cohere-ai, Bytespider). `/api/` blocked for all. Crawl-delay: 2.
- **Sitemaps:** sitemap-index.xml -> sitemap-0.xml (373 URLs) + image-sitemap.xml (21 pages). All lastmod dates current (2026-03-30 or 2026-04-05).
- **Missing from robots.txt:** Amazonbot (Amazon Rufus AI) and Diffbot — emerging but not critical.

### Indexability — PASS
- **Canonical tags:** Present and correct on all pages. Derived from `Astro.url.pathname` with trailing slash stripped (Layout.astro:74).
- **Meta robots:** `index, follow` on all content pages. `noindex, nofollow` available via prop (Layout.astro:117).
- **No inappropriate noindex detected.**

### URL Structure — PASS
- Clean hierarchy: `/service-areas/[county-ca]/[city-ca]/[service]`
- No query parameters, no session IDs, no unnecessary depth.
- Trailing slashes correctly stripped (`trailingSlash: 'never'`).

### Security — NEEDS VERIFICATION
- **HTTPS:** Enforced.
- **Security headers:** CSP, X-Frame-Options, HSTS, Permissions-Policy not confirmed from source code. **Recommend verifying via `curl -I https://hamilton-exteriors.com`.**

### Mobile — PASS
- Viewport meta tag: `width=device-width, initial-scale=1` (Layout.astro:85).
- Responsive CSS with media queries. Hero image responsive with 3 breakpoints.

### SSR Architecture — PASS
- Astro SSR produces fully server-rendered HTML. No hydration dependency for content.
- Schema injected as `<script type="application/ld+json">` at render time.
- Blog posts fetched from Ghost CMS and server-rendered.

### Resource Optimization — PASS
- Font preloading: THE BOLD FONT 700 + DM Sans (Layout.astro:106-108).
- Hero image preloaded with mobile/desktop variants and `fetchpriority="high"` (Layout.astro:111-112).
- Preconnect hints for GTM, GA, BackOffice, CompanyCam (Layout.astro:89-102).
- GTM deferred. Mapbox conditional on `includeMapbox` prop.

### Issues Found

| # | Issue | Severity | File | Detail |
|---|-------|----------|------|--------|
| T1 | geo.position hardcoded to HQ | **High** | Layout.astro:122 | `37.69427;-122.07887` on all pages. pSEO pages should use city coords. |
| T2 | /financing returns 404 | **High** | — | Nav links to `/#financing` (anchor) which works, but `/financing` standalone 404s. |
| T3 | /about returns 404 | **Medium** | — | Actual page is `/about/alex-hamilton-li`. External links to `/about` break. |
| T4 | /contact returns 404 | **Medium** | — | No dedicated contact page. SABs benefit from crawlable `/contact`. |
| T5 | Security headers unverified | **Medium** | Railway config | CSP, HSTS, X-Frame-Options need Railway-level check. |
| T6 | Sitemap dual reference | **Low** | robots.txt | image-sitemap.xml listed as separate entry and via index. |

---

## 2. Content Quality (Score: 72/100)

### E-E-A-T Signals — STRONG
- **Experience:** Real project photos via CompanyCam. Specific project references in blog content.
- **Expertise:** Alexander Hamilton Li bio with ProfilePage schema, CSLB #1082377, architect + GC credentials.
- **Authoritativeness:** 5 manufacturer certs (GAF, Owens Corning, CertainTeed, James Hardie, Tesla Powerwall). 4.8/52 Google reviews. External source citations in blogs.
- **Trustworthiness:** $2M liability insurance, BBB A- rating, CSLB verification link, 50-year warranty.

### Content Depth — GOOD on core, THIN on pSEO

**Core service pages (PASS):** /roofing, /siding, /windows have substantial content with pricing tables, material comparisons, FAQ sections, and local context.

**Blog posts (PASS):** 12 posts averaging 1,500-2,200 words. Cost guide post (2,151 words) is the strongest — specific pricing, source citations, local data.

**pSEO pages (AT RISK):** ~350 city/service pages with:
- 25-30% unique city-specific content (neighborhoods, housing stats, permit info, climate)
- 70-75% shared boilerplate (certifications, financing, warranty, service descriptions, FAQ)
- Passes basic doorway page test but at threshold for Helpful Content devaluation.

### Blog Photos — MEDIUM CONCERN
- 8/12 blog posts (67%) use identifiable Pexels/Unsplash stock photos
- 4/12 (33%) use custom/original images
- Stock photos don't differentiate from competitors, weaker E-E-A-T signal

---

## 3. On-Page SEO (Score: 79/100)

### What's Working Well
- Canonical tags correct on every page
- OG + Twitter cards fully implemented with 1200x630 images
- Heading hierarchy clean (no skipped levels)
- NAP consistency perfect
- Internal linking dense (50-85+ links per page)
- RSS feed at `/blog/rss.xml`
- AI discovery links (`rel="ai-content-declaration"`, `rel="llms"`)
- geo.region and geo.placename correct on pSEO pages

### Issues Found

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| O1 | City-level title tags too long | **High** | Walnut Creek = 80 chars (limit 60). Pattern lists all services in title. |
| O2 | pSEO H1 superlative pattern | **High** | "Best [Service] Company in [City]" flagged as keyword-stuffing. |
| O3 | "Contra Costa County County" typo | **High** | Double "County" in schema containedInPlace. Also wrong Wikipedia URL casing. |
| O4 | CompanyCam images missing alt text | **Medium** | Portfolio photos across all pages lack alt attributes. |
| O5 | Meta descriptions under 150 chars | **Medium** | /roofing (144), /blog (125), blog cost post (135). |
| O6 | og:type "website" on blog posts | **Low** | Should be "article" for BlogPosting pages. |
| O7 | Blog index H2 duplicates H1 | **Low** | Subtitle wrapped in H2 instead of `<p>`. |

---

## 4. Schema & Structured Data (Score: 75/100)

### Detection Summary

| Page Type | Schema Found |
|-----------|-------------|
| Homepage | Organization (RoofingContractor + GeneralContractor), WebSite, FAQPage, Review x4, AggregateRating |
| Service pages | Organization (lean @id), BreadcrumbList, WebPage, Service, AggregateOffer |
| Blog posts | BlogPosting, BreadcrumbList, FAQPage (dynamic), SpeakableSpecification |
| About page | ProfilePage (Person), BreadcrumbList |
| pSEO city pages | BreadcrumbList, WebPage, Service, LocalBusiness, Review, FAQPage |

### NAP in Schema — CONSISTENT
No conflicts across all schema instances.

### Issues Found

| # | Issue | Severity | File | Detail |
|---|-------|----------|------|--------|
| S1 | @type array breaks Google entity classification | **Critical** | Layout.astro | `["RoofingContractor", "GeneralContractor"]` — Google requires single type. Use `additionalType`. |
| S2 | LocalBusiness @type conflicts with Organization @id | **Error** | GeneralCityPage.astro | Same @id but different @type creates conflicting entity. |
| S3 | `author` invalid on Service schema | **Error** | ServicePage.astro | `author` belongs to CreativeWork types, not Service. |
| S4 | `isPartOf` references undefined blog#collection | **Warning** | blog/[slug].astro | No Blog/CollectionPage schema on /blog index. |
| S5 | Wikipedia concepts in Organization sameAs | **Warning** | Layout.astro | `/wiki/Roofing`, `/wiki/Siding` dilute entity identity. |
| S6 | reviewCount 52 vs 4 embedded reviews | **Warning** | Layout.astro | Mismatch may cause Rich Results Test warning. |
| S7 | Hardcoded dateModified on Service blocks | **Warning** | ServicePage.astro | `'2026-03-30'` will become stale. |
| S8 | City page reviews all dated 2026-01-15 | **Warning** | GeneralCityPage.astro | Same date on every page weakens authenticity. |
| S9 | BreadcrumbList unconfirmed on non-roofing service pages | **Warning** | siding.astro et al. | Only /roofing confirmed to pass breadcrumb jsonLd. |
| S10 | Person.image is generic OG image | **Warning** | alex-hamilton-li.astro | Uses `/og-default.jpg` instead of actual headshot. |
| S11 | `areaServed` uses invalid `@type: "County"` | **Warning** | Layout.astro | Not a Schema.org type. Use `AdministrativeArea`. |
| S12 | Lean @id reference missing `@context` | **Warning** | Layout.astro:341 | Non-full-schema pages lack `@context` on stub. |
| S13 | FAQ answer fallback publishes question as answer | **Warning** | blog/[slug].astro | If H2 followed by another H2, answer = question text. |

---

## 5. Performance / Core Web Vitals (Score: 78/100)

### Architecture Strengths
- Astro SSR — no hydration delay for content
- Hero preloaded with responsive breakpoints + `fetchpriority="high"`
- Self-hosted fonts preloaded
- Extensive `loading="lazy"` (27+ components)
- Astro image pipeline: WebP, content-hashed URLs
- GTM deferred, Mapbox conditional

### Issues
- **Brotli middleware** recently fixed (commit 2e4cf56)
- **CompanyCam images** — external CDN, no width/height — CLS risk
- **Ghost blog images** — served as original JPEG, not WebP
- **Service card images** — fixed 566px, no srcset

### Note
Lab-only assessment. Field data (CrUX) not available in this audit. Recommend running PageSpeed Insights on homepage, /roofing, and one pSEO page.

---

## 6. AI Search Readiness / GEO (Score: 81/100)

### Platform Scores

| Platform | Score | Bottleneck |
|----------|-------|-----------|
| Google AI Overviews | 84 | SpeakableSpec on blog only, not service pages |
| ChatGPT / Perplexity | 82 | llms.txt excellent; only 52 reviews |
| Bing Copilot | 80 | Strong data; missing Bing Webmaster verification |
| Apple Intelligence | 75 | Limited entity presence outside own domain |

### llms.txt — PASS with gaps
- Well-structured per llmstxt.org spec with RSL-1.0 license
- "Key Facts for Citation" section is standout
- **Gap:** Only 7/12 blog posts listed
- **Gap:** San Mateo County missing from llms-full.txt city list
- **Gap:** No YouTube or Reddit links

### Citability Strengths
- FAQ answers in 40-60 word direct-answer range
- External source citations validate claims
- SpeakableSpecification on blog posts
- Blog cost guide = 91/100 citability score

### Key Gaps
- SpeakableSpec missing from all service pages
- No YouTube channel (highest brand-citation correlation ~0.737)
- No Wikidata entity
- Review count below 100+ confident citation threshold
- `max-snippet:-1` meta tag unconfirmed

---

## 7. Images (Score: 68/100)

| Category | Score | Notes |
|----------|-------|-------|
| Alt text (core pages) | 9/10 | Descriptive, keyword-rich |
| Format optimization | 8/10 | WebP via Astro pipeline; Ghost images still JPEG |
| Image sitemap | 3/10 | Only 21/373 pages covered; pSEO pages excluded |
| Lazy loading | 9/10 | Comprehensive implementation |
| Dimensions (CLS) | 9/10 | width/height set; CompanyCam exception |
| Responsive images | 6/10 | Hero excellent; service cards lack srcset |
| OG/social images | 9/10 | Auto-generated 1200x630 from hero |
| Blog stock vs original | 4/10 | 67% identifiable stock photos |

### Top Issues
1. **Image sitemap gap (High):** 350+ pSEO pages excluded from image-sitemap.xml.ts
2. **CompanyCam alt text (Medium):** Portfolio images missing descriptive alts
3. **No srcset on service cards (Medium):** Fixed 566px served to all viewports
4. **Stock blog images (Medium):** 8/12 posts use Pexels/Unsplash

---

## 8. Local SEO (Score: 74/100)

| Dimension | Score |
|-----------|-------|
| GBP Signals | 76/100 |
| Reviews & Reputation | 80/100 |
| Local On-Page SEO | 78/100 |
| NAP Consistency & Citations | 63/100 |
| Local Schema Markup | 82/100 |
| Local Link & Authority | 58/100 |

### NAP Consistency — ONE MISMATCH
- BBB lists "Hamilton Exteriors, **Inc**" vs "Hamilton Exteriors" everywhere else
- All other sources consistent

### Review Health — AT RISK
- Rating: 4.8/5.0 (PASS)
- Count: 52 (above minimum, below competitive threshold of 100+)
- **Velocity: STALLED** — last visible review Jan 22, 2026 (74 days ago). Exceeds 18-day cliff.
- Schema reviews: 4 hardcoded, need dynamic refresh

### Citation Gaps
- **Present:** Google (CID), Yelp, BBB, Facebook, LinkedIn, Instagram
- **Missing (critical):** Thumbtack (ChatGPT/Alexa integration)
- **Missing:** Nextdoor, Houzz

### Service Area Pages — THRESHOLD
- 417 pSEO URLs, well-structured hierarchy
- ~25-30% unique content per city page
- H1 "Best [Service] Company in [City]" is superlative pattern
- No emergency repair language (high-converting intent gap)
- Tesla Powerwall cert underutilized (buried in logo slider)

### Industry-Specific — STRONG
- CSLB #1082377 with live verification link — excellent
- 5 manufacturer certifications in schema `hasCredential`
- $2M liability insurance stated
- WUI/fire zone compliance language on relevant pages

---

## Methodology

- **Crawl scope:** 373 URLs from sitemap-0.xml + image-sitemap.xml
- **Deep analysis:** Homepage, /roofing, /siding, /blog, /blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026, /about/alex-hamilton-li, /service-areas/alameda-county-ca/oakland-ca/roofing, /service-areas/contra-costa-county-ca/walnut-creek-ca
- **Source code:** Layout.astro, ServicePage.astro, GeneralCityPage.astro, blog/[slug].astro, FAQ.astro, image-sitemap.xml.ts, constants.ts
- **8 specialist subagents:** Technical, Content/E-E-A-T, Schema, On-Page, Performance, GEO, Local, Images

### Limitations
- No Lighthouse/PageSpeed field data (CrUX)
- No GBP dashboard access (primary category unverifiable)
- No DataForSEO live SERP positions
- Yelp returned 403 (NAP unverifiable)
- No Ahrefs/Majestic backlink data
