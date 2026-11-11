/**
 * Everything that changes with a release, in one place. To publish a new
 * beta: build it in the app repo (apps/mobile/tool/hosted.ps1), update `apk`
 * below, and deploy with the APK (deploy/deploy.ps1 -Apk <file>): the APK is
 * served from this site, under /downloads/.
 */
const releaseTag = 'phase-19-beta-6.2';
const apkFile = 'fitos-beta-1.0.0-beta.6.2-38-0a6a355-api.tryfitos.me.apk';

export const site = {
  name: 'FITOS',
  url: 'https://tryfitos.me',
  description:
    'FITOS plans your training, food and recovery from what you log — a programme that progresses with you, Indian food and VIT mess menus, trend weight, and an AI coach. Free Android beta.',
  apk: {
    version: '1.0.0-beta.6.2',
    build: 38,
    sizeBytes: 45_154_925,
    sha256: '8d3fda209eed5c8493e560257ce3c8817e45e6f244ae5211dd9fa2e28cf0f99e',
    file: apkFile,
    url: `/downloads/${apkFile}`,
    releaseUrl: `https://github.com/Srijan1202/fitnew/releases/tag/${releaseTag}`,
    released: '2026-11-11',
    /** The blog post on what changed in this version. */
    notesUrl: '/blog/beta-6-2/',
    minAndroid: 'Android 8.0 or newer',
    device: '64-bit Android phone (almost every phone from the last few years)',
  },
} as const;

export const apkSizeMb = (site.apk.sizeBytes / 1024 / 1024).toFixed(1);
