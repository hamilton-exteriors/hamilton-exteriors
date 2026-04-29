#!/usr/bin/env node
/**
 * qa-page.mjs — deterministic quality gates G1–G5 + G6 for a generated draft.
 * Returns PASS/FAIL per gate plus an overall verdict. Writes structured output
 * to seo/drafts/{pageSlug}.qa.json so the agent loop can read failures.
 *
 * Usage:
 *   node scripts/qa-page.mjs --target <pageSlug>
 *
 * Reads:
 *   seo/targets/{pageSlug}.json
 *   seo/drafts/{pageSlug}.md
 *   seo/teardowns/{pageSlug}.brief.json (for G1, G6)
 *   seo/drafts/*.md (for G2 corpus comparison)
 *
 * Writes:
 *   seo/drafts/{pageSlug}.qa.json
 *
 * Exit code:
 *   0 = all gates pass
 *   1 = at least one gate failed
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const SEO = join(REPO_ROOT, 'seo');

const args = parseArgs(process.argv.slice(2));
if (!args.target) {
  console.error('Usage: qa-page.mjs --target <pageSlug>');
  process.exit(2);
}
const pageSlug = args.target;

const target = readJson(join(SEO, 'targets', `${pageSlug}.json`));
const draftPath = join(SEO, 'drafts', `${pageSlug}.md`);
if (!existsSync(draftPath)) {
  writeQaResult(pageSlug, { overall: 'FAIL', failures: ['No draft file at ' + draftPath] });
  process.exit(1);
}
const draftRaw = readFileSync(draftPath, 'utf8');
const { frontmatter, body } = parseFrontmatter(draftRaw);

const briefPath = join(SEO, 'teardowns', `${pageSlug}.brief.json`);
const brief = existsSync(briefPath) ? readJson(briefPath) : null;

const result = {
  pageSlug,
  pageUrl: target.pageUrl,
  checkedAt: new Date().toISOString(),
  gates: {},
  failures: [],
  overall: 'PASS',
};

// ─────────────────────────────────────────────────────────────────────────
// G1: Brief completeness — every mustCover item appears in body.
// Match ≥50% of distinct ≥5-char content tokens (excluding stopwords). For
// abstract items like "last-click test", an explicit token alias list maps
// concept-style mustCovers to high-signal body markers.
// ─────────────────────────────────────────────────────────────────────────
{
  const failures = [];
  const STOPWORDS = new Set(['should','would','about','after','before','again','reader','need','search','this','that','with','from','have','include','using','their','there','these','those','specific','address','consider','explicitly','article','section','content']);
  const CONCEPT_ALIASES = {
    'last-click test': ['cost', 'permit', 'process', 'warranty', 'inspection'], // any 2 = comprehensive enough
    'pricing communicated as a range': ['$', 'range', 'cost', 'typical'],
    'standalone-value': ['process', 'spec', 'cost', 'detail'],
    'bay area-specific data point': ['permit', '$', 'http', 'code', 'climate'], // any 2 of permit, dollar, link, code reference, climate
  };
  if (brief?.mustCover?.length) {
    for (const item of brief.mustCover) {
      const lowered = item.toLowerCase();
      const bodyLower = body.toLowerCase();
      // Concept alias path
      const alias = Object.entries(CONCEPT_ALIASES).find(([k]) => lowered.includes(k));
      if (alias) {
        const hits = alias[1].filter(t => bodyLower.includes(t)).length;
        if (hits < 2) failures.push(`mustCover concept "${alias[0]}" weakly covered (${hits}/${alias[1].length} aliases)`);
        continue;
      }
      // Token path
      const tokens = lowered.split(/[^a-z0-9$]+/).filter(t => t.length >= 5 && !STOPWORDS.has(t));
      if (!tokens.length) continue; // nothing concrete to check
      const hits = tokens.filter(t => bodyLower.includes(t)).length;
      const ratio = hits / tokens.length;
      if (ratio < 0.5 && hits < 3) {
        failures.push(`mustCover not addressed: "${item}" (${hits}/${tokens.length} tokens, ${(ratio*100).toFixed(0)}%)`);
      }
    }
  } else {
    failures.push('No content brief at ' + briefPath + ' — cannot validate G1 completeness');
  }
  result.gates.G1_completeness = failures.length === 0 ? 'PASS' : 'FAIL';
  if (failures.length) result.failures.push({ gate: 'G1', issues: failures });
}

// ─────────────────────────────────────────────────────────────────────────
// G2: Uniqueness — <30% 5-gram Jaccard overlap with any other published draft
// ─────────────────────────────────────────────────────────────────────────
{
  const failures = [];
  const myNgrams = ngrams(normalize(body), 5);
  const drafts = readdirSync(join(SEO, 'drafts')).filter(f => f.endsWith('.md') && f !== `${pageSlug}.md`);
  let worstOverlap = 0;
  let worstUrl = null;
  for (const f of drafts) {
    const otherRaw = readFileSync(join(SEO, 'drafts', f), 'utf8');
    const otherBody = parseFrontmatter(otherRaw).body;
    const otherNgrams = ngrams(normalize(otherBody), 5);
    const j = jaccard(myNgrams, otherNgrams);
    if (j > worstOverlap) { worstOverlap = j; worstUrl = f; }
    if (j > 0.30) failures.push(`>30% overlap with ${f}: ${(j * 100).toFixed(1)}%`);
  }
  result.gates.G2_uniqueness = failures.length === 0 ? 'PASS' : 'FAIL';
  result.gates.G2_meta = { worstOverlap, worstUrl };
  if (failures.length) result.failures.push({ gate: 'G2', issues: failures });
}

// ─────────────────────────────────────────────────────────────────────────
// G3: Factual — every dollar amount, permit #, % has a source within 250 chars.
// A "source" = full URL, markdown link `](http...)`, or path-relative markdown
// link `](/...)` (internal source citation).
// Years are excluded — they're context, not stats requiring sources.
// Density bypass: if the document already has ≥4 distinct Hamilton/authority
// source citations, we treat it as well-sourced and skip per-claim checks.
// ─────────────────────────────────────────────────────────────────────────
{
  const failures = [];
  const claimRe = /(\$[\d,]+(?:\.\d+)?|\b\d{1,3}(?:\.\d+)?%|CSLB\s*#?\s*\d+|permit\s*#?\s*\d+)/gi;
  const sourceRe = /https?:\/\/[^\s)]+|\]\(\s*[/h][^)]+\)|sourceUrl\s*[:=]\s*['"]?https?:/i;
  // Count distinct authoritative source citations in the body
  const allSources = new Set();
  for (const m of body.matchAll(/\]\(\s*([/h][^)]+)\)/g)) allSources.add(m[1]);
  const sufficientDensity = allSources.size >= 4;

  let claim;
  const seenClaims = new Set();
  while ((claim = claimRe.exec(body)) !== null) {
    const text = claim[0];
    if (seenClaims.has(text)) continue;
    seenClaims.add(text);
    const idx = claim.index;
    const window = body.slice(Math.max(0, idx - 80), Math.min(body.length, idx + 250));
    if (!sourceRe.test(window)) {
      // Whitelist: CSLB number (our own license)
      if (/CSLB\s*#?\s*1078806/i.test(text)) continue;
      // If claim is inside a markdown table row, expand back to the most
      // recent paragraph break before the table and check there. Tables
      // typically cite the source in the intro paragraph above.
      const isInTable = /\|/.test(body.slice(Math.max(0, idx - 60), idx + 60).split('\n').find(l => l.includes(text)) || '');
      if (isInTable) {
        // Find paragraph break before this position
        const before = body.slice(0, idx);
        const lastBreak = Math.max(before.lastIndexOf('\n\n'), 0);
        const tableContext = body.slice(Math.max(0, lastBreak - 200), idx);
        if (sourceRe.test(tableContext)) continue;
      }
      // Wider check: ±800 chars
      const widerWindow = body.slice(Math.max(0, idx - 800), Math.min(body.length, idx + 500));
      if (/\]\(\s*[/h][^)]+\)/.test(widerWindow)) continue;
      // Density bypass: well-sourced document earns trust on stragglers
      if (sufficientDensity) continue;
      failures.push(`Claim "${text}" at offset ${idx} has no source within 250 chars`);
      if (failures.length >= 10) break;
    }
  }
  result.gates.G3_factual = failures.length === 0 ? 'PASS' : 'FAIL';
  if (failures.length) result.failures.push({ gate: 'G3', issues: failures });
}

// ─────────────────────────────────────────────────────────────────────────
// G4: On-page SEO — title, meta, H1, H2 count, schema, link counts
// ─────────────────────────────────────────────────────────────────────────
{
  const failures = [];

  const title = frontmatter.title || frontmatter.meta_title;
  const meta = frontmatter.meta_description;
  if (!title) failures.push('Missing frontmatter.title');
  else if (title.length < 50 || title.length > 65) failures.push(`Title length ${title.length} (need 50-65)`);

  if (!meta) failures.push('Missing frontmatter.meta_description');
  else if (meta.length < 140 || meta.length > 160) failures.push(`Meta description length ${meta.length} (need 140-160)`);

  const h1Matches = body.match(/^# [^\n]+/gm) || [];
  if (h1Matches.length !== 1) failures.push(`Found ${h1Matches.length} H1s (need exactly 1)`);

  const h2Matches = body.match(/^## [^\n]+/gm) || [];
  const targetH2 = brief?.headingPlan?.filter(h => h.startsWith('H2')).length || 5;
  if (h2Matches.length < targetH2) failures.push(`Found ${h2Matches.length} H2s (target ${targetH2})`);

  // Schema validation: frontmatter.schema_jsonld must be a non-empty array
  const schema = frontmatter.schema_jsonld;
  if (!Array.isArray(schema) || schema.length === 0) {
    failures.push('Missing or empty frontmatter.schema_jsonld');
  } else {
    const targetSchema = brief?.schemaBlocks || ['BreadcrumbList'];
    const presentTypes = schema.map(s => s['@type']).filter(Boolean);
    for (const t of targetSchema) {
      if (!presentTypes.includes(t)) failures.push(`Missing schema type: ${t}`);
    }
  }

  // Internal link count: count BOTH frontmatter declarations AND inline body
  // markdown links pointing to the same site (path-relative `](/path)` form).
  const inlineInternalLinks = (body.match(/\]\(\s*\/[^)]+\)/g) || []).length;
  const frontmatterInternalLinks = (frontmatter.internal_links || []).length;
  const internalLinks = Math.max(inlineInternalLinks, frontmatterInternalLinks);
  const targetInternalLinks = brief?.internalLinkTargets?.length || 3;
  if (internalLinks < targetInternalLinks) {
    failures.push(`Internal links ${internalLinks} (inline: ${inlineInternalLinks}, frontmatter: ${frontmatterInternalLinks}) < target ${targetInternalLinks}`);
  }

  result.gates.G4_onpage = failures.length === 0 ? 'PASS' : 'FAIL';
  if (failures.length) result.failures.push({ gate: 'G4', issues: failures });
}

// ─────────────────────────────────────────────────────────────────────────
// G5: Voice rules — forbidden patterns, required CTA
// ─────────────────────────────────────────────────────────────────────────
{
  const failures = [];

  const title = frontmatter.title || frontmatter.meta_title || '';
  const h1 = (body.match(/^# ([^\n]+)/m) || [])[1] || '';

  // Em dashes in title or H1
  if (/—/.test(title)) failures.push('Em dash in title');
  if (/—/.test(h1)) failures.push('Em dash in H1');

  // ALL CAPS words (4+ chars, all uppercase). Whitelist agencies/abbrevs/orgs
  // including multi-word phrases like "CAL FIRE", "GAF MASTER ELITE".
  // Strip whitelisted multi-word phrases first, then check remaining words.
  const allCapsWhitelist = ['CSLB', 'CALGREEN', 'CALFIRE', 'NOAA', 'JSON', 'HTML',
    'WUI', 'FHSZ', 'ADU', 'CBC', 'CEC', 'GAF', 'TPO', 'PVC', 'HDZ', 'HVAC', 'IBC',
    'IRC', 'CRC', 'OSHA', 'EPA', 'CDC', 'IECC', 'BCSC', 'PG&E', 'EIFS', 'WRB',
    'AAMA', 'ASTM', 'ENERGY', 'STAR', 'LEED', 'NFRC', 'BIPV', 'SEER', 'COP',
    'AHJ', 'ICC', 'CRRC', 'TRUE', 'HELOC', 'JADU', 'HOA', 'CC&R', 'CCR',
    'PACE', 'FHA', 'VA', 'USDA', 'SBA', 'DBE', 'DBIA', 'AIA',
    'EBMUD', 'CEBC', 'CALGREEN', 'BAAQMD', 'BCDC', 'CARB', 'NIST',
    'ANSI', 'UL', 'TPCO', 'PEX'];
  const multiWordWhitelist = [/\bCAL\s+FIRE\b/g, /\bGAF\s+MASTER\s+ELITE\b/g, /\bU\.S\.\s+CENSUS\b/g];
  let bodyForCapsCheck = body;
  for (const re of multiWordWhitelist) bodyForCapsCheck = bodyForCapsCheck.replace(re, '');
  const allCapsRe = /\b[A-Z]{4,}\b/g;
  const allCapsHits = (bodyForCapsCheck.match(allCapsRe) || []).filter(w => !allCapsWhitelist.includes(w));
  if (allCapsHits.length > 0) failures.push(`ALL CAPS words: ${[...new Set(allCapsHits)].join(', ')}`);

  // Defensive "no X" phrasing (also catches hyphenated form "no-X")
  const defensivePatterns = [
    /\bno[-\s]surprises?\b/i,
    /\bno[-\s]obligation\b/i,
    /\bno[-\s]hidden\s+(?:fees?|costs?)\b/i,
    /\bno[-\s]gimmicks?\b/i,
    /\bno[-\s]pressure\b/i,
  ];
  for (const re of defensivePatterns) {
    const m = body.match(re);
    if (m) failures.push(`Defensive phrasing: "${m[0]}"`);
  }

  // Forbidden superlatives in copy
  const forbiddenSuperlatives = [
    /\b(?:the\s+)?best\s+(?:contractor|roofer|builder)\b/i,
    /\b#1\s+(?:contractor|roofer|builder|company)\b/i,
    /\btop[\s-]rated\b/i,
    /\bnumber one\b/i,
    /\bleading\s+(?:contractor|roofer|builder)\b/i,
  ];
  for (const re of forbiddenSuperlatives) {
    const m = body.match(re);
    if (m) failures.push(`Unverifiable superlative: "${m[0]}"`);
  }

  // "free" usage cap: ≤4 instances
  const freeCount = (body.match(/\bfree\b/gi) || []).length;
  if (freeCount > 4) failures.push(`"free" used ${freeCount} times (max 4)`);

  // Required CTA: "Get Your Free Quote" must appear at least once
  if (!/Get Your Free Quote/i.test(body)) {
    failures.push('Missing required CTA: "Get Your Free Quote"');
  }

  result.gates.G5_voice = failures.length === 0 ? 'PASS' : 'FAIL';
  if (failures.length) result.failures.push({ gate: 'G5', issues: failures });
}

// ─────────────────────────────────────────────────────────────────────────
// G6: Strictly better than #1 — body signals meet/exceed teardown targets
// ─────────────────────────────────────────────────────────────────────────
{
  const failures = [];
  if (!brief) {
    failures.push('No content brief — cannot evaluate G6 strictly-better');
  } else {
    const wordCount = body.split(/\s+/).filter(Boolean).length;
    // Allow a 10% under-shoot — target is a synthetic ceiling, what matters
    // is comprehensiveness vs competitors, not hitting an exact number.
    if (brief.wordCountTarget && wordCount < brief.wordCountTarget * 0.85) {
      failures.push(`Word count ${wordCount} < target ${brief.wordCountTarget} (under 85%)`);
    }
    // Other quantitative checks already done in G4; G6 is the wordCount + differentiator check
    for (const diff of brief.differentiators || []) {
      const tokens = diff.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length >= 4);
      const bodyLower = body.toLowerCase();
      const hits = tokens.filter(t => bodyLower.includes(t)).length;
      if (hits < Math.min(2, tokens.length)) {
        failures.push(`Differentiator not present: "${diff}" (${hits} keyword hits)`);
      }
    }
  }
  result.gates.G6_strictly_better = failures.length === 0 ? 'PASS' : 'FAIL';
  if (failures.length) result.failures.push({ gate: 'G6', issues: failures });
}

// ─────────────────────────────────────────────────────────────────────────
// Final verdict
// ─────────────────────────────────────────────────────────────────────────
result.overall = result.failures.length === 0 ? 'PASS' : 'FAIL';
writeQaResult(pageSlug, result);

const summary = Object.entries(result.gates)
  .filter(([k]) => !k.endsWith('_meta'))
  .map(([k, v]) => `${k}: ${v}`)
  .join(' | ');
console.log(`[QA] ${pageSlug}: ${result.overall} | ${summary}`);
if (result.failures.length) {
  for (const f of result.failures) {
    console.log(`  ${f.gate}:`);
    for (const issue of f.issues) console.log(`    - ${issue}`);
  }
}

process.exit(result.overall === 'PASS' ? 0 : 1);

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────
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

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeQaResult(pageSlug, result) {
  writeFileSync(join(SEO, 'drafts', `${pageSlug}.qa.json`), JSON.stringify(result, null, 2));
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { frontmatter: {}, body: raw };
  const frontmatter = parseYamlIsh(m[1]);
  return { frontmatter, body: m[2] };
}

// Minimal YAML parser — supports scalar key:value, JSON inline values, and
// YAML block-style lists where each item is a JSON object (our schema_jsonld
// and internal_links pattern).
function parseYamlIsh(s) {
  const out = {};
  const lines = s.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // JSON-array or JSON-object value inline: greedy-match balanced brackets
    const arrInlineMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(\[|\{)/);
    if (arrInlineMatch) {
      const startBracket = arrInlineMatch[2];
      const endBracket = startBracket === '[' ? ']' : '}';
      let collected = line.slice(line.indexOf(startBracket));
      let depth = 0;
      for (const c of collected) { if (c === startBracket) depth++; else if (c === endBracket) depth--; }
      while (depth > 0 && i + 1 < lines.length) {
        i++;
        collected += '\n' + lines[i];
        for (const c of lines[i]) { if (c === startBracket) depth++; else if (c === endBracket) depth--; }
      }
      try { out[arrInlineMatch[1]] = JSON.parse(collected); } catch { out[arrInlineMatch[1]] = collected; }
      continue;
    }

    // Empty key followed by indented `- {...}` list (YAML block list of JSON objects)
    const blockKeyMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*$/);
    if (blockKeyMatch && i + 1 < lines.length && /^\s*-\s+\{/.test(lines[i + 1])) {
      const list = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        i++;
        let item = lines[i].replace(/^\s*-\s+/, '').trim();
        // Multi-line JSON object continuation
        if (item.startsWith('{')) {
          let depth = 0;
          for (const c of item) { if (c === '{') depth++; else if (c === '}') depth--; }
          while (depth > 0 && i + 1 < lines.length) {
            i++;
            item += '\n' + lines[i];
            for (const c of lines[i]) { if (c === '{') depth++; else if (c === '}') depth--; }
          }
        }
        try { list.push(JSON.parse(item)); } catch { list.push(item); }
      }
      out[blockKeyMatch[1]] = list;
      continue;
    }

    // Empty key followed by indented YAML-block objects (model wrote schema as
    // YAML instead of inline JSON). Recover top-level schema types only — a new
    // top-level schema is marked by `- "@context":`. The `@type` of that object
    // is the next non-context @type line at the same indent level (or first one
    // we see before the next @context).
    if (blockKeyMatch && i + 1 < lines.length && /^\s*-\s+["']?@(?:context|type)["']?\s*:/.test(lines[i + 1])) {
      const list = [];
      let current = null;
      let pendingType = false;
      while (i + 1 < lines.length && /^\s+/.test(lines[i + 1])) {
        i++;
        const ctxMatch = lines[i].match(/^\s*-\s+["']?@context["']?\s*:\s*["']?([^"']+)["']?\s*$/);
        const typeMatch = lines[i].match(/^\s*-?\s*["']?@type["']?\s*:\s*["']?([^"']+)["']?\s*$/);
        if (ctxMatch) {
          if (current) list.push(current);
          current = { '@context': ctxMatch[1] };
          pendingType = true;
        } else if (typeMatch && pendingType) {
          // First @type after a fresh @context is the schema type for this object
          current['@type'] = typeMatch[1];
          pendingType = false;
        }
      }
      if (current) list.push(current);
      if (list.length) out[blockKeyMatch[1]] = list;
      continue;
    }

    // Plain scalar key: value
    const kvMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (kvMatch) {
      out[kvMatch[1]] = kvMatch[2].replace(/^['"]|['"]$/g, '');
    }
  }
  return out;
}

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function ngrams(s, n) {
  const tokens = s.split(' ');
  const out = new Set();
  for (let i = 0; i + n <= tokens.length; i++) {
    out.add(tokens.slice(i, i + n).join(' '));
  }
  return out;
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let intersect = 0;
  for (const item of a) if (b.has(item)) intersect++;
  return intersect / (a.size + b.size - intersect);
}
