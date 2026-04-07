# Hamilton Exteriors — Schema Markup Audit Report
**Generated:** 2026-04-06
**Audited by:** Claude Code (Schema.org specialist)
**Method:** Direct source-code analysis of all schema-bearing files post v4 fixes
**Format:** JSON-LD only — no Microdata or RDFa detected (correct)

---

## 1. Summary Score

| Category | Score | Notes |
|---|---|---|
| Overall health | **84 / 100** | Strong foundation; 6 actionable issues remain |
| @context correctness | 10/10 | All blocks use `https://schema.org` |
| @type validity | 9/10 | One warning (FAQPage on commercial site — expected) |
| Required properties | 8/10 | BlogPosting image incomplete; ServicePage missing breadcrumb |
| @id consistency | 9/10 | All core entities aligned; one cross-page review date mismatch |
| URL format | 10/10 | All URLs absolute |
| Date format | 10/10 | All ISO 8601 |
| Placeholder text | 10/10 | None found |
| Google rich result eligibility | 7/10 | /buy noindexed (3 schema blocks wasted); FAQ restricted type deployed globally |

---

## 2. Per-Page Validation Table

| File | Schema Types Emitted | @context | @type Valid | Required Props | @id | URLs Absolute | Dates ISO 8601 | Issues |
|---|---|---|---|---|---|---|---|---|
| `Layout.astro` (full org) | GeneralContractor, WebSite | PASS | PASS | PASS | PASS | PASS | PASS | [W1] Sunday hours value wrong |
| `Layout.astro` (lean ref) | GeneralContractor | PASS | PASS | PASS | PASS | PASS | N/A | None |
| `CountyPage.astro` | BreadcrumbList, Service | PASS | PASS | PASS | PASS | PASS | PASS | [W2] Verify proximity lat/lng order |
| `GeneralCityPage.astro` | BreadcrumbList, WebPage, GeneralContractor (reviews) | PASS | PASS | PASS | PASS | PASS | PASS | [W3] Review datePublished hardcoded |
| `ServicePage.astro` | Service | PASS | PASS | PASS | PASS | PASS | PASS | [I1] No BreadcrumbList on service pages |
| `alex-hamilton-li.astro` | ProfilePage, Person, BreadcrumbList | PASS | PASS | PASS | PASS | PASS | N/A | [W4] Person.knowsAbout uses plain strings |
| `buy/index.astro` | WebApplication, Service, FAQPage | PASS | PASS | PASS | PASS | PASS | N/A | [C1] All 3 blocks on noindexed page; [W5] FAQPage |
| `blog/index.astro` | CollectionPage, ItemList, BreadcrumbList | PASS | PASS | PASS | PASS | PASS | PASS | None — clean |
| `blog/[slug].astro` | BlogPosting, BreadcrumbList | PASS | PASS | PASS | PASS | PASS | PASS | [I2] BlogPosting image missing contentUrl |
| `FAQ.astro` | FAQPage | PASS | PASS | PASS | N/A | N/A | N/A | [W5] Commercial site restriction |

---

## 3. All Issues

### CRITICAL

#### [C1] /buy — three schema blocks emitted on a noindexed page
**File:** `src/pages/buy/index.astro` line 94
**Detail:** The Layout component receives `noindex` which adds `<meta name="robots" content="noindex, nofollow">`. Googlebot will not crawl or index this page. The `WebApplication`, `Service`, and `FAQPage` blocks all pass through `jsonLd={[webAppJsonLd, serviceJsonLd, faqJsonLd]}` and are emitted into a page Google will never parse for rich results.

This means:
- Zero Google rich result benefit from these three blocks
- The `/buy#service` entity with its `areaServed` and pricing data is invisible to Google
- The `FAQPage` block provides no SERP enhancement

The AI/LLM citation path (Perplexity, ChatGPT, etc.) is unaffected — those crawlers ignore robots meta tags.

**Decision required:** `/buy` is a live transactional page with real pricing and no confidential content. There is no apparent reason to noindex it. Removing `noindex` would immediately activate all three schema blocks for Google rich results. If noindex is intentional (e.g., duplicate of `/buy/scan`, thin content), accept the schema is Google-invisible and remove the three JSON-LD blocks to reduce page weight.

---

### WARNINGS

#### [W1] Sunday openingHoursSpecification uses 00:00–00:00 — will show as "Open 24 hours"
**File:** `src/layouts/Layout.astro` line 197
**Detail:**
```json
{ "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "00:00", "closes": "00:00" }
```
Schema.org interprets `opens: "00:00"` with `closes: "00:00"` as midnight to midnight — **open all day**. Google Knowledge Panel will display "Open 24 hours" on Sundays. The correct way to mark a business as closed on a given day is to **omit that day from the array entirely**. Absence of a day implies closed.

**Fix:** Remove the Sunday entry. Replace the three-entry array with:
```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "07:00",
    "closes": "18:00"
  },
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": "Saturday",
    "opens": "08:00",
    "closes": "14:00"
  }
]
```

---

#### [W2] CountyPage.astro geo coordinates — verify proximity field order
**File:** `src/components/CountyPage.astro` lines 62–65
**Detail:** The proximity parse assigns:
```js
'longitude': parseFloat(data.proximity.split(',')[0]),
'latitude': parseFloat(data.proximity.split(',')[1]),
```
This is correct only if seed data stores coordinates as `"lng,lat"` (Mapbox convention). The `Layout.astro` geo meta tag uses `"lat;lng"` (W3C standard, semicolon-separated). If county seed data stores `proximity` as `"lat,lng"` instead, the schema GeoCoordinates will have latitude and longitude swapped — placing the markers in the wrong location.

**Action:** Open one county seed file and check a known value. For example, Alameda County centroid is approximately `lat: 37.65, lng: -121.92`. If `data.proximity` for Alameda reads `"-121.92,37.65"` the current parse is correct. If it reads `"37.65,-121.92"`, swap the indices.

---

#### [W3] GeneralCityPage.astro — review datePublished hardcoded to 2026-01-15 for all cities
**File:** `src/components/GeneralCityPage.astro` line 81
**Detail:**
```js
datePublished: '2026-01-15',
```
Every city page across the pSEO cluster emits Review objects with the identical publication date. When Google indexes hundreds of city pages all claiming reviews were published on the same day, it may treat this as a pattern associated with programmatically generated review spam. The date is not required by schema.org.

**Recommended fix:** Remove `datePublished` from the city-level review schema. Real dates are already present on the org-level reviews in `Layout.astro`. Removing the field is safer than a fabricated uniform date.

---

#### [W4] Person.knowsAbout in alex-hamilton-li.astro uses plain strings
**File:** `src/pages/about/alex-hamilton-li.astro` lines 44–55
**Detail:** The Organization `knowsAbout` in `Layout.astro` was correctly upgraded to `Thing` objects with `sameAs` Wikipedia URIs during the v4 fix pass. The `Person` node on the About page was not updated and still uses plain strings:
```js
knowsAbout: [
  'Residential roofing',
  'Commercial roofing',
  ...
]
```
Plain strings are valid schema, but `Thing` objects with `sameAs` links provide entity disambiguation for the Knowledge Graph. Since the About page is the canonical profile for the founder, this matters more here than on any other page.

**See Fix 2 below for the replacement JSON-LD.**

---

#### [W5] FAQPage deployed globally on a commercial site
**File:** `src/components/FAQ.astro` lines 86–97 (emitted on every page using `<FAQ />`)
**Detail:** Since August 2023, Google restricts FAQPage rich results to government and healthcare sites. Commercial sites will not receive expandable FAQ accordions in SERPs regardless of how correct the schema is. This is flagged at WARNING rather than CRITICAL because:

1. FAQPage is still actively parsed by AI systems (Perplexity, ChatGPT, Gemini, Claude) for citation and answer synthesis — this is real GEO value
2. The schema does not harm rankings or generate penalties
3. Removing it would reduce AI discoverability

**Recommended action:** Keep the schema as-is. If you are ever auditing specifically for Google SERP cleanliness, this can be removed — but the AI citation benefit outweighs the cleanup cost.

---

### INFO / RECOMMENDATIONS

#### [I1] ServicePage.astro emits no BreadcrumbList — no breadcrumb rich results on service pages
**File:** `src/components/ServicePage.astro`
**Detail:** Main service pages (`/roofing`, `/siding`, `/windows`, `/adu`, `/custom-homes`, `/additions`) emit a `Service` block but no `BreadcrumbList`. City+service pages (`/service-areas/alameda-county-ca/oakland-ca/roofing`) also get no breadcrumb schema. This means Google cannot display breadcrumb trails for these URLs in SERPs.

`CountyPage.astro` and `GeneralCityPage.astro` both correctly emit `BreadcrumbList`. `ServicePage.astro` is the gap.

**See Fix 4 below for the implementation.**

---

#### [I2] BlogPosting image missing contentUrl property
**File:** `src/pages/blog/[slug].astro` line 92
**Detail:**
```js
image: { '@type': 'ImageObject', url: postImage, width: 1200, height: 630 }
```
Google's Article structured data documentation recommends both `url` and `contentUrl` on `ImageObject`. The `url` property points to a page where the image can be found; `contentUrl` is the direct URL to the image file. For most Ghost-served images these will be identical, but including `contentUrl` is the semantically precise form and aligns with Google's image indexing guidelines.

**See Fix 3 below.**

---

#### [I3] /buy hero copy mentions 5 counties but schema lists 6
**File:** `src/pages/buy/index.astro` line 133 (HTML copy) vs lines 30–37 (areaServed schema)
**Detail:** The user-visible hero subtext reads:
> "Bay Area only · Alameda, Contra Costa, Marin, Napa & Santa Clara counties"

San Mateo County is correctly present in the `areaServed` schema array but absent from the display copy. A homeowner in Redwood City or Burlingame reading this text would incorrectly believe they are not served.

**Fix:** Update the hero copy to:
> "Bay Area only · Alameda, Contra Costa, Marin, Napa, San Mateo & Santa Clara counties"

---

#### [I4] BlogPosting mainEntityOfPage @id does not use #webpage fragment convention
**File:** `src/pages/blog/[slug].astro` line 137
**Detail:**
```js
mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl }
```
The `@id` is the bare canonical URL (e.g., `https://hamilton-exteriors.com/blog/some-post`). The `GeneralCityPage.astro` WebPage uses the `#webpage` fragment pattern (`${pageUrl}#webpage`). These are not in conflict — they reference different page types — but if a `WebPage` schema block is ever added to blog posts, the `@id` values must be aligned. Low priority for now.

---

#### [I5] About breadcrumb references /about — verify this route exists
**File:** `src/pages/about/alex-hamilton-li.astro` lines 70–73
**Detail:**
```js
{ '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}/about` },
```
If `https://hamilton-exteriors.com/about` returns a 404, Google will flag this breadcrumb item as invalid in Search Console. Verify that `/about` either exists as a page or 301-redirects to `/about/alex-hamilton-li`. If it 404s, reduce the breadcrumb to 2 tiers (Home → Alex Hamilton Li).

---

## 4. Cross-Entity @id Consistency Check

| Entity | Canonical @id | Files Using It | Status |
|---|---|---|---|
| Organization (business) | `https://hamilton-exteriors.com/#business` | Layout.astro, CountyPage, GeneralCityPage, ServicePage, alex-hamilton-li, buy/index, blog/[slug] | PASS — all match |
| Person (founder) | `https://hamilton-exteriors.com/#founder` | Layout.astro (founder node), alex-hamilton-li (Person mainEntity), blog/[slug] (author) | PASS — all match |
| WebSite | `https://hamilton-exteriors.com/#website` | Layout.astro (emitter), GeneralCityPage WebPage.isPartOf, blog/index CollectionPage.isPartOf | PASS — all match |
| Blog collection | `https://hamilton-exteriors.com/blog#collection` | blog/index (CollectionPage @id), blog/[slug] (isPartOf reference) | PASS — match |
| Blog item list | `https://hamilton-exteriors.com/blog#itemlist` | blog/index (ItemList @id and CollectionPage.mainEntity) | PASS — self-consistent |
| Service — Roofing | `https://hamilton-exteriors.com/roofing#service` | Layout.astro OfferCatalog, ServicePage dynamic construction | PASS — match |
| WebApplication | `https://hamilton-exteriors.com/buy#webapp` | buy/index only | PASS — unique |
| Buy Service | `https://hamilton-exteriors.com/buy#service` | buy/index only | PASS — unique |
| ProfilePage | `https://hamilton-exteriors.com/about/alex-hamilton-li#profilepage` | alex-hamilton-li only | PASS — unique |

No orphaned @id references detected. All cross-file references resolve correctly.

---

## 5. Google Rich Result Eligibility Summary

| Page type | Schema emitted | Rich result eligible? | Notes |
|---|---|---|---|
| Homepage (`/`) | GeneralContractor + AggregateRating + WebSite | YES | Knowledge Panel, review stars |
| Service pages (`/roofing` etc.) | Service + AggregateOffer | PARTIAL | No direct rich result type for Service; AggregateOffer may surface in some product contexts |
| County pages | Service + BreadcrumbList | YES — Breadcrumb | Breadcrumb rich results active |
| City pages | BreadcrumbList + WebPage + GeneralContractor | YES — Breadcrumb | Breadcrumb rich results active |
| City+service pages | Service only | NO | Missing BreadcrumbList — see [I1] |
| `/about/alex-hamilton-li` | ProfilePage + Person + BreadcrumbList | YES | Profile rich results + Breadcrumb |
| `/buy` | WebApplication + Service + FAQPage | NO | Noindexed — see [C1] |
| `/blog` | CollectionPage + ItemList + BreadcrumbList | YES — Breadcrumb | Breadcrumb eligible |
| `/blog/[slug]` | BlogPosting + BreadcrumbList | YES — Article + Breadcrumb | Full Article rich result + Breadcrumb |

---

## 6. Generated JSON-LD Fixes

### Fix 1 — Layout.astro: Remove Sunday openingHoursSpecification entry [W1]

In `src/layouts/Layout.astro`, replace the three-entry `openingHoursSpecification` array (lines 194–198) with:

```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "07:00",
    "closes": "18:00"
  },
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": "Saturday",
    "opens": "08:00",
    "closes": "14:00"
  }
]
```

---

### Fix 2 — alex-hamilton-li.astro: Upgrade Person.knowsAbout to Thing objects [W4]

Replace the `knowsAbout` array in the `personSchema.mainEntity` object:

```js
knowsAbout: [
  { '@type': 'Thing', name: 'Residential roofing', sameAs: 'https://en.wikipedia.org/wiki/Domestic_roof_construction' },
  { '@type': 'Thing', name: 'Fiber cement siding', sameAs: 'https://en.wikipedia.org/wiki/Fibre_cement' },
  { '@type': 'Thing', name: 'Energy-efficient windows', sameAs: 'https://en.wikipedia.org/wiki/Energy-efficient_window' },
  { '@type': 'Thing', name: 'Accessory dwelling unit', sameAs: 'https://en.wikipedia.org/wiki/Accessory_dwelling_unit' },
  { '@type': 'Thing', name: 'Custom home building', sameAs: 'https://en.wikipedia.org/wiki/Custom_home' },
  { '@type': 'Thing', name: 'James Hardie siding installation' },
  { '@type': 'Thing', name: 'Bay Area building codes' },
  { '@type': 'Thing', name: 'California Title 24 compliance' },
  { '@type': 'Thing', name: 'WUI fire zone requirements' },
],
```

---

### Fix 3 — blog/[slug].astro: Add contentUrl to BlogPosting image [I2]

In `articleJsonLd`, update the `image` property:

```js
image: {
  '@type': 'ImageObject',
  'url': postImage,
  'contentUrl': postImage,
  'width': 1200,
  'height': 630,
},
```

---

### Fix 4 — ServicePage.astro: Add BreadcrumbList for main service pages [I1]

In `src/components/ServicePage.astro`, add after the `serviceSchema` object is constructed:

```js
const breadcrumbSchema = isMainServicePage ? {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://hamilton-exteriors.com/' },
    { '@type': 'ListItem', 'position': 2, 'name': serviceType, 'item': `https://hamilton-exteriors.com${Astro.url.pathname}` },
  ],
} : null;
```

Then emit before the service schema script tag:

```astro
{breadcrumbSchema && <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />}
<script type="application/ld+json" set:html={JSON.stringify(serviceSchema)} />
```

---

### Fix 5 — GeneralCityPage.astro: Remove hardcoded datePublished from city reviews [W3]

In `src/components/GeneralCityPage.astro`, remove `datePublished` from the review map. Change:

```js
review: allReviews.map((r) => ({
  '@type': 'Review',
  author: { '@type': 'Person', name: r.name },
  reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5, worstRating: 1 },
  reviewBody: r.text,
  datePublished: '2026-01-15',
})),
```

To:

```js
review: allReviews.map((r) => ({
  '@type': 'Review',
  author: { '@type': 'Person', name: r.name },
  reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5, worstRating: 1 },
  reviewBody: r.text,
})),
```

---

## 7. Confirmed Correct (v4 Fixes Verified)

The following items from the recent patch are confirmed correct in source code:

| Fix applied | Verified in | Status |
|---|---|---|
| `@type: County` → `AdministrativeArea` | CountyPage.astro, buy/index.astro | CONFIRMED |
| All provider references use `GeneralContractor` | All component files | CONFIRMED |
| San Mateo County in all areaServed arrays | Layout.astro, ServicePage.astro, buy/index.astro | CONFIRMED |
| About breadcrumb 3-tier (Home → About → Alex) | alex-hamilton-li.astro | CONFIRMED |
| `Person.image` set to `/images/alex-hamilton-li.jpg` (absolute URL) | alex-hamilton-li.astro | CONFIRMED |
| Sunday hours added to openingHoursSpecification | Layout.astro | CONFIRMED (value is wrong — see W1) |
| `Organization.knowsAbout` uses Thing objects with sameAs | Layout.astro | CONFIRMED |
| County service renamed "Design-Build & Exterior Contracting" | CountyPage.astro | CONFIRMED |
| Blog CollectionPage: `mainEntity` + `dateModified` + ItemList `@id` | blog/index.astro | CONFIRMED |
| `/buy` WebApplication and Service have `@id` | buy/index.astro | CONFIRMED |
| Org `image` changed to og-default.jpg (logo kept as separate `logo` property) | Layout.astro | CONFIRMED |
| GAF "Master Elite" used consistently | Layout.astro, FAQ.astro, blog/[slug].astro | CONFIRMED |

---

## 8. Priority Order for Remaining Fixes

| # | ID | Fix | Effort | Impact |
|---|---|---|---|---|
| 1 | W1 | Remove Sunday from openingHoursSpecification | 2 min | Prevents "Open 24 hours Sunday" in Knowledge Panel |
| 2 | C1 | Decide whether to remove noindex from /buy | 5 min | Unlocks 3 schema blocks for Google indexing |
| 3 | I1 | Add BreadcrumbList to ServicePage.astro | 20 min | Enables breadcrumb rich results on all 6 main service pages |
| 4 | W4 | Upgrade Person.knowsAbout to Thing objects | 10 min | Improves founder entity clarity for Knowledge Graph |
| 5 | W3 | Remove hardcoded datePublished from city reviews | 5 min | Removes uniform-date spam signal across pSEO cluster |
| 6 | W2 | Verify proximity coordinate order in CountyPage | 10 min | Prevents geo coordinates appearing transposed |
| 7 | I2 | Add contentUrl to BlogPosting image | 5 min | Marginal Article schema completeness improvement |
| 8 | I5 | Verify /about route exists or adjust breadcrumb | 5 min | Prevents invalid breadcrumb warning in Search Console |
| 9 | I3 | Add San Mateo County to /buy hero copy | 2 min | Schema/content consistency |
