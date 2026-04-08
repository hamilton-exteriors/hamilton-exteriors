import re, json, urllib.request

def fetch_and_extract(url, label):
    print(f"\n{'='*60}")
    print(f"PAGE: {label}")
    print(f"URL: {url}")
    print('='*60)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 SchemaAudit/1.0'})
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='replace')
    pattern = re.compile(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        re.DOTALL | re.IGNORECASE
    )
    blocks = pattern.findall(html)
    print(f"Found {len(blocks)} JSON-LD block(s)\n")
    schemas = []
    for i, b in enumerate(blocks):
        print(f"\n--- Block {i+1} ---")
        try:
            parsed = json.loads(b.strip())
            schemas.append(parsed)
            t = parsed.get('@type', 'unknown')
            print(f"@type: {t}")
            print(json.dumps(parsed, indent=2))
        except Exception as e:
            print(f"PARSE ERROR: {e}")
            print(b[:500])
    return schemas

BASE = "https://hamilton-exteriors-production.up.railway.app"
pages = [
    (f"{BASE}/", "Homepage"),
    (f"{BASE}/roofing", "Roofing Service Page"),
    (f"{BASE}/blog", "Blog Index"),
]

for url, label in pages:
    try:
        fetch_and_extract(url, label)
    except Exception as e:
        print(f"ERROR fetching {label}: {e}")
