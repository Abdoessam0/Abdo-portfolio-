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
              <div className="story-icon-wrap mt-0.5 h-10 w-10 rounded-2xl">
                <GraduationCap className="h-4.5 w-4.5" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#181818]">Education</p>
                <div className="mt-3 space-y-3">
                  {PROFILE.education.map((education) => (
                    <div
                      key={education.degree}
                      className="story-inner-card rounded-[1.15rem] px-4 py-3"
                    >
                      <p className="text-sm font-semibold text-[#181818]">
                        {education.degree}
                      </p>
                      <p className="mt-1 text-sm text-[#6f6a61]">
                        {education.institution} / {education.location}
                      </p>
                      <p className="mt-1 text-xs text-[#6f6a61]">
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
              <div className="story-icon-wrap mt-0.5 h-10 w-10 rounded-2xl">
                <HandHeart className="h-4.5 w-4.5" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#181818]">Volunteering</p>
                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  {selectedVolunteering.map((item) => (
                    <div
                      key={item.id}
                      className="story-inner-card rounded-[1.15rem] px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[#181818]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6f6a61]">
                            {item.organization}
                          </p>
                          <p className="mt-2 text-xs text-[#6f6a61]">
                            {item.location} / {item.period}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-[#6f6a61]">
                            {item.summary}
                          </p>
                        </div>
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="story-link-btn h-9 w-9 rounded-full"
                            aria-label={item.linkLabel ?? item.title}
                          >
                            <ExternalLink className="h-4 w-4" aria-hidden />
                          </a>
                        ) : null}
                      </div>
                      <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#6f6a61]">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2.5">
                            <span className="story-bullet mt-2 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
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
            <div className="story-icon-wrap mt-0.5 h-10 w-10 rounded-2xl">
              <Award className="h-4.5 w-4.5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#181818]">Certificates</p>
              <div className="mt-3 grid gap-3">
                {highlightedCertificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="story-inner-card rounded-[1.15rem] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#181818]">
                          {certificate.title}
                        </p>
                        <p className="mt-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#6f6a61]">
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
                          className="story-link-btn h-9 w-9 rounded-full"
                          aria-label={`Open ${certificate.title}`}
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden />
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
