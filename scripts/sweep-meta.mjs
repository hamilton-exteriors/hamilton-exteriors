#!/usr/bin/env node
/**
 * sweep-meta.mjs — bulk update Ghost post meta_title + meta_description.
 *
 * Use after OpenPanel's gsc_get_query_opportunities surfaces new
 * striking-distance queries (pos 4-15, 0% CTR) where a title rewrite
 * unlocks clicks.
 *
 * Usage:
 *   node scripts/sweep-meta.mjs --file path/to/updates.json
 *
 * Updates JSON shape: an array of { slug, meta_title, meta_description, why? }.
 * Each entry targets a Ghost post by slug (find via Ghost admin or
 * /ghost/api/admin/posts/slug/<slug>/). Skips posts that don't exist.
 *
 *   [
 *     {
 *       "slug": "sa-city-alameda-county-ca-additions",
 *       "meta_title": "...",
 *       "meta_description": "...",
 *       "why": "pos 6.0, 63 impr, 0 clicks — query: second story addition alameda"
 *     }
 *   ]
 *
 * Idempotent: re-runs are a no-op when titles already match.
 */
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';

const GHOST_KEY = process.env.GHOST_ADMIN_API_KEY;
const GHOST_URL = process.env.GHOST_URL || 'https://ghost-production-42337.up.railway.app';
if (!GHOST_KEY) { console.error('missing GHOST_ADMIN_API_KEY'); process.exit(1); }

const args = parseArgs(process.argv.slice(2));
if (!args.file) { console.error('Usage: --file <path-to-updates.json>'); process.exit(2); }
const updates = JSON.parse(readFileSync(args.file, 'utf8'));
if (!Array.isArray(updates)) { console.error('updates JSON must be an array'); process.exit(2); }

function token() {
  const [k, s] = GHOST_KEY.split(':');
  return jwt.sign({}, Buffer.from(s, 'hex'), { keyid: k, algorithm: 'HS256', expiresIn: '5m', audience: '/admin/' });
}

async function api(path, opts = {}) {
  const r = await fetch(`${GHOST_URL}/ghost/api/admin/${path}`, {
    ...opts,
    headers: { Authorization: `Ghost ${token()}`, 'Content-Type': 'application/json', ...(opts.headers || {}) },
  });
  return { status: r.status, body: r.status === 204 ? null : await r.json() };
}

let updated = 0, skipped = 0, failed = 0;
for (const u of updates) {
  if (!u.slug || !u.meta_title || !u.meta_description) {
    console.error(`SKIP malformed entry: ${JSON.stringify(u).slice(0, 200)}`);
    failed++; continue;
  }
  const ex = await api(`posts/slug/${u.slug}/?formats=html`);
  if (ex.status !== 200) { console.log(`SKIP ${u.slug}: ${ex.status}`); failed++; continue; }
  const post = ex.body.posts[0];

  if (post.meta_title === u.meta_title && post.meta_description === u.meta_description) {
    console.log(`SKIP ${u.slug} — already matches`);
    skipped++; continue;
  }

  console.log(`\n${u.slug}`);
  console.log(`  before: ${post.meta_title}`);
  console.log(`  after:  ${u.meta_title}`);
  if (u.why) console.log(`  why:    ${u.why}`);

  if (args['dry-run']) { console.log('  (dry-run — not pushed)'); continue; }

  const r = await api(`posts/${post.id}/`, {
    method: 'PUT',
    body: JSON.stringify({ posts: [{
      meta_title: u.meta_title,
      meta_description: u.meta_description,
      updated_at: post.updated_at,
    }] }),
  });
  if (r.status >= 400) {
    console.error(`  FAIL ${r.status} ${JSON.stringify(r.body).slice(0, 200)}`);
    failed++;
  } else {
    console.log(`  updated`);
    updated++;
  }
}

console.log(`\nDone — updated: ${updated}, skipped: ${skipped}, failed: ${failed}`);

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
