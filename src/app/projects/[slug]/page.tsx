import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Archive, ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { CompactMediaGallery } from "@/components/ui/compact-media-gallery";
import { PROFILE } from "@/data/profile";
import { getProjectPrimaryUrl, PROJECTS } from "@/data/projects";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteOrigin = new URL(PROFILE.links.portfolio).origin;

function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
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
  const project = getProject(slug);

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

  return (
    <section className="space-y-6 py-6 sm:space-y-8 sm:py-10">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-soft transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <article className="section-frame p-4 sm:p-6 lg:p-7">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill-label">{project.collection}</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[0.72rem] font-medium text-soft">
                {project.projectType}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-[0.72rem] font-medium ${
                  project.archived
                    ? "bg-white/10 text-white"
                    : "bg-brand/15 text-brand-glow"
                }`}
              >
                {project.status}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[0.72rem] text-soft">
                {project.timeline}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-muted">
                {project.context}
              </p>
              <h1 className="font-heading text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                {project.title}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-soft sm:text-base">
                {project.summary}
              </p>
              <p className="max-w-2xl text-sm leading-6 text-muted">
                {project.role}
              </p>
            </div>

            {project.metrics?.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4 sm:p-5">
              <p className="pill-label">Project overview</p>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                {project.caseStudy}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-heading text-2xl font-semibold text-white">
                Key contributions
              </h2>
              <ul className="grid gap-3">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-soft"
                  >
                    <span className="mt-[0.85rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-glow" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-4">
            <CompactMediaGallery
              items={projectMedia}
              imageSizes="(min-width: 1280px) 34vw, (min-width: 1024px) 40vw, 92vw"
              priority
            />

            <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
              <p className="pill-label">Project details</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-muted">Year</dt>
                  <dd className="mt-1 text-white">{project.timeline}</dd>
                </div>
                <div>
                  <dt className="text-muted">Role</dt>
                  <dd className="mt-1 text-white">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-muted">Collection</dt>
                  <dd className="mt-1 text-white">{project.collection}</dd>
                </div>
                <div>
                  <dt className="text-muted">Type</dt>
                  <dd className="mt-1 text-white">{project.projectType}</dd>
                </div>
                <div>
                  <dt className="text-muted">Context</dt>
                  <dd className="mt-1 text-white">{project.context}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
              <p className="pill-label">Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="tech-badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
              <p className="pill-label">Links</p>
              <div className="mt-4 flex flex-col gap-3 text-sm font-medium">
                {liveLinks.map((link, index) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center justify-between rounded-2xl px-4 py-3 transition ${
                      index === 0
                        ? "bg-[linear-gradient(135deg,#f4f7ff_0%,#d8e5ff_42%,#88d2ef_100%)] text-[#07111f] shadow-[0_18px_40px_rgba(111,205,245,0.16)]"
                        : "border border-white/10 text-white hover:border-brand/30"
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
                    className="inline-flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-white transition hover:border-brand/30"
                  >
                    <span>GitHub</span>
                    <Github className="h-4 w-4" />
                  </a>
                ) : null}
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-white transition hover:border-brand/30"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
}
