import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Fragment, type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What the FITOS app keeps, what stays on your phone, and your rights. This website itself collects nothing.",
};

/** **bold** inside a paragraph. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>,
  );
}

/** The app's policy, kept in step with the app (src/content/privacy-policy.md). */
export default async function PrivacyPage() {
  const md = await readFile(path.join(process.cwd(), "src/content/privacy-policy.md"), "utf8");
  const blocks = md.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="glow-bg">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <span className="eyebrow">Privacy</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Your data, plainly.</h1>
        <div className="glass mt-8 p-6">
          <h2 className="text-lg font-semibold">This website</h2>
          <p className="mt-2 leading-relaxed text-white/75">
            tryfitos.me sets no cookies, runs no analytics and asks for nothing. Downloading the app happens from GitHub,
            where the files are hosted.
          </p>
        </div>
        <article className="prose-fitos mt-10">
          <h2 className="!mt-0 !text-2xl">The FITOS app</h2>
          {blocks.map((b, i) =>
            b.startsWith("## ") ? <h2 key={i}>{b.slice(3)}</h2> : <p key={i}>{inline(b)}</p>,
          )}
        </article>
      </div>
    </div>
  );
}
