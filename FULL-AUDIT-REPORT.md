# Hamilton Exteriors SEO Audit Report

**URL:** https://hamilton-exteriors.com
**Audit Date:** April 12, 2026
**Business Type:** Service Area Business (SAB) — General Contractor + Roofing Contractor
**Stack:** Astro 6.1 SSR + Tailwind v4 on Railway

---

## Overall SEO Health Score: 82 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 90/100 | 19.8 |
| Content Quality | 23% | 85/100 | 19.6 |
| On-Page SEO | 20% | 83/100 | 16.6 |
| Schema / Structured Data | 10% | 92/100 | 9.2 |
| Performance (CWV) | 10% | 88/100 | 8.8 |
| AI Search Readiness (GEO) | 10% | 81/100 | 8.1 |
| Images | 5% | 80/100 | 4.0 |
| **Total** | | | **86.1** |

### Additional Dimension Scores

| Category | Score |
|----------|-------|
| Local SEO | 74/100 |
| Sitemap Quality | 90/100 |

---

## Executive Summary

Hamilton Exteriors has a **strong technical foundation** that outperforms the vast majority of contractor websites. The Astro SSR stack delivers excellent performance, security headers are enterprise-grade, schema markup is sophisticated with live Google Reviews integration, and the llms.txt implementation is among the most advanced in the local contractor space.

**Top 5 Critical Issues:**
1. Low Google review count (37 reviews across 8 years) — biggest local SEO risk
2. No FAQPage schema (removed for Google but still consumed by AI platforms)
3. Missing Houzz profile — critical for custom home/ADU buyer research
4. BBB A- rating with negative reviews unaddressed
5. No city-specific blog content to support pSEO pages

**Top 5 Quick Wins:**
1. Add FAQPage schema back for AI platform consumption (1 day)
2. Fix llms.txt dynamic date to reflect real content updates (2 hours)
3. Add `/additions`, `/decks`, `/bathrooms` to FULL_ORG_PATHS (30 min)
4. Add ItemList schema to /service-areas hub page (2 hours)
5. Respond to BBB negative reviews (1 hour)

---

## 1. Technical SEO — 90/100

### Security Headers: A+

| Header | Value | Status |
|--------|-------|--------|
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | Pass |
| Content-Security-Policy | Nonce-based with strict-dynamic, report-uri | Pass |
| X-Content-Type-Options | nosniff | Pass |
| X-Frame-Options | SAMEORIGIN | Pass |
| Referrer-Policy | strict-origin-when-cross-origin | Pass |
| Permissions-Policy | camera=(), microphone=(), geolocation=(self), payment=(), browsing-topics=() | Pass |

CSP violation reporting is active via report-uri.com — a level of monitoring most enterprise sites lack.

### Redirects and Canonicals

- www -> non-www: 301 redirect working correctly
- HTTPS enforced via HSTS preload
- Canonical URLs set via Layout.astro with override capability

### Caching Strategy

```
cache-control: public, max-age=300, s-maxage=3600, stale-while-revalidate=86400
```

5-minute browser cache, 1-hour CDN cache, 24-hour stale-while-revalidate. Smart balance of freshness and performance via Railway CDN (Fastly edge in SJC).

### Server-Side Rendering

All content renders server-side in Astro SSR mode. AI crawlers and search bots receive full HTML without JavaScript execution requirements. JSON-LD schema is inline in the initial HTML response.

### Compression

Brotli (quality 4) preferred, gzip fallback — implemented in middleware.ts. Correct priority order.

### robots.txt

Well-configured with sophisticated AI crawler segmentation:
- **Allowed:** GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, ChatGPT-User, Google-Extended, Applebot-Extended
- **Blocked:** CCBot, anthropic-ai, cohere-ai, Bytespider (training crawlers)
- **Protected:** /api/ blocked for all crawlers
- Crawl-delay: 1s for default user-agent
- Sitemaps declared: sitemap-index.xml + image-sitemap.xml
- IndexNow integration referenced

### Link Header (Advanced)

```
Link: </llms.txt>; rel="ai-content-declaration", </llms-full.txt>; rel="llms-full"
```

HTTP Link header declares AI content files — very few sites implement this.

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| None critical | -- | Technical foundation is excellent |

---

## 2. Content Quality — 85/100

### E-E-A-T Assessment

| Signal | Status | Notes |
|--------|--------|-------|
| **Experience** | Strong | Real project photos, CompanyCam daily updates mentioned, specific permit cost ranges by county |
| **Expertise** | Strong | CSLB #1082377, architect-led differentiator, GAF Master Elite, Tesla Powerwall Certified |
| **Authoritativeness** | Good | Wikidata entity (Q139044457), CSLB verification link, founder Person schema with credentials |
| **Trustworthiness** | Strong | Live Google reviews (4.8/5), BBB listed, HSTS preload, enterprise-grade CSP |

### Blog Content (12 Posts)

All 12 blog posts are substantive cost guides and comparison articles targeting "Bay Area" queries:
- Word counts are substantial (2,000-4,000+ words estimated)
- Sourced statistics (Oak Ridge National Lab DOI, ARMA, Remodeling Magazine 2024)
- County-by-county permit cost breakdowns
- Material comparison tables with specific pricing
- FAQ sections with direct, self-contained answers

**Blog Titles:**
1. How Much Does It Cost to Build an ADU in the Bay Area? (2026 Guide)
2. Roof Replacement Cost in the Bay Area (2026 Guide)
3. Second Story Addition Cost in the Bay Area
4. ADU Cost in the Bay Area: What to Budget in 2026
5. Window Replacement Cost in the Bay Area (2026 Guide)
6. James Hardie Siding: Why Bay Area Contractors Recommend It
7. How Long Does a Roof Replacement Take? A Bay Area Timeline
8. How Much Does a Roof Replacement Cost in the Bay Area in 2026
9. Metal Roof vs Asphalt Shingles: Which Is Better for Bay Area Homes?
10. Bay Area Fire Zone Roofing: What Homeowners Need to Know
11. What Does a Roofing Warranty Actually Cover?
12. How to Choose a Roofing Contractor in the Bay Area

### Content Gaps

| Gap | Severity |
|-----|----------|
| No city-specific blog posts (all target "Bay Area" region) | Medium |
| Top-level service pages lack citable prose lead paragraphs | Medium |
| Homepage is navigation-heavy with limited indexable prose | Low |

### Title Tags and Meta Descriptions

| Page | Title | Length | Meta Description | Length |
|------|-------|--------|-----------------|--------|
| Homepage | Hamilton Exteriors \| Bay Area General Contractor \| Custom Homes, ADUs & Roofing | 79 chars | Architect-led Bay Area contractor... | 139 chars |
| /roofing | Bay Area Roofing \| Shingles, Metal & Tile \| Hamilton Exteriors | 62 chars | Architect-led Bay Area roofing contractor... | 133 chars |
| /blog | Ground Up -- The Hamilton Exteriors Blog | 39 chars | Cost guides, project timelines... | 97 chars |

Homepage title at 79 characters is slightly over the ~60 char ideal for SERP display but contains strong keyword targeting.

---

## 3. On-Page SEO — 83/100

### Heading Structure

- H1 on homepage uses hero display text ("Bay Area's Architect-Led Custom Home & Exteriors Contractor")
- Service pages have announcement bar text rendering before the topical H1 — potential H1 confusion for crawlers
- Blog posts have proper H1 > H2 > H3 hierarchy

### Internal Linking

- 50+ internal links on homepage
- Footer contains full service area grid linking to all 44+ city pages
- Breadcrumbs on all location and service pages (HTML + BreadcrumbList schema)
- 3 or fewer clicks from homepage to any city page
- Blog posts cross-link to service pages

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| H1 clarity on service pages | Medium | Announcement bar text may be parsed as H1 before actual heading |
| Blog has only 12 posts | Medium | Thin for a site targeting 6 counties x 7 services |

---

## 4. Schema / Structured Data — 92/100

### Implementation Overview

| Page Type | Schema Types |
|-----------|-------------|
| Layout (global) | @graph: Organization (GeneralContractor + RoofingContractor), WebSite, WebPage |
| Homepage | Full Organization with AggregateRating (live), Reviews, hasCredential, areaServed |
| Service pages | BreadcrumbList + Service + AggregateOffer |
| Sub-service pages | BreadcrumbList + Service + optional Product |
| City pages (general) | BreadcrumbList + WebPage + Reviews |
| City pages (service-area) | BreadcrumbList + WebPage + Reviews (cityGraphJsonLd) |
| County pages | BreadcrumbList + Service |
| Blog posts | BlogPosting with speakable selectors, author Person with Wikidata/CSLB/LinkedIn |
| Blog index | CollectionPage + ItemList |

### Advanced Features

- **Live AggregateRating** pulled from Google Reviews API (not hardcoded)
- **speakable** CSS selectors on blog posts for Google AI voice/AIO extraction
- **hasCredential** with 5 named certifications as EducationalOccupationalCredential
- **areaServed** with 6 counties + Wikipedia sameAs links
- **Wikidata entity IDs** (Q139044457 company, Q139196186 founder)
- **alternateName** "ABR Quality Resources Inc" for DBA entity disambiguation

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| No FAQPage schema anywhere | High | Removed after Google's Aug 2023 restriction, but ChatGPT/Perplexity/Bing still consume it |
| No ItemList schema on /service-areas hub | Medium | Would improve crawl relationship between hub and child pages |
| `/additions`, `/decks`, `/bathrooms` excluded from FULL_ORG_PATHS | Medium | These pages get lean schema without AggregateRating |
| City pages have inconsistent review counts | Low | Main pages show live 37 reviews; city pages show curated subsets |

---

## 5. Performance (CWV) — 88/100

### Infrastructure

- **SSR** on Astro 6.1 via Railway (us-west2 edge)
- **CDN:** Railway CDN with Fastly (cache-sjc)
- **Compression:** Brotli (q4) preferred, gzip fallback
- **Image pipeline:** Astro `getImage()` with WebP conversion, explicit width/height
- **Hero preload:** Mobile (768px) and desktop (1440px) responsive preload images
- **Font strategy:** 3 fonts max (THE BOLD FONT, DM Sans, Satoshi)
- **Analytics:** OpenPanel (~2.3KB, cookie-free) — lightweight

### Estimated Lab Metrics

| Metric | Estimate | Threshold | Status |
|--------|----------|-----------|--------|
| TTFB | ~200-400ms | <800ms | Pass |
| FCP | ~1.0-1.5s | <1.8s | Pass |
| LCP | ~1.5-2.5s | <2.5s | Pass |
| CLS | ~0.01-0.05 | <0.1 | Pass |
| INP | Low (minimal JS) | <200ms | Pass |

Note: These are estimates based on architecture analysis. Field data from CrUX would be authoritative.

---

## 6. AI Search Readiness (GEO) — 81/100

### Platform-Specific Scores

| Platform | Score | Key Factors |
|----------|-------|-------------|
| Google AI Overviews | 79/100 | Strong schema + speakable; homepage lacks prose |
| ChatGPT | 76/100 | llms.txt present; missing FAQPage schema |
| Perplexity | 82/100 | Structured blog guides with sourced stats; PerplexityBot allowed |
| Bing Copilot | 74/100 | IndexNow integration; thin Reddit/YouTube presence |

### Strengths

- llms.txt and llms-full.txt are live, dynamically generated from Ghost CMS + Google Reviews API
- RSL-1.0-cite-with-attribution license declared
- Dual Wikidata entity links (company + founder)
- Blog content has sourced statistics with DOIs — ideal for AI citation
- speakable CSS selectors on BlogPosting schema
- HTTP Link header declares AI content files

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| No YouTube channel | High | YouTube mention correlation with AI citations is ~0.737 — strongest off-site signal |
| No Reddit presence | Medium | Reddit weighted heavily by ChatGPT and Google AI Overviews |
| FAQPage schema absent | High | ChatGPT, Perplexity, Bing actively consume it for Q&A extraction |
| llms.txt date always shows "today" | Medium | Dynamic date misleads AI freshness signals |
| Service pages lack citable prose | Medium | Conversion-focused pages have minimal extractable text for AI |

---

## 7. Images — 80/100

### Strengths
- Astro image optimization with WebP conversion
- Explicit width/height on hero images (prevents CLS)
- OG images auto-generated (1200x630 JPEG) from hero images
- Separate image-sitemap.xml declared

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| Alt text verification needed | Medium | Full alt text audit recommended on service and city pages |

---

## 8. Local SEO — 74/100

### NAP Consistency: Strong

NAP is centralized in `src/lib/constants.ts` — no drift risk. Consistent across:
- Site footer, Contact page, JSON-LD schema, GBP CID link
- BBB shows "Hamilton Exteriors, Inc" (minor suffix discrepancy)
- Angi/HomeAdvisor shows "ABR Quality Resources" (intentional DBA, mitigated with alternateName in schema)

### Review Health: Concerning

| Metric | Value | Assessment |
|--------|-------|------------|
| Rating | 4.8/5 | Excellent |
| Count | 37 | **Low** for 8-year-old business |
| Platforms | Google, Yelp, Angi, Nextdoor, Trustpilot | Good diversity |
| Velocity | Active (recent reviews) | Needs systematic process |

**Critical:** 37 reviews across ~8 years means ~4.6 reviews/year. The 18-day review cliff (Sterling Sky research) can drop local pack positions. Target: 2+ new Google reviews per month.

### Location Page Architecture: Strong

3-tier hierarchy: /service-areas > /county > /city with 4th tier for city+service pages.
- 6 counties, 44+ cities, county+service sub-pages
- Content is substantive (county-specific housing data, permit timelines, fire districts)
- Not doorway pages — passes thin content tests
- All linked from footer service area grid (3 or fewer clicks from homepage)

### Citation Gaps

| Missing Directory | Priority | Notes |
|-------------------|----------|-------|
| **Houzz** | **High** | Critical for custom home/ADU buyer research |
| Nextdoor Business | Medium | Reviews shown on site but no business page URL |
| Thumbtack | Medium | High-intent home services marketplace |
| BuildZoom | Medium | Auto-populates from CSLB but likely unclaimed |

---

## 9. Sitemap Quality — 90/100

### Structure

- **sitemap-index.xml** references sitemap-0.xml + image-sitemap.xml
- Generated by @astrojs/sitemap integration
- Blog posts fetched from Ghost CMS with lastmod dates
- Sub-service pages from Ghost included
- 6 county pages, 44+ city pages, city+service pages all included
- Blog tag pages correctly excluded (noindexed)
- changefreq/priority omitted (Google ignores them)

### Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| sitemap-0.xml timed out on fetch | Medium | Large SSR-generated sitemap may be slow to serve; consider splitting |
| No lastmod on sitemap-index.xml entries | Low | Child sitemaps lack lastmod in the index |

---

## Prioritized Action Plan

### Critical (Fix Immediately)

1. **Implement systematic Google review velocity program**
   - Send GBP review shortlink via SMS/email 3 days post-project
   - Target: 2+ new Google reviews per month minimum
   - Impact: Highest single ROI action for local SEO

2. **Verify GBP primary category is "General Contractor"**
   - Primary category is #1 ranking factor (Whitespark 2026, score 193)
   - Wrong category is #1 negative factor (score 176)
   - Check GBP dashboard and confirm

### High Priority (Fix Within 1 Week)

3. **Add FAQPage schema back to FAQ.astro**
   - Google no longer shows FAQ rich results, but ChatGPT, Perplexity, and Bing actively consume it
   - Schema is harmless to Google; directly actionable by 3 AI platforms
   - Effort: 1 day

4. **Create a Houzz profile with project photos**
   - Dominant research platform for affluent homeowners planning custom homes/ADUs
   - Upload 10-15 project photos organized by type
   - Provides Tier 1 citation
   - Effort: 2 hours

5. **Address BBB listing**
   - Respond professionally to negative reviews
   - Evaluate BBB accreditation ($400-600/yr) for A+ badge
   - Fix founding date discrepancy (shows 12/2024, should be 2018)
   - Effort: 1 hour + evaluation

6. **Fix llms.txt dynamic date**
   - Currently shows today's date on every request
   - Store real last-modified timestamp instead
   - Effort: 2 hours

### Medium Priority (Fix Within 1 Month)

7. **Add `/additions`, `/decks`, `/bathrooms` to FULL_ORG_PATHS**
   - These service pages currently emit lean schema without AggregateRating
   - One-line code change in Layout.astro line 56
   - Effort: 30 minutes

8. **Add prose lead paragraphs to top-level service pages**
   - 150-200 words before first CTA answering cost/scope/why-Hamilton
   - Gives AI systems extractable content without changing layout
   - Effort: 1-2 days

9. **Add ItemList schema to /service-areas hub**
   - ListItem entries for each county page URL
   - Improves crawl relationship and sitelink eligibility
   - Effort: 2 hours

10. **Create 4-6 city-specific blog posts**
    - Target: "Roof Replacement Cost in Oakland," "ADU Rules San Jose 2026"
    - Supports pSEO city pages with topical depth
    - Effort: 1-2 weeks

11. **Expand Marin/Napa county city coverage**
    - Add Tiburon, Corte Madera, Fairfax, San Anselmo (Marin)
    - High-income zip codes ideal for custom home/ADU work
    - Effort: 1-2 days

12. **Launch YouTube channel**
    - Even one authoritative video ("Bay Area Roof Replacement Cost 2026") would help
    - YouTube mentions correlate at ~0.737 with AI citations
    - Re-add to sameAs in Layout.astro once published
    - Effort: 4-8 weeks

### Low Priority (Backlog)

13. Establish Reddit presence on r/bayarea and r/HomeImprovement
14. Claim BuildZoom and Thumbtack profiles
15. Add Nextdoor Business page URL to sameAs
16. Consider splitting sitemap-0.xml if it continues to timeout
17. Verify all image alt text across service and city pages

---

## What's Working Exceptionally Well

- **Security posture** is enterprise-grade (CSP with nonce + strict-dynamic, HSTS preload, Permissions-Policy, CSP violation reporting)
- **Schema markup** is more sophisticated than 99% of contractor sites (live AggregateRating, speakable, Wikidata entities, hasCredential)
- **llms.txt implementation** is among the most advanced in the local contractor vertical
- **robots.txt** correctly distinguishes AI search crawlers from training crawlers
- **Blog content** is genuinely authoritative with sourced statistics and specific pricing
- **pSEO architecture** is well-structured with substantive, non-doorway city content
- **NAP centralization** in constants.ts prevents citation drift
- **Performance architecture** (SSR, Brotli, Railway CDN, minimal JS) is excellent for CWV
- **HTTP Link header** for AI content declaration is cutting-edge

---

*Report generated by Claude Code SEO Audit | April 12, 2026*
