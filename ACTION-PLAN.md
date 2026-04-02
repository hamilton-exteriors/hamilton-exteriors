# Hamilton Exteriors — SEO Action Plan

**Generated:** April 2, 2026 | **Current Score:** 68/100 | **Target:** 85/100

---

## Critical — Fix Immediately

### 1. Point `hamilton-exteriors.com` DNS to Railway
**Impact:** Unblocks all SEO (sitemap submission, Search Console, canonical resolution)
**Effort:** 5 minutes
**Details:** All 251 sitemap URLs, all canonical tags, all schema @id references point to hamilton-exteriors.com. Until DNS resolves, Google cannot crawl via sitemap and all structured data URLs are unreachable. This is the single highest-impact action.

### 2. Fix BlogPosting schema placeholder values
**Impact:** Removes embarrassing raw slugs from structured data
**Effort:** 30 minutes
**Files:** Blog post template (Ghost -> Astro integration)
**Changes:**
- Replace `keywords: "blog_post"` with actual article keywords
- Replace `articleSection: "blog_post"` with human-readable section name (e.g., "Cost Guides")
- Make `wordCount` dynamic at build time instead of hardcoded `1000`
- Change `author` from Organization to Person (`Marcus Hamilton, Owner`)

### 3. Fix AggregateRating review count mismatch
**Impact:** Prevents potential Google manual action for misleading structured data
**Effort:** 30 minutes
**File:** `src/layouts/Layout.astro`
**Changes:** Either embed 10-12 Review objects to substantiate the claimed 50 count, or change `reviewCount` to match embedded reviews and add a `url` pointing to your Google review page.

---

## High — Fix This Week

### 4. Trim title tags to <=60 characters (5 pages)
**Impact:** Prevents SERP truncation, improves CTR
**Effort:** 30 minutes
**Examples:**
- /roofing (84c): "Bay Area Roofing — Shingles, Metal, Tile & Solar | Hamilton Exteriors" -> "Bay Area Roofing: Shingles, Metal & Tile" (41c)
- /siding (86c): "Bay Area Siding — James Hardie & Fiber Cement" (47c)
- /windows (89c): "Bay Area Window Installation — Energy Efficient" (48c)

### 5. Add `fetchpriority="high"` to blog hero image
**Impact:** Improves blog LCP from ~3.5-5s to ~2-2.5s
**Effort:** 10 minutes
**Files:** Blog post layout template
**Changes:** Set `loading="eager"` and `fetchpriority="high"` on the first/hero image. Also add `<link rel="preload">` in `<head>` for the blog hero image.

### 6. Proxy CompanyCam images through Astro image pipeline
**Impact:** Converts 474 KB JPEG to ~60 KB WebP
**Effort:** 2 hours
**Details:** Instead of `<img src="https://img.companycam.com/...">`, use Astro's `<Image>` component or route through `/_image?href=` to get WebP conversion and responsive sizing.

### 7. Implement IndexNow
**Impact:** Instant URL submission to Bing, Yandex, Naver for 251 pages
**Effort:** 1 hour
**Steps:**
1. Generate key at indexnow.org
2. Place key file at `/public/<key>.txt`
3. POST URL list to `api.indexnow.org/indexnow` after each deploy

### 8. Fix `/service-areas` H1 (shows homepage tagline)
**Impact:** Correct page-level heading for the service areas hub
**Effort:** 15 minutes
**Details:** Pass a page-specific `heroTitle` prop to the Hero component on the service-areas page.

### 9. Fix Google Maps sameAs to use Place ID URL
**Impact:** Enables entity disambiguation with Google Knowledge Graph
**Effort:** 15 minutes
**File:** `src/layouts/Layout.astro`, line ~148
**Details:** Replace generic `google.com/maps/place/Hamilton+Exteriors` with actual CID-based URL from Google Maps Share button.

### 10. Add homepage BreadcrumbList schema
**Impact:** Enables breadcrumb rich results from homepage
**Effort:** 15 minutes

---

## Medium — Fix This Month

### 11. Address pSEO content duplication (the big one)
**Impact:** Prevents doorway page penalties, improves rankings for 203 pages
**Effort:** 2-4 weeks (phased)
**Options (pick one or combine):**
- **Option A:** Add 200+ words of genuinely unique content per city (specific neighborhoods, permit office details, typical project examples, local housing stock data). Target 60%+ unique content.
- **Option B:** Reduce to 10-15 high-value cities, add `noindex` to the rest. Focus on cities where you have real projects and reviews.
- **Option C:** Add city-specific FAQ answers, city-specific testimonials, local permit office links, and neighborhood-specific pricing context.

### 12. Add `serviceType` and `offers` to Service schema
**Impact:** Enables SERP price display, consistent schema across service pages
**Effort:** 1 hour
**Files:** Service page templates
**Changes:**
- Add `serviceType: "Roofing"` to /roofing Service block (already present on /windows)
- Add `offers` with `UnitPriceSpecification` and price ranges to all service pages

### 13. Trim meta descriptions to <=158 chars (4 pages)
**Effort:** 20 minutes

### 14. Add `dateModified` and freshness signal to llms.txt
**Effort:** 30 minutes
**Changes:** Add `> Last updated: 2026-04-02` blockquote and `> Pricing valid as of Q1 2026` to both llms.txt and llms-full.txt.

### 15. Fix font cache TTL to 1 year immutable
**Effort:** 15 minutes
**Details:** Change `/fonts/` cache headers from `max-age=604800` to `max-age=31536000, immutable`.

### 16. Resolve missing Satoshi font file
**Effort:** 30 minutes
**Details:** Either add `/fonts/satoshi.woff2` or remove all `font-family: satoshi` references.

### 17. Add HowTo schema to /roofing
**Impact:** Unlocks a separate AI snippet type for procedural queries
**Effort:** 1 hour
**Details:** The "How a Project Works" 9-step block maps directly to HowTo schema.

### 18. Add editorial content to `/service-areas` hub
**Effort:** 2 hours
**Details:** Add 300+ words about Bay Area coverage above the county grid.

### 19. Convert blog H2s to question-format, add H3 subheadings
**Impact:** Improves Google AIO and Perplexity passage extraction
**Effort:** 3 hours (Ghost CMS content edit)

### 20. Add BBB and Thumbtack profiles
**Impact:** Top citation sources for home services + AI visibility
**Effort:** 2 hours to create and verify profiles

### 21. Fix Oakland BreadcrumbList URL bug
**Effort:** 30 minutes
**Details:** URL generates `.../oakland` instead of `.../oakland-ca`. Audit all city pages.

### 22. Use city-specific testimonials on pSEO pages
**Effort:** 2 hours
**Details:** Stop repeating the same 4 reviews on every page. Match reviews to cities where the work was done.

### 23. Move full LocalBusiness schema to homepage only
**Effort:** 2 hours
**Details:** Currently duplicated on all 251 pages. Keep lightweight `@id` reference on sub-pages.

---

## Low — Backlog

### 24. Add embedded Google Map to homepage contact section
### 25. Link manufacturer certifications to verification pages (GAF, CertainTeed, etc.)
### 26. Add CSLB direct license lookup URL to schema and visible links
### 27. Add `<link rel="ai-content" href="/llms.txt">` to Layout.astro head
### 28. Add explicit Google-Extended / Applebot-Extended entries to robots.txt
### 29. Add SpeakableSpecification schema to FAQ answers
### 30. Add BreadcrumbList schema to blog posts
### 31. Add COOP header in Railway config
### 32. Convert /roofing hero source from PNG to JPG
### 33. Add specific liability insurance amounts to "licensed, bonded, insured" copy
### 34. Fix sitemap lastmod (use real content dates, not build time)
### 35. Fix RSS feed 302 redirect
### 36. Add `WebPage`/`ServicePage` schema to service pages
### 37. Create YouTube channel with 3 anchor videos (highest AI citation signal)

---

## Score Projection

| Action Set | Est. Score Change |
|------------|------------------|
| Critical fixes (#1-3) | 68 -> 73 |
| + High fixes (#4-10) | 73 -> 78 |
| + Medium fixes (#11-23) | 78 -> 85 |
| + Low fixes (#24-37) | 85 -> 90 |
