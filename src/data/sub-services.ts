/**
 * Sub-service hero image registry.
 *
 * All text content (title, description, headline, content, keyFacts, faqs)
 * lives in Ghost CMS — this file only maps slugs to local hero images
 * for Astro's image optimization pipeline.
 */

import type { ImageMetadata } from 'astro';
import {
  roofingAsphalt as imgRoofingAsphalt,
  roofingMetal as imgRoofingMetal,
  roofingTile as imgRoofingTile,
  roofingFlat as imgRoofingFlat,
  sidingVinyl as imgSidingVinyl,
  sidingFiberCement as imgSidingFiberCement,
  sidingWood as imgSidingWood,
  sidingStucco as imgSidingStucco,
  windowDoubleHung as imgWindowDoubleHung,
  windowCasement as imgWindowCasement,
  windowSliding as imgWindowSliding,
  windowBay as imgWindowBay,
  windowPicture as imgWindowPicture,
  windowGarden as imgWindowGarden,
  serviceAdu as imgServiceAdu,
  financingHouse as imgFinancingHouse,
  financingWorker as imgFinancingWorker,
  serviceAdditions as imgServiceAdditions,
  serviceCustomHomes as imgServiceCustomHomes,
  designPlanning as imgDesignPlanning,
  designEngineering as imgDesignEngineering,
  serviceCustomHomesFull as imgServiceCustomHomesFull,
} from '../lib/images';

export interface SubServiceData {
  parentService: string;
  parentName: string;
  typeSlug: string;
  title: string;
  description: string;
  headline: string;
  heroImage: ImageMetadata;
  heroAlt: string;
  content: string[];
  keyFacts: Array<{ value: string; label: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

/** Hero images indexed by `${parentService}/${typeSlug}` — content comes from Ghost */
export const SUB_SERVICE_IMAGES: Record<string, { heroImage: ImageMetadata; heroAlt: string }> = {
  // Roofing
  'roofing/asphalt-shingles': { heroImage: imgRoofingAsphalt, heroAlt: 'Asphalt shingle roof installation by Hamilton Exteriors in the Bay Area' },
  'roofing/metal':            { heroImage: imgRoofingMetal, heroAlt: 'Standing seam metal roof installation in the Bay Area by Hamilton Exteriors' },
  'roofing/tile':             { heroImage: imgRoofingTile, heroAlt: 'Tile roof installation on a Bay Area home by Hamilton Exteriors' },
  'roofing/energy':           { heroImage: imgRoofingFlat, heroAlt: 'GAF Energy solar roof system installed on a Bay Area home' },
  // Siding
  'siding/vinyl':             { heroImage: imgSidingVinyl, heroAlt: 'Vinyl siding installation on a Bay Area home by Hamilton Exteriors' },
  'siding/fiber-cement':      { heroImage: imgSidingFiberCement, heroAlt: 'James Hardie fiber cement siding on a Bay Area home installed by Hamilton Exteriors' },
  'siding/stucco':            { heroImage: imgSidingWood, heroAlt: 'Stucco siding application on a Bay Area home by Hamilton Exteriors' },
  'siding/waterproofing':     { heroImage: imgSidingStucco, heroAlt: 'Exterior waterproofing application on a Bay Area home' },
  // Windows
  'windows/single-hung':      { heroImage: imgWindowDoubleHung, heroAlt: 'Single hung window replacement by Hamilton Exteriors in the Bay Area' },
  'windows/single-slider':    { heroImage: imgWindowCasement, heroAlt: 'Single slider window installation on a Bay Area home' },
  'windows/sliding-glass-doors': { heroImage: imgWindowSliding, heroAlt: 'Sliding glass door installation connecting indoor and outdoor living space' },
  'windows/picture':          { heroImage: imgWindowBay, heroAlt: 'Large picture window showcasing Bay Area views installed by Hamilton Exteriors' },
  'windows/double-hung':      { heroImage: imgWindowPicture, heroAlt: 'Double hung window replacement on a Bay Area Victorian home' },
  'windows/casement':         { heroImage: imgWindowGarden, heroAlt: 'Casement window installation on a Bay Area home by Hamilton Exteriors' },
  // ADU
  'adu/detached':             { heroImage: imgServiceAdu, heroAlt: 'Detached accessory dwelling unit built by Hamilton Exteriors in the Bay Area' },
  'adu/design':               { heroImage: imgFinancingHouse, heroAlt: 'ADU architectural design and 3D rendering by Hamilton Exteriors' },
  'adu/permits':              { heroImage: imgFinancingWorker, heroAlt: 'ADU permit plans and engineering documents by Hamilton Exteriors' },
  'adu/garage-conversions':   { heroImage: imgServiceAdditions, heroAlt: 'Garage conversion to ADU by Hamilton Exteriors in the Bay Area' },
  // Custom Homes
  'custom-homes/ground-up':   { heroImage: imgServiceCustomHomes, heroAlt: 'Ground-up custom home construction in the Bay Area by Hamilton Exteriors' },
  'custom-homes/design':      { heroImage: imgDesignPlanning, heroAlt: 'Custom home architectural design and 3D rendering by Hamilton Exteriors' },
  'custom-homes/permits':     { heroImage: imgDesignEngineering, heroAlt: 'Custom home engineering and permit documents by Hamilton Exteriors' },
  'custom-homes/additions-renovations': { heroImage: imgServiceAdditions, heroAlt: 'Home addition seamlessly integrated with existing Bay Area home architecture' },
  // Additions
  'additions/second-story':   { heroImage: imgServiceAdditions, heroAlt: 'Second story addition under construction on a Bay Area home' },
  'additions/room-extensions': { heroImage: imgFinancingHouse, heroAlt: 'Room extension seamlessly integrated with Bay Area home' },
  'additions/adus-guest-houses': { heroImage: imgServiceAdu, heroAlt: 'ADU guest house built by Hamilton Exteriors in the Bay Area' },
  'additions/full-remodels':  { heroImage: imgServiceCustomHomesFull, heroAlt: 'Whole house remodel in progress by Hamilton Exteriors in the Bay Area' },
};
