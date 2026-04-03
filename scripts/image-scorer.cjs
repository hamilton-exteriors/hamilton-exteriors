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
    "RELEVANCE (0-30):",
    "This is the MOST IMPORTANT criterion. The image must show EXACTLY what the section describes.",
    "Examples of what each section topic needs:",
    "- 'Missing or Blown-Off Shingles' → a roof with visibly missing shingles, bare patches of underlayment or decking showing",
    "- 'Curling, Cracking, or Buckling Shingles' → close-up of shingles that are curled, cracked, or buckled",
    "- 'Granule Loss' → close-up of worn shingles with bald spots, or granules in a gutter",
    "- 'Daylight Through Roof Boards' → light coming through gaps in roof decking from inside an attic",
    "- 'Sagging Roof' → a visibly sagging roofline or dipped ridge line on a house",
    "- 'Moss or Algae' → green moss, black algae, or mold growing on roof shingles",
    "- 'Roof replacement costs' → crew actively tearing off or installing shingles on a RESIDENTIAL house",
    "- 'Material comparison' → side-by-side or close-up of different roofing materials (asphalt vs tile vs metal)",
    "A generic photo of 'a roof' or 'a house' scores 5-10. The SPECIFIC condition or activity scores 25-30.",
    "REJECT any image of barns, warehouses, industrial buildings, or commercial properties — this is a RESIDENTIAL contractor.",
    "",
    "AUTHENTICITY (0-25): Real photo from a real residential neighborhood or job site. NOT: posed stock photos with models in clean hard hats, industrial buildings, rural barns, European villages. If it looks like it was taken on a suburban American street or a residential roof — that's authentic. Seagulls on a barn = 0.",
    "",
    "QUALITY (0-25): Sharp focus, good composition, landscape orientation, min 1000px. Deduct for: heavy vintage/moody filters, desaturated colors, blur, portrait orientation. Award for: natural light, clear subject, useful detail visible.",
    "",
    "BRAND FIT (0-20): Would a Bay Area homeowner looking at this on a contractor's blog think 'that looks like my neighborhood'? RESIDENTIAL single-family homes only. California/American suburban style. Not: European architecture, tropical settings, rural farms, commercial buildings, apartment complexes.",
    "",
    "INSTANT REJECT (set reject=true):",
    "- Barns, warehouses, sheds, industrial buildings, commercial properties",
    "- European or tropical architecture (clay village roofs, thatched roofs, corrugated tin shacks)",
    "- Watermarks or stock agency logos",
    "- Obviously AI-generated",
    "- Clip art, illustrations, diagrams",
    "- Interior-only shots (unless showing daylight through roof boards)",
    "- Animals as the main subject (birds on a roof = reject)",
    "- Heavy artistic filters that make the photo look like a vintage postcard",
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
