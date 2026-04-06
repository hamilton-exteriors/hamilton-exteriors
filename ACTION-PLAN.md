# Hamilton Exteriors — SEO Action Plan

**Generated:** April 5, 2026 | **Current Score:** 75/100

---

## Priority Definitions

- **Critical** — Blocks indexing, causes penalties, or creates factual trust issues (fix immediately)
- **High** — Significantly impacts rankings or entity graph (fix within 1 week)
- **Medium** — Optimization opportunity with measurable impact (fix within 1 month)
- **Low** — Strategic investments for long-term authority (backlog)

---

## Critical — Fix Immediately

### 1. Write Page-Specific FAQs
**Impact:** Eliminates the single biggest content quality risk across 400+ pages
**Effort:** 2-3 days
**Files:** Ghost CMS content for all service + city pages

The same 5 generic FAQ questions appear on every page. Google QRG explicitly flags this pattern. Create:
- 5 roofing-specific FAQs for /roofing (shingle types, Bay Area permits, fire zones)
- 5 siding-specific FAQs for /siding (paint cycles, HOA color approval, dry rot)
- 5 windows-specific FAQs for /windows (energy rebates, Title 24, permits)
- City-specific FAQ template with local permit authority, WUI zones, neighborhood factors
- At minimum: make FAQ question #1 and #2 unique per service type

### 2. Fix Rating Badge (5/5 -> 4.8/5)
**Impact:** Removes factual contradiction visible on every page
**Effort:** 1 hour
**Files:** Hero component (likely Layout.astro or a shared hero component)

Change all instances of "rated 5/5 based on 50 reviews" to "rated 4.8/5 based on 52 reviews" to match the actual aggregateRating.

### 3. Remove Duplicate Service @id on /roofing
**Impact:** Fixes schema entity conflict
**Effort:** 15 minutes
**Files:** /roofing page schema generation

Two Service blocks share `@id: "https://hamilton-exteriors.com/roofing#service"`. Keep the block with `aggregateRating` and `dateModified`. Remove the other.

### 4. Remove HowTo Schema from All Pages
**Impact:** Removes dead weight (no rich results since Sept 2023)
**Effort:** 30 minutes
**Files:** Service page + city+service page schema templates

---

## High — Fix Within 1 Week

### 5. Add San Mateo County to `areaServed` (10 min)
Add the 6th county to the LocalBusiness `areaServed` array in homepage schema.

### 6. Update `reviewCount` from 50 to 52 (10 min)
Fix in homepage LocalBusiness schema and propagate to all pages.

### 7. Fix Yelp `sameAs` URL (1 hour)
`yelp.com/biz/hamilton-exteriors-castro-valley` returns 404. Either claim/create the Yelp listing or update the `sameAs` URL to the correct slug.

### 8. Fix "5 Counties. 25+ Cities." Copy (10 min)
Update `/service-areas` index to "6 Counties. 47+ Cities."

### 9. Fix 2 Broken Internal Links on Oakland Page (30 min)
Change `/service-areas/alameda/hayward` to `/service-areas/alameda-county-ca/hayward-ca` (and same for Fremont).

### 10. Add Windows Pricing Table (2 hours)
Roofing has 10 SKUs. Siding has 7 SKUs. Windows has none. Add per-window pricing table by type (single hung, double hung, casement, slider, picture).

### 11. Link Blog Posts from Service Pages + Homepage (1 hour)
Add "From Our Blog" section to Roofing page linking to cost guide. Add blog link to homepage nav or footer.

### 12. Fix LocalBusiness Stub Blocks (30 min)
Replace empty shells on blog/about/blog-index with `@id`-only references: `{"@id": "https://hamilton-exteriors.com/#business"}`

### 13. Investigate GBP Review Velocity (1 hour)
Last schema-embedded review is 73 days old. Check GBP for recent reviews. Implement systematic review request process (text/email within 48 hours of job completion). Target 2-3 new reviews/month.

### 14. Fix Blog Meta Description Encoding Bug (30 min)
Em-dash in roof cost blog description renders as `\uFFFD` (replacement character) in SERPs. Ensure UTF-8 encoding throughout Ghost -> Astro pipeline.

### 15. Fix Meta Description Apostrophe Encoding (1 hour)
Encode possessives (`Bay Area's`, `Oakland's`) as `&#39;` in all meta description attributes. Affects homepage + all city pages.

### 16. Add www -> apex 301 Redirect (15 min)
`www.hamilton-exteriors.com` doesn't resolve. Configure in Railway DNS settings.

### 17. Add /services/* -> /* 301 Redirects (15 min)
`/services/roofing` -> `/roofing`, `/services/siding` -> `/siding`. Catches legacy link patterns.

### 18. Trim Over-Length Title Tags (30 min)
About page: 85 chars -> 55. Roofing: 66 -> 55. Siding: 63 -> 52.

---

## Medium — Fix Within 1 Month

### 19. Add Author Bylines (2 hours)
Add "Alexander Hamilton Li, Architect & GC, CSLB #1082377" byline to all blog posts and service pages. Link to /about/alex-hamilton-li.

### 20. Add BlogPosting @id and name (1 hour)
Every blog post needs `@id` and `name` in its BlogPosting schema.

### 21. Restructure llms.txt (2-3 hours)
Convert from prose to spec-compliant format with H2 sections, canonical page URLs, and `Last-Updated:` field.

### 22. Add H3 Subheadings to Blog Sections (1-2 hours/post)
Split long sections into extractable passages for better AI citation.

### 23. Add Google Maps Embed to City Pages (2 hours)
Embed business Maps listing (CID: 3578771346418026097) on city pages.

### 24. Claim Thumbtack + Nextdoor Profiles (2 hours)
Thumbtack integrates with ChatGPT, Alexa, and Zillow. Nextdoor drives neighbor recommendations.

### 25. Add Sticky Mobile CTA Bar (2 hours)
Yellow "Get a Free Quote" tap target on mobile — form CTA is currently below fold.

### 26. Confirm GBP Primary Category (10 min)
Verify "Roofing Contractor" is primary, not "General Contractor." This is the #1 local ranking factor.

### 27. Standardize areaServed to County Type (30 min)
Harmonize `AdministrativeArea` vs `County` across all schema blocks.

### 28. Investigate /buy Page (1-2 hours)
Lighthouse scores 0/0/0/0. Determine if this is a client-side rendering issue or a broken page.

### 29. Implement IndexNow Protocol (1 hour)
Instant URL submission to Bing/Yandex/Naver when pages are published. Add key file + Ghost webhook integration.

### 30. Verify Brotli Compression (15 min)
Homepage is 158KB, roofing is 198KB. Confirm `content-encoding: br` from Railway's edge. Brotli saves ~15-20% over gzip.

---

## Low — Backlog

### 31. Launch YouTube Channel (2-3 weeks)
3 videos: roof replacement walkthrough, cost breakdown, siding comparison. Highest AI citation correlation signal (~0.737).

### 25. Apply for Manufacturer Certifications (2-4 weeks)
GAF Master Elite, Owens Corning Platinum. Dofollow links from high-DA manufacturer directories.

### 26. Seek External Media Mention (2-4 weeks)
One placement in Bay Area publication creates independent citation node for AI authority.

### 27-30. Schema Polish, Blog Cadence, Photo Strategy (Ongoing)
- Multi-ratio blog images (16:9, 4:3, 1:1)
- @id on all breadcrumb/FAQ/gallery blocks
- 2 blog posts/month across all service lines
- Before/after project photos geo-tagged to cities

---

## Expected Score Impact

| Action Group | Current | Projected | Delta |
|-------------|---------|-----------|-------|
| Critical fixes (1-4) | 75 | 81 | +6 |
| + High fixes (5-18) | 81 | 87 | +6 |
| + Medium fixes (19-30) | 87 | 92 | +5 |
| + Low/strategic (31-36) | 92 | 95+ | +3 |

---

*Generated April 5, 2026 from Full SEO Audit Report.*
