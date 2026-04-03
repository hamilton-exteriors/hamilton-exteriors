# Hamilton Exteriors — SEO Action Plan

**Based on:** Full SEO Audit, April 2, 2026  
**Current Score:** 76/100  
**Target Score:** 88/100 (achievable with Critical + High items)

---

## Critical — Fix Immediately

### 1. Point DNS to Railway
**Impact:** Unblocks entire SEO stack | **Effort:** 15 min  
**What:** Update `hamilton-exteriors.com` DNS records to point to Railway.  
**Why:** All schema `@id`, canonicals, sitemap URLs, and citation links reference the `.com` domain. Until DNS is live, Google cannot reconcile the entity graph. GBP website link, every citation, and every `sameAs` reference is broken.  
**After cutover:** Verify `hamilton-exteriors.com/sitemap-index.xml` resolves. Submit to GSC. Decommission old Framer site.

### 2. Fix `aggregateRating.reviewCount` Mismatch
**Impact:** Rich snippet eligibility | **Effort:** 5 min  
**File:** `src/layouts/Layout.astro` ~line 161-167  
**What:** Change `reviewCount: 4` and `ratingCount: 4` to match actual Google review count. If 50+ real Google reviews exist, update to `reviewCount: 50`. If not verifiable, remove `reviewCount`/`ratingCount` fields entirely.

### 3. Solicit New Google Reviews (18-Day Rule)
**Impact:** Local pack ranking recovery | **Effort:** Ongoing  
**What:** Last schema review is Jan 22, 2026 (69 days ago). Rankings cliff after 18 days without new reviews. Send review requests to recent customers. Target: 2-4 new Google reviews within 2 weeks. Update schema reviews as they come in.

---

## High — Fix Within 1 Week

### 4. Add `/siding` and `/windows` to Sitemap
**Impact:** Index coverage for 2 core service pages | **Effort:** 5 min  
**File:** `astro.config.mjs` ~line 84 (`customPages` array)  
**What:** Add `https://hamilton-exteriors.com/siding` and `https://hamilton-exteriors.com/windows` to the `customPages` array. These are top-level service pages returning 200 but missing from the sitemap.

### 5. Add Author Bylines to Blog Posts
**Impact:** E-E-A-T, AI citation eligibility | **Effort:** 15-30 min  
**File:** `src/pages/blog/[slug].astro` or Ghost CMS author settings  
**What:** Add "Marcus Hamilton, Owner, CSLB #1082377" as author on all blog posts. Add `Person` schema. Stagger future post dates (don't publish all on same day).

### 6. Add `FAQPage` Schema to Service Pages
**Impact:** AI Overview extraction, FAQ rich results | **Effort:** 20 min  
**Files:** `src/pages/roofing.astro`, `src/pages/siding.astro`, etc.  
**What:** The FAQ sections exist in HTML but lack `FAQPage` JSON-LD schema. Add structured data matching the existing Q&A content. City pages already have this — mirror the pattern.

### 7. Fix Mill Valley Meta Description Bug
**Impact:** CTR for Mill Valley page | **Effort:** 5 min  
**What:** Meta description reads "Mill's trusted design-build contractor..." — the template drops "Valley" from multi-word city names. Fix the possessive template logic (likely `{city}'s` splitting on first word).

### 8. Add Google Maps Embed
**Impact:** Local trust signal, GBP entity connection | **Effort:** 20 min  
**What:** Add an embedded Google Map showing the service territory to the homepage and `/service-areas` page. For an SAB, a service area overlay is preferred over a pin on the office address.

### 9. Create BBB Listing
**Impact:** Highest-DA missing citation | **Effort:** 30 min  
**What:** Register Hamilton Exteriors with the Better Business Bureau (Bay Area chapter). BBB has high domain authority and is a trust signal for high-ticket home services.

---

## Medium — Fix Within 1 Month

### 10. Add Source Citations to Statistics
**Effort:** 1-2 hours  
**What:** Add external attribution to key claims:
- "Metal roofing reflects up to 70% of solar radiant heat" → cite Oak Ridge National Lab or ENERGY STAR
- "30% Federal Investment Tax Credit" → cite IRS Form 5695 or Energy.gov
- Bay Area cost ranges → cite NAHB or local permit data
- "$4,200 average customer savings" → add methodology

### 11. Differentiate City Page FAQs
**Effort:** 3-4 hours  
**What:** Create 2-3 city-specific FAQ questions per city referencing local factors: Oakland fire zones, Marin design review boards, Napa WUI code, Santa Clara ADU density bonuses, Alameda permit timelines.

### 12. Add `Article` Schema to Blog Posts
**Effort:** 20 min  
**What:** Add JSON-LD `Article` schema with `author`, `datePublished`, `dateModified`, `publisher` to blog post template.

### 13. Create Thumbtack Profile
**Effort:** 30 min  
**What:** Thumbtack is now cited by ChatGPT and Amazon Alexa for contractor queries. Create and verify a profile with NAP matching the schema.

### 14. Verify/Create `llms-full.txt`
**Effort:** 1 hour  
**What:** The `llms.txt` references `/llms-full.txt` but the file may not exist. Create it with full service page content, all blog text, and complete pricing in clean Markdown. Or remove the reference until built.

### 15. Add `<link rel="alternate">` for llms.txt
**Effort:** 5 min  
**File:** `src/layouts/Layout.astro`  
**What:** Add `<link rel="alternate" type="text/plain" href="/llms.txt">` to the `<head>` for AI crawler discovery.

### 16. Fix Breadcrumb Tap Targets on City Pages
**Effort:** 10 min  
**What:** Breadcrumb links on city pages are ~20-24px height. Add `py-2` padding to breadcrumb `<a>` elements to meet 48px minimum touch target.

### 17. Fix "BLOG_POST" Label on Blog Cards
**Effort:** 5 min  
**What:** Map the raw Ghost taxonomy slug "BLOG_POST" to a human-readable display string ("Blog" or "Article") in the blog card template.

---

## Low — Backlog

### 18. Create YouTube Channel (4-6 Videos)
**Effort:** Multi-day project  
**What:** YouTube presence has ~0.737 correlation with AI citation frequency. Create short videos: roof replacement time-lapse, before/after siding, cost explainer, FAQ walkthrough.

### 19. Build Nextdoor Presence
**Effort:** Ongoing  
**What:** Nextdoor is a high-trust local signal for Bay Area residential services.

### 20. Add Manufacturer Locator URLs to `sameAs`
**Effort:** 10 min  
**What:** Add Owens Corning and GAF contractor finder profile URLs to the `sameAs` array in Layout.astro. These are pre-earned citations given existing certifications.

### 21. Fix County Service Schema Type
**Effort:** 5 min  
**File:** `src/components/CountyPage.astro` ~line 50  
**What:** Change `@type: AdministrativeArea` to `@type: County` in the Service schema `areaServed`.

### 22. Add Sticky CTA to Blog Pages (Mobile)
**Effort:** 15 min  
**What:** Blog pages have no lead capture above the fold on mobile. Add a sticky bottom bar with phone number or "Get Free Estimate" CTA.

### 23. Shorten Announcement Bar Copy for Mobile
**Effort:** 5 min  
**What:** "LIMITED TIME GET UP TO $2000 OFF YOUR ROOF REPLACEMENT*" wraps to 2 lines on mobile. Shorten to one line.

### 24. Audit 174 City-Service Pages for Doorway Risk
**Effort:** 2-4 hours  
**What:** Verify city-service pages (e.g., `/oakland-ca/roofing`) have materially unique content per combination. If they're template-swapped with only city name changes, they risk doorway page classification. Consider noindexing low-value combinations or adding unique content.

---

## Implementation Roadmap

| Week | Items | Expected Score Lift |
|------|-------|-------------------|
| **Now** | #1 DNS, #2 reviewCount, #3 reviews | +5 pts → 81 |
| **Week 1** | #4-9 (sitemap, authors, FAQ schema, Mill Valley, maps, BBB) | +5 pts → 86 |
| **Week 2-4** | #10-17 (citations, city FAQs, Article schema, Thumbtack, llms-full.txt) | +3 pts → 89 |
| **Ongoing** | #18-24 (YouTube, Nextdoor, blog CTA, doorway audit) | +2 pts → 91 |

---

*Action plan generated April 2, 2026.*
