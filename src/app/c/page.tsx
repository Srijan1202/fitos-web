import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { InviteDetails } from "./invite";

export const metadata: Metadata = {
  title: "Join a club",
  description: "A FITOS club invite: train together and see each other's week.",
  robots: { index: false },
};

/**
 * Beta 6.2 (C8): tryfitos.me/c/<code>. Caddy serves this one page for every
 * code; with FITOS installed Android opens the app instead (App Links).
 */
export default function ClubInvitePage() {
  return (
    <>
      <PageHero eyebrow="Club invite" title={<>Train <span className="text-gradient">together.</span></>}>
        Someone invited you to their club on FITOS. Clubs see only each other&apos;s counts: sessions, run distance and streaks.
      </PageHero>
      <section className="mx-auto max-w-xl px-4 pb-20 sm:px-6">
        <InviteDetails />
      </section>
    </>
  );
}
