"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const navItems = [
  { href: "/features/", label: "Features" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
];

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href);

/** The header links on wide screens, the current page in the accent colour. */
export function DesktopNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav aria-label="Main" className="ml-auto hidden items-center gap-7 text-sm md:flex">
      {navItems.map((n) => {
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={active ? "text-lime" : "text-white/80 transition hover:text-lime"}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** The same links on a phone: a menu button and a panel under the header. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/90"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
          {open ? (
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          )}
        </svg>
      </button>
      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-0 top-16 border-b border-white/10 bg-carbon px-4 pb-6 pt-2 shadow-[0_20px_40px_rgb(0_0_0/0.6)]"
        >
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, n.href) ? "page" : undefined}
              className={`block border-b border-white/5 py-4 text-lg font-semibold ${isActive(pathname, n.href) ? "text-lime" : "text-white"}`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/download/"
            onClick={() => setOpen(false)}
            className="lime-gradient mt-5 flex h-12 items-center justify-center rounded-xl font-semibold text-on-accent"
          >
            Download for Android
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
