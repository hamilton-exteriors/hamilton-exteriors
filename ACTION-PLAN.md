# Hamilton Exteriors — SEO Action Plan

**Generated:** 2026-04-08 (v7 — 7-agent audit) | **Current Score:** 75/100 | **Target:** 90/100

---

## Critical (Fix Immediately)

### 1. Add ~1,584 city+service pages to sitemap
**Impact:** Technical +4 | **Effort:** Medium (1-2 hours)
**Category:** Technical SEO

City+service pages (e.g., `/oakland-ca/roofing`) return 200, have self-referencing canonicals, and are internally linked — but none appear in the sitemap. Google has no lastmod or crawl priority signal for them.

**Fix:** Add a dedicated `sitemap-service-pages.xml` to the sitemap index. Include `<lastmod>` with real per-page dates. OR: if you decide to noindex these pages (see #3 below), skip this and add `noindex` instead.

### 2. Fix stale internal links in city page template
**Impact:** Technical +3 | **Effort:** Low (15 minutes)
**Category:** Technical SEO

City pages emit links in old format `/service-areas/alameda/berkeley` instead of `/service-areas/alameda-county-ca/berkeley-ca`. These 301 redirect to the correct URL, diluting PageRank on every hop.

**Fix:** Search the city page template for the old `/service-areas/alameda/` pattern and replace with `/service-areas/alameda-county-ca/`. Grep for all old county slugs: `alameda`, `contra-costa`, `marin`, `napa`, `santa-clara`, `san-mateo`.

### 3. Decide pSEO page strategy (thin content)
**Impact:** Content +8, Local +5 | **Effort:** Large (multi-week)
**Category:** Content Quality

~500+ city+service pages have 60% content overlap with parent city pages. ~75% of city pages (Walnut Creek pattern) lack unique neighborhood content. This is the single largest risk for a doorway page algorithmic action.

**Options:**
- **A) Consolidate (recommended):** `noindex` city+service pages. Let 29 city pages + 6 county hubs carry the weight. Reduces index from ~2,000 to ~50 high-quality pages.
- **B) Differentiate:** Add 300+ words of unique local content per city (neighborhoods, permit office, completed projects). Requires effort across 500+ pages.
- **C) Hybrid:** Keep top-20 highest-traffic city+service pages with unique content, `noindex` the rest.

### 4. Create `/contact` page
**Impact:** Local +3 | **Effort:** Low (30 minutes)
**Category:** Local SEO

`/contact` returns 404. Every local SEO crawler expects a contact page with NAP. Critical for a $15K-$80K purchase decision.

**Include:** Full NAP, Google Maps embed (link to GBP CID 3578771346418026097), contact form, hours, CSLB verification link.

### 5. Add `/buy` and `/buy/scan` to sitemap
**Impact:** Technical +1 | **Effort:** Low (5 minutes)
**Category:** Technical SEO / Sitemap

Your highest-value conversion pages have no sitemap entry. Add both to sitemap-0.xml with accurate lastmod dates.

---

## High Priority (Fix Within 1 Week)

### 6. Fix duplicate BreadcrumbList on city+service pages
**Impact:** Schema +3 | **Effort:** Low (15 minutes)
**Category:** Schema

Both `ServiceAreaCityPage.astro` and `ServicePage.astro` emit BreadcrumbList blocks. Remove the `ServicePage.astro` breadcrumb when `isCityServicePage` is true.

### 7. Gate FAQPage schema emission
**Impact:** Schema +3 | **Effort:** Low (30 minutes)
**Category:** Schema

Google restricted FAQ rich results to government/healthcare in Aug 2023. Remove FAQPage schema from all commercial pages. Add `faqSchema?: boolean` prop to `FAQ.astro`, default `false`. Opt in only on pages where LLM citation value justifies it.

### 8. Add missing alt text to homepage images
**Impact:** Images +3, On-Page +1 | **Effort:** Low (10 minutes)
**Category:** Images / Accessibility

- Hero background: `"Bay Area home exterior remodeling project by Hamilton Exteriors"`
- Mission silhouette: `"Hamilton Exteriors team silhouette representing craftsmanship commitment"`

### 9. Fix image sitemap build hash instability
**Impact:** Images +3 | **Effort:** Medium (1-2 hours)
**Category:** Sitemap / Images

192/237 image URLs use Astro content-hashed filenames that change on every deploy. Image sitemap becomes stale after each build.

**Fix:** Either generate image sitemap dynamically from build output, or switch image URLs to stable CDN paths.

### 10. Expand global GeneralContractor schema
**Impact:** Schema +2 | **Effort:** Low (20 minutes)
**Category:** Schema

The sitewide business schema stub only has `@context`, `@type`, `@id`. Add `name`, `url`, `telephone`, `address` (PostalAddress), `areaServed`, and `priceRange`.

### 11. Add meta descriptions to county hub + about pages
**Impact:** On-Page +2 | **Effort:** Low (30 minutes)
**Category:** On-Page SEO

Pattern: "[County] [services] by Hamilton Exteriors. Licensed GC, 50-year warranty. Free estimates — (650) 977-3351."

### 12. Verify GBP primary category
**Impact:** Local +5 (if wrong) | **Effort:** Low (5 minutes)
**Category:** Local SEO

Per Whitespark 2026, wrong primary category is the #1 negative ranking factor. Verify in GBP dashboard that primary = "General Contractor", secondary = "Roofing Contractor".

### 13. Build citation profiles on contractor directories
**Impact:** Local +3 | **Effort:** Medium (2-3 hours)
**Category:** Local SEO

- [ ] Angi (formerly Angie's List)
- [ ] Houzz
- [ ] Thumbtack
- [ ] Nextdoor
- [ ] HomeAdvisor
- [ ] GAF Contractor Directory
- [ ] Buildzoom

NAP must match exactly: Hamilton Exteriors, 21634 Redwood Rd Unit F, Castro Valley, CA 94546, (650) 977-3351

### 14. Filter reviews by service type on service pages
**Impact:** Content +2 | **Effort:** Low (30 minutes)
**Category:** Content Quality

Roofing page shows siding/window reviews. Add a template filter so each service page shows only reviews relevant to that service.

---

## Medium Priority (Fix Within 1 Month)

### 15. Implement IndexNow for Bing/Yandex
**Effort:** 1 hour | Pushes new/updated URLs instantly instead of waiting for crawl.

### 16. Add question-format H2s to homepage
**Effort:** 30 min | AI systems extract answers more readily from interrogative headings.

### 17. Add self-contained hero summary paragraph
**Effort:** 45 min | 2-sentence extractable summary below hero headline for AI citation.

### 18. Source all statistics with inline attribution
**Effort:** 1 hour | "25% increase in metal roof installations" → "per Metal Roofing Alliance 2025 report"

### 19. Standardize phone format in schema
**Effort:** 10 min | Use E.164 (`+16509773351`) consistently, or same display format everywhere.

### 20. Add `hasMap` and `sameAs` to root schema
**Effort:** 20 min | Link GBP Maps CID and verified social/directory URLs.

### 21. Add $2000 promo expiration date or terms link
**Effort:** 10 min | QRG flags vague promotional claims for YMYL.

### 22. Replace CSP `unsafe-inline` with nonce-based approach
**Effort:** High (4-6 hours) | Astro SSR can inject per-request nonces.

### 23. Expand blog content (target 2 posts/month)
**Effort:** Ongoing | Priority: comparison posts, cost guides for siding/windows/ADU, seasonal content.

### 24. Pursue BBB accreditation
**Effort:** 1-2 hours application | Current A- → A+ with accreditation badge.

### 25. Launch review velocity system
**Effort:** 2-3 hours setup | Post-project email sequence targeting 500+ past clients. Target 1-2 new reviews/week.

---

## Low Priority (Backlog)

26. Add HowTo schema to process blog posts (1 hour)
27. Add LocalBusiness sub-type on pSEO city pages (2 hours)
28. Use static OG image paths instead of `/_image?` query URLs (1 hour)
29. Add SearchAction to WebSite schema for Sitelinks Searchbox (20 min)
30. Remove `additionalType` from lean org reference block in Layout.astro (10 min)
31. Fix ProfilePage missing `dateCreated`/`dateModified` (10 min)
32. Use real per-page lastmod dates in sitemap instead of batch timestamps (1 hour)
33. Add explicit Googlebot stanza to robots.txt (10 min)
34. Launch YouTube channel with process walkthrough videos (high effort, high long-term value)
35. Create downloadable resources (maintenance checklist, cost calculator)
36. Remove unused XML namespaces from sitemap-0.xml (5 min)

---

## Score Impact Projections

| Action | Category Impact | Cumulative Score |
|--------|----------------|-----------------|
| Current baseline | — | 75 |
| #1-2 Sitemap + link fixes | Technical +5 | 76 |
| #3 pSEO consolidation | Content +8 | 80 |
| #4-5 Contact page + /buy sitemap | Local +3, Tech +1 | 81 |
| #6-7 Schema fixes (BreadcrumbList + FAQ) | Schema +6 | 82 |
| #8-9 Image alt + sitemap hash fix | Images +6 | 83 |
| #10-11 Schema stub + meta descriptions | Schema +2, On-Page +2 | 84 |
| #12-13 GBP verify + citations | Local +5 | 86 |
| #14-18 Content quality fixes | Content +5, AI +3 | 89 |
| #22-25 CSP + blog + reviews | Tech +1, Content +2 | **~90** |

---

## Implementation Roadmap

**This week (days 1-3):** Items #2, #4, #5, #6, #7, #8, #10, #11 — all low-effort fixes
**This week (days 4-7):** Items #1, #9, #12, #13, #14 — medium-effort fixes
**Week 2:** Item #3 — pSEO strategy decision and implementation
**Week 3-4:** Items #15-21, #25 — medium priority
**Month 2+:** Items #22-36 — content expansion, CSP hardening, backlog
