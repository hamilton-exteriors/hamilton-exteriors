# Hamilton Exteriors -- SEO Action Plan

**Generated:** April 5, 2026 | **Current Score:** 80/100 | **Target:** 90/100

---

## Critical -- Fix Immediately

### 1. Add security headers to `server.mjs`
**Impact:** Technical SEO +10 | **Effort:** 30 min | **File:** `server.mjs`

Add HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, and CSP to the `res.writeHead` intercept. Railway does not inject these.

### 2. Audit pSEO content for thin/duplicate risk
**Impact:** Content +8 | **Effort:** 2-4 hours | **Requires:** Ghost CMS admin access

Pull 5 random city pairs (e.g., Oakland vs Hayward roofing, Berkeley vs Fremont siding). Diff body content. If >60% overlap, invest in unique local paragraphs per city: permit office name/URL, neighborhood housing stock data, one real project reference per city.

### 3. Address review velocity cliff
**Impact:** Local SEO +10 | **Effort:** Ongoing

If no new Google reviews since January 2026, implement post-project review request sequence via SMS/email. Target: 2-3 new reviews per month minimum. Add "Leave a Review" link in footer pointing to Google review URL.

---

## High -- Fix Within 1 Week

### 4. Fix homepage and blog index OG images
**Impact:** Images +5, Social CTR | **Effort:** 10 min
**Files:** `src/pages/index.astro` (line 20), `src/pages/blog/index.astro` (line 96)

Pass `heroImage` prop to Layout on both pages. Currently falls back to generic `og-default.jpg`.

### 5. Add `publisher` to BlogPosting schema
**Impact:** Schema +3 | **Effort:** 30 min | **File:** Blog post layout/template

Add `"publisher": {"@type": "Organization", "name": "Hamilton Exteriors", "logo": {"@type": "ImageObject", "url": "..."}}` to all BlogPosting JSON-LD blocks. Required for Article rich results.

### 6. Merge duplicate @type blocks in schema
**Impact:** Schema +2 | **Effort:** 1 hour

Collapse separate RoofingContractor + GeneralContractor + LocalBusiness blocks into single block: `"@type": ["RoofingContractor", "GeneralContractor"]`. LocalBusiness is inherited.

### 7. Add `dateModified` to blog posts
**Impact:** Content +2, GEO +2 | **Effort:** 30 min

Add `dateModified` to BlogPosting schema and a visible "Last updated" line in article headers. Critical for pricing/permit content that changes annually.

### 8. Fix TTFB on cold-start pSEO pages
**Impact:** Performance +3 | **Effort:** 1-2 hours

Enable Railway "Always On" service setting, or add Cloudflare CDN caching on pSEO routes. 7 pages currently exceed 600ms TTFB (worst: 1,592ms).

### 9. Add named author attribution to service/pSEO pages
**Impact:** Content E-E-A-T +3 | **Effort:** 1 hour

Add brief author block with "Alexander Hamilton Li, CSLB #1082377" linking to `/about/alex-hamilton-li` on all service and pSEO pages. Currently only blog posts have author bylines.

---

## Medium -- Fix Within 1 Month

### 10. Add service pricing `priceCurrency` to schema
**Impact:** Schema +2 | **Effort:** 1 hour

Wrap pricing in proper `Offer` or `PriceSpecification` block with `priceCurrency: "USD"` and `unitCode`.

### 11. Add missing pages to image sitemap
**Impact:** Images +1 | **Effort:** 10 min | **File:** `src/pages/image-sitemap.xml.ts`

Add `/adu`, `/custom-homes`, `/additions`, and `/blog` to `pageImages` array.

### 12. Scope pSEO schema `areaServed` to specific city
**Impact:** Local SEO +3, Schema +2 | **Effort:** 2 hours

Change pSEO page `areaServed` from 6-county block to `{"@type": "City", "name": "Oakland", "sameAs": "..."}`. Move `aggregateRating` off Service schema to org entity only.

### 13. Create `Person` schema for Alexander Hamilton Li
**Impact:** Schema +2, E-E-A-T +3 | **Effort:** 1 hour | **File:** `/about/alex-hamilton-li`

Add `ProfilePage` + `Person` schema with `hasCredential` (CSLB), `sameAs` (LinkedIn, CSLB URL), and `knowsAbout` linked entities.

### 14. Mirror blog key passages into llms-full.txt
**Impact:** GEO +3 | **Effort:** 1 hour

Add `## Blog Key Passages` section with 2-4 self-contained paragraphs from each major guide (roof cost, ADU cost, fire zone, window cost).

### 15. Rewrite llms-full.txt section openers to answer-first
**Impact:** GEO +2 | **Effort:** 30 min

Change brand statements to direct answers. Example: "A roof replacement in the Bay Area costs $8,000-$25,000 for most homes..." as the first sentence under roofing.

### 16. Claim Tier 1 citations
**Impact:** Local SEO +5 | **Effort:** 3-4 hours

Create/claim profiles on: BBB, Angi/HomeAdvisor, Houzz, Nextdoor. Claim manufacturer dealer locator listings (GAF Find a Contractor, James Hardie Elite Preferred, Owens Corning dealer page). Add URLs to schema `sameAs`.

### 17. Add Google Maps embed
**Impact:** Local SEO +2 | **Effort:** 30 min

Add Maps iframe to footer or contact section showing Castro Valley office location.

### 18. Clean up IndexNow keys
**Impact:** Technical +1 | **Effort:** 15 min

Confirm active key for Bing/Yandex/Naver. Delete 3 unused key files from `/public/`. Wire up programmatic pings on sitemap `lastmod` updates.

---

## Low -- Backlog

### 19. Fix llms.txt review count discrepancy
Standardize to "52" across both files. Add Google Business Profile review URL.

### 20. Replace ImageGallery with ImageObject arrays
ImageGallery is not a Google-supported rich result type.

### 21. Add `hasCredential` for Tesla Powerwall certification
Rare differentiator in Bay Area solar/roofing market.

### 22. Remove Oswald font reference from `/service-areas`
Not in 3-font design system. Line 58 of `service-areas/index.astro`.

### 23. Delete draft pages `additions-2.astro` and `additions-3.astro`
noindex but still deployable routes.

### 24. Add `twitter:site` handle to meta tags

### 25. Create YouTube channel (3-5 videos)
Highest correlation with AI citation (~0.737). Suggested: "Bay Area roof replacement cost 2026", "How to choose a roofing contractor", "James Hardie vs vinyl siding explained".

### 26. Add `geo.position` meta tag
Format: `<meta name="geo.position" content="37.69427;-122.07887" />` in Layout.astro.

### 27. Replace `knowsAbout` string values with `sameAs` URI references

### 28. Add emergency service language
Competitors use "24/7 emergency" for storm-damage queries. Even a FAQ entry would help.

---

## Score Projection

| Action Group | Score Impact |
|-------------|-------------|
| Critical (1-3) | +6-8 pts |
| High (4-9) | +5-7 pts |
| Medium (10-18) | +4-6 pts |
| **Projected after Critical + High** | **~90/100** |

---

*Generated April 5, 2026. Re-audit recommended after completing Critical + High items.*
