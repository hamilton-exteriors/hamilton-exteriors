/**
 * run-page.mjs — callable per-page pipeline (refactored from
 * scripts/run-single-page.mjs). Same logic, exposed as runPage(slug, opts)
 * so the worker can invoke it without spawning a child process.
 *
 * Returns a structured result. Throws only on unrecoverable errors;
 * step failures within the loop are reported in the result.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';
import { createSign } from 'crypto';

const PAGE_TYPE_WORD_CEILING = {
  'cornerstone-service':       2800,
  'cornerstone-subservice':    2200,
  'cost-blog':                 3500,
  'service-area-county':       2000,
  'service-area-city':         1800,
  'service-area-city-service': 2200,
  'informational-blog':        2500,
};
const GEN_MODEL = {
  'cornerstone-service':       'deepseek-ai/DeepSeek-V4-Pro',
  'cornerstone-subservice':    'deepseek-ai/DeepSeek-V4-Pro',
  'cost-blog':                 'deepseek-ai/DeepSeek-V4-Pro',
  'service-area-county':       'deepseek-ai/DeepSeek-V4-Pro',
  'service-area-city':         'deepseek-ai/DeepSeek-V4-Flash',
  'service-area-city-service': 'deepseek-ai/DeepSeek-V4-Flash',
  'informational-blog':        'deepseek-ai/DeepSeek-V4-Flash',
};
const PRICING = {
  'deepseek-ai/DeepSeek-V4-Flash': { in: 0.14, out: 0.28 },
  'deepseek-ai/DeepSeek-V4-Pro':   { in: 1.74, out: 3.48 },
  'stepfun-ai/Step-3.5-Flash':     { in: 0.10, out: 0.30 },
  'Qwen/Qwen3.5-397B-A17B':        { in: 0.54, out: 3.40 },
};
const DIRECTORIES = new Set(['yelp.com', 'angi.com', 'homeadvisor.com', 'thumbtack.com',
  'houzz.com', 'bbb.org', 'nextdoor.com', 'porch.com', 'networx.com', 'reddit.com',
  'diamondcertified.org', 'facebook.com', 'youtube.com', 'tiktok.com']);

export async function runPage(slug, opts = {}) {
  const seoRoot = opts.seoRoot || resolve(import.meta.dirname, '..', 'seo');
  const repoRoot = resolve(seoRoot, '..');
  const log = opts.log || ((...a) => console.log(`[${slug}]`, ...a));

  const targetPath = join(seoRoot, 'targets', `${slug}.json`);
  if (!existsSync(targetPath)) throw new Error(`Target not found: ${targetPath}`);
  const target = JSON.parse(readFileSync(targetPath, 'utf8'));

  target.status = 'in_progress';
  target.iterations = (target.iterations || 0) + 1;
  writeFileSync(targetPath, JSON.stringify(target, null, 2));
  log(`Step 1: resolved target ${target.pageType} ${target.pageUrl} (iter ${target.iterations})`);

  const result = {
    slug, pageUrl: target.pageUrl, pageType: target.pageType,
    started: new Date().toISOString(),
    steps: {}, cost: 0, status: 'in_progress',
  };

  // Step 2: keywords
  const keywords = (target.primaryKeywords || []).slice(0, 3).map(k => k.kw);
  if (!keywords.length) throw new Error('No primary keywords; run seed-targets first');
  result.steps.keywords = keywords;
  log(`Step 2: ${keywords.length} keywords`);

  // GSC enrichment
  let gscRows = [];
  try {
    const saPath = process.env.GSC_SERVICE_ACCOUNT_JSON_PATH || 'C:/Users/admin/.config/claude-seo/service-account.json';
    if (existsSync(saPath)) {
      const sa = JSON.parse(readFileSync(saPath, 'utf8'));
      const token = await getGscToken(sa);
      const startDate = isoDaysAgo(90), endDate = isoDaysAgo(2);
      const r = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:hamilton-exteriors.com')}/searchAnalytics/query`,
        { method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ startDate, endDate, dimensions: ['query'], rowLimit: 50,
            dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'equals', expression: target.pageUrl }] }] }),
        });
      gscRows = ((await r.json()).rows || []).filter(x => x.impressions >= 3);
    }
  } catch (e) { log(`GSC skipped: ${e.message}`); }

  // Step 3: SERPs
  log(`Step 3: pulling ${keywords.length} SERPs...`);
  const serps = {};
  const ALL_COMPETITORS = new Map();
  for (const kw of keywords) {
    const r = await dfsPost('/v3/serp/google/organic/live/regular', [{
      keyword: kw, location_code: 1014044, language_code: 'en', device: 'desktop', depth: 10,
    }]);
    const items = r.tasks?.[0]?.result?.[0]?.items || [];
    const features = [...new Set(items.filter(i => i.type !== 'organic').map(i => i.type))];
    const organic = items.filter(i => i.type === 'organic')
      .map(i => ({ rank: i.rank_absolute, url: i.url, title: i.title, description: i.description }));
    serps[kw] = { features, organic, fetchedAt: new Date().toISOString() };
    for (const item of organic) {
      const host = new URL(item.url).hostname.replace(/^www\./, '');
      if (!ALL_COMPETITORS.has(host)) ALL_COMPETITORS.set(host, { url: item.url, ranks: [], host });
      ALL_COMPETITORS.get(host).ranks.push({ kw, rank: item.rank });
    }
  }
  mkdirSync(join(seoRoot, 'serps'), { recursive: true });
  writeFileSync(join(seoRoot, 'serps', `${slug}.json`), JSON.stringify(serps, null, 2));

  // Step 4: competitor crawl
  const competitors = [...ALL_COMPETITORS.values()]
    .filter(c => !DIRECTORIES.has(c.host))
    .filter(c => !c.host.includes('hamilton-exteriors'))
    .sort((a, b) => Math.min(...a.ranks.map(r => r.rank)) - Math.min(...b.ranks.map(r => r.rank)))
    .slice(0, 5);
  log(`Step 4: crawling ${competitors.length} competitors...`);
  mkdirSync(join(seoRoot, 'competitors', slug), { recursive: true });
  const competitorData = [];
  for (const c of competitors) {
    try {
      const data = await firecrawl(c.url);
      const md = data.markdown || ''; const html = data.html || '';
      const wordCount = md.split(/\s+/).filter(Boolean).length;
      const headings = {
        h1: (md.match(/^# .+$/gm) || []).map(s => s.slice(2).trim()),
        h2: (md.match(/^## .+$/gm) || []).map(s => s.slice(3).trim()),
        h3: (md.match(/^### .+$/gm) || []).map(s => s.slice(4).trim()),
      };
      const jsonLdBlocks = [...(html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [])]
        .map(m => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean);
      const schemaTypes = jsonLdBlocks.flatMap(b => Array.isArray(b) ? b.map(x => x['@type']) : [b['@type']]).filter(Boolean);
      const internalLinks = (md.match(new RegExp(`\\]\\(https?:\\/\\/${c.host.replace('.', '\\.')}`, 'g')) || []).length;
      const externalLinks = (md.match(/\]\(https?:\/\//g) || []).length - internalLinks;
      const eatBio = /\b(licensed|certified|years of experience|owner|founder|architect|engineer|cslb)\b/i.test(md);
      const phone = /\b\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}\b/.test(md);
      const faqCount = (md.match(/\?\s*\n+/g) || []).length;
      const summary = { host: c.host, url: c.url, ranks: c.ranks, wordCount, headings,
        schema: schemaTypes, internalLinks, externalLinks, eatBioPresent: eatBio, phonePresent: phone, faqCount,
        titleTag: html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || null,
        metaDescription: html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1] || null,
      };
      competitorData.push(summary);
      writeFileSync(join(seoRoot, 'competitors', slug, `${c.host}.json`),
        JSON.stringify({ ...summary, markdownPreview: md.slice(0, 4000) }, null, 2));
    } catch (e) { log(`crawl ${c.host} fail: ${e.message.slice(0, 80)}`); }
  }
  if (!competitorData.length) throw new Error('No competitors crawled successfully');

  // Step 5: teardown
  function p75(arr) { const s = [...arr].sort((a,b)=>a-b); return s[Math.floor(s.length*0.75)] ?? s[s.length-1]; }
  const maxWords = p75(competitorData.map(c => c.wordCount));
  const maxH2 = Math.max(...competitorData.map(c => c.headings.h2.length));
  const maxSchema = Math.max(...competitorData.map(c => new Set(c.schema).size));
  const maxFaq = Math.max(...competitorData.map(c => c.faqCount));
  const maxIntLinks = Math.max(...competitorData.map(c => c.internalLinks));
  const ceiling = PAGE_TYPE_WORD_CEILING[target.pageType] || 2500;
  const finalWordTarget = Math.min(Math.round(maxWords * 1.15), ceiling);
  const finalH2Target = Math.min(maxH2 + 2, 14);
  const teardownMd = [
    `# Teardown: ${target.pageUrl}`, ``,
    `**Page type:** ${target.pageType}`,
    `**Primary keywords:** ${keywords.join(', ')}`, ``,
    `## Competitor signals`, ``,
    `| Host | Words | H2 | Schema | FAQ | IntLinks | EEAT bio | Phone |`,
    `|---|---|---|---|---|---|---|---|`,
    ...competitorData.map(c => `| ${c.host} | ${c.wordCount} | ${c.headings.h2.length} | [${[...new Set(c.schema)].slice(0,3).join(',') || '-'}] | ${c.faqCount} | ${c.internalLinks} | ${c.eatBioPresent ? 'yes' : 'no'} | ${c.phonePresent ? 'yes' : 'no'} |`),
    ``,
    `## Targets`, ``,
    `- Word count: **${finalWordTarget}+**`,
    `- H2 count: **${finalH2Target}+**`,
    `- Schema types: **${maxSchema + 1}+**`,
    `- FAQ items: **${Math.max(maxFaq, 6)}+**`,
    `- Internal links: **${Math.max(maxIntLinks + 3, 5)}+**`,
    `- EEAT bio: **required** (Alex Hamilton Li, CSLB #1078806)`,
  ].join('\n');
  mkdirSync(join(seoRoot, 'teardowns'), { recursive: true });
  writeFileSync(join(seoRoot, 'teardowns', `${slug}.md`), teardownMd);

  // Step 6: brief
  const city = target.citySlug;
  const spinePath = city ? join(seoRoot, 'data-spine', `${city}.json`) : null;
  const spine = spinePath && existsSync(spinePath) ? JSON.parse(readFileSync(spinePath, 'utf8')) : null;
  const brief = {
    pageUrl: target.pageUrl, pageType: target.pageType, primaryKeywords: keywords,
    wordCountTarget: finalWordTarget, h2Target: finalH2Target,
    schemaBlocks: (() => {
      if (target.pageType === 'cost-blog' || target.pageType === 'informational-blog') return ['BreadcrumbList','Article'];
      if (target.pageType === 'cornerstone-service' || target.pageType === 'cornerstone-subservice') return ['BreadcrumbList','Service'];
      return ['BreadcrumbList','Service','LocalBusiness'];
    })(),
    mustCover: [], differentiators: [], internalLinkTargets: [],
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
  writeFileSync(join(seoRoot, 'teardowns', `${slug}.brief.json`), JSON.stringify(brief, null, 2));

  // Step 7: generate via DeepInfra streaming
  const model = opts.model || GEN_MODEL[target.pageType] || 'deepseek-ai/DeepSeek-V4-Flash';
  log(`Step 7: generating via ${model} (target ${finalWordTarget}w)...`);
  const brandVoice = readFileSync(join(seoRoot, 'brand-voice.md'), 'utf8');
  const standards = readFileSync(join(seoRoot, 'content-writing-standards.md'), 'utf8');
  const voiceSamples = pickVoiceSamples(target, seoRoot);
  const voicePrompt = voiceSamples.map(p => `<voice_sample file="${p}">\n${readFileSync(join(seoRoot, 'voice-corpus', p), 'utf8')}\n</voice_sample>`).join('\n\n');
  const cachedContext = `${brandVoice}\n\n---\n\n${standards}\n\n---\n\n# Hamilton voice corpus\n\n${voicePrompt}`;
  const userPrompt = buildUserPrompt(target, spine, serps, teardownMd, brief);

  const maxOutTokens = Math.min(Math.max(7000, Math.round(finalWordTarget * 3) + 3000), 16000);
  const t0 = Date.now();
  const draft = await deepInfraGenerate(model, cachedContext, userPrompt, maxOutTokens);
  const elapsedMs = Date.now() - t0;
  if (!draft) throw new Error('Empty draft from model');
  mkdirSync(join(seoRoot, 'drafts'), { recursive: true });
  writeFileSync(join(seoRoot, 'drafts', `${slug}.md`), draft);
  const wordCount = draft.split(/\s+/).filter(Boolean).length;
  result.cost = draft._cost || 0;
  result.steps.generation = { model, elapsedMs, wordCount, cost: result.cost };
  log(`Step 7: ${wordCount} words generated in ${elapsedMs}ms ($${result.cost.toFixed(4)})`);

  // Step 8: auto-fix + QA + auto-fix again + QA
  for (let pass = 0; pass < 2; pass++) {
    try { execSync(`node scripts/auto-fix-draft.mjs --target ${slug}`, { cwd: repoRoot, stdio: 'pipe' }); }
    catch (e) { /* tolerate */ }
    try {
      execSync(`node scripts/qa-page.mjs --target ${slug}`, { cwd: repoRoot, stdio: 'pipe' });
      result.steps.qa = { pass: true, attempts: pass + 1 };
      result.status = 'passed';
      break;
    } catch (e) {
      if (pass === 1) {
        result.steps.qa = { pass: false, attempts: pass + 1 };
        result.status = 'qa_failed';
      }
    }
  }

  result.completed = new Date().toISOString();
  return result;
}

// ─── Helpers ──────────────────────────────────────────────────────────────
function isoDaysAgo(n) { return new Date(Date.now() - n * 86400_000).toISOString().slice(0, 10); }

async function getGscToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const b64u = b => Buffer.from(b).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const header = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = b64u(JSON.stringify({
    iss: sa.client_email, scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: sa.token_uri, iat: now, exp: now + 3600,
  }));
  const unsigned = `${header}.${payload}`;
  const sig = createSign('RSA-SHA256'); sig.update(unsigned);
  const jwt = `${unsigned}.${b64u(sig.sign(sa.private_key))}`;
  const res = await fetch(sa.token_uri, {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  return (await res.json()).access_token;
}

async function dfsPost(path, body) {
  const auth = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');
  const res = await fetch(`https://api.dataforseo.com${path}`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`DataForSEO ${path} ${res.status}`);
  return res.json();
}

async function firecrawl(url) {
  if (!process.env.FIRECRAWL_API_KEY) {
    const r = await fetch(url, { headers: { 'User-Agent': 'HamiltonSEOBot/1.0' } });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const html = await r.text();
    return { html, markdown: '' };
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

async function deepInfraGenerate(model, system, user, maxTokens) {
  const res = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.DEEPINFRA_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      max_tokens: maxTokens, temperature: 0.4, stream: true,
    }),
  });
  if (!res.ok) throw new Error(`DeepInfra ${res.status}: ${(await res.text()).slice(0, 300)}`);
  let draft = ''; let usage = {};
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
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
        if (delta) draft += delta;
        if (chunk.usage) usage = chunk.usage;
      } catch { }
    }
  }
  const p = PRICING[model] || { in: 0.5, out: 1.5 };
  draft._cost = ((usage.prompt_tokens || 0) * p.in + (usage.completion_tokens || 0) * p.out) / 1_000_000;
  return draft;
}

function pickVoiceSamples(target, seoRoot) {
  const all = readdirSync(join(seoRoot, 'voice-corpus')).filter(f => f.endsWith('.md'));
  const wanted = ['about__alex-hamilton-li.md'];
  if (target.service) {
    const cs = all.find(f => f === `${target.service}.md`);
    if (cs) wanted.push(cs);
    const blog = all.find(f => f.includes(target.service) && f.includes('cost-bay-area'));
    if (blog) wanted.push(blog);
  }
  if (!wanted.find(w => w.includes('cost-bay-area'))) {
    if (all.includes('blog__roof-replacement-cost-bay-area.md')) wanted.push('blog__roof-replacement-cost-bay-area.md');
  }
  return wanted.filter(w => all.includes(w));
}

function buildUserPrompt(target, spine, serps, teardownMd, brief) {
  return `Generate the draft for this page.

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

CRITICAL: Do NOT wrap the frontmatter in any code fence. The file MUST start with literal --- as line 1, and the frontmatter MUST end with literal --- on its own line before the body.

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
10. Source attribution: every dollar amount, percentage, year-stat, or named permit fee must have a markdown source link [label](url) within the same paragraph.
11. Inline internal links: the body must contain at least 5 markdown internal links of the form [anchor](/path).
12. E-E-A-T anchor: body must reference Alex Hamilton Li by name with a markdown link to /about/alex-hamilton-li, and CSLB #1078806 with a markdown link to https://www.cslb.ca.gov.
13. All mustCover items addressed in the body content.
14. Output the full markdown only. No prose before or after. No code fence wrapping the entire output.`;
}
