"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import {
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { loadContent } from "../../lib/content";
import { fadeUp, easeOutExpo } from "@/lib/motion";

const sectionVariants = fadeUp(32, 0.6);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.5,
      ease: easeOutExpo as Transition["ease"],
    },
  }),
};

type ContactLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

// Section divider element to soften transitions between content blocks.
const SectionDivider = () => (
  <div className="mx-auto my-12 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-slate-200/80 to-transparent" />
);

export default function CvPage() {
  const content = loadContent();

  const contactLinks: ContactLink[] = [];
  if (content.socials.email) {
    contactLinks.push({
      label: content.socials.email,
      href: `mailto:${content.socials.email}`,
      icon: <Mail className="h-4 w-4" />,
    });
  }
  if (content.socials.linkedin) {
    contactLinks.push({
      label: "LinkedIn",
      href: content.socials.linkedin,
      icon: <Linkedin className="h-4 w-4" />,
    });
  }
  if (content.socials.github) {
    contactLinks.push({
      label: "GitHub",
      href: content.socials.github,
      icon: <Github className="h-4 w-4" />,
    });
  }

  const cvHref =
    [content.cvUrl, content.socials.linkedin, content.socials.github]
      .map((href) => (href && href !== "#" ? href : null))
      .find(Boolean) ?? "#";

  return (
    <main className="min-h-screen bg-bg py-16 text-text">
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 lg:px-8">
        {/* Hero section: introduction, summary, and download action. */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="rounded-3xl border border-slate-200/70 bg-surface/95 p-8 shadow-lg shadow-slate-900/5 backdrop-blur-sm lg:p-12"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4 md:max-w-2xl">
              <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{content.about.location}</span>
              </p>
              <div className="space-y-2">
                <h1 className="font-heading text-4xl font-semibold text-heading md:text-5xl">
                  {content.name}
                </h1>
                <p className="text-lg text-slate-600 md:text-xl">
                  {content.subline}
                </p>
              </div>
              <p className="text-base leading-relaxed text-slate-600">
                {content.about.narrative1}
              </p>
              <p className="text-base leading-relaxed text-slate-600">
                {content.about.narrative2}
              </p>
              <div className="inline-flex flex-wrap gap-3">
                {contactLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent hover:shadow-md"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="flex"
            >
              <Link
                href={cvHref}
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-md shadow-accent/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Download className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        <SectionDivider />

        {/* Experience section: timeline-inspired cards for key roles. */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="space-y-8"
        >
          <header className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Career Journey
            </p>
            <h2 className="text-3xl font-semibold text-heading">Experience</h2>
            <p className="text-base text-slate-500">
              Selected roles that highlight cross-functional impact, hands-on
              engineering, and leadership in collaborative environments.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {content.experience.map((item, index) => (
              <motion.article
                key={`${item.title}-${item.role}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
                className="group rounded-2xl border border-slate-200/60 bg-surface/95 p-6 shadow-sm shadow-slate-900/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-heading">
                      {item.role}
                    </h3>
                    <p className="text-sm text-slate-500">{item.title}</p>
                  </div>
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent opacity-80 group-hover:opacity-100" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {item.summary}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <SectionDivider />

        {/* Projects section: responsive grid of highlighted case studies. */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="space-y-8"
        >
          <header className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Featured Work
            </p>
            <h2 className="text-3xl font-semibold text-heading">Projects</h2>
            <p className="text-base text-slate-500">
              A snapshot of full-stack builds, product experiments, and
              automation efforts that blend usability with performance.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {content.projects.map((project, index) => (
              <motion.article
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
                className="group flex h-full flex-col rounded-2xl border border-slate-200/60 bg-surface/95 p-6 shadow-sm shadow-slate-900/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-semibold text-heading">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((stack) => (
                      <span
                        key={stack}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch={false}
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent/80"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : null}
                  {project.repoUrl ? (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch={false}
                      className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-accent"
                    >
                      <Github className="h-4 w-4" />
                      <span>Source</span>
                    </Link>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <SectionDivider />

        {/* Certifications section: compact cards for credentials with quick access links. */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="space-y-8"
        >
          <header className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Lifelong Learning
            </p>
            <h2 className="text-3xl font-semibold text-heading">
              Certifications
            </h2>
            <p className="text-base text-slate-500">
              Verified credentials and micro-certifications that reinforce core
              engineering, language, and leadership skills.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {content.certifications.map((certification, index) => (
              <motion.article
                key={certification.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
                className="group rounded-2xl border border-slate-200/60 bg-surface/95 p-5 shadow-sm shadow-slate-900/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-lg font-semibold text-heading">
                  {certification.title}
                </h3>
                <Link
                  href={certification.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent/80"
                >
                  <span>View Credential</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <SectionDivider />

        {/* Education section: single card highlighting academic foundation. */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="space-y-6 rounded-3xl border border-slate-200/70 bg-surface/95 p-8 shadow-lg shadow-slate-900/5"
        >
          <header className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Academic Background
            </p>
            <h2 className="text-3xl font-semibold text-heading">Education</h2>
          </header>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-heading">
              {content.education.degree}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {content.education.details}
            </p>
            <p className="text-sm text-slate-500">
              {content.about.languages}
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
