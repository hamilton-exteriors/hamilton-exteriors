# Hamilton Exteriors — SEO Action Plan

**Generated:** April 2, 2026
**Current Score:** 71/100
**Target Score:** 82/100

---

## Critical — Fix Immediately

### 1. Point DNS to Railway
**Impact:** +11 points projected | **Effort:** 30 minutes
**What:** Update DNS A/CNAME records for `hamilton-exteriors.com` to point to the Railway deployment.
**Why:** The Astro build has 539 pages of comprehensive schema, CSP headers, llms.txt, and proper image optimization — none of which are reachable at the custom domain. Every day on Framer costs indexing opportunities.
**Resolves:** Canonical domain mismatch, og:image 404s, sitemap URL mismatch, social preview failures.

### 2. Wire rich `.ts` data files to rendered city pages
**Impact:** +8 points (content + local SEO) | **Effort:** 1-2 days
**What:** The TypeScript data files (`oakland-ca.ts`, `san-jose-ca.ts`, etc.) contain deeply unique local content — S-7 fire zones, BART proximity rules, rental comps ($2,800-$3,500/mo), impact fee waivers, permit program details, neighborhood architecture specifics. **This content is not being rendered.** The `[...slug].astro` routes pull from Ghost CMS, which serves generic templates with city-name-swap only.
**Why:** The difference between the rendered content (doorway page) and the source data (rankable resource) is the single largest gap in the audit. Google's Helpful Content system is specifically trained to detect the template pattern currently live.
**How:** Either: (a) build a direct rendering path from `.ts` data files, bypassing Ghost for city pages, or (b) migrate the rich content into Ghost. Also write unique meta descriptions per city — currently all 539 pages share the identical `DEFAULT_DESCRIPTION`.

### 3. Fix BreadcrumbList `-ca` suffix bug
**Impact:** Fixes structured data on 25+ city pages | **Effort:** 15 minutes
**What:** In `src/pages/service-areas/[...slug].astro` (~line 87), the BreadcrumbList item URL construction drops the `-ca` suffix (e.g., `/service-areas/alameda-county-ca/oakland` instead of `/oakland-ca`). Google Rich Results validator follows these to 404s.
**Why:** High blast radius bug — every city page breadcrumb is broken.

### 4. Verify Google Business Profile
**Impact:** #1 local ranking factor | **Effort:** 1-2 hours
**What:** Verify GBP at 21634 Redwood Rd Unit F, Castro Valley, CA 94546. Set primary category "Roofing Contractor", add secondary categories (Siding Contractor, Window Installation Service, General Contractor). Upload 20+ project photos. Replace the name-search `sameAs` URL with a verified Place ID URL.
**Why:** If GBP is not verified, local 3-pack ranking is zero. The `sameAs` URL is currently a generic name search — not a verified link.

---

## High — Fix Within 1 Week

### 5. Add sticky mobile CTA on hero pages
**Impact:** Conversion improvement | **Effort:** 2 hours
**What:** Add a pinned "Get Free Inspection" button to the bottom of the mobile viewport on `/`, `/roofing`, and all city pages.
**Why:** The lead form submit button is below the fold on mobile (375px) for 3 of 4 key page types. Only `/buy` gets this right with its inline address input. Users must scroll to find the CTA.

### 6. Add `lastmod` to all sitemap entries
**Impact:** Crawl prioritization | **Effort:** 30 minutes
**What:** Configure Astro's sitemap integration to output `<lastmod>` on all pages using file modification time.
**Why:** With 539 pages and no lastmod, Google can't distinguish freshly updated pages from stale ones. Critical for pSEO at scale.

### 7. Fix duplicate gtag.js and consolidate GTM containers
**Impact:** Accurate analytics + performance | **Effort:** 1 hour
**What:** Remove the duplicate `<script async src="gtag/js">` tag. Verify whether both GTM containers (`GTM-MTRC8MMK` and `GTM-P9DS8GFD`) are needed.
**Why:** Double pageview firing corrupts analytics data. Two GTM containers double script weight.

### 8. Add `Service` schema to /buy page
**Impact:** Rich result eligibility | **Effort:** 30 minutes
**What:** Add a `Service` schema block to `/buy` alongside the existing `WebApplication` and `FAQPage`:
```json
{
  "@type": "Service",
  "name": "Online Roof Purchase",
  "description": "Buy a roof replacement online with satellite imagery pricing. No salespeople, no commission.",
  "provider": {"@id": "https://hamilton-exteriors.com/#business"},
  "areaServed": [...counties...],
  "hasOfferCatalog": {...}
}
```

### 9. Fix review date uniformity + rating discrepancy
**Impact:** Trust signals | **Effort:** 30 minutes
**What:** All 4 schema reviews use `datePublished: "2026-01-15"`. Use actual review dates. Also fix the visible "Rated 4.5/5.0" text vs `aggregateRating: 4.8` schema discrepancy — one number everywhere.
**Why:** Uniform review dates trigger Google spam detection. Rating mismatch between visible text and schema is a trust signal violation.

### 10. Address review velocity cliff
**Impact:** Local ranking | **Effort:** Ongoing
**What:** Newest schema review is 70 days old. Implement post-project review solicitation with direct GBP review link. Target minimum 1 new review per week.
**Why:** Sterling Sky 18-day rule — local rankings decay measurably without fresh reviews. 50 reviews is thin for a 5-county SAB; target 100+.

### 11. Generate page-specific OG images
**Impact:** Social share CTR | **Effort:** 2-3 hours
**What:** Create distinct `og:image` assets for at minimum: homepage, each service page (6), each county hub (5), and /buy. City+service pages can share county-level images.
**Why:** All 539 pages currently share one `og-default.jpg`. Social shares of any page look identical, reducing click-through.

### 12. Create fire-hardening / WUI content
**Impact:** High-value local content | **Effort:** 1 day
**What:** Create content about fire-resistant roofing and siding for WUI (Wildland-Urban Interface) zones — specifically Oakland Hills, Marin County, and Napa County.
**Why:** Bay Area fire zones are a major driver of roof replacements. This content serves all three user segments (affluent homeowners in fire zones, anxious first-timers, price-conscious homeowners seeking fire insurance discounts).

---

## Medium — Fix Within 1 Month

### 13. Create YouTube channel + add to sameAs
**Impact:** +3 pts AI citability | **Effort:** 2-4 hours initial
**What:** Create YouTube channel with 3-4 project walkthrough videos (roof replacement timelapse, ADU reveal, before/after siding). Add channel URL to schema `sameAs` array.
**Why:** YouTube is the single strongest AI citation correlation signal (~0.737). Film with a phone — production quality is not the variable.

### 14. Create Wikidata entity for Hamilton Exteriors
**Impact:** Entity recognition across all LLMs | **Effort:** 45 minutes
**What:** Create Q-item at wikidata.org with P856 (website), P968 (email), P17 (USA), P131 (Castro Valley), P452 (roofing contractor), P571 (2018), P1329 (phone). Add Wikidata URL to `sameAs`.
**Why:** Makes Hamilton Exteriors a resolvable entity in the AI knowledge graph rather than an unverified string.

### 15. Add `wordCount` to BlogPosting schema
**Impact:** Google AIO quality signal | **Effort:** 15 minutes
**What:** In `src/pages/blog/[slug].astro`, add `wordCount: post.reading_time ? post.reading_time * 200 : undefined` to BlogPosting schema.

### 16. Add explicit source attribution to pricing data
**Impact:** AI citation confidence | **Effort:** 1 hour
**What:** Add note under roofing pricing table: "Prices reflect Hamilton Exteriors installed pricing as of Q1 2026. All prices include tear-off, materials, labor, and cleanup." Also add to `llms-full.txt`.
**Why:** AI systems treat contractor pricing as a primary source when attribution is explicit. Without it, they may hedge with "unverified."

### 17. Expand blog to 10-15 posts
**Impact:** +3 points (content) | **Effort:** 2-3 weeks
**What:** Publish 7-12 additional blog posts targeting informational roofing queries:
- Asphalt vs. metal vs. tile roofing comparison
- California Title 24 / Cool Roof requirements explained
- Roofing permits by Bay Area county (Alameda, Contra Costa, etc.)
- How to prepare your home for roof replacement
- Understanding roofing warranties (manufacturer vs. workmanship)
- Bay Area ADU roofing requirements
- Storm damage: when to repair vs. replace
**Why:** 3 blog posts is thin for a 539-page site. Informational content builds topical authority and feeds AI citation.

### 18. Set proper cache headers for static files
**Impact:** Performance | **Effort:** 30 minutes
**What:** Set `Cache-Control: public, max-age=86400` for `robots.txt`, `llms.txt`, `llms-full.txt`, and sitemap files. Consider increasing HTML cache from `max-age=300` to `max-age=3600` or higher for a static site.
**Why:** Static files served with `max-age=0` cause unnecessary origin fetches on every crawl.

### 19. Fix blog CollectionPage schema publisher linkage
**Impact:** Knowledge graph connection | **Effort:** 15 minutes
**What:** Update `/blog` schema publisher to include `@id`:
```json
"publisher": {
  "@type": "Organization",
  "@id": "https://hamilton-exteriors.com/#business",
  "name": "Hamilton Exteriors",
  "url": "https://hamilton-exteriors.com"
}
```

### 20. Create a team/about page
**Impact:** E-E-A-T | **Effort:** 1 day
**What:** Create `/about` with named team members, photos, credentials, and company history.
**Why:** "No named contact person" is a trust gap. E-E-A-T requires demonstrable expertise from real people.

### 21. Expand FAQ answers to 100+ words
**Impact:** AI citability | **Effort:** 1 day
**What:** Expand FAQ answers from current 20-55 words to 100-150 words each with specific data points.
**Why:** Short FAQ answers are below the optimal AI citation threshold. Longer, fact-rich answers are more likely to be quoted by AI Overviews, ChatGPT, and Perplexity.

### 22. Add question-format H2 headings on service pages
**Impact:** AI search targeting | **Effort:** 2 hours
**What:** Add H2s like "How much does a roof replacement cost in the Bay Area?" and "What roofing materials work best for Bay Area weather?" to service pages.
**Why:** Question-format headings align with AI search query patterns and improve passage-level citability.

### 23. Increase mobile body copy to 16px minimum
**Impact:** Accessibility + readability | **Effort:** 30 minutes
**What:** Audit hero trust bullets and form helper text on mobile — bump any sub-16px body copy.
**Why:** Design system specifies 16px minimum. WCAG 2.1 AA guidance.

### 24. Add San Francisco service area coverage
**Impact:** Local SEO | **Effort:** 2 hours
**What:** Add San Francisco County as a service area with city page.
**Why:** Highest-value Bay Area roofing market, currently absent from coverage.

---

## Low — Backlog

### 25. Remove deprecated HowTo schema
**Effort:** 15 minutes — Google removed HowTo rich results in Sept 2023. No harm but dead code.

### 26. Rename `--font-oswald` CSS variable
**Effort:** 30 minutes — Rename to `--font-display` for clarity. Update fallback chain.

### 27. Implement IndexNow for Bing/Yandex
**Effort:** 1 hour — With 539 pSEO pages, IndexNow provides instant indexing notifications.

### 28. Add BBB, Angi, Houzz profiles to schema `sameAs`
**Effort:** 1-2 hours (includes creating profiles if they don't exist)

### 29. Shorten /buy address input placeholder
**Effort:** 5 minutes — Change "Enter your home address..." to "Your address" to prevent clipping at 375px.

### 30. Add `preconnect` hints for remaining third-party origins
**Effort:** 15 minutes — Add preconnect for `fonts.googleapis.com` and any remaining CDN origins.

### 31. Fix BlogPosting publisher.logo
**Effort:** 15 minutes — Currently uses OG image instead of proper rectangular logo.

### 32. Add Google Maps iframe embed
**Effort:** 15 minutes — Embed static Maps iframe of Castro Valley office on homepage/contact. Direct GBP co-citation signal.

### 33. Standardize experience timeline
**Effort:** 15 minutes — "Founded 2018" / "10+ years" / "50+ years combined" creates a contradiction. Standardize to: "Founded 2018, with over 50 years of combined crew experience."

---

## Implementation Roadmap

| Phase | Actions | Timeline | Score Impact |
|-------|---------|----------|-------------|
| **Phase 1: DNS + Critical** | #1 (DNS), #3 (breadcrumb bug), #4 (GBP verify) | Day 1 | 71 → 79 |
| **Phase 2: Quick Fixes** | #5-10, #15-16, #18-19, #25-26, #29-32 | Week 1 | 79 → 84 |
| **Phase 3: Content Overhaul** | #2 (wire .ts data), #11-12, #17, #20-22, #24 | Weeks 2-4 | 84 → 90 |
| **Phase 4: Growth** | #13-14, #23, #27-28, #33 | Month 2+ | 90 → 94 |

---

*Action plan generated April 2, 2026 by 7 parallel SEO specialist agents. 539 pages analyzed, 16 visual screenshots captured. 33 prioritized recommendations.*
