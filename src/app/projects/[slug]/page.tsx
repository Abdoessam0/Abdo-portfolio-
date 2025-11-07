import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const siteOrigin = new URL(PROFILE.links.portfolio).origin;

const getProject = (slug: string) => PROJECTS.find((project) => project.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const canonical = `${siteOrigin}/projects/${project.slug}`;
  const title = `${project.title} - ${PROFILE.person.name}`;

  return {
    title,
    description: project.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: project.description,
      url: canonical,
      type: "article",
      images: [
        {
          url: `${siteOrigin}${project.hero.src}`,
          width: project.hero.width,
          height: project.hero.height,
          alt: project.hero.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [`${siteOrigin}${project.hero.src}`],
    },
  };
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const links = [
    project.links.live
      ? { label: "View live", href: project.links.live, aria: `Open ${project.title} live site` }
      : null,
    project.links.repo
      ? { label: "View repository", href: project.links.repo, aria: `Open ${project.title} repository` }
      : null,
  ].filter(Boolean) as { label: string; href: string; aria: string }[];

  return (
    <article className="space-y-10 py-12 sm:py-16">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{project.period}</p>
        <h1 className="text-3xl font-semibold text-zinc-900 sm:text-4xl">{project.title}</h1>
        <p className="text-base text-zinc-600">{project.summary}</p>
      </header>

      <div className="flex flex-wrap gap-2 text-xs font-semibold text-zinc-700">
        {project.stack.map((item) => (
          <span key={item} className="rounded-full border border-zinc-200 px-3 py-1">
            {item}
          </span>
        ))}
        {project.badges.map((badge) => (
          <span key={badge} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800">
            {badge}
          </span>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-card">
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          width={project.hero.width}
          height={project.hero.height}
          className="w-full object-cover"
          priority
          placeholder="blur"
          blurDataURL={project.hero.blurDataURL}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.aria}
            className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/#projects"
          className="inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          Back to projects
        </Link>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-card">
          <h2 className="text-lg font-semibold text-zinc-900">The challenge</h2>
          <p className="mt-3 text-sm text-zinc-700">{project.problem}</p>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-card">
          <h2 className="text-lg font-semibold text-zinc-900">Key metrics</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{metric.label}</p>
                <p className="text-xl font-semibold text-zinc-900">{metric.value}</p>
                {metric.helper ? <p className="text-xs text-zinc-600">{metric.helper}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold text-zinc-900">Outcomes</h2>
        <ul className="mt-4 space-y-3 text-sm text-zinc-700">
          {project.outcomes.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {project.gallery.length ? (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">Gallery</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((media) => (
              <div key={media.src} className="overflow-hidden rounded-3xl border border-zinc-200 shadow-soft">
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={media.width}
                  height={media.height}
                  className="w-full object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
};

export default ProjectPage;
