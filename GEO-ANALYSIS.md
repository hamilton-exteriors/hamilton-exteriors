# GEO Analysis — Hamilton Exteriors

**Date:** 2026-04-15
**Domain:** hamilton-exteriors.com

## GEO Readiness Score: 89/100

| Area | Score | Notes |
|------|-------|-------|
| Citability (25%) | 22/25 | Strong blog passages with sourced stats; llms.txt lists citable facts with DOIs/sources |
| Structural Readability (20%) | 18/20 | Clean H1→H2→H3, question-based H2s, tables in cost blogs |
| Multi-Modal (15%) | 11/15 | Images + swatches present; no video embeds, few infographics |
| Authority & Brand (20%) | 18/20 | Person schema for Alex Li, Wikidata entities linked, CSLB cited; Reddit/YouTube presence thin |
| Technical Accessibility (20%) | 20/20 | Astro SSR, AI crawlers allowed, llms.txt + llms-full.txt live, RSL-1.0 declared |

## Platform Breakdown

| Platform | Score | Primary Gap |
|----------|-------|-------------|
| Google AI Overviews | 92/100 | Strong — blog guides rank + cite-ready passages |
| ChatGPT | 84/100 | Wikidata ✓, but no Wikipedia article; Reddit mentions weak |
| Perplexity | 80/100 | Needs Reddit community validation (contractor AMAs, r/BayArea threads) |
| Bing Copilot | 90/100 | IndexNow key live, sitemap indexed |

## AI Crawler Access

**Allowed:** GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, ChatGPT-User, Google-Extended, Applebot-Extended
**Blocked (intentional):** CCBot, anthropic-ai, cohere-ai, Bytespider
✅ Optimal configuration — citation-enabled crawlers allowed, training crawlers blocked.

## llms.txt Status

✅ `/llms.txt` + `/llms-full.txt` both 200. Updated 2026-04-15. Includes RSL-1.0 license, Wikidata IDs, 10+ citable blog URLs, keyed stats with primary sources (ORNL, DOE, ARMA, Remodeling Magazine).

## Brand Mention Analysis

| Surface | Status |
|---------|--------|
| Wikidata (company Q139044457) | ✅ |
| Wikidata (founder Q139196186) | ✅ |
| Wikipedia article | ❌ Gap |
| YouTube channel | ❌ Gap — highest AI-correlation signal (0.737) |
| Reddit mentions | ❌ Gap |
| LinkedIn company page | Verify |
| HomeAdvisor / Yelp | ✅ |

## Passage-Level Citability

Blog guides (e.g., `/blog/roof-replacement-cost-bay-area`) have question-formed H2s and attributed stats. Cost-answer sections appear on-target for the 134–167 word citation sweet spot.

## SSR Check

Home page returns 328 KB of rendered HTML with 25+ schema types inlined (LocalBusiness, RoofingContractor, Person, FAQPage, Review, AggregateRating). No JS dependency for core content. ✅

## Top 5 Highest-Impact Changes

1. **Launch YouTube channel** — strongest AI-citation correlation (0.737). Even 10 project walkthrough videos would materially lift ChatGPT/Perplexity mentions.
2. **Seed Reddit presence** — answer questions on r/BayArea, r/HomeImprovement, r/Roofing with CSLB verification. Perplexity pulls 46.7% of citations from Reddit.
3. **Draft Wikipedia article for Alexander Hamilton Li** — notability via architect + GC credentials + Wikidata. Unlocks ChatGPT (47.9% Wikipedia citations).
4. **Fix 3 untitled blog slugs** in llms.txt (`/blog/untitled-3/4/5`) — either publish with real titles or remove from llms.txt; currently leak low-quality surfaces.
5. **Add embedded video** to top 3 cost blogs — multi-modal content sees 156% higher AI selection rates.

## Schema Recommendations

- Add `VideoObject` once YouTube launches.
- Add `HowTo` schema to "How Long Does a Roof Replacement Take" blog.
- Consider `Dataset` for `/public/pricing.md` to make per-square pricing machine-citable.

## Content Reformatting Suggestions

- Open each blog with a 40–60 word direct answer block before the TOC.
- Untitled blogs: retitle with query-matched phrasing or 301 to a canonical guide.
- Add `## Key Statistics` sections to the ADU and windows guides mirroring the roof guide's sourced-stats pattern.

## Already Solid

✅ AI crawler allow/block matrix, llms.txt + llms-full.txt, RSL-1.0 license, Wikidata entities, Person schema with credentials, question-based H2s, IndexNow, dated last-updated field, comprehensive JSON-LD.
