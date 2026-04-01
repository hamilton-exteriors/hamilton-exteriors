/**
 * City center coordinates for Mapbox proximity bias.
 * Format: { [citySlug]: [longitude, latitude] }
 */
const CITY_COORDINATES: Record<string, [number, number]> = {
  // Alameda County
  'oakland': [-122.2711, 37.8044],
  'berkeley': [-122.2727, 37.8716],
  'fremont': [-121.9886, 37.5485],
  'hayward': [-122.0808, 37.6688],
  'san-leandro': [-122.1560, 37.7249],
  // Contra Costa County
  'antioch': [-121.8058, 38.0049],
  'concord': [-122.0311, 37.9780],
  'richmond': [-122.3477, 37.9358],
  'san-ramon': [-121.9780, 37.7799],
  'walnut-creek': [-122.0652, 37.9101],
  // Marin County
  'larkspur': [-122.5353, 37.9341],
  'mill-valley': [-122.5416, 37.9060],
  'novato': [-122.5697, 38.1074],
  'san-rafael': [-122.5311, 37.9735],
  // Napa County
  'napa': [-122.2869, 38.2975],
  'american-canyon': [-122.2608, 38.1749],
  'st-helena': [-122.4700, 38.5052],
  'calistoga': [-122.5797, 38.5788],
  'yountville': [-122.3644, 38.4013],
  // Santa Clara County
  'san-jose': [-121.8863, 37.3382],
  'palo-alto': [-122.1430, 37.4419],
  'mountain-view': [-122.0838, 37.3861],
  'sunnyvale': [-122.0363, 37.3688],
  'cupertino': [-122.0322, 37.3230],
  'santa-clara': [-121.9552, 37.3541],
  'saratoga': [-122.0230, 37.2638],
  'los-gatos': [-121.9624, 37.2358],
  'campbell': [-121.9500, 37.2872],
  'milpitas': [-121.8996, 37.4323],
};

/** Bay Area bounding box for Mapbox: west,south,east,north */
export const BAY_AREA_BBOX = '-123.1,36.9,-121.2,38.9';

/**
 * Get proximity string for a city slug.
 * Accepts slugs with or without -ca suffix.
 * Returns "lng,lat" or undefined if city not found.
 */
export function getCityProximity(citySlug: string): string | undefined {
  const normalized = citySlug.replace(/-ca$/, '');
  const coords = CITY_COORDINATES[normalized];
  return coords ? `${coords[0]},${coords[1]}` : undefined;
}
