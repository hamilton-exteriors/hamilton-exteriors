import type { APIRoute } from 'astro';
import { lookupBuildingAt, classifyBuilding } from '../../lib/overture-buildings';

/**
 * POST /api/validate-address — Smarty + Overture residential/commercial gate.
 *
 * Two-signal classification:
 *   1. Smarty US Street API → USPS `rdi` field (delivery-type classification)
 *   2. Overture Maps Bay Area buildings → `subtype`/`class`/height/floors
 *      (building-use classification from OSM + Microsoft AI)
 *
 * Overture is authoritative when it confidently classifies (explicit subtype
 * or class) because it's building-use, not mail-delivery. Smarty backstops for
 * addresses Overture doesn't have explicit tags for.
 *
 * Response shape:
 *   { valid: boolean, residential: boolean, lat: number|null, lng: number|null,
 *     normalized: string|null, source: string, reason?: string }
 */
export const POST: APIRoute = async ({ request }) => {
  let body: { address?: string };
  try {
    body = await request.json();
  } catch {
    return json({ valid: false, residential: false, reason: 'invalid_json' }, 400);
  }

  const address = String(body.address || '').trim();
  if (address.length < 5) {
    return json({ valid: false, residential: false, reason: 'address_too_short' }, 400);
  }

  // Manual commercial override — addresses where Smarty + Overture both miss.
  // Normalize to lowercase street-number + street-name prefix for fuzzy matching.
  if (isManuallyOverriddenCommercial(address)) {
    return json({ valid: true, residential: false, source: 'manual_override', reason: 'known_commercial' });
  }

  const authId = import.meta.env.SMARTY_AUTH_ID;
  const authToken = import.meta.env.SMARTY_AUTH_TOKEN;
  if (!authId || !authToken) {
    // Fail-open if Smarty isn't configured — don't block users on missing creds.
    console.warn('[validate-address] SMARTY_AUTH_ID/TOKEN not set, failing open');
    return json({ valid: true, residential: true, lat: null, lng: null, normalized: null, reason: 'smarty_not_configured' });
  }

  const url = new URL('https://us-street.api.smarty.com/street-address');
  url.searchParams.set('auth-id', authId);
  url.searchParams.set('auth-token', authToken);
  url.searchParams.set('street', address);
  url.searchParams.set('candidates', '1');

  let smartyRes: Response;
  try {
    smartyRes = await fetch(url.toString(), { headers: { 'Host': 'us-street.api.smarty.com' } });
  } catch (err) {
    console.error('[validate-address] Smarty fetch failed:', err);
    return json({ valid: true, residential: true, lat: null, lng: null, normalized: null, reason: 'smarty_unreachable' });
  }

  if (!smartyRes.ok) {
    console.warn('[validate-address] Smarty returned', smartyRes.status);
    return json({ valid: true, residential: true, lat: null, lng: null, normalized: null, reason: 'smarty_http_' + smartyRes.status });
  }

  const candidates = (await smartyRes.json()) as SmartyCandidate[];
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return json({ valid: false, residential: false, reason: 'address_not_found' });
  }

  const c = candidates[0];
  const rdi = c.metadata?.rdi || '';
  const smartyResidential = rdi !== 'Commercial';
  const lat = typeof c.metadata?.latitude === 'number' ? c.metadata.latitude : null;
  const lng = typeof c.metadata?.longitude === 'number' ? c.metadata.longitude : null;
  const normalized = c.delivery_line_1 && c.last_line
    ? `${c.delivery_line_1}, ${c.last_line}`
    : null;

  // Second signal: Overture building lookup at the Smarty-verified coords.
  let overtureResult: 'residential' | 'commercial' | 'unknown' = 'unknown';
  let overtureDetails: Record<string, unknown> = {};
  if (lat != null && lng != null) {
    const building = await lookupBuildingAt(lat, lng);
    overtureResult = classifyBuilding(building);
    overtureDetails = {
      found: building.found,
      subtype: building.subtype,
      class: building.class,
      numFloors: building.numFloors,
      height: building.height,
    };
  }

  // Combine signals:
  //   - Overture says commercial → block (catches cases where USPS says residential
  //     but building is clearly commercial, e.g. Hamilton's own office).
  //   - Overture says residential → allow (overrides Smarty false-positives).
  //   - Overture unknown → defer to Smarty RDI.
  let residential: boolean;
  let source: string;
  if (overtureResult === 'commercial') {
    residential = false;
    source = 'overture_commercial';
  } else if (overtureResult === 'residential') {
    residential = true;
    source = 'overture_residential';
  } else {
    residential = smartyResidential;
    source = smartyResidential ? 'smarty_residential' : 'smarty_commercial';
  }

  return json({
    valid: true,
    residential,
    lat,
    lng,
    normalized,
    rdi: rdi || 'Unknown',
    overture: overtureDetails,
    source,
  });
};

type SmartyCandidate = {
  delivery_line_1?: string;
  last_line?: string;
  metadata?: {
    rdi?: 'Residential' | 'Commercial' | '';
    latitude?: number;
    longitude?: number;
  };
};

function json(payload: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Addresses that Smarty RDI + Overture both misclassify. Keep short.
// Match by lowercased street-number + street-name prefix (before the first comma).
const COMMERCIAL_OVERRIDES = [
  '21634 redwood rd', // Hamilton's own office — Smarty says residential, Overture has no tags
];

function isManuallyOverriddenCommercial(addr: string): boolean {
  const head = addr.toLowerCase().split(',')[0].trim();
  return COMMERCIAL_OVERRIDES.some(o => head.startsWith(o));
}
