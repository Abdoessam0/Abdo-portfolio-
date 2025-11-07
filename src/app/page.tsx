import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";
import { CERTIFICATES } from "@/data/certificates";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";
import CertificateGallery from "@/components/CertificateGallery";
import TechPanel from "@/components/TechPanel";
import ContactForm from "@/components/ContactForm";

export function generateMetadata(): Metadata {
  return {
    title: `${PROFILE.person.name} | ${PROFILE.person.role}`,
    description: PROFILE.person.summary,
    alternates: {
      canonical: PROFILE.links.portfolio,
    },
  };
}

const HomePage = () => {
  const heroImage = PROFILE.heroImage;
  return (
    <div className="space-y-20 sm:space-y-24">
      <section id="hero" className="py-6">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{PROFILE.person.tagline}</p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">{PROFILE.person.name}</h1>
              <p className="max-w-2xl text-base text-zinc-700">{PROFILE.person.summary}</p>
              <ul className="space-y-2 text-sm text-zinc-700">
                {PROFILE.hero.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              {PROFILE.hero.ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  aria-label={cta.ariaLabel}
                  className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold ${
                    cta.label.toLowerCase().includes("work")
                      ? "bg-zinc-900 text-white hover:bg-zinc-800"
                      : "border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-900"
                  } transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900`}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
            <div className="grid gap-4 rounded-3xl border border-zinc-200 bg-white/80 p-4 shadow-card sm:grid-cols-2">
              {PROFILE.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{metric.label}</p>
                  <p className="text-2xl font-semibold text-zinc-900">{metric.value}</p>
                  {metric.helper ? <p className="text-xs text-zinc-600">{metric.helper}</p> : null}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-b from-emerald-100/90 to-transparent blur-3xl" aria-hidden="true" />
            <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-4 shadow-card">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width}
                height={heroImage.height}
                priority
                placeholder="blur"
                blurDataURL={heroImage.blurDataURL}
                className="w-full rounded-[2rem] bg-zinc-50 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="space-y-8">
        <SectionHeading eyebrow="About" title="Calm delivery across web and mobile" description="Türkiye-based engineer building trustworthy systems for marketing, ops, and product teams." />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-card lg:col-span-2">
            <p className="text-sm text-zinc-700">
              I build from Türkiye while shipping experiences for RE/MAX Portugal, AFAQY fleet teams, and global cohorts like ALX Africa. My work spans design systems, offline-ready React Native apps, and Java services that stay observable.
            </p>
            <p className="mt-4 text-sm text-zinc-700">
              Day to day that means partnering closely with marketing, operations, and founders to map the real constraints, then building reliable interfaces that stay fast on any device. I obsess over clarity, accessible motion, and content systems that teams can actually reuse.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-card">
            <dl className="space-y-4 text-sm text-zinc-700">
              <div>
                <dt className="font-semibold text-zinc-900">Location</dt>
                <dd>{PROFILE.person.location}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900">Timezone</dt>
                <dd>{PROFILE.person.timezone}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900">Languages</dt>
                <dd>{PROFILE.person.languages.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900">Relocation</dt>
                <dd>{PROFILE.person.relocation}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900">Availability</dt>
                <dd>{PROFILE.person.availability}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="skills" className="space-y-8">
        <SectionHeading eyebrow="Skills" title="Full-stack range with product empathy" description="Typed React systems, native-feeling mobile apps, observability, and ops-friendly workflows." />
        <div className="grid gap-4 md:grid-cols-2">
          {PROFILE.skills.map((group) => (
            <div key={group.title} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-card">
              <p className="text-sm font-semibold text-zinc-900">{group.title}</p>
              <ul className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-zinc-700">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-zinc-200 px-3 py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <p className="text-sm font-semibold text-zinc-900">Deep dives</p>
          <div className="grid gap-4 lg:grid-cols-3">
            {PROFILE.techPanels.map((panel) => (
              <TechPanel key={panel.id} panel={panel} />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="space-y-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected shipping stories"
          description="Compact cards you can tap to open live experiences or repositories. Each one is tracked for performance and QA."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <p className="text-sm text-zinc-600">
          Need more?{" "}
          <Link href="#contact" className="font-semibold text-emerald-800 underline-offset-4 hover:underline">
            Ask for the private backlog
          </Link>
          .
        </p>
      </section>

      <section id="experience" className="space-y-8">
        <SectionHeading
          eyebrow="Experience"
          title="Proof across teams"
          description="Every engagement pairs calm rituals with measurable impact and gallery evidence."
        />
        <div className="space-y-10">
          {EXPERIENCE.map((item) => (
            <ExperienceItem key={item.id} experience={item} />
          ))}
        </div>
      </section>

      <section id="certificates" className="space-y-8">
        <SectionHeading
          eyebrow="Certificates"
          title="Verified learning"
          description="Tap a certificate to view issuer details, core skills, and credential links."
        />
        <CertificateGallery certificates={CERTIFICATES} />
      </section>

      <section id="contact" className="space-y-8">
        <SectionHeading eyebrow="Contact" title="Let us build something reliable" description={PROFILE.contact.availability} />
        <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-card">
            <ContactForm />
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-card">
            <p className="text-sm text-zinc-700">{PROFILE.contact.locationNote}</p>
            <ul className="mt-4 space-y-3 text-sm text-zinc-700">
              {PROFILE.contact.channels.map((channel) => {
                const isExternal = channel.href.startsWith("http");
                return (
                  <li key={channel.label}>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{channel.label}</p>
                    <a
                      href={channel.href}
                      aria-label={channel.ariaLabel}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="text-base font-semibold text-zinc-900 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                    >
                      {channel.value}
                    </a>
                  </li>
                );
              })}
            </ul>
            {PROFILE.links.calendly ? (
              <Link
                href={PROFILE.links.calendly}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 hover:border-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              >
                Book a call
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
