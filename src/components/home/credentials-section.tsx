"use client";

import { Award, ExternalLink, GraduationCap, HandHeart } from "lucide-react";
import { CERTIFICATES } from "@/data/certificates";
import { PROFILE } from "@/data/profile";
import { VOLUNTEERING } from "@/data/volunteering";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const highlightedCertificates = [
  "remax-erasmus",
  "alx-fullstack",
  "wordpress-internship",
  "vtest-english",
  "rosetta-english",
]
  .map((id) => CERTIFICATES.find((certificate) => certificate.id === id))
  .filter(
    (certificate): certificate is NonNullable<(typeof CERTIFICATES)[number]> =>
      Boolean(certificate),
  );

const volunteeringOrder = [
  "youth-summer-fest",
  "erasmus-structured-dialogue",
  "snowboard-worldcup",
  "damla-volunteering",
] as const;

const selectedVolunteering = volunteeringOrder
  .map((id) => VOLUNTEERING.find((item) => item.id === id))
  .filter(
    (item): item is NonNullable<(typeof VOLUNTEERING)[number]> => Boolean(item),
  );

export function CredentialsSection() {
  return (
    <section id="credentials" className="space-y-7 py-3 sm:space-y-10 sm:py-4">
      <Reveal>
        <SectionHeading
          eyebrow="Credentials"
          title="Education, certificates, and volunteering"
        />
      </Reveal>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <Reveal className="section-frame p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-glow">
                <GraduationCap className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">Education</p>
                <div className="mt-3 space-y-3">
                  {PROFILE.education.map((education) => (
                    <div
                      key={education.degree}
                      className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-3"
                    >
                      <p className="text-sm font-medium text-soft">
                        {education.degree}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {education.institution} / {education.location}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {education.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="section-frame p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-emerald">
                <HandHeart className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">Volunteering</p>
                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  {selectedVolunteering.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-soft">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
                            {item.organization}
                          </p>
                          <p className="mt-2 text-xs text-muted">
                            {item.location} / {item.period}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-muted">
                            {item.summary}
                          </p>
                        </div>
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-soft transition hover:border-brand/30 hover:text-white"
                            aria-label={item.linkLabel ?? item.title}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>
                      <ul className="mt-4 grid gap-2 text-sm leading-6 text-soft">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-glow" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="section-frame p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-glow">
              <Award className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">Certificates</p>
              <div className="mt-3 grid gap-3">
                {highlightedCertificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-soft">
                          {certificate.title}
                        </p>
                        <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                          {certificate.issuer} / {certificate.date}
                        </p>
                      </div>
                      {certificate.file || certificate.link ? (
                        <a
                          href={
                            certificate.file
                              ? `/certificates/${certificate.file}`
                              : certificate.link
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-soft transition hover:border-brand/30 hover:text-white"
                          aria-label={`Open ${certificate.title}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
