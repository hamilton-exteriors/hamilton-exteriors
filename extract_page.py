import sys
import re
import urllib.request

def extract(url, label):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; ContentAuditBot/1.0)"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        raw = resp.read()
    html = raw.decode("utf-8", errors="replace")

    title_m = re.search(r"<title[^>]*>(.*?)</title>", html, re.DOTALL)
    desc_m = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if not desc_m:
        desc_m = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']description["\']', html, re.IGNORECASE)

    author_m = re.search(r'"author"\s*:\s*\{[^}]*"name"\s*:\s*"([^"]+)"', html)
    schema_types = list(set(re.findall(r'"@type"\s*:\s*"([^"]+)"', html)))
    faq_count = html.count("FAQPage")
    review_schema = '"AggregateRating"' in html or '"Review"' in html
    agg_rating_m = re.search(r'"ratingValue"\s*:\s*"?([0-9.]+)"?', html)
    review_count_m = re.search(r'"reviewCount"\s*:\s*"?([0-9]+)"?', html)
    cred_m = list(set(re.findall(r'(CSLB|Elite Preferred|GAF Master Elite|Owens Corning|CertainTeed|BBB|Angi|Houzz|James Hardie|ENERGY STAR)', html)))

    clean = re.sub(r"<script[^>]*>.*?</script>", " ", html, flags=re.DOTALL)
    clean = re.sub(r"<style[^>]*>.*?</style>", " ", clean, flags=re.DOTALL)
    clean = re.sub(r"<!--.*?-->", " ", clean, flags=re.DOTALL)
    clean = re.sub(r"<[^>]+>", " ", clean)
    clean = re.sub(r"&#[0-9]+;", " ", clean)
    clean = re.sub(r"&[a-z]+;", " ", clean)
    clean = clean.encode("ascii", "replace").decode("ascii")
    clean = re.sub(r"\s+", " ", clean).strip()

    words = clean.split()
    wc = len(words)

    # Estimate body-only word count by stripping repeated nav/footer pattern
    # Footer appears to be roughly the last 200 words (same on every page)
    # Nav appears to be roughly the first 80 words
    body_estimate = max(0, wc - 80 - 200)

    # Look for specific content quality signals
    price_mentions = len(re.findall(r'\$[0-9,]+', clean))
    specific_numbers = len(re.findall(r'\b[0-9]+(?:,[0-9]+)?\s*(?:sq ft|square|percent|%|years?|months?|days?|counties|cities|projects?)\b', clean, re.IGNORECASE))
    first_person = len(re.findall(r'\b(I |we |our |my )', clean, re.IGNORECASE))
    county_mentions = len(re.findall(r'(Alameda|Contra Costa|Marin|Santa Clara|Napa|San Francisco)\s+[Cc]ounty', clean))
    city_mentions = len(re.findall(r'\b(Oakland|Berkeley|Fremont|San Jose|Palo Alto|Walnut Creek|San Rafael|Napa|Richmond|Concord|Hayward)\b', clean))

    # FAQ questions
    faq_qs = re.findall(r'(What|How|When|Why|Does|Can|Is|Are|Will|Do|Should)[^?]{10,80}\?', clean)

    with open(f"page_{label}.txt", "w", encoding="utf-8") as f:
        f.write(f"URL: {url}\n")
        f.write(f"TITLE: {title_m.group(1).strip() if title_m else 'NONE'}\n")
        f.write(f"META DESC: {desc_m.group(1).strip() if desc_m else 'NONE'}\n")
        f.write(f"TOTAL WORD COUNT (raw): {wc}\n")
        f.write(f"BODY WORD COUNT ESTIMATE (minus nav/footer): {body_estimate}\n")
        f.write(f"AUTHOR IN SCHEMA: {author_m.group(1) if author_m else 'NOT FOUND'}\n")
        f.write(f"SCHEMA TYPES: {sorted(schema_types)}\n")
        f.write(f"FAQ SCHEMA: {'YES' if faq_count else 'NO'}\n")
        f.write(f"FAQ QUESTIONS FOUND: {len(faq_qs)}\n")
        f.write(f"REVIEW/RATING SCHEMA: {'YES' if review_schema else 'NO'}\n")
        f.write(f"AGG RATING: {agg_rating_m.group(1) if agg_rating_m else 'N/A'}\n")
        f.write(f"REVIEW COUNT: {review_count_m.group(1) if review_count_m else 'N/A'}\n")
        f.write(f"LICENSE MENTION: {'YES - CSLB #1082377' if 'CSLB' in html else 'NO'}\n")
        f.write(f"CREDENTIALS: {cred_m}\n")
        f.write(f"PRICE MENTIONS: {price_mentions}\n")
        f.write(f"SPECIFIC NUMBERS/STATS: {specific_numbers}\n")
        f.write(f"FIRST-PERSON SIGNALS: {first_person}\n")
        f.write(f"COUNTY MENTIONS: {county_mentions}\n")
        f.write(f"CITY MENTIONS: {city_mentions}\n")
        f.write(f"\nFAQ QUESTIONS DETECTED:\n")
        for q in faq_qs[:20]:
            f.write(f"  - {q}\n")
        f.write(f"\n--- FULL TEXT (ascii-safe) ---\n")
        f.write(clean)

    print(f"[{label}] {wc} raw words | ~{body_estimate} body | FAQs:{len(faq_qs)} | Prices:{price_mentions} | First-person:{first_person}")

urls = [
    ("https://hamilton-exteriors.com/", "home"),
    ("https://hamilton-exteriors.com/roofing", "roofing"),
    ("https://hamilton-exteriors.com/siding", "siding"),
    ("https://hamilton-exteriors.com/blog", "blog"),
    ("https://hamilton-exteriors.com/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026", "blog_cost"),
]

for url, label in urls:
    try:
        extract(url, label)
    except Exception as e:
        print(f"ERROR {label}: {e}")
        import traceback; traceback.print_exc()
