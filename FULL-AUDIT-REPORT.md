# Hamilton Exteriors — Full SEO Audit Report

**Domain:** hamilton-exteriors.com
**Audit Date:** April 8, 2026 (v8 — 7-agent parallel audit)
**Business Type:** Hybrid SAB — General Contractor (primary) + Roofing Contractor (secondary)
**Stack:** Astro 6.1 SSR on Railway, Ghost CMS (headless blog)
**Pages in Sitemap:** ~925 URLs

---

## Executive Summary

### Overall SEO Health Score: 72 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 78 / 100 | 17.2 |
| Content Quality | 23% | 71 / 100 | 16.3 |
| On-Page SEO | 20% | 73 / 100 | 14.6 |
| Schema / Structured Data | 10% | 72 / 100 | 7.2 |
| Performance (CWV) | 10% | 68 / 100 | 6.8 |
| AI Search Readiness (GEO) | 10% | 74 / 100 | 7.4 |
| Images | 5% | 52 / 100 | 2.6 |
| **Total** | **100%** | | **72.1** |

### Business Context
Hamilton Exteriors is a Bay Area design-build and exteriors contractor owned by Alexander Hamilton Li (Architect & GC, CSLB #1082377). Services: roofing, siding, windows, ADUs, custom homes, additions. Physical office at 21634 Redwood Rd Unit F, Castro Valley, CA 94546. Serves 6 counties, 44+ cities.

### Top 5 Critical Issues
1. **Review count discrepancy** — llms.txt says "52 Google reviews" vs. 26 on homepage schema; city pages emit 52
2. **Blog index title Unicode corruption** — `Ground Up ??? Roofing & Home Tips` displays garbage in SERPs
3. **Readability crisis** — Roofing page FK Reading Ease 14.7 (Grade 15.9); target is 60-70 (Grade 8-10)
4. **Warranty language inconsistent** — 3 different descriptions across Homepage, Buy, and Roofing pages
5. **Angi/HomeAdvisor citations show Citrus Heights address** — Tier 1 NAP mismatch

### Top 5 Quick Wins
1. Fix blog index title encoding in Ghost CMS (10 min)
2. Fix review count in llms.txt to match actual GBP count (10 min)
3. Standardize warranty language site-wide (30 min)
4. Add `FAQPage` schema to /roofing and /buy pages (2 hours)
5. Add `sameAs` array to Organization schema (1 hour)

---

## 1. Technical SEO (78/100)

### Crawlability

**robots.txt: Excellent (95/100)**
- Well-segmented AI crawler rules: search bots allowed, training-only bots blocked
- Correct sitemap references to `/sitemap-index.xml` and `/image-sitemap.xml`
- `Crawl-delay: 1` for default user-agent
- llms.txt discovery comment present
- Gap: `FacebookBot` (Meta AI) not explicitly addressed

**Sitemap: Good (76/100)**
- Proper sitemap index structure
- `/sitemap-0.xml` with ~925 URLs including `lastmod` dates
- `/image-sitemap.xml` referenced for image SEO
- Minor: image sitemap listed in both index and robots.txt (redundant, harmless)

**Internal Linking: Strong**
- Footer city links organized by county (5-6 per county)
- Service pages cross-link to `/service-areas`
- City pages cross-link to neighboring cities
- Silo structure: county > city > city+service is well-executed
- BreadcrumbList schema on city pages

### Indexability
- Canonical tags present on all audited pages
- `/about` correctly canonicalizes to `/about/alex-hamilton-li`
- No noindex on important pages
- No redirect chains detected
- Clean URL structure, no query parameters

### URL Structure
Semantic, clean URLs throughout:
- `/roofing`, `/siding`, `/windows`, `/adu`, `/custom-homes`, `/additions`
- `/service-areas/alameda-county-ca/oakland-ca`
- `/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026`
- `/buy`, `/buy/scan`

### Mobile & Rendering
- Viewport meta tag present
- Astro 6.1 SSR: all content server-rendered (no client-only dependencies)
- Tailwind v4 responsive design
- AI crawlers receive fully rendered HTML without JavaScript execution

### Technical Findings

| Priority | Finding |
|----------|---------|
| Medium | No explicit security headers detected (CSP, HSTS, X-Frame-Options) |
| Medium | `FacebookBot` not addressed in robots.txt |
| Low | Sitemap redundancy (image-sitemap in both index and robots.txt) |

---

## 2. Content Quality (71/100)

### E-E-A-T Assessment

| Signal | Score | Key Strengths | Key Gaps |
|--------|-------|---------------|----------|
| Experience | 72/100 | First-person voice, WUI fire zone expertise, city-specific environmental details | Stock photography only ("Photo via Pexels"), no original project photos |
| Expertise | 78/100 | CSLB #1082377 sitewide, 5 manufacturer certs, real building code citations | Founder's architecture degree/institution missing |
| Authoritativeness | 64/100 | BBB referenced, review platform logos, blog Sources section | No press mentions, no industry associations (NRCA, NARI, AIA) |
| Trustworthiness | 74/100 | Full NAP consistency, CSLB verify link, transparent pricing | Warranty inconsistency, review count discrepancy, OG description possibly truncated |

### Readability (CRITICAL)

| Page | FK Reading Ease | FK Grade Level | Target | Status |
|------|----------------|----------------|--------|--------|
| Roofing service | 14.7 | 15.9 | 60-70 / Grade 8-10 | **FAIL** |
| Blog (roof cost) | 31.0 | 13.5 | 60-70 / Grade 8-10 | **FAIL** |
| Buy page | ~45 | ~12 | 60-70 / Grade 8-10 | Below target |

Root cause: Dense technical paragraphs, long compound sentences. Service pages for Bay Area homeowners should not read at graduate-school level.

### Thin Content Detection

| Page | Words | Assessment |
|------|-------|------------|
| Service Areas index | ~1,016 | **Thin** — county sections are header + city list, zero descriptive content |
| Blog index | ~1,722 | **Borderline** — service area post leaked into editorial feed |
| City+service pages (264) | Unknown | **Risk** — if thin templates, doorway page concern |

### Content Strengths
- Blog cost guide: county-level permit cost tables, real project examples with city/size/cost
- City pages pass doorway test: Oakland (3,200+ words, named neighborhoods, climate zones, fire zone details), Walnut Creek (3,800+ words, HOA/Rossmoor content)
- Buy page commission comparison table — rare and valuable in the industry
- Founder bio: genuine first-person voice with specific Bay Area knowledge

### Keyword Gaps

| Page | Missing Target |
|------|---------------|
| /roofing | "roof replacement" — primary commercial term underweighted |
| /buy | "buy roof online", "online roofing quote" — unique differentiator not targeted |
| /service-areas | "[city] roofing contractor" — pure list hub, no semantic coverage |
| /roofing | "Bay Area" appears 24x in 2,400 words — approaching repetitive |

---

## 3. On-Page SEO (73/100)

### Title Tags
- Homepage: "Bay Area Design-Build & Exteriors Contractor | Hamilton Exteriors" (63 chars) — Good
- Blog Index: "Ground Up ??? Roofing & Home Tips" — **BROKEN** (Unicode corruption)
- Other pages: Well-structured

### Meta Descriptions
- Homepage: Good — includes key services, warranty, phone number
- OG Description: **Possibly truncated** — extraction shows just "Bay Area" in og:description

### Heading Structure
- Homepage H1: "Bay Area's Top Design-Build & Exteriors Contractor" — Good
- **Issue:** Service pages use declarative H2s ("Our Advantage", "Our Latest Projects") instead of question-based H2s optimized for AI Overviews
- Blog cost guide correctly uses question H2s — should be the template for all pages

### Warranty Language Inconsistency (CRITICAL)
| Page | Warranty Claim |
|------|---------------|
| Homepage | "50-Year Warranty" |
| Roofing | "50-year manufacturer shingle warranty backed by our own 35-year labor guarantee" |
| Buy FAQ | "25 years to lifetime (depending on material) plus our own 10-year workmanship guarantee" |

These describe the same offering differently. Google's QRG flags inconsistent trust claims. Must standardize.

---

## 4. Schema / Structured Data (72/100)

### Implemented Schema

| Type | Present | Quality |
|------|---------|---------|
| GeneralContractor + RoofingContractor | Yes | Excellent — correct primary/secondary |
| Organization (full) | Yes | NAP, geo, hours, certs, founder, offers |
| AggregateRating | Yes | **Review count discrepancy (26 vs 52)** |
| Review (inline) | Yes | Google + Yelp/Angi/Nextdoor curated |
| WebSite / WebPage | Yes | Homepage only |
| BreadcrumbList | Yes | City pages |
| FAQPage | Partial | Some pages — **missing on /roofing and /buy** |
| Service with areaServed | Yes | Good |
| EducationalOccupationalCredential | Yes | All 6 certifications |
| Person (founder) | Yes | sameAs to CSLB and LinkedIn |
| BlogPosting | Yes | Author, dates |

### Schema Gaps

| Priority | Gap |
|----------|-----|
| Critical | Review count: Layout schema 26 vs city page schema 52 |
| High | FAQPage schema missing on /roofing and /buy (FAQ content exists) |
| High | No `sameAs` array linking to external profiles |
| Medium | `areaServed` county-only — add top 10 City entities |
| Medium | No `image` on city page schema |
| Low | No `speakable`, no `HowTo` schema |

---

## 5. Performance / Core Web Vitals (68/100)

*PSI API quota exhausted — scores from source code analysis*

### Architecture Strengths
- Astro 6.1 SSR — minimal client JS
- Hero compressed 22MB to 750KB
- Scan JS deferred
- CLS fixes applied

### Estimated Metrics

| Metric | Estimate | Target | Risk |
|--------|----------|--------|------|
| LCP | ~2.0-3.0s | < 2.5s | Medium |
| INP | < 200ms | < 200ms | Low |
| CLS | < 0.1 | < 0.1 | Low |
| TTFB | ~300-600ms | < 800ms | Low |

### Concerns
- 3 custom fonts (THE BOLD FONT, DM Sans, Satoshi) — swap strategy unknown
- Third-party scripts: Mapbox, Google Reviews API — impact unmeasured
- No CrUX field data available

---

## 6. AI Search Readiness / GEO (74/100)

### AI Crawler Access: Excellent
Search crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, bingbot) all allowed. Training-only crawlers (CCBot, anthropic-ai, cohere-ai, Bytespider) blocked.

### llms.txt: Present and Well-Structured
- Available at `/llms.txt`, `/llms-full.txt`, `/.well-known/llms.txt`
- License: RSL-1.0-cite-with-attribution
- Updated timestamp present
- Full cross-reference present
- **Issue:** Review count says "52 Google reviews" — must match actual count

### Platform Scores

| Platform | Score | Key Factor |
|----------|-------|------------|
| Perplexity | 79/100 | County-level cost tables, author attribution |
| Google AI Overviews | 71/100 | Declarative H2s hurt AIO trigger rate |
| ChatGPT Web Search | 68/100 | No YouTube channel (0.737 citation correlation) |
| Bing Copilot | 65/100 | No Reddit/community signal |

### Top GEO Gaps
1. Review count discrepancy across sources
2. Service page H2s declarative, not question-based
3. No YouTube channel
4. Unattributed statistics ($4,200 savings, 500+ projects)
5. No Reddit presence

---

## 7. Local SEO (71/100)

### Score Breakdown

| Dimension | Weight | Score |
|-----------|--------|-------|
| GBP Signals | 25% | 60/100 |
| Reviews & Reputation | 20% | 72/100 |
| Local On-Page SEO | 20% | 88/100 |
| NAP Consistency | 15% | 82/100 |
| Local Schema | 10% | 82/100 |
| Local Links & Authority | 10% | 38/100 |

### NAP Consistency
- **Owned pages: Excellent** — sourced from `src/lib/constants.ts`
- **CRITICAL: Angi/HomeAdvisor show Citrus Heights** — `sameAs` URLs in Layout.astro (lines 224-225) link to profiles with `citrus-heights` in path. If directory address is wrong, this is a Tier 1 citation conflict.

### Review Health
- 4.8 stars / 26 reviews — strong rating, weak volume for 500+ projects
- ~75 days since last trackable curated review
- Fallback rating floor hard-clamped to 4.8 in code — policy risk if actual GBP drops below
- Need: systematic post-project review request workflow, target 2-3/month

### Service Area Pages
- 44 city landing pages with strong unique content (neighborhoods, climate, codes, permit details)
- 264 city+service pages — quality unknown, potential doorway page risk
- Service Areas index is thin (county headers + city lists, no descriptive content)

### Citation Gaps
Missing from Tier 1 directories: BBB (claimed listing), BuildZoom, Houzz, Thumbtack

### Local Links: Weakest Dimension (38/100)
Missing: manufacturer contractor directories (GAF, OC, CertainTeed, Hardie, Tesla), Chamber of Commerce memberships, local press coverage, HOA/property management partnerships

### GBP Checklist (Requires Dashboard Access)
- [ ] Verify primary category = General Contractor
- [ ] Add secondary: Roofing, Siding, Window Installation, Home Builder
- [ ] Use all 750 chars in GBP description
- [ ] Add 25+ photos with category albums
- [ ] Post every 14 days
- [ ] Pre-seed 10+ Q&A pairs
- [ ] Connect appointment/booking link
- [ ] Respond to 100% of reviews within 48 hours

---

## 8. Images (52/100)

### Strengths
- Hero compressed to 750KB
- Alt text present and descriptive on audited images
- Image sitemap exists
- Certification logos have proper alt text

### Critical Gaps
- **No original project photography** — all blog images are stock ("Photo via Pexels")
- No geo-tagged project photos
- City page schema has no `image` property
- Image format optimization (WebP/AVIF), responsive srcset, lazy loading — not verified

---

## Limitations

- **PSI API quota exhausted** — CWV scores are estimated from code analysis, not lab/field data
- **GBP dashboard not accessible** — categories, attributes, posts, photos, Q&A cannot be verified
- **Yelp returned 403** — NAP not independently verified
- **264 city+service pages not individually audited** — doorway page risk flagged but not confirmed
- **No competitor benchmarking** — requires paid tools (Ahrefs, Semrush, BrightLocal)
- **No live local pack position tracking** — requires DataForSEO or BrightLocal

---

*Report generated April 8, 2026 by 7 parallel specialist agents*
*Technical SEO | Content Quality | Schema | Performance | GEO/AI Search | Local SEO | Sitemap*
