import type { MetadataRoute } from "next";
import { allPosts } from "@/lib/blog";
import { site } from "@/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "features/", "pricing/", "download/", "blog/", "about/", "privacy/"];
  const posts = await allPosts();
  return [
    ...pages.map((p) => ({ url: `${site.url}/${p}`, changeFrequency: "weekly" as const })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.date })),
  ];
}
