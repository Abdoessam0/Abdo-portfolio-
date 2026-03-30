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
    role: "Frontend Software Engineer",
    summary:
      "Software engineer building clean, fast, production-ready web products with a frontend-first mindset and full-stack capability.",
    location: "Based in Turkey",
    nationality: "Egyptian",
    base: "Turkey",
    languages: ["Arabic", "English", "Turkish"],
    timezone: "GMT+3",
    phone: "+905527508202",
    availability:
      "Open to frontend and full-stack roles, freelance work, and product collaborations.",
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
    eyebrow: "Software engineer, frontend-first",
    headline: "Clean, fast, production-ready products.",
    subheadline:
      "Frontend-first with full-stack capability, focused on UI quality, performance, and maintainable systems.",
    description:
      "Always learning, refining, and shipping web products built for real use.",
    proofStrip: [
      { label: "Recent work", value: "RE/MAX Lisbon, AFAQY, Easy4Learning" },
      { label: "Core stack", value: "Next.js, React, TypeScript, Tailwind" },
      { label: "Focus", value: "UI, performance, SEO, maintainability" },
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
    { label: "Projects", value: "8+", helper: "Shipped platforms" },
    { label: "Focus", value: "Frontend", helper: "UI, SEO, performance" },
    { label: "Languages", value: "3", helper: "Arabic, English, Turkish" },
    {
      label: "Delivery",
      value: "Full-stack",
      helper: "Frontend to API integration",
    },
  ],
  factCards: [
    {
      label: "Who I am",
      value: "Software engineer",
      description: "Frontend-first with practical full-stack capability.",
    },
    {
      label: "Background",
      value: "UI, performance, systems",
      description: "Focused on clean products that stay fast and maintainable.",
    },
    {
      label: "Languages",
      value: "Arabic, English, Turkish",
      description:
        "Clear communication across engineering, product, and delivery work.",
    },
  ],
  about: {
    intro: "Software engineer, frontend-first with full-stack capability.",
    story: [
      "I build clean, fast, production-ready products with a strong focus on UI quality, performance, and maintainable systems.",
      "I keep learning, refining the details, and improving how products feel in real use.",
    ],
    focusAreas: [
      {
        title: "Frontend-first",
        description:
          "Clean interfaces, reusable UI, and responsive product work.",
      },
      {
        title: "Full-stack capable",
        description:
          "Comfortable across APIs, backend integration, and end-to-end delivery.",
      },
      {
        title: "Always improving",
        description:
          "Always learning, refining, and raising production quality.",
      },
    ],
    principles: [
      "Clean UI and clear hierarchy.",
      "Performance where it matters.",
      "Maintainable systems.",
      "Steady product improvement.",
    ],
  },
  education: [
    {
      degree: "Bachelor of Computer Engineering",
      institution: "Ataturk University",
      location: "Erzurum, Turkey",
      period: "Sep 2021 - Jun 2026",
    },
    {
      degree: "Full-Stack Software Engineer Diploma",
      institution: "ALX",
      location: "Remote",
      period: "Oct 2023 - Nov 2024",
    },
  ],
  skills: [
    {
      title: "Frontend",
      summary: "Modern frontend architecture and product UI implementation.",
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
      summary: "Server-side logic, data access, and integration work.",
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
      summary: "Deployment, hosting, and lightweight delivery infrastructure.",
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
      summary: "Engineering, collaboration, and product workflow tools.",
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
      summary:
        "Technical quality that improves speed, discoverability, and accessibility.",
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
    title: "Let's build something solid.",
    description: "Email or LinkedIn works best.",
    availability:
      "Open to frontend and full-stack roles, freelance work, and product collaborations.",
    channels: [
      {
        label: "Email",
        href: "mailto:abdoessammo@gmail.com?subject=Portfolio%20Inquiry",
        value: "abdoessammo@gmail.com",
        note: "Best for roles, projects, and direct outreach.",
        kind: "email",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/abdo-mo",
        value: "linkedin.com/in/abdo-mo",
        note: "Best for hiring conversations and introductions.",
        kind: "linkedin",
      },
      {
        label: "GitHub",
        href: "https://github.com/Abdoessam0",
        value: "github.com/Abdoessam0",
        note: "Code samples and technical project history.",
        kind: "github",
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/905527508202?text=Hi%20Abdelrahman,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect.",
        value: "+90 552 750 8202",
        note: "Fast follow-up for active conversations.",
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
