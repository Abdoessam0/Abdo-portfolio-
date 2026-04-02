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
    role: "Full-Stack Software Engineer",
    summary:
      "Full-Stack Software Engineer with a frontend-first approach. I build clean, reliable web applications for real use.",
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
    eyebrow: "Full-Stack Software Engineer · Frontend-First",
    headline:
      "Full-Stack Software Engineer building clean, reliable web applications.",
    subheadline:
      "I work with Next.js, React, and TypeScript. I focus on clean UI, good performance, and code that holds up in production.",
    description: "I build for real use, not just demos.",
    proofStrip: [
      { label: "Recent work", value: "RE/MAX Wise · AFAQY · NFS Soft" },
      { label: "Core stack", value: "Next.js · React · TypeScript" },
      { label: "Focus", value: "UI · performance · maintainable code" },
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
    { label: "Projects", value: "8+", helper: "Real work and side projects" },
    {
      label: "Approach",
      value: "Frontend-first",
      helper: "Full-stack engineer",
    },
    { label: "Languages", value: "3", helper: "Arabic · English · Turkish" },
    {
      label: "Work",
      value: "Production",
      helper: "Websites and systems in use",
    },
  ],
  factCards: [
    {
      label: "Role",
      value: "Full-Stack Engineer",
      description: "Frontend-first with real product work.",
    },
    {
      label: "Build",
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
    intro: "Full-Stack Software Engineer · Frontend-First",
    story: [
      "I'm a Full-Stack Software Engineer with a frontend-first approach and a Computer Engineering background.",
      "I build web applications using Next.js, React, TypeScript, and modern tooling. I care about clean UI, usability, and code that's easy to maintain.",
      "I've worked on real products for RE/MAX Wise, AFAQY, and NFS Soft - websites, dashboards, and full-stack systems.",
    ],
    focusAreas: [
      {
        title: "Frontend",
        description: "Clean UI, responsive layout, and clear user flow.",
      },
      {
        title: "Backend",
        description: "APIs, backend work, and app logic.",
      },
      {
        title: "Production",
        description: "Built for real use, not just demos.",
      },
    ],
    principles: [
      "Clean UI",
      "Usability",
      "Performance",
      "Maintainable code",
    ],
  },
  education: [
    {
      degree: "Bachelor of Computer Engineering",
      institution: "Ataturk University",
      location: "Erzurum, Turkey",
      period: "2021-2026",
    },
    {
      degree: "Full-Stack Software Engineer Diploma",
      institution: "ALX",
      location: "Remote",
      period: "2023-2024",
    },
  ],
  skills: [
    {
      title: "Frontend",
      summary: "",
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
      summary: "",
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
      summary: "",
      items: ["Supabase", "MySQL", "MongoDB", "PostgreSQL", "SQL Server"],
    },
    {
      title: "Tools",
      summary: "",
      items: ["Git", "GitHub", "Vercel", "Postman", "Figma", "Docker basics"],
    },
    {
      title: "Focus",
      summary: "",
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
    description: "The best way to reach me is by email or LinkedIn.",
    availability:
      "If you have a role or project in mind, feel free to message me.",
    channels: [
      {
        label: "Email",
        href: "mailto:abdoessammo@gmail.com?subject=Portfolio%20Inquiry",
        value: "abdoessammo@gmail.com",
        note: "Direct contact",
        kind: "email",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/abdo-mo",
        value: "linkedin.com/in/abdo-mo",
        note: "Roles and connections",
        kind: "linkedin",
      },
      {
        label: "GitHub",
        href: "https://github.com/Abdoessam0",
        value: "github.com/Abdoessam0",
        note: "Code and project work",
        kind: "github",
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/905527508202?text=Hi%20Abdelrahman,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect.",
        value: "+90 552 750 8202",
        note: "Quick follow-up",
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
