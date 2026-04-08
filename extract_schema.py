import re
import json

def extract_schema(filepath, label):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    sep = "=" * 60
    print(f"\n{sep}")
    print(f"PAGE: {label}")
    print(f"{sep}")

    pattern = r'<script\s+type="application/ld\+json"[^>]*>(.*?)</script>'
    blocks = re.findall(pattern, html, re.DOTALL | re.IGNORECASE)
    print(f"Found {len(blocks)} JSON-LD block(s)")

    for i, b in enumerate(blocks):
        print(f"\n--- Block {i+1} ---")
        text = b.strip()
        try:
            parsed = json.loads(text)
            print(json.dumps(parsed, indent=2))
        except Exception as e:
            print(f"PARSE ERROR: {e}")
            print(text[:1000])

    microdata = re.findall(r'itemtype="([^"]+)"', html)
    if microdata:
        print(f"\nMICRODATA: {microdata}")

    rdfa = re.findall(r'typeof="([^"]+)"', html)
    if rdfa:
        print(f"\nRDFa: {rdfa}")

pages = [
    ("C:/Users/admin/hamilton-exteriors/page_home.html",    "/ (Homepage)"),
    ("C:/Users/admin/hamilton-exteriors/page_roofing.html", "/roofing"),
    ("C:/Users/admin/hamilton-exteriors/page_siding.html",  "/siding"),
    ("C:/Users/admin/hamilton-exteriors/page_windows.html", "/windows"),
    ("C:/Users/admin/hamilton-exteriors/page_oakland.html", "/service-areas/alameda-county-ca/oakland-ca"),
    ("C:/Users/admin/hamilton-exteriors/page_blog.html",    "/blog"),
]

for path, label in pages:
    extract_schema(path, label)
