import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
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
  { icon: Instagram, href: PROFILE.socials.instagram, label: "Instagram" },
  { icon: MessageCircle, href: PROFILE.socials.whatsapp, label: "WhatsApp" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(24,24,24,0.1)] px-3 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 rounded-[1.75rem] border border-[rgba(24,24,24,0.1)] bg-white p-4 shadow-[0_2px_12px_rgba(24,24,24,0.06)] sm:p-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#181818] font-mono text-[0.68rem] font-bold text-[#06b56b] shadow-[inset_0_0_0_1px_rgba(6,181,107,0.18)]">
                <span aria-hidden="true">
                  <span>&lt;</span>
                  <span className="text-[#f3eee6]">/</span>
                  <span>&gt;</span>
                </span>
              </span>
              <span className="text-sm font-semibold text-[#181818]">
                {PROFILE.person.name}
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#6f6a61]">
              Software Engineer building websites, dashboards, and business platforms.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6f6a61]">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#181818]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.label === "Email" ? undefined : "_blank"}
                rel={social.label === "Email" ? undefined : "noreferrer"}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(24,24,24,0.1)] bg-[#f5f3ef] text-[#6f6a61] transition-all hover:border-[#06b56b]/30 hover:bg-[#f0fdf7] hover:text-[#048c55]"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 px-1 text-xs leading-5 text-[#6f6a61] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {PROFILE.person.name}. All rights reserved.
          </p>
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
