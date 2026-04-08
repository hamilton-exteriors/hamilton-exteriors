import type { ImageMetadata } from 'astro';

/** A stat block (e.g. "50 Year Warranty") shown in a horizontal strip */
export interface StatItem {
  value: string;
  label: string;
}

/** A product/style card WITH an image */
export interface StyleCardWithImage {
  title: string;
  description: string;
  image: ImageMetadata;
  /** Optional link to a sub-service page */
  href?: string;
}

/** A product/style card WITHOUT an image (text-only, like ADU) */
export interface StyleCardTextOnly {
  title: string;
  description: string;
  /** Optional link for the card */
  href?: string;
}

export type StyleCard = StyleCardWithImage | StyleCardTextOnly;

export function hasImage(card: StyleCard): card is StyleCardWithImage {
  return 'image' in card;
}

/** Configuration for the styles/products grid section */
export interface StylesSection {
  heading: string;
  items: StyleCard[];
  /** Grid columns on desktop: 2 or 3. Default 2. */
  columns?: 2 | 3;
  /** Background class for the section. Default none (white). */
  bgClass?: string;
  /** Card variant controls rendering */
  cardVariant: 'roofing' | 'siding' | 'windows' | 'adu';
}

/** Stats strip section (siding, ADU) */
export interface StatsSection {
  items: StatItem[];
  /** If true, only show on lg+ screens */
  desktopOnly?: boolean;
}

/** Full-width image banner (ADU) */
export interface ImageBanner {
  image: ImageMetadata;
  alt: string;
  height?: number;
}

/** Hero component props — mirrors the Hero.astro Props interface */
export interface HeroProps {
  headline: string;
  formTitle?: string;
  formSubtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  heroImage?: ImageMetadata;
  badges?: string[];
  serviceType?: string;
  serviceOptions?: string[];
}

/**
 * Complete data for a service page.
 *
 * The `sections` array defines the exact ordering of content blocks
 * between Navbar and Footer. This gives each page full control over
 * which blocks appear and in what order, while the template handles
 * the rendering.
 */
/** A row in the pricing table */
export interface PricingRow {
  product: string;
  pricePerSq: string;
  materialCost: string;
}

/** Pricing table section */
export interface PricingSection {
  heading: string;
  tiers: { name: string; rows: PricingRow[] }[];
  footnote: string;
}

/** City+service expert narrative — unique paragraphs per city per service */
export interface LocalContextSection {
  heading: string;
  paragraphs: string[];
}

/** City-specific pricing scoped to priceTier + service */
export interface CityPricingSection {
  heading: string;
  city: string;
  priceTier: string;
  priceRange: string;
  medianHomePrice: string;
  footnote: string;
}

/** Service-specific neighborhood descriptions */
export interface NeighborhoodServiceSection {
  heading: string;
  items: Array<{
    neighborhood: string;
    description: string;
  }>;
}

export type SectionBlock =
  | { type: 'logoSlider' }
  | { type: 'reviews' }
  | { type: 'cta' }
  | { type: 'reviewLogos' }
  | { type: 'styles'; data: StylesSection }
  | { type: 'stats'; data: StatsSection }
  | { type: 'imageBanner'; data: ImageBanner }
  | { type: 'difference' }
  | { type: 'projects' }
  | { type: 'yellowBar'; text: string; href: string }
  | { type: 'financing' }
  | { type: 'pricing'; data: PricingSection }
  | { type: 'localContext'; data: LocalContextSection }
  | { type: 'cityPricing'; data: CityPricingSection }
  | { type: 'neighborhoodService'; data: NeighborhoodServiceSection }
  | { type: 'faq' }
  | { type: 'contactUs' }
  | { type: 'footer' };

export interface ServicePageData {
  /** Page <title> */
  title: string;
  /** Meta description */
  description: string;
  /** Announcement bar text. Omit for default. */
  announcementText?: string;
  /** Hero props */
  hero: HeroProps;
  /** Ordered list of content sections */
  sections: SectionBlock[];
  /** Extra <style> block content (raw CSS string) */
  extraStyles?: string;
  /** Service-specific FAQs appended after base universal FAQs */
  localFaqs?: Array<{ question: string; answer: string }>;
}
