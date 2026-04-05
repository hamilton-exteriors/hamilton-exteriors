# Hamilton Exteriors -- SEO Action Plan

**Based on:** Full SEO Audit (7 specialist agents), April 5, 2026
**Overall Score:** 79/100
**Target Score:** 88+ after completing Critical + High items

---

## Critical (Fix Immediately)

### 1. Wire unused seed data into pSEO templates
**Impact:** Eliminates duplicate content risk across 507 pages
**Effort:** Medium (4-6 hours)
**Files:** `src/lib/pseo/generate.ts`, `src/lib/pseo/service-templates.ts`

The `city-seed-data.ts` has rich per-city fields (`roofingNote`, `sidingNote`, `windowNote`, `homeStyles`, `climateFactor`, `commonIssue`, `microclimate`, `eraBreakdown`) that are never rendered. Inject these into city+service page templates as a "Local Considerations" section. This is the single highest-impact content change.

### 2. Add `Service` schema to `/roofing` and `/siding`
**Impact:** Fixes broken entity resolution
**Effort:** Low (1-2 hours)
**Files:** Roofing and siding Astro page components

`WebPage.about` on these pages references `@id` values (`/roofing#service`, `/siding#service`) that don't exist. Add a full `Service` block with `serviceType`, `description`, `areaServed`, `provider`, and `offers`.

### 3. Fix `/buy` page
**Impact:** Page is completely broken (0/0/0/0 Lighthouse)
**Effort:** Medium
**Files:** `src/pages/buy/`

Investigate whether this is a CSR-only page that needs SSR, a missing dependency, or a broken route.

### 4. Verify GBP is in SAB mode
**Impact:** Foundational entity consistency
**Effort:** Low (5 minutes)
**Location:** Google Business Profile dashboard

Castro Valley address is broadcast in schema on 500+ pages. If GBP is set to SAB/hidden-address mode, this creates a signal conflict. Log in and confirm.

---

## High (Fix Within 1 Week)

### 5. Add "Leave a Google Review" CTA
**Effort:** Low | **Files:** Layout component, success/thank-you page

Add a prominent button with GBP review shortlink (`https://g.page/r/[place_id]/review`) to footer and post-estimate confirmation page. 52 reviews is dangerously low for a 5-county SAB.

### 6. Fix Sunday openingHoursSpecification
**Effort:** Low | **File:** `src/layouts/Layout.astro`

Remove the Sunday entry entirely. Current `"opens": "00:00", "closes": "00:00"` is interpreted by Google as open 24 hours.

### 7. Fix Unicode replacement characters
**Effort:** Low | **Files:** Ghost-to-Astro rendering pipeline

Em-dashes and en-dashes are being corrupted to `\ufffd` in the author ProfilePage name and BlogPosting descriptions. Add sanitization before JSON-LD serialization.

### 8. Reduce homepage to 1 H1 tag
**Effort:** Low | **File:** Homepage component

Currently 11 H1 tags. Keep the hero headline as H1, demote all others to H2.

### 9. Build Tier 1 citations
**Effort:** Medium | **Location:** External directories

Create profiles on BBB, Angi, Houzz, HomeAdvisor, and Nextdoor. After creation, add profile URLs to the `sameAs` array in Layout.astro.

### 10. Add Open Graph tags
**Effort:** Low | **File:** `src/layouts/Layout.astro`

Add `og:title`, `og:description`, `og:image`, `og:url`, `og:type` to the Layout component. Currently missing from all pages.

---

## Medium (Fix Within 1 Month)

### 11. Differentiate county+service pages
**Effort:** Medium | **File:** `src/lib/pseo/generate.ts` line 572+

County+service pages currently use the first city's seed data, making them ~90% identical to that city's page. Options: add a "Cities We Serve" section with aggregated stats, use county-level language instead of city neighborhoods, or add unique county-level regulatory content.

### 12. Rewrite H2s to question format
**Effort:** Low | **Files:** Homepage, service pages

"The Hamilton Exteriors Difference" -> "What Makes Hamilton Exteriors Different?" AI Overviews preferentially extract content under question headings.

### 13. Expand FAQ answers to 134-167 words
**Effort:** Medium | **Files:** Ghost CMS + pSEO templates

Current answers average 70-120 words. The optimal AI extraction window is 134-167 words with a direct answer in the first sentence.

### 14. Add cross-county internal links
**Effort:** Low | **File:** `src/lib/pseo/generate.ts` line 292

City pages only link within the same county. Oakland should link to Richmond (Contra Costa) which is geographically closer than Fremont. Add a `nearbyCountyCities` section.

### 15. Interlink blog posts with city pages
**Effort:** Medium | **Location:** Blog content in Ghost

Blog posts about Bay Area roofing costs should link to relevant city pages. City pages should link to relevant blog posts. Creates a content hub.

### 16-18. Schema fixes
- Fix `WebPage.about` on city pages to reference service entity, not org
- Add `Review` schema to city pages (testimonials currently unstructured)
- Add CSLB license URL to `sameAs` array

---

## Low (Backlog)

### 19. Start YouTube channel
Strongest AI citation correlator (0.737). 5-10 Bay Area-specific videos: fire zone roofing, reading estimates, material comparisons.

### 20. Build Reddit presence
r/BayArea, r/HomeImprovement, r/oakland. Answer questions about permits, fire zones, costs.

### 21-22. Geographic expansion
- San Mateo County (6-8 cities) -- high-value market between Alameda and Santa Clara
- Tri-Valley (Livermore, Pleasanton, Dublin) -- growing east Alameda County

### 23-25. Minor schema cleanup
- Remove duplicate Maps URL from `sameAs`
- Update `ImageGallery` placeholder dates from `2024-12-31`
- Add `alumniOf` and `award` to Person schema

---

## Score Projections

| Milestone | Projected Score |
|-----------|----------------|
| Current state | 79/100 |
| After Critical items (1-4) | 84/100 |
| After High items (5-10) | 88/100 |
| After Medium items (11-18) | 91/100 |
| After all items | 93+/100 |

---

*Generated by Claude Code SEO Audit -- April 5, 2026*
