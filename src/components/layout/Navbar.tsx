"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Github, Linkedin, Moon, Sun } from "lucide-react";
import { loadContent } from "../../lib/content";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const content = loadContent();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 md:px-6 mt-4">
        <div className="flex items-center justify-between rounded-2xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/10 px-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="#about" className="text-text/90 hover:text-accent transition">About</Link>
            <Link href="#skills" className="text-text/90 hover:text-accent transition">Skills</Link>
            <Link href="#projects" className="text-text/90 hover:text-accent transition">Projects</Link>
            <Link href="#experience" className="text-text/90 hover:text-accent transition">Experience</Link>
            <Link href="#contact" className="text-text/90 hover:text-accent transition">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={content.socials.github || "https://github.com/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg hover:bg-text/10 transition"
            >
              <Github className="size-5 text-text" />
            </a>
            <a
              href={content.socials.linkedin || "https://www.linkedin.com/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg hover:bg-text/10 transition"
            >
              <Linkedin className="size-5 text-text" />
            </a>
            <button
              type="button"
              aria-label="Toggle theme"
              className="p-2 rounded-lg hover:bg-text/10 transition"
              onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-5 text-text" />
              ) : (
                <Moon className="size-5 text-text" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}


