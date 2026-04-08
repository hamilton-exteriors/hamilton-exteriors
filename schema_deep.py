import urllib.request
import re
import json

PATTERN = re.compile(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.DOTALL | re.IGNORECASE,
)

def fetch_blocks(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 SchemaAuditBot/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        html = resp.read().decode("utf-8", errors="replace")
    blocks = PATTERN.findall(html)
    parsed = []
    for b in blocks:
        try:
            parsed.append(json.loads(b.strip()))
        except Exception as e:
            parsed.append({"_error": str(e)})
    return parsed

# Deep inspect About/Person page
print("=== ABOUT PAGE: ProfilePage mainEntity ===")
try:
    blocks = fetch_blocks("https://hamilton-exteriors.com/about/alex-hamilton-li")
    for b in blocks:
        types = b.get("@type", [])
        if isinstance(types, str):
            types = [types]
        if "ProfilePage" in types:
            me = b.get("mainEntity", {})
            print(json.dumps(me, indent=2))
except Exception as e:
    print(f"Error: {e}")

# Deep inspect BlogPosting
print("\n=== BLOG POST: Full BlogPosting block ===")
try:
    blocks = fetch_blocks("https://hamilton-exteriors.com/blog/how-much-does-a-roof-replacement-cost-in-the-bay-area-in-2026")
    for b in blocks:
        types = b.get("@type", [])
        if isinstance(types, str):
            types = [types]
        if "BlogPosting" in types:
            # Print key fields
            for k in ["@type","@id","headline","datePublished","dateModified","author","publisher","image","mainEntityOfPage","keywords","articleSection","wordCount"]:
                if k in b:
                    print(f"  {k}: {json.dumps(b[k])}")
        if types == ["RoofingContractor", "GeneralContractor"] or types == ["GeneralContractor", "RoofingContractor"]:
            print(f"\n  LocalBusiness block properties: {list(b.keys())}")
except Exception as e:
    print(f"Error: {e}")

# Try to find the correct service area URL pattern
print("\n=== SERVICE AREA URL DISCOVERY ===")
test_urls = [
    "https://hamilton-exteriors.com/service-areas/oakland",
    "https://hamilton-exteriors.com/service-areas/oakland-roofing",
    "https://hamilton-exteriors.com/locations/oakland",
    "https://hamilton-exteriors.com/oakland",
    "https://hamilton-exteriors.com/roofing/oakland",
]
for u in test_urls:
    try:
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            code = resp.status
            blocks = PATTERN.findall(resp.read().decode("utf-8", errors="replace"))
            print(f"  {code} OK  {u}  ({len(blocks)} schema blocks)")
    except Exception as e:
        code = str(e)[:60]
        print(f"  ERR  {u}  {code}")

# Check roofing HowTo block detail
print("\n=== ROOFING: HowTo block check (deprecated type) ===")
try:
    blocks = fetch_blocks("https://hamilton-exteriors.com/roofing")
    for b in blocks:
        types = b.get("@type", [])
        if isinstance(types, str):
            types = [types]
        if "HowTo" in types:
            print(f"  HowTo name: {b.get('name')}")
            print(f"  HowTo properties: {list(b.keys())}")
            print("  *** CRITICAL: HowTo rich results were removed by Google in September 2023")
        if "Service" in types and b.get("@id","").endswith("#service"):
            # Check for duplicate @id
            print(f"\n  Service block @id: {b.get('@id')}")
            print(f"  Service name: {b.get('name')}")
except Exception as e:
    print(f"Error: {e}")

# Blog index - check ItemList content
print("\n=== BLOG INDEX: ItemList entries ===")
try:
    blocks = fetch_blocks("https://hamilton-exteriors.com/blog")
    for b in blocks:
        types = b.get("@type", [])
        if isinstance(types, str):
            types = [types]
        if "ItemList" in types:
            items = b.get("itemListElement", [])
            print(f"  ItemList has {len(items)} entries")
            for item in items[:3]:
                print(f"    - position {item.get('position')}: {item.get('name','?')[:60]} => {item.get('url','?')[:60]}")
        if "CollectionPage" in types:
            print(f"\n  CollectionPage has breadcrumb: {'breadcrumb' in b}")
            print(f"  CollectionPage has publisher: {'publisher' in b}")
            print(f"  CollectionPage has hasPart/itemListElement: {'hasPart' in b or 'itemListElement' in b}")
except Exception as e:
    print(f"Error: {e}")

print("\nDONE")
