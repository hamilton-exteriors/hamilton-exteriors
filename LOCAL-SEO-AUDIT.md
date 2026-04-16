# Hamilton Exteriors — Local SEO Audit Report

**Audit Date:** April 6, 2026
**URL:** https://hamilton-exteriors.com
**Business Type:** Service Area Business (SAB) — Roofing & Exteriors Contractor
**Industry Vertical:** Home Services (Roofing / General Contractor)
**Service Area:** 6 Bay Area counties, 47+ cities
**License:** CSLB #1078806
**Auditor Framework:** Whitespark Local Search Ranking Factors 2026

---

## Local SEO Score: 67 / 100

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|----------|
| GBP Signals | 25% | 52/100 | 13.0 |
| Reviews & Reputation | 20% | 60/100 | 12.0 |
| Local On-Page SEO | 20% | 82/100 | 16.4 |
| NAP Consistency & Citations | 15% | 75/100 | 11.3 |
| Local Schema Markup | 10% | 78/100 | 7.8 |
| Local Link & Authority Signals | 10% | 65/100 | 6.5 |
| **Total** | | | **67.0** |

**Interpretation:** Above average for a young contractor site but well below the threshold for competitive Bay Area Local Pack visibility. The score is heavily dragged by weak GBP signals (no embedded Maps, no verified photo evidence, no posts/Q&A detected) and a stalled review count that has crossed the 18-day cliff described in Sterling Sky research.

---

## Business Type Detection

**Detected: Hybrid (primarily SAB)**

Signals observed:
- Physical address present in schema, footer, and NAP (21634 Redwood Rd Unit F, Castro Valley, CA 94546) — brick-and-mortar signal
- No Maps iframe embedded anywhere on the site — SAB signal
- "Serving six Bay Area counties" language, "45 minutes of every city we serve" — explicit SAB language
- Google Maps link uses CID format (`?cid=3578771346418026097`) rather than a place embed — confirms GBP exists but is not surfaced on-page

**Classification note:** The address appears in schema but is not the primary CTA location — customers do not visit it. This is correctly classified as a SAB with a registered office address, which is the correct configuration for a GBP SAB listing.

---

## Industry Vertical Detection

**Detected: Home Services — Roofing / General Contractor**

Signals confirming this:
- CSLB license number displayed prominently (#1078806)
- Manufacturer certifications: GAF Certified, Owens Corning Preferred, James Hardie Elite Preferred
- Service catalog: Roofing, Siding, Windows, ADUs, Custom Homes, Additions
- Schema type: `["RoofingContractor", "GeneralContractor"]` — correctly typed, not generic `LocalBusiness`
- Emergency/estimate CTAs, licensed/bonded/insured language
- Fire zone compliance (WUI), permit expertise language — classic home services signals

**Industry-specific factors to check (Whitespark 2026):**
- Primary GBP category is the #1 local ranking factor — cannot be confirmed without GBP access
- License number in GBP description is a strong trust signal for home services
- Manufacturer certifications (GAF, James Hardie) are Tier 1 citation sources for contractors

---

## NAP Consistency Audit

**Business Name in Use:** Two variants detected — flag.

| Source | Name | Address | Phone |
|--------|------|---------|-------|
| Homepage schema | Hamilton Exteriors | 21634 Redwood Rd Unit F, Castro Valley, CA 94546 | (650) 977-3351 |
| Roofing page | Hamilton Exteriors | 21634 Redwood Rd Unit F, Castro Valley, CA 94546 | (650) 977-3351 |
| Footer (all pages) | Hamilton Exteriors | 21634 Redwood Rd Unit F, Castro Valley, CA 94546 | (650) 977-3351 |
| About page (visible text) | Hamilton Exteriors, Inc. | 21634 Redwood Rd Unit F, Castro Valley, CA 94546 | (650) 977-3351 |
| BBB listing | Hamilton Exteriors, Inc | 21634 Redwood Rd Unit F, Castro Valley, CA 94546 | (650) 977-3351 |
| Yelp sameAs in schema | (yelp.com/biz/hamilton-exteriors-castro-valley) | — | — |

**Discrepancy flagged:** The on-site schema and most pages use "Hamilton Exteriors" while the About page and BBB listing use "Hamilton Exteriors, Inc." Pick one legal entity name and use it consistently across all schema, GBP, directories, and pages. If the legal entity is Inc., use that everywhere. If operating as a DBA, confirm GBP uses the public-facing DBA name, not the legal name.

**Address consistency:** Clean — no discrepancies found across page sources.

**Phone consistency:** Clean — (650) 977-3351 / +16509773351 consistent across all sources.

---

## GBP (Google Business Profile) Signal Assessment

**Score: 52/100 — Weakest dimension in the audit**

| Signal | Status | Notes |
|--------|--------|-------|
| GBP listing exists | Confirmed | CID 3578771346418026097 in schema hasMap |
| Maps embed on website | Not found | No iframe, no interactive map widget |
| Google Maps directions link | Not found | Only a CID URL in schema — not visible to users |
| GBP reviews visible on page | Not verified | Review widget pulls from unconfirmed sources |
| GBP category (primary) | Unknown | Cannot confirm without GBP console access |
| GBP posts / updates | Unknown | No signals found on-page |
| GBP Q&A | Unknown | No signals found |
| GBP photos (recent) | Unknown | CompanyCam integration suggests project photos exist but GBP photo freshness unknown |
| GBP service area configured | Likely | 6-county service area is publicly stated |
| GBP description with CSLB# | Unknown | Cannot confirm without console access |

**Critical issue:** According to Whitespark 2026, primary GBP category is the single most important local ranking factor (score: 193) and the wrong category is the #1 negative factor (score: 176). A roofing contractor should have "Roofing Contractor" as primary category, not "General Contractor" or "Home Improvement Contractor." This cannot be confirmed from the website alone.

**Missing GBP-to-site signals that cost you clicks:**
- No embedded Google Map anywhere on the site. A Maps embed increases Local Pack presence correlation and provides a direct trust signal for SABs.
- No visible Google review widget (Elfsight, EmbedSocial, or native widget). Reviews showing a live Google badge with count reinforce GBP authority.
- No GBP post content syndicated to site. GBP posts are a short-lived but meaningful signal.

---

## Review Health Assessment

**Score: 60/100**

| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Aggregate rating | 4.8 stars | 4.5+ = good | Pass |
| Review count | 52 | 100+ competitive for Bay Area | Below par |
| Most recent schema review | Jan 22, 2026 (74 days ago) | 18-day rule | Cliff crossed |
| Platform diversity | Google + Yelp | Google + Yelp + BBB + Houzz | Partial |
| Response rate | Unknown | 100% = best practice | Cannot confirm |
| Review velocity | Stalled | 2-4/month minimum | Critical |

**The 18-day rule (Sterling Sky research):** Google's local ranking algorithm has been observed to demote listings with no new reviews within an 18-day window. At 74 days since the most recent schema review (January 22, 2026), Hamilton Exteriors has crossed this threshold. This is the most urgent local SEO issue in the entire audit.

**Rating quality:** 4.8 from 52 is strong for the rating itself, but 52 reviews is below the competitive floor for Bay Area home services. Top-ranked roofing contractors in the region typically show 150-500+ reviews. At 52, Hamilton Exteriors loses credibility in side-by-side comparison in the Local Pack.

**Schema review concern:** All four reviews embedded in schema are 5-star reviews by the same authors (Eric W, Sarah M, Robert Holt, Laura Gaubin) appearing on multiple pages including Oakland, Berkeley, and Walnut Creek city pages. If these are the same reviews being replicated across city service pages as if they are city-specific, this is a review authenticity risk. Google has been known to suppress schema-marked reviews that appear to be fabricated or duplicated. Ensure reviews in schema are genuinely associated with the business and not city-page clones.

---

## Local Schema Validation

**Score: 78/100**

### Organization Schema

**Schema type:** `["RoofingContractor", "GeneralContractor"]` — Correct. `RoofingContractor` is the appropriate industry subtype per Schema.org hierarchy (inherits from `HomeAndConstructionBusiness > LocalBusiness`).

| Property | Status | Notes |
|----------|--------|-------|
| @type (correct subtype) | Pass | RoofingContractor is correct |
| name | Pass | "Hamilton Exteriors" |
| address | Pass | Full PostalAddress object |
| telephone | Pass | +16509773351 |
| url | Pass | https://hamilton-exteriors.com |
| geo (latitude/longitude) | Pass | 37.69427, -122.07887 — 5-decimal precision |
| openingHoursSpecification | Pass | Mon-Fri 7am-6pm, Sat 8am-2pm |
| aggregateRating | Pass | 4.8, 52 reviews |
| priceRange | Pass | "$$ " |
| areaServed | Pass | 6 counties with Wikipedia sameAs |
| hasMap | Pass | Google CID URL present |
| sameAs | Pass | Facebook, Instagram, LinkedIn, Yelp, CSLB |
| hasCredential | Pass | CSLB + 4 manufacturer certs |
| image / logo | Pass | logo-schema.png with dimensions |
| hasOfferCatalog | Pass | 6 services |
| review (embedded) | Caution | Same 4 reviews duplicated across city pages — see note above |
| founder | Pass | Person schema with CSLB sameAs |

**Issues found:**

1. `contactPoint.areaServed` is set to `"US"` — this is too broad for a Bay Area SAB. It should be restricted to the actual service counties or at minimum `"CA"`. A robot parsing this schema would conclude the business serves all of the United States, which could dilute relevance signals.

2. The `geo` property on the Organization uses the Castro Valley office coordinates (37.69427, -122.07887) — this is correct. However, note that for an SAB, Google does not display the address publicly in GBP, so the geo should not be relied upon as a ranking factor for cities like Napa or Santa Clara. This is expected behavior, not a bug.

3. No `founder` `@type: Person` has a `telephone` or `email` — minor but these help Entity resolution in Google's Knowledge Graph.

4. `"paymentAccepted": ["Cash", "Check", "ACH Transfer", "Credit Card"]` — this property is valid but is now low-value for local ranking purposes.

### Service Page Schema

Service pages (`/roofing`, `/siding`) carry a `Service` schema with `provider: @id` reference to the Organization — good practice. FAQPage schema is present on all major service pages — this is a strong AI visibility signal (Whitespark 2026: FAQ schema is top-5 AI visibility factor).

### Location Page Schema

City pages emit a `Service` schema with `areaServed.geo` using coordinates from `city-coordinates.ts`. The coordinates file covers all 47 cities with accurate Bay Area coordinates. The `Service` schema correctly references the business via `provider: @id` rather than duplicating the full Organization — this is correct and efficient.

**Missing on city service pages:** BreadcrumbList is present but no `aggregateRating` is carried through to city-level service pages. Adding `aggregateRating` to city service page Service schemas (inherited from the Organization) would help star ratings appear in local organic results for city-specific queries.

### County Page Schema

County pages emit `BreadcrumbList + WebPage + Service` — this is appropriate. However, the `WebPage` schema's `about` property references `#service` which is a local anchor and does not resolve to a full URL. Change to absolute URL: `https://hamilton-exteriors.com/service-areas/{countySlug}#service`.

---

## Location / Service Area Page Quality

**Score: 73/100**

### Architecture Overview

The site has a 4-level hierarchy for service area content:
```
/service-areas                                → Hub
/service-areas/{county-ca}                   → County (6 pages)
/service-areas/{county-ca}/{city-ca}         → City (47 pages)
/service-areas/{county-ca}/{city-ca}/{svc}   → City+Service (47 x 6 = 282 potential pages)
```

This is a well-structured programmatic SEO hierarchy powered by Ghost CMS. The URL structure is clean and canonical.

### Content Uniqueness Assessment

| Page Level | Estimated Unique Content | Assessment |
|------------|--------------------------|------------|
| County pages | 35-45% | Acceptable |
| City hub pages | 25-35% | Borderline |
| City + Service pages | 25-35% | Risk zone |

The 25-35% unique content range on city and city-service pages is below the generally accepted 40% threshold for avoiding "thin content" classification. The risk is concentrated in:

- FAQ sections: Appear verbatim across city pages with only the city name swapped ("most roof replacements in the Bay Area require a building permit" is the same sentence on Oakland, Berkeley, and Walnut Creek pages)
- "Why Choose Hamilton Exteriors" sections: Identical across all city pages
- Service card descriptions: Templated across all pages
- Testimonials: The same 3 reviewers (Sarah M, David K, Jennifer L) appear on Oakland, Berkeley, and Walnut Creek pages with only the neighborhood name changed — this is a high-risk pattern. If Google detects the same review body text with swapped neighborhood names, it reads as fabricated, which can trigger a manual review action.

### Doorway Page Test

The Oakland Roofing page (`/service-areas/alameda-county-ca/oakland-ca/roofing`) passed the doorway test:
- Oakland-specific housing statistics (150k units, 60% pre-1960)
- Local rainfall data (23 inches, Nov-Mar concentration)
- Neighborhood specificity (Rockridge, Temescal, Montclair)
- Oakland-specific permit fees ($200-$600)
- Fire zone materials guidance (Class A for Oakland Hills)

This level of hyper-local specificity is the correct approach. The problem is that this quality appears to fade at the city hub level.

### Internal Linking Depth

- Service area pages are accessible within 3 clicks from homepage (Home → Service Areas → County → City)
- City + Service pages require 4 clicks — acceptable
- Blog posts link to relevant service pages but do not systematically link to city-specific pages — a missed opportunity

---

## Citation Presence (Tier 1 Directories)

**Score: 65/100**

| Directory | Status | NAP Match | Notes |
|-----------|--------|-----------|-------|
| Yelp | Confirmed (via sameAs in schema) | Consistent | yelp.com/biz/hamilton-exteriors-castro-valley |
| BBB | Confirmed | Consistent | A- rating, NOT accredited |
| Google Business Profile | Confirmed | Consistent | CID 3578771346418026097 |
| Houzz | Not confirmed | — | Major gap for home services |
| Angi (Angie's List) | Not confirmed | — | High-traffic home services directory |
| HomeAdvisor | Not confirmed | — | Overlaps with Angi |
| Thumbtack | Not confirmed | — | Bay Area-heavy platform |
| Nextdoor | Not confirmed | — | Critical for neighborhood-level SABs |
| Porch.com | Not confirmed | — | Roofing-specific directory |
| BuildZoom | Not confirmed | — | CSLB-integrated contractor directory |
| Contractor licensing boards | Partial | CSLB link present in sameAs | Good |

**Key citation gaps for home services contractors:**

- **BuildZoom** is particularly important — it pulls directly from CSLB data and ranks well for "[contractor type] in [city]" searches in California. With CSLB #1078806, a BuildZoom profile can be claimed or auto-generated.
- **Houzz** is the #1 photo-driven citation for home improvement contractors and frequently outranks contractor sites for remodeling-related queries.
- **Nextdoor** is underrated for Bay Area home services. Bay Area neighborhoods are active on Nextdoor and contractor recommendations travel virally.

**BBB accreditation gap:** Currently rated A- but not BBB accredited. BBB accreditation costs approximately $500-$1,500/year depending on employee count. For a $15k-$80k transaction, a BBB accreditation badge is a meaningful trust signal at the point of quote decision. Additionally, Whitespark 2026 data shows BBB accreditation is a Tier 1 citation factor specifically for home services.

---

## Local On-Page SEO Assessment

**Score: 82/100**

### Homepage

- Title: "Bay Area Design-Build & Exteriors Contractor | Hamilton Exteriors" — Includes primary geo modifier. Could be stronger with city name: "Bay Area Roofing & Exteriors Contractor | Hamilton Exteriors" (roofing is higher-volume primary query than "design-build")
- Meta description includes phone number — strong click-through signal
- H1: "Bay Area's Top Design-Build & Exteriors Contractor" — serviceable but "design-build" is a low-volume search term for this audience. Consider "Bay Area's Top Roofing & Exteriors Contractor" for the hero, with design-build as a secondary qualifier
- geo.placename: Correctly set to "Bay Area, California" at layout level and overridden to city name on city pages — good implementation
- geo.position: Hardcoded to Castro Valley coordinates (37.69427;-122.07887) — this is correct for the business address but should be noted that it does not change per city page

### Service Pages (/roofing, /siding)

- Title patterns include city modifier "Bay Area" — correct
- FAQPage schema on all service pages — strong signal for AI visibility (featured snippets, SGE)
- Phone number appears 6+ times on roofing page — good
- Internal links to city-specific pages are present — correct
- Missing: LocalBusiness schema `openingHoursSpecification` at service page level (it's on the Organization but not surfaced in a page-level markup)

### City Pages

- H1 pattern: "[City]'s Top Design-Build & Exteriors Contractor" — consistent
- Neighborhood sections (H3 level) with unique content — strong local signal
- Breadcrumb nav rendered and schema-backed — good
- Missing: No visible Google Maps embed or directions CTA on city pages. An embedded map with a marker at the city center (or the business address) is a strong local relevance signal for SABs.

### Blog

- 12+ posts, all with "Bay Area" geo-modifier in titles — good
- No city-specific blog posts detected (e.g., "Roofing Costs in Oakland 2026") — missed opportunity for long-tail local organic
- Blog posts do not systematically link to city service pages — fix this

---

## Local Link & Authority Signals

**Score: 65/100**

| Signal | Status | Notes |
|--------|--------|-------|
| CSLB verification link | Present (sameAs) | Authoritative local authority link |
| Manufacturer certifications as links | Schema only | GAF, James Hardie, Owens Corning not linked from their sites to hamilton-exteriors.com |
| Local press / news mentions | Not detected | Bay Area home improvement coverage |
| Local business associations | Not detected | NRCA, CRCA, local chamber of commerce |
| Competitor backlink gap | Unknown | Requires Ahrefs/Semrush |
| Wikipedia geographic entity links | Present (in schema) | Not inbound links but correct entity relationships |

**Manufacturer certification backlinks:** GAF Certified, Owens Corning Preferred, and James Hardie Elite Preferred all have contractor locator pages that link to certified contractors' websites. These are Tier 1 authority links for roofing contractors. Confirm that hamilton-exteriors.com is listed on each manufacturer's "Find a Contractor" page. If not, contact the manufacturer rep to add the listing — this is free and typically takes one email.

---

## Top 10 Prioritized Actions

### Critical (Do Immediately)

**1. Launch a review velocity campaign — this week**
At 74 days without a new review, the listing has crossed the 18-day Sterling Sky cliff. Text or email every completed project from the past 60 days asking for a Google review. Target: 2-4 new reviews per month as a floor, 8-10 to catch up. A single Google review request sequence (job completion email + 7-day SMS follow-up) is the highest-ROI local SEO action available.

**2. Verify and optimize GBP primary category**
Log into GBP and confirm: primary category = "Roofing Contractor" (not "General Contractor" or "Home Improvement Contractor"). Per Whitespark 2026, the primary category is the single highest-weighted local ranking factor (193 points). The wrong category is simultaneously the #1 negative factor (176 points). Add secondary categories: "Siding Contractor," "Window Installation Service," "General Contractor." Add services, description with CSLB #1078806, and service area (all 6 counties).

**3. Resolve the business name inconsistency**
"Hamilton Exteriors" vs "Hamilton Exteriors, Inc." appears across schema, the About page, and BBB. Decide on one canonical name and apply it uniformly: schema `name` property, GBP business name, all directory listings. If the legal entity is Hamilton Exteriors, Inc., the GBP name should match the legal DBA exactly.

### High Priority (This Month)

**4. Add a Google Maps embed to the homepage and contact section**
An embedded interactive map (even for a SAB) is a strong trust signal and helps Google associate the website with the GBP listing. Use the Place embed with your CID. At minimum, add a "View on Google Maps" button with the full CID URL rendered as a user-visible link (not just in schema).

**5. Claim BuildZoom and Houzz profiles**
BuildZoom pulls CSLB #1078806 data automatically — claim the profile at buildzoom.com, add photos, and link to hamilton-exteriors.com. Houzz requires manual profile creation: add 10+ project photos from CompanyCam, list all services, and include the Castro Valley address. Both platforms rank on page 1 for "[city] roofing contractor" in California.

**6. Fix the `contactPoint.areaServed` value**
Change from `"US"` to `"CA"` or an array of the 6 county names. An SAB claiming to serve all of the United States in schema dilutes geographic relevance signals.

**7. Fix duplicated testimonials on city pages**
The same reviews from Sarah M, David K, and Jennifer L appear on Oakland, Berkeley, and Walnut Creek pages with only neighborhood names swapped. This is a manual action risk. Replace with: (a) genuine city-specific reviews pulled from Google (when you have them), or (b) generic company testimonials without geographic specificity, or (c) remove the review section from city pages and let the Organization-level aggregateRating schema do the work.

### Medium Priority (This Quarter)

**8. Increase unique content on city hub pages to 40%+**
The FAQ sections on city pages are identical except for the city name. Write one set of city-specific FAQ answers per county (not per city — that's 6 sets instead of 47) addressing real local questions: permit costs for that jurisdiction, fire zone requirements, HOA considerations, local material preferences. This is the minimum to avoid thin content classification.

**9. Pursue BBB accreditation**
The current A- rating without accreditation badge costs credibility at the quote stage. BBB accreditation for a small contractor is typically $600-$900/year. The accreditation badge on the website and GBP listing is a documented conversion signal for $15k+ transactions.

**10. Create city-specific blog posts for top 5 markets**
Oakland, Berkeley, San Jose, Walnut Creek, and San Rafael are the likely highest-volume markets in the service area. One blog post per city ("Roofing Costs in Oakland, CA: 2026 Guide," "Best Roofing Contractors in Berkeley, CA") with genuine local data will capture long-tail local organic traffic and internal link equity to city service pages. This also satisfies Whitespark 2026's #1 AI visibility factor: dedicated service + location pages.

---

## Limitations Disclaimer

The following could not be assessed without paid tools or console access:

- **GBP console access required:** Primary category, secondary categories, GBP description text, GBP photo freshness and count, GBP posts history, Q&A completeness, GBP performance metrics (views, calls, directions clicks), GBP service items.
- **Local Pack position data:** Real-time Local Pack rankings for target keywords ("roofing contractor Oakland," etc.) require DataForSEO or BrightLocal grid ranking tools.
- **Backlink profile:** Full inbound link audit (domain authority, referring domains, anchor text distribution, competitor gap) requires Ahrefs or Semrush.
- **Review platform verification:** Yelp profile contents returned 403 (bot block); Houzz, Angi, Thumbtack, Nextdoor, and BuildZoom listings could not be fetched. NAP consistency on those platforms is unconfirmed.
- **Proximity factor:** Per Search Atlas ML research, proximity to searcher accounts for 55.2% of local ranking variance. This is entirely outside SEO control and cannot be influenced by on-site changes.
- **Sitemap and robots.txt:** Both returned 502 errors at audit time — investigate Railway SSR health for these routes.
- **Review response rate:** Cannot confirm whether GBP reviews are being responded to without console access. Response rate is a documented local ranking signal.

---

*Report generated April 6, 2026. Crawl-based analysis using WebFetch + source code review.*
*File: `/LOCAL-SEO-AUDIT.md` in the hamilton-exteriors project root.*
