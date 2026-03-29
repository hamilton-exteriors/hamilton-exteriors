/**
 * Apply the binary roof mask to the DSM and normalize elevations
 * so the lowest roof point = 0. Non-roof pixels = 0.
 */
export function applyMaskAndNormalize(
  dsmData: Float32Array,
  maskData: Uint8Array | Float32Array,
  width: number,
  height: number
): Float32Array {
  const result = new Float32Array(width * height);

  // Find minimum elevation among roof pixels only
  let minElev = Infinity;
  for (let i = 0; i < dsmData.length; i++) {
    if (maskData[i] === 1 && dsmData[i] > -9000) {
      minElev = Math.min(minElev, dsmData[i]);
    }
  }

  if (minElev === Infinity) {
    throw new Error('No roof pixels found in mask — the mask may be empty for this address');
  }

  // Zero non-roof pixels, normalize roof pixels to relative height
  let roofPixelCount = 0;
  for (let i = 0; i < dsmData.length; i++) {
    if (maskData[i] === 1) {
      result[i] = Math.max(0, dsmData[i] - minElev);
      roofPixelCount++;
    } else {
      result[i] = 0;
    }
  }

  console.log(`DSM processed: ${roofPixelCount} roof pixels out of ${width * height} total (${(roofPixelCount / (width * height) * 100).toFixed(1)}%)`);

  // Warn if coverage is suspiciously low
  if (roofPixelCount < width * height * 0.05) {
    console.warn('WARNING: Roof mask covers less than 5% of tile — possible tree canopy obstruction');
  }

  return result;
}
