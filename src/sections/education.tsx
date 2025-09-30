import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { loadContent } from "../lib/content";

export default function Education() {
  const content = loadContent();
    return (
        <section id="education" className="py-20">
            <Container>
                <SectionTitle>Education</SectionTitle>
                <div className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 text-text/90">
          <p className="font-semibold">{content.education.degree}</p>
          <p className="mt-2 text-sm">{content.education.details}</p>
                </div>
            </Container>
        </section>
    );
}


