# Hamilton Exteriors — SEO Action Plan

**Generated:** 2026-04-08 (v8 — 7-agent audit) | **Current Score:** 72/100 | **Target:** 85/100

---

## Critical (Fix Immediately)

### 1. Fix review count discrepancy
**Impact:** Trust, Schema, GEO | **Effort:** 30 min | **Score lift:** +2-3 pts

`llms.txt` says "52 Google reviews", homepage schema says 26, city page schema emits 52. AI systems will generate contradictory citations; Google Rich Results Test will flag the mismatch.

**Action:**
- Determine actual GBP review count
- Update `public/llms.txt` line 17 to match
- Update `public/llms-full.txt` to match
- Fix city page schema source — find where `reviewCount: 52` originates in `ServiceAreaCityPage.astro` and point it to the same live API/fallback as Layout schema
- All instances must show the same number

**Files:** `public/llms.txt`, `public/llms-full.txt`, `src/components/ServiceAreaCityPage.astro`, `src/lib/google-reviews.ts`

---

### 2. Fix blog index title Unicode corruption
**Impact:** SERP CTR | **Effort:** 10 min | **Score lift:** +1 pt

`<title>Ground Up ??? Roofing & Home Tips</title>` — emoji/special character in Ghost CMS title not encoding correctly in Astro SSR output.

**Action:** In Ghost CMS admin, edit the blog section title to remove the special character and use a plain-text separator (dash or pipe).

---

### 3. Standardize warranty language
**Impact:** Trustworthiness | **Effort:** 30 min | **Score lift:** +1-2 pts

Three conflicting descriptions:
- Homepage: "50-Year Warranty"
- Roofing: "50-year manufacturer shingle warranty backed by our own 35-year labor guarantee"
- Buy FAQ: "25 years to lifetime (depending on material) plus our own 10-year workmanship guarantee"

**Action:** Define one canonical warranty statement (e.g., "Manufacturer warranty up to 50 years, backed by our 10-year labor guarantee") and use it everywhere. Create a constant in `src/lib/constants.ts`.

---

### 4. Audit Angi/HomeAdvisor Citrus Heights NAP mismatch
**Impact:** Local rankings (Tier 1 citation conflict) | **Effort:** 1-2 hours | **Score lift:** +3-4 pts

`sameAs` URLs in `Layout.astro` (lines 224-225) link to profiles with `citrus-heights` in the URL path. If those profiles show a Citrus Heights address, this actively suppresses Bay Area local pack rankings.

**Action:**
- Log into HomeAdvisor and Angi
- Update business address to 21634 Redwood Rd Unit F, Castro Valley, CA 94546
- If URLs change after address update, update `sameAs` entries in Layout.astro
- If profiles cannot be corrected, remove them from `sameAs`

**Files:** `src/layouts/Layout.astro` (lines 224-225)

---

### 5. Verify GBP primary category
**Impact:** #1 local ranking factor (Whitespark 2026, score 193) | **Effort:** 5 min | **Score lift:** +3-5 pts if wrong

**Action:** Log into Google Business Profile dashboard. Confirm Primary category = "General Contractor." If currently "Roofing Contractor," change immediately. Add secondary categories: Roofing Contractor, Siding Contractor, Window Installation Service, Home Builder.

---

## High (Complete Within 2 Weeks)

### 6. Add FAQPage schema to /roofing and /buy
**Impact:** Rich results eligibility, AI citation readiness | **Effort:** 2 hours | **Score lift:** +2 pts

Both pages have substantial FAQ content but no `FAQPage` + `Question`/`Answer` schema. The Buy page FAQ answers are the strongest E-E-A-T content on the site.

**Files:** `src/pages/roofing.astro`, `src/pages/buy/index.astro`

---

### 7. Add `sameAs` to Organization schema
**Impact:** Entity disambiguation, Knowledge Graph | **Effort:** 1 hour | **Score lift:** +1-2 pts

Add external profile URLs to the Organization schema:
```json
"sameAs": [
  "https://www.cslb.ca.gov/onlineservices/checklicenseII/LicenseDetail.aspx?LicNum=1082377",
  "https://goo.gl/maps/[GBP-URL]",
  "https://www.yelp.com/biz/hamilton-exteriors-castro-valley",
  "https://www.wikidata.org/wiki/Q139044457",
  "https://www.facebook.com/hamiltonexteriors",
  "https://www.instagram.com/hamiltonexteriors",
  "https://www.linkedin.com/company/hamilton-exteriors",
  "https://www.youtube.com/@HamiltonExteriors"
]
```

**Files:** `src/layouts/Layout.astro`

---

### 8. Add founder educational credentials to bio
**Impact:** Expertise signal | **Effort:** 1 hour | **Score lift:** +1 pt

Missing: architecture degree institution, year licensed, architecture license number (if separate from CSLB GC license). "Worked in architecture and construction management" is unverifiable.

**Files:** `src/pages/about/alex-hamilton-li.astro`, `public/llms.txt`

---

### 9. Build systematic Google review request workflow
**Impact:** Local pack rankings, review velocity | **Effort:** 4-8 hours (setup) | **Score lift:** +3-5 pts over 90 days

26 reviews over 8 years = 5.2% conversion on 500+ projects. Target: 2-3 new Google reviews per month. The 18-day Sterling Sky cliff means consistent velocity matters more than volume.

**Action:** Create post-project SMS/email automation using `GOOGLE_REVIEW_LINK` (already defined in `google-reviews.ts`). Trigger 48 hours after project close.

---

### 10. Fix OG description truncation
**Impact:** Social sharing CTR | **Effort:** 30 min | **Score lift:** +0.5 pts

The og:description may be truncated to just "Bay Area" due to encoding issue. Audit the meta component for proper quote escaping.

**Files:** `src/layouts/Layout.astro` (meta tags section)

---

## Medium (Complete Within 30 Days)

### 11. Rewrite service page H2s as questions
**Impact:** AI Overview trigger rate | **Effort:** 3-4 hours | **Score lift:** +2-3 pts

Convert declarative H2s to query-shaped on /roofing, /siding, /windows, /adu, /custom-homes, /additions:
- "Our Advantage: Why Choose Hamilton Exteriors?" -> "Why Choose Hamilton Exteriors for Bay Area Roofing?"
- "Our Latest Projects" -> "What Does a Hamilton Exteriors Roof Replacement Look Like?"
- "Ready to Start?" -> "How Do I Get a Free Roof Inspection in the Bay Area?"

Follow each H2 with a direct 1-sentence answer within the first 40 words.

---

### 12. Improve readability on service pages
**Impact:** Content quality, user engagement | **Effort:** 4-6 hours | **Score lift:** +3-4 pts

Target FK Reading Ease 60+ (Grade 8-10). Actions:
- Shorter sentences (max 20 words average)
- Active voice
- Break technical specs into bullet lists instead of dense prose
- Add subheadings every 150-200 words

**Priority pages:** /roofing (FK 14.7), blog cost guide (FK 31.0)

---

### 13. Enrich Service Areas index page
**Impact:** Content quality, "[county] contractor" rankings | **Effort:** 2-3 hours | **Score lift:** +1-2 pts

Add 150-200 words per county covering: common project types, code/permit considerations, 1-2 project references. Currently a thin directory of city names.

---

### 14. Claim manufacturer contractor directory listings
**Impact:** DA 60-80+ citations, local authority | **Effort:** 2-4 hours | **Score lift:** +2-3 pts

Claim and verify with correct NAP on:
- GAF Master Elite contractor finder
- Owens Corning contractor locator
- CertainTeed ShingleMaster directory
- James Hardie Elite Preferred installer finder
- Tesla Powerwall certified installer directory

---

### 15. Claim BBB and BuildZoom profiles
**Impact:** Tier 1 citations | **Effort:** 2 hours | **Score lift:** +1-2 pts

- BBB: Get accredited listing, add URL to `sameAs`
- BuildZoom: Claim profile (auto-populated from CSLB data), verify NAP
- Houzz: Create profile with project photos

---

### 16. Add Google Maps embed to city pages
**Impact:** GBP proximity signal, user trust | **Effort:** 3-4 hours | **Score lift:** +1 pt

City pages use Mapbox for quote form but have no Google Maps embed showing the service area. Add an embedded map showing each city (not the office).

---

### 17. Add source attribution to unanchored statistics
**Impact:** AI citability, trustworthiness | **Effort:** 2 hours | **Score lift:** +1 pt

- "$4,200 Avg. Customer Savings" on /buy — add "(based on 2025 Bay Area competitor quote comparisons)"
- "500+ residential projects since 2018" — link to portfolio or GBP
- "over 80 roof replacements in Alameda County" — cite permit records or GBP reviews
- "roughly 60% built before 1960" — link to specific ACS data table

---

## Low (Backlog / 60+ Days)

### 18. Start YouTube channel (3-5 videos)
**Impact:** AI citation frequency (0.737 correlation) | **Effort:** 2-3 weeks

Videos: "How Much Does a New Roof Cost in the Bay Area in 2026", "How the Online Roof Scanner Works", "GAF Master Elite vs Standard Roofer". Titles should match search queries exactly.

### 19. Create Reddit presence
**Impact:** Bing Copilot + Perplexity community signals | **Effort:** Ongoing

Answer questions in r/bayarea, r/homeimprovement, r/oakland with contractor account.

### 20. Add original project photography
**Impact:** Experience signal, image search | **Effort:** Ongoing

Replace stock photos on blog posts. Add geo-tagged project photos (e.g., `oakland-hills-gaf-timberline-install.jpg`). Add `image` property to city page schema.

### 21. Create "Fire Zone Roofing Bay Area" standalone service page
**Impact:** High-intent keyword capture | **Effort:** 3-4 hours

WUI/VHFHSZ content is buried in city pages. Standalone page targeting `[fire zone roofing contractor Bay Area]` creates an internal linking target for 15+ fire-zone-adjacent city pages.

### 22. Create company-level About page
**Impact:** E-E-A-T entity separation | **Effort:** 2-3 hours

Currently `/about` redirects to founder bio. Create a true company About page (team, founding story, community involvement) at `/about`, keep founder bio at `/about/alex-hamilton-li`.

### 23. Add `speakable` schema to FAQ content
**Impact:** Voice search, Google Assistant | **Effort:** 1 hour

### 24. Add security headers
**Impact:** Security trust signals | **Effort:** 2 hours

HSTS, CSP, X-Frame-Options, X-Content-Type-Options via Railway configuration.

### 25. GBP ongoing optimization
- Post every 14 days
- Pre-seed 10+ Q&A pairs
- Add 25+ photos with category albums
- Connect appointment/booking link
- Respond to 100% of reviews within 48 hours

---

## Score Projection

| Timeframe | Actions | Projected Score |
|-----------|---------|-----------------|
| Week 1 (Critical) | Items 1-5 | 72 -> 78 |
| Week 2 (High) | Items 6-10 | 78 -> 82 |
| Month 1 (Medium) | Items 11-17 | 82 -> 87 |
| Month 2-3 (Low) | Items 18-25 | 87 -> 90+ |

---

*Generated from 7-agent parallel SEO audit, April 8, 2026*
