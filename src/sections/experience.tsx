"use client";

import * as React from "react";
import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { loadContent } from "../lib/content";
import { FadeIn } from "../components/motion/fade-in";
import { getExperiences, mapStrapiExperiences } from "../lib/api";

export default function Experience() {
  const content = loadContent();
  const [cmsExp, setCmsExp] = React.useState<typeof content.experience | null>(null);
  React.useEffect(() => {
    (async () => {
      try {
        const raw = await getExperiences();
        if (raw) setCmsExp(mapStrapiExperiences(raw));
      } catch {}
    })();
  }, []);
  const experience = cmsExp ?? content.experience;
  return (
        <section id="experience" className="py-20">
            <Container>
                <FadeIn>
                  <SectionTitle>Experience</SectionTitle>
                </FadeIn>
                <ol className="relative border-s border-text/20 ms-4">
                  {experience.map((e, i) => (
                    <li key={e.title} className="mb-8 ms-4">
                      <FadeIn delay={i * 0.05}>
                        <div className="absolute w-3 h-3 bg-accent rounded-full -start-1.5 mt-2.5" />
                        <div className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4">
                          <h3 className="text-text font-semibold">{e.title}</h3>
                          <p className="text-text/80 text-sm">{e.role}</p>
                          <p className="mt-1 text-text/80 text-sm">{e.summary}</p>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ol>
            </Container>
        </section>
    );
}


