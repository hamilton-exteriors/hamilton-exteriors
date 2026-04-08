import urllib.request
import re
import json
import sys

PAGES = [
    ("homepage",      "https://hamilton-exteriors.com/"),
    ("roofing",       "https://hamilton-exteriors.com/roofing"),
    ("service-area",  "https://hamilton-exteriors.com/service-areas/alameda-county-ca/"),
    ("blog",          "https://hamilton-exteriors.com/blog/"),
    ("about-alex",    "https://hamilton-exteriors.com/about/alex-hamilton-li"),
    ("buy",           "https://hamilton-exteriors.com/buy/"),
]

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "SchemaAuditBot/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        return "FETCH_ERROR: " + str(e)

for label, url in PAGES:
    print("")
    print("=" * 60)
    print("PAGE: " + label + "  |  " + url)
    print("=" * 60)
    html = fetch(url)
    if html.startswith("FETCH_ERROR"):
        print(html)
        continue

    pattern = re.compile(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.DOTALL | re.IGNORECASE)
    blocks = pattern.findall(html)
    print("JSON-LD blocks found: " + str(len(blocks)))
    for i, raw in enumerate(blocks):
        raw = raw.strip()
        print("")
        print("--- JSON-LD Block " + str(i+1) + " ---")
        try:
            obj = json.loads(raw)
            print(json.dumps(obj, indent=2))
        except Exception as e:
            print("PARSE ERROR: " + str(e))
            print(raw[:800])

    if re.search(r'itemscope|itemtype', html, re.IGNORECASE):
        print("")
        print("MICRODATA: Detected")
    else:
        print("")
        print("MICRODATA: None")

    if re.search(r'typeof=|property=', html, re.IGNORECASE):
        print("RDFA: Possibly present")
    else:
        print("RDFA: None")
