# Hamilton Exteriors SEO worker
# Runs the per-page agent loop in a Railway service.
FROM node:22-bookworm-slim

WORKDIR /app

# Install deps in /app/seo-worker
COPY seo-worker/package.json seo-worker/package-lock.json* ./seo-worker/
RUN cd seo-worker && npm install --omit=dev

# scripts/ghost-publish.mjs and scripts/qa-page.mjs run with cwd=/app and need
# their deps resolvable from /app/node_modules. Symlink the worker's modules
# so any script under /app finds them via Node's module resolution.
RUN ln -s /app/seo-worker/node_modules /app/node_modules

# Copy the rest of the repo (worker needs scripts/ + seo/ at runtime)
COPY scripts ./scripts/
COPY seo ./seo/
COPY seo-worker ./seo-worker/

# Persistent state lives at /data (Railway volume mount)
ENV DATA_DIR=/data
ENV SEO_ROOT=/app/seo

EXPOSE 3030

WORKDIR /app/seo-worker
CMD ["node", "server.mjs"]
