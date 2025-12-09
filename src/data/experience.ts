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
    id: "remax-wise",
    slug: "remax-wise",
    role: "Software Developer (Erasmus+ Internship)",
    company: "RE/MAX Wise",
    location: "Lisbon, Portugal",
    period: "Sep 2025 – Nov 2025",
    start: "2025-09",
    end: "2025-11",
    summary:
      "Built and improved multi-site real estate platforms (Algarve, Lisbon, 5 Steps) using Next.js, TypeScript, Tailwind CSS, Supabase, and Vercel.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Vercel", "SEO routing", "CI/CD"],
    impact: [
      "Implemented dynamic routing, SEO-safe metadata, unified layouts, reusable UI components, and internal linking.",
      "Improved accessibility, performance, and deployment stability across Algarve, Lisbon, and 5 Steps funnels.",
      "Partnered with marketing to keep content structures reusable and localized without duplicating code.",
    ],
    links: [{ label: "RE/MAX Portugal", href: "https://www.remax.pt/" }],
    metrics: [
      { label: "Sites", value: "3", helper: "Algarve, Lisbon, 5 Steps" },
      { label: "Core stack", value: "Next.js 15 + Supabase" },
    ],
    projects: [
      {
        title: "Real Estate Funnels",
        summary: "Multi-site funnels with shared layouts, SEO metadata, and reusable content blocks.",
        tech: ["Next.js 15", "TypeScript", "Tailwind CSS"],
        links: {},
      },
    ],
    gallery: [
      {
        src: "/images/remax-lisbon/remax-lisbon-standup.jpg",
        alt: "RE/MAX Wise team standup",
        width: 897,
        height: 617,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-office.jpg",
        alt: "Workspace during Lisbon platform build",
        width: 1600,
        height: 900,
      },
    ],
  },
  {
    id: "afaqy",
    slug: "afaqy",
    role: "Technical Support Engineer",
    company: "AFAQY",
    location: "Riyadh, Saudi Arabia",
    period: "Jul 2024 – Sep 2024",
    start: "2024-07",
    end: "2024-09",
    summary:
      "Supported fleet systems and 650+ GPS devices with troubleshooting, diagnostics, dashboards, and automated reports using Next.js, Supabase, and Node.js.",
    stack: ["Next.js", "Supabase", "Node.js", "Dashboards", "Diagnostics"],
    impact: [
      "Developed dashboards and automated reports to keep fleet and GPS data quality high for multiple clients.",
      "Prepared documentation and training materials for operations teams and stakeholders.",
      "Managed telemetry troubleshooting with bilingual support and proactive monitoring.",
    ],
    links: [{ label: "AFAQY", href: "https://afaqy.net/" }],
    metrics: [
      { label: "Devices", value: "650+", helper: "Fleet GPS systems" },
      { label: "Focus", value: "Diagnostics & reporting" },
    ],
    media: [
      {
        src: "/experience/afaqy-lab.svg",
        alt: "AFAQY dashboards",
        width: 1200,
        height: 720,
      },
    ],
  },
  {
    id: "nfs-soft",
    slug: "nfs-soft",
    role: "WordPress Developer Intern",
    company: "NFS Soft",
    location: "Erzurum, Türkiye",
    period: "Sep 2022 – Jun 2023",
    start: "2022-09",
    end: "2023-06",
    summary:
      "Built multilingual WordPress themes and improved mobile responsiveness while assisting with PHP customisations and hosting via cPanel.",
    stack: ["WordPress", "PHP", "cPanel", "Responsive design", "Multilingual themes"],
    impact: [
      "Implemented custom templates, optimized performance and accessibility, and ensured mobile responsiveness.",
      "Managed hosting tasks with cPanel and supported deployments for client sites.",
      "Assisted with PHP customisations and QA to keep multilingual experiences stable.",
    ],
    links: [{ label: "NFS Soft", href: "https://www.nfssoft.com/" }],
    gallery: [
      {
        src: "/certificates/wordpress-internship.png",
        alt: "WordPress internship work samples",
        width: 1200,
        height: 900,
      },
    ],
  },
];
