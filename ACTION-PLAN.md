# Hamilton Exteriors — SEO Action Plan

**Based on:** Full SEO Audit (7 specialist subagents), April 4, 2026
**Overall Score:** 71/100
**Target Score:** 85+ after completing Critical + High items

---

## CRITICAL — Fix Immediately (Impact: Score +8-10)

### 1. Point hamilton-exteriors.com DNS to Railway
- **Why:** Canonical domain still serves Framer. Google is indexing the wrong site. All canonical tags, sitemaps, and schema point to hamilton-exteriors.com but that domain shows Framer content.
- **Fix:** Update DNS A/CNAME records to point to Railway
- **Effort:** 15 minutes + propagation time
- **Impact:** Unlocks all SEO value. Nothing else matters until this is done.

### 2. Remove wrong sameAs links (Angi + HomeAdvisor)
- **Why:** Both URLs point to "ABR Quality Resources Inc" in Citrus Heights — a different business. This actively poisons the Hamilton Exteriors entity in Google's Knowledge Graph.
- **File:** `src/layouts/Layout.astro` — sameAs array
- **Fix:** Remove the two URLs. Add back only when correct Hamilton Exteriors profiles exist.
- **Effort:** 10 minutes

### 3. Fix reviewCount schema mismatch
- **Why:** Schema says `reviewCount: 4` but site claims "50+ Bay Area Homeowners." Google rich results will display 4 reviews.
- **File:** `src/layouts/Layout.astro` — aggregateRating block
- **Fix:** Update reviewCount and ratingCount to actual Google review count
- **Effort:** 5 minutes

### 4. Fix homepage meta description
- **Why:** Currently truncated to "Bay Area" — missing the full description. This is the #1 page and has no working meta description.
- **File:** Homepage component/layout
- **Fix:** Write a full 150-160 char meta description
- **Effort:** 10 minutes

### 5. Restore IndexNow key file
- **Why:** /indexnow-key.txt returns 404. IndexNow pings are failing silently.
- **Fix:** Ensure the key file is in /public/ and being served
- **Effort:** 10 minutes

---

## HIGH — Fix Within 1 Week (Impact: Score +5-7)

### 6. Fix HTML artifacts in BlogPosting FAQ schema
- **Why:** FAQ answer text contains raw HTML (`id="..."` attributes). Non-compliant structured data.
- **File:** Blog post template (Astro component rendering BlogPosting + FAQPage schema from Ghost content)
- **Fix:** Strip HTML tags from FAQ answer text before JSON-LD serialization
- **Effort:** 30 minutes

### 7. Use full business entity schema on all page types
- **Why:** Blog and city pages use a stripped-down business entity (missing sameAs, logo, geo, credentials). Inconsistent entity representation hurts Knowledge Graph confidence.
- **Fix:** Apply the full RoofingContractor+GeneralContractor block from homepage to all page types
- **Effort:** 1 hour

### 8. Rewrite city hub H1s for keyword targeting
- **Why:** Current H1 "[City]'s Top Design-Build & Exteriors Contractor" uses low-volume terms. "Roofing contractor [city]" and "roofer [city]" are the high-volume searches.
- **Fix:** Change to "Roofing, Siding & Exterior Remodeling in [City], CA" or similar keyword-leading format
- **Effort:** 30 minutes

### 9. Add cross-links from service pages to city+service pages
- **Why:** /roofing has high link equity from homepage but doesn't link to /oakland-ca/roofing. Missing a critical internal link path for pSEO pages.
- **Fix:** Add "Roofing Services by City" section to /roofing, /siding, /windows with links to top city+service pages
- **Effort:** 1-2 hours

### 10. Clarify llms.txt citation license
- **Why:** Current language ("Reproduction... prohibited") may cause conservative AI models to cite less.
- **File:** `public/llms.txt` and `public/llms-full.txt`
- **Fix:** Add: "Citation and quotation in AI search responses is explicitly permitted and encouraged."
- **Effort:** 10 minutes

### 11. Drive Google review velocity
- **Why:** 4 reviews in schema is well below the competitive threshold for Bay Area contractors. Sterling Sky's 18-day rule: rankings drop if no new review within 18 days.
- **Fix:** Set up post-project review request flow (SMS/email, 24-48 hours after completion). Target: 15+ reviews in 90 days, then 2+/month.
- **Effort:** 2-3 hours to set up automation

---

## MEDIUM — Fix Within 1 Month (Impact: Score +3-5)

### 12. Localize city page FAQs
- **Why:** All 29 city pages share identical FAQ questions and answers. City-specific FAQs (permit costs, local code requirements, typical project timelines) would increase unique content from 35% to 55%+.
- **Effort:** 4-6 hours (2-3 unique FAQs per city × 29 cities, can template with city-specific data)

### 13. Add city-specific testimonials
- **Why:** Same 4 reviews on every city page. An Oakland homeowner review on the Oakland page increases local trust signals.
- **Fix:** Source or tag reviews by city, display city-relevant reviews on each city page
- **Effort:** 2-3 hours

### 14. Create YouTube channel
- **Why:** YouTube presence has 0.737 correlation with AI citations — the strongest single brand signal. Even 3-5 videos (roof install time-lapse, before/after, "signs you need a new roof") establish the entity.
- **Fix:** Create channel, upload 3-5 videos, add URL to schema sameAs, llms.txt, and site footer
- **Effort:** 1-2 days initial

### 15. Add Google Maps embed to homepage
- **Why:** No Maps embed anywhere on site. Easy GBP reinforcement signal for local SEO.
- **Fix:** Embed Google Maps iframe near the CTA or service areas section
- **Effort:** 30 minutes

### 16. Audit 174 city+service pages for content quality
- **Why:** At 174 pages, this is in doorway-page risk territory. If content is template-swapped with only city name changes, Google may apply a thin content penalty.
- **Fix:** Verify content differentiation. If thin, either build out unique content per page or reduce sitemap to top 30 cities until content is ready.
- **Effort:** 2-4 hours audit, variable for content creation

### 17. Add Person schema for Alexander Hamilton Li
- **Why:** Strengthens E-E-A-T for blog content. Links founder entity to CSLB credentials and business entity.
- **Fix:** Add standalone Person JSON-LD block on blog posts. Update BlogPosting author to reference `#founder` @id.
- **Effort:** 1 hour

### 18. Fix BBB name discrepancy
- **Why:** BBB shows "Hamilton Exteriors, Inc" — schema uses "Hamilton Exteriors". Inconsistent entity naming weakens citation signals.
- **Fix:** Either update BBB to match, or add "Inc" to schema if that's the legal name
- **Effort:** 15 minutes

### 19. Claim missing directory listings
- **Why:** Missing from Thumbtack (strongest Home Services citation per 2024 data), Houzz, and Nextdoor.
- **Fix:** Create/claim profiles on Thumbtack, Houzz, Nextdoor. Add to sameAs once live.
- **Effort:** 1-2 hours

### 20. Add certifications to llms-full.txt
- **Why:** GAF Certified, CertainTeed ShingleMaster, Owens Corning Preferred, James Hardie Elite, Tesla Powerwall Certified are on the site but missing from llms-full.txt.
- **File:** `public/llms-full.txt`
- **Fix:** Add "Certifications & Partnerships" section
- **Effort:** 15 minutes

---

## LOW — Backlog (Impact: Score +1-2)

### 21. Add `alt=""` to decorative checkmark icons
- **File:** Checkmark icon component
- **Effort:** 5 minutes

### 22. Remove changefreq and priority from sitemap
- **Why:** Google ignores both. Adds 30% XML payload for no benefit.
- **File:** `astro.config.mjs` — serialize function
- **Effort:** 10 minutes

### 23. Normalize lastmod date format in sitemap
- **Why:** Non-blog pages emit full ISO 8601 timestamp; blog posts emit date-only. Should be consistent.
- **File:** `astro.config.mjs` — fallback lastmod
- **Fix:** Change `new Date().toISOString()` to `new Date().toISOString().split('T')[0]`
- **Effort:** 5 minutes

### 24. Add WebPage schema to city pages
- **Fix:** Add WebPage block with isPartOf → #website reference
- **Effort:** 30 minutes

### 25. Convert 2-3 service page H2s to question format
- **Why:** Question-phrased H2s match AI extraction patterns better. "How Much Does a Roof Cost in the Bay Area?" > "Roofing Pricing"
- **Effort:** 30 minutes

### 26. Add SearchAction to WebSite schema
- **Why:** Enables Google Sitelinks Searchbox (only if blog supports search)
- **Effort:** 15 minutes

### 27. Add service area map
- **Fix:** SVG or Google Maps coverage map on /service-areas hub page
- **Effort:** 1-2 hours

### 28. Build Reddit presence
- **Why:** Genuine participation in r/BayAreaHomeOwners, r/homeimprovement builds brand signals over 3-6 months
- **Effort:** Ongoing, 30 min/week

---

## Impact Timeline

| Timeframe | Actions | Expected Score |
|-----------|---------|----------------|
| This weekend | #1-5 (Critical) | 71 → 78 |
| Week 1 | #6-11 (High) | 78 → 83 |
| Month 1 | #12-20 (Medium) | 83 → 88 |
| Ongoing | #21-28 (Low) + review velocity | 88 → 90+ |

---

## Post-DNS-Cutover Checklist

Once hamilton-exteriors.com points to Railway:

- [ ] Verify sitemap-index.xml → sitemap-0.xml resolves on canonical domain
- [ ] Verify image-sitemap.xml resolves
- [ ] Submit sitemap to Google Search Console
- [ ] Remove Railway URL sitemap entry from robots.txt
- [ ] Verify all canonical tags resolve correctly
- [ ] Request Google re-crawl of key pages
- [ ] Monitor Search Console for indexing errors
- [ ] Verify llms.txt accessible on canonical domain

---

*Action plan generated April 4, 2026.*
