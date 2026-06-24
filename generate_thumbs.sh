#!/bin/bash
#
# generate_thumbs.sh
# ------------------
# Auto-generates a poster THUMBNAIL (.jpg) for every marquee video under
# static/videos/{slider,wall}/ — used by the hero marquee (section-hero-videowall.html),
# which sets each thumb as the card background (so cards are never empty) and as the
# <video> poster.
#
# - Idempotent: only creates a thumb when one is MISSING (never overwrites a poster
#   you hand-picked). Pass --force to regenerate all.
# - Frame is grabbed at ~25% of the clip duration (skips black intro frames).
# - Naming: thumb = same path as the video with .jpg — i.e. always the puzh_com_*
#   reference (puzh_com_slider_0001.mp4 -> puzh_com_slider_0001.jpg).
#
# Requires ffmpeg + ffprobe.   Usage:  ./generate_thumbs.sh [--force]

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FORCE="${1:-}"
SUBDIRS=("slider" "wall")
WIDTH=720   # thumb width (px); height auto

for sub in "${SUBDIRS[@]}"; do
  dir="$ROOT/static/videos/$sub"
  [ -d "$dir" ] || continue

  for mp4 in "$dir"/*.mp4; do
    [ -f "$mp4" ] || continue
    jpg="${mp4%.mp4}.jpg"

    if [ -f "$jpg" ] && [ "$FORCE" != "--force" ]; then
      echo "skip  $(basename "$jpg") (exists)"
      continue
    fi

    # Grab a representative frame at ~25% of the duration (fallback: 1s).
    dur="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$mp4" 2>/dev/null || echo "")"
    ts="1"
    if [ -n "$dur" ]; then
      ts="$(awk "BEGIN{d=$dur; printf \"%.2f\", (d>0?d*0.25:1)}")"
    fi

    ffmpeg -y -ss "$ts" -i "$mp4" -frames:v 1 -vf "scale=${WIDTH}:-1" -q:v 3 "$jpg" >/dev/null 2>&1
    echo "thumb $(basename "$jpg")  (@${ts}s)"
  done
done

echo "Done. Thumbnails are in static/videos/{slider,wall}/ — re-run after adding new videos."
