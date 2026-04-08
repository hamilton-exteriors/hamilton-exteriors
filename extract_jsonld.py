import sys, re, json, urllib.request

PAGES = [
    ("HOME", "https://hamilton-exteriors.com/"),
    ("ROOFING", "https://hamilton-exteriors.com/roofing"),
    ("SIDING", "https://hamilton-exteriors.com/siding"),
    ("WINDOWS", "https://hamilton-exteriors.com/windows"),
    ("BLOG INDEX", "https://hamilton-exteriors.com/blog"),
    ("SERVICE AREAS", "https://hamilton-exteriors.com/service-areas"),
    ("ABOUT", "https://hamilton-exteriors.com/about"),
]

BLOG_SLUGS = [
    ("BLOG: hardie", "https://hamilton-exteriors.com/blog/hardie-board-siding-pros-cons"),
    ("BLOG: roof cost", "https://hamilton-exteriors.com/blog/roof-replacement-cost-bay-area"),
    ("BLOG: fire", "https://hamilton-exteriors.com/blog/fire-resistant-roofing-bay-area"),
    ("BLOG: adu", "https://hamilton-exteriors.com/blog/adu-construction-bay-area"),
]

ALL = PAGES + BLOG_SLUGS

PATTERN = re.compile(r'<script[^>]+type\s*=\s*["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.DOTALL | re.IGNORECASE)

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (schema-audit)"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception as e:
        return f"__FETCH_ERROR__{e}"

for label, url in ALL:
    html = fetch(url)
    if html.startswith("__FETCH_ERROR__"):
        print(f"\n=== {label} ===")
        print(f"  FETCH FAILED: {html}")
        continue
    blocks = PATTERN.findall(html)
    print(f"\n=== {label} — {url} ({len(blocks)} block(s)) ===")
    if not blocks:
        print("  (no JSON-LD found)")
    for i, b in enumerate(blocks):
        b = b.strip()
        print(f"  --- Block {i+1} ---")
        try:
            parsed = json.loads(b)
            print(json.dumps(parsed, indent=2))
        except Exception as e:
            print(f"  PARSE ERROR: {e}")
            print(b[:800])
