#!/bin/bash
# Batch Lighthouse audit - runs PARALLEL_JOBS at a time
# Outputs CSV to lighthouse-results/all-scores.csv

BASE="https://hamilton-exteriors-production.up.railway.app"
OUTDIR="./lighthouse-results"
CSV="$OUTDIR/all-scores.csv"
PARALLEL_JOBS=4
mkdir -p "$OUTDIR"

echo "url,performance,accessibility,best-practices,seo" > "$CSV"

# Get all URLs from sitemap
URLS=$(curl -s "${BASE}/sitemap-0.xml" | grep -o '<loc>[^<]*</loc>' | sed 's/<loc>//g;s/<\/loc>//g' | sed "s|https://hamilton-exteriors.com|${BASE}|g")

TOTAL=$(echo "$URLS" | wc -l | tr -d ' ')
echo "Total pages: $TOTAL — running $PARALLEL_JOBS in parallel"

# Function to audit a single URL
audit_url() {
  local URL="$1"
  local SLUG=$(echo "$URL" | sed "s|${BASE}||" | sed 's|/|_|g' | sed 's|^_||')
  [ -z "$SLUG" ] && SLUG="home"
  local JSON="$OUTDIR/${SLUG}.json"

  # Check cache
  if [ -f "$JSON" ]; then
    local SCORES=$(node -e "
      try {
        const d=JSON.parse(require('fs').readFileSync('$JSON','utf8'));
        const c=d.categories;
        console.log(Math.round(c.performance.score*100)+','+Math.round(c.accessibility.score*100)+','+Math.round(c['best-practices'].score*100)+','+Math.round(c.seo.score*100));
      } catch(e) { console.log('REDO'); }
    " 2>/dev/null)
    if [ "$SCORES" != "REDO" ] && [ -n "$SCORES" ]; then
      echo "$URL,$SCORES" >> "$CSV"
      echo "[cached] $SLUG -> $SCORES"
      return
    fi
  fi

  # Run Lighthouse
  npx lighthouse "$URL" \
    --output=json \
    --output-path="$JSON" \
    --chrome-flags="--headless --no-sandbox" \
    --only-categories=performance,accessibility,best-practices,seo \
    2>/dev/null

  local SCORES=$(node -e "
    try {
      const d=JSON.parse(require('fs').readFileSync('$JSON','utf8'));
      const c=d.categories;
      console.log(Math.round(c.performance.score*100)+','+Math.round(c.accessibility.score*100)+','+Math.round(c['best-practices'].score*100)+','+Math.round(c.seo.score*100));
    } catch(e) { console.log('ERR,ERR,ERR,ERR'); }
  " 2>/dev/null)

  echo "$URL,$SCORES" >> "$CSV"
  echo "[done] $SLUG -> $SCORES"
}

export -f audit_url
export BASE OUTDIR CSV

# Run in parallel using xargs
echo "$URLS" | xargs -P $PARALLEL_JOBS -I {} bash -c 'audit_url "$@"' _ {}

echo ""
echo "=== ALL DONE ==="

# Print summary
node -e "
const fs = require('fs');
const lines = fs.readFileSync('$CSV','utf8').trim().split('\n').slice(1);
const scores = {perf:[], a11y:[], bp:[], seo:[]};
let errors = 0;
for (const line of lines) {
  const parts = line.split(',');
  const [p, a, b, s] = parts.slice(-4);
  if (p === 'ERR') { errors++; continue; }
  scores.perf.push(+p); scores.a11y.push(+a); scores.bp.push(+b); scores.seo.push(+s);
}
const avg = arr => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;
const min = arr => arr.length ? Math.min(...arr) : 0;
console.log('Pages audited: ' + scores.perf.length + ' (errors: ' + errors + ')');
console.log('');
console.log('Category        Avg   Min');
console.log('Performance     ' + avg(scores.perf) + '    ' + min(scores.perf));
console.log('Accessibility   ' + avg(scores.a11y) + '    ' + min(scores.a11y));
console.log('Best Practices  ' + avg(scores.bp) + '    ' + min(scores.bp));
console.log('SEO             ' + avg(scores.seo) + '    ' + min(scores.seo));
console.log('');
const all = lines.filter(l => !l.includes('ERR')).map(l => {
  const parts = l.split(',');
  const url = parts.slice(0,-4).join(',');
  const [p,a,b,s] = parts.slice(-4).map(Number);
  return {url: url.replace('${BASE}','') || '/', perf:p, a11y:a, bp:b, seo:s, total:p+a+b+s};
}).sort((a,b) => a.total - b.total);
console.log('=== 10 WORST PAGES (by combined score) ===');
for (const p of all.slice(0,10)) {
  console.log(p.url.padEnd(60) + ' P:' + p.perf + ' A:' + p.a11y + ' BP:' + p.bp + ' SEO:' + p.seo);
}
console.log('');
console.log('=== PAGES WITH PERF < 80 ===');
for (const p of all.filter(x => x.perf < 80)) console.log(p.url + ' -> ' + p.perf);
console.log('');
console.log('=== PAGES WITH A11Y < 90 ===');
for (const p of all.filter(x => x.a11y < 90)) console.log(p.url + ' -> ' + p.a11y);
console.log('');
console.log('=== PAGES WITH SEO < 90 ===');
for (const p of all.filter(x => x.seo < 90)) console.log(p.url + ' -> ' + p.seo);
"
