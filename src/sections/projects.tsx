"use client";

import * as React from "react";
import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";
import ProjectCard from "../components/cards/ProjectCard";
import { loadContent } from "../lib/content";
import { FadeIn } from "../components/motion/fade-in";
import { getProjects, mapStrapiProjects } from "../lib/api";

export default function Projects() {
  const content = loadContent();
  const [cmsProjects, setCmsProjects] = React.useState<typeof content.projects | null>(null);
  React.useEffect(() => {
    (async () => {
      try {
        const raw = await getProjects();
        if (raw) setCmsProjects(mapStrapiProjects(raw));
      } catch {}
    })();
  }, []);
  const projects = cmsProjects ?? content.projects;
  return (
        <section id="projects" className="py-20">
            <Container>
                <FadeIn>
                  <SectionTitle>Projects</SectionTitle>
                </FadeIn>
                <div className="grid sm:grid-cols-2 gap-6">
                  {projects.map((p, i) => (
                    <FadeIn key={p.title} delay={i * 0.05}>
                      <ProjectCard imageUrl={p.imageUrl} title={p.title} description={p.description} tech={p.tech} liveUrl={p.liveUrl} repoUrl={p.repoUrl} />
                    </FadeIn>
                  ))}
                </div>
            </Container>
        </section>
    );
}


