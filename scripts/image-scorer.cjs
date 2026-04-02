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

const DEFAULT_MODEL = "meta-llama/Llama-3.2-90B-Vision-Instruct";
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
    "You are evaluating an image for use in a blog post on a Bay Area roofing contractor's website (Hamilton Exteriors).",
    "",
    "Blog section context:",
    `- Post topic: ${ctx.postTopic}`,
    `- Section heading: ${ctx.sectionHeading}`,
    `- Section content preview: ${preview}`,
    "",
    "Score this image on 4 criteria. Return ONLY a JSON object, no other text:",
    '{"relevance": 0-30, "authenticity": 0-25, "quality": 0-25, "brand_fit": 0-20, "total": 0-100, "reasoning": "one sentence", "reject": true/false}',
    "",
    "Set reject=true if: watermark, AI-generated, clip art, screenshot, meme, or completely irrelevant.",
    "A good score for a contractor blog is 60+. Real construction photos on real job sites score highest.",
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
