import re, json

TMPDIR = 'C:/Users/admin/AppData/Local/Temp'

files = {
    'homepage': f'{TMPDIR}/home.html',
    'roofing': f'{TMPDIR}/roofing.html',
    'siding': f'{TMPDIR}/siding.html',
    'windows': f'{TMPDIR}/windows.html',
    'adu': f'{TMPDIR}/adu.html',
    'custom-homes': f'{TMPDIR}/custom_homes.html',
    'additions': f'{TMPDIR}/additions.html',
    'oakland-ca': f'{TMPDIR}/oakland.html',
    'alameda-county-ca': f'{TMPDIR}/alameda.html',
    'blog': f'{TMPDIR}/blog.html',
}

def extract(html):
    title = re.findall(r'<title[^>]*>(.*?)</title>', html, re.DOTALL)
    desc = re.findall(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)', html)
    if not desc:
        desc = re.findall(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*name=["\']description["\']', html)
    schema_blocks = re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', html, re.DOTALL)
    h1 = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)]
    h2 = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL)]
    h3 = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h3[^>]*>(.*?)</h3>', html, re.DOTALL)]
    canonical = re.findall(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)', html)
    body = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    body = re.sub(r'<style[^>]*>.*?</style>', '', body, flags=re.DOTALL)
    body = re.sub(r'<head>.*?</head>', '', body, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', body)
    text = re.sub(r'\s+', ' ', text).strip()
    wc = len(text.split())
    schema_types = []
    schema_details = []
    for s in schema_blocks:
        try:
            d = json.loads(s)
            t = d.get('@type', 'unknown')
            schema_types.append(t)
            schema_details.append(json.dumps(d)[:500])
        except:
            schema_types.append('parse_error')
            schema_details.append(s[:300])
    return {
        'title': (title[0] if title else 'MISSING').strip(),
        'meta_desc': (desc[0] if desc else 'MISSING')[:130],
        'h1': h1,
        'h2': h2[:8],
        'h3_count': len(h3),
        'canonical': canonical[0] if canonical else 'MISSING',
        'schema_types': schema_types,
        'schema_details': schema_details,
        'word_count': wc,
    }

for name, path in files.items():
    try:
        with open(path) as f:
            html = f.read()
        r = extract(html)
        print(f"\n{'='*60}")
        print(f"PAGE: {name}")
        print(f"  Title: {r['title']}")
        print(f"  Meta desc: {r['meta_desc']}")
        print(f"  Canonical: {r['canonical']}")
        print(f"  H1: {r['h1']}")
        print(f"  H2s: {r['h2']}")
        print(f"  H3 count: {r['h3_count']}")
        print(f"  Schema types: {r['schema_types']}")
        print(f"  Word count: {r['word_count']}")
        for i, sd in enumerate(r['schema_details']):
            print(f"  Schema {i+1}: {sd}")
    except Exception as e:
        print(f"\nERROR on {name}: {e}")
