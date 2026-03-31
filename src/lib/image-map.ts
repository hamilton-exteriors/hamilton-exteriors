/**
 * Maps string keys to imported ImageMetadata objects.
 * Used to resolve Ghost CMS string references to Astro Image assets.
 */
import type { ImageMetadata } from 'astro';
import * as images from './images';

/** Complete map of every exported image name → ImageMetadata */
const map: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(images).filter(([, v]) => v && typeof v === 'object' && 'src' in v)
) as Record<string, ImageMetadata>;

/**
 * Resolve an image key string to an ImageMetadata object.
 * Returns the fallback if the key is not found.
 */
export function resolveImage(key: string, fallback?: ImageMetadata): ImageMetadata {
  return map[key] ?? fallback ?? images.heroBg;
}

/**
 * Resolve an array of objects that have an `image` field (string key).
 * Replaces each string key with the actual ImageMetadata.
 */
export function resolveImages<T extends { image: string | ImageMetadata }>(
  items: T[],
  fallback?: ImageMetadata,
): (Omit<T, 'image'> & { image: ImageMetadata })[] {
  return items.map((item) => ({
    ...item,
    image: typeof item.image === 'string' ? resolveImage(item.image, fallback) : item.image,
  }));
}

export { map as imageMap };
