/**
 * Everything that changes with a release, in one place. To publish a new
 * beta: build it in the app repo (apps/mobile/tool/hosted.ps1), update `apk`
 * below, and deploy with the APK (deploy/deploy.ps1 -Apk <file>): the APK is
 * served from this site, under /downloads/.
 */
const releaseTag = 'phase-19-beta-4.1';
const apkFile = 'fitos-beta-1.0.0-beta.4.1-18-b4555fd-api.tryfitos.me.apk';

export const site = {
  name: 'FITOS',
  url: 'https://tryfitos.me',
  description:
    'FITOS plans your training, food and recovery from what you log — a programme that progresses with you, Indian food and VIT mess menus, trend weight, and an AI coach. Free Android beta.',
  apk: {
    version: '1.0.0-beta.4.1',
    build: 18,
    sizeBytes: 43_568_123,
    sha256: '424bbe5d4cbc808f8182b1807fd46b60b535b15f5f934bb13941dcdba9a48161',
    file: apkFile,
    url: `/downloads/${apkFile}`,
    releaseUrl: `https://github.com/Srijan1202/fitnew/releases/tag/${releaseTag}`,
    released: '2026-10-28',
    /** The blog post on what changed in this version. */
    notesUrl: '/blog/beta-4-1/',
    minAndroid: 'Android 8.0 or newer',
    device: '64-bit Android phone (almost every phone from the last few years)',
  },
} as const;

export const apkSizeMb = (site.apk.sizeBytes / 1024 / 1024).toFixed(1);
