# Visual Analysis Findings — hamilton-exteriors.com
**Captured:** 2026-04-02  
**Viewports tested:** Desktop 1440x900, Mobile 390x844  
**Tool:** Playwright / Chromium headless

---

## Critical Issues (Fix Immediately)

### 1. /buy — 404 Page Not Found (CRITICAL)
**Severity:** P0 — Revenue-impacting  
**Affected:** `/buy` — both desktop and mobile  
**What's happening:** The page returns a Railway "Page Not Found" error screen (Framer-style 404 with a blue "Back to Home" button). This is not a Hamilton-branded 404 — it's a third-party hosting 404, meaning the route `/buy` is not deployed or not matched by the routing config.  
**Impact:** The primary conversion/purchase funnel is completely broken. Any paid traffic or SEO clicks to `/buy` dead-end here.  
**Action:** Verify the Astro route `src/pages/buy/index.astro` (or equivalent) exists and was included in the last Railway deploy. Check Railway build logs for missing routes.

### 2. /service-areas/alameda-county-ca/oakland — 404 Page Not Found (CRITICAL)
**Severity:** P0 — pSEO pages broken  
**Affected:** `/service-areas/alameda-county-ca/oakland` — both desktop and mobile  
**What's happening:** Same Railway 404 as the buy page. The city-level pSEO route is not resolving.  
**Impact:** All county/city pSEO pages in the `service-areas/[county]/[city]` route pattern are likely broken. These pages exist specifically for search ranking; serving 404s destroys any index value and will generate Google Search Console errors.  
**Action:** Confirm the dynamic Astro route `src/pages/service-areas/[county]/[city].astro` exists and that `getStaticPaths()` correctly generates the Oakland path. Also check that the Railway deployment completed without build errors.

---

## Page-by-Page Analysis

---

### Homepage — https://hamilton-exteriors.com/

#### Desktop (1440px)
**Screenshot:** `screenshots/va3_homepage_desktop.png`

**Above-the-fold:** Strong. The hero shows an aerial roofing photo, star rating (5/5, 50 reviews), the H1 "BAY AREAS FAVORITE CONSTRUCTION COMPANY", four trust bullets (Licensed/Bonded, $0 Down, 50yr Warranty, 3-5 day install), and a yellow CTA ("Call Us – We Answer Fast"). The lead-capture form floats on the right side with a green "REQUEST A QUOTE" button. Everything converts above the fold without scrolling.

**CTA visibility:** Excellent. Two CTAs visible: yellow phone CTA (left) + green form submit (right). The form loads fully with all fields visible.

**Navigation:** Full horizontal nav with 7 items (About Us, Financing, Contact Us, Services, Service Areas, Reviews) plus phone number and a green "Schedule a FREE Inspection" button. Clear and appropriately spaced.

**Visual hierarchy:** Good. Announcement bar (green, "$2000 off") > nav > H1 (large white on dark overlay) > trust bullets > CTA. Flow is logical.

**Issues:**
- The H1 reads "BAY AREAS FAVORITE CONSTRUCTION COMPANY" — missing apostrophe ("Bay Area's"). Minor but affects credibility.
- Hero text is very large ALL CAPS — consistent with the brand font (THE BOLD FONT) but the phrase "construction company" is generic. A roofing-specific H1 would be stronger for both SEO and conversion.
- The lead form sits on a plain white card over the hero image. The contrast between the dark hero (left) and white form card (right) creates a visual split that may feel disconnected on wider screens. Consider a light overlay on the form card's background.

#### Mobile (390px)
**Screenshot:** `screenshots/va3_homepage_mobile.png`

**Above-the-fold:** Good. Announcement bar, simplified nav (logo + phone only, no hamburger visible in screenshot), star rating, H1, four trust bullets, and the yellow CTA are all visible without scrolling. The lead form begins just below the fold ("Get a FREE QUOTE" heading is barely visible).

**Navigation:** Only logo and phone number visible — no hamburger menu icon captured. If there is no mobile menu toggle this is a significant navigation gap. Needs verification by scrolling or interacting.

**CTA visibility:** Yellow "Call Us – We Answer Fast" button is well-sized (full width, good touch target). Color contrast against the dark hero is strong.

**Text readability:** H1 is large and readable. Trust bullets are legible at mobile size. No text overflow observed.

**Issues:**
- No hamburger/menu icon visible in the mobile nav. If the menu is hidden without a visible toggle, mobile users cannot navigate to other pages.
- The form is below the fold on mobile — acceptable for a lead form (users who scroll are more engaged) but the flow from yellow CTA to form is unclear if the CTA only dials rather than scrolls to the form.

---

### Roofing Service — https://hamilton-exteriors.com/roofing

#### Desktop (1440px)
**Screenshot:** `screenshots/va3_roofing_desktop.png`

**Above-the-fold:** Strong. Layout identical to homepage pattern: hero image (aerial roofing), star rating, H1 "BEST ROOFING COMPANY IN CASTRO VALLEY, CA", trust bullets, yellow CTA, lead form.

**CTA visibility:** Same dual-CTA layout as homepage. Both the yellow phone CTA and green form submit are prominent above the fold.

**Issues:**
- H1 says "BEST ROOFING COMPANY IN CASTRO VALLEY, CA" — but the URL is `/roofing` (not a city-specific page). A city hardcoded into the service-level page heading may confuse visitors from other Bay Area cities. Unless this is dynamically set, it should read something like "BAY AREA ROOFING COMPANY" or use geo-targeting logic.
- Service page feels nearly identical visually to the homepage. There is no visible differentiation in the hero section (same image, same layout). Users who land on `/roofing` from a search may not know they're on a specialized page.
- No breadcrumb visible above the fold.

#### Mobile (390px)
**Screenshot:** `screenshots/va3_roofing_mobile.png`

**Above-the-fold:** Solid. H1, trust bullets, and CTA all visible. The announcement bar wraps to two lines on mobile ("LIMITED TIME GET UP TO $2000 OFF YOUR ROOF REPLACEMENT*") — this stacks correctly and is legible.

**Issues:**
- Same hardcoded "CASTRO VALLEY, CA" issue as desktop.
- Same missing hamburger concern as homepage mobile.

---

### Service Areas — https://hamilton-exteriors.com/service-areas

#### Desktop (1440px)
**Screenshot:** `screenshots/va3_service_areas_desktop.png`

**Above-the-fold:** Present but the H1 reads "SERVICE AREAS FOR ADU CONTRACTOR IN CASTRO VALLEY, CA". This is a significant content mismatch — a service-areas index page should introduce the geographic coverage, not lead with "ADU Contractor." This page likely serves roofing and multiple exterior services, not just ADUs.

**Issues (HIGH):**
- H1 says "SERVICE AREAS FOR ADU CONTRACTOR IN CASTRO VALLEY, CA" — the page is about roofing service areas. "ADU Contractor" is wrong messaging for a roofing company's service area index. This will confuse users and may signal irrelevancy to search engines for roofing queries.
- Same hardcoded "CASTRO VALLEY, CA" — service areas page should not be city-restricted in its heading; it covers all areas.
- No visible list of counties, cities, or map above the fold. The above-fold content is entirely hero/form — no hint of what service areas are covered. Users have to scroll to find geographic content.
- Visually identical layout to homepage and roofing — the brand is consistent but every page having the same hero template reduces page identity.

#### Mobile (390px)
**Screenshot:** `screenshots/va3_service_areas_mobile.png`

**Above-the-fold:** Same "ADU Contractor" H1 issue. All other observations match desktop.

---

### City Page (Oakland) — https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland

**Severity:** P0 — See Critical Issues section above.  
**Both desktop and mobile return a 404 "Page Not Found" error.**

The 404 page shown is NOT Hamilton-branded. It shows a Framer icon and a blue "Back to Home" button — this is a Railway/platform-level 404, not a custom Astro 404. This means:
1. The route is not being generated at build time (missing from `getStaticPaths()` output), OR
2. The build failed silently and the page files were not emitted, OR
3. The Railway routing configuration is not catching this path pattern.

---

### Buy Page — https://hamilton-exteriors.com/buy

**Severity:** P0 — See Critical Issues section above.  
**Both desktop and mobile return a 404 "Page Not Found" error.**

Same Railway 404 as the Oakland city page. The `/buy` route is completely down. Given this is the primary purchase/conversion page for the roof scanner tool, this is the highest priority fix on the site.

---

## Summary Scorecard

| Page | Desktop Renders | Mobile Renders | CTA Visible | Content Correct | Priority |
|---|---|---|---|---|---|
| Homepage `/` | Yes | Yes | Yes | Mostly (apostrophe, generic H1) | Low |
| Roofing `/roofing` | Yes | Yes | Yes | Partial (wrong city in H1) | Medium |
| Service Areas `/service-areas` | Yes | Yes | Yes | No (wrong service type in H1) | High |
| Oakland pSEO | 404 | 404 | N/A | N/A | P0 |
| Buy `/buy` | 404 | 404 | N/A | N/A | P0 |

---

## Prioritized Action List

### P0 — Fix Now (Broken Pages)
1. **Deploy `/buy` route** — Verify `src/pages/buy/index.astro` exists, check Railway build logs, redeploy.
2. **Deploy pSEO city routes** — Verify `getStaticPaths()` in the city page template generates `/service-areas/alameda-county-ca/oakland`. Check if build output includes the file. Redeploy.
3. **Add branded 404 page** — The current 404 is a platform fallback (non-branded, blue button). Add a custom `src/pages/404.astro` that matches Hamilton branding and links to homepage + key services.

### High — Correct Messaging
4. **Fix service-areas H1** — Change from "SERVICE AREAS FOR ADU CONTRACTOR IN CASTRO VALLEY, CA" to something accurate like "SERVICE AREAS — Bay Area Roofing & Exteriors."
5. **Audit hardcoded city names** — "CASTRO VALLEY, CA" appears in the H1 on homepage, /roofing, and /service-areas. Non-city-specific pages should not be locked to one city. Either use dynamic geo content or use "BAY AREA" as the geographic qualifier.

### Medium — Conversion Improvements
6. **Add mobile hamburger menu** — Verify a visible hamburger/menu toggle exists on mobile. If it's rendering off-screen or hidden, this breaks navigation for all mobile users.
7. **Differentiate roofing page hero** — `/roofing` uses the same hero image and layout as the homepage. Add a roofing-specific image or a service-specific headline to distinguish the page.

### Low — Polish
8. **Fix apostrophe in H1** — "BAY AREAS FAVORITE" should be "BAY AREA'S FAVORITE."
9. **Service areas page: show geography above fold** — Consider adding a county list or map teaser above the fold so users immediately understand the geographic scope.

---

## Visual Design Assessment

The pages that load (Homepage, Roofing, Service Areas) show consistent, brand-appropriate design:
- Green (#256346) / Yellow (#FFDE21) palette is well-applied
- THE BOLD FONT displays correctly for all H1 headings
- Star ratings and trust bullets are prominently placed
- Announcement bar (green, white text) is readable and prominent
- Lead form card is clean and functional
- Mobile layout is generally responsive with no horizontal scroll or overflow observed

The primary issues are not design quality — they are routing/deployment failures (two critical 404s) and copy accuracy (wrong service type, wrong city name on generic pages).
