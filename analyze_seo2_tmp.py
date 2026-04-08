import re

def analyze_page(path, label):
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            html = f.read()
    except Exception as e:
        print(f'--- {label}: FILE NOT FOUND ({e}) ---')
        return

    title = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    title_text = title.group(1).strip() if title else 'MISSING'
    meta_desc = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)["\']', html, re.IGNORECASE)
    if not meta_desc:
        meta_desc = re.search(r'<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']description["\']', html, re.IGNORECASE)
    desc_text = meta_desc.group(1).strip() if meta_desc else 'MISSING'
    canonical = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']*)["\']', html, re.IGNORECASE)
    if not canonical:
        canonical = re.search(r'<link[^>]+href=["\']([^"\']*)["\'][^>]+rel=["\']canonical["\']', html, re.IGNORECASE)
    canon_text = canonical.group(1).strip() if canonical else 'MISSING'
    robots_meta = re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']*)["\']', html, re.IGNORECASE)
    robots_text = robots_meta.group(1) if robots_meta else 'not set'
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)
    h1_clean = [re.sub(r'<[^>]+>', '', h).strip()[:80] for h in h1s]
    schemas = list(set(re.findall(r'"@type"\s*:\s*"([^"]+)"', html)))
    size_kb = len(html.encode()) / 1024

    print(f'=== {label} ===')
    print(f'Size: {size_kb:.1f}KB | Title ({len(title_text)}): {title_text[:100]}')
    print(f'Meta desc ({len(desc_text)}): {desc_text[:120]}')
    print(f'Canonical: {canon_text}')
    print(f'Robots: {robots_text}')
    print(f'H1s: {h1_clean}')
    print(f'Schema types: {schemas}')
    print()

analyze_page('C:/Users/admin/hamilton-exteriors/page_additions_dl.html', 'ADDITIONS /additions')
analyze_page('C:/Users/admin/hamilton-exteriors/page_additions2_dl.html', 'ADDITIONS-2 /additions-2')
analyze_page('C:/Users/admin/hamilton-exteriors/page_adu_dl.html', 'ADU /adu')
analyze_page('C:/Users/admin/hamilton-exteriors/page_success_dl.html', 'SUCCESS /success')
