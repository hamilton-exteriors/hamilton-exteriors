# Hamilton Exteriors — SEO Action Plan

**Generated:** April 2, 2026 | **Current Score:** 75/100 | **Target:** 88/100

---

## Critical (Fix Immediately)

### 1. Fix blog post title duplication
**Impact:** SERP display for all blog posts | **Effort:** 5 min | **Score impact:** +2
- Template bug: blog layout appends `| Hamilton Exteriors`, then site Layout appends again
- All 3 blog posts show double brand suffix (77-88 chars, over 60-char guideline)
- Fix in blog post layout to not append brand when Layout already does
- **File:** `src/pages/blog/[slug].astro` — check title prop passed to Layout

### 2. Fix sitemap — 214 pages missing
**Impact:** 46% of site invisible to search engines via sitemap | **Effort:** 30 min | **Score impact:** +4
- sitemap-0.xml has 251 URLs, expected 465
- Check `@astrojs/sitemap` config in `astro.config.mjs`
- Verify all city-service pages are generated at build time
- Submit updated sitemap to Google Search Console after fix

### 3. Add `logo-schema.png` to `/public/`
**Impact:** Schema validation error on every page | **Effort:** 5 min | **Score impact:** +1
- `RoofingContractor` schema references `logo-schema.png` which returns 404
- Create 600x120px logo PNG and place in `/public/logo-schema.png`

### 4. Fix llms.txt license declaration
**Impact:** Legal exposure + AI training conflict | **Effort:** 10 min | **Score impact:** +1
- CC BY 4.0 grants redistribution rights — conflicts with robots.txt training blocks
- Replace in both `public/llms.txt` and `public/llms-full.txt` line 5:
  ```
  > License: Content may be cited by AI search engines with attribution to Hamilton Exteriors (hamilton-exteriors.com). Reproduction, redistribution, or use for AI model training is prohibited.
  ```
- Update stale "Prices valid as of 2025" to "2026" in llms-full.txt

### 5. Fix Google Maps `sameAs` with real Place ID
**Impact:** GBP entity linking on every page | **Effort:** 15 min | **Score impact:** +2
- Current: `https://www.google.com/maps/place/Hamilton+Exteriors` (name search)
- Find Place ID from GBP dashboard or Google Search Console
- Replace with `https://www.google.com/maps/place/?q=place_id:ChIJ...`
- Update in `src/layouts/Layout.astro` and `src/components/Footer.astro`

---

## High (Fix Within 1 Week)

### 6. Preload THE BOLD FONT
**Impact:** LCP improvement, eliminates heading FOUT | **Effort:** 5 min | **Score impact:** +1
- Add to Layout `<head>`:
  ```html
  <link rel="preload" href="/fonts/the-bold-font-700.woff2" as="font" type="font/woff2" crossorigin>
  ```
- DM Sans and Satoshi already preloaded; this font is not

### 7. Remove unused font preconnects
**Impact:** 2 unnecessary DNS lookups per page | **Effort:** 5 min | **Score impact:** +0.5
- Remove `<link rel="preconnect" href="https://fonts.googleapis.com">` and gstatic equivalent
- All fonts are self-hosted — these connections are never used

### 8. Add Google Maps iframe embed
**Impact:** GBP signal strength | **Effort:** 30 min | **Score impact:** +2
- No interactive Maps embed on any page — significant GBP signal gap
- Add embed to homepage contact section or footer
- Use CID-anchored embed URL once Place ID is obtained

### 9. Correct geo coordinates in schema
**Impact:** Entity accuracy | **Effort:** 5 min | **Score impact:** +0.5
- Current: `37.69412, -122.08276` (~350m west of actual address)
- Correct: approximately `37.69427, -122.07887`
- Update in `src/layouts/Layout.astro` lines 138-139

### 10. Add Wikipedia `sameAs` to city-level `areaServed`
**Impact:** AI entity recognition for city pages | **Effort:** 1 hr | **Score impact:** +1
- County-level schema has Wikipedia `sameAs` — city-level does not
- Add Wikipedia URLs to each city in `ServiceAreaCityPage.astro` and `[...slug].astro`

### 11. Add `@type` array: `["RoofingContractor", "GeneralContractor"]`
**Impact:** Entity matching for ADU/custom home queries | **Effort:** 5 min | **Score impact:** +0.5
- Update in `src/layouts/Layout.astro` line 123

### 12. Add cross-links from service pages to city-service pages
**Impact:** PageRank flow to pSEO pages, reduces crawl depth | **Effort:** 2 hrs | **Score impact:** +2
- `/roofing` should link to `/service-areas/alameda-county-ca/roofing` etc.
- Add "Service Areas" section to bottom of each service page
- Reduces effective crawl depth of city-service pages by 2 levels

---

## Medium (Fix Within 1 Month)

### 13. Enrich thin city-service pages with local data
**Impact:** Doorway page risk, AI citability | **Effort:** High (data pipeline) | **Score impact:** +5
- Top 10 cities by search volume need: neighborhood paragraph, local regulation note, project reference
- Add `localFacts` field to city page CMS data
- City-specific permit costs, housing stock age, weather factors
- Even 2-3 sentences of unique local content transforms citability

### 14. Add FAQ section to blog posts
**Impact:** Featured snippet eligibility, AI citation | **Effort:** 2 hrs per post | **Score impact:** +1
- Roof cost blog post has no FAQ — highest-traffic AI citation asset
- Add 4-6 FAQs with 134-167 word answers (optimal AI passage length)
- Add FAQPage schema alongside BlogPosting

### 15. Expand blog posts to 1,500-2,500 words
**Impact:** AI citation threshold | **Effort:** 2-4 hrs per post | **Score impact:** +1
- Current ~1,000 words is below optimal for AI-cited long-form content
- Add external source citations (BLS, NRCA, county permit schedules)
- Add data tables, comparison charts

### 16. Fix `og:type` on blog posts to "article"
**Impact:** Social sharing card rendering | **Effort:** 15 min | **Score impact:** +0.5

### 17. Create unique `og:image` for blog posts
**Impact:** Social CTR | **Effort:** 1 hr per post | **Score impact:** +0.5
- All pages use `og-default.jpg`
- Blog posts need article-specific images

### 18. Implement IndexNow
**Impact:** Bing/Yandex/Naver index freshness | **Effort:** 30 min | **Score impact:** +1
- Generate key at bing.com/indexnow
- Place key file in `/public/`
- Add API call to deploy pipeline

### 19. Implement live review widget
**Impact:** Review freshness, social proof | **Effort:** 2 hrs | **Score impact:** +2
- Replace 4 hardcoded reviews with live GBP feed
- Address 18-day review velocity risk (last visible review: Jan 22, 2026)
- Options: EmbedSocial, Widewail, ReviewsOnMyWebsite

### 20. Address review velocity
**Impact:** Local pack ranking maintenance | **Effort:** Ongoing | **Score impact:** +2
- Implement post-job review request flow (SMS or email 3 days after completion)
- Most recent visible review is 69+ days old — potential ranking cliff

---

## Low (Backlog)

### 21. Create and verify BBB profile
**Impact:** Most trust-critical citation for home services | **Effort:** 1-2 weeks | **Score impact:** +1

### 22. Claim Thumbtack and NextDoor profiles
**Impact:** Tier 1 home services citations | **Effort:** 1 hr each | **Score impact:** +0.5

### 23. Establish YouTube presence
**Impact:** 0.737 correlation with AI citation frequency | **Effort:** Ongoing | **Score impact:** +2
- 4-6 videos: install timelapse, estimate explainer, FAQ with Marcus Hamilton
- Add channel URL to llms.txt and site footer

### 24. Build Reddit presence
**Impact:** AI training data source, entity recognition | **Effort:** Ongoing | **Score impact:** +1
- Organic participation in r/bayarea, r/homeimprovement, r/roofing

### 25. Change blog author from Organization to Person
**Impact:** Google author panel eligibility | **Effort:** 15 min | **Score impact:** +0.5

### 26. Add Bingbot explicit allow in robots.txt
**Impact:** Bing Copilot signal clarity | **Effort:** 5 min | **Score impact:** +0.5

### 27. Set font cache to 1 year immutable
**Impact:** Returning visitor bandwidth | **Effort:** 15 min | **Score impact:** +0.25

### 28. Fix `favicon.png` 404
**Impact:** Older browser/crawler compatibility | **Effort:** 5 min | **Score impact:** +0.25

### 29. Add CSLB verification link in footer
**Impact:** Trust signal for anxious homeowners | **Effort:** 5 min | **Score impact:** +0.25
- Link license number to `cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx?license=1082377`

### 30. Remove `/blog/untitled` link from blog index
**Impact:** Crawl budget | **Effort:** 5 min | **Score impact:** +0.25

---

## Score Projection

| Milestone | Actions | Projected Score |
|-----------|---------|----------------|
| After Critical fixes (1-5) | Title, sitemap, logo, llms.txt, Maps sameAs | 85/100 |
| After High fixes (6-12) | Font preload, Maps embed, geo, cross-links | 88/100 |
| After Medium fixes (13-20) | City content, blog FAQs, IndexNow, reviews | 92/100 |
| After all fixes | Full implementation | 95/100 |

---

*Generated by SEO Audit Suite — April 2, 2026*
