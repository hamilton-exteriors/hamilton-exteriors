# Hamilton SEO worker

Cloud worker for the per-page SEO pipeline. Same logic as `scripts/run-single-page.mjs`, packaged as an HTTP service with a queue and worker pool.

## Architecture

```
Local coordinator              Railway service: hamilton-seo-worker
                               ┌─────────────────────────────────────┐
scripts/enqueue-batch.mjs ───→ │ Express :3030                       │
   POST /enqueue-batch         │                                     │
                               │ jobs.json (file queue)              │
                               │   ↓ claimNext()                     │
                               │ Worker pool (N concurrent)          │
                               │   ↓ runPage(slug)                   │
                               │     pulls SERPs, crawls competitors,│
                               │     generates draft via DeepInfra,  │
                               │     runs auto-fix + QA, writes draft│
                               │                                     │
                               │ /data volume:                       │
                               │   jobs.json + seo/drafts/*.md       │
scripts/poll-batch.mjs    ←─── │ GET /jobs, GET /drafts/:slug        │
                               └─────────────────────────────────────┘
```

## Deploy to Railway

1. Create a new Railway service in the existing `hamilton-exteriors` project.
2. Connect this GitHub repo, set the root directory to repo root (worker reads `seo/` and `scripts/`).
3. Railway auto-detects `seo-worker/railway.json`. The Dockerfile builds from repo root and includes `scripts/` + `seo/`.
4. Add a **Persistent Volume** mounted at `/data` (recommended size: 2 GB).
5. Set environment variables:

```
WORKER_AUTH_TOKEN=<random 32-byte hex>
WORKER_CONCURRENCY=3
DATA_DIR=/data
SEO_ROOT=/app/seo

ANTHROPIC_API_KEY=<from main project>
DEEPINFRA_API_KEY=<from main project>
DATAFORSEO_LOGIN=admin@hamilton-exteriors.com
DATAFORSEO_PASSWORD=<from main project>
FIRECRAWL_API_KEY=<from main project>
GHOST_URL=https://ghost-production-42337.up.railway.app
GHOST_ADMIN_API_KEY=<from main project>

# Optional — GSC. Either path to file in container or inline JSON.
GSC_SERVICE_ACCOUNT_JSON=<inline json> OR GSC_SERVICE_ACCOUNT_JSON_PATH=/data/gsc-sa.json
```

6. Generate a public domain (Railway settings → Networking).
7. Test: `curl https://<your-service>.up.railway.app/health` → should return `{ ok: true, ... }`.

## Local development

```bash
cd seo-worker
npm install
WORKER_AUTH_TOKEN=dev npm run dev
```

Then in another terminal:

```bash
curl -X POST http://localhost:3030/enqueue \
  -H "Authorization: Bearer dev" \
  -H "Content-Type: application/json" \
  -d '{"slug":"sa-city-service__berkeley-ca__roofing"}'
```

## Cost & throughput

- ~$0.003 per service-area page (V4-Flash)
- ~$0.10 per cost-blog (V4-Pro)
- 3 concurrent workers ≈ 1 page every 2–3 minutes per worker = ~60 pages/hour
- 387-page bulk run ≈ 6–8 hours wall time at 3-concurrent
- Total compute cost: ~$15 (DeepInfra) + ~$10 (DataForSEO + Firecrawl) + ~$5 (Railway hours)

## Endpoints (require Bearer auth)

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/health` | open — service status |
| `POST` | `/enqueue` | `{slug, model?}` queue one |
| `POST` | `/enqueue-batch` | `{slugs[], model?}` queue many |
| `GET` | `/jobs` | list jobs (optional `?status=...`) |
| `GET` | `/jobs/:slug` | one job |
| `GET` | `/drafts/:slug` | draft markdown |
| `GET` | `/qa/:slug` | QA result JSON |
| `POST` | `/publish/:slug` | run ghost-publish |
