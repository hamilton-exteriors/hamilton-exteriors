#!/bin/bash
# Seed the Railway /data volume with Overture Bay Area buildings parquet.
#
# Run via: railway shell < scripts/seed-overture-volume.sh
# Or:      railway run bash scripts/seed-overture-volume.sh
#
# Requires Python + overturemaps CLI in the container.
# If those aren't available, download locally and upload via:
#   railway up --detach (with the file bundled, then remove after first deploy)

TARGET="/data/overture-bayarea-buildings.parquet"

if [ -f "$TARGET" ]; then
  echo "Parquet already exists at $TARGET ($(du -h "$TARGET" | cut -f1)), skipping."
  exit 0
fi

echo "Downloading Bay Area buildings from Overture Maps..."
pip install -q overturemaps 2>/dev/null || { echo "pip not available, aborting"; exit 1; }

overturemaps download \
  --bbox=-123.5,36.8,-121.2,38.9 \
  -f geoparquet \
  -t building \
  -o "$TARGET"

echo "Done. $(du -h "$TARGET" | cut -f1) written to $TARGET."
