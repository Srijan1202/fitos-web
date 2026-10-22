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

1. In the app repo, build the APK (`apps/mobile/tool/hosted.ps1`).
2. Update `apk` in [`src/site.ts`](src/site.ts): `apkFile`, `version`, `build`, `sizeBytes`, `sha256`, `released` (and `releaseTag` for the notes link).
3. `.\deploy\deploy.ps1 -Apk <path to the APK>`. It refuses an APK whose name or SHA-256 differs from `site.ts`, so the button never points at the wrong file.

The APK is served from this site (`https://tryfitos.me/downloads/<file>`), not from GitHub.

## Hosting (AWS)

`out/` is plain HTML, CSS and JS. It's served from a private S3 bucket through CloudFront with HTTPS, in the same AWS account as the FITOS server (stack `fitos-website`, us-east-1, [`deploy/website.yaml`](deploy/website.yaml)).

One-time setup, signed in with `aws login --profile fitos`:

1. `.\deploy\setup.ps1`: requests the certificate and prints two CNAME records. Add them at Namecheap (tryfitos.me, Advanced DNS).
2. `.\deploy\setup.ps1` again, once the certificate is issued: creates the stack and prints the records that point `tryfitos.me` (ALIAS) and `www` (CNAME) at CloudFront. Replace the old `@` and `www` records (GitHub Pages) with them. Keep `api`.
3. `.\deploy\deploy.ps1 -Apk <path>`.

After that, every change is `.\deploy\deploy.ps1`. `www.tryfitos.me` redirects to `tryfitos.me`.

## Later: admin controls on the website

The admin panel is a separate local app today (`apps/admin` in the app repo). To bring its controls here, add a signed-in `/admin` area that runs **in the browser**: Firebase sign-in, then calls to `https://api.tryfitos.me/v1/admin/*` with the user's token. That works with this static site, with no server to run. The API keeps enforcing who is an admin. It needs CORS on the API for `https://tryfitos.me`, and pages kept out of search engines.

## Where things come from

- **Screens** (`public/screens/*.webp`): real renders of the app (FITOS Dark), made with the app's widget-test renderer and the real Barlow font, then resized to 720×1560 WebP.
- **Logo** (`public/brand/`), **favicons** (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`) and the **share image** (`src/app/opengraph-image.png`): from the brand kit (`brand/` in the app repo).
- **Font**: Barlow (SIL OFL), self-hosted as WOFF2 by `next/font/google` at build time (no request to Google from visitors).
- **Privacy policy** (`src/content/privacy-policy.md`): the app's policy (`docs/legal/privacy-policy.md` in the app repo), without its internal notes. Keep the two in step.
