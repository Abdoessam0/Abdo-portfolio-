"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BrandMark } from "@/components/home/brand-mark";
import { PROFILE } from "@/data/profile";

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

    const ids = navItems.map((item) => item.id);
    let ticking = false;

    const updateState = () => {
      setScrolled(window.scrollY > 16);

      let current = "";
      for (const id of ids) {
        const node = document.getElementById(id);
        if (!node) continue;
        const top = node.getBoundingClientRect().top;
        if (top <= 140) current = id;
      }

      setActive(current);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateState);
    };

    updateState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentPath]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className={`mx-auto flex max-w-[1280px] items-center justify-between rounded-[1.6rem] border px-4 py-3 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-white/12 bg-[rgba(8,12,24,0.82)] shadow-glow shadow-brand/10 backdrop-blur-2xl"
              : "border-white/8 bg-[rgba(8,12,24,0.55)] backdrop-blur-xl"
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
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
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
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white transition hover:border-brand/40 hover:bg-white/[0.08]"
            >
              <Download className="h-4 w-4 text-brand-glow" />
              CV
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] p-3 text-white transition hover:border-brand/40 hover:bg-white/[0.08] lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[rgba(3,6,16,0.62)] px-3 pt-24 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22 }}
              className="mx-auto max-w-[1280px] rounded-[1.8rem] border border-white/10 bg-[rgba(11,16,32,0.96)] p-5 shadow-card"
            >
              <div className="space-y-2">
                {hrefs.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:border-brand/30 hover:bg-white/[0.08]"
                  >
                    <span>{item.label}</span>
                    <span className="text-muted">#{item.id}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(91,124,255,0.15),rgba(139,109,255,0.08))] p-4">
                <p className="text-sm text-soft">
                  {PROFILE.person.availability}
                </p>
                <a
                  href={PROFILE.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-canvas"
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
