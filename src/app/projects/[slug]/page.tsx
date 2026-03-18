import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Archive, ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteOrigin = new URL(PROFILE.links.portfolio).origin;

function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  const primaryUrl = project.archived ? project.archiveUrl : project.liveUrl;

  return (
    <section className="space-y-8 py-8 sm:space-y-10 sm:py-10">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-soft transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <header className="section-frame overflow-hidden">
        <div className="relative border-b border-white/10">
          {project.cover ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              priority
              className="aspect-[16/8] w-full object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="aspect-[16/8] w-full bg-[linear-gradient(145deg,rgba(91,124,255,0.22),rgba(139,109,255,0.08),rgba(53,214,164,0.08))]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(6,8,22,0.18)_48%,rgba(6,8,22,0.88)_100%)]" />
          <div className="absolute left-5 right-5 top-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-[rgba(7,10,22,0.72)] px-3 py-1 text-xs font-medium text-soft">
              {project.context}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${project.archived ? "bg-white/12 text-white" : "bg-brand/18 text-brand-glow"}`}
            >
              {project.status}
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-sm uppercase tracking-[0.24em] text-soft">
              {project.role}
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-soft sm:text-lg">
              {project.summary}
            </p>
          </div>
        </div>

        <div className="grid gap-8 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="pill-label">Case study overview</p>
              <p className="text-base leading-8 text-muted">
                {project.caseStudy}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-white">
                What I focused on
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-soft"
                  >
                    <span className="mt-[0.85rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-glow" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.gallery?.length ? (
              <div className="space-y-4">
                <h2 className="font-heading text-2xl font-semibold text-white">
                  Gallery
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {project.gallery.map((item) => (
                    <div
                      key={item.src}
                      className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.03]"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        className="h-full w-full object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="pill-label">Project details</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-muted">Timeline</dt>
                  <dd className="mt-1 text-white">{project.timeline}</dd>
                </div>
                <div>
                  <dt className="text-muted">Role</dt>
                  <dd className="mt-1 text-white">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-muted">Context</dt>
                  <dd className="mt-1 text-white">{project.context}</dd>
                </div>
                {project.employer ? (
                  <div>
                    <dt className="text-muted">Employer / Context</dt>
                    <dd className="mt-1 text-white">{project.employer}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            {project.metrics?.length ? (
              <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5">
                <p className="pill-label">Signal</p>
                <div className="mt-5 grid gap-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                    >
                      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-sm font-medium text-white">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="pill-label">Stack</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="pill-label">Links</p>
              <div className="mt-5 flex flex-col gap-3 text-sm font-medium">
                {primaryUrl ? (
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-white transition hover:border-brand/30"
                  >
                    <span>{project.primaryCtaLabel}</span>
                    {project.archived ? (
                      <Archive className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-white transition hover:border-brand/30"
                  >
                    <span>Repository</span>
                    <Github className="h-4 w-4" />
                  </a>
                ) : null}
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-white transition hover:border-brand/30"
                >
                  <span>Discuss this type of work</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </header>
    </section>
  );
}
