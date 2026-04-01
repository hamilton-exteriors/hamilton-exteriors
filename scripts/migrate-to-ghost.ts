/**
 * Migrate static service area data files to Ghost CMS.
 *
 * Usage:
 *   npx tsx scripts/migrate-to-ghost.ts
 *
 * Requires GHOST_ADMIN_API_KEY in .env
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config();

const GHOST_URL = process.env.PUBLIC_GHOST_URL || 'https://ghost-production-42337.up.railway.app';
const ADMIN_KEY = process.env.GHOST_ADMIN_API_KEY || '';

if (!ADMIN_KEY || !ADMIN_KEY.includes(':')) {
  console.error('❌ Set GHOST_ADMIN_API_KEY in .env (format: id:secret)');
  process.exit(1);
}

/* ── Ghost Admin API JWT ────────────────────────────────── */

function createGhostJWT(): string {
  const [id, secret] = ADMIN_KEY.split(':');
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT', kid: id })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({
    iat: now,
    exp: now + 300, // 5 min
    aud: '/admin/',
  })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', Buffer.from(secret, 'hex'))
    .update(`${header}.${payload}`)
    .digest('base64url');
  return `${header}.${payload}.${signature}`;
}

async function ghostAdmin(method: string, endpoint: string, body?: unknown): Promise<any> {
  const token = createGhostJWT();
  const url = `${GHOST_URL}/ghost/api/admin/${endpoint}/`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Ghost ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ghost Admin API ${res.status}: ${text}`);
  }
  return res.json();
}

/* ── Ensure internal tags exist ─────────────────────────── */

async function ensureTag(name: string, slug: string): Promise<string> {
  // Ghost internal tags start with #
  try {
    const data = await ghostAdmin('GET', `tags/slug/${slug}`);
    return data.tags[0].id;
  } catch {
    // Create it
    const data = await ghostAdmin('POST', 'tags', {
      tags: [{ name, slug, visibility: 'internal' }],
    });
    return data.tags[0].id;
  }
}

/* ── Convert data to Ghost post ─────────────────────────── */

function stripImageMetadata(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;

  // Check if it's an Astro ImageMetadata object (has src, width, height, format)
  if ('src' in (obj as any) && 'width' in (obj as any) && 'format' in (obj as any)) {
    // Return just the export name — we'll resolve it back on the frontend
    return (obj as any)._exportName || 'heroBg';
  }

  if (Array.isArray(obj)) return obj.map(stripImageMetadata);

  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
    result[key] = stripImageMetadata(val);
  }
  return result;
}

function dataToGhostHtml(data: unknown): string {
  const json = JSON.stringify(data, null, 2);
  return `<!--kg-card-begin: html--><script type="application/json">${json}</script><!--kg-card-end: html-->`;
}

function htmlToMobiledoc(html: string): string {
  return JSON.stringify({
    version: '0.3.1',
    atoms: [],
    cards: [['html', { html }]],
    markups: [],
    sections: [[10, 0]],
  });
}

/* ── Migration ──────────────────────────────────────────── */

interface MigrationResult {
  slug: string;
  status: 'created' | 'updated' | 'skipped' | 'error';
  error?: string;
}

async function migrateCity(citySlug: string, tagId: string): Promise<MigrationResult> {
  const ghostSlug = `sa-city--${citySlug.replace(/\//g, '--')}`;

  try {
    // Dynamic import of the data file
    const fileName = path.basename(citySlug);
    const filePath = path.resolve(`src/data/service-areas/${fileName}.ts`);
    if (!fs.existsSync(filePath)) {
      return { slug: ghostSlug, status: 'skipped', error: 'File not found' };
    }

    const fileUrl = new URL(`file:///${filePath.replace(/\\/g, '/')}`).href;
    const mod = await import(fileUrl);
    const data = mod.data;
    if (!data) return { slug: ghostSlug, status: 'skipped', error: 'No data export' };

    // Strip ImageMetadata objects — they can't serialize to JSON
    const cleanData = stripImageMetadata(data);
    const html = dataToGhostHtml(cleanData);
    const mobiledoc = htmlToMobiledoc(html);

    const postPayload = {
      posts: [{
        title: `${data.city}, CA`,
        slug: ghostSlug,
        mobiledoc,
        status: 'published',
        tags: [{ id: tagId }],
        meta_title: data.title || `${data.city} Service Area | Hamilton Exteriors`,
        meta_description: data.description || '',
      }],
    };

    // Check if post already exists
    try {
      const existing = await ghostAdmin('GET', `posts/slug/${ghostSlug}`);
      if (existing.posts?.[0]) {
        // Update
        const postId = existing.posts[0].id;
        const updated_at = existing.posts[0].updated_at;
        await ghostAdmin('PUT', `posts/${postId}`, {
          posts: [{ ...postPayload.posts[0], updated_at }],
        });
        return { slug: ghostSlug, status: 'updated' };
      }
    } catch {
      // Doesn't exist yet, create it
    }

    await ghostAdmin('POST', 'posts', postPayload);
    return { slug: ghostSlug, status: 'created' };

  } catch (err: any) {
    return { slug: ghostSlug, status: 'error', error: err.message };
  }
}

async function migrateCounty(countySlug: string, tagId: string): Promise<MigrationResult> {
  const ghostSlug = `sa-county--${countySlug}`;

  try {
    const filePath = path.resolve(`src/data/counties/${countySlug}.ts`);
    if (!fs.existsSync(filePath)) {
      return { slug: ghostSlug, status: 'skipped', error: 'File not found' };
    }

    // County files import images which Node can't handle.
    // Read as text, strip imports, and eval the data object.
    let source = fs.readFileSync(filePath, 'utf-8');
    // Remove import lines
    source = source.replace(/^import\s+.*$/gm, '');
    // Replace image variable references with string keys
    source = source.replace(/image:\s*(\w+)/g, (_, name) => `image: '${name}'`);
    // Extract the data object between `= {` and the last `};`
    const dataMatch = source.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/);
    if (!dataMatch) return { slug: ghostSlug, status: 'skipped', error: 'Could not parse data' };

    let cleanData: any;
    try {
      // Use Function constructor to eval the object literal
      cleanData = new Function(`return (${dataMatch[1]})`)();
    } catch (e: any) {
      return { slug: ghostSlug, status: 'error', error: `Parse error: ${e.message}` };
    }
    const html = dataToGhostHtml(cleanData);
    const mobiledoc = htmlToMobiledoc(html);

    const postPayload = {
      posts: [{
        title: `${data.county}, ${data.state}`,
        slug: ghostSlug,
        mobiledoc,
        status: 'published',
        tags: [{ id: tagId }],
        meta_title: data.title || `${data.county} Service Area | Hamilton Exteriors`,
        meta_description: data.description || '',
      }],
    };

    try {
      const existing = await ghostAdmin('GET', `posts/slug/${ghostSlug}`);
      if (existing.posts?.[0]) {
        const postId = existing.posts[0].id;
        const updated_at = existing.posts[0].updated_at;
        await ghostAdmin('PUT', `posts/${postId}`, {
          posts: [{ ...postPayload.posts[0], updated_at }],
        });
        return { slug: ghostSlug, status: 'updated' };
      }
    } catch {
      // Create
    }

    await ghostAdmin('POST', 'posts', postPayload);
    return { slug: ghostSlug, status: 'created' };

  } catch (err: any) {
    return { slug: ghostSlug, status: 'error', error: err.message };
  }
}

async function main() {
  console.log('🚀 Migrating service area pages to Ghost CMS...\n');

  // Ensure tags exist
  console.log('Creating internal tags...');
  const cityTagId = await ensureTag('#service-area-city', 'hash-service-area-city');
  const countyTagId = await ensureTag('#service-area-county', 'hash-service-area-county');
  console.log(`  ✓ City tag: ${cityTagId}`);
  console.log(`  ✓ County tag: ${countyTagId}\n`);

  // Get all city data files
  const cityDir = path.resolve('src/data/service-areas');
  const cityFiles = fs.readdirSync(cityDir).filter(f => f.endsWith('.ts'));

  // Get all county data files
  const countyDir = path.resolve('src/data/counties');
  const countyFiles = fs.readdirSync(countyDir).filter(f => f.endsWith('.ts'));

  console.log(`Found ${cityFiles.length} city files and ${countyFiles.length} county files\n`);

  // Migrate counties first
  console.log('── Counties ──');
  for (const file of countyFiles) {
    const slug = file.replace('.ts', '');
    const result = await migrateCounty(slug, countyTagId);
    const icon = result.status === 'created' ? '✓' : result.status === 'updated' ? '↻' : result.status === 'skipped' ? '⊘' : '✗';
    console.log(`  ${icon} ${result.slug} → ${result.status}${result.error ? ` (${result.error})` : ''}`);
  }

  // Migrate cities
  console.log('\n── Cities ──');
  for (const file of cityFiles) {
    const slug = file.replace('.ts', '');
    // We need the county slug for the Ghost slug format
    // Read the file to get countySlug
    const filePath = path.resolve(cityDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const countyMatch = content.match(/countySlug:\s*['"]([^'"]+)['"]/);
    const countySlug = countyMatch?.[1] || 'unknown';

    const ghostSlug = `${countySlug}/${slug}`;
    const result = await migrateCity(ghostSlug, cityTagId);
    const icon = result.status === 'created' ? '✓' : result.status === 'updated' ? '↻' : result.status === 'skipped' ? '⊘' : '✗';
    console.log(`  ${icon} ${result.slug} → ${result.status}${result.error ? ` (${result.error})` : ''}`);
  }

  console.log('\n✅ Migration complete!');
}

main().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
