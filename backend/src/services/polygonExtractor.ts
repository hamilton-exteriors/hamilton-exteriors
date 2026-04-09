import convex from '@turf/convex';
import { featureCollection, point } from '@turf/helpers';
import { pixelToLatLng } from './geotiffParser.js';
import type { RoofSegment, Facet } from '../types.js';

/**
 * Extract boundary polygons for each labeled segment.
 * Converts pixel coordinates to lat/lng using GeoTIFF geotransform.
 */
export function extractFacetPolygons(
  labels: Int16Array,
  segments: RoofSegment[],
  width: number,
  height: number,
  pixelScale: [number, number, number],
  tiepoint: number[]
): Facet[] {
  return segments.map((seg, segId) => {
    const boundaryPoints: [number, number][] = [];

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (labels[row * width + col] !== segId) continue;

        // Check if this pixel is on the boundary of its segment
        const isEdge = [
          [row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1],
        ].some(([r, c]) => {
          if (r < 0 || r >= height || c < 0 || c >= width) return true;
          return labels[r * width + c] !== segId;
        });

        if (isEdge) {
          const { lat, lng } = pixelToLatLng(col, row, pixelScale, tiepoint);
          boundaryPoints.push([lng, lat]);
        }
      }
    }

    if (boundaryPoints.length < 3) {
      console.warn(`Segment ${segId}: only ${boundaryPoints.length} boundary points — skipping polygon`);
      return createFacet(segId, seg, []);
    }

    // Compute convex hull
    const points = featureCollection(boundaryPoints.map(p => point(p)));
    const hull = convex(points);
    const polygon = hull?.geometry?.coordinates[0] as [number, number][] || [];

    return createFacet(segId, seg, polygon);
  });
}

function createFacet(segId: number, seg: RoofSegment, polygon: [number, number][]): Facet {
  const pitchRad = seg.pitchDegrees * Math.PI / 180;
  const trueAreaM2 = seg.stats.areaMeters2 / Math.cos(pitchRad);
  const areaSqFt = trueAreaM2 * 10.764;

  return {
    id: segId,
    pitchDegrees: Math.round(seg.pitchDegrees * 10) / 10,
    pitchRatio: degreesToRatio(seg.pitchDegrees),
    azimuth: Math.round(seg.azimuthDegrees),
    areaM2: Math.round(trueAreaM2 * 10) / 10,
    areaSq: Math.round(areaSqFt / 100 * 10) / 10,
    groundAreaM2: seg.stats.areaMeters2,
    polygon,
  };
}

function degreesToRatio(degrees: number): string {
  const rise = Math.round(Math.tan(degrees * Math.PI / 180) * 12);
  return `${rise}/12`;
}

/**
 * Build a GeoJSON FeatureCollection from facets
 */
export function facetsToGeoJSON(facets: Facet[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: facets
      .filter(f => f.polygon.length >= 3)
      .map(f => ({
        type: 'Feature' as const,
        properties: {
          id: f.id,
          pitchDegrees: f.pitchDegrees,
          pitchRatio: f.pitchRatio,
          azimuth: f.azimuth,
          areaSq: f.areaSq,
          areaM2: f.areaM2,
        },
        geometry: {
          type: 'Polygon' as const,
          coordinates: [f.polygon],
        },
      })),
  };
}
