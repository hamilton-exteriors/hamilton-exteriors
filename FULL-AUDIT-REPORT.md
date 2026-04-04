# Hamilton Exteriors — Full SEO Audit Report

**Site:** https://hamilton-exteriors-production.up.railway.app
**Canonical Domain:** hamilton-exteriors.com
**Audit Date:** April 3, 2026
**Pages in Sitemap:** 261
**Business Type:** Service Area Business (SAB) — Home Services Contractor

---

## Overall SEO Health Score: 69 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 71 | 15.6 |
| Content Quality | 23% | 62 | 14.3 |
| On-Page SEO | 20% | 68 | 13.6 |
| Schema / Structured Data | 10% | 80 | 8.0 |
| Performance (CWV) | 10% | 82 | 8.2 |
| AI Search Readiness | 10% | 74 | 7.4 |
| Images | 5% | 52 | 2.6 |
| **Total** | **100%** | | **69.7** |

> **Note:** Score is held back by two major factors: (1) DNS/canonical domain mismatch and (2) pSEO pages with only 17-21% unique content. Fixing DNS adds ~5 pts, improving pSEO content adds ~8 pts.

---

## Executive Summary

### Business Type Detected
**Hybrid SAB** — Service Area Business serving 5 Bay Area counties (Alameda, Contra Costa, Marin, Napa, Santa Clara) from a back-office address in Castro Valley. 6 services: Roofing, Siding, Windows, ADUs, Custom Homes, Additions.

### Top 5 Critical Issues
1. **DNS pointing to wrong site** — `hamilton-exteriors.com` resolves to a Framer site, not the Railway Astro site. All canonicals, schema `@id`s, and sitemap URLs reference the wrong host.
2. **pSEO pages only 17-21% unique content** — ~500 words unique buried in 2,500+ words of boilerplate. Same 5 FAQ answers (600 words) duplicated verbatim across all ~230 pages. High risk for Google's "unhelpful content" classifier.
3. **Review schema velocity stale** — Most recent review in schema is 70 days old (2026-01-22). 18-day rule risk for local pack rankings.
4. **City hub pages are single-service focused** — Oakland = ADU-only, Palo Alto = ADU-only, Walnut Creek = siding-only. These should be multi-service hubs.
5. **/siding page has 12 H1 tags** — Severely broken heading hierarchy. Every section uses H1 instead of H2.

### Top 5 Quick Wins
1. Add `inLanguage: "en-US"` and `author.sameAs` to BlogPosting template (1 file change)
2. Fix review count discrepancy ("5/5 based on 50 reviews" vs "4.8 stars") across city data files
3. Add `lastmod` dates to sitemap
4. Increase font cache headers to `immutable, max-age=31536000`
5. Define "roofing square" inline in the cost blog post

---

## 1. Technical SEO (Score: 71/100)

### Crawlability — Good
- robots.txt properly configured with AI search vs. training distinction
- All commercial pages are `index, follow`
- `/api/` correctly blocked
- Legal pages (`/terms`, `/success`, `/buy/scan`) correctly `noindex, nofollow`
- Skip-to-content link present

### CRITICAL: DNS/Canonical Domain Mismatch
`hamilton-exteriors.com` currently resolves to a **Framer-hosted site** (Server: Framer/154a7c5). Meanwhile, every canonical tag, OG URL, sitemap URL, and schema `@id` on the Railway Astro site points to `hamilton-exteriors.com`. This means:
- Google sees canonicals pointing to a domain serving completely different content
- All 261 sitemap URLs reference a domain the Railway site doesn't control
- Any indexing signals on the Railway URL point to the wrong canonical destination

**Fix:** Point `hamilton-exteriors.com` DNS to Railway immediately. This is the #1 SEO blocker.

### CRITICAL: Homepage Trailing Slash Mismatch
- Sitemap: `https://hamilton-exteriors.com` (no trailing slash)
- Canonical: `https://hamilton-exteriors.com/` (with trailing slash)
- All other 260 URLs are consistent (no trailing slash)

**Fix:** Normalize sitemap homepage entry to include trailing slash.

### HIGH: Blog OG Images Served From Ghost Railway Subdomain
Blog social images use `ghost-production-42337.up.railway.app` URLs. If the Ghost service URL changes, all cached social preview cards break.

**Fix:** Proxy Ghost media through canonical domain or configure Ghost's URL setting.

### HIGH: `/buy` Page Indexability Concern
`/buy` is indexed and in sitemap but requires JavaScript for core functionality (Mapbox, Solar API). Without JS, content is near-empty.

**Fix:** Add static content section (value props, how-it-works, FAQ) or add `noindex` if it's purely a direct-traffic conversion page.

### HIGH: IndexNow Not Implemented
No IndexNow integration for Bing/Yandex/Naver instant indexing notifications. With 261 pages and ongoing blog content, this is a missed velocity opportunity.

### Security Headers — Excellent
- HSTS: `max-age=63072000; includeSubDomains; preload`
- CSP present and specific
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restricting camera, microphone, geolocation

### JavaScript Rendering — Excellent
Astro SSG outputs full HTML at build time. No JS execution required for primary content. Googlebot sees complete pages without rendering.

### Mobile — Correct
- `viewport` meta with `width=device-width, initial-scale=1`
- Touch targets `min-height: 44px`
- `clamp()` responsive typography throughout

---

## 2. Content Quality (Score: 62/100)

### E-E-A-T Signals — Strong
| Signal | Present | Notes |
|--------|---------|-------|
| Named author with credentials | Yes | Alexander Hamilton Li, Architect & GC, CSLB #1082377 |
| CSLB license in schema + footer | Yes | Verifiable credential, linked to cslb.ca.gov |
| Manufacturer certifications | Yes | Owens Corning, CertainTeed, GAF, Tesla, James Hardie |
| Specific pricing data | Yes | Per-square pricing, city-specific ranges |
| Real customer reviews | Yes | 4 detailed reviews in schema, names + dates |
| Process transparency | Yes | Itemized estimates, no hidden fees language |
| Local expertise signals | Yes | Neighborhood knowledge, permit details, climate data |

### Service Page Depth — Strong
- `/roofing`: ~3,000+ words, 4 material types with specific pricing ($940-$1,525/sq), comparison table, 10 FAQs, manufacturer certifications, process details
- `/siding`: Similar depth with James Hardie focus, vinyl/fiber cement/stucco options, pricing per unit
- Both pages have substantive, expert-level content that passes thin content checks

### Blog Quality — Strong
- 12 posts, topically focused on Bay Area exterior remodeling
- Cost guide (2,091 words) has specific local pricing: Oakland ranch at $14,000-$18,000, San Jose Willow Glen at $19,500, Walnut Creek colonial at $21,000
- Named author with professional credentials on all posts
- Published and modified dates in schema
- Proprietary data claims: "We completed over 80 roof replacements in Alameda County last year"

### CRITICAL: pSEO Content — Only 17-21% Unique
Detailed word-by-word comparison of Oakland/roofing, Palo Alto/roofing, Walnut Creek/siding reveals severe boilerplate dominance:

| Page | Est. Total Words | Est. Unique Words | Unique % |
|------|-----------------|-------------------|----------|
| Oakland/roofing | ~2,800 | ~600 | ~21% |
| Walnut Creek/siding | ~2,700 | ~550 | ~20% |
| Palo Alto/roofing | ~2,600 | ~450 | ~17% |

**Identical across all pSEO pages (word-for-word):**
- 5 generic FAQ answers (~600 words) — pricing, competitor quotes, billing, timeline, warranty
- 4 customer reviews (Eric W, Sarah M, Robert Holt, Laura Gaubin) — same text, same dates
- "Why Hamilton" differentiators section (4 blocks)
- Financing section
- Certification logos
- Service type descriptions (generic 2-sentence summaries vs. deep service page content)

**Unique per city (~500 words):**
- City-specific "Our Services in [City]" section with housing units, neighborhoods, permit fees, climate
- 5 city-specific FAQ questions (but answers follow a find-and-replace template)
- H1 and title with city name

**Additional content issues found:**
- **Cost ranges identical ($8K-$25K) for Oakland ($850K homes) and Palo Alto ($3.5M homes)** — credibility problem
- **Walnut Creek siding page discusses roofing topics** ("re-roofing projects," "Class A fire-rated roofing materials") in its local section — content mismatch from generation
- **pSEO material descriptions are generic** ("They offer excellent weather resistance and come in a variety of styles") vs. deep expert content on service pages
- **James Hardie blog links to roofing sources** instead of siding sources — template copy error

**Risk:** With ~230 pages sharing 2,000+ words of identical content, Google's helpful content system may classify these as "content created primarily for search engines."

### HIGH: City Hub Pages Are Single-Service Focused
Oakland (`/oakland-ca`) = "Build Your Dream ADU in Oakland" — ADU-only content
Palo Alto (`/palo-alto-ca`) = "Build Your Dream ADU in Palo Alto" — ADU-only content

These URLs imply general city landing pages but contain service-specific content. This:
1. Weakens them as city hubs for "contractor [city]" queries
2. Creates overlap with the `/oakland-ca/adu` pSEO page
3. Confuses the hub-and-spoke internal linking model

**Fix:** Rebuild city hub data files as multi-service general pages representing all 6 services equally.

### MEDIUM: Unattributed Statistics
Claims like "75% market share for asphalt shingles" and "25% increase in metal roof installations since 2021" have no source attribution. AI models (especially Perplexity) weight attributed statistics higher.

**Fix:** Add linked footnotes to NRCA or BLS data sources.

---

## 3. On-Page SEO (Score: 68/100)

### Title Tags — Good with Template Pattern
| Page Type | Pattern | Example |
|-----------|---------|---------|
| Homepage | Custom | "Bay Area's Top Design-Build & Exteriors Contractor \| Hamilton Exteriors" |
| Service | Custom | "Bay Area Roofing Contractor -- Hamilton Exteriors" |
| Blog | Custom | "How Much Does a Roof Replacement Cost in the Bay Area in 2026" |
| City+Service pSEO | Template | "Reliable Roofing in Oakland, CA \| Hamilton Exteriors" |
| City Hub | Template | "Affordable ADU Contractors in Oakland, CA" |

Titles are unique per page and properly keyword-targeted. The city+service pattern is clean.

### Meta Descriptions — Good
- Auto-generated for city pages: "Hamilton Exteriors serves [City], CA -- roofing, siding, windows & more. 50-year warranty. CSLB #1082377. Free estimate: (650) 977-3351."
- Custom on service pages and blog posts
- All within 155-character target

### Heading Structure — Mixed
- Homepage, blog, pSEO pages: single H1, clean hierarchy
- **/siding page: 12 H1 tags** — every major section uses H1 instead of H2. Severely broken heading hierarchy. **HIGH severity.**
- Other service pages need verification for same issue

### Internal Linking — Improved (FIXED)
**Present:**
- Hub-and-spoke: `/service-areas` -> counties -> cities -> city+service pages
- Footer links all 29 cities by county (sitewide flat structure)
- Breadcrumbs on all pages (5-level on pSEO pages)
- **[FIXED] Service pages now link to city+service pages** -- "Across the Bay Area" section expanded with top cities per county, linking directly to `/oakland-ca/roofing`, `/walnut-creek-ca/roofing`, etc.
- **[FIXED] Sibling city links on pSEO pages** -- each city+service page now shows "Roofing in nearby cities" linking to 3 sibling cities in the same county

**Remaining:**
- No cross-county proximity links (Oakland to Walnut Creek) -- lower priority

### MEDIUM: Blog Tag Filter URLs Not Canonical-Protected
`/blog?tag=roofing` parameterized URLs are crawlable but lack canonical handling. Could create duplicate content signals.

---

## 4. Schema / Structured Data (Score: 80/100)

### Current Implementation — Above Average

| Page Type | Schema Present |
|-----------|---------------|
| Homepage | BreadcrumbList, RoofingContractor+GeneralContractor, WebSite, FAQPage |
| Service pages | BreadcrumbList, Organization, WebSite, Service (with AggregateOffer), FAQPage |
| Blog index | CollectionPage, Organization (stub), WebSite |
| Blog posts | BlogPosting, BreadcrumbList, Organization (stub), WebSite |
| City+Service pSEO | BreadcrumbList, Organization (stub), WebSite, Service, FAQPage |
| Service areas hub | ItemList, BreadcrumbList, Organization, WebSite |
| /buy | WebApplication, Service (UnitPriceSpecification), Organization, WebSite |

### Strengths
- Entity graph wired with `@id` cross-references (`#business`, `#website`, service `@id` nodes)
- `AggregateOffer` with `lowPrice`/`highPrice`/`unitText` for contractor pricing
- `hasCredential` with CSLB license -- strong E-E-A-T signal
- `areaServed` with Wikipedia `sameAs` on county entities
- `BlogPosting` has `wordCount`, `articleSection`, `isPartOf`

### Priority Actions
| # | Action | Severity | Effort |
|---|--------|----------|--------|
| 1 | Add `inLanguage: "en-US"` and `author.sameAs` (CSLB, LinkedIn) to BlogPosting | Medium | Low |
| 2 | Add `WebPage` block to service pages (/roofing, /siding) | Medium | Low |
| 3 | Add `ItemList` to /blog CollectionPage (dynamic from Ghost) | Medium | Medium |
| 4 | Add `Service` schema to city+service pSEO pages with city-scoped `areaServed` | Medium | Medium |
| 5 | Fix `reviewCount: 50` with only 4 Review objects (policy risk) | Medium | Low |
| 6 | Add `@id` to /buy Service block | Low | Trivial |

### Info: FAQPage on Commercial Pages
Google restricted FAQPage rich results to government/health sites (Aug 2023). Hamilton's FAQ blocks won't render as expandable snippets in Google. However, they remain valuable for AI search engines (Perplexity, Bing Copilot, ChatGPT) -- **do not remove them**.

---

## 5. Performance / CWV (Score: 82/100)

### Architecture — Excellent
Astro 6.1 SSG with Tailwind v4. Full HTML at build time, no client-side rendering dependency. This is the optimal architecture for performance.

### Font Loading — Good
- 5 self-hosted woff2 files (DM Sans variable, Satoshi 500/700, THE BOLD FONT 400/700)
- All use `font-display: swap` -- prevents FOIT
- 2 critical fonts preloaded in `<head>` (THE BOLD FONT + DM Sans)
- Satoshi not preloaded (used for labels, not LCP-critical)

### Hero/LCP Image — Good
- Responsive hero preloaded with `fetchpriority="high"` and media queries (mobile 1080px, desktop 2560px)
- Served as WebP via Astro image optimization
- Hero `<img>` uses `loading="eager"` and `fetchpriority="high"`

### Image Strategy — Good
- Above-fold: `loading="eager"` (Hero, Navbar logo, blog featured image)
- Below-fold: `loading="lazy"` throughout (service cards, reviews, certifications, footer)
- All images processed through Astro's `/_image` endpoint (WebP, sized)

### Third-Party Scripts — Minimal
- GTM: loaded `async`
- Mapbox: lazy-loaded on user interaction only
- BackOffice portfolio widget: third-party embed

### Resource Hints
- `<link rel="preconnect">` for `googletagmanager.com` and `api.mapbox.com`
- No unnecessary DNS-prefetch clutter

### Issues

| Issue | Severity | Fix |
|-------|----------|-----|
| Font cache-control 7 days (should be immutable/1yr) | High | Config change in astro.config.mjs |
| Page cache-control 300s browser / 3600s CDN (could be higher for SSG) | Low | Increase to 3600s / 604800s |
| BackOffice widget likely client-rendered (AI crawlers see empty div) | Medium | Consider SSR or static portfolio |

### Estimated CWV Verdict
| Metric | Estimate | Target | Status |
|--------|----------|--------|--------|
| LCP | ~1.5-2.5s | < 2.5s | PASS (likely) |
| CLS | ~0.02-0.05 | < 0.1 | PASS |
| INP | ~50-100ms | < 200ms | PASS |
| FCP | ~0.8-1.5s | < 1.8s | PASS (likely) |
| TTFB | ~200-400ms | < 800ms | PASS |

> Lab estimates based on source analysis. Field data via CrUX not available (requires Search Console).

---

## 6. AI Search Readiness (Score: 74/100)

### AI Crawler Configuration — Excellent
| Crawler | Purpose | Status |
|---------|---------|--------|
| GPTBot | ChatGPT search | Allowed |
| OAI-SearchBot | OpenAI search | Allowed |
| PerplexityBot | Perplexity | Allowed |
| ClaudeBot | Anthropic search | Allowed |
| Google-Extended | AI Overviews | Allowed |
| Applebot-Extended | Apple Intelligence | Allowed |
| bingbot | Bing Copilot | Allowed |
| CCBot | Training | Blocked |
| anthropic-ai | Training | Blocked |
| cohere-ai | Training | Blocked |

### llms.txt — Present and Well-Formed (88/100)
- Follows llmstxt.org spec
- Company name, blockquote summary, license declaration
- Pricing validity timestamp (Q1 2026)
- Link to llms-full.txt (expanded pricing tables, warranties, FAQ)
- `<link rel="ai-content-declaration" href="/llms.txt">` in HTML head

### Citability — Strong (78/100)
- Roofing page: near-ideal passage density (134-167 word self-contained blocks)
- Blog cost guide: highly specific local pricing data, proprietary job statistics
- FAQ schema provides clean extractable Q&A pairs
- "X is Y" definition patterns reliably extracted by AI models

### Missing Off-Site Entity Signals (Main Gap)
| Signal | Status | Impact |
|--------|--------|--------|
| YouTube channel | Not present | Very High (~0.737 citation correlation) |
| Wikipedia/Wikidata entity | Not present | High |
| Reddit presence | Likely absent | High |
| External press/citations | None found | Medium |

### Platform Scores
| Platform | Score | Notes |
|----------|-------|-------|
| Google AI Overviews | 72 | Strong schema + FAQ, weak on blog FAQPage |
| ChatGPT | 68 | No Wikipedia, no YouTube, strong pricing data |
| Perplexity | 76 | Good passage density, unattributed stats risk |
| Bing Copilot | 74 | Strong schema, BlogPosting correct |
| Apple Intelligence | 70 | Applebot allowed, static HTML accessible |

---

## 7. Local SEO (Score: 71/100)

### NAP Consistency — Good
Name, address, phone consistent across schema, footer, and city pages. E.164 format in schema (+1-650-977-3351) vs display (650) 977-3351 is expected.

### GBP Signals — Needs Work (68/100)
**Present:** Google Maps sameAs, review badges, Yelp badge, coordinates, dual @type
**Missing:**
- Google Maps URL is name-search, not Place ID -- fragile entity resolution
- No Google Maps embed on any page
- No GBP photo widgets or post feeds

### Review Health — Declining (72/100)
- 4.8 stars, 50 reviews in schema -- but most recent review is 70 days old
- "Rated 5/5 based on 50 reviews" (city pages) vs "4.8 stars" (rest of site) -- copy inconsistency
- Only 4 Review objects in schema vs. reviewCount of 50 -- policy risk
- **18-day rule:** No new visible review activity since January 2026

### Citation Gaps
| Directory | Status |
|-----------|--------|
| Google Business Profile | Linked (name search URL) |
| Yelp | Linked |
| BBB | Not detected |
| Angi | Not detected |
| HomeAdvisor | Not detected |
| Houzz | Not detected |
| Thumbtack | Not detected |

### Internal Linking for Local — Needs Improvement
- No cross-service links from `/roofing` -> city+service pages
- No sibling city links within pSEO cluster
- No cross-county proximity links

### Proximity Note
Castro Valley HQ is well-positioned for Alameda County but creates natural disadvantage for Marin, Napa, and Santa Clara. Cannot be remediated on-page -- compensate with maximum strength on controllable factors.

---

## 8. Images (Score: 52/100)

### What's Working
- Astro image optimization pipeline (WebP, responsive sizing)
- Proper `loading="lazy"` on below-fold images
- `loading="eager"` + `fetchpriority="high"` on hero images

### Gaps
- **[FIXED] Image sitemap created** -- `/image-sitemap.xml` with SEO-optimized titles and captions for key page images, referenced in robots.txt
- BackOffice portfolio widget likely client-rendered (empty div for crawlers)
- No before/after project photos detected in audited pages
- Blog OG images served from Ghost subdomain (fragile)
- **[FIXED] Alt text audited** -- all images have meaningful alt text; decorative images correctly use `alt=""` with `aria-hidden`; reviewer photos improved from name-only to descriptive alt

---

*Generated by Claude Code SEO Audit -- April 3, 2026*
