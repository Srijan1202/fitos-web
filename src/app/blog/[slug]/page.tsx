import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DownloadButton } from "@/components/download-button";
import { allPosts, formatDate, post } from "@/lib/blog";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await allPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = await post((await params).slug);
  return p ? { title: p.title, description: p.description, openGraph: { type: "article", title: p.title, description: p.description } } : {};
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const p = await post((await params).slug);
  if (!p) notFound();
  return (
    <article className="glow-bg">
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-14 sm:px-6">
        <Link href="/blog/" className="text-sm text-mist hover:text-lime">← All posts</Link>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{p.title}</h1>
        <p className="mt-4 text-sm text-mist">
          {formatDate(p.date)} · {p.minutes} min read · Srijan Srivastava
        </p>
        {/* Our own Markdown from src/content/blog, rendered at build time. */}
        <div className="prose-fitos mt-10" dangerouslySetInnerHTML={{ __html: p.html }} />
        <div className="glass mt-14 flex flex-wrap items-center justify-between gap-6 p-6">
          <div>
            <div className="text-lg font-semibold">Try FITOS</div>
            <p className="text-white/70">Free Android beta.</p>
          </div>
          <DownloadButton />
        </div>
      </div>
    </article>
  );
}
