export type TechPanel = {
  id: string;
  badge?: string;
  title: string;
  summary: string;
  achievements: string[];
  metrics: Array<{
    label: string;
    value: string;
  }>;
  snippet: {
    language: string;
    code: string;
  };
  links?: Array<{
    label: string;
    href: string;
  }>;
};

export type Metric = {
  label: string;
  value: string;
  helper?: string;
};

export type Profile = {
  person: {
    name: string;
    role: string;
    summary: string;
    location: string;
    languages: string[];
    timezone: string;
    phone: string;
    availability: string;
  };
  socials: {
    email: string;
    linkedin: string;
    github: string;
  };
  links: {
    portfolio: string;
    resume: string;
    calendly?: string;
  };
  hero: {
    intro: string;
    bullets: string[];
    ctas: Array<{
      label: string;
      href: string;
      ariaLabel: string;
    }>;
  };
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL?: string;
  };
  metrics: Metric[];
  skills: Array<{
    title: string;
    items: string[];
  }>;
  contact: {
    availability: string;
    locationNote: string;
    channels: Array<{
      label: string;
      href: string;
      value: string;
      ariaLabel: string;
    }>;
  };
  techPanels?: TechPanel[];
};

export const PROFILE: Profile = {
  person: {
    name: "Abdelrahman Mohamed",
    role: "Software Engineer",
    summary: "Full-Stack Computer Engineering graduate with experience building responsive, high-performance web applications using React.js, Next.js, and TypeScript.",
    location: "Turkey, Ankara",
    languages: ["Arabic (Native)", "English (C1)", "Turkish (C1)"],
    timezone: "GMT+3",
    phone: "+905527508202",
    availability: "Open for full-time and remote opportunities",
  },
  socials: {
    email: "abdoessammo@gmail.com",
    linkedin: "https://linkedin.com/in/abdo-mo",
    github: "https://github.com/Abdoessam0",
  },
  links: {
    portfolio: "https://abdoessamcv.vercel.app",
    resume: "https://drive.google.com/file/d/1ddtUheGdk9LyF8TjGAt-UmiojEvkBVxm/view?usp=sharing",
    // calendly: "https://calendly.com/your-link", // Optional
  },
  hero: {
    intro: "Hello, I am Abdelrahman Mohamed",
    bullets: [
      "Building responsive web apps with Next.js & TypeScript",
      "Developing scalable backend services with Node.js & Java",
      "Focusing on clean code and modern UI/UX",
    ],
    ctas: [
      {
        label: "Download CV",
        href: "https://drive.google.com/file/d/1ddtUheGdk9LyF8TjGAt-UmiojEvkBVxm/view?usp=sharing",
        ariaLabel: "Download resume PDF",
      },
      {
        label: "View Projects",
        href: "#projects",
        ariaLabel: "View my projects",
      },
    ],
  },
  heroImage: {
    src: "/profile-image.jpg", // Make sure this image exists in public folder
    alt: "Abdelrahman Mohamed",
    width: 400,
    height: 400,
  },
  metrics: [
    { label: "YEARS OF CODING", value: "4+", helper: "Academic + production work" },
    { label: "TECHNOLOGIES", value: "10+", helper: "Across frontend, backend & DevOps" },
    { label: "PRODUCTION PROJECTS", value: "6+", helper: "Web, dashboards & internal tools" },
    { label: "LANGUAGES", value: "3", helper: "Arabic, English, Turkish" },
  ],
  skills: [
    {
      title: "Front-End Development",
      items: ["React.js", "Next.js 14/15", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      title: "Back-End Development",
      items: ["Node.js", "Express.js", "Java (Spring Boot)", "RESTful APIs", "PostgreSQL", "MongoDB", "MySQL"],
    },
  ],
  contact: {
    availability: "Available for full-time and remote opportunities",
    locationNote: "Based in Turkey and open to emails or on-site collaboration.",
    channels: [
      {
        label: "Email",
        href: "mailto:abdoessammo@gmail.com",
        value: "abdoessammo@gmail.com",
        ariaLabel: "Send email to Abdelrahman",
      },
      {
        label: "Phone",
        href: "tel:+905527508202",
        value: "+90 552 750 8202",
        ariaLabel: "Call Abdelrahman",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/abdo-mo",
        value: "linkedin.com/in/abdo-mo",
        ariaLabel: "Visit LinkedIn profile",
      },
      {
        label: "GitHub",
        href: "https://github.com/Abdoessam0",
        value: "github.com/Abdoessam0",
        ariaLabel: "Visit GitHub profile",
      },
    ],
  },
};
