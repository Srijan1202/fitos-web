import Link from "next/link";
import Image from "next/image";
import { Phone } from "@/components/phone";
import { DownloadButton } from "@/components/download-button";
import { site, apkSizeMb } from "@/site";
import { pillars, sections, more, faq, freePlan, premiumPlan } from "@/content/site-content";

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

        <div className="mt-16 flex justify-center">
          <Link href="/features/" className="text-sm font-semibold text-lime underline-offset-4 hover:underline">
            See every feature →
          </Link>
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
              {freePlan.map((f) => (
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
              {premiumPlan.map((f) => (
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

      <div className="-mt-12 mb-12 flex justify-center">
        <Link href="/pricing/" className="text-sm font-semibold text-lime underline-offset-4 hover:underline">
          Compare plans →
        </Link>
      </div>

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
