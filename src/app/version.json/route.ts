import { site } from "@/site";

/**
 * The latest beta, for the app's "a new version is available" check (beta 3.2).
 * Written at build time from src/site.ts, so deploying a new APK updates it;
 * the app compares `build` with its own and links to `url`, or (beta 4.1)
 * downloads `apkUrl` itself.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    version: site.apk.version,
    build: site.apk.build,
    url: `${site.url}/download/`,
    notesUrl: `${site.url}${site.apk.notesUrl}`,
    released: site.apk.released,
    // Beta 4.1 (U2): the APK itself, for "Update now" inside the app, which
    // checks the download's SHA-256 against this one before installing.
    apkUrl: `${site.url}${site.apk.url}`,
    sha256: site.apk.sha256,
    sizeBytes: site.apk.sizeBytes,
  });
}
