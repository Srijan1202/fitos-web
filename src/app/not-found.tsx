import Link from "next/link";

export default function NotFound() {
  return (
    <section className="glow-bg">
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-24 sm:px-6">
        <span className="eyebrow">404</span>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">This page skipped today.</h1>
        <p className="mt-4 text-lg text-white/70">The page you were looking for isn&apos;t here. The rest of the site is.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="lime-gradient inline-flex h-12 items-center rounded-xl px-6 font-semibold text-on-accent">
            Go home
          </Link>
          <Link href="/download/" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-6 font-semibold text-white/90 hover:text-lime">
            Download FITOS
          </Link>
        </div>
      </div>
    </section>
  );
}
