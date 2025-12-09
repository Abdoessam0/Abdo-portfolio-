// src/components/Footer.tsx
import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { PROFILE } from "@/data/profile";

const Footer = () => {
  const year = new Date().getFullYear();

  // Safe defaults if data is missing
  const email = PROFILE.socials?.email || "abdoessammo@gmail.com";
  const phone = PROFILE.person?.phone || "+905527508202";
  const github = PROFILE.socials?.github || "https://github.com/Abdoessam0";
  const linkedin = PROFILE.socials?.linkedin || "https://linkedin.com/in/abdo-mo";

  return (
    <footer className="mt-20 border-t border-outline/60 bg-surface/80">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <span className="text-lg font-bold text-canvas">AM</span>
              </div>
              <div>
                <p className="font-semibold text-ink">{PROFILE.person?.name || "Abdelrahman Mohamed"}</p>
                <p className="text-sm text-muted">{PROFILE.person?.role || "Software Engineer"}</p>
              </div>
            </div>
            <p className="text-sm text-muted">
              Full-Stack developer focused on building reliable, high-performance web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/#about" className="block text-sm text-muted hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/#projects" className="block text-sm text-muted hover:text-accent transition-colors">
                Projects
              </Link>
              <Link href="/#experience" className="block text-sm text-muted hover:text-accent transition-colors">
                Experience
              </Link>
              <Link href="/#hire-me" className="block text-sm text-muted hover:text-accent transition-colors">
                Hire Me
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <Mail size={14} />
                {email}
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <Phone size={14} />
                {phone}
              </a>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-accent transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-outline/60 text-center">
          <p className="text-sm text-muted">
            © {year} {PROFILE.person?.name || "Abdelrahman Mohamed"}. All rights reserved.
          </p>
          <p className="text-xs text-muted mt-1">
            Based in {PROFILE.person?.location?.split(",")[0] || "Turkey"} • {PROFILE.person?.timezone || "GMT+3"} • Open for opportunities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;