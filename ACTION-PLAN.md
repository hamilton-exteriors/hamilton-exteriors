# Hamilton Exteriors — SEO Action Plan

**Based on:** Full SEO Audit (7 specialist subagents + manual crawl), April 3, 2026
**Current Score:** 72/100
**Target Score:** 85+/100

---

## Critical — Fix Immediately (7 items)

### 1. Fix owner name in llms-full.txt
**Impact:** AI entity credibility — contradictory names in the two files AI systems read
**Effort:** 2 minutes
**How:** In `public/llms-full.txt` line 18, change "Marcus Hamilton, Owner" to "Alexander Hamilton Li, Founder & Owner, Architect & General Contractor (CSLB #1082377)". Must match llms.txt and all schema.

### 2. Delete `/blog/untitled-2` empty draft
**Impact:** Crawl budget waste, quality signal damage, terrible UX if discovered
**Effort:** 5 minutes
**How:** Remove the untitled post from Ghost CMS. It has no title, no content, but is linked from the blog index.

### 3. Point custom domain DNS to Railway
**Impact:** ALL sitemap URLs, canonical tags, schema @ids, and sameAs references use hamilton-exteriors.com. Until DNS is pointed, Google can't consolidate signals. GBP "website" clicks land nowhere.
**Effort:** 15 minutes
**How:** Point `hamilton-exteriors.com` A/CNAME records to Railway. This was listed as a post-launch task in the backlog.

### 4. Fix Yelp sameAs URL
**Impact:** Broken entity reference on every page — 404 sameAs URL is a negative trust signal
**Effort:** 5 minutes
**How:** In `src/layouts/Layout.astro`, either correct the Yelp URL to the verified slug or remove it until the listing is confirmed. Current: `yelp.com/biz/hamilton-exteriors-castro-valley` returns 404.

### 5. Restart review velocity
**Impact:** 70 days since last review — more than 3x the 18-day velocity cliff. Local pack rankings statistically suppressed.
**Effort:** 30 minutes to set up, ongoing
**How:** Send review request emails/texts to all recent customers today. Target: 2+ new GBP reviews per month minimum. Consider an automated post-job review request flow.

### 6. Stop inlining full Organization block on blog/city pages
**Impact:** 160-line Organization blob with ratings/reviews on blog posts may trigger Google manual review for misleading markup
**Effort:** 1-2 hours
**How:** On blog posts and service-area pages, replace the full Organization block with a lean @id reference:
```json
{"@type": ["RoofingContractor","GeneralContractor"], "@id": "https://hamilton-exteriors.com/#business", "name": "Hamilton Exteriors"}
```
Keep the full definition only on homepage and service pages.

### 7. Verify GBP primary category
**Impact:** #1 local ranking factor (Whitespark 2026, score: 193). Wrong category = #1 negative factor (score: 176).
**Effort:** 5 minutes
**How:** Log into GBP dashboard. Confirm primary = "Roofing contractor". Secondaries: "General contractor", "Siding contractor", "Window installation service".

---

## High — Fix This Week (10 items)

### 8. Add "7 Warning Signs" blog post to blog index
**Impact:** 2,157-word article not discoverable from blog listing
**Effort:** 5 minutes
**How:** Check Ghost CMS — post may have wrong tag. Should appear in the main blog feed.

### 9. Consolidate blog categories
**Impact:** "Blog (3)" + "Blog-Post (10)" is confusing taxonomy
**Effort:** 10 minutes
**How:** Merge into a single category in Ghost CMS.

### 10. Add meta descriptions to `/buy` and `/adu`
**Impact:** Google auto-generates suboptimal snippets
**Effort:** 10 minutes
**How:** Add `<meta name="description">` to Astro page frontmatter. Suggested:
- `/buy`: "Scan your roof with satellite imagery, choose your shingles, and buy online. Instant pricing from $940/sq. Hamilton Exteriors."
- `/adu`: "Full-service ADU builder in the Bay Area. Design, architecture, permits & construction. $0 down financing. Call (650) 977-3351."

### 11. Fix stock photo alt text
**Impact:** "Terracotta roof shingles in Provence, France" sends wrong geo signal on Bay Area roofing post
**Effort:** 5 minutes
**How:** Replace with "Close-up of architectural roof shingles on a Bay Area home"

### 12. Add `keywords`, `about`, `mentions` to BlogPosting schema
**Impact:** Reduces AI/LLM extractability and topical disambiguation
**Effort:** 30 minutes
**How:** In blog post schema template, add `keywords` array, `about` (Service entity), and `mentions` (Place entities with Wikipedia sameAs).

### 13. Add `aggregateRating` to Service schema entities
**Impact:** Service rich results currently only accessible via Organization block
**Effort:** 20 minutes
**How:** Add `aggregateRating: {ratingValue: 4.8, reviewCount: 50}` to each Service entity.

### 14. Add page URL list to llms.txt
**Impact:** Transforms llms.txt from static doc into AI agent navigation manifest
**Effort:** 1 hour
**How:** Add `## Pages` section listing 30 canonical URLs (6 services, 5 counties, 10 top cities, 10 blog posts) with one-line descriptions per llmstxt.org spec.

### 15. Claim Yelp listing + submit to Angi and HomeAdvisor
**Impact:** Tier 1 home services directories (DA 91+), 3 of top 5 AI visibility factors are citation-related
**Effort:** 2 hours
**How:** Claim/create NAP-consistent listings on all three platforms.

### 16. Elevate pSEO content quality for weaker city pages
**Impact:** Walnut Creek pages ~30% unique vs Oakland ~70%. At 174 city+service pages, risks HCU devaluation.
**Effort:** 2-4 hours
**How:** Prioritize top 10 city+service combos. Add per-city: permit office contact, fee ranges, neighborhood references, microclimate details, housing stock stats. Target 60%+ unique.

---

## Medium — Fix This Month (16 items)

### 17. Fix H1 typos on `/custom-homes` and `/additions`
"Bay Areas Best" -> "Bay Area's Best" (2 minutes)

### 18. Fix duplicate H2s in roof cost blog post
Deduplicate "What We See on Real Bay Area Jobs" and "Sources & Further Reading" (5 minutes)

### 19. Add legal pages to sitemap
Add `/terms`, `/privacy-policy`, `/privacy-notice-ca`, `/eeo-policy`, `/opt-out`. Priority 0.3, changefreq yearly. (10 minutes)

### 20. Fix blog author display on index
"Hamilton" -> "Alexander Hamilton Li" on blog listing page (10 minutes)

### 21. Differentiate lastmod dates in sitemap
Use actual page build/content dates instead of global date (30 minutes)

### 22. Expand `/buy` page content
Add "How It Works", "Why Buy Online", "What's Included", FAQ. Target 2,500+ words. (1-2 hours)

### 23. Add `SpeakableSpecification` schema
Mark 1-2 most citable passages per page for voice AI. Target homepage + 6 service pages. (2-4 hours)

### 24. Convert blog H2s to question format
"Average Costs" -> "What Does a Roof Replacement Cost?" Improves Perplexity/AIO pickup. (30 min/post)

### 25. Deduplicate FAQ questions across pages
Replace global 5 FAQs with page-specific questions only (2-3 hours)

### 26. Add cross-city lateral links in pSEO
Oakland roofing -> link to Berkeley, San Leandro, Hayward roofing pages (2 hours)

### 27. Add `sameAs` to founder Person
LinkedIn URL + CSLB lookup URL for Alexander Hamilton Li (10 minutes)

### 28. Add Google Maps iframe to county/city pages
Replace Maps link with embedded iframe using GBP place_id (1 hour)

### 29. Submit to manufacturer contractor directories
GAF, Owens Corning, CertainTeed, James Hardie "find a contractor" pages. High-DA inbound links. (2 hours)

### 30. Audit font loading strategy
Preload THE BOLD FONT, `font-display: swap` for others. Verify all weights needed. (30 minutes)

### 31. Verify hero image optimization
Confirm WebP/AVIF output, `fetchpriority="high"` on heroes, not lazy loaded. (30 minutes)

### 32. Rename blog breadcrumb "Ground Up" -> "Blog"
AI crawlers can't identify "Ground Up" as a blog section. (5 minutes)

---

## Low — Backlog (8 items)

33. Add HowTo schema to "Roof Maintenance Checklist" post
34. Add ServiceArea schema to area pages
35. Add "Key Takeaways" boxes to blog posts
36. Create Wikidata entity for Hamilton Exteriors
37. Add WebPage entity to service pages
38. Launch YouTube channel (3-5 initial videos) — highest-leverage GEO signal
39. Standardize all image alt text: "[Service] by Hamilton Exteriors in [City], CA"
40. Verify LinkedIn company page is active and populated

---

## Score Improvement Projection

| Action Items | Score Impact |
|--------------|-------------|
| Critical #1-7 | +6 points |
| High #8-16 | +5 points |
| Medium #17-32 | +5 points |
| Low #33-40 | +3 points |
| **Total potential** | **72 -> 91/100** |

---

## Implementation Roadmap

### Week 1 (Critical + Quick High items)
- Day 1: Fix llms-full.txt name, delete untitled post, fix Yelp sameAs (#1, 2, 4)
- Day 1: Point DNS (#3), verify GBP category (#7)
- Day 2: Send review requests to recent customers (#5)
- Day 3: Refactor schema — lean org references on blog/city pages (#6)
- Day 4-5: Add missing blog post to index, consolidate categories, fix alt text (#8, 9, 11)
- Day 5: Add meta descriptions, enrich BlogPosting schema (#10, 12, 13)

### Week 2 (Remaining High items)
- Update llms.txt with page URLs (#14)
- Claim Yelp, submit Angi + HomeAdvisor (#15)
- Begin pSEO content quality pass on top 10 cities (#16)

### Weeks 3-4 (Medium items)
- H1 typos, duplicate H2s, legal pages in sitemap (#17-19)
- Author display, lastmod dates, /buy content expansion (#20-22)
- SpeakableSpecification, question-format H2s, FAQ dedup (#23-25)
- Cross-city links, Maps embed, manufacturer directories (#26-29)
- Font/image optimization, breadcrumb rename (#30-32)

### Month 2+ (Low items + ongoing)
- Schema enhancements (#33-37)
- YouTube channel launch (#38)
- Alt text standardization (#39)
- Re-audit at 30 days
