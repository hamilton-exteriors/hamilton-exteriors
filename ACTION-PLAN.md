# Hamilton Exteriors — SEO Action Plan

**Generated:** April 2, 2026 | **Current Score:** 70/100 | **Target:** 85/100

---

## Critical — Fix Immediately

### C1. Point `hamilton-exteriors.com` DNS to Railway
**Impact:** Unlocks ALL schema, canonicals, sitemap, and citation signals
**Effort:** 30 min (DNS change + SSL verification)
**Score lift:** +5-8 points across Technical, Local, Schema

Every schema `@id`, canonical URL, sitemap entry, and `sameAs` link references `hamilton-exteriors.com`. Until DNS resolves, Google sees a complete mismatch between schema claims and crawled URLs. This single action unblocks the full value of all existing SEO work.

---

### C2. Fix duplicate meta descriptions across 150+ city/service pages
**Impact:** Eliminates massive crawl signal dilution
**Effort:** 2-4 hours (code change in Layout.astro)
**File:** `src/layouts/Layout.astro` (line ~36)
**Score lift:** +3-4 points On-Page

Add a city-specific templated fallback when `rawDescription` is empty and `geoPlacename` is set:
```
"Hamilton Exteriors serves [City], CA — [service] with 50-year warranty. CSLB #1082377. Free estimate: (650) 977-3351."
```
Also audit Ghost CMS for empty `meta_description` fields on all city posts.

---

### C3. Update pricing footnotes from "2025" to "2026"
**Impact:** Removes visible trust-eroding signal on highest-traffic pages
**Effort:** 5 minutes
**Files:**
- `src/data/services/roofing.ts` (~line 89)
- `src/data/services/siding.ts` (~line 96)
- `src/data/services/windows.ts` (~line 108)

---

### C4. Fix or remove broken SearchAction `/blog?q=`
**Impact:** Prevents sitelinks search box suppression
**Effort:** 15 minutes
**File:** `src/layouts/Layout.astro` (lines 228-245)
**Action:** Remove the `potentialAction` block from WebSite schema, or implement a real `?q=` search handler.

---

### C5. Remove duplicate FAQPage JSON-LD from `/buy`
**Impact:** Eliminates content mismatch between JSON-LD and visible HTML
**Effort:** 10 minutes
**File:** `src/pages/buy/index.astro` (lines 48-83)

---

### C6. Add `description` to Service schema on city pages
**Impact:** Strengthens entity signals for 150+ pages
**Effort:** 30 minutes
**File:** `src/pages/service-areas/alameda-county-ca/[...slug].astro` (lines 75-84)

---

## High — Fix Within 1 Week

### H1. Fix BlogPosting author type fallback
**Effort:** 30 min | **File:** `src/pages/blog/[slug].astro`
Fall back to `"@type": "Organization"` when author missing. Add `keywords`, `articleSection`, `isPartOf`.

### H2. Replace schema logo with proper business logo
**Effort:** 1 hr | **File:** `src/layouts/Layout.astro`
Create `/logo-schema.png` (600x120). Keep favicon for `<link rel="icon">` only.

### H3. Add `@id`, `breadcrumb`, `isPartOf` to blog CollectionPage
**Effort:** 30 min | **File:** `src/pages/blog/index.astro`

### H4. Restart review velocity — target 1 new Google review every 14 days
**Effort:** Ongoing process. Implement post-job SMS/email with direct GBP review link.

### H5. Replace Google Maps `sameAs` with Place ID URL
**Effort:** 15 min | **File:** `src/layouts/Layout.astro`

### H6. Fix "3-5 day install" badge on ADU and custom homes pages
**Effort:** 30 min. ADU projects take months. Conditional badge text per service type.

### H7. Remove/fix "Untitled" blog draft
**Effort:** 5 min in Ghost CMS.

### H8. Add missing canonical tags to `/buy` and `/siding`
**Effort:** 15 min.

---

## Medium — Fix Within 1 Month

### M1. Add Product/Offer schema to pricing tables
**Effort:** 4-6 hr | **File:** `src/components/ServicePage.astro`
Strongest rich result opportunity. Product + AggregateOffer per roofing tier.

### M2. Add city-specific LocalBusiness schema to city pages
**Effort:** 2-3 hr | **Files:** `GeneralCityPage.astro`, `ServiceAreaCityPage.astro`

### M3. Fix schema type on `/adu` and `/custom-homes`
**Effort:** 1 hr | Use `GeneralContractor` instead of `RoofingContractor`.

### M4. Build an About/Team page
**Effort:** 4-8 hr. Marcus Hamilton headshot, bio, CSLB license. Major E-E-A-T lift.

### M5. Add outbound citation links to service page statistics
**Effort:** 2-3 hr | Link ARMA, ORNL, MRA references to source URLs.

### M6. Refactor FAQPage JSON-LD to opt-in (not automatic on every page)
**Effort:** 2 hr | **File:** `FAQ.astro`

### M7. Claim Tier 1 home services citations
**Effort:** 4-6 hr | BBB, Angi, Houzz, Thumbtack. Match NAP exactly.

### M8. Fill llms.txt gaps (windows pricing, ADU costs, formal license)
**Effort:** 2-3 hr | **Files:** `public/llms.txt`, `public/llms-full.txt`

### M9. Fix LCP (3.0s) — hero image optimization
**Effort:** 2-4 hr | `fetchpriority="high"`, preload, WebP/AVIF, mobile sizing.

### M10. Add city-specific FAQ questions to location pages
**Effort:** 8-16 hr (content). Replace generic FAQs with city-specific questions.

---

## Low — Backlog

| # | Action | Effort |
|---|--------|--------|
| L1 | Create YouTube channel with 3-5 project videos | 2-3 days |
| L2 | Publish 9 more blog posts (12 total by Q3 2026) | Ongoing |
| L3 | Add `<link rel="ai-content-declaration" href="/llms.txt">` to head | 5 min |
| L4 | Fix `ItemList` `url` → `item` on `/service-areas` | 10 min |
| L5 | Per-page OG images for service pages | 4-8 hr |
| L6 | Add `ImageObject` schema to project gallery | 2 hr |
| L7 | Add manufacturer certs as `hasCredential` schema | 1 hr |
| L8 | Cross-link city pages to nearby cities | 4-8 hr |
| L9 | Add `foundingDate`, `numberOfEmployees` to schema | 15 min |
| L10 | Create Wikidata entry for Hamilton Exteriors | 2 hr |

---

## Priority Impact Matrix

| Action | Effort | Impact | Priority |
|--------|--------|--------|----------|
| Point DNS | 30 min | +5-8 pts | Do first |
| Fix meta descriptions | 2-4 hr | +3-4 pts | Critical |
| Update pricing dates | 5 min | +1 pt | Quick win |
| Fix SearchAction | 15 min | +1 pt | Quick win |
| Remove /buy FAQ dupe | 10 min | +0.5 pt | Quick win |
| Restart review velocity | Ongoing | +3-5 pts | High (process) |
| Product/Offer schema | 4-6 hr | +2-3 pts | Medium |
| About/Team page | 4-8 hr | +2-3 pts | Medium |
| Fix LCP hero image | 2-4 hr | +2-3 pts | Medium |
| YouTube channel | 2-3 days | +3-5 pts | Low (highest long-term ROI) |

**Projected score after Critical + High fixes: ~80/100**
**Projected score after all fixes: ~88/100**

---

*Generated by SEO Audit Agent — April 2, 2026*
