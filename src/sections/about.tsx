import Image from "next/image";
import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { loadContent } from "../lib/content";

export default function About() {
  const content = loadContent();
  return (
    <section id="about" className="py-20">
      <Container>
        <SectionTitle>About</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-text/10">
            {/* TODO: replace with a real portrait */}
            <Image src={content.profileImage} alt="Abdelrahman" fill className="object-cover" />
          </div>
          <div className="space-y-4 text-text/90">
            <p>{content.about.location}</p>
            <p>{content.about.languages}</p>
            <p>{content.about.narrative1}</p>
            <p>{content.about.narrative2}</p>
            <a href={content.cvUrl} className="inline-flex items-center rounded-lg px-5 py-3 bg-accent text-bg shadow-glass hover:opacity-90">Download CV</a>
          </div>
        </div>
      </Container>
    </section>
  );
}


