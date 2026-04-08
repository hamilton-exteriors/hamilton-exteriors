import sys
import re
import urllib.request

def extract(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; ContentAuditBot/1.0)"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        raw = resp.read()
    html = raw.decode("utf-8", errors="replace")

    # Pull meta before stripping
    title_m = re.search(r"<title[^>]*>(.*?)</title>", html, re.DOTALL)
    desc_m = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if not desc_m:
        desc_m = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']description["\']', html, re.IGNORECASE)

    # Author in schema
    author_m = re.search(r'"author"\s*:\s*\{[^}]*"name"\s*:\s*"([^"]+)"', html)
    # All schema types
    schema_types = list(set(re.findall(r'"@type"\s*:\s*"([^"]+)"', html)))
    faq_count = html.count("FAQPage")
    review_schema = '"AggregateRating"' in html or '"Review"' in html
    license_mention = "CSLB" in html
    # Look for structured review data
    agg_rating_m = re.search(r'"ratingValue"\s*:\s*"?([0-9.]+)"?', html)
    review_count_m = re.search(r'"reviewCount"\s*:\s*"?([0-9]+)"?', html)
    # Credentials
    cred_m = re.findall(r'(CSLB|Elite Preferred|GAF Master Elite|Owens Corning|CertainTeed|BBB|Angi|Houzz)', html)

    # Strip scripts/styles/comments for text
    clean = re.sub(r"<script[^>]*>.*?</script>", " ", html, flags=re.DOTALL)
    clean = re.sub(r"<style[^>]*>.*?</style>", " ", clean, flags=re.DOTALL)
    clean = re.sub(r"<!--.*?-->", " ", clean, flags=re.DOTALL)
    clean = re.sub(r"<[^>]+>", " ", clean)
    clean = re.sub(r"&#[0-9]+;", " ", clean)
    clean = re.sub(r"&[a-z]+;", " ", clean)
    # Replace non-ASCII with space to avoid encoding errors
    clean = clean.encode("ascii", "replace").decode("ascii")
    clean = re.sub(r"\s+", " ", clean).strip()

    words = clean.split()
    wc = len(words)

    # Count unique review snippets (look for star ratings in text or review indicators)
    review_text_count = len(re.findall(r'(stars?|rating|review|recommended)', clean, re.IGNORECASE))

    print(f"\n{'='*70}")
    print(f"URL: {url}")
    print(f"TITLE: {title_m.group(1).strip() if title_m else 'NONE'}")
    print(f"META DESC: {desc_m.group(1).strip() if desc_m else 'NONE'}")
    print(f"TOTAL RAW WORD COUNT (incl. nav/footer): {wc}")
    print(f"AUTHOR IN SCHEMA: {author_m.group(1) if author_m else 'NOT FOUND'}")
    print(f"SCHEMA TYPES: {sorted(schema_types)}")
    print(f"FAQ SCHEMA: {'YES' if faq_count else 'NO'}")
    print(f"REVIEW/RATING SCHEMA: {'YES' if review_schema else 'NO'}")
    print(f"AGG RATING VALUE: {agg_rating_m.group(1) if agg_rating_m else 'NOT FOUND'}")
    print(f"REVIEW COUNT: {review_count_m.group(1) if review_count_m else 'NOT FOUND'}")
    print(f"LICENSE MENTION: {'YES' if license_mention else 'NO'}")
    print(f"CREDENTIALS MENTIONED: {list(set(cred_m))}")
    print(f"")
    print(f"--- CONTENT SAMPLE (first 5000 chars) ---")
    print(clean[:5000])
    print(f"")
    print(f"--- CONTENT MID (chars 5000-9000) ---")
    print(clean[5000:9000])
    print(f"")

urls = [
    "https://hamilton-exteriors.com/",
    "https://hamilton-exteriors.com/roofing",
    "https://hamilton-exteriors.com/siding",
    "https://hamilton-exteriors.com/blog",
    "https://hamilton-exteriors.com/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026",
]

for url in urls:
    try:
        extract(url)
    except Exception as e:
        print(f"\nERROR fetching {url}: {e}")
        import traceback; traceback.print_exc()
