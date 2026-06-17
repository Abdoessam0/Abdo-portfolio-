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
import { getPublicPortfolioData } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const portfolio = await getPublicPortfolioData();
  const profileSettings = portfolio.profileSettings;
  const personName = profileSettings.name || PROFILE.person.name;
  const personDescription = profileSettings.headline || PROFILE.person.summary;
  const personEmail = profileSettings.email || PROFILE.socials.email;
  const linkedinUrl = profileSettings.linkedinUrl || PROFILE.socials.linkedin;
  const githubUrl = profileSettings.githubUrl || PROFILE.socials.github;
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${PROFILE.links.portfolio}#person`,
    name: personName,
    alternateName: "Abdelrahman Mohamed",
    jobTitle: PROFILE.person.role,
    description: personDescription,
    url: PROFILE.links.portfolio,
    image: `${PROFILE.links.portfolio}/profile-image.jpg`,
    email: personEmail,
    telephone: PROFILE.person.phone,
    nationality: PROFILE.person.nationality,
    knowsLanguage: PROFILE.person.languages,
    sameAs: [linkedinUrl, githubUrl, PROFILE.socials.instagram, "https://kolaytec.com"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${PROFILE.links.portfolio}#website`,
    name: `${personName} Portfolio`,
    url: PROFILE.links.portfolio,
    description: personDescription,
    publisher: {
      "@id": `${PROFILE.links.portfolio}#person`,
    },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${PROFILE.links.portfolio}#profile-page`,
    name: `${personName} Software Engineer Portfolio`,
    url: PROFILE.links.portfolio,
    description: personDescription,
    mainEntity: {
      "@id": `${PROFILE.links.portfolio}#person`,
    },
    isPartOf: {
      "@id": `${PROFILE.links.portfolio}#website`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema, profilePageSchema]),
        }}
      />

      <div className="space-y-14 sm:space-y-24 lg:space-y-28">
        <StoryHero profileSettings={profileSettings} />
        <div className="deferred-section">
          <div className="section-divider" />
          <ExperienceSection experience={portfolio.experience} projects={portfolio.projects} />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <FounderSection />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <ProjectsSection projects={portfolio.projects} />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <AboutSection education={portfolio.education} profileSettings={profileSettings} />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <SkillsSection skills={portfolio.skills} />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <CredentialsSection certificates={portfolio.certificates} education={portfolio.education} />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <StoryProjectCTA />
        </div>
        <div className="deferred-section">
          <div className="section-divider" />
          <ContactSection profileSettings={profileSettings} />
        </div>
      </div>
    </>
  );
}
