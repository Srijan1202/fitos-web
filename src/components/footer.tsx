import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-graphite/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Image src="/brand/logo-header.svg" alt="FITOS" width={146} height={36} />
          <p className="mt-4 text-sm leading-relaxed text-mist">
            Training, food and recovery, planned from what you log. Made for students, starting at VIT.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          <span className="eyebrow col-span-2 mb-1">FITOS</span>
          <Link href="/features/" className="text-white/80 hover:text-lime">Features</Link>
          <Link href="/download/" className="text-white/80 hover:text-lime">Download</Link>
          <Link href="/pricing/" className="text-white/80 hover:text-lime">Pricing</Link>
          <Link href="/about/" className="text-white/80 hover:text-lime">About</Link>
          <Link href="/blog/" className="text-white/80 hover:text-lime">Blog</Link>
          <Link href="/privacy/" className="text-white/80 hover:text-lime">Privacy</Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs tracking-[0.3em] text-mist">
        TRACK · TRAIN · FUEL · IMPROVE
      </div>
    </footer>
  );
}
