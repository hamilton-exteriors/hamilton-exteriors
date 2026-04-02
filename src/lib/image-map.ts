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
 * Convert a filename like "hero-bg-2400.jpg" to camelCase key "heroBg2400".
 * Strips extension, then converts kebab-case to camelCase.
 */
function filenameToCamelKey(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, ''); // strip extension
  return base.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

/**
 * Resolve an image key string to an ImageMetadata object.
 * Accepts camelCase keys (e.g. "heroBg"), filenames (e.g. "hero-bg-2400.jpg"),
 * or full file paths (e.g. "C:\...\hero-bg-2400.jpg").
 * Returns the fallback if the key is not found.
 */
export function resolveImage(key: string, fallback?: ImageMetadata): ImageMetadata {
  // Direct key match
  if (map[key]) return map[key];

  // Try extracting filename from path and converting to camelCase
  const filename = key.replace(/\\/g, '/').split('/').pop() || key;
  const camelKey = filenameToCamelKey(filename);
  return map[camelKey] ?? fallback ?? images.heroBg;
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
