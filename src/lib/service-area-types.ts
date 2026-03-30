export interface ServiceAreaFeature {
  title: string;
  description: string;
}

export interface ServiceAreaAduType {
  title: string;
  description: string;
}

export interface ServiceAreaFAQ {
  question: string;
  answer: string;
}

export interface ServiceAreaProject {
  title: string;
  location: string;
  sqft: string;
  /** Key into the images map — e.g. 'serviceRoofing', 'serviceSiding', etc. */
  imageKey: string;
}

export interface ServiceAreaReview {
  text: string;
  name: string;
  location: string;
}

export interface ServiceAreaPricingCard {
  title: string;
  subtitle: string;
  price: string;
  sqft: string;
  features: string[];
  /** If set, card is highlighted (dark bg) */
  highlighted?: boolean;
  /** Badge text shown above card — e.g. "Most Popular", "Best Value" */
  badge?: string;
  /** Badge color: 'yellow' or 'green'. Default 'green' */
  badgeColor?: 'yellow' | 'green';
}

export interface ServiceAreaStat {
  value: string;
  label: string;
  description: string;
  /** SVG icon type for the stat card */
  icon: 'dollar' | 'trend' | 'document';
}

export interface ServiceAreaExpertStat {
  value: string;
  label: string;
}

export interface ServiceAreaProcessStep {
  title: string;
  description: string;
}

export interface ServiceAreaRegulation {
  value: string;
  label: string;
  description: string;
}

export interface ServiceAreaNeighborhood {
  title: string;
  description: string;
  /** SVG icon type: 'home', 'people', 'building' */
  icon: 'home' | 'people' | 'building';
}

export interface ServiceAreaResource {
  title: string;
  description: string;
  href: string;
}

export interface ServiceAreaInfoCard {
  title: string;
  description: string;
}

export interface ServiceAreaMobileResource {
  title: string;
  href: string;
}

export interface ServiceAreaCity {
  city: string;
  county: string;
  state: string;
  slug: string;
  countySlug: string;
  adjective: string;
  title: string;
  description: string;

  /** Hero section */
  hero: {
    headline: string;
    subtitle: string;
    badges: string[];
    formTitle: string;
    formSubtitle: string;
    formTextareaPlaceholder?: string;
    formButtonText?: string;
  };

  /** Reviews section */
  reviews?: {
    sectionTitle: string;
    featured: ServiceAreaReview;
    side: ServiceAreaReview[];
  };

  /** Pricing / services cards */
  pricingCards?: ServiceAreaPricingCard[];
  pricingLabel?: string;
  pricingTitle?: string;

  /** "Why Build an ADU in {city}" stats section */
  whyBuildStats?: {
    title: string;
    subtitle: string;
    stats: ServiceAreaStat[];
  };

  /** "Trusted ADU Experts" dark section */
  trustedExperts?: {
    title: string;
    paragraphs: string[];
    ctaText: string;
    ctaHref: string;
    stats: ServiceAreaExpertStat[];
  };

  /** "Our Process" section (desktop) */
  process?: {
    title: string;
    steps: ServiceAreaProcessStep[];
  };

  /** Recent projects gallery */
  projects?: ServiceAreaProject[];
  projectsTitle?: string;

  /** Regulations section */
  regulations?: {
    title: string;
    subtitle: string;
    items: ServiceAreaRegulation[];
  };

  /** Neighborhoods section */
  neighborhoods?: {
    title: string;
    subtitle: string;
    items: ServiceAreaNeighborhood[];
  };

  /** Mobile process + resources section */
  mobileProcessResources?: {
    processTitle: string;
    processSummary: string;
    resourcesTitle: string;
    nearbyLinks: ServiceAreaMobileResource[];
    infoCards: ServiceAreaInfoCard[];
  };

  /** FAQ section */
  faqs?: ServiceAreaFAQ[];
  faqTitle?: string;

  /** Contact / CTA section */
  contact?: {
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    formButtonText: string;
    formAddressPlaceholder?: string;
    /** ADU type options for radio buttons */
    aduTypeOptions?: string[];
    /** Whether to show consultation type radios */
    showConsultationType?: boolean;
  };

  /** Desktop resources section */
  resources?: {
    title: string;
    subtitle: string;
    nearbyLinks: ServiceAreaResource[];
    infoCards: ServiceAreaInfoCard[];
  };

  // ---- Legacy fields for backward compatibility ----

  /** @deprecated Use the new structured fields instead */
  whyChoose?: {
    subtitle: string;
    paragraphs: string[];
    desktopOnlyParagraphs?: string[];
    features: ServiceAreaFeature[];
  };
  /** @deprecated Use the new structured fields instead */
  whyEssential?: {
    headingSuffix?: string;
    subtitle: string;
    paragraphs: string[];
    desktopOnlyParagraphs?: string[];
  };
  /** @deprecated Use pricingCards instead */
  aduTypes?: ServiceAreaAduType[];
  /** @deprecated Use the new layout approach via sections */
  layout?: 'two-column' | 'single-column';
}
