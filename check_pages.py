import urllib.request, re, json

PATTERN = re.compile(r'<script[^>]+type\s*=\s*["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.DOTALL | re.IGNORECASE)

test_urls = [
    "https://hamilton-exteriors.com/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026",
    "https://hamilton-exteriors.com/blog/james-hardie-siding-bay-area",
    "https://hamilton-exteriors.com/blog/metal-roof-vs-asphalt-shingles-bay-area",
    "https://hamilton-exteriors.com/about",
    "https://hamilton-exteriors.com/about-us",
]
for url in test_urls:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            status = r.status
            final_url = r.url
            html = r.read().decode("utf-8", errors="replace")
            blocks = PATTERN.findall(html)
            types_found = []
            for b in blocks:
                try:
                    parsed = json.loads(b.strip())
                    t = parsed.get("@type", "unknown")
                    types_found.append(str(t))
                except Exception:
                    types_found.append("PARSE_ERROR")
            print(f"{url}")
            print(f"  status={status}, final={final_url}")
            print(f"  blocks={len(blocks)}, types={types_found}")
            # Print any BlogPosting/Article blocks in full
            for b in blocks:
                try:
                    parsed = json.loads(b.strip())
                    t = parsed.get("@type", "")
                    if isinstance(t, str) and t in ("BlogPosting", "Article", "NewsArticle"):
                        print("  ARTICLE BLOCK:")
                        print(json.dumps(parsed, indent=4))
                    elif isinstance(t, list) and any(x in t for x in ("BlogPosting", "Article", "NewsArticle")):
                        print("  ARTICLE BLOCK (multi-type):")
                        print(json.dumps(parsed, indent=4))
                except Exception:
                    pass
    except Exception as e:
        print(f"{url}: FAILED - {e}")
