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

  /**
   * "Why Homeowners Choose" / "Why Choose" section.
   * Used by Alameda, Marin (Style A — 2-col text+image).
   */
  whyChoose?: {
    heading: string;
    paragraphs: string[];
  };

  /**
   * "Benefits of Building an ADU" section (dark bg, 2-col text+image).
   * Used by Alameda, Marin (Style A).
   */
  benefits?: {
    heading: string;
    paragraphs: string[];
  };

  /**
   * "ADU Types We Build" section (cards on light bg).
   * Used by Alameda, Marin (Style A).
   */
  aduTypes?: {
    heading: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
  };

  /**
   * Stats row (e.g. "50+ Years Combined Experience").
   * Used by Alameda, Marin.
   */
  stats?: Array<{ value: string; label: string }>;

  /** Show ReviewLogos component. Used by Alameda, Marin. */
  showReviewLogos?: boolean;

  /**
   * Mobile-only extra sections. Used by Alameda.
   */
  mobileProcess?: {
    heading: string;
    steps: Array<{ title: string; description: string }>;
  };
  mobileWhyBuild?: {
    heading: string;
    paragraphs: string[];
  };

  // ───── Contra Costa style (Style B) ─────

  /**
   * "Why" section with intro paragraphs + card grid.
   * Used by Contra Costa.
   */
  whySection?: {
    heading: string;
    introParagraphs: string[];
    cards: Array<{ title: string; description: string }>;
  };

  /**
   * "ADU Services" desktop section (dark bg, 3 cards).
   * Used by Contra Costa.
   */
  aduServicesDesktop?: {
    label: string;
    heading: string;
    items: Array<{ title: string; description: string }>;
  };

  /**
   * Mobile ADU info section (dark bg, simple text).
   * Used by Contra Costa.
   */
  aduServicesMobile?: {
    heading: string;
    paragraphs: string[];
  };

  /**
   * Custom inline FAQ (not the shared FAQ component).
   * Used by Contra Costa.
   */
  customFaqs?: Array<{ question: string; answer: string }>;

  /**
   * Whether to show the shared FAQ component.
   * Defaults to true unless customFaqs are provided.
   */
  showSharedFaq?: boolean;

  // ───── Napa / Santa Clara style (Style C) ─────

  /**
   * "Why Choose" section with subtitle + feature cards.
   * Used by Napa, Santa Clara.
   */
  whyChooseExpanded?: {
    heading: string;
    subtitle: string;
    paragraphs: string[];
    featureCards: Array<{ title: string; description: string }>;
  };

  /**
   * "Why Build" section with subtitle.
   * Used by Napa, Santa Clara.
   */
  whyBuild?: {
    heading: string;
    subtitle: string;
    paragraphs: string[];
  };
}
