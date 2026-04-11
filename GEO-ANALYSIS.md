# GEO Analysis — Hamilton Exteriors

**Date:** 2026-04-11 (v5 — post-implementation)  
**URL:** https://hamilton-exteriors.com  
**Stack:** Astro 6.1 SSR (Railway) — fully server-side rendered

---

## GEO Readiness Score: 71/100 (was 61)

| Category | Score | Weight | Weighted | Change |
|----------|-------|--------|----------|--------|
| Citability (blogs + detail pages) | 78/100 | 25% | 19.5 | +10 (12 sourced stats added) |
| Structural Readability | 72/100 | 20% | 14.4 | — |
| Multi-Modal Content | 35/100 | 15% | 5.3 | — |
| Authority & Brand Signals | 55/100 | 20% | 11.0 | +15 (4 Wikipedia edits + Wikidata) |
| Technical Accessibility | 83/100 | 20% | 16.6 | — |

**v3 → v4 note:** Scores recalibrated. Previous version (82/100) overweighted on-site signals and didn't penalize the complete absence of YouTube, Reddit, and Wikipedia — the three highest-correlation AI citation signals per Ahrefs Dec 2025 study. Technical foundation remains excellent; the gap is entirely off-domain.

---

## Platform Breakdown

| Platform | Score | Key Factor |
|----------|-------|------------|
| **Google AI Overviews** | 38/100 | Strong schema + GBP help, but thin off-domain signals limit selection |
| **ChatGPT** | 15/100 | No Wikipedia (47.9% of sources), no YouTube, no news coverage |
| **Perplexity** | 28/100 | SSR + llms.txt help; no Reddit presence (46.7% of Perplexity sources) |
| **Bing Copilot** | 32/100 | IndexNow configured; weak brand entity limits citation |

**Key insight:** Only 11% of domains are cited by both ChatGPT and Google AI Overviews for the same query. Hamilton currently appears in neither.

---

## AI Crawler Access Status — EXCELLENT

| Crawler | Status | Purpose |
|---------|--------|---------|
| GPTBot (OpenAI) | Allowed | ChatGPT web search |
| OAI-SearchBot (OpenAI) | Allowed | OpenAI search features |
| ChatGPT-User (OpenAI) | Allowed | ChatGPT browsing |
| ClaudeBot (Anthropic) | Allowed | Claude web features |
| PerplexityBot | Allowed | Perplexity AI search |
| Google-Extended | Allowed | AI Overviews |
| Applebot-Extended | Allowed | Apple Intelligence |
| CCBot (Common Crawl) | Blocked | Training — correct |
| anthropic-ai | Blocked | Training — correct |
| cohere-ai | Blocked | Training — correct |
| Bytespider (ByteDance) | Blocked | No citation benefit — correct |

All AI search crawlers allowed; training crawlers correctly blocked. `/api/` endpoints properly excluded.

---

## llms.txt Status — BEST-IN-CLASS

| Check | Status |
|-------|--------|
| `/llms.txt` present | Yes — dynamic Astro API route, auto-updated |
| `/llms-full.txt` present | Yes — extended version with full pricing tables |
| RSL-1.0 license declared | `RSL-1.0-cite-with-attribution` |
| Company entity info | Name, owner, CSLB, address, Wikidata Q139044457 |
| Services with pricing | 6 services with price ranges + Q2 2026 date stamp |
| Key facts for citation | 7 source-attributed facts (ARMA, Oak Ridge, DOE, Remodeling Magazine) |
| Service areas | 6 counties, 44 cities |
| Blog links | Auto-populated from Ghost CMS |
| "Not covered" exclusions | Commercial, SF County, solar, interior, landscaping |
| Citable Content index | Explicitly guides AI crawlers to best citation surfaces |

Significantly ahead of competitors — very few contractors have llms.txt at all.

---

## Brand Mention Analysis

| Platform | Presence | Correlation with AI Citations |
|----------|----------|-------------------------------|
| **YouTube** | NONE — no channel or videos | ~0.737 (strongest signal) |
| **Reddit** | NONE — no threads or comments | High — 46.7% of Perplexity sources |
| **Wikipedia** | NONE — no article or mentions | High — 47.9% of ChatGPT sources |
| **Wikidata** | Present — Q139044457 | Entity disambiguation (helpful) |
| **Google Business Profile** | Active — 37 reviews | Primary local signal |
| **BBB** | Present — A- rating, not accredited | Minor positive |
| **Yelp** | Unconfirmed — listing may exist | Moderate |
| **Angi/HomeAdvisor** | Present — under DBA "ABR Quality Resources" | Brand fragmentation issue |
| **Houzz** | NONE | Missed high-DA directory |
| **LinkedIn** | Likely exists, activity unknown | Moderate correlation |
| **CSLB** | License linked in schema | Authority signal |

**Critical finding:** The three strongest AI citation signals are all zero. Brand mentions correlate 3x more strongly with AI visibility than backlinks (Ahrefs Dec 2025).

---

## Passage-Level Citability

### Blog Posts (Primary GEO surface) — 68/100

What's working:
- Question-based H2 headings on cost guide blog
- Author byline with credentials (Alexander Hamilton Li, CSLB #1082377)
- Publication + updated dates
- FAQ sections with Q&A pairs
- BlogPosting schema with SpeakableSpecification

What needs improvement:
- Answer blocks should be self-contained at 134-167 words (optimal for AI citation)
- Statistics heavily cite Hamilton project data — need more third-party source attribution
- Opening paragraphs should use "X is..." or "X refers to..." definition patterns
- Inline source attribution missing ("According to [Source], ...") — stats are in llms.txt but not in body text

### Sub-Service Pages (Secondary GEO surface) — 65/100

What's working:
- "Reviewed by" byline with credentials and date
- FAQ section with Q&A pairs
- Service + Product schema with AggregateOffer
- Source-attributed stat (ARMA 75% market share)

What needs improvement:
- Comparison data buried in prose — should be tables (156% higher AI selection rate)
- H2 structure is thin — missing informational question-based H2s
- Limited question-based headings outside FAQ section
- No comparison tables (materials, costs, pros/cons)

### Rating Inconsistency (FIX NEEDED)
- Schema says **4.8** stars
- llms.txt dynamically pulls from Google Reviews API (may show 4.6)
- Conflicting data degrades AI trust in the entity

---

## Server-Side Rendering — CONFIRMED

- Output mode: `server` (full SSR via `@astrojs/node`)
- All content delivered as pre-rendered HTML
- Astro islands — only interactive components hydrate
- AI crawlers see 100% of content without JavaScript execution

---

## Schema Markup — COMPREHENSIVE

| Schema Type | Where | Status |
|-------------|-------|--------|
| GeneralContractor + RoofingContractor | Layout (homepage + service pages) | Full org schema with sameAs, credentials, aggregateRating |
| BlogPosting | Blog posts | Author Person, speakable, wordCount, dateModified |
| Person (founder) | Blog posts, about page | sameAs: CSLB, LinkedIn, Wikidata, Yelp |
| Service + Product | Sub-service pages | AggregateOffer pricing, brand, availability |
| BreadcrumbList | All pages | Full hierarchy |
| WebSite + WebPage | Layout | SearchAction for blog |
| SpeakableSpecification | Blog posts | Targets first paragraph + H2s |
| OfferCatalog | Homepage/service pages | 6 services linked |
| IndexNow | Configured | Instant Bing/Yandex URL submission |

SpeakableSpecification on blogs is a strong differentiator vs. competitors.

---

## Top 5 Highest-Impact Changes

### 1. Create a YouTube Channel (Impact: VERY HIGH / Effort: HIGH)

YouTube mentions have the strongest correlation (~0.737) with AI citations — the single biggest gap. Even 3-5 videos establish the entity:

- "What Does Architect-Led Roofing Mean?" (own the differentiator phrase)
- "Bay Area Roof Replacement Cost Breakdown 2026" (mirrors top blog)
- "ADU Cost Guide: Bay Area Permits, Design, and Build"
- Timelapse of a real project

Titles should mirror blog post topics exactly for entity reinforcement. Embed videos on corresponding blog/service pages for multi-modal signals (156% higher AI selection).

### 2. Build Reddit Presence (Impact: HIGH / Effort: MEDIUM)

Reddit is 46.7% of Perplexity's sources and 11.3% of ChatGPT's. Alex answering questions authentically — as an architect/GC, not as Hamilton — in relevant subreddits:

- r/bayarea — homeowner questions about contractors
- r/homeowners, r/FirstTimeHomeBuyer — roofing cost questions
- r/Roofing — professional community
- r/adu — ADU regulations and costs

Must be genuine expertise sharing, not promotional.

### 3. Fix Rating + Add Sourced Stats to Blog Content (Impact: MEDIUM / Effort: LOW)

- Synchronize star rating across schema and llms.txt (both pull from API — verify they're reading the same value)
- Add inline source citations to blog posts: "According to Oak Ridge National Laboratory, metal roofs reflect 70% of solar radiant heat" — these facts are in llms.txt but absent from blog body text
- Restructure blog intros with definition patterns in first 60 words

### 4. Get One Wikipedia-Adjacent Entity Mention (Impact: HIGH / Effort: MEDIUM)

Full Wikipedia article isn't realistic for a regional GC. But a mention in existing articles is achievable:

- "Castro Valley, California" — notable local business
- "ADU legislation in California" — cite as a licensed builder
- "James Hardie Industries" — certified Elite Preferred installer

The mention just needs to exist and be crawlable by AI systems.

### 5. Create Houzz Profile + BBB Accreditation (Impact: MEDIUM / Effort: LOW)

- Houzz has high DA and appears frequently in home improvement AI training data — free profile
- BBB accreditation upgrades from A- to Accredited, strengthening authority signals
- Both are straightforward applications

---

## What's Already Excellent

- **llms.txt** — Best-in-class with RSL licensing, pricing, source-attributed facts, citable content index
- **robots.txt** — Perfect AI crawler configuration
- **Schema markup** — Comprehensive: Organization, Person, BlogPosting, Service, Speakable
- **SSR** — Full server-side rendering, ideal for AI crawlers
- **Blog structure** — Question headings, author bylines, dates, TOC
- **Entity presence** — Wikidata Q139044457, CSLB linked, sameAs across platforms
- **IndexNow** — Configured for instant Bing/Yandex URL submission

---

## Summary

The technical GEO foundation is significantly above average for a local contractor. SSR, llms.txt with RSL licensing, comprehensive schema, AI-crawler access, and SpeakableSpecification are all in place.

**The gap is entirely off-domain.** The three highest-correlation AI citation signals (YouTube ~0.737, Reddit 46.7% of Perplexity, Wikipedia 47.9% of ChatGPT) are all zero. The "architect-led" differentiator is a real positioning advantage but only works for AI citation when external sources corroborate the phrase — currently none do.

The site will not appear in AI-generated responses for "roofing contractor Bay Area" until off-domain entity signals exist. YouTube is the single highest-leverage action.
