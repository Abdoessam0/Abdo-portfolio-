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
  const companyNode = experience.slug ? (
    <Link
      href={`/experience/${experience.slug}`}
      className="font-semibold text-zinc-900 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
      aria-label={`Open detailed view for ${experience.company}`}
    >
      {experience.company}
    </Link>
  ) : (
    <span className="font-semibold text-zinc-900">{experience.company}</span>
  );

  return (
    <article className="relative pl-8">
      <span className="absolute left-0 top-1 h-full w-0.5 bg-gradient-to-b from-zinc-300 to-transparent" aria-hidden="true" />
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{timeline}</p>
          <h3 className="text-xl font-semibold text-zinc-900">{experience.role}</h3>
          <p className="text-sm text-zinc-600">
            {companyNode} - {experience.location}
          </p>
        </div>
        <p className="mt-4 text-sm text-zinc-700">{experience.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-zinc-700">
          {experience.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-zinc-200 px-3 py-1">
              {tech}
            </span>
          ))}
        </div>
        <ul className="mt-5 space-y-2 text-sm text-zinc-700">
          {experience.impact.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-zinc-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {experience.links?.length ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {experience.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
        {galleryItems.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {galleryItems.map((media) => (
              <div key={media.src} className="overflow-hidden rounded-2xl border border-zinc-100">
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
