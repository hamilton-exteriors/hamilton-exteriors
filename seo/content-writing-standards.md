# Content Writing Standards (consolidated reference)

This file is loaded into Tier 1 of the prompt cache for every per-page agent. It consolidates standards from:

- Local skills: `seo-content`, `seo-page`, `seo-schema`, `seo-geo`, `seo-programmatic`, `ai-seo`
- toprank `seo/content-writer/references/content-writing.md` (https://github.com/nowork-studio/toprank)
- Hamilton brand rules (`brand-voice.md`)
- Google QRG Sept 2025 + Helpful Content System (merged into core March 2024)

---

## E-E-A-T (Sept 2025 QRG)

### Experience (first-hand)
- Original research, case studies, before/after results
- Personal anecdotes, process documentation
- Photos/videos from direct work
- Unique data, proprietary insights

### Expertise
- Author credentials, certifications, bio (Alex Hamilton Li, Architect & GC, **CSLB #1078806**)
- Professional background relevant to topic
- Technical depth appropriate for audience

### Authoritativeness
- External citations to authoritative domains (city.gov, calfire.ca.gov, energy.ca.gov, schema.org)
- Brand mentions > backlinks (Ahrefs Dec 2025: 3x stronger correlation with AI citations than backlinks)

### Trustworthiness
- Contact info visible: phone (650) 977-3351, address, hours
- Privacy + terms pages linked
- Customer testimonials, GBP review aggregate
- Date stamps (publication + last-updated)
- HTTPS

---

## AI Citation Optimization (GEO, the new ranking surface)

**1.5B AI Overview users/month, 50%+ query coverage, 527% AI-referred session growth in 2025.** AI citation is a separate KPI from organic rankings.

### Optimal passage length: **134–167 words** for AI extraction
Each H2 section's first paragraph should:
- Answer the section's question directly in the first sentence
- Be self-contained (extractable without surrounding context)
- Hit 134–167 words for citation eligibility
- End with a specific data point or factual claim with `sourceUrl`

### Multi-modal lift: **+156% AI selection rate** when content includes image/chart/table
Every long-form page must include:
- ≥1 explanatory image with descriptive alt text
- ≥1 table for comparative data (price tiers, permit fees, material specs)
- ≥1 list (bullet or numbered) for step/feature enumeration

### AI crawler accessibility
- AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) do NOT execute JS — content must be SSR.
- Hamilton uses Astro SSR ✓
- `/llms.txt` already published ✓ (header confirmed)

### Brand mention strategy (highest AI-citation signal)
Where natural, the content should reference:
- Hamilton's CSLB license number (verifiable on cslb.ca.gov)
- Alex's architect/GC dual credential
- Specific Bay Area cities served (entity-grounding)
- Real Hamilton project references when in `data-spine[city].alexNotes.representativeProjects`

---

## Schema requirements (current as of Feb 2026)

### ACTIVE — recommend freely
- `BreadcrumbList` — every page
- `Service` — city-service pages, service cornerstone pages
- `LocalBusiness` — city pages, city-service pages (areaServed = city)
- `Organization` — homepage, About page
- `Person` — Alex bio anchor (`/about/alex-hamilton-li`)
- `Article` / `BlogPosting` — cost blogs, informational blogs
- `Review`, `AggregateRating` — when sourced from real GBP data
- `WebSite` — homepage with `SearchAction` if site has search

### RESTRICTED — use cautiously
- `FAQPage` — **does NOT render Google rich results for non-gov/health sites since Aug 2023**. BUT: AI crawlers (ChatGPT, Perplexity, Bing Copilot) still parse FAQ schema for passage extraction. Use FAQPage **only for AI-citation purposes**, never as a "we'll get rich snippets" play. Document Q&A in body markup with proper heading hierarchy as the primary citability signal.

### DEPRECATED — never recommend
- `HowTo` (rich results removed Sept 2023)
- `SpecialAnnouncement` (deprecated July 2025)
- `CourseInfo`, `EstimatedSalary`, `LearningVideo` (retired June 2025)
- `ClaimReview`, `VehicleListing`, `Practice Problem`, `Dataset` (retired late 2025)

### JSON-LD must be in initial server-rendered HTML
JS-injected JSON-LD faces delayed indexing per Google Dec 2025 guidance. Astro SSR injects in initial HTML — keep doing that.

---

## Word count: floors, not targets

| Page Type | Topical-coverage floor |
|---|---|
| City-service page | 1,200 |
| City landing page | 1,000 |
| Cost blog | 2,000 |
| Service cornerstone | 1,500 |
| Sub-service page | 1,000 |

**Word count is NOT a direct ranking factor.** Confirmed by Google. Treat these as adequate-coverage floors. A 1,200-word page that thoroughly answers the query outranks a 3,000-word page that doesn't. Step 6 content brief sets `wordCountTarget = max(competitor word counts) × 1.15` only as a coverage benchmark, not a content-padding directive.

---

## Programmatic-SEO safety (the 187-page risk)

Google's Scaled Content Abuse policy (March 2024 + June 2025 enforcement waves) targets template-spray content. Hard rules for the per-page agent:

| Metric | Threshold | Action |
|---|---|---|
| Unique 5-gram content vs corpus | <30% | **HARD STOP** — regenerate from scratch with different angle |
| Unique 5-gram content vs corpus | <40% | **WARNING** — regenerate with strict differentiation |
| Page lacks any record-specific facts (permits, projects, climate, code) | always | **HARD STOP** — fetch more from data-spine before generation |
| Standalone-value test | always | "Would this page be worth publishing if no other similar pages existed?" — must be answerable yes |

**Safe programmatic patterns** (OK at scale):
- City pages with real permit fees, real project references, city-specific climate factors
- Service pages with material-specific specs, manufacturer references, code-trigger detail
- Cost blogs with real pricing ranges, real permit data per city, sourced quotes

**Penalty risk** (avoid):
- Location pages with only city name swapped in identical text
- "Best [tool]" pages without industry-specific detail
- Pages where >60% of content is shared template boilerplate

---

## Anti-patterns (forbidden in every draft)

- **Keyword stuffing**: keyword density >3% or unnatural repetition
- **AI hedging**: "It's important to note", "as we've discussed", "in conclusion"
- **Filler**: "When it comes to X", "At the end of the day", transitional fluff
- **Walls of text**: paragraphs >4 sentences without break
- **Duplicate intent**: page covers same intent as another internal page (consolidate or differentiate)
- **No specifics**: claims without numbers, names, dates, or sources
- **Generic boilerplate**: "quality workmanship", "customer satisfaction", "your dream home" (per `brand-voice.md`)
- **Defensive phrasing**: "no surprises", "no obligation", "no hidden fees" (per `brand-voice.md`)
- **Em dashes in titles/H1s** (per `brand-voice.md`)
- **ALL CAPS** for emphasis (per `brand-voice.md`)
- **Unverifiable superlatives**: "best", "#1", "top", "leading"

---

## On-page SEO checklist (G4 reference)

| Element | Standard |
|---|---|
| Title | 50–65 characters, primary keyword, unique to page |
| Meta description | 140–160 characters, leads with city + service noun |
| URL slug | Lowercase, hyphenated, ≤100 chars, no parameters |
| H1 | Exactly one, includes primary keyword, topical not promotional |
| H2 hierarchy | 3+ for sub-1000-word pages, 6+ for 1500+ words. No skipped levels |
| Internal links | 3-5 per 1000 words, descriptive anchor text, varied |
| External links | Authoritative (.gov, .edu, manufacturer), reasonable count |
| Image alt text | Descriptive, includes keyword where natural |
| Image format | WebP/AVIF preferred over JPEG/PNG |
| Image dimensions | Set width/height (CLS prevention) |
| Lazy loading | `loading="lazy"` below-fold |
| Schema | BreadcrumbList + page-type schema, valid JSON-LD, server-rendered |
| Canonical | Self-referencing or pointing to consolidated version |
| Open Graph | og:title, og:description, og:image, og:url all present |
| HTTPS | Required (already done at site level) |

---

## Format match (page intent → content type)

Before generating, identify the SERP-implied content type:

- **Question keywords** ("how much does X cost", "what is X") → article + answer-first paragraph + numeric range in first 100 words
- **Comparison keywords** ("X vs Y") → comparison table + criteria-by-criteria breakdown
- **Best-of keywords** ("best X for Y") → list format with explicit criteria, deserves 5-10 items
- **Service+location** ("X in [city]") → local landing page with city-specific data + map embed
- **Definition keywords** ("what is X") → definition in first 50 words, then expansion + examples

Mismatch is a major ranking failure mode. SERP analysis (step 3 of agent loop) reveals the format Google rewards for that query.

---

## Quotability test (last-click pass)

After generating a draft, ask:
1. **Last-click test**: Would the reader still need to search again after reading this?
2. **Standalone-value test**: Would this page be worth publishing if no other Hamilton pages existed?
3. **First-hand test**: Does the page demonstrate something we know that competitors don't?
4. **Source test**: Is every claim either common knowledge or backed by a `sourceUrl`?

If any test fails: regenerate. Hard.
