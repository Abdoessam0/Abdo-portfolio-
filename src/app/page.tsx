import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { CredentialsSection } from "@/components/home/credentials-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { SkillsSection } from "@/components/home/skills-section";
import { PROFILE } from "@/data/profile";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.person.name,
  jobTitle: PROFILE.person.role,
  description: PROFILE.person.summary,
  url: PROFILE.links.portfolio,
  email: PROFILE.socials.email,
  telephone: PROFILE.person.phone,
  nationality: PROFILE.person.nationality,
  knowsLanguage: PROFILE.person.languages,
  sameAs: [PROFILE.socials.linkedin, PROFILE.socials.github],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${PROFILE.person.name} Portfolio`,
  url: PROFILE.links.portfolio,
  description: PROFILE.person.summary,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <div className="space-y-12 sm:space-y-20 lg:space-y-24">
        <HeroSection />
        <div className="deferred-section">
          <div className="section-divider" />
          <ProjectsSection />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <ExperienceSection />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <AboutSection />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <SkillsSection />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <CredentialsSection />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <ContactSection />
        </div>
      </div>
    </>
  );
}
