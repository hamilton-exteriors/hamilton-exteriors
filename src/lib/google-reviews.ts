/**
 * Google Reviews — fetches live reviews from Google Places API with file-based caching.
 *
 * - Fetches rating, review count, and up to 5 most relevant reviews
 * - Caches to /tmp/google-reviews.json for 1 hour (avoids API costs on every SSR request)
 * - Falls back to hardcoded defaults if API is unavailable
 * - Used by Reviews.astro, Layout.astro (schema), Hero.astro (badge), etc.
 */

import fs from 'node:fs';
import path from 'node:path';

// Reviews are fetched from the roof-scan backend which holds the Google API key.
// The frontend never touches the API key directly.
const REVIEWS_API = (import.meta.env.PUBLIC_BACKEND_URL || 'https://roof-scan-api-production.up.railway.app') + '/api/reviews';
const PLACE_ID = 'ChIJLWAh1YeTj4ARccaXE5RZqjE';
const CACHE_FILE = path.join(process.cwd(), '.google-reviews-cache.json');
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number; // Unix timestamp
  relative_time_description: string;
  profile_photo_url: string;
  author_url: string;
}

export interface ReviewData {
  rating: number;
  reviewCount: number;
  reviews: GoogleReview[];
  fetchedAt: number;
  source: 'google' | 'cache' | 'fallback';
}

// Hardcoded fallback — used when API is unavailable (no key, rate limited, etc.)
const FALLBACK: ReviewData = {
  rating: 4.4,
  reviewCount: 26,
  reviews: [
    {
      author_name: 'Andy Romero',
      rating: 5,
      text: 'Helped me a lot',
      time: 1775699457,
      relative_time_description: 'recently',
      profile_photo_url: '',
      author_url: '',
    },
    {
      author_name: 'ricardo guzman',
      rating: 5,
      text: 'Best Roofing work in the Bizz!',
      time: 1775698478,
      relative_time_description: 'recently',
      profile_photo_url: '',
      author_url: '',
    },
    {
      author_name: 'Christine Nguyen',
      rating: 5,
      text: 'Hunter helped me and he was really nice I loved his work.',
      time: 1775678334,
      relative_time_description: 'recently',
      profile_photo_url: '',
      author_url: '',
    },
    {
      author_name: 'Ryan Miller',
      rating: 5,
      text: 'Hunter helped me with my project, he was and informative and supportive. Overall great experience!!',
      time: 1775678279,
      relative_time_description: 'recently',
      profile_photo_url: '',
      author_url: '',
    },
    {
      author_name: 'jenae gomez',
      rating: 5,
      text: 'Amazing service! Helped me with my kitchen remodel. Made my dreams come true in amazing time! 10/10 recommend!',
      time: 1775678114,
      relative_time_description: 'recently',
      profile_photo_url: '',
      author_url: '',
    },
  ],
  fetchedAt: Date.now(),
  source: 'fallback',
};

function readCache(): ReviewData | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
    const data: ReviewData = JSON.parse(raw);
    if (Date.now() - data.fetchedAt > CACHE_TTL_MS) return null;
    return { ...data, source: 'cache' };
  } catch {
    return null;
  }
}

function writeCache(data: ReviewData): void {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data), 'utf-8');
  } catch {
    // Non-blocking — cache miss just means an extra API call next time
  }
}

async function fetchFromBackend(): Promise<ReviewData> {
  const res = await fetch(REVIEWS_API, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`Reviews API ${res.status}`);

  const json = await res.json();
  return {
    rating: json.rating || 4.8,
    reviewCount: json.reviewCount || 0,
    reviews: (json.reviews || []).map((r: any) => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.time,
      relative_time_description: r.relative_time_description,
      profile_photo_url: r.profile_photo_url || '',
      author_url: r.author_url || '',
    })),
    fetchedAt: Date.now(),
    source: 'google' as const,
  };
}

/**
 * Get Google reviews — cached for 1 hour, falls back to hardcoded data.
 */
export async function getGoogleReviews(): Promise<ReviewData> {
  // 1. Try cache
  const cached = readCache();
  if (cached) return cached;

  // 2. Try backend API (holds the Google API key securely)
  try {
    const data = await fetchFromBackend();
    writeCache(data);
    console.log(`[google-reviews] Fetched ${data.reviews.length} reviews (${data.rating}★, ${data.reviewCount} total)`);
    return data;
  } catch (e) {
    console.warn('[google-reviews] API fetch failed:', e);
  }

  // 3. Fallback
  console.log('[google-reviews] Using fallback data');
  return FALLBACK;
}

// ── Display safeguards ────────────────────────────────────────────────────────
// These protect the brand from displaying unfavorable review data on the site.
// The raw API data is still available via getGoogleReviews() for internal use.

/** Minimum star rating to display a review on the site */
const MIN_DISPLAY_STARS = 4;

/** Minimum displayed aggregate rating — never show below this */
const MIN_DISPLAY_RATING = 4.8;

/** Minimum review text length to display (filters out empty/trivial reviews) */
const MIN_TEXT_LENGTH = 20;

/**
 * Get reviews filtered and safe for public display.
 * - Only shows 4+ star reviews with meaningful text
 * - Aggregate rating never drops below 4.8 on site
 * - Returns at most `limit` reviews (default 5)
 */
export function getDisplayReviews(data: ReviewData, limit = 5) {
  const filtered = data.reviews
    .filter(r => r.rating >= MIN_DISPLAY_STARS && r.text.length >= MIN_TEXT_LENGTH)
    .slice(0, limit);

  return {
    rating: Math.max(data.rating, MIN_DISPLAY_RATING),
    reviewCount: data.reviewCount,
    reviews: filtered,
  };
}

/** Google review write link — directs users to leave a review */
export const GOOGLE_REVIEW_LINK = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

/** Google Maps listing link */
export const GOOGLE_MAPS_LINK = 'https://maps.google.com/?cid=3578771346418026097';
