import urllib.request
import re
import json
import sys

def extract_schema(url):
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

pages = [
    "https://hamilton-exteriors-production.up.railway.app/",
    "https://hamilton-exteriors-production.up.railway.app/roofing",
    "https://hamilton-exteriors-production.up.railway.app/siding",
    "https://hamilton-exteriors-production.up.railway.app/windows",
    "https://hamilton-exteriors-production.up.railway.app/blog",
    "https://hamilton-exteriors-production.up.railway.app/service-areas/alameda-county-ca/oakland-ca",
    "https://hamilton-exteriors-production.up.railway.app/service-areas/contra-costa-county-ca/walnut-creek-ca",
]

for url in pages:
    extract_schema(url)
