#!/usr/bin/env python3
"""Batch capture desktop (1440px) and mobile (390px) screenshots for visual analysis."""

import os
import sys

sys.path.insert(0, r"C:/Users/admin/.claude/skills/seo/scripts")
from capture_screenshot import capture_screenshot

OUTPUT_DIR = r"C:/Users/admin/hamilton-exteriors/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

PAGES = [
    ("homepage", "https://hamilton-exteriors.com/"),
    ("roofing",  "https://hamilton-exteriors.com/roofing"),
    ("service_areas", "https://hamilton-exteriors.com/service-areas"),
    ("oakland",  "https://hamilton-exteriors.com/service-areas/alameda-county-ca/oakland"),
    ("buy",      "https://hamilton-exteriors.com/buy"),
]

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile":  {"width": 390,  "height": 844},
}

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout

def capture_custom(url, output_path, width, height, is_mobile=False):
    result = {"url": url, "output": output_path, "success": False, "error": None}
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                viewport={"width": width, "height": height},
                device_scale_factor=2 if is_mobile else 1,
                user_agent=(
                    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
                    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
                ) if is_mobile else None,
            )
            page = context.new_page()
            page.goto(url, wait_until="networkidle", timeout=45000)
            page.wait_for_timeout(1500)
            page.screenshot(path=output_path, full_page=False)
            result["success"] = True
            browser.close()
    except PlaywrightTimeout:
        result["error"] = "Timeout"
    except Exception as e:
        result["error"] = str(e)
    return result

results = []
for slug, url in PAGES:
    for vp_name, vp in VIEWPORTS.items():
        fname = f"va3_{slug}_{vp_name}.png"
        out = os.path.join(OUTPUT_DIR, fname)
        is_mob = (vp_name == "mobile")
        print(f"Capturing {slug} {vp_name} ({vp['width']}x{vp['height']})...")
        r = capture_custom(url, out, vp["width"], vp["height"], is_mobile=is_mob)
        r["slug"] = slug
        r["viewport"] = vp_name
        r["file"] = fname
        results.append(r)
        status = "OK" if r["success"] else f"FAIL: {r['error']}"
        print(f"  {status} -> {fname}")

print("\n--- Summary ---")
ok = sum(1 for r in results if r["success"])
print(f"{ok}/{len(results)} screenshots captured successfully")
for r in results:
    if not r["success"]:
        print(f"  FAILED: {r['slug']} {r['viewport']}: {r['error']}")
