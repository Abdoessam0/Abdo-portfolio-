import type { Metadata, Viewport } from "next";
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
    "Software Engineer",
    "Frontend Engineer",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "RE/MAX Wise",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <div className="absolute inset-0 bg-grid opacity-[0.22]" />
          <div className="absolute -left-20 top-0 h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[140px]" />
          <div className="absolute right-[-4rem] top-[8%] h-[24rem] w-[24rem] rounded-full bg-violet/16 blur-[150px]" />
          <div className="absolute bottom-[-8rem] left-[28%] h-[24rem] w-[24rem] rounded-full bg-emerald/10 blur-[150px]" />
          <div className="absolute inset-0 animate-aurora bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,22,0.08),rgba(6,8,22,0.72)_45%,rgba(6,8,22,0.95))]" />
        </div>

        <Header />
        <main
          id="content"
          className="mx-auto w-full max-w-[1280px] px-3 pb-16 pt-6 sm:px-5 sm:pt-8"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
