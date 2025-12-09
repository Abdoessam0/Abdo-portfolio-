// src/components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { PROFILE } from "@/data/profile";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#volunteering", label: "Volunteering" },
  { href: "/#certificates", label: "Certificates" },
  { href: "/#hire-me", label: "Hire Me" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-outline/60 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3" aria-label="Home">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <span className="text-lg font-bold text-canvas">AM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-ink">Software Engineer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition-colors hover:text-accent relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
            <Link
              href={PROFILE.links.resume}
              target="_blank"
              rel="noreferrer"
              className="ml-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-panel/50 px-4 py-2 text-sm font-medium text-ink transition-all hover:border-accent hover:bg-accent/10 hover:translate-y-[-2px]"
            >
              <Download size={14} />
              CV
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-lg p-2 text-muted hover:text-accent hover:bg-outline/20 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-outline/60 bg-surface/95 backdrop-blur mt-2 py-4">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-base font-medium text-ink hover:text-accent hover:bg-outline/20 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={PROFILE.links.resume}
                target="_blank"
                rel="noreferrer"
                className="mx-4 mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-panel/50 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent/10"
                onClick={() => setIsMenuOpen(false)}
              >
                <Download size={14} />
                Download CV
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
