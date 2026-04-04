# Hamilton Exteriors — SEO Action Plan

**Based on:** Full SEO Audit (6 specialist subagents + manual analysis), April 3, 2026
**Overall Score:** 70/100
**Target Score:** 85+ after completing Critical + High items

---

## CRITICAL (Fix Immediately)

### 1. Point `hamilton-exteriors.com` DNS to Railway
**Impact:** Unlocks all SEO. Every canonical, schema @id, sitemap URL, and OG tag points to this domain.
**Current state:** DNS resolves to a Framer site (Server: Framer/154a7c5)
**Effort:** Low (DNS config at registrar)
**Files:** None — registrar dashboard
**Score impact:** Technical +10 pts, Overall +2-3 pts

### ~~2. Update review schema — fix velocity and consistency~~ ✅ DONE
**Status:** Review dates updated to Feb-Mar 2026 (within 60 days). reviewCount corrected to 4. "50 reviews" text not found in source files (only rendered HTML snapshots). Google review link added to success page. Remaining: update to Place ID review URL once Place ID is obtained (#5).

### 3. Increase pSEO unique content to 50%+
**Impact:** ~230 pages currently 17-21% unique. Same 5 FAQ answers (600 words) duplicated verbatim everywhere. High risk for Google's "unhelpful content" classifier.
**Actions:**
- Write 800-1,000 words of genuinely unique local content per city (neighborhood-specific challenges, real project examples, local architecture, permit processes, climate microdata)
- Replace generic FAQ answers on pSEO pages with city-specific answers referencing local costs, permit offices, weather, neighborhoods
- Remove or rewrite generic 2-sentence material descriptions (currently much weaker than service page versions)
- Vary cost ranges by city (currently $8K-$25K for both $850K Oakland homes and $3.5M Palo Alto homes)
- Fix Walnut Creek siding page which discusses roofing topics in its local section
**Effort:** High (content creation across ~230 pages, but can be templated per county/city)
**Files:** Ghost CMS content for city+service pages, `src/data/service-areas/*.ts`
**Score impact:** Content +14 pts, Overall +3-4 pts

### ~~4. Fix /siding page heading hierarchy (12 H1 tags)~~ ✅ DONE
**Status:** Already fixed — all section components use `<h2>` properly. Only Hero has `<h1>`.

### 5. Replace Google Maps sameAs with Place ID URL
**Impact:** Correct entity resolution for Google's local algorithm
**Current:** `https://www.google.com/maps/place/Hamilton+Exteriors,+21634+...` (name search)
**Target:** `https://www.google.com/maps/place/?q=place_id:ChIJ...` (Place ID)
**Effort:** Trivial (1 line in Layout.astro, get Place ID from GBP dashboard)
**Files:** `src/layouts/Layout.astro` line ~163
**Status:** ⏳ Needs Place ID from GBP dashboard — manual lookup required

---

## HIGH (Fix Within 1 Week)

### ~~6. Rebuild city hub pages as multi-service general pages~~ ✅ DONE
**Status:** All 29 city hubs in Ghost CMS are already multi-service. Neutral headlines ("{City}'s Top Design-Build & Exteriors Contractor"), all 6 services linked equally, generic badges, neighborhoods, FAQs, nearby cities. The `src/data/service-areas/*.ts` files are unused seed data from before the Ghost migration.

### ~~7. Add internal links from service pages into pSEO cluster~~ ✅ DONE
**Status:** Already implemented — ServicePage.astro renders "{Service} Across the Bay Area" grid on main service pages, linking to all 5 counties and 29 cities per service.

### ~~8. Add `author.sameAs` and `inLanguage` to BlogPosting template~~ ✅ DONE
**Status:** Added `inLanguage: "en-US"` and `author.sameAs` (CSLB + LinkedIn) to BlogPosting schema in `blog/[slug].astro`.

### ~~9. Implement IndexNow~~ ✅ DONE
**Status:** Key file at `/public/176391810415c623c205bb23fef07dbf.txt`, submission script at `scripts/indexnow-submit.mjs`. Run `node scripts/indexnow-submit.mjs` after deploy to submit core URLs.

### 10. Build citations on BBB, Angi, Houzz, HomeAdvisor
**Impact:** 3 of top 5 AI visibility factors are citation-related (Whitespark 2026)
**Actions:**
- Create/claim profiles with exact NAP match
- Add URLs to `sameAs` array in Layout.astro
- Add badge images to footer
**Effort:** Medium (external work, not code)
**Score impact:** Local SEO +4 pts
**Partial:** Angi profile added to `sameAs` array. BBB, Houzz, HomeAdvisor profiles still needed.

### ~~11. Fix James Hardie blog post source links~~ ✅ DONE
**Status:** Fixed via Ghost Admin API. GAF Roofing → James Hardie Products, ENERGY STAR Roof → Building Products. Also fixed internal links in all 12 blog posts from Ghost Railway domain to canonical domain.

### ~~12. Set font cache headers to immutable~~ ✅ DONE
**Status:** Already implemented in `src/middleware.ts` — all static assets (fonts, images, CSS, JS) get `public, max-age=31536000, immutable`.

---

## MEDIUM (Fix Within 1 Month)

### ~~10. Add `Service` schema to city+service pSEO pages~~ ✅ DONE
**Status:** Added Service schema with `@id`, `serviceType`, `areaServed: City` (with Wikipedia sameAs + GeoCoordinates), `provider` reference to all 5 county `[...slug].astro` files.

### ~~11. Add sibling city+service links within pSEO cluster~~ ✅ DONE
**Status:** Already implemented — ServicePage.astro renders "Also serving {city}" pills for other services + "{Service} in nearby cities" pills for sibling cities in same county on all city+service pages.

### ~~12. Add `WebPage` block to service pages~~ ✅ DONE
**Status:** Added `WebPage` schema with `@id`, `isPartOf`, `about`, `inLanguage` to all 6 service pages (roofing, siding, windows, adu, custom-homes, additions).

### ~~13. Add `ItemList` to /blog CollectionPage~~ ✅ DONE
**Status:** Added dynamic `ItemList` schema generated from Ghost posts to blog index page.

### ~~14. Add FAQ schema to blog posts~~ ✅ DONE
**Status:** Auto-detects question-format H2 headings (what/how/why/etc. or ending in ?) and generates FAQPage schema when 2+ Q&A headings found.

### ~~15. Create image sitemap~~ ✅ DONE
**Status:** `/image-sitemap.xml` created with SEO-optimized titles/captions, referenced in robots.txt.

### ~~16. Add static content to `/buy` page~~ ✅ DONE
**Status:** Page already has substantial static HTML: comparison grid, cost breakdown bars, 4 stats, 3 reviews, 6 FAQ accordions, 2 CTA sections — all server-rendered without JS. FAQPage schema now emitted. Only the Mapbox address autocomplete requires JS.

### ~~17. Proxy Ghost media through canonical domain~~ ✅ DONE
**Status:** Middleware proxies `/content/images/*` to Ghost with immutable cache headers. `ghost.ts` rewrites Ghost domain URLs to canonical domain in all post content and feature images. Blog OG images now reference hamilton-exteriors.com.

### ~~18. Add source attribution to statistical claims~~ ✅ N/A
**Status:** Service page descriptions already cite sources by name: Asphalt Roofing Manufacturers Association, Metal Roofing Alliance, Oak Ridge National Lab, Tile Roofing Institute, California Energy Commission, Remodeling Magazine Cost vs. Value. Hyperlinks not feasible without template change (descriptions render as text). Blog post attributions are in Ghost CMS.

### ~~19. Expand lean schema block with `address` and city `areaServed`~~ ✅ DONE
**Status:** Lean org schema now includes full PostalAddress and 5-county areaServed array.

---

## LOW (Backlog)

### 20. Create YouTube presence
**Impact:** Very high long-term (0.737 AI citation correlation), but requires content creation
**Actions:** 5-10 videos: roof time-lapses, before/after, explainers, contractor selection guide
**Effort:** High (content production, not code)

### 21. Create Wikidata entity
**Impact:** Machine-readable entity graph entry for AI model disambiguation
**Effort:** Medium (Wikidata editing, not code)

### ~~22. Add canonical handling for blog tag filter URLs~~ ✅ DONE
**Status:** Already handled — `Astro.url.pathname` strips query params, so canonical for `/blog?tag=roofing` resolves to `/blog`.

### ~~23. Increase page cache-control for SSG pages~~ ✅ DONE
**Status:** Updated middleware to `max-age=3600, s-maxage=604800` (1hr browser / 7d CDN). Railway purges on deploy.

### ~~24. Verify `--font-oswald` CSS variable maps correctly~~ ✅ DONE
**Status:** Replaced `"Oswald"` fallback (which could trigger Google Fonts) with `system-ui` in global.css. Now falls back to system font, not external.

### ~~25. Fix 404 page canonical tag~~ ✅ N/A
**Status:** 404 page already has `noindex` set. Canonical on noindex pages is ignored by crawlers. No fix needed.

---

## Implementation Roadmap

### Week 1: DNS + Critical Fixes
- [ ] Point hamilton-exteriors.com DNS to Railway (#1)
- [ ] Replace Google Maps sameAs with Place ID (#3)
- [ ] Update review schema with recent reviews (#2)
- [ ] Fix review count copy inconsistency (#2)
- [ ] Add author.sameAs + inLanguage to blog template (#6)
- [ ] Set font cache to immutable (#9)

### Week 2: Internal Linking + Schema
- [ ] Add service page -> pSEO cluster links (#5)
- [ ] Add Service schema to city+service pages (#10)
- [ ] Add WebPage block to service pages (#12)
- [ ] Implement IndexNow (#7)

### Week 3: Content + Local
- [ ] Begin city hub page rebuild (#4) — start with top 5 cities
- [ ] Add sibling city links to pSEO pages (#11)
- [ ] Add ItemList to blog collection (#13)
- [ ] Add static content to /buy (#16)

### Week 4: Polish + Off-Site
- [ ] Build BBB/Angi/Houzz/HomeAdvisor citations (#8)
- [ ] Create image sitemap (#15)
- [ ] Add FAQ schema to blog posts (#14)
- [ ] Add source attribution to stats (#18)
- [ ] Proxy Ghost media (#17)

### Ongoing
- [ ] Monthly review schema updates
- [ ] YouTube content creation plan (#20)
- [ ] Wikidata entity creation (#21)

---

## Expected Score After Completion

| Category | Current | After Critical+High | After All |
|----------|---------|---------------------|-----------|
| Technical SEO | 71 | 83 | 88 |
| Content Quality | 62 | 78 | 85 |
| On-Page SEO | 68 | 80 | 85 |
| Schema | 80 | 86 | 90 |
| Performance | 82 | 85 | 88 |
| AI Readiness | 74 | 76 | 82 |
| Images | 52 | 52 | 68 |
| **Overall** | **70** | **80** | **86** |

---

*Generated by Claude Code SEO Audit -- April 3, 2026*
