# Hamilton Exteriors — SEO Action Plan

**Generated:** 2026-04-06 (v6 — 8-agent audit) | **Current Score:** 77/100 | **Target:** 92/100

---

## Critical -- Fix Immediately (Score: 77 -> 82)

### 1. Fix "County County" schema bug
- **File:** `src/pages/service-areas/[...slug].astro` ~line 143
- **Bug:** Wikipedia sameAs URLs double "County" (e.g., `Alameda_County_County,_California`)
- **Fix:** Strip "county" from `urlCountySlug` before appending `_County,_California`
- **Impact:** Fixes entity disambiguation on 600+ pSEO pages
- **Effort:** 15 min

### 2. Fix review velocity
- **Action:** Implement post-project review request workflow (SMS day 1, email day 3, follow-up day 7)
- **Target:** 2-3 new Google reviews per month minimum
- **Why:** Last review dated Jan 22, 2026 (74 days ago). Sterling Sky 18-day rule in effect. This is the #1 local ranking risk.
- **Effort:** 2 hrs to set up automated workflow

### 3. Shorten pSEO title template
- **Current:** `"Roofing, Siding, ADUs & Custom Homes in {City}, CA | Hamilton Exteriors"` (73-78 chars)
- **Proposed:** `"{City} Roofing, Siding & ADUs | Hamilton Exteriors"` (50-58 chars)
- **Impact:** Fixes SERP truncation on 600+ pages
- **Effort:** 15 min (template change)

### 4. Fix conflicting promo banners
- **Page:** /siding (and possibly others)
- **Issue:** "$2000 off" AND "20% off" displayed simultaneously
- **Fix:** Standardize to one offer with an explicit end date
- **Effort:** 15 min

### 5. Fix "Latest Projects" seed data
- **Issue:** Three portfolio entries all show "December 31, 2024"
- **Fix:** Replace with real project data or remove section until populated
- **Effort:** 30 min

### 6. Remove duplicate BreadcrumbList
- **Pages:** /roofing and /siding emit two BreadcrumbList schemas each
- **Fix:** Remove the second emission from the layout component
- **Effort:** 30 min

---

## High -- Fix Within 1 Week (Score: 82 -> 87)

### 7. Fix render-blocking CSS for LCP
- **Files:** `Layout.CRAu_gA2.css` (45 KiB, 300ms blocked), `Reviews.yJ4rpm6z.css` (5 KiB, 150ms blocked)
- **Fix:** Inline critical CSS in `<head>`, load full stylesheets with `media="print" onload="this.media='all'"`
- **Impact:** LCP drops from 2.8s to ~2.3s (under 2.5s threshold), mobile score 93 -> 97+
- **Effort:** 2 hrs

### 8. Add CertainTeed ShingleMaster to schema
- **File:** `src/layouts/Layout.astro` hasCredential array
- **Fix:** Add 6th EducationalOccupationalCredential entry matching existing format
- **Effort:** 15 min

### 9. Add datePublished to pSEO review schemas
- **File:** `src/components/GeneralCityPage.astro`
- **Fix:** Add `datePublished` field to review schema map
- **Effort:** 30 min

### 10. Add WebPage schema to homepage
- **Fix:** Add WebPage with `@id: "/#webpage"` and `isPartOf` linking to WebSite
- **Effort:** 30 min

### 11. Add meta description to /about/alex-hamilton-li
- **Suggested:** "Alex Hamilton Li, founder of Hamilton Exteriors. Licensed architect & general contractor (CSLB #1082377) serving the Bay Area since 2018. 500+ projects."
- **Effort:** 5 min

### 12. Claim manufacturer directory listings
- **Directories:** GAF Find a Contractor, James Hardie Contractor Locator, Owens Corning Contractor Locator, Tesla Certified Installer
- **Why:** Free, high-DA citations for certified contractors. Reach brand-loyal buyers directly.
- **Effort:** 2 hrs total

### 13. Add San Mateo County to footer city grid
- **File:** `src/components/Footer.astro`
- **Cities:** Redwood City, San Mateo, Burlingame, Daly City, South San Francisco
- **Why:** Highest-income county in service area, currently zero site-wide links
- **Effort:** 30 min

### 14. Fix pSEO hero image rendering
- **Issue:** City-specific images are preloaded in `<head>` but the visible `<img>` tag renders the generic homepage hero
- **Fix:** Update `<img>` src to use the city-specific image that's already being preloaded
- **Also:** Update alt text to be city-specific (e.g., "Roofing contractor serving Oakland, CA")
- **Effort:** 1 hr

---

## Medium -- Fix Within 1 Month (Score: 87 -> 92)

### 15. Enrich pSEO pages with unique content
Per city page, add:
- City-specific housing stats (median home age, WUI zone %, housing units)
- Unique FAQ answers (not city-name swaps of global FAQs)
- Location-matched reviews (map Google reviews to cities)
- 1-2 real project case studies from that city
- City-specific building code notes
- **Effort:** Ongoing (can partially automate with Ghost CMS data)

### 16. Expand /about/alex-hamilton-li to 1,200+ words
Add: educational background, architecture credential, 2-3 project case studies, company growth timeline since 2018, GAF Master Elite directory link
- **Effort:** 2 hrs

### 17. Verify 50-year warranty badge on /windows
Check if /windows inherits global roofing warranty badge. Update to reflect actual window warranty terms.
- **Effort:** 15 min

### 18. Convert H2s to question format
Service + pSEO pages: "Roofing Types We Install" -> "What Types of Roofs Do We Install in Oakland?"
- **Effort:** 2 hrs (Ghost CMS content edits)

### 19. Create YouTube channel with 5-8 videos
Topics: roof inspection walkthrough, before/after siding, ADU timelapse, roof scanner demo, warranty explainer
- **Why:** Highest AI citation correlation (~0.737). Include business name, CSLB #, address in descriptions.
- **Effort:** 4-8 hrs video production

### 20. Build BBB + Thumbtack profiles
- BBB: Tier 1 trust citation for home services
- Thumbtack: $400M platform integrated with ChatGPT and Alexa
- Add URLs to schema sameAs array after claiming
- **Effort:** 2 hrs

### 21. Add source attribution to service page statistics
Match blog pattern: add parenthetical sources to all third-party data claims on service pages
- **Effort:** 1 hr

### 22. Bring thin blog posts to 1,500+ words
- Fire zone: add insurance claim process section, WUI compliance FAQ
- Hardie siding: add product line cost breakdowns, LP SmartSide/Nichiha comparison
- **Effort:** 2 hrs

### 23-25. Schema + sitemap improvements
- Add HowTo schema to process-oriented blog posts (1 hr)
- Expand image sitemap to all 700+ pages (1 hr)
- Fix roofing H1 garbled apostrophe (5 min)

---

## Low -- Backlog

26. Add SameAs social links in Organization schema
27. Add AVIF format support to Astro image pipeline
28. Create /llms-pricing.txt
29. Build Reddit presence (r/bayarea, r/homeowners posts)
30. Replace stock blog photos with real project photos
31. Add material comparison table to /roofing
32. Add pricing section to /windows
33. Audit Tier 3 small-city pSEO pages for thin content
34. Consider consolidating small-city pages under county hubs
35. Set long-term cache headers on font files
36. Enable edge caching for /roofing SSR (650ms TTFB)

---

## Score Projection

| Milestone | Score | Timeline |
|-----------|-------|----------|
| Current state | 77 | -- |
| After Critical (#1-6) | 82 | This week |
| After High (#7-14) | 87 | Next week |
| After Medium (#15-25) | 92 | 1 month |
| After all fixes | 94+ | 2 months |
