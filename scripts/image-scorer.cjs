// @ts-check
/**
 * image-scorer.cjs — Vision-based image scoring for blog image pipeline
 *
 * Uses DeepInfra (Llama 3.2 90B Vision) to evaluate candidate images
 * for contextual relevance, authenticity, quality, and brand fit on
 * the Hamilton Exteriors blog.
 *
 * Env: DEEPINFRA_API_KEY
 */

const https = require("https");

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_MODEL = "Qwen/Qwen3-VL-30B-A3B-Instruct";
const MAX_TOKENS = 300;
const MAX_CONCURRENCY = 3;
const TOP_N = 3;

const DEFAULT_SCORE = {
  relevance: 15,
  authenticity: 12,
  quality: 12,
  brand_fit: 11,
  total: 50,
  reasoning: "Vision scoring unavailable — default neutral score applied.",
  reject: false,
};

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------

/**
 * @param {{ postTopic: string; sectionHeading: string; sectionContent: string }} ctx
 */
function buildPrompt(ctx) {
  const preview = (ctx.sectionContent || "").split(/\s+/).slice(0, 100).join(" ");

  return [
    "You are the photo editor for Hamilton Exteriors, a premium Bay Area roofing and design-build contractor. You're selecting images for a blog post that homeowners spending $15K-$80K on exterior projects will read.",
    "",
    "THE SITE'S VISUAL IDENTITY:",
    "- Real construction photography — crews on roofs, framing going up, finished exteriors",
    "- Bay Area residential neighborhoods — Craftsman homes, stucco, Spanish tile, Victorian, mid-century",
    "- Warm natural light, outdoor settings, real job sites with real dirt and real tools",
    "- Green (#256346) and cream (#F4F1EB) palette — images should feel warm, grounded, substantial",
    "",
    "BLOG SECTION THIS IMAGE IS FOR:",
    `- Post: ${ctx.postTopic}`,
    `- Section: ${ctx.sectionHeading}`,
    `- Content: ${preview}`,
    "",
    "SCORE ON 4 CRITERIA:",
    "",
    "RELEVANCE (0-30): Does this image directly illustrate the section topic? A section about 'roof replacement costs' needs a roof being replaced, not a generic house. A section about 'warning signs' needs damaged or aging materials. Tangentially related = 10-15. Dead-on = 25-30.",
    "",
    "AUTHENTICITY (0-25): Does this look like it was taken on a real job site or in a real neighborhood? HIGHEST SCORES: candid crew shots, real roofs mid-tear-off, actual houses with visible wear, neighborhoods you'd recognize. LOWEST SCORES: models in clean hard hats posed on scaffolding, impossibly clean construction sites, everyone smiling at camera, suspiciously perfect lighting. If you'd see this on Shutterstock's homepage — it's stock. If you'd see it on a contractor's Instagram — it's real.",
    "",
    "QUALITY (0-25): Sharp focus, good composition, landscape orientation, minimum 1000px wide. Deduct for: blur, poor exposure, distracting clutter, portrait orientation, low resolution, heavy filters. Award for: golden hour light, interesting angles (aerial, close-up texture detail), strong composition with clear subject.",
    "",
    "BRAND FIT (0-20): Would this look natural on a premium contractor's website alongside THE BOLD FONT headlines and a green/cream palette? HIGHEST: warm-toned construction scenes, California residential architecture, overhead roof views, material close-ups showing craftsmanship. LOWEST: cold corporate stock, tropical/non-California settings, commercial/industrial (not residential), overly artistic/abstract.",
    "",
    "INSTANT REJECT (set reject=true):",
    "- Watermarks or stock agency logos",
    "- Obviously AI-generated (smooth uncanny skin, weird hands/fingers, too-perfect textures, floating objects)",
    "- Clip art, illustrations, diagrams, infographics",
    "- Screenshots, memes, social media posts",
    "- Text overlays that aren't part of the scene",
    "- Interior-only shots (we do exteriors)",
    "- Completely unrelated to construction/homes/roofing",
    "",
    "Return ONLY a JSON object, no other text:",
    '{"relevance": 0-30, "authenticity": 0-25, "quality": 0-25, "brand_fit": 0-20, "total": 0-100, "reasoning": "one sentence", "reject": true/false}',
  ].join("\n");
}

// ---------------------------------------------------------------------------
// HTTP helper — DeepInfra OpenAI-compatible API
// ---------------------------------------------------------------------------

/**
 * POST JSON to DeepInfra's OpenAI-compatible chat completions endpoint.
 * @param {object} body
 * @returns {Promise<object>}
 */
function postDeepInfra(body) {
  const apiKey = process.env.DEEPINFRA_API_KEY;
  if (!apiKey) throw new Error("DEEPINFRA_API_KEY env var is not set.");

  const payload = JSON.stringify(body);

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.deepinfra.com",
        path: "/v1/openai/chat/completions",
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${apiKey}`,
          "content-length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const raw = Buffer.concat(chunks).toString();
          try {
            const json = JSON.parse(raw);
            if (res.statusCode >= 400) {
              reject(
                new Error(
                  `DeepInfra API ${res.statusCode}: ${json.error?.message || raw}`
                )
              );
            } else {
              resolve(json);
            }
          } catch (e) {
            reject(new Error(`Failed to parse DeepInfra response: ${raw}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Score parser
// ---------------------------------------------------------------------------

/**
 * Extract JSON from the model's text response.
 * @param {string} text
 * @returns {object}
 */
function parseScore(text) {
  // Try to find a JSON block (with or without markdown fences)
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  let jsonStr = fenced ? fenced[1].trim() : text.trim();

  // Try to extract JSON object if there's surrounding text
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
  if (jsonMatch) jsonStr = jsonMatch[0];

  const parsed = JSON.parse(jsonStr);

  // Clamp individual scores to their max ranges
  const relevance = Math.min(Math.max(Number(parsed.relevance) || 0, 0), 30);
  const authenticity = Math.min(Math.max(Number(parsed.authenticity) || 0, 0), 25);
  const quality = Math.min(Math.max(Number(parsed.quality) || 0, 0), 25);
  const brand_fit = Math.min(Math.max(Number(parsed.brand_fit) || 0, 0), 20);
  const total = relevance + authenticity + quality + brand_fit;

  return {
    relevance,
    authenticity,
    quality,
    brand_fit,
    total,
    reasoning: String(parsed.reasoning || ""),
    reject: Boolean(parsed.reject),
  };
}

// ---------------------------------------------------------------------------
// Core: scoreImage
// ---------------------------------------------------------------------------

/**
 * Score a single image URL against blog section context.
 *
 * @param {string} imageUrl  — public URL of the image
 * @param {{ postTopic: string; sectionHeading: string; sectionContent: string }} context
 * @returns {Promise<{
 *   relevance: number;
 *   authenticity: number;
 *   quality: number;
 *   brand_fit: number;
 *   total: number;
 *   reasoning: string;
 *   reject: boolean;
 * }>}
 */
async function scoreImage(imageUrl, context) {
  try {
    const prompt = buildPrompt(context);

    const response = await postDeepInfra({
      model: DEFAULT_MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    // OpenAI-compatible format: choices[0].message.content
    const text = response.choices?.[0]?.message?.content;
    if (!text) {
      console.warn(`[image-scorer] No text in response for ${imageUrl}`);
      return { ...DEFAULT_SCORE };
    }

    return parseScore(text);
  } catch (err) {
    console.warn(
      `[image-scorer] Scoring failed for ${imageUrl}: ${err.message}`
    );
    return { ...DEFAULT_SCORE };
  }
}

// ---------------------------------------------------------------------------
// Batch: scoreCandidates
// ---------------------------------------------------------------------------

/**
 * Score an array of candidate images, filter rejects, return top N sorted
 * by score descending.
 *
 * @param {{ url: string; source?: string; photographer?: string }[]} candidates
 * @param {{ postTopic: string; sectionHeading: string; sectionContent: string }} context
 * @param {{ concurrency?: number; topN?: number }} [opts]
 * @returns {Promise<Array<{
 *   url: string;
 *   source?: string;
 *   photographer?: string;
 *   score: { relevance: number; authenticity: number; quality: number; brand_fit: number; total: number; reasoning: string; reject: boolean };
 * }>>}
 */
async function scoreCandidates(candidates, context, opts = {}) {
  const concurrency = opts.concurrency || MAX_CONCURRENCY;
  const topN = opts.topN || TOP_N;

  /** @type {Array<{ url: string; source?: string; photographer?: string; score: object }>} */
  const results = [];

  // Process in chunks of `concurrency`
  for (let i = 0; i < candidates.length; i += concurrency) {
    const batch = candidates.slice(i, i + concurrency);
    const scores = await Promise.all(
      batch.map(async (candidate) => {
        const score = await scoreImage(candidate.url, context);
        return {
          url: candidate.url,
          source: candidate.source,
          photographer: candidate.photographer,
          score,
        };
      })
    );
    results.push(...scores);
  }

  // Filter rejected, sort descending by total, take top N
  return results
    .filter((r) => !r.score.reject)
    .sort((a, b) => b.score.total - a.score.total)
    .slice(0, topN);
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = { scoreImage, scoreCandidates };
