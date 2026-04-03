# Hamilton Exteriors — SEO Action Plan

**Based on:** Full SEO Audit (re-audit), April 2, 2026
**Current Score:** 65/100
**Projected Score (after P0+P1):** 82/100
**Target Score:** 90/100

---

## P0 — CRITICAL (This Week)

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | **Connect hamilton-exteriors.com DNS to Railway** | Unblocks ALL indexation. Resolves canonical, sitemap, schema, og:image issues instantly. This single fix jumps score from 66 → 78. | 30 min |
| 2 | **Fix hero image preload bug** — each page preloads `hero-bg-2400` (homepage hero) instead of its own hero image. Update the base layout to pass page-specific hero to the preload tag. | Fixes wasted bandwidth on ALL 251 pages, improves LCP on every service/city page. | 1 hr |
| 3 | **Fix image alt text on certification logos** — 5 logos (Owens Corning, CertainTeed, GAF, Tesla Powerwall, James Hardie) appear on every page with empty alt. One component fix propagates to all pages. | Fixes ~1,735 missing alt text instances. Huge accessibility + SEO win. | 15 min |
| 4 | **Fix image alt text on reviewer avatars** — 4 reviewer images appear across all pages with no alt text. One component fix. | Fixes ~1,388 missing alt instances. | 10 min |
| 5 | **Fix ADU page H1 typo** — "Bay Areas Best ADU Builder" → "Bay Area's Best ADU Builder" | Grammar fix on a main service page. | 2 min |
| 6 | **Fix BlogPosting `image` schema** — change from bare string URL to ImageObject array with url/width/height. Blocks article image rich results on all 3 blog posts. | Unlocks article rich results in Google. | 15 min |
| 7 | **Add `@id` to all Service schema blocks** — e.g., `"@id": "https://hamilton-exteriors.com/roofing#service"`. Currently no Service block has an @id, preventing entity graph resolution. | Enables cross-page entity referencing. | 30 min |
| 8 | **Fix geo coordinates on all city pages** — every city/service page carries Castro Valley HQ coords (`37.69427, -122.07887`) instead of the served city's centroid. Build a coordinate lookup table by city slug. | Google's local systems use geo for geographic association. All 203 location pages affected. | 2 hrs |
| 9 | **Resolve entity ambiguity** — llms.txt says "Marcus Hamilton, Owner", blog byline says "Alexander Hamilton Li, Architect & General Contractor". Clarify both people's roles in llms.txt. | AI entity resolution depends on unambiguous naming. | 10 min |

**P0 impact: Score 65 → 82 (+17 points)**

---

## P1 — HIGH (First 2 Weeks)

| # | Action | Impact | Effort |
|---|---|---|---|
| 10 | **Add alt text to all service page images** — product photos on siding (vinyl, fiber cement, stucco, waterproofing), roofing (asphalt, metal, tile, energy), project gallery photos | Siding page goes from 4% → 90%+ alt coverage | 2 hrs |
| 11 | **Add `lastmod` to all sitemap entries** — configure Astro to use build time or git last-modified date. Use `YYYY-MM-DD` format. | Crawl prioritization for 248 pages currently missing dates | 1 hr |
| 12 | **Submit sitemap to GSC + Bing Webmaster Tools** (after DNS) | Triggers crawl of all pages | 15 min |
| 13 | **Fix `provider.@type` on non-roofing service pages** — siding and windows Service schema uses `RoofingContractor` as provider type. Use `@id` reference only (no `@type` re-specification). | Semantic correctness for entity understanding | 30 min |
| 14 | **Add `offers` and `description` to city hub Service schema** — Oakland, Berkeley, etc. missing pricing signal on high-intent local pages | Rich result eligibility on 29 city hub pages | 1 hr |
| 15 | **Fill out Santa Clara County Service schema** — most incomplete block on site (missing description, offers, @id) | Weakest service entity affects 9 Santa Clara cities | 30 min |
| 16 | **Add "Last Updated" dates to all service pages** — visible `dateModified` in HTML and schema. Blog posts have dates; service/city pages don't. | AI systems discount undated pricing claims | 1 hr |
| 17 | **Rewrite blog post opening paragraph** — lead with the direct answer ("$14,000–$45,750 for a typical home") in the first 40 words. AI Overviews pull from first extractable answer block. | Highest-leverage edit for most competitive keyword | 30 min |
| 18 | **Add table of contents with jump links to blog posts** — 2,107-word post has 9 H2 sections with no navigation. Perplexity/ChatGPT prefer independently extractable sections. | Improves AI citation for blog content | 1 hr |
| 19 | **Restrict Railway staging URL** — add `noindex` or password protection after go-live | Prevents duplicate indexation between Railway URL and custom domain | 15 min |
| 20 | **Diversify reviews across pages** — rotate pool of 10-15 real reviews instead of same 4 (all 5-star) everywhere. Current setup raises authenticity risk. | Reduces schema duplication signal, builds trust variety | 2 hrs |
| 21 | **Add contextual cross-service links on city+service pages** + "nearby cities" inline section | Improves internal link equity and user journey | 2-3 hrs |

**P1 impact: Score 82 → 86 (+4 points)**

---

## P2 — MEDIUM (First Month)

| # | Action | Impact | Effort |
|---|---|---|---|
| 13 | **Increase unique content on city+service pSEO pages** — add neighborhood-specific project stories, local permit experiences, material recommendations based on microclimate. Target: 800+ words unique per page. | Reduces thin content risk on ~174 pages | 1-2 weeks |
| 14 | **Publish 5+ blog posts covering non-roofing topics** — siding cost guide, window replacement guide, ADU permits in Bay Area, custom home building timeline, how to choose a contractor | Broadens topical authority beyond roofing | 1 week |
| 15 | **Verify and optimize GBP listing** — primary: "Roofing Contractor", secondary: "General Contractor", "Siding Contractor". Upload 10+ photos, respond to reviews, add products. | #1 local pack ranking factor | 2 hrs |
| 16 | **Consider unblocking Google-Extended** — currently blocked, which excludes site from Google AI Overviews (the largest AI search surface). If training data concern is the reason, weigh traffic loss. | Could unlock significant AI Overview visibility | 5 min decision |
| 17 | **Add HowTo schema to blog posts** — "7 Warning Signs" is a natural fit for HowTo rich results | Rich result eligibility | 1 hr |
| 18 | **Split sitemap by page type** — separate sitemaps for services, cities, blog, legal | Easier management and monitoring in GSC | 1 hr |
| 19 | **Add `priority` to sitemap entries** — homepage 1.0, services 0.9, cities 0.7, blog 0.6, legal 0.3 | Better crawl budget allocation signal | 30 min |
| 20 | **Add "related posts" links to blog posts** | Internal link equity between content pieces | 30 min |

**P2 impact: Score 86 → 90 (+4 points)**

---

## P3 — LOW (Backlog / Quarter)

| # | Action | Impact | Effort |
|---|---|---|---|
| 21 | **Start YouTube channel** — 5-10 videos (cost guides, material comparisons, project walkthroughs) | Highest AI citation correlator (~0.737) | 2-3 days |
| 22 | **Claim Tier 1 citation gaps** — BBB, Angi, Houzz, Nextdoor, Thumbtack | Local authority + AI brand signals | 2-3 hrs |
| 23 | **Register on manufacturer directories** — GAF, Owens Corning, CertainTeed, James Hardie | High-authority contractor backlinks | 2-3 hrs |
| 24 | **Build review velocity system** — post-job SMS/email with Google review link. Target: 100+ reviews in 6 months | Reviews are #2 local pack factor | 2 hrs setup |
| 25 | **Add before/after gallery** — structured as image comparisons, not just project photos | Visual proof of work quality | 1 day |
| 26 | **Add structured data for OpeningHoursSpecification** — visible hours in content, not just schema | User-visible trust signal matching schema | 30 min |
| 27 | **Create unique OG images per page type** — service pages, city pages, blog posts | Better social sharing appearance | 1 day |
| 28 | **Add `/buy` and `/buy/scan` to sitemap** if not already present | Primary conversion pages discoverable | 5 min |
| 29 | **Add static HTML fallback for `/buy/scan`** | Ensures Mapbox page is crawlable | 1 hr |
| 30 | **Expand FAQ answers to 134-167 words** per answer | Optimal AI citation passage length | 3-4 hrs |

---

## Implementation Roadmap

```
Week 1:  P0 items 1-9 (DNS + hero preload + alt text + schema fixes + geo coords + entity fix)
         → Score: 65 → 82

Week 2:  P1 items 10-21 (remaining alt text, sitemap, service schema, dates, blog lead, reviews)
         → Score: 82 → 86

Week 3-4: P2 items 22+ (pSEO content, blog posts, GBP, county pages)
         → Score: 86 → 90

Month 2+: P3 items (YouTube, citations, reviews, OG images)
         → Score: 90 → 92+
```

---

## Key Metrics to Track

| Metric | Current | Target (90 days) | Tool |
|---|---|---|---|
| Pages indexed | 0 (domain dead) | 347 | Google Search Console |
| Organic clicks | 0 | 500+/month | GSC |
| Google reviews | 50 | 100+ | GBP |
| Blog posts | 3 | 10+ | Site |
| Image alt text coverage | ~30% | 95%+ | Screaming Frog |
| LCP (homepage) | TBD (field data after DNS) | < 2.5s | CrUX |
| Local pack appearances | 0 | 50+ keywords | Rank tracker |
