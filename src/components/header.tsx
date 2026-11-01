import Link from "next/link";
import Image from "next/image";
import { DownloadButton } from "./download-button";
import { DesktopNav, MobileNav } from "./nav";

/** The brand kit's website header: logo, links, and the cobalt call to action. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-carbon/75 backdrop-blur-xl">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 md:gap-6">
        <Link href="/" aria-label="FITOS home" className="shrink-0">
          <Image src="/brand/logo-header-cobalt.svg" alt="FITOS" width={146} height={36} className="logo-on-dark" priority />
          <Image src="/brand/logo-header-cobalt-light.svg" alt="FITOS" width={146} height={36} className="logo-on-light" priority />
        </Link>
        <DesktopNav />
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <DownloadButton size="sm" />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
