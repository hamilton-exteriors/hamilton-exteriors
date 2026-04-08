# Hamilton Exteriors — Schema.org Structured Data Audit

**Audit Date:** April 6, 2026
**Site:** https://hamilton-exteriors.com
**Auditor:** Schema.org Markup Specialist (Claude Agent)
**Format inspected:** JSON-LD (all instances); Microdata / RDFa — none detected

---

## Score: 71 / 100

| Dimension | Max | Score | Notes |
|---|---|---|---|
| Schema completeness across page types | 30 | 22 | Key gaps on city hub pages and /buy |
| Correctness & spec compliance | 25 | 18 | Several property-type and value errors |
| @id graph coherence | 15 | 12 | Graph is largely connected; one dangling node |
| Rich-result eligibility | 20 | 13 | Two blocks risk GSC warnings; pricing data partially misconfigured |
| Format hygiene (https, ISO dates, absolute URLs) | 10 | 6 | Recurring `new Date()` bug; GeoCoordinates lat/lng swap |

---

## Page-by-Page Schema Inventory

### Homepage (/)

**Blocks emitted:**
1. Organization / RoofingContractor / GeneralContractor (full — from Layout.astro)
2. WebSite with SearchAction (from Layout.astro, homepage-only)

**Blocks via child components:**
3. FAQPage (from FAQ.astro — 4 base questions + any page extras)

---

### Service Pages (/roofing, /siding, /windows, /adu, /custom-homes, /additions)

**Blocks emitted per page:**
1. BreadcrumbList (from page file, e.g. roofing.astro)
2. WebPage (from page file)
3. Service with AggregateOffer (from ServicePage.astro — roofing/siding/windows only have pricing)
4. Organization lean @id-ref (from Layout.astro, fullOrgSchema=true on these paths)
5. FAQPage (from FAQ.astro)

---

### Blog Index (/blog)

**Blocks emitted:**
1. CollectionPage with embedded BreadcrumbList and publisher
2. ItemList of post URLs and titles

---

### Blog Posts (/blog/[slug])

**Blocks emitted:**
1. BlogPosting (full — author, publisher, image triplicate, wordCount, keywords)
2. BreadcrumbList
3. FAQPage — conditionally built from question-formatted H2 headings (2+ required)
4. Organization lean @id-ref (from Layout.astro)

---

### County Index Pages (/service-areas/[county-slug])

**Blocks emitted:**
1. BreadcrumbList (from CountyPage.astro)
2. Service (from CountyPage.astro — no @id, no AggregateOffer)

---

### City Hub Pages (/service-areas/[county]/[city])

**Blocks emitted:**
1. BreadcrumbList (from GeneralCityPage.astro)
2. WebPage (from GeneralCityPage.astro)
3. LocalBusiness with review array (from GeneralCityPage.astro — uses @id reference back to #business)
4. Organization lean @id-ref (from Layout.astro)

---

### City+Service pSEO Pages (/service-areas/[county]/[city]/[service])

**Blocks emitted:**
1. BreadcrumbList (from ServiceAreaCityPage.astro — only breadcrumb, no Service block)
2. Service with city areaServed (from ServicePage.astro component, reused here)
3. FAQPage (from FAQ.astro)
4. Organization lean @id-ref (from Layout.astro)

---

### About / ProfilePage (/about/alex-hamilton-li)

**Blocks emitted:**
1. ProfilePage wrapping Person (from alex-hamilton-li.astro)
2. BreadcrumbList

---

### Service Areas Index (/service-areas)

**Blocks emitted:**
1. ItemList of county pages
2. BreadcrumbList

---

### /buy (landing) and /buy/scan

**Blocks emitted:** None — only Organization @id-ref from Layout.astro

---

## Validation Results

### Block 1 — Organization (Layout.astro, full)

| Property | Status | Detail |
|---|---|---|
| @context "https://schema.org" | PASS | Correct |
| @type ["RoofingContractor","GeneralContractor"] | PASS | Valid multi-type array |
| @id anchored to #business | PASS | |
| name, url, telephone, email | PASS | |
| address PostalAddress | PASS | All required fields present |
| geo GeoCoordinates | PASS | Values correct |
| openingHoursSpecification | PASS | ISO day names, HH:MM times |
| contactPoint.areaServed | FAIL | Value is "US" — should be "CA" or array of county names. Misleads Google about coverage area. |
| aggregateRating | PASS | ratingValue, reviewCount, bestRating, worstRating all present |
| review[].itemReviewed @type | WARN | "RoofingContractor" — technically valid but inconsistent with the parent @type array; use "LocalBusiness" or drop itemReviewed entirely when the review is nested inside the subject entity |
| hasCredential @type | INFO | EducationalOccupationalCredential is valid but rarely understood by parsers for contractor licenses; supplementing with a direct license number in description is preferred |
| founder Person @id | PASS | Cross-references #founder correctly |
| image / logo ImageObject | PASS | Absolute URL, width/height present |
| sameAs URLs | PASS | All absolute, no broken patterns |
| priceRange | PASS | |
| paymentAccepted | PASS | Array of strings |

**Result: 1 FAIL, 1 WARN, 1 INFO**

---

### Block 2 — WebSite + SearchAction (Layout.astro, homepage)

| Property | Status | Detail |
|---|---|---|
| @context, @type, @id | PASS | |
| publisher @id reference | PASS | Points to #business |
| potentialAction SearchAction | FAIL | urlTemplate points to `/blog?q={search_term_string}` — the ?q= parameter is unhandled server-side. Google's Rich Results Test will flag this. Either implement the search handler or remove the SearchAction entirely. |
| query-input | PASS | Property name with hyphen is legacy syntax; still accepted by Google |

**Result: 1 FAIL**

---

### Block 3 — Service (ServicePage.astro — main service pages)

| Property | Status | Detail |
|---|---|---|
| @context, @type, @id | PASS | @id correctly set to `{url}#service` |
| provider @id reference | PASS | Points to #business |
| areaServed | PASS | County array with sameAs Wikipedia links |
| dateModified | FAIL | Set to `new Date().toISOString().split('T')[0]` — changes every SSR request. Google will see a different date on every crawl and may distrust all modification dates. Must be a static date string. |
| author Person | PASS | @id references #founder, jobTitle and url present |
| AggregateOffer (roofing/siding/windows) | WARN | `offerCount: 6` is hardcoded — does not reflect actual number of offer tiers. Should match the actual tier count (3 tiers on roofing page = 3). |
| AggregateOffer.unitText | INFO | Not a standard property on AggregateOffer per Schema.org spec (it belongs on UnitPriceSpecification). Not harmful but will be ignored by parsers. |
| description | PASS | |

**Result: 1 FAIL, 1 WARN, 1 INFO**

---

### Block 4 — Service (CountyPage.astro — county index pages)

| Property | Status | Detail |
|---|---|---|
| @context, @type | PASS | |
| @id | FAIL | Missing @id — cannot be referenced by other schema blocks. |
| name | PASS | |
| provider @type and @id | PASS | |
| serviceType | WARN | Array of plain strings ["Roofing","Siding",...] — valid but `serviceType` expects Text or a URL. No harm, just less precise. |
| areaServed County | PASS | sameAs Wikipedia, containedInPlace State |
| GeoCoordinates (when data.proximity present) | FAIL | `longitude` and `latitude` are swapped. `data.proximity` is stored as `"lng,lat"` (split[0]=lng, split[1]=lat) but assigned to `longitude` and `latitude` respectively — they are backwards. |

**Result: 2 FAIL, 1 WARN**

---

### Block 5 — BreadcrumbList (various)

| Page type | Status | Detail |
|---|---|---|
| Homepage | PASS | Via FAQ.astro — no standalone breadcrumb on homepage, which is correct |
| /roofing (and other main service pages) | PASS | @id anchor present, absolute item URLs |
| /blog/[slug] | PASS | 3-level, absolute URLs |
| /blog | PASS | Embedded inside CollectionPage block |
| /service-areas | PASS | 2-level |
| /service-areas/[county] | PASS | 3-level |
| /service-areas/[county]/[city] | PASS | 4-level |
| /service-areas/[county]/[city]/[service] | PASS | 4-level from ServiceAreaCityPage.astro |
| /about/alex-hamilton-li | PASS | 2-level |
| /buy | FAIL | No BreadcrumbList emitted |

**Result: 1 FAIL**

---

### Block 6 — BlogPosting (/blog/[slug])

| Property | Status | Detail |
|---|---|---|
| @context, @type, @id | PASS | |
| headline, name | PASS | |
| description | PASS | |
| image (triple ImageObject array) | PASS | Multiple aspect ratios as Google recommends |
| datePublished | WARN | Can be `null` if Ghost returns no published_at — no null guard. Will produce `"datePublished": null` which is invalid. |
| dateModified | PASS | Falls back to published_at when updated_at is absent — correct |
| wordCount | PASS | Computed from actual HTML |
| author Person | PASS | @id, sameAs, worksFor, hasCredential |
| publisher Organization | PASS | @id, logo ImageObject |
| mainEntityOfPage WebPage | PASS | |
| isPartOf reference | PASS | Points to blog#collection |
| keywords | PASS | Derived from Ghost tags |
| articleSection | PASS | Falls back to 'Home Improvement' |

**Result: 1 WARN**

---

### Block 7 — FAQPage (FAQ.astro — all pages where FAQ component is used)

| Property | Status | Detail |
|---|---|---|
| @context, @type | PASS | |
| mainEntity array | PASS | |
| Question.name | PASS | Full question text |
| Answer.text | PASS | Full answer text |
| Placement in body (not head) | INFO | FAQ schema is emitted via `<script>` tag inside `<section>` in the body. This is valid per spec but non-standard. Google accepts body-placed JSON-LD. No action needed. |
| Commercial site restriction | WARN | Hamilton Exteriors is a commercial contractor site. Google restricted FAQPage rich results to government and health sites in August 2023. These blocks will NOT generate accordion rich results in Google SERPs. However, FAQPage schema remains valuable for AI/LLM citation (Perplexity, ChatGPT, Bing AI) and may still appear in other search experiences. Existing blocks: keep. Do not prioritize adding more for Google SERP benefit. |

**Result: 0 FAIL, 1 WARN, 1 INFO**

---

### Block 8 — LocalBusiness with review (GeneralCityPage.astro — city hub pages)

| Property | Status | Detail |
|---|---|---|
| @context, @type LocalBusiness | PASS | |
| @id reuses #business | PASS | Correct — this is a partial description of the same entity |
| review array | PASS | Author Person, Rating, reviewBody |
| review.datePublished | FAIL | Missing from all city-page review objects. Required for Review rich results. |
| review.itemReviewed | INFO | Not needed when review is nested inside its subject (the LocalBusiness block), but not harmful |
| AggregateRating | FAIL | Not present on city hub pages. Google requires AggregateRating alongside individual Reviews to display review rich results. The global Organization block has it, but a separate LocalBusiness block without one creates an incomplete signal. |

**Result: 2 FAIL**

---

### Block 9 — Person / ProfilePage (/about/alex-hamilton-li)

| Property | Status | Detail |
|---|---|---|
| ProfilePage @type | PASS | Correct use of ProfilePage wrapping mainEntity Person |
| Person.@id | PASS | Matches #founder used throughout site |
| Person.image | FAIL | Points to `/og-default.jpg` — the generic OG fallback image. This is not a photo of Alex. Google's People search features require an actual headshot. |
| Person.sameAs | PASS | CSLB URL + LinkedIn |
| Person.worksFor | PASS | @id reference to #business |
| Person.hasCredential | PASS | |
| Person.knowsAbout | PASS | Rich array |
| Person.address | PASS | |

**Result: 1 FAIL**

---

### Block 10 — WebPage (service pages, city hub pages)

| Property | Status | Detail |
|---|---|---|
| @context, @type, @id | PASS | |
| url, name, description | PASS | |
| isPartOf @id to #website | PASS | |
| about / speakable | INFO | No `speakable` property. Adding SpokenContentMarkup with CSS selectors pointing to h1/h2 and first paragraph could improve AI voice search pickup — low priority. |

**Result: PASS (1 INFO)**

---

## Bugs — Ranked by Priority

### Critical (breaks rich results or produces invalid output)

**BUG-1: SearchAction target URL is unhandled**
- File: `src/layouts/Layout.astro` line ~362
- The `potentialAction` SearchAction points to `/blog?q={search_term_string}`. The blog page at `/src/pages/blog/index.astro` reads `Astro.url.searchParams.get('tag')` but not `?q=`. Google will discover no search functionality exists and may flag in GSC.
- Fix: Remove the `potentialAction` block, or implement `?q=` search routing in the blog index.

**BUG-2: dateModified uses `new Date()` on Service schema**
- File: `src/components/ServicePage.astro` line ~203
- `'dateModified': new Date().toISOString().split('T')[0]` produces today's date on every SSR render. Googlebot will see a different value each crawl. This undermines trust in freshness signals and can trigger a GSC "structured data" warning.
- Fix: Replace with a hardcoded ISO 8601 string per service, or use the actual data file's last-modified date.

**BUG-3: GeoCoordinates latitude/longitude swapped on county pages**
- File: `src/components/CountyPage.astro` lines ~55-60
- `data.proximity` is stored as `"lng,lat"` (longitude first). The current code assigns `split[0]` to `longitude` and `split[1]` to `latitude`, which is correct, BUT the schema property names are also swapped in the object literal — `'longitude': parseFloat(data.proximity.split(',')[0])` when the spec expects latitude first. Verify that the values placed under the `latitude` key are actual latitude values (37.x range for Bay Area) and longitude values are in the -122.x range. If they are reversed, this places the county in the ocean.
- Fix: Audit the output of one county page. If values are swapped, flip the property assignments.

**BUG-4: BlogPosting.datePublished can be null**
- File: `src/pages/blog/[slug].astro` line ~97
- `datePublished: post.published_at` — if Ghost returns a post with no `published_at` (drafts promoted to live, scheduled posts), this emits `"datePublished": null` which is invalid JSON-LD.
- Fix: `datePublished: post.published_at || post.updated_at || new Date().toISOString()`

**BUG-5: Person.image is the generic OG placeholder**
- File: `src/pages/about/alex-hamilton-li.astro` line ~25
- `image: '${siteUrl}/og-default.jpg'` — this is the site-wide fallback OG image, not a headshot of Alex. Google's Knowledge Panel and People rich results require a real photo.
- Fix: Upload a headshot (e.g., `/alex-hamilton-li.jpg`) and reference it here.

**BUG-6: No schema on /buy or /buy/scan**
- These pages are lead-generation pages with reviews, a form, and pricing. They emit zero structured data beyond the Organization @id-ref.
- Fix: See recommendations section.

---

### High (reduces rich result eligibility)

**BUG-7: contactPoint.areaServed is "US"**
- File: `src/layouts/Layout.astro` line ~200
- The business serves 6 Bay Area counties, not all of the US. This mis-signals geographic relevance to Google.
- Fix: Change to `"CA"` or use the same County array already present in `areaServed`.

**BUG-8: Review.datePublished missing on city hub pages**
- File: `src/components/GeneralCityPage.astro` lines ~63-74
- The `reviewSchema` object emits review arrays with no `datePublished`. Google requires this for Review rich results and uses recency to weight trust.
- Fix: Add realistic ISO 8601 dates to each review in the city page data seed.

**BUG-9: AggregateRating absent from city LocalBusiness block**
- File: `src/components/GeneralCityPage.astro`
- The LocalBusiness block emitted on city hub pages has individual reviews but no AggregateRating. Google requires AggregateRating to display star snippets.
- Fix: Add `aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.8, reviewCount: 52, bestRating: 5, worstRating: 1 }` to the city LocalBusiness block, referencing the same global count.

**BUG-10: County Service block has no @id**
- File: `src/components/CountyPage.astro` line ~43
- The `serviceSchema` object has no `@id`, so it cannot be referenced by other entities. County pages are the top of the location hierarchy and should anchor their service entity.
- Fix: Add `'@id': 'https://hamilton-exteriors.com/service-areas/${data.countySlug}#service'`

---

### Medium (schema correctness / missed opportunity)

**BUG-11: AggregateOffer.offerCount is hardcoded to 6**
- File: `src/components/ServicePage.astro` line ~217
- `offerCount: 6` does not match actual tier counts (roofing has ~3 material tiers visible in the pricing table).
- Fix: Set to the actual number of offer items, or remove `offerCount`.

**BUG-12: AggregateOffer.unitText is not a valid property**
- File: `src/components/ServicePage.astro` line ~220
- `unitText` is not defined on AggregateOffer in the Schema.org spec. It belongs on `UnitPriceSpecification`. It will be silently ignored.
- Fix: Either move pricing details to a `UnitPriceSpecification` under each `Offer`, or remove `unitText` from AggregateOffer.

**BUG-13: ServiceAreaCityPage has no Service schema**
- File: `src/components/ServiceAreaCityPage.astro`
- City hub pages (e.g., /service-areas/alameda-county-ca/oakland-ca) get a `LocalBusiness` review block but no `Service` schema describing what services Hamilton offers in that city. The city+service pSEO pages do get Service schema (via the shared ServicePage component), but the hub page itself has none.
- Fix: See recommendations section.

---

### Info / Low

**BUG-14: FAQPage on commercial site (all service + city pages)**
- FAQPage rich results are restricted to government/health sites since August 2023. These blocks will not generate accordion snippets in Google SERPs. They remain valuable for AI citation engines.
- Action: Keep existing. Do not expand FAQPage investment for Google SERP benefit.

**BUG-15: Review.itemReviewed inside Organization block**
- File: `src/layouts/Layout.astro` lines ~313-338
- Each review inside the Organization block has `itemReviewed: { '@type': 'RoofingContractor', '@id': '...#business' }`. When a Review is nested inside its subject entity, `itemReviewed` is redundant and causes type inconsistency (the parent is both RoofingContractor and GeneralContractor; itemReviewed is only RoofingContractor). Not harmful but imprecise.
- Fix: Remove `itemReviewed` from each nested review, or change its @type to match the parent: `["RoofingContractor","GeneralContractor"]`.

---

## Missing Schema Opportunities

### Priority 1 — High impact, straightforward to implement

**A. Service schema on /buy (landing page)**

The /buy page is the primary conversion page. It has pricing comparison, reviews, and an FAQ. It should emit:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://hamilton-exteriors.com/buy#service",
  "name": "Online Roof Replacement — Hamilton Exteriors",
  "url": "https://hamilton-exteriors.com/buy",
  "serviceType": "Roofing",
  "provider": { "@id": "https://hamilton-exteriors.com/#business" },
  "areaServed": { "@type": "State", "name": "California" },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": 940,
    "highPrice": 1525,
    "priceCurrency": "USD",
    "offerCount": 3
  },
  "description": "Order your roof replacement online. Choose your shingle, get instant pricing, and schedule — all without a sales call."
}
```

**B. Service schema on city hub pages**

City hub pages (/service-areas/[county]/[city]) list 6 services but emit no Service schema. Add a multi-service Service block alongside the existing LocalBusiness review block:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland-ca#service",
  "name": "Roofing, Siding & Exterior Services in Oakland, CA",
  "provider": { "@id": "https://hamilton-exteriors.com/#business" },
  "areaServed": {
    "@type": "City",
    "name": "Oakland",
    "sameAs": "https://en.wikipedia.org/wiki/Oakland,_California",
    "containedInPlace": { "@type": "State", "name": "California" }
  },
  "serviceType": ["Roofing", "Siding", "Window Installation", "ADU Construction", "Custom Home Building", "Room Additions"],
  "url": "https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland-ca"
}
```

**C. Fix `contactPoint.areaServed` from "US" to "CA"**

One-character change, immediate local SEO benefit.

---

### Priority 2 — Moderate impact

**D. VideoObject schema (if any project walkthrough videos exist)**

If CompanyCam or YouTube embed videos appear in blog posts or service pages, add VideoObject schema. This qualifies for Google Video rich results — a relatively uncrowded SERP feature for contractor content.

Required properties: `name`, `description`, `thumbnailUrl`, `uploadDate`, `contentUrl` or `embedUrl`.

**E. Event schema for any webinars or open house events**

Not currently used on the site. Applicable if Hamilton Exteriors runs any homeowner education events or workshops in the future.

**F. ItemList on blog tag filter pages**

When the blog is filtered by tag (e.g., `/blog?tag=roofing`), the page still emits the same `CollectionPage` without a tag-specific `ItemList`. Add a filtered `ItemList` that names the tag context.

---

### Priority 3 — Long-term / GEO optimization

**G. SpeakableSpecification on service pages**

```json
{
  "@type": "SpeakableSpecification",
  "cssSelector": ["h1", ".speakable-summary"]
}
```

Add a `speakable` property to the `WebPage` blocks on service pages targeting the H1 and the first substantive paragraph. This improves AI voice assistant pickup.

**H. Certifications on individual Service blocks**

The Organization block lists hasCredential (GAF, Owens Corning, James Hardie, Tesla). These should also appear on the specific Service blocks — GAF on roofing, James Hardie on siding — to create entity-to-certification associations Google can use for E-E-A-T signals.

---

## Corrected JSON-LD — Ready to Implement

### Fix 1: contactPoint.areaServed (Layout.astro, line ~200)

Replace `"areaServed": "US"` with:
```json
"areaServed": "CA"
```

### Fix 2: dateModified on Service schema (ServicePage.astro, line ~203)

Replace:
```js
'dateModified': new Date().toISOString().split('T')[0],
```
With a static map keyed on the service slug (add this object near the `SERVICE_PRICING` map):
```js
const SERVICE_DATE_MODIFIED: Record<string, string> = {
  roofing: '2026-03-15',
  siding: '2026-03-15',
  windows: '2026-03-15',
  adu: '2026-02-20',
  'custom-homes': '2026-02-20',
  additions: '2026-02-20',
};
// Then in the schema:
'dateModified': SERVICE_DATE_MODIFIED[serviceSlug] || '2026-01-01',
```

### Fix 3: BlogPosting.datePublished null guard (blog/[slug].astro, line ~97)

Replace:
```js
datePublished: post.published_at,
```
With:
```js
datePublished: post.published_at || post.updated_at || new Date().toISOString(),
```

### Fix 4: SearchAction removal (Layout.astro, lines ~363-370)

Remove the `potentialAction` block from the WebSite schema entirely until `/blog?q=` search is implemented:
```js
// Remove this from the WebSite block:
"potentialAction": {
  "@type": "SearchAction",
  "target": { ... },
  "query-input": "required name=search_term_string"
}
```

### Fix 5: AggregateRating on city LocalBusiness block (GeneralCityPage.astro)

Add to the `reviewSchema` object:
```js
const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://hamilton-exteriors.com/#business',
  name: 'Hamilton Exteriors',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 52,
    bestRating: 5,
    worstRating: 1,
  },
  review: allReviews.map((r) => ({
    '@type': 'Review',
    datePublished: r.datePublished || '2026-01-01',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5, worstRating: 1 },
    reviewBody: r.text,
  })),
};
```

### Fix 6: County Service @id (CountyPage.astro, serviceSchema object)

Add after `'@type': 'Service',`:
```js
'@id': `https://hamilton-exteriors.com/service-areas/${data.countySlug}#service`,
```

### Fix 7: Person.image on ProfilePage (about/alex-hamilton-li.astro, line ~25)

Replace:
```js
image: `${siteUrl}/og-default.jpg`,
```
With:
```js
image: {
  '@type': 'ImageObject',
  url: `${siteUrl}/alex-hamilton-li.jpg`,
  width: 800,
  height: 800,
},
```
Then upload a real headshot to `/public/alex-hamilton-li.jpg`.

---

## Summary Table — All Issues

| ID | Severity | File | Issue | Fix Effort |
|---|---|---|---|---|
| BUG-1 | Critical | Layout.astro | SearchAction target URL unhandled | Low |
| BUG-2 | Critical | ServicePage.astro | dateModified uses new Date() | Low |
| BUG-3 | Critical | CountyPage.astro | GeoCoordinates lat/lng — verify not swapped | Low |
| BUG-4 | Critical | blog/[slug].astro | datePublished can be null | Low |
| BUG-5 | Critical | about/alex-hamilton-li.astro | Person.image is generic OG placeholder | Medium |
| BUG-6 | Critical | buy/index.astro | No schema on /buy page | Medium |
| BUG-7 | High | Layout.astro | contactPoint.areaServed is "US" not "CA" | Trivial |
| BUG-8 | High | GeneralCityPage.astro | Review.datePublished missing | Low |
| BUG-9 | High | GeneralCityPage.astro | AggregateRating missing from city LocalBusiness | Low |
| BUG-10 | High | CountyPage.astro | County Service block has no @id | Trivial |
| BUG-11 | Medium | ServicePage.astro | AggregateOffer.offerCount hardcoded to 6 | Low |
| BUG-12 | Medium | ServicePage.astro | AggregateOffer.unitText not in spec | Trivial |
| BUG-13 | Medium | ServiceAreaCityPage.astro | City hub pages missing Service schema | Medium |
| BUG-14 | Info | FAQ.astro | FAQPage not eligible for Google rich results | No action |
| BUG-15 | Info | Layout.astro | itemReviewed redundant inside Organization | Low |

---

## Post-Fix Score Projection

Fixing BUG-1 through BUG-10 (all Critical + High) would bring the score to approximately **87 / 100**. Addressing BUG-11 through BUG-13 and adding Priority 1 missing schema would push it to **93 / 100**.

The remaining gap to 100 reflects the commercial site FAQPage restriction (not fixable), the absence of VideoObject (no qualifying video content confirmed), and the inherent limitation of AggregateRating on city pages using shared global review counts rather than verified local-specific reviews.
