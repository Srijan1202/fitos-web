import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SharedProgramme } from "./shared-programme";

export const metadata: Metadata = {
  title: "A shared programme",
  description: "A FITOS training programme a friend shared with you: days, exercises, sets and reps.",
  robots: { index: false },
};

/**
 * Beta 3.3 (ADR-034): tryfitos.me/p/<code>. Caddy serves this one page for
 * every code; the programme is read in the browser from the public API.
 */
export default function SharedProgrammePage() {
  return (
    <>
      <PageHero eyebrow="Shared programme" title={<>A programme, <span className="text-gradient">shared with you.</span></>}>
        Days, exercises, sets and reps. Never anyone&apos;s weights or name.
      </PageHero>
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <SharedProgramme />
      </section>
    </>
  );
}
