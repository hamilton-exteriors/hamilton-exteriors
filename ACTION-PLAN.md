# Hamilton Exteriors — SEO Action Plan

**Generated:** April 10, 2026 (refresh) | **Current Score:** 79/100 | **Target:** 90/100

---

## Critical (Fix Immediately) — Estimated +7 points

| # | Action | Owner | Effort | Impact |
|---|--------|-------|--------|--------|
| 1 | **Fix San Mateo County 404** — Create Ghost CMS content for `/service-areas/san-mateo-county-ca` and 6 county-service pages (roofing, siding, windows, adu, custom-homes, additions). These are in the sitemap and linked from every page's footer. | Dev/Alex | 3 hr | Eliminates dead links on every page, restores coverage for high-value county |
| 2 | Fix `itemReviewed` schema type from `["GeneralContractor","RoofingContractor"]` to `"LocalBusiness"` in Layout.astro:234,243 | Dev | 30 min | Unlocks review star rich results |
| 3 | **Fix dual Angi listings** — Merge ABR listing (ID 10768498) into Hamilton listing (ID 10769498). Update Layout.astro sameAs to use correct URL. | Alex | 2 hr | Eliminates split entity signal |
| 4 | **Fix Wikidata geographic error** — Q139044457 lists Castro Valley in Contra Costa County. Correct to Alameda County on wikidata.org. | Alex | 15 min | Fixes wrong county in knowledge graph |
| 5 | Update HomeAdvisor business name from "ABR Quality Resources" to "Hamilton Exteriors" | Alex | 1 hr | Unifies entity signal |
| 6 | **Fix Yelp sameAs 404** — Verify correct Yelp URL and update Layout.astro:141 | Dev | 15 min | Removes dead link from schema |

## High (This Week) — Estimated +4 points

| # | Action | Owner | Effort | Impact |
|---|--------|-------|--------|--------|
| 7 | Fix pSEO H1s — replace "Best [Service] Company in [City]" with factual differentiators in Ghost CMS | Dev/Alex | 2 hr | Removes unverifiable superlatives from 880+ pages |
| 8 | Fix pSEO meta descriptions — replace "top-rated" with "architect-led" in Ghost CMS | Dev | 1 hr | Removes unverifiable claims from 880+ pages |
| 9 | Add Service JSON-LD to `/roofing`, `/siding`, `/windows`, `/adu`, `/custom-homes`, `/additions` | Dev | 2 hr | Machine-readable service identity for top pages |
| 10 | Fix `aggregateRating.reviewCount` — only count API-sourced reviews (Layout.astro:161) | Dev | 1 hr | Schema guideline compliance |
| 11 | Standardize warranty copy (Difference.astro:18 "35-year labor" vs FAQ "full duration") | Alex/Dev | 15 min | Factual consistency |
| 12 | Defer Meta Pixel behind interaction listener (match GTM pattern at Layout.astro:419) | Dev | 30 min | LCP/TBT improvement |
| 13 | Claim Houzz and BuildZoom profiles | Alex | 1 hr | Top-5 GC citation sources |
| 14 | Add `/buy` to sitemap-0.xml | Dev | 10 min | Missing primary conversion page |

## Medium (This Month) — Estimated +3 points

| # | Action | Owner | Effort | Impact |
|---|--------|-------|--------|--------|
| 15 | Create real `/financing` page with content | Dev/Alex | 3 hr | SEO gap + trust for cost-conscious users |
| 16 | Start YouTube channel (3-5 project walkthrough videos) | Alex | 5 hr | Highest-leverage off-page AI citation signal |
| 17 | Reconcile Oak Ridge DOI — use `10.2172/1220146` in llms.txt.ts:51 and roofing.ts:121 (match index.astro) | Dev | 30 min | Citation verification consistency |
| 18 | Add `legalName` and `foundingDate` to Organization schema (Layout.astro fullOrgSchemaObj) | Dev | 10 min | Entity disambiguation |
| 19 | Add 5 working county landing pages to sitemap-0.xml | Dev | 30 min | Crawl signal for hub pages |
| 20 | Add Service schema to county-service pages (`/service-areas/{county}/{service}`) | Dev | 1 hr | Machine-readable service on pSEO pages |
| 21 | Add external citations to blog post body text (ARMA, DOE, Oak Ridge inline) | Dev | 2 hr | AI citability improvement |
| 22 | Expand contact page editorial content (add "What to expect" section) | Dev | 1 hr | Thin content fix |
| 23 | Expand service-areas index editorial introduction to 500+ words | Dev | 1 hr | Thin content fix |
| 24 | Fix hero review count caching (Hero.astro shows "37", API returns 41) | Dev | 30 min | Trust signal accuracy |
| 25 | Add Google Maps embed to contact page | Dev | 30 min | GBP co-citation signal |

## Low (Backlog)

| # | Action | Effort |
|---|--------|--------|
| 26 | Change Satoshi to `font-display: optional` in global.css:27,34 | 5 min |
| 27 | Add homepage `SpeakableSpecification` (Mission + first FAQ) | 30 min |
| 28 | Trim roofing/siding FAQ answers to under 80 words | 1 hr |
| 29 | Replace generic blog filler link on non-roofing service pages | 30 min |
| 30 | Add `sitemap:` metadata to llms.txt header blockquote | 10 min |
| 31 | Add Nextdoor Business Profile | 30 min |
| 32 | Subset DM Sans to used unicode ranges (~18KB savings) | 30 min |
| 33 | Fix blog slug `sa-county-san-mateo-county-ca` (CMS artifact) | 15 min |
| 34 | Normalize homepage trailing slash in image-sitemap.xml | 10 min |

---

## Score Projection

| Milestone | Items | Score |
|-----------|-------|-------|
| Current | — | 79 |
| After Critical fixes | #1-6 | ~86 |
| After High fixes | #7-14 | ~89 |
| After Medium fixes | #15-25 | ~92 |
| After all | #26-34 | ~93 |

---

## Items Completed (Previous Audit)

| Item | Date |
|------|------|
| IndexNow key file deployed to `/public/` | April 2026 |
| LinkedIn company page added to `sameAs` | April 2026 |
| `preloadHero` on `/siding` and `/windows` | April 2026 |
| `dateModified` on BlogPosting schema | April 2026 |
| `Person.url` on about page schema | April 2026 |
| HSTS preload submitted | April 2026 |
| www redirect configured | April 2026 |
