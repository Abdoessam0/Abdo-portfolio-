// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/data/projects";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-ink">{project.title}</h1>
          <p className="text-xl text-muted">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-canvas transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <ExternalLink size={16} />
                Live demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-accent"
              >
                <Github size={16} />
                Source code
              </a>
            )}
          </div>
        </div>

        {project.image ? (
          <div className="mb-8 overflow-hidden rounded-2xl border border-outline">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              className="h-auto w-full"
              placeholder={project.image.blurDataURL ? "blur" : "empty"}
              blurDataURL={project.image.blurDataURL}
            />
          </div>
        ) : null}

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-ink">Overview</h2>
              <p className="text-ink/90">{project.longDescription ?? project.description}</p>
            </section>

            {project.highlights.length ? (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-ink">Key features</h2>
                <ul className="space-y-3">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                      <span className="text-ink/90">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.screenshots?.length ? (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-ink">Screenshots</h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.screenshots.map((shot) => (
                    <div key={shot.src} className="overflow-hidden rounded-lg border border-outline">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        className="h-auto w-full"
                        placeholder={shot.blurDataURL ? "blur" : "empty"}
                        blurDataURL={shot.blurDataURL}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-outline bg-panel/80 p-5">
              <h3 className="mb-4 text-lg font-semibold text-ink">Tech stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-outline bg-surface/50 px-3 py-1.5 text-sm font-medium text-ink/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-outline bg-panel/80 p-5">
              <h3 className="mb-4 text-lg font-semibold text-ink">Project details</h3>
              <dl className="space-y-3">
                {project.role ? (
                  <div>
                    <dt className="text-sm text-muted">Role</dt>
                    <dd className="font-medium text-ink">{project.role}</dd>
                  </div>
                ) : null}
                {project.timeline ? (
                  <div>
                    <dt className="text-sm text-muted">Timeline</dt>
                    <dd className="font-medium text-ink">{project.timeline}</dd>
                  </div>
                ) : null}
                {project.status ? (
                  <div>
                    <dt className="text-sm text-muted">Status</dt>
                    <dd className="font-medium text-ink">{project.status}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <div className="rounded-2xl border border-outline bg-panel/80 p-5">
              <h3 className="mb-4 text-lg font-semibold text-ink">Links</h3>
              <div className="space-y-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
                  >
                    <ExternalLink size={16} />
                    Live website
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
                  >
                    <Github size={16} />
                    GitHub repository
                  </a>
                ) : null}
                {project.certificateUrl ? (
                  <a
                    href={project.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
                  >
                    <ExternalLink size={16} />
                    View certificate
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
