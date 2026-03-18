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
      "Full-stack computer engineering graduate building responsive, high-performance web apps with React, Next.js, and TypeScript.",
    location: "Ankara, Türkiye",
    nationality: "Egyptian",
    base: "Türkiye",
    languages: ["Arabic", "English (C1)", "Turkish (C1)"],
    timezone: "GMT+3",
    phone: "+905527508202",
    availability: "Open to full-time software engineering roles",
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
    eyebrow: "Software Engineer",
    headline: "Building clean, production-ready web apps.",
    subheadline:
      "Full-stack developer focused on fast UI, real products, and reliable systems.",
    description: "",
    proofStrip: [
      { label: "Recent work", value: "RE/MAX Wise, NFS Soft, AFAQY" },
      { label: "Core stack", value: "Next.js, TypeScript, Tailwind" },
      { label: "Focus", value: "UI, SEO, performance" },
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
    width: 400,
    height: 400,
  },
  metrics: [
    { label: "Projects", value: "8+", helper: "Shipped platforms" },
    { label: "Markets", value: "3", helper: "Real estate, education, ops" },
    { label: "Languages", value: "3", helper: "Arabic, English, Turkish" },
    { label: "Focus", value: "Frontend", helper: "UI, SEO, performance" },
  ],
  factCards: [
    {
      label: "Who I am",
      value: "Full-stack engineer",
      description:
        "Building responsive, high-performance web applications with clean interfaces.",
    },
    {
      label: "Background",
      value: "Egyptian, based in Türkiye",
      description:
        "Comfortable working across multicultural teams and international contexts.",
    },
    {
      label: "Languages",
      value: "Arabic, English (C1), Turkish (C1)",
      description:
        "Clear communication in three languages across product and delivery work.",
    },
  ],
  about: {
    intro: "I build software that's fast, clean, and ready for real users.",
    story: [
      "Computer engineering graduate with hands-on production experience.",
      "I care about clean UI, SEO, performance, and maintainable systems.",
      "Recent work with RE/MAX Wise, NFS Soft, and AFAQY across real estate, education, and fleet operations.",
    ],
    focusAreas: [
      {
        title: "Frontend-first",
        description:
          "React, Next.js, TypeScript, Tailwind — premium UI with reusable components.",
      },
      {
        title: "Full-stack capable",
        description:
          "Node.js, Express, Spring Boot, Supabase, REST APIs — end-to-end delivery.",
      },
      {
        title: "Cross-cultural",
        description:
          "Egyptian, based in Türkiye, worked in Portugal — Arabic, English, and Turkish.",
      },
    ],
    principles: [
      "Clean systems that scale as products grow.",
      "SEO and performance from day one.",
      "Interfaces that feel fast, clear, and credible.",
    ],
  },
  education: [
    {
      degree: "Bachelor of Computer Engineering",
      institution: "Atatürk University",
      location: "Erzurum, Türkiye",
      period: "Sep 2021 – Jun 2026",
    },
    {
      degree: "Full-Stack Software Engineer Diploma",
      institution: "ALX",
      location: "Remote",
      period: "Oct 2023 – Nov 2024",
    },
  ],
  skills: [
    {
      title: "Frontend",
      summary: "Modern product UI and component systems.",
      items: [
        "React",
        "Next.js 14/15",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Redux Toolkit",
        "React Query",
        "Context API",
      ],
    },
    {
      title: "Backend / APIs",
      summary: "Server-side and data layer.",
      items: [
        "Node.js",
        "Express",
        "Java (Spring Boot)",
        "REST APIs",
        "PHP (Laravel)",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "SQL Server",
      ],
    },
    {
      title: "Cloud & DevOps",
      summary: "Deployment and infrastructure.",
      items: [
        "Vercel",
        "Supabase",
        "Docker (basics)",
        "GitHub Actions",
        "CI/CD",
        "cPanel",
      ],
    },
    {
      title: "Tools & Design",
      summary: "Day-to-day engineering and design tools.",
      items: [
        "Git / GitHub",
        "Figma",
        "Postman",
        "VS Code",
        "next-intl",
        "Leaflet",
      ],
    },
    {
      title: "SEO & Performance",
      summary: "Built to rank and load fast.",
      items: [
        "Technical SEO",
        "Metadata / JSON-LD",
        "Semantic HTML",
        "Core Web Vitals",
        "Accessibility",
      ],
    },
  ],
  contact: {
    eyebrow: "Contact",
    title: "Interested in working together?",
    description: "Email or LinkedIn is the best place to start.",
    availability: "Open to full-time software engineering roles.",
    channels: [
      {
        label: "Email",
        href: "mailto:abdoessammo@gmail.com",
        value: "abdoessammo@gmail.com",
        note: "Best for hiring conversations.",
        kind: "email",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/abdo-mo",
        value: "linkedin.com/in/abdo-mo",
        note: "Quick profile view.",
        kind: "linkedin",
      },
      {
        label: "GitHub",
        href: "https://github.com/Abdoessam0",
        value: "github.com/Abdoessam0",
        note: "Code and project history.",
        kind: "github",
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/905527508202?text=Hi%20Abdelrahman,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect.",
        value: "+90 552 750 8202",
        note: "Fast reply.",
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
