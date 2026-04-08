import sys
import json
import re
import urllib.request

PAGES = [
    ("homepage", "https://hamilton-exteriors-production.up.railway.app/"),
    ("roofing", "https://hamilton-exteriors-production.up.railway.app/roofing"),
    ("siding", "https://hamilton-exteriors-production.up.railway.app/siding"),
    ("blog-cost", "https://hamilton-exteriors-production.up.railway.app/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026"),
    ("oakland-sa", "https://hamilton-exteriors-production.up.railway.app/service-areas/alameda-county-ca/oakland-ca"),
    ("oakland-roofing-sa", "https://hamilton-exteriors-production.up.railway.app/service-areas/alameda-county-ca/oakland-ca/roofing"),
]

results = {}

for name, url in PAGES:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "SchemaAuditBot/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="replace")
        pattern = re.compile(
            r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
            re.DOTALL | re.IGNORECASE
        )
        blocks = pattern.findall(html)
        parsed_blocks = []
        for b in blocks:
            b = b.strip()
            try:
                parsed_blocks.append({"ok": True, "data": json.loads(b)})
            except Exception as e:
                parsed_blocks.append({"ok": False, "error": str(e), "raw": b[:300]})
        results[name] = {"url": url, "blocks": parsed_blocks}
    except Exception as e:
        results[name] = {"url": url, "error": str(e)}

print(json.dumps(results, indent=2))
