#!/usr/bin/env node
/**
 * monitor-page.mjs — checks indexation + ranking for published pages at
 * T+14d, T+30d, T+60d milestones. Updates target file metrics. Flags pages
 * that should re-enter the agent loop.
 *
 * Reads:
 *   seo/monitor-queue.jsonl          one row per published page
 *   seo/targets/{pageSlug}.json       reads primaryKeywords, writes metrics
 *
 * Writes:
 *   seo/targets/{pageSlug}.json       metrics.{indexedAt, t14, t30, t60}
 *   seo/monitor-queue.jsonl           rewrites with completed entries removed
 *   seo/reloop-queue.jsonl            entries flagged for agent re-run
 *
 * Run on cron (daily). Uses GSC API + URL Inspection.
 */

import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'fs';
import { resolve, join } from 'path';
import { createSign } from 'crypto';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const SEO = join(REPO_ROOT, 'seo');
const SA_PATH = 'C:/Users/admin/.config/claude-seo/service-account.json';
const PROPERTY = 'sc-domain:hamilton-exteriors.com';
const QUEUE = join(SEO, 'monitor-queue.jsonl');
const RELOOP_QUEUE = join(SEO, 'reloop-queue.jsonl');

if (!existsSync(QUEUE)) {
  console.log('No monitor queue file. Nothing to do.');
  process.exit(0);
}

const sa = JSON.parse(readFileSync(SA_PATH, 'utf8'));

function base64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function makeJWT(scope) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64url(JSON.stringify({
    iss: sa.client_email, scope, aud: sa.token_uri, iat: now, exp: now + 3600,
  }));
  const unsigned = `${header}.${payload}`;
  const sign = createSign('RSA-SHA256');
  sign.update(unsigned);
  return `${unsigned}.${base64url(sign.sign(sa.private_key))}`;
}

async function getToken(scope) {
  const jwt = makeJWT(scope);
  const res = await fetch(sa.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  return (await res.json()).access_token;
}

async function checkIndexed(token, url) {
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: PROPERTY }),
  });
  const data = await res.json();
  if (data.error) {
    console.error(`URL inspection error for ${url}:`, data.error.message);
    return null;
  }
  return data.inspectionResult?.indexStatusResult?.coverageState || null;
}

async function getRankings(token, url, keywords, days) {
  const endDate = new Date().toISOString().slice(0, 10);
  const startDate = new Date(Date.now() - days * 86400_000).toISOString().slice(0, 10);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPERTY)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate, endDate,
        dimensions: ['query'],
        rowLimit: 100,
        dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'equals', expression: url }] }],
      }),
    }
  );
  const data = await res.json();
  if (data.error) return null;
  const rows = data.rows || [];

  const out = {};
  for (const kw of keywords) {
    const term = kw.kw.toLowerCase();
    const match = rows.find(r => r.keys[0].toLowerCase() === term);
    out[kw.kw] = match ? { position: match.position, impressions: match.impressions, clicks: match.clicks } : null;
  }
  return out;
}

function parseQueue() {
  return readFileSync(QUEUE, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map(line => JSON.parse(line));
}

function rewriteQueue(entries) {
  writeFileSync(QUEUE, entries.map(e => JSON.stringify(e)).join('\n') + (entries.length ? '\n' : ''));
}

function daysSince(iso) {
  return (Date.now() - new Date(iso).getTime()) / 86400_000;
}

// Audit-log diff (toprank pattern): writes seo/audit-log/{pageSlug}.json with
// per-pass top issues. Next pass diffs against previous to compute resolved/
// improved/still-present/worsened. Also writes seo/audit-diff-{date}.md summary.
function appendAuditLog(pageSlug, snapshot) {
  const dir = join(SEO, 'audit-log');
  try { require('fs').mkdirSync(dir, { recursive: true }); } catch {}
  const path = join(dir, `${pageSlug}.json`);
  let history = [];
  if (existsSync(path)) history = JSON.parse(readFileSync(path, 'utf8'));
  history.push(snapshot);
  if (history.length > 12) history = history.slice(-12); // keep 12 passes
  writeFileSync(path, JSON.stringify(history, null, 2));
  return history;
}

function diffAgainstPrevious(history) {
  if (history.length < 2) return { resolved: [], improved: [], stillPresent: [], worsened: [], new: [] };
  const prev = history[history.length - 2];
  const curr = history[history.length - 1];
  const prevIssues = new Set((prev.issues || []).map(i => i.id));
  const currIssues = new Set((curr.issues || []).map(i => i.id));
  return {
    resolved:    [...prevIssues].filter(id => !currIssues.has(id)),
    new:         [...currIssues].filter(id => !prevIssues.has(id)),
    stillPresent: [...currIssues].filter(id => prevIssues.has(id)),
  };
}

async function main() {
  const queue = parseQueue();
  if (!queue.length) { console.log('Queue empty.'); return; }

  console.log(`Monitor pass: ${queue.length} pages in queue`);
  const inspectToken = await getToken('https://www.googleapis.com/auth/webmasters');
  const remaining = [];
  const summary = { passed: 0, failed: 0, looped: 0, diffs: [] };

  for (const entry of queue) {
    const { pageSlug, publishedAt } = entry;
    const targetPath = join(SEO, 'targets', `${pageSlug}.json`);
    if (!existsSync(targetPath)) {
      console.warn(`  ${pageSlug}: target file missing, dropping from queue`);
      continue;
    }
    const target = JSON.parse(readFileSync(targetPath, 'utf8'));
    const days = daysSince(publishedAt);
    const metrics = target.metrics || {};
    let touched = false;
    let keepInQueue = true;

    // T+14: indexation
    if (days >= 14 && !metrics.t14) {
      const state = await checkIndexed(inspectToken, target.pageUrl);
      metrics.t14 = { checkedAt: new Date().toISOString(), coverageState: state, indexed: /Indexed/i.test(state || '') };
      if (metrics.t14.indexed && !metrics.indexedAt) metrics.indexedAt = metrics.t14.checkedAt;
      touched = true;
      console.log(`  ${pageSlug} T+14: indexed=${metrics.t14.indexed} state=${state}`);
    }

    // T+30: ranking check
    if (days >= 30 && !metrics.t30) {
      const ranks = await getRankings(inspectToken, target.pageUrl, target.primaryKeywords, 28);
      const inTop20 = Object.values(ranks || {}).some(r => r && r.position <= 20);
      metrics.t30 = { checkedAt: new Date().toISOString(), rankings: ranks, inTop20 };
      touched = true;
      console.log(`  ${pageSlug} T+30: inTop20=${inTop20}`);
    }

    // T+60: top-10 check, trigger re-loop if missed
    if (days >= 60 && !metrics.t60) {
      const ranks = await getRankings(inspectToken, target.pageUrl, target.primaryKeywords, 28);
      const inTop10 = Object.values(ranks || {}).some(r => r && r.position <= 10);
      const inTop20 = Object.values(ranks || {}).some(r => r && r.position <= 20);
      metrics.t60 = { checkedAt: new Date().toISOString(), rankings: ranks, inTop10, inTop20 };
      touched = true;
      console.log(`  ${pageSlug} T+60: inTop10=${inTop10} inTop20=${inTop20}`);

      if (!inTop20 && (target.iterations || 0) < 3) {
        appendFileSync(RELOOP_QUEUE, JSON.stringify({
          pageSlug, publishedAt, queuedAt: new Date().toISOString(),
          reason: `T+60 not in top 20`,
        }) + '\n');
        console.log(`  ${pageSlug}: queued for re-loop`);
      }
      keepInQueue = false; // monitoring complete after T+60
    }

    if (touched) {
      target.metrics = metrics;
      writeFileSync(targetPath, JSON.stringify(target, null, 2));

      // Audit-log snapshot — issues = under-target ranking signals
      const issues = [];
      const ranks = (metrics.t30?.rankings || metrics.t14?.rankings || metrics.t60?.rankings || {});
      for (const [kw, r] of Object.entries(ranks)) {
        if (!r) issues.push({ id: `not-ranking:${kw}`, severity: 'high', detail: `No GSC impressions for "${kw}"` });
        else if (r.position > 20) issues.push({ id: `low-rank:${kw}`, severity: 'medium', detail: `Position ${r.position.toFixed(1)} for "${kw}"` });
        else if (r.position > 10) issues.push({ id: `striking-distance:${kw}`, severity: 'low', detail: `Position ${r.position.toFixed(1)} for "${kw}" (top-10 opportunity)` });
      }
      const history = appendAuditLog(pageSlug, {
        passAt: new Date().toISOString(),
        daysSincePublish: Math.round(days),
        issues,
      });
      const diff = diffAgainstPrevious(history);
      if (diff.resolved.length || diff.new.length) {
        summary.diffs.push({ pageSlug, resolved: diff.resolved.length, new: diff.new.length });
      }
    }
    if (keepInQueue && days < 60) remaining.push(entry);
  }

  rewriteQueue(remaining);

  // Write a per-day summary for orchestrator dashboards
  const today = new Date().toISOString().slice(0, 10);
  const summaryPath = join(SEO, 'reports', `monitor-${today}.md`);
  const lines = [
    `# Monitor pass — ${today}`,
    ``,
    `- Pages checked: ${queue.length}`,
    `- Pages remaining in queue: ${remaining.length}`,
    `- Diff records: ${summary.diffs.length}`,
    ``,
    `## Pages with issue changes since last pass`,
    ...summary.diffs.map(d => `- **${d.pageSlug}**: +${d.new} new, −${d.resolved} resolved`),
  ];
  writeFileSync(summaryPath, lines.join('\n'));
  console.log(`Monitor pass complete. ${remaining.length} pages remain in queue. Summary: ${summaryPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
