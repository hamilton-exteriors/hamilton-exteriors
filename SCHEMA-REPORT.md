# Hamilton Exteriors — Schema Markup Audit Report

**Audit Date:** April 2, 2026  
**Format Detected:** JSON-LD only (correct — Google's preferred format)  
**No Microdata or RDFa detected**  
**Pages Audited:** 5 (Homepage, /roofing, /oakland-ca, /blog, /service-areas)

---

## Schema Score: 78 / 100

| Dimension | Score | Notes |
|-----------|-------|-------|
| Type Selection | 95/100 | RoofingContractor + GeneralContractor is optimal |
| Required Properties | 90/100 | All required props present for each type |
| Recommended Properties | 85/100 | Strong — missing foundingDate, few gaps |
| Validation (no errors) | 60/100 | reviewCount mismatch, breadcrumb URL error, FAQPage restriction |
| Rich Result Eligibility | 65/100 | FAQPage restricted for non-gov sites; AggregateRating at risk |
| Entity Graph Coherence | 80/100 | Good @id linking, but huge duplication across pages |
| Coverage (missing opportunities) | 70/100 | No Article on blog, no PriceSpecification on service pages |

---

## Schema Inventory by Page

### Homepage (/)
| # | Schema Type | Status | Issues |
|---|-------------|--------|--------|
| 1 | BreadcrumbList | PASS | Single-item (Home only) — valid |
| 2 | RoofingContractor + GeneralContractor | WARN | reviewCount mismatch (see below) |
| 3 | WebSite | PASS | Correct @id linking to publisher |
| 4 | FAQPage | WARN | Restricted for non-gov/healthcare sites since Aug 2023 |

### /roofing
| # | Schema Type | Status | Issues |
|---|-------------|--------|--------|
| 1 | BreadcrumbList | PASS | 2-level (Home → Roofing) |
| 2 | RoofingContractor + GeneralContractor | WARN | Same reviewCount issue |
| 3 | WebSite | PASS | |
| 4 | Service (Roofing) | PASS | Good — provider links to @id, 5-county areaServed |
| 5 | FAQPage | WARN | Same restriction issue; FAQ content is well-structured |

### /service-areas/alameda-county-ca/oakland-ca
| # | Schema Type | Status | Issues |
|---|-------------|--------|--------|
| 1 | Service (Oakland) | PASS | City-specific with Wikipedia sameAs — excellent |
| 2 | RoofingContractor + GeneralContractor | WARN | Same reviewCount issue |
| 3 | WebSite | PASS | |
| 4 | BreadcrumbList | FAIL | URL error (see below) |
| 5 | FAQPage | WARN | Same restriction; identical FAQ across all city pages |

### /blog
| # | Schema Type | Status | Issues |
|---|-------------|--------|--------|
| 1 | CollectionPage | PASS | Good — links to #website and #business via @id |
| 2 | RoofingContractor + GeneralContractor | WARN | Same reviewCount issue |
| 3 | WebSite | PASS | |
| — | **Missing: Article/BlogPosting** | FAIL | No structured data for individual blog posts |

### /service-areas
| # | Schema Type | Status | Issues |
|---|-------------|--------|--------|
| 1 | ItemList | PASS | 5 counties with canonical URLs |
| 2 | BreadcrumbList | PASS | 2-level (Home → Service Areas) |
| 3 | RoofingContractor + GeneralContractor | WARN | Same reviewCount issue |
| 4 | WebSite | PASS | |

---

## Validation Errors & Warnings

### CRITICAL: `aggregateRating.reviewCount` Mismatch

**Location:** Every page (Layout.astro global schema)

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": 4.8,
  "reviewCount": 4,    // ← WRONG
  "ratingCount": 4     // ← WRONG
}
```

**Problem:** Schema declares 4 reviews but page content displays "4.8 based on 50 reviews." Only 4 individual `Review` objects are marked up in schema. Google cross-validates `reviewCount` against the number of `Review` entities and visible page content. This mismatch can cause:
- Rich snippet star ratings suppressed entirely
- Manual action risk if Google interprets it as deceptive markup

**Fix:** Either:
- Update `reviewCount` to match actual Google review count (if 50+, use `50`)
- Or remove `reviewCount` and `ratingCount` fields entirely (Google will count the `review[]` array)

### CRITICAL: Oakland Breadcrumb URL Mismatch

**Location:** `/service-areas/alameda-county-ca/oakland-ca` — BreadcrumbList block

```json
{
  "@type": "ListItem",
  "position": 4,
  "name": "Oakland, CA",
  "item": "https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland"
}
```

**Problem:** Breadcrumb URL says `/oakland` but the actual page URL is `/oakland-ca`. This broken breadcrumb reference will cause Google to either ignore the breadcrumb trail or display an incorrect link in search results. This likely affects ALL city pages if the template generates breadcrumb URLs without the `-ca` suffix.

**Fix:** In the city page breadcrumb generation, ensure the `item` URL matches the actual page slug (e.g., `/oakland-ca` not `/oakland`).

### WARNING: FAQPage Schema — Restricted Type

**Location:** Homepage, /roofing, all city pages

Since **August 2023**, Google restricts FAQPage rich results to government and healthcare authority sites only. For Hamilton Exteriors (a contractor), FAQPage schema will NOT generate FAQ rich snippets in Google Search.

**However:** Keep the FAQPage markup. While it won't produce Google rich results, it:
- Helps AI search engines (ChatGPT, Perplexity) extract Q&A pairs
- Is valid Schema.org markup (not deprecated)
- Provides structured data for Bing, which still supports FAQ rich results

**Action:** No removal needed, but don't invest time adding FAQPage to more pages expecting Google rich results.

### WARNING: Business Schema Duplication

The full RoofingContractor + GeneralContractor block (~180 lines of JSON-LD) is repeated verbatim on every page via Layout.astro. While not technically an error, this:
- Adds ~4KB of repeated markup per page
- Creates 251 identical entity declarations
- Could be simplified by emitting the full block once (homepage) and using `@id` references on subpages

**Optimization (optional):** On non-homepage pages, replace the full business block with:
```json
{
  "@context": "https://schema.org",
  "@type": ["RoofingContractor", "GeneralContractor"],
  "@id": "https://hamilton-exteriors.com/#business"
}
```
Google will use the `@id` to resolve the full entity from the homepage. This reduces page weight by ~4KB per page (~1MB total across 251 pages).

---

## Property-Level Validation

### RoofingContractor + GeneralContractor

| Property | Present | Valid | Notes |
|----------|---------|-------|-------|
| `@context` | PASS | PASS | `https://schema.org` |
| `@type` | PASS | PASS | Array `["RoofingContractor", "GeneralContractor"]` — valid dual-type |
| `@id` | PASS | PASS | `https://hamilton-exteriors.com/#business` — consistent across all pages |
| `name` | PASS | PASS | "Hamilton Exteriors" |
| `url` | PASS | PASS | `https://hamilton-exteriors.com` |
| `telephone` | PASS | PASS | `+1-650-977-3351` (E.164 format) |
| `email` | PASS | PASS | `support@hamilton-exteriors.com` |
| `address` | PASS | PASS | Complete PostalAddress with all fields |
| `geo` | PASS | PASS | 5 decimal places (37.69427, -122.07887) |
| `openingHoursSpecification` | PASS | PASS | Two specs: M-F 7-6, Sat 8-2 |
| `sameAs` | PASS | PASS | 5 external profiles (Yelp, FB, IG, LinkedIn, Maps) |
| `areaServed` | PASS | PASS | 5 Counties with Wikipedia sameAs and State containedInPlace |
| `aggregateRating` | PASS | FAIL | reviewCount/ratingCount = 4, should be 50+ |
| `priceRange` | PASS | WARN | `"$$"` — Google accepts this but prefers specific ranges like `"$15,000-$80,000"` |
| `image` | PASS | PASS | `og-default.jpg` |
| `logo` | PASS | PASS | ImageObject with width/height |
| `hasOfferCatalog` | PASS | PASS | 6 services with individual URLs |
| `hasCredential` | PASS | PASS | CSLB license with recognizedBy Organization — excellent |
| `additionalType` | PASS | PASS | 3 Wikipedia links |
| `knowsAbout` | PASS | PASS | 11 topic strings |
| `description` | PASS | PASS | Under 300 chars |
| `review` | PASS | PASS | 4 reviews with datePublished, author, rating, body, itemReviewed |
| `foundingDate` | MISSING | — | Recommended for LocalBusiness |
| `founder` | MISSING | — | Recommended — would strengthen E-E-A-T entity |
| `numberOfEmployees` | MISSING | — | Optional but useful for entity disambiguation |
| `paymentAccepted` | MISSING | — | Mentioned in FAQ copy ("checks, ACH, credit cards") |

### WebSite

| Property | Present | Valid | Notes |
|----------|---------|-------|-------|
| `@context` | PASS | PASS | |
| `@type` | PASS | PASS | |
| `@id` | PASS | PASS | `#website` — links to publisher `#business` |
| `url` | PASS | PASS | |
| `name` | PASS | PASS | |
| `publisher` | PASS | PASS | Uses @id reference — correct |
| `potentialAction` (SearchAction) | MISSING | — | Not needed for a static site without search functionality |

### Service (on /roofing)

| Property | Present | Valid | Notes |
|----------|---------|-------|-------|
| `name` | PASS | PASS | "Bay Area Roofing" |
| `url` | PASS | PASS | |
| `serviceType` | PASS | PASS | "Roofing" |
| `provider` | PASS | PASS | Links to @id — correct |
| `areaServed` | PASS | PASS | 5 counties — matches business schema |
| `description` | PASS | PASS | |
| `offers` / `priceSpecification` | MISSING | — | Page has specific pricing ($940-$1,525/sq) not in schema |
| `termsOfService` | MISSING | — | Has warranty info not in schema |

### Service (on /oakland-ca)

| Property | Present | Valid | Notes |
|----------|---------|-------|-------|
| `name` | PASS | PASS | "Roofing and Exterior Services in Oakland, CA" |
| `url` | PASS | PASS | |
| `provider` | PASS | PASS | @id reference |
| `areaServed` | PASS | PASS | City type with Wikipedia sameAs — excellent |
| `serviceType` | PASS | PASS | Array of 6 service types |
| `description` | PASS | PASS | City-specific |

### BreadcrumbList

| Page | Levels | Valid | Notes |
|------|--------|-------|-------|
| Homepage | 1 (Home) | PASS | |
| /roofing | 2 (Home → Roofing) | PASS | |
| /service-areas | 2 (Home → Service Areas) | PASS | |
| /oakland-ca | 4 (Home → Service Areas → Alameda → Oakland) | FAIL | Oakland URL missing `-ca` suffix |
| /blog | 2 (Home → Ground Up) | PASS | Via CollectionPage.breadcrumb |

### CollectionPage (/blog)

| Property | Present | Valid | Notes |
|----------|---------|-------|-------|
| `@id` | PASS | PASS | `#collection` |
| `name` | PASS | PASS | |
| `description` | PASS | PASS | |
| `url` | PASS | PASS | |
| `isPartOf` | PASS | PASS | Links to `#website` |
| `breadcrumb` | PASS | PASS | Inline BreadcrumbList |
| `publisher` | PASS | PASS | Links to `#business` |
| `mainEntity` (blog posts) | MISSING | — | Could list blog posts as `hasPart` |

### ItemList (/service-areas)

| Property | Present | Valid | Notes |
|----------|---------|-------|-------|
| `name` | PASS | PASS | |
| `itemListElement` | PASS | PASS | 5 counties with positions and URLs |
| All URLs absolute | PASS | PASS | Using hamilton-exteriors.com domain |

---

## Missing Schema Opportunities

### 1. Article/BlogPosting on Blog Posts — HIGH PRIORITY

Individual blog post pages (`/blog/[slug]`) have NO Article or BlogPosting schema. This is the biggest gap.

**Recommended schema for blog posts:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Post Title]",
  "description": "[Post excerpt]",
  "image": "[Featured image URL]",
  "datePublished": "[YYYY-MM-DD from Ghost]",
  "dateModified": "[YYYY-MM-DD from Ghost updated_at]",
  "author": {
    "@type": "Person",
    "name": "Marcus Hamilton",
    "jobTitle": "Owner",
    "worksFor": {
      "@id": "https://hamilton-exteriors.com/#business"
    }
  },
  "publisher": {
    "@id": "https://hamilton-exteriors.com/#business"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "[Post URL]"
  },
  "isPartOf": {
    "@id": "https://hamilton-exteriors.com/#website"
  }
}
```

**File to modify:** `src/pages/blog/[slug].astro`

### 2. PriceSpecification on Service Pages — MEDIUM PRIORITY

The /roofing page has specific pricing ($940-$1,525 per roofing square) but this isn't in schema. Adding `Offer` with `PriceSpecification` would improve structured data richness:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Asphalt Shingle Roofing",
  "provider": { "@id": "https://hamilton-exteriors.com/#business" },
  "areaServed": { "@type": "State", "name": "California" },
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "940.00",
      "priceCurrency": "USD",
      "unitText": "per roofing square (100 sq ft)",
      "minPrice": "940.00",
      "maxPrice": "1525.00"
    }
  }
}
```

### 3. `foundingDate` and `founder` — LOW PRIORITY

Add to the business entity:

```json
"foundingDate": "[YYYY]",
"founder": {
  "@type": "Person",
  "name": "Marcus Hamilton"
}
```

### 4. `paymentAccepted` — LOW PRIORITY

FAQ copy mentions payment methods. Add:

```json
"paymentAccepted": ["Cash", "Check", "ACH Transfer", "Credit Card"]
```

---

## Deprecated/Restricted Type Check

| Type Used | Status | Action |
|-----------|--------|--------|
| RoofingContractor | ACTIVE | Keep |
| GeneralContractor | ACTIVE | Keep |
| FAQPage | RESTRICTED (Aug 2023) | Keep for AI extraction, but no Google rich results |
| BreadcrumbList | ACTIVE | Keep |
| WebSite | ACTIVE | Keep |
| Service | ACTIVE | Keep |
| AggregateRating | ACTIVE | Fix reviewCount |
| Review | ACTIVE | Keep |
| CollectionPage | ACTIVE | Keep |
| ItemList | ACTIVE | Keep |
| OfferCatalog | ACTIVE | Keep |
| EducationalOccupationalCredential | ACTIVE | Keep |

**No deprecated types detected.** No HowTo, SpecialAnnouncement, or other retired types in use.

---

## Prioritized Fixes

| # | Issue | Severity | Effort | File |
|---|-------|----------|--------|------|
| 1 | Fix `reviewCount: 4` → match actual count | CRITICAL | 5 min | Layout.astro ~L161 |
| 2 | Fix Oakland breadcrumb URL (`/oakland` → `/oakland-ca`) | CRITICAL | 10 min | GeneralCityPage.astro breadcrumb template |
| 3 | Add Article schema to blog posts | HIGH | 20 min | blog/[slug].astro |
| 4 | Add PriceSpecification to /roofing Service schema | MEDIUM | 15 min | roofing.astro |
| 5 | Add `foundingDate`, `founder`, `paymentAccepted` | LOW | 5 min | Layout.astro |
| 6 | Optimize: use @id references on subpages instead of full duplication | LOW | 30 min | Layout.astro |

---

*Schema audit generated April 2, 2026. All JSON-LD validated against Schema.org vocabulary and Google's rich result requirements.*
