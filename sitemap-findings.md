# Sitemap Audit — Hamilton Exteriors
**Date:** 2026-04-02
**Live sitemap:** https://hamilton-exteriors.com/sitemap.xml (30 URLs)

---

## Critical Finding: Site is on Framer, Not Astro

The live site at `hamilton-exteriors.com` is served by **Framer** (`Server: Framer/154a7c5`), not the Astro build in this repository. The Astro project's sitemap configuration in `astro.config.mjs` is not yet deployed to production. All URL-status analysis below reflects the **live Framer site**, while the sitemap configuration analysis reflects what the **Astro build will produce** once deployed.

---

## Validation Report

### Check 1: XML Format
**PASS.** The live sitemap is well-formed XML with the correct `urlset` namespace (`http://www.sitemaps.org/schemas/sitemap/0.9`). No syntax errors.

### Check 2: URL Count vs 50,000 Limit
**PASS (live).** 30 URLs — well within the 50,000 per-file limit.

**NOTE (Astro build when deployed).** The `astro.config.mjs` sitemap will generate significantly more URLs. Estimated total:
- Core pages (auto-discovered): ~15
- County pages: 5
- City pages (29 cities): 29
- County+service pages (5 counties x 6 services): 30
- City+service pages (29 cities x 6 services): 174
- Blog posts (Ghost CMS, count varies): unknown
- **Estimated total: 253+ static pages + blog posts**

Still well under 50,000. No sitemap index required unless blog grows past ~49,700 additional posts.

### Check 3: HTTP Status Codes (live Framer site)
**PASS for all 30 URLs in current sitemap.** Every URL returns 200.

| URL | Status |
|-----|--------|
| All 30 sitemap URLs | 200 OK |

### Check 4: Noindex Pages in Sitemap
**FAIL (medium severity).** `/success` is included in the live sitemap but should be excluded. It is a post-conversion confirmation page with no SEO value, and including it signals to crawlers that it is a canonical indexable page.

The Astro sitemap config **correctly** excludes `/success` in its filter. This is a live-vs-config discrepancy.

No noindex meta tags are present on any of the checked pages — the Framer site is not suppressing indexation via meta tags, so exclusion must be handled at the sitemap level.

### Check 5: Deprecated Tags (priority, changefreq)
**PASS.** Neither `<priority>` nor `<changefreq>` appear in the live sitemap. Both are ignored by Google and their absence is correct.

### Check 6: lastmod Accuracy
**FAIL (low severity).** Zero URLs in the live sitemap have a `<lastmod>` date. The Astro config handles this correctly: it omits `lastmod` for static pages (avoiding a fabricated uniform build timestamp) and pulls real `updated_at` dates from Ghost CMS for blog posts. The live Framer sitemap should adopt the same approach — either omit lastmod entirely, or supply real dates from Framer's publish/edit history.

### Check 7: robots.txt
**PASS.** `robots.txt` correctly declares:
```
Sitemap: https://hamilton-exteriors.com/sitemap.xml
```
No crawl restrictions are blocking important pages.

### Check 8: Sitemap Index
**NOT REQUIRED.** The 404 on `/sitemap-index.xml` is not a problem — a sitemap index is only needed when splitting across multiple files (>50,000 URLs). At current and projected scale, a single sitemap file is correct. robots.txt already points to `/sitemap.xml`, which is the right setup.

---

## Missing Pages (in build, not in live Framer sitemap)

These pages exist in the Astro source and will be in the Astro-generated sitemap, but are **absent from the current live Framer sitemap**:

| Page | Astro Source File | Should be in sitemap? |
|------|-------------------|-----------------------|
| `/siding` | `siding.astro` | YES |
| `/windows` | `windows.astro` | YES |
| `/adu` | `adu.astro` | YES |
| `/additions` | `additions.astro` | YES |
| `/buy` | `buy/index.astro` | YES — high-value conversion page |
| `/blog` | `blog/index.astro` | YES — hub page |
| `/blog/[slug]` (all posts) | `blog/[slug].astro` | YES — each published post |
| `/custom-homes` | `custom-homes.astro` | YES |
| `/service-areas/napa-county-ca` (county only) | catch-all | YES |
| `/service-areas/santa-clara-county-ca` (county only) | catch-all | YES |

**Note:** `/blog`, `/buy`, and all these service pages return **404 on the live Framer site** — they are Astro-only pages not yet published in Framer. This is a deployment-gap issue, not a sitemap configuration issue.

---

## Extra Pages in Sitemap That Should Be Removed

| URL | Issue |
|-----|-------|
| `https://hamilton-exteriors.com/success` | Post-conversion page. No SEO value. Should be excluded from sitemap. The Astro config already filters this out. |
| `https://hamilton-exteriors.com/additions-2` | Appears to be a draft/variant page. The Astro config filters this out. Confirm whether this page should be publicly indexed at all; if not, add a `noindex` meta tag. |
| `https://hamilton-exteriors.com/additions-3` | Same concern as additions-2. The Astro config filters this out. |

---

## Quality Gate: Location Pages

**Current location page count in Astro sitemap config:**
- 5 county pages
- 29 city pages
- 30 county+service pages (5 counties x 6 services)
- 174 city+service pages (29 cities x 6 services)
- **Total location pages: 238**

**WARNING — 238 location pages exceeds the 30-page threshold.**

At this scale, Google's doorway page algorithm is a real risk. The key question is content uniqueness across the city+service and county+service pages. If these 204 city+service and county+service pages contain only city/county name substitution with otherwise identical copy, they qualify as doorway pages under Google's guidelines.

**Required before these pages go live:**
- Each page must have at least 60% unique content (local project examples, neighborhood context, local regulations/permits, actual service history in that city)
- The `[...slug].astro` catch-all pulls content from Ghost CMS — confirm that Ghost has genuinely unique content for each of the 204 city+service combinations, not templated copy with swapped city names
- If Ghost content is not ready for all 204 pages, exclude city+service and county+service pages from the sitemap until content is live

The 5 county pages and 29 city pages are acceptable as hub/landing pages if they have substantive content beyond the city name.

---

## URL Structure Assessment

**PASS.** URL structure is clean and hierarchical:
- `/service-areas/{county-slug}/{city-slug}` — logical nesting
- `/service-areas/{county-slug}/{city-slug}/{service}` — clear intent
- All lowercase, hyphenated slugs, no trailing slashes (consistent with `trailingSlash: 'never'` in Astro config)

One observation: the Astro config `customPages` explicitly lists `/siding` and `/windows` as needing manual addition ("not auto-discovered by SSR"), but does not list `/adu`, `/additions`, `/buy`, `/blog`, or `/custom-homes`. Verify that SSR auto-discovery is actually picking those up, or add them to `customPages` as well.

---

## Recommended Sitemap (for live Framer site, immediate fixes)

Remove `/success`, `/additions-2`, `/additions-3` from the Framer sitemap. The corrected minimal sitemap should be:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://hamilton-exteriors.com/</loc></url>
  <url><loc>https://hamilton-exteriors.com/roofing</loc></url>
  <url><loc>https://hamilton-exteriors.com/siding</loc></url>
  <url><loc>https://hamilton-exteriors.com/windows</loc></url>
  <url><loc>https://hamilton-exteriors.com/adu</loc></url>
  <url><loc>https://hamilton-exteriors.com/additions</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/alameda-county-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/alameda-county-ca/berkeley-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/alameda-county-ca/fremont-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/alameda-county-ca/hayward-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/alameda-county-ca/san-leandro-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/contra-costa-county-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/contra-costa-county-ca/antioch-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/contra-costa-county-ca/concord-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/contra-costa-county-ca/richmond-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/contra-costa-county-ca/san-ramon-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/contra-costa-county-ca/walnut-creek-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/marin-county-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/marin-county-ca/larkspur-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/marin-county-ca/mill-valley-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/marin-county-ca/novato-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/marin-county-ca/san-rafael-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/napa-county-ca</loc></url>
  <url><loc>https://hamilton-exteriors.com/service-areas/santa-clara-county-ca</loc></url>
</urlset>
```

This covers all confirmed 200-status indexable pages on the live Framer site. Add `/buy`, `/blog`, blog post URLs, and city+service pages as they go live on the Astro build.

---

## Summary Table

| Check | Result | Severity |
|-------|--------|----------|
| Valid XML | PASS | — |
| URL count < 50,000 | PASS | — |
| All URLs return 200 | PASS | — |
| Noindex pages excluded | FAIL — /success in sitemap | Medium |
| No deprecated tags | PASS | — |
| lastmod present/accurate | FAIL — no dates anywhere | Low |
| robots.txt correct | PASS | — |
| Sitemap index needed | NOT REQUIRED | — |
| /success excluded | FAIL | Medium |
| /additions-2, /additions-3 excluded | FAIL | Medium |
| Location page quality gate (238 pages) | WARNING | High |
| City+service pages confirmed 200 | FAIL — all 404 on live site | High |
| SSR auto-discovery covers all core pages | NEEDS VERIFICATION | Medium |

---

## Action Items

1. **Immediate (Framer site):** Remove `/success`, `/additions-2`, `/additions-3` from the Framer sitemap via the Framer editor.

2. **Before Astro deploy:** Verify that `/adu`, `/additions`, `/buy`, `/blog`, and `/custom-homes` are auto-discovered by Astro SSR sitemap, or add them to `customPages` in `astro.config.mjs`.

3. **Before enabling city+service and county+service pages:** Audit Ghost CMS content for all 204 pages to confirm genuine uniqueness (not city-swapped templates). Do not add these 204 URLs to the sitemap until content is verified.

4. **Once Astro is deployed:** The Astro-generated sitemap will supersede the Framer one. Confirm Railway is serving `/sitemap.xml` from the Astro build and that robots.txt is correct in the deployed output.

5. **Add lastmod to blog posts:** The Astro config already does this from Ghost `updated_at`. Confirm Ghost env vars (`PUBLIC_GHOST_URL`, `PUBLIC_GHOST_CONTENT_API_KEY`) are set on Railway so the sitemap build step can fetch post dates.
