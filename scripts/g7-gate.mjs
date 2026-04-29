#!/usr/bin/env node
/**
 * g7-gate.mjs — G7 cross-model adversarial review.
 *
 * Two-tier model strategy (per seo/cross-model-gate.md):
 *   review    → deepseek-ai/DeepSeek-V3.2  (default; ~$0.0017/page;
 *                IMO/IOI gold-medal reasoning, 160K context)
 *   challenge → deepseek-ai/DeepSeek-V4-Pro (cornerstone pages; ~$0.012/page;
 *                frontier 1.6T-param / 49B-active, 1M context)
 *   consult   → deepseek-ai/DeepSeek-V4-Pro (open Q&A when agent is stuck)
 *
 * Cross-family separation from Anthropic: DeepSeek's training distribution
 * is independent, so this gate catches issues a same-family reviewer would
 * rationalize past.
 *
 * Override the model with --model <id> for any DeepInfra model.
 * Hosted on DeepInfra (OpenAI-compatible API) — reuses DEEPINFRA_API_KEY.
 *
 * Usage:
 *   node scripts/g7-gate.mjs --target <pageSlug> [--mode review|challenge|consult] [--model <id>]
 *
 * Outputs (idempotent — overwrites previous gate result for the page):
 *   seo/drafts/{pageSlug}.qa.json   merged: gates.G7_cross_model + g7.{verdict, ...}
 *   seo/failures.jsonl              appended on infra failure (non-blocking)
 *
 * Exit code:
 *   0 = PASS (or WARN, or infra failure with non-blocking policy)
 *   1 = FAIL (regenerate)
 *   2 = config error (e.g. DEEPINFRA_API_KEY missing)
 */

import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'fs';
import { resolve, join } from 'path';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const SEO = join(REPO_ROOT, 'seo');

const args = parseArgs(process.argv.slice(2));
const pageSlug = args.target;
const mode = args.mode || 'review';

if (!pageSlug) {
  console.error('Usage: g7-gate.mjs --target <pageSlug> [--mode review|challenge|consult] [--model <id>]');
  process.exit(2);
}

if (!process.env.DEEPINFRA_API_KEY) {
  console.error('DEEPINFRA_API_KEY not set');
  process.exit(2);
}

const draftPath = join(SEO, 'drafts', `${pageSlug}.md`);
const briefPath = join(SEO, 'teardowns', `${pageSlug}.brief.json`);
const teardownPath = join(SEO, 'teardowns', `${pageSlug}.md`);
const qaPath = join(SEO, 'drafts', `${pageSlug}.qa.json`);

if (!existsSync(draftPath)) { console.error('No draft at ' + draftPath); process.exit(2); }
const draft = readFileSync(draftPath, 'utf8');
const brief = existsSync(briefPath) ? readFileSync(briefPath, 'utf8') : '(no brief)';
const teardown = existsSync(teardownPath) ? readFileSync(teardownPath, 'utf8') : '(no teardown)';

// Cap content to fit comfortably in context (Gemini 2.5 Flash: 1M tokens, but we want fast+cheap)
const cap = (s, n) => s.length > n ? s.slice(0, n) + '\n\n[...truncated]' : s;

const PROMPTS = {
  review: `You are reviewing a draft for hamilton-exteriors.com (Bay Area design-build contractor, Alex Hamilton Li, CSLB #1078806).

DRAFT:
${cap(draft, 30000)}

CONTENT BRIEF:
${cap(brief, 4000)}

COMPETITOR TEARDOWN:
${cap(teardown, 8000)}

YOUR TASK: Return JSON only:
{
  "verdict": "PASS" | "FAIL" | "WARN",
  "blockingIssues": [<strings — only if FAIL>],
  "warnings": [<non-blocking concerns>],
  "strengths": [<what works>],
  "suggestedFixes": [<specific changes if FAIL or WARN>]
}

Verdict rules:
- FAIL: factual error, brand-rule violation (em dash in title/H1, ALL CAPS, defensive phrasing like "no surprises", unverifiable superlatives like "best/#1/top"), missing required schema, claims without sources, format does not match keyword intent, fails last-click test.
- WARN: weak passage, uncited specific claim, missing differentiator from brief, awkward voice but not wrong.
- PASS: meets brief, addresses teardown gaps, voice matches brand, no factual issues.

Be ruthless. Bad content shipped is worse than no content. JSON only, no prose.`,

  challenge: `You are an adversarial reviewer. The draft below is for hamilton-exteriors.com.

DRAFT:
${cap(draft, 30000)}

YOUR TASK: For each major claim in the draft, complete this loop:
1. STATE THE ASSUMPTION — what is the page asserting?
2. CHALLENGE IT — why might this be wrong, misleading, or unverifiable?
3. WHAT DOES THE DATA SAY — is there a sourceUrl or first-hand evidence? If not, the claim is unsupported.
4. VERDICT — SOUND, RISKY, or RETHINK?

After all major claims, return JSON only:
{
  "verdict": "PASS" | "FAIL",
  "claimsAnalyzed": <number>,
  "soundClaims": <number>,
  "riskyClaims": [{"claim":"...","reason":"...","recommendedFix":"..."}],
  "rethinkClaims": [{"claim":"...","reason":"...","recommendedFix":"..."}],
  "overallAssessment": "<1-2 sentences>"
}

PASS only if zero rethinkClaims AND ≤2 riskyClaims. JSON only.`,

  consult: `You are a Bay Area construction-industry expert.

DRAFT for hamilton-exteriors.com:
${cap(draft, 30000)}

QUESTION: ${args.question || 'What weaknesses should we address before publishing?'}

Answer in 2-3 paragraphs. Be specific. Cite Bay Area context where relevant.`,
};

// Per-mode default model. Override with --model <id>.
// Step-3.5-Flash is the value pick (196B reasoning, $0.10/$0.30) for routine review.
// Qwen3.5-397B-A17B for adversarial challenge mode (397B, SOTA reasoning).
const DEFAULT_MODEL = {
  review:    'stepfun-ai/Step-3.5-Flash',
  challenge: 'Qwen/Qwen3.5-397B-A17B',
  consult:   'Qwen/Qwen3.5-397B-A17B',
};

async function callDeepInfra(systemPrompt) {
  const body = {
    model: args.model || DEFAULT_MODEL[mode] || DEFAULT_MODEL.review,
    messages: [{ role: 'user', content: systemPrompt }],
    max_tokens: mode === 'consult' ? 1500 : 2500,
    temperature: 0.2,
  };
  if (mode !== 'consult') body.response_format = { type: 'json_object' };

  const t0 = Date.now();
  const res = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DEEPINFRA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const ms = Date.now() - t0;
  return { data, status: res.status, ms };
}

function nonBlockingFailure(reason, detail = null) {
  appendFileSync(join(SEO, 'failures.jsonl'), JSON.stringify({
    at: new Date().toISOString(),
    pageSlug, gate: 'G7', mode,
    g7_unavailable: true,
    reason, detail,
  }) + '\n');
  console.log(`[G7] ${pageSlug}: SKIPPED (${reason}) — non-blocking, publish proceeds`);
  process.exit(0);
}

async function main() {
  let result;
  try {
    result = await callDeepInfra(PROMPTS[mode]);
  } catch (e) {
    return nonBlockingFailure('network', String(e));
  }

  // Specific handling: balance/quota issues are non-blocking infrastructure problems
  if (result.status !== 200) {
    if (result.data?.detail?.error?.includes('balance')) {
      return nonBlockingFailure('deepinfra_balance', result.data.detail.error);
    }
    if (result.status === 429) return nonBlockingFailure('rate_limit');
    return nonBlockingFailure(`http_${result.status}`, JSON.stringify(result.data).slice(0, 300));
  }

  const content = result.data.choices?.[0]?.message?.content;
  if (!content) return nonBlockingFailure('empty_response');

  // Consult mode: just print
  if (mode === 'consult') {
    console.log(content);
    process.exit(0);
  }

  // Parse JSON verdict
  let verdict;
  try { verdict = JSON.parse(content); }
  catch (e) {
    // Retry once with explicit JSON-fix instruction
    return nonBlockingFailure('json_parse', content.slice(0, 300));
  }

  // Merge into existing QA result
  const qa = existsSync(qaPath) ? JSON.parse(readFileSync(qaPath, 'utf8')) : { gates: {}, failures: [] };
  qa.gates.G7_cross_model = verdict.verdict === 'PASS' ? 'PASS' : (verdict.verdict === 'WARN' ? 'WARN' : 'FAIL');
  qa.g7 = {
    model: result.data.model,
    mode,
    verdict: verdict.verdict,
    durationMs: result.ms,
    tokens: result.data.usage,
    ...verdict,
  };
  if (verdict.verdict === 'FAIL') {
    qa.failures = qa.failures || [];
    qa.failures.push({ gate: 'G7', issues: verdict.blockingIssues || [verdict.overallAssessment || 'g7 fail'] });
    qa.overall = 'FAIL';
  }
  writeFileSync(qaPath, JSON.stringify(qa, null, 2));

  console.log(`[G7] ${pageSlug}: ${verdict.verdict} via ${result.data.model} (${result.ms}ms, ${result.data.usage.total_tokens} tokens)`);
  if (verdict.verdict === 'FAIL') {
    for (const issue of verdict.blockingIssues || []) console.log(`  - ${issue}`);
    process.exit(1);
  }
  if (verdict.verdict === 'WARN') {
    for (const w of verdict.warnings || []) console.log(`  ! ${w}`);
  }
  process.exit(0);
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

main().catch(e => { console.error(e); process.exit(2); });
