/**
 * Fix CSLB license number in all Ghost CMS posts/pages.
 * Replaces #1082377 (old/wrong) with #1078806 (correct).
 *
 * Usage: node scripts/fix-cslb-ghost.mjs [--dry-run]
 */

import crypto from 'crypto';

const GHOST_URL = process.env.PUBLIC_GHOST_URL || 'https://ghost-production-42337.up.railway.app';
const GHOST_ADMIN_KEY = process.env.GHOST_ADMIN_API_KEY || '69c71d579c35510001523fba:2f9762c88acc7b71e89628048932a5ac6c1329bce7e72722a36218b500a07084';

const OLD_LICENSE = '1082377';
const NEW_LICENSE = '1078806';
const DRY_RUN = process.argv.includes('--dry-run');

function makeAdminToken() {
  const [id, secret] = GHOST_ADMIN_KEY.split(':');
  const iat = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT', kid: id })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ iat, exp: iat + 300, aud: '/admin/' })).toString('base64url');
  const sig = crypto.createHmac('sha256', Buffer.from(secret, 'hex'))
    .update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${sig}`;
}

async function ghostAdminGet(endpoint, params = {}) {
  const url = new URL(`${GHOST_URL}/ghost/api/admin/${endpoint}/`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Ghost ${makeAdminToken()}` },
  });
  if (!res.ok) throw new Error(`Ghost Admin GET ${res.status}: ${await res.text()}`);
  return res.json();
}

async function ghostAdminPut(type, id, body) {
  const url = `${GHOST_URL}/ghost/api/admin/${type}/${id}/`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Ghost ${makeAdminToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Ghost PUT ${type}/${id} ${res.status}: ${await res.text()}`);
  return res.json();
}

function replaceAll(str, old, replacement) {
  if (!str) return str;
  return str.split(old).join(replacement);
}

async function fetchAllPosts() {
  let page = 1;
  let allPosts = [];
  while (true) {
    const data = await ghostAdminGet('posts', {
      limit: 100,
      page: String(page),
      formats: 'html,mobiledoc,lexical',
      fields: 'id,title,slug,html,mobiledoc,lexical,meta_description,custom_excerpt,updated_at',
    });
    allPosts = allPosts.concat(data.posts);
    if (!data.meta?.pagination?.next) break;
    page++;
  }
  return allPosts;
}

async function fetchAllPages() {
  let page = 1;
  let allPages = [];
  while (true) {
    const data = await ghostAdminGet('pages', {
      limit: 100,
      page: String(page),
      formats: 'html,mobiledoc,lexical',
      fields: 'id,title,slug,html,mobiledoc,lexical,meta_description,custom_excerpt,updated_at',
    });
    allPages = allPages.concat(data.pages);
    if (!data.meta?.pagination?.next) break;
    page++;
  }
  return allPages;
}

function hasOldLicense(item) {
  const fields = [item.html, item.mobiledoc, item.lexical, item.meta_description, item.custom_excerpt];
  return fields.some(f => f && f.includes(OLD_LICENSE));
}

async function fixItem(type, item) {
  const updates = {};
  let changed = false;

  // Fix in lexical (primary content format for newer Ghost)
  if (item.lexical && item.lexical.includes(OLD_LICENSE)) {
    updates.lexical = replaceAll(item.lexical, OLD_LICENSE, NEW_LICENSE);
    changed = true;
  }

  // Fix in mobiledoc (legacy content format)
  if (item.mobiledoc && item.mobiledoc.includes(OLD_LICENSE)) {
    updates.mobiledoc = replaceAll(item.mobiledoc, OLD_LICENSE, NEW_LICENSE);
    changed = true;
  }

  // Fix in meta_description
  if (item.meta_description && item.meta_description.includes(OLD_LICENSE)) {
    updates.meta_description = replaceAll(item.meta_description, OLD_LICENSE, NEW_LICENSE);
    changed = true;
  }

  // Fix in custom_excerpt
  if (item.custom_excerpt && item.custom_excerpt.includes(OLD_LICENSE)) {
    updates.custom_excerpt = replaceAll(item.custom_excerpt, OLD_LICENSE, NEW_LICENSE);
    changed = true;
  }

  if (!changed) return false;

  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would update ${type}/${item.slug}`);
    return true;
  }

  // Ghost requires updated_at for concurrency control
  updates.updated_at = item.updated_at;

  const body = { [type]: [{ ...updates }] };
  await ghostAdminPut(type, item.id, body);
  return true;
}

async function main() {
  console.log(`CSLB License Fix: #${OLD_LICENSE} → #${NEW_LICENSE}`);
  if (DRY_RUN) console.log('(Dry run — no changes will be made)\n');

  console.log('Fetching all posts...');
  const posts = await fetchAllPosts();
  console.log(`  Found ${posts.length} posts`);

  console.log('Fetching all pages...');
  const pages = await fetchAllPages();
  console.log(`  Found ${pages.length} pages\n`);

  let fixedCount = 0;

  // Fix posts
  const affectedPosts = posts.filter(hasOldLicense);
  console.log(`Posts containing #${OLD_LICENSE}: ${affectedPosts.length}`);
  for (const post of affectedPosts) {
    const fields = [];
    if (post.html?.includes(OLD_LICENSE)) fields.push('html');
    if (post.meta_description?.includes(OLD_LICENSE)) fields.push('meta_description');
    if (post.custom_excerpt?.includes(OLD_LICENSE)) fields.push('custom_excerpt');
    console.log(`  → ${post.slug} (${fields.join(', ')})`);
    if (await fixItem('posts', post)) fixedCount++;
  }

  // Fix pages
  const affectedPages = pages.filter(hasOldLicense);
  console.log(`\nPages containing #${OLD_LICENSE}: ${affectedPages.length}`);
  for (const page of affectedPages) {
    const fields = [];
    if (page.html?.includes(OLD_LICENSE)) fields.push('html');
    if (page.meta_description?.includes(OLD_LICENSE)) fields.push('meta_description');
    if (page.custom_excerpt?.includes(OLD_LICENSE)) fields.push('custom_excerpt');
    console.log(`  → ${page.slug} (${fields.join(', ')})`);
    if (await fixItem('pages', page)) fixedCount++;
  }

  console.log(`\n${DRY_RUN ? 'Would fix' : 'Fixed'}: ${fixedCount} items`);
  if (DRY_RUN && fixedCount > 0) {
    console.log('\nRun without --dry-run to apply changes.');
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
