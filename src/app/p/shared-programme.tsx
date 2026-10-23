"use client";

import { useEffect, useState } from "react";
import { DownloadButton } from "@/components/download-button";

const API = "https://api.tryfitos.me/v1/shared-programmes/";
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Exercise {
  name: string;
  setCount: number;
  repMin: number;
  repMax: number;
}
interface Day {
  dayOfWeek: number;
  sessionName: string;
  isRest: boolean;
  exercises: Exercise[];
}
interface Programme {
  code: string;
  name: string;
  daysPerWeek: number;
  days: Day[];
}

type State = { kind: "loading" } | { kind: "missing" } | { kind: "error" } | { kind: "ok"; programme: Programme };

/** The code from /p/K7Q2XM/ (the page is served for every code). */
function codeFromPath(path: string): string | null {
  const m = /\/p\/([2-9A-HJKMNP-Z]{6})\/?$/i.exec(path);
  return m === null ? null : m[1]!.toUpperCase();
}

export function SharedProgramme() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const c = codeFromPath(window.location.pathname);
    const load: Promise<State> =
      c === null
        ? Promise.resolve({ kind: "missing" })
        : fetch(`${API}${c}`)
            .then(async (r): Promise<State> => {
              if (r.status === 404 || r.status === 422) return { kind: "missing" };
              if (!r.ok) return { kind: "error" };
              return { kind: "ok", programme: (await r.json()) as Programme };
            })
            .catch((): State => ({ kind: "error" }));
    void load.then((s) => {
      setCode(c);
      setState(s);
    });
  }, []);

  if (state.kind === "loading") return <p className="text-white/60">Loading the programme…</p>;
  if (state.kind === "missing") {
    return (
      <p className="text-lg text-white/80">
        No programme is shared with this link. It may have been stopped by the person who shared it.
      </p>
    );
  }
  if (state.kind === "error") return <p className="text-lg text-white/80">FITOS could not load this programme just now. Try again in a moment.</p>;

  const p = state.programme;
  const reps = (x: Exercise) => (x.repMin === x.repMax ? `${x.repMin}` : `${x.repMin}–${x.repMax}`);
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white">{p.name}</h2>
        <p className="mt-1 text-white/60">{p.daysPerWeek} training days a week</p>
      </div>
      <div className="space-y-4">
        {p.days
          .filter((d) => !d.isRest)
          .map((d) => (
            <div key={d.dayOfWeek} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold text-white">
                {WEEKDAYS[d.dayOfWeek - 1]} · {d.sessionName}
              </h3>
              <ul className="mt-3 space-y-1">
                {d.exercises.map((x, i) => (
                  <li key={i} className="flex justify-between gap-4 text-white/80">
                    <span>{x.name}</span>
                    <span className="whitespace-nowrap text-white/60">
                      {x.setCount} × {reps(x)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <div className="rounded-2xl border border-white/10 p-5 text-white/80">
        <p className="font-semibold text-white">Use it in FITOS</p>
        <p className="mt-1">
          Open FITOS → Training → ⋯ → <strong>Use a shared programme</strong>, and enter{" "}
          <strong className="font-mono text-white">FIT-{code}</strong>.
        </p>
        <div className="mt-4">
          <DownloadButton />
        </div>
      </div>
    </div>
  );
}
