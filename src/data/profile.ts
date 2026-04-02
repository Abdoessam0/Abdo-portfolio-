export type Metric = {
  label: string;
  value: string;
  helper?: string;
};

export type FactCard = {
  label: string;
  value: string;
  description: string;
};

export type HeroProof = {
  label: string;
  value: string;
};

export type HeroCta = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type ContactChannel = {
  label: string;
  href: string;
  value: string;
  note: string;
  kind: "email" | "whatsapp" | "linkedin" | "github" | "resume";
};

export type SkillGroup = {
  title: string;
  summary: string;
  items: string[];
};

export type Profile = {
  person: {
    name: string;
    role: string;
    summary: string;
    location: string;
    nationality: string;
    base: string;
    languages: string[];
    timezone: string;
    phone: string;
    availability: string;
    dob: string;
  };
  socials: {
    email: string;
    linkedin: string;
    github: string;
    whatsapp: string;
  };
  links: {
    portfolio: string;
    resume: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    description: string;
    proofStrip: HeroProof[];
    ctas: HeroCta[];
    trustedBy: string[];
  };
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  metrics: Metric[];
  factCards: FactCard[];
  about: {
    intro: string;
    story: string[];
    focusAreas: Array<{
      title: string;
      description: string;
    }>;
    principles: string[];
  };
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    period: string;
  }>;
  skills: SkillGroup[];
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    availability: string;
    channels: ContactChannel[];
  };
};

export const PROFILE: Profile = {
  person: {
    name: "Abdelrahman Mohamed",
    role: "Software Engineer",
    summary:
      "Full-Stack Software Engineer with a frontend-first approach. I build fast, reliable web applications with clean UI and strong performance.",
    location: "Based in Turkey",
    nationality: "Egyptian",
    base: "Turkey",
    languages: ["Arabic", "English", "Turkish"],
    timezone: "GMT+3",
    phone: "+905527508202",
    availability:
      "Open to full-time roles, freelance work, and collaborations.",
    dob: "19/07/2002",
  },
  socials: {
    email: "abdoessammo@gmail.com",
    linkedin: "https://linkedin.com/in/abdo-mo",
    github: "https://github.com/Abdoessam0",
    whatsapp:
      "https://wa.me/905527508202?text=Hi%20Abdelrahman,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect.",
  },
  links: {
    portfolio: "https://abdoessamcv.vercel.app",
    resume: "/cv.pdf",
  },
  hero: {
    eyebrow: "Full-Stack Software Engineer, frontend-first",
    headline:
      "Full-Stack Software Engineer building fast, reliable web applications.",
    subheadline:
      "Focused on clean UI, strong performance, and systems that can grow. I work with Next.js, React, TypeScript, and real production apps.",
    description: "I build products for real use, not just demos.",
    proofStrip: [
      { label: "Recent work", value: "RE/MAX Wise, AFAQY, NFS Soft" },
      { label: "Core stack", value: "Next.js, React, TypeScript, Node.js" },
      { label: "Focus", value: "UI, performance, and full-stack apps" },
    ],
    ctas: [
      {
        label: "View Projects",
        href: "#projects",
        ariaLabel: "Jump to featured portfolio projects",
      },
      {
        label: "Download CV",
        href: "/cv.pdf",
        ariaLabel: "Download Abdelrahman Mohamed CV PDF",
      },
    ],
    trustedBy: ["RE/MAX Wise", "NFS Soft", "AFAQY"],
  },
  heroImage: {
    src: "/profile-image.jpg",
    alt: "Portrait of Abdelrahman Mohamed",
    width: 482,
    height: 775,
  },
  metrics: [
    { label: "Projects", value: "8+", helper: "Websites and systems" },
    { label: "Role", value: "Full-stack", helper: "Frontend-first approach" },
    { label: "Languages", value: "3", helper: "Arabic, English, Turkish" },
    {
      label: "Work",
      value: "Production",
      helper: "Real products and client work",
    },
  ],
  factCards: [
    {
      label: "Role",
      value: "Full-Stack Engineer",
      description: "Frontend-first with real product work.",
    },
    {
      label: "Builds",
      value: "Web apps and systems",
      description: "Websites, dashboards, and full-stack tools.",
    },
    {
      label: "Focus",
      value: "UI, performance, clean code",
      description: "Built for real use and easier maintenance.",
    },
  ],
  about: {
    intro: "Full-Stack Software Engineer, frontend-first.",
    story: [
      "I'm a Full-Stack Software Engineer with a frontend-first approach and a Computer Engineering background.",
      "I build web applications with Next.js, React, TypeScript, and modern tools.",
      "I've worked on real products for RE/MAX Wise, AFAQY, and NFS Soft, including websites, dashboards, and full-stack systems.",
      "I care about clean UI, good usability, and code that is easy to maintain.",
    ],
    focusAreas: [
      {
        title: "Frontend-first",
        description: "Clean UI, responsive layout, and clear user flow.",
      },
      {
        title: "Full-stack work",
        description: "APIs, backend integration, and real app features.",
      },
      {
        title: "Real products",
        description: "Built for real use, not just demo projects.",
      },
    ],
    principles: [
      "Clean UI",
      "Performance",
      "Responsive design",
      "Maintainable code",
    ],
  },
  education: [
    {
      degree: "Bachelor of Computer Engineering",
      institution: "Ataturk University",
      location: "Erzurum, Turkey",
      period: "2021 to 2026",
    },
    {
      degree: "Full-Stack Software Engineer Diploma",
      institution: "ALX",
      location: "Remote",
      period: "2023 to 2024",
    },
  ],
  skills: [
    {
      title: "Frontend",
      summary: "Build responsive UI with modern React tools.",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      title: "Backend",
      summary: "Build APIs, server logic, and app features.",
      items: [
        "Node.js",
        "Express",
        "REST APIs",
        "Java",
        "PHP/Laravel basics",
      ],
    },
    {
      title: "Database",
      summary: "Work with SQL and NoSQL data.",
      items: ["Supabase", "MySQL", "MongoDB", "PostgreSQL", "SQL Server"],
    },
    {
      title: "Tools",
      summary: "Daily tools for building and shipping.",
      items: ["Git", "GitHub", "Vercel", "Postman", "Figma", "Docker basics"],
    },
    {
      title: "Focus",
      summary: "What I care about in real work.",
      items: [
        "Responsive UI",
        "Performance",
        "Accessibility",
        "SEO",
        "Maintainable code",
      ],
    },
  ],
  contact: {
    eyebrow: "Contact",
    title: "Open to full-time roles, freelance work, and collaborations.",
    description: "Best way to reach me is by email or LinkedIn.",
    availability:
      "If you want to talk about a role or a project, feel free to message me.",
    channels: [
      {
        label: "Email",
        href: "mailto:abdoessammo@gmail.com?subject=Portfolio%20Inquiry",
        value: "abdoessammo@gmail.com",
        note: "Best for direct contact.",
        kind: "email",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/abdo-mo",
        value: "linkedin.com/in/abdo-mo",
        note: "Best for roles and connections.",
        kind: "linkedin",
      },
      {
        label: "GitHub",
        href: "https://github.com/Abdoessam0",
        value: "github.com/Abdoessam0",
        note: "Code and project work.",
        kind: "github",
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/905527508202?text=Hi%20Abdelrahman,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect.",
        value: "+90 552 750 8202",
        note: "Good for quick follow-up.",
        kind: "whatsapp",
      },
      {
        label: "CV",
        href: "/cv.pdf",
        value: "Download CV",
        note: "Resume PDF.",
        kind: "resume",
      },
    ],
  },
};
