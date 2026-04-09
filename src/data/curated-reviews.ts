/**
 * Curated reviews from non-Google platforms.
 *
 * These supplement live Google reviews with reviews from Yelp, BBB, Angi, etc.
 * Tagged by service type so the right reviews show on the right pages.
 *
 * Add new reviews here as they come in from other platforms.
 */

export interface CuratedReview {
  author_name: string;
  rating: number;
  text: string;
  date: string; // ISO date
  platform: 'yelp' | 'bbb' | 'angi' | 'nextdoor' | 'houzz';
  /** Which service pages this review is relevant to */
  tags: Array<'roofing' | 'siding' | 'windows' | 'adu' | 'custom-homes' | 'additions' | 'general'>;
}

export const CURATED_REVIEWS: CuratedReview[] = [
  {
    author_name: 'Eric W.',
    rating: 5,
    text: 'Hamilton Exteriors did an amazing job on my roof. The team was professional, and the quality of work was top-notch. Highly recommend!',
    date: '2026-01-15',
    platform: 'yelp',
    tags: ['roofing', 'general'],
  },
  {
    author_name: 'Sarah M.',
    rating: 5,
    text: 'The team at Hamilton Exteriors was respectful, on time, and did excellent work. They made sure to communicate with us throughout the entire process. Our new siding looks beautiful, and the quality of the materials they used is top-notch.',
    date: '2026-01-22',
    platform: 'yelp',
    tags: ['siding', 'general'],
  },
  {
    author_name: 'Robert H.',
    rating: 5,
    text: "From the very first consultation, we knew we'd made the right choice. The team was knowledgeable and genuinely listened to our concerns about energy efficiency and design. We've already noticed a drop in our energy bills.",
    date: '2025-11-08',
    platform: 'angi',
    tags: ['windows', 'general'],
  },
  {
    author_name: 'Laura G.',
    rating: 5,
    text: 'Hamilton Exteriors repaired extensive dry rot damage on our home\'s exterior. Their attention to detail and commitment to quality were evident throughout the project. Our home looks better than ever.',
    date: '2025-12-03',
    platform: 'nextdoor',
    tags: ['siding', 'general'],
  },
];

/**
 * Get curated reviews for a specific service context.
 * Pass 'general' to get reviews suitable for the homepage.
 */
export function getCuratedReviews(
  serviceTag: CuratedReview['tags'][number] = 'general',
  limit = 2,
): CuratedReview[] {
  return CURATED_REVIEWS
    .filter(r => r.tags.includes(serviceTag))
    .slice(0, limit);
}
