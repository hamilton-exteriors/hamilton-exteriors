from playwright.sync_api import sync_playwright
import os

SCREENSHOTS_DIR = "C:/Users/admin/hamilton-exteriors/screenshots"

pages = [
    ("homepage", "https://hamilton-exteriors.com"),
    ("roofing", "https://hamilton-exteriors.com/roofing"),
    ("blog_cost", "https://hamilton-exteriors.com/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026"),
    ("oakland_roofing", "https://hamilton-exteriors.com/oakland/roofing"),
]

viewports = [
    ("desktop", 1440, 900),
    ("mobile", 390, 844),
]

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for slug, url in pages:
            for device, width, height in viewports:
                page = browser.new_page(viewport={"width": width, "height": height})
                page.goto(url, wait_until="networkidle", timeout=60000)
                page.wait_for_timeout(2000)
                fname = f"va6_{slug}_{device}.png"
                out = os.path.join(SCREENSHOTS_DIR, fname)
                page.screenshot(path=out, full_page=False)
                print(f"Saved: {fname}")
                page.close()
        browser.close()

if __name__ == "__main__":
    capture()
