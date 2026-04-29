#!/usr/bin/env node
/**
 * ghost-publish.mjs — push a finalized draft to Ghost.
 *
 * Two publish modes by page type:
 *
 * 1. cost-blog / informational-blog
 *    Create or update a Ghost post under the standard blog collection.
 *    Push full HTML body. The Astro [slug].astro template auto-generates
 *    schema (Article, BreadcrumbList, FAQPage) from the HTML — we don't
 *    need to push schema_jsonld separately.
 *
 * 2. service-area-city / service-area-city-service / service-area-county /
 *    cornerstone-service / cornerstone-subservice
 *    These render from a structured `<script type="application/json">` block
 *    in the existing Ghost post HTML. We DON'T overwrite that. Instead:
 *    - update meta_title, meta_description, custom_excerpt
 *    - merge our draft FAQs into the existing structured data's faqs/localFaqs
 *    - leave hero, sections, services intact
 *
 * Usage:
 *   node scripts/ghost-publish.mjs --target <pageSlug> [--dry-run]
 *
 * Idempotent: stores content hash per Ghost post id in .seo-cache/published-hashes.json.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { marked } from 'marked';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const SEO = process.env.SEO_ROOT || join(REPO_ROOT, 'seo');
const HASH_CACHE = process.env.HASH_CACHE_PATH || join(REPO_ROOT, '.seo-cache', 'published-hashes.json');

const args = parseArgs(process.argv.slice(2));
const slug = args.target;
if (!slug) { console.error('Usage: --target <pageSlug> [--dry-run]'); process.exit(2); }
const DRY_RUN = !!args['dry-run'];

const target = JSON.parse(readFileSync(join(SEO, 'targets', `${slug}.json`), 'utf8'));
const draftPath = join(SEO, 'drafts', `${slug}.md`);
if (!existsSync(draftPath)) { console.error(`Draft missing: ${draftPath}`); process.exit(2); }
const raw = readFileSync(draftPath, 'utf8');

// Parse frontmatter
const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (!fmMatch) { console.error('No frontmatter found'); process.exit(2); }
const [, fmText, body] = fmMatch;
const fm = parseFrontmatter(fmText);

// Configure marked: GFM tables, no header IDs collision (Ghost handles its own)
marked.setOptions({ gfm: true, breaks: false });
const html = marked.parse(body);
const cities = JSON.parse(readFileSync(join(SEO, 'cities.json'), 'utf8')).cities;
const cityRecord = target.citySlug ? cities.find(c => c.slug === target.citySlug) : null;

// Slug mapping target -> Ghost
function ghostSlugForTarget() {
  if (target.pageType === 'cost-blog' || target.pageType === 'informational-blog') {
    // /blog/{slug} → Ghost slug
    const blogSlug = target.pageUrl.match(/\/blog\/([^/?]+)/)?.[1];
    return blogSlug;
  }
  if (target.pageType === 'service-area-city') {
    return `sa-city-${cityRecord.county}-${cityRecord.slug}`;
  }
  if (target.pageType === 'service-area-city-service') {
    return `sa-city-${cityRecord.county}-${cityRecord.slug}-${target.service}`;
  }
  if (target.pageType === 'service-area-county') {
    const m = target.pageUrl.match(/\/service-areas\/([^/?]+)/);
    return m ? `sa-county-${m[1]}` : null;
  }
  if (target.pageType === 'cornerstone-subservice') {
    const m = target.pageUrl.match(/\/([^/]+)\/([^/]+)$/);
    return m ? `sub-${m[1]}-${m[2]}` : null;
  }
  return null;
}

const ghostSlug = ghostSlugForTarget();
if (!ghostSlug) { console.error(`Could not determine Ghost slug for ${target.pageType} ${target.pageUrl}`); process.exit(2); }

const GHOST_URL = process.env.GHOST_URL || 'https://ghost-production-42337.up.railway.app';
const GHOST_KEY = process.env.GHOST_ADMIN_API_KEY;
if (!GHOST_KEY) { console.error('GHOST_ADMIN_API_KEY not set'); process.exit(2); }

function ghostToken() {
  const [keyId, secret] = GHOST_KEY.split(':');
  return jwt.sign({}, Buffer.from(secret, 'hex'), { keyid: keyId, algorithm: 'HS256', expiresIn: '5m', audience: '/admin/' });
}

async function ghostFetch(path, opts = {}) {
  const res = await fetch(`${GHOST_URL}/ghost/api/admin/${path}`, {
    ...opts,
    headers: { Authorization: `Ghost ${ghostToken()}`, 'Content-Type': 'application/json', ...(opts.headers || {}) },
  });
  return { status: res.status, body: res.status === 204 ? null : await res.json() };
}

// Compute content hash for idempotency
const contentHash = createHash('sha256').update(JSON.stringify({ fm, html })).digest('hex').slice(0, 16);

// Idempotency cache
let hashes = {};
if (existsSync(HASH_CACHE)) hashes = JSON.parse(readFileSync(HASH_CACHE, 'utf8'));
if (hashes[ghostSlug] === contentHash && !args['force']) {
  console.log(`[publish] ${slug}: unchanged (hash ${contentHash}) — skipped`);
  process.exit(0);
}

// Fetch existing post
console.log(`[publish] ${slug} → Ghost slug: ${ghostSlug}`);
const existing = await ghostFetch(`posts/slug/${encodeURIComponent(ghostSlug)}/?formats=html,lexical&include=tags`);
const existingPost = existing.body?.posts?.[0];

if (target.pageType === 'cost-blog' || target.pageType === 'informational-blog') {
  await publishBlog(existingPost);
} else {
  await updateServiceAreaMeta(existingPost);
}

function persistHash() {
  mkdirSync(dirname(HASH_CACHE), { recursive: true });
  hashes[ghostSlug] = contentHash;
  writeFileSync(HASH_CACHE, JSON.stringify(hashes, null, 2));
}

async function publishBlog(post) {
  const update = {
    title: fm.title || fm.meta_title,
    slug: ghostSlug,
    meta_title: fm.meta_title || fm.title,
    meta_description: fm.meta_description,
    canonical_url: fm.canonical || target.pageUrl,
    custom_excerpt: fm.meta_description?.slice(0, 300),
    html,
    status: 'published',
    tags: deriveTagsForBlog(),
  };
  if (DRY_RUN) {
    console.log(`[dry-run] would ${post ? 'update' : 'create'} blog post:`);
    console.log(`  slug: ${update.slug}`);
    console.log(`  title: ${update.title}`);
    console.log(`  meta_description: ${update.meta_description}`);
    console.log(`  html length: ${html.length}`);
    console.log(`  tags: ${update.tags.map(t => t.name).join(', ')}`);
    return;
  }
  let res;
  if (post) {
    update.updated_at = post.updated_at;
    res = await ghostFetch(`posts/${post.id}/?source=html`, { method: 'PUT', body: JSON.stringify({ posts: [update] }) });
  } else {
    res = await ghostFetch(`posts/?source=html`, { method: 'POST', body: JSON.stringify({ posts: [update] }) });
  }
  if (res.status >= 400) { console.error(`Ghost API error: ${res.status}`, JSON.stringify(res.body).slice(0, 500)); process.exit(1); }
  console.log(`[publish] ${post ? 'updated' : 'created'} ${ghostSlug}`);
  persistHash();
}

function deriveTagsForBlog() {
  const t = [{ name: 'cost-guide' }, { name: 'blog-post' }];
  if (target.service) t.push({ name: target.service });
  if (target.citySlug) t.push({ name: target.citySlug.replace(/-ca$/, '') });
  return t;
}

async function updateServiceAreaMeta(post) {
  if (!post) {
    console.error(`Service-area post does not exist at ${ghostSlug} — service-area scaffolding required first.`);
    process.exit(1);
  }
  // Extract our draft FAQs from the body markdown
  const faqs = extractFaqsFromMarkdown(body);

  // Merge into existing structured data
  let structured = null;
  const jsonMatch = (post.html || '').match(/<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/);
  if (jsonMatch) {
    try { structured = JSON.parse(jsonMatch[1]); } catch (e) { console.warn('Existing JSON parse failed, will only update meta'); }
  }

  const update = {
    meta_title: fm.meta_title || fm.title,
    meta_description: fm.meta_description,
    canonical_url: fm.canonical || target.pageUrl,
    custom_excerpt: fm.meta_description?.slice(0, 300),
  };

  if (structured) {
    // Pick the right FAQ field per data shape
    const faqField = 'localFaqs' in structured ? 'localFaqs' :
                     'faqs' in structured ? 'faqs' : null;
    if (faqField && faqs.length >= 3) {
      structured[faqField] = faqs.map(f => ({ question: f.question, answer: f.answer }));
    }
    // Push the long-form HTML body (with FAQs stripped — they're already
    // rendered by the existing FAQ component) into longFormContent so the
    // hybrid template renders it after the hero.
    structured.longFormContent = stripFaqsFromHtml(html);
    structured.longFormIntro = buildIntro(target, structured);
    // Update title/description in structured for consistency
    if (fm.title) structured.title = fm.title;
    if (fm.meta_description) structured.description = fm.meta_description;
    // Re-pack into HTML <script type=application/json>
    const newJson = JSON.stringify(structured);
    const newHtml = (post.html || '').replace(jsonMatch[0], `<!--kg-card-begin: html--><script type="application/json">${newJson}</script><!--kg-card-end: html-->`);
    update.html = newHtml;
  }

  if (DRY_RUN) {
    console.log(`[dry-run] would update service-area post ${ghostSlug}:`);
    console.log(`  meta_title: ${update.meta_title}`);
    console.log(`  meta_description: ${update.meta_description}`);
    console.log(`  faqs in update: ${faqs.length} ${update.html ? '(merged into structured json)' : '(NOT merged — no structured data found)'}`);
    return;
  }
  update.updated_at = post.updated_at;
  const res = await ghostFetch(`posts/${post.id}/?source=html`, { method: 'PUT', body: JSON.stringify({ posts: [update] }) });
  if (res.status >= 400) { console.error(`Ghost API error: ${res.status}`, JSON.stringify(res.body).slice(0, 500)); process.exit(1); }
  console.log(`[publish] updated meta + ${faqs.length} FAQs on ${ghostSlug}`);
  persistHash();
}

// Strip H1 (hero already has one) and the FAQ section (FAQ component renders
// localFaqs separately) from the rendered HTML before storing as long-form.
function stripFaqsFromHtml(html) {
  let out = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '');
  out = out.replace(/<h2[^>]*>(?:[^<]*)(?:Frequently\s+Asked\s+Questions|FAQ)(?:[^<]*)<\/h2>[\s\S]*?(?=<h2|$)/i, '');
  // Also strip any "By Alexander Hamilton Li" byline paragraph that pairs with H1
  out = out.replace(/<p>(?:[^<]*By\s+\[?Alexander\s+Hamilton\s+Li[\s\S]*?)<\/p>\s*/i, '');
  // Strip "Updated YYYY-MM-DD" / "X min read" boilerplate paragraph
  out = out.replace(/<p>[^<]*\d{4}.{0,40}min read[^<]*<\/p>\s*/i, '');
  return out.trim();
}

function buildIntro(target, structured) {
  const city = structured.city || target.citySlug?.replace(/-ca$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'this area';
  const service = structured.serviceName || target.service?.replace(/-/g, ' ');
  if (service) return `Here is what ${city} homeowners need to know about ${service.toLowerCase()} — local permits, code requirements, and what we have learned doing the work.`;
  return `Here is what ${city} homeowners need to know about working with an architect-led design-build contractor in their city.`;
}

function extractFaqsFromMarkdown(md) {
  const faqs = [];
  // Match H2/H3 ending with ? followed by body until next H2/H3
  const re = /^(#{2,3})\s+([^\n]+\?)\s*\n+([\s\S]+?)(?=^#{1,3}\s|\Z)/gm;
  let m;
  while ((m = re.exec(md)) !== null) {
    const question = m[2].trim();
    const answer = m[3]
      .replace(/^>\s*/gm, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')   // strip markdown link syntax
      .replace(/[*_`]/g, '')                       // strip simple md emphasis
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 500);
    if (question && answer.length > 30) faqs.push({ question, answer });
  }
  return faqs;
}

function parseFrontmatter(s) {
  const out = {};
  const lines = s.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (m && !lines[i].startsWith(' ')) {
      out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
  return out;
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
