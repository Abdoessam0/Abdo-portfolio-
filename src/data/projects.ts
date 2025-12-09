// src/data/projects.ts
const blur = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/xcAAmMBgJ6Ar6MAAAAASUVORK5CYII=";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  role?: string;
  timeline?: string;
  status?: string;
  image?: ProjectImage;
  screenshots?: ProjectImage[];
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  certificateUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "real-estate-platforms",
    title: "Real Estate Funnels & Multi-Site Platform",
    description: "Multi-site real estate platforms for RE/MAX Wise built during Erasmus+ internship.",
    longDescription:
      "Built and improved production platforms for Algarve, Lisbon, and 5 Steps using Next.js 15, TypeScript, and Tailwind CSS. Implemented SEO-safe routing, metadata handling, and reusable UI components deployed on Vercel with Supabase content.",
    role: "Software Developer Intern",
    timeline: "Sep 2025 – Nov 2025",
    status: "Live",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Vercel", "SEO"],
    highlights: [
      "Unified layouts and reusable UI blocks across three sites",
      "SEO-safe routing, metadata, and internal linking",
      "Accessibility and performance improvements for all launches",
    ],
    liveUrl: "https://remax.pt/en/agencia/remax-wise/12690",
    repoUrl: "https://github.com/Abdoessam0/real-estate-platforms",
    image: {
      src: "/projects/remax-journey.svg",
      alt: "RE/MAX Wise multi-site funnel previews",
      width: 1280,
      height: 720,
      blurDataURL: blur,
    },
    screenshots: [
      {
        src: "/images/remax-lisbon/remax-lisbon-team.jpg",
        alt: "RE/MAX Wise launch celebration",
        width: 1200,
        height: 1600,
      },
    ],
  },
  {
    slug: "erzurumsikayet",
    title: "ErzurumŞikayet – City Complaint Platform",
    description: "Full-stack complaint and review platform with dashboards and real-time stats.",
    longDescription:
      "Comprehensive complaint management with user, company, and admin dashboards. Includes multi-step complaint flows, category filters, company registration, and live statistics maintained on cPanel with GitHub tracking.",
    role: "Full-Stack Developer",
    timeline: "2024",
    status: "Live",
    stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Alpine.js", "cPanel"],
    highlights: [
      "Multi-step complaint submission flow with validation",
      "Company registration and admin moderation tools",
      "Real-time statistics dashboards",
      "Deployed and maintained on cPanel",
    ],
    liveUrl: "https://erzurumsikayet.com/",
    repoUrl: "https://github.com/Abdoessam0/erzurumsikayet",
    image: {
      src: "/projects/atlas-mobile.svg",
      alt: "ErzurumŞikayet dashboard preview",
      width: 1280,
      height: 720,
      blurDataURL: blur,
    },
  },
  {
    slug: "trustedbuildr",
    title: "TrustedBuildr.pt – Verified Construction Marketplace",
    description: "Bilingual marketplace for verified developers, land listings, and projects with advanced SEO.",
    longDescription:
      "Built a bilingual marketplace prepared for future AI verification and blockchain escrow. Implemented sitemaps, JSON-LD, canonical/hreflang, structured schemas, and Leaflet-based mapping for verified developers and land listings.",
    role: "Full-Stack Developer",
    timeline: "2025",
    status: "Live",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase Postgres", "next-intl", "Leaflet"],
    highlights: [
      "Advanced SEO with structured data, sitemaps, and hreflang",
      "Leaflet mapping for developers, land, and projects",
      "Structured schema ready for AI verification and escrow",
    ],
    liveUrl: "https://trustedbuildr.com/",
    repoUrl: "https://github.com/Abdoessam0/trustedbuildr",
    image: {
      src: "/projects/spotify-churn.svg",
      alt: "TrustedBuildr marketplace visuals",
      width: 1280,
      height: 720,
      blurDataURL: blur,
    },
  },
  {
    slug: "eventsys",
    title: "EventSys – Event Management System",
    description: "End-to-end event platform with admin tools, ticketing, and live weather data.",
    longDescription:
      "Full event platform providing live weather, ticket purchases, recommendations, user authentication, and an admin panel for events and announcements. Backend uses secure JWT with MongoDB models.",
    role: "Full-Stack Developer",
    timeline: "2023",
    status: "Prototype",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "OpenWeather API"],
    highlights: [
      "User auth, ticketing, and recommendations",
      "Admin panel for events and announcements",
      "Secure JWT auth with MongoDB models",
    ],
    repoUrl: "https://github.com/Abdoessam0",
    image: {
      src: "/projects/event-management.svg",
      alt: "EventSys management interface",
      width: 1280,
      height: 720,
      blurDataURL: blur,
    },
    screenshots: [
      {
        src: "/projects/event-calendar.svg",
        alt: "EventSys calendar and admin tools",
        width: 800,
        height: 600,
      },
    ],
  },
  {
    slug: "yolov8-detection",
    title: "YOLOv8 Real-Time Object Detection System",
    description: "WebRTC-enabled detection and analytics around an optimized YOLOv8n model.",
    longDescription:
      "Real-time YOLOv8 object detection (~30 FPS) with WebRTC camera support and Streamlit dashboards for Live Detection and Analytics. Includes FPS/confidence metrics, hardware detection, and tuning for future fine-tuning and deployment.",
    role: "Computer Vision Developer",
    timeline: "2024",
    status: "Prototype",
    stack: ["Python", "YOLOv8", "PyTorch", "Streamlit", "OpenCV", "WebRTC"],
    highlights: [
      "WebRTC camera capture with live detection and metrics",
      "Streamlit dashboards for detection and analytics",
      "Optimized YOLOv8n with performance tuning",
    ],
    repoUrl: "https://github.com/Abdoessam0",
    image: {
      src: "/projects/ai-object-detection.svg",
      alt: "YOLOv8 detection dashboard",
      width: 1280,
      height: 720,
      blurDataURL: blur,
    },
  },
  {
    slug: "library-management",
    title: "Library Management System – Desktop App",
    description: "Desktop automation for library operations backed by SQL Server.",
    longDescription:
      "C# Windows Forms desktop app covering books, students, issuing, returning, and reporting. Uses SQL Server with stored procedures, triggers, functions, and views to enforce rules and prevent data issues.",
    role: "Desktop Developer",
    timeline: "2022",
    status: "Completed",
    stack: ["C# Windows Forms", "SQL Server", "T-SQL procedures", "Triggers", "Functions", "Views"],
    highlights: [
      "Prevents negative stock and deletion of active borrowers",
      "Automatic book status updates via triggers and procedures",
      "Reporting for issuing, returning, and student records",
    ],
    repoUrl: "https://github.com/Abdoessam0",
    image: {
      src: "/projects/the-loop-dialog.svg",
      alt: "Library management UI concepts",
      width: 1280,
      height: 720,
      blurDataURL: blur,
    },
  },
];
