from html.parser import HTMLParser
import re, sys

class PerfAuditor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.preloads = []
        self.preconnects = []
        self.scripts = []
        self.styles = []
        self.images = []
        self.viewport = None
        self.inline_scripts = []
        self._in_script = False
        self._script_data = ''
        self._script_attrs = {}
        self.title = ''
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'link':
            rel = attrs_dict.get('rel', '')
            href = attrs_dict.get('href', '')
            if rel == 'preload':
                self.preloads.append({'href': href, 'as': attrs_dict.get('as',''), 'crossorigin': 'crossorigin' in attrs_dict or attrs_dict.get('crossorigin','') != ''})
            elif rel in ('preconnect', 'dns-prefetch'):
                self.preconnects.append({'rel': rel, 'href': href})
            elif rel == 'stylesheet':
                self.styles.append(href)
        elif tag == 'script':
            src = attrs_dict.get('src', '')
            if src:
                self.scripts.append({'src': src, 'defer': 'defer' in attrs_dict, 'async': 'async' in attrs_dict, 'type': attrs_dict.get('type','')})
                self._in_script = False
            else:
                self._in_script = True
                self._script_attrs = attrs_dict
                self._script_data = ''
        elif tag == 'img':
            self.images.append({
                'src': attrs_dict.get('src',''),
                'srcset': attrs_dict.get('srcset',''),
                'width': attrs_dict.get('width',''),
                'height': attrs_dict.get('height',''),
                'loading': attrs_dict.get('loading',''),
                'fetchpriority': attrs_dict.get('fetchpriority',''),
                'alt': attrs_dict.get('alt','__MISSING__'),
            })
        elif tag == 'meta':
            if attrs_dict.get('name','') == 'viewport':
                self.viewport = attrs_dict.get('content','')
        elif tag == 'title':
            self._in_title = True

    def handle_endtag(self, tag):
        if tag == 'script' and self._in_script:
            if len(self._script_data) > 50:
                self.inline_scripts.append(len(self._script_data))
            self._in_script = False
        elif tag == 'title':
            self._in_title = False

    def handle_data(self, data):
        if self._in_script:
            self._script_data += data
        if self._in_title:
            self.title += data


def audit_page(filepath, label):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    p = PerfAuditor()
    p.feed(content)

    print(f'\n{"="*60}')
    print(f'  {label}')
    print(f'{"="*60}')
    print(f'HTML size: {len(content):,} bytes ({len(content)//1024} KB)')
    print(f'Title: {p.title.strip()[:80]}')
    print()

    print('PRELOADS:')
    for pl in p.preloads:
        co = ' [crossorigin]' if pl['crossorigin'] else ''
        print(f'  [{pl["as"]}]{co} {pl["href"][:90]}')
    if not p.preloads:
        print('  NONE -- no <link rel=preload> found')
    print()

    print('PRECONNECTS / DNS-PREFETCH:')
    for pc in p.preconnects:
        print(f'  [{pc["rel"]}] {pc["href"]}')
    if not p.preconnects:
        print('  NONE')
    print()

    print('EXTERNAL STYLESHEETS:')
    for s in p.styles:
        print(f'  {s[:90]}')
    if not p.styles:
        print('  NONE (inline/bundled CSS)')
    print()

    print('EXTERNAL SCRIPTS:')
    for sc in p.scripts:
        flags = []
        if sc['defer']: flags.append('DEFER')
        if sc['async']: flags.append('ASYNC')
        if sc['type']: flags.append(f'type={sc["type"]}')
        flag_str = ', '.join(flags) if flags else '*** BLOCKING ***'
        print(f'  [{flag_str}] {sc["src"][:90]}')
    if not p.scripts:
        print('  NONE')
    print()

    print('INLINE SCRIPTS:')
    print(f'  Count: {len(p.inline_scripts)}, Total: {sum(p.inline_scripts):,} bytes')
    for i, sz in enumerate(sorted(p.inline_scripts, reverse=True)[:5]):
        print(f'    #{i+1}: {sz:,} bytes')
    print()

    print('IMAGES:')
    total = len(p.images)
    no_dim = [img for img in p.images if not img['width'] or not img['height']]
    lazy = [img for img in p.images if img['loading'] == 'lazy']
    eager = [img for img in p.images if img['loading'] == 'eager']
    high_prio = [img for img in p.images if img['fetchpriority'] == 'high']
    webp_avif = [img for img in p.images if '.webp' in img['src'] or '.avif' in img['src']]
    no_alt = [img for img in p.images if img['alt'] == '__MISSING__' or img['alt'] == '']
    print(f'  Total img tags: {total}')
    print(f'  Missing width/height (CLS risk): {len(no_dim)}')
    print(f'  loading=lazy: {len(lazy)}')
    print(f'  loading=eager: {len(eager)}')
    print(f'  fetchpriority=high: {len(high_prio)}')
    print(f'  WebP/AVIF src: {len(webp_avif)}')
    print(f'  Missing alt text: {len(no_alt)}')
    print()

    if no_dim:
        print('  Images WITHOUT dimensions (CLS risk):')
        for img in no_dim[:10]:
            src = img['src'][:70] or ('(srcset)'+img['srcset'][:60])
            print(f'    src={src}')
            print(f'       loading={img["loading"]}  fetchpriority={img["fetchpriority"]}')
    if high_prio:
        print()
        print('  LCP candidates (fetchpriority=high):')
        for img in high_prio:
            print(f'    {img["src"][:80]}')

    # Font detection
    font_refs = re.findall(r'(thebold|dm-sans|DM.?Sans|Satoshi|googleapis.*font|font.*googleapis|\.woff2?)[^"\'<>]{0,60}', content, re.IGNORECASE)
    print()
    print('FONT SIGNALS:')
    seen = set()
    for ref in font_refs[:12]:
        key = ref[:60]
        if key not in seen:
            print(f'  {key}')
            seen.add(key)
    if not font_refs:
        print('  No direct font references found in HTML')

    # Check for Google Fonts blocking pattern
    gf = re.findall(r'fonts\.googleapis\.com[^"\'<>\s]+', content)
    if gf:
        print()
        print('  GOOGLE FONTS (potential render-block):')
        for g in gf[:5]:
            print(f'    {g[:100]}')

    return p


pages = [
    ('/tmp/hx_home_live.html', 'HOME -- hamilton-exteriors.com/'),
    ('/tmp/hx_roofing_live.html', 'ROOFING -- /roofing'),
    ('/tmp/hx_siding_live.html', 'SIDING -- /siding'),
    ('/tmp/hx_blog_live.html', 'BLOG -- /blog'),
]

for path, label in pages:
    audit_page(path, label)
