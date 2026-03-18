import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { PROFILE } from "@/data/profile";

export const metadata: Metadata = {
  title: "CV",
  description: "Download Abdelrahman Mohamed's CV.",
};

export default function CvPage() {
  return (
    <section className="py-10">
      <div className="section-frame max-w-3xl p-6 sm:p-8">
        <p className="pill-label">CV</p>
        <h1 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.05em] text-white">
          Recruiter-ready resume download
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          The latest CV is provided as a direct PDF for fast recruiter review.
          Use the primary action below for the downloadable version or open it
          in a new tab for a quick skim.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={PROFILE.links.resume}
            download
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-canvas transition hover:bg-brand-glow"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-brand/30 hover:bg-white/[0.08]"
          >
            <ExternalLink className="h-4 w-4 text-brand-glow" />
            Open PDF
          </a>
        </div>
      </div>
    </section>
  );
}
