export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  featured: boolean;
  priority: number;
  context: string;
  employer?: string;
  summary: string;
  description: string;
  caseStudy: string;
  role: string;
  timeline: string;
  status: string;
  archived?: boolean;
  archiveUrl?: string;
  cover?: ProjectImage;
  gallery?: ProjectImage[];
  stack: string[];
  highlights: string[];
  metrics?: ProjectMetric[];
  liveUrl?: string;
  repoUrl?: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "real-estate-platforms",
    title: "RE/MAX Lisbon",
    featured: true,
    priority: 1,
    context: "RE/MAX Wise / Production",
    employer: "RE/MAX Wise",
    summary:
      "Production real-estate platform work focused on reusable UI, technical SEO, and launch quality.",
    description:
      "Built and improved public-facing real-estate experiences with stronger metadata handling, cleaner UI systems, and better production consistency.",
    caseStudy:
      "This work focused on platform quality across multiple launches. The value came from building frontend systems that stayed consistent, discoverable, and trustworthy in production.",
    role: "Software Developer",
    timeline: "Sep 2025 - Nov 2025",
    status: "Live",
    cover: {
      src: "/projects/remax-lisbon-cover.png",
      alt: "RE/MAX Lisbon production real-estate platform",
      width: 1440,
      height: 960,
    },
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
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
      "Technical SEO",
    ],
    highlights: [
      "Built reusable layouts and shared frontend patterns across multiple launches.",
      "Worked on metadata structure, routing, internal linking, and SEO-safe delivery.",
      "Improved interface consistency, responsiveness, and public-facing trust signals.",
    ],
    metrics: [
      { label: "Sites", value: "3 launches" },
      { label: "Focus", value: "SEO + reusable UI" },
    ],
    liveUrl: "https://www.realestate-lisbon.com/about",
    primaryCtaLabel: "Visit Project",
    secondaryCtaLabel: "Details",
  },
  {
    slug: "easy4learning",
    title: "Easy4Learning",
    featured: true,
    priority: 2,
    context: "Freelance / Education Platform",
    employer: "Freelance",
    summary:
      "Learning platform focused on clear structure, responsive templates, and better content readability.",
    description:
      "Built and refined an education website with better hierarchy, clearer content flow, and cleaner product presentation.",
    caseStudy:
      "The goal here was clarity. The platform needed a structure that made program content easier to scan, easier to trust, and easier to use across content-heavy pages.",
    role: "WordPress / Web Developer",
    timeline: "2026",
    status: "Live",
    cover: {
      src: "/projects/easy-learning-archive-cover.png",
      alt: "Easy4Learning homepage",
      width: 1707,
      height: 768,
    },
    stack: [
      "WordPress",
      "Content architecture",
      "Responsive templates",
      "Education UX",
    ],
    highlights: [
      "Improved content hierarchy and readability for a learning-focused product.",
      "Built responsive templates that keep program pages easier to scan.",
      "Delivered a cleaner UI with stronger structure and clearer calls to action.",
    ],
    metrics: [
      { label: "Context", value: "Education product" },
      { label: "Focus", value: "Content UX + responsive UI" },
    ],
    liveUrl: "https://easyforlearn.vercel.app",
    primaryCtaLabel: "Visit Project",
    secondaryCtaLabel: "Details",
  },
  {
    slug: "ustunler-et-borsasi",
    title: "Ustunler Et Borsasi",
    featured: true,
    priority: 3,
    context: "Freelance / Business Platform",
    employer: "Freelance",
    summary:
      "Marketplace interface designed around trust, clear process, and a stronger first impression.",
    description:
      "Built a production business platform with cleaner hierarchy, clearer workflows, and more reliable product presentation.",
    caseStudy:
      "This project required a serious business tone and a straightforward interface. The work centered on clarity, trust, and a UI that supports transactions instead of noise.",
    role: "Software Engineer",
    timeline: "2026",
    status: "Live",
    cover: {
      src: "/projects/ustunler-et-borsasi-cover.png",
      alt: "Ustunler Et Borsasi homepage",
      width: 1440,
      height: 960,
    },
    stack: ["Next.js", "React", "Responsive UI", "Business workflow UX"],
    highlights: [
      "Focused the interface on trust, process clarity, and cleaner business presentation.",
      "Reduced visual noise in favor of stronger structure and legibility.",
      "Helped position the platform as an operational product rather than a generic website.",
    ],
    metrics: [
      { label: "Context", value: "Marketplace UX" },
      { label: "Audience", value: "Business buyers" },
    ],
    liveUrl: "https://ustunleretborsasi.com/",
    primaryCtaLabel: "Visit Project",
    secondaryCtaLabel: "Details",
  },
  {
    slug: "bels-digital-application-system",
    title: "BELS Digital Application System",
    featured: false,
    priority: 4,
    context: "Freelance / Education Platform",
    employer: "Freelance",
    summary:
      "Admissions platform with clearer actions, better task flow, and a more official interface feel.",
    description:
      "Supported a real-world school application experience where workflow clarity and user confidence mattered.",
    caseStudy:
      "This product needed to reduce friction and feel reliable. The work centered on hierarchy, predictable actions, and a cleaner admissions flow.",
    role: "Software Engineer",
    timeline: "2026",
    status: "Live",
    cover: {
      src: "/projects/bels-application-system-cover.png",
      alt: "BELS digital application system",
      width: 1440,
      height: 960,
    },
    stack: [
      "React",
      "Application workflows",
      "Form UX",
      "Responsive interface",
    ],
    highlights: [
      "Improved clarity around key actions such as applying and checking results.",
      "Framed the product more like a system interface than a generic school site.",
      "Supported a cleaner admissions workflow with better task focus.",
    ],
    metrics: [
      { label: "Use case", value: "Admissions workflow" },
      { label: "Priority", value: "Task clarity" },
    ],
    liveUrl: "https://basvuru.bels.k12.tr/",
    primaryCtaLabel: "Visit Project",
    secondaryCtaLabel: "Details",
  },
  {
    slug: "erzurum-sikayet",
    title: "Erzurum Sikayet",
    featured: false,
    priority: 5,
    context: "Freelance / Civic Platform",
    employer: "Freelance",
    summary:
      "Complaint platform with public submission flows, moderation, and dashboard-style service visibility.",
    description:
      "Built a public feedback system with complaint workflows, listings, and admin-facing operational structure.",
    caseStudy:
      "The work centered on making a systems-heavy product easier to scan, easier to manage, and more credible for public users.",
    role: "Full-stack Developer",
    timeline: "2026",
    status: "Live",
    cover: {
      src: "/projects/erzurum-sikayet-cover.png",
      alt: "Erzurum Sikayet homepage",
      width: 1440,
      height: 960,
    },
    stack: ["Laravel", "Blade", "Alpine.js", "MySQL", "Role-based dashboards"],
    highlights: [
      "Built around complaint submission, moderation, and city-level service visibility.",
      "Presented dashboard-style information in a more legible public UI.",
      "Balanced approachable UX with the structure expected from an admin-backed product.",
    ],
    metrics: [
      { label: "System feel", value: "Public + admin" },
      { label: "Workflow", value: "Complaints + moderation" },
    ],
    liveUrl: "https://www.erzurumsikayet.com/",
    repoUrl: "https://github.com/Abdoessam0/erzurumsikayet",
    primaryCtaLabel: "Visit Project",
    secondaryCtaLabel: "Details",
  },
  {
    slug: "trustedbuildr",
    title: "TrustedBuildr",
    featured: false,
    priority: 6,
    context: "Independent / Property Marketplace",
    summary:
      "Verification-first property marketplace built around trust signals, structure, and technical SEO.",
    description:
      "Designed a bilingual marketplace for verified developers, land listings, and projects with strong search visibility in mind.",
    caseStudy:
      "This project combines product positioning, structured content, and SEO-aware implementation in a marketplace context.",
    role: "Full-stack Developer",
    timeline: "2025",
    status: "Live",
    cover: {
      src: "/projects/trustedbuildr-cover.png",
      alt: "TrustedBuildr homepage",
      width: 1440,
      height: 960,
    },
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Leaflet",
      "Structured SEO",
    ],
    highlights: [
      "Designed for trust-heavy property discovery with stronger content structure.",
      "Implemented sitemaps, structured data, and hreflang foundations.",
      "Positioned the experience as a product platform rather than a standard listing site.",
    ],
    liveUrl: "https://trustedbuildr.com/",
    repoUrl: "https://github.com/Abdoessam0/trustedbuildr",
    primaryCtaLabel: "Visit Project",
    secondaryCtaLabel: "Details",
  },
  {
    slug: "eventsys",
    title: "EventSys",
    featured: false,
    priority: 7,
    context: "Independent / Event Platform",
    summary:
      "Event management system with ticketing, recommendations, and admin tooling.",
    description:
      "Prototype event platform covering live weather, ticketing, authentication, discovery, and admin workflows.",
    caseStudy:
      "This project demonstrates systems thinking across frontend, backend, and operational tooling.",
    role: "Full-stack Developer",
    timeline: "2023",
    status: "Prototype",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "OpenWeather API"],
    highlights: [
      "Combined ticketing, recommendations, weather data, and admin functionality in one platform.",
      "Built secure authentication flows and data-backed event features.",
      "Focused on system usability instead of isolated features.",
    ],
    repoUrl: "https://github.com/Abdoessam0",
    primaryCtaLabel: "View Project",
    secondaryCtaLabel: "Details",
  },
  {
    slug: "yolov8-detection",
    title: "YOLOv8 Real-Time Detection",
    featured: false,
    priority: 8,
    context: "Independent / Computer Vision",
    summary:
      "Real-time detection workflow built around live capture, inference, and analytics visibility.",
    description:
      "Computer vision project combining live camera input, inference, and dashboard-style performance feedback.",
    caseStudy:
      "This project demonstrates technical systems thinking beyond traditional frontend work.",
    role: "Computer Vision Developer",
    timeline: "2024",
    status: "Prototype",
    stack: ["Python", "YOLOv8", "PyTorch", "OpenCV", "Streamlit", "WebRTC"],
    highlights: [
      "Processed live camera input with real-time detection and analytics feedback.",
      "Built interface layers for performance metrics and object tracking insights.",
      "Focused on usable system feedback instead of raw model output alone.",
    ],
    repoUrl: "https://github.com/Abdoessam0",
    primaryCtaLabel: "View Project",
    secondaryCtaLabel: "Details",
  },
  {
    slug: "library-management",
    title: "Library Management System",
    featured: false,
    priority: 9,
    context: "Academic / Desktop Tool",
    summary:
      "Desktop operations tool for inventory control, reporting, and rule-driven workflows.",
    description:
      "C# Windows Forms application backed by SQL Server procedures, triggers, functions, and reporting views.",
    caseStudy:
      "This project is a strong example of structured workflow logic and data-driven system design.",
    role: "Desktop Developer",
    timeline: "2022",
    status: "Completed",
    stack: [
      "C#",
      "Windows Forms",
      "SQL Server",
      "Stored Procedures",
      "Triggers",
      "Reporting",
    ],
    highlights: [
      "Automated issuing, returning, inventory status, and reporting workflows.",
      "Enforced business rules with SQL procedures, triggers, and validation logic.",
      "Built as a functional operations tool rather than a presentation-first project.",
    ],
    repoUrl: "https://github.com/Abdoessam0",
    primaryCtaLabel: "View Project",
    secondaryCtaLabel: "Details",
  },
];
