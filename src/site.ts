/**
 * Everything that changes with a release, in one place. To publish a new
 * beta: build it in the app repo (apps/mobile/tool/hosted.ps1), update `apk`
 * below, and deploy with the APK (deploy/deploy.ps1 -Apk <file>): the APK is
 * served from this site, under /downloads/.
 */
const releaseTag = 'phase-19-beta-3.1';
const apkFile = 'fitos-beta-1.0.0-beta.3.1-7-d6fa01a-api.tryfitos.me.apk';

export const site = {
  name: 'FITOS',
  url: 'https://tryfitos.me',
  description:
    'FITOS plans your training, food and recovery from what you log — a programme that progresses with you, Indian food and VIT mess menus, trend weight, and an AI coach. Free Android beta.',
  apk: {
    version: '1.0.0-beta.3.1',
    build: 7,
    sizeBytes: 30_008_871,
    sha256: 'd8d40876223358de7819ea2eef0cc86c6a99eb923311c522bcedebe6ddb5db72',
    file: apkFile,
    url: `/downloads/${apkFile}`,
    releaseUrl: `https://github.com/Srijan1202/fitnew/releases/tag/${releaseTag}`,
    released: '2026-10-23',
    /** The blog post on what changed in this version. */
    notesUrl: '/blog/beta-3-1/',
    minAndroid: 'Android 8.0 or newer',
    device: '64-bit Android phone (almost every phone from the last few years)',
  },
} as const;

export const apkSizeMb = (site.apk.sizeBytes / 1024 / 1024).toFixed(1);
