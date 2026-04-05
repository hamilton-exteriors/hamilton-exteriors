# Hamilton Exteriors — SEO Action Plan

**Based on:** Full SEO Audit (7 specialist subagents), April 4, 2026
**Overall Score:** 62/100 (71 raw, penalized for DNS issue)
**Target Score:** 85+ after completing Critical + High items

---

## Critical — Fix Immediately (Blocks All SEO Value)

### 1. Migrate DNS to Railway
**Impact:** Unlocks 100% of SEO value. Currently Google indexes a Framer site at hamilton-exteriors.com.
**Effort:** 15 minutes
**Action:**
- Point hamilton-exteriors.com A/CNAME record to Railway
- Password-protect or take down the Framer site
- Verify all sitemap URLs, canonicals, and schema @ids resolve to Railway/Astro content
- Wait 24-48 hours for DNS propagation, then submit sitemap in Google Search Console

### 2. Merge Duplicate Service Schema on pSEO Pages
**Impact:** Fixes structured data conflict on all ~174 city/service pages.
**Effort:** 1 hour
**Action:** In the pSEO template (likely `[...slug].astro` or `ServicePage.astro`), merge the two Service JSON-LD blocks into one that includes both `geo` (from block 1) and `offers` (from block 2) under a single `@id`.

### 3. Fix Blog LCP Preload URLs
**Impact:** Blog hero images currently 404 at canonical domain.
**Effort:** 30 minutes
**Action:** Change blog post hero image `<link rel="preload">` from `https://hamilton-exteriors.com/content/images/...` to the Ghost CDN absolute URL. Applies to all blog posts.

### 4. Standardize BBB Business Name
**Impact:** NAP inconsistency at Tier 1 directory propagates through aggregators.
**Effort:** 30 minutes
**Action:** Update BBB listing from "Hamilton Exteriors, Inc" to "Hamilton Exteriors" (or add "Inc" everywhere). Pick one, apply consistently.

### 5. Sync Review Count with GBP
**Impact:** Mismatched `reviewCount` can suppress aggregateRating rich results.
**Effort:** 30 minutes
**Action:** Check actual GBP review total. Update schema `reviewCount` and visible "50+" copy to match exactly. Set up a process to update after every 5 new reviews.

---

## High — Fix Within 1 Week

### 6. Add FAQPage Schema to /roofing (and verify /siding, /windows)
**Impact:** 8 FAQ items exist in DOM but no FAQPage JSON-LD block — losing FAQ rich result eligibility.
**Effort:** 30 minutes
**Action:** Add FAQPage JSON-LD block to roofing service page template. Check siding and windows pages for the same gap.

### 7. Create Author Bio Page (/about/alex-hamilton-li)
**Impact:** Blog byline has no linked destination. E-E-A-T author chain is broken — Google cannot cross-reference the author entity.
**Effort:** 2-3 hours
**Action:** Create a dedicated author bio page with verifiable credentials (CSLB link, LinkedIn, project history). Add Person schema with `@id` matching the blog author node. Link from blog bylines.

### 8. Add Lead Paragraph to pSEO Pages (Before Form)
**Impact:** Currently first 60 words are form labels — zero citable content for AI systems.
**Effort:** 2 hours
**Action:** In the pSEO template, add a 60-80 word factual lead paragraph between H1 and quote form. Example for Oakland roofing: "Hamilton Exteriors provides roofing replacement and repair in Oakland, California, serving Rockridge, Montclair, Temescal, and the Oakland Hills. Oakland's 150,000 housing units — 60% built before 1960 (U.S. Census Bureau) — frequently need complete roof replacements. Roof replacement in Oakland costs $8,000-$25,000 depending on size and material."

### 9. Bulk Up Thin pSEO Pages
**Impact:** pSEO unique content is only ~17% of page body (380 words out of ~2,250). 80.8% bigram overlap between city pages. Borderline thin per Google Sept 2025 QRG.
**Effort:** 3-4 hours
**Action:**
- Add "Recent [City] Projects" or "What We See in [City] Homes" section with 3-5 real job observations
- Surface `city-local-facts.ts` data more prominently in template rendering
- Add first-person local experience signals (specific neighborhoods, project counts)
- Target: 600+ unique words per page (currently ~380)
- Priority order: San Jose, Oakland, Fremont, Concord, Berkeley (highest population)

### 10. Add Third-Party Pricing Source to Blog
**Impact:** All blog pricing is self-sourced. Multi-source citations increase trust for ChatGPT/Perplexity.
**Effort:** 30 minutes
**Action:** Add one citation to Remodeling Magazine Cost vs. Value Report or NAR Remodeling Impact Report in the blog post's Sources section.

### 11. Implement IndexNow
**Impact:** Accelerates Bing/Yandex/Naver indexing for 243+ URLs.
**Effort:** 1-2 hours
**Action:** Generate UUID key, place at `/public/[key].txt`, add post-build script to POST to `api.indexnow.org/indexnow`.

### 12. Add Before/After Project Photos
**Impact:** Missing project photos are the biggest trust gap for a contractor site.
**Effort:** 2-3 hours
**Action:** Verify BackOffice Projects widget renders images. If not, implement static project gallery per service category. Also upload 10+ geo-tagged project photos to GBP.

---

## Medium — Fix Within 1 Month

### 11. Create YouTube Channel + Add to sameAs
**Impact:** Highest single-platform AI citation correlation (~0.737).
**Effort:** 1-2 weeks for first video
**Action:** Create Hamilton Exteriors YouTube channel, add URL to Organization schema `sameAs` and llms.txt. Publish 1 video (project time-lapse or "Bay Area roof cost explained").

### 12. Fix Image Alt Text
**Effort:** 10 minutes
**Action:**
- Hamilton silhouette image: change `alt=""` to `alt="Alex Hamilton Li, founder of Hamilton Exteriors"`
- Google review logo: change `alt="Hamilton Exteriors BBB rating"` to `alt="Google Reviews"`

### 13. Remove Duplicate FAQ from Service Pages
**Impact:** Same 8 FAQs on ~180 pages dilutes uniqueness.
**Effort:** 2-3 hours
**Action:** Replace duplicated global FAQ on service pages with page-specific questions only. Keep global FAQ on homepage only.

### 14. Fix FAQ Encoding (Mojibake)
**Impact:** Em dashes display as `â€"` in raw JSON-LD. LLM scrapers see garbled text.
**Effort:** 1 hour
**Action:** Fix UTF-8 encoding in FAQ source template. Verify all `—` characters are properly encoded.

### 15. Add Source Attribution to pSEO Statistics
**Impact:** Unsourced stats less likely to be cited by Perplexity/Bing Copilot.
**Effort:** 1 hour
**Action:** Add parenthetical citations: "(U.S. Census Bureau, 2020 ACS)" for housing data, "(NOAA)" for weather data.

### 16. Add Missing Local Content
**Effort:** 4-6 hours
**Action:**
- ADU pages: California AB 68/SB 9 regulation content
- Windows pages: California Title 24 energy codes, PG&E rebates
- Roofing/siding pages: seismic bracing considerations
- All fire zone pages: CalFire WUI official map links

### 17. Set Up Thumbtack + Nextdoor Profiles
**Impact:** Thumbtack has ChatGPT integration. Nextdoor has high Bay Area relevance.
**Effort:** 2 hours

### 18. Verify Manufacturer Locator Listings
**Impact:** High-DA (60-80) backlinks from GAF, Owens Corning, CertainTeed, James Hardie contractor locators.
**Effort:** 1 hour
**Action:** Verify Hamilton Exteriors appears on all 4 locator pages with correct NAP and backlink.

### 19. Add `hasMap` to Business Entity Schema
**Effort:** 5 minutes
**Action:** Add `"hasMap": "https://www.google.com/maps/place/Hamilton+Exteriors..."` to RoofingContractor block.

### 20. Add WebPage Schema to Homepage
**Effort:** 15 minutes
**Action:** Add `WebPage` JSON-LD block with `@id`, `url`, `name`, `description`, `isPartOf: #website`, `about: #business`.

---

## Low — Backlog

### 21. Add `SearchAction` to WebSite Schema
Only if site search functionality exists on /blog.

### 22. Remove Mapbox Script from Non-Address Pages
~400 bytes savings per page. Guarded by `if(addr)` so no functional impact.

### 23. Diversify Review Dates in Schema
Current 4 reviews all from 2026. Add 1-2 from 2024-2025 for temporal diversity.

### 24. Add County to pSEO Service Schema `areaServed`
Add `containedInPlace: { @type: County }` between City and State.

### 25. Fix Blog Post FAQPage Schema
Rewrite 3 FAQ answers to be complete and self-contained (currently truncated section content).

### 26. Verify GBP Primary Category
Confirm "Roofing Contractor" is primary. Add secondary: "General Contractor", "Siding Contractor", "Window Installation Service".

### 27. Differentiate pSEO Hero Images
Use city-specific or service-specific hero images on top-priority pSEO pages.

---

## Score Projection

| Milestone | Actions | Projected Score |
|---|---|---|
| After DNS migration (#1) | DNS + blog LCP fix | 75/100 |
| After Critical fixes (#1-5) | All critical items | 78/100 |
| After High fixes (#6-10) | pSEO content + schema + photos | 83/100 |
| After Medium fixes (#11-20) | YouTube, citations, local content | 88/100 |
| After all fixes | Complete action plan | 90+/100 |

---

*Generated by Claude Code SEO Audit — April 4, 2026*
