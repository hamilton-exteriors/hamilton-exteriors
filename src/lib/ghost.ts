const GHOST_URL = import.meta.env.PUBLIC_GHOST_URL || '';
const GHOST_KEY = import.meta.env.PUBLIC_GHOST_CONTENT_API_KEY || '';

export interface GhostPost {
  id: string;
  slug: string;
  title: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  updated_at: string;
  reading_time: number;
  meta_title: string | null;
  meta_description: string | null;
  tags: { id: string; name: string; slug: string }[];
  primary_tag: { name: string; slug: string } | null;
}

export interface GhostPagination {
  page: number;
  limit: number;
  pages: number;
  total: number;
}

async function ghostFetch(endpoint: string, params: Record<string, string> = {}) {
  if (!GHOST_URL || !GHOST_KEY) {
    throw new Error('Ghost CMS not configured. Set PUBLIC_GHOST_URL and PUBLIC_GHOST_CONTENT_API_KEY.');
  }
  const url = new URL(`${GHOST_URL}/ghost/api/content/${endpoint}/`);
  url.searchParams.set('key', GHOST_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString(), { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`Ghost API error: ${res.status}`);
  return res.json();
}

export async function getPosts(options?: {
  page?: number;
  limit?: number;
  tag?: string;
}): Promise<{ posts: GhostPost[]; pagination: GhostPagination }> {
  const params: Record<string, string> = {
    include: 'tags',
    limit: String(options?.limit ?? 12),
    page: String(options?.page ?? 1),
    fields: 'id,slug,title,excerpt,feature_image,published_at,updated_at,reading_time,meta_title,meta_description',
  };
  if (options?.tag) params.filter = `tag:${options.tag}`;
  const data = await ghostFetch('posts', params);
  return { posts: data.posts, pagination: data.meta.pagination };
}

export async function getPost(slug: string): Promise<GhostPost | null> {
  const data = await ghostFetch(`posts/slug/${slug}`, {
    include: 'tags',
  });
  return data.posts?.[0] ?? null;
}

export async function getTags(): Promise<{ name: string; slug: string; count: number }[]> {
  const data = await ghostFetch('tags', {
    include: 'count.posts',
    limit: 'all',
  });
  return (data.tags ?? [])
    .filter((t: any) => t.count?.posts > 0)
    .map((t: any) => ({ name: t.name, slug: t.slug, count: t.count.posts }));
}

export function isGhostConfigured(): boolean {
  return Boolean(GHOST_URL && GHOST_KEY);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
