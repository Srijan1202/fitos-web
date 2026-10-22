# FITOS website

The marketing site for the FITOS app: what the app does, real screens, pricing, an FAQ, and the **Android APK download**. Built with Next.js 16 (App Router) and Tailwind CSS 4, as a **fully static site**.

This is a separate repository from the app (the FITOS monorepo). The brand assets, fonts and screenshots were copied in from there.

## Run it

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # writes the static site to out/
pnpm lint
```

## Pages

| Path | What |
| --- | --- |
| `/` | Hero, features (Train, Fuel, Improve, FITOS AI), more features, screens, pricing, FAQ |
| `/download/` | The APK with version, size and SHA-256, install steps, requirements |
| `/privacy/` | "This website collects nothing", then the app's privacy policy |

## Publishing a new beta

1. In the app repo, build the APK (`apps/mobile/tool/hosted.ps1`), then publish the GitHub release with the APK attached.
2. Update `apk` in [`src/site.ts`](src/site.ts): `releaseTag`, `apkFile`, `version`, `build`, `sizeBytes`, `sha256`, `released`.
3. `pnpm build` and deploy `out/`.

The download button links to the GitHub release asset, so **the release must be published** (with the file attached under exactly `apkFile`) or the button returns 404.

## Where things come from

- **Screens** (`public/screens/*.webp`): real renders of the app (FITOS Dark), made with the app's widget-test renderer and the real Barlow font, then resized to 720×1560 WebP.
- **Logo** (`public/brand/`), **favicons** (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`) and the **share image** (`src/app/opengraph-image.png`): from the brand kit (`brand/` in the app repo).
- **Font**: Barlow (SIL OFL, `src/app/fonts/OFL.txt`), loaded locally with `next/font/local`.
- **Privacy policy** (`src/content/privacy-policy.md`): the app's policy (`docs/legal/privacy-policy.md` in the app repo), without its internal notes. Keep the two in step.

## Hosting

`out/` is plain HTML, CSS and JS, so any static host works: Amazon S3 + CloudFront (next to the beta API), GitHub Pages, Cloudflare Pages or Netlify. Point `tryfitos.me` (Namecheap DNS) at it. `api.tryfitos.me` stays on the API server.

Before going public, read the app's privacy policy: it describes a **closed beta** and lists what has to happen before a public launch.
