import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { CredentialsSection } from "@/components/home/credentials-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { FounderSection } from "@/components/home/founder-section";
// import { HeroSection } from "@/components/home/hero-section"; // replaced on this branch
import { StoryHero } from "@/components/story/StoryHero";
import { StoryProjectCTA } from "@/components/story/StoryProjectCTA";
import { ProjectsSection } from "@/components/home/projects-section";
import { SkillsSection } from "@/components/home/skills-section";
import { PROFILE } from "@/data/profile";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${PROFILE.links.portfolio}#person`,
  name: PROFILE.person.name,
  alternateName: "Abdelrahman Mohamed",
  jobTitle: PROFILE.person.role,
  description: PROFILE.person.summary,
  url: PROFILE.links.portfolio,
  image: `${PROFILE.links.portfolio}/profile-image.jpg`,
  email: PROFILE.socials.email,
  telephone: PROFILE.person.phone,
  nationality: PROFILE.person.nationality,
  knowsLanguage: PROFILE.person.languages,
  sameAs: [
    PROFILE.socials.linkedin,
    PROFILE.socials.github,
    PROFILE.socials.instagram,
    "https://kolaytec.com",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${PROFILE.links.portfolio}#website`,
  name: `${PROFILE.person.name} Portfolio`,
  url: PROFILE.links.portfolio,
  description: PROFILE.person.summary,
  publisher: {
    "@id": `${PROFILE.links.portfolio}#person`,
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${PROFILE.links.portfolio}#profile-page`,
  name: "Abdo Essam Software Engineer Portfolio",
  url: PROFILE.links.portfolio,
  description: PROFILE.person.summary,
  mainEntity: {
    "@id": `${PROFILE.links.portfolio}#person`,
  },
  isPartOf: {
    "@id": `${PROFILE.links.portfolio}#website`,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema, profilePageSchema]),
        }}
      />

      <div className="space-y-14 sm:space-y-24 lg:space-y-28">
        <StoryHero />
        <div className="deferred-section">
          <div className="section-divider" />
          <FounderSection />
        </div>
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
          <StoryProjectCTA />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <ContactSection />
        </div>
      </div>
    </>
  );
}
