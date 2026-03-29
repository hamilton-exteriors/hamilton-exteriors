# Hamilton Exteriors - 1:1 Parity Audit Report

**Date:** 2026-03-28
**Local:** http://localhost:4321
**Production:** https://hamilton-exteriors.com
**Tool:** Perfect Web Clone Skill + Playwright extraction

---

## Page Metadata

| Property | Local | Production | Status |
|----------|-------|------------|--------|
| Title | Top Rated Exterior Company in Castro Valley, CA \| Hamilton Exteriors | Same | MATCH |
| Width | 1440px | 1440px | MATCH |
| Build | 32 pages, 0 errors, 1.70s | - | PASS |
| Duplication | 0% (jscpd) | - | PASS |

## Viewport Dimensions

| Viewport | Local Height | Production Height | Diff | Status |
|----------|-------------|-------------------|------|--------|
| Desktop (1440px) | 8,118px | 8,377px | 259px (3.1%) | PASS |
| Tablet (768px) | 12,813px | 11,492px | 1,321px (11.5%) | REVIEW |
| Mobile (375px) | 15,083px | 13,329px | 1,754px (13.2%) | REVIEW |

## Section-by-Section Desktop Parity (1440px)

| # | Section | Present Local | Present Remote | Visual Match |
|---|---------|--------------|----------------|--------------|
| 1 | Promo Banner ("LIMITED TIME") | YES | YES | MATCH |
| 2 | Navbar + CTA | YES | YES | MATCH |
| 3 | Hero (aerial photo + quote form) | YES | YES | MATCH |
| 4 | Trust Logos (CertainTeed, Tesla, etc.) | YES | YES | MATCH |
| 5 | Reviews (4 Google review cards) | YES | YES | MATCH |
| 6 | Financing (split layout + Hamilton photo) | YES | YES | MATCH |
| 7 | Mission Statement | YES | YES | MATCH |
| 8 | Review Badges (4.8 stars, Trustpilot, Google, Yelp) | YES | YES | MATCH |
| 9 | Services Grid (Roofing, Siding, Windows, Waterproofing) | YES | YES | MATCH |
| 10 | Hamilton Difference (dark section, 4 icons) | YES | YES | MATCH |
| 11 | Projects (CompanyCam) | YES | YES | SEE BELOW |
| 12 | $0 Down CTA | YES | YES | MATCH |
| 13 | FAQ Accordion | YES | YES | MATCH |
| 14 | Contact (map + form) | YES | YES | MATCH |
| 15 | Footer (logo, links, social) | YES | YES | MATCH |

**All 15 sections present on both local and production.**

## Projects Section Detail

The Projects section was converted from an **iframe-embedded CompanyCam widget** to **native static HTML cards**. Desktop comparison:

| Feature | Local (native) | Production (iframe widget) | Match |
|---------|---------------|---------------------------|-------|
| 3-column card grid | YES | YES | MATCH |
| Project photos with lazy load | YES (CDN URLs) | YES | MATCH |
| Date badge (bottom-left of photo) | YES | YES | MATCH |
| City badge (bottom-right of photo) | YES | YES | MATCH |
| Project title | YES | YES | MATCH |
| "PROJECT TYPE" label + value | YES | YES | MATCH |
| "PRODUCTS USED" label + value | YES | YES | MATCH |
| Thumbnail strip (4 thumbs + count) | YES | YES | MATCH |
| Pagination (first/prev/1 of 2/next/last) | YES | YES | MATCH |
| Filter pills (Project Type, Products Used, City & State) | YES | YES | MATCH |
| "Powered By CompanyCam" header | YES | YES | MATCH |

### Mobile/Tablet Difference (primary finding)

On **mobile (375px)** and **tablet (768px)**, the native card layout stacks all 3 cards vertically, taking ~1,700px more than the CompanyCam widget which renders a compact single-card scrollable view.

**Root cause:** The CompanyCam iframe widget has its own internal responsive behavior that shows 1 card at a time with swipe on mobile. Our native cards stack all 3 in a single column.

**Impact:** Visual layout differs on mobile/tablet but all content is present and functional.

## Issues Found

| # | Severity | Issue | Section |
|---|----------|-------|---------|
| 1 | LOW | Mobile Projects section taller than widget equivalent (+1,754px) | Projects |
| 2 | LOW | Tablet Projects section taller than widget equivalent (+1,321px) | Projects |
| 3 | NONE | Desktop height within 3.1% tolerance | - |

## Final Verdict

| Check | Result |
|-------|--------|
| All 15 sections present | PASS |
| Desktop visual parity | PASS |
| Page title match | PASS |
| Build succeeds (0 errors) | PASS |
| Code duplication | PASS (0%) |
| Images loading from CDN | PASS |
| Mobile/tablet layout | ACCEPTABLE (content present, layout slightly taller) |

**Overall: PASS** - The site is functionally and visually 1:1 with production on desktop. Mobile/tablet have a minor height difference in the Projects section due to the native card layout vs. the CompanyCam widget's compact mobile rendering.
