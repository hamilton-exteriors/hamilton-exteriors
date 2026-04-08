import re

def analyze_page(path, label):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()

    print(f"\n{'='*60}")
    print(f"PAGE: {label}")
    print(f"{'='*60}")
    print(f"Raw HTML size: {len(html):,} bytes ({len(html)/1024:.1f} KB)")

    # HEAD section only
    head_match = re.search(r'<head[^>]*>(.*?)</head>', html, re.DOTALL | re.IGNORECASE)
    head = head_match.group(1) if head_match else ""

    # Meta viewport
    viewport = re.search(r'<meta[^>]+name=["\']viewport["\'][^>]*>', head, re.IGNORECASE)
    print(f"\nViewport meta: {'YES' if viewport else 'NO'}")

    # Preconnect / DNS prefetch
    preconnects = re.findall(r'<link[^>]+rel=["\']preconnect["\'][^>]*>', head, re.IGNORECASE)
    dns_prefetch = re.findall(r'<link[^>]+rel=["\']dns-prefetch["\'][^>]*>', head, re.IGNORECASE)
    print(f"\nPreconnect hints: {len(preconnects)}")
    for p in preconnects:
        href = re.search(r'href=["\']([^"\']+)["\']', p)
        if href:
            print(f"  - {href.group(1)}")
    print(f"DNS-prefetch hints: {len(dns_prefetch)}")

    # Preload links
    preloads = re.findall(r'<link[^>]+rel=["\']preload["\'][^>]*>', head, re.IGNORECASE)
    print(f"\nPreload hints: {len(preloads)}")
    for p in preloads:
        href = re.search(r'href=["\']([^"\']+)["\']', p)
        as_attr = re.search(r'\bas=["\']([^"\']+)["\']', p)
        fetchpri = 'fetchpriority=high' in p.lower()
        if href:
            print(f"  - [{as_attr.group(1) if as_attr else '?'}] {href.group(1)[:80]} {'(fetchpriority=high)' if fetchpri else ''}")

    # External stylesheets
    ext_css = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]*>', html, re.IGNORECASE)
    print(f"\nExternal stylesheets: {len(ext_css)}")
    for c in ext_css:
        href = re.search(r'href=["\']([^"\']+)["\']', c)
        if href:
            print(f"  - {href.group(1)[:80]}")

    # Inline style blocks
    inline_styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL | re.IGNORECASE)
    inline_style_bytes = sum(len(s) for s in inline_styles)
    print(f"\nInline <style> blocks: {len(inline_styles)} ({inline_style_bytes:,} bytes)")

    # External scripts
    ext_scripts = re.findall(r'<script[^>]+src=["\'][^"\']+["\'][^>]*>', html, re.IGNORECASE)
    print(f"\nExternal scripts: {len(ext_scripts)}")
    for s in ext_scripts:
        src = re.search(r'src=["\']([^"\']+)["\']', s)
        is_defer = 'defer' in s.lower()
        is_async = 'async' in s.lower()
        is_module = 'type="module"' in s.lower() or "type='module'" in s.lower()
        strategy = []
        if is_defer:
            strategy.append('defer')
        if is_async:
            strategy.append('async')
        if is_module:
            strategy.append('module')
        if not strategy:
            strategy.append('BLOCKING')
        if src:
            print(f"  - [{'/'.join(strategy)}] {src.group(1)[:80]}")

    # Inline scripts
    inline_script_tags = re.findall(r'<script(?![^>]+src=)[^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
    inline_script_bytes = sum(len(s) for s in inline_script_tags)
    print(f"Inline <script> blocks: {len(inline_script_tags)} ({inline_script_bytes:,} bytes)")

    # Images
    img_tags = re.findall(r'<img[^>]+>', html, re.IGNORECASE)
    print(f"\nImage tags: {len(img_tags)}")

    no_width = [i for i in img_tags if not re.search(r'\bwidth=', i, re.IGNORECASE)]
    no_height = [i for i in img_tags if not re.search(r'\bheight=', i, re.IGNORECASE)]
    lazy_imgs = [i for i in img_tags if 'loading="lazy"' in i.lower() or "loading='lazy'" in i.lower()]
    eager_imgs = [i for i in img_tags if 'loading="eager"' in i.lower() or "loading='eager'" in i.lower()]
    fetchhi_imgs = [i for i in img_tags if 'fetchpriority="high"' in i.lower() or "fetchpriority='high'" in i.lower()]

    webp_imgs = [i for i in img_tags if '.webp' in i.lower()]
    avif_imgs = [i for i in img_tags if '.avif' in i.lower()]
    jpg_imgs = [i for i in img_tags if re.search(r'\.(jpg|jpeg)', i, re.IGNORECASE)]
    png_imgs = [i for i in img_tags if '.png' in i.lower()]

    print(f"  No width attr: {len(no_width)}")
    print(f"  No height attr: {len(no_height)}")
    print(f"  loading=lazy: {len(lazy_imgs)}")
    print(f"  loading=eager: {len(eager_imgs)}")
    print(f"  fetchpriority=high: {len(fetchhi_imgs)}")
    print(f"  Format: WebP={len(webp_imgs)}, AVIF={len(avif_imgs)}, JPG={len(jpg_imgs)}, PNG={len(png_imgs)}")

    print(f"  First 4 img tags:")
    for i, img in enumerate(img_tags[:4]):
        src = re.search(r'src=["\']([^"\']+)["\']', img)
        loading = re.search(r'loading=["\']([^"\']+)["\']', img, re.IGNORECASE)
        fetchpri = re.search(r'fetchpriority=["\']([^"\']+)["\']', img, re.IGNORECASE)
        w = re.search(r'width=["\']([^"\']+)["\']', img, re.IGNORECASE)
        h = re.search(r'height=["\']([^"\']+)["\']', img, re.IGNORECASE)
        alt = re.search(r'alt=["\']([^"\']*)["\']', img, re.IGNORECASE)
        print(f"    [{i+1}] src={src.group(1)[:60] if src else 'N/A'}")
        print(f"         loading={loading.group(1) if loading else 'NONE'} fetchpriority={fetchpri.group(1) if fetchpri else 'NONE'} w={w.group(1) if w else 'NONE'} h={h.group(1) if h else 'NONE'}")

    # Fonts
    font_preloads = [p for p in preloads if 'font' in p.lower() or re.search(r'as=["\']font["\']', p, re.IGNORECASE)]
    woff2_links = re.findall(r'href=["\'][^"\']*\.woff2[^"\']*["\']', html, re.IGNORECASE)
    font_face = re.findall(r'@font-face\s*\{[^}]+\}', html, re.DOTALL)
    font_display = re.findall(r'font-display\s*:\s*(\w+)', html, re.IGNORECASE)

    print(f"\nFont loading:")
    print(f"  Preloaded font files: {len(font_preloads)}")
    print(f"  woff2 references in HTML: {len(woff2_links)}")
    for w in woff2_links[:8]:
        print(f"    - {w[:90]}")
    print(f"  @font-face blocks: {len(font_face)}")
    print(f"  font-display values: {list(set(font_display))}")

    # Third-party domains
    all_srcs = re.findall(r'(?:src|href)=["\']https?://([^/"\']+)', html, re.IGNORECASE)
    third_party = set()
    own_patterns = ['railway.app', 'hamilton-exteriors']
    for domain in all_srcs:
        is_own = any(p in domain for p in own_patterns)
        if not is_own:
            third_party.add(domain)
    print(f"\nThird-party domains: {len(third_party)}")
    for d in sorted(third_party):
        print(f"  - {d}")

    # Render-blocking check
    head_scripts = re.findall(r'<script[^>]+src=[^>]*>', head, re.IGNORECASE)
    blocking_head_scripts = [s for s in head_scripts if not re.search(r'\b(defer|async)\b', s, re.IGNORECASE) and 'type="module"' not in s.lower() and "type='module'" not in s.lower()]
    print(f"\nPotential render-blocking scripts in <head>: {len(blocking_head_scripts)}")
    for s in blocking_head_scripts:
        src = re.search(r'src=["\']([^"\']+)["\']', s)
        if src:
            print(f"  - {src.group(1)[:80]}")

    head_css = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]*>', head, re.IGNORECASE)
    non_print_css = [c for c in head_css if 'media="print"' not in c.lower()]
    print(f"Render-blocking CSS sheets in <head>: {len(non_print_css)}")

    # picture/source elements
    source_tags = re.findall(r'<source[^>]+>', html, re.IGNORECASE)
    avif_sources = [s for s in source_tags if 'avif' in s.lower()]
    webp_sources = [s for s in source_tags if 'webp' in s.lower()]
    print(f"\n<source> tags: {len(source_tags)} (AVIF sources: {len(avif_sources)}, WebP sources: {len(webp_sources)})")

    # Background images in inline styles
    bg_images = re.findall(r'background-image\s*:[^;"}]+', html, re.IGNORECASE)
    print(f"Inline background-image references: {len(bg_images)}")
    for bg in bg_images[:3]:
        print(f"  - {bg[:80]}")

    # Check for Astro assets pattern
    astro_assets = re.findall(r'/_astro/[^"\'>\s]+', html)
    js_assets = [a for a in astro_assets if a.endswith('.js')]
    css_assets = [a for a in astro_assets if a.endswith('.css')]
    print(f"\nAstro assets referenced:")
    print(f"  JS files: {len(set(js_assets))}")
    print(f"  CSS files: {len(set(css_assets))}")
    for a in sorted(set(css_assets))[:5]:
        print(f"    CSS: {a}")
    for a in sorted(set(js_assets))[:5]:
        print(f"    JS:  {a}")

analyze_page('/tmp/cwv_home.html', 'HOMEPAGE /')
analyze_page('/tmp/cwv_roofing.html', 'ROOFING /roofing')
analyze_page('/tmp/cwv_oakland.html', 'OAKLAND ROOFING (pSEO)')
