# GEO Analysis — Hamilton Exteriors

**Site:** https://hamilton-exteriors.com  
**Date:** 2026-04-09 (v2 — rescored through correct lens)  
**Analyst:** Claude (Opus 4.6)

---

## Scoring Philosophy

Main pages (homepage, /roofing, /siding, /about, /buy) are **conversion surfaces** — designed for humans to land on and convert. They are scored for technical infrastructure and authority signals, not penalized for lacking AI-optimized prose blocks.

**AI citability surfaces** are **blog posts** and **service detail pages** (sub-service pages like /roofing/asphalt-shingles, pSEO city+service pages). These are where GEO optimization effort should focus.

---

## GEO Readiness Score: 74/100

| Dimension | Score | Weight | Weighted | Scope |
|-----------|-------|--------|----------|-------|
| Technical Accessibility | 90/100 | 25% | 22.5 | Site-wide: SSR, robots.txt, llms.txt, IndexNow |
| Authority & Brand Signals | 85/100 | 20% | 17.0 | Site-wide: CSLB, certs, Wikidata, Person schema |
| Blog Citability | 71/100 | 20% | 14.2 | 3 blog posts audited |
| Detail Page Citability | 72/100 | 20% | 14.4 | Sub-service + pSEO pages |
| Main Page Infrastructure | 82/100 | 15% | 12.3 | Homepage FAQ (8 Q&As), /buy FAQPage, schema stack |

### Platform Breakdown

| Platform | Score | Key Strength | Key Gap |
|----------|-------|-------------|---------|
| **Google AI Overviews** | 78/100 | Full schema stack, SSR, FAQPage on /buy + homepage | Blog headings mostly declarative, not question-based |
| **ChatGPT** | 72/100 | llms.txt with citation facts, Wikidata entity | Blog stats lack external source attribution |
| **Perplexity** | 76/100 | Strong schema + specific pricing + fire zone post | FAQ answers on detail pages too short (40-95 words) |
| **Bing Copilot** | 74/100 | IndexNow, good meta tags, author bylines | pSEO pages have copy violations AI models will extract |

---

## 1. Technical Accessibility: 90/100

No changes from prior audit. This is the site's strongest dimension.

| Check | Status |
|-------|--------|
| SSR (all pages) | Astro `server` mode, @astrojs/node |
| AI crawlers allowed | GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot |
| Training crawlers blocked | CCBot, anthropic-ai, cohere-ai, Bytespider |
| llms.txt | Present, dynamic, with citation-ready facts + external sources |
| llms-full.txt | Present |
| `<link rel="llms">` in HTML | Present |
| IndexNow | Configured |
| CSS delivery | All inlined (no render-blocking) |
| Sitemaps | sitemap-index.xml + image-sitemap.xml |

**One gap:** Add explicit `ChatGPT-User` allow in robots.txt (currently relies on default `*` rule).

---

## 2. Authority & Brand Signals: 85/100

| Signal | Status |
|--------|--------|
| Wikidata entity | Q139044457 |
| CSLB license in schema | #1082377 with verification URL |
| Manufacturer certifications | GAF Master Elite, Owens Corning, CertainTeed, James Hardie |
| Person schema (founder) | Alexander Hamilton Li, credentials, LinkedIn |
| Live review aggregation | Google + Yelp + Angi + BBB + Nextdoor |
| Author bylines on blogs | Name, title, CSLB, publish + update dates |
| YouTube | Channel exists but engagement unknown |
| Reddit | No presence detected |
| Wikipedia | No article (not yet notable enough) |

**Gap:** YouTube (r=0.737) and Reddit are the top brand-mention signals for AI citation. Building content on these two platforms would have outsized impact.

---

## 3. Blog Citability: 71/100

Three posts audited — these are the primary GEO content surface.

| Post | Score | Best Feature | Key Gap |
|------|-------|-------------|---------|
| **Fire Zone Roofing Requirements** | 79 | Question-based headings, CAL FIRE citations, 1991 Oakland Hills data | Some answer blocks still under 134 words |
| **Roof Replacement Cost 2026** | 74 | Direct price answer in first 47 words, real job examples | Stats all internal — no external citations (ARMA, BLS) |
| **ADU Cost Bay Area 2026** | 61 | Good tables (cost-by-type, rental income) | Zero question-based headings, no FAQPage schema, no external sources |

### Blog Action Items (by impact)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Add FAQPage schema to ADU post | Low (30 min) | High — 7+ answerable questions already in content |
| 2 | Convert ADU post H2s to question format | Low (20 min) | High — matches AI query patterns |
| 3 | Add 2-3 external citations per post | Low (1 hr) | High — Remodeling Magazine, ARMA, BLS labor index, CAL FIRE |
| 4 | Format roof cost permit table as proper HTML `<table>` | Low (15 min) | Medium — structured extraction |
| 5 | Expand fire zone post answer blocks to 134-167 words | Medium (1 hr) | Medium |

---

## 4. Detail Page Citability: 72/100

### Sub-Service Pages (audited: asphalt-shingles, fiber-cement, casement)

| Page | Score | Best Feature | Key Gap |
|------|-------|-------------|---------|
| **/roofing/asphalt-shingles** | 74 | ARMA citation (75% market share), 10 FAQ Q&As, Product schema | FAQ answers too short (65-95 words), no question headings |
| **/siding/fiber-cement** | 72 | Remodeling Magazine ROI citation (86%), 7 FAQ Q&As | FAQ answers 40-80 words (well below 134 target), no comparison table |
| **/windows/casement** | 69 | AAMA airflow citation, 3-brand Product schema, per-window pricing | No definitional opening, flat heading structure, 45-word minimum FAQ answers |
| **/roofing/metal-roofing** | N/A | **Page missing** — URL returns parent /roofing | Zero citation surface for a high-value query |

### pSEO City+Service Pages (audited: Oakland/roofing, Walnut Creek, San Rafael/siding)

| Page | Score | Best Feature | Key Gap |
|------|-------|-------------|---------|
| **Oakland/roofing** | 64 | Fire zone specificity (VHFHSZ), housing stock data, coordinates | H1 "Best Roofing Company" (superlative violation), no FAQ, no external citations |
| **Walnut Creek** (hub) | 51 | FAQ present (partial), WUI/Diablo wind references | No author byline, "$0 Down" + "FREE" copy violations, no service schema |
| **San Rafael/siding** | 59 | Victorian/board-and-batten neighborhood detail, Climate Zone 2 | "FREE SIDING INSPECTION" ALL CAPS violation, no FAQ, cost section too thin |

### Detail Page Action Items (by impact)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | **Fix copy violations on pSEO pages** — AI models will extract these as brand signals | Low (15 min) | Critical |
| 2 | Expand FAQ answers on all sub-service pages to 134-167 words | Medium (3 hrs) | High |
| 3 | Add definitional opening paragraph to each sub-service page ("What is X?") | Low (1 hr) | High |
| 4 | Add FAQ sections to Oakland/roofing and San Rafael/siding pSEO pages | Medium (2 hrs) | High |
| 5 | Create /roofing/metal-roofing dedicated page | High (3-4 hrs) | High — zero citation surface currently |
| 6 | Add author byline to Walnut Creek hub page | Low (10 min) | Medium |
| 7 | Add comparison tables to sub-service pages (asphalt vs. metal vs. tile, etc.) | Medium (2 hrs) | Medium |

---

## 5. Main Page Infrastructure: 82/100

These pages are conversion-focused — scored for schema, FAQ presence, and technical foundation, not for AI prose blocks.

| Page | FAQ | Schema | Authority | Notes |
|------|-----|--------|-----------|-------|
| **Homepage** | 8 Q&As (4 base + 4 new) | Organization (full), WebSite, FAQPage | Strong | New FAQs include external citations (ARMA, Oak Ridge). Not yet deployed. |
| **/buy** | 6 Q&As with FAQPage schema | FAQPage, pricing tiers | Strong | Best GEO page on site. FAQ answers may exceed 167 words. |
| **/about** | None | Person, ProfilePage, Credential | Strong | Declarative headings — not penalized (conversion page) |
| **/roofing** | Via FAQ component | Organization (full), Service | Strong | Duplicate H1/H2 should still be fixed |

---

## 6. Copy Violations Found (Urgent)

The pSEO audit surfaced copy violations that contradict CLAUDE.md rules. These matter for GEO because **AI models extract and surface these as brand signals**.

| Page | Violation | Rule Broken |
|------|-----------|-------------|
| Oakland/roofing | H1: "Best Roofing Company in Oakland" | No unverifiable superlatives (top, best, #1) |
| Walnut Creek | "$0 Down" and "FREE Estimate" in CTA | No ALL CAPS emphasis, no discount-led headlines |
| San Rafael/siding | H2: "Get a FREE SIDING INSPECTION" | No ALL CAPS for emphasis |

These should be fixed in the pSEO templates to prevent recurrence across all 344 generated pages.

---

## 7. Top 10 Priorities (Rescoped to Blogs + Detail Pages)

### Quick Wins (< 1 hour)

| # | Change | Pages Affected | Impact |
|---|--------|---------------|--------|
| 1 | **Fix pSEO copy violations** (superlatives, ALL CAPS, discount-led CTAs) | ~344 pSEO pages | Critical — prevents AI from surfacing off-brand signals |
| 2 | **Add FAQPage schema to ADU blog post** | 1 post | High — content already exists, just needs schema |
| 3 | **Convert ADU post H2s to question format** | 1 post | High — matches AI query patterns |
| 4 | **Add author byline to Walnut Creek hub** | 1 page | Medium |
| 5 | **Add explicit ChatGPT-User allow in robots.txt** | Site-wide | Low effort, closes a gap |

### Medium Effort (1-4 hours)

| # | Change | Pages Affected | Impact |
|---|--------|---------------|--------|
| 6 | **Add 2-3 external citations to each blog post** | 3 posts | High — AI models weight sourced stats heavily |
| 7 | **Expand sub-service FAQ answers to 134-167 words** | ~20 sub-service pages | High — current 40-95 word answers are below citability threshold |
| 8 | **Add definitional opening paragraphs** to sub-service pages | ~20 pages | High — "What is X?" is the #1 AI extraction trigger |
| 9 | **Add FAQ sections to pSEO pages missing them** | ~200+ pages | High — FAQs are the primary AI citation surface |

### High Impact (4+ hours)

| # | Change | Pages Affected | Impact |
|---|--------|---------------|--------|
| 10 | **Create /roofing/metal-roofing dedicated page** | 1 new page | High — zero citation surface for a top-5 query |

---

## 8. Competitive Advantages Already in Place

- **Wikidata entity (Q139044457)** — machine-readable identity most contractors lack
- **llms.txt with 7 externally-cited facts** — ahead of 99%+ of contractor sites
- **AI crawler access correctly configured** — search vs. training distinction
- **SSR with inlined CSS** — AI crawlers see everything without JS
- **Live Google review aggregation** — fresh data in schema
- **IndexNow** — instant URL submission for content updates
- **344 pSEO pages with county-specific FAQs** — fire codes, seismic, permit systems
- **Homepage now has 8 FAQ Q&As** with external citations (ARMA, Oak Ridge) and FAQPage schema
- **Fire zone blog post (79/100)** — strongest individual GEO asset with question headings + CAL FIRE citations

---

## Score Trajectory

| State | Score | What Changed |
|-------|-------|-------------|
| Previous audit (wrong lens) | 72 | Penalized main pages for lacking prose blocks |
| Current (correct lens) | 74 | Blogs + detail pages scored as citability surface; main pages scored for infrastructure |
| After quick wins (#1-5) | ~80 | Copy violations fixed, ADU post schema + headings, author byline |
| After medium effort (#6-9) | ~87 | External citations, expanded FAQ answers, definitional openings |
| After all 10 | ~90 | Full citability surface across blogs, sub-service, and pSEO pages |

---

## Summary

The site's technical foundation (90/100) and authority signals (85/100) are excellent — top-tier for a local contractor. The citability gap is concentrated in **blog posts** (missing external citations and question headings) and **detail pages** (FAQ answers too short at 40-95 words vs. the 134-167 word AI citation sweet spot).

The single highest-ROI action is **fixing the pSEO template copy violations** — "Best Roofing Company," "FREE SIDING INSPECTION," "$0 Down" — because these propagate across 344 pages and AI models will extract them as brand signals.

The single highest-ROI content action is **expanding sub-service FAQ answers to 134-167 words** with external source citations — this transforms ~20 pages from conversion-only to dual-purpose (conversion + AI citability).
