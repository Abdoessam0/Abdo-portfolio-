import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/data/experience";

type ExperienceItemProps = {
  experience: Experience;
};

const formatPeriod = (value: string) => {
  if (value.toLowerCase() === "present") return "Present";
  const [year, month] = value.split("-").map((part) => Number(part));
  const formatter = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });
  return formatter.format(new Date(year, month - 1));
};

const ExperienceItem = ({ experience }: ExperienceItemProps) => {
  const computedTimeline = `${formatPeriod(experience.start)} - ${
    experience.end.toLowerCase() === "present" ? "Present" : formatPeriod(experience.end)
  }`;
  const timeline = experience.period || computedTimeline;
  const galleryItems =
    experience.gallery?.filter(
      (item, index, collection) => collection.findIndex((media) => media.src === item.src) === index
    ) ?? [];
  const detailHref = experience.slug ? `/experience/${experience.slug}` : undefined;

  return (
    <article className="relative pl-10">
      <span className="absolute left-4 top-1 h-full w-[2px] bg-gradient-to-b from-accent to-transparent" aria-hidden="true" />
      <span className="absolute left-[7px] top-2 block h-3 w-3 rounded-full bg-accent shadow-[0_0_0_8px_rgba(78,241,157,0.15)]" aria-hidden="true" />
      <div className="rounded-3xl border border-outline bg-panel/80 p-6 shadow-card">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{timeline}</p>
          <h3 className="text-xl font-semibold text-ink">{experience.role}</h3>
          <p className="text-sm text-muted">
            {experience.company} — {experience.location}
          </p>
        </div>
        <p className="mt-4 text-sm text-ink/80">{experience.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-ink/90">
          {experience.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-outline px-3 py-1 text-muted">
              {tech}
            </span>
          ))}
        </div>
        <ul className="mt-5 space-y-2 text-sm text-ink/80">
          {experience.impact.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold">
          {experience.links?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-accent/50 px-3 py-1 text-accent underline-offset-4 hover:border-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {link.label}
            </Link>
          ))}
          {detailHref ? (
            <Link
              href={detailHref}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-canvas shadow-soft transition hover:shadow-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View details
            </Link>
          ) : null}
        </div>
        {galleryItems.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {galleryItems.map((media) => (
              <div key={media.src} className="overflow-hidden rounded-2xl border border-outline/70">
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
        ) : null}
      </div>
    </article>
  );
};

export default ExperienceItem;
