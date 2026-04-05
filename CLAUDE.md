# Hamilton Exteriors

## Backlog

Always check backlog before starting work. Backlog is at:
`C:/Users/admin/.claude/projects/C--Users-admin/memory/project_hamilton_roof_backlog.md`

If items exist, remind the user and offer to work through them first.

## Project

- **Stack:** Astro 6.1 + Tailwind v4, SSR on Railway
- **CMS:** Ghost (headless) — blog posts + service area page data
- **Package manager:** bun only — never npm. Railway uses `bun install --frozen-lockfile`.
- **Backend:** `roof-scan/backend/` — Express + TypeScript, Google Solar API pipeline
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

### Accessibility
WCAG 2.1 AA. 4.5:1 contrast for body text, keyboard nav, meaningful alt text, respect `prefers-reduced-motion`.

Full design context with tokens and spacing in `.impeccable.md`.
