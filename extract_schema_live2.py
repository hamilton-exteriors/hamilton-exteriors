#!/usr/bin/env python3
"""Fetch a URL and extract/print all JSON-LD blocks."""
import sys
import re
import json
import urllib.request

def fetch_and_extract(url, label):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (schema-audit/1.0)"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode("utf-8", errors="replace")

    # Check for unicode replacement chars in raw HTML schema blocks
    blocks = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL)
    print(f"\n{'='*60}")
    print(f"PAGE: {label}")
    print(f"URL: {url}")
    print(f"JSON-LD blocks found: {len(blocks)}")
    print('='*60)

    if not blocks:
        print("  [NO JSON-LD FOUND]")
        return []

    parsed_list = []
    for i, raw in enumerate(blocks):
        raw = raw.strip()
        replacement_count = raw.count('\ufffd')
        print(f"\n--- Block {i+1} ---")
        if replacement_count:
            print(f"  WARNING: {replacement_count} Unicode replacement char(s) detected in raw block!")
        try:
            parsed = json.loads(raw)
            print(json.dumps(parsed, indent=2, ensure_ascii=False))
            parsed_list.append(parsed)
        except json.JSONDecodeError as e:
            print(f"  PARSE ERROR: {e}")
            print(f"  Raw (first 600 chars): {raw[:600]}")

    return parsed_list

pages = [
    ("https://hamilton-exteriors.com", "Homepage"),
    ("https://hamilton-exteriors.com/roofing", "Roofing"),
    ("https://hamilton-exteriors.com/siding", "Siding"),
    ("https://hamilton-exteriors.com/windows", "Windows"),
    ("https://hamilton-exteriors.com/blog", "Blog Index"),
    ("https://hamilton-exteriors.com/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026", "Blog Post"),
    ("https://hamilton-exteriors.com/service-areas/alameda-county-ca", "County Page"),
    ("https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland-ca", "City Page"),
    ("https://hamilton-exteriors.com/about/alex-hamilton-li", "Author Page"),
]

all_results = {}
for url, label in pages:
    try:
        all_results[label] = fetch_and_extract(url, label)
    except Exception as e:
        print(f"\n{'='*60}")
        print(f"PAGE: {label}")
        print(f"URL: {url}")
        print(f"FETCH ERROR: {e}")
        print('='*60)
        all_results[label] = None

print("\n\n" + "="*60)
print("SUMMARY OF SCHEMA TYPES FOUND")
print("="*60)
for label, blocks in all_results.items():
    if blocks is None:
        print(f"  {label}: FETCH ERROR")
    elif not blocks:
        print(f"  {label}: No JSON-LD")
    else:
        types = []
        for b in blocks:
            if isinstance(b, dict):
                t = b.get("@type", "unknown")
                if isinstance(t, list):
                    t = ", ".join(t)
                types.append(t)
            elif isinstance(b, list):
                types.append(f"[array of {len(b)}]")
        print(f"  {label}: {' | '.join(types)}")
