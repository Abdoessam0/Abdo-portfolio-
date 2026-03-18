import type { Metric } from "./profile";

export type ExperienceMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ExperienceLink = {
  label: string;
  href: string;
};

export type Experience = {
  id: string;
  slug: string;
  featured: boolean;
  role: string;
  company: string;
  location: string;
  period: string;
  start: string;
  end: string;
  summary: string;
  stack: string[];
  impact: string[];
  metrics?: Metric[];
  links?: ExperienceLink[];
  gallery?: ExperienceMedia[];
  projectSlugs?: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: "remax-wise",
    slug: "remax-wise",
    featured: true,
    role: "Software Developer",
    company: "RE/MAX Wise",
    location: "Lisbon, Portugal",
    period: "Sep 2025 – Nov 2025",
    start: "2025-09",
    end: "2025-11",
    summary:
      "Built and improved production real-estate platforms across Algarve, Lisbon, and 5 Steps during Erasmus+ internship.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
      "SEO",
    ],
    impact: [
      "Implemented SEO-safe routing, metadata handling, canonical/noindex logic, and reusable UI components across 3 platforms.",
      "Standardized layouts and component structures across Algarve, Lisbon, and 5 Steps sites.",
      "Improved accessibility, performance, and deployment stability through code reviews and testing.",
    ],
    metrics: [
      { label: "Sites delivered", value: "3", helper: "Algarve, Lisbon, 5 Steps" },
      { label: "Focus", value: "SEO + reusable frontend" },
    ],
    links: [
      { label: "RE/MAX Wise", href: "https://www.remax.pt/" },
      { label: "About page (my profile)", href: "https://www.realestate-lisbon.com/about" },
      { label: "Real Estate Lisbon", href: "https://www.realestate-lisbon.com/" },
      { label: "Real Estate Algarve", href: "https://www.realestate-algarve.com/" },
    ],
    gallery: [
      {
        src: "/images/remax-lisbon/remax-lisbon-journey-wall.jpg",
        alt: "Abdelrahman at the RE/MAX WISE office in Lisbon",
        width: 900,
        height: 1200,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-office.jpg",
        alt: "RE/MAX Wise team at the Lisbon office",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-standup.jpg",
        alt: "Standup with the CEO at the RE/MAX Lisbon office",
        width: 897,
        height: 1200,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-team.jpg",
        alt: "Meet our team — 5 Steps Real Estate platform",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/remax-lisbon/abdo-team-photo.webp",
        alt: "Abdo Essam — Developer on the Platform & Technology Team at Real Estate Lisbon",
        width: 600,
        height: 800,
      },
    ],
    projectSlugs: ["real-estate-platforms"],
  },
  {
    id: "afaqy",
    slug: "afaqy",
    featured: true,
    role: "Technical Support Engineer",
    company: "AFAQY",
    location: "Riyadh, Saudi Arabia",
    period: "Jul 2024 – Sep 2024",
    start: "2024-07",
    end: "2024-09",
    summary:
      "Supported fleet systems and 650+ GPS devices with troubleshooting, diagnostics, and customer training.",
    stack: [
      "Fleet systems",
      "Diagnostics",
      "Dashboards",
      "Customer training",
      "Excel",
      "Reporting",
    ],
    impact: [
      "Managed maintenance requests and fleet data for 650+ vehicles across clients including Wefaq and Top-Tech.",
      "Delivered client training on AFAQY Pro software and handled support via WhatsApp and calls.",
      "Updated vehicle details across Pro, InDrive, and Rent platforms ensuring data accuracy.",
    ],
    metrics: [
      { label: "Devices supported", value: "650+", helper: "Fleet GPS systems" },
      { label: "Focus", value: "Diagnostics + reliability" },
    ],
    links: [{ label: "AFAQY", href: "https://afaqy.net/" }],
  },
  {
    id: "nfs-soft",
    slug: "nfs-soft",
    featured: true,
    role: "WordPress Developer Intern",
    company: "NFS Soft",
    location: "Erzurum, Türkiye",
    period: "Oct 2022 – Dec 2022",
    start: "2022-10",
    end: "2022-12",
    summary:
      "Built multilingual WordPress themes and websites with focus on responsiveness, performance, and accessibility.",
    stack: [
      "WordPress",
      "PHP",
      "Custom templates",
      "Responsive design",
      "Accessibility",
      "cPanel",
    ],
    impact: [
      "Crafted custom WordPress themes and plugins prioritizing responsiveness and user-friendliness.",
      "Created websites ranging from business platforms to content-heavy sites with seamless UX.",
      "Managed hosting with cPanel and assisted with PHP customizations for client projects.",
    ],
    metrics: [
      { label: "Strengths", value: "Multilingual + frontend quality" },
      { label: "Location", value: "Erzurum, Türkiye" },
    ],
    links: [{ label: "NFS Soft", href: "https://www.nfssoft.com/" }],
    gallery: [
      {
        src: "/certificates/wordpress-internship.png",
        alt: "NFS Soft internship certificate",
        width: 1200,
        height: 900,
      },
    ],
    projectSlugs: [
      "ustunler-et-borsasi",
      "bels-digital-application-system",
      "erzurum-sikayet",
      "easy4learning",
    ],
  },
];
