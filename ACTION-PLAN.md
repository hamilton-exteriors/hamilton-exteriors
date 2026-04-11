# Hamilton Exteriors — SEO Action Plan

**Generated:** April 11, 2026 | **Current Score:** 76/100 | **Target:** 90/100

---

## Critical (Fix Immediately)

| # | Issue | Location | Effort | Impact |
|---|---|---|---|---|
| 1 | Update `reviewCount` fallback 26 to 37 | `src/layouts/Layout.astro:164-165` | 5 min | Prevents schema/GBP mismatch during API outages |
| 2 | Fix `contactPoint.areaServed` "CA" to 6-county array | `src/layouts/Layout.astro:133` | 5 min | Corrects geographic over-claim in structured data |
| 3 | Add missing pages to sitemap (/buy, /financing, /about) | Astro sitemap config | 15 min | Ensures key conversion pages are indexed |

**Estimated score after Critical fixes: +2 pts (78/100)**

---

## High (Fix Within 1 Week)

| # | Issue | Effort | Impact |
|---|---|---|---|
| 4 | Add FAQPage JSON-LD to city page templates | 30 min | FAQ rich results for "[service] [city]" queries |
| 5 | Add Service schema to county-service pages (~30 pages) | 30 min | Structured data coverage for 30 orphaned pages |
| 6 | Add external source citations to blog post body text | 1-2 hrs/post | AI citation confidence across all platforms |
| 7 | Add visible "Last reviewed by" date + author to blog template | 15 min | Perplexity freshness signal, Google AIO author display |
| 8 | Embed Google Maps iframe on contact page | 15 min | GBP association signal for Googlebot |
| 9 | Fix contact page schema — add full streetAddress | 10 min | NAP consistency in structured data |

**Estimated score after High fixes: +6 pts (84/100)**

---

## Medium (Fix Within 1 Month)

| # | Issue | Effort | Impact |
|---|---|---|---|
| 10 | A/B test city page meta titles: GC-first for high-ADU cities | 2 hrs | Better category alignment with GBP primary |
| 11 | Implement post-project review request workflow | 2-3 hrs setup | Target 50 reviews by Q3 2026 |
| 12 | Create YouTube channel with 3-5 videos | 2-3 days | Strongest AI citation correlation (0.737) |
| 13 | Populate Wikidata Q139044457 (P856, P571, P131, P452) | 30 min | ChatGPT + Bing entity recognition |
| 14 | Pursue BBB Accreditation | External | Tier 1 citation + conversion trust signal |
| 15 | Create Houzz listing with project portfolio | 1-2 hrs | Critical Tier 2 citation for affluent Bay Area |
| 16 | Add Content-Security-Policy header | 1 hr | Security posture improvement |
| 17 | Spot-check 10-15 city+service pages for uniqueness | 1-2 hrs | Verify no thin content at scale |
| 18 | Verify homepage meta description is not truncated | 5 min | Complete sentence in SERPs |

**Estimated score after Medium fixes: +6 pts (90/100)**

---

## Low (Backlog)

| # | Issue | Effort | Impact |
|---|---|---|---|
| 19 | Add HowTo schema to process-oriented blog posts | 30 min/post | Rich result eligibility |
| 20 | Add Amazonbot explicit allow to robots.txt | 2 min | Future-proof Alexa/Rufus |
| 21 | Implement WebP/AVIF image serving | 2-4 hrs | Performance improvement for 510 images |
| 22 | Create infographics for cost comparison posts | 4-6 hrs | Shareable visual + backlink surface |
| 23 | Add TL;DR summary block at top of blog posts | 10 min/post | Optimal AI extraction target |
| 24 | Verify .well-known/llms.txt does not conflict with /llms.txt | 10 min | Prevent canonical confusion |
| 25 | Add X-Frame-Options + X-Content-Type-Options headers | 15 min | Security hardening |

---

## Implementation Roadmap

### Week 1: Critical + Quick Wins (items 1-3, 7-9)
- Code fixes: reviewCount fallback, areaServed, contact schema, Maps embed
- Template update: visible date/author on blog posts
- Config: add missing pages to sitemap
- **Expected: 76 to 80**

### Week 2: Schema + Content (items 4-6)
- Add FAQPage JSON-LD to city page template
- Add Service schema to county-service pages
- Begin adding external citations to top 5 blog posts
- **Expected: 80 to 84**

### Month 1: Authority Building (items 10-18)
- Create Houzz listing, pursue BBB accreditation
- Set up review request workflow
- Populate Wikidata, test city meta titles
- **Expected: 84 to 90**

### Ongoing: Content + Multi-Modal (items 12, 19-25)
- YouTube channel creation
- Image optimization
- Infographic creation
- **Expected: 90+**

---

*Action plan generated April 11, 2026*
