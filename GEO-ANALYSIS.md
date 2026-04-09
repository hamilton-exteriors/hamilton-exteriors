# GEO Analysis — Hamilton Exteriors

**Date:** 2026-04-09 (v3)  
**URL:** https://hamilton-exteriors.com  
**Stack:** Astro 6.1 SSR (Railway) — fully server-side rendered

---

## GEO Readiness Score: 82/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Citability (blogs + detail pages) | 80/100 | 25% | 20.0 |
| Structural Readability | 85/100 | 20% | 17.0 |
| Multi-Modal Content | 70/100 | 15% | 10.5 |
| Authority & Brand Signals | 88/100 | 20% | 17.6 |
| Technical Accessibility | 85/100 | 20% | 17.0 |

---

## Platform Breakdown

| Platform | Score | Notes |
|----------|-------|-------|
| **Google AI Overviews** | 85/100 | Strong — SSR, structured data, FAQ schema, top-10 ranking signals all present |
| **ChatGPT** | 78/100 | Good — Wikidata entity exists, llms.txt present, GPTBot allowed. Weak: no Wikipedia article, limited Reddit/YouTube presence |
| **Perplexity** | 75/100 | Good — PerplexityBot allowed, structured content. Weak: no Reddit discussions, limited community validation |
| **Bing Copilot** | 80/100 | Good — IndexNow configured, clean schema, SSR content accessible |

---

## AI Crawler Access Status ✅

| Crawler | Status | Purpose |
|---------|--------|---------|
| GPTBot (OpenAI) | ✅ Allowed | ChatGPT web search |
| OAI-SearchBot (OpenAI) | ✅ Allowed | OpenAI search features |
| ChatGPT-User (OpenAI) | ✅ Allowed | ChatGPT browsing |
| ClaudeBot (Anthropic) | ✅ Allowed | Claude web features |
| PerplexityBot | ✅ Allowed | Perplexity AI search |
| Google-Extended | ✅ Allowed | AI Overviews |
| Applebot-Extended | ✅ Allowed | Apple Intelligence |
| CCBot (Common Crawl) | ❌ Blocked | Training — correct |
| anthropic-ai | ❌ Blocked | Training — correct |
| cohere-ai | ❌ Blocked | Training — correct |
| Bytespider (ByteDance) | ❌ Blocked | No citation benefit — correct |

**Verdict:** Excellent. All AI search crawlers allowed; training crawlers correctly blocked. `/api/` endpoints properly excluded.

---

## llms.txt Status ✅

| Check | Status |
|-------|--------|
| `/llms.txt` present | ✅ Yes |
| `/llms-full.txt` present | ✅ Yes |
| RSL-1.0 license declared | ✅ `RSL-1.0-cite-with-attribution` |
| Company entity info | ✅ Name, owner, CSLB, address, Wikidata |
| Services with pricing | ✅ 6 services with price ranges |
| Key facts for citation | ✅ 7 source-attributed facts |
| Service areas | ✅ 6 counties, 44 cities |
| Blog links | ✅ Key guides linked |
| Last updated date | ✅ 2026-04-09 |
| "Not covered" exclusions | ✅ Commercial, SF County, solar, interior, landscaping |

**Verdict:** Best-in-class llms.txt implementation. Both summary and full versions. RSL licensing, entity linking, pricing tables, and source-attributed facts all present.

---

## Brand Mention Analysis

| Platform | Status | Impact |
|----------|--------|--------|
| **Wikidata** | ✅ Q139044457 | High — entity disambiguation for AI systems |
| **Wikipedia** | ❌ No article | High gap — 47.9% of ChatGPT citations come from Wikipedia |
| **Google Business Profile** | ✅ 4.8★ (27 reviews) | Strong local signal |
| **Yelp** | ✅ Listed | Moderate |
| **HomeAdvisor** | ✅ Listed | Moderate |
| **Angi** | ✅ Listed | Moderate |
| **BBB** | ✅ Listed | Moderate trust signal |
| **LinkedIn (Company)** | ✅ Listed in sameAs | Moderate |
| **LinkedIn (Owner)** | ✅ Linked in Person schema | Strong |
| **YouTube** | ⚠️ Channel exists but no content verified | High gap — YouTube mentions have strongest correlation (0.737) with AI citations |
| **Reddit** | ❌ No presence detected | High gap — Reddit is #1 source for Perplexity (46.7%) and #2 for ChatGPT (11.3%) |
| **CSLB** | ✅ License linked | Authority signal |

**Verdict:** Strong directory/entity presence. Three critical gaps: Wikipedia article, YouTube content, and Reddit discussions.

---

## Passage-Level Citability

### Blog Posts (Primary GEO surface) — Score: 85/100

**Roof replacement cost guide** — Excellent GEO signals:
- ✅ Question-based H2 headings (8 question headings)
- ✅ Author byline with credentials (Alexander Hamilton Li, CSLB #1082377)
- ✅ Publication + updated dates (March 10, 2026 / Updated April 9, 2026)
- ✅ Table of contents with anchor links
- ✅ FAQ schema with structured Q&A
- ✅ Pricing tables with comparative data
- ✅ Short paragraphs (2-4 sentences)
- ⚠️ Some answer blocks exceed optimal 134-167 word range
- ⚠️ Most statistics cite Hamilton project data — limited third-party source attribution

### Sub-Service Pages (Secondary GEO surface) — Score: 78/100

**Asphalt shingles page** — Good GEO signals:
- ✅ "Reviewed by" byline with credentials and date
- ✅ FAQ section with 10 Q&A pairs + FAQPage schema
- ✅ Service + Product schema with AggregateOffer
- ✅ Source-attributed stat (ARMA 75% market share)
- ⚠️ Comparison data in narrative form — would be stronger as a table
- ⚠️ Limited question-based H2 headings in body content (only FAQ section uses questions)
- ⚠️ H2 structure is thin: "What Homeowners Say" and "FAQ" dominate — missing informational H2s

### Homepage (Conversion-focused, not GEO target) — N/A per strategy

---

## Server-Side Rendering Check ✅

| Check | Status |
|-------|--------|
| Astro SSR mode | ✅ Full SSR on Railway |
| Content in initial HTML | ✅ All text content server-rendered |
| JavaScript dependency | ✅ Minimal — progressive enhancement only |
| Hydration model | ✅ Astro islands — only interactive components hydrate |

**Verdict:** AI crawlers that don't execute JavaScript will see all content.

---

## Schema Markup for AI Discoverability

| Schema Type | Where | Status |
|-------------|-------|--------|
| GeneralContractor + RoofingContractor | Layout (homepage + service pages) | ✅ With sameAs, hasCredential, aggregateRating |
| BlogPosting | Blog posts | ✅ With author Person, speakable, wordCount |
| Person (founder) | Blog posts, about page | ✅ With sameAs (CSLB, LinkedIn, Wikidata, Yelp) |
| FAQPage | Blog posts, sub-service pages | ✅ Structured Q&A |
| Service + Product | Sub-service pages | ✅ With AggregateOffer pricing |
| BreadcrumbList | All pages | ✅ |
| WebSite + WebPage | Layout | ✅ |
| SpeakableSpecification | Blog posts | ✅ Targets first paragraph + H2s |
| OfferCatalog | Homepage/service pages | ✅ 6 services linked |

**Verdict:** Comprehensive. SpeakableSpecification on blogs is a strong differentiator.

---

## Top 5 Highest-Impact Changes

### 1. Build YouTube Content Presence (Impact: HIGH)
YouTube mentions have the strongest correlation (0.737) with AI citations. Create 3-5 videos:
- "How Much Does a Roof Replacement Cost in the Bay Area?" (mirrors top blog post)
- "Bay Area Fire Zone Roofing Requirements Explained"
- Timelapse of a real roof replacement project
- Embed these on corresponding blog/service pages for multi-modal signals

### 2. Seed Reddit Presence (Impact: HIGH)
Reddit is the #1 source for Perplexity (46.7%) and #2 for ChatGPT (11.3%). Participate authentically in:
- r/bayarea — answer homeowner questions about contractors/roofing
- r/HomeImprovement — share expertise on roofing materials/costs
- r/RoofingContractors — professional community
- Goal: Hamilton Exteriors mentioned naturally in relevant threads

### 3. Add Comparison Tables to Sub-Service Pages (Impact: MEDIUM)
The asphalt shingles page has comparison data buried in prose. Convert to structured tables:
- Material comparison table (asphalt vs metal vs tile — already in llms-full.txt)
- Cost comparison table per material tier
- Tables are 156% more likely to be cited by AI systems

### 4. Add Informational H2 Headings to Sub-Service Pages (Impact: MEDIUM)
Sub-service pages currently have thin H2 structure (mostly "Reviews" and "FAQ"). Add question-based H2 sections:
- "How Much Do Asphalt Shingles Cost in the Bay Area?"
- "How Long Do Asphalt Shingles Last?"
- "What Are the Best Asphalt Shingle Brands?"
- Keep content concise (134-167 word answer blocks)

### 5. Increase Third-Party Source Citations in Blog Posts (Impact: MEDIUM)
Blog posts heavily cite Hamilton project data. Add more external source attribution:
- Department of Energy stats on energy savings
- Oak Ridge National Laboratory on metal roof heat reflection (already in llms.txt — add to blog)
- Remodeling Magazine Cost vs. Value report
- FEMA/Cal Fire data for fire zone content

---

## What's Already Excellent

- **llms.txt** — Best-in-class with RSL licensing, full pricing, source-attributed facts
- **robots.txt** — Perfect AI crawler configuration (search allowed, training blocked)
- **Schema markup** — Comprehensive: Organization, Person, BlogPosting, Service, FAQ, Speakable
- **SSR** — Full server-side rendering, ideal for AI crawlers
- **Blog citability** — Question headings, author bylines, dates, TOC, FAQ schema
- **Entity presence** — Wikidata entity, CSLB linked, sameAs across 10+ platforms
- **IndexNow** — Configured for instant Bing/Yandex URL submission

---

## Summary

Hamilton Exteriors is well ahead of most local contractors on GEO readiness (82/100). The technical foundation (SSR, schema, llms.txt, crawler access) is excellent. The remaining gaps are **off-site brand signals** (YouTube, Reddit, Wikipedia) and **on-page content structure** on sub-service pages. The blog is the strongest GEO asset — sub-service pages should be brought up to the same standard with comparison tables and informational H2 sections.
