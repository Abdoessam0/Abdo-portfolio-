import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";

const entries = [
    {
        title: "Remax Wise (Lisbon)",
        role: "Full-Stack, Data & AI Intern",
        summary: "Scrapers/automation & web work.",
    },
    {
        title: "AFAQY (Riyadh)",
        role: "Technical Support Engineer",
        summary: "Managed 650+ fleet units; training; Pro system support.",
    },
    {
        title: "Youth Summer Fest (Timișoara)",
        role: "Facilitator",
        summary: "30-day intercultural event; workshops; logistics.",
    },
    {
        title: "ALX Africa",
        role: "Full-Stack Trainee",
        summary: "React, Node, MongoDB.",
    },
    {
        title: "NFS Soft (Erzurum)",
        role: "WordPress Dev Intern",
        summary: "Custom themes/plugins.",
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-20">
            <Container>
                <SectionTitle>Experience</SectionTitle>
                <ol className="relative border-s border-text/20 ms-4">
                    {entries.map((e) => (
                        <li key={e.title} className="mb-8 ms-4">
                            <div className="absolute w-3 h-3 bg-accent rounded-full -start-1.5 mt-2.5" />
                            <div className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4">
                                <h3 className="text-text font-semibold">{e.title}</h3>
                                <p className="text-text/80 text-sm">{e.role}</p>
                                <p className="mt-1 text-text/80 text-sm">{e.summary}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    );
}


