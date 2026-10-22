import Link from "next/link";
import Image from "next/image";
import { DownloadButton } from "./download-button";

const nav = [
  { href: "/features/", label: "Features" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
];

/** The brand kit's website header: logo, links, and the lime call to action. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-carbon/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="FITOS home" className="shrink-0">
          <Image src="/brand/logo-header.svg" alt="FITOS" width={146} height={36} priority />
        </Link>
        <nav className="ml-auto hidden items-center gap-7 text-sm text-white/80 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-lime">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto md:ml-0">
          <DownloadButton size="sm" />
        </div>
      </div>
    </header>
  );
}
