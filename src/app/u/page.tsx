import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { InviteDetails } from "../c/invite";

export const metadata: Metadata = {
  title: "Add a friend",
  description: "A FITOS friend invite.",
  robots: { index: false },
};

/**
 * Beta 6.2 (C15): tryfitos.me/u/<handle>, the link in a FITOS QR code. Caddy
 * serves this one page for every handle; with FITOS installed Android opens
 * the app on "Add @handle?" instead (App Links).
 */
export default function FriendInvitePage() {
  return (
    <>
      <PageHero eyebrow="Friend invite" title={<>Add a friend <span className="text-gradient">on FITOS.</span></>}>
        Friends see each other&apos;s week: sessions, run distance and streaks. Never weights, food or where you ran.
      </PageHero>
      <section className="mx-auto max-w-xl px-4 pb-20 sm:px-6">
        <InviteDetails />
      </section>
    </>
  );
}
