import type { NextConfig } from "next";

/**
 * A fully static site (`next build` writes `out/`): it can be hosted on any
 * static host — S3 + CloudFront, GitHub Pages, Cloudflare Pages, Netlify.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
