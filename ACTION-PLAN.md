# Hamilton Exteriors — SEO Action Plan

**Generated:** April 6, 2026 (v3) | **Current Score:** 79/100 | **Target:** 90/100

---

## Critical (Fix Immediately)

- [ ] **#1 Launch review velocity campaign** — 74 days past 18-day Sterling Sky cliff. Text/email every job from last 60 days. Target: 8-10 reviews in 30 days, then 2-4/month minimum. *Action: Off-site*
- [ ] **#2 Replace templated city page reviews** — Same 3 reviewers (Sarah M., David K., Jennifer L.) across 47 cities = manual action risk. Use real anonymized reviews or remove per-city reviews. *File: GeneralCityPage.astro*
- [x] **#3 Add SpeakableSpecification** — Most direct Google AI Overview signal, completely absent. Add `cssSelector`-based specification to blog posts and service pages. *Files: blog/[slug].astro, ServicePage.astro*
- [x] **#4 ~~Add schema to /buy page~~ — SKIPPED: /buy is a noindexed marketing landing page, not an SEO target.**
- [x] **#5 Fix or remove SearchAction** — `/blog?q=` has no handler. Remove `potentialAction` block. *File: Layout.astro*

## High (This Week)

- [ ] **#6 Verify GBP primary category** — Must be "Roofing Contractor" (#1 local ranking factor). Check GBP console. *Action: Off-site*
- [x] **#7 Fix dateModified to static** — `new Date()` on SSR inflates freshness. Add `lastModified` to service data. *File: ServicePage.astro*
- [ ] **#8 Fix /llms-full.txt 502 + create ai.txt** — Extended AI content unreachable. `<link rel="ai-policy">` points to nonexistent file = 404 on every page. *Files: public/llms-full.txt, public/ai.txt or Layout.astro*
- [ ] **#9 Claim BuildZoom + Houzz** — BuildZoom auto-generates from CSLB #1082377. Houzz needs CompanyCam photos. Both rank page 1. *Action: Off-site*
- [x] **#10 Fix datePublished null guard** — `post.published_at || post.updated_at || new Date().toISOString()` *File: blog/[slug].astro*
- [x] **#11 Fix areaServed "US" → "CA"** — Bay Area SAB claiming entire US. *File: Layout.astro*
- [x] **#12 Fix BlogPosting image dimensions** — Same URL, false dimensions. Use Ghost resize API or single ImageObject. *File: blog/[slug].astro*
- [x] **#13 Standardize NAP** — "Hamilton Exteriors" everywhere (not "Inc."). *Files: Footer.astro + llms.txt + off-site*
- [x] **#14 Add AggregateRating + Review.datePublished to city hubs** — Missing from LocalBusiness blocks. *File: GeneralCityPage.astro*

## Medium (This Month)

- [ ] **#15 Rewrite service page H2s as questions** — "Our Advantage" → "Why Do Bay Area Homeowners Choose Hamilton Exteriors?" *Files: Service components*
- [ ] **#16 Inline source attribution in blog posts** — Stats need in-sentence sources. *Action: Copy edit*
- [ ] **#17 Create YouTube channel + 5 project walkthroughs** — Highest brand signal correlation (~0.737). *Action: Off-site*
- [ ] **#18 Replace Person.image with real headshot** — *File: about/alex-hamilton-li.astro*
- [ ] **#19 Add Google Maps embed** — No iframe ties website to GBP. *File: Homepage component*
- [ ] **#20 Increase city hub unique content to 40%+** — County-specific FAQs (6 sets). *Files: City page data*
- [ ] **#21 Add blog → city internal links** — Blog posts should link to city+service pages. *Action: Content edit*
- [ ] **#22 Verify manufacturer locator listings** — GAF, OC, Hardie "Find a Contractor" pages = free authority links. *Action: Off-site*
- [ ] **#23 Start Reddit presence** — r/bayarea, r/homeimprovement, r/roofing. *Action: Off-site*
- [ ] **#24 Pursue BBB accreditation** — $600-900/year, trust badge for $15k+ decisions. *Action: Off-site*
- [ ] **#25 Activate weekly GBP Posts** — Project photos, seasonal tips. *Action: Off-site*
- [x] **#26 Fix GeoCoordinates on county pages** — Verified: lat/lng order is correct (lng,lat format in data → assigned correctly). Added @id to county Service schema. *File: CountyPage.astro*
- [ ] **#27 Trim FAQ answers > 180 words** — AI extraction window is 134-167 words. *File: FAQ.astro*
- [x] **#28 Add RSS feed URL to llms.txt** — One line addition. *File: public/llms.txt*

## Low (Backlog)

- [x] **#29** Fix additionalType Wikipedia → sameAs *(Layout.astro)*
- [x] **#30** Extract BreadcrumbList from CollectionPage *(blog/index.astro)*
- [ ] **#31** Implement IndexNow *(New endpoint)*
- [ ] **#32** WebP/AVIF blog image optimization *(Image pipeline)*
- [ ] **#33** Create portfolio/gallery page *(New page)*
- [ ] **#34** Verify @hamiltonexteriors Twitter handle *(Off-site)*
- [ ] **#35** Normalize knowsAbout schema *(Layout.astro)*
- [ ] **#36** Add articleBody to BlogPosting *(blog/[slug].astro)*
- [ ] **#37** Remove duplicate Service schema from CountyPage *(CountyPage.astro)*
- [ ] **#38** Fix county WebPage.about relative → absolute URL *(CountyPage.astro)*
- [ ] **#39** Pursue third-party press mention (SFGate, East Bay Times) *(Off-site)*
- [ ] **#40** Create city-specific blog posts for top 5 markets *(New content)*

---

**Estimated score after Critical + High fixes: 88/100**
**Estimated score after all code fixes: 91/100**
**Estimated score after all fixes including off-site: 94/100**

---

## Score Breakdown (v3)

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 20% | 88/100 | 17.6 |
| Content Quality | 20% | 75/100 | 15.0 |
| On-Page SEO | 15% | 85/100 | 12.8 |
| Schema / Structured Data | 10% | 71/100 | 7.1 |
| Performance (CWV) | 10% | 92/100 | 9.2 |
| AI Search Readiness (GEO) | 10% | 74/100 | 7.4 |
| Local SEO | 10% | 67/100 | 6.7 |
| Images | 5% | 70/100 | 3.5 |
| **Total** | | | **79.3** |
