import type { BuildingInsights, DataLayers } from '../types.js';

const BASE = 'https://solar.googleapis.com/v1';

export async function getBuildingInsights(lat: number, lng: number): Promise<BuildingInsights> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_API_KEY not set');

  const url = `${BASE}/buildingInsights:findClosest` +
    `?location.latitude=${lat}&location.longitude=${lng}` +
    `&requiredQuality=HIGH&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Solar API buildingInsights failed (${res.status}): ${err}`);
  }

  const data = await res.json() as BuildingInsights;

  if (data.imageryQuality !== 'HIGH') {
    throw new Error(
      `Imagery quality is ${data.imageryQuality}, not HIGH. ` +
      `Accurate measurements require HIGH quality satellite imagery for this address.`
    );
  }

  return data;
}

export async function getDataLayers(lat: number, lng: number): Promise<DataLayers> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_API_KEY not set');

  const url = `${BASE}/dataLayers:get` +
    `?location.latitude=${lat}&location.longitude=${lng}` +
    `&radiusMeters=50&view=FULL_LAYERS&requiredQuality=HIGH` +
    `&pixelSizeMeters=0.1&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Solar API dataLayers failed (${res.status}): ${err}`);
  }

  return await res.json() as DataLayers;
}
