import type { Facet, Measurements, Materials, Bid } from '../types.js';

const PRICE_PER_SQ = Number(process.env.PRICE_PER_SQ) || 420;
const LABOR_PER_SQ = Number(process.env.LABOR_PER_SQ) || 85;

/**
 * Compute roof measurements from facet data.
 * Lineal footage is estimated from polygon perimeters and edge classification.
 */
export function computeMeasurements(facets: Facet[]): Measurements {
  const totalAreaM2 = facets.reduce((sum, f) => sum + f.areaM2, 0);
  const totalSqFt = totalAreaM2 * 10.764;
  const totalSquares = totalSqFt / 100;

  // Estimate lineal footage from polygon perimeters
  let totalPerimeterM = 0;
  for (const facet of facets) {
    if (facet.polygon.length < 3) continue;
    for (let i = 0; i < facet.polygon.length - 1; i++) {
      const [lng1, lat1] = facet.polygon[i];
      const [lng2, lat2] = facet.polygon[i + 1];
      totalPerimeterM += haversineMeters(lat1, lng1, lat2, lng2);
    }
  }

  const totalPerimeterFt = totalPerimeterM * 3.281;

  // Edge classification heuristic based on typical roof geometry:
  // Shared edges (between facets) = ridges + hips + valleys
  // Unshared edges = eaves + rakes
  // For a standard residential roof:
  //   ~25% of total perimeter is ridge/hip
  //   ~10% is valley
  //   ~45% is eave
  //   ~20% is rake
  const ridgeLF = Math.round(totalPerimeterFt * 0.15);
  const hipLF = Math.round(totalPerimeterFt * 0.10);
  const valleyLF = Math.round(totalPerimeterFt * 0.10);
  const eaveLF = Math.round(totalPerimeterFt * 0.45);
  const rakeLF = Math.round(totalPerimeterFt * 0.20);

  // Waste factor: base 10% + 2% per steep facet (> 45°) + 1% per complex facet (> 6 sides)
  const steepFacets = facets.filter(f => f.pitchDegrees > 45).length;
  const complexFacets = facets.filter(f => f.polygon.length > 8).length;
  const wasteFactor = 0.10 + (steepFacets * 0.02) + (complexFacets * 0.01);
  const orderedSquares = Math.ceil(totalSquares * (1 + wasteFactor));

  return {
    totalSquares: Math.round(totalSquares * 10) / 10,
    ridgeLF,
    hipLF,
    valleyLF,
    eaveLF,
    rakeLF,
    wasteFactor: Math.round(wasteFactor * 100) / 100,
    orderedSquares,
  };
}

/**
 * Compute material quantities from measurements
 */
export function computeMaterials(measurements: Measurements): Materials {
  const { orderedSquares, ridgeLF, hipLF, eaveLF } = measurements;
  return {
    shinglesBundles: orderedSquares * 3,
    underlaymentRolls: Math.ceil(orderedSquares / 4),
    ridgeCapBundles: Math.ceil((ridgeLF + hipLF) / 35),
    starterStripsLF: Math.ceil(eaveLF * 1.1),
    nailsLbs: Math.ceil(orderedSquares * 2.5),
  };
}

/**
 * Compute bid numbers
 */
export function computeBid(measurements: Measurements): Bid {
  const { orderedSquares } = measurements;
  const materialCost = orderedSquares * PRICE_PER_SQ;
  const laborCost = orderedSquares * LABOR_PER_SQ;
  return {
    materialCost,
    laborCost,
    total: materialCost + laborCost,
    pricePerSq: PRICE_PER_SQ + LABOR_PER_SQ,
  };
}

/** Haversine distance in meters between two lat/lng points */
function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
