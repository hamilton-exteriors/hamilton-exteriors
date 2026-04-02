/**
 * Wikipedia sameAs URLs for city-level areaServed schema enrichment.
 * Keyed by city slug (without -ca suffix).
 */
export const CITY_WIKIPEDIA: Record<string, string> = {
  // Alameda County
  'oakland': 'https://en.wikipedia.org/wiki/Oakland,_California',
  'berkeley': 'https://en.wikipedia.org/wiki/Berkeley,_California',
  'fremont': 'https://en.wikipedia.org/wiki/Fremont,_California',
  'hayward': 'https://en.wikipedia.org/wiki/Hayward,_California',
  'san-leandro': 'https://en.wikipedia.org/wiki/San_Leandro,_California',
  // Contra Costa County
  'antioch': 'https://en.wikipedia.org/wiki/Antioch,_California',
  'concord': 'https://en.wikipedia.org/wiki/Concord,_California',
  'richmond': 'https://en.wikipedia.org/wiki/Richmond,_California',
  'san-ramon': 'https://en.wikipedia.org/wiki/San_Ramon,_California',
  'walnut-creek': 'https://en.wikipedia.org/wiki/Walnut_Creek,_California',
  // Marin County
  'larkspur': 'https://en.wikipedia.org/wiki/Larkspur,_California',
  'mill-valley': 'https://en.wikipedia.org/wiki/Mill_Valley,_California',
  'novato': 'https://en.wikipedia.org/wiki/Novato,_California',
  'san-rafael': 'https://en.wikipedia.org/wiki/San_Rafael,_California',
  // Napa County
  'napa': 'https://en.wikipedia.org/wiki/Napa,_California',
  'american-canyon': 'https://en.wikipedia.org/wiki/American_Canyon,_California',
  'st-helena': 'https://en.wikipedia.org/wiki/St._Helena,_California',
  'calistoga': 'https://en.wikipedia.org/wiki/Calistoga,_California',
  'yountville': 'https://en.wikipedia.org/wiki/Yountville,_California',
  // Santa Clara County
  'san-jose': 'https://en.wikipedia.org/wiki/San_Jose,_California',
  'palo-alto': 'https://en.wikipedia.org/wiki/Palo_Alto,_California',
  'mountain-view': 'https://en.wikipedia.org/wiki/Mountain_View,_California',
  'sunnyvale': 'https://en.wikipedia.org/wiki/Sunnyvale,_California',
  'cupertino': 'https://en.wikipedia.org/wiki/Cupertino,_California',
  'santa-clara': 'https://en.wikipedia.org/wiki/Santa_Clara,_California',
  'saratoga': 'https://en.wikipedia.org/wiki/Saratoga,_California',
  'los-gatos': 'https://en.wikipedia.org/wiki/Los_Gatos,_California',
  'campbell': 'https://en.wikipedia.org/wiki/Campbell,_California',
  'milpitas': 'https://en.wikipedia.org/wiki/Milpitas,_California',
};

/**
 * Get Wikipedia sameAs URL for a city slug.
 * Accepts slugs with or without -ca suffix.
 */
export function getCityWikipedia(citySlug: string): string | undefined {
  const normalized = citySlug.replace(/-ca$/, '');
  return CITY_WIKIPEDIA[normalized];
}
