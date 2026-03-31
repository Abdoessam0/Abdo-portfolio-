import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Sora } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PROFILE } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const siteUrl = new URL(PROFILE.links.portfolio);
const title = `${PROFILE.person.name} | ${PROFILE.person.role}`;
const description = PROFILE.person.summary;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: title,
    template: `%s | ${PROFILE.person.name}`,
  },
  description,
  applicationName: `${PROFILE.person.name} Portfolio`,
  keywords: [
    "Abdelrahman Mohamed",
    "Frontend Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Technical SEO",
  ],
  authors: [{ name: PROFILE.person.name, url: PROFILE.socials.linkedin }],
  creator: PROFILE.person.name,
  publisher: PROFILE.person.name,
  alternates: {
    canonical: siteUrl.toString(),
  },
  openGraph: {
    title,
    description,
    url: siteUrl.toString(),
    siteName: `${PROFILE.person.name} Portfolio`,
    type: "website",
    images: [
      {
        url: `${siteUrl.origin}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@abdoessam0",
    images: [`${siteUrl.origin}/twitter-image`],
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#060816",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-canvas text-ink">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
        >
          Skip to content
        </a>

        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-[0.12]" />
          <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(111,205,245,0.12),transparent_58%)]" />
          <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-brand/15 blur-[150px]" />
          <div className="absolute right-[-6rem] top-[8%] h-[24rem] w-[24rem] rounded-full bg-accent-cyan/10 blur-[160px]" />
          <div className="absolute bottom-[-10rem] left-[22%] h-[20rem] w-[20rem] rounded-full bg-accent-amber/10 blur-[150px]" />
          <div className="absolute bottom-[-8rem] right-[18%] h-[20rem] w-[20rem] rounded-full bg-emerald/8 blur-[170px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,22,0.04),rgba(6,8,22,0.56)_40%,rgba(6,8,22,0.92))]" />
        </div>

        <div className="flex min-h-screen flex-col">
          <Header />
          <main
            id="content"
            className="mx-auto flex w-full max-w-[1280px] flex-1 px-4 pb-20 pt-8 sm:px-6 sm:pt-10 lg:px-8"
          >
            <div className="w-full">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
