import type { Metadata, Viewport } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/site";

// Barlow (SIL OFL): the free equivalent of the brand kit's Bahnschrift.
// Downloaded at build time and served from this site as compressed WOFF2
// subsets; visitors never contact Google.
const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "FITOS — Track. Train. Fuel. Improve.", template: "%s · FITOS" },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "FITOS",
    title: "FITOS — training, food and recovery, planned for you",
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0a0d0b" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${barlow.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
