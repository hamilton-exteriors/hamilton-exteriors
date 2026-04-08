import type { APIRoute } from 'astro';
import { geocodeAddress } from '../../../roof-scan/backend/dist/services/geocode.js';
import { getBuildingInsights, getDataLayers } from '../../../roof-scan/backend/dist/services/solarApi.js';
import { downloadAndParseGeoTiff } from '../../../roof-scan/backend/dist/services/geotiffParser.js';
import { applyMaskAndNormalize } from '../../../roof-scan/backend/dist/services/dsmProcessor.js';
import { assignPixelsToSegments } from '../../../roof-scan/backend/dist/services/segmentMapper.js';
import { extractFacetPolygons, facetsToGeoJSON } from '../../../roof-scan/backend/dist/services/polygonExtractor.js';
import { computeMeasurements, computeMaterials, computeBid } from '../../../roof-scan/backend/dist/services/measurements.js';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address || typeof address !== 'string' || address.trim().length < 5) {
      return new Response(
        JSON.stringify({ error: 'Address is required (minimum 5 characters)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`\n═══ ROOF SCAN: ${address} ═══`);

    // Step 1: Geocode
    console.log('1. Geocoding address...');
    const { lat, lng } = await geocodeAddress(address.trim());
    console.log(`   → ${lat}, ${lng}`);

    // Step 2: Solar API calls
    console.log('2. Fetching building insights...');
    const insights = await getBuildingInsights(lat, lng);
    const segments = insights.solarPotential.roofSegmentStats;
    console.log(`   → ${segments.length} roof segments, quality: ${insights.imageryQuality}`);

    console.log('   Fetching data layers...');
    const layers = await getDataLayers(lat, lng);

    // Step 3: Download + parse GeoTIFFs
    console.log('3. Downloading GeoTIFFs...');
    const [dsm, mask, rgb] = await Promise.all([
      downloadAndParseGeoTiff(layers.dsmUrl),
      downloadAndParseGeoTiff(layers.maskUrl),
      downloadAndParseGeoTiff(layers.rgbUrl),
    ]);

    // Step 4: Mask + normalize DSM
    console.log('4. Processing DSM...');
    const normalizedDsm = applyMaskAndNormalize(
      dsm.data as Float32Array,
      mask.data as Uint8Array,
      dsm.width,
      dsm.height
    );

    // Step 5: Segment-to-pixel mapping
    console.log('5. Mapping pixels to segments...');
    const labels = assignPixelsToSegments(
      normalizedDsm,
      mask.data as Uint8Array,
      segments,
      dsm.width,
      dsm.height
    );

    // Step 6: Polygon extraction
    console.log('6. Extracting facet polygons...');
    const facets = extractFacetPolygons(
      labels, segments,
      dsm.width, dsm.height,
      dsm.pixelScale, dsm.tiepoint
    );
    const roofGeoJSON = facetsToGeoJSON(facets);

    // Step 7: Measurements + bid
    console.log('7. Computing measurements...');
    const measurements = computeMeasurements(facets);
    const materials = computeMaterials(measurements);
    const bid = computeBid(measurements);
    console.log(`   → ${measurements.totalSquares} squares, $${bid.total} total`);

    const imageryDate = insights.imageryDate;
    const response = {
      imageryDate: `${imageryDate.year}-${String(imageryDate.month).padStart(2, '0')}`,
      imageryQuality: 'HIGH',
      address: address.trim(),
      center: { lat, lng },
      facets,
      measurements,
      materials,
      bid,
      dsm: {
        width: dsm.width,
        height: dsm.height,
        data: Array.from(normalizedDsm),
        bounds: dsm.bounds,
      },
      rgb: {
        width: rgb.width,
        height: rgb.height,
        data: Array.from(rgb.data as Uint8Array),
        bounds: rgb.bounds,
      },
      roofGeoJSON,
    };

    console.log(`═══ SCAN COMPLETE ═══\n`);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('Scan failed:', err.message);
    return new Response(
      JSON.stringify({
        error: err.message,
        hint: err.message?.includes('HIGH')
          ? 'This address may not have high-quality satellite imagery available.'
          : undefined,
      }),
      { status: 422, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
