import Link from "next/link";
import Image from "next/image";
import { Phone } from "@/components/phone";
import { DownloadButton } from "@/components/download-button";
import { site, apkSizeMb } from "@/site";

const pillars = [
  { word: "Track", line: "Workouts, meals, weight and how you slept — in seconds." },
  { word: "Train", line: "A programme that tells you the next weight and the next rep." },
  { word: "Fuel", line: "Targets from your goal, Indian food and your mess menu." },
  { word: "Improve", line: "Trend weight, strength, records and a weekly report." },
];

const sections = [
  {
    id: "training",
    eyebrow: "Train",
    title: "A programme that progresses with you",
    body: "Let FITOS build your week from your goal, level, days and equipment, pick a proven split like Push / Pull / Legs, or build your own. Every exercise shows the weight and reps to aim for next, and why.",
    points: [
      "Generated, professional or custom programmes",
      "The next load for each lift, from what you logged",
      "Planned deloads, and volume per muscle each week",
      "Missed a day? Skip it — the whole week moves one day",
    ],
    screen: "/screens/training.webp",
    alt: "The FITOS Training tab: the day's session with its exercises",
  },
  {
    id: "nutrition",
    eyebrow: "Fuel",
    title: "Food the way you actually eat",
    body: "Calorie and protein targets from your goal, and a food library that knows dal, roti, idly and sambhar — Indian dishes as honest ranges, the rest measured from USDA. At VIT, your mess menu is already in the app.",
    points: [
      "Remaining calories and protein at a glance",
      "Your hostel mess menu, and what to eat from it",
      "Diet and allergies respected in every suggestion",
      "Saved meals, quick add, or just describe your meal",
    ],
    screen: "/screens/nutrition.webp",
    alt: "The FITOS Nutrition tab: calories and protein left for the day",
  },
  {
    id: "progress",
    eyebrow: "Improve",
    title: "Progress you can trust",
    body: "Daily weight jumps around with water and food. FITOS shows the trend instead, with your weekly rate, body measurements, best lifts, records and how consistently you trained.",
    points: [
      "Trend weight, never day-to-day noise",
      "Estimated one-rep max for every lift",
      "Records and training consistency",
      "A weekly report on one page (Premium)",
    ],
    screen: "/screens/progress.webp",
    alt: "The FITOS Progress tab: trend weight with weekly rate and change",
  },
  {
    id: "ai",
    eyebrow: "FITOS AI",
    title: "Ask about your own training",
    body: "FITOS AI answers from your plan, your sessions, your progression and your targets — what to do today, why your volume is high, what to eat. It only ever sees what you allow.",
    points: [
      "Answers from your data, not generic tips",
      "Explain any suggestion in plain words",
      "Describe a meal in words; check it before it's logged",
      "Part of Premium — free while FITOS is in beta",
    ],
    screen: "/screens/ai.webp",
    alt: "FITOS AI: suggested questions about your training",
  },
];

const more = [
  { title: "Today, decided", body: "Home shows your next move: today's session, what's left to eat, how you recovered." },
  { title: "Recovery", body: "A ten-second daily check-in, a readiness score, and sleep and heart rate from Health Connect." },
  { title: "Works offline", body: "Log a whole workout in a gym basement; it syncs when you're back online." },
  { title: "Reminders that learn", body: "At most two a day, timed around when you usually train and eat. Cheeky or gentle." },
  { title: "Your data is yours", body: "Health Connect data never leaves your phone. Download or delete everything in one tap." },
  { title: "Made to look good", body: "FITOS Dark, FITOS Light and Paper — plus Night, Forest and Ocean with Premium." },
];

const faq = [
  {
    q: "Is FITOS free?",
    a: "Yes. The app is free, and while FITOS is in beta, Premium is free too — request it in the app and it's switched on for you.",
  },
  {
    q: "Which phones does it run on?",
    a: `Android phones running ${site.apk.minAndroid} with a 64-bit processor — almost every phone from the last few years. An iPhone version isn't available yet.`,
  },
  {
    q: "Why do I download an APK instead of using the Play Store?",
    a: "FITOS is in beta and not on the Play Store yet. The APK is the same app; Android asks once for permission to install it. The Download page walks you through it.",
  },
  {
    q: "Do I need to be a VIT student?",
    a: "No. Anyone 18 or over can use FITOS. VIT students also get their hostel mess menus built in.",
  },
  {
    q: "What happens to my health data?",
    a: "Steps, sleep and heart rate from Health Connect are read and shown on your phone only — they're never sent to the FITOS server or to any AI. FITOS AI only runs if you allow it.",
  },
  {
    q: "How do I update?",
    a: "Download the newest APK from this site and open it. It installs over the old version and keeps your data.",
  },
];

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ hero -- */}
      <section className="glow-bg relative overflow-hidden">
        <div aria-hidden className="lime-gradient absolute -right-24 top-0 hidden h-[140%] w-24 rotate-[24deg] opacity-80 lg:block" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-lime">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Free Android beta
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Discipline builds a <span className="text-gradient">better you.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              FITOS plans your training, food and recovery from what you log — the next weight to lift, what to eat
              from your mess menu, and the trend that shows you&apos;re getting there.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DownloadButton size="lg" label="Download for Android" />
              <Link href="/#features" className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-lime hover:underline">
                See what it does →
              </Link>
            </div>
            <p className="mt-4 text-sm text-mist">
              Version {site.apk.version} · {apkSizeMb} MB · {site.apk.minAndroid}
            </p>
          </div>
          <div className="relative mx-auto flex w-full max-w-md justify-center">
            <Phone src="/screens/home.webp" alt="The FITOS Home screen" className="relative z-10 w-[62%]" priority />
            <Phone
              src="/screens/profile.webp"
              alt="The FITOS Profile screen"
              className="absolute right-0 top-12 w-[52%] rotate-6 opacity-90"
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- pillars -- */}
      <section className="border-y border-white/5 bg-graphite/40">
        <div className="mx-auto grid max-w-6xl gap-px px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.word} className="p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-lime">{p.word}</div>
              <p className="mt-2 text-white/75">{p.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- features -- */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="max-w-2xl">
          <span className="eyebrow">Features</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">One app for the gym, the mess and the mirror.</h2>
        </div>
        <div className="mt-16 space-y-28">
          {sections.map((s, i) => (
            <div key={s.id} id={s.id} className="grid items-center gap-12 lg:grid-cols-2">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="eyebrow text-lime">{s.eyebrow}</span>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{s.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/75">{s.body}</p>
                <ul className="mt-6 space-y-3">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-white/85">
                      <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-lime" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="relative w-[70%] max-w-xs">
                  <div aria-hidden className="absolute inset-8 -z-10 rounded-full bg-green-deep/60 blur-3xl" />
                  <Phone src={s.screen} alt={s.alt} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-28 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((m) => (
            <div key={m.title} className="glass p-6">
              <h4 className="text-lg font-semibold">{m.title}</h4>
              <p className="mt-2 leading-relaxed text-white/70">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- screens -- */}
      <section id="screens" className="glow-bg border-y border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <span className="eyebrow">Screens</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">See it before you install it.</h2>
          <p className="mt-4 max-w-2xl text-white/70">Real screens from the app, in the FITOS Dark theme.</p>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:px-6">
          {[
            ["home", "Home — your next move"],
            ["training", "Training — today's session"],
            ["nutrition", "Nutrition — what's left today"],
            ["progress", "Progress — the trend"],
            ["ai", "FITOS AI — ask anything"],
            ["profile", "Profile — targets and settings"],
          ].map(([name, caption]) => (
            <figure key={name} className="w-56 shrink-0 snap-start sm:w-64">
              <Phone src={`/screens/${name}.webp`} alt={`FITOS ${caption}`} />
              <figcaption className="mt-4 text-center text-sm text-white/70">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- pricing -- */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Free while we&apos;re in beta.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Everything in FITOS is free during the beta — Premium included. Request Premium in the app and it&apos;s switched on for you.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="glass p-8">
            <h3 className="text-xl font-semibold">FITOS</h3>
            <p className="mt-1 text-mist">Everything you need to train and eat well.</p>
            <div className="mt-6 text-5xl font-semibold">Free</div>
            <ul className="mt-6 space-y-2.5 text-white/80">
              {[
                "Generated, professional or custom programmes",
                "Workout logging with next-load suggestions",
                "Targets, Indian food library and mess menus",
                "Trend weight, strength, records, recovery",
                "FITOS Dark, FITOS Light and Paper themes",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <svg aria-hidden viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-lime" fill="none" stroke="currentColor" strokeWidth={2.6}>
                    <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass relative p-8 ring-1 ring-lime/40">
            <span className="lime-gradient absolute -top-3 right-6 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-carbon">
              Free in beta
            </span>
            <h3 className="text-xl font-semibold">FITOS Premium</h3>
            <p className="mt-1 text-mist">Everything in FITOS, plus:</p>
            <div className="mt-6 text-5xl font-semibold">
              Free <span className="text-base font-normal text-mist">during beta, on request</span>
            </div>
            <ul className="mt-6 space-y-2.5 text-white/80">
              {[
                "FITOS AI — chat, explain, describe a meal",
                "Higher AI limits",
                "A weekly report on one page",
                "Night, Forest and Ocean themes",
                "Premium profile pictures and a gold rim",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <svg aria-hidden viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-lime" fill="none" stroke="currentColor" strokeWidth={2.6}>
                    <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ faq -- */}
      <section id="faq" className="border-t border-white/5 bg-graphite/40 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Questions</h2>
          <div className="mt-10 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="glass group p-5 open:ring-1 open:ring-lime/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {f.q}
                  <span className="text-lime transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-white/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ cta -- */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="glass glow-bg relative overflow-hidden p-10 sm:p-14">
          <div aria-hidden className="lime-gradient absolute -right-10 -top-10 hidden h-[160%] w-16 rotate-[24deg] opacity-80 sm:block" />
          <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
            <Image src="/brand/logomark-bold.svg" alt="" width={96} height={96} className="hidden md:block" />
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Start today. Get better every week.</h2>
              <p className="mt-2 text-white/70">Free on Android. Installs in a minute.</p>
            </div>
            <DownloadButton size="lg" label="Download FITOS" />
          </div>
        </div>
      </section>
    </>
  );
}
