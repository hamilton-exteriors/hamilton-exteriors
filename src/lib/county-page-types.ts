import type { ImageMetadata } from 'astro';

export interface CountyPageData {
  county: string;
  countySlug: string;
  state: string;
  adjective: string; // e.g. "Trusted", "Experienced", "Skilled"
  title: string;
  description: string;
  heroHeadline: string;
  heroFormTitle: string;

  /** Mapbox proximity bias for hero address autofill, e.g. "-122.08,37.65" */
  proximity?: string;

  /**
   * City links grid — some counties (Napa, Santa Clara) have none.
   * Cities with images use the image-card layout; cities without use text links.
   */
  cities?: Array<{
    name: string;
    slug: string;
    image: ImageMetadata;
  }>;

  /**
   * "Service Locations" section label style.
   * 'heading' = Alameda/Marin style (h2 heading)
   * 'label'   = Contra Costa style (uppercase label)
   */
  citySectionStyle?: 'heading' | 'label';

  /** Optional editorial content — county-specific narrative rendered above the cities grid. */
  editorial?: {
    heading: string;
    paragraphs: string[];
  };
}
