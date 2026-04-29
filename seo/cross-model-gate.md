# G7: Cross-Model Adversarial Review Gate

Pattern adapted from `nowork-studio/toprank/gemini/SKILL.md`, but routed through DeepSeek (not Gemini) for stronger cross-family separation from Anthropic.

## Why a cross-model gate

Claude models have shared training distributions and shared blind spots. Running the draft past a different model family catches:
- Voice failures Claude rationalizes
- Factual claims Claude generated confidently but can't substantiate
- Structural issues Claude treats as acceptable but a fresh reader would flag
- Local fact errors (Bay Area cities, permit details) that don't trip Claude's QA

**Why DeepSeek over Gemini:**
- DeepSeek's training distribution is independent of Anthropic's, where Gemini and Claude share more training conventions than people realize
- DeepSeek-V3.2 holds gold-medal results on the 2025 IMO and IOI — proven rigorous step-by-step reasoning, exactly what claim verification needs
- 5–10× cheaper than Gemini Pro for the same quality bar
- Structured JSON output is reliable across both V3.2 and V4-Pro

This is a **correctness gate**, not a style gate. Pass = ship. Fail = regenerate. Warnings = log + ship.

## When this gate runs

After G1-G6 pass. Before publish (step 9 of the agent loop).

## How it runs

The agent invokes the Gemini CLI directly. Gemini reads the draft + the brief + the teardown and returns a structured JSON verdict. Three modes:

### Mode A: review (default for every page)

Cost: ~1 Gemini Flash call, $0.005-0.01 per page. Should be the default gate at G7.

Prompt (sent to `gemini -p`):

```
You are reviewing a draft for hamilton-exteriors.com (Bay Area design-build contractor, owned by Alex Hamilton Li, CSLB #1078806).

DRAFT:
<full draft markdown including frontmatter>

CONTENT BRIEF (what the draft was supposed to deliver):
<brief.json>

COMPETITOR TEARDOWN (what we're trying to beat):
<teardown.md>

YOUR TASK:
Review the draft against the brief and teardown. Return a JSON verdict:

{
  "verdict": "PASS" | "FAIL" | "WARN",
  "blockingIssues": [<strings — only if verdict is FAIL>],
  "warnings": [<strings — non-blocking concerns>],
  "strengths": [<strings — what the draft does well>],
  "suggestedFixes": [<strings — specific changes if FAIL or WARN>]
}

VERDICT criteria:
- FAIL: factual error, brand-rule violation (em dash in title/H1, ALL CAPS, defensive phrasing, unverifiable superlative), missing required schema, claims without sources, content does not match keyword intent, page would not pass last-click test.
- WARN: weak passage, uncited specific claim, missing differentiator from brief, awkward voice but not wrong.
- PASS: meets brief, addresses teardown gaps, voice matches brand, no factual issues.

Be ruthless. Bad content shipped is worse than no content.
Output JSON only. No prose.
```

### Mode B: challenge (for high-stakes pages)

Used on cornerstone pages and high-traffic city pages. Adversarial mode.

Prompt:

```
You are an adversarial reviewer. The draft below is for hamilton-exteriors.com.

DRAFT:
<draft>

YOUR TASK:
For each major claim in the draft, complete this loop:

1. STATE THE ASSUMPTION — what is the page asserting?
2. CHALLENGE IT — why might this be wrong, misleading, or unverifiable?
3. WHAT DOES THE DATA SAY — is there a `sourceUrl` or first-hand evidence? If not, the claim is unsupported.
4. VERDICT — SOUND, RISKY, or RETHINK?

After processing all major claims, return:

{
  "verdict": "PASS" | "FAIL",
  "claimsAnalyzed": <number>,
  "soundClaims": <number>,
  "riskyClaims": [<{claim, reason, recommendedFix}>],
  "rethinkClaims": [<{claim, reason, recommendedFix}>],
  "overallAssessment": "<1-2 sentences>"
}

Only PASS if zero rethinkClaims and ≤2 riskyClaims.
```

### Mode C: consult (rarely used, for specific questions)

Open Q&A mode. The agent invokes when stuck on a specific decision (e.g. "is this Bay Area pricing range realistic for Oakland reroof?"). Returns a free-form answer, not JSON.

## Two-tier model strategy

Different stakes get different models. Set per-mode in `scripts/g7-gate.mjs`.

| Mode | Default model | When used | Per-page cost | 387-page total |
|---|---|---|---|---|
| `review` | **`deepseek-ai/DeepSeek-V3.2`** | Default for every page | ~$0.0017 | ~$0.66 |
| `challenge` | **`deepseek-ai/DeepSeek-V4-Pro`** | Cornerstone pages, ≥100 GSC impressions | ~$0.012 | ~$0.36 (≈30 pages only) |
| `consult` | **`deepseek-ai/DeepSeek-V4-Pro`** | Open Q&A when agent stuck | varies | rare |

**Total G7 cost across full run: ~$1.** Negligible.

Override the model with `--model <id>` for any of DeepInfra's 154 models. Other strong cross-family options if DeepSeek is unavailable: `Qwen/Qwen3-Max-Thinking`, `Qwen/Qwen3.5-397B-A17B`, `zai-org/GLM-5.1`, `google/gemini-2.5-pro`.

## Setup

```bash
# DEEPINFRA_API_KEY already in .env — verify access:
curl -s https://api.deepinfra.com/v1/openai/chat/completions \
  -H "Authorization: Bearer $DEEPINFRA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-ai/DeepSeek-V3.2","messages":[{"role":"user","content":"ping"}],"max_tokens":10}'
```

DeepInfra balance must be positive (>$0). At ~$0.0017/page-review, $5 covers ~3,000 page reviews.

## Wiring in the agent loop

In `seo/agent-system-prompt.md`, between step 8 (QA G1-G5) and step 9 (Publish), insert step 8b:

```
### Step 8b: G7 cross-model review
Run `scripts/g7-gate.mjs --target {pageSlug} --mode review`.

If verdict === "FAIL": regenerate (counts toward step 8 retry cap of 3).
If verdict === "WARN": log warnings to seo/drafts/{pageSlug}.qa.json under `gemini.warnings`, but proceed to publish.
If verdict === "PASS": proceed to publish.

For cornerstone pages and city pages with >100 GSC impressions, use --mode challenge instead. PASS criteria stricter.
```

## Failure-mode policy

| Outcome | Action |
|---|---|
| Gemini API down / timeout | Skip G7, log to `seo/failures.jsonl` with `gemini_unavailable: true`. Publish proceeds. (Don't block on infrastructure.) |
| Gemini returns malformed JSON | Retry once. If second attempt fails, treat as WARN, log + proceed. |
| Cost spike (>$50/day on Gemini) | Auto-throttle: switch to review-only, defer challenge mode for non-cornerstone pages. |

## Auditing the gate itself

Quarterly: pick 20 random pages where G7 returned PASS and 20 where it returned FAIL. Spot-check whether Gemini's verdicts match Alex's manual review. If <80% agreement, retune the prompt.
