/**
 * Simple in-memory TTL cache for Ghost API responses.
 * Keeps data in a Map with a configurable TTL (default 5 minutes).
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

const store = new Map<string, CacheEntry<unknown>>();

export function cacheGet<T>(key: string, ttl = DEFAULT_TTL): T | null {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() - entry.timestamp > ttl) {
    store.delete(key);
    return null;
  }
  return entry.data;
}

export function cacheSet<T>(key: string, data: T): void {
  store.set(key, { data, timestamp: Date.now() });
}

export function cacheClear(): void {
  store.clear();
}
