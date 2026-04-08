#!/usr/bin/env python3
"""
Visual audit script for Hamilton Exteriors production site.
Captures desktop (1440px) and mobile (390px) screenshots for 4 pages.
"""

import os
import sys
import json
import socket
import ipaddress
from urllib.parse import urlparse

try:
    from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
except ImportError:
    print("Error: playwright required. pip install playwright && playwright install chromium")
    sys.exit(1)

BASE_URL = "https://hamilton-exteriors-production.up.railway.app"

PAGES = [
    ("homepage", "/"),
    ("roofing", "/roofing"),
    ("city_oakland", "/service-areas/alameda-county-ca/oakland-ca/roofing"),
    ("buy", "/buy"),
]

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile":  {"width": 390,  "height": 844},
}

OUTPUT_DIR = "/c/Users/admin/hamilton-exteriors/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)


def capture(url, output_path, vp_name, vp):
    result = {"url": url, "output": output_path, "viewport": vp_name, "success": False, "error": None}
    try:
        parsed = urlparse(url)
        resolved_ip = socket.gethostbyname(parsed.hostname)
        ip = ipaddress.ip_address(resolved_ip)
        if ip.is_private or ip.is_loopback or ip.is_reserved:
            result["error"] = f"Blocked private IP: {resolved_ip}"
            return result
    except Exception:
        pass

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            ctx = browser.new_context(
                viewport={"width": vp["width"], "height": vp["height"]},
                device_scale_factor=2 if vp_name == "mobile" else 1,
                user_agent=(
                    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) "
                    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
                    if vp_name == "mobile" else
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
                ),
            )
            page = ctx.new_page()
            page.goto(url, wait_until="networkidle", timeout=45000)
            page.wait_for_timeout(1500)
            # Above-the-fold only (viewport height)
            page.screenshot(path=output_path, full_page=False)
            result["success"] = True
            # Also grab a full-page version
            full_path = output_path.replace(".png", "_full.png")
            page.screenshot(path=full_path, full_page=True)
            result["full_page_path"] = full_path
            browser.close()
    except PlaywrightTimeout:
        result["error"] = "Timeout (45s)"
    except Exception as e:
        result["error"] = str(e)
    return result


def main():
    results = []
    for slug, path in PAGES:
        url = BASE_URL + path
        for vp_name, vp in VIEWPORTS.items():
            out = f"{OUTPUT_DIR}/audit_{slug}_{vp_name}.png"
            print(f"Capturing {slug} @ {vp_name} ({vp['width']}x{vp['height']})...")
            r = capture(url, out, vp_name, vp)
            if r["success"]:
                print(f"  OK -> {out}")
            else:
                print(f"  FAIL: {r['error']}")
            results.append(r)

    # Write results summary
    summary_path = f"{OUTPUT_DIR}/audit_results.json"
    with open(summary_path, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nDone. Results: {summary_path}")
    return results


if __name__ == "__main__":
    main()
