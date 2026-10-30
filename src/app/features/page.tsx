import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Phone } from "@/components/phone";
import { Check } from "@/components/check";
import { DownloadButton } from "@/components/download-button";
import { sections } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Programmes that progress, Indian food and mess menus, trend weight, recovery, reminders and FITOS AI — everything in the FITOS app.",
};

const groups: { title: string; items: [string, string][] }[] = [
  {
    title: "Training",
    items: [
      ["Your programme, three ways", "Generated from your goal, level, days, equipment and limitations; a professional split; or built by you, day by day."],
      ["Next load, every lift", "From what you logged: add reps, add weight, hold, or go lighter — always with the reason."],
      ["Deloads and volume", "Weekly hard sets per muscle against productive ranges, and a planned lighter week when it's due."],
      ["Skip today", "Missed a day? The whole week moves one day later, so the order never breaks."],
      ["Logging built for the gym", "Big tap targets, a rest timer, drop sets and supersets — and it works offline."],
      ["An exercise library", "Every exercise with its muscles, equipment, instructions and alternatives."],
    ],
  },
  {
    title: "Food",
    items: [
      ["Targets from your goal", "Calories, protein, carbs, fat and fibre — with the reasoning shown."],
      ["Indian food, honestly", "Dal, roti, idly and sambhar from Indian food tables (IFCT 2017, INDB) and UK CoFID; more foods from USDA; your own foods from their labels. One number, with the range a tap away."],
      ["Your mess menu", "VIT hostel mess menus, every day, and what to eat from them for your targets."],
      ["Diet and allergies", "Vegetarian, eggetarian or not; allergies are hard rules in every suggestion."],
      ["Fast logging", "Recent foods, saved meals, quick add, or describe a meal in words and check it before it's logged."],
    ],
  },
  {
    title: "Progress and recovery",
    items: [
      ["Trend weight", "A smoothed line through your weigh-ins — never day-to-day noise."],
      ["Strength and records", "Estimated one-rep max for every lift, and every record you set."],
      ["Consistency", "Sessions done against sessions planned, week by week."],
      ["Recovery check-in", "Ten seconds a day: sleep, soreness, energy, stress — and a readiness score."],
      ["Health Connect", "Steps, sleep and heart rate from your phone, shown on your phone only."],
      ["Weekly report", "Your week on one page (Premium)."],
    ],
  },
  {
    title: "Everything else",
    items: [
      ["Today, decided", "Home shows your next move, and why."],
      ["Reminders that learn", "At most two a day, timed around your routine; cheeky or gentle; quiet hours."],
      ["FITOS AI", "Ask about your own training; explain any suggestion simply (Premium)."],
      ["Themes", "Dark and Light that follow your phone, plus Cobalt and the green FITOS Dark and FITOS Light; Night, Forest and Ocean with Premium."],
      ["Your data", "Download everything as a file, or delete your account and every record of it."],
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={
          <>
            Everything FITOS does, <span className="text-gradient">in one place.</span>
          </>
        }
      >
        A plan for your training, your food and your recovery — built from what you log, and honest about what it knows.
      </PageHero>

      <section className="mx-auto max-w-6xl space-y-24 px-4 py-20 sm:px-6">
        {sections.map((s, i) => (
          <div key={s.id} id={s.id} className="grid items-center gap-12 lg:grid-cols-2">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <span className="eyebrow text-lime">{s.eyebrow}</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{s.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/75">{s.body}</p>
              <ul className="mt-6 space-y-3">
                {s.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-white/85">
                    <Check className="mt-0.5 h-5 w-5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <Phone src={s.screen} alt={s.alt} className="w-[70%] max-w-xs" />
            </div>
          </div>
        ))}
      </section>

      <section className="border-t border-white/5 bg-graphite/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">The full list</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {groups.map((g) => (
              <div key={g.title} className="glass p-7">
                <h3 className="eyebrow text-lime">{g.title}</h3>
                <dl className="mt-5 space-y-5">
                  {g.items.map(([name, desc]) => (
                    <div key={name}>
                      <dt className="flex items-start gap-3 font-semibold">
                        <Check className="mt-1 h-4 w-4" />
                        {name}
                      </dt>
                      <dd className="mt-1 pl-7 leading-relaxed text-white/70">{desc}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <DownloadButton size="lg" label="Download FITOS" />
          </div>
        </div>
      </section>
    </>
  );
}
