/**
 * Hamilton Exteriors service area validation.
 * Pulls cities from GTM API, falls back to static list.
 */

const GTM_API = import.meta.env.PUBLIC_GTM_API_URL || 'https://gtm-production-6018.up.railway.app';
const GTM_KEY = import.meta.env.GTM_API_KEY || '';

let cachedCities: string[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 300_000; // 5 min

/** Fetch service area cities from GTM API */
async function fetchServiceCities(): Promise<string[]> {
  if (cachedCities && Date.now() - cacheTime < CACHE_TTL) return cachedCities;

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (GTM_KEY) headers['x-api-key'] = GTM_KEY;

    const res = await fetch(`${GTM_API}/api/workspace/hamilton/service-areas`, { headers, signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`GTM API ${res.status}`);
    const data = await res.json();
    cachedCities = (data.cities || []).map((c: string) => c.toLowerCase());
    cacheTime = Date.now();
    return cachedCities;
  } catch {
    // Fallback to static list if GTM API is unreachable
    return FALLBACK_CITIES;
  }
}

const FALLBACK_CITIES = [
  'oakland', 'berkeley', 'alameda', 'fremont', 'hayward', 'san leandro', 'castro valley',
  'dublin', 'pleasanton', 'livermore', 'union city', 'newark', 'emeryville',
  'walnut creek', 'concord', 'richmond', 'antioch', 'pittsburg', 'brentwood', 'san ramon',
  'danville', 'martinez', 'pleasant hill', 'lafayette', 'orinda', 'moraga', 'el cerrito',
  'san francisco', 'daly city', 'south san francisco',
  'san mateo', 'redwood city', 'menlo park', 'burlingame', 'san carlos', 'foster city',
  'belmont', 'half moon bay', 'pacifica', 'millbrae', 'san bruno', 'east palo alto',
  'san jose', 'santa clara', 'sunnyvale', 'mountain view', 'palo alto', 'milpitas',
  'cupertino', 'campbell', 'saratoga', 'los gatos', 'gilroy', 'morgan hill', 'los altos',
];

/**
 * Check if an address string is in the service area.
 * Matches by city name in the address text.
 * If no recognizable city is found (e.g. street-only from Mapbox autofill),
 * defaults to true — only block when we're confident the city is out of area.
 */
export async function isInServiceArea(address: string): Promise<boolean> {
  if (!address) return false;
  const lower = address.toLowerCase().trim();
  const cities = await fetchServiceCities();
  for (const city of cities) {
    if (lower.includes(city)) return true;
  }
  // No service-area city found — could be street-only input or an unknown address.
  // Default to allowing through rather than blocking a potentially valid lead.
  return true;
}

/** Sync version for client-side use (uses fallback only) */
export function isInServiceAreaSync(address: string): boolean {
  if (!address) return false;
  const lower = address.toLowerCase().trim();
  for (const city of FALLBACK_CITIES) {
    if (lower.includes(city)) return true;
  }
  // Same default: unknown address passes through
  return true;
}

export const SERVICE_AREA_ERROR = 'We currently serve the San Francisco Bay Area. Please enter an address in our service area.';

export { fetchServiceCities };
