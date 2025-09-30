import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";
import ProjectCard from "../components/cards/ProjectCard";

const projects = [
    {
        title: "Algarve Real Estate",
        description:
            "Property search with responsive UI and animated filtering.",
        tech: ["Next.js", "Tailwind", "Supabase", "Prisma", "Vercel"],
    },
    {
        title: "ALX Training Builds",
        description: "Reusable components and best practices.",
        tech: ["React", "Node", "MongoDB"],
    },
    {
        title: "NFS Soft WordPress Intern",
        description: "Custom themes and plugins.",
        tech: ["WordPress", "PHP", "CSS"],
    },
    {
        title: "Data & AI",
        description: "Scrapers, dashboards, and AI-assisted automation.",
        tech: ["Python", "SQL", "Power BI", "Selenium"],
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-20">
            <Container>
                <SectionTitle>Projects</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-6">
                    {projects.map((p) => (
                        <ProjectCard key={p.title} title={p.title} description={p.description} tech={p.tech} />
                    ))}
                </div>
            </Container>
        </section>
    );
}


