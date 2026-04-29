# Hamilton Exteriors — Brand Voice & Content Rules

This document is included in the prompt-cache for every per-page agent. It defines voice, forbidden patterns, and required signals.

## Brand identity

**Trustworthy, Premium, Warm.** High-end Bay Area design-build contractor. Architect-led. Confident but not pushy, knowledgeable but not condescending. Approachable and human.

**Anti-references:** generic contractor site, overly corporate, cheap/discount vibe, over-designed startup.

## Owner / Author

- **Alex Hamilton Li**, Architect & General Contractor
- **CSLB License #1078806**
- Company: Hamilton Exteriors
- Phone: (650) 977-3351
- Areas served: Bay Area (6 counties: Alameda, Contra Costa, Marin, Napa, Santa Clara, Sonoma)

Use Alex's bio + license number as E-E-A-T anchor on city/service pages where credentials matter.

## Audience

Bay Area homeowners across three segments. Content must serve all three:
1. **Affluent** — values premium quality, design, and architect-led process
2. **Price-conscious** — values transparency, clear pricing, no hidden fees
3. **First-time/anxious** — values trust, guidance, education

## Design principles (apply to copy, not just visuals)

1. **Trust at first glance** — real photos, social proof, clear pricing, no hidden anything
2. **Warm premium, not cold luxury** — elevated but welcoming, conversational
3. **Clarity over cleverness** — obvious meaning, no jargon without definition, respect the $15k–$80k decision
4. **Substance over decoration** — every paragraph earns its place by communicating something useful

## Hard rules — content MUST follow

### Forbidden patterns

- **No ALL CAPS** for emphasis. Sentence case only. Even "FREE" or "GUARANTEED."
- **No em dashes** in titles, H1s, or hero headlines. Use periods, commas, or pipes.
- **No defensive "no X" phrasing.** Don't write "no surprises," "no obligation," "no hidden fees." Signals insecurity.
- **No unverifiable superlatives.** No "top," "best," "#1," "leading." Use factual differentiators: "architect-led," "CSLB #1078806," "30 Bay Area cities served."
- **No discount/price as headline.** Don't lead with "$0 Down," "Limited Time," etc. Pricing belongs in the body.
- **No generic contractor boilerplate.** Don't write "quality workmanship," "customer satisfaction," "your dream home."
- **Max 4 instances of "free"** per page. CTA standard: "Get Your Free Quote."
- **No dishonest urgency.** Announcement bars signal real demand ("Now Booking Summer 2026"), not fake countdowns.

### Required patterns

- **Title:** 50–65 characters. Format: "{City} {Service} | {Differentiator} | Hamilton Exteriors". No em dashes.
- **Meta description:** 140–160 characters. Lead with the city + service noun. End with CSLB #1078806 or "Free on-site estimate."
- **H1:** Exactly one. Unique to the page. Topical, not promotional.
- **CTA:** Standard text "Get Your Free Quote." Above the fold + at least one mid-page + at end.
- **Phone CTA:** Visible on mobile, formatted "(650) 977-3351."
- **Author bio:** Pages with E-E-A-T weight (cost guides, service pages) reference Alex Hamilton Li + CSLB #1078806.

## FAQ answer style

- Each answer ≤ 80 words.
- Lead with the direct numeric or yes/no answer in the first sentence.
- Cite the source (city building dept URL, CalFire, CEC, etc.) where relevant.
- Do not stuff city lists or keyword variants into FAQ answers.

## Pricing language

- Always cite a range, never a single number.
- Format: "$X,000 to $Y,000" (with comma thousands).
- When citing per-unit pricing: "$X to $Y per square foot" or "$X to $Y per roofing square."
- Always note what's included/excluded ("permits, tear-off, and disposal included; structural repair extra").
- When citing competitor or industry data, link the source.

## Schema requirements

Every page must include valid JSON-LD blocks. **Server-rendered**, not JS-injected (per Google Dec 2025 guidance — JS-injected schema faces delayed indexing).

### Required per page type

- `BreadcrumbList` — every page
- `Service` — city-service pages, service cornerstone pages
- `LocalBusiness` — city-level and city-service pages, with `areaServed` = city
- `Article` or `BlogPosting` — cost blogs and informational blogs (use Article for evergreen, BlogPosting for time-sensitive)
- `Organization` + `Person` (Alex) — on About page; reference via `@id` on other pages

### `FAQPage` — restricted use only

FAQPage rich results were restricted to gov + healthcare in Aug 2023. **Do not use FAQPage for Google rich results expectation.** It IS still parsed by AI engines (ChatGPT, Perplexity, Bing Copilot, AI Overviews) for passage extraction, so:

- Use `FAQPage` schema **only** when the page has a real Q&A section with ≥3 distinct questions covering varied intents
- Mark it up for AI citation, not Google rich snippets
- Never make FAQPage a required gate signal — body markup with proper H2/H3 hierarchy is the primary citability mechanism

### Never recommend (deprecated)

- `HowTo` (Sept 2023)
- `SpecialAnnouncement` (July 2025)
- `CourseInfo`, `EstimatedSalary`, `LearningVideo`, `ClaimReview`, `VehicleListing`, `Practice Problem`, `Dataset` (2025 retirements)

Validate every JSON-LD block against schema.org spec before publish.

## Internal linking

Every page ends with a contextual "Related" block linking to:
- Parent (county or service cornerstone)
- 2–3 sibling pages (neighbor cities for the same service, OR sibling services in the same city)
- The relevant cost guide
- The relevant case study or detail page if available

Anchor text must be specific and contextual. Avoid generic "click here" or "learn more."

## Voice samples

Existing Hamilton Exteriors content already exemplifies the voice. Voice corpus extracted from these is included in the prompt cache:

- About page: `/about/alex-hamilton-li`
- Existing cost blogs: `/blog/roof-replacement-cost-bay-area`, `/blog/adu-cost-bay-area`, `/blog/second-story-addition-cost-bay-area`
- Service cornerstones: `/roofing`, `/adu`, `/additions`

When generating new content, the agent should match the cadence and specificity of these samples — not invent a new voice.
