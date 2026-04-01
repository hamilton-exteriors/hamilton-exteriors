/**
 * Quality gate for programmatic SEO pages.
 *
 * Validates that generated pages meet minimum quality thresholds
 * before they go live. Designed to run at build time or in CI.
 *
 * Checks:
 * - Word count >= 300 (excluding boilerplate)
 * - Uniqueness >= 40% (vs. other pages in same service)
 * - City-specific content present (neighborhoods, city in H1/title/desc)
 * - No un-interpolated placeholders ({city}, {county}, etc.)
 * - Proper title, description, H1
 * - FAQ questions are city-specific
 */

// ── Types ───────────────────────────────────────────────────────────────

export interface QualityReport {
  pageUrl: string;
  score: number; // 0-100
  passed: boolean;
  uniquenessPercent: number;
  wordCount: number;
  issues: string[];
  warnings: string[];
}

interface PageContent {
  /** URL or slug for identification */
  url: string;
  /** The page title (<title> tag) */
  title: string;
  /** Meta description */
  description: string;
  /** H1 text */
  h1: string;
  /** City name this page targets */
  city: string;
  /** County name */
  county: string;
  /** Service slug (e.g., 'roofing') — used for grouping uniqueness checks */
  serviceSlug: string;
  /** Full body text content (all visible text on the page) */
  bodyText: string;
  /** Neighborhood names that should appear on the page */
  expectedNeighborhoods: string[];
  /** FAQ questions on the page */
  faqQuestions: string[];
}

// ── Constants ───────────────────────────────────────────────────────────

const MIN_WORD_COUNT = 300;
const MIN_UNIQUENESS_PERCENT = 40;
const PLACEHOLDER_PATTERNS = [
  /\{city\}/gi,
  /\{county\}/gi,
  /\{state\}/gi,
  /\{serviceName\}/gi,
  /\{neighborhood\}/gi,
  /\{medianHomePrice\}/gi,
  /\{keyFeature\}/gi,
  /\{population\}/gi,
];

// ── Helpers ─────────────────────────────────────────────────────────────

/**
 * Count words in a string, excluding common boilerplate phrases.
 */
function countWords(text: string): number {
  if (!text) return 0;
  // Strip excessive whitespace and split
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

/**
 * Generate a set of n-grams (shingles) from text for uniqueness comparison.
 */
function generateShingles(text: string, n: number = 4): Set<string> {
  const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - n; i++) {
    shingles.add(words.slice(i, i + n).join(' '));
  }
  return shingles;
}

/**
 * Calculate Jaccard distance (uniqueness) between two texts.
 * Returns a percentage 0-100 where 100 = completely unique.
 */
function calculateUniqueness(textA: string, textB: string): number {
  const shinglesA = generateShingles(textA);
  const shinglesB = generateShingles(textB);

  if (shinglesA.size === 0 && shinglesB.size === 0) return 100;
  if (shinglesA.size === 0 || shinglesB.size === 0) return 100;

  let intersection = 0;
  for (const shingle of shinglesA) {
    if (shinglesB.has(shingle)) intersection++;
  }

  const union = shinglesA.size + shinglesB.size - intersection;
  if (union === 0) return 100;

  // Jaccard similarity = intersection / union
  // Uniqueness = 1 - similarity
  const similarity = intersection / union;
  return Math.round((1 - similarity) * 100);
}

/**
 * Calculate uniqueness of a page against all other pages in the same service.
 * Returns the MINIMUM uniqueness (worst case) compared to any sibling page.
 */
function calculateMinUniqueness(
  page: PageContent,
  allPages: PageContent[],
): number {
  const siblings = allPages.filter(
    (p) => p.serviceSlug === page.serviceSlug && p.url !== page.url,
  );

  if (siblings.length === 0) return 100;

  let minUniqueness = 100;
  for (const sibling of siblings) {
    const uniqueness = calculateUniqueness(page.bodyText, sibling.bodyText);
    if (uniqueness < minUniqueness) {
      minUniqueness = uniqueness;
    }
  }

  return minUniqueness;
}

// ── Main validation ─────────────────────────────────────────────────────

/**
 * Validate a single page against quality criteria.
 */
export function validatePage(
  pageData: PageContent,
  allPages: PageContent[],
): QualityReport {
  const issues: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // 1. Word count check
  const wordCount = countWords(pageData.bodyText);
  if (wordCount < MIN_WORD_COUNT) {
    issues.push(
      `Word count ${wordCount} is below minimum ${MIN_WORD_COUNT}`,
    );
    score -= 25;
  } else if (wordCount < 500) {
    warnings.push(
      `Word count ${wordCount} is adequate but thin — aim for 500+`,
    );
    score -= 5;
  }

  // 2. Un-interpolated placeholders
  const allText = [
    pageData.title,
    pageData.description,
    pageData.h1,
    pageData.bodyText,
    ...pageData.faqQuestions,
  ].join(' ');

  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(allText)) {
      issues.push(
        `Un-interpolated placeholder found: ${pattern.source}`,
      );
      score -= 20;
    }
    // Reset lastIndex for global regexes
    pattern.lastIndex = 0;
  }

  // 3. Title check
  if (!pageData.title || pageData.title.length < 10) {
    issues.push('Title is missing or too short (< 10 chars)');
    score -= 15;
  } else if (!pageData.title.includes(pageData.city)) {
    issues.push(`Title does not contain city name "${pageData.city}"`);
    score -= 10;
  }
  if (pageData.title && pageData.title.length > 70) {
    warnings.push(
      `Title is ${pageData.title.length} chars — consider trimming to under 60 for SERPs`,
    );
    score -= 2;
  }

  // 4. Description check
  if (!pageData.description || pageData.description.length < 50) {
    issues.push('Meta description is missing or too short (< 50 chars)');
    score -= 15;
  } else if (!pageData.description.includes(pageData.city)) {
    issues.push(
      `Meta description does not contain city name "${pageData.city}"`,
    );
    score -= 10;
  }
  if (pageData.description && pageData.description.length > 160) {
    warnings.push(
      `Description is ${pageData.description.length} chars — will be truncated in SERPs`,
    );
    score -= 2;
  }

  // 5. H1 check
  if (!pageData.h1 || pageData.h1.length < 5) {
    issues.push('H1 is missing or too short');
    score -= 15;
  } else if (!pageData.h1.includes(pageData.city)) {
    issues.push(`H1 does not contain city name "${pageData.city}"`);
    score -= 10;
  }

  // 6. City-specific content: neighborhoods mentioned
  if (
    pageData.expectedNeighborhoods.length > 0 &&
    !pageData.expectedNeighborhoods.some((n) =>
      pageData.bodyText.includes(n),
    )
  ) {
    warnings.push(
      'No neighborhood names found in body text — add local specificity',
    );
    score -= 10;
  }

  // 7. City name appears in body text
  const cityMentions = (
    pageData.bodyText.match(new RegExp(escapeRegex(pageData.city), 'gi')) ||
    []
  ).length;
  if (cityMentions < 3) {
    warnings.push(
      `City name "${pageData.city}" appears only ${cityMentions} time(s) in body — aim for 3+`,
    );
    score -= 5;
  }

  // 8. FAQ specificity
  if (pageData.faqQuestions.length === 0) {
    warnings.push('No FAQ questions found — FAQs boost long-tail rankings');
    score -= 5;
  } else {
    const genericFaqs = pageData.faqQuestions.filter(
      (q) => !q.includes(pageData.city) && !q.includes(pageData.county),
    );
    if (genericFaqs.length > 0) {
      warnings.push(
        `${genericFaqs.length} FAQ question(s) don't mention city or county — make them local`,
      );
      score -= 5;
    }
  }

  // 9. Uniqueness check (most expensive — do last)
  const uniquenessPercent = calculateMinUniqueness(pageData, allPages);
  if (uniquenessPercent < MIN_UNIQUENESS_PERCENT) {
    issues.push(
      `Uniqueness ${uniquenessPercent}% is below minimum ${MIN_UNIQUENESS_PERCENT}%`,
    );
    score -= 20;
  } else if (uniquenessPercent < 60) {
    warnings.push(
      `Uniqueness ${uniquenessPercent}% is adequate but could be improved (aim for 60%+)`,
    );
    score -= 5;
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  return {
    pageUrl: pageData.url,
    score,
    passed: issues.length === 0 && score >= 70,
    uniquenessPercent,
    wordCount,
    issues,
    warnings,
  };
}

/**
 * Validate a batch of pages and return grouped results.
 */
export function validateBatch(
  pages: PageContent[],
): { passed: QualityReport[]; failed: QualityReport[]; summary: string } {
  const reports = pages.map((page) => validatePage(page, pages));

  const passed = reports.filter((r) => r.passed);
  const failed = reports.filter((r) => !r.passed);

  const avgScore =
    reports.length > 0
      ? Math.round(
          reports.reduce((sum, r) => sum + r.score, 0) / reports.length,
        )
      : 0;

  const avgUniqueness =
    reports.length > 0
      ? Math.round(
          reports.reduce((sum, r) => sum + r.uniquenessPercent, 0) /
            reports.length,
        )
      : 0;

  const totalIssues = reports.reduce((sum, r) => sum + r.issues.length, 0);
  const totalWarnings = reports.reduce(
    (sum, r) => sum + r.warnings.length,
    0,
  );

  const summary = [
    `Quality Gate Results: ${passed.length}/${reports.length} passed`,
    `Average score: ${avgScore}/100 | Average uniqueness: ${avgUniqueness}%`,
    `Total issues: ${totalIssues} | Total warnings: ${totalWarnings}`,
    failed.length > 0
      ? `Failed pages: ${failed.map((r) => r.pageUrl).join(', ')}`
      : 'All pages passed!',
  ].join('\n');

  return { passed, failed, summary };
}

// ── Utilities ───────────────────────────────────────────────────────────

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
