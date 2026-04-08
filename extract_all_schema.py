import urllib.request
import re
import json

PAGES = {
    "homepage": "https://hamilton-exteriors.com",
    "roofing": "https://hamilton-exteriors.com/roofing",
    "blog_post": "https://hamilton-exteriors.com/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026",
    "pseo_city": "https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland-ca/roofing",
    "county": "https://hamilton-exteriors.com/service-areas/alameda-county-ca",
    "about_founder": "https://hamilton-exteriors.com/about/alex-hamilton-li",
}

for page_name, url in PAGES.items():
    print(f"\n{'='*60}")
    print(f"PAGE: {page_name}")
    print(f"URL: {url}")
    print("="*60)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (schema-audit)"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="replace")
        pattern = r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>'
        blocks = re.findall(pattern, html, re.DOTALL)
        print(f"JSON-LD blocks found: {len(blocks)}")
        for i, b in enumerate(blocks):
            try:
                parsed = json.loads(b.strip())
                print(f"\n--- Block {i+1} ---")
                print(json.dumps(parsed, indent=2))
            except Exception as e:
                print(f"\n--- Block {i+1} PARSE ERROR: {e} ---")
                print(b[:800])
    except Exception as e:
        print(f"FETCH ERROR: {e}")
