import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { loadContent } from "../lib/content";
import { FadeIn } from "../components/motion/fade-in";

export default function Skills() {
  const content = loadContent();
  return (
    <section id="skills" className="py-20">
      <Container>
        <FadeIn>
          <SectionTitle>Skills</SectionTitle>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-6">
          {content.skills.map((cat, i) => (
            <FadeIn key={cat.title} className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4" transition={{ delay: i * 0.05 }}>
              <h3 className="text-text font-semibold">{cat.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="text-xs px-2 py-1 rounded-md bg-text/10 text-text/90 transition-transform hover:scale-105">
                    {item}
                  </span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}


