# Hamilton Exteriors — SEO Action Plan

**Generated:** April 10, 2026 | **Current Score:** 81/100 | **Target:** 90/100

---

## Critical (Fix Immediately)

### 1. Fix "County County" schema bug on all 6 county pages
**Category:** Schema | **Impact:** Entity clarity for 6 core service area pages
**File:** `src/pages/service-areas/[...slug].astro` ~line 213
**Issue:** String interpolation appends "County" when the source name from Ghost CMS already contains it. Results in "Alameda County County" in `areaServed.name` and broken Wikipedia `sameAs` URLs (404).
**Fix:** Check if `countyName` already ends with "County" before appending.
**Effort:** 15 minutes

### ~~2. Accelerate review velocity~~ — FALSE POSITIVE
**Status:** Not an issue. Live Google Reviews API is actively pulling fresh reviews (25 in last 3 days). The audit agent incorrectly flagged this based on the static `curated-reviews.ts` file dates (last entry Jan 22, 2026), which are non-Google platform reviews and do not reflect actual review velocity.

---

## High (Fix Within 1 Week)

### ~~3. Fix announcement-bar H1s~~ — FALSE POSITIVE
**Status:** Not an issue. H1s are already topical ("Bay Area's Architect-Led Roofing Contractors", etc.). The announcement text ("Now Booking Summer 2026...") is rendered in a separate `<AnnouncementBar>` component, not the H1.

### 4. Add FAQ sections + FAQPage schema to city/county pages
**Category:** Schema + GEO + Local SEO | **Impact:** 308 pages gain FAQ extraction pathway
**Files:** `src/components/CountyPage.astro`, `src/components/GeneralCityPage.astro`
**Issue:** City pages have `#faq` anchor links but no FAQ content. llms.txt promises citable FAQ that doesn't exist.
**Fix:** Import FAQ.astro component into county/city page templates. Supply 3-5 city-specific FAQs (permit timeline, fire zone materials, local cost range) via Ghost CMS or static data.
**Effort:** 2-4 hours (template + content)

### 5. Resolve YouTube channel gap
**Category:** GEO | **Impact:** 0.737 AI citation correlation
**File:** `src/layouts/Layout.astro` line 142
**Issue:** @HamiltonExteriors declared in sameAs on every page. If channel is empty, this is a broken entity signal.
**Fix (short-term):** Remove YouTube URL from sameAs until channel has real content.
**Fix (long-term):** Publish 3-5 short-form videos (roof inspection walkthrough, before/after, ADU process overview).
**Effort:** 5 minutes (removal) or ongoing (content creation)

### 6. Consolidate Angi/HomeAdvisor to "Hamilton Exteriors" brand name
**Category:** Local SEO | **Impact:** Tier 1 citation NAP consistency
**Issue:** Both platforms list business under "ABR Quality Resources Inc" — not attributed to primary brand.
**Fix:** Update profile names on both platforms to "Hamilton Exteriors" (with DBA note for ABR Quality Resources Inc).
**Effort:** 30 minutes per platform

### 7. Verify GBP primary category
**Category:** Local SEO | **Impact:** #1 ranking factor (Whitespark score: 193)
**Issue:** Cannot verify from site alone whether GBP primary category is "General Contractor" or "Roofing Contractor."
**Fix:** Log into GBP and confirm primary = General Contractor, secondary = Roofing Contractor.
**Effort:** 5 minutes

### 8. Add Google review request CTA to site
**Category:** Local SEO | **Impact:** Review velocity acceleration
**Issue:** Zero on-site paths lead users to leave a Google review.
**Fix:** Add "Leave us a review on Google" link using GBP short URL or `https://search.google.com/local/writereview?placeid=...` to footer and /success page.
**Effort:** 30 minutes

### 9. Fix financing-house image compression
**Category:** Performance + Images | **Impact:** -157KB page weight
**Issue:** `financing-house.jpeg` served at q=90 (222KB). Lighthouse flags 157KB reclaimable.
**Fix:** Add `quality={75}` to the Image component, or switch to `format="avif"`.
**Effort:** 5 minutes

### 10. Add /contact to image sitemap
**Category:** Sitemap + Images | **Impact:** Image search visibility for indexable page
**File:** `src/pages/image-sitemap.xml.ts`
**Fix:** Add a `pageImages` entry for `/contact`.
**Effort:** 5 minutes

---

## Medium (Fix Within 1 Month)

### 11. Reduce TTFB via server-side caching
**Category:** Performance | **Impact:** -450ms LCP/FCP (estimated)
**Issue:** TTFB is 526ms. Google Reviews API fetch blocks HTML response on cache miss.
**Fix:** (a) Move Google Reviews to background revalidation (stale-while-revalidate at process level). (b) Add `Cache-Control: s-maxage=300, stale-while-revalidate=86400` header for homepage + top service pages. (c) Consider Cloudflare free tier or Railway US-West region.
**Effort:** 2-4 hours

### 12. Fix homepage URL in image sitemap
**Category:** Sitemap | **Impact:** URL consistency between sitemaps
**File:** `src/pages/image-sitemap.xml.ts` ~line 22
**Fix:** Change `page: '/'` to `page: ''` so homepage URL matches sitemap-0.xml (no trailing slash).
**Effort:** 2 minutes

### 13. Preload Bold Font 400 weight (or switch to font-display: optional)
**Category:** Performance | **Impact:** -100-150ms LCP
**File:** `src/layouts/Layout.astro`
**Issue:** Bold Font 400 is on critical path at 1,269ms but not preloaded. Comment says "below-fold" but Lighthouse network tree contradicts this.
**Fix:** Either add `<link rel="preload">` for the 400-weight, or add `font-display: optional` to its @font-face in global.css.
**Effort:** 10 minutes

### 14. Reduce hero image quality on mobile preload
**Category:** Performance | **Impact:** -60-80ms LCP on 4G
**File:** `src/layouts/Layout.astro` line 43
**Fix:** Change `quality: 82` to `quality: 75` for mobile hero preload.
**Effort:** 2 minutes

### 15. Cross-link service pages to top city pages
**Category:** On-Page SEO + Local SEO | **Impact:** PageRank distribution to high-value pSEO pages
**Files:** `src/pages/roofing.astro`, etc.
**Fix:** Add "Cities We Serve" section linking to top 3-5 city+service pages (Oakland, San Jose, Berkeley, etc.).
**Effort:** 1-2 hours

### 16. Fix "Best Roofing Company" superlative on city page H1s
**Category:** Content + GEO | **Impact:** Brand rule compliance + AI citation credibility
**Issue:** City pages use "Best Roofing Company in Oakland" — violates anti-superlative rule.
**Fix:** Change to factual H1: "Oakland Roofing Contractor | Hamilton Exteriors"
**Effort:** 30 minutes (template change)

### 17. Add manufacturer locator URLs to sameAs
**Category:** Local SEO | **Impact:** High-authority contractor-specific citations
**File:** `src/layouts/Layout.astro` sameAs array
**Fix:** Add GAF Find-a-Roofer, Owens Corning, James Hardie, CertainTeed contractor locator profile URLs.
**Effort:** 30 minutes (locate URLs + code change)

### 18. Upgrade Meta Pixel dns-prefetch to preconnect
**Category:** Performance | **Impact:** -100-200ms Pixel load time
**File:** `src/layouts/Layout.astro` line 312
**Fix:** Change `<link rel="dns-prefetch" href="https://connect.facebook.net" />` to `<link rel="preconnect" href="https://connect.facebook.net" crossorigin />`.
**Effort:** 2 minutes

### 19. Add county centroid geo coordinates to county pages
**Category:** Local SEO | **Impact:** Geo relevance signals for 6 county pages
**File:** `src/pages/service-areas/[...slug].astro`
**Fix:** Pass county-specific lat/lng through the Layout `geoPosition` prop instead of defaulting to Castro Valley office coordinates.
**Effort:** 30 minutes

### 20. Rephrase blog H2s as questions (or add explicit FAQ blocks)
**Category:** GEO + Schema | **Impact:** FAQPage schema coverage for blog posts
**Fix:** In Ghost CMS, rephrase declarative H2s to question format ("ADU Cost by Type" → "How Much Does a Bay Area ADU Cost?"). This triggers auto-FAQ detection in blog/[slug].astro.
**Effort:** 30 minutes per post

---

## Low (Backlog)

### 21. Fix nav logo dimensions + WebP format
**File:** Navbar component | **Impact:** -18KB per page load
**Fix:** Set width/height to match display size (250x104); add `format="webp"`.

### 22. Switch Satoshi 700 to font-display: optional
**File:** `src/styles/global.css` | **Impact:** Eliminates FOUT flash
**Fix:** Change `font-display: swap` to `font-display: optional` for Satoshi 700 @font-face.

### 23. Extend font cache TTL to 1 year (immutable)
**Impact:** Repeat visit improvement | **Fix:** Add Cache-Control header for /fonts/ in Railway config.

### 24. Extend BackOffice widget cache TTL to 7 days
**Impact:** Repeat visit -6KB | **Fix:** Set `max-age=604800` on portfolio.js response.

### 25. Delete stale `seo_sitemap.xml` from repo root
**Impact:** Housekeeping | **Fix:** `rm seo_sitemap.xml`

### 26. Build Reddit presence
**Impact:** AI citation for Bay Area homeowner queries | **Fix:** Alex participates in r/bayarea, r/homeowners, r/FirstTimeHomeBuyer with genuine contractor advice.

### 27. Pursue BBB accreditation
**Impact:** Trust signal for premium positioning | **Cost:** ~$400-600/year

### 28. Increase geo coordinate precision to 5 decimal places
**File:** `src/layouts/Layout.astro` | **Fix:** Change 37.6942 to 37.69427, -122.0788 to -122.07887.

### 29. Add Nextdoor and Houzz to sameAs (if profiles exist)
**File:** `src/layouts/Layout.astro` | **Fix:** Add URLs if active profiles exist on these platforms.

---

## Score Projection

| Action | Score Impact |
|--------|-------------|
| Fix County County bug (#1) | +1 |
| Fix H1s on service pages (#3) | +2 |
| Add FAQ to city pages (#4) | +3 |
| Reduce TTFB (#11) | +2 |
| Fix image compression (#9, #14, #21) | +1 |
| Cross-link service→city pages (#15) | +1 |

**Projected score after top priorities:** ~91/100
