#!/usr/bin/env node
/**
 * server.mjs — Express HTTP API + worker pool for the SEO pipeline.
 *
 * HTTP API:
 *   POST /enqueue          { slug, model? }   queue a single page
 *   POST /enqueue-batch    { slugs, model? }  queue many at once
 *   GET  /jobs                                list all jobs (status)
 *   GET  /jobs/:slug                          single job state
 *   GET  /drafts/:slug                        return draft markdown
 *   GET  /qa/:slug                            return QA result JSON
 *   GET  /health                              { ok, workers, queueDepth, summary }
 *   POST /publish/:slug                       run ghost-publish for a passed page
 *
 * Auth: Bearer token from WORKER_AUTH_TOKEN env var. All endpoints require it
 * except /health.
 *
 * Concurrency: WORKER_CONCURRENCY env var (default 3). Each worker pulls one
 * job at a time and runs the full pipeline.
 *
 * Storage: $DATA_DIR (default /data on Railway, ./data locally) holds the
 * jobs queue and is the same path the seo/ pipeline writes drafts to.
 */

import express from 'express';
import { readFileSync, existsSync, statSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';
import { init as initQueue, enqueue, claimNext, complete, fail, getJob, getJobs, summary } from './queue.mjs';
import { runPage } from './run-page.mjs';

const PORT = parseInt(process.env.PORT || '3030', 10);
const DATA_DIR = process.env.DATA_DIR || resolve(import.meta.dirname, 'data');
const REPO_ROOT = resolve(import.meta.dirname, '..');
// SEO_ROOT controls where drafts/serps/competitors/teardowns are written.
// In container: point to /data/seo so output survives container restarts.
// On startup, sync read-only sources (voice-corpus, brand-voice.md, etc.)
// from the image-baked /app/seo into /data/seo if not already there.
const SEO_ROOT = process.env.SEO_ROOT || resolve(import.meta.dirname, '..', 'seo');
const SEO_SOURCE = process.env.SEO_SOURCE || resolve(import.meta.dirname, '..', 'seo');
const WORKER_CONCURRENCY = parseInt(process.env.WORKER_CONCURRENCY || '3', 10);
const AUTH_TOKEN = process.env.WORKER_AUTH_TOKEN;

if (!AUTH_TOKEN) console.warn('WORKER_AUTH_TOKEN not set — API is OPEN. Set it in production.');

// Bootstrap SEO_ROOT from SEO_SOURCE on first run (in container, /data/seo
// starts empty; we copy taxonomy + voice corpus from the image).
import { existsSync as _ex, mkdirSync as _mk, cpSync } from 'fs';
import { join as _j } from 'path';
if (SEO_ROOT !== SEO_SOURCE && _ex(SEO_SOURCE)) {
  _mk(SEO_ROOT, { recursive: true });
  for (const dir of ['voice-corpus', 'data-spine', 'targets']) {
    const dst = _j(SEO_ROOT, dir);
    if (!_ex(dst) && _ex(_j(SEO_SOURCE, dir))) {
      cpSync(_j(SEO_SOURCE, dir), dst, { recursive: true });
      console.log(`[bootstrap] synced ${dir} -> ${dst}`);
    }
  }
  for (const file of ['brand-voice.md', 'content-writing-standards.md', 'cities.json', 'services.json', 'agent-system-prompt.md', 'cross-model-gate.md']) {
    const dst = _j(SEO_ROOT, file);
    if (!_ex(dst) && _ex(_j(SEO_SOURCE, file))) {
      cpSync(_j(SEO_SOURCE, file), dst);
      console.log(`[bootstrap] synced ${file} -> ${dst}`);
    }
  }
}

initQueue(DATA_DIR);

const app = express();
app.use(express.json({ limit: '10mb' }));

// Auth middleware (skip /health)
app.use((req, res, next) => {
  if (req.path === '/health' || req.path === '/') return next();
  if (!AUTH_TOKEN) return next(); // dev mode
  const got = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (got !== AUTH_TOKEN) return res.status(401).json({ error: 'unauthorized' });
  next();
});

app.get('/', (req, res) => {
  res.json({ service: 'hamilton-seo-worker', version: '1.0.0', endpoints: [
    'POST /enqueue', 'POST /enqueue-batch', 'GET /jobs', 'GET /jobs/:slug',
    'GET /drafts/:slug', 'GET /qa/:slug', 'POST /publish/:slug', 'GET /health',
  ] });
});

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    workers: WORKER_CONCURRENCY,
    summary: summary(),
    dataDir: DATA_DIR,
    seoRoot: SEO_ROOT,
  });
});

app.post('/enqueue', async (req, res) => {
  const { slug, model } = req.body || {};
  if (!slug) return res.status(400).json({ error: 'slug required' });
  if (!existsSync(join(SEO_ROOT, 'targets', `${slug}.json`))) {
    return res.status(404).json({ error: `target ${slug} not found` });
  }
  const job = await enqueue(slug, { model });
  res.json({ enqueued: job });
});

app.post('/enqueue-batch', async (req, res) => {
  const { slugs, model } = req.body || {};
  if (!Array.isArray(slugs) || !slugs.length) return res.status(400).json({ error: 'slugs[] required' });
  const enqueued = [];
  const skipped = [];
  for (const slug of slugs) {
    if (!existsSync(join(SEO_ROOT, 'targets', `${slug}.json`))) {
      skipped.push({ slug, reason: 'target not found' });
      continue;
    }
    enqueued.push(await enqueue(slug, { model }));
  }
  res.json({ enqueued: enqueued.length, skipped });
});

app.get('/jobs', (req, res) => {
  const status = req.query.status;
  const jobs = getJobs().filter(j => !status || j.status === status);
  res.json({ jobs, summary: summary() });
});

app.get('/jobs/:slug', (req, res) => {
  const job = getJob(req.params.slug);
  if (!job) return res.status(404).json({ error: 'job not found' });
  res.json(job);
});

app.get('/drafts/:slug', (req, res) => {
  const path = join(SEO_ROOT, 'drafts', `${req.params.slug}.md`);
  if (!existsSync(path)) return res.status(404).json({ error: 'draft not found' });
  res.type('text/markdown').send(readFileSync(path, 'utf8'));
});

app.get('/qa/:slug', (req, res) => {
  const path = join(SEO_ROOT, 'drafts', `${req.params.slug}.qa.json`);
  if (!existsSync(path)) return res.status(404).json({ error: 'qa not found' });
  res.type('application/json').send(readFileSync(path, 'utf8'));
});

app.post('/publish/:slug', (req, res) => {
  try {
    const out = execSync(`node scripts/ghost-publish.mjs --target ${req.params.slug} --force`, {
      cwd: REPO_ROOT, encoding: 'utf8', timeout: 60000,
    });
    res.json({ ok: true, output: out });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message).slice(0, 1000), stderr: e.stderr?.toString().slice(0, 1000) });
  }
});

// ─── Worker pool ──────────────────────────────────────────────────────────
const activeWorkers = new Set();
async function workerLoop(id) {
  while (true) {
    const job = await claimNext();
    if (!job) {
      await new Promise(r => setTimeout(r, 2000));
      continue;
    }
    console.log(`[worker-${id}] claim ${job.slug}`);
    activeWorkers.add(job.slug);
    try {
      const result = await runPage(job.slug, {
        seoRoot: SEO_ROOT,
        log: (...a) => console.log(`[worker-${id}][${job.slug}]`, ...a),
        model: job.model,
      });
      await complete(job.slug, {
        status: result.status, cost: result.cost, model: result.steps?.generation?.model,
        summary: { wordCount: result.steps?.generation?.wordCount, qaPass: result.steps?.qa?.pass },
      });
      console.log(`[worker-${id}] done ${job.slug}: ${result.status}`);
    } catch (e) {
      await fail(job.slug, e.message);
      console.error(`[worker-${id}] failed ${job.slug}:`, e.message);
    } finally {
      activeWorkers.delete(job.slug);
    }
  }
}

for (let i = 0; i < WORKER_CONCURRENCY; i++) {
  workerLoop(i + 1).catch(e => console.error(`worker-${i+1} loop crashed:`, e));
}

app.listen(PORT, () => {
  console.log(`seo-worker listening on :${PORT}`);
  console.log(`workers: ${WORKER_CONCURRENCY}, dataDir: ${DATA_DIR}, seoRoot: ${SEO_ROOT}`);
});
