"use client";

import { Laptop, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { JourneyMap } from "@/components/home/journey-map";
import { SectionHeading } from "@/components/home/section-heading";
import { getRemoteEntries } from "@/data/journey";

export function GlobalJourneySection() {
  const remoteEntries = getRemoteEntries();

  useEffect(() => {
    if (window.location.hash !== "#journey") return;

    const alignJourney = () => {
      document.getElementById("journey")?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    };
    const frame = window.requestAnimationFrame(() =>
      window.requestAnimationFrame(alignJourney),
    );
    const timer = window.setTimeout(alignJourney, 500);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="journey"
      aria-label="My Global Journey"
      className="section-frame overflow-hidden px-4 py-6 sm:px-7 sm:py-8 lg:px-9 lg:py-10"
    >
      <SectionHeading
        eyebrow="Journey"
        title="My Global Journey"
        description="Explore the cities that shaped my education, career, volunteering, and international journey."
      />

      <JourneyMap />

      {remoteEntries.length ? (
        <div className="mt-4 rounded-[1.1rem] border border-[rgba(24,24,24,0.09)] bg-[#fbfaf7] p-3.5 sm:p-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[rgba(24,24,24,0.08)] bg-white text-[#048c55]">
              <Laptop className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-heading text-sm font-extrabold tracking-[-0.02em] text-[#181818]">
                Remote Chapters
              </h3>
              <p className="mt-0.5 text-[0.68rem] leading-4 text-[#817b72]">
                Remote work stays separate and never receives a fabricated map
                location.
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {remoteEntries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-xl border border-[rgba(24,24,24,0.08)] bg-white p-3.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-blue-800">
                    {entry.primaryCategory}
                  </span>
                  <span className="text-xs font-medium text-[#817b72]">
                    {entry.dateLabel}
                  </span>
                </div>
                <h4 className="mt-2.5 text-sm font-bold text-[#181818]">
                  {entry.title}
                </h4>
                {entry.organization ? (
                  <p className="mt-1 text-xs font-semibold text-[#4e4a44]">
                    {entry.organization}
                  </p>
                ) : null}
                <p className="mt-1.5 text-xs leading-5 text-[#6f6a61]">
                  {entry.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <p className="mt-4 flex items-start gap-2 text-[0.68rem] leading-5 text-[#817b72]">
        <ShieldCheck
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#048c55]"
          aria-hidden="true"
        />
        Journey details come from verified records supplied for this portfolio.
        Map boundaries use Natural Earth data via World Atlas; map geography is
        illustrative.
      </p>
    </section>
  );
}
