import type { BuildingInsights, DataLayers } from '../types.js';
export declare function getBuildingInsights(lat: number, lng: number): Promise<BuildingInsights>;
export declare function getDataLayers(lat: number, lng: number): Promise<DataLayers>;
