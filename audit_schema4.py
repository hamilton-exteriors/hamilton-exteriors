import re, json
import os

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

# List all page_ files to see what we have
print("All page_ HTML files:")
for f in sorted(os.listdir('.')):
    if f.startswith('page_') and f.endswith('.html'):
        blocks = extract_jsonld(f)
        types = [str(b.get('@type','?')) for b in blocks]
        print(f"  {f}: {len(blocks)} blocks — {types}")

# Also check tmp_ HTML files
print("\nAll tmp_ HTML files:")
for f in sorted(os.listdir('.')):
    if f.startswith('tmp_') and f.endswith('.html'):
        blocks = extract_jsonld(f)
        types = [str(b.get('@type','?')) for b in blocks]
        print(f"  {f}: {len(blocks)} blocks — {types}")
