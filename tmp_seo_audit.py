import re
import sys
import urllib.request
import json

BASE = "https://hamilton-exteriors-production.up.railway.app"

PAGES = {
    "homepage": "/",
    "roofing": "/roofing",
    "blog": "/blog",
    "blog_post": "/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026",
    "pseo_service": "/service-areas/alameda-county-ca/oakland-ca/roofing",
    "buy": "/buy",
    "service_areas": "/service-areas",
}

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; SEOAuditBot/1.0)"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode("utf-8", errors="ignore")

def find(pattern, html, flags=re.IGNORECASE | re.DOTALL):
    m = re.search(pattern, html, flags)
    return m.group(1) if m else None

def findall(pattern, html, flags=re.IGNORECASE | re.DOTALL):
    return re.findall(pattern, html, flags)

results = {}

for name, path in PAGES.items():
    url = BASE + path
    print(f"\nFetching {name}: {url}")
    try:
        html = get(url)
    except Exception as e:
        print(f"  ERROR: {e}")
        results[name] = {"error": str(e)}
        continue

    r = {}
    r["url"] = url
    r["html_size_kb"] = round(len(html) / 1024, 1)

    # Title
    r["title"] = find(r"<title[^>]*>(.*?)</title>", html)
    r["title_len"] = len(r["title"]) if r["title"] else 0

    # Meta description
    desc = find(r'<meta\s[^>]*name="description"[^>]*content="([^"]+)"', html)
    if not desc:
        desc = find(r'<meta\s[^>]*content="([^"]+)"[^>]*name="description"', html)
    r["meta_desc"] = desc
    r["meta_desc_len"] = len(desc) if desc else 0

    # Canonical
    r["canonical"] = find(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', html)

    # Robots meta
    r["robots_meta"] = find(r'<meta\s[^>]*name="robots"[^>]*content="([^"]+)"', html)

    # H1
    h1_all = findall(r"<h1[^>]*>(.*?)</h1>", html)
    r["h1_count"] = len(h1_all)
    r["h1_text"] = re.sub("<[^>]+>", "", h1_all[0]).strip()[:80] if h1_all else None

    # H2 count
    h2_all = findall(r"<h2[^>]*>(.*?)</h2>", html)
    r["h2_count"] = len(h2_all)

    # Viewport
    r["viewport"] = find(r'<meta\s[^>]*name="viewport"[^>]*content="([^"]+)"', html)

    # OG
    r["og_title"] = find(r'<meta\s[^>]*property="og:title"[^>]*content="([^"]+)"', html)
    r["og_desc"] = find(r'<meta\s[^>]*property="og:description"[^>]*content="([^"]+)"', html)
    r["og_image"] = find(r'<meta\s[^>]*property="og:image"[^>]*content="([^"]+)"', html)
    r["og_type"] = find(r'<meta\s[^>]*property="og:type"[^>]*content="([^"]+)"', html)
    r["twitter_card"] = find(r'<meta\s[^>]*name="twitter:card"[^>]*content="([^"]+)"', html)

    # JSON-LD
    jsonld_blocks = findall(r'<script\s[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html)
    r["jsonld_count"] = len(jsonld_blocks)
    r["jsonld_types"] = []
    r["jsonld_has_localbusiness"] = False
    for block in jsonld_blocks:
        st = find(r'"@type"\s*:\s*"([^"]+)"', block)
        if st:
            r["jsonld_types"].append(st)
            if st.lower() in ("localbusiness", "homeandconstructionbusiness", "roofingcontractor", "generalcontractor"):
                r["jsonld_has_localbusiness"] = True
    # also check for LocalBusiness inside @graph
    if re.search(r'"LocalBusiness"', "\n".join(jsonld_blocks), re.IGNORECASE):
        r["jsonld_has_localbusiness"] = True

    # Images
    all_imgs = findall(r"<img[^>]+>", html)
    r["img_total"] = len(all_imgs)
    r["img_no_alt"] = len(findall(r"<img(?![^>]*\balt\b)[^>]*>", html))
    r["img_empty_alt"] = len(findall(r'<img[^>]+alt=""[^>]*>', html))
    r["img_no_dims"] = len(findall(r"<img(?![^>]*(?:width|height))[^>]*>", html))

    # Fetchpriority / LCP hints
    r["img_fetchpriority_high"] = len(findall(r'<img[^>]+fetchpriority="high"[^>]*>', html))
    r["img_lazy"] = len(findall(r'<img[^>]+loading="lazy"[^>]*>', html))

    # Preloads
    preloads = findall(r'<link[^>]+rel="preload"[^>]*>', html)
    r["preload_count"] = len(preloads)
    r["preload_items"] = []
    for p in preloads[:5]:
        href = find(r'href="([^"]+)"', p)
        as_val = find(r'as="([^"]+)"', p)
        r["preload_items"].append(f"{as_val}:{href[:50] if href else '?'}")

    # CSS/JS
    r["inline_style_blocks"] = len(findall(r"<style[^>]*>", html))
    r["ext_css"] = len(findall(r'<link[^>]+rel="stylesheet"[^>]*>', html))
    r["ext_scripts"] = findall(r'<script[^>]+src="([^"]+)"', html)

    # IndexNow
    r["indexnow_in_html"] = bool(re.search(r"indexnow", html, re.IGNORECASE))

    # noscript
    r["has_noscript"] = bool(re.search(r"<noscript", html, re.IGNORECASE))

    # Noindex check
    r["has_noindex"] = bool(re.search(r"noindex", html, re.IGNORECASE))

    # CLS risk: video/iframe without dimensions
    r["iframe_no_dims"] = len(findall(r"<iframe(?![^>]*(?:width|height))[^>]*>", html))

    results[name] = r

# Pretty print
for name, r in results.items():
    if "error" in r:
        print(f"\n{'='*60}")
        print(f"PAGE: {name.upper()} -- ERROR: {r['error']}")
        continue
    print(f"\n{'='*60}")
    print(f"PAGE: {name.upper()} ({r['url']})")
    print(f"  HTML size: {r['html_size_kb']} KB")
    print(f"  TITLE ({r['title_len']} chars): {r['title']}")
    print(f"  META DESC ({r['meta_desc_len']} chars): {(r['meta_desc'] or 'MISSING')[:100]}")
    print(f"  CANONICAL: {r['canonical'] or 'MISSING'}")
    print(f"  ROBOTS META: {r['robots_meta'] or 'not set (default index,follow)'}")
    print(f"  VIEWPORT: {r['viewport'] or 'MISSING'}")
    print(f"  H1 count: {r['h1_count']} | text: {r['h1_text'] or 'NONE'}")
    print(f"  H2 count: {r['h2_count']}")
    print(f"  OG title: {(r['og_title'] or 'MISSING')[:70]} | OG image: {'SET' if r['og_image'] else 'MISSING'}")
    print(f"  Twitter card: {r['twitter_card'] or 'MISSING'}")
    print(f"  JSON-LD: {r['jsonld_count']} blocks, types={r['jsonld_types']}, LocalBiz={r['jsonld_has_localbusiness']}")
    print(f"  Images: {r['img_total']} total | {r['img_no_alt']} no-alt | {r['img_empty_alt']} empty-alt | {r['img_no_dims']} no-dims")
    print(f"  fetchpriority=high: {r['img_fetchpriority_high']} | lazy: {r['img_lazy']}")
    print(f"  Preloads: {r['preload_count']} {r['preload_items']}")
    print(f"  Inline <style>: {r['inline_style_blocks']} | Ext CSS: {r['ext_css']}")
    print(f"  Ext scripts ({len(r['ext_scripts'])}): {[s[:60] for s in r['ext_scripts'][:5]]}")
    print(f"  IndexNow in HTML: {r['indexnow_in_html']}")
    print(f"  has_noscript: {r['has_noscript']} | has_noindex: {r['has_noindex']}")
    print(f"  iframe_no_dims: {r['iframe_no_dims']}")
