#!/usr/bin/env node
/**
 * extract-voice-corpus.mjs — pull existing Hamilton Exteriors content into
 * seo/voice-corpus/ as plain markdown. These are voice anchors loaded into
 * the prompt-cache for every per-page generation call.
 *
 * Sources: hamilton-exteriors.com (live HTML, parsed to text/markdown).
 *
 * Output: one markdown file per page, with the URL preserved in frontmatter.
 */

import { writeFileSync } from 'fs';
import { resolve, join } from 'path';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const OUT_DIR = join(REPO_ROOT, 'seo', 'voice-corpus');

const SOURCES = [
  // Author / E-E-A-T anchor
  '/about/alex-hamilton-li',
  // Top-of-funnel cornerstone services (voice + structure samples)
  '/roofing',
  '/adu',
  '/additions',
  '/siding',
  '/windows',
  '/custom-homes',
  // Best-performing existing cost blogs (the proven format we'll replicate)
  '/blog/roof-replacement-cost-bay-area',
  '/blog/adu-cost-bay-area',
  '/blog/second-story-addition-cost-bay-area',
  // High-quality informational blogs
  '/blog/metal-roof-vs-asphalt-shingles-bay-area',
  '/blog/bay-area-fire-zone-roofing-requirements',
  '/blog/how-to-choose-roofing-contractor-bay-area',
  '/blog/james-hardie-siding-bay-area',
];

const SITE = 'https://hamilton-exteriors.com';

// Minimal HTML→text/markdown conversion. We don't need perfect fidelity —
// we need the writing voice and structure preserved for prompt-cache use.
function htmlToMarkdown(html) {
  // Strip head, script, style
  let s = html
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '');

  // Try to isolate <main> if present
  const mainMatch = s.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) s = mainMatch[1];

  // Headings
  s = s.replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n\n# ${stripTags(t)}\n\n`);
  s = s.replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n\n## ${stripTags(t)}\n\n`);
  s = s.replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n\n### ${stripTags(t)}\n\n`);
  s = s.replace(/<h4\b[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `\n\n#### ${stripTags(t)}\n\n`);

  // Lists
  s = s.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `- ${stripTags(t).trim()}\n`);
  s = s.replace(/<\/?(ul|ol)\b[^>]*>/gi, '\n');

  // Paragraphs / line breaks
  s = s.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `\n\n${stripTags(t).trim()}\n\n`);
  s = s.replace(/<br\s*\/?>/gi, '\n');

  // Strong / em
  s = s.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');
  s = s.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');

  // Strip remaining tags
  s = stripTags(s);

  // Decode common entities
  s = s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/\u2014/g, ' — ')
    .replace(/\u2013/g, ' – ');

  // Collapse whitespace
  s = s.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();

  return s;
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '');
}

function pageSlug(path) {
  return path.replace(/^\//, '').replace(/\//g, '__') || 'index';
}

async function fetchPage(path) {
  const url = `${SITE}${path}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'HamiltonSEOBot/1.0 (voice-corpus)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function main() {
  let ok = 0, failed = 0;
  for (const path of SOURCES) {
    try {
      const html = await fetchPage(path);
      const md = htmlToMarkdown(html);
      const wordCount = md.split(/\s+/).filter(Boolean).length;
      const out =
`---
sourceUrl: ${SITE}${path}
extractedAt: ${new Date().toISOString()}
wordCount: ${wordCount}
---

${md}
`;
      const file = join(OUT_DIR, `${pageSlug(path)}.md`);
      writeFileSync(file, out);
      console.log(`  ${String(wordCount).padStart(5)} words  ${path}`);
      ok++;
    } catch (e) {
      console.error(`  FAIL  ${path}: ${e.message}`);
      failed++;
    }
  }
  console.log(`\nVoice corpus: ${ok} extracted, ${failed} failed`);
}

main().catch(e => { console.error(e); process.exit(1); });
