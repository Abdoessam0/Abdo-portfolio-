export type Project = {
  imageUrl?: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export type ExperienceItem = {
  title: string;
  role: string;
  summary: string;
};

export type Certification = {
  title: string;
  url: string;
};

export type Education = {
  degree: string;
  details: string;
};

export type SkillsCategory = {
  title: string;
  items: string[];
};

export type SiteContent = {
  name: string;
  subline: string;
  socials: {
    github: string;
    linkedin: string;
    email?: string;
    whatsapp?: string;
  };
  profileImage: string; // can be URL or data URL
  cvUrl: string;
  about: {
    location: string;
    languages: string;
    narrative1: string;
    narrative2: string;
  };
  skills: SkillsCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  volunteering: string[];
  certifications: Certification[];
  education: Education;
};

export const defaultContent: SiteContent = {
  name: "Abdelrahman Mohamed",
  subline: "Full Stack Developer • Open Source Contributor • Tech Explorer",
  socials: {
    github: "https://github.com/Abdoessam0", // TODO: confirm
    linkedin: "https://www.linkedin.com/in/", // TODO: add handle
    email: "",
  },
  profileImage: "/next.svg", // safe built-in asset
  cvUrl: "#", // TODO: replace with hosted CV link
  about: {
    location: "Nationality: Egyptian, Based in Erzurum, Türkiye.",
    languages: "Languages: Arabic (Native), English (C1), Turkish (C1).",
    narrative1:
      "Technical Passion: I build reliable, accessible interfaces and data-driven backends. I love Next.js, React, and modern tooling. I care about clean architecture, performance, and DX.",
    narrative2:
      "Global Mindset: I thrive in multicultural teams and fast-paced environments. I enjoy solving real problems and learning from diverse perspectives.",
  },
  skills: [
    {
      title: "Programming",
      items: ["JS", "TS", "Python", "Java", "C++", "C#", "Dart", "PHP", "HTML/CSS", "SQL"],
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
    { title: "Data & Automation", items: ["Selenium", "BeautifulSoup", "Make.com", "n8n", "REST", "GraphQL"] },
    { title: "Cloud/Deploy", items: ["Vercel", "GitHub Actions", "GCP (basic)"] },
  ],
  projects: [
    { title: "Algarve Real Estate", description: "Property search with responsive UI and animated filtering.", tech: ["Next.js", "Tailwind", "Supabase", "Prisma", "Vercel"], imageUrl: "/next.svg" },
    { title: "ALX Training Builds", description: "Reusable components and best practices.", tech: ["React", "Node", "MongoDB"], imageUrl: "/next.svg" },
    { title: "NFS Soft WordPress Intern", description: "Custom themes and plugins.", tech: ["WordPress", "PHP", "CSS"], imageUrl: "/next.svg" },
    { title: "Data & AI", description: "Scrapers, dashboards, and AI-assisted automation.", tech: ["Python", "SQL", "Power BI", "Selenium"], imageUrl: "/next.svg" },
  ],
  experience: [
    { title: "Remax Wise (Lisbon)", role: "Full-Stack, Data & AI Intern", summary: "Scrapers/automation & web work." },
    { title: "AFAQY (Riyadh)", role: "Technical Support Engineer", summary: "Managed 650+ fleet units; training; Pro system support." },
    { title: "Youth Summer Fest (Timișoara)", role: "Facilitator", summary: "30-day intercultural event; workshops; logistics." },
    { title: "ALX Africa", role: "Full-Stack Trainee", summary: "React, Node, MongoDB." },
    { title: "NFS Soft (Erzurum)", role: "WordPress Dev Intern", summary: "Custom themes/plugins." },
  ],
  volunteering: [
    "Translator | Snowboardcross World Cup — TR/EN for 15+ teams.",
    "Participant | Erasmus+ Sports Forum — policy/youth dialogue.",
    "Volunteer | Damla Movement — 31-member international team, community projects.",
  ],
  certifications: [
    { title: "ALX Full-Stack Engineer", url: "#" },
    { title: "AFAQY Technical Engineer", url: "#" },
    { title: "English C1 (VTest)", url: "#" },
    { title: "English C1 (Rosetta Stone)", url: "#" },
  ],
  education: {
    degree: "B.Sc. Computer Engineering, Atatürk University (2021–2025)",
    details: "Coursework: DBMS, OOP, Python, DSA, Microcontrollers.",
  },
};

const STORAGE_KEY = "portfolio.content.v1";

export function loadContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw);
    return {
      ...defaultContent,
      ...parsed,
      socials: { ...defaultContent.socials, ...(parsed?.socials || {}) },
      about: { ...defaultContent.about, ...(parsed?.about || {}) },
      skills: parsed?.skills || defaultContent.skills,
      projects: parsed?.projects || defaultContent.projects,
      experience: parsed?.experience || defaultContent.experience,
      volunteering: parsed?.volunteering || defaultContent.volunteering,
      certifications: parsed?.certifications || defaultContent.certifications,
      education: parsed?.education || defaultContent.education,
    } as SiteContent;
  } catch {
    return defaultContent;
  }
}

export function saveContent(content: Partial<SiteContent>) {
  if (typeof window === "undefined") return;
  const current = loadContent();
  const merged = {
    ...current,
    ...content,
    socials: { ...current.socials, ...(content.socials || {}) },
    about: { ...current.about, ...(content.about || {}) },
    skills: content.skills ?? current.skills,
    projects: content.projects ?? current.projects,
    experience: content.experience ?? current.experience,
    volunteering: content.volunteering ?? current.volunteering,
    certifications: content.certifications ?? current.certifications,
    education: content.education ?? current.education,
  } as SiteContent;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export function clearContent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}


