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

const RESUME_PATH = "/Abdelrahman_Mohamed_CV_DPS.pdf";

export const PROFILE: Profile = {
  person: {
    name: "Abdelrahman Mohamed",
    role: "Software Engineer",
    summary:
      "Software Engineer with a B.Sc. in Computer Engineering and a Full-Stack diploma from ALX. Frontend-first, full-stack capable, with hands-on experience building production web applications and digital products using Next.js, React, TypeScript, Node.js, and PHP/Laravel.",
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
    whatsapp:
      "https://wa.me/905527508202?text=Hi%20Abdelrahman,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect.",
  },
  links: {
    portfolio: "https://abdoessamcv.vercel.app",
    resume: RESUME_PATH,
  },
  hero: {
    eyebrow: "Software Engineer / Next.js / React / TypeScript",
    headline:
      "Software Engineer building production web applications and digital products.",
    subheadline:
      "Frontend-first, full-stack capable, with hands-on experience in Next.js, React, TypeScript, Node.js, and PHP/Laravel.",
    description:
      "Focused on scalable UI, API-driven systems, performance, and reliable delivery.",
    proofStrip: [
      { label: "Education", value: "B.Sc. Computer Engineering" },
      { label: "Diploma", value: "ALX Full-Stack Diploma" },
      { label: "Focus", value: "Scalable UI / APIs / delivery" },
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
    { label: "Projects", value: "11", helper: "11 shipped / 7 live" },
    {
      label: "Approach",
      value: "Frontend-first",
      helper: "Frontend-first, full-stack capable",
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
      value: "Software Engineer",
      description: "B.Sc. Computer Engineering with an ALX Full-Stack diploma.",
    },
    {
      label: "Build",
      value: "Web applications and digital products",
      description: "Frontend-first, full-stack capable across real product work.",
    },
    {
      label: "Focus",
      value: "Scalable UI and API systems",
      description: "Performance, reliability, and clean delivery.",
    },
  ],
  about: {
    intro: "Software Engineer / Frontend-First",
    story: [
      "Software Engineer with a B.Sc. in Computer Engineering and a Full-Stack diploma from ALX.",
      "Frontend-first, full-stack capable, with hands-on experience building production web applications and digital products using Next.js, React, TypeScript, Node.js, and PHP/Laravel.",
      "Focused on scalable UI, API-driven systems, performance, and reliable delivery, with experience contributing in fast-paced agile product teams.",
    ],
    focusAreas: [
      {
        title: "Frontend",
        description:
          "Scalable UI, responsive interfaces, and clean component systems.",
      },
      {
        title: "Backend",
        description:
          "API-driven systems, server-side logic, and real product workflows.",
      },
      {
        title: "Delivery",
        description:
          "Performance, debugging, testing, and reliable delivery.",
      },
    ],
    principles: [
      "Scalable UI",
      "API-driven systems",
      "Performance",
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
        href: RESUME_PATH,
        value: "Download CV",
        note: "Resume PDF",
        kind: "resume",
      },
    ],
  },
};
