import re, sys

path = sys.argv[1]
html = open(path, encoding='utf-8', errors='ignore').read()

title = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE|re.DOTALL)
desc = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']', html, re.IGNORECASE)
if not desc:
    desc = re.search(r'<meta[^>]+content=["\'](.*?)["\'][^>]+name=["\']description["\']', html, re.IGNORECASE)
canon = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](.*?)["\']', html, re.IGNORECASE)
h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
h1s = [re.sub('<[^>]+>','',h).strip() for h in h1s]
schemas = re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL)

print('TITLE:', title.group(1).strip() if title else 'MISSING')
print('DESC:', (desc.group(1).strip()[:160] if desc else 'MISSING'), '| len:', len(desc.group(1)) if desc else 0)
print('CANON:', canon.group(1).strip() if canon else 'MISSING')
print('H1:', h1s)
print('Schema count:', len(schemas))
for i, s in enumerate(schemas):
    types = re.findall(r'"@type"\s*:\s*"([^"]+)"', s)
    print(f'  [{i+1}] {sorted(set(types))}')

# Check for thin content
text = re.sub(r'<(script|style|nav|header|footer|noscript)[^>]*>.*?</\1>', '', html, flags=re.DOTALL|re.IGNORECASE)
text = re.sub(r'<[^>]+>', ' ', text)
text = re.sub(r'\s+', ' ', text).strip()
words = len(text.split())
print(f'Word count: {words}')
print(f'HTML size: {len(html)//1024} KB')
