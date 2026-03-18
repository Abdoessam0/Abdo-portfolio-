import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  const relatedProjects = PROJECTS.filter((project) =>
    experience.projectSlugs?.includes(project.slug),
  );

  return (
    <section className="space-y-8 py-8 sm:space-y-10 sm:py-10">
      <Link
        href="/#experience"
        className="inline-flex items-center gap-2 text-sm text-soft transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to experience
      </Link>

      <header className="section-frame overflow-hidden p-6 sm:p-8">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="pill-label">{experience.period}</p>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-soft">
                  {experience.company}
                </p>
                <h1 className="mt-3 font-heading text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                  {experience.role}
                </h1>
                <p className="mt-3 text-base leading-8 text-soft">
                  {experience.location}
                </p>
              </div>
              <p className="max-w-3xl text-base leading-8 text-muted">
                {experience.summary}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {experience.metrics?.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.45rem] border border-white/8 bg-white/[0.03] px-4 py-4"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-sm font-medium text-white">
                    {metric.value}
                  </p>
                  {metric.helper ? (
                    <p className="mt-2 text-xs text-muted">{metric.helper}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-white">
                What I did
              </h2>
              <ul className="space-y-3">
                {experience.impact.map((item) => (
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

            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-white">
                Stack and focus
              </h2>
              <div className="flex flex-wrap gap-2">
                {experience.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {relatedProjects.length ? (
              <div className="space-y-4">
                <h2 className="font-heading text-2xl font-semibold text-white">
                  Related projects
                </h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {relatedProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="rounded-[1.45rem] border border-white/8 bg-white/[0.03] p-4 transition hover:border-brand/30"
                    >
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                        {project.context}
                      </p>
                      <p className="mt-3 text-base font-medium text-white">
                        {project.title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        {project.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            {experience.gallery?.map((item) => (
              <div
                key={item.src}
                className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1280px) 34vw, 100vw"
                />
              </div>
            ))}

            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(91,124,255,0.12),rgba(139,109,255,0.05),rgba(53,214,164,0.05))] p-5">
              <p className="pill-label">Next step</p>
              <p className="mt-4 text-sm leading-7 text-soft">
                This role reflects the kind of work I am looking to deepen:
                product-facing engineering with strong UI quality, reliable
                systems thinking, and real business responsibility.
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm font-medium">
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
          </div>
        </div>
      </header>
    </section>
  );
}
