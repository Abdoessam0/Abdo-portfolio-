"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BrandMark } from "@/components/home/brand-mark";
import { PROFILE } from "@/data/profile";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

function resolveHref(pathname: string, id: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

export default function Header() {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { isCompactViewport, shouldUseLiteEffects, shouldUseLiteMotion } =
    useMobileOptimization();

  const hrefs = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        href: resolveHref(currentPath, item.id),
      })),
    [currentPath],
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (currentPath !== "/") {
      setActive("");
      return;
    }

    if (isCompactViewport) {
      setActive("");
      return;
    }

    const sectionEntries = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            sectionEntries.set(target.id, entry.intersectionRatio);
          } else {
            sectionEntries.delete(target.id);
          }
        }

        let nextActive = "";
        let bestRatio = 0;

        for (const item of navItems) {
          const ratio = sectionEntries.get(item.id) ?? 0;
          if (ratio >= bestRatio) {
            nextActive = item.id;
            bestRatio = ratio;
          }
        }

        setActive(nextActive);
      },
      {
        rootMargin: "-24% 0px -52% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    navItems.forEach((item) => {
      const node = document.getElementById(item.id);
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [currentPath, isCompactViewport]);

  useEffect(() => {
    if (shouldUseLiteEffects) {
      setScrolled(true);
      return;
    }

    let frame = 0;

    const updateScrolled = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrolled);
    };

    updateScrolled();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [shouldUseLiteEffects]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 px-2.5 pt-2.5 sm:px-5 sm:pt-3">
        <div
          className={`mx-auto flex max-w-[1280px] items-center justify-between rounded-[1.45rem] border px-3.5 py-2.5 transition-all duration-300 sm:rounded-[1.6rem] sm:px-5 sm:py-3 ${
            scrolled
              ? "border-white/12 bg-[rgba(7,11,22,0.9)] shadow-[0_12px_30px_rgba(2,6,23,0.24)] backdrop-blur-md sm:shadow-glow sm:shadow-brand/10 sm:backdrop-blur-2xl"
              : "border-white/8 bg-[rgba(7,11,22,0.82)] shadow-[0_12px_30px_rgba(2,6,23,0.2)] backdrop-blur-sm sm:bg-[rgba(7,11,22,0.62)] sm:shadow-[0_18px_60px_rgba(2,6,23,0.16)] sm:backdrop-blur-xl"
          }`}
        >
          <Link href="/" aria-label="Go to homepage" className="shrink-0">
            <span className="sm:hidden">
              <BrandMark compact />
            </span>
            <span className="hidden sm:inline-flex">
              <BrandMark />
            </span>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {hrefs.map((item) => {
              const isActive = active === item.id && currentPath === "/";
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {isActive ? (
                    <span
                      className="absolute inset-0 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(95,132,232,0.12))]"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={PROFILE.links.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#f4f7ff_0%,#d8e5ff_42%,#88d2ef_100%)] px-4 py-2 text-sm font-semibold text-canvas shadow-[0_12px_24px_rgba(111,205,245,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(111,205,245,0.18)]"
            >
              <Download className="h-4 w-4" />
              CV
            </a>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] p-3 text-white transition hover:border-brand/40 hover:bg-white/[0.08] lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldUseLiteMotion ? 0.16 : 0.2 }}
            className="fixed inset-0 z-40 bg-[rgba(3,6,16,0.74)] px-3 pt-20 backdrop-blur-sm sm:pt-24 sm:backdrop-blur-xl lg:hidden"
          >
            <motion.div
              id="mobile-nav"
              initial={
                shouldUseLiteMotion ? { opacity: 0 } : { opacity: 0, y: -16 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldUseLiteMotion ? { opacity: 0 } : { opacity: 0, y: -16 }
              }
              transition={{ duration: shouldUseLiteMotion ? 0.16 : 0.22 }}
              className="mx-auto max-w-[1280px] rounded-[1.55rem] border border-white/10 bg-[rgba(11,16,32,0.98)] p-4 shadow-[0_12px_30px_rgba(2,6,23,0.28)] sm:rounded-[1.8rem] sm:p-5 sm:shadow-card"
            >
              <div className="space-y-2">
                {hrefs.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-12 items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:border-brand/30 hover:bg-white/[0.08]"
                  >
                    <span>{item.label}</span>
                    <span className="text-muted">#{item.id}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(95,132,232,0.18),rgba(111,205,245,0.08),rgba(255,181,71,0.06))] p-4">
                <p className="text-sm text-soft">
                  {PROFILE.person.availability}
                </p>
                <a
                  href={PROFILE.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#f4f7ff_0%,#d8e5ff_42%,#88d2ef_100%)] px-4 py-2 text-sm font-semibold text-canvas"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
