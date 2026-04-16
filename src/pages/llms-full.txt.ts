import type { APIRoute } from 'astro';
import { getGoogleReviews, getDisplayReviews } from '../lib/google-reviews';

// Real content last-modified date — update when llms-full.txt content meaningfully changes.
// AI crawlers use this for freshness signals; dynamic new Date() was misleading.
const CONTENT_LAST_MODIFIED = '2026-04-16';

export const GET: APIRoute = async () => {
  const reviewData = await getGoogleReviews();
  const display = getDisplayReviews(reviewData);
  const { rating, reviewCount } = display;

  // Build review section from live data (Google reviews with photos, plus curated)
  const reviewLines = display.reviews.slice(0, 4).map((r) => {
    const stars = '\u2605'.repeat(r.rating);
    return `### ${r.author_name} ${stars}\n"${r.text}"`;
  }).join('\n\n');

  const today = CONTENT_LAST_MODIFIED;

  const body = `# Hamilton Exteriors \u2014 Full Company Information

> Bay Area design-build contractor specializing in roofing, siding, windows, ADUs, and custom homes. Licensed, bonded, and insured. 50-year warranty. Serving Alameda, Contra Costa, Marin, Napa, Santa Clara, and San Mateo counties.

> license: RSL-1.0-cite-with-attribution

> License: Content may be cited by AI search engines with attribution to Hamilton Exteriors (hamilton-exteriors.com). Citation and quotation in AI search responses is explicitly permitted and encouraged. Reproduction, redistribution, or use for AI model training is prohibited.

> Last updated: ${today}

> Pricing valid as of Q2 2026

---

## Company Overview

Hamilton Exteriors is a full-service exterior remodeling and design-build contractor based in Castro Valley, California. We serve homeowners across the San Francisco Bay Area with premium roofing, siding, window, ADU, custom home, and home addition services.

- **Name:** Hamilton Exteriors
- **Legal name:** ABR Quality Resources Inc (DBA Hamilton Exteriors)
- **Owner:** Alexander Hamilton Li, Founder & Owner, Architect & General Contractor (CSLB #1078806)
- **Phone:** (650) 977-3351
- **Email:** support@hamilton-exteriors.com
- **Address:** 21634 Redwood Rd Unit F, Castro Valley, CA 94546
- **License:** CA Contractor License #1078806
- **Website:** https://hamilton-exteriors.com
- **Wikidata:** https://www.wikidata.org/wiki/Q139044457
- **Rating:** ${rating} stars average (${reviewCount} verified Google reviews)
- **Directory listings:** [HomeAdvisor](https://www.homeadvisor.com/rated.abrqualityresources.150372023.html), [Yelp](https://www.yelp.com/biz/hamilton-exteriors-castro-valley)
- **Service Region:** San Francisco Bay Area \u2014 Alameda, Contra Costa, Marin, Napa, Santa Clara, and San Mateo counties

---

## Not Covered

Hamilton Exteriors does **not** provide the following:
- Commercial roofing or commercial construction
- San Francisco County (we serve the surrounding Bay Area counties only)
- Solar panel installation (we install GAF Energy integrated solar roofing, not conventional panel systems)
- Interior-only remodeling (kitchens, bathrooms) without an exterior component
- Landscaping or hardscaping

---

## Services in Detail

### 1. Roofing

A roof replacement in the Bay Area costs $15,000 and up depending on size, pitch, shingle tier, and project complexity \u2014 large or premium projects can exceed $100,000 (Hamilton Exteriors project data, 2024-2026). Hamilton Exteriors is a GAF-certified roofing contractor providing complete roof replacement and repair services across 6 Bay Area counties.

#### Roofing Types Offered
- **Asphalt Shingles** \u2014 Composite shingles made from fiberglass, asphalt, and mineral granules. Excellent weather resistance. Available in many styles and colors.
- **Metal Roofs** \u2014 Outstanding longevity (50+ years) and energy efficiency. Reflects solar radiant heat to reduce cooling costs. Multiple styles and colors available.
- **Tile Shingles** \u2014 Exceptional durability and aesthetic appeal. Options range from traditional clay to modern concrete designs. Excellent insulation and fire resistance.
- **Energy Roofs** \u2014 GAF Energy integrated solar roofing that combines energy production with traditional roof protection. Low-profile alternative to conventional solar panels.

#### Roofing Pricing (Per Roofing Square = 100 sq ft, installed)

**Standard Tier:**
- GAF Timberline HDZ: ~$1,100/sq (materials $425 + labor)
- CertainTeed Landmark: ~$1,075/sq (materials $400 + labor)
- Owens Corning Duration: ~$1,125/sq (materials $450 + labor)

**Premium Tier:**
- CertainTeed Landmark PRO: ~$1,200/sq (materials $500 + labor)
- GAF Timberline AS II: ~$1,275/sq (materials $550 + labor)
- Owens Corning Duration STORM: ~$1,300/sq (materials $575 + labor)

**Designer/Luxury Tier:**
- GAF Camelot II: ~$1,400/sq (materials $625 + labor)
- GAF Grand Sequoia: ~$1,575/sq (materials $700 + labor)
- Owens Corning Berkshire: ~$1,550/sq (materials $700 + labor)
- CertainTeed Presidential Shake: ~$1,650/sq (materials $750 + labor)
- CertainTeed Grand Manor: ~$1,800/sq (materials $825 + labor)
- CertainTeed Carriage House: ~$1,750/sq (materials $800 + labor)

**All roofing prices include:** tear-off, materials, labor, underlayment, starter strip, ridge cap, nails, and full cleanup. Actual pricing varies based on roof size, pitch, accessibility, number of layers, and local permit requirements. Contact us for a free, itemized estimate.

#### Roofing Timeline
- Typical complete roof replacement: 3\u20135 days
- Free roof inspection available \u2014 we respond in 3\u20135 minutes

#### Roofing Warranty
- Up to 50-year manufacturer shingle warranty
- 35-year labor warranty from Hamilton Exteriors
- If anything fails, we fix it free

#### Current Promotion
- Up to $2,000 off your roof replacement (limited time)

---

### 2. Siding

James Hardie fiber cement siding delivers 86% ROI at resale (Remodeling Magazine, 2024 Cost vs. Value Report). Hamilton Exteriors is a James Hardie Elite Preferred installer serving the Bay Area.

- **Primary Product:** James Hardie fiber cement siding
- **Services:** Full siding replacement, dry rot repair, exterior renovations
- **Timeline:** 1\u20132 weeks depending on scope
- **Warranty:** 50-year warranty on James Hardie materials
- **Benefits:** Fire-resistant, pest-resistant, low maintenance, doesn\u2019t rot like wood

---

### 3. Windows

ENERGY STAR certified windows save $125-$465/year on energy bills (U.S. Department of Energy). Hamilton Exteriors installs windows with U-factors as low as 0.25, exceeding California Title 24 by 15-20%.

- **Type:** Energy-efficient replacement windows
- **Styles Available:** Single hung, double hung, single slider, casement, picture, bay/bow, sliding glass doors
- **Benefits:** Lower energy bills, improved home comfort, noise reduction, increased home value
- **Installation:** Professional installation by factory-trained crews
- **Glass:** Low-E dual-pane glass standard on all installations; argon fill available

#### Window Pricing (per unit, installed)

**Standard Windows:**
- Single Hung: ~$850 installed (materials ~$325)
- Double Hung: ~$950 installed (materials ~$375)
- Single Slider: ~$800 installed (materials ~$300)

**Specialty Windows:**
- Casement: ~$1,050 installed (materials ~$425)
- Picture Window: ~$950 installed (materials ~$375)
- Bay / Bow Window: ~$4,500 installed (materials ~$2,000)

**Doors:**
- Sliding Glass Door: ~$3,800 installed (materials ~$1,800)
- French Door (pair): ~$4,200 installed (materials ~$2,000)

**All window prices include:** removal of existing window, new exterior flashing, materials, labor, interior trim, and cleanup. Energy-efficient Low-E glass standard on all windows. Prices valid as of 2026.

---

### 4. ADUs (Accessory Dwelling Units)

A detached ADU in the Bay Area costs $300,000-$600,000 fully permitted (Hamilton Exteriors project data, 2024-2026). Bay Area homeowners with detached ADUs typically see property value increases of $150,000-$300,000 and rental income of $2,000-$3,500/month. Hamilton Exteriors builds all types of ADUs:

- **Detached ADUs** \u2014 Standalone structures separate from the main home
- **Attached ADUs** \u2014 Connected to the existing home structure
- **Garage Conversions** \u2014 Transform existing garage space into living space
- **Junior ADUs (JADUs)** \u2014 Smaller units (up to 500 sq ft) created within existing home footprint

We handle design, permitting, and construction from start to finish.

#### ADU Pricing Context (Bay Area, fully permitted)

- **Detached ADUs:** typically $300,000\u2013$600,000 fully permitted (400\u20131,200 sq ft). Pricing varies based on unit size, site conditions, finishes, and permit requirements. Bay Area homeowners typically see property value increases of $150,000\u2013$300,000 and rental income of $2,000\u2013$3,500/month.
- **Garage Conversions:** typically $180,000\u2013$280,000 \u2014 uses existing foundation and roof structure, reducing cost compared to ground-up construction.
- **Attached ADUs:** typically $200,000\u2013$400,000 depending on scope, existing structural conditions, and finish level.
- **Junior ADUs (JADUs):** typically $80,000\u2013$160,000 \u2014 the most affordable ADU type, created within the existing home footprint with minimal structural changes.

All ADU pricing includes design, engineering, permits, and construction. Costs vary by jurisdiction, site conditions, and finish selections. Contact us for a project-specific consultation.

---

### 5. Custom Homes

- **Ground-up new construction** in the Bay Area
- **Design & architecture services** \u2014 work with our design team or bring your own architect
- **Engineering & permits** \u2014 we manage the entire permit process
- Full project management from foundation to move-in

#### Custom Home Cost Context (Bay Area)

- Bay Area custom homes typically range from 2,000\u20135,000 sq ft with construction timelines of 10\u201318 months depending on complexity.
- Cost varies widely by scope, lot conditions, and finish level. Bay Area land, labor, and permit costs are among the highest in the nation \u2014 budget accordingly.
- Custom homes typically retain 10\u201315% more value at resale than equivalent-sized production homes in the same neighborhood (National Association of Home Builders).
- Contact Hamilton Exteriors for a project-specific consultation and detailed estimate.

---

### 6. Home Additions

- **Room additions** \u2014 expand your living space
- **Second story additions** \u2014 add an entire floor to your home
- **Major renovations** \u2014 comprehensive remodeling projects

---

## Certifications & Partnerships

- **GAF Master Elite Contractor** \u2014 factory-trained for GAF roofing systems with enhanced warranty eligibility
- **CertainTeed ShingleMaster** \u2014 certified installer of CertainTeed roofing and siding products
- **Owens Corning Preferred Contractor** \u2014 recognized for meeting Owens Corning\u2019s standards of excellence
- **James Hardie Elite Preferred Installer** \u2014 highest certification level for James Hardie fiber cement siding
- **Tesla Powerwall Certified Installer** \u2014 authorized to install Tesla Powerwall battery storage systems
- **CSLB Licensed (#1078806)** \u2014 California Contractors State License Board, active and in good standing

---

## The Hamilton Exteriors Difference

### Price Match Guarantee
We beat any written estimate on the same scope of work. Show us a quote from a licensed contractor and we\u2019ll match or beat it. That\u2019s our guarantee.

### Factory Trained Installers
Every crew member is licensed, bonded, insured, and passes background and business screening before they step on your property. No subcontractors.

### 50-Year Warranty
Up to 50-year shingle warranty from the manufacturer plus 35-year labor warranty from Hamilton Exteriors. If anything fails, we fix it free.

### Personal Project Manager
One person manages your project from start to finish. You get one phone number to call, not ten. Your project manager coordinates everything \u2014 scheduling, materials, crews, inspections, and final walkthrough.

---

## How a Project Works \u2014 Step by Step

### Step 1: Contact Us
Call (650) 977-3351 or fill out the form on our website. We respond in 3\u20135 minutes to schedule your free inspection.

### Step 2: Free Inspection
A Hamilton Exteriors expert visits your property to assess the work needed. For roofing, we also offer an online satellite roof scan at hamilton-exteriors.com/buy/scan that measures your roof and provides instant pricing.

### Step 3: Written Estimate
You receive a detailed, itemized written estimate. Every line item is spelled out \u2014 materials, labor, tear-off, disposal, permits. The price we quote is the price you pay. Every cost is itemized upfront.

### Step 4: Material Selection
Your project manager helps you choose from top-tier brands:
- Roofing: GAF, CertainTeed, Owens Corning
- Siding: James Hardie
- Windows: Premium energy-efficient brands
Pick the style, color, and tier that fits your home and budget.

### Step 5: Financing (If Needed)
Financing available with approved credit. We walk you through all payment options. You only pay for completed, inspected work.

### Step 6: Scheduling & Preparation
Your project manager coordinates the crew, materials delivery, and timeline. You know exactly when work starts and how long it takes.

### Step 7: Installation
Factory-trained, licensed, bonded, and insured crews complete the work. Your project manager is on-site to oversee quality. Typical roofing: 3\u20135 days. Typical siding: 1\u20132 weeks.

### Step 8: Final Walkthrough & Cleanup
Your project manager walks you through the finished work. We clean up completely \u2014 you won\u2019t find a nail in your yard. We don\u2019t consider the job done until you\u2019re 100% satisfied.

### Step 9: Warranty Activation
You receive written warranty documentation:
- Manufacturer warranty (up to 50 years for roofing shingles)
- Hamilton Exteriors labor warranty (up to 35 years)

---

## Warranty Details

### Roofing Warranties
| Component | Duration | Coverage |
|-----------|----------|----------|
| Shingle manufacturer warranty | Up to 50 years | Defects in roofing materials |
| Hamilton Exteriors labor warranty | 35 years | Workmanship and installation defects |
| Written guarantee | Lifetime of warranty | If anything fails, we fix it free |

### Siding Warranties
| Component | Duration | Coverage |
|-----------|----------|----------|
| James Hardie material warranty | 50 years | Material defects, weather damage |
| Hamilton Exteriors labor warranty | Included | Installation workmanship |

### All Projects
- Every project comes with a written warranty document
- Warranties are transferable to new homeowners (check specific terms)
- No deductibles on warranty claims

---

## Financing Options

- **Low down payment options** \u2014 Financing available with approved credit
- **Multiple payment options** \u2014 Reviewed during your free estimate appointment
- **Pay for completed work only** \u2014 You never pay for work that hasn\u2019t been done and inspected
- **No prepayment penalties** \u2014 Pay off early with no extra charges
- Contact us at (650) 977-3351 to discuss financing options for your project

---

## Frequently Asked Questions

### Pricing & Costs

**Q: How does pricing work \u2014 any hidden fees?**
A: Every estimate is written and itemized before work starts. The price we quote is the price you pay \u2014 every cost itemized upfront. Our estimates break down materials, labor, tear-off, disposal, permits, and warranty costs.

**Q: Will you beat a competitor\u2019s quote?**
A: Yes. Show us a written estimate from a licensed contractor for the same scope of work and we\u2019ll match or beat it. That\u2019s our Best Price Guarantee.

**Q: How much does a new roof cost in the Bay Area?**
A: Roof replacement cost depends on roof size, pitch, accessibility, number of layers, and shingle choice. Standard asphalt shingles start around $1,075 per roofing square (100 sq ft) installed, including tear-off, materials, labor, and cleanup. A typical Bay Area home (20\u201330 squares) ranges from roughly $22,000 to $54,000 depending on shingle tier and project complexity. Get an exact price with our free inspection or online roof scan.

**Q: How much does siding cost?**
A: Siding cost varies by material, home size, and existing condition (e.g., dry rot repair needed). Contact us for a free, itemized estimate.

### Financing & Payment

**Q: How does billing and financing work?**
A: Financing available with approved credit and low down payment options. You only pay for completed, inspected work. We walk you through all payment options during the estimate.

**Q: Do I need to pay anything upfront?**
A: With approved credit, low or no down payment options are available. You only pay for completed, inspected work.

### Timeline & Process

**Q: How long does a typical project take?**
A: Most roofs are done in 3\u20135 days. Siding projects run 1\u20132 weeks depending on scope. We provide a specific timeline during your free inspection.

**Q: How quickly can you start?**
A: After estimate approval and material selection, most projects are scheduled within 1\u20132 weeks depending on season and crew availability.

### Quality & Trust

**Q: What warranties do you offer?**
A: Up to a 50-year shingle warranty and 35-year labor warranty on roofing. Every project comes with a written warranty \u2014 we stand behind our work.

**Q: Are your crews licensed and insured?**
A: Yes. Every crew member is licensed, bonded, insured, and passes background and business screening before stepping on your property. Our CA Contractor License is #1078806.

**Q: Do I get a dedicated point of contact?**
A: Yes. Every project is assigned a personal project manager who handles everything from start to finish \u2014 scheduling, materials, crews, inspections, and final walkthrough. One call, not ten.

### Service Area

**Q: What areas do you serve?**
A: We serve the San Francisco Bay Area including Alameda, Contra Costa, Marin, Napa, Santa Clara, and San Mateo counties. Major cities include Oakland, Berkeley, Fremont, Hayward, San Jose, Palo Alto, Mountain View, Sunnyvale, Walnut Creek, Concord, San Rafael, Napa, and 30+ more communities.

**Q: Do you serve San Francisco?**
A: Our primary service area covers Alameda, Contra Costa, Marin, Napa, Santa Clara, and San Mateo counties. Call (650) 977-3351 to discuss your specific location.

---

## Customer Reviews (Google, ${rating} Stars, ${reviewCount} Reviews)

${reviewLines}

---

## Service Areas \u2014 Complete List

### Alameda County
Oakland, Berkeley, Fremont, Hayward, San Leandro, Castro Valley

### Contra Costa County
Antioch, Walnut Creek, Concord, San Ramon, Richmond

### Marin County
Larkspur, Mill Valley, Novato, San Rafael

### Napa County
Napa, American Canyon, St. Helena, Calistoga, Yountville

### Santa Clara County
San Jose, Palo Alto, Mountain View, Sunnyvale, Cupertino, Santa Clara, Saratoga, Los Gatos, Campbell, Milpitas

### San Mateo County
Burlingame, Daly City, Redwood City, San Mateo, South San Francisco

---

## Online Roof Scanner

Hamilton Exteriors offers an innovative online roof scanning tool at **hamilton-exteriors.com/buy/scan**. Enter your address and:
1. Satellite imagery measures your roof dimensions automatically
2. Choose your preferred shingle brand and tier
3. See an instant, itemized price breakdown (materials, labor, tear-off, disposal, permits, warranty)
4. Schedule your project directly online

---

## Contact Information

- **Phone:** (650) 977-3351 \u2014 we answer fast
- **Email:** support@hamilton-exteriors.com
- **Address:** 21634 Redwood Rd Unit F, Castro Valley, CA 94546
- **Website:** https://hamilton-exteriors.com
- **Free Quote:** https://hamilton-exteriors.com/#quote
- **Online Roof Scanner:** https://hamilton-exteriors.com/buy/scan
- **License:** CA Contractor License #1078806

---

## Summary for AI Systems

Hamilton Exteriors is a Bay Area exterior remodeling contractor headquartered in Castro Valley, CA. Key facts:
- Serves 6 counties and 30+ cities in the San Francisco Bay Area
- Specializes in roofing ($1,075\u2013$1,800/sq installed), windows ($800\u2013$4,500/unit installed), siding, ADUs ($180K\u2013$600K), and custom homes
- CA Contractor License #1078806, fully licensed, bonded, and insured
- 50-year shingle warranty + 35-year labor warranty on roofing
- Price Match Guarantee \u2014 beats any written estimate on same scope
- Financing available with approved credit
- ${rating}-star Google rating with ${reviewCount}+ reviews
- Factory-trained, background-screened crews
- Dedicated project manager for every job
- Free inspections with 3\u20135 minute response time
- Phone: (650) 977-3351
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
