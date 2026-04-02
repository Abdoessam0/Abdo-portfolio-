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

const socialLinks = [
  { icon: Mail, href: `mailto:${PROFILE.socials.email}`, label: "Email" },
  { icon: Linkedin, href: PROFILE.socials.linkedin, label: "LinkedIn" },
  { icon: Github, href: PROFILE.socials.github, label: "GitHub" },
  { icon: MessageCircle, href: PROFILE.socials.whatsapp, label: "WhatsApp" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] px-3 pb-8 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="section-frame flex flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <BrandMark />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Full-Stack Software Engineer building clean, reliable web
              applications.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.label === "Email" ? undefined : "_blank"}
                rel={social.label === "Email" ? undefined : "noreferrer"}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-muted transition-all hover:border-brand/20 hover:bg-white/[0.06] hover:text-white"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 px-1 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {PROFILE.person.name}. All rights reserved.
          </p>
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
