import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { loadContent } from "../lib/content";

export default function Volunteering() {
  const content = loadContent();
    return (
        <section id="volunteering" className="py-20">
            <Container>
                <SectionTitle>Volunteering</SectionTitle>
                <div className="grid md:grid-cols-3 gap-6">
          {content.volunteering.map((t) => (
                        <div key={t} className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 text-text/90">
                            {t}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}


