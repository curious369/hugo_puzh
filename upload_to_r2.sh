#!/bin/bash
#
# upload_to_r2.sh
# ---------------
# Uploads the marquee video clips and poster images to the Cloudflare R2
# bucket "puzh-media", preserving the path under /videos/... so the public
# URLs become https://media.puzh.com/videos/<subdir>/<filename>.
#
# PREREQUISITE: run `wrangler login` once for Cloudflare auth before running this.
#
# Safe to re-run: `wrangler r2 object put` overwrites existing objects, so
# re-running simply re-uploads / refreshes the same files (idempotent).
#
# Usage:
#   ./upload_to_r2.sh

set -euo pipefail

BUCKET="puzh-media"

# Directory of this script = HUGO-site root.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Subdirectories under static/videos/ to upload (both mp4 + jpg files).
SUBDIRS=("slider" "wall")

for sub in "${SUBDIRS[@]}"; do
  srcdir="$ROOT/static/videos/$sub"

  if [ ! -d "$srcdir" ]; then
    echo "WARN: $srcdir does not exist, skipping."
    continue
  fi

  # Loop over every file (videos + posters) in the subdirectory.
  for filepath in "$srcdir"/*; do
    [ -f "$filepath" ] || continue
    filename="$(basename "$filepath")"
    key="videos/$sub/$filename"

    echo "Uploading $key ..."
    wrangler r2 object put "$BUCKET/$key" --file="$filepath" --remote
  done
done

echo "Done. All files uploaded to R2 bucket '$BUCKET'."
