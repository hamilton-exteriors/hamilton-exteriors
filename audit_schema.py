import re, json, sys

def extract_jsonld(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    pattern = r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>'
    blocks = re.findall(pattern, html, re.DOTALL)
    results = []
    for b in blocks:
        try:
            results.append(json.loads(b.strip()))
        except Exception as e:
            results.append({'PARSE_ERROR': str(e), 'raw': b[:300]})
    return results

pages = [
    ('HOME', 'page_home.html'),
    ('ROOFING', 'page_roofing.html'),
    ('OAKLAND', 'page_oakland.html'),
    ('BLOG', 'page_blog.html'),
]

for page, fname in pages:
    print(f'\n{"="*60}')
    print(f'  {page} ({fname})')
    print(f'{"="*60}')
    try:
        blocks = extract_jsonld(fname)
        print(f'  Total blocks: {len(blocks)}')
        for i, b in enumerate(blocks):
            t = b.get('@type', b.get('@graph', 'UNKNOWN'))
            print(f'\n  -- Block {i+1}: @type = {t}')
            serialized = json.dumps(b, indent=2)
            if len(serialized) > 2500:
                print(serialized[:2500])
                print(f'  ... [truncated, total {len(serialized)} chars]')
            else:
                print(serialized)
    except FileNotFoundError:
        print('  FILE NOT FOUND')
