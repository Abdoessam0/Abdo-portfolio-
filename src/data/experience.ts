import type { Metric } from "./profile";

export type ExperienceMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "cover" | "contain";
};

export type ExperienceLink = {
  label: string;
  href: string;
};

export type ExperienceDocument = {
  label: string;
  href: string;
  description: string;
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
  documents?: ExperienceDocument[];
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
    period: "Sep 2025 - Nov 2025",
    start: "2025-09",
    end: "2025-11",
    summary:
      "Worked on real production real estate websites.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
      "Technical SEO",
    ],
    impact: [
      "Built reusable UI components and shared layouts across multiple sites.",
      "Improved page structure, routing, and internal linking.",
      "Helped keep site launches clean and consistent.",
    ],
    metrics: [
      { label: "Sites", value: "3", helper: "Lisbon, Algarve, and 5 Steps" },
      { label: "Focus", value: "UI and routing" },
    ],
    links: [
      { label: "RE/MAX Wise", href: "https://www.remax.pt/" },
      {
        label: "RE/MAX Lisbon",
        href: "https://www.realestate-lisbon.com/about",
      },
      {
        label: "Real Estate Algarve",
        href: "https://www.realestate-algarve.com/",
      },
    ],
    gallery: [
      {
        src: "/images/remax-lisbon/remax-lisbon-journey-wall.jpg",
        alt: "Abdelrahman in front of the RE/MAX WISE office in Lisbon",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-office.jpg",
        alt: "Abdelrahman with the team inside the RE/MAX Lisbon office",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-team.jpg",
        alt: "Team photo at the RE/MAX Lisbon office",
        width: 1200,
        height: 1600,
      },
      {
        src: "/projects/remax-lisbon-cover.png",
        alt: "Real Estate Lisbon production website",
        width: 1440,
        height: 960,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-standup.jpg",
        alt: "Standup session at the RE/MAX Lisbon office",
        width: 897,
        height: 1200,
      },
      {
        src: "/images/remax-lisbon/updatedphoto.png",
        alt: "RE/MAX platform and technology team page featuring Abdelrahman",
        width: 673,
        height: 507,
      },
      {
        src: "/images/remax-lisbon/abdo-team-photo.webp",
        alt: "Abdelrahman featured on the RE/MAX 5 Steps team page",
        width: 768,
        height: 1227,
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
    period: "Jul 2024 - Sep 2024",
    start: "2024-07",
    end: "2024-09",
    summary:
      "Supported fleet management systems across 650+ GPS devices.",
    stack: [
      "Fleet systems",
      "Diagnostics",
      "Dashboards",
      "Customer training",
      "Excel",
      "Operational reporting",
    ],
    impact: [
      "Handled diagnostics, customer support, and follow-ups.",
      "Guided users on AFAQY Pro and resolved day-to-day issues.",
      "Helped keep data accurate across internal systems.",
    ],
    metrics: [
      { label: "Devices", value: "650+", helper: "Fleet GPS systems" },
      { label: "Focus", value: "Diagnostics + reliability" },
    ],
    links: [{ label: "AFAQY", href: "https://www.afaqy.com/" }],
    documents: [
      {
        label: "View PDF",
        href: "/images/afaqy/CamScanner%2010-08-2024%2019.39%20(1).pdf",
        description: "Experience PDF from the AFAQY folder.",
      },
      {
        label: "Certificate",
        href: "/certificates/afaqy-experience-certificate.pdf",
        description: "Experience certificate for the role.",
      },
    ],
    gallery: [
      {
        src: "/images/afaqy/WhatsApp%20Image%202026-03-30%20at%2010.18.35%20PM%20(1).jpeg",
        alt: "Group photo with Abdelrahman and the AFAQY team in Riyadh",
        width: 2048,
        height: 1152,
      },
      {
        src: "/images/afaqy/WhatsApp%20Image%202026-03-30%20at%2010.18.35%20PM.jpeg",
        alt: "Abdelrahman receiving the AFAQY experience certificate with a team member in Riyadh",
        width: 1152,
        height: 2048,
      },
    ],
  },
  {
    id: "nfs-soft",
    slug: "nfs-soft",
    featured: true,
    role: "WordPress Developer Intern",
    company: "NFS Soft",
    location: "Erzurum, Turkey",
    period: "Oct 2022 - Dec 2022",
    start: "2022-10",
    end: "2022-12",
    summary:
      "Built multilingual websites and custom WordPress templates.",
    stack: [
      "WordPress",
      "PHP",
      "Custom templates",
      "Responsive design",
      "Accessibility",
      "cPanel",
    ],
    impact: [
      "Improved responsive layout and content structure.",
      "Helped with hosting, updates, and client delivery.",
      "Built websites for business and education clients.",
    ],
    metrics: [
      { label: "Strengths", value: "Frontend quality + content systems" },
      { label: "Context", value: "Business and education websites" },
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
  },
];
