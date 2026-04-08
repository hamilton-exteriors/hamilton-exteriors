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

files = [
    ('ROOFING DL', 'page_roofing_dl.html'),
    ('SIDING', 'page_siding.html'),
    ('WINDOWS', 'page_windows.html'),
    ('SVC AREAS DL', 'page_svc_areas_dl.html'),
]

for label, fname in files:
    print(f'\n{"="*60}')
    print(f'  {label} ({fname})')
    print(f'{"="*60}')
    try:
        blocks = extract_jsonld(fname)
        print(f'  Total blocks: {len(blocks)}')
        for i, b in enumerate(blocks):
            t = b.get('@type', 'UNKNOWN')
            print(f'\n  -- Block {i+1}: @type={t}')
            # Only print non-LocalBusiness blocks in full; summarize the repeated LB block
            if t in [['RoofingContractor','GeneralContractor'], ['GeneralContractor','RoofingContractor']]:
                print('  [LocalBusiness block - same as other pages, skipping full print]')
            else:
                serialized = json.dumps(b, indent=2)
                if len(serialized) > 3000:
                    print(serialized[:3000])
                    print(f'  ... [truncated]')
                else:
                    print(serialized)
    except FileNotFoundError:
        print('  FILE NOT FOUND')
