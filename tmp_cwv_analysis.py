import re

def analyze_page(path, label):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()

    print(f"\n{'='*60}")
    print(f"PAGE: {label}")
    print(f"{'='*60}")
    print(f"Raw HTML size: {len(html):,} bytes ({len(html)/1024:.1f} KB)")

    # Resource hints
    preloads = re.findall(r'<link[^>]+rel=["\']preload["\'][^>]*>', html, re.IGNORECASE)
    preconnects = re.findall(r'<link[^>]+rel=["\']preconnect["\'][^>]*>', html, re.IGNORECASE)
    dns_prefetch = re.findall(r'<link[^>]+rel=["\']dns-prefetch["\'][^>]*>', html, re.IGNORECASE)
    print(f"\n--- Resource Hints ---")
    print(f"Preloads ({len(preloads)}):")
    for p in preloads:
        href = re.search(r'href=["\']([^"\']+)["\']', p)
        as_attr = re.search(r' as=["\']([^"\']+)["\']', p)
        print(f"  {href.group(1) if href else '?'} [as={as_attr.group(1) if as_attr else '?'}]")
    print(f"Preconnects ({len(preconnects)}):")
    for p in preconnects:
        href = re.search(r'href=["\']([^"\']+)["\']', p)
        print(f"  {href.group(1) if href else '?'}")
    print(f"DNS-prefetch ({len(dns_prefetch)}):")
    for p in dns_prefetch:
        href = re.search(r'href=["\']([^"\']+)["\']', p)
        print(f"  {href.group(1) if href else '?'}")

    # CSS
    print(f"\n--- CSS Delivery ---")
    css_links = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]*>', html, re.IGNORECASE)
    inline_styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.IGNORECASE | re.DOTALL)
    print(f"External CSS files: {len(css_links)}")
    for c in css_links:
        href = re.search(r'href=["\']([^"\']+)["\']', c)
        print(f"  {href.group(1) if href else '?'}")
    inline_total = sum(len(s) for s in inline_styles)
    print(f"Inline <style> blocks: {len(inline_styles)} (total {inline_total:,} bytes)")

    # JS
    print(f"\n--- JavaScript ---")
    scripts = re.findall(r'<script[^>]*>', html, re.IGNORECASE)
    ext_scripts = [s for s in scripts if 'src=' in s]
    inline_count = len(scripts) - len(ext_scripts)
    print(f"External scripts: {len(ext_scripts)}")
    for s in ext_scripts:
        src = re.search(r'src=["\']([^"\']+)["\']', s)
        defer = 'defer' in s.lower()
        async_ = 'async' in s.lower()
        mod = 'module' in s.lower()
        print(f"  {src.group(1) if src else '?'} [defer={defer}, async={async_}, module={mod}]")
    print(f"Inline script blocks: {inline_count}")

    # Images
    print(f"\n--- Images ---")
    imgs = re.findall(r'<img[^>]*>', html, re.IGNORECASE)
    print(f"Total <img> tags: {len(imgs)}")
    no_width = [i for i in imgs if 'width=' not in i.lower()]
    no_height = [i for i in imgs if 'height=' not in i.lower()]
    lazy = [i for i in imgs if 'loading="lazy"' in i.lower() or "loading='lazy'" in i.lower()]
    eager = [i for i in imgs if 'loading="eager"' in i.lower() or "loading='eager'" in i.lower()]
    no_loading = [i for i in imgs if 'loading=' not in i.lower()]
    with_srcset = [i for i in imgs if 'srcset=' in i.lower()]
    webp = [i for i in imgs if '.webp' in i.lower()]
    avif = [i for i in imgs if '.avif' in i.lower()]
    fetchprio_high = [i for i in imgs if 'fetchpriority="high"' in i.lower() or "fetchpriority='high'" in i.lower()]
    print(f"  lazy: {len(lazy)}, eager: {len(eager)}, no loading attr: {len(no_loading)}")
    print(f"  missing width: {len(no_width)}, missing height: {len(no_height)}")
    print(f"  with srcset: {len(with_srcset)}, WebP: {len(webp)}, AVIF: {len(avif)}")
    print(f"  fetchpriority=high: {len(fetchprio_high)}")
    for i, img in enumerate(imgs[:3]):
        src = re.search(r'src=["\']([^"\']+)["\']', img)
        loading = re.search(r'loading=["\']([^"\']+)["\']', img, re.IGNORECASE)
        w = re.search(r'width=["\']?(\d+)["\']?', img, re.IGNORECASE)
        h = re.search(r'height=["\']?(\d+)["\']?', img, re.IGNORECASE)
        fp = 'fetchpriority=high' in img.lower()
        print(f"  img[{i}]: src={src.group(1)[:60] if src else 'none'} loading={loading.group(1) if loading else 'none'} w={w.group(1) if w else '?'} h={h.group(1) if h else '?'} fp={fp}")

    # Fonts
    print(f"\n--- Font Loading ---")
    font_preloads = [p for p in preloads if 'font' in p.lower() or '.woff' in p.lower()]
    print(f"Font preloads: {len(font_preloads)}")
    for fp in font_preloads:
        href = re.search(r'href=["\']([^"\']+)["\']', fp)
        print(f"  {href.group(1) if href else '?'}")
    font_faces = re.findall(r'@font-face\s*\{[^}]+\}', html, re.DOTALL)
    print(f"@font-face declarations: {len(font_faces)}")
    for ff in font_faces[:8]:
        family = re.search(r'font-family\s*:\s*["\']?([^;"\']+)["\']?', ff)
        src_match = re.search(r'src\s*:[^;]+\.woff2', ff)
        display = re.search(r'font-display\s*:\s*(\w+)', ff)
        print(f"  family={family.group(1).strip()[:40] if family else '?'}, display={display.group(1) if display else 'MISSING'}, woff2={'yes' if src_match else 'no'}")

    # Render-blocking
    print(f"\n--- Render-blocking Risk ---")
    blocking_css = [c for c in css_links if 'media=' not in c.lower()]
    blocking_js = [s for s in ext_scripts if 'defer' not in s.lower() and 'async' not in s.lower() and 'module' not in s.lower()]
    print(f"Potentially blocking CSS links: {len(blocking_css)}")
    print(f"Potentially blocking JS (no defer/async/module): {len(blocking_js)}")
    for s in blocking_js:
        src = re.search(r'src=["\']([^"\']+)["\']', s)
        print(f"  BLOCKING: {src.group(1) if src else s[:100]}")

    # LCP candidates
    print(f"\n--- LCP Candidates ---")
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)
    print(f"H1 count: {len(h1s)}")
    if h1s:
        clean = re.sub(r'<[^>]+>', '', h1s[0])
        print(f"  First H1: {clean.strip()[:120]}")

    # CLS risk
    print(f"\n--- CLS Risk Factors ---")
    astro_islands = len(re.findall(r'astro-island|client:load|client:idle|client:visible', html))
    print(f"Astro islands/client directives in HTML: {astro_islands}")
    iframes = re.findall(r'<iframe[^>]*>', html, re.IGNORECASE)
    print(f"iframes: {len(iframes)}")
    print(f"Images missing width: {len(no_width)}, missing height: {len(no_height)}")
    videos = re.findall(r'<video[^>]*>', html, re.IGNORECASE)
    print(f"Video elements: {len(videos)}")

    # Third-party origins
    print(f"\n--- Third-party Origins ---")
    external_origins = set()
    for s in ext_scripts:
        src = re.search(r'src=["\']([^"\']+)["\']', s)
        if src and src.group(1).startswith('http'):
            m = re.match(r'(https?://[^/]+)', src.group(1))
            if m and 'hamilton-exteriors' not in m.group(1) and 'railway.app' not in m.group(1):
                external_origins.add(('script', m.group(1)))
    # Check link hrefs for external CSS
    for c in css_links:
        href = re.search(r'href=["\']([^"\']+)["\']', c)
        if href and href.group(1).startswith('http'):
            m = re.match(r'(https?://[^/]+)', href.group(1))
            if m:
                external_origins.add(('css', m.group(1)))
    # Inline references to external domains
    gtm = re.findall(r'googletagmanager\.com|gtag|gtm\.js', html)
    ga = re.findall(r'google-analytics\.com|analytics\.js|_ga\b', html)
    fb = re.findall(r'facebook\.net|fbq\(|fbpixel', html)
    hotjar = re.findall(r'hotjar\.com|hj\(', html)
    intercom = re.findall(r'intercom\.io|intercomSettings', html)
    print(f"GTM/gtag references: {len(gtm)}")
    print(f"Google Analytics references: {len(ga)}")
    print(f"Facebook pixel references: {len(fb)}")
    print(f"Hotjar references: {len(hotjar)}")
    print(f"Intercom references: {len(intercom)}")
    for typ, origin in sorted(external_origins):
        print(f"  External {typ}: {origin}")

    # INP signals
    print(f"\n--- INP Signals ---")
    event_refs = len(re.findall(r'addEventListener|onclick|onchange|onsubmit|oninput|onkeydown', html))
    print(f"Inline event handler/listener references: {event_refs}")
    dom_size_est = len(re.findall(r'<[a-zA-Z][a-zA-Z0-9]*[\s>]', html))
    print(f"Estimated DOM element count: {dom_size_est}")
    # Check for any heavy frameworks
    react = re.findall(r'react|React|__reactFiber', html)
    vue = re.findall(r'Vue\.|__vue', html)
    print(f"React references: {len(react)}, Vue references: {len(vue)}")

pages = [
    ('C:/Users/admin/tmp/page_home.html', 'Homepage /'),
    ('C:/Users/admin/tmp/page_roofing.html', 'Roofing /roofing'),
    ('C:/Users/admin/tmp/page_oakland.html', 'Oakland city page'),
    ('C:/Users/admin/tmp/page_blog.html', 'Blog post'),
]
for path, label in pages:
    try:
        analyze_page(path, label)
    except Exception as e:
        print(f"ERROR on {label}: {e}")
