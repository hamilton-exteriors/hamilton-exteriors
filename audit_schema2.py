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

# Print the full LocalBusiness block from homepage (block index 1)
print("=== HOME: Full LocalBusiness block ===")
blocks = extract_jsonld('page_home.html')
print(json.dumps(blocks[1], indent=2))

# Print all blocks from roofing page in full
print("\n\n=== ROOFING: All blocks (full) ===")
blocks_r = extract_jsonld('page_roofing.html')
print(f"Total blocks: {len(blocks_r)}")
for i, b in enumerate(blocks_r):
    print(f"\n-- Block {i+1}: @type={b.get('@type')}")
    print(json.dumps(b, indent=2))

# Print all blocks from Oakland page in full
print("\n\n=== OAKLAND: All blocks (full) ===")
blocks_o = extract_jsonld('page_oakland.html')
print(f"Total blocks: {len(blocks_o)}")
for i, b in enumerate(blocks_o):
    print(f"\n-- Block {i+1}: @type={b.get('@type')}")
    print(json.dumps(b, indent=2))
