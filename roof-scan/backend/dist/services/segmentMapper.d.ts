import type { RoofSegment } from '../types.js';
/**
 * Assign each roof pixel to a segment using Sobel gradient analysis.
 * For each pixel, compute local slope (pitch) and direction (azimuth),
 * then match to the nearest segment from buildingInsights.
 */
export declare function assignPixelsToSegments(normalizedDsm: Float32Array, maskData: Uint8Array | Float32Array, segments: RoofSegment[], width: number, height: number): Int16Array;
