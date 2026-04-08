import re, json

def extract_meta(html):
    title = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE|re.DOTALL)
    desc = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']', html, re.IGNORECASE)
    if not desc:
        desc = re.search(r'<meta[^>]+content=["\'](.*?)["\'][^>]+name=["\']description["\']', html, re.IGNORECASE)
    canon = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](.*?)["\']', html, re.IGNORECASE)
    og_url = re.search(r'property=["\']og:url["\'][^>]+content=["\'](.*?)["\']', html)
    og_image = re.search(r'property=["\']og:image["\'][^>]+content=["\'](.*?)["\']', html)
    og_title = re.search(r'property=["\']og:title["\'][^>]+content=["\'](.*?)["\']', html)
    twitter_card = re.search(r'name=["\']twitter:card["\'][^>]+content=["\'](.*?)["\']', html)
    robots = re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'](.*?)["\']', html, re.IGNORECASE)
    viewport = re.search(r'<meta[^>]+name=["\']viewport["\'][^>]+content=["\'](.*?)["\']', html, re.IGNORECASE)
    return {
        'title': title.group(1).strip() if title else 'MISSING',
        'title_len': len(title.group(1).strip()) if title else 0,
        'description': desc.group(1).strip() if desc else 'MISSING',
        'desc_len': len(desc.group(1).strip()) if desc else 0,
        'canonical': canon.group(1).strip() if canon else 'MISSING',
        'og_url': og_url.group(1).strip() if og_url else 'MISSING',
        'og_image': og_image.group(1).strip() if og_image else 'MISSING',
        'og_title': og_title.group(1).strip() if og_title else 'MISSING',
        'twitter_card': twitter_card.group(1).strip() if twitter_card else 'MISSING',
        'robots_meta': robots.group(1).strip() if robots else 'not set (defaults to index,follow)',
        'viewport': viewport.group(1).strip() if viewport else 'MISSING',
    }

def extract_schema_types(html):
    schemas = re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL)
    all_types = []
    for s in schemas:
        types = re.findall(r'"@type"\s*:\s*"([^"]+)"', s)
        all_types.extend(types)
    return sorted(set(all_types)), len(schemas)

def analyze_images(html):
    imgs = re.findall(r'<img[^>]*>', html)
    no_alt = [img for img in imgs if 'alt=' not in img.lower()]
    lazy = [img for img in imgs if 'loading="lazy"' in img.lower() or "loading='lazy'" in img.lower()]
    eager = [img for img in imgs if 'loading="eager"' in img.lower() or "loading='eager'" in img.lower()]
    fetchpri_high = [img for img in imgs if 'fetchpriority="high"' in img.lower() or "fetchpriority='high'" in img.lower()]
    return {
        'total': len(imgs),
        'no_alt': len(no_alt),
        'lazy': len(lazy),
        'eager': len(eager),
        'fetchpriority_high': len(fetchpri_high),
        'no_alt_examples': [re.sub(r'class="[^"]*"', '', img)[:120] for img in no_alt[:3]],
    }

def analyze_scripts(html):
    ext_scripts = re.findall(r'<script[^>]+src=["\'](.*?)["\']', html)
    inline_scripts = re.findall(r'<script(?![^>]+src=)[^>]*>(.*?)</script>', html, re.DOTALL)
    total_inline_kb = sum(len(s) for s in inline_scripts) // 1024
    deferred = [s for s in ext_scripts if 'defer' in html[max(0, html.find(s)-50):html.find(s)+len(s)+20]]
    async_scripts = [s for s in ext_scripts if 'async' in html[max(0, html.find(s)-50):html.find(s)+len(s)+20]]
    return {
        'ext_count': len(ext_scripts),
        'ext_scripts': ext_scripts,
        'inline_blocks': len(inline_scripts),
        'inline_kb': total_inline_kb,
    }

def analyze_headings(html):
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
    h1s = [re.sub('<[^>]+>', '', h).strip() for h in h1s]
    h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL)
    h2s = [re.sub('<[^>]+>', '', h).strip()[:80] for h in h2s]
    return h1s, h2s

def analyze_links(html, base_url):
    hrefs = re.findall(r'<a[^>]+href=["\'](.*?)["\']', html)
    internal = [l for l in hrefs if l.startswith('/') or base_url in l]
    external = [l for l in hrefs if l.startswith('http') and base_url not in l]
    nofollow = len(re.findall(r'rel=["\'][^"\']*nofollow[^"\']*["\']', html))
    return len(internal), len(external), nofollow

pages = [
    ('HOMEPAGE /', 'C:/Users/admin/hamilton-exteriors/tmp_homepage.html'),
    ('ROOFING /roofing', 'C:/Users/admin/hamilton-exteriors/tmp_roofing.html'),
    ('SIDING /siding', 'C:/Users/admin/hamilton-exteriors/tmp_siding.html'),
    ('SERVICE AREAS', 'C:/Users/admin/hamilton-exteriors/tmp_service_areas.html'),
    ('OAKLAND', 'C:/Users/admin/hamilton-exteriors/tmp_oakland.html'),
    ('BLOG', 'C:/Users/admin/hamilton-exteriors/tmp_blog.html'),
    ('PRIVACY', 'C:/Users/admin/hamilton-exteriors/tmp_privacy.html'),
]

for name, path in pages:
    try:
        html = open(path, encoding='utf-8', errors='ignore').read()
    except FileNotFoundError:
        print(f"\n[SKIP] {name}: file not found")
        continue

    meta = extract_meta(html)
    schema_types, schema_count = extract_schema_types(html)
    imgs = analyze_images(html)
    scripts = analyze_scripts(html)
    h1s, h2s = analyze_headings(html)
    int_links, ext_links, nofollow_count = analyze_links(html, 'hamilton-exteriors')

    print(f"\n{'='*65}")
    print(f"  {name}")
    print(f"{'='*65}")
    print(f"HTML size: {len(html)//1024} KB")
    print(f"Title ({meta['title_len']} chars): {meta['title']}")
    print(f"Meta desc ({meta['desc_len']} chars): {meta['description'][:140]}")
    print(f"Canonical: {meta['canonical']}")
    print(f"OG:URL: {meta['og_url']}")
    print(f"OG:Image: {meta['og_image'][:80] if meta['og_image'] != 'MISSING' else 'MISSING'}")
    print(f"Twitter card: {meta['twitter_card']}")
    print(f"Robots meta: {meta['robots_meta']}")
    print(f"Viewport: {meta['viewport']}")
    print(f"H1 ({len(h1s)}): {h1s}")
    print(f"H2 ({len(h2s)}): {h2s[:4]}")
    print(f"Schema types ({schema_count} blocks): {schema_types}")
    print(f"Images: {imgs['total']} total | {imgs['no_alt']} no-alt | {imgs['lazy']} lazy | {imgs['eager']} eager | {imgs['fetchpriority_high']} fetchpriority=high")
    if imgs['no_alt_examples']:
        for ex in imgs['no_alt_examples']:
            print(f"  No-alt: {ex}")
    print(f"Scripts: {scripts['ext_count']} external | {scripts['inline_blocks']} inline blocks | {scripts['inline_kb']} KB inline")
    print(f"Links: {int_links} internal | {ext_links} external | {nofollow_count} nofollow")

print("\n\n=== SCRIPT DETAILS (Homepage) ===")
html = open('C:/Users/admin/hamilton-exteriors/tmp_homepage.html', encoding='utf-8', errors='ignore').read()
scripts = analyze_scripts(html)
for s in scripts['ext_scripts']:
    print(f"  {s[:100]}")
