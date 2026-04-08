/**
 * Apply the binary roof mask to the DSM and normalize elevations
 * so the lowest roof point = 0. Non-roof pixels = 0.
 */
export declare function applyMaskAndNormalize(dsmData: Float32Array, maskData: Uint8Array | Float32Array, width: number, height: number): Float32Array;
