"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PROFILE } from "@/data/profile";
import { useLang } from "@/hooks/use-lang";
import type { PublicProfileSettings } from "@/lib/public-data";

// ─── Nav items are driven by the dictionary ───────────────────────────────
const NAV_IDS = ["about", "projects", "experience", "skills", "contact"] as const;

function resolveHref(pathname: string, id: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

function StoryBrandMark() {
  return (
    <span className="group inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#181818] text-[#f3eee6] shadow-[0_2px_10px_rgba(0,0,0,0.24)] transition duration-200 hover:bg-[#111] hover:shadow-[0_0_0_1px_rgba(6,181,107,0.18),0_6px_18px_rgba(6,181,107,0.16)]">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-[#d8d1c6]/20 bg-[#1f1f1d] font-mono text-[0.72rem] font-bold leading-none transition duration-200 group-hover:border-[#06b56b]/35 group-hover:text-[#06b56b]">
        <span aria-hidden="true">
          <span className="text-[#06b56b]">&lt;</span>
          <span className="text-[#f3eee6]">/</span>
          <span className="text-[#06b56b]">&gt;</span>
        </span>
      </span>
    </span>
  );
}

export function StoryNavbar({ profileSettings }: { profileSettings?: PublicProfileSettings }) {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cvUrl = profileSettings?.cvUrl || PROFILE.links.resume;

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  // Detect scroll for shadow depth
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Floating dark pill navbar ─────────────────────────── */}
      <header
        dir={t.dir}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:px-6"
      >
        <nav
          className={[
            "flex w-full max-w-[780px] items-center justify-between",
            "rounded-full bg-[#1f1f1d] px-4 py-2.5 sm:px-5",
            "transition-shadow duration-300",
            scrolled
              ? "shadow-[0_8px_32px_rgba(0,0,0,0.28)]"
              : "shadow-[0_4px_16px_rgba(0,0,0,0.18)]",
          ].join(" ")}
        >
          {/* Brand */}
          <Link
            href="/"
            aria-label="Go to homepage"
            className="shrink-0 rounded-full transition"
          >
            <StoryBrandMark />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_IDS.map((id) => (
              <Link
                key={id}
                href={resolveHref(pathname, id)}
                className="rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium text-white/60 transition hover:bg-white/8 hover:text-white"
              >
                {t.nav[id]}
              </Link>
            ))}
          </div>

          {/* Right cluster: lang toggle + CV + hamburger */}
          <div className="flex items-center gap-2">
            <div
              className="hidden items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 sm:inline-flex"
              role="group"
              aria-label={t.language.toggleLabel}
            >
              {(["en", "ar"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLang(option)}
                  aria-pressed={lang === option}
                  aria-label={
                    option === "en"
                      ? t.language.switchToEnglish
                      : t.language.switchToArabic
                  }
                  className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold transition ${
                    lang === option
                      ? "bg-[#06b56b] text-white shadow-[0_2px_8px_rgba(6,181,107,0.28)]"
                      : "text-white/55 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {t.language[option]}
                </button>
              ))}
            </div>

            {/* CV download */}
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary-green hidden px-4 py-1.5 text-[0.78rem] shadow-[0_2px_10px_rgba(6,181,107,0.35)] hover:shadow-[0_4px_14px_rgba(6,181,107,0.5)] sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" />
              {t.cta2}
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            dir={t.dir}
            className="fixed inset-x-0 top-[4.5rem] z-40 flex justify-center px-4 lg:hidden"
          >
            <motion.div className="w-full max-w-[780px] overflow-hidden rounded-[1.4rem] bg-[#1f1f1d] p-3 shadow-[0_16px_48px_rgba(0,0,0,0.32)]">
              <div className="space-y-1">
                {NAV_IDS.map((id) => (
                  <Link
                    key={id}
                    href={resolveHref(pathname, id)}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-[0.9rem] font-medium text-white/70 transition hover:bg-white/8 hover:text-white"
                  >
                    <span>{t.nav[id]}</span>
                    <span className="text-xs text-white/25">#{id}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2 border-t border-white/8 pt-3">
                <div
                  className="flex flex-1 rounded-2xl border border-white/15 bg-white/[0.03] p-1"
                  role="group"
                  aria-label={t.language.toggleLabel}
                >
                  {(["en", "ar"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setLang(option);
                        setMenuOpen(false);
                      }}
                      aria-pressed={lang === option}
                      aria-label={
                        option === "en"
                          ? t.language.switchToEnglish
                          : t.language.switchToArabic
                      }
                      className={`flex-1 rounded-xl py-2 text-center text-[0.8rem] font-semibold transition ${
                        lang === option
                          ? "bg-[#06b56b] text-white"
                          : "text-white/60 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      {t.language[option]}
                    </button>
                  ))}
                </div>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary-green flex flex-1 rounded-2xl py-2.5 text-[0.8rem]"
                >
                  <Download className="h-3.5 w-3.5" />
                  {t.cta2}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
