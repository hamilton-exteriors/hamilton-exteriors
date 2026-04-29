#!/usr/bin/env node
/**
 * run-single-page.mjs — local end-to-end run of the per-page agent loop.
 *
 * Runs steps 1-9 of seo/agent-system-prompt.md against ONE target file in
 * the local process (no Managed Agents). Stops BEFORE publish — saves the
 * draft to disk for human review.
 *
 * Usage:
 *   node scripts/run-single-page.mjs --target <pageSlug>
 *   node scripts/run-single-page.mjs --target sa-city-service__oakland-ca__roofing
 *
 * Side effects:
 *   seo/serps/{slug}.json
 *   seo/competitors/{slug}/<host>.json
 *   seo/teardowns/{slug}.md
 *   seo/teardowns/{slug}.brief.json
 *   seo/drafts/{slug}.md
 *   seo/drafts/{slug}.qa.json
 *   seo/targets/{slug}.json   (status, iterations updated)
 *
 * Env required:
 *   ANTHROPIC_API_KEY, DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD,
 *   FIRECRAWL_API_KEY (optional — falls back to direct fetch)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';
import { createSign } from 'crypto';

// Pick generation model by page type.
// Default = DeepSeek-V4-Flash (284B/13B MoE, 1M ctx, reasoning + tools, $0.14/$0.28).
// Premium = DeepSeek-V4-Pro for cornerstone + cost-blog (1.6T/49B, frontier).
const GEN_MODEL = {
  'cornerstone-service':       'deepseek-ai/DeepSeek-V4-Pro',
  'cornerstone-subservice':    'deepseek-ai/DeepSeek-V4-Pro',
  'cost-blog':                 'deepseek-ai/DeepSeek-V4-Pro',
  'service-area-county':       'deepseek-ai/DeepSeek-V4-Pro',
  'service-area-city':         'deepseek-ai/DeepSeek-V4-Flash',
  'service-area-city-service': 'deepseek-ai/DeepSeek-V4-Flash',
  'informational-blog':        'deepseek-ai/DeepSeek-V4-Flash',
};
// DeepInfra pricing per 1M tokens (input / output) for cost reporting
const PRICING = {
  'deepseek-ai/DeepSeek-V4-Flash': { in: 0.14, out: 0.28 },
  'deepseek-ai/DeepSeek-V4-Pro':   { in: 1.74, out: 3.48 },
  'stepfun-ai/Step-3.5-Flash':     { in: 0.10, out: 0.30 },
  'Qwen/Qwen3.5-397B-A17B':        { in: 0.54, out: 3.40 },
  'Qwen/Qwen3.6-35B-A3B':          { in: 0.20, out: 1.00 },
  'Qwen/Qwen3-Max-Thinking':       { in: 1.20, out: 6.00 },
  'moonshotai/Kimi-K2.6':          { in: 0.75, out: 3.50 },
  'google/gemma-4-26B-A4B-it':     { in: 0.07, out: 0.34 },
  'zai-org/GLM-5.1':               { in: 1.05, out: 3.50 },
  'google/gemini-2.5-pro':         { in: 1.25, out: 10.00 },
};

const REPO_ROOT = resolve(import.meta.dirname, '..');
const SEO = join(REPO_ROOT, 'seo');

const args = parseArgs(process.argv.slice(2));
if (!args.target) { console.error('Usage: --target <pageSlug>'); process.exit(2); }
const slug = args.target;
const targetPath = join(SEO, 'targets', `${slug}.json`);
if (!existsSync(targetPath)) { console.error(`Target not found: ${targetPath}`); process.exit(2); }

const target = JSON.parse(readFileSync(targetPath, 'utf8'));
console.log(`\n[1/9] Resolved target: ${slug}`);
console.log(`      pageUrl:  ${target.pageUrl}`);
console.log(`      pageType: ${target.pageType}`);
target.status = 'in_progress';
target.iterations = (target.iterations || 0) + 1;
writeFileSync(targetPath, JSON.stringify(target, null, 2));

// ─── Step 2: keywords ─────────────────────────────────────────────────────
const keywords = (target.primaryKeywords || []).slice(0, 3).map(k => k.kw);
if (!keywords.length) { console.error('No primary keywords. Run seed-targets.mjs first.'); process.exit(2); }
console.log(`\n[2/9] Primary keywords (${keywords.length}):`);
keywords.forEach(k => console.log(`      - ${k}`));

// GSC enrichment (best effort — skip if page doesn't exist yet)
const SA_PATH = 'C:/Users/admin/.config/claude-seo/service-account.json';
const PROPERTY = 'sc-domain:hamilton-exteriors.com';
let gscRows = [];
if (existsSync(SA_PATH)) {
  try {
    const token = await getGscToken();
    const startDate = isoDaysAgo(90);
    const endDate = isoDaysAgo(2);
    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPERTY)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate, endDate,
          dimensions: ['query'],
          rowLimit: 50,
          dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'equals', expression: target.pageUrl }] }],
        }),
      }
    );
    const data = await res.json();
    gscRows = (data.rows || []).filter(r => r.impressions >= 3);
    console.log(`      GSC: ${gscRows.length} queries with ≥3 impressions`);
  } catch (e) { console.log(`      GSC: skipped (${e.message})`); }
}
target.currentRankings = Object.fromEntries(gscRows.slice(0, 10).map(r => [r.keys[0], r]));

// ─── Step 3: live SERPs ───────────────────────────────────────────────────
console.log(`\n[3/9] Pulling live SERPs from DataForSEO...`);
const serps = {};
const ALL_COMPETITORS = new Map(); // host -> { url, ranks: [], titles: [] }
for (const kw of keywords) {
  const r = await dfsPostJson('/v3/serp/google/organic/live/regular', [{
    keyword: kw, location_code: 1014044, language_code: 'en', device: 'desktop', depth: 10,
  }]);
  const items = r.tasks?.[0]?.result?.[0]?.items || [];
  const features = [...new Set(items.filter(i => i.type !== 'organic').map(i => i.type))];
  const organic = items.filter(i => i.type === 'organic')
    .map(i => ({ rank: i.rank_absolute, url: i.url, title: i.title, description: i.description }));
  serps[kw] = { features, organic, fetchedAt: new Date().toISOString() };
  console.log(`      "${kw}": ${organic.length} organic, features: ${features.join(', ') || 'none'}`);

  // Aggregate competitors across all keywords
  for (const item of organic) {
    const host = new URL(item.url).hostname.replace(/^www\./, '');
    if (!ALL_COMPETITORS.has(host)) ALL_COMPETITORS.set(host, { url: item.url, ranks: [], host });
    ALL_COMPETITORS.get(host).ranks.push({ kw, rank: item.rank });
  }
}
mkdirSync(join(SEO, 'serps'), { recursive: true });
writeFileSync(join(SEO, 'serps', `${slug}.json`), JSON.stringify(serps, null, 2));

// ─── Step 4: crawl competitors ────────────────────────────────────────────
const DIRECTORIES = new Set(['yelp.com', 'angi.com', 'homeadvisor.com', 'thumbtack.com', 'houzz.com', 'bbb.org', 'nextdoor.com', 'porch.com', 'networx.com', 'reddit.com', 'diamondcertified.org', 'facebook.com', 'youtube.com', 'tiktok.com']);
const competitors = [...ALL_COMPETITORS.values()]
  .filter(c => !DIRECTORIES.has(c.host))
  .filter(c => !c.host.includes('hamilton-exteriors')) // exclude self
  .sort((a, b) => Math.min(...a.ranks.map(r => r.rank)) - Math.min(...b.ranks.map(r => r.rank)))
  .slice(0, 5);

console.log(`\n[4/9] Crawling ${competitors.length} competitors via Firecrawl...`);
mkdirSync(join(SEO, 'competitors', slug), { recursive: true });
const competitorData = [];
for (const c of competitors) {
  try {
    const data = await firecrawl(c.url);
    const md = data.markdown || '';
    const html = data.html || '';
    const wordCount = md.split(/\s+/).filter(Boolean).length;
    const headings = {
      h1: (md.match(/^# .+$/gm) || []).map(s => s.slice(2).trim()),
      h2: (md.match(/^## .+$/gm) || []).map(s => s.slice(3).trim()),
      h3: (md.match(/^### .+$/gm) || []).map(s => s.slice(4).trim()),
    };
    const jsonLdBlocks = [...(html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [])]
      .map(m => { try { return JSON.parse(m[1]); } catch { return null; } })
      .filter(Boolean);
    const schemaTypes = jsonLdBlocks.flatMap(b => Array.isArray(b) ? b.map(x => x['@type']) : [b['@type']]).filter(Boolean);
    const internalLinks = (md.match(new RegExp(`\\]\\(https?:\\/\\/${c.host.replace('.', '\\.')}`, 'g')) || []).length;
    const externalLinks = (md.match(/\]\(https?:\/\//g) || []).length - internalLinks;
    const eatBio = /\b(licensed|certified|years of experience|owner|founder|architect|engineer|cslb)\b/i.test(md);
    const phone = /\b\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}\b/.test(md);
    const faqCount = (md.match(/\?\s*\n+/g) || []).length;

    const summary = {
      host: c.host, url: c.url, ranks: c.ranks,
      wordCount, headings, schema: schemaTypes, internalLinks, externalLinks,
      eatBioPresent: eatBio, phonePresent: phone, faqCount,
      titleTag: html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || null,
      metaDescription: html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1] || null,
    };
    competitorData.push(summary);
    writeFileSync(join(SEO, 'competitors', slug, `${c.host}.json`), JSON.stringify({
      ...summary,
      markdownPreview: md.slice(0, 4000),
    }, null, 2));
    console.log(`      ${c.host}: ${wordCount}w, ${headings.h2.length} H2, schema: [${schemaTypes.slice(0,3).join(',') || '-'}]`);
  } catch (e) {
    console.log(`      ${c.host}: FAILED (${e.message.slice(0, 80)})`);
  }
}
if (competitorData.length === 0) { console.error('No competitors crawled successfully.'); process.exit(1); }

// ─── Step 5: teardown ─────────────────────────────────────────────────────
// Cap word-count target per page type so a single content-stuffed competitor
// doesn't blow up generation cost / time. Use 75th percentile instead of max.
const PAGE_TYPE_WORD_CEILING = {
  'cornerstone-service':       2800,
  'cornerstone-subservice':    2200,
  'cost-blog':                 3500,
  'service-area-county':       2000,
  'service-area-city':         1800,
  'service-area-city-service': 2200,
  'informational-blog':        2500,
};
console.log(`\n[5/9] Building teardown...`);
function p75(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length * 0.75)] ?? sorted[sorted.length - 1];
}
const maxWords = p75(competitorData.map(c => c.wordCount));
const maxH2 = Math.max(...competitorData.map(c => c.headings.h2.length));
const maxSchema = Math.max(...competitorData.map(c => new Set(c.schema).size));
const maxFaq = Math.max(...competitorData.map(c => c.faqCount));
const maxIntLinks = Math.max(...competitorData.map(c => c.internalLinks));
const eatPresent = competitorData.filter(c => c.eatBioPresent).length;
const ceiling = PAGE_TYPE_WORD_CEILING[target.pageType] || 2500;

const teardownMd = [
  `# Teardown: ${target.pageUrl}`, ``,
  `**Page type:** ${target.pageType}`,
  `**Primary keywords:** ${keywords.join(', ')}`,
  `**SERP features:** ${[...new Set(Object.values(serps).flatMap(s => s.features))].join(', ') || 'none'}`,
  ``,
  `## Competitor signals`,
  ``,
  `| Host | Words | H2 | Schema | FAQ | IntLinks | EEAT bio | Phone |`,
  `|---|---|---|---|---|---|---|---|`,
  ...competitorData.map(c => `| ${c.host} | ${c.wordCount} | ${c.headings.h2.length} | [${[...new Set(c.schema)].slice(0,3).join(',') || '-'}] | ${c.faqCount} | ${c.internalLinks} | ${c.eatBioPresent ? 'yes' : 'no'} | ${c.phonePresent ? 'yes' : 'no'} |`),
  ``,
  `## Targets (75th-percentile competitor word count + 15%, capped by page type)`,
  ``,
  `- Word count: **${Math.min(Math.round(maxWords * 1.15), ceiling)}+** (raw: ${Math.round(maxWords * 1.15)}, ceiling for ${target.pageType}: ${ceiling})`,
  `- H2 count: **${Math.min(maxH2 + 2, 14)}+**`,
  `- Schema types: **${maxSchema + 1}+**`,
  `- FAQ items: **${Math.max(maxFaq, 6)}+**`,
  `- Internal links: **${Math.max(maxIntLinks + 3, 5)}+**`,
  `- EEAT bio: **required** (Alex Hamilton Li, CSLB #1078806)`,
].join('\n');
mkdirSync(join(SEO, 'teardowns'), { recursive: true });
writeFileSync(join(SEO, 'teardowns', `${slug}.md`), teardownMd);
const finalWordTarget = Math.min(Math.round(maxWords * 1.15), ceiling);
const finalH2Target = Math.min(maxH2 + 2, 14);
console.log(`      Targets: ${finalWordTarget}w, ${finalH2Target} H2, ${maxSchema + 1} schema types`);

// ─── Step 6: content brief ────────────────────────────────────────────────
const city = target.citySlug;
const spinePath = city ? join(SEO, 'data-spine', `${city}.json`) : null;
const spine = spinePath && existsSync(spinePath) ? JSON.parse(readFileSync(spinePath, 'utf8')) : null;

const brief = {
  pageUrl: target.pageUrl,
  pageType: target.pageType,
  primaryKeywords: keywords,
  wordCountTarget: finalWordTarget,
  h2Target: finalH2Target,
  // Schema requirements vary by page type. Cost blogs are articles, not
  // service pages — Service/LocalBusiness schema would be misleading there.
  schemaBlocks: (() => {
    if (target.pageType === 'cost-blog' || target.pageType === 'informational-blog') {
      return ['BreadcrumbList', 'Article'];
    }
    if (target.pageType === 'cornerstone-service' || target.pageType === 'cornerstone-subservice') {
      return ['BreadcrumbList', 'Service'];
    }
    return ['BreadcrumbList', 'Service', 'LocalBusiness'];
  })(),
  mustCover: [],
  differentiators: [],
  internalLinkTargets: [],
  ctaPlan: 'Hero CTA: Get Your Free Quote → /contact?service=' + (target.service || 'general') + '. Mid-article: phone CTA. End: contact form.',
};
if (spine) {
  if (spine.countyFacts?.fireRisk) brief.mustCover.push(`Fire-risk context for ${spine.cityDisplay}: ${spine.countyFacts.fireRisk}`);
  if (spine.countyFacts?.climate) brief.mustCover.push(`Climate factors: ${spine.countyFacts.climate}`);
  if (spine.countyFacts?.seismic) brief.mustCover.push(`Seismic considerations: ${spine.countyFacts.seismic}`);
  if (spine.sourceUrls?.buildingDept) brief.mustCover.push(`Permit guidance with link to ${spine.cityDisplay} building dept (${spine.sourceUrls.buildingDept})`);
  if (spine.cityDisplay) brief.mustCover.push(`Address ${spine.cityDisplay}-specific considerations explicitly`);
  brief.differentiators.push(`Architect-led design-build (Alex Hamilton Li, CSLB #1078806) — most competitors are tradesmen-only`);
  brief.differentiators.push(`First-person ${spine.cityDisplay} experience and city-specific permit/code detail`);
  if (target.service) brief.differentiators.push(`${target.service}-specific technical depth (materials, codes, manufacturer specs)`);
}
brief.mustCover.push('Last-click test: reader should not need to search again after reading');
brief.mustCover.push('Pricing communicated as a range with what is included/excluded');
brief.mustCover.push('At least one Bay Area-specific data point (permit fee, code citation, climate factor) with a sourceUrl');

writeFileSync(join(SEO, 'teardowns', `${slug}.brief.json`), JSON.stringify(brief, null, 2));
console.log(`\n[6/9] Content brief: ${brief.mustCover.length} must-cover items, ${brief.differentiators.length} differentiators`);

// ─── Step 7: generate ─────────────────────────────────────────────────────
const model = args.model || GEN_MODEL[target.pageType] || 'deepseek-ai/DeepSeek-V3.2';
console.log(`\n[7/9] Generating draft via ${model} (DeepInfra)...`);
const brandVoice = readFileSync(join(SEO, 'brand-voice.md'), 'utf8');
const standards = readFileSync(join(SEO, 'content-writing-standards.md'), 'utf8');

// Pick most-relevant voice samples (avoid loading all 36k words)
const voiceSamples = pickVoiceSamples(target);
const voicePrompt = voiceSamples.map(p => {
  const txt = readFileSync(join(SEO, 'voice-corpus', p), 'utf8');
  return `<voice_sample file="${p}">\n${txt}\n</voice_sample>`;
}).join('\n\n');

const cachedContext = `${brandVoice}\n\n---\n\n${standards}\n\n---\n\n# Hamilton voice corpus\n\n${voicePrompt}`;

const userPrompt = `Generate the draft for this page.

# Target
${JSON.stringify(target, null, 2)}

# Data spine for ${spine?.cityDisplay || 'N/A'}
${spine ? JSON.stringify(spine, null, 2) : 'No city-specific spine.'}

# SERP analysis
${JSON.stringify(serps, null, 2).slice(0, 3000)}

# Teardown
${teardownMd}

# Content brief
${JSON.stringify(brief, null, 2)}

# Output format — STRICT

Output the file in this exact shape, starting with --- on the very first line:

---
title: <50-65 chars, no em dashes, ends with "| Hamilton Exteriors">
meta_title: <identical to title>
meta_description: <140-160 chars, leads with city + service noun>
canonical: ${target.pageUrl}
schema_jsonld:
  - {"@context":"https://schema.org","@type":"BreadcrumbList", ...}
  - {"@context":"https://schema.org","@type":"Service", ...}
  - {"@context":"https://schema.org","@type":"LocalBusiness", ...}
internal_links:
  - {"path":"/...", "anchorText":"..."}
  - {"path":"/...", "anchorText":"..."}
---

# H1 here

Body markdown follows...

CRITICAL: Do NOT wrap the frontmatter in any code fence (no \`\`\`yaml ... \`\`\`). The file MUST start with literal --- as line 1, and the frontmatter MUST end with literal --- on its own line before the body.

Hard constraints (any failure = automatic regenerate):

1. Frontmatter is raw YAML, no code fence. Line 1 is ---, frontmatter ends with --- on its own line.
2. No em dashes in title or H1. Use periods, commas, or pipes. Em dashes are allowed in body prose.
3. No ALL CAPS for emphasis. Allowed acronyms: CSLB, ADU, GAF, WUI, FHSZ, NOAA, EPA, OSHA, IBC, IRC, CRC, HVAC, TPO, PVC, HDZ. "CAL FIRE" is allowed (agency name).
4. No defensive "no X" phrasing. Forbidden: "no surprises", "no obligation", "no-obligation", "no hidden fees", "no hidden costs", "no gimmicks", "no pressure". Strike all of them.
5. "free" appears at MOST 4 times in the entire document. The standardized CTA is "Get Your Free Quote" — use it twice (hero + closing). Do NOT write "free inspection", "free, no-obligation", "free roof inspection". Replace with "on-site inspection" or "complimentary inspection" if needed.
6. "Get Your Free Quote" CTA must appear at least twice — once near the top, once near the bottom.
7. Word count target: ${brief.wordCountTarget}+ words in the body.
8. H2 count target: ${brief.h2Target}+ H2 headings.
9. No unverifiable superlatives: "best", "top", "#1", "leading", "top-rated", "number one".
10. Source attribution: every dollar amount, percentage, year-stat, or named permit fee must have a markdown source link [label](url) within the same paragraph. Example: $300 to $650 ([Oakland Building & Safety](https://www.oaklandca.gov/...)). Pricing tables cite the source in the introductory paragraph immediately above the table.
11. Inline internal links: the body must contain at least 5 markdown internal links of the form [anchor](/path) — render the most relevant entries from internal_links inline as contextual anchors. Do NOT just list them in the frontmatter.
12. E-E-A-T anchor: body must reference Alex Hamilton Li by name with a markdown link to /about/alex-hamilton-li, and CSLB #1078806 with a markdown link to https://www.cslb.ca.gov.
13. All mustCover items addressed in the body content.
14. Output the full markdown only. No prose before or after. No code fence wrapping the entire output.`;

const t0 = Date.now();
// Budget: frontmatter (~3000 tokens schema+links) + body (~1.4 × target × 1.3 buffer).
const maxOutTokens = Math.min(Math.max(7000, Math.round(finalWordTarget * 3) + 3000), 16000);
// Streaming to avoid headers timeout on long generations
const genRes = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.DEEPINFRA_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model,
    messages: [
      { role: 'system', content: cachedContext },
      { role: 'user',   content: userPrompt },
    ],
    max_tokens: maxOutTokens,
    temperature: 0.4,
    stream: true,
  }),
});
if (!genRes.ok) {
  const err = await genRes.text();
  console.error(`Generation failed: ${genRes.status} ${err.slice(0, 400)}`);
  process.exit(1);
}
let draft = '';
let usage = {};
const reader = genRes.body.getReader();
const decoder = new TextDecoder();
let buffer = '';
process.stdout.write('      streaming: ');
while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split('\n');
  buffer = lines.pop() || '';
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    const data = line.slice(6).trim();
    if (data === '[DONE]') continue;
    try {
      const chunk = JSON.parse(data);
      const delta = chunk.choices?.[0]?.delta?.content || '';
      if (delta) { draft += delta; if (draft.length % 1000 < delta.length) process.stdout.write('.'); }
      if (chunk.usage) usage = chunk.usage;
    } catch { /* skip malformed line */ }
  }
}
process.stdout.write('\n');
if (!draft) { console.error('Empty draft from model.'); process.exit(1); }
const elapsedMs = Date.now() - t0;
mkdirSync(join(SEO, 'drafts'), { recursive: true });
writeFileSync(join(SEO, 'drafts', `${slug}.md`), draft);
const p = PRICING[model] || { in: 0.5, out: 1.5 };
const cost = ((usage.prompt_tokens || 0) * p.in + (usage.completion_tokens || 0) * p.out) / 1_000_000;
console.log(`      ${usage.prompt_tokens || '?'} in / ${usage.completion_tokens || '?'} out, ${elapsedMs}ms`);
console.log(`      Cost: ~$${cost.toFixed(4)} via ${model}`);
console.log(`      Draft: seo/drafts/${slug}.md (${draft.split(/\s+/).filter(Boolean).length} words)`);

// ─── Step 8: QA gates ─────────────────────────────────────────────────────
console.log(`\n[8/9] Running QA gates G1-G6...`);
try {
  execSync(`node scripts/qa-page.mjs --target ${slug}`, { cwd: REPO_ROOT, stdio: 'inherit' });
} catch (e) {
  console.log(`      QA: FAILED (see seo/drafts/${slug}.qa.json)`);
}

// ─── Step 8b: G7 cross-model gate (skipped in local validator — Claude inline review) ───
console.log(`\n[8b/9] G7 cross-model gate: SKIPPED (Claude session acts as inline reviewer)`);

// ─── Step 9: stop short of publish ────────────────────────────────────────
console.log(`\n[9/9] STOPPING SHORT OF PUBLISH (local validator).`);
console.log(`      Review the draft: seo/drafts/${slug}.md`);
console.log(`      Review QA: seo/drafts/${slug}.qa.json`);
console.log(`      Targeted: ${target.pageUrl}`);
target.status = 'draft_ready';
writeFileSync(targetPath, JSON.stringify(target, null, 2));

// ─── Helpers ──────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      out[k] = v;
    }
  }
  return out;
}

function isoDaysAgo(n) {
  return new Date(Date.now() - n * 86400_000).toISOString().slice(0, 10);
}

async function getGscToken() {
  const sa = JSON.parse(readFileSync(SA_PATH, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const b64u = b => Buffer.from(b).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const header = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = b64u(JSON.stringify({
    iss: sa.client_email, scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: sa.token_uri, iat: now, exp: now + 3600,
  }));
  const unsigned = `${header}.${payload}`;
  const sig = createSign('RSA-SHA256'); sig.update(unsigned);
  const signature = b64u(sig.sign(sa.private_key));
  const jwt = `${unsigned}.${signature}`;
  const res = await fetch(sa.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  return (await res.json()).access_token;
}

async function dfsPostJson(path, body) {
  const auth = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');
  const res = await fetch(`https://api.dataforseo.com${path}`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`DataForSEO ${path} → ${res.status}`);
  return res.json();
}

async function firecrawl(url) {
  if (!process.env.FIRECRAWL_API_KEY) {
    // Plain fetch fallback
    const r = await fetch(url, { headers: { 'User-Agent': 'HamiltonSEOBot/1.0' } });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const html = await r.text();
    return { html, markdown: stripTagsToMd(html) };
  }
  const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, formats: ['markdown', 'html'], onlyMainContent: true, timeout: 30000 }),
  });
  if (!res.ok) throw new Error(`Firecrawl ${res.status}`);
  const data = await res.json();
  return { html: data.data?.html || '', markdown: data.data?.markdown || '' };
}

function stripTagsToMd(html) {
  let s = html.replace(/<head[\s\S]*?<\/head>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  s = s.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n# ${t.replace(/<[^>]+>/g, '')}\n`);
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n## ${t.replace(/<[^>]+>/g, '')}\n`);
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n### ${t.replace(/<[^>]+>/g, '')}\n`);
  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `\n${t.replace(/<[^>]+>/g, '')}\n`);
  s = s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return s;
}

function pickVoiceSamples(target) {
  const all = readdirSync(join(SEO, 'voice-corpus')).filter(f => f.endsWith('.md'));
  const wanted = ['about__alex-hamilton-li.md']; // always include author bio
  if (target.service) {
    const cornerstone = all.find(f => f === `${target.service}.md`);
    if (cornerstone) wanted.push(cornerstone);
    const blog = all.find(f => f.includes(target.service) && f.includes('cost-bay-area'));
    if (blog) wanted.push(blog);
  }
  // Always include the proven cost-blog format as a structure anchor
  if (!wanted.find(w => w.includes('cost-bay-area'))) {
    wanted.push('blog__roof-replacement-cost-bay-area.md');
  }
  return wanted.filter(w => all.includes(w));
}
