# Hamilton Exteriors SEO worker
# Runs the per-page agent loop in a Railway service.
FROM node:22-bookworm-slim

WORKDIR /app

# Copy worker package files first for layer caching
COPY seo-worker/package.json seo-worker/package-lock.json* ./seo-worker/
RUN cd seo-worker && npm install --omit=dev

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
