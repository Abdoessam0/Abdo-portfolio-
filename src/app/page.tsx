import Hero from "../sections/hero";
import About from "../sections/about";
import Skills from "../sections/skills";
import Projects from "../sections/projects";
import Experience from "../sections/experience";
import Volunteering from "../sections/volunteering";
import Certifications from "../sections/certifications";
import Education from "../sections/education";
import Contact from "../sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="hero"><Hero /></section>
      <section id="about"><About /></section>
      <section id="skills"><Skills /></section>
      <section id="projects"><Projects /></section>
      <section id="experience"><Experience /></section>
      <section id="volunteering"><Volunteering /></section>
      <section id="certifications"><Certifications /></section>
      <section id="education"><Education /></section>
      <section id="contact"><Contact /></section>
    </main>
  );
}
