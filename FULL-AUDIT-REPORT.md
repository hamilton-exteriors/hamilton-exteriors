# Hamilton Exteriors — Full SEO Audit Report

**Site:** https://hamilton-exteriors.com
**Date:** April 1, 2026
**Business Type:** Hybrid SAB — Roofing Contractor / Design-Build Exterior
**Service Area:** Bay Area, CA (5 counties, 29 cities)

---

## SEO Health Score: 41 / 100 (pre-fix) → ~62 / 100 (post-fix)

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 50 | 11.0 |
| Content Quality | 23% | 35 | 8.1 |
| On-Page SEO | 20% | 45 | 9.0 |
| Schema / Structured Data | 10% | 55 | 5.5 |
| Performance (CWV) | 10% | 40* | 4.0 |
| AI Search Readiness (GEO) | 10% | 28 | 2.8 |
| Images | 5% | 35 | 1.75 |
| **TOTAL** | | | **42.2** |

*Performance estimated from lab data only — no live CrUX field data available.

---

## Executive Summary

Hamilton Exteriors has strong foundational architecture (SSR via Astro, clean URLs, good internal linking, proper schema on homepage) but suffers from several **critical issues** that are actively harming rankings and conversions:

### Top 5 Critical Issues

1. **`/buy` returns 404** — The primary conversion landing page is dead in production
2. **Oakland city page mobile hero is broken** — H1 invisible, layout collapsed at 390px
3. **FAQ answers hidden from AI crawlers** — Accordion-collapsed content is invisible to search engines
4. **Review velocity stopped** — Last review is 68 days old (threshold is 18 days)
5. **No Google Maps embed** — Missing the #1 GBP trust signal linking website to business listing

### Top 5 Quick Wins

1. Create `/llms.txt` (1 hour, +8-12 GEO points)
2. Fix `tel:` href to E.164 format `+16509773351` (15 min)
3. Fix "BAY AREAS" to "BAY AREA'S" apostrophe on homepage hero (5 min)
4. Remove/correct "Sacramento Homeowners" copy error (15 min)
5. Replace Facebook share URL with canonical page URL in schema `sameAs` (10 min)

---

## Section 1: Critical Issues (Fix Immediately)

### 1.1 `/buy` Landing Page Returns 404
**Severity: CRITICAL | Category: Technical**

The `/buy` route — the primary conversion page for online roof purchasing — returns a 404 error in production. The error page appears to be a Framer/Railway default, not even the site's custom 404. This means the entire roof purchase funnel is broken.

**Action:** Check if `src/pages/buy/index.astro` exists and is included in the Railway build. Check Railway build logs for errors.

### 1.2 Oakland City Page Mobile Hero Broken
**Severity: CRITICAL | Category: Visual/Mobile**

On the `/service-areas/alameda-county-ca/oakland-ca` page at 390px width, the hero section is severely broken:
- H1 ("Build Your Dream ADU in Oakland") is completely invisible above the fold
- The form card floats between two cropped photo strips with no context
- The photo background renders as side strips instead of full-bleed

**Action:** Fix the CSS grid/flex layout for the city page hero at mobile breakpoints. The heading must be visible above the fold.

### 1.3 FAQ Answers Invisible to AI Crawlers
**Severity: CRITICAL | Category: GEO / Content**

FAQ sections across `/roofing`, homepage, and city pages have questions visible but answers collapsed behind accordions. AI crawlers (GPTBot, Google-Extended, PerplexityBot) either skip or de-weight content hidden via CSS `display:none` or `height:0`. FAQ content is the single most citable format — and it's functionally invisible.

**Action:** Render FAQ answer text in the server HTML regardless of accordion visual state. Use CSS to collapse visually but keep content in the DOM. Add `FAQPage` JSON-LD schema to every page with FAQs.

### 1.4 Review Velocity Gap — 68 Days Since Last Review
**Severity: CRITICAL | Category: Local SEO**

The most recent review in schema dates to January 22, 2026. The Sterling Sky "18-day rule" identifies Local Pack ranking declines when review activity stops for 3+ weeks. At 68 days, this is a significant risk. Additionally, 50 total reviews is below competitive threshold for the Bay Area (top contractors have 150-400+).

**Action:** Implement post-job SMS/email review request flow with a direct Google review link. Target 1-2 new reviews per week.

### 1.5 No Google Maps Embed — Missing GBP Trust Signal
**Severity: CRITICAL | Category: Local SEO**

No Google Maps embed exists anywhere on the site. The footer links to `google.com/maps/place/Hamilton+Exteriors` (a name search, not a Place ID link). For a SAB, a Maps embed with the verified Place ID is the single highest-impact signal confirming website-GBP entity match.

**Action:** Get Google Place ID from GBP dashboard. Embed Maps iframe on homepage contact section and `/service-areas` hub. Replace footer link with Place ID format.

---

## Section 2: High Priority (Fix Within 1-2 Weeks)

### 2.1 City Pages Serving Wrong Service Content
**Severity: HIGH | Category: Content / On-Page**

The Oakland city page URL (`/service-areas/alameda-county-ca/oakland-ca`) serves ADU content with the title "Affordable ADU Contractors in Oakland, CA." The site brands as a roofing contractor. Users arriving from roofing queries see ADU content.

**Action:** Audit all 29 city pages. The default city landing page should cover all services or the primary service (roofing), not just ADU.

### 2.2 Add Cost Range Data to Service Pages
**Severity: HIGH | Category: Content / GEO**

Zero pricing data exists anywhere. "How much does a roof replacement cost in the Bay Area?" is the highest-volume AI-answered query in the contractor category.

**Action:** Add pricing sections to each service page with Bay Area cost ranges, price drivers, and comparisons. Format as self-contained 150-word blocks.

### 2.3 No `llms.txt` File
**Severity: HIGH | Category: GEO**

`/llms.txt` returns 404. This emerging standard directs AI systems to canonical, citable content.

**Action:** Create `public/llms.txt` with site description and key page listing.

### 2.4 No Author Identity on Content
**Severity: HIGH | Category: Content / E-E-A-T**

All content is authorless. No named experts, staff bios, or author bylines. AI systems cannot establish expertise/trust signals.

**Action:** Add author bylines to blog posts and an "About Our Team" section with named experts, credentials, and photos.

### 2.5 City Pages Lack Location-Specific Facts
**Severity: HIGH | Category: Content / Local SEO**

No permit processing times, local code references, climate-specific roofing guidance, or neighborhood context in city pages.

**Action:** Enrich city page Ghost content with permit office info, local building codes, climate considerations, and neighborhood-specific project examples.

### 2.6 County Pages Are Thin Content
**Severity: HIGH | Category: Content / Local SEO**

County pages average 650-750 words with 60% boilerplate. Should be 1,200-1,500 words.

**Action:** Expand with county-specific permit offices, building code nuances, featured project case studies, and local trust signals.

### 2.7 BBB and Thumbtack Profiles Missing
**Severity: HIGH | Category: Local SEO / Citations**

Neither BBB nor Thumbtack referenced. Both are Tier 1 citation/verification sources.

**Action:** Claim/create profiles. Add URLs to `sameAs` array in `Layout.astro`.

### 2.8 Schema Missing on County and City Pages
**Severity: HIGH | Category: Schema**

County pages emit only `BreadcrumbList`. City pages emit `Service` but lack `serviceArea` and `offers`.

**Action:** Add `ServiceArea` schema to county pages. Add `serviceArea` property to city page `Service` schema.

---

## Section 3: Medium Priority (Fix Within 1 Month)

| # | Issue | Category |
|---|-------|----------|
| 3.1 | Review rating inconsistency (5/5, 4.8, 4.5 across page + "Sacramento Homeowners" error) | Content / Trust |
| 3.2 | Service sections average 50-90 words — below 134-word GEO citability floor | Content / GEO |
| 3.3 | H2 headings are CTAs ("Get A FREE Estimate Now!") not question-format headings | On-Page / GEO |
| 3.4 | Phone format inconsistency (3 different formats across schema/HTML/tel href) | Technical / NAP |
| 3.5 | Facebook `sameAs` uses share URL, not canonical page URL | Schema |
| 3.6 | Company name varies: "Hamilton Exteriors" vs "Hamilton Exteriors, INC." vs "Inc." | NAP |
| 3.7 | Schema `logo` uses `favicon.png` — should be full logo (min 112x112px) | Schema |
| 3.8 | Mobile pages excessively long (13,000-18,000px) — consider 2-col grids, collapsing | Mobile / UX |
| 3.9 | No explicit AI crawler directives in robots.txt (only `User-agent: *`) | GEO |
| 3.10 | No "Leave a Review" direct link to Google review form | Local SEO |

---

## Section 4: Low Priority (Backlog)

| Issue | Notes |
|-------|-------|
| "BAY AREAS" missing apostrophe | Homepage hero — should be "BAY AREA'S" |
| Review platform logos small on mobile | May not register as trust marks |
| Touch targets may be below 48px | Form inputs in contact section |
| No YouTube/Reddit/Wikipedia presence | High AI-citation correlation (0.737 for YouTube) |
| Publish timestamp appears machine-generated | Feb 9, 2026 at 3:40 AM UTC |
| No emergency roofing language | Missed opportunity for storm searches |
| No before/after project portfolio with geotagged photos | Local content signal |
| No dedicated `/financing` page | High-intent page for comparing contractors |
| Service area count copy says "25+" | Footer shows 26, data has 34 city files |
| Possible terracotta tint in Oakland page footer | Conflicts with design rules |
| GAF certification lacks manufacturer verification link | Add `sameAs` to GAF locator |

---

## Section 5: AI Search Readiness (GEO) — Score: 28/100

| Dimension | Score |
|-----------|-------|
| Citability | 18/100 |
| Structural Readability | 32/100 |
| Multi-Modal Content | 40/100 |
| Authority & Brand Signals | 20/100 |
| Technical Accessibility | 38/100 |

### Platform-Specific Scores

| Platform | Score | Primary Blocker |
|----------|-------|-----------------|
| Google AI Overviews | 22/100 | No FAQPage schema, no cost data |
| ChatGPT | 25/100 | No llms.txt, no author authority |
| Perplexity | 30/100 | No cited sources, no unique local facts |
| Bing Copilot | 28/100 | No structured data, no answer blocks |
| Claude | 32/100 | No external citations, no author identity |

### Highest-Impact GEO Changes

1. **Render FAQ answers as static HTML + add FAQPage schema** (+12-18 pts)
2. **Add cost range data to service pages** (+10-15 pts)
3. **Create `/llms.txt`** (+8-12 pts)
4. **Add LocalBusiness + Service schema to all pages** (+8-10 pts)
5. **Rewrite H2s as question-format headings** (+6-9 pts)

---

## Section 6: Local SEO — Score: 58/100

| Dimension | Score |
|-----------|-------|
| GBP Signals | 40/100 |
| Reviews & Reputation | 55/100 |
| Local On-Page SEO | 70/100 |
| NAP Consistency & Citations | 65/100 |
| Local Schema Markup | 75/100 |
| Local Link & Authority | 55/100 |

**Strengths:** SSR architecture, clean URL hierarchy, CSLB license in schema with `hasCredential`/`recognizedBy`, `areaServed` with Wikipedia `sameAs` links, footer service area links on every page, `RoofingContractor` schema on homepage, proper `geo.region` meta tags.

**Weaknesses:** No Maps embed, no Place ID link, review velocity stopped, thin county pages, missing Tier 1 citations (BBB, Thumbtack), city pages serving ADU content instead of roofing.

---

## Section 7: Schema & Structured Data — Score: 55/100

**Homepage:** `RoofingContractor` + `WebSite` schemas well-implemented. Includes `hasCredential` (CSLB), `areaServed` (5 counties), `hasOfferCatalog` (6 services), `aggregateRating`, `openingHoursSpecification`.

**City pages:** `Service` schema present but missing `serviceArea` and `offers`.

**County pages:** Only `BreadcrumbList` — needs `ServiceArea` or `Service` schema.

**Missing schemas:** `FAQPage`, `HowTo`, `Article`/`BlogPosting` on blog.

---

## Section 8: Visual & Mobile

| Page | Desktop | Mobile | Key Issue |
|------|---------|--------|-----------|
| Homepage `/` | Pass | Pass | Long page (~13,000px mobile) |
| /roofing | Pass | Pass | Long page, cramped shingle section |
| /oakland-ca | Pass | **BROKEN** | H1 invisible, hero layout collapsed |
| /buy | **404** | **404** | Page does not exist in production |

---

## Key Files to Modify

| File | What to Fix |
|------|------------|
| `src/lib/constants.ts` | Fix `PHONE_HREF` to `tel:+16509773351` |
| `src/layouts/Layout.astro` | Fix Facebook `sameAs`, update logo URL, add `FAQPage` schema |
| `src/components/Footer.astro` | Fix GBP link to Place ID URL, add review CTA |
| `src/components/CountyPage.astro` | Add `ServiceArea`/`Service` schema |
| `src/pages/service-areas/*/[...slug].astro` | Add `serviceArea` to Service schema |
| `src/components/Reviews.astro` | Update review data, add fresh reviews |
| `public/llms.txt` | Create new file |
| `public/robots.txt` | Add explicit AI crawler directives |

---

*Report generated April 1, 2026*
