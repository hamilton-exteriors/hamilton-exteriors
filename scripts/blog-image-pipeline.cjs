/**
 * Blog Image Pipeline for Hamilton Exteriors
 *
 * Fetches blog posts from Ghost CMS, finds relevant stock images from
 * Unsplash / Pexels / Flickr / Shutterstock, downloads them locally,
 * and inserts them into the Ghost post's Lexical content.
 *
 * Usage:
 *   node scripts/blog-image-pipeline.cjs <post-slug>
 *   node scripts/blog-image-pipeline.cjs --all
 *
 * Environment variables:
 *   PUBLIC_GHOST_URL          Ghost CMS URL
 *   GHOST_ADMIN_API_KEY       Ghost Admin API key (id:secret)
 *   UNSPLASH_ACCESS_KEY       Unsplash API access key
 *   PEXELS_API_KEY            Pexels API key
 *   FLICKR_API_KEY            Flickr API key
 *   SHUTTERSTOCK_CLIENT_ID    Shutterstock client ID
 *   SHUTTERSTOCK_CLIENT_SECRET Shutterstock client secret
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');
const { Readable } = require('stream');

// ── Configuration ──────────────────────────────────────────────────────────

const GHOST_URL = process.env.PUBLIC_GHOST_URL;
const GHOST_ADMIN_KEY = process.env.GHOST_ADMIN_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const SHUTTERSTOCK_CLIENT_ID = process.env.SHUTTERSTOCK_CLIENT_ID;
const SHUTTERSTOCK_CLIENT_SECRET = process.env.SHUTTERSTOCK_CLIENT_SECRET;

const SITE_URL = ''; // Use relative URLs so images work on localhost and production
const IMAGES_DIR = path.resolve(__dirname, '..', 'public', 'blog-images');

// Minimum quality score threshold (0-100)
const QUALITY_THRESHOLD = 30;

// ── Validation ─────────────────────────────────────────────────────────────

if (!GHOST_URL || !GHOST_ADMIN_KEY) {
  console.error('ERROR: Missing PUBLIC_GHOST_URL or GHOST_ADMIN_API_KEY');
  process.exit(1);
}

const [adminId, adminSecret] = GHOST_ADMIN_KEY.split(':');

if (!adminId || !adminSecret) {
  console.error('ERROR: GHOST_ADMIN_API_KEY must be in format id:secret');
  process.exit(1);
}

// ── Ghost Admin API ────────────────────────────────────────────────────────

function makeGhostToken() {
  return jwt.sign({}, Buffer.from(adminSecret, 'hex'), {
    keyid: adminId,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/',
  });
}

async function ghostAdmin(endpoint, options = {}) {
  const token = makeGhostToken();
  const url = `${GHOST_URL}/ghost/api/admin/${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Ghost ${token}`,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Ghost API ${res.status}: ${body}`);
  }
  return res.json();
}

async function fetchPost(slug) {
  const data = await ghostAdmin(`posts/slug/${slug}/?formats=lexical`);
  return data?.posts?.[0] || null;
}

async function fetchAllPosts() {
  const data = await ghostAdmin('posts/?formats=lexical&limit=all');
  return data?.posts || [];
}

async function updatePost(postId, updates, updatedAt) {
  return ghostAdmin(`posts/${postId}/`, {
    method: 'PUT',
    body: JSON.stringify({
      posts: [{ ...updates, updated_at: updatedAt }],
    }),
  });
}

// ── Content Analysis ───────────────────────────────────────────────────────

/**
 * Parse Lexical JSON and extract heading text from h2 nodes.
 */
function extractHeadings(lexicalJson) {
  if (!lexicalJson) return [];

  let doc;
  try {
    doc = typeof lexicalJson === 'string' ? JSON.parse(lexicalJson) : lexicalJson;
  } catch {
    return [];
  }

  const headings = [];
  const root = doc.root;
  if (!root || !root.children) return [];

  for (const node of root.children) {
    if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
      const text = extractTextFromNode(node);
      if (text) headings.push({ tag: node.tag, text });
    }
  }
  return headings;
}

function extractTextFromNode(node) {
  if (!node) return '';
  if (node.type === 'text') return node.text || '';
  if (node.children) return node.children.map(extractTextFromNode).join('');
  return '';
}

/**
 * Determine the post's primary topic (roofing, siding, general exteriors, etc.)
 */
function detectTopic(title, headings) {
  const allText = [title, ...headings.map(h => h.text)].join(' ').toLowerCase();

  if (allText.includes('roof') || allText.includes('shingle') || allText.includes('gutter')) {
    return 'roofing';
  }
  if (allText.includes('siding') || allText.includes('hardie') || allText.includes('fiber cement')) {
    return 'siding';
  }
  if (allText.includes('window') || allText.includes('door')) {
    return 'windows-doors';
  }
  if (allText.includes('paint') || allText.includes('exterior finish')) {
    return 'painting';
  }
  return 'general-exteriors';
}

/**
 * Generate search terms for each heading section.
 * Returns an array of { heading, terms[] } objects.
 */
function generateSearchTerms(title, headings, topic) {
  const sections = [];

  // Modifiers based on detected topic
  const topicModifiers = {
    roofing: ['roofing', 'roof replacement', 'shingles', 'roof repair'],
    siding: ['siding installation', 'James Hardie', 'fiber cement siding', 'home exterior'],
    'windows-doors': ['window installation', 'exterior door', 'home improvement'],
    painting: ['exterior painting', 'house painting', 'paint crew'],
    'general-exteriors': ['home exterior', 'home improvement', 'construction crew'],
  };

  const localModifiers = ['Bay Area', 'California home', 'residential'];
  const modifiers = topicModifiers[topic] || topicModifiers['general-exteriors'];

  for (const heading of headings) {
    const terms = [];
    const headingText = heading.text
      .replace(/^\d+\.\s*/, '') // strip leading numbers
      .replace(/bonus:\s*/i, '');

    // Primary: heading + topic modifier
    terms.push(`${headingText} ${modifiers[0]}`);

    // Secondary: heading + local modifier
    terms.push(`${headingText} ${localModifiers[0]}`);

    // Tertiary: just the heading cleaned up for broader results
    if (headingText.split(' ').length >= 3) {
      terms.push(headingText);
    }

    sections.push({ heading: heading.text, terms });
  }

  return sections;
}

// ── Image Quality Scoring ──────────────────────────────────────────────────

/**
 * Score an image result for quality/relevance (0-100).
 */
function scoreImage(image, searchTerm, topic) {
  let score = 50; // baseline

  // Prefer landscape
  if (image.width && image.height) {
    const ratio = image.width / image.height;
    if (ratio >= 1.3 && ratio <= 2.0) score += 15; // ideal landscape
    else if (ratio >= 1.0 && ratio < 1.3) score += 5; // slightly landscape
    else score -= 10; // portrait
  }

  // Prefer larger images
  if (image.width >= 1200) score += 10;
  else if (image.width >= 800) score += 5;
  else score -= 5;

  // Prefer photos (not illustrations) — check description/tags if available
  const desc = (image.description || image.alt || '').toLowerCase();
  if (desc.includes('illustration') || desc.includes('diagram') || desc.includes('icon') || desc.includes('vector')) {
    score -= 20;
  }

  // Topic-specific boosts
  if (topic === 'roofing') {
    const roofTerms = ['roof', 'shingle', 'aerial', 'crew', 'construction', 'house', 'home'];
    for (const t of roofTerms) {
      if (desc.includes(t)) { score += 5; break; }
    }
  } else if (topic === 'siding') {
    const sidingTerms = ['siding', 'exterior', 'hardie', 'facade', 'home', 'house'];
    for (const t of sidingTerms) {
      if (desc.includes(t)) { score += 5; break; }
    }
  }

  // Boost for Bay Area / California content
  const bayAreaTerms = ['bay area', 'california', 'san francisco', 'oakland', 'san jose'];
  for (const t of bayAreaTerms) {
    if (desc.includes(t)) { score += 10; break; }
  }

  return Math.max(0, Math.min(100, score));
}

// ── Image Source: Unsplash ─────────────────────────────────────────────────

async function searchUnsplash(query) {
  if (!UNSPLASH_ACCESS_KEY) {
    log('  [Unsplash] Skipped — no API key');
    return [];
  }

  try {
    const params = new URLSearchParams({
      query,
      orientation: 'landscape',
      per_page: '5',
    });

    const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    });

    if (!res.ok) {
      log(`  [Unsplash] API error ${res.status}`);
      return [];
    }

    const data = await res.json();
    return (data.results || []).map(photo => ({
      source: 'unsplash',
      id: photo.id,
      url: photo.urls.regular,
      width: photo.width,
      height: photo.height,
      description: photo.description || photo.alt_description || '',
      alt: photo.alt_description || photo.description || query,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      downloadTrackUrl: photo.links.download_location,
      attribution: `Photo by ${photo.user.name} on Unsplash`,
      license: 'Unsplash License',
    }));
  } catch (err) {
    log(`  [Unsplash] Error: ${err.message}`);
    return [];
  }
}

/**
 * Trigger Unsplash download tracking (required by API terms).
 */
async function trackUnsplashDownload(trackUrl) {
  if (!UNSPLASH_ACCESS_KEY || !trackUrl) return;
  try {
    await fetch(trackUrl, {
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    });
  } catch {
    // Non-critical — best effort
  }
}

// ── Image Source: Pexels ───────────────────────────────────────────────────

async function searchPexels(query) {
  if (!PEXELS_API_KEY) {
    log('  [Pexels] Skipped — no API key');
    return [];
  }

  try {
    const params = new URLSearchParams({
      query,
      orientation: 'landscape',
      per_page: '5',
    });

    const res = await fetch(`https://api.pexels.com/v1/search?${params}`, {
      headers: { Authorization: PEXELS_API_KEY },
    });

    if (!res.ok) {
      log(`  [Pexels] API error ${res.status}`);
      return [];
    }

    const data = await res.json();
    return (data.photos || []).map(photo => ({
      source: 'pexels',
      id: String(photo.id),
      url: photo.src.large2x || photo.src.large,
      width: photo.width,
      height: photo.height,
      description: photo.alt || '',
      alt: photo.alt || query,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      attribution: `Photo by ${photo.photographer} on Pexels`,
      license: 'Pexels License',
    }));
  } catch (err) {
    log(`  [Pexels] Error: ${err.message}`);
    return [];
  }
}

// ── Image Source: Flickr ───────────────────────────────────────────────────

async function searchFlickr(query) {
  if (!FLICKR_API_KEY) {
    log('  [Flickr] Skipped — no API key');
    return [];
  }

  try {
    const params = new URLSearchParams({
      method: 'flickr.photos.search',
      api_key: FLICKR_API_KEY,
      text: query,
      license: '4,5,6,9,10', // Commercial CC licenses
      content_type: '1', // Photos only
      sort: 'relevance',
      extras: 'url_l,url_o,license,owner_name',
      per_page: '5',
      format: 'json',
      nojsoncallback: '1',
      // Bay Area geo-filter
      lat: '37.7749',
      lon: '-122.4194',
      radius: '50',
    });

    const res = await fetch(`https://api.flickr.com/services/rest/?${params}`);

    if (!res.ok) {
      log(`  [Flickr] API error ${res.status}`);
      return [];
    }

    const data = await res.json();

    if (data.stat !== 'ok' || !data.photos || !data.photos.photo) {
      log(`  [Flickr] No results or API error`);
      return [];
    }

    const licenseNames = {
      '4': 'CC BY 2.0',
      '5': 'CC BY-SA 2.0',
      '6': 'CC BY-ND 2.0',
      '9': 'CC0 1.0',
      '10': 'Public Domain Mark',
    };

    return data.photos.photo
      .filter(photo => photo.url_l) // Must have large URL
      .map(photo => ({
        source: 'flickr',
        id: photo.id,
        url: photo.url_l,
        width: parseInt(photo.width_l, 10) || 1024,
        height: parseInt(photo.height_l, 10) || 768,
        description: photo.title || '',
        alt: photo.title || query,
        photographer: photo.ownername || 'Unknown',
        photographerUrl: `https://www.flickr.com/people/${photo.owner}/`,
        attribution: `Photo by ${photo.ownername || 'Unknown'} — ${licenseNames[photo.license] || 'CC License'}`,
        license: licenseNames[photo.license] || 'Creative Commons',
      }));
  } catch (err) {
    log(`  [Flickr] Error: ${err.message}`);
    return [];
  }
}

// ── Image Source: Shutterstock ──────────────────────────────────────────────

let shutterstockToken = null;

async function getShutterstockToken() {
  if (shutterstockToken) return shutterstockToken;
  if (!SHUTTERSTOCK_CLIENT_ID || !SHUTTERSTOCK_CLIENT_SECRET) return null;

  try {
    const res = await fetch('https://api.shutterstock.com/v2/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: SHUTTERSTOCK_CLIENT_ID,
        client_secret: SHUTTERSTOCK_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    });

    if (!res.ok) {
      log(`  [Shutterstock] Token error ${res.status}`);
      return null;
    }

    const data = await res.json();
    shutterstockToken = data.access_token;
    return shutterstockToken;
  } catch (err) {
    log(`  [Shutterstock] Token error: ${err.message}`);
    return null;
  }
}

async function searchShutterstock(query) {
  const token = await getShutterstockToken();
  if (!token) {
    log('  [Shutterstock] Skipped — no credentials or token failure');
    return [];
  }

  try {
    const params = new URLSearchParams({
      query,
      orientation: 'horizontal',
      per_page: '5',
      image_type: 'photo',
    });

    const res = await fetch(`https://api.shutterstock.com/v2/images/search?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      log(`  [Shutterstock] API error ${res.status}`);
      return [];
    }

    const data = await res.json();
    return (data.data || []).map(img => ({
      source: 'shutterstock',
      id: img.id,
      // Preview URL only — actual downloads require paid plan
      url: img.assets?.preview_1000?.url || img.assets?.preview?.url || null,
      width: img.assets?.preview_1000?.width || 1000,
      height: img.assets?.preview_1000?.height || 667,
      description: img.description || '',
      alt: img.description || query,
      photographer: img.contributor?.id || 'Shutterstock Contributor',
      attribution: `Shutterstock — requires license for production use`,
      license: 'Shutterstock Standard License (preview only)',
      isPreviewOnly: true,
    }));
  } catch (err) {
    log(`  [Shutterstock] Error: ${err.message}`);
    return [];
  }
}

// ── Image Search Orchestrator ──────────────────────────────────────────────

/**
 * Search all sources in priority order for a given query.
 * Returns the best-scoring image above threshold, or null.
 */
async function findBestImage(query, topic, sectionContext) {
  log(`  Searching: "${query}"`);

  // Gather candidates from all sources
  const [unsplashResults, pexelsResults, flickrResults, ssResults] = await Promise.all([
    searchUnsplash(query),
    searchPexels(query),
    searchFlickr(query),
    searchShutterstock(query),
  ]);

  // Pre-filter by basic dimensions/orientation (fast, no API cost)
  const allResults = [...unsplashResults, ...pexelsResults, ...flickrResults, ...ssResults];

  if (allResults.length === 0) {
    log(`    -> No images found for this query`);
    return null;
  }

  // Basic score to pre-filter: keep top 6 by dimensions/orientation
  const preScored = allResults
    .map(image => ({ image, score: scoreImage(image, query, topic) }))
    .filter(r => r.score >= QUALITY_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  if (preScored.length === 0) {
    // Fallback: take best basic-scored result even below threshold
    const fallback = pickBest(allResults, query, topic);
    if (fallback) {
      log(`    -> Fallback (no vision): ${fallback.image.source} basic-score=${fallback.score}`);
      return fallback.image;
    }
    return null;
  }

  // Vision scoring with DeepInfra (if API key available)
  if (process.env.DEEPINFRA_API_KEY && sectionContext) {
    try {
      const { scoreCandidates } = require('./image-scorer.cjs');
      const candidates = preScored.map(r => ({
        url: r.image.url,
        source: r.image.source,
        photographer: r.image.photographer,
        _image: r.image, // carry original data through
      }));

      log(`    Running vision scoring on ${candidates.length} candidates...`);
      const ranked = await scoreCandidates(candidates, sectionContext);

      if (ranked.length > 0) {
        const winner = ranked[0];
        // Find original image data
        const original = candidates.find(c => c.url === winner.url);
        log(`    -> Vision winner: [${winner.source}] score=${winner.score.total} "${winner.score.reasoning}"`);
        return original?._image || preScored[0].image;
      }
    } catch (err) {
      log(`    Vision scoring error: ${err.message} — falling back to basic scoring`);
    }
  }

  // Fallback: best basic-scored result
  const best = preScored[0];
  log(`    -> Best (basic score): [${best.image.source}] score=${best.score} "${best.image.alt}"`);
  return best.image;
}

function pickBest(results, query, topic) {
  if (!results.length) return null;

  let best = null;
  let bestScore = -1;

  for (const image of results) {
    const score = scoreImage(image, query, topic);
    if (score > bestScore) {
      bestScore = score;
      best = image;
    }
  }

  return best ? { image: best, score: bestScore } : null;
}

// ── Image Download ─────────────────────────────────────────────────────────

/**
 * Download an image to local disk. Returns the local filename, or null on failure.
 * Skips download if file already exists (idempotent).
 */
async function downloadImage(image, postSlug, index) {
  if (!image.url) {
    log(`    Skipping download — no URL (${image.source} preview only)`);
    return null;
  }

  const postDir = path.join(IMAGES_DIR, postSlug);
  fs.mkdirSync(postDir, { recursive: true });

  // Determine file extension from URL
  const urlPath = new URL(image.url).pathname;
  let ext = path.extname(urlPath).split('?')[0] || '.jpg';
  // Normalize extension
  if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext.toLowerCase())) {
    ext = '.jpg';
  }

  const filename = `${index}-${image.source}-${image.id}${ext}`;
  const filepath = path.join(postDir, filename);

  // Idempotent — skip if exists
  if (fs.existsSync(filepath)) {
    log(`    Already exists: ${filename}`);
    return filename;
  }

  try {
    const res = await fetch(image.url);
    if (!res.ok) {
      log(`    Download failed (${res.status}): ${image.url}`);
      return null;
    }

    const fileStream = fs.createWriteStream(filepath);
    await pipeline(Readable.fromWeb(res.body), fileStream);

    log(`    Downloaded: ${filename} (${image.source})`);

    // Trigger Unsplash download tracking
    if (image.source === 'unsplash') {
      await trackUnsplashDownload(image.downloadTrackUrl);
    }

    return filename;
  } catch (err) {
    log(`    Download error: ${err.message}`);
    // Clean up partial file
    try { fs.unlinkSync(filepath); } catch {}
    return null;
  }
}

// ── Lexical Content Manipulation ───────────────────────────────────────────

/**
 * Build a Lexical image card node.
 */
function lexicalImageCard(src, alt, caption, width, height) {
  return {
    type: 'image',
    version: 1,
    src,
    width: width || 1200,
    height: height || 800,
    alt: alt || '',
    caption: caption || '',
    cardWidth: 'wide',
  };
}

/**
 * Insert image nodes into Lexical document at natural section breaks (before h2 headings).
 * Returns the modified Lexical JSON string.
 */
function insertImagesIntoLexical(lexicalJson, imageInserts) {
  if (!lexicalJson || !imageInserts.length) return lexicalJson;

  let doc;
  try {
    doc = typeof lexicalJson === 'string' ? JSON.parse(lexicalJson) : JSON.parse(JSON.stringify(lexicalJson));
  } catch {
    log('  WARNING: Could not parse Lexical JSON');
    return lexicalJson;
  }

  const children = doc.root.children;
  if (!children) return lexicalJson;

  // Find h2 heading indices
  const h2Indices = [];
  for (let i = 0; i < children.length; i++) {
    if (children[i].type === 'heading' && children[i].tag === 'h2') {
      h2Indices.push(i);
    }
  }

  if (h2Indices.length === 0) return lexicalJson;

  // Map images to section breaks: insert before every N-th h2
  // Distribute images evenly across available section breaks
  const insertPositions = [];
  const spacing = Math.max(1, Math.floor(h2Indices.length / imageInserts.length));

  let imageIdx = 0;
  for (let i = 0; i < h2Indices.length && imageIdx < imageInserts.length; i++) {
    // Insert before the first h2, then every `spacing` h2s
    if (i === 0 || (i % spacing === 0 && imageIdx < imageInserts.length)) {
      insertPositions.push({
        beforeIndex: h2Indices[i],
        image: imageInserts[imageIdx],
      });
      imageIdx++;
    }
  }

  // Insert in reverse order so indices remain valid
  insertPositions.reverse();
  for (const { beforeIndex, image } of insertPositions) {
    const imageNode = lexicalImageCard(
      image.publicUrl,
      image.alt,
      image.caption,
      image.width,
      image.height
    );
    children.splice(beforeIndex, 0, imageNode);
  }

  return JSON.stringify(doc);
}

/**
 * Check if the Lexical content already has image nodes.
 */
function lexicalHasImages(lexicalJson) {
  if (!lexicalJson) return false;
  try {
    const doc = typeof lexicalJson === 'string' ? JSON.parse(lexicalJson) : lexicalJson;
    return (doc.root.children || []).some(n => n.type === 'image');
  } catch {
    return false;
  }
}

// ── Attribution Tracking ───────────────────────────────────────────────────

/**
 * Save attribution data for CC-licensed images.
 */
function saveAttribution(postSlug, attributions) {
  if (!attributions.length) return;

  const postDir = path.join(IMAGES_DIR, postSlug);
  fs.mkdirSync(postDir, { recursive: true });

  const attrPath = path.join(postDir, 'ATTRIBUTION.json');
  let existing = [];

  if (fs.existsSync(attrPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(attrPath, 'utf-8'));
    } catch {}
  }

  // Merge — avoid duplicates by image ID
  const existingIds = new Set(existing.map(a => a.id));
  for (const attr of attributions) {
    if (!existingIds.has(attr.id)) {
      existing.push(attr);
    }
  }

  fs.writeFileSync(attrPath, JSON.stringify(existing, null, 2));
  log(`  Saved attribution data: ${attrPath}`);
}

// ── Logging ────────────────────────────────────────────────────────────────

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${msg}`);
}

// ── Main Pipeline ──────────────────────────────────────────────────────────

async function processPost(slug) {
  log(`\n========================================`);
  log(`Processing post: ${slug}`);
  log(`========================================`);

  // 1. Fetch the post
  const post = await fetchPost(slug);
  if (!post) {
    log(`ERROR: Post not found: ${slug}`);
    return;
  }

  log(`Post: "${post.title}" (id: ${post.id})`);
  log(`Status: ${post.status} | Feature image: ${post.feature_image ? 'YES' : 'NONE'}`);

  // Check if post already has inline images
  if (lexicalHasImages(post.lexical)) {
    log(`Post already contains inline images — skipping image insertion.`);
    log(`(Delete images from Lexical content to re-run pipeline on this post)`);
    return;
  }

  // 2. Analyze content
  const headings = extractHeadings(post.lexical);
  log(`Found ${headings.length} headings`);

  if (headings.length === 0) {
    log(`No headings found — cannot determine section breaks. Skipping.`);
    return;
  }

  const topic = detectTopic(post.title, headings);
  log(`Detected topic: ${topic}`);

  // 3. Generate search terms
  const sections = generateSearchTerms(post.title, headings, topic);
  log(`Generated search terms for ${sections.length} sections`);

  // Limit to 3-5 images per post (spread across sections)
  const maxImages = Math.min(5, Math.max(3, Math.ceil(sections.length / 2)));
  const targetSections = [];
  const step = Math.max(1, Math.floor(sections.length / maxImages));

  for (let i = 0; i < sections.length && targetSections.length < maxImages; i += step) {
    targetSections.push(sections[i]);
  }

  log(`Targeting ${targetSections.length} images across ${sections.length} sections`);

  // 4. Find and download images
  const imageInserts = [];
  const attributions = [];
  const usedImageIds = new Set();

  for (let i = 0; i < targetSections.length; i++) {
    const section = targetSections[i];
    log(`\nSection: "${section.heading}"`);

    let selectedImage = null;

    // Build section context for vision scoring
    const sectionContext = {
      postTopic: post.title,
      sectionHeading: section.heading,
      sectionContent: section.heading, // heading is the best context we have
    };

    // Try each search term for this section
    for (const term of section.terms) {
      selectedImage = await findBestImage(term, topic, sectionContext);

      // Skip if we already used this image for another section
      if (selectedImage && usedImageIds.has(`${selectedImage.source}-${selectedImage.id}`)) {
        log(`    Duplicate — trying next term`);
        selectedImage = null;
        continue;
      }

      if (selectedImage) break;
    }

    if (!selectedImage) {
      log(`  No suitable image found for section "${section.heading}"`);
      continue;
    }

    usedImageIds.add(`${selectedImage.source}-${selectedImage.id}`);

    // Download
    const filename = await downloadImage(selectedImage, slug, i + 1);
    if (!filename) {
      log(`  Download failed — skipping`);
      continue;
    }

    // Build public URL for the image
    const publicUrl = `${SITE_URL}/blog-images/${slug}/${filename}`;

    // Build caption/attribution
    let caption = '';
    if (selectedImage.source === 'flickr') {
      caption = selectedImage.attribution;
    } else if (selectedImage.source === 'unsplash') {
      caption = `Photo by <a href="${selectedImage.photographerUrl}?utm_source=hamilton_exteriors&utm_medium=referral">${selectedImage.photographer}</a> on <a href="https://unsplash.com/?utm_source=hamilton_exteriors&utm_medium=referral">Unsplash</a>`;
    } else if (selectedImage.source === 'pexels') {
      caption = `Photo by <a href="${selectedImage.photographerUrl}">${selectedImage.photographer}</a> on <a href="https://www.pexels.com">Pexels</a>`;
    } else if (selectedImage.source === 'shutterstock') {
      caption = 'Shutterstock — licensed for editorial use';
    }

    // Alt text: use heading context + image description
    const altText = selectedImage.alt || `${section.heading} — Hamilton Exteriors`;

    imageInserts.push({
      sectionHeading: section.heading,
      publicUrl,
      filename,
      alt: altText,
      caption,
      width: selectedImage.width,
      height: selectedImage.height,
      source: selectedImage.source,
    });

    // Track attribution for CC-licensed images
    if (selectedImage.source === 'flickr' || selectedImage.source === 'unsplash' || selectedImage.source === 'pexels') {
      attributions.push({
        id: selectedImage.id,
        source: selectedImage.source,
        photographer: selectedImage.photographer,
        photographerUrl: selectedImage.photographerUrl,
        license: selectedImage.license,
        attribution: selectedImage.attribution,
        filename,
        usedInSection: section.heading,
      });
    }
  }

  if (imageInserts.length === 0) {
    log(`\nNo images found for any section. Skipping Ghost update.`);
    return;
  }

  log(`\n--- Results ---`);
  log(`Found ${imageInserts.length} images:`);
  for (const img of imageInserts) {
    log(`  [${img.source}] ${img.filename} -> "${img.sectionHeading}"`);
  }

  // 5. Save attribution data
  saveAttribution(slug, attributions);

  // 6. Insert images into Lexical content
  const updatedLexical = insertImagesIntoLexical(post.lexical, imageInserts);

  // 7. Set feature image if none exists
  const updates = {
    lexical: updatedLexical,
    mobiledoc: null,
  };

  if (!post.feature_image && imageInserts.length > 0) {
    updates.feature_image = imageInserts[0].publicUrl;
    log(`Setting feature image: ${imageInserts[0].filename}`);
  }

  // 8. Update Ghost post
  log(`\nUpdating Ghost post...`);
  try {
    // Re-fetch to get latest updated_at (in case it changed)
    const freshPost = await fetchPost(slug);
    await updatePost(post.id, updates, freshPost.updated_at);
    log(`Ghost post updated successfully.`);
  } catch (err) {
    log(`ERROR updating Ghost post: ${err.message}`);

    // Save the updated Lexical content locally as fallback
    const fallbackPath = path.join(IMAGES_DIR, slug, 'lexical-with-images.json');
    fs.writeFileSync(fallbackPath, updatedLexical);
    log(`Saved updated Lexical content to: ${fallbackPath}`);
  }

  // Log Shutterstock items that need manual review
  const shutterstockItems = imageInserts.filter(i => i.source === 'shutterstock');
  if (shutterstockItems.length > 0) {
    log(`\n--- MANUAL REVIEW NEEDED ---`);
    log(`${shutterstockItems.length} image(s) from Shutterstock are preview-only.`);
    log(`Purchase licenses or replace with alternatives:`);
    for (const item of shutterstockItems) {
      log(`  ${item.filename} — used in "${item.sectionHeading}"`);
    }
  }

  log(`\nDone with: ${slug}`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node scripts/blog-image-pipeline.cjs <post-slug>');
    console.log('  node scripts/blog-image-pipeline.cjs --all');
    console.log('');
    console.log('Environment variables:');
    console.log('  PUBLIC_GHOST_URL           Ghost CMS URL (required)');
    console.log('  GHOST_ADMIN_API_KEY        Ghost Admin API key (required)');
    console.log('  UNSPLASH_ACCESS_KEY        Unsplash API key');
    console.log('  PEXELS_API_KEY             Pexels API key');
    console.log('  FLICKR_API_KEY             Flickr API key');
    console.log('  SHUTTERSTOCK_CLIENT_ID     Shutterstock client ID');
    console.log('  SHUTTERSTOCK_CLIENT_SECRET Shutterstock client secret');
    console.log('  DEEPINFRA_API_KEY          DeepInfra API key (vision scoring, optional)');
    process.exit(0);
  }

  // Check which image sources are configured
  log('Image sources configured:');
  log(`  Unsplash:     ${UNSPLASH_ACCESS_KEY ? 'YES' : 'NO'}`);
  log(`  Pexels:       ${PEXELS_API_KEY ? 'YES' : 'NO'}`);
  log(`  Flickr:       ${FLICKR_API_KEY ? 'YES' : 'NO'}`);
  log(`  Shutterstock: ${SHUTTERSTOCK_CLIENT_ID ? 'YES' : 'NO'}`);
  log(`  Vision (DeepInfra): ${process.env.DEEPINFRA_API_KEY ? 'YES' : 'NO (basic scoring only)'}`);

  const activeSources = [UNSPLASH_ACCESS_KEY, PEXELS_API_KEY, FLICKR_API_KEY, SHUTTERSTOCK_CLIENT_ID].filter(Boolean).length;
  if (activeSources === 0) {
    log('\nERROR: No image source API keys configured. Set at least one of:');
    log('  UNSPLASH_ACCESS_KEY, PEXELS_API_KEY, FLICKR_API_KEY, SHUTTERSTOCK_CLIENT_ID');
    process.exit(1);
  }

  log(`Ghost CMS: ${GHOST_URL}`);

  if (args[0] === '--all') {
    log('\nFetching all posts...');
    const posts = await fetchAllPosts();
    log(`Found ${posts.length} posts`);

    for (const post of posts) {
      try {
        await processPost(post.slug);
      } catch (err) {
        log(`ERROR processing ${post.slug}: ${err.message}`);
      }
    }
  } else {
    for (const slug of args) {
      try {
        await processPost(slug);
      } catch (err) {
        log(`ERROR processing ${slug}: ${err.message}`);
      }
    }
  }

  log('\n========================================');
  log('Pipeline complete.');
  log('========================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
