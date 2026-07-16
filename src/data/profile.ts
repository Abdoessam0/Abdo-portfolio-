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
  kind: "email" | "whatsapp" | "linkedin" | "github" | "instagram" | "resume";
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
    instagram: string;
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
  founder: {
    title: string;
    eyebrow: string;
    description: string;
    proof: string[];
    primaryCta: HeroCta;
    secondaryCta: HeroCta;
  };
  trust: Array<{
    label: string;
    value: string;
    description: string;
  }>;
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

const RESUME_PATH = "/Abdelrahman_Mohamed_Full_Stack_AI_CV_Eye_Friendly.pdf";
export const PORTFOLIO_OWNER_NAME = "Abdelrahman Mohamed";

export const PROFILE: Profile = {
  person: {
    name: PORTFOLIO_OWNER_NAME,
    role: "Software Engineer",
    summary:
      "Software Engineer based in Ankara, building web applications, dashboards, admin panels, and business platforms with Next.js, React, TypeScript, PHP/Laravel, and MySQL.",
    location: "Ankara, Turkey (relocatable)",
    nationality: "Egyptian",
    base: "Ankara, Turkey",
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
    instagram: "https://www.instagram.com/_Abdo_Essam",
    whatsapp:
      "https://wa.me/905527508202?text=Hi%20Abdelrahman%20Mohamed,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect.",
  },
  links: {
    portfolio: "https://abdo.kolaytec.com",
    resume: RESUME_PATH,
  },
  hero: {
    eyebrow: "Software Engineer / Full-Stack Developer",
    headline:
      `${PORTFOLIO_OWNER_NAME} builds web applications, dashboards, and business platforms.`,
    subheadline:
      "Frontend-first and full-stack capable, with production web work, client-facing support experience, and a practical product mindset.",
    description:
      "Open to software engineering roles, freelance builds, and long-term product work.",
    proofStrip: [
      { label: "Since", value: "Building web products since 2022" },
      { label: "Work", value: "Frontend + full-stack delivery" },
      { label: "Focus", value: "Websites / dashboards / platforms" },
    ],
    ctas: [
      {
        label: "View Projects",
        href: "#projects",
        ariaLabel: "Jump to featured portfolio projects",
      },
      {
        label: "Download CV",
        href: RESUME_PATH,
        ariaLabel: `Download ${PORTFOLIO_OWNER_NAME} CV PDF`,
      },
    ],
    trustedBy: ["Kolaytec", "RE/MAX Wise", "NFS Soft", "AFAQY"],
  },
  heroImage: {
    src: "/profile-image.jpg",
    alt: `${PORTFOLIO_OWNER_NAME}, Software Engineer and Full-Stack Developer`,
    width: 482,
    height: 775,
  },
  metrics: [
    { label: "Projects", value: "11", helper: "11 shipped / 7 live" },
    {
      label: "Since",
      value: "2022",
      helper: "Building web products",
    },
    { label: "Languages", value: "3", helper: "Arabic / English / Turkish" },
    {
      label: "Work",
      value: "Production",
      helper: "Web platforms and dashboards",
    },
  ],
  factCards: [
    {
      label: "Role",
      value: "Software Engineer / Full-Stack Developer",
      description: "B.Sc. Computer Engineering, ALX Full-Stack diploma, and production web delivery.",
    },
    {
      label: "Build",
      value: "Websites, dashboards, and platforms",
      description: "Frontend-first, full-stack capable across real product work.",
    },
    {
      label: "Focus",
      value: "Clean delivery for real users",
      description: "Production UI, API-connected systems, admin panels, and client work.",
    },
  ],
  founder: {
    eyebrow: "Founder",
    title: "Kolaytec — Company Website Project",
    description:
      "Kolaytec is a company I founded for building practical websites, admin panels, dashboards, and business platforms. Through it, I turn client needs into clean, usable, production-ready web products.",
    proof: [
      "Business websites",
      "Admin panels and dashboards",
      "Full-stack delivery",
    ],
    primaryCta: {
      label: "Visit Kolaytec",
      href: "https://kolaytec.com",
      ariaLabel: "Visit Kolaytec website",
    },
    secondaryCta: {
      label: "Let's Talk",
      href: "#contact",
      ariaLabel: "Jump to contact section",
    },
  },
  trust: [
    {
      label: "Production",
      value: "Production web platforms",
      description: "Real websites, dashboards, and product pages built for public use.",
    },
    {
      label: "Delivery",
      value: "Frontend + full-stack delivery",
      description: "React/Next.js interfaces with API-connected workflows and data handling.",
    },
    {
      label: "Experience",
      value: "International internship experience",
      description: "Software and client-facing work across Portugal, Saudi Arabia, and Turkey.",
    },
    {
      label: "Systems",
      value: "Admin panels and dashboards",
      description: "Interfaces for managing data, events, content, and operational workflows.",
    },
  ],
  about: {
    intro: "Software Engineer / Full-Stack Developer / Frontend-First",
    story: [
      `I am ${PORTFOLIO_OWNER_NAME}, a Software Engineer who builds practical web products for real users.`,
      "My work is strongest around frontend implementation, API-connected workflows, admin panels, dashboards, and business websites.",
      "I am interested in software engineering roles and product work where clean delivery, communication, and reliability matter.",
    ],
    focusAreas: [
      {
        title: "Frontend",
        description:
          "Responsive interfaces, clean component systems, and polished product pages.",
      },
      {
        title: "Full-stack",
        description:
          "API-connected workflows, dashboards, admin panels, and business systems.",
      },
      {
        title: "Delivery",
        description:
          "Clear communication, debugging, performance, and reliable launch work.",
      },
    ],
    principles: [
      "Production web platforms",
      "API-driven systems",
      "Client-facing support",
      "Reliable delivery",
    ],
  },
  education: [
    {
      degree: "B.Sc. Computer Engineering",
      institution: "Ataturk University",
      location: "Erzurum, Turkey",
      period: "Graduated Jun 2026",
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
    description: "The best way to reach me is by email, LinkedIn, or Instagram.",
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
        label: "Instagram",
        href: "https://www.instagram.com/_Abdo_Essam",
        value: "instagram.com/_Abdo_Essam",
        note: "Updates and contact",
        kind: "instagram",
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/905527508202?text=Hi%20Abdelrahman%20Mohamed,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect.",
        value: "+90 552 750 8202",
        note: "Quick follow-up",
        kind: "whatsapp",
      },
      {
        label: "CV",
        href: RESUME_PATH,
        value: "Download CV",
        note: "Resume PDF",
        kind: "resume",
      },
    ],
  },
};
