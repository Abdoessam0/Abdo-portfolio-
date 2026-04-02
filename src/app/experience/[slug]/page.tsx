import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { CompactMediaGallery } from "@/components/ui/compact-media-gallery";
import { EXPERIENCE } from "@/data/experience";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

const siteOrigin = new URL(PROFILE.links.portfolio).origin;

function getExperience(slug: string) {
  return EXPERIENCE.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return EXPERIENCE.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) return {};

  const canonical = `${siteOrigin}/experience/${experience.slug}`;
  const image = experience.gallery?.[0]
    ? `${siteOrigin}${experience.gallery[0].src}`
    : `${siteOrigin}/opengraph-image`;

  return {
    title: `${experience.company} - ${experience.role}`,
    description: experience.summary,
    alternates: { canonical },
    openGraph: {
      title: `${experience.company} - ${experience.role}`,
      description: experience.summary,
      url: canonical,
      type: "article",
      images: [
        { url: image, width: 1200, height: 630, alt: experience.company },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${experience.company} - ${experience.role}`,
      description: experience.summary,
      images: [image],
    },
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    notFound();
  }

  const gallery = experience.gallery ?? [];
  const primaryDocument = experience.documents?.find((document) =>
    document.href.toLowerCase().endsWith(".pdf"),
  );
  const relatedProjects = PROJECTS.filter((project) =>
    experience.projectSlugs?.includes(project.slug),
  );

  return (
    <section className="space-y-6 py-6 sm:space-y-8 sm:py-10">
      <Link
        href="/#experience"
        className="inline-flex items-center gap-2 text-sm text-soft transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to experience
      </Link>

      <article className="section-frame p-4 sm:p-6 lg:p-7">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill-label">{experience.period}</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-soft">
                {experience.location}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-muted">
                {experience.company}
              </p>
              <h1 className="font-heading text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                {experience.role}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-soft sm:text-base">
                {experience.summary}
              </p>
            </div>

            {experience.metrics?.length ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {experience.metrics.map((metric) => (
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
                    {metric.helper ? (
                      <p className="mt-1 text-xs text-muted">{metric.helper}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="space-y-3">
              <h2 className="font-heading text-2xl font-semibold text-white">
                What I worked on
              </h2>
              <ul className="grid gap-3">
                {experience.impact.map((item) => (
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

            <div className="space-y-3">
              <h2 className="font-heading text-2xl font-semibold text-white">
                Tools and work
              </h2>
              <div className="flex flex-wrap gap-2">
                {experience.stack.map((item) => (
                  <span key={item} className="tech-badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {relatedProjects.length ? (
              <div className="space-y-3">
                <h2 className="font-heading text-2xl font-semibold text-white">
                  Related projects
                </h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {relatedProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4 transition hover:border-brand/30"
                    >
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                        {project.context}
                      </p>
                      <p className="mt-2 text-base font-medium text-white">
                        {project.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {project.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="space-y-4">
            <CompactMediaGallery
              items={gallery}
              imageSizes="(min-width: 1280px) 34vw, (min-width: 1024px) 40vw, 92vw"
              priority
            />

            {experience.documents?.length ? (
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <p className="pill-label">Documents</p>
                <p className="mt-4 text-sm leading-6 text-muted">
                  Files from this role.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.documents.map((document) => (
                    <a
                      key={document.href}
                      href={document.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-soft transition hover:border-brand/30 hover:text-white"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      {document.label}
                    </a>
                  ))}
                </div>

                {primaryDocument ? (
                  <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-white/10 bg-white">
                    <iframe
                      title={`${experience.company} document preview`}
                      src={`${primaryDocument.href}#view=FitH`}
                      loading="lazy"
                      className="h-[20rem] w-full sm:h-[24rem] md:h-[30rem]"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
              <p className="pill-label">Links</p>
              <div className="mt-4 flex flex-col gap-3 text-sm font-medium">
                {experience.links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-white transition hover:border-brand/30"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
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
