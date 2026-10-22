import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "@/components/phone";
import { site, apkSizeMb } from "@/site";

export const metadata: Metadata = {
  title: "Download",
  description: `Download the FITOS Android beta (version ${site.apk.version}). Free, about ${apkSizeMb} MB.`,
};

const steps = [
  {
    title: "Download the APK",
    body: "Tap the button on your Android phone. Chrome may warn that the file can harm your device — FITOS is safe; tap Download anyway.",
  },
  {
    title: "Allow installing it",
    body: "Open the file. The first time, Android asks to allow installs from your browser or Files app: tap Settings, turn on “Allow from this source”, and go back.",
  },
  {
    title: "Install and sign in",
    body: "Tap Install, then Open. Sign in with Google or email, answer a few questions, and FITOS builds your plan.",
  },
];

export default function DownloadPage() {
  const a = site.apk;
  return (
    <div className="glow-bg">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <span className="eyebrow">Download</span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Get FITOS for Android</h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">
            Free beta. It installs over any earlier version and keeps your data.
          </p>

          <div className="glass mt-8 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="text-sm text-mist">FITOS beta</div>
                <div className="text-2xl font-semibold">Version {a.version}</div>
                <div className="mt-1 text-sm text-mist">
                  {apkSizeMb} MB · released {a.released} · {a.minAndroid}
                </div>
              </div>
              <a
                href={a.url}
                download
                className="lime-gradient inline-flex h-14 items-center gap-2 rounded-xl px-8 text-lg font-semibold text-carbon shadow-[0_8px_30px_-8px_rgb(198_244_50/0.6)] transition hover:brightness-110"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download APK
              </a>
            </div>
            <details className="mt-6 text-sm text-white/70">
              <summary className="cursor-pointer text-white/80">Check the file (SHA-256)</summary>
              <p className="mt-2">
                The file is <code className="break-all text-white/90">{a.file}</code>. Its SHA-256 checksum is:
              </p>
              <code className="mt-2 block break-all rounded-lg bg-black/40 p-3 text-lime">{a.sha256}</code>
              <p className="mt-2">
                What&apos;s new is in the{" "}
                <a href={a.releaseUrl} className="text-lime underline-offset-4 hover:underline">
                  release notes
                </a>
                .
              </p>
            </details>
          </div>

          <h2 className="mt-14 text-2xl font-semibold">Install in three steps</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} className="glass flex gap-5 p-5">
                <span className="lime-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold text-carbon">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-white/70">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-4 text-sm text-white/70 sm:grid-cols-2">
            <div className="glass p-5">
              <h3 className="font-semibold text-white">Requirements</h3>
              <p className="mt-1">{a.minAndroid}, on a {a.device}.</p>
            </div>
            <div className="glass p-5">
              <h3 className="font-semibold text-white">Play Store and iPhone</h3>
              <p className="mt-1">Coming later. Until then, this page always has the newest beta.</p>
            </div>
          </div>
          <p className="mt-8 text-sm text-mist">
            By installing you agree to the app&apos;s <Link href="/privacy/" className="text-lime hover:underline">privacy policy</Link>. FITOS is for people aged 18 or over.
          </p>
        </div>
        <div className="mx-auto w-full max-w-xs lg:sticky lg:top-24 lg:self-start">
          <Phone src="/screens/home.webp" alt="FITOS on Android" priority />
        </div>
      </div>
    </div>
  );
}
