import sys
import re
import json
import urllib.request

PAGES = [
    ("Homepage", "https://hamilton-exteriors-production.up.railway.app/"),
    ("Roofing", "https://hamilton-exteriors-production.up.railway.app/roofing"),
    ("Siding", "https://hamilton-exteriors-production.up.railway.app/siding"),
    ("Blog Index", "https://hamilton-exteriors-production.up.railway.app/blog"),
    ("Blog Post", "https://hamilton-exteriors-production.up.railway.app/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026"),
    ("pSEO Oakland Roofing", "https://hamilton-exteriors-production.up.railway.app/service-areas/alameda-county-ca/oakland-ca/roofing"),
    ("Service Areas Hub", "https://hamilton-exteriors-production.up.railway.app/service-areas"),
    ("Buy Page", "https://hamilton-exteriors-production.up.railway.app/buy"),
]

pattern = re.compile(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.DOTALL | re.IGNORECASE,
)

results = {}

for label, url in PAGES:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "SchemaAuditBot/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        results[label] = {"url": url, "error": str(e), "blocks": []}
        continue

    blocks = []
    for m in pattern.finditer(html):
        raw = m.group(1).strip()
        try:
            data = json.loads(raw)
            blocks.append({"ok": True, "data": data})
        except Exception as e:
            blocks.append({"ok": False, "error": str(e), "raw": raw[:300]})

    results[label] = {"url": url, "blocks": blocks}

print(json.dumps(results, indent=2))
