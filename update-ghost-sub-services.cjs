#!/usr/bin/env node
/**
 * update-ghost-sub-services.cjs
 *
 * Creates or updates Ghost CMS posts for all 24 sub-service pages.
 * Each post stores SubServiceData as JSON inside an HTML card,
 * matching the existing service-area pattern.
 *
 * Usage:
 *   node update-ghost-sub-services.cjs --dry-run   # preview, no writes
 *   node update-ghost-sub-services.cjs             # create/update posts
 */

const jwt = require('jsonwebtoken');

const GHOST_URL = 'https://ghost-production-42337.up.railway.app';
const ADMIN_KEY = '69c71d579c35510001523fba:2f9762c88acc7b71e89628048932a5ac6c1329bce7e72722a36218b500a07084';
const DRY_RUN = process.argv.includes('--dry-run');

// Internal Ghost tag for sub-service pages
const TAG_NAME = '#hash-sub-service';

function makeToken() {
  const [id, secret] = ADMIN_KEY.split(':');
  return jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id, algorithm: 'HS256', expiresIn: '5m', audience: '/admin/',
  });
}

function headers() {
  return { Authorization: 'Ghost ' + makeToken(), 'Content-Type': 'application/json' };
}

/**
 * Build Ghost slug from parent service + type slug.
 * e.g., roofing/metal → sub-roofing-metal
 */
function ghostSlug(parentService, typeSlug) {
  return `sub-${parentService}-${typeSlug}`;
}

/**
 * Build mobiledoc JSON containing the sub-service data as an HTML card.
 * Ghost stores content as mobiledoc; we embed our JSON in an html card.
 */
function buildMobiledoc(data) {
  const jsonStr = JSON.stringify(data);
  const html = `<script type="application/json">${jsonStr}</script>`;
  return JSON.stringify({
    version: '0.3.1',
    atoms: [],
    cards: [['html', { html }]],
    markups: [],
    sections: [[10, 0]],
    ghostVersion: '5.0',
  });
}

/**
 * Load sub-service data from the TS source file by evaluating it.
 * We import the built registry from the data file.
 */
async function loadSubServices() {
  // We can't directly require .ts files, so we read and parse the data manually.
  // Instead, use a simpler approach: inline the data directly.
  // Actually, let's use tsx to evaluate the module.
  try {
    // Try using tsx/ts-node
    const { execSync } = require('child_process');
    const script = `
      const { SUB_SERVICES } = require('./src/data/sub-services.ts');
      const output = {};
      for (const [key, val] of Object.entries(SUB_SERVICES)) {
        // Strip image metadata — Ghost doesn't need ImageMetadata objects
        const { heroImage, ...rest } = val;
        output[key] = rest;
      }
      process.stdout.write(JSON.stringify(output));
    `;
    const result = execSync(`npx tsx -e "${script.replace(/"/g, '\\"')}"`, {
      cwd: __dirname,
      encoding: 'utf-8',
      timeout: 30000,
    });
    return JSON.parse(result);
  } catch (e) {
    console.error('Failed to load sub-services via tsx, using inline extraction...');
    return extractSubServicesFromFile();
  }
}

/**
 * Fallback: extract sub-service data by reading the .ts file as text and
 * parsing each object. This is more resilient than requiring tsx.
 */
function extractSubServicesFromFile() {
  const fs = require('fs');
  const content = fs.readFileSync(__dirname + '/src/data/sub-services.ts', 'utf-8');

  // Extract the SUB_SERVICES registry keys
  const registryMatch = content.match(/export const SUB_SERVICES[^{]*\{([\s\S]*?)\n\};/);
  if (!registryMatch) throw new Error('Could not find SUB_SERVICES registry');

  const entries = {};
  const keyPattern = /'([^']+)':\s*(\w+)/g;
  let m;
  while ((m = keyPattern.exec(registryMatch[1])) !== null) {
    const key = m[1];
    const varName = m[2];
    entries[key] = varName;
  }

  // For each variable, extract its data
  const result = {};
  for (const [key, varName] of Object.entries(entries)) {
    const varPattern = new RegExp(
      `const ${varName}:\\s*SubServiceData\\s*=\\s*\\{([\\s\\S]*?)\\n\\};`,
    );
    const varMatch = content.match(varPattern);
    if (!varMatch) {
      console.warn(`Could not extract ${varName} for ${key}`);
      continue;
    }

    // Parse the object — extract string fields we need
    const block = varMatch[1];
    const getString = (field) => {
      const re = new RegExp(`${field}:\\s*'([^']*(?:\\\\.[^']*)*)'`);
      const match = block.match(re);
      return match ? match[1].replace(/\\'/g, "'") : '';
    };

    const getStringArray = (field) => {
      const re = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`, 'm');
      const match = block.match(re);
      if (!match) return [];
      const items = [];
      const strRe = /'\s*([\s\S]*?)\s*'/g;
      let s;
      while ((s = strRe.exec(match[1])) !== null) {
        items.push(s[1].replace(/\\'/g, "'").replace(/\\u(\w{4})/g, (_, hex) =>
          String.fromCharCode(parseInt(hex, 16))
        ));
      }
      return items;
    };

    const getKeyFacts = () => {
      const re = /keyFacts:\s*\[([\s\S]*?)\]/m;
      const match = block.match(re);
      if (!match) return [];
      const items = [];
      const itemRe = /\{\s*value:\s*'([^']*)'\s*,\s*label:\s*'([^']*)'\s*\}/g;
      let i;
      while ((i = itemRe.exec(match[1])) !== null) {
        items.push({ value: i[1], label: i[2] });
      }
      return items;
    };

    const getFaqs = () => {
      const re = /faqs:\s*\[([\s\S]*?)\]\s*,?\s*$/m;
      const match = block.match(re);
      if (!match) return [];
      const items = [];
      const faqRe = /question:\s*'([\s\S]*?)'\s*,\s*answer:\s*'([\s\S]*?)'\s*\}/g;
      let f;
      while ((f = faqRe.exec(match[1])) !== null) {
        items.push({
          question: f[1].replace(/\\'/g, "'").replace(/\\u(\w{4})/g, (_, hex) =>
            String.fromCharCode(parseInt(hex, 16))
          ),
          answer: f[2].replace(/\\'/g, "'").replace(/\\u(\w{4})/g, (_, hex) =>
            String.fromCharCode(parseInt(hex, 16))
          ),
        });
      }
      return items;
    };

    result[key] = {
      parentService: getString('parentService'),
      parentName: getString('parentName'),
      typeSlug: getString('typeSlug'),
      title: getString('title'),
      description: getString('description'),
      headline: getString('headline').replace(/\\n/g, '\n'),
      heroAlt: getString('heroAlt'),
      content: getStringArray('content'),
      keyFacts: getKeyFacts(),
      faqs: getFaqs(),
    };
  }

  return result;
}

async function ghostGet(endpoint, params = {}) {
  const url = new URL(`${GHOST_URL}/ghost/api/admin/${endpoint}/`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), { headers: headers() });
  if (!res.ok) throw new Error(`Ghost GET ${endpoint}: ${res.status}`);
  return res.json();
}

async function ghostPost(endpoint, body) {
  const res = await fetch(`${GHOST_URL}/ghost/api/admin/${endpoint}/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Ghost POST ${endpoint}: ${res.status} ${err.substring(0, 300)}`);
  }
  return res.json();
}

async function ghostPut(endpoint, body) {
  const res = await fetch(`${GHOST_URL}/ghost/api/admin/${endpoint}/`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Ghost PUT ${endpoint}: ${res.status} ${err.substring(0, 300)}`);
  }
  return res.json();
}

async function ensureTag() {
  // Check if tag exists
  const data = await ghostGet('tags', { filter: `name:${TAG_NAME}`, limit: '1' });
  if (data.tags?.length > 0) return data.tags[0];

  // Create it
  if (DRY_RUN) {
    console.log(`[DRY] Would create tag: ${TAG_NAME}`);
    return { id: 'dry-run-tag', name: TAG_NAME, slug: 'hash-sub-service' };
  }
  const result = await ghostPost('tags', { tags: [{ name: TAG_NAME }] });
  console.log(`Created tag: ${TAG_NAME} (${result.tags[0].id})`);
  return result.tags[0];
}

async function run() {
  console.log(DRY_RUN ? '=== DRY RUN ===' : '=== LIVE RUN ===');

  // Load sub-service data
  console.log('Loading sub-service data...');
  const subServices = extractSubServicesFromFile();
  const keys = Object.keys(subServices);
  console.log(`Found ${keys.length} sub-services`);

  // Ensure tag exists
  const tag = await ensureTag();

  // Fetch existing sub-service posts
  console.log('Fetching existing Ghost posts...');
  const existingPosts = new Map();
  let page = 1;
  let more = true;
  while (more) {
    const data = await ghostGet('posts', {
      filter: `tag:hash-sub-service`,
      formats: 'mobiledoc',
      limit: '100',
      page: String(page),
    });
    for (const post of data.posts || []) {
      existingPosts.set(post.slug, post);
    }
    more = (data.posts?.length || 0) === 100;
    page++;
  }
  console.log(`Found ${existingPosts.size} existing sub-service posts in Ghost`);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const key of keys) {
    const data = subServices[key];
    const slug = ghostSlug(data.parentService, data.typeSlug);
    const mobiledoc = buildMobiledoc(data);

    const existing = existingPosts.get(slug);

    if (existing) {
      // Update existing post
      if (DRY_RUN) {
        console.log(`[DRY] UPDATE ${slug} — ${data.title}`);
        updated++;
        continue;
      }

      try {
        await ghostPut(`posts/${existing.id}`, {
          posts: [{
            mobiledoc,
            meta_title: data.title,
            meta_description: data.description,
            updated_at: existing.updated_at,
          }],
        });
        console.log(`UPDATE ${slug}`);
        updated++;
      } catch (e) {
        console.error(`FAIL UPDATE ${slug}: ${e.message}`);
      }
    } else {
      // Create new post
      if (DRY_RUN) {
        console.log(`[DRY] CREATE ${slug} — ${data.title}`);
        created++;
        continue;
      }

      try {
        await ghostPost('posts', {
          posts: [{
            title: data.title,
            slug,
            mobiledoc,
            status: 'published',
            visibility: 'public',
            meta_title: data.title,
            meta_description: data.description,
            tags: [{ id: tag.id }],
          }],
        });
        console.log(`CREATE ${slug}`);
        created++;
      } catch (e) {
        console.error(`FAIL CREATE ${slug}: ${e.message}`);
      }
    }

    // Rate limit: 500ms between requests
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\nDone. Created: ${created}, Updated: ${updated}, Skipped: ${skipped}`);
}

run().catch(e => { console.error(e); process.exit(1); });
