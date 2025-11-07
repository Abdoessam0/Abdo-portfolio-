import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PROFILE } from "@/data/profile";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const siteUrl = new URL(PROFILE.links.portfolio);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${PROFILE.person.name} - ${PROFILE.person.role}`,
    template: `%s | ${PROFILE.person.name}`,
  },
  description: PROFILE.person.summary,
  keywords: ["Full stack engineer", "Next.js", "React Native", "Portugal", "Supabase", "Abdelrahman Mohamed"],
  authors: [{ name: PROFILE.person.name, url: PROFILE.links.linkedin }],
  alternates: {
    canonical: siteUrl.toString(),
  },
  openGraph: {
    title: `${PROFILE.person.name} - ${PROFILE.person.role}`,
    description: PROFILE.person.summary,
    url: siteUrl.toString(),
    siteName: PROFILE.person.name,
    type: "website",
    images: [
      {
        url: `${siteUrl.origin}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${PROFILE.person.name} portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.person.name} - ${PROFILE.person.role}`,
    description: PROFILE.person.summary,
    creator: PROFILE.person.name,
    images: [`${siteUrl.origin}/opengraph-image`],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body className="bg-canvas text-ink">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-24 top-[-10%] h-80 w-80 rounded-full bg-emerald-100 blur-[120px]" aria-hidden="true" />
          <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-slate-200 blur-3xl opacity-60" aria-hidden="true" />
          <div
            className="motion-safe:animate-aurora absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,124,116,0.18),_transparent_55%)]"
            aria-hidden="true"
          />
        </div>
        <Header />
        <main id="content" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

