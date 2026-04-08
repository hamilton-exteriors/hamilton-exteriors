#!/usr/bin/env python3
"""
Full visual audit for hamilton-exteriors-production.up.railway.app
Captures desktop (1920x1080) and mobile (375x812) screenshots for 5 pages.
"""

import os
import sys
import json
from datetime import datetime

sys.path.insert(0, r"C:\Users\admin\.claude\skills\seo\scripts")
from capture_screenshot import capture_screenshot

BASE_URL = "https://hamilton-exteriors-production.up.railway.app"
OUTPUT_DIR = r"C:\Users\admin\hamilton-exteriors\screenshots"

PAGES = [
    ("homepage", "/"),
    ("roofing", "/roofing"),
    ("buy", "/buy"),
    ("blog", "/blog"),
    ("oakland_pseo", "/service-areas/alameda-county-ca/oakland-ca/roofing"),
]

VIEWPORTS = [
    ("desktop", 1920, 1080),
    ("mobile", 375, 812),
]

os.makedirs(OUTPUT_DIR, exist_ok=True)

results = []
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

for page_slug, path in PAGES:
    url = BASE_URL + path
    for vp_name, w, h in VIEWPORTS:
        filename = f"va_{page_slug}_{vp_name}_{timestamp}.png"
        output_path = os.path.join(OUTPUT_DIR, filename)
        print(f"Capturing {page_slug} / {vp_name} -> {filename}")
        result = capture_screenshot(url, output_path, viewport=vp_name, full_page=False, timeout=45000)
        result["page"] = page_slug
        result["path"] = path
        results.append(result)
        if result["success"]:
            print(f"  OK: {output_path}")
        else:
            print(f"  FAIL: {result['error']}")

# Save manifest
manifest_path = os.path.join(OUTPUT_DIR, f"audit_manifest_{timestamp}.json")
with open(manifest_path, "w") as f:
    json.dump({"timestamp": timestamp, "results": results}, f, indent=2)

print(f"\nManifest saved: {manifest_path}")
print(f"Successful captures: {sum(1 for r in results if r['success'])}/{len(results)}")
