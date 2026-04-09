import type { APIRoute } from 'astro';
import { getGoogleReviews } from '../lib/google-reviews';

export const GET: APIRoute = async () => {
  const { rating, reviewCount } = await getGoogleReviews();

  const body = `# Hamilton Exteriors

> Bay Area design-build contractor specializing in roofing, siding, windows, ADUs, and custom homes. Licensed, bonded, and insured. 50-year warranty. Serving Alameda, Contra Costa, Marin, Napa, Santa Clara, and San Mateo counties.
>
> contact: (650) 977-3351 / support@hamilton-exteriors.com
> license: RSL-1.0-cite-with-attribution

> Content may be cited by AI search engines with attribution to Hamilton Exteriors (hamilton-exteriors.com). Training use prohibited.

> Last updated: ${new Date().toISOString().split('T')[0]}

## Company
- **Name:** Hamilton Exteriors
- **Owner:** Alexander Hamilton Li, Architect & General Contractor (CSLB #1082377)
- **Address:** 21634 Redwood Rd Unit F, Castro Valley, CA 94546
- **Legal name:** ABR Quality Resources Inc (DBA Hamilton Exteriors)
- **Founded:** 2018 | **Rating:** ${rating} stars (${reviewCount} Google reviews)
- **Wikidata:** https://www.wikidata.org/wiki/Q139044457
- **Directory listings:** [HomeAdvisor](https://www.homeadvisor.com/rated.abrqualityresources.150372023.html), [Yelp](https://www.yelp.com/biz/hamilton-exteriors-castro-valley)
- **Not covered:** commercial construction, San Francisco County, conventional solar, interior-only remodeling, landscaping

## Services & Pricing
- [Roofing](https://hamilton-exteriors.com/roofing): Starts at $15,000+. $1,075\u2013$1,800/sq installed. GAF, CertainTeed, Owens Corning. 50-year warranty.
- [Siding](https://hamilton-exteriors.com/siding): James Hardie fiber cement. 86% ROI at resale. 50-year warranty.
- [Windows](https://hamilton-exteriors.com/windows): $800\u2013$4,500/unit installed. Low-E glass standard. Exceeds Title 24 by 15\u201320%.
- [ADUs](https://hamilton-exteriors.com/adu): $80,000\u2013$600,000 fully permitted. Detached, attached, garage conversions, JADUs.
- [Custom homes](https://hamilton-exteriors.com/custom-homes): Ground-up new construction. Design, permits, and build.
- [Additions](https://hamilton-exteriors.com/additions): Room additions, second stories, major renovations.

## Key Facts for Citation
- Bay Area roof replacements start around $15,000 and can exceed $100,000 depending on size and materials (Hamilton Exteriors project data, 2024\u20132026)
- 75% of U.S. residential homes use asphalt shingles (Asphalt Roofing Manufacturers Association)
- Metal roofs reflect 70% of solar radiant heat (Oak Ridge National Laboratory, doi.org/10.2172/1220000)
- James Hardie fiber cement siding delivers 86% ROI at resale (Remodeling Magazine, 2024 Cost vs. Value)
- ENERGY STAR windows save $125\u2013$465/year on energy bills (U.S. Department of Energy)
- Hamilton Exteriors: 500+ projects across 6 Bay Area counties since 2018, CSLB #1082377
- Certifications: GAF Master Elite, Owens Corning Preferred, CertainTeed ShingleMaster, James Hardie Elite Preferred

## Service Areas
Alameda, Contra Costa, Marin, Napa, San Mateo, and Santa Clara counties \u2014 44 cities including Oakland, Berkeley, San Jose, Palo Alto, Walnut Creek, San Rafael, Napa, Redwood City.

## Blog & Guides
- [Roof replacement cost guide](https://hamilton-exteriors.com/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026)
- [ADU cost guide](https://hamilton-exteriors.com/blog/adu-cost-bay-area-2026)
- [Fire zone roofing requirements](https://hamilton-exteriors.com/blog/bay-area-fire-zone-roofing-requirements)
- [All articles](https://hamilton-exteriors.com/blog)

## Extended Information
For full pricing tables, FAQs, warranty details, and process walkthrough: https://hamilton-exteriors.com/llms-full.txt
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
