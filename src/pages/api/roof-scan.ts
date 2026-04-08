import type { APIRoute } from 'astro';
import sharp from 'sharp';
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

    // Generate cropped satellite image PNG centered on the roof
    let satelliteImage = '';
    let cropBounds = rgb.bounds; // fallback to full tile
    if (rgb.allBands) {
      console.log('8. Generating satellite PNG...');
      const [rBand, gBand, bBand] = rgb.allBands;

      // Find roof polygon bounding box in geo coordinates
      let roofMinX = Infinity, roofMaxX = -Infinity, roofMinY = Infinity, roofMaxY = -Infinity;
      for (const facet of facets) {
        for (const [px, py] of facet.polygon) {
          if (px < roofMinX) roofMinX = px;
          if (px > roofMaxX) roofMaxX = px;
          if (py < roofMinY) roofMinY = py;
          if (py > roofMaxY) roofMaxY = py;
        }
      }

      // Add 30% padding around roof and make it square
      const roofW = roofMaxX - roofMinX;
      const roofH = roofMaxY - roofMinY;
      const roofSize = Math.max(roofW, roofH);
      const pad = roofSize * 0.3;
      const centerX = (roofMinX + roofMaxX) / 2;
      const centerY = (roofMinY + roofMaxY) / 2;
      const halfSize = (roofSize + pad * 2) / 2;

      const cropWest = centerX - halfSize;
      const cropEast = centerX + halfSize;
      const cropSouth = centerY - halfSize;
      const cropNorth = centerY + halfSize;

      // Convert geo bounds to pixel coordinates
      const tileW = rgb.bounds.east - rgb.bounds.west;
      const tileH = rgb.bounds.north - rgb.bounds.south;
      const pxLeft = Math.max(0, Math.round(((cropWest - rgb.bounds.west) / tileW) * rgb.width));
      const pxRight = Math.min(rgb.width, Math.round(((cropEast - rgb.bounds.west) / tileW) * rgb.width));
      const pxTop = Math.max(0, Math.round(((rgb.bounds.north - cropNorth) / tileH) * rgb.height));
      const pxBottom = Math.min(rgb.height, Math.round(((rgb.bounds.north - cropSouth) / tileH) * rgb.height));
      const cropPxW = pxRight - pxLeft;
      const cropPxH = pxBottom - pxTop;

      // Build full RGB buffer then crop with sharp
      const fullRgb = Buffer.alloc(rgb.width * rgb.height * 3);
      for (let i = 0; i < rgb.width * rgb.height; i++) {
        fullRgb[i * 3] = rBand[i];
        fullRgb[i * 3 + 1] = gBand[i];
        fullRgb[i * 3 + 2] = bBand[i];
      }

      if (cropPxW > 10 && cropPxH > 10) {
        const png = await sharp(fullRgb, { raw: { width: rgb.width, height: rgb.height, channels: 3 } })
          .extract({ left: pxLeft, top: pxTop, width: cropPxW, height: cropPxH })
          .resize(400, 400, { fit: 'cover' })
          .png({ quality: 80 })
          .toBuffer();
        satelliteImage = 'data:image/png;base64,' + png.toString('base64');
        cropBounds = { west: cropWest, east: cropEast, south: cropSouth, north: cropNorth };
        console.log(`   → Cropped PNG: ${Math.round(png.length / 1024)}KB (${cropPxW}x${cropPxH}px)`);
      } else {
        // Fallback: full tile
        const png = await sharp(fullRgb, { raw: { width: rgb.width, height: rgb.height, channels: 3 } })
          .resize(400, 400, { fit: 'cover' })
          .png({ quality: 80 })
          .toBuffer();
        satelliteImage = 'data:image/png;base64,' + png.toString('base64');
        console.log(`   → Full tile PNG: ${Math.round(png.length / 1024)}KB`);
      }
    }

    const response = {
      imageryDate: `${imageryDate.year}-${String(imageryDate.month).padStart(2, '0')}`,
      imageryQuality: 'HIGH',
      address: address.trim(),
      center: { lat, lng },
      facets,
      measurements,
      materials,
      bid,
      satelliteImage,
      imageBounds: cropBounds,
      dsm: {
        width: dsm.width,
        height: dsm.height,
        bounds: dsm.bounds,
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
