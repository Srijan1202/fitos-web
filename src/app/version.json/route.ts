import { site } from "@/site";

/**
 * The latest beta, for the app's "a new version is available" check (beta 3.2).
 * Written at build time from src/site.ts, so deploying a new APK updates it;
 * the app compares `build` with its own and links to `url`.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    version: site.apk.version,
    build: site.apk.build,
    url: `${site.url}/download/`,
    notesUrl: `${site.url}${site.apk.notesUrl}`,
    released: site.apk.released,
  });
}
