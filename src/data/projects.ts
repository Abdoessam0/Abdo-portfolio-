import type { Metric } from "./profile";

const blur = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/xcAAmMBgJ6Ar6MAAAAASUVORK5CYII=";

export type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  summary: string;
  description: string;
  stack: string[];
  badges: string[];
  problem: string;
  outcomes: string[];
  metrics: Metric[];
  hero: ProjectMedia & { blurDataURL: string };
  gallery: ProjectMedia[];
  links: {
    live?: string;
    repo?: string;
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "remax-journey",
    title: "Algarve Real Estate Funnels",
    period: "2025 - Lisbon",
    summary: "Next.js 15 funnels for RE/MAX Wise that pair bilingual hero storytelling with Supabase-powered CMS controls.",
    description:
      "Rebuilt the Algarve and Lisbon buyer flows with React Server Components, schema-driven Supabase content, and a portable design system that marketing can extend without new tickets. The playbook covers recruitment, relocation, and premium listings while staying within CLS and SEO guardrails.",
    stack: ["Next.js 15", "TypeScript", "Supabase", "Tailwind CSS", "Vercel Analytics"],
    badges: ["SEO", "Design Systems"],
    problem: "The legacy WordPress build loaded in 5+ seconds and broke when agents reused blocks.",
    outcomes: [
      "Introduced a schema-driven content matrix so marketing can stage a launch in under 20 minutes.",
      "Ship-ready components documented in Storybook with tokens that match RE/MAX global brand guardrails.",
      "Automated sitemap and metadata updates so Vercel deploys stay warning-free.",
    ],
    metrics: [
      { label: "LCP on 4G", value: "1.8 s" },
      { label: "Schema sections", value: "24" },
    ],
    hero: {
      src: "/projects/remax-journey.svg",
      alt: "Screens from the RE/MAX Journey experience",
      width: 1280,
      height: 720,
      blurDataURL: blur,
    },
    gallery: [
      {
        src: "/projects/event-management.svg",
        alt: "Scheduling tools powering the RE/MAX concierge workflow",
        width: 1200,
        height: 630,
      },
      {
        src: "/projects/event-calendar.svg",
        alt: "Calendar automation preview for RE/MAX operations",
        width: 800,
        height: 600,
      },
    ],
    links: {
      live: "https://www.realestate-lisbon.com",
      repo: "https://github.com/Abdoessam0/remax-journey-system",
    },
  },
  {
    slug: "fleet-ops-console",
    title: "Fleet Ops Console",
    period: "2024 - Riyadh",
    summary: "Operations cockpit for AFAQY that tracks 650+ vehicles with geofencing and automated health checks.",
    description:
      "Built a Supabase-backed control center that merges telematics, ticketing, and billing so support agents can resolve incidents without switching tabs. Included a role-based notification system and printable compliance packs.",
    stack: ["Next.js 14", "Postgres", "Supabase Functions", "Leaflet", "Radix UI"],
    badges: ["Realtime", "Ops"],
    problem: "Technicians updated three separate spreadsheets and could not spot hardware regressions in time.",
    outcomes: [
      "Reduced average ticket resolution time from 3 days to 18 hours by surfacing fleet anomalies instantly.",
      "Created a health rules engine that tags risky vehicle clusters every 15 minutes.",
      "Delivered export-ready compliance PDFs with audit trail metadata.",
    ],
    metrics: [
      { label: "Devices monitored", value: "650+" },
      { label: "INP", value: "152 ms" },
    ],
    hero: {
      src: "/projects/fleet-ops-console.svg",
      alt: "Dashboard mockups for the Fleet Ops Console",
      width: 1280,
      height: 720,
      blurDataURL: blur,
    },
    gallery: [
      {
        src: "/projects/spotify-cohorts.svg",
        alt: "Vehicle retention cohorts visualizing risks",
        width: 800,
        height: 600,
      },
      {
        src: "/projects/spotify-churn.svg",
        alt: "Analytics snapshot for the fleet console",
        width: 1200,
        height: 630,
      },
    ],
    links: {
      live: "https://trustedbuildr.com/fleet",
      repo: "https://github.com/Abdoessam0/fleet-ops-console",
    },
  },
  {
    slug: "alx-system-kit",
    title: "ALX Training Systems Kit",
    period: "2023 - Remote",
    summary: "Reusable React + Node patterns documented during the ALX Full-Stack program for faster capstone delivery.",
    description:
      "Led peer reviews, hardened CI, and published component recipes so cohort teams could focus on business logic. Every module shipped with accessibility prompts, Jest coverage, and README playbooks that became the cohort default reference.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Jest"],
    badges: ["Education", "DX"],
    problem: "Cohort projects started from scratch each sprint, resulting in inconsistent scaffolding and missed QA gates.",
    outcomes: [
      "Delivered three capstones with zero blocking QA issues by enforcing shared lint, type, and test profiles.",
      "Set up GitHub Actions for lint + preview builds adopted by four squads.",
      "Documented accessibility prompts that became part of every submission checklist.",
    ],
    metrics: [
      { label: "Capstones delivered", value: "3" },
      { label: "Squads adopting CI", value: "4" },
    ],
    hero: {
      src: "/projects/atlas-mobile.svg",
      alt: "ALX systems kit dashboards and task boards",
      width: 1280,
      height: 720,
      blurDataURL: blur,
    },
    gallery: [
      {
        src: "/projects/the-loop-dialog.svg",
        alt: "Review board used for ALX component approvals",
        width: 800,
        height: 600,
      },
    ],
    links: {
      repo: "https://github.com/Abdoessam0",
    },
  },
  {
    slug: "nfs-wordpress-suite",
    title: "NFS Soft WordPress Suite",
    period: "2022 - Erzurum",
    summary: "Multilingual WordPress themes and QA rituals delivered during the NFS Soft internship.",
    description:
      "Hand-coded bilingual templates for education brands, automated screenshots for approvals, and shipped a reusable checklist so every release held 90+ Lighthouse scores. Paired with the team on Git workflows, deployment hygiene, and documentation.",
    stack: ["WordPress", "PHP", "Sass", "cPanel"],
    badges: ["Multilingual", "QA"],
    problem: "Legacy templates drifted from brand guidelines and required manual rewrites for each language.",
    outcomes: [
      "Launched eight multilingual templates that consistently hit 90+ Lighthouse mobile scores.",
      "Automated critical CSS extraction and responsive screenshots to cut review cycles by 35%.",
      "Mentored junior interns on Git workflows and ticket hygiene.",
    ],
    metrics: [
      { label: "Templates launched", value: "8" },
      { label: "Mobile Lighthouse", value: "90+" },
    ],
    hero: {
      src: "/projects/the-loop.svg",
      alt: "WordPress components and theme preview grids",
      width: 1280,
      height: 720,
      blurDataURL: blur,
    },
    gallery: [
      {
        src: "/projects/the-loop-dialog.svg",
        alt: "Responsive QA checklist for a WordPress template",
        width: 800,
        height: 600,
      },
    ],
    links: {
      repo: "https://github.com/Abdoessam0",
    },
  },
];
