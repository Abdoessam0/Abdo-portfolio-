import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Archive, ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { CompactMediaGallery } from "@/components/ui/compact-media-gallery";
import { PROFILE } from "@/data/profile";
import { getProjectPrimaryUrl } from "@/data/projects";
import { getPublishedProjects } from "@/lib/public-data";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteOrigin = new URL(PROFILE.links.portfolio).origin;

export const dynamic = "force-dynamic";

async function getProject(slug: string) {
  const projects = await getPublishedProjects();
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  const canonical = `${siteOrigin}/projects/${project.slug}`;
  const image = project.cover
    ? `${siteOrigin}${project.cover.src}`
    : `${siteOrigin}/opengraph-image`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: canonical,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const primaryUrl = getProjectPrimaryUrl(project);
  const liveLinks = primaryUrl
    ? [{ label: project.primaryCtaLabel || "Live Site", url: primaryUrl }].concat(
        project.additionalLinks ?? [],
      )
    : project.additionalLinks ?? [];
  const projectMedia = [
    ...(project.gallery ?? []),
    ...(project.cover ? [project.cover] : []),
  ].filter(
    (item, index, items) =>
      items.findIndex((media) => media.src === item.src) === index,
  );
  const projectSnapshot = [
    project.problem ? { label: "Problem", value: project.problem } : null,
    { label: "My role", value: project.role },
    { label: "Tech stack", value: project.stack.join(", ") },
    { label: "What I built", value: project.highlights.join(" ") },
    project.result ? { label: "Result or learning", value: project.result } : null,
  ].filter((item): item is { label: string; value: string } =>
    Boolean(item?.value),
  );

  return (
    <section className="space-y-6 py-6 sm:space-y-8 sm:py-10">
      {/* Back link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#6f6a61] transition hover:text-[#181818]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      {/* Main article card */}
      <article className="overflow-hidden rounded-[1.75rem] border border-[rgba(24,24,24,0.1)] bg-white shadow-[0_4px_24px_rgba(24,24,24,0.08)]">
        <div className="p-4 sm:p-6 lg:p-7">
          <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">

            {/* ── Left column ── */}
            <div className="space-y-6">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-[rgba(24,24,24,0.12)] bg-[#f5f3ef] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#6f6a61]">
                  {project.collection}
                </span>
                <span className="rounded-full border border-[rgba(24,24,24,0.12)] bg-[#f5f3ef] px-3 py-1 text-[0.72rem] font-medium text-[#6f6a61]">
                  {project.projectType}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[0.72rem] font-semibold ${
                    project.archived
                      ? "border border-[rgba(24,24,24,0.12)] bg-[#f5f3ef] text-[#6f6a61]"
                      : "border border-[#06b56b]/25 bg-[#06b56b]/10 text-[#048c55]"
                  }`}
                >
                  {project.status}
                </span>
                <span className="rounded-full border border-[rgba(24,24,24,0.12)] bg-[#f5f3ef] px-3 py-1 text-[0.72rem] text-[#6f6a61]">
                  {project.timeline}
                </span>
              </div>

              {/* Title block */}
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.24em] text-[#6f6a61]">
                  {project.context}
                </p>
                <h1 className="font-heading text-3xl font-black tracking-[-0.05em] text-[#181818] sm:text-4xl">
                  {project.title}
                </h1>
                <p className="max-w-3xl text-sm leading-7 text-[#6f6a61] sm:text-base">
                  {project.summary}
                </p>
                <p className="max-w-2xl text-sm leading-6 text-[#6f6a61]">
                  {project.role}
                </p>
              </div>

              {/* Metrics */}
              {project.metrics?.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[1.2rem] border border-[rgba(24,24,24,0.1)] bg-[#fbf7ef] px-4 py-3"
                    >
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#6f6a61]">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#181818]">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Case study box */}
              <div className="rounded-[1.5rem] border border-[rgba(24,24,24,0.1)] bg-[#fbf7ef] p-4 sm:p-5">
                <p className="inline-flex items-center rounded-full border border-[rgba(24,24,24,0.12)] bg-white px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#6f6a61]">
                  Project overview
                </p>
                <p className="mt-4 text-sm leading-7 text-[#6f6a61] sm:text-base">
                  {project.caseStudy}
                </p>
              </div>

              {/* Recruiter-friendly project snapshot */}
              <div className="rounded-[1.5rem] border border-[rgba(24,24,24,0.1)] bg-white p-4 sm:p-5">
                <p className="inline-flex items-center rounded-full border border-[rgba(24,24,24,0.12)] bg-[#fbf7ef] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#6f6a61]">
                  Project snapshot
                </p>
                <dl className="mt-4 grid gap-3">
                  {projectSnapshot.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.1rem] border border-[rgba(24,24,24,0.08)] bg-[#fbf7ef] px-4 py-3"
                    >
                      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#6f6a61]">
                        {item.label}
                      </dt>
                      <dd className="mt-2 text-sm leading-7 text-[#6f6a61]">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Key contributions */}
              <div className="space-y-3">
                <h2 className="font-heading text-2xl font-black tracking-[-0.04em] text-[#181818]">
                  Key contributions
                </h2>
                <ul className="grid gap-3">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-[1.2rem] border border-[rgba(24,24,24,0.08)] bg-white px-4 py-3 text-sm leading-7 text-[#6f6a61]"
                    >
                      <span className="mt-[0.85rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#06b56b]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right column (sidebar) ── */}
            <aside className="space-y-4">
              {/* Gallery */}
              <CompactMediaGallery
                items={projectMedia}
                imageSizes="(min-width: 1280px) 34vw, (min-width: 1024px) 40vw, 92vw"
                priority
              />

              {/* Project details */}
              <div className="rounded-[1.5rem] border border-[rgba(24,24,24,0.1)] bg-[#fbf7ef] p-5">
                <p className="inline-flex items-center rounded-full border border-[rgba(24,24,24,0.12)] bg-white px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#6f6a61]">
                  Project details
                </p>
                <dl className="mt-4 space-y-4 text-sm">
                  {[
                    { label: "Year", value: project.timeline },
                    { label: "Role", value: project.role },
                    { label: "Collection", value: project.collection },
                    { label: "Type", value: project.projectType },
                    { label: "Context", value: project.context },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <dt className="text-[#6f6a61]">{label}</dt>
                      <dd className="mt-1 font-medium text-[#181818]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Stack */}
              <div className="rounded-[1.5rem] border border-[rgba(24,24,24,0.1)] bg-[#fbf7ef] p-5">
                <p className="inline-flex items-center rounded-full border border-[rgba(24,24,24,0.12)] bg-white px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#6f6a61]">
                  Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 rounded-full border border-[rgba(24,24,24,0.1)] bg-white px-2.5 py-1 text-[0.72rem] font-medium text-[#6f6a61] transition-colors hover:border-[rgba(24,24,24,0.2)] hover:text-[#181818]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="rounded-[1.5rem] border border-[rgba(24,24,24,0.1)] bg-[#fbf7ef] p-5">
                <p className="inline-flex items-center rounded-full border border-[rgba(24,24,24,0.12)] bg-white px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#6f6a61]">
                  Links
                </p>
                <div className="mt-4 flex flex-col gap-3 text-sm font-medium">
                  {liveLinks.map((link, index) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center justify-between rounded-2xl px-4 py-3 transition focus-visible:outline-offset-2 ${
                        index === 0
                          ? "btn-primary-green shadow-[0_4px_14px_rgba(6,181,107,0.3)]"
                          : "btn-secondary hover:border-[rgba(24,24,24,0.2)]"
                      }`}
                    >
                      <span>{link.label}</span>
                      {project.archived ? (
                        <Archive className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </a>
                  ))}
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-2xl border border-[rgba(24,24,24,0.12)] bg-white px-4 py-3 text-[#181818] transition hover:border-[rgba(24,24,24,0.2)]"
                    >
                      <span>GitHub</span>
                      <Github className="h-4 w-4" />
                    </a>
                  ) : null}
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-between rounded-2xl border border-[rgba(24,24,24,0.12)] bg-white px-4 py-3 text-[#181818] transition hover:border-[rgba(24,24,24,0.2)]"
                  >
                    <span>Get in touch</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </section>
  );
}
