/**
 * Type definitions for generalized city pages (mini-homepages per city).
 * These pages show ALL services Hamilton offers in a given city,
 * with links to individual city+service drill-down pages.
 */

export interface GeneralCityPageData {
  city: string;
  county: string;
  state: string;
  slug: string;
  countySlug: string;
  title: string;
  description: string;

  hero: {
    headline: string;
    formTitle: string;
    formSubtitle: string;
    badges: string[];
  };

  /** Services grid — links to city+service pages */
  services: Array<{
    title: string;
    description: string;
    imageKey: string;
    href: string;
  }>;

  /** Localized reviews */
  reviews?: {
    sectionTitle: string;
    featured: { text: string; name: string; location: string };
    side: Array<{ text: string; name: string; location: string }>;
  };

  /** Neighborhoods */
  neighborhoods?: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
  };

  /** FAQ */
  faqs?: Array<{ question: string; answer: string }>;

  /** Nearby city links */
  nearbyCities?: Array<{ name: string; href: string }>;

  /** Stats */
  stats?: Array<{ value: string; label: string }>;
}
