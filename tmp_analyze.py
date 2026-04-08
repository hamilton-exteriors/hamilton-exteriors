import re, sys

def extract_text(html):
    html = re.sub(r'<(script|style|nav|header|footer|noscript)[^>]*>.*?</\1>', '', html, flags=re.DOTALL|re.IGNORECASE)
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def word_count(text):
    return len(text.split())

def count_headings(html):
    h1 = len(re.findall(r'<h1[^>]*>', html, re.IGNORECASE))
    h2 = len(re.findall(r'<h2[^>]*>', html, re.IGNORECASE))
    h3 = len(re.findall(r'<h3[^>]*>', html, re.IGNORECASE))
    return h1, h2, h3

def extract_headings_text(html):
    headings = re.findall(r'<(h[1-3])[^>]*>(.*?)</\1>', html, re.IGNORECASE|re.DOTALL)
    result = []
    for tag, content in headings:
        clean = re.sub(r'<[^>]+>', '', content).strip()
        clean = re.sub(r'\s+', ' ', clean).strip()
        if clean and len(clean) > 1:
            result.append(f"{tag.upper()}: {clean}")
    return result

def extract_meta(html):
    title = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE|re.DOTALL)
    desc = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']', html, re.IGNORECASE)
    if not desc:
        desc = re.search(r'<meta[^>]+content=["\'](.*?)["\'][^>]+name=["\']description["\']', html, re.IGNORECASE)
    canon = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](.*?)["\']', html, re.IGNORECASE)
    return {
        'title': title.group(1).strip() if title else 'MISSING',
        'description': desc.group(1).strip() if desc else 'MISSING',
        'canonical': canon.group(1).strip() if canon else 'MISSING'
    }

def extract_schema_types(html):
    types = re.findall(r'"@type"\s*:\s*"([^"]+)"', html)
    return list(set(types))

def check_eeat_signals(html):
    s = {}
    s['has_author_byline'] = bool(re.search(r'author|written by|by [A-Z][a-z]', html, re.IGNORECASE))
    s['has_license_number'] = bool(re.search(r'CSLB|license\s*#?\s*\d+|lic\.\s*#\s*\d+', html, re.IGNORECASE))
    s['has_certifications'] = bool(re.search(r'GAF|Owens Corning|certif|certified|preferred contractor', html, re.IGNORECASE))
    s['has_years_experience'] = bool(re.search(r'\d+\s*\+?\s*years?\s*(of\s*)?(experience|in business|serving)', html, re.IGNORECASE))
    s['has_reviews_ratings'] = bool(re.search(r'review|rating|\bstars?\b|testimonial', html, re.IGNORECASE))
    s['has_phone_number'] = bool(re.search(r'\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}', html))
    s['has_local_address'] = bool(re.search(r'Castro Valley|Hayward|Alameda County|CA\s+\d{5}', html, re.IGNORECASE))
    s['has_pricing_data'] = bool(re.search(r'\$\d+|\bprice\b|\bcost\b|\bquote\b', html, re.IGNORECASE))
    s['has_specific_numbers'] = bool(re.search(r'\d[\d,]+\s*(sq|square|homes?|project|install)', html, re.IGNORECASE))
    s['has_project_experience'] = bool(re.search(r'project|before.{0,20}after|we (installed|replaced|completed|built)', html, re.IGNORECASE))
    s['has_faq'] = bool(re.search(r'FAQ|frequently asked|common question', html, re.IGNORECASE))
    s['has_warranty'] = bool(re.search(r'warrant', html, re.IGNORECASE))
    s['has_insurance'] = bool(re.search(r'insur(ed|ance)', html, re.IGNORECASE))
    s['has_local_specifics'] = bool(re.search(r'Oakland|Berkeley|Castro Valley|Lake Merritt|BART|East Bay|Alameda|Contra Costa', html, re.IGNORECASE))
    return s

pages = {
    'HOMEPAGE': 'C:/Users/admin/hamilton-exteriors/../../../tmp/page_home.html',
    'ROOFING': 'C:/Users/admin/hamilton-exteriors/../../../tmp/page_roofing.html',
    'BLOG': 'C:/Users/admin/hamilton-exteriors/../../../tmp/page_blog.html',
    'CITY_OAKLAND_ROOFING': 'C:/Users/admin/hamilton-exteriors/../../../tmp/page_city.html',
    'BUY_LANDING': 'C:/Users/admin/hamilton-exteriors/../../../tmp/page_buy.html',
    'SERVICE_AREAS_HUB': 'C:/Users/admin/hamilton-exteriors/../../../tmp/page_sa.html',
}

import os
for name, path in pages.items():
    rpath = os.path.normpath(path)
    try:
        with open(rpath, 'r', encoding='utf-8', errors='ignore') as f:
            html = f.read()
    except FileNotFoundError:
        print(f"FILE NOT FOUND: {rpath}")
        continue

    text = extract_text(html)
    wc = word_count(text)
    h1, h2, h3 = count_headings(html)
    headings = extract_headings_text(html)
    meta = extract_meta(html)
    schema = extract_schema_types(html)
    eeat = check_eeat_signals(html)

    print(f"\n{'='*70}")
    print(f"PAGE: {name}")
    print(f"{'='*70}")
    print(f"Word count (body): {wc}  |  HTML size: {len(html)//1024}KB")
    print(f"Headings: H1={h1}, H2={h2}, H3={h3}")
    print(f"Title ({len(meta['title'])} chars): {meta['title']}")
    print(f"Description ({len(meta['description'])} chars): {meta['description']}")
    print(f"Canonical: {meta['canonical']}")
    print(f"Schema types: {sorted(schema)}")
    print(f"\nE-E-A-T signals:")
    for k, v in eeat.items():
        mark = '[YES]' if v else '[ NO]'
        print(f"  {mark}  {k}")
    print(f"\nHeadings ({len(headings)} total):")
    for h in headings[:20]:
        print(f"  {h}")
    print(f"\nContent opening (first 600 chars):")
    print(f"  {text[:600]}")
