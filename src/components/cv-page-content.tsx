"use client";

import { Download, ExternalLink } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { useLang } from "@/hooks/use-lang";

export function CvPageContent({ cvUrl = PROFILE.links.resume }: { cvUrl?: string }) {
  const { t } = useLang();

  return (
    <section dir={t.dir} className="py-10">
      <div className="section-frame max-w-3xl p-6 sm:p-8">
        <p className="pill-label">{t.cv.pill}</p>
        <h1 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.05em] text-white">
          {t.cv.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          {t.cv.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={cvUrl}
            download
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-canvas transition hover:bg-brand-glow"
          >
            <Download className="h-4 w-4" />
            {t.cv.download}
          </a>
          <a
            href={cvUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-brand/30 hover:bg-white/[0.08]"
          >
            <ExternalLink className="h-4 w-4 text-brand-glow" />
            {t.cv.openPdf}
          </a>
        </div>
      </div>
    </section>
  );
}
