import re

BASE = "C:/Users/admin/hamilton-exteriors"

PAGES = [
    (BASE + "/seo_audit_home.html", "HOMEPAGE"),
    (BASE + "/seo_audit_roofing.html", "ROOFING"),
    (BASE + "/seo_audit_oakland.html", "OAKLAND SERVICE AREA"),
    (BASE + "/seo_audit_blog.html", "BLOG POST"),
]

def attr(pattern, html):
    m = re.search(pattern, html, re.IGNORECASE | re.DOTALL)
    return m.group(1).strip() if m else None

def count(pattern, html):
    return len(re.findall(pattern, html, re.IGNORECASE | re.DOTALL))

def parse_page(filepath, label):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()

    title_raw = attr(r"<title[^>]*>(.*?)</title>", html)
    canonical_val = attr(r'rel="canonical"[^>]*href="([^"]*)"', html)
    if not canonical_val:
        canonical_val = attr(r'href="([^"]*)"[^>]*rel="canonical"', html)
    viewport_val = attr(r'name="viewport"[^>]*content="([^"]*)"', html)
    if not viewport_val:
        viewport_val = attr(r'content="([^"]*)"[^>]*name="viewport"', html)
    og_url = attr(r'property="og:url"[^>]*content="([^"]*)"', html)
    og_title = attr(r'property="og:title"[^>]*content="([^"]*)"', html)
    robots_val = attr(r'name="robots"[^>]*content="([^"]*)"', html)

    desc_val = attr(r'name="description"[^>]*content="([^"]*)"', html)
    if not desc_val:
        desc_val = attr(r'content="([^"]*)"[^>]*name="description"', html)

    h1_blocks = re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.DOTALL | re.IGNORECASE)
    h1_text = [re.sub(r"<[^>]+>", "", h).strip()[:70] for h in h1_blocks]
    h2_count = count(r"<h2[^>]*>", html)

    schema_blocks = re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
    schema_types = []
    for s in schema_blocks:
        m = re.search(r'"@type"\s*:\s*"([^"]+)"', s)
        schema_types.append(m.group(1) if m else "unknown")

    preloads = re.findall(r'<link[^>]*rel="preload"[^>]*>', html, re.IGNORECASE)
    preload_details = []
    for p in preloads:
        href = attr(r'href="([^"]*)"', p)
        as_val = attr(r'\bas="([^"]*)"', p)
        preload_details.append((href or "?", as_val or "?"))

    stylesheets = re.findall(r'<link[^>]*rel="stylesheet"[^>]*href="([^"]*)"', html, re.IGNORECASE)

    lcp_high = count(r'fetchpriority="high"', html)
    lazy_count = count(r'loading="lazy"', html)
    img_total = count(r"<img[^>]*>", html)
    img_no_alt = count(r'<img(?![^>]*\balt\s*=)[^>]*>', html)

    has_breadcrumb = "BreadcrumbList" in html
    has_date_pub = "datePublished" in html
    has_article = any("Article" in t or "BlogPosting" in t for t in schema_types)
    has_twitter = bool(re.search(r'twitter:card', html, re.IGNORECASE))
    has_hreflang = bool(re.search(r'hreflang', html, re.IGNORECASE))
    internal_links = set(re.findall(r'href="(/[^"#?][^"]*)"', html, re.IGNORECASE))

    print()
    print("=" * 62)
    print(f"  {label}")
    print("=" * 62)
    print(f"  HTML size        : {len(html):,} bytes")
    t = title_raw or "MISSING"
    print(f"  Title ({len(t):3d} ch)  : {t[:80]}")
    d = desc_val or "MISSING"
    print(f"  Meta desc ({len(d):3d}ch): {d[:100]}")
    print(f"  Canonical        : {canonical_val or 'MISSING'}")
    print(f"  OG URL           : {og_url or 'MISSING'}")
    print(f"  Robots meta      : {robots_val or 'not set (index/follow assumed)'}")
    print(f"  Viewport         : {viewport_val or 'MISSING'}")
    print(f"  H1 ({len(h1_blocks)})           : {h1_text}")
    print(f"  H2 count         : {h2_count}")
    print(f"  Twitter card     : {has_twitter}")
    print(f"  Hreflang         : {has_hreflang}")
    print(f"  Preloads         : {len(preloads)}")
    for href, as_val in preload_details[:5]:
        print(f"    {href[:70]}  as={as_val}")
    print(f"  CSS stylesheets  : {stylesheets[:3]}")
    print(f"  Schema types     : {schema_types}")
    print(f"  BreadcrumbList   : {has_breadcrumb}")
    print(f"  Article schema   : {has_article}  datePublished: {has_date_pub}")
    print(f"  fetchpriority=hi : {lcp_high}  lazy imgs: {lazy_count}  total imgs: {img_total}  no-alt: {img_no_alt}")
    print(f"  Internal links   : {len(internal_links)}")

for path, label in PAGES:
    parse_page(path, label)
