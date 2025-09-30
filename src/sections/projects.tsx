import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";
import ProjectCard from "../components/cards/ProjectCard";
import { loadContent } from "../lib/content";

export default function Projects() {
  const content = loadContent();
    return (
        <section id="projects" className="py-20">
            <Container>
                <SectionTitle>Projects</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-6">
          {content.projects.map((p) => (
            <ProjectCard key={p.title} imageUrl={p.imageUrl} title={p.title} description={p.description} tech={p.tech} liveUrl={p.liveUrl} repoUrl={p.repoUrl} />
                    ))}
                </div>
            </Container>
        </section>
    );
}


