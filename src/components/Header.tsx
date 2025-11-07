import Link from "next/link";
import { PROFILE } from "@/data/profile";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-[#fafafa]/90 backdrop-blur">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="group flex flex-col" aria-label="Go to home">
            <span className="text-base font-semibold text-zinc-900 group-hover:text-zinc-700">{PROFILE.person.name}</span>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{PROFILE.person.role}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={PROFILE.links.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              Download CV
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              Get in touch
            </Link>
          </div>
        </div>
        <nav
          aria-label="Primary"
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto text-sm font-medium text-zinc-600 md:justify-end"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex snap-start items-center rounded-full border border-transparent px-3 py-1 transition hover:border-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
