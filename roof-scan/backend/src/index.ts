import express from 'express';
import cors from 'cors';
import { geocodeAddress } from './services/geocode.js';
import { getBuildingInsights, getDataLayers } from './services/solarApi.js';
import { downloadAndParseGeoTiff } from './services/geotiffParser.js';
import { applyMaskAndNormalize } from './services/dsmProcessor.js';
import { assignPixelsToSegments } from './services/segmentMapper.js';
import { extractFacetPolygons, facetsToGeoJSON } from './services/polygonExtractor.js';
import { computeMeasurements, computeMaterials, computeBid } from './services/measurements.js';
import type { RoofScanResponse, RoofSegment } from './types.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 3001;

app.post('/api/roof-scan', async (req, res) => {
  const { address } = req.body;
  if (!address || typeof address !== 'string' || address.trim().length < 5) {
    res.status(400).json({ error: 'Address is required (minimum 5 characters)' });
    return;
  }

  try {
    console.log(`\n═══ ROOF SCAN: ${address} ═══`);

    // Step 1: Geocode
    console.log('1. Geocoding address...');
    const { lat, lng } = await geocodeAddress(address.trim());
    console.log(`   → ${lat}, ${lng}`);

    // Step 2: Solar API calls
    console.log('2. Fetching building insights...');
    const insights = await getBuildingInsights(lat, lng);
    const segments: RoofSegment[] = insights.solarPotential.roofSegmentStats;
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
    console.log(`   → DSM: ${dsm.width}x${dsm.height}, Mask: ${mask.width}x${mask.height}, RGB: ${rgb.width}x${rgb.height}`);

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
    console.log(`   → ${facets.length} facets, ${roofGeoJSON.features.length} valid polygons`);

    // Step 7: Measurements + bid
    console.log('7. Computing measurements...');
    const measurements = computeMeasurements(facets);
    const materials = computeMaterials(measurements);
    const bid = computeBid(measurements);
    console.log(`   → ${measurements.totalSquares} squares, ${measurements.orderedSquares} ordered, $${bid.total} total`);

    // Build response
    const imageryDate = insights.imageryDate;
    const response: RoofScanResponse = {
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
    res.json(response);

  } catch (err: any) {
    console.error('Scan failed:', err.message);
    res.status(422).json({
      error: err.message,
      hint: err.message.includes('HIGH')
        ? 'This address may not have high-quality satellite imagery available.'
        : undefined,
    });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'roof-scan-backend' });
});

app.listen(PORT, () => {
  console.log(`Roof scan backend running on http://localhost:${PORT}`);
  console.log(`POST /api/roof-scan { address: string }`);
  if (!process.env.GOOGLE_API_KEY) {
    console.warn('⚠️  GOOGLE_API_KEY not set — API calls will fail');
  }
});
