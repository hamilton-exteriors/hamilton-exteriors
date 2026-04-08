# Hamilton Exteriors — Full SEO Audit Report

**Site:** https://hamilton-exteriors.com
**Date:** 2026-04-08 (v7 — 7-agent comprehensive audit)
**Pages Crawled:** 600+ in sitemap, ~2,000 crawlable (12 main + 13 blog + 6 county + 23 city + ~1,584 city+service)
**Business Type:** Local Service — General Contractor + Roofing Contractor (SAB/Hybrid)
**Service Area:** 6 Bay Area Counties (Alameda, Contra Costa, Marin, Napa, Santa Clara, San Mateo)
**Previous Score:** 77/100 (v6, April 6)

---

## Executive Summary

### Overall SEO Health Score: 75/100 (-2 from v6)

Hamilton Exteriors has a **solid SEO foundation** — SSR rendering, rich structured data, strong E-E-A-T signals, and well-configured AI crawler access. However, this deeper audit revealed several issues missed in v6: **~1,584 city+service pages are missing from the sitemap**, **stale internal links create redirect chains**, **/buy conversion pages are missing from the sitemap**, the **`/contact` page returns 404**, and **duplicate BreadcrumbList blocks** fire on city+service pages. Addressing these drops the score from v6's 77 to a more accurate 75, but the path to 90+ is clear with focused fixes.

### Top 5 Critical Issues
1. **~1,584 city+service pages missing from sitemap** — live, indexed, but no sitemap entry or lastmod signal
2. **Stale internal links** on city pages using old `/service-areas/alameda/` format → 301 redirect chains
3. **`/contact` page returns 404** — standard NAP citation target for crawlers and users
4. **`/buy` and `/buy/scan` missing from sitemap** — highest-value conversion pages have no crawl signal
5. **Duplicate BreadcrumbList** on city+service pages — two competing breadcrumb blocks per page

### Top 5 Quick Wins
1. Add `/buy` and `/buy/scan` to sitemap-0.xml — 5 min fix
2. Add alt text to 2 homepage images (hero, mission silhouette) — 10 min
3. Fix stale internal link template (`/service-areas/alameda/` → `/service-areas/alameda-county-ca/`) — 15 min
4. Gate FAQPage schema emission with a prop (remove from all commercial pages) — 30 min
5. Create a `/contact` page with full NAP — 30 min

---

## 1. Technical SEO (Score: 74/100)

### Crawlability — Mixed

**Strong:**
- robots.txt well-configured. Allows Googlebot, Bingbot. Blocks `/api/`. AI bots (GPTBot, PerplexityBot, ClaudeBot) allowed. Training bots blocked.
- Sitemap-index.xml → sitemap-0.xml (375 URLs) + image-sitemap.xml (224 pages/237 images)
- SSR confirmed: full HTML in page source, no JS rendering required

**Critical issues:**
- **~1,584 city+service pages are crawlable but absent from sitemap.** They return 200, have self-referencing canonicals, and are linked from city pages — but Google has no lastmod or crawl priority signal for them.
- **Stale internal links** on city pages emit old format `/service-areas/alameda/berkeley` instead of `/service-areas/alameda-county-ca/berkeley-ca` → 301 redirect chains diluting PageRank.
- **`/buy` and `/buy/scan` missing from sitemap** — highest-value conversion pages.

### Indexability — Good
- Self-canonical on every indexable page, omitted on 404/noindex pages
- `noindex, nofollow` on 404 pages
- BreadcrumbList on all subpages (but duplicated on city+service pages — see Schema section)

### URL Structure — Clean
```
/                                                    (homepage)
/roofing                                             (service)
/service-areas                                       (hub)
/service-areas/alameda-county-ca                     (county)
/service-areas/alameda-county-ca/oakland-ca          (city)
/service-areas/alameda-county-ca/oakland-ca/roofing  (city+service)
```
All lowercase, hyphenated, `-ca` suffix. No trailing slash inconsistencies.

### Security — Strong (with one gap)
- HTTPS enforced ✅
- HSTS with `preload` and `includeSubDomains`, 2-year max-age ✅
- `X-Frame-Options: SAMEORIGIN` ✅
- `X-Content-Type-Options: nosniff` ✅
- `Referrer-Policy: strict-origin-when-cross-origin` ✅
- `Permissions-Policy` present ✅
- **Gap:** CSP uses `'unsafe-inline'` in `script-src` — weakens XSS protection

### Internal Linking — Good on Service Pages, Weak on Homepage
- Service pages: 60+ internal links each
- City pages: 45-50 internal links
- **Homepage nav uses anchor links** (`/#about`, `/#financing`, `/#review`) — no crawlable link equity
- **Stale links** on city pages to old URL format create redirect hops

### Performance Infrastructure — Strong
- Astro SSR = server-rendered HTML (fast FCP)
- Hero image preloaded with `fetchpriority="high"` and responsive srcset ✅
- GTM deferred until first user interaction (eliminates from TBT/INP critical path) ✅
- All images have explicit `width` and `height` attributes (low CLS risk) ✅
- Tailwind v4 = minimal CSS bundle

| Severity | Finding |
|----------|---------|
| Critical | ~1,584 city+service pages missing from sitemap |
| Critical | Stale internal links `/service-areas/alameda/` causing 301 redirects |
| Critical | `/buy` and `/buy/scan` missing from sitemap |
| High | No IndexNow implementation (important for pSEO at scale) |
| High | CSP uses `unsafe-inline` in script-src |
| High | Homepage anchor links don't pass link equity |
| Medium | No explicit Googlebot stanza in robots.txt |
| Medium | Global GeneralContractor schema is a stub (missing name/url/address) |
| Low | www redirect adds one hop for www inbound links |

---

## 2. Content Quality (Score: 74/100)

### E-E-A-T Assessment — Strong

| Signal | Evidence | Rating |
|--------|----------|--------|
| **Experience** | 500+ projects, 80+ Alameda County roofs last year, real project photos, neighborhood testimonials | ✅ Strong |
| **Expertise** | Licensed Architect & GC (CSLB #1082377), 5 manufacturer certifications (GAF Master Elite top 2%) | ✅ Excellent |
| **Authoritativeness** | Founder page with Person+ProfilePage schema, blog author attribution, verifiable license | ✅ Strong |
| **Trustworthiness** | Transparent pricing, 4.8★/52 reviews, real address/phone/email, licensed/bonded/insured | ⚠️ Good (gaps below) |

**Trust gaps identified by content subagent:**
- "$2000 off" promo banner lacks expiration date or terms link — QRG flags vague promotional claims
- Physical address inconsistently surfaced (in schema but not always visible in footer)
- `/contact` page returns 404

### Content Depth by Page Type

| Page Type | Count | Avg Words | Quality | Score |
|-----------|-------|-----------|---------|-------|
| Homepage | 1 | ~1,729 (800 substantive) | Good but thin substantive copy | 71 |
| Service pages | 6 | ~3,136 | Strong — pricing, FAQ, projects | 84 |
| Blog posts | 13 | ~2,526 | Excellent — specific data, citations | 87 |
| County hubs | 6 | ~2,300 | Good — local facts, permits, climate | 75 |
| City pages | 23+ | ~1,880-3,500 | Varies widely (Oakland 67, Walnut Creek 55) | 62 |
| City+service | 500+ | ~3,500 | Thin — 60% overlap with parent city page | 50 |
| Founder page | 1 | ~1,200 | Good — credentials, story, schema | 78 |

### Thin Content Risk — HIGH

**City pages vary significantly in quality:**
- Oakland (67/100): Has neighborhood paragraphs (Rockridge, Temescal, Montclair), local housing stats, specific permit data
- Walnut Creek (55/100): Nearly identical word count (1,917 vs 1,880) but **no neighborhood callouts**, no local building department details. Template with city name swapped.
- **If ~30 of 40+ city pages match Walnut Creek's pattern, ~75% of pSEO is functionally duplicate**

**City+service pages (500+):** Share ~60% content with parent city page. Same local facts, company credentials, reviews repeated verbatim.

**Roofing page review relevance issue:** The 4 displayed reviews include siding and window jobs — not roofing-specific. Template should filter reviews by service type.

### AI Citation Readiness — 71/100
- Blog post is citation-ready: county-by-county permit tables, specific price ranges, attributed sources (ARMA, Oak Ridge National Lab)
- Statistics on roofing page lack source attribution ("25% increase in metal roof installations" — per whom?)
- No FAQ schema on homepage (9 FAQs on city/service pages are AI extraction targets)

| Severity | Finding |
|----------|---------|
| Critical | ~75% of city pages may be template-only (Walnut Creek pattern) |
| Critical | City+service pages: 60% content overlap — doorway page risk |
| High | Reviews on service pages aren't service-specific |
| High | Statistics lack source attribution on roofing page |
| Medium | "$2000 off" promo lacks expiration/terms |
| Medium | Only 13 blog posts for a 2,000-page site |
| Medium | No video content |
| Low | No comparison/alternatives content |

---

## 3. On-Page SEO (Score: 78/100)

### Title Tags — Good
All under 70 chars, include brand + location + service keywords.

### Meta Descriptions — Gaps
- Homepage, service pages, city pages: Present ✅
- County hub pages: Unconfirmed ⚠️
- About page: Missing ⚠️

### Heading Structure — Good
- Single H1 per page, includes target keywords
- Logical H2/H3 hierarchy
- **Homepage H2s are declarative, not interrogative** — AI systems prefer question-format headings for extraction

### Image SEO — Needs Work
- ~85% of images have good alt text
- 2 homepage images missing alt text (hero, mission silhouette)
- Image sitemap uses Astro build hashes that break on every deploy (192/237 images affected)

### Internal Linking
- Service pages: 60+ links (excellent)
- Homepage: anchor links only (weak)
- City pages: stale links to old URL format (redirect chains)

| Severity | Finding |
|----------|---------|
| High | 2 homepage images missing alt text |
| High | Image sitemap hashes break on every deploy |
| High | Missing meta descriptions on county hub + about pages |
| Medium | Homepage H2s should be question-format for AI extraction |
| Medium | OG images on service pages use `/_image?` query URLs (unreliable for social crawlers) |

---

## 4. Schema & Structured Data (Score: 74/100)

*Revised down significantly from initial estimate based on deep code-level analysis by schema subagent.*

### What's Working

| Schema Type | Pages | Status |
|-------------|-------|--------|
| GeneralContractor + RoofingContractor | All pages | ✅ Correct dual-type |
| AggregateRating (4.8/5, 52 reviews) | All pages | ✅ |
| Review (4 detailed) | Homepage, service, city pages | ✅ |
| BreadcrumbList | All subpages | ⚠️ Duplicated on city+service |
| WebSite + WebPage | All pages | ✅ |
| Service | Service + city pages | ✅ |
| Person + ProfilePage | Founder page | ✅ |
| BlogPosting | Blog posts | ✅ With author + dates |
| OpeningHoursSpecification | All pages | ✅ |
| GeoCoordinates | City pages | ✅ |

### Critical Schema Issues

**1. FAQPage emits on every commercial page (Critical)**
`FAQ.astro` unconditionally outputs FAQPage schema. Google restricted FAQ rich results to government/healthcare sites in August 2023. Zero Google rich result upside on commercial pages. Only value is AI/LLM citation — gate with `faqSchema?: boolean` prop and opt in selectively.

**2. Duplicate BreadcrumbList on city+service pages (Critical)**
Both `ServiceAreaCityPage.astro` and `ServicePage.astro` emit BreadcrumbList blocks on the same page. Google sees two competing breadcrumb trails.

**3. `additionalType` on lean org reference block (High)**
The lean fallback block (every non-full-org page) includes `additionalType` on what should be a bare `@id` reference. Validators may treat it as a full node requiring all properties, producing warnings.

### High Priority Schema Issues

**4. BlogPosting `mainEntityOfPage` is a string URL** instead of `{ "@type": "WebPage", "@id": canonicalUrl }` — valid but weaker signal.

**5. Service schema `dateModified` hardcoded** `2026-04-06` for all services — stale signal.

**6. Global GeneralContractor schema is a stub** — missing `name`, `url`, `address`, `telephone`, `areaServed`. Only has `@context`, `@type`, `@id`.

### Missing Opportunities
- HowTo schema on process blog posts
- LocalBusiness sub-type on pSEO city pages (currently only BreadcrumbList)
- SearchAction on WebSite schema (Sitelinks Searchbox)
- VideoObject when video content is added
- ProfilePage missing `dateCreated`/`dateModified`

| Severity | Finding |
|----------|---------|
| Critical | FAQPage on every commercial page — no Google value since Aug 2023 |
| Critical | Duplicate BreadcrumbList on city+service pages |
| High | `additionalType` on lean org reference block |
| High | Global business schema is a stub |
| Medium | BlogPosting mainEntityOfPage is string not WebPage |
| Medium | Service dateModified hardcoded |
| Low | Missing HowTo, SearchAction, LocalBusiness on city pages |

---

## 5. Performance / Core Web Vitals (Score: 72/100)

### Metrics (Lab Estimates)

| Metric | Estimate | Target | Status |
|--------|----------|--------|--------|
| LCP | 2.0-2.8s | < 2.5s | ⚠️ Borderline (hero preloaded, but images large) |
| INP | < 200ms | < 200ms | ✅ Good (SSR + deferred GTM) |
| CLS | < 0.05 | < 0.1 | ✅ Good (explicit w/h on all images) |
| TTFB | ~500ms | < 800ms | ✅ Good (Railway) |

### What's Working Well
- Hero image preloaded with `fetchpriority="high"` + responsive srcset ✅
- All images have explicit `width`/`height` (low CLS) ✅
- GTM deferred until first user interaction ✅
- Astro SSR = fast FCP ✅
- Tailwind v4 = minimal CSS ✅

### Remaining Issues
| Severity | Finding |
|----------|---------|
| High | Large original images (4032x4032) need WebP + responsive srcset |
| Medium | CSP `unsafe-inline` should use nonce-based approach |
| Low | Mapbox JS only needed on scan pages |

---

## 6. Images (Score: 70/100)

| Issue | Severity | Detail |
|-------|----------|--------|
| Missing alt text | High | 2 homepage images (hero, mission silhouette) |
| Image sitemap hash instability | High | 192/237 image URLs use Astro build hashes — break on every deploy |
| Large originals | Medium | 4032x4032 project photos need resizing |
| Format optimization | Medium | Convert to WebP with JPEG fallback |
| OG image query URLs | Medium | `/_image?` URLs unreliable for social crawlers |
| Image sitemap present | ✅ | 237 images indexed |
| Alt text coverage | ✅ | ~85% good alt text |

---

## 7. AI Search Readiness (Score: 81/100)

### AI Crawler Access — Excellent
- robots.txt allows GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot ✅
- Training bots correctly blocked ✅
- llms.txt present and high quality ✅ (structured business summary, pricing, certifications)
- llms-full.txt available ✅

### Citability — Strong
- Specific pricing data ($/roofing square by tier, permit costs by county)
- Named credentials with verifiable numbers
- FAQ answers structured as standalone factual claims
- Blog posts cite ARMA, Oak Ridge National Lab, Metal Roofing Alliance

### Platform Scores (per GEO subagent)

| Platform | Score | Primary Gap |
|----------|-------|-------------|
| Perplexity | 83 | Strong llms.txt + SSR; unsourced stats limit quoting |
| Google AI Overviews | 79 | FAQ schema not service-specific; no question H2s on homepage |
| Bing Copilot | 80 | FAQPage emission gap; schema otherwise strong |
| ChatGPT | 74 | No Wikipedia entity; no YouTube signal |

### Missing Opportunities
| Severity | Finding |
|----------|---------|
| High | No question-format H2s on homepage (AI systems prefer interrogative headings) |
| High | Hero answer block under-dense — add 2-sentence extractable summary |
| Medium | Statistics lack source attribution on roofing page |
| Medium | No comparison content (AI frequently cites comparisons) |
| Medium | No YouTube or Reddit presence |
| Low | llms-full.txt pricing could use markdown tables |

---

## 8. Local SEO (Score: 74/100)

### NAP Consistency — Good (one minor gap)
- Consistent across homepage, footer, schema, city pages ✅
- **Minor:** Service areas hub uses `+1 (650) 977-3351` while others use `(650) 977-3351`

### Critical Local Issues
- **`/contact` page returns 404** — standard NAP citation target missing
- **GBP primary category unverified** — must be "General Contractor" not "Roofing Contractor" (Whitespark 2026: wrong category is #1 negative ranking factor)

### Service Area Pages — Varied Quality
- County hubs (6): Strong — WUI fire zones, microclimate material guidance, permit variation by city
- City pages (23+): Mixed — Oakland has neighborhoods, Walnut Creek has none
- City+service pages (500+): Thin — doorway page risk

### Review Health
- 4.8/5.0 from 52 verified reviews — solid but thin for 6-county coverage
- Need review velocity system (18-day cliff if no new reviews)
- Reviews on service pages not filtered by service type

### Citation Gaps

| Directory | Status |
|-----------|--------|
| Google Business Profile | ✅ Confirmed |
| Yelp | ✅ Referenced |
| Facebook | ✅ Linked |
| BBB | ✅ Listed (A-, not accredited) |
| Angi | ❓ Unknown |
| Houzz | ❓ Unknown |
| HomeAdvisor | ❓ Unknown |
| Nextdoor | ❓ Unknown |
| Thumbtack | ❓ Unknown |

### Schema Gaps
- No `hasMap` property linking to GBP Maps CID
- No `sameAs` array with verified social/directory URLs
- Geo coordinates 4 decimal places (recommend 5)

| Severity | Finding |
|----------|---------|
| Critical | `/contact` page returns 404 |
| High | GBP primary category must be verified as "General Contractor" |
| High | Missing Angi, Houzz, Thumbtack citations |
| High | Need review velocity system (52 reviews, 18-day cliff) |
| Medium | BBB not accredited (A- rating) |
| Medium | No `hasMap` or `sameAs` in schema |
| Medium | Reduce click depth for major markets (currently 3 clicks) |

---

## Scoring Summary

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 74 | 16.3 |
| Content Quality | 23% | 74 | 17.0 |
| On-Page SEO | 20% | 78 | 15.6 |
| Schema / Structured Data | 10% | 74 | 7.4 |
| Performance (CWV) | 10% | 72 | 7.2 |
| AI Search Readiness | 10% | 81 | 8.1 |
| Images | 5% | 70 | 3.5 |
| **Total** | **100%** | | **75.1 → 75** |

### Score Trend
| Version | Date | Score | Delta | Notes |
|---------|------|-------|-------|-------|
| v6 | 2026-04-06 | 77 | — | 8-agent audit |
| v7 | 2026-04-08 | 75 | -2 | Deeper analysis revealed sitemap/schema/link issues missed in v6 |

*Note: The score decrease reflects more thorough analysis, not site regression. The site has not gotten worse — we now have a more accurate picture.*

---

## Methodology

Audit conducted April 8, 2026 using:
- 7 specialist subagents: Technical SEO, Content Quality & E-E-A-T, Schema & Structured Data, GEO & AI Readiness, Local SEO, Sitemap Structure, Performance/CWV
- Direct page analysis of 12+ representative pages across all page types
- Code-level schema analysis (Astro component inspection)
- Sitemap crawl of 375 indexed URLs + discovery of ~1,584 unindexed city+service pages
- robots.txt, llms.txt, security header analysis
- Cross-page content differentiation comparison (Oakland vs. Walnut Creek)

**Auditor:** Claude Code SEO Audit System v7
