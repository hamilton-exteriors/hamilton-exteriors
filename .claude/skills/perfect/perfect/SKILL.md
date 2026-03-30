---
name: perfect
description: Audit-first quality harness. Screenshots, scores, dispatches impeccable sub-skills, fix-loops until 90%. Adds landing-page-specific checks (CRO, local SEO, copy, pre-launch) on top of the core impeccable pipeline. Use when told to "make it perfect."
user-invocable: true
args:
  - name: area
    description: The feature, page, section, or component to perfect
    required: false
---

Thin orchestrator over the impeccable design skills. Screenshot → score → dispatch sub-skills → fix loop → verify.

**THE #1 RULE: Bold, never safe.**

Every fix, every scoring decision, every sub-skill dispatch must pass this filter: "Did I make it cleaner without making it boring?" If the answer is yes, you went too far. Push it back.

- Don't shrink things that should command attention. A phone number is a CTA — size it like one.
- Don't use `text-sm` when `text-xl` is what the element's importance demands.
- Don't mute colors to "look professional." Yellow (#FFDE21) on green (#245945) is the brand. Use it.
- Don't default to subtle when confident is right. THE BOLD FONT exists for a reason.
- Structure and symmetry ARE important — but they serve the boldness, not replace it.
- If you find yourself making everything 14px, muted white, and evenly spaced — you're playing it safe. Stop and ask: "Would this impress someone walking past on their phone?"

```
Phase 1: Screenshot → Audit → Score → Fix Loop until 90%
Phase 2: Harden + Optimize
Phase 3: Polish + Delight + Pre-Launch + Verify
```

---

## Phase 1: Screenshot → Audit → Score → Fix Loop

### Step 1: Screenshot

Take screenshots FIRST. You cannot audit what you haven't seen.
- Playwright: desktop (1440px) and mobile (390px)
- Read each screenshot. Actually look at it.

### Step 2: Audit

Run `/audit` on the target area for the core checks (a11y, performance, responsive, theming, anti-patterns).

Then layer on these **landing-page-specific checks** that the core audit doesn't cover:

**CRO & Conversion:**
- CTA repeated through page (hero, mid, after proof, footer)? Action verbs on buttons ("Get My Free Estimate" not "Submit")?
- Form fields minimal (≤ 4)? Phone as secondary CTA (click-to-call)?
- Multiple contact channels visible (form + phone + email)?

**Local SEO & Structured Data:**
- LocalBusiness JSON-LD with NAP, geo coordinates, hours, aggregateRating?
- Title/H1 include "[Service] in [City]" for local pages?
- Canonical URL, OG tags, Twitter Card tags set?

**Copy Quality:**
- Benefits over features? Specific promises with numbers ("3-5 day install" not "fast service")?
- No AI slop words (leverage, utilize, innovative, cutting-edge, streamline)?
- Sounds like a contractor talking to a homeowner, not a marketer?
- Copyright year current? No placeholder URLs?

**Mobile Safe Areas:**
- Sticky/fixed elements account for iPhone notch and home indicator (`env(safe-area-inset-bottom)`)?
- Form inputs scroll into view when keyboard opens?

### Step 3: Score

Run `/critique` on the target area for the design effectiveness score.

Then score these **landing-page dimensions** on top:

| Dimension | Score | What matters |
|-----------|-------|--------------|
| **Above-the-fold conversion** | ?/5 | Headline + CTA + phone visible in 2s? Benefit-driven? Real hero? |
| **Trust & social proof** | ?/5 | Reviews near CTAs? Certs? Real names/photos on testimonials? |
| **Copy quality** | ?/5 | Specific? Contractor voice? No AI slop? |
| **CTA design & friction** | ?/5 | Repeated? Action verbs? Minimal form? Click-to-call? |
| **Local SEO & schema** | ?/5 | JSON-LD? City in H1? Heading hierarchy? |
| **Core Web Vitals** | ?/5 | LCP < 2.5s? CLS < 0.1? Images optimized? |
| **Mobile UX** | ?/5 | 48dp targets? Thumb zone? Safe areas? No overflow? |
| **Visual proof & media** | ?/5 | Real project photos? No stock? |
| **Typography & hierarchy** | ?/5 | Proper scale? Sizes proportional to importance? Weight contrast strong? Elements sized to match their importance — CTAs and headings should COMMAND, not whisper? |
| **Brand boldness** | ?/5 | Does it feel like Hamilton — or could it be any contractor? Is THE BOLD FONT doing work? Yellow accent visible? Phone number sized like a CTA? Would a homeowner scrolling fast stop here? Playing it safe = 2/5 max. |
| **AI slop** | pass/fail | Generic? Gradient text? Stock? Buzzwords? Everything 14px and muted? |

**For sections, score only applicable dimensions. Adjust denominator.**

### Step 4: Fix Loop

```
while total < 90% of max:
  1. Pick lowest-scoring dimension
  2. Dispatch the right sub-skill:
     - Typography issues → /typeset
     - Spacing/layout issues → /arrange
     - Responsive issues → /adapt
     - Design system violations → /normalize
     - Copy issues → /clarify
     - Visual hierarchy → /critique then fix
     - Color issues → /colorize
     - Too safe/boring → /bolder
     - Brand boldness low → /bolder then /typeset
  3. One dimension per iteration
  4. Re-score after fix
  5. If no improvement: revert, try different approach
  6. Stop after 3 consecutive no-gain iterations
```

**Exit when:** Score ≥ 90% of max.

---

## Phase 2: Harden + Optimize

Run `/harden` on the target — text overflow, form edge cases, viewport extremes, missing assets.

Run `/optimize` on the target — images (Astro `<Image>`, loading attributes), fonts (only used weights, WOFF2, `font-display: swap`), CSS/JS (no unused, scripts deferred), Core Web Vitals.

---

## Phase 3: Polish + Delight + Pre-Launch + Verify

### Polish
Run `/polish` on the target — alignment, spacing consistency, interaction states, content quality.

### Delight
Subtle moments that build trust. NOT flashy — warm, professional:
- Hover on CTA buttons: subtle scale or color shift
- Form submit: brief success state with confirmation message
- Focus states in brand yellow (#FFDE21)
- Footer newsletter: friendly confirmation after subscribe

Rules: respect `prefers-reduced-motion`. Never delay the user. Professional warmth, not playful. Restraint is key.

### Pre-Launch Checks
These are things no sub-skill covers:
- Favicon present (`/favicon.ico` + `/favicon.svg`)
- OG tags and Twitter Cards on every page
- Social share preview looks correct
- No broken links (every `<a href>` resolves)
- Custom 404 page exists
- GTM/GA firing
- Forms submit to real endpoints
- All phone numbers use `tel:`, emails use `mailto:`
- robots.txt and sitemap.xml present
- SSL valid, no mixed content
- Console clean in production

### Verify
Take fresh screenshots (desktop + mobile). Compare before/after.

---

## Output

```
=== PERFECT: [area] ===

Audit: /audit score, + N landing-page issues
Critique: /critique score
Fix loop: N iterations, sub-skills dispatched: [list]

Scorecard:
| Dimension                  | Before | After |
|----------------------------|--------|-------|
| [applicable dimensions]    |  ?/5   |  ?/5  |
| AI slop                    |  p/f   |  p/f  |
| **Total**                  |  ?/?   |  ?/?  |

Harden: /harden — N edge cases
Optimize: /optimize — CWV summary
Polish: /polish — N fixes
Pre-launch: N items checked

Status: SHIP IT | NEEDS WORK
```

---

## Hamilton Exteriors Design System

**Fonts (3 only):** THE BOLD FONT (headings/display), DM Sans (body), Satoshi (labels)
**Colors:** Green #256346, Yellow #FFDE21, Cream #F4F1EB, Charcoal #1A1A1A, Green Dark #245945
**No terracotta. No Fraunces/Instrument Serif/Poppins/Inter/Montserrat/Playfair/Oswald.**
**Bold, never safe.** Clean AND bold. Don't sand off the personality.
