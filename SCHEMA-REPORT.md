# Hamilton Exteriors -- Schema Markup Report

**Date:** April 5, 2026
**Method:** Live JSON-LD extraction from 4 page types (homepage, service, blog, pSEO)
**Format:** JSON-LD only (no Microdata or RDFa detected)

---

## Schema Inventory

### Homepage (6 JSON-LD blocks)

| # | @type | Status | Rich Result Eligible |
|---|-------|--------|---------------------|
| 1 | `["RoofingContractor", "GeneralContractor"]` | Valid | Yes (Local Business) |
| 2 | `WebSite` + `SearchAction` | Valid | Yes (Sitelinks Search Box) |
| 3 | `ImageGallery` (Siding project) | Valid schema.org, **not a Google rich result type** | No |
| 4 | `ImageGallery` (Windows project) | Same | No |
| 5 | `ImageGallery` (Roofing project) | Same | No |
| 6 | `FAQPage` (4 Qs) | Valid | **No** -- restricted to gov/health since Aug 2023 |

### Service Pages (/roofing -- 8 JSON-LD blocks)

| # | @type | Status | Rich Result Eligible |
|---|-------|--------|---------------------|
| 1 | `BreadcrumbList` | Valid | Yes |
| 2 | `WebPage` | Valid | Yes |
| 3 | `["RoofingContractor", "GeneralContractor"]` (full) | Valid | Yes |
| 4 | `Service` + `AggregateOffer` | Valid | Partial (see issues) |
| 5 | `FAQPage` (11 Qs) | Valid | **No** -- restricted |
| 6-8 | `ImageGallery` x3 | Not a Google type | No |

### Blog Posts (4 JSON-LD blocks)

| # | @type | Status | Rich Result Eligible |
|---|-------|--------|---------------------|
| 1 | `BlogPosting` | Valid | Yes (Article) |
| 2 | `BreadcrumbList` | Valid | Yes |
| 3 | `FAQPage` (5 Qs) | Valid | **No** -- restricted |
| 4 | `["RoofingContractor", "GeneralContractor"]` (@id only) | Valid | N/A (reference) |

### pSEO Pages (7 JSON-LD blocks)

| # | @type | Status | Rich Result Eligible |
|---|-------|--------|---------------------|
| 1 | `BreadcrumbList` (5-level) | Valid | Yes |
| 2 | `["RoofingContractor", "GeneralContractor"]` (@id only) | Valid | N/A (reference) |
| 3 | `Service` + city-scoped `areaServed` | Valid | Partial |
| 4 | `FAQPage` (9 Qs, city-specific) | Valid | **No** -- restricted |
| 5-7 | `ImageGallery` x3 | Not a Google type | No |

---

## Validation Results

### Passing (22 checks)

- All blocks use `@context: "https://schema.org"` -- correct
- All `@type` values are valid schema.org types
- `@id` anchoring across entities (`#business`, `#founder`, `#website`, `#service`, `#article`) -- excellent entity graph coherence
- Org `address`: Full PostalAddress with all required fields including unit number
- Org `geo`: 5-decimal precision coordinates (37.69427, -122.07887)
- Org `aggregateRating`: `ratingValue`, `reviewCount`, `bestRating`, `worstRating` all present
- Org `openingHoursSpecification`: Proper weekday + Saturday blocks with ISO time format
- Org `hasMap`: Google CID URL (3578771346418026097)
- Org `sameAs`: 5 URLs (Facebook, Instagram, LinkedIn, Yelp, CSLB)
- Org `logo`: ImageObject with dimensions (600x120)
- Org `paymentAccepted`: 4 methods
- Org `areaServed`: 6 County nodes with Wikipedia `sameAs` -- excellent
- Org `hasCredential`: CSLB license with `recognizedBy` -- strong trust signal
- BlogPosting `author`: Person with CSLB credential, LinkedIn sameAs, worksFor
- BlogPosting `publisher`: Organization with logo ImageObject (600x120) -- meets Article rich result requirements
- BlogPosting `dateModified`: ISO 8601 from Ghost `updated_at`
- BlogPosting `wordCount`: Computed from HTML content
- Service `areaServed` on pSEO: City-scoped with geo coordinates -- excellent local signal
- Service `offers`: `AggregateOffer` with `priceCurrency: "USD"`, lowPrice/highPrice
- BreadcrumbList: Present on all pages, proper ListItem hierarchy
- Review `author`: All typed as `@type: "Person"` with name
- All URLs absolute, all dates ISO 8601

### Issues Found

#### HIGH

**1. `ImageGallery` is not a Google-supported rich result type**
- Pages affected: Homepage (3), every service page (3), every pSEO page (3) = ~1,950+ wasted blocks
- Valid schema.org but Google ignores entirely for rich results
- Bloats page source by ~4KB per page x 650+ pages = ~2.6MB across site
- **Fix:** Remove ImageGallery blocks. Attach images as `image: [ImageObject, ...]` on the org or Service entity

**2. Duplicate `aggregateRating` -- org entity AND Service entity**
- /roofing Service has `aggregateRating` (4.8/52) duplicating the org entity's identical rating
- All pSEO Service blocks carry the same duplicate
- Google recommends `aggregateRating` on the primary LocalBusiness entity only, not on nested Service
- **Fix:** Remove `aggregateRating` from all Service schema blocks

**3. Blog FAQ answers repeat question text as prefix**
- Example: `"text": "How Much Does a Roof Replacement Cost in the Bay Area? For a typical..."`
- Wastes answer display space and looks redundant
- **Fix:** Strip H2 heading text from FAQ answer extraction in `[slug].astro`

#### MEDIUM

**4. FAQPage on commercial pages -- no SERP benefit**
- Restricted to gov/health since August 2023
- Present on: homepage, all service pages, all blog posts, all pSEO pages
- Not harmful; useful for AI/LLM citation extraction
- **Action:** Keep for AI discoverability. Do not invest effort adding more.

**5. Missing `contactPoint` on org entity**
- Google LocalBusiness docs recommend `contactPoint` with `contactType`
- **Fix:** Add to Layout.astro org block:
```json
"contactPoint": {
  "@type": "ContactPoint",
  "telephone": "+16509773351",
  "contactType": "customer service",
  "areaServed": "US",
  "availableLanguage": "English"
}
```

**6. Org `image` points to generic `og-default.jpg`**
- Should reference branded hero image
- **Fix:** Update to hero image URL in Layout.astro org block

#### LOW

**7. `articleSection` defaults to "Home Improvement" on blog posts**
- Falls back when Ghost primary tag is slug-style
- Could be more specific ("Roofing", "Cost Guide")
- **Fix:** Ensure Ghost primary tags have human-readable names

---

## Fixes Applied This Session (not yet deployed)

| Fix | File |
|-----|------|
| `hasCredential` expanded to array: CSLB + Tesla Powerwall + GAF + Owens Corning + James Hardie | Layout.astro |
| `knowsAbout` upgraded: 6 entries linked to Wikipedia entities | Layout.astro |
| `twitter:site` meta tag added | Layout.astro |
| `geo.position` meta tag added | Layout.astro |

---

## Schema Score: 78 / 100

| Area | Score |
|------|-------|
| Coverage breadth (types used) | 23/25 |
| Correctness (valid JSON-LD, no errors) | 22/25 |
| Rich result eligibility | 16/25 |
| E-E-A-T signals in schema | 17/25 |
| **Total** | **78/100** |

After deploying local changes + fixing ImageGallery + removing duplicate aggregateRating + adding contactPoint: estimated **87/100**.

---

## Remaining Recommended Actions

| Priority | Action | Effort | Impact |
|----------|--------|--------|--------|
| HIGH | Remove ImageGallery blocks, attach images to org/Service | 30 min | +4 pts |
| HIGH | Remove aggregateRating from Service schema | 15 min | +2 pts |
| MEDIUM | Add contactPoint to org schema | 5 min | +1 pt |
| MEDIUM | Strip question prefix from blog FAQ answers | 15 min | +1 pt |
| LOW | Update org image from og-default.jpg to hero | 5 min | +1 pt |
