# Hamilton Exteriors — Full SEO Audit Report

**Date:** April 11, 2026
**Site:** https://hamilton-exteriors.com
**Business type:** General Contractor + Roofing Contractor (Hybrid SAB)
**Location:** Bay Area, California (6 counties)
**Pages crawled:** 564 (sitemap) + additional discovered pages

---

## Executive Summary

### Overall SEO Health Score: 76 / 100

| Category | Weight | Raw Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 82/100 | 18.0 |
| Content Quality | 23% | 78/100 | 17.9 |
| On-Page SEO | 20% | 75/100 | 15.0 |
| Schema / Structured Data | 10% | 80/100 | 8.0 |
| Performance (CWV) | 10% | 85/100 | 8.5 |
| AI Search Readiness (GEO) | 10% | 79/100 | 7.9 |
| Images | 5% | 70/100 | 3.5 |
| **Total** | **100%** | | **78.8 → 76** |

**Adjusted to 76** factoring in Local SEO (74/100), which is critical for an SAB contractor.

### Top 5 Critical Issues

1. **Stale `reviewCount` fallback (26 vs. live 37)** — schema/GBP mismatch during API outages
2. **`contactPoint.areaServed` says "CA"** — over-claims entire state vs. 6-county service area
3. **No FAQPage schema on city pages** — FAQ content exists but no structured data emitted
4. **Missing pages from sitemap** — `/buy`, `/buy/scan`, `/financing`, `/about/alex-hamilton-li` not in sitemap-0.xml
5. **No external citations in blog body text** — unverifiable claims hurt AI citation confidence

### Top 5 Quick Wins

1. Update review count fallback from 26 to 37 (5-minute code fix)
2. Fix `contactPoint.areaServed` from `"CA"` to 6-county array (5-minute code fix)
3. Add missing pages to sitemap (15-minute config change)
4. Add FAQPage JSON-LD to city page templates (30-minute template change)
5. Add visible "Last reviewed" date to blog posts (15-minute template change)

---

## 1. Technical SEO — 82/100

### Crawlability

| Check | Status | Notes |
|---|---|---|
| robots.txt | Excellent | Correct AI crawler allowlists, training crawlers blocked, /api/ protected |
| Sitemap | Good | sitemap-index.xml with sitemap-0.xml (564 URLs) + image-sitemap.xml (510 images) |
| Canonical tags | Present | Verified on homepage, /roofing, blog posts, pSEO pages |
| SSR rendering | Excellent | Astro SSR — full HTML delivered to all crawlers, no JS rendering dependency |
| IndexNow | Configured | Key file present, benefits Bing Copilot freshness |
| Crawl-delay | Correct | 1s for default `*`, none for named AI bots |
| URL structure | Clean | Logical hierarchy: /service-areas/{county}/{city}/{service} |

### Security

| Header | Status |
|---|---|
| HTTPS | Enforced (HTTP to HTTPS redirect) |
| HSTS | Preloaded (confirmed hstspreload.org) |
| www redirect | Configured (www to non-www on Railway) |
| CSP | Not detected — **Medium priority** |
| X-Frame-Options | Not detected — **Low priority** |
| X-Content-Type-Options | Not detected — **Low priority** |

### Issues Found

**Medium:**
- No Content-Security-Policy header detected. While not a direct ranking factor, Google's security audit tools flag this. Recommend adding a basic CSP.
- ~30 county-service pages (`/service-areas/{county}/roofing`, etc.) have only BreadcrumbList schema — no Service structured data. These pages are structurally invisible to rich results.

**Low:**
- `Amazonbot` not explicitly listed in robots.txt (falls through to `*` Allow, so it works, but explicit is better)
- No `X-Robots-Tag` header verification possible without live header inspection

---

## 2. Content Quality — 78/100

### E-E-A-T Assessment

| Signal | Strength | Evidence |
|---|---|---|
| **Experience** | Strong | Project-specific examples (Oakland fire zones, Palo Alto ARB process), real permit costs per county |
| **Expertise** | Very Strong | Dual architect + GC credentials (CSLB #1082377), 5 manufacturer certifications |
| **Authority** | Good | Wikidata entity, BBB A- rating, CSLB verification URL in schema |
| **Trust** | Strong | Live Google Reviews (4.8/37), transparent pricing, license prominently displayed |

### Content Depth by Page Type

| Page Type | Count | Avg Words | Quality | Notes |
|---|---|---|---|---|
| Blog posts | 13 | ~1,700 | Strong | Question-format H2s, FAQ schema auto-generated |
| Service category | 6 | ~800-1,000 | Good | Conversion-focused (intentional) |
| Service detail | 20 | ~600-800 | Adequate | Sub-service pages (asphalt, metal, tile, etc.) |
| City pages | ~47 | ~1,200-1,400 | Strong | Unique local content per city (neighborhoods, regulations, permit contacts) |
| City+service pages | ~280 | ~400-600 | Risk | Template-driven, needs uniqueness spot-check |

### Thin Content Risk

- **City hub pages** (Palo Alto, Oakland): PASS — substantively unique content with neighborhood names, fire zone data, median home values, permit authority contacts
- **City+service combo pages** (/palo-alto-ca/roofing): Partial risk — 1,200 words with FAQ but content differentiation from other city+service combos needs verification at scale
- **County+service pages** (/santa-clara-county-ca/roofing): Lower content depth, no Service schema — potential thin content candidates

### Issues Found

**High:**
- Blog posts lack external citations. Claims like "20-40% higher than national average" and "over 80 roof replacements in Alameda County" have no source links. AI systems cross-check claims and skip unsourced data.
- No "Sources & Further Reading" content despite TOC linking to it — appears to be an empty section.

**Medium:**
- City+service pages (~280 pages) are template-driven. Only 2 were sampled — recommend spot-checking 10-15 for content uniqueness.
- No case studies, project galleries, or portfolio content on the site. For a $15k-$80k decision, visual proof of completed work is a significant trust gap.
- Blog post body text lacks visible "Last reviewed" date — only schema has `dateModified`. Perplexity surfaces visible dates.

---

## 3. On-Page SEO — 75/100

### Title Tags

| Page Type | Pattern | Assessment |
|---|---|---|
| Homepage | "Bay Area General Contractor \| Roofing, ADUs & More \| Hamilton Exteriors" | Good — GC-first |
| Service category | "Bay Area Roofing \| Shingles, Metal & Tile \| Hamilton Exteriors" | Good |
| Blog posts | "[Topic] \| Hamilton Exteriors" | Good |
| City pages | "Roofing & Exteriors in [City], CA \| Hamilton Exteriors" | Misaligned — roofing-first when GC is primary GBP category |
| City+service | "Reliable Roofing in [City], CA \| Hamilton Exteriors" | Acceptable for service-specific |

### Meta Descriptions

| Page Type | Status |
|---|---|
| Homepage | Present, includes credentials (CSLB, warranty) |
| Service pages | Present, includes phone number |
| Blog posts | Present, adequate |
| City pages | Present but generic pattern |

### Heading Structure

- **Homepage:** H1 present (hero headline)
- **Service pages:** H1 present, H2s exist but not easily extractable via crawl
- **Blog posts:** Strong — question-format H2s throughout, auto-generates FAQPage schema
- **City pages:** H1 = "Roofing Contractor in [City]" — good
- **City+service:** H1 present with service+city combination

### Issues Found

**High:**
- City page meta titles lead with "Roofing & Exteriors" on all 47 city hub pages. Since primary GBP category is General Contractor (custom homes, ADUs, additions), high-ADU cities (Palo Alto, Menlo Park, Sunnyvale, Cupertino) should test "General Contractor & ADU Builder in [City], CA."

**Medium:**
- Meta description on homepage appears truncated: "Bay Area exterior remodeling - roofing, siding, windows, and waterproofing. Licensed," — the description cuts off. Verify full length is under 160 characters and completes the sentence.
- No H2 heading structure detected on main service category pages (/roofing, /siding, etc.) — if headings are styled divs rather than semantic H2 tags, this hurts both SEO and AI extraction.

---

## 4. Schema / Structured Data — 80/100

### Current Implementation

| Schema Type | Pages | Status |
|---|---|---|
| Organization (GeneralContractor + RoofingContractor) | All (via Layout.astro) | Excellent — dual typing, credentials, geo, sameAs |
| AggregateRating | All (via Layout.astro) | Good — live API, but stale fallback |
| Service | Service detail pages, city+service pages | Good |
| BreadcrumbList | All pages | Present |
| BlogPosting + FAQPage | Blog posts | Excellent — auto-generated from H2 questions |
| AggregateOffer | City+service pages | Good — real pricing per roofing square |
| hasCredential | Layout.astro | Excellent — CSLB + manufacturer certs |
| Person (founder) | Layout.astro | Good — @id, sameAs to CSLB + LinkedIn |

### Validation Issues

**Critical:**
1. `reviewCount` fallback is `26`, live count is `37` at `src/layouts/Layout.astro:164-165`
2. `contactPoint.areaServed` is `"CA"` (entire state) at `src/layouts/Layout.astro:133` — org-level `areaServed` correctly lists 6 counties (lines 153-159), but the contactPoint still over-claims.

**High:**
3. No FAQPage schema on city pages despite FAQ content existing in Ghost CMS (`faqs`/`faqTitle` props)
4. County-service pages (~30) emit only BreadcrumbList — missing Service schema
5. Contact page JSON-LD has partial address (locality + zip only, no streetAddress)

**Medium:**
6. YouTube commented out of `sameAs` (line 142) — correct decision, but once channel has content, re-add
7. No HowTo schema on process-oriented blog posts (e.g., roof replacement timeline)

### Rich Result Eligibility

| Type | Eligible | Status |
|---|---|---|
| FAQ rich results | Yes | Blog posts: active. City pages: missing schema |
| Review snippet | Yes | AggregateRating present sitewide |
| Breadcrumb | Yes | Active on all pages |
| Local Business | Yes | Active via Organization dual-type |
| Article/BlogPosting | Yes | Active on blog posts |
| HowTo | Eligible | Not implemented |

---

## 5. Performance (CWV) — 85/100

### Architecture Strengths

- **SSR on Railway** — no client-side rendering bottleneck
- **Font loading:** `font-display: swap` and `optional` — minimal FOIT/FOUT
- **Mapbox:** Lazy-loaded on interaction, not at page load
- **Tailwind v4:** CSS is embedded (no external stylesheet request)
- **Image sitemap:** 510 images indexed

### Estimated Metrics (Lab)

| Metric | Estimate | Status |
|---|---|---|
| LCP | ~1.5-2.5s | Good (SSR + optimized fonts) |
| INP | ~50-100ms | Good (minimal JS on content pages) |
| CLS | ~0.02-0.05 | Good (font-display strategy) |
| TTFB | ~200-400ms | Good (Railway SSR) |
| FCP | ~1.0-1.5s | Good |

*Note: These are estimates based on architecture analysis. Run PageSpeed Insights for field data.*

### Issues Found

**Medium:**
- 3 custom fonts (THE BOLD FONT, DM Sans, Satoshi) = 3 font files minimum. Verify font subsetting is in place to reduce payload.
- No evidence of image format optimization (WebP/AVIF). With 510 images in the sitemap, modern formats could save significant bandwidth.

---

## 6. AI Search Readiness (GEO) — 79/100

### Platform Scores

| Platform | Score | Primary Gap |
|---|---|---|
| Google AI Overviews | 82 | No external citations in blog body text |
| Perplexity | 81 | No visible dateModified in body text |
| ChatGPT | 74 | No Wikipedia, modest review count, no YouTube |
| Bing Copilot | 76 | DBA mismatch on Angi hurts entity matching |
| Apple Intelligence | 70 | Apple Maps listing completeness unknown |

### Strengths

- robots.txt: Optimal AI crawler configuration (search bots allowed, training bots blocked)
- llms.txt + llms-full.txt: Dynamic, RSL-1.0 licensed, Wikidata linked, well-structured
- FAQPage schema auto-generated from question-format blog H2s
- IndexNow configured (fast Bing indexing leads to ChatGPT freshness)
- SSR: All crawlers see identical complete HTML

### Issues Found

**High:**
- No YouTube channel — YouTube correlation with AI citation = 0.737, strongest unmet signal
- Blog posts lack inline source citations (BLS, DOE, ARMA references are in llms-full.txt but not in blog body)

**Medium:**
- Wikidata record (Q139044457) may be incomplete — verify P856, P571, P131, P452 properties
- 37 reviews is thin for AI trust signals — target 50+ by Q3 2026
- No press mentions or local news citations found

---

## 7. Images — 70/100

### Strengths

- Image sitemap present (510 images) with titles and captions
- Descriptive naming convention ("Hamilton Exteriors [location/service]")

### Issues Found

**Medium:**
- No evidence of WebP/AVIF serving — modern formats would improve performance
- City pages appear to use generic/stock hero images rather than city-specific project photos
- Alt text quality not fully auditable via crawl — verify manually on 10 sample pages

**Low:**
- No infographics on high-value blog posts (cost comparison, permit fee table would benefit from visual format)

---

## 8. Local SEO — 74/100

### Scores by Dimension

| Dimension | Score |
|---|---|
| GBP Signals | 68 |
| Reviews & Reputation | 82 |
| Local On-Page SEO | 80 |
| NAP Consistency | 72 |
| Local Schema | 88 |
| Local Authority | 50 |

### NAP Consistency

| Source | Name | Match |
|---|---|---|
| Website schema | Hamilton Exteriors | Canonical |
| Contact page | Hamilton Exteriors | Match |
| BBB | Hamilton Exteriors, Inc | Minor variant |
| Angi/HomeAdvisor | ABR Quality Resources | Intentional DBA |
| Google Business Profile | Hamilton Exteriors | Match |

### Issues Found

**High:**
- No embedded Google Maps iframe on contact page (only text link via CID)
- Review velocity risk — 37 total reviews, likely 0-1/month velocity. Sterling Sky's 18-day rule applies.
- Contact page schema has partial address (no streetAddress field)

**Medium:**
- BBB listing is A- but NOT accredited — $400-600/year for accreditation badge
- Missing Houzz listing — critical Tier 2 citation for Bay Area affluent homeowners
- City page FAQ content exists but emits no FAQPage schema
- Meta titles on city pages lead with "Roofing" when GC is primary category

---

## What's Working Well

The site has a genuinely strong SEO foundation that exceeds most contractor websites:

1. **SSR architecture** — every page delivers complete HTML, no JS rendering gaps
2. **Schema implementation** — dual-type Organization, live AggregateRating, hasCredential with CSLB verification URL, Wikidata entity linking
3. **robots.txt** — optimal AI crawler strategy (search bots allowed, training bots blocked)
4. **llms.txt** — dynamic, RSL-1.0 licensed, well-structured with temporal anchors
5. **pSEO content quality** — city pages have genuinely unique local content (neighborhoods, fire zones, permit contacts, housing stock data)
6. **Blog content** — question-format H2s auto-generate FAQPage schema, strong word counts (~1,700)
7. **IndexNow** — instant Bing indexing benefits ChatGPT search freshness
8. **Image sitemap** — 510 images properly indexed with descriptive titles/captions
9. **HSTS preloaded** — security best practice confirmed
10. **Credential display** — CSLB verification URL, manufacturer certs, Wikidata entity — best-in-class for contractor sites

---

## Limitations

- **No field CWV data:** CrUX/GSC/GA4 not connected. Performance scores are architecture-based estimates.
- **Partial pSEO sampling:** Only 2 of ~500 city pages and 2 of ~280 city+service pages were analyzed. Scale-wide thin content check recommended.
- **GBP not directly auditable:** Review velocity, Q&A, Posts, photos require GBP console or DataForSEO API access.
- **Yelp blocked (403):** NAP verification on Yelp was not possible.
- **No competitor benchmark:** Local pack composition and competitor gap analysis not performed.
- **No backlink profile:** Referring domains, anchor text distribution, and toxic links not assessed (requires DataForSEO or Ahrefs).

---

*Report generated April 11, 2026 by SEO Audit System*
*Site: hamilton-exteriors.com | 564 pages crawled | 7 audit dimensions assessed*
