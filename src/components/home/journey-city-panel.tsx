"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  MapPin,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { JourneyCategory, JourneyCity } from "@/data/journey";

const CATEGORY_META: Record<
  JourneyCategory,
  { label: string; className: string }
> = {
  origin: { label: "Origin", className: "bg-amber-50 text-amber-800" },
  residence: { label: "Residence", className: "bg-slate-100 text-slate-700" },
  education: { label: "Education", className: "bg-blue-50 text-blue-800" },
  work: { label: "Work", className: "bg-emerald-50 text-emerald-800" },
  internship: {
    label: "Internship",
    className: "bg-violet-50 text-violet-800",
  },
  volunteering: {
    label: "Volunteering",
    className: "bg-rose-50 text-rose-800",
  },
  conference: { label: "Conference", className: "bg-cyan-50 text-cyan-800" },
  event: { label: "Event", className: "bg-orange-50 text-orange-800" },
  project: { label: "Project", className: "bg-indigo-50 text-indigo-800" },
  entrepreneurship: {
    label: "Entrepreneurship",
    className: "bg-green-50 text-green-800",
  },
  graduation: { label: "Milestone", className: "bg-yellow-50 text-yellow-800" },
};

type JourneyCityPanelProps = {
  city: JourneyCity;
  onClose: () => void;
  panelRef: RefObject<HTMLElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
};

export function JourneyCityPanel({
  city,
  onClose,
  panelRef,
  closeButtonRef,
}: JourneyCityPanelProps) {
  const reducedMotion = useReducedMotion();
  const chapterLabel = city.entries.length === 1 ? "chapter" : "chapters";

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, [closeButtonRef]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", handleTab);
    return () => panel.removeEventListener("keydown", handleTab);
  }, [panelRef]);

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end lg:items-stretch lg:justify-end lg:p-5">
      <button
        type="button"
        aria-label="Close city details"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <motion.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="journey-city-title"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
        className="relative z-10 max-h-[86dvh] w-full overscroll-contain overflow-y-auto rounded-t-[1.75rem] border border-[rgba(24,24,24,0.12)] bg-[#fffdf8] shadow-[0_-18px_60px_rgba(0,0,0,0.24)] lg:h-full lg:max-h-none lg:max-w-[440px] lg:rounded-[1.5rem] lg:shadow-[0_16px_45px_rgba(24,24,24,0.2)]"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[rgba(24,24,24,0.1)] bg-[#fffdf8]/95 px-5 py-5 backdrop-blur sm:px-6">
          <div className="flex min-w-0 gap-3">
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#181818] text-[#06b56b]">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3
                id="journey-city-title"
                className="font-heading text-xl font-black tracking-[-0.035em] text-[#181818] sm:text-2xl"
              >
                {city.city}, {city.country}
              </h3>
              <p className="mt-1 text-sm text-[#6f6a61]">
                {city.entries.length} {chapterLabel} connected to this city
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={`Close ${city.city} details`}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(24,24,24,0.14)] bg-white text-[#181818] transition hover:border-[#181818] hover:bg-[#f5f3ef]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {city.entries.map((entry) => {
            const category = CATEGORY_META[entry.primaryCategory];

            return (
              <article
                key={entry.id}
                className="rounded-[1.25rem] border border-[rgba(24,24,24,0.11)] bg-white p-4 shadow-[0_5px_18px_rgba(24,24,24,0.05)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.16em] ${category.className}`}
                  >
                    {category.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6f6a61]">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {entry.dateLabel}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="font-heading text-base font-extrabold tracking-[-0.02em] text-[#181818] sm:text-lg">
                    {entry.title}
                  </h4>
                  {entry.organization ? (
                    <p className="mt-1 text-sm font-semibold text-[#4e4a44]">
                      {entry.organization}
                    </p>
                  ) : null}
                  {entry.region ? (
                    <p className="mt-1 text-xs text-[#817b72]">
                      {entry.region}
                    </p>
                  ) : null}
                </div>

                <p className="mt-3 text-sm leading-6 text-[#6f6a61]">
                  {entry.summary}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(24,24,24,0.08)] pt-3">
                  <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-[#817b72]">
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-[#06b56b]"
                      aria-hidden="true"
                    />
                    {entry.confidence === "confirmed"
                      ? "Confirmed record"
                      : "Supported by available records"}
                  </span>

                  {entry.detailUrl ? (
                    <Link
                      href={entry.detailUrl}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#181818] px-4 py-2 text-xs font-semibold text-[#f3eee6] transition hover:bg-black"
                    >
                      View page
                      <ExternalLink
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </Link>
                  ) : (
                    <span className="text-[0.7rem] font-medium text-[#817b72]">
                      Details not published yet
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </motion.aside>
    </div>,
    document.body,
  );
}
