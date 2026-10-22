import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { DownloadButton } from "@/components/download-button";

export const metadata: Metadata = {
  title: "About",
  description: "Why FITOS exists, what it believes, and who builds it.",
};

const principles: [string, string][] = [
  [
    "Honest numbers",
    "Indian dishes as ranges, not fake precision. A trend instead of a scary daily number. Nothing shown that FITOS can't back up.",
  ],
  [
    "One plan, not five apps",
    "Training, food and recovery affect each other, so FITOS plans them together and tells you the next thing to do.",
  ],
  [
    "Built for how you live",
    "Hostel mess food, exam weeks, a gym with half the equipment, days you can't train. FITOS plans around real life.",
  ],
  [
    "Your data is yours",
    "Health data stays on your phone. No ads, no selling, no sharing. Download or delete everything whenever you want.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Discipline builds a <span className="text-gradient">better you.</span>
          </>
        }
      >
        FITOS turns what you log into what to do next — the next set, the next meal, the next week.
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-white/80">
            <h2 className="text-3xl font-semibold tracking-tight text-white">Why FITOS</h2>
            <p>
              Getting fitter isn&apos;t a mystery. Train with enough effort and a bit more each week, eat enough protein and
              roughly the right calories, sleep, and keep going. The hard part is doing it every day while life gets in the way.
            </p>
            <p>
              Most apps hand you a tracker and leave the thinking to you. FITOS does the thinking: it reads what you log and
              plans your next session, your next meal and your next week — and it explains why.
            </p>
            <p>
              It started at VIT, where the mess menu decides what you eat and the gym is busiest when you&apos;re free.
              That&apos;s why the mess menus are built in, why logging works offline, and why missing a day never breaks your
              routine.
            </p>
          </div>
          <div className="glass flex flex-col items-start self-start p-8">
            <Image src="/brand/logomark-bold.svg" alt="" width={72} height={72} />
            <h2 className="mt-6 text-2xl font-semibold">Built by Srijan Srivastava</h2>
            <p className="mt-3 leading-relaxed text-white/75">
              FITOS is designed, built and run by Srijan Srivastava, an independent developer in India — the app, the server
              and this website.
            </p>
            <p className="mt-3 leading-relaxed text-white/75">
              Questions, ideas or something broken? Use <strong className="text-white">Send feedback</strong> in the app —
              every message is read.
            </p>
          </div>
        </div>

        <h2 className="mt-24 text-3xl font-semibold tracking-tight">What FITOS believes</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {principles.map(([t, b]) => (
            <div key={t} className="glass p-6">
              <h3 className="text-lg font-semibold text-lime">{t}</h3>
              <p className="mt-2 leading-relaxed text-white/75">{b}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <DownloadButton size="lg" label="Try FITOS" />
        </div>
      </section>
    </>
  );
}
