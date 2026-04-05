/**
 * Maps city slugs to their area photo for use as OG images.
 * Returns the Astro ImageMetadata so Layout can auto-generate a 1200x630 OG image.
 */
import type { ImageMetadata } from 'astro';
import {
  areaOakland, areaFremont, areaHayward, areaBerkeley, areaSanLeandro,
  areaAntioch, areaConcord, areaWalnutCreek, areaSanRamon, areaRichmond,
  areaLarkspur, areaMillValley, areaNovato, areaSanRafael,
  areaSanJose, areaPaloAlto, areaMountainView, areaSunnyvale, areaCupertino,
  areaSantaClara, areaSaratoga, areaLosGatos, areaCampbell, areaMilpitas,
  areaNapa, areaCalistoga, areaStHelena, areaYountville, areaAmericanCanyon,
} from './images';

const CITY_IMAGES: Record<string, ImageMetadata> = {
  // Alameda County
  'oakland-ca': areaOakland,
  'fremont-ca': areaFremont,
  'hayward-ca': areaHayward,
  'berkeley-ca': areaBerkeley,
  'san-leandro-ca': areaSanLeandro,
  // Contra Costa County
  'antioch-ca': areaAntioch,
  'concord-ca': areaConcord,
  'walnut-creek-ca': areaWalnutCreek,
  'san-ramon-ca': areaSanRamon,
  'richmond-ca': areaRichmond,
  // Marin County
  'larkspur-ca': areaLarkspur,
  'mill-valley-ca': areaMillValley,
  'novato-ca': areaNovato,
  'san-rafael-ca': areaSanRafael,
  // Santa Clara County
  'san-jose-ca': areaSanJose,
  'palo-alto-ca': areaPaloAlto,
  'mountain-view-ca': areaMountainView,
  'sunnyvale-ca': areaSunnyvale,
  'cupertino-ca': areaCupertino,
  'santa-clara-ca': areaSantaClara,
  'saratoga-ca': areaSaratoga,
  'los-gatos-ca': areaLosGatos,
  'campbell-ca': areaCampbell,
  'milpitas-ca': areaMilpitas,
  // Napa County
  'napa-ca': areaNapa,
  'calistoga-ca': areaCalistoga,
  'st-helena-ca': areaStHelena,
  'yountville-ca': areaYountville,
  'american-canyon-ca': areaAmericanCanyon,
};

/** Get the area photo for a city slug, or undefined if no match. */
export function getCityOgImage(citySlug: string): ImageMetadata | undefined {
  return CITY_IMAGES[citySlug];
}
