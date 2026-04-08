from html.parser import HTMLParser
import re, json, sys

class ContentExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.meta_desc = ""
        self.h1s, self.h2s, self.h3s = [], [], []
        self.text_chunks = []
        self.current_tag = ""
        self.in_script = False
        self.in_style = False
        self.in_nav = False
        self.collect_heading = False
        self.current_heading = ""
        self.schema_blocks = []
        self.in_schema = False
        self.schema_buf = ""
        self.canonical = ""
        self.body_links = []
        self.author_signals = []
        self.date_signals = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        cls = d.get('class','')
        if tag == 'title':
            self.current_tag = 'title'
            self.title = ""
        elif tag == 'meta':
            n = d.get('name','').lower()
            p = d.get('property','').lower()
            if n == 'description':
                self.meta_desc = d.get('content','')
            if n == 'author' or p == 'article:author':
                self.author_signals.append(d.get('content',''))
            if n in ('date','pubdate') or p in ('article:published_time','article:modified_time'):
                self.date_signals.append(d.get('content',''))
        elif tag == 'link' and d.get('rel') == 'canonical':
            self.canonical = d.get('href','')
        elif tag == 'script' and d.get('type') == 'application/ld+json':
            self.in_schema = True
            self.schema_buf = ""
        elif tag == 'script':
            self.in_script = True
        elif tag == 'style':
            self.in_style = True
        elif tag == 'nav':
            self.in_nav = True
        elif tag in ('h1','h2','h3'):
            self.collect_heading = True
            self.heading_tag = tag
            self.current_heading = ""
        elif tag == 'a':
            href = d.get('href','')
            if not self.in_nav and href:
                self.body_links.append(href)
        if any(x in cls for x in ['author','byline','bio']):
            self.author_signals.append(f"[class:{cls}]")
        if any(x in cls for x in ['date','published','updated','time']):
            self.date_signals.append(f"[class:{cls}]")

    def handle_endtag(self, tag):
        if tag == 'script' and self.in_schema:
            self.schema_blocks.append(self.schema_buf)
            self.in_schema = False
            self.schema_buf = ""
        elif tag == 'script':
            self.in_script = False
        elif tag == 'style':
            self.in_style = False
        elif tag == 'nav':
            self.in_nav = False
        elif tag in ('h1','h2','h3') and self.collect_heading:
            ht = self.current_heading.strip()
            if tag == 'h1': self.h1s.append(ht)
            elif tag == 'h2': self.h2s.append(ht)
            elif tag == 'h3': self.h3s.append(ht)
            self.collect_heading = False
        self.current_tag = ""

    def handle_data(self, data):
        if self.in_schema:
            self.schema_buf += data
            return
        if self.in_script or self.in_style:
            return
        if self.collect_heading:
            self.current_heading += data
        if self.current_tag == 'title':
            self.title += data
        stripped = data.strip()
        if stripped:
            self.text_chunks.append(stripped)

pages = {
    'HOMEPAGE': '/tmp/hx_home.html',
    'ROOFING_SVC': '/tmp/hx_roofing.html',
    'BLOG_POST': '/tmp/hx_blog.html',
    'OAKLAND_AREA': '/tmp/hx_oakland.html',
    'BLOG_INDEX': '/tmp/hx_blog_index.html',
    'PSEO_OAK_ROOFING': '/tmp/hx_pseo.html',
}

results = {}

for name, path in pages.items():
    try:
        with open(path,'r',encoding='utf-8',errors='ignore') as f:
            html = f.read()
    except Exception as e:
        print(f"ERROR loading {name}: {e}")
        continue

    p = ContentExtractor()
    p.feed(html)
    all_text = ' '.join(p.text_chunks)
    words = len(re.findall(r'\b\w+\b', all_text))

    schema_types = []
    for sb in p.schema_blocks:
        try:
            obj = json.loads(sb)
            if isinstance(obj, dict):
                t = obj.get('@type')
                if not t and '@graph' in obj:
                    t = [x.get('@type') for x in obj['@graph']]
                schema_types.append(t)
            else:
                schema_types.append([type(x) for x in obj])
        except:
            schema_types.append('parse_error')

    int_links = [l for l in p.body_links if l.startswith('/')]
    ext_links = [l for l in p.body_links if l.startswith('http')]

    results[name] = {
        'title': p.title.strip(),
        'title_len': len(p.title.strip()),
        'meta_desc': p.meta_desc,
        'meta_desc_len': len(p.meta_desc),
        'canonical': p.canonical,
        'word_count': words,
        'h1s': p.h1s,
        'h2s': p.h2s,
        'h3s': p.h3s,
        'schema_types': schema_types,
        'schema_count': len(p.schema_blocks),
        'internal_links': int_links,
        'external_links': ext_links,
        'author_signals': p.author_signals,
        'date_signals': p.date_signals,
        'text_sample': all_text[100:600],
        'full_text': all_text,
    }

    print(f"\n{'='*68}")
    print(f"PAGE: {name}")
    print(f"{'='*68}")
    print(f"TITLE [{results[name]['title_len']}c]: {results[name]['title']}")
    print(f"META DESC [{results[name]['meta_desc_len']}c]: {p.meta_desc[:140]}")
    print(f"CANONICAL: {p.canonical}")
    print(f"WORD COUNT (incl nav/footer): ~{words}")
    print(f"H1 ({len(p.h1s)}): {p.h1s}")
    print(f"H2 ({len(p.h2s)}): {p.h2s[:12]}")
    if len(p.h2s) > 12: print(f"   ...+{len(p.h2s)-12} more H2s")
    print(f"H3 ({len(p.h3s)}): {p.h3s[:8]}")
    if len(p.h3s) > 8: print(f"   ...+{len(p.h3s)-8} more H3s")
    print(f"Schema: {schema_types}")
    print(f"Internal links ({len(int_links)}): {int_links[:15]}")
    print(f"External links ({len(ext_links)}): {ext_links[:5]}")
    print(f"Author signals: {p.author_signals[:5]}")
    print(f"Date signals: {p.date_signals[:5]}")
    print(f"Text sample: {all_text[100:500]}")

# Cross-page duplicate check
print("\n\n" + "="*68)
print("CROSS-PAGE DUPLICATE CONTENT ANALYSIS")
print("="*68)
page_names = list(results.keys())
for i in range(len(page_names)):
    for j in range(i+1, len(page_names)):
        n1, n2 = page_names[i], page_names[j]
        t1 = results[n1]['full_text']
        t2 = results[n2]['full_text']
        # Sample 10 phrases from page 1 and check in page 2
        words1 = re.findall(r'\b\w+\b', t1)
        # Check 6-word n-grams
        matches = 0
        total_checked = min(50, len(words1)-6)
        for k in range(0, total_checked*20, 20):
            if k+6 > len(words1): break
            phrase = ' '.join(words1[k:k+6]).lower()
            if phrase in t2.lower():
                matches += 1
        overlap_pct = (matches / max(total_checked,1)) * 100
        if overlap_pct > 30:
            print(f"HIGH OVERLAP ({overlap_pct:.0f}%): {n1} <-> {n2}")
        elif overlap_pct > 15:
            print(f"MOD OVERLAP ({overlap_pct:.0f}%): {n1} <-> {n2}")

print("\nDone.")
