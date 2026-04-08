import urllib.request
import re
import json

def extract_schema(url, label=""):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (SchemaAudit)"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"FETCH ERROR for {url}: {e}")
        return

    pattern = re.compile(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        re.DOTALL | re.IGNORECASE
    )
    blocks = pattern.findall(html)
    print(f"\n{'='*60}")
    print(f"URL: {url}")
    if label:
        print(f"Label: {label}")
    print(f"Found {len(blocks)} JSON-LD block(s)")
    for i, b in enumerate(blocks):
        try:
            data = json.loads(b.strip())
            t = data.get("@type", "unknown")
            print(f"\n  --- Block {i+1}: @type={t} ---")
            print(json.dumps(data, indent=2))
        except Exception as e:
            print(f"  Block {i+1} PARSE ERROR: {e}")
            print(b[:400])

# Sample individual blog posts
posts = [
    ("https://hamilton-exteriors-production.up.railway.app/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026", "Roof cost 2026"),
    ("https://hamilton-exteriors-production.up.railway.app/blog/james-hardie-siding-bay-area", "James Hardie"),
    ("https://hamilton-exteriors-production.up.railway.app/blog/bay-area-fire-zone-roofing-requirements", "Fire zone roofing"),
]

for url, label in posts:
    extract_schema(url, label)
