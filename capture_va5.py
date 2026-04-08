#!/usr/bin/env python3
"""Capture fresh screenshots for VA5 visual audit."""
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Add the skills path
sys.path.insert(0, r'C:\Users\admin\.claude\skills\seo\scripts')
from capture_screenshot import capture_screenshot

OUTPUT_DIR = r"C:\Users\admin\hamilton-exteriors\screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

PAGES = [
    ("homepage", "https://hamilton-exteriors.com"),
    ("roofing", "https://hamilton-exteriors.com/roofing"),
    ("blog", "https://hamilton-exteriors.com/blog"),
    ("oakland_pseo", "https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland-ca"),
]

VIEWPORTS = ["desktop", "mobile"]

results = []
for slug, url in PAGES:
    for vp in VIEWPORTS:
        filename = f"va5_{slug}_{vp}.png"
        output_path = os.path.join(OUTPUT_DIR, filename)
        print(f"Capturing {slug} {vp}...")
        result = capture_screenshot(url, output_path, viewport=vp, full_page=False, timeout=45000)
        status = "OK" if result["success"] else f"FAIL: {result['error']}"
        print(f"  {status} -> {output_path}")
        results.append((slug, vp, result["success"], output_path))

print("\nSummary:")
for slug, vp, ok, path in results:
    print(f"  {'OK' if ok else 'FAIL'} {slug} {vp}")
