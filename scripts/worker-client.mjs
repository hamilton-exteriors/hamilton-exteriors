#!/usr/bin/env node
/**
 * worker-client.mjs — local CLI for the seo-worker Railway service.
 *
 * Commands:
 *   enqueue <slug...>             queue specific page slugs
 *   enqueue-city <citySlug>       queue all 13 pages for a city
 *   enqueue-cities <city1,city2>  queue many cities
 *   poll                          watch all running jobs until done
 *   pull-drafts <slug...>         download drafts to local seo/drafts/
 *   pull-all-drafts               download every passed draft
 *   publish <slug...>             call /publish on the worker for each slug
 *   status                        print queue summary + recent jobs
 *
 * Env required:
 *   WORKER_URL              e.g. https://seo-worker.up.railway.app
 *   WORKER_AUTH_TOKEN       same token configured on the worker
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const SEO_LOCAL = join(REPO_ROOT, 'seo');
const URL = process.env.WORKER_URL?.replace(/\/$/, '');
const TOKEN = process.env.WORKER_AUTH_TOKEN;
if (!URL) { console.error('WORKER_URL not set'); process.exit(2); }

const args = process.argv.slice(2);
const cmd = args[0];
const rest = args.slice(1);

async function api(method, path, body) {
  const res = await fetch(`${URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status}: ${JSON.stringify(data).slice(0, 300)}`);
    return data;
  }
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status}: ${text.slice(0, 300)}`);
  return text;
}

function citySlugsForCity(city) {
  const sa = readdirSync(join(SEO_LOCAL, 'targets'))
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace(/\.json$/, ''));
  return sa.filter(slug =>
    slug === `sa-city__${city}` ||
    slug.startsWith(`sa-city-service__${city}__`) ||
    slug.startsWith(`cost-blog__${city}__`)
  );
}

async function enqueueAll(slugs) {
  const r = await api('POST', '/enqueue-batch', { slugs });
  console.log(`enqueued ${r.enqueued} (skipped: ${r.skipped?.length || 0})`);
  if (r.skipped?.length) for (const s of r.skipped) console.log(`  skip ${s.slug}: ${s.reason}`);
}

switch (cmd) {
  case 'enqueue':
    if (!rest.length) { console.error('usage: enqueue <slug...>'); process.exit(2); }
    await enqueueAll(rest);
    break;

  case 'enqueue-city': {
    const city = rest[0];
    if (!city) { console.error('usage: enqueue-city <citySlug>'); process.exit(2); }
    const slugs = citySlugsForCity(city);
    console.log(`Found ${slugs.length} targets for ${city}`);
    await enqueueAll(slugs);
    break;
  }

  case 'enqueue-cities': {
    const cities = (rest[0] || '').split(',').filter(Boolean);
    if (!cities.length) { console.error('usage: enqueue-cities city1,city2,city3'); process.exit(2); }
    const all = [];
    for (const c of cities) {
      const slugs = citySlugsForCity(c);
      console.log(`  ${c}: ${slugs.length} targets`);
      all.push(...slugs);
    }
    await enqueueAll(all);
    break;
  }

  case 'poll': {
    const intervalMs = parseInt(rest[0] || '15000', 10);
    let prev = JSON.stringify({});
    while (true) {
      const r = await api('GET', '/jobs');
      const s = r.summary;
      const line = `[${new Date().toISOString().slice(11,19)}] total ${s.total} | ${Object.entries(s.counts).map(([k,v])=>`${k}:${v}`).join(' | ')} | $${s.totalCost.toFixed(3)}`;
      console.log(line);
      if (!s.counts.pending && !s.counts.running) {
        console.log('\nAll jobs settled. Final:');
        for (const j of r.jobs) console.log(`  ${j.status.padEnd(10)} ${j.slug.padEnd(60)} ${j.cost ? '$'+j.cost.toFixed(4) : ''} ${j.error ? 'ERR: '+j.error.slice(0,60) : ''}`);
        break;
      }
      await new Promise(r => setTimeout(r, intervalMs));
    }
    break;
  }

  case 'pull-drafts': {
    if (!rest.length) { console.error('usage: pull-drafts <slug...>'); process.exit(2); }
    mkdirSync(join(SEO_LOCAL, 'drafts'), { recursive: true });
    for (const slug of rest) {
      try {
        const md = await api('GET', `/drafts/${slug}`);
        writeFileSync(join(SEO_LOCAL, 'drafts', `${slug}.md`), md);
        console.log(`pulled ${slug}.md (${md.length} bytes)`);
      } catch (e) { console.log(`fail ${slug}: ${e.message}`); }
    }
    break;
  }

  case 'pull-all-drafts': {
    const r = await api('GET', '/jobs?status=passed');
    mkdirSync(join(SEO_LOCAL, 'drafts'), { recursive: true });
    let ok = 0;
    for (const j of r.jobs) {
      try {
        const md = await api('GET', `/drafts/${j.slug}`);
        writeFileSync(join(SEO_LOCAL, 'drafts', `${j.slug}.md`), md);
        ok++;
      } catch (e) { console.log(`fail ${j.slug}: ${e.message}`); }
    }
    console.log(`pulled ${ok}/${r.jobs.length} passed drafts`);
    break;
  }

  case 'publish': {
    if (!rest.length) { console.error('usage: publish <slug...>'); process.exit(2); }
    for (const slug of rest) {
      try {
        const r = await api('POST', `/publish/${slug}`, {});
        console.log(`publish ${slug}: ok`);
      } catch (e) { console.log(`publish ${slug}: ${e.message}`); }
    }
    break;
  }

  case 'status': {
    const r = await api('GET', '/jobs');
    console.log('Summary:', JSON.stringify(r.summary, null, 2));
    console.log('\nRecent jobs:');
    for (const j of r.jobs.slice(-20)) {
      console.log(`  ${j.status.padEnd(10)} ${j.slug.padEnd(60)} ${j.cost ? '$'+j.cost.toFixed(4) : ''}`);
    }
    break;
  }

  case 'health': {
    const r = await api('GET', '/health');
    console.log(JSON.stringify(r, null, 2));
    break;
  }

  default:
    console.error(`Unknown command: ${cmd || '(none)'}\n\nCommands:`);
    console.error('  enqueue <slug...>             queue specific page slugs');
    console.error('  enqueue-city <citySlug>       queue all 13 pages for a city');
    console.error('  enqueue-cities <c1,c2,c3>     queue many cities');
    console.error('  poll [intervalMs]             watch jobs until done');
    console.error('  pull-drafts <slug...>         download drafts');
    console.error('  pull-all-drafts               download every passed draft');
    console.error('  publish <slug...>             trigger ghost-publish on worker');
    console.error('  status                        print queue summary');
    console.error('  health                        worker /health');
    process.exit(2);
}
