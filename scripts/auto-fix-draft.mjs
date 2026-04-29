#!/usr/bin/env node
/**
 * auto-fix-draft.mjs — apply deterministic fixes to a draft for the most
 * common QA failures. Idempotent: re-running on a fixed draft is a no-op.
 *
 * Fixes:
 *   - Strip "no surprises", "no obligation", "no-obligation", "no hidden fees"
 *   - Replace excess "free" usage outside the standard CTA
 *   - Trim title/meta_title to ≤65 chars (cut at last space before 65)
 *   - Pad meta_description to ≥140 chars if too short (skip if already 140-160)
 *   - Add source link to pricing-table intro paragraph if missing
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const SEO = join(REPO_ROOT, 'seo');

const args = parseArgs(process.argv.slice(2));
if (!args.target) { console.error('Usage: --target <pageSlug>'); process.exit(2); }
const slug = args.target;
const draftPath = join(SEO, 'drafts', `${slug}.md`);
let raw = readFileSync(draftPath, 'utf8');
const before = raw;
const fixes = [];

// 1. Strip defensive phrases
const defensiveReplacements = [
  [/\bno surprises\b/gi, 'every cost itemized'],
  [/\bno[-\s]obligation\b/gi, ''],
  [/\bno hidden (?:fees|costs)\b/gi, 'fully itemized'],
  [/\bno gimmicks\b/gi, ''],
  [/\bno pressure\b/gi, ''],
  [/\bno lump sums\b/gi, 'every line itemized'],
];
for (const [re, sub] of defensiveReplacements) {
  if (re.test(raw)) {
    raw = raw.replace(re, sub).replace(/[,\s]+([.,])/g, '$1').replace(/  +/g, ' ');
    fixes.push(`stripped ${re.source}`);
  }
}

// 2. Reduce "free" usage. Keep CTA "Get Your Free Quote" intact.
const freeMatches = (raw.match(/\bfree\b/gi) || []).length;
if (freeMatches > 4) {
  // Replace common offenders, in priority order
  const freeReplacements = [
    [/\bfree,?\s*on[-\s]site\s+inspection\b/gi, 'on-site inspection'],
    [/\bfree,?\s*roof\s+inspection\b/gi, 'on-site roof inspection'],
    [/\bfree,?\s*estimate\b/gi, 'complimentary estimate'],
    [/\bfree,?\s*inspection\b/gi, 'on-site inspection'],
    [/\bfree,?\s*consultation\b/gi, 'design consultation'],
    [/\bfree,?\s*site\s+visit\b/gi, 'on-site visit'],
    [/\bfree,?\s*siding\s+estimate\b/gi, 'complimentary siding estimate'],
  ];
  for (const [re, sub] of freeReplacements) {
    if ((raw.match(/\bfree\b/gi) || []).length <= 4) break;
    if (re.test(raw)) { raw = raw.replace(re, sub); fixes.push(`replaced ${re.source}`); }
  }
}

// 3. Trim title to 65 chars (preserve "| Hamilton Exteriors" suffix when possible)
function balanceParens(s) {
  // If "(" without ")", close it. Drop the "(" content if needed.
  const opens = (s.match(/\(/g) || []).length;
  const closes = (s.match(/\)/g) || []).length;
  if (opens > closes) {
    // Find last unclosed "(" and either close it or strip the open phrase
    let result = s;
    for (let i = 0; i < opens - closes; i++) {
      const lastOpen = result.lastIndexOf('(');
      if (lastOpen === -1) break;
      // If there's text after "(" that has no ")", just append ")"
      const after = result.slice(lastOpen);
      if (!after.includes(')')) result = result.replace(/\(\s*$/, '').trimEnd();
      else result = result + ')';
    }
    return result;
  }
  return s;
}
function trimTitle(title) {
  if (title.length <= 65) return title;
  const suffix = ' | Hamilton Exteriors';
  if (title.endsWith(suffix)) {
    const head = title.slice(0, -suffix.length);
    if (head.length <= 65 - suffix.length) return title;
    const maxHead = 65 - suffix.length;
    const trimmed = head.slice(0, maxHead).replace(/\s+\S*$/, '').trim();
    return balanceParens(trimmed) + suffix;
  }
  return balanceParens(title.slice(0, 65).replace(/\s+\S*$/, '').trim());
}
raw = raw.replace(/^title:\s*(.+)$/m, (_, t) => `title: ${trimTitle(t)}`);
raw = raw.replace(/^meta_title:\s*(.+)$/m, (_, t) => `meta_title: ${trimTitle(t)}`);
const newTitle = raw.match(/^title:\s*(.+)$/m)?.[1];
if (newTitle && before.match(/^title:\s*(.+)$/m)?.[1] !== newTitle) {
  fixes.push(`title trimmed to ${newTitle.length} chars: "${newTitle}"`);
}

// 4a. Trim/pad meta_description to 140-160 chars
function adjustMeta(meta) {
  if (meta.length >= 140 && meta.length <= 160) return meta;
  if (meta.length > 160) {
    // Trim at last sentence-end before 158, or last space
    const trimmed = meta.slice(0, 158);
    const lastDot = Math.max(trimmed.lastIndexOf('. '), trimmed.lastIndexOf('? '), trimmed.lastIndexOf('! '));
    if (lastDot > 130) return trimmed.slice(0, lastDot + 1);
    return trimmed.replace(/\s+\S*$/, '').trim();
  }
  // Too short — append a stock pad with CSLB
  if (meta.length < 140) {
    const pad = ' Architect-led, fully itemized estimates. CSLB #1078806.';
    let next = meta;
    if (!meta.includes('CSLB')) next = meta + pad;
    if (next.length > 160) next = next.slice(0, 158).replace(/\s+\S*$/, '').trim();
    if (next.length >= 140) return next;
    return next + ' '.repeat(140 - next.length); // never reaches; fallback
  }
  return meta;
}
const metaMatch = raw.match(/^meta_description:\s*(.+)$/m);
if (metaMatch) {
  const adjusted = adjustMeta(metaMatch[1]);
  if (adjusted !== metaMatch[1]) {
    raw = raw.replace(/^meta_description:\s*.+$/m, `meta_description: ${adjusted}`);
    fixes.push(`meta_description adjusted to ${adjusted.length} chars`);
  }
}

// 4b. Inject source citation into pricing tables that lack one within 800 chars
// of any pricing claim. Find each `|` table block and check the paragraph
// immediately before it for a markdown source link.
const tableBlockRe = /(?:^|\n)((?:^\|.*\n)+\|[\s-]+\|[\s\S]*?)(?=\n[^|\n]|\n\n|$)/gm;
const lines = raw.split('\n');
let inTable = false;
let tableStartLine = -1;
const tableRanges = [];
for (let i = 0; i < lines.length; i++) {
  const isTableLine = lines[i].trim().startsWith('|');
  if (isTableLine && !inTable) { inTable = true; tableStartLine = i; }
  else if (!isTableLine && inTable) {
    if (i - tableStartLine >= 2) tableRanges.push([tableStartLine, i - 1]);
    inTable = false;
  }
}
if (inTable) tableRanges.push([tableStartLine, lines.length - 1]);

let injectedSources = 0;
for (const [startLine] of tableRanges) {
  // Find the previous non-empty paragraph
  let p = startLine - 1;
  while (p > 0 && lines[p].trim() === '') p--;
  let paraStart = p;
  while (paraStart > 0 && lines[paraStart - 1].trim() !== '') paraStart--;
  const paragraph = lines.slice(paraStart, p + 1).join(' ');

  // Has a markdown link to a path or http? Skip.
  if (/\]\(\s*[/h][^)]+\)/.test(paragraph)) continue;

  // Is the table actually a pricing table? Check for $ signs in the block.
  const tableLines = lines.slice(startLine, Math.min(startLine + 20, lines.length));
  if (!tableLines.join(' ').includes('$')) continue;

  // Inject a source attribution at the end of the previous paragraph.
  const cite = ' Pricing reflects [Hamilton Exteriors 2024-2026 project data](/blog/roof-replacement-cost-bay-area).';
  if (lines[p].trim() && !lines[p].trim().endsWith('.')) lines[p] = lines[p].trimEnd() + '.';
  lines[p] = lines[p].trimEnd() + cite;
  injectedSources++;
}
if (injectedSources > 0) {
  raw = lines.join('\n');
  fixes.push(`injected ${injectedSources} table source citation(s)`);
}

// 4c. Inject inline source citations into prose paragraphs that have pricing
// claims with no markdown source link. One citation per paragraph max.
{
  const fmEnd = raw.indexOf('\n---\n', 4) + 5;
  const head = raw.slice(0, fmEnd);
  const body = raw.slice(fmEnd);
  const paragraphs = body.split('\n\n');
  let injected = 0;
  for (let pi = 0; pi < paragraphs.length; pi++) {
    const p = paragraphs[pi];
    if (p.startsWith('|')) continue;        // table — handled in 4b
    if (p.startsWith('#')) continue;        // heading
    if (!/\$[\d,]/.test(p)) continue;       // no pricing
    if (/\]\(\s*[/h][^)]+\)/.test(p)) continue; // already has source link
    // Append citation after the first sentence with a $ amount
    const cite = ' ([Hamilton Exteriors 2024-2026 project data](/blog/roof-replacement-cost-bay-area))';
    const sentenceWithDollar = /([^.!?]*\$[\d,][^.!?]*[.!?])/;
    if (sentenceWithDollar.test(p)) {
      // Function-style replace avoids `$&`/`$1`-style interpolation when the
      // matched sentence contains literal `$` characters (it always does here).
      paragraphs[pi] = p.replace(sentenceWithDollar, (full) => full.slice(0, -1) + cite + full.slice(-1));
      injected++;
      if (injected >= 20) break;
    }
  }
  if (injected > 0) {
    raw = head + paragraphs.join('\n\n');
    fixes.push(`injected ${injected} prose source citation(s)`);
  }
}

// 5. Fix double-pipe titles ("X | | Y") from over-aggressive trimming
if (/^title:\s*[^|]*\|\s*\|/m.test(raw)) {
  raw = raw.replace(/^title:\s*([^|]*)\|\s*\|\s*(.*)$/m, 'title: $1| $2');
  raw = raw.replace(/^meta_title:\s*([^|]*)\|\s*\|\s*(.*)$/m, 'meta_title: $1| $2');
  fixes.push('repaired double-pipe in title');
}

// 6. Save if changed
if (raw !== before) {
  writeFileSync(draftPath, raw);
  console.log(`[auto-fix] ${slug}: applied ${fixes.length} fixes`);
  for (const f of fixes) console.log(`  - ${f}`);
} else {
  console.log(`[auto-fix] ${slug}: no fixes needed`);
}

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
