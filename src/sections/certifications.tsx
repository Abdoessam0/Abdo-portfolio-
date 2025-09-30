import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";

const certs = [
    { title: "ALX Full-Stack Engineer", url: "#" }, // TODO: add certificate URL
    { title: "AFAQY Technical Engineer", url: "#" }, // TODO: add certificate URL
    { title: "English C1 (VTest)", url: "#" }, // TODO: add certificate URL
    { title: "English C1 (Rosetta Stone)", url: "#" }, // TODO: add certificate URL
];

export default function Certifications() {
    return (
        <section id="certifications" className="py-20">
            <Container>
                <SectionTitle>Certifications</SectionTitle>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {certs.map((c) => (
                        <a key={c.title} href={c.url} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 text-text/90 transition-transform hover:scale-105">
                            {c.title}
                        </a>
                    ))}
                </div>
            </Container>
        </section>
    );
}


