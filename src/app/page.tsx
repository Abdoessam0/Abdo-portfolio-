import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";
import { CERTIFICATES } from "@/data/certificates";
import { VOLUNTEERING } from "@/data/volunteering";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";
import CertificateGallery from "@/components/CertificateGallery";
import TechStackSection from "@/components/TechStackSection"; // Make sure this is correct

export const dynamic = "force-dynamic";
export const revalidate = 0;

const education = [
  { title: "BSc in Computer Engineering", place: "Atatürk University, Türkiye", period: "Sep 2021 – Jun 2026" },
  { title: "Full-Stack Software Engineer Diploma", place: "ALX, Remote", period: "Oct 2023 – Nov 2024" },
];

const stats = [
  { label: "YEARS OF CODING", value: "4+", helper: "Academic + production work" },
  { label: "TECHNOLOGIES", value: "10+", helper: "Across frontend, backend & DevOps" },
  { label: "PRODUCTION PROJECTS", value: "6+", helper: "Web, dashboards & internal tools" },
  { label: "LANGUAGES", value: "3", helper: "Arabic, English, Turkish" },
];

export default function HomePage() {
  const heroImage = PROFILE.heroImage;

  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Hero Section - Keeping your current layout */}
      <section id="hero" className="py-8 sm:py-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-ink sm:text-5xl">
                Hello, I am <span className="text-accent">Abdelrahman Mohamed</span>
              </h1>
              <p className="text-lg text-muted max-w-2xl">
                Full-Stack Computer Engineering graduate building responsive, high-performance web applications with modern technologies.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-canvas shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                View Projects
                <ArrowRight size={16} />
              </Link>
              <Link
                href={PROFILE.links.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-accent hover:-translate-y-0.5"
              >
                <Download size={16} />
                Download CV
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-outline bg-panel/50 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{stat.label}</p>
                  <p className="text-2xl font-bold text-ink mt-1">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.helper}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 to-accent/10 blur-2xl" />
              
              <div className="relative rounded-full border-2 border-accent/30 p-3 shadow-2xl group">
                <div className="relative overflow-hidden rounded-full">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    width={heroImage.width}
                    height={heroImage.height}
                    priority
                    className="w-full h-auto rounded-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute inset-0 rounded-full border-2 border-transparent transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_40px_rgba(78,241,157,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="space-y-8">
        <SectionHeading 
          eyebrow="About" 
          title="Who I am" 
          description="Full-stack computer engineering graduate focused on reliable, modern experiences."
        />
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Bio Card */}
          <div className="lg:col-span-2 rounded-3xl border border-outline bg-panel/80 p-6 space-y-4">
            <p className="text-ink/90">
              I build responsive, high-performance web apps using Next.js 14/15, React, and TypeScript with a focus on clean,
              maintainable code and modern UI/UX. On the back end I work with Node.js and Java (Spring Boot), pairing RESTful
              APIs with reliable database design across PostgreSQL, MongoDB, MySQL, and SQL Server.
            </p>
            <p className="text-ink/90">
              I use Context API, React Query, and Redux Toolkit for predictable state management, and I keep delivery steady with
              Supabase, Vercel, cPanel, Docker basics, and CI/CD. I value accessibility, performance, and user-centered design.
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-outline bg-panel/80 p-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">Location</p>
                  <p className="font-medium text-ink">{PROFILE.person.location}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Languages</p>
                <p className="font-medium text-ink">{PROFILE.person.languages.join(", ")}</p>
              </div>
              
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Availability</p>
                <p className="font-medium text-ink">Open for full-time and remote</p>
              </div>
              
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Timezone</p>
                <p className="font-medium text-ink">{PROFILE.person.timezone}</p>
              </div>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-outline bg-panel/80 p-5">
              <p className="text-sm font-semibold text-accent mb-4">Education</p>
              <div className="space-y-4">
                {education.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-outline/50 bg-surface/50 p-4"
                  >
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="text-sm text-muted mt-1">{item.place}</p>
                    <p className="text-xs text-accent mt-1">{item.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Projects Section - Keeping it simple */}
      <section id="projects" className="space-y-8">
        <SectionHeading
          eyebrow="Projects"
          title="Recent work"
          description="State-backed platforms, dashboards, and systems built with the stacks listed in my CV."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.slice(0, 6).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="space-y-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I learned by shipping"
          description="Every role focuses on clean delivery, accessibility, and measurable improvements."
        />
        <div className="space-y-6">
          {EXPERIENCE.map((item) => (
            <ExperienceItem key={item.id} experience={item} />
          ))}
        </div>
      </section>

      {/* Volunteering Section */}
      <section id="volunteering" className="space-y-8">
        <SectionHeading eyebrow="Volunteering" title="Giving back" description="Community, translation, and facilitation experiences." />
        <div className="grid gap-4 md:grid-cols-2">
          {VOLUNTEERING.map((volunteer) => (
            <div key={volunteer.id} className="rounded-2xl border border-outline bg-panel/80 p-5 shadow-card hover:border-accent/30 transition-colors">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{volunteer.period}</p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{volunteer.title}</h3>
              <p className="text-sm text-muted">
                {volunteer.organization} — {volunteer.location}
              </p>
              <p className="mt-3 text-sm text-ink/80">{volunteer.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="space-y-8">
        <SectionHeading
          eyebrow="Certificates"
          title="Certifications"
          description="Verified credentials in technology and language proficiency."
        />
        <CertificateGallery certificates={CERTIFICATES} />
      </section>

      {/* Hire Me Section */}
      <section id="hire-me" className="space-y-8">
        <SectionHeading 
          eyebrow="Let's work together" 
          title="Hire Me" 
          description="Available for full-time and remote opportunities"
        />
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-ink/90">
              I&apos;m currently open to new opportunities and would love to discuss how I can contribute to your team.
              Feel free to reach out via any of the channels below.
            </p>
            
            <div className="space-y-4">
              <a
                href={`https://wa.me/${PROFILE.person.phone.replace(/\D/g, '')}?text=Hi%20Abdelrahman,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect!`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.507 14.307l-.009.075c-2.199-1.096-2.429-1.242-2.713-.816-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.576-.05-.997-.05-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.8 5.114.714.227 1.365.195 1.88.121.574-.091 1.754-.721 2.004-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z"/>
                  <path d="M20.52 3.449C17.823.864 14.037.03 10.48 1.643 3.773 4.705.152 11.754 1.993 18.02L3.36 21.9l3.732-.98c2.546 1.393 5.394 1.99 8.234 1.99h.001c5.66 0 10.728-3.83 12.417-9.304 1.33-4.348-.078-8.905-3.224-11.157zM12 21.39c-2.35 0-4.66-.65-6.66-1.88l-.48-.28-3.76.99.99-3.66-.28-.48c-1.46-2.5-1.41-5.45.14-7.9C4.86 4.97 8.91 2.68 13.28 3.3c4.17.6 7.46 4.07 7.91 8.27.51 4.71-2.73 9.01-7.19 9.82z"/>
                </svg>
                Message me on WhatsApp
              </a>
            </div>
          </div>
          
          <div className="rounded-2xl border border-outline bg-panel/80 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-ink">Contact Information</h3>
            
            <div className="space-y-4">
              <a
                href={`mailto:${PROFILE.socials.email}`}
                className="flex items-center gap-3 text-ink hover:text-accent transition-colors group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-canvas transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <p className="font-medium">{PROFILE.socials.email}</p>
                </div>
              </a>
              
              <a
                href={`tel:${PROFILE.person.phone}`}
                className="flex items-center gap-3 text-ink hover:text-accent transition-colors group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-canvas transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-muted">Phone</p>
                  <p className="font-medium">{PROFILE.person.phone}</p>
                </div>
              </a>
              
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-ink hover:text-accent transition-colors group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-canvas transition-colors">
                  <Linkedin size={18} />
                </div>
                <div>
                  <p className="text-sm text-muted">LinkedIn</p>
                  <p className="font-medium">linkedin.com/in/abdo-mo</p>
                </div>
              </a>
              
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-ink hover:text-accent transition-colors group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-canvas transition-colors">
                  <Github size={18} />
                </div>
                <div>
                  <p className="text-sm text-muted">GitHub</p>
                  <p className="font-medium">github.com/Abdoessam0</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
