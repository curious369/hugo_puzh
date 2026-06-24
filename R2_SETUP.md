# Cloudflare R2 Setup for PUZH Marquee Media

The hero video marquee (`layouts/partials/section-hero-videowall.html`) loads its
`.mp4` clips and `.jpg` posters from a configurable base URL
(`mediaBaseURL` in `config.toml` → `[params]`).

- `mediaBaseURL = ""` (empty) → videos load **locally** from the Hugo site
  (`/videos/...`). This is the default for local dev.
- `mediaBaseURL = "https://media.puzh.com"` → videos load from **Cloudflare R2**
  (`https://media.puzh.com/videos/...`).

Follow the steps below to move the media to R2.

## 1. Create the R2 bucket

In the Cloudflare dashboard: **R2 → Create bucket**, name it `puzh-media`.

## 2. Upload the video + poster files

The media lives under:

- `static/videos/slider/` — `puzh_com_slider_0001.mp4` … `_0008.mp4` (+ matching `.jpg` posters)
- `static/videos/wall/`   — `clip1.mp4` … `clip12.mp4` (+ matching `.jpg` posters)

Upload everything **preserving the path under `/videos/...`** so that the final
public URLs are e.g. `https://media.puzh.com/videos/slider/puzh_com_slider_0001.mp4`.

### Option A — wrangler (single file example)

```bash
wrangler login   # one-time Cloudflare auth

wrangler r2 object put puzh-media/videos/slider/puzh_com_slider_0001.mp4 \
  --file=static/videos/slider/puzh_com_slider_0001.mp4
```

To upload everything in one go, use the bundled helper script:

```bash
./upload_to_r2.sh
```

### Option B — rclone

Configure an `r2` remote once (`rclone config`, type = S3, provider = Cloudflare,
using your R2 Access Key ID / Secret and the account endpoint), then:

```bash
# Sync the slider folder into the bucket under videos/slider/
rclone copy static/videos/slider/ r2:puzh-media/videos/slider/ --progress

# Sync the wall folder into the bucket under videos/wall/
rclone copy static/videos/wall/   r2:puzh-media/videos/wall/   --progress
```

## 3. Connect the custom domain

In the dashboard: **R2 → puzh-media → Settings → Public access / Custom Domain**,
add the custom domain `media.puzh.com`. Cloudflare will create the DNS record and
serve the bucket publicly at `https://media.puzh.com/...`.

## 4. Point the site at R2 and rebuild

Edit `config.toml`, inside `[params]`:

```toml
mediaBaseURL = "https://media.puzh.com"
```

Then rebuild:

```bash
hugo --gc --minify
```

## Notes

- Keep `mediaBaseURL = ""` for **local dev** — videos then load from the Hugo
  site itself, no R2 needed.
- The two `<link rel="preload">` tags for `puzh_com_slider_0008` in
  `layouts/index.html` can optionally be prefixed with the R2 domain later
  (e.g. `https://media.puzh.com/videos/slider/puzh_com_slider_0008.mp4`) for the
  same CDN benefit. This is optional and not required for the marquee to work.
