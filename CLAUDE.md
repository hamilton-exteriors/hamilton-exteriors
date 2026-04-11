# Hamilton Exteriors

## Backlog

Always check backlog before starting work. Backlog is at:
`C:/Users/admin/.claude/projects/C--Users-admin/memory/project_hamilton_roof_backlog.md`

If items exist, remind the user and offer to work through them first.

## Project

- **Stack:** Astro 6.1 + Tailwind v4, SSR on Railway
- **CMS:** Ghost (headless) — blog posts + service area page data. You have Ghost Admin API access (GHOST_ADMIN_API_KEY in .env). Use it proactively for content tasks — creating/updating blog posts, managing service area pages, publishing drafts. Ghost actions first before code changes when content is involved.
- **Package manager:** bun only — never npm. Railway uses `bun install --frozen-lockfile`.
- **Backend:** `backend/` — Express + TypeScript, Google Solar API + Reviews pipeline
- **Branch:** `main` only (Railway deploys from main)
- **Repo:** `hamilton-exteriors/hamilton-exteriors` on GitHub
- **Design system:** Green (#256346) / Yellow (#FFDE21) / Cream (#F4F1EB) / Charcoal (#1A1A1A)
- **Fonts:** THE BOLD FONT (display + headings), DM Sans (body), Satoshi (labels) — 3 fonts max, no others

## Key pages

- `/buy` — Landing page (persuasion: hero, comparison, reviews, FAQ)
- `/buy/scan` — Focused scanner (address → roof scan → choose shingle → purchase)

## Rules

- Never push to master — main only
- No icons next to page titles
- Prices are per roofing square from BackOffice catalog seed data
- Mapbox token via `PUBLIC_MAPBOX_TOKEN` env var, never hardcoded
- Logo link context: Navbar has a `logoHref` prop. Use `/buy` on scan page, `/blog` on blog pages. Default is `/`.
- CSS font variable is `--font-hamilton-display` (Tailwind class: `font-hamilton-display`). Never use `font-oswald`.
- Add-on prices on scan page scale by roof measurements (eave/ridge LF), not fixed values
- Mapbox autocomplete bbox covers all California (`-124.5,32.5,-114.0,42.0`), not just Bay Area

## Design Context

### Users
Bay Area homeowners across three segments: affluent (premium quality), price-conscious (transparency), and anxious first-timers (trust/guidance). The site must serve all three simultaneously.

### Brand Personality
**Trustworthy, Premium, Warm.** High-end contractor that feels approachable and human. Confident but not pushy, knowledgeable but not condescending.

### Anti-references
NOT: generic contractor site, overly corporate, cheap/discount vibe, over-designed startup.

### Design Principles
1. **Trust at first glance** — real photos, social proof, clear pricing, no hidden anything
2. **Warm premium, not cold luxury** — elevated but welcoming, natural palette, conversational copy
3. **Clarity over cleverness** — obvious interactions, no mystery navigation, respect the $15k-$80k decision
4. **Substance over decoration** — every element earns its place by communicating something useful
5. **Mobile-first, always** — phone is the primary design surface

### Copy & Tone Rules
- **Never** use ALL CAPS for emphasis (FREE, GUARANTEED) — always sentence case
- **Never** use defensive "no X" phrasing (no surprises, no obligation, no hidden fees) — signals insecurity
- **Never** use unverifiable superlatives (top, best, #1) — use factual differentiators (architect-led, CSLB #1082377)
- **Never** lead with discount/price as headlines ($0 Down, Limited Time) — mention in body copy only
- **Never** use generic contractor boilerplate (quality workmanship, customer satisfaction, your dream home)
- Standardize CTA to "Get Your Free Quote" everywhere — max 3-4 "free" instances per page
- Announcement bars signal demand ("Now Booking Summer 2026") not discounts
- FAQ answers under 80 words, no keyword-stuffed city lists
- Font alias: display font is "Hamilton Display" in CSS (`--font-hamilton-display` variable)

### Accessibility
WCAG 2.1 AA. 4.5:1 contrast for body text, keyboard nav, meaningful alt text, respect `prefers-reduced-motion`.

Full design context with tokens and spacing in `.impeccable.md`.
