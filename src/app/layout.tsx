import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/site";

// Barlow (SIL OFL, fonts/OFL.txt): the free equivalent of the brand kit's Bahnschrift.
const barlow = localFont({
  src: [
    { path: "./fonts/Barlow-Regular.ttf", weight: "400" },
    { path: "./fonts/Barlow-Medium.ttf", weight: "500" },
    { path: "./fonts/Barlow-SemiBold.ttf", weight: "600" },
    { path: "./fonts/Barlow-Bold.ttf", weight: "700" },
  ],
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
