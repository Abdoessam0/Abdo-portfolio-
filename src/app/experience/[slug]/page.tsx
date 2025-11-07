import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EXPERIENCE } from "@/data/experience";
import { PROFILE } from "@/data/profile";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

const siteOrigin = new URL(PROFILE.links.portfolio).origin;

const getExperience = (slug: string) => EXPERIENCE.find((item) => item.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return EXPERIENCE.filter((item) => item.slug).map((item) => ({ slug: item.slug as string }));
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) return {};
  const canonical = `${siteOrigin}/experience/${experience.slug}`;

  return {
    title: `${experience.company} - ${experience.role}`,
    description: experience.summary,
    alternates: { canonical },
    openGraph: {
      title: `${experience.company} - ${experience.role}`,
      description: experience.summary,
      url: canonical,
      type: "article",
      images: experience.gallery?.length
        ? [
            {
              url: `${siteOrigin}${experience.gallery[0].src}`,
              width: experience.gallery[0].width,
              height: experience.gallery[0].height,
              alt: experience.gallery[0].alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${experience.company} - ${experience.role}`,
      description: experience.summary,
      images: experience.gallery?.length ? [`${siteOrigin}${experience.gallery[0].src}`] : undefined,
    },
  };
}

const ExperiencePage = async ({ params }: ExperiencePageProps) => {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    notFound();
  }

  return (
    <section className="space-y-10 py-12 sm:py-16">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{experience.period}</p>
        <h1 className="text-3xl font-semibold text-zinc-900 sm:text-4xl">{experience.company}</h1>
        <p className="text-base font-semibold text-zinc-700">
          {experience.role} - {experience.location}
        </p>
        <p className="max-w-3xl text-sm text-zinc-700">{experience.summary}</p>
        {experience.links?.length ? (
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-emerald-800">
            {experience.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      {experience.metrics?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experience.metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{metric.label}</p>
              <p className="text-2xl font-semibold text-zinc-900">{metric.value}</p>
              {metric.helper ? <p className="text-xs text-zinc-600">{metric.helper}</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold text-zinc-900">Impact</h2>
        <ul className="mt-4 space-y-3 text-sm text-zinc-700">
          {experience.impact.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-zinc-700">
          {experience.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-zinc-200 px-3 py-1">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {experience.projects?.length ? (
        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">Projects</p>
            <h2 className="text-2xl font-semibold text-zinc-900">Launch stack</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {experience.projects.map((project) => (
              <article
                key={project.title}
                className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-5 shadow-card"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-zinc-900">{project.title}</h3>
                  <p className="text-sm text-zinc-600">{project.summary}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-zinc-700">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-zinc-200 px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-emerald-800">
                  {project.links.live ? (
                    <Link
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                    >
                      Live
                    </Link>
                  ) : null}
                  {project.links.repo ? (
                    <Link
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                    >
                      Repo
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {experience.gallery?.length ? (
        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">Gallery</p>
            <h2 className="text-2xl font-semibold text-zinc-900">On-site proof</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {experience.gallery.map((media) => (
              <div
                key={media.src}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-card"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={media.width}
                  height={media.height}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/#experience"
          className="inline-flex items-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          Back to experience
        </Link>
        <Link
          href={PROFILE.links.calendly ?? "#contact"}
          className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          Book a call
        </Link>
      </div>
    </section>
  );
};

export default ExperiencePage;
