/**
 * Everything that changes with a release, in one place. To publish a new
 * beta: build it in the app repo (apps/mobile/tool/hosted.ps1), publish the
 * GitHub release with the APK attached, then update `apk` below.
 */
const releaseTag = 'phase-19-beta-3';
const apkFile = 'fitos-beta-1.0.0-beta.3-6-12f436e-api.tryfitos.me.apk';

export const site = {
  name: 'FITOS',
  url: 'https://tryfitos.me',
  description:
    'FITOS plans your training, food and recovery from what you log — a programme that progresses with you, Indian food and VIT mess menus, trend weight, and an AI coach. Free Android beta.',
  apk: {
    version: '1.0.0-beta.3',
    build: 6,
    sizeBytes: 30_008_819,
    sha256: '9a00bb3336b76423a43f7fade7f5bccda558b225f860e86a3cd001d0f137ff23',
    file: apkFile,
    url: `https://github.com/Srijan1202/fitnew/releases/download/${releaseTag}/${apkFile}`,
    releaseUrl: `https://github.com/Srijan1202/fitnew/releases/tag/${releaseTag}`,
    released: '2026-10-22',
    minAndroid: 'Android 8.0 or newer',
    device: '64-bit Android phone (almost every phone from the last few years)',
  },
} as const;

export const apkSizeMb = (site.apk.sizeBytes / 1024 / 1024).toFixed(1);
