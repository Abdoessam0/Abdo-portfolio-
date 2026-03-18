import Link from "next/link";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { BrandMark } from "@/components/home/brand-mark";
import { PROFILE } from "@/data/profile";

const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-3 pb-6 pt-8 sm:px-5">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark compact />
          <div>
            <p className="text-sm font-medium text-white">
              {PROFILE.person.name}
            </p>
            <p className="text-xs text-muted">
              {PROFILE.person.role} / {PROFILE.person.location}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${PROFILE.socials.email}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-soft transition hover:border-brand/30 hover:text-white"
            aria-label="Email Abdelrahman Mohamed"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-soft transition hover:border-brand/30 hover:text-white"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-soft transition hover:border-brand/30 hover:text-white"
            aria-label="GitHub profile"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-soft transition hover:border-emerald/30 hover:text-white"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-[1280px] flex-col gap-2 border-t border-white/10 pt-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>(c) {year} Abdelrahman Mohamed</p>
        <p>Built with Next.js, TypeScript, and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
