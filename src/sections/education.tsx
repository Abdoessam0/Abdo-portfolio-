import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";

export default function Education() {
    return (
        <section id="education" className="py-20">
            <Container>
                <SectionTitle>Education</SectionTitle>
                <div className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 text-text/90">
                    <p className="font-semibold">B.Sc. Computer Engineering, Atatürk University (2021–2025)</p>
                    <p className="mt-2 text-sm">Coursework: DBMS, OOP, Python, DSA, Microcontrollers.</p>
                </div>
            </Container>
        </section>
    );
}


