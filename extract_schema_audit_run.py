import urllib.request
import re
import json
import sys

PAGES = [
    ("Homepage", "https://hamilton-exteriors.com"),
    ("Roofing", "https://hamilton-exteriors.com/roofing"),
    ("Blog Post", "https://hamilton-exteriors.com/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026"),
    ("Service Area (Oakland Roofing)", "https://hamilton-exteriors.com/oakland/roofing"),
    ("About/Person", "https://hamilton-exteriors.com/about/alex-hamilton-li"),
    ("Blog Index", "https://hamilton-exteriors.com/blog"),
]

PATTERN = re.compile(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.DOTALL | re.IGNORECASE,
)

results = {}

for label, url in PAGES:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 SchemaAuditBot/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            html = resp.read().decode("utf-8", errors="replace")
        blocks = PATTERN.findall(html)
        parsed = []
        for b in blocks:
            try:
                parsed.append(json.loads(b.strip()))
            except Exception as e:
                parsed.append({"_parse_error": str(e), "_raw": b.strip()[:300]})
        results[label] = {"url": url, "blocks": parsed, "count": len(parsed)}
    except Exception as e:
        results[label] = {"url": url, "error": str(e), "count": 0}

print(json.dumps(results, indent=2))
