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

# Get the full blocks from live pages that have interesting content
print("=== LIVE: page_svc_areas.html ===")
blocks = extract_jsonld('page_svc_areas.html')
for i, b in enumerate(blocks):
    t = b.get('@type')
    if t in [['RoofingContractor', 'GeneralContractor']]:
        print(f"Block {i+1}: LocalBusiness [skipped]")
        continue
    print(f"\nBlock {i+1}: @type={t}")
    print(json.dumps(b, indent=2))

# Compare with tmp_ versions of service + FAQ blocks
print("\n\n=== TMP (dev): tmp_roofing.html — Service block ===")
blocks_r = extract_jsonld('tmp_roofing.html')
for b in blocks_r:
    if b.get('@type') == 'Service':
        print(json.dumps(b, indent=2))

print("\n\n=== TMP (dev): tmp_roofing.html — FAQPage block ===")
for b in blocks_r:
    if b.get('@type') == 'FAQPage':
        print(json.dumps(b, indent=2)[:2000])

print("\n\n=== TMP (dev): tmp_oakland.html — Service block ===")
blocks_o = extract_jsonld('tmp_oakland.html')
for b in blocks_o:
    if b.get('@type') == 'Service':
        print(json.dumps(b, indent=2)[:2500])

print("\n\n=== TMP (dev): tmp_oakland.html — FAQPage block (summary) ===")
for b in blocks_o:
    if b.get('@type') == 'FAQPage':
        questions = [q.get('name') for q in b.get('mainEntity', [])]
        print(f"  Questions ({len(questions)}): {questions}")

print("\n\n=== TMP (dev): tmp_oakland.html — BreadcrumbList block ===")
for b in blocks_o:
    if b.get('@type') == 'BreadcrumbList':
        print(json.dumps(b, indent=2))
