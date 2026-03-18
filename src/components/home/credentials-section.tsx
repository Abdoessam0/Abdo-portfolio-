"use client";


import { Award, ExternalLink, GraduationCap, HandHeart } from "lucide-react";
import { CERTIFICATES } from "@/data/certificates";
import { VOLUNTEERING } from "@/data/volunteering";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const highlightedCertificates = [
  "remax-erasmus",
  "alx-fullstack",
  "wordpress-internship",
  "vtest-english",
  "afaqy-support",
  "rosetta-english",
]
  .map((id) => CERTIFICATES.find((certificate) => certificate.id === id))
  .filter(
    (certificate): certificate is NonNullable<(typeof CERTIFICATES)[number]> =>
      Boolean(certificate),
  );

export function CredentialsSection() {
  return (
    <section className="space-y-8 py-4 sm:space-y-10">
      <Reveal>
        <SectionHeading
          eyebrow="Credentials"
          title="Extra proof"
          description="Certificates, language skills, and international experience."
        />
      </Reveal>

      <Reveal className="section-frame p-5 sm:p-6">
        {/* Education */}
        <div className="mb-4 rounded-[1.2rem] border border-white/8 bg-[linear-gradient(145deg,rgba(91,124,255,0.06),rgba(139,109,255,0.03),rgba(53,214,164,0.02))] p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-glow">
              <GraduationCap className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">Education</p>
              <div className="mt-2 space-y-2">
                {PROFILE.education.map((edu) => (
                  <div key={edu.degree} className="text-sm leading-6">
                    <p className="text-soft">{edu.degree}</p>
                    <p className="text-muted">{edu.institution} · {edu.location} · {edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="grid gap-3 lg:grid-cols-2">
          {highlightedCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-glow">
                    <Award className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {certificate.title}
                    </p>
                    <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                      {certificate.issuer} / {certificate.date}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {certificate.description}
                    </p>
                  </div>
                </div>
                {(certificate.file || certificate.link) ? (
                  <a
                    href={certificate.file ? `/certificates/${certificate.file}` : certificate.link}
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

        {/* Volunteering */}
        <div className="mt-4 rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-emerald">
              <HandHeart className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">
                International volunteer experience
              </p>
              <div className="mt-3 space-y-2">
                {VOLUNTEERING.map((item) => (
                  <div key={item.id} className="text-sm leading-6">
                    <p className="text-soft">{item.title} — {item.organization}</p>
                    <p className="text-muted">{item.location} · {item.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
