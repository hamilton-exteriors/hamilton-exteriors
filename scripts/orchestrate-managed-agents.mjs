#!/usr/bin/env node
/**
 * orchestrate-managed-agents.mjs — local coordinator for the SEO swarm.
 *
 * Defines the per-page Agent + Environment via the Anthropic Managed Agents
 * beta API (header: managed-agents-2026-04-01), then dispatches one Session
 * per pending target file in waves of 50 concurrent.
 *
 * Modes:
 *   --pilot          run only Phase 1 pilot (Oakland, 10 pages)
 *   --service ROOF   run only targets where service === ROOF
 *   --city CITY      run only targets where citySlug === CITY
 *   --pageType TYPE  run only specific page type
 *   --limit N        cap total sessions at N
 *   --dry-run        list pending targets, don't spawn sessions
 *   --concurrency N  override default 50
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY
 *   GHOST_ADMIN_API_KEY (already in .env)
 *   DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD
 *
 * Read state:
 *   seo/targets/*.json   pending = status:pending OR (status:failed AND iterations<3)
 *
 * Write state:
 *   seo/targets/{pageSlug}.json   updated by each session via mounted file I/O
 *   seo/dashboard.json            orchestration metrics (wave time, success rate)
 *   seo/failures.jsonl            session-level failures
 *
 * Beta caveats:
 *   The exact Managed Agents SDK shape is in flux. This file uses the shape
 *   documented at platform.claude.com/docs/en/managed-agents (April 2026 beta).
 *   If the SDK rejects calls, see the FALLBACK section below for the Inngest
 *   path which uses the same per-page agent prompt against a stable API.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, appendFileSync, statSync } from 'fs';
import { resolve, join } from 'path';

// SDK only imported when actually running. Dry-run mode works without the
// package installed so users can preview targets before committing to install.
let Anthropic;

const REPO_ROOT = resolve(import.meta.dirname, '..');
const SEO = join(REPO_ROOT, 'seo');
const TARGETS = join(SEO, 'targets');
const DASHBOARD = join(SEO, 'dashboard.json');
const FAILURES = join(SEO, 'failures.jsonl');

const args = parseArgs(process.argv.slice(2));
const CONCURRENCY = parseInt(args.concurrency || '50', 10);
const DRY_RUN = !!args['dry-run'];
const LIMIT = args.limit ? parseInt(args.limit, 10) : Infinity;

const PILOT_CITIES = ['oakland-ca'];
const PILOT_PAGE_TYPES_FOR_CITY = ['service-area-city', 'service-area-city-service', 'cost-blog'];

let client;
async function initClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not set'); process.exit(1);
  }
  Anthropic = (await import('@anthropic-ai/sdk')).default;
  client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    defaultHeaders: { 'anthropic-beta': 'managed-agents-2026-04-01' },
  });
}

// ─────────────────────────────────────────────────────────────────────────
// Load + filter pending targets
// ─────────────────────────────────────────────────────────────────────────
function loadPendingTargets() {
  const files = readdirSync(TARGETS).filter(f => f.endsWith('.json'));
  const pending = [];
  for (const f of files) {
    const t = JSON.parse(readFileSync(join(TARGETS, f), 'utf8'));
    if (args.pilot) {
      if (!PILOT_CITIES.includes(t.citySlug)) continue;
      if (!PILOT_PAGE_TYPES_FOR_CITY.includes(t.pageType)) continue;
    }
    if (args.service && t.service !== args.service) continue;
    if (args.city && t.citySlug !== args.city) continue;
    if (args.pageType && t.pageType !== args.pageType) continue;

    const eligible = t.status === 'pending'
      || (t.status === 'failed' && (t.iterations || 0) < 3);
    if (!eligible) continue;
    pending.push(t);
  }
  return pending;
}

const pending = loadPendingTargets().slice(0, LIMIT);
console.log(`Pending: ${pending.length} targets (concurrency=${CONCURRENCY}, dry-run=${DRY_RUN})`);

if (DRY_RUN) {
  for (const t of pending.slice(0, 30)) {
    console.log(`  [${t.pageType}] ${t.pageSlug}  →  ${t.pageUrl}`);
  }
  if (pending.length > 30) console.log(`  ... and ${pending.length - 30} more`);
  process.exit(0);
}

if (!pending.length) { console.log('No pending targets. Exiting.'); process.exit(0); }

// ─────────────────────────────────────────────────────────────────────────
// 1. Define / reuse the Agent
// ─────────────────────────────────────────────────────────────────────────
const AGENT_NAME = 'hamilton-seo-page-agent';
const ENV_NAME = 'hamilton-seo-env';
const SYSTEM_PROMPT = readFileSync(join(SEO, 'agent-system-prompt.md'), 'utf8');

async function ensureAgent() {
  // List existing agents; reuse if our agent already exists
  const existing = await client.beta.managedAgents.agents.list?.({ name: AGENT_NAME }).catch(() => null);
  if (existing?.data?.length) {
    const found = existing.data.find(a => a.name === AGENT_NAME);
    if (found) {
      // Update system prompt if it changed
      await client.beta.managedAgents.agents.update?.(found.id, {
        systemPrompt: SYSTEM_PROMPT,
        model: 'claude-sonnet-4-6',
      }).catch(() => null);
      return found.id;
    }
  }
  const created = await client.beta.managedAgents.agents.create({
    name: AGENT_NAME,
    model: 'claude-sonnet-4-6',
    systemPrompt: SYSTEM_PROMPT,
    tools: [
      { type: 'mcp_server', name: 'dataforseo', config: {
        url: process.env.DATAFORSEO_MCP_URL || 'https://mcp.dataforseo.com',
        auth: { type: 'basic', username: process.env.DATAFORSEO_LOGIN, password: process.env.DATAFORSEO_PASSWORD },
      } },
      { type: 'mcp_server', name: 'firecrawl', config: {
        url: process.env.FIRECRAWL_MCP_URL || 'https://mcp.firecrawl.dev',
        auth: { type: 'bearer', token: process.env.FIRECRAWL_API_KEY },
      } },
      { type: 'web_fetch' },
      { type: 'bash' },
      { type: 'edit' },
      { type: 'write' },
    ],
  });
  return created.id;
}

async function ensureEnvironment() {
  const existing = await client.beta.managedAgents.environments.list?.({ name: ENV_NAME }).catch(() => null);
  if (existing?.data?.length) {
    const found = existing.data.find(e => e.name === ENV_NAME);
    if (found) return found.id;
  }
  const created = await client.beta.managedAgents.environments.create({
    name: ENV_NAME,
    image: 'node:22-bookworm',
    files: [
      { path: '/seo/data-spine/', source: { type: 'upload', path: join(SEO, 'data-spine') } },
      { path: '/seo/voice-corpus/', source: { type: 'upload', path: join(SEO, 'voice-corpus') } },
      { path: '/seo/brand-voice.md', source: { type: 'upload', path: join(SEO, 'brand-voice.md') } },
      { path: '/seo/content-writing-standards.md', source: { type: 'upload', path: join(SEO, 'content-writing-standards.md') } },
      { path: '/seo/cross-model-gate.md', source: { type: 'upload', path: join(SEO, 'cross-model-gate.md') } },
      { path: '/scripts/g7-gate.mjs', source: { type: 'upload', path: join(REPO_ROOT, 'scripts', 'g7-gate.mjs') } },
      { path: '/seo/cities.json', source: { type: 'upload', path: join(SEO, 'cities.json') } },
      { path: '/seo/services.json', source: { type: 'upload', path: join(SEO, 'services.json') } },
      { path: '/scripts/qa-page.mjs', source: { type: 'upload', path: join(REPO_ROOT, 'scripts', 'qa-page.mjs') } },
    ],
    secrets: [
      'ANTHROPIC_API_KEY',
      'GHOST_ADMIN_API_KEY',
      'DATAFORSEO_LOGIN',
      'DATAFORSEO_PASSWORD',
      'FIRECRAWL_API_KEY',
      'DEEPINFRA_API_KEY',  // G7 cross-model gate via Gemini 2.5 Flash on DeepInfra
      'GSC_SERVICE_ACCOUNT_JSON',
    ],
    network: {
      allowDomains: [
        'api.dataforseo.com',
        'mcp.dataforseo.com',
        'mcp.firecrawl.dev',
        'api.firecrawl.dev',
        'ghost-production-42337.up.railway.app',
        'hamilton-exteriors.com',
        'searchconsole.googleapis.com',
        'www.googleapis.com',
        'oauth2.googleapis.com',
        'api.indexnow.org',
        // City building dept domains the agent may fetch
        '*.gov', '*.org', '*.us', '*.ca.gov',
      ],
    },
  });
  return created.id;
}

// ─────────────────────────────────────────────────────────────────────────
// 2. Dispatch Sessions in waves
// ─────────────────────────────────────────────────────────────────────────
async function runOneTarget(agentId, environmentId, target) {
  const t0 = Date.now();
  const session = await client.beta.managedAgents.sessions.create({
    agentId, environmentId,
    metadata: { pageSlug: target.pageSlug, pageType: target.pageType },
  });

  // Send the kickoff message
  await client.beta.managedAgents.sessions.events.create(session.id, {
    type: 'user_message',
    content: `Run the per-page SEO loop for target file: seo/targets/${target.pageSlug}.json\n\nWhen complete, write back the updated target file with status: published OR failed. Exit when done.`,
  });

  // Wait for completion via polling (SSE preferred but polling is simpler)
  let status = 'running';
  let final = null;
  while (status === 'running' || status === 'pending') {
    await sleep(15_000);
    const s = await client.beta.managedAgents.sessions.retrieve(session.id);
    status = s.status;
    final = s;
    if (Date.now() - t0 > 30 * 60_000) {
      // 30-min hard timeout per page
      await client.beta.managedAgents.sessions.cancel?.(session.id).catch(() => null);
      throw new Error('Session timeout after 30 minutes');
    }
  }

  return {
    sessionId: session.id,
    status: final?.status,
    durationMs: Date.now() - t0,
    error: final?.error || null,
  };
}

async function main() {
  await initClient();
  console.log('Ensuring Agent + Environment...');
  const [agentId, environmentId] = await Promise.all([ensureAgent(), ensureEnvironment()]);
  console.log(`  agent: ${agentId}\n  env:   ${environmentId}`);

  const results = { ok: 0, failed: 0, durations: [] };
  const start = Date.now();

  // Process in waves of CONCURRENCY
  for (let i = 0; i < pending.length; i += CONCURRENCY) {
    const wave = pending.slice(i, i + CONCURRENCY);
    console.log(`\nWave ${Math.floor(i / CONCURRENCY) + 1}: ${wave.length} sessions...`);

    const settled = await Promise.allSettled(
      wave.map(t => runOneTarget(agentId, environmentId, t).then(r => ({ target: t, result: r })))
    );

    for (const s of settled) {
      if (s.status === 'fulfilled' && s.value.result.status === 'completed') {
        results.ok++;
        results.durations.push(s.value.result.durationMs);
      } else {
        results.failed++;
        const target = s.status === 'fulfilled' ? s.value.target : null;
        const err = s.status === 'fulfilled' ? s.value.result.error : s.reason?.message;
        appendFileSync(FAILURES, JSON.stringify({
          at: new Date().toISOString(),
          pageSlug: target?.pageSlug,
          error: String(err),
        }) + '\n');
      }
    }

    // Update dashboard each wave
    writeFileSync(DASHBOARD, JSON.stringify({
      lastWaveAt: new Date().toISOString(),
      ok: results.ok, failed: results.failed,
      pending: pending.length - i - wave.length,
      avgDurationMs: results.durations.length
        ? Math.round(results.durations.reduce((a, b) => a + b, 0) / results.durations.length)
        : null,
    }, null, 2));

    console.log(`  wave done: ${settled.filter(x => x.status === 'fulfilled').length} resolved`);
  }

  const totalSec = Math.round((Date.now() - start) / 1000);
  console.log(`\nDone. ${results.ok} ok, ${results.failed} failed in ${totalSec}s`);
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

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

main().catch(e => { console.error(e); process.exit(1); });
