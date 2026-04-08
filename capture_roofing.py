#!/usr/bin/env python3
"""Capture roofing page with domcontentloaded wait strategy."""
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = r"C:\Users\admin\hamilton-exteriors\screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

from playwright.sync_api import sync_playwright

VIEWPORTS = {
    "desktop": {"width": 1920, "height": 1080},
    "mobile":  {"width": 375,  "height": 812},
}

url = "https://hamilton-exteriors.com/roofing"

with sync_playwright() as p:
    for vp_name, vp in VIEWPORTS.items():
        print(f"Capturing roofing {vp_name}...")
        try:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                viewport=vp,
                device_scale_factor=2 if vp_name == "mobile" else 1,
            )
            page = context.new_page()
            page.goto(url, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(3000)
            out = os.path.join(OUTPUT_DIR, f"va5_roofing_{vp_name}.png")
            page.screenshot(path=out, full_page=False)
            print(f"  OK -> {out}")
            browser.close()
        except Exception as e:
            print(f"  FAIL: {e}")
