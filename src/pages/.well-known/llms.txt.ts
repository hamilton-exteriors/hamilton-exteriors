import type { APIRoute } from 'astro';
import { GET as getLlmsTxt } from '../llms.txt';

/** Serve the same dynamic llms.txt at /.well-known/llms.txt */
export const GET: APIRoute = getLlmsTxt;
