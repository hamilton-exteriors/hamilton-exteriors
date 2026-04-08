
import os

path = r"C:/Users/admin/hamilton-exteriors/GEO-ANALYSIS.md"

report = []

report.append("""# Hamilton Exteriors -- GEO Analysis Report

**Date:** 2026-04-06
**Analyst:** Claude (claude-sonnet-4-6)
**Scope:** Full GEO (Generative Engine Optimization) audit -- post-SEO-update deployment
**Site:** https://hamilton-exteriors.com
**Business:** Hamilton Exteriors -- Bay Area Design-Build and Exterior Contractor
**Owner:** Alexander Hamilton Li, CSLB #1082377

---

## GEO Readiness Score: 81 / 100

| Dimension | Weight | Raw Score | Weighted |
|---|---|---|---|
| Citability | 25% | 82 | 20.5 |
| Structural Readability | 20% | 78 | 15.6 |
| Multi-Modal Content | 15% | 68 | 10.2 |
| Authority and Brand Signals | 20% | 88 | 17.6 |
| Technical Accessibility | 20% | 87 | 17.4 |
| **TOTAL** | **100%** | -- | **81.3** |

---

## Platform-Specific Scores

| Platform | Score | Primary Barrier |
|---|---|---|
| Google AI Overviews | 84 / 100 | FAQ heading hierarchy (details vs H3); passage length inconsistency |
| ChatGPT | 76 / 100 | No Wikipedia entity; low off-domain brand mentions; knowsAbout plain strings on Person schema |
| Perplexity | 83 / 100 | llms.txt well-structured; strong sourced statistics; generic image alt text |
| Bing Copilot | 79 / 100 | bingbot allowed; strong schema; limited LinkedIn/YouTube presence |

---""")

with open(path, "w", encoding="utf-8") as f:
    f.write("\n".join(report))
    f.write("\n")

print("Wrote", os.path.getsize(path), "bytes")
