/**
 * Overture Maps buildings lookup — classifies residential vs commercial
 * using Overture's subtype + class fields (derived from OSM, Microsoft AI,
 * and other open datasets) with num_floors/height fallbacks for untagged buildings.
 *
 * Queries a pre-built Bay Area parquet file via DuckDB. Build with:
 *   overturemaps download --bbox=-123.5,36.8,-121.2,38.9 \
 *     -f geoparquet -t building -o data/overture-bayarea-buildings.parquet
 *
 * Smarty returns street-delivery coords (not rooftops), so we search a ~25m
 * radius around the point and pick the closest building.
 */
// @ts-ignore — duckdb ships its own types but node-duckdb lacks clean TS
import duckdb from 'duckdb';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PARQUET_NAME = 'overture-bayarea-buildings.parquet';
// Railway volume at /data, local dev at ./data
const PARQUET_PATH = existsSync(resolve('/data', PARQUET_NAME))
  ? resolve('/data', PARQUET_NAME)
  : resolve(process.cwd(), 'data', PARQUET_NAME);
const PARQUET_URI = PARQUET_PATH.replace(/\\/g, '/');

// Search radius in degrees (~25m at mid-latitude).
const RADIUS_DEG = 0.00025;

let dbInstance: any = null;

function getConnection(): any | null {
  if (!existsSync(PARQUET_PATH)) return null;
  if (!dbInstance) dbInstance = new duckdb.Database(':memory:');
  return dbInstance.connect();
}

function query(con: any, sql: string): Promise<any[]> {
  return new Promise((res, rej) => {
    con.all(sql, (err: any, rows: any[]) => err ? rej(err) : res(rows));
  });
}

export type BuildingLookup = {
  found: boolean;
  subtype: string | null;
  class: string | null;
  height: number | null;
  numFloors: number | null;
};

// Overture/OSM classification — these are authoritative when present.
const RESIDENTIAL_CLASSES = new Set([
  'house', 'detached', 'residential', 'apartments', 'semidetached_house',
  'terrace', 'bungalow', 'dormitory', 'cabin', 'duplex',
]);
const COMMERCIAL_CLASSES = new Set([
  'commercial', 'retail', 'office', 'school', 'industrial', 'church', 'warehouse',
  'hospital', 'hotel', 'supermarket', 'kiosk', 'civic', 'government', 'public',
  'college', 'university', 'kindergarten', 'fire_station', 'train_station',
]);
const COMMERCIAL_SUBTYPES = new Set([
  'commercial', 'industrial', 'civic', 'education', 'entertainment',
  'medical', 'military', 'religious', 'service', 'transportation',
]);

/**
 * Find the closest building to the given point within ~25m. Returns the first
 * hit (prefers buildings whose bbox actually contains the point, then nearest
 * centroid).
 */
export async function lookupBuildingAt(lat: number, lng: number): Promise<BuildingLookup> {
  const con = getConnection();
  if (!con) {
    return { found: false, subtype: null, class: null, height: null, numFloors: null };
  }

  try {
    // Widen the bbox window because Smarty lat/lng is a delivery-point, not rooftop.
    // Rank buildings by:
    //   1. Contains the exact point (best)
    //   2. Has explicit classification metadata (better than stub polygons)
    //   3. Is not tagged as outbuilding (shed/garage/kiosk)
    //   4. Closest centroid
    const rows = await query(con, `
      SELECT subtype, class, height, num_floors,
             (bbox.xmin <= ${lng} AND bbox.xmax >= ${lng}
              AND bbox.ymin <= ${lat} AND bbox.ymax >= ${lat}) AS contains_point,
             (subtype IS NOT NULL OR class IS NOT NULL OR num_floors IS NOT NULL OR height IS NOT NULL) AS has_meta,
             (subtype = 'outbuilding' OR class IN ('shed', 'garage', 'carport', 'garages')) AS is_outbuilding,
             POWER(((bbox.xmin + bbox.xmax) / 2) - ${lng}, 2)
             + POWER(((bbox.ymin + bbox.ymax) / 2) - ${lat}, 2) AS dist2
      FROM read_parquet('${PARQUET_URI}')
      WHERE bbox.xmin <= ${lng + RADIUS_DEG} AND bbox.xmax >= ${lng - RADIUS_DEG}
        AND bbox.ymin <= ${lat + RADIUS_DEG} AND bbox.ymax >= ${lat - RADIUS_DEG}
      ORDER BY is_outbuilding ASC, contains_point DESC, has_meta DESC, dist2 ASC
      LIMIT 1;
    `);
    if (!rows || rows.length === 0) {
      return { found: false, subtype: null, class: null, height: null, numFloors: null };
    }
    const r = rows[0];
    return {
      found: true,
      subtype: r.subtype || null,
      class: r.class || null,
      height: typeof r.height === 'number' ? r.height : null,
      numFloors: typeof r.num_floors === 'number' ? r.num_floors : null,
    };
  } catch (err) {
    console.error('[overture-buildings] lookup failed:', err);
    return { found: false, subtype: null, class: null, height: null, numFloors: null };
  }
}

/**
 * Classify a building as residential / commercial / unknown. Only ~18% of
 * Bay Area buildings are explicitly tagged, so we fall back to height and
 * floor count for the remainder — residential homes almost never exceed
 * 3 floors or 12m in the Bay Area.
 */
export function classifyBuilding(b: BuildingLookup): 'residential' | 'commercial' | 'unknown' {
  if (!b.found) return 'unknown';
  const subtype = (b.subtype || '').toLowerCase();
  const klass = (b.class || '').toLowerCase();

  // 1) Explicit subtype — trust it
  if (subtype === 'residential') return 'residential';
  if (COMMERCIAL_SUBTYPES.has(subtype)) return 'commercial';

  // 2) Explicit class — trust it
  if (RESIDENTIAL_CLASSES.has(klass)) return 'residential';
  if (COMMERCIAL_CLASSES.has(klass)) return 'commercial';

  // 3) Structural heuristics for untagged buildings
  if ((b.numFloors && b.numFloors >= 4) || (b.height && b.height >= 14)) {
    return 'commercial';
  }

  return 'unknown';
}
