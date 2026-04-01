/**
 * Type definitions for city+service combo pages (e.g., "Roofing in Oakland").
 * These are drill-down pages linked from the generalized city pages.
 */

import type { HeroProps, SectionBlock } from './service-page-types';

export interface CityServicePageData {
  city: string;
  county: string;
  state: string;
  citySlug: string;
  countySlug: string;
  serviceSlug: string;
  serviceName: string;
  title: string;
  description: string;
  hero: HeroProps;
  sections: SectionBlock[];
  localFaqs?: Array<{ question: string; answer: string }>;
  neighborhoods?: string[];
  nearbyCityServices?: Array<{ name: string; href: string }>;
}
