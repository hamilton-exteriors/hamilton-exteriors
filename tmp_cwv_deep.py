import re

# Deep dive: extract CSS href, check hero image details, font-display in external CSS
# and analyze the blog hero image specifics

def check_hero_image_details(path, label):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()

    print(f"\n{'='*50}")
    print(f"DEEP DIVE: {label}")
    print(f"{'='*50}")

    # Find ALL preload links with full tag
    preloads = re.findall(r'<link[^>]+rel=["\']preload["\'][^>]*>', html, re.IGNORECASE)
    print("Full preload tags:")
    for p in preloads:
        print(f"  {p[:300]}")

    # Hero image - find first above-fold image that is NOT the logo
    imgs = re.findall(r'<img[^>]*>', html, re.IGNORECASE)
    print(f"\nFirst 5 images (detail):")
    for i, img in enumerate(imgs[:5]):
        src = re.search(r'src=["\']([^"\']+)["\']', img)
        loading = re.search(r'loading=["\']([^"\']+)["\']', img, re.IGNORECASE)
        w = re.search(r'width=["\']?(\d+)["\']?', img, re.IGNORECASE)
        h = re.search(r'height=["\']?(\d+)["\']?', img, re.IGNORECASE)
        fp = re.search(r'fetchpriority=["\']([^"\']+)["\']', img, re.IGNORECASE)
        alt = re.search(r'alt=["\']([^"\']*)["\']', img, re.IGNORECASE)
        print(f"  [{i}] src={src.group(1)[:80] if src else 'none'}")
        print(f"       loading={loading.group(1) if loading else 'NONE'} w={w.group(1) if w else '?'} h={h.group(1) if h else '?'} fetchpriority={fp.group(1) if fp else 'none'}")
        print(f"       alt={alt.group(1)[:60] if alt else 'none'}")

    # CSS file paths
    css_links = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]*>', html, re.IGNORECASE)
    print(f"\nCSS link tags:")
    for c in css_links:
        print(f"  {c}")

    # Check inline styles for font-display
    inline_styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.IGNORECASE | re.DOTALL)
    print(f"\nInline style analysis:")
    for i, style in enumerate(inline_styles):
        print(f"  Style block {i}: {len(style):,} bytes")
        font_faces = re.findall(r'@font-face[^{]*\{[^}]+\}', style, re.DOTALL)
        if font_faces:
            for ff in font_faces:
                family = re.search(r'font-family\s*:\s*["\']?([^;"\']+)["\']?', ff)
                display = re.search(r'font-display\s*:\s*(\w+)', ff)
                woff2 = re.search(r'url\(["\']?([^)"\']+\.woff2)["\']?\)', ff)
                print(f"    @font-face: {family.group(1).strip() if family else '?'} | display={display.group(1) if display else 'MISSING'} | {woff2.group(1)[:60] if woff2 else 'no woff2'}")
        # Look for critical CSS patterns
        has_hero = 'hero' in style.lower()
        has_lcp = 'lcp' in style.lower()
        print(f"    contains 'hero': {has_hero}, contains 'lcp': {has_lcp}")
        # First 300 chars
        print(f"    Preview: {style[:200].strip()}")

    # GTM inline code check
    scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.IGNORECASE | re.DOTALL)
    gtm_scripts = [s for s in scripts if 'googletagmanager' in s or 'gtag' in s.lower()]
    print(f"\nGTM/gtag inline scripts: {len(gtm_scripts)}")
    for gs in gtm_scripts[:2]:
        print(f"  {gs[:300]}")

    # Check for Mapbox JS loading
    mapbox_refs = re.findall(r'mapbox[^"\'<>\s]*', html, re.IGNORECASE)
    print(f"\nMapbox references: {len(mapbox_refs)}")
    for mr in set(mapbox_refs)[:5]:
        print(f"  {mr}")

    # iframes detail
    iframes = re.findall(r'<iframe[^>]*>', html, re.IGNORECASE)
    print(f"\niframe tags:")
    for iframe in iframes:
        src = re.search(r'src=["\']([^"\']+)["\']', iframe)
        loading = re.search(r'loading=["\']([^"\']+)["\']', iframe)
        print(f"  src={src.group(1)[:100] if src else 'none'} loading={loading.group(1) if loading else 'none'}")
        print(f"  {iframe[:200]}")

pages = [
    ('C:/Users/admin/tmp/page_home.html', 'Homepage /'),
    ('C:/Users/admin/tmp/page_roofing.html', 'Roofing /roofing'),
    ('C:/Users/admin/tmp/page_oakland.html', 'Oakland city page'),
    ('C:/Users/admin/tmp/page_blog.html', 'Blog post'),
]
for path, label in pages:
    check_hero_image_details(path, label)
