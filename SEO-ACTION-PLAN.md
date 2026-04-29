# Hamilton Exteriors — SEO Action Plan (v2: SERP Reverse-Engineering)

**Date:** 2026-04-24
**Methodology author:** Alex Hamilton Li
**Thesis:** For every page we want to rank, identify the exact search terms it should own, pull the live SERP for those terms, reverse-engineer what the current #1 is doing, then ship a page that strictly dominates on every ranking signal. 387 pages × 1 agent per page × cloud parallelism.

---

## 1. Core loop (executed per page, by one sub-agent)

```
┌─────────────────────────────────────────────────────────────────┐
│  PER-PAGE AGENT LOOP                                             │
├─────────────────────────────────────────────────────────────────┤
│  1. RESOLVE TARGET           pageUrl + page purpose              │
│  2. DETERMINE KEYWORDS       (GSC current) + (intent research)   │
│  3. PULL LIVE SERPS          DataForSEO per keyword              │
│  4. CRAWL TOP 3-5 COMPETITORS  Firecrawl full content + schema   │
│  5. TEARDOWN                 what they cover, structure, schema, │
│                              word count, internal links, E-E-A-T │
│  6. CONTENT BRIEF            must-cover topics + differentiators │
│  7. GENERATE                 Claude API, brief + spine + Alex    │
│  8. QA GATES (G1-G5)         uniqueness, facts, on-page, voice   │
│  9. PUBLISH                  Ghost upsert + GSC submit           │
│  10. MONITOR                 T+14d indexation, T+30d ranking     │
│  11. IF POSITION > TARGET    RE-ENTER LOOP (refresh + expand)    │
└─────────────────────────────────────────────────────────────────┘
```

Every one of the 387 target pages runs this loop. The loop is designed to be:
- **Stateless per iteration** (idempotent)
- **Deterministic on input** (same SERP + same spine = same brief)
- **Cloud-executable** (no local dependencies)
- **Self-measuring** (T+30d check decides whether to re-enter loop)

---

## 2. Input data: per-page keyword assignment

Each of the 387 pages gets a `seo/targets/{pageSlug}.json` file **before any agent runs**:

```jsonc
{
  "pageUrl": "https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland-ca/roofing",
  "pagePurpose": "Convert Oakland homeowners searching for roofing contractors",
  "pageType": "city-service",
  "citySlug": "oakland",
  "service": "roofing",
  "primaryKeywords": [
    { "kw": "oakland roofing contractor", "priority": 1, "intent": "commercial" },
    { "kw": "roofing company oakland ca", "priority": 1, "intent": "commercial" },
    { "kw": "roof replacement oakland", "priority": 1, "intent": "commercial" }
  ],
  "secondaryKeywords": [
    { "kw": "oakland hills fire zone roofing", "priority": 2, "intent": "informational→commercial" },
    { "kw": "class a roofing oakland", "priority": 2, "intent": "informational" },
    { "kw": "title 24 cool roof oakland", "priority": 2, "intent": "informational" }
  ],
  "currentRankings": { /* populated by step 2 */ },
  "competitorSet": [ /* populated by step 3 */ ],
  "contentBrief": { /* populated by step 6 */ },
  "status": "pending"
}
```

Target files are generated in Phase 0 by a **seeder** that combines:
- Existing sitemap URLs (287 + 150 new cost-blog URLs we intend to create)
- GSC queries already hitting each page (primary keyword floor)
- DataForSEO keyword research for each (city × service) intent set

---

## 3. Per-step agent contract

### Step 1: Resolve target
Read `seo/targets/{pageSlug}.json`. Claim atomically via `status: in_progress`.

### Step 2: Determine keywords
Pull GSC data for `pageUrl` over trailing 90 days. Merge queries with `impressions ≥ 3` into `currentRankings`. If `primaryKeywords` is empty, infer from top 3 current queries that match page intent (filter out brand and geographic noise like "mount hamilton").

### Step 3: Pull live SERPs
For each primary keyword, call DataForSEO:
- `serp/google/organic/live` — top 10 ranked URLs, location=San Francisco Bay Area, device=desktop + mobile
- Capture: rank, URL, title, meta, schema signals, SERP features (AIO, PAA, local pack, featured snippet)
- Output: `seo/serps/{pageSlug}.json`

**Detection**: flag if SERP has AI Overview, Local Pack, or People Also Ask — each changes optimization priority.

### Step 4: Crawl top 3-5 competitors
For each target keyword, take top 5 non-directory/non-aggregator ranking URLs (exclude HomeAdvisor, Angi, Yelp, Thumbtack directory listings unless they ARE the dominant result).

Per competitor URL via **Firecrawl** MCP:
- Full rendered HTML + markdown
- Word count, heading hierarchy, image count
- Schema.org blocks (JSON-LD extract)
- Internal link count and targets
- External link count (authority signals)
- E-E-A-T signals: author bio, date, credentials, phone/address visibility
- CTA count and type
- Page speed proxy (TTFB via simple fetch)

Output: `seo/competitors/{pageSlug}/{competitorHost}.json`

### Step 5: Teardown
Synthesize competitor data into a comparative table:

| Signal | Comp 1 | Comp 2 | Comp 3 | Current Hamilton | Gap |
|---|---|---|---|---|---|
| Word count | 1,850 | 1,200 | 2,400 | 450 | ship 2,000+ |
| Headings | 8 H2 | 6 H2 | 11 H2 | 3 H2 | ship 9+ H2 |
| Schema | Service + FAQ + AggregateRating | LocalBusiness | Service + FAQ | None | ship all 4 |
| Local photos | 12 | 4 | 20 | 2 | ship 15+ |
| Author bio | Yes (GC cert) | No | Yes (architect) | No | ship Alex bio |
| Permit data | Generic | None | Specific | None | ship Oakland-specific |
| Internal links | 14 | 8 | 18 | 3 | ship 15+ |
| Case studies | 0 | 0 | 2 | 0 | ship 3+ Oakland projects |
| FAQ items | 6 | 0 | 10 | 0 | ship 12 |
| Response time benchmark | — | 2 hr | 24 hr | none | ship "same-day call-back" |

Output: `seo/teardowns/{pageSlug}.md`

### Step 6: Content brief
From teardown, generate a strictly-better brief:

```jsonc
{
  "wordCountTarget": 2200,  // max(competitors) + 15%
  "headingPlan": ["H1 ...", "H2 ...", "H2 ...", ...],
  "mustCover": [
    "Oakland-specific permit fee structure (cite city.gov URL)",
    "WUI fire zone Class A requirement (cite OFD)",
    "Title 24 cool roof code effective date",
    "Hayward Fault seismic tie-down inspection trigger",
    "3 Hamilton Oakland roofing projects with before/after + budget"
  ],
  "differentiators": [
    "Alex's first-person permit runs in Oakland (vs competitors who cite generic CA permits)",
    "Actual 2025 dollar pricing from our bid history (vs Angi's '$5k-$30k typical' range)",
    "CSLB #1078806 verification link",
    "Live GBP review widget"
  ],
  "schemaBlocks": ["Service", "LocalBusiness", "FAQPage", "BreadcrumbList"],
  "internalLinkTargets": [
    "/service-areas/alameda-county-ca/oakland-ca  (parent)",
    "/blog/roof-replacement-cost-oakland  (cost drill)",
    "/roofing/asphalt-shingles  (spec drill)",
    "/service-areas/alameda-county-ca/berkeley-ca/roofing  (neighbor city)"
  ],
  "ctaStrategy": "Hero: Get Your Free Quote. Mid-article: /buy/scan. End: Contact form preset service=roofing."
}
```

### Step 7: Generate
Claude Sonnet 4.6 call with prompt caching:
- **Tier 1 (cached long):** brand voice guide + voice corpus (existing Hamilton site content), forbidden-phrase list, schema templates, internal link conventions.
- **Tier 2 (cached per city):** city spine JSON (`seo/data-spine/{citySlug}.json`).
- **Tier 3 (per call):** content brief + competitor teardown + target keywords.

Output: Markdown with YAML frontmatter containing title, meta, canonical, tags, schema JSON-LD blocks, internal-link block. Saved to `seo/drafts/{pageSlug}.md`.

### Step 8: QA gates
Run `scripts/qa-page.mjs` against draft. Gates G1-G5 must all pass:

| Gate | Check | Pass criterion |
|---|---|---|
| G1 Completeness | Every item in `mustCover` is present | 100% |
| G2 Uniqueness | 5-gram Jaccard overlap vs corpus | <30% vs any page |
| G3 Factual | Every $, permit #, date, stat has `sourceUrl` within 150 chars | 100% |
| G4 On-page | Title 50-65ch, meta 140-160ch, 1 H1, ≥ target H2 count, all schema valid | 100% |
| G5 Voice | No em dashes in title/H1, no ALL CAPS, no "no X" phrasing, ≤4 "free" mentions, "Get Your Free Quote" CTA present | 100% |

Failure → return to step 7 with gate-specific feedback. Max 3 regenerations. After 3, escalate to human.

### Step 9: Publish
`scripts/ghost-batch-upsert.mjs` pushes the draft to Ghost. Fields updated: `title, meta_title, meta_description, html, canonical_url, tags, feature_image, updated_at`. Idempotent via content hash.

Post-publish:
- Ping IndexNow
- Submit URL to GSC Indexing API
- Ping Bing webmaster
- Update `seo/targets/{pageSlug}.json` status to `published` with `publishedAt` timestamp.

### Step 10: Monitor
Automated check at T+14 days and T+30 days via `scripts/monitor-page.mjs`:
- T+14: Is it indexed? (URL inspection API)
- T+30: Pull GSC data. Did it hit top 20 for primary keyword?
- T+60: Did it hit top 10?

Results written to `seo/targets/{pageSlug}.json` under `metrics`.

### Step 11: Re-enter loop if needed
If T+60 check fails thresholds:
- Re-run SERP pull (rankings may have shifted)
- Identify NEW gap vs current top-3
- Regenerate and republish
- Cap: 3 loop iterations per page before escalating to human strategist

---

## 4. Tool dependencies per agent

Every per-page agent must have authenticated access to:

| Tool | Purpose | Status |
|---|---|---|
| **DataForSEO MCP** | SERP analysis, keyword data, SERP features | Available (`seo-dataforseo` skill) |
| **Google Search Console API** | Current rankings, impressions | Available (service account at `C:/Users/admin/.config/claude-seo/service-account.json`) |
| **Firecrawl MCP** | Crawl competitor pages at scale | Available (`seo-firecrawl` skill) |
| **Ghost Admin API** | Publish content | Available (`.env` GHOST_ADMIN_API_KEY) |
| **Anthropic SDK** | Content generation with prompt caching | Available (requires `ANTHROPIC_API_KEY`) |
| **IndexNow / Bing Webmaster** | Fast indexation signal | Script in Phase 0 |
| **Google Indexing API** | Request GSC crawl | Script in Phase 0 |

**Shared read-only storage:**
- `seo/data-spine/{citySlug}.json` — city-level facts
- `seo/voice-corpus/` — voice anchors extracted from existing Hamilton content (About page, blog posts, service pages)
- `seo/brand-voice.md` — voice guide for prompt caching
- `seo/internal-link-graph.json` — neighbor-city + service-cluster links

**Agent-owned writable storage:**
- `seo/targets/{pageSlug}.json` — the task ledger entry
- `seo/serps/{pageSlug}.json` — SERP snapshot
- `seo/competitors/{pageSlug}/` — competitor crawl cache
- `seo/teardowns/{pageSlug}.md` — analysis
- `seo/drafts/{pageSlug}.md` — generated content

---

## 5. The 387 target pages (scope breakdown)

| Page cluster | Count | Page type |
|---|---|---|
| Existing service cornerstone | 6 | `/{roofing,siding,windows,adu,custom-homes,additions}` |
| Sub-service pages | 23 | `/{service}/{subtype}` (e.g. `/roofing/metal`, `/adu/detached`) |
| City-level service-area pages | 30 | `/service-areas/{county}/{city}` |
| City-service pages | 187 | `/service-areas/{county}/{city}/{service}` |
| City-cost blogs (new) | 150 | `/blog/{service}-cost-{city}` — 30 cities × 5 cost topics |
| Existing cornerstone blogs | 15 | `/blog/{various}` |
| About / contact / legal | ~6 | `/about/*, /contact, /privacy, /terms` |
| **Total in loop** | **~417** | |
| **Priority 387** | | |

The 387 priority set = all ranking-targeted pages. About/contact/legal pages are excluded from the loop (not ranking plays).

---

## 6. Cloud execution architecture: Claude Managed Agents

Running 387 agents serially = weeks. In parallel via **Claude Managed Agents** (Anthropic's cloud-native agent harness, beta as of April 2026) = hours.

### Why Managed Agents

- **Cloud-native, no local resource use.** Sessions run in Anthropic infrastructure, not on the local Claude Code machine.
- **MCP-native.** DataForSEO, Ghost, Firecrawl, GSC MCPs plug in per-Agent definition.
- **Persistent stateful sessions.** Survive across days/weeks — handles the T+14d, T+30d, T+60d re-loop steps without bootstrapping context each time.
- **No hard concurrency cap** — rate limits at 300 creates/min, 600 reads/min per organization, both far above what 387 sessions need.
- **Predictable cost.** $0.08/hr per agent runtime + standard model + tool token costs.
- **Beta header:** `managed-agents-2026-04-01`.

### Architecture

```
                    LOCAL CLAUDE CODE SESSION (this conversation, the coordinator)
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
              1) Define     2) Define     3) Spawn 387
                Agent       Environment    Sessions in waves
            (system prompt,  (DataForSEO,    of 50 concurrent
             SEO loop,       Ghost, Firecrawl,
             tool list)      GSC MCPs)
                                              │
                                 ┌────────────┴────────────┐
                                 ▼                         ▼
                   ANTHROPIC CLOUD (Managed Agents)
                   ┌──────────────────────────────────────────┐
                   │  Session 001: /service-areas/.../oakland/roofing │
                   │  Session 002: /service-areas/.../oakland/siding  │
                   │  Session 003: /service-areas/.../oakland/windows │
                   │  ...                                              │
                   │  Session 387: /blog/siding-cost-petaluma          │
                   └──────────────────────────────────────────┘
                                              │
                                              ▼
                              Each session runs the per-page loop
                              (steps 1-9 in §3) and reports back to
                              seo/targets/{pageSlug}.json + GSC.
```

### Coordinator responsibilities (local Claude Code)

1. Read `seo/targets/*.json`. Filter to `status: pending`.
2. Define one **Agent** template:
   - System prompt = the per-page loop instructions from §3.
   - Tool list = DataForSEO MCP, Firecrawl MCP, Ghost Admin (HTTP), GSC API (HTTP), Anthropic SDK (for content gen step), file I/O for the four storage paths.
3. Define one **Environment**:
   - Container with Node + scripts (`qa-page.mjs`, `ghost-batch-upsert.mjs`, `monitor-page.mjs`).
   - Network access to api.dataforseo.com, ghost-production-42337.up.railway.app, hamilton-exteriors.com, googleapis.com.
   - Read-only mount of `seo/data-spine/`, `seo/voice-corpus/`, `seo/brand-voice.md`.
4. Batch-create Sessions:
   - Wave size = 50 concurrent (initial conservative cap).
   - Each Session input = one `seo/targets/{pageSlug}.json` content.
   - Capture sessionId, monitor via SSE.
5. Collect results, mark `seo/targets/{pageSlug}.json` complete, retry failures up to 3x.
6. Reporter: append per-Session metrics (gates passed, tokens used, runtime) to `seo/dashboard.json`.

### Cost ceiling for the bulk run

- Harness time: 387 pages × ~5 min/page = ~32 agent-hours total.
  - Sequential: 32 hr × $0.08 = **$2.58**.
  - 50-concurrent: ~40 min wall time × 50 sessions × $0.08 = **~$32**.
- Model + tool tokens: see §9 — **~$230** unchanged from prior estimate.
- **Bulk run total: $260–$280** including harness.

### Coordinator skeleton (built in Phase 0d)

```javascript
// scripts/orchestrate-managed-agents.mjs
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({
  defaultHeaders: { 'anthropic-beta': 'managed-agents-2026-04-01' },
});

// 1. Create the Agent definition (one-time)
const agent = await client.beta.managedAgents.agents.create({
  name: 'hamilton-seo-page-agent',
  model: 'claude-sonnet-4-6',
  systemPrompt: PER_PAGE_LOOP_PROMPT,  // §3 of this plan, verbatim
  tools: [
    { type: 'mcp', server: 'dataforseo' },
    { type: 'mcp', server: 'firecrawl' },
    { type: 'http', config: { ghost: { ... }, gsc: { ... } } },
    { type: 'bash' }, { type: 'edit' },
  ],
});

// 2. Create the Environment (one-time)
const env = await client.beta.managedAgents.environments.create({
  name: 'hamilton-seo-env',
  packages: ['node', '@anthropic-ai/sdk', 'jsonwebtoken'],
  files: [
    { path: '/seo/data-spine/', source: './seo/data-spine/' },
    { path: '/seo/brand-voice.md', source: './seo/brand-voice.md' },
    { path: '/scripts/', source: './scripts/' },
  ],
  secrets: ['ANTHROPIC_API_KEY','GHOST_ADMIN_API_KEY','DATAFORSEO_LOGIN','DATAFORSEO_PASSWORD'],
});

// 3. Wave-based session dispatch
const targets = await loadTargets();  // pending only
for (const wave of chunk(targets, 50)) {
  const sessions = await Promise.all(wave.map(t =>
    client.beta.managedAgents.sessions.create({
      agentId: agent.id, environmentId: env.id,
      input: { target: t },
    })
  ));
  await waitForAll(sessions);  // SSE-driven completion
  await persistResults(sessions);
}
```

### Beta caveats

- Managed Agents is beta as of 2026-04. Pin the `anthropic-beta` header. Watch for breaking changes — keep the coordinator small and replaceable.
- If the beta hits unexpected limits, fallback path is Inngest durable functions (already partially configured in this repo via `inngest-skills`). Same per-page loop, different harness.

---

## 7. Phases (revised)

### Phase 0: Infrastructure (blocks all)
Duration: 3-5 days.

- 0a. Target file seeder: creates all 387 `seo/targets/*.json` skeletons with primary keywords.
- 0b. Data spine skeleton for 30 cities (permits, climate, demographics, neighborhoods). Scraper + human fill-in.
- 0c. Voice corpus extraction — pull existing published Hamilton content (About page, blog posts, service pages) into `seo/voice-corpus/` for prompt-cache anchoring. No new interviews required.
- 0d. Per-page agent executor system prompt (the Managed Agent's system prompt) — implements steps 1-9 of the loop.
- 0e. QA pipeline (`scripts/qa-page.mjs`) with G1-G5. Bundled into the Environment so each Session can run it.
- 0f. Monitor script (`scripts/monitor-page.mjs`) for step 10.
- 0g. Coordinator (`scripts/orchestrate-managed-agents.mjs`) — defines Agent + Environment, dispatches Sessions in waves of 50, collects results, retries failures.
- 0h. `brand-voice.md` — 3-5 Alex-written samples + rules.
- 0i. Wire MCP servers (DataForSEO, Firecrawl, Ghost, GSC) into the Environment definition.

Exit: Phase 1 proof-of-concept city can be kicked off end-to-end.

### Phase 1: Pilot — 10 pages, 1 city
Duration: 2-3 days. Tight feedback loop.

- Run the loop on 10 Oakland-related pages:
  - `/service-areas/alameda-county-ca/oakland-ca` (city page)
  - `/service-areas/alameda-county-ca/oakland-ca/{roofing, siding, windows, adu, custom-homes, additions, decks}` (7 city-service)
  - `/blog/roof-replacement-cost-oakland` (new)
  - `/blog/adu-cost-oakland` (new)
- Monitor each page through QA gates.
- Alex spot-reviews all 10.
- **Gate:** All 10 pass G1-G5 + Alex approval. If not, fix the pipeline, not the pages.

### Phase 2: Vertical pilot — roofing across 30 cities
Duration: 1 week.

- Run loop on 30 `/service-areas/{county}/{city}/roofing` pages + 30 new `/blog/roof-replacement-cost-{city}` blogs = 60 pages.
- Ship in waves of 10/day.
- Monitor Phase 1 pages at T+14d: indexation rate must be ≥60% before Phase 2 ships.

### Phase 3: Full parallel — remaining 317 pages
Duration: 2-3 weeks with cloud parallelism.

- Enqueue all remaining page-targets.
- Worker swarm runs 20-50 concurrent jobs.
- Alex reviews 1-in-5 randomly sampled pages per wave.

### Phase 4: Monitoring + refresh loop (ongoing)
- Every page at T+30d re-enters step 10 (monitor).
- Pages that don't hit top 20 at T+60d re-enter step 3 (new SERP pull) and loop.

---

## 8. Quality gates (revised for SERP-driven approach)

| Gate | Stage | Criterion |
|---|---|---|
| G0: Target well-formed | Phase 0 | `primaryKeywords` non-empty, pageUrl exists or will exist |
| G1: Brief completeness | Step 6 | All teardown gaps addressed in brief |
| G2: Content uniqueness | Step 8 | <30% 5-gram overlap with any corpus page AND all cited data in data-spine |
| G3: Factual | Step 8 | Every $, %, permit #, date, stat has sourceUrl |
| G4: On-page SEO | Step 8 | Title/meta/H1/schema/link-count all pass lint |
| G5: Voice/rules | Step 8 | No em-dash in title/H1, no ALL CAPS, no "no X", CTA present |
| G6: Strictly better than #1 | Step 8 | Page meets or exceeds every signal in teardown table |
| G7: Alex spot-review | Per wave | 1-in-5 sample approved |
| G8: Indexation | T+14d | URL indexed per GSC URL inspection |
| G9: Ranking | T+60d | In top 20 for primary keyword, else loop |

**G6 is the load-bearing gate** — if the draft doesn't strictly dominate the teardown, it won't rank. Auto-computed from comparing draft signals to competitor table.

---

## 9. Monitoring, budget, and guardrails

### Cost ceiling
- Content generation: ~50k input tokens (cached) + ~10k output tokens per page.
- At Sonnet 4.6 pricing: ~$0.20 per page → **$80 for 387 pages**.
- SERP pulls (DataForSEO): ~$0.10 per SERP × 3 keywords per page = $0.30/page → **$120**.
- Firecrawl: ~$0.015 per crawl × 5 competitors per page = $0.075/page → **$30**.
- **Total bulk run: ~$230** for one full pass of 387 pages.

### Rate limits
- DataForSEO: 2000 SERP/month on standard plan — 387 pages × 3 keywords = 1,161. Within limit.
- Anthropic: tier-based; 40M tokens/day Sonnet is ample.
- GSC URL inspection: 2000/day limit. OK for one run.
- Ghost API: unlocal rate limit, no concern.

### Failure handling
- Each step is retry-safe (idempotent writes under `seo/{stage}/{pageSlug}.*`).
- Step failures logged to `seo/failures.jsonl` with last-3 attempts' errors.
- 3 consecutive failures on same page → dead-letter queue, human review.

### Observability
- `seo/dashboard.json` regenerated every 15 min by monitor — shows % complete per phase, avg time-per-page, failure rate.
- Weekly `seo/reports/week-{ISO}.md` summarizes traffic/ranking/indexation deltas.

---

## 10. Success metrics (unchanged)

| Metric | Baseline | 30d | 90d | 180d |
|---|---|---|---|---|
| Sitemap URLs with GSC impressions | 60/287 (21%) | 140/437 (32%) | 280/437 (64%) | 380/437 (87%) |
| Pages in top 20 | 26 | 70 | 180 | 300 |
| Pages in top 10 | 15 | 35 | 90 | 180 |
| GSC clicks (28d rolling) | ~20 | 80 | 350 | 900 |
| OP lead_form_submitted (28d, US clean) | 11 | 25 | 70 | 150 |

---

## 11. What differs from v1 of this plan

- v1 assumed we knew what each page needed. v2 **reverse-engineers from live SERPs** — no guessing.
- v1 had template-then-publish flow. v2 has **teardown-then-dominate** flow, with G6 "strictly better than #1" as a hard gate.
- v1 focused on batch content. v2 treats **each page as an independent agent job** — cloud-parallel, retry-safe.
- v1 assumed static rankings. v2 has a **monitoring+re-loop** step: if T+60d doesn't hit top 20, pull fresh SERP and retry.

---

## 12. First 72 hours (revised)

1. **Hour 0-6:** Build target seeder. Generate all 387 `seo/targets/*.json` with primary keywords from (a) current GSC queries if any, (b) DataForSEO keyword research per (city, service) intent.
2. **Hour 6-14:** Data spine skeleton for 30 cities — permit fee scrape + climate data + neighborhood list. Voice corpus extraction from existing Hamilton site.
3. **Hour 14-30:** Build the per-page agent executor script. This is the main unit of work: one function that takes a target file and runs steps 1-9.
4. **Hour 30-42:** Build QA pipeline (G1-G6). Unit-test against a hand-written Oakland roofing draft.
5. **Hour 42-60:** Run the loop on ONE page (`/service-areas/alameda-county-ca/oakland-ca/roofing`) end-to-end. Iterate until it passes all gates + Alex approves.
6. **Hour 60-72:** Expand to 10 Oakland pages (Phase 1 scope). Validate orchestrator.

If hour-72 deliverable is 10 Oakland pages passing gates, Phase 2 kicks off.

---

## 13. Open decisions

1. **Primary-keyword source.** GSC queries only, or blend with DataForSEO research? Blend is better for greenfield pages with no GSC history yet.
2. **Competitor set exclusions.** Exclude directory aggregators (Angi, HomeAdvisor, Yelp, Thumbtack, Houzz)? Default yes, but track them separately for backlink opportunities.
3. **Alex bandwidth.** No structured interviews. ~5 hours total, mostly 1-in-5 page spot reviews + occasional just-in-time async questions when a specific page hits G6 due to a competitor expertise gap that public data can't fill. Confirmed?
4. **Ghost vs Astro for new cost blogs.** Keep all in Ghost (current pattern) or mix? Recommend: all Ghost for consistency.
5. **Refresh cadence.** Quarterly full-spine refresh + monthly rankings check + weekly failures review.

(Execution-platform decision resolved: **Claude Managed Agents** — see §6.)

---

## End of plan v2

Execution unit: per-page agent loop. Execution scale: 387 pages parallel in the cloud. Quality bar: every page must strictly dominate the current SERP winner on every ranking signal identified in teardown, or it doesn't ship.
