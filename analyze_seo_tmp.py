import re
import sys

def analyze_page(path, label):
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            html = f.read()
    except Exception as e:
        print(f'--- {label}: FILE NOT FOUND ({e}) ---')
        return {}

    # Title
    title = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    title_text = title.group(1).strip() if title else 'MISSING'

    # Meta description
    meta_desc = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)["\']', html, re.IGNORECASE)
    if not meta_desc:
        meta_desc = re.search(r'<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']description["\']', html, re.IGNORECASE)
    desc_text = meta_desc.group(1).strip() if meta_desc else 'MISSING'

    # Canonical
    canonical = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']*)["\']', html, re.IGNORECASE)
    if not canonical:
        canonical = re.search(r'<link[^>]+href=["\']([^"\']*)["\'][^>]+rel=["\']canonical["\']', html, re.IGNORECASE)
    canon_text = canonical.group(1).strip() if canonical else 'MISSING'

    # Viewport
    viewport = re.search(r'<meta[^>]+name=["\']viewport["\'][^>]+content=["\']([^"\']*)["\']', html, re.IGNORECASE)
    viewport_text = viewport.group(1) if viewport else 'MISSING'

    # Robots meta
    robots_meta = re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']*)["\']', html, re.IGNORECASE)
    robots_text = robots_meta.group(1) if robots_meta else 'not set (default index,follow)'

    # H1
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)
    h1_clean = [re.sub(r'<[^>]+>', '', h).strip()[:80] for h in h1s]

    # OG tags
    og_title = re.search(r'<meta[^>]+property=["\']og:title["\'][^>]+content=["\']([^"\']*)["\']', html, re.IGNORECASE)
    og_desc = re.search(r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\']([^"\']*)["\']', html, re.IGNORECASE)
    og_image = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']*)["\']', html, re.IGNORECASE)
    twitter_card = re.search(r'<meta[^>]+name=["\']twitter:card["\'][^>]+content=["\']([^"\']*)["\']', html, re.IGNORECASE)

    # Schema
    schemas = re.findall(r'"@type"\s*:\s*"([^"]+)"', html)

    # Images
    imgs = re.findall(r'<img[^>]*>', html, re.IGNORECASE)
    no_alt = [i for i in imgs if 'alt=' not in i.lower()]
    imgs_with_empty_alt = [i for i in imgs if re.search(r'alt=["\']["\']', i)]
    imgs_with_dimensions = len([i for i in imgs if re.search(r'width=["\']', i) and re.search(r'height=["\']', i)])

    # JS rendering check
    inline_scripts = len(re.findall(r'<script(?![^>]*src=)[^>]*>', html, re.IGNORECASE))
    external_scripts = re.findall(r'<script[^>]+src=["\']([^"\']*)["\']', html, re.IGNORECASE)

    # LCP / performance hints
    lazy_imgs = len(re.findall(r'loading=["\']lazy["\']', html, re.IGNORECASE))
    fetchpriority_high = len(re.findall(r'fetchpriority=["\']high["\']', html, re.IGNORECASE))
    preconnects = re.findall(r'<link[^>]+rel=["\']preconnect["\'][^>]+href=["\']([^"\']*)["\']', html, re.IGNORECASE)
    preloads = re.findall(r'<link[^>]+rel=["\']preload["\'][^>]+href=["\']([^"\']*)["\']', html, re.IGNORECASE)

    # HTML size
    html_size_kb = len(html.encode('utf-8')) / 1024

    # Font display
    font_display_swap = 'font-display:swap' in html.replace(' ', '') or 'font-display: swap' in html

    # IndexNow
    indexnow = 'indexnow' in html.lower()

    print(f'=== {label} ===')
    print(f'HTML size: {html_size_kb:.1f} KB')
    print(f'Title ({len(title_text)} chars): {title_text[:120]}')
    print(f'Meta desc ({len(desc_text)} chars): {desc_text[:160]}')
    print(f'Canonical: {canon_text}')
    print(f'Viewport: {viewport_text}')
    print(f'Robots meta: {robots_text}')
    print(f'H1s ({len(h1s)}): {h1_clean[:3]}')
    print(f'OG title: {og_title.group(1)[:80] if og_title else "MISSING"}')
    print(f'OG desc: {"present" if og_desc else "MISSING"}')
    print(f'OG image: {"present" if og_image else "MISSING"}')
    print(f'Twitter card: {twitter_card.group(1) if twitter_card else "MISSING"}')
    print(f'Schema types: {list(set(schemas))}')
    print(f'Images: {len(imgs)} total | {len(no_alt)} missing alt | {len(imgs_with_empty_alt)} empty alt | {imgs_with_dimensions} with width+height')
    print(f'fetchpriority=high: {fetchpriority_high}')
    print(f'Lazy loaded imgs: {lazy_imgs}')
    print(f'Inline scripts: {inline_scripts}')
    print(f'External scripts ({len(external_scripts)}): {[s[:80] for s in external_scripts[:4]]}')
    print(f'Preconnects: {preconnects}')
    print(f'Preloads: {preloads[:4]}')
    print(f'Font-display swap: {font_display_swap}')
    print(f'IndexNow ref: {indexnow}')
    print()

analyze_page('C:/Users/admin/hamilton-exteriors/page_home.html', 'HOMEPAGE /')
analyze_page('C:/Users/admin/hamilton-exteriors/page_roofing.html', 'ROOFING /roofing')
analyze_page('C:/Users/admin/hamilton-exteriors/page_siding.html', 'SIDING /siding')
analyze_page('C:/Users/admin/hamilton-exteriors/page_windows.html', 'WINDOWS /windows')
analyze_page('C:/Users/admin/hamilton-exteriors/page_service_areas.html', 'SERVICE AREAS /service-areas')
analyze_page('C:/Users/admin/hamilton-exteriors/page_oakland.html', 'OAKLAND CITY PAGE')
analyze_page('C:/Users/admin/hamilton-exteriors/page_blog.html', 'BLOG /blog')
