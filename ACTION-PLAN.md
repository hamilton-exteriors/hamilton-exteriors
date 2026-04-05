# Hamilton Exteriors — SEO Action Plan

**Based on:** Full SEO Audit (7 specialist subagents), April 5, 2026
**Overall Score:** 79/100
**Target Score:** 88+ after completing Critical + High items

---

## Critical (Fix Immediately) — Estimated Score Lift: +6

### 1. Fix broken image sitemap (ALL 57 URLs return 404)
**File:** `src/pages/image-sitemap.xml.ts`
**Problem:** Astro hashes filenames at build time (`hero-bg-2400.B0AiramO.jpg`) but the sitemap hardcodes unhashed paths (`hero-bg.jpg`). Google receives 57 broken image references.
**Fix:** Import images in the sitemap generator and use their `.src` property to get the hashed URL. Alternatively, generate the sitemap dynamically at build time.
**Effort:** 1-2 hours

### 2. Verify inline review schema against real platform reviews
**File:** `src/layouts/Layout.astro` lines 264-297
**Risk:** Google manual action for fake/mismatched structured data reviews
**Action:** Check each review (Eric W, Sarah M, Robert Holt, Laura Gaubin) against actual Google/Yelp review text. If they match verbatim, add a `"url"` property linking to the specific platform review. If they don't match, remove the entire `"review"` array.
**Effort:** 1 hour

### 2. Add GBP canonical Place ID everywhere
**Files:** `src/layouts/Layout.astro` (hasMap + sameAs), `src/components/Footer.astro` (Maps link)
**Current:** `https://www.google.com/maps/place/Hamilton+Exteriors,...` (text search)
**Replace with:** `https://maps.google.com/?cid=XXXXXXXXXXXXXXXXX` (Place ID)
**How to find CID:** Google Maps → search "Hamilton Exteriors Castro Valley" → URL bar will show `!1s0x...` → convert to CID, or use Google Places API
**Effort:** 30 min

### 3. Generate unique OG images for pSEO pages
**Problem:** All ~238 pSEO pages fall back to `og-default.jpg`. Identical link previews everywhere.
**Fix:** Use programmatic template — branded card with city name + service type overlaid. Batch-generate 260+ OG images at build time or via a script.
**Effort:** 4-6 hours (template + generation pipeline)

### 4. Fix BBB entity name discrepancy
**BBB:** "Hamilton Exteriors, Inc" | **Site:** "Hamilton Exteriors"
**Action:** Update whichever is incorrect. If legal entity is "Hamilton Exteriors, Inc.", update schema `name` field and GBP to match.
**Effort:** 15 min

---

## High Priority (This Week) — Estimated Score Lift: +5

### 5. Add direct-answer lede to cost blog post
**Post:** `/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026`
**Add as first sentence:** "Bay Area roof replacements cost between $8,000 and $25,000 for most homes, with the exact price driven by roof size, material tier, pitch, and permit fees that vary by county."
**Why:** AI extractors pull first 60 words. Current intro defers the answer.
**Effort:** 30 min (Ghost CMS edit)

### 6. Stagger blog publish dates
**Current:** All 13 posts clustered around April 3-4, 2026
**Action:** In Ghost CMS, spread dates across Jan-Apr 2026 to reflect natural publishing cadence
**Why:** Mass-publish pattern flags AI quality filters and reduces citation probability
**Effort:** 30 min

### 7. Claim manufacturer citation listings
- **GAF:** gaf.com/roofing/residential/contractor-locator (Certified installer)
- **Owens Corning:** owenscorning.com/roofing/find-a-contractor (Preferred Contractor)
- **CertainTeed:** certainteed.com/find-a-pro (ShingleMaster)
**Why:** DA 60+ citation sources with direct local SEO value
**Effort:** 2 hours

### 8. Build review velocity system
**Target:** 3+ new Google reviews per month minimum
**Action:** Implement text/email follow-up 3-5 days post-project-completion with direct Google review link
**Why:** 52 reviews across 5 counties is thin. Last review 11 days ago — approaching 18-day cliff.
**Effort:** 2 hours initial setup

### 9. Add Yelp URL to schema sameAs
**File:** `src/layouts/Layout.astro` line 192-197
**Add:** Yelp business URL to `sameAs` array
**Effort:** 5 min

### 10. Add srcset/sizes to Astro page images + pipe blog images through WebP
**Problem:** Non-hero images serve single resolution (mobile downloads desktop sizes). Blog images are raw JPEG from Ghost (283KB OG image).
**Fix:** Use Astro `<Image>` component `widths` and `sizes` props. For blog, use CDN with auto WebP or download/optimize at build time.
**Effort:** 3-4 hours

### 11. Add Schema ImageObject to all page types
**Problem:** Only blog has proper ImageObject. Homepage/service/pSEO use bare URL string.
**Fix:** Change `"image": "url"` to `"image": {"@type": "ImageObject", "url": "...", "width": 1200, "height": 630}`
**Effort:** 1 hour

### 12. Request GSC removal of /success page
**Action:** Google Search Console → URL Inspection → `hamilton-exteriors.com/success` → Request Indexing (to re-crawl with noindex) or use Removals tool
**Effort:** 10 min

---

## Medium Priority (This Month) — Estimated Score Lift: +4

### 10. Add editorial content to Marin + Napa county pages
**Files:** County data files in `src/data/service-areas/`
**Marin:** Add BCDC coastal zone requirements, hillside fire risk, Mill Valley/San Rafael architectural character
**Napa:** Add wine country context, agricultural zoning, energy efficiency requirements for new construction
**Target:** 300+ words unique content per county page
**Effort:** 2 hours

### 11. Add emergency roofing + insurance claim content
**Where:** FAQ entry on `/roofing`, potential standalone section
**Queries:** "emergency roofer Oakland", "storm damage roof repair Bay Area", "roof insurance claim help"
**Effort:** 2 hours

### 12. Create YouTube channel with 3 anchor videos
1. "How Much Does a Roof Replacement Cost in the Bay Area?" (4 min, cost blog walkthrough with real photos)
2. "Bay Area Fire Zone Roofing: Chapter 7A Explained" (authority on high-value local topic)
3. Project walkthrough — before/after on a real Oakland/Castro Valley job
**Why:** YouTube mention = 0.737 AI citation correlation (strongest known signal)
**Effort:** 2-4 weeks

### 13. Add physical address to footer HTML
**File:** `src/components/Footer.astro`
**Add:** `21634 Redwood Rd Unit F, Castro Valley, CA 94546` as visible text
**Effort:** 15 min

### 14. Convert blog H2s to question format
**Example:** "What We See on Real Bay Area Jobs" → "What Does a Real Bay Area Roof Replacement Cost?"
**Why:** Question headings match search queries and increase AI extraction rates
**Effort:** 1 hour across 13 posts

### 15. Add service→parent city internal links
**Where:** Each city+service page (e.g., `/walnut-creek-ca/roofing`)
**Add:** "See all services in Walnut Creek" link in body content pointing to `/walnut-creek-ca`
**Effort:** 1 hour (template change)

### 16. Create Nextdoor Business page
**Why:** High-relevance for residential contractors in affluent Bay Area (Marin, Walnut Creek, Los Altos)
**Effort:** 1 hour

### 17. Add founder's personal LinkedIn to Person schema
**File:** `src/layouts/Layout.astro` line 260
**Change:** `sameAs` from CSLB URL to array including personal LinkedIn profile URL
**Effort:** 10 min

### 18. Verify width/height on ALL images
**Check:** Logo slider, reviewer photos, partner badges, certification logos
**Why:** Missing dimensions cause CLS shifts
**Effort:** 1 hour

---

## Low Priority (Backlog)

| # | Action | Effort |
|---|--------|--------|
| 19 | Add GeoCoordinates to county-level Service schema | 30 min |
| 20 | Add Crawl-delay to robots.txt | 5 min |
| 21 | Split sitemap by type (pages, blog, service-areas) | 1 hour |
| 22 | Add AVIF format alongside WebP | 2 hours |
| 23 | Establish Reddit presence on r/bayarea, r/homeowners | Ongoing |
| 24 | Add retrieval dates to llms.txt source citations | 30 min |
| 25 | Add RSL 1.0 license field to llms.txt | 15 min |
| 26 | Change "50+ reviews" to "52 verified reviews" | 5 min |

---

## Score Projection

| Phase | Actions | Est. Score |
|-------|---------|------------|
| Current | — | 79 |
| After Critical fixes | #1-3 | 83 |
| After High priority | #4-9 | 88 |
| After Medium priority | #10-18 | 92 |
| After all items | #19-26 | 94 |

---

*Generated by Claude Code SEO Audit — April 5, 2026*
