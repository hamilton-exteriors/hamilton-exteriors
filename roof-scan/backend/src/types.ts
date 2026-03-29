export interface LatLng {
  lat: number;
  lng: number;
}

export interface RoofSegment {
  pitchDegrees: number;
  azimuthDegrees: number;
  areaMeters2: number;
  center: LatLng;
  boundingBox: { sw: LatLng; ne: LatLng };
  planeHeightAtCenterMeters: number;
}

export interface BuildingInsights {
  name: string;
  center: LatLng;
  imageryDate: { year: number; month: number; day: number };
  imageryQuality: 'HIGH' | 'MEDIUM' | 'LOW';
  solarPotential: {
    roofSegmentStats: RoofSegment[];
    wholeRoofStats: {
      areaMeters2: number;
      groundAreaMeters2: number;
      sunshineQuantiles: number[];
    };
    maxArrayPanelsCount: number;
    maxArrayAreaMeters2: number;
  };
}

export interface DataLayers {
  imageryDate: { year: number; month: number; day: number };
  imageryProcessedDate: { year: number; month: number; day: number };
  dsmUrl: string;
  rgbUrl: string;
  maskUrl: string;
  annualFluxUrl: string;
  monthlyFluxUrl: string;
  imageryQuality: string;
}

export interface GeoTiffData {
  data: Float32Array | Uint8Array;
  width: number;
  height: number;
  bounds: { north: number; south: number; east: number; west: number };
  pixelScale: [number, number, number];
  tiepoint: number[];
}

export interface Facet {
  id: number;
  pitchDegrees: number;
  pitchRatio: string;
  azimuth: number;
  areaM2: number;
  areaSq: number;
  groundAreaM2: number;
  polygon: [number, number][];
}

export interface Measurements {
  totalSquares: number;
  ridgeLF: number;
  hipLF: number;
  valleyLF: number;
  eaveLF: number;
  rakeLF: number;
  wasteFactor: number;
  orderedSquares: number;
}

export interface Materials {
  shinglesBundles: number;
  underlaymentRolls: number;
  ridgeCapBundles: number;
  starterStripsLF: number;
  nailsLbs: number;
}

export interface Bid {
  materialCost: number;
  laborCost: number;
  total: number;
  pricePerSq: number;
}

export interface RoofScanResponse {
  imageryDate: string;
  imageryQuality: 'HIGH';
  address: string;
  center: LatLng;
  facets: Facet[];
  measurements: Measurements;
  materials: Materials;
  bid: Bid;
  dsm: {
    width: number;
    height: number;
    data: number[];
    bounds: { north: number; south: number; east: number; west: number };
  };
  rgb: {
    width: number;
    height: number;
    data: number[];
    bounds: { north: number; south: number; east: number; west: number };
  };
  roofGeoJSON: GeoJSON.FeatureCollection;
}
