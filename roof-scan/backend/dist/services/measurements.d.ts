import type { Facet, Measurements, Materials, Bid } from '../types.js';
/**
 * Compute roof measurements from facet data.
 * Lineal footage is estimated from polygon perimeters and edge classification.
 */
export declare function computeMeasurements(facets: Facet[]): Measurements;
/**
 * Compute material quantities from measurements
 */
export declare function computeMaterials(measurements: Measurements): Materials;
/**
 * Compute bid numbers
 */
export declare function computeBid(measurements: Measurements): Bid;
