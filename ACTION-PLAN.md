# Hamilton Exteriors — SEO Action Plan

**Generated:** April 1, 2026
**Overall Score:** 41/100
**Target Score:** 70/100

---

## Critical (Fix Immediately) — 5 items

| # | Action | Effort | Impact | Files |
|---|--------|--------|--------|-------|
| 1 | **Fix `/buy` 404** — Page not deployed to production. Check build, Railway logs. | 1-2 hrs | Conversion funnel restored | `src/pages/buy/` |
| 2 | **Fix Oakland mobile hero** — H1 invisible, layout broken at 390px | 2-3 hrs | Mobile UX for all city pages | City page hero CSS |
| 3 | **Render FAQ answers in static HTML** + add `FAQPage` JSON-LD schema | 2-4 hrs | +12-18 GEO pts, AI visibility | FAQ component, Layout.astro |
| 4 | **Restart review velocity** — Implement post-job review request flow, get Google Place ID | 2-3 hrs | Local Pack ranking recovery | Ops process + Footer.astro |
| 5 | **Add Google Maps embed** with verified Place ID, fix footer GBP link | 1-2 hrs | #1 GBP trust signal | Footer.astro, contact section |

## High (Fix Within 1-2 Weeks) — 8 items

| # | Action | Effort | Impact | Files |
|---|--------|--------|--------|-------|
| 6 | **Audit city page service content** — Oakland serves ADU, should cover all services or roofing | 4-8 hrs | Content relevance for city queries | Ghost CMS content, slug handlers |
| 7 | **Add pricing/cost data** to all service pages | 4-8 hrs | +10-15 GEO pts, commercial queries | Service page components |
| 8 | **Create `/llms.txt`** | 1 hr | +8-12 GEO pts | `public/llms.txt` |
| 9 | **Add author identity** — staff bios, author bylines on blog | 4-6 hrs | E-E-A-T signals | Blog templates, new About page |
| 10 | **Enrich city pages** with location-specific facts (permits, codes, climate) | 8-16 hrs | Local content uniqueness | Ghost CMS content |
| 11 | **Expand county pages** from 650 to 1,200+ words | 4-8 hrs | Thin content fix | CountyPage.astro, Ghost content |
| 12 | **Claim BBB + Thumbtack profiles** | 2-3 hrs | Tier 1 citations | `Layout.astro` sameAs array |
| 13 | **Add schema to county/city pages** — ServiceArea on counties, serviceArea prop on cities | 2-3 hrs | Entity graph strength | CountyPage.astro, [...slug].astro |

## Medium (Fix Within 1 Month) — 10 items

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 14 | Fix review rating inconsistency + remove "Sacramento Homeowners" | 1 hr | Trust signals |
| 15 | Expand service sections to 134+ words each | 4-6 hrs | GEO citability |
| 16 | Rewrite H2s as question-format headings | 2-3 hrs | AI extraction, PAA |
| 17 | Standardize phone format to E.164 (`tel:+16509773351`) | 30 min | NAP consistency |
| 18 | Fix Facebook sameAs to canonical page URL | 15 min | Entity verification |
| 19 | Standardize company name to one form | 30 min | NAP consistency |
| 20 | Replace favicon.png with full logo in schema | 15 min | Rich results |
| 21 | Reduce mobile page length (2-col grids, collapsing) | 4-6 hrs | Mobile UX |
| 22 | Add explicit AI crawler directives to robots.txt | 30 min | GEO signals |
| 23 | Add "Leave a Review" direct link | 30 min | Review velocity |

## Low (Backlog) — 11 items

| # | Action | Effort |
|---|--------|--------|
| 24 | Fix "BAY AREAS" apostrophe | 5 min |
| 25 | Increase review badge sizes on mobile | 30 min |
| 26 | Audit touch targets for 48px minimum | 1-2 hrs |
| 27 | Establish YouTube channel | 4-8 hrs |
| 28 | Fix publish timestamp to editorial dates | 30 min |
| 29 | Add emergency roofing language | 1 hr |
| 30 | Build before/after project portfolio | 8-16 hrs |
| 31 | Create dedicated `/financing` page | 2-4 hrs |
| 32 | Update "25+ cities" copy to actual count | 15 min |
| 33 | Fix terracotta tint in Oakland footer | 30 min |
| 34 | Add GAF manufacturer verification link | 30 min |

---

## Projected Score After Fixes

| Phase | Items | Estimated Score |
|-------|-------|-----------------|
| Pre-audit | — | 41/100 |
| **After code fixes (DONE)** | 1-5, 7-8, 13-14, 17-20, 22-24 | **~62/100** |
| After remaining High fixes | 6, 9-12 | ~72/100 |
| After Medium fixes | 15-16, 21, 23 | ~78/100 |
| After All fixes | 25-34 | ~82/100 |

---

## Implementation Order (Recommended Sprint)

**Week 1:** Items 1-5, 8, 17-18 (critical fixes + quick wins)
**Week 2:** Items 6-7, 13, 14, 19-20 (content + schema)
**Week 3:** Items 9-12, 15-16 (authority + content depth)
**Week 4:** Items 21-23, 24-34 (polish + backlog)

---

*Generated April 1, 2026*
