import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Check } from "@/components/check";
import { DownloadButton } from "@/components/download-button";
import { freePlan, premiumPlan } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Pricing",
  description: "FITOS is free. During the beta, Premium — FITOS AI, the weekly report and more — is free too, on request.",
};

const compare: [string, boolean, boolean][] = [
  ["Programmes, logging and next-load suggestions", true, true],
  ["Skip today", true, true],
  ["Targets, food library and mess menus", true, true],
  ["Trend weight, strength, records, recovery", true, true],
  ["Reminders", true, true],
  ["FITOS Dark, FITOS Light and Paper themes", true, true],
  ["FITOS AI: chat, explain simply, describe a meal", false, true],
  ["Higher AI limits", false, true],
  ["Weekly report", false, true],
  ["Night, Forest and Ocean themes", false, true],
  ["Premium pictures and the gold rim", false, true],
];

const questions: [string, string][] = [
  [
    "How do I get Premium?",
    "In the app, open the AI tab or Profile → Premium and tap Request. During the beta every request is approved by hand, usually the same day.",
  ],
  [
    "Will Premium cost money later?",
    "Possibly, once FITOS leaves beta. If it does, the price will be on this page first, and anyone with Premium will be told in the app before anything changes.",
  ],
  [
    "What happens if Premium ends?",
    "You keep everything you logged. The Premium features lock again, and a Premium theme switches back to FITOS Dark or FITOS Light.",
  ],
];

function Mark({ on }: { on: boolean }) {
  return on ? <Check className="mx-auto h-5 w-5" /> : <span className="block text-center text-white/25">—</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Free. <span className="text-gradient">Premium too, for now.</span>
          </>
        }
      >
        Everything in FITOS is free during the beta, Premium included — request it in the app and it&apos;s switched on for you.
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="glass flex flex-col p-8">
            <h2 className="text-xl font-semibold">FITOS</h2>
            <p className="mt-1 text-mist">Everything you need to train and eat well.</p>
            <div className="mt-6 text-5xl font-semibold">Free</div>
            <ul className="mt-6 flex-1 space-y-2.5 text-white/80">
              {freePlan.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-1 h-4 w-4" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <DownloadButton label="Download" />
            </div>
          </div>
          <div className="glass relative p-8 ring-1 ring-lime/40">
            <span className="lime-gradient absolute -top-3 right-6 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-carbon">
              Free in beta
            </span>
            <h2 className="text-xl font-semibold">FITOS Premium</h2>
            <p className="mt-1 text-mist">Everything in FITOS, plus:</p>
            <div className="mt-6 text-5xl font-semibold">
              Free <span className="text-base font-normal text-mist">during beta, on request</span>
            </div>
            <ul className="mt-6 space-y-2.5 text-white/80">
              {premiumPlan.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-1 h-4 w-4" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <h2 className="text-2xl font-semibold">Compare</h2>
          <div className="glass mt-6 overflow-hidden">
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-white/10 text-mist">
                  <th className="p-4 font-medium">Feature</th>
                  <th className="w-20 p-4 text-center font-medium sm:w-24">FITOS</th>
                  <th className="w-20 p-4 text-center font-medium sm:w-24">Premium</th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([name, free, premium]) => (
                  <tr key={name} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-white/85">{name}</td>
                    <td className="p-4">
                      <Mark on={free} />
                    </td>
                    <td className="p-4">
                      <Mark on={premium} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-3xl space-y-3">
          <h2 className="mb-6 text-2xl font-semibold">Questions about pricing</h2>
          {questions.map(([q, a]) => (
            <details key={q} className="glass group p-5 open:ring-1 open:ring-lime/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                {q}
                <span className="text-lime transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-white/75">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
