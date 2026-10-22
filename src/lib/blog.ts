import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

/** A post: src/content/blog/<slug>.md with a small front matter block. */
export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  html: string;
  minutes: number;
}

const dir = path.join(process.cwd(), "src/content/blog");

function parse(slug: string, raw: string): Post {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${slug}.md: missing front matter`);
  const meta = Object.fromEntries(
    m[1].split("\n").map((line) => {
      const i = line.indexOf(":");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
  );
  for (const key of ["title", "date", "description"]) {
    if (!meta[key]) throw new Error(`${slug}.md: no ${key}`);
  }
  const body = m[2];
  return {
    slug,
    title: meta.title,
    date: meta.date,
    description: meta.description,
    html: marked.parse(body, { async: false }),
    minutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
  };
}

/** Every post, newest first. */
export async function allPosts(): Promise<Post[]> {
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
  const posts = await Promise.all(
    files.map(async (f) => parse(f.replace(/\.md$/, ""), (await readFile(path.join(dir, f), "utf8")).replace(/\r\n/g, "\n"))),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function post(slug: string): Promise<Post | undefined> {
  return (await allPosts()).find((p) => p.slug === slug);
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
