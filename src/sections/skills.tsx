import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";

const categories: { title: string; items: string[] }[] = [
  {
    title: "Programming",
    items: [
      "JS",
      "TS",
      "Python",
      "Java",
      "C++",
      "C#",
      "Dart",
      "PHP",
      "HTML/CSS",
      "SQL",
    ],
  },
  {
    title: "Frameworks & Tools",
    items: [
      "React",
      "Node",
      "Flutter",
      "Next.js",
      "Express",
      "WordPress",
      "MongoDB",
      "Supabase",
      "Prisma",
      "Firebase",
      "Docker",
      "Git/GitHub",
      "Linux CLI",
      "Power BI",
    ],
  },
  {
    title: "Data & Automation",
    items: ["Selenium", "BeautifulSoup", "Make.com", "n8n", "REST", "GraphQL"],
  },
  {
    title: "Cloud/Deploy",
    items: ["Vercel", "GitHub Actions", "GCP (basic)"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <Container>
        <SectionTitle>Skills</SectionTitle>
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4">
              <h3 className="text-text font-semibold">{cat.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="text-xs px-2 py-1 rounded-md bg-text/10 text-text/90 transition-transform hover:scale-105">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


