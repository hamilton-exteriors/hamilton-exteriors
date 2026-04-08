#!/usr/bin/env python3
"""Retry failed captures from VA5."""
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

sys.path.insert(0, r'C:\Users\admin\.claude\skills\seo\scripts')
from capture_screenshot import capture_screenshot

OUTPUT_DIR = r"C:\Users\admin\hamilton-exteriors\screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

RETRIES = [
    ("homepage_d2", "https://hamilton-exteriors.com", "desktop"),
    ("roofing_d2", "https://hamilton-exteriors.com/roofing", "desktop"),
    ("roofing_m2", "https://hamilton-exteriors.com/roofing", "mobile"),
]

for slug, url, vp in RETRIES:
    filename = f"va5_{slug}.png"
    output_path = os.path.join(OUTPUT_DIR, filename)
    print(f"Capturing {slug} ({vp})...")
    result = capture_screenshot(url, output_path, viewport=vp, full_page=False, timeout=60000)
    status = "OK" if result["success"] else f"FAIL: {result['error']}"
    print(f"  {status}")
