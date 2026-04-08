import type { GeoTiffData } from '../types.js';
export declare function downloadAndParseGeoTiff(url: string): Promise<GeoTiffData>;
/** Convert pixel (col, row) to (lng, lat) using GeoTIFF geotransform */
export declare function pixelToLatLng(col: number, row: number, pixelScale: [number, number, number], tiepoint: number[]): {
    lat: number;
    lng: number;
};
