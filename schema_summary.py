import urllib.request
import re
import json

PAGES = [
    ("Homepage", "https://hamilton-exteriors.com"),
    ("Roofing", "https://hamilton-exteriors.com/roofing"),
    ("Blog Post", "https://hamilton-exteriors.com/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026"),
    ("Service Area (Oakland Roofing)", "https://hamilton-exteriors.com/oakland/roofing"),
    ("About/Person", "https://hamilton-exteriors.com/about/alex-hamilton-li"),
    ("Blog Index", "https://hamilton-exteriors.com/blog"),
]

PATTERN = re.compile(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.DOTALL | re.IGNORECASE,
)

def get_types(obj):
    """Get @type values from an object."""
    t = obj.get("@type", "unknown")
    if isinstance(t, list):
        return t
    return [t]

def summarize_block(obj):
    """Return a compact summary of a schema block."""
    types = get_types(obj)
    id_ = obj.get("@id", "")
    name = obj.get("name", "")
    context = obj.get("@context", "")

    keys = [k for k in obj.keys() if not k.startswith("@")]

    summary = {
        "@type": types,
        "@id": id_,
        "name": name,
        "@context": context,
        "properties_present": keys,
    }

    # Flag issues
    issues = []
    if context != "https://schema.org":
        issues.append(f"WARN: @context is '{context}' (expected https://schema.org)")
    if not id_:
        issues.append("WARN: missing @id")
    if not name:
        issues.append("WARN: missing name")

    # Check for AggregateRating
    if obj.get("aggregateRating"):
        ar = obj["aggregateRating"]
        summary["aggregateRating"] = {
            "ratingValue": ar.get("ratingValue"),
            "reviewCount": ar.get("reviewCount"),
            "bestRating": ar.get("bestRating"),
            "worstRating": ar.get("worstRating"),
        }

    # Check for datePublished / dateModified (Article)
    for dp in ["datePublished", "dateModified", "author", "headline"]:
        if dp in obj:
            summary[dp] = str(obj[dp])[:100]

    summary["issues"] = issues
    return summary

for label, url in PAGES:
    print(f"\n{'='*60}")
    print(f"PAGE: {label}")
    print(f"URL:  {url}")
    print(f"{'='*60}")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 SchemaAuditBot/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            html = resp.read().decode("utf-8", errors="replace")
        blocks = PATTERN.findall(html)
        print(f"JSON-LD blocks found: {len(blocks)}")
        for i, b in enumerate(blocks):
            print(f"\n  Block {i+1}:")
            try:
                obj = json.loads(b.strip())
                s = summarize_block(obj)
                print(f"    @type: {s['@type']}")
                print(f"    @id:   {s['@id'] or '(none)'}")
                print(f"    name:  {s['name'] or '(none)'}")
                print(f"    @context: {s['@context']}")
                print(f"    properties: {s['properties_present']}")
                if "aggregateRating" in s:
                    print(f"    aggregateRating: {s['aggregateRating']}")
                if "datePublished" in s:
                    print(f"    datePublished: {s['datePublished']}")
                if "dateModified" in s:
                    print(f"    dateModified: {s['dateModified']}")
                if "author" in s:
                    print(f"    author: {s['author']}")
                if "headline" in s:
                    print(f"    headline: {s['headline']}")
                for issue in s["issues"]:
                    print(f"    *** {issue}")
            except Exception as e:
                print(f"    PARSE ERROR: {e}")
    except Exception as e:
        print(f"  FETCH ERROR: {e}")

print("\n\nDONE")
