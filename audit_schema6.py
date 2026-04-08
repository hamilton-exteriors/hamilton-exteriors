import re, json

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

# Check if siding/windows tmp files have Service blocks with pricing
for fname in ['tmp_siding.html']:
    print(f"\n=== {fname} ===")
    blocks = extract_jsonld(fname)
    for b in blocks:
        if b.get('@type') == 'Service':
            print(json.dumps(b, indent=2))

# Check homepage BreadcrumbList (single item)
print("\n=== HOME BreadcrumbList (single item) ===")
blocks = extract_jsonld('page_home.html')
for b in blocks:
    if b.get('@type') == 'BreadcrumbList':
        print(json.dumps(b, indent=2))

# Check if blog has any Article blocks in tmp
print("\n=== Blog tmp — any Article blocks? ===")
blocks = extract_jsonld('tmp_blog.html')
for b in blocks:
    print(f"  @type = {b.get('@type')}")

# Check roofing Service block pricing in tmp
print("\n=== tmp_roofing.html — full Service block ===")
blocks = extract_jsonld('tmp_roofing.html')
for b in blocks:
    if b.get('@type') == 'Service':
        print(json.dumps(b, indent=2))

# Oakland breadcrumb — URL consistency check
print("\n=== Oakland BreadcrumbList: position 4 URL ===")
blocks = extract_jsonld('tmp_oakland.html')
for b in blocks:
    if b.get('@type') == 'BreadcrumbList':
        for item in b.get('itemListElement', []):
            print(f"  pos {item.get('position')}: {item.get('item')}")
