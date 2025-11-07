import type { Metric } from "./profile";

export type ExperienceMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ExperienceProject = {
  title: string;
  summary: string;
  tech: string[];
  links: {
    live?: string;
    repo?: string;
  };
};

export type ExperienceLink = {
  label: string;
  href: string;
};

export type Experience = {
  id: string;
  slug?: string;
  role: string;
  company: string;
  location: string;
  period: string;
  start: string;
  end: string;
  summary: string;
  stack: string[];
  impact: string[];
  links?: ExperienceLink[];
  media?: ExperienceMedia[];
  metrics?: Metric[];
  projects?: ExperienceProject[];
  gallery?: ExperienceMedia[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: "remax",
    slug: "remax-wise",
    role: "Full-Stack Engineer (Erasmus+ Traineeship)",
    company: "RE/MAX Wise",
    location: "Lisbon, Portugal",
    period: "Sep 2025 - Nov 2025",
    start: "2025-09",
    end: "2025-11",
    summary:
      "Led the rebuild of the Algarve and Lisbon premium funnels with Next.js 15, Supabase CMS tooling, and a portable design system that marketing can extend without engineering handoffs.",
    stack: ["Next.js 15", "Supabase", "Tailwind CSS", "Framer Motion", "Vercel"],
    impact: [
      "Cut LCP to 1.8 s on 4G by streaming hero media and enforcing asset budgets per locale.",
      "Authored 24 schema-driven sections so copywriters can launch bilingual pages in under 20 minutes.",
      "Paired with legal and SEO to guarantee canonical URLs, metadata, and sitemap freshness on every deploy.",
    ],
    links: [
      { label: "Company site", href: "https://www.realestate-lisbon.com" },
      { label: "Erasmus+ recap", href: "https://www.linkedin.com/in/abdo-mo" },
    ],
    metrics: [
      { label: "Components shipped", value: "24" },
      { label: "Locales", value: "2", helper: "English + Portuguese" },
      { label: "Avg. CLS", value: "0.03" },
    ],
    projects: [
      {
        title: "Lisbon Living",
        summary: "Hero storytelling and tour scheduler for high-end Lisbon listings.",
        tech: ["Next.js 15", "Framer Motion", "Supabase"],
        links: {
          live: "https://www.realestate-lisbon.com",
          repo: "https://github.com/Abdoessam0/remax-lisbon-living",
        },
      },
      {
        title: "Algarve Collection",
        summary: "Modular listing grid and calculator for Algarve relocation clients.",
        tech: ["Next.js 15", "tRPC", "Tailwind CSS"],
        links: {
          live: "https://www.realestate-algarve.co",
          repo: "https://github.com/Abdoessam0/remax-algarve-collection",
        },
      },
      {
        title: "Journey Concierge",
        summary: "Supabase-backed concierge wizard aligning services, partners, and legal docs.",
        tech: ["Supabase", "Next.js API Routes", "Zod"],
        links: {
          live: "https://trustedbuildr.com/remax-journey",
          repo: "https://github.com/Abdoessam0/remax-journey-wizard",
        },
      },
    ],
    media: [
      {
        src: "/images/remax-lisbon/remax-lisbon-journey-wall.jpg",
        alt: "Journey wall showcasing bilingual hero concepts",
        width: 1200,
        height: 1600,
      },
    ],
    gallery: [
      {
        src: "/images/remax-lisbon/remax-lisbon-standup.jpg",
        alt: "Daily stand-up with RE/MAX Portugal marketing squad",
        width: 897,
        height: 617,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-journey-wall.jpg",
        alt: "Journey wall showcasing bilingual hero concepts",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-office.jpg",
        alt: "Lisbon office workspace with code review notes on screen",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-team.jpg",
        alt: "Team retro celebrating the Algarve launch milestone",
        width: 1200,
        height: 1600,
      },
    ],
  },
  {
    id: "afaqy",
    role: "Technical Support Engineer",
    company: "AFAQY",
    location: "Riyadh, Saudi Arabia",
    period: "Jul 2024 - Sep 2024",
    start: "2024-07",
    end: "2024-09",
    summary:
      "Owned front-line fleet reliability for 650+ GPS units, built dashboards, and automated bilingual playbooks so ops teams could act before SLAs slipped.",
    stack: ["Next.js", "Node.js", "Supabase", "Leaflet", "Grafana"],
    impact: [
      "Launched a fleet health matrix that refreshes every 15 minutes and flags risky clusters.",
      "Trained 30+ drivers and coordinators with bilingual (AR/EN) material and live sessions.",
      "Automated compliance exports with audit trails, saving half a day per week for the ops lead.",
    ],
    links: [{ label: "Ops console", href: "https://trustedbuildr.com/fleet" }],
    media: [
      {
        src: "/projects/fleet-ops-console.svg",
        alt: "Fleet ops console widgets",
        width: 1280,
        height: 720,
      },
    ],
  },
  {
    id: "alx",
    role: "Full-Stack Trainee",
    company: "ALX Africa",
    location: "Remote",
    period: "Oct 2023 - Dec 2023",
    start: "2023-10",
    end: "2023-12",
    summary:
      "Completed the ALX software engineering program focused on React, Node.js, and systems design. Led peer reviews and automated CI for the cohort repo.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Jest"],
    impact: [
      "Delivered three capstone projects with zero blocking QA issues.",
      "Set up GitHub Actions for lint + preview builds adopted by four squads.",
      "Documented accessibility prompts that became the cohort default checklist.",
    ],
    links: [{ label: "Program overview", href: "https://www.alxafrica.com/programmes/software-engineering/" }],
    media: [
      {
        src: "/experience/alx-grid.svg",
        alt: "ALX project tracking grid",
        width: 800,
        height: 640,
      },
    ],
  },
  {
    id: "nfs",
    role: "WordPress Developer Intern",
    company: "NFS Soft",
    location: "Erzurum, Turkey",
    period: "Oct 2022 - Dec 2022",
    start: "2022-10",
    end: "2022-12",
    summary:
      "Hand-coded multilingual WordPress themes for education brands, introduced QA checklists, and automated responsive screenshots for client sign-off.",
    stack: ["PHP", "WordPress", "Sass", "cPanel"],
    impact: [
      "Launched eight multilingual templates that held 90+ Lighthouse mobile scores.",
      "Automated critical CSS extraction to cut review cycles by 35%.",
      "Mentored junior interns on Git workflows and ticket hygiene.",
    ],
    links: [{ label: "Internship recap", href: "https://github.com/Abdoessam0" }],
    media: [
      {
        src: "/certificates/wordpress-internship.png",
        alt: "WordPress internship certificate preview",
        width: 1200,
        height: 900,
      },
    ],
  },
];
