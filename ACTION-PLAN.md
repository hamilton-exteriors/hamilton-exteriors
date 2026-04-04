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

### 2. Update review schema — fix velocity and consistency
**Impact:** Local pack rankings cliff after 18 days without new reviews. Currently 70 days stale.
**Actions:**
- Update `Layout.astro` Review objects with 2-3 recent reviews (dates within last 30 days)
- Fix "Rated 5/5 based on 50 reviews" in city data files to "4.8 Stars on Google"
- Update `reviewCount` to actual current count (not hardcoded 50)
- Add GBP direct review link (`g.page/r/[place-id]/review`) to post-job success page
**Effort:** Low-Medium
**Files:** `src/layouts/Layout.astro`, `src/data/service-areas/*.ts`
**Score impact:** Local SEO +5 pts

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

---

## HIGH (Fix Within 1 Week)

### 6. Rebuild city hub pages as multi-service general pages
**Impact:** City hubs currently single-service focused (Oakland = ADU). Weakens "contractor [city]" rankings and creates overlap with pSEO service pages.
**Actions:**
- Refactor city data files to neutral multi-service hero + pricing grid
- Each city hub should link equally to all 6 city+service pages
**Effort:** Medium-High (29 city data files)
**Files:** `src/data/service-areas/*.ts`
**Score impact:** Content +3 pts, On-Page +2 pts

### 7. Add internal links from service pages into pSEO cluster
**Impact:** Highest-impact internal linking change. Top-level `/roofing` is high-authority — direct PageRank flow into city pages.
**Actions:**
- Add "Serving these Bay Area cities" section to `/roofing`, `/siding`, `/windows`
- Link to top 5-8 city+service pages per service
**Effort:** Medium
**Files:** `src/components/ServicePage.astro` or individual service page files
**Score impact:** On-Page +3 pts

### ~~8. Add `author.sameAs` and `inLanguage` to BlogPosting template~~ ✅ DONE
**Status:** Added `inLanguage: "en-US"` and `author.sameAs` (CSLB + LinkedIn) to BlogPosting schema in `blog/[slug].astro`.

### 9. Implement IndexNow
**Impact:** Instant URL indexing for Bing/Yandex/Naver on every deploy
**Actions:**
- Generate key at bing.com/indexnow/getstarted
- Place key file at `/public/{key}.txt`
- Add post-build script to submit changed URLs via IndexNow API
**Effort:** Medium
**Score impact:** Technical +2 pts

### 10. Build citations on BBB, Angi, Houzz, HomeAdvisor
**Impact:** 3 of top 5 AI visibility factors are citation-related (Whitespark 2026)
**Actions:**
- Create/claim profiles with exact NAP match
- Add URLs to `sameAs` array in Layout.astro
- Add badge images to footer
**Effort:** Medium (external work, not code)
**Score impact:** Local SEO +4 pts

### 11. Fix James Hardie blog post source links
**Impact:** Blog post "James Hardie Siding" links to GAF roofing sources instead of siding sources — template copy error.
**Effort:** Trivial (update 2-3 links in Ghost CMS)
**Files:** Ghost CMS blog editor

### ~~12. Set font cache headers to immutable~~ ✅ DONE
**Status:** Already implemented in `src/middleware.ts` — all static assets (fonts, images, CSS, JS) get `public, max-age=31536000, immutable`.

---

## MEDIUM (Fix Within 1 Month)

### 10. Add `Service` schema to city+service pSEO pages
**Impact:** Each of ~170+ pSEO pages currently has no service-level schema of its own
**Actions:**
- In `[...slug].astro`, when `pageType === 'cityService'`, inject Service schema
- Include `serviceType`, `areaServed: { @type: City }`, `provider` reference, service-specific pricing
**Effort:** Medium
**Files:** `src/pages/service-areas/[county]/[...slug].astro`
**Score impact:** Schema +2 pts, Local +2 pts

### 11. Add sibling city+service links within pSEO cluster
**Impact:** Mesh linking distributes equity across geographic service clusters
**Actions:**
- Add "Also serving nearby cities" section to each city+service page
- Link to 2-3 sibling city+service pages in same county
**Effort:** Medium
**Files:** City+service page template

### ~~12. Add `WebPage` block to service pages~~ ✅ DONE
**Status:** Added `WebPage` schema with `@id`, `isPartOf`, `about`, `inLanguage` to all 6 service pages (roofing, siding, windows, adu, custom-homes, additions).

### 13. Add `ItemList` to /blog CollectionPage
**Impact:** Helps Google understand article inventory and crawl prioritization
**Actions:** Generate dynamically from Ghost content API
**Effort:** Medium
**Files:** `src/pages/blog/index.astro`

### 14. Add FAQ schema to blog posts
**Impact:** AI search engines extract Q&A from blog posts for citations
**Actions:** Build automatic FAQPage schema extraction from question-format headings in blog template
**Effort:** Medium
**Files:** `src/pages/blog/[slug].astro`

### ~~15. Create image sitemap~~ ✅ DONE
**Status:** `/image-sitemap.xml` created with SEO-optimized titles/captions, referenced in robots.txt.

### 16. Add static content to `/buy` page
**Impact:** Without JS, page is near-empty. Risk of thin content signal if Google evaluates without rendering.
**Actions:** Add value props, process steps, FAQ above the fold in static HTML
**Effort:** Medium
**Files:** `src/pages/buy/index.astro`

### 17. Proxy Ghost media through canonical domain
**Impact:** Blog OG images currently reference fragile Ghost Railway subdomain
**Effort:** Medium (reverse proxy config or Ghost URL setting)

### 18. Add source attribution to statistical claims
**Impact:** Perplexity and ChatGPT weight attributed statistics higher
**Actions:** Link to NRCA, BLS, or manufacturer data sources for unattributed claims
**Effort:** Low
**Files:** `/roofing`, `/siding` service page content, blog posts

### 19. Expand lean schema block with `address` and city `areaServed`
**Impact:** City pages currently emit only name/url/telephone in schema stub
**Actions:** Add `address` (PostalAddress) and `areaServed` populated from `geoPlacename`
**Effort:** Low
**Files:** `src/layouts/Layout.astro` lines ~267-276

---

## LOW (Backlog)

### 20. Create YouTube presence
**Impact:** Very high long-term (0.737 AI citation correlation), but requires content creation
**Actions:** 5-10 videos: roof time-lapses, before/after, explainers, contractor selection guide
**Effort:** High (content production, not code)

### 21. Create Wikidata entity
**Impact:** Machine-readable entity graph entry for AI model disambiguation
**Effort:** Medium (Wikidata editing, not code)

### 22. Add canonical handling for blog tag filter URLs
**Impact:** `/blog?tag=roofing` could create duplicate content signals
**Effort:** Low

### 23. Increase page cache-control for SSG pages
**Current:** 300s browser / 3600s CDN
**Target:** 3600s browser / 604800s CDN (Railway purges on deploy)
**Effort:** Low

### 24. Verify `--font-oswald` CSS variable maps correctly
**Impact:** Potential Google Fonts loading if CSS variable references external font
**Effort:** Trivial (inspect only)

### 25. Fix 404 page canonical tag
**Impact:** 404 page self-canonicalizes to non-existent URL (harmless given noindex, but technically incorrect)
**Effort:** Trivial

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
