import type { RoofSegment, Facet } from '../types.js';
/**
 * Extract boundary polygons for each labeled segment.
 * Converts pixel coordinates to lat/lng using GeoTIFF geotransform.
 */
export declare function extractFacetPolygons(labels: Int16Array, segments: RoofSegment[], width: number, height: number, pixelScale: [number, number, number], tiepoint: number[]): Facet[];
/**
 * Build a GeoJSON FeatureCollection from facets
 */
export declare function facetsToGeoJSON(facets: Facet[]): GeoJSON.FeatureCollection;
