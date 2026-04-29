/**
 * queue.mjs — file-backed job queue + state.
 *
 * Schema (single JSON file at $DATA_DIR/jobs.json):
 *   { jobs: [{ slug, status, queuedAt, startedAt, completedAt, error, model, cost, attempts }],
 *     totals: { ... } }
 *
 * Status values: pending | running | passed | qa_failed | error
 *
 * Operations are atomic via tmp-file rename. Concurrency-safe within a single
 * Node process (workers all share the in-memory cache + write lock).
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'fs';
import { join, dirname } from 'path';

let DATA_DIR;
let JOBS_PATH;
let cache = null;
const writeLock = { busy: false, queue: [] };

export function init(dataDir) {
  DATA_DIR = dataDir;
  JOBS_PATH = join(DATA_DIR, 'jobs.json');
  mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(JOBS_PATH)) {
    writeFileSync(JOBS_PATH, JSON.stringify({ jobs: [], totals: {} }, null, 2));
  }
  cache = JSON.parse(readFileSync(JOBS_PATH, 'utf8'));
}

async function withLock(fn) {
  if (writeLock.busy) await new Promise(r => writeLock.queue.push(r));
  writeLock.busy = true;
  try { return await fn(); }
  finally {
    writeLock.busy = false;
    const next = writeLock.queue.shift();
    if (next) next();
  }
}

function persist() {
  const tmp = JOBS_PATH + '.tmp';
  writeFileSync(tmp, JSON.stringify(cache, null, 2));
  renameSync(tmp, JOBS_PATH);
}

export function getJobs() {
  return cache.jobs;
}

export function getJob(slug) {
  return cache.jobs.find(j => j.slug === slug);
}

export async function enqueue(slug, opts = {}) {
  return withLock(async () => {
    const existing = cache.jobs.find(j => j.slug === slug);
    if (existing && existing.status === 'running') {
      return existing; // don't re-queue running jobs
    }
    if (existing) {
      // Reset and re-queue
      existing.status = 'pending';
      existing.queuedAt = new Date().toISOString();
      existing.startedAt = null;
      existing.completedAt = null;
      existing.error = null;
      existing.attempts = (existing.attempts || 0);
      if (opts.model) existing.model = opts.model;
      persist();
      return existing;
    }
    const job = {
      slug,
      status: 'pending',
      queuedAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      error: null,
      attempts: 0,
      cost: 0,
      model: opts.model || null,
    };
    cache.jobs.push(job);
    persist();
    return job;
  });
}

export async function claimNext() {
  return withLock(async () => {
    const job = cache.jobs.find(j => j.status === 'pending');
    if (!job) return null;
    job.status = 'running';
    job.startedAt = new Date().toISOString();
    job.attempts++;
    persist();
    return job;
  });
}

export async function complete(slug, result) {
  return withLock(async () => {
    const job = cache.jobs.find(j => j.slug === slug);
    if (!job) return;
    job.status = result.status || 'passed';
    job.completedAt = new Date().toISOString();
    job.cost = (job.cost || 0) + (result.cost || 0);
    job.model = result.model || job.model;
    job.result = result.summary || null;
    persist();
  });
}

export async function fail(slug, error) {
  return withLock(async () => {
    const job = cache.jobs.find(j => j.slug === slug);
    if (!job) return;
    job.status = 'error';
    job.completedAt = new Date().toISOString();
    job.error = String(error).slice(0, 1000);
    persist();
  });
}

export function summary() {
  const counts = {};
  for (const j of cache.jobs) counts[j.status] = (counts[j.status] || 0) + 1;
  const totalCost = cache.jobs.reduce((a, j) => a + (j.cost || 0), 0);
  return { counts, totalCost, total: cache.jobs.length };
}
