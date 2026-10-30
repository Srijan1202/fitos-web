/**
 * Everything that changes with a release, in one place. To publish a new
 * beta: build it in the app repo (apps/mobile/tool/hosted.ps1), update `apk`
 * below, and deploy with the APK (deploy/deploy.ps1 -Apk <file>): the APK is
 * served from this site, under /downloads/.
 */
const releaseTag = 'phase-19-beta-4.7';
const apkFile = 'fitos-beta-1.0.0-beta.4.7-25-50ee9ba-api.tryfitos.me.apk';

export const site = {
  name: 'FITOS',
  url: 'https://tryfitos.me',
  description:
    'FITOS plans your training, food and recovery from what you log — a programme that progresses with you, Indian food and VIT mess menus, trend weight, and an AI coach. Free Android beta.',
  apk: {
    version: '1.0.0-beta.4.7',
    build: 25,
    sizeBytes: 43_891_500,
    sha256: 'e22a784a04ec5e69e1c0532de64dbcd063b025937f67c7bfd72e0efa8f285e0f',
    file: apkFile,
    url: `/downloads/${apkFile}`,
    releaseUrl: `https://github.com/Srijan1202/fitnew/releases/tag/${releaseTag}`,
    released: '2026-10-30',
    /** The blog post on what changed in this version. */
    notesUrl: '/blog/beta-4-7/',
    minAndroid: 'Android 8.0 or newer',
    device: '64-bit Android phone (almost every phone from the last few years)',
  },
} as const;

export const apkSizeMb = (site.apk.sizeBytes / 1024 / 1024).toFixed(1);
