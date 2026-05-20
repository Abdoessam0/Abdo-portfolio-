import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Sora } from "next/font/google";
import Footer from "@/components/Footer";
// import Header from "@/components/Header"; // replaced by StoryNavbar on this branch
import { FloatingWhatsApp } from "@/components/story/FloatingWhatsApp";
import { StoryNavbar } from "@/components/story/StoryNavbar";
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
const description =
  "Portfolio of Abdo Essam, a frontend-first Software Engineer and founder of Kolaytec building websites, dashboards, and full-stack web products.";
const previewImage = `${siteUrl.origin}/opengraph-image?v=2`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: title,
    template: `%s | ${PROFILE.person.name}`,
  },
  description,
  applicationName: `${PROFILE.person.name} Portfolio`,
  keywords: [
    "Abdo Essam",
    "Kolaytec",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Portfolio",
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
    locale: "en_US",
    images: [
      {
        url: previewImage,
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
    images: [previewImage],
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#fbf7ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <body className="story-page">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:btn-primary-dark focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>

        <div className="flex min-h-screen flex-col">
          <StoryNavbar />
          <main
            id="content"
            className="mx-auto flex w-full max-w-[1280px] flex-1 px-3 pb-28 pt-5 sm:px-6 sm:pb-32 sm:pt-10 lg:px-8"
          >
            <div className="w-full">{children}</div>
          </main>
          <FloatingWhatsApp />
          <Footer />
        </div>
      </body>
    </html>
  );
}
