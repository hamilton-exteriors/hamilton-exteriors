import sys
import re
import urllib.request

def extract(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; ContentAuditBot/1.0)"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        html = resp.read().decode("utf-8", errors="replace")

    # Pull meta before stripping
    title_m = re.search(r"<title[^>]*>(.*?)</title>", html, re.DOTALL)
    desc_m = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if not desc_m:
        desc_m = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']description["\']', html, re.IGNORECASE)

    # Author / schema signals
    author_m = re.search(r'"author"\s*:\s*\{[^}]*"name"\s*:\s*"([^"]+)"', html)
    schema_types = re.findall(r'"@type"\s*:\s*"([^"]+)"', html)
    faq_count = html.count("FAQPage") + html.count("faqPage")
    review_count = html.count('"Review"') + html.count('"AggregateRating"')
    license_mention = "CSLB" in html or "license" in html.lower()

    # Strip scripts/styles/comments
    clean = re.sub(r"<script[^>]*>.*?</script>", " ", html, flags=re.DOTALL)
    clean = re.sub(r"<style[^>]*>.*?</style>", " ", clean, flags=re.DOTALL)
    clean = re.sub(r"<!--.*?-->", " ", clean, flags=re.DOTALL)
    clean = re.sub(r"<[^>]+>", " ", clean)
    clean = re.sub(r"&[a-z#0-9]+;", " ", clean)
    clean = re.sub(r"\s+", " ", clean).strip()

    words = clean.split()
    wc = len(words)

    print(f"\n{'='*60}")
    print(f"URL: {url}")
    print(f"TITLE: {title_m.group(1).strip() if title_m else 'NONE'}")
    print(f"META DESC: {desc_m.group(1).strip() if desc_m else 'NONE'}")
    print(f"WORD COUNT (raw incl. nav/footer): {wc}")
    print(f"AUTHOR IN SCHEMA: {author_m.group(1) if author_m else 'NOT FOUND'}")
    print(f"SCHEMA TYPES: {list(set(schema_types))}")
    print(f"FAQ SCHEMA: {'YES' if faq_count else 'NO'}")
    print(f"REVIEW/RATING SCHEMA: {'YES' if review_count else 'NO'}")
    print(f"LICENSE MENTION: {'YES' if license_mention else 'NO'}")
    print(f"\n--- CONTENT SAMPLE (first 6000 chars) ---")
    print(clean[:6000])
    print(f"\n--- CONTENT TAIL (last 2000 chars) ---")
    print(clean[-2000:])

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
