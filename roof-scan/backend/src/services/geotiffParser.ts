import { fromArrayBuffer } from 'geotiff';
import type { GeoTiffData } from '../types.js';

export async function downloadAndParseGeoTiff(url: string): Promise<GeoTiffData> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_API_KEY not set');

  // Solar API GeoTIFF URLs need the API key appended
  const fullUrl = url.includes('?') ? `${url}&key=${apiKey}` : `${url}?key=${apiKey}`;

  const res = await fetch(fullUrl);
  if (!res.ok) {
    throw new Error(`GeoTIFF download failed (${res.status}): ${url}`);
  }

  const buf = await res.arrayBuffer();
  const tiff = await fromArrayBuffer(buf);
  const image = await tiff.getImage();
  const rasters = await image.readRasters();
  const bbox = image.getBoundingBox(); // [west, south, east, north]
  const width = image.getWidth();
  const height = image.getHeight();

  // Extract geotransform metadata for pixel→geo conversion
  const fd = image.fileDirectory;
  // Compute pixel scale from bounding box if GeoTIFF metadata is missing
  const pixelScale: [number, number, number] = fd.ModelPixelScale
    ? (fd.ModelPixelScale as [number, number, number])
    : [(bbox[2] - bbox[0]) / width, (bbox[3] - bbox[1]) / height, 0];
  const tiepoint: number[] = fd.ModelTiepoint
    ? (fd.ModelTiepoint as number[])
    : [0, 0, 0, bbox[0], bbox[3], 0];

  return {
    data: rasters[0] as Float32Array | Uint8Array,
    allBands: rasters.length >= 3 ? [rasters[0], rasters[1], rasters[2]] as [Uint8Array, Uint8Array, Uint8Array] : null,
    width,
    height,
    bounds: {
      west: bbox[0],
      south: bbox[1],
      east: bbox[2],
      north: bbox[3],
    },
    pixelScale,
    tiepoint,
  };
}

/** Convert pixel (col, row) to (lng, lat) using GeoTIFF geotransform */
export function pixelToLatLng(
  col: number,
  row: number,
  pixelScale: [number, number, number],
  tiepoint: number[]
): { lat: number; lng: number } {
  const [sx, sy] = pixelScale;
  const [px, py, , gx, gy] = tiepoint;
  return {
    lng: gx + (col - px) * sx,
    lat: gy - (row - py) * sy, // y is flipped in raster space
  };
}
