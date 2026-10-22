import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { allPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from building FITOS: training, food, progress and what's new in the app.",
};

export default async function BlogIndex() {
  const posts = await allPosts();
  return (
    <>
      <PageHero eyebrow="Blog" title="Notes from building FITOS">
        What&apos;s new in the app, and the thinking behind it.
      </PageHero>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="glass group flex flex-col p-6 transition hover:ring-1 hover:ring-lime/40">
              <span className="text-sm text-mist">
                {formatDate(p.date)} · {p.minutes} min read
              </span>
              <h2 className="mt-3 text-xl font-semibold leading-snug group-hover:text-lime">{p.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-white/70">{p.description}</p>
              <span className="mt-5 text-sm font-semibold text-lime">Read →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
