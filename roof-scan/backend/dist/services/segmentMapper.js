/**
 * Assign each roof pixel to a segment using Sobel gradient analysis.
 * For each pixel, compute local slope (pitch) and direction (azimuth),
 * then match to the nearest segment from buildingInsights.
 */
export function assignPixelsToSegments(normalizedDsm, maskData, segments, width, height) {
    const labels = new Int16Array(width * height).fill(-1);
    for (let row = 1; row < height - 1; row++) {
        for (let col = 1; col < width - 1; col++) {
            const i = row * width + col;
            if (maskData[i] !== 1)
                continue;
            // Sobel gradient in X direction
            const dzdx = (-normalizedDsm[(row - 1) * width + (col - 1)] + normalizedDsm[(row - 1) * width + (col + 1)]
                - 2 * normalizedDsm[row * width + (col - 1)] + 2 * normalizedDsm[row * width + (col + 1)]
                - normalizedDsm[(row + 1) * width + (col - 1)] + normalizedDsm[(row + 1) * width + (col + 1)]) / 8;
            // Sobel gradient in Y direction
            const dzdy = (-normalizedDsm[(row - 1) * width + (col - 1)] - 2 * normalizedDsm[(row - 1) * width + col]
                - normalizedDsm[(row - 1) * width + (col + 1)] + normalizedDsm[(row + 1) * width + (col - 1)]
                + 2 * normalizedDsm[(row + 1) * width + col] + normalizedDsm[(row + 1) * width + (col + 1)]) / 8;
            const gradMag = Math.sqrt(dzdx * dzdx + dzdy * dzdy);
            const pitchDeg = Math.atan(gradMag) * (180 / Math.PI);
            let azimuth = Math.atan2(dzdy, dzdx) * (180 / Math.PI);
            if (azimuth < 0)
                azimuth += 360;
            // Match to nearest segment by pitch + azimuth distance
            let bestSeg = 0;
            let bestDist = Infinity;
            for (let s = 0; s < segments.length; s++) {
                const dp = Math.abs(pitchDeg - segments[s].pitchDegrees);
                const da = Math.min(Math.abs(azimuth - segments[s].azimuthDegrees), 360 - Math.abs(azimuth - segments[s].azimuthDegrees));
                // Weight pitch 1.5x higher than azimuth — pitch is more reliable from DSM
                const dist = dp * 1.5 + da;
                if (dist < bestDist) {
                    bestDist = dist;
                    bestSeg = s;
                }
            }
            labels[i] = bestSeg;
        }
    }
    // Validation: log pixel counts per segment
    const counts = new Map();
    for (let i = 0; i < labels.length; i++) {
        if (labels[i] >= 0) {
            counts.set(labels[i], (counts.get(labels[i]) || 0) + 1);
        }
    }
    console.log('Segment pixel counts:');
    for (const [segId, count] of counts) {
        console.log(`  Segment ${segId}: ${count} pixels${count < 50 ? ' ⚠️ LOW' : ''}`);
    }
    return labels;
}
