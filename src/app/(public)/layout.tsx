import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/story/FloatingWhatsApp";
import { StoryNavbar } from "@/components/story/StoryNavbar";
import { PROFILE } from "@/data/profile";
import { LangProvider } from "@/hooks/use-lang";

const siteUrl = new URL(PROFILE.links.portfolio);
const title = "Abdo Essam | Software Engineer Portfolio";
const description =
  "Portfolio of Abdo Essam, a software engineer focused on frontend, full-stack web applications, Next.js, React, TypeScript, and production-ready digital products.";
const previewImage = `${siteUrl.origin}/opengraph-image?v=3`;
const langBootstrapScript = `
(() => {
  try {
    var key = "portfolio-lang";
    var stored = window.localStorage.getItem(key);
    var cookieMatch = document.cookie.match(new RegExp("(?:^|; )" + key + "=([^;]*)"));
    var cookieLang = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
    var lang = stored === "ar" || stored === "en" ? stored : cookieLang;
    if (lang !== "ar" && lang !== "en") lang = "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.lang = lang;
  } catch (_) {}
})();
`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: title,
    template: "%s | Abdo Essam",
  },
  description,
  applicationName: "Abdo Essam Portfolio",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  keywords: [
    "Abdo Essam",
    "Abdo Essam portfolio",
    "Software Engineer Ankara",
    "Frontend Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
  ],
  authors: [{ name: "Abdo Essam", url: PROFILE.socials.linkedin }],
  creator: "Abdo Essam",
  publisher: "Abdo Essam",
  alternates: {
    canonical: "https://abdo.kolaytec.com/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl.toString(),
    siteName: "Abdo Essam Portfolio",
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

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: langBootstrapScript }} />
      <LangProvider>
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
      </LangProvider>
    </>
  );
}
