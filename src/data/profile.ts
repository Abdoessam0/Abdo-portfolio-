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
      "Full-Stack Software Engineer specializing in Next.js, React, and TypeScript. Delivered production web apps for RE/MAX Wise, AFAQY, and NFS Soft.",
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
    eyebrow: "Full-Stack Engineer · Next.js / React / TypeScript",
    headline: "Building production web apps that ship clean and hold up.",
    subheadline:
      "Next.js, React, TypeScript — focused on clean UI, performance, and maintainable code.",
    description:
      "Delivered for RE/MAX Wise, AFAQY, and NFS Soft — real products, real users.",
    proofStrip: [
      { label: "Recent work", value: "RE/MAX Wise / AFAQY / NFS Soft" },
      { label: "Core stack", value: "Next.js / React / TypeScript" },
      { label: "Focus", value: "UI / performance / maintainable code" },
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
    { label: "Projects", value: "10", helper: "10 shipped · 6 live" },
    {
      label: "Approach",
      value: "Frontend-first",
      helper: "Frontend-first, full-stack",
    },
    { label: "Languages", value: "3", helper: "Arabic / English / Turkish" },
    {
      label: "Work",
      value: "Production",
      helper: "In use now",
    },
  ],
  factCards: [
    {
      label: "Role",
      value: "Full-Stack Engineer",
      description: "Frontend-first with real production work.",
    },
    {
      label: "Build",
      value: "Web apps and systems",
      description: "Websites, dashboards, and full-stack tools.",
    },
    {
      label: "Focus",
      value: "UI, performance, clean code",
      description: "Built to ship and easy to maintain.",
    },
  ],
  about: {
    intro: "Full-Stack Software Engineer / Frontend-First",
    story: [
      "Full-Stack Software Engineer with a Computer Engineering background and a frontend-first approach.",
      "I build production web applications with Next.js, React, and TypeScript — focused on clean UI, performance, and code that's easy to maintain.",
      "Delivered real products for RE/MAX Wise, AFAQY, and NFS Soft across websites, dashboards, and full-stack systems.",
    ],
    focusAreas: [
      {
        title: "Frontend",
        description: "Clean UI, responsive layout, and clear user flow.",
      },
      {
        title: "Backend",
        description: "REST APIs, server-side logic, and app architecture.",
      },
      {
        title: "Production",
        description: "Built to ship — not just to demo.",
      },
    ],
    principles: ["Clean UI", "Usability", "Performance", "Maintainable code"],
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
      summary: "UI engineering for production web apps and client work.",
      items: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript ES6+",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "React Query",
        "Context API",
        "Redux Toolkit",
        "Responsive Design",
        "Accessibility",
        "Component Architecture",
        "UI/UX Implementation",
      ],
    },
    {
      title: "Backend and APIs",
      summary: "Server-side logic, integration work, and API-driven features.",
      items: [
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "PHP",
        "Laravel",
        "Authentication flows",
        "API integration",
      ],
    },
    {
      title: "Mobile",
      summary: "Mobile app development with React Native and Expo.",
      items: ["React Native", "Expo", "Expo Router"],
    },
    {
      title: "Databases",
      summary: "Relational and document databases across web and desktop systems.",
      items: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "SQL Server",
        "T-SQL",
        "Stored Procedures",
        "Triggers",
        "Functions",
      ],
    },
    {
      title: "AI and Computer Vision",
      summary: "Applied machine learning for real-time detection systems.",
      items: ["Python", "YOLOv8", "PyTorch", "OpenCV", "Streamlit"],
    },
    {
      title: "CMS and Platforms",
      summary: "Client delivery and content-driven site work.",
      items: ["WordPress", "cPanel"],
    },
    {
      title: "Deployment and DevOps",
      summary: "Deployment and environment work used in production projects.",
      items: [
        "Vercel",
        "Supabase",
        "GitHub Actions",
        "CI/CD",
        "Environment Configuration",
        "Deployment Workflows",
      ],
    },
    {
      title: "SEO and Product Engineering",
      summary: "Technical SEO applied to production websites.",
      items: [
        "SEO-safe Routing",
        "Metadata Handling",
        "Canonical Tags",
        "hreflang",
        "JSON-LD",
        "Internal Linking",
        "Performance Optimization",
      ],
    },
    {
      title: "Tools",
      summary: "Everyday tools for building, testing, and collaboration.",
      items: [
        "Git",
        "GitHub",
        "Figma",
        "Postman",
        "VS Code",
        "next-intl",
        "Leaflet",
      ],
    },
  ],
  contact: {
    eyebrow: "Contact",
    title: "Open to full-time roles, freelance work, and collaborations.",
    description: "The best way to reach me is by email or LinkedIn.",
    availability: "If you have a role or project in mind, feel free to reach out.",
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
        note: "Resume PDF",
        kind: "resume",
      },
    ],
  },
};