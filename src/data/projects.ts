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
    slug: "ustunler-et-borsasi",
    title: "Üstünler Et Borsası",
    featured: true,
    priority: 1,
    context: "NFS Soft • Business marketplace platform",
    employer: "NFS Soft",
    summary:
      "Digital marketplace experience connecting livestock suppliers and meat buyers through a clearer, more trustworthy product surface.",
    description:
      "Worked on a production business platform focused on marketplace credibility, process clarity, and clean presentation for a niche commercial audience.",
    caseStudy:
      "This platform demanded a more serious business tone than a promotional website. The emphasis was on making the workflow legible, keeping the product surface clean, and presenting trust-building cues in a way that supports real transactions instead of marketing noise.",
    role: "Software Engineer",
    timeline: "2024",
    status: "Live",
    cover: {
      src: "/projects/ustunler-et-borsasi-cover.png",
      alt: "Üstünler Et Borsası homepage screenshot",
      width: 1440,
      height: 960,
    },
    stack: ["Next.js", "React", "Responsive UI", "Business workflow UX"],
    highlights: [
      "Focused the interface on business trust, process clarity, and a cleaner first impression.",
      "Helped shape a product presentation that feels operational rather than template-driven.",
      "Supported a commercial workflow where content hierarchy and legibility mattered to conversion.",
    ],
    metrics: [
      { label: "Context", value: "Marketplace UX" },
      { label: "Audience", value: "Business buyers and suppliers" },
    ],
    liveUrl: "https://ustunleretborsasi.com/",
    primaryCtaLabel: "Visit Live",
    secondaryCtaLabel: "View Case Study",
  },
  {
    slug: "bels-digital-application-system",
    title: "BELS Başvuru Sistemi",
    featured: true,
    priority: 2,
    context: "NFS Soft • Education admissions workflow",
    employer: "NFS Soft",
    summary:
      "Admissions-oriented digital application flow for Bilkent Erzurum Laboratory School with a focused, task-first interface.",
    description:
      "Contributed to a real-world school application experience where clear calls to action, form confidence, and reliable workflow structure were essential.",
    caseStudy:
      "Unlike a marketing page, this product had to reduce friction for applicants, feel official, and guide users into a structured process quickly. The design quality comes from clarity, not decoration: strong hierarchy, controlled interface density, and a more credible admissions feel.",
    role: "Software Engineer",
    timeline: "2024",
    status: "Live",
    cover: {
      src: "/projects/bels-application-system-cover.png",
      alt: "BELS digital application system screenshot",
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
      "Supported a digital admissions flow built to feel official, simple, and reliable.",
      "Improved visual clarity around key user actions such as applying and checking results.",
      "Framed the product more like a system interface than a generic school website.",
    ],
    metrics: [
      { label: "Use case", value: "Admissions workflow" },
      { label: "Priority", value: "Task clarity" },
    ],
    liveUrl: "https://basvuru.bels.k12.tr/",
    primaryCtaLabel: "Visit Live",
    secondaryCtaLabel: "View Case Study",
  },
  {
    slug: "erzurum-sikayet",
    title: "Erzurum Şikayet",
    featured: true,
    priority: 3,
    context: "NFS Soft • Complaint and review platform",
    employer: "NFS Soft",
    summary:
      "City-scale complaint and review platform built around submission flows, moderation logic, and dashboard-style information presentation.",
    description:
      "Worked on a public-facing feedback platform with a strong systems feel: complaint workflows, category-driven discovery, business listings, and admin-oriented moderation needs.",
    caseStudy:
      "The product needed to feel open to the public while still supporting structure behind the scenes. The work centered on making dashboard-style information easy to scan, surfacing status cues clearly, and treating complaint flow as a product system, not just a form.",
    role: "Full-stack Developer",
    timeline: "2024",
    status: "Live",
    cover: {
      src: "/projects/erzurum-sikayet-cover.png",
      alt: "Erzurum Şikayet homepage screenshot",
      width: 1440,
      height: 960,
    },
    stack: ["Laravel", "Blade", "Alpine.js", "MySQL", "Role-based dashboards"],
    highlights: [
      "Built around complaint submission, listings, moderation, and city-level service transparency.",
      "Presented live counts, review states, and directory structure in a public-facing product UI.",
      "Balanced approachable UX with the operational feel expected from an admin-backed platform.",
    ],
    metrics: [
      { label: "System feel", value: "Public + admin" },
      { label: "Workflow", value: "Complaints and moderation" },
    ],
    liveUrl: "https://www.erzurumsikayet.com/",
    repoUrl: "https://github.com/Abdoessam0/erzurumsikayet",
    primaryCtaLabel: "Visit Live",
    secondaryCtaLabel: "View Case Study",
  },
  {
    slug: "real-estate-platforms",
    title: "Real Estate Funnels & Multi-Site Platform",
    featured: true,
    priority: 4,
    context: "RE/MAX Wise • Production real-estate platforms",
    employer: "RE/MAX Wise",
    summary:
      "Multi-site real-estate platform work across Algarve, Lisbon, and 5 Steps with strong emphasis on SEO, reusable UI, and launch quality.",
    description:
      "Built and improved public-facing real-estate platforms using Next.js 15, TypeScript, Tailwind CSS, Supabase, and Vercel during my Erasmus+ experience with RE/MAX Wise.",
    caseStudy:
      "This work was less about one isolated page and more about system quality across multiple properties. I helped shape SEO-safe routing, metadata handling, reusable layouts, and frontend consistency across production launches where public trust and discoverability mattered from day one.",
    role: "Software Developer",
    timeline: "Sep 2025 - Nov 2025",
    status: "Live",
    cover: {
      src: "/projects/remax-lisbon-cover.png",
      alt: "Real Estate Lisbon production platform screenshot",
      width: 1440,
      height: 960,
    },
    gallery: [
      {
        src: "/images/remax-lisbon/remax-lisbon-team.jpg",
        alt: "RE/MAX Wise team photo in Lisbon",
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/remax-lisbon/remax-lisbon-standup.jpg",
        alt: "RE/MAX Wise team standup",
        width: 897,
        height: 617,
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
      "Implemented reusable layouts and frontend systems across multiple real-estate launches.",
      "Worked on SEO-safe routing, metadata structure, internal linking, and discoverability.",
      "Improved accessibility, performance, and interface consistency for production-facing platforms.",
    ],
    metrics: [
      { label: "Sites", value: "3 launches" },
      { label: "Focus", value: "SEO + reusable UI" },
    ],
    liveUrl: "https://www.realestate-lisbon.com/",
    primaryCtaLabel: "Visit Live",
    secondaryCtaLabel: "View Case Study",
  },
  {
    slug: "trustedbuildr",
    title: "TrustedBuildr",
    featured: false,
    priority: 5,
    context: "Independent build • Verified property marketplace",
    summary:
      "Verification-first property marketplace prepared for trust-building, structured content, and international SEO.",
    description:
      "Built a bilingual marketplace concept for verified developers, land listings, and projects with strong emphasis on positioning, structure, and search visibility.",
    caseStudy:
      "TrustedBuildr pushed product thinking around trust, category structure, and future-facing marketplace mechanics. The work combined presentation, information architecture, and SEO considerations into a more premium real-estate product experience.",
    role: "Full-stack Developer",
    timeline: "2025",
    status: "Live",
    cover: {
      src: "/projects/trustedbuildr-cover.png",
      alt: "TrustedBuildr homepage screenshot",
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
      "Designed for trust-heavy property discovery with strong category and content structure.",
      "Implemented technical SEO foundations including sitemaps, structured data, and hreflang.",
      "Positioned the experience as a product platform rather than a standard listing site.",
    ],
    liveUrl: "https://trustedbuildr.com/",
    repoUrl: "https://github.com/Abdoessam0/trustedbuildr",
    primaryCtaLabel: "Visit Live",
    secondaryCtaLabel: "View Case Study",
  },
  {
    slug: "easy4learning",
    title: "Easy4Learning",
    featured: false,
    priority: 6,
    context: "NFS Soft • Education content platform",
    employer: "NFS Soft",
    summary:
      "Education-focused website project represented as archived work because the original domain is no longer live.",
    description:
      "Worked on an education platform with emphasis on structure, readability, and content-first presentation. The original domain is currently parked, so this entry is preserved as archived shipped work.",
    caseStudy:
      "This project remains part of the portfolio because it reflects real client delivery and content-focused implementation. Since the live domain is parked, the portfolio presents an archived capture instead of implying the platform is still actively available.",
    role: "WordPress / Web Developer",
    timeline: "2023",
    status: "Archived",
    archived: true,
    archiveUrl:
      "https://web.archive.org/web/20230704012147if_/https://easy4learning.com/",
    cover: {
      src: "/projects/easy-learning-archive-cover.png",
      alt: "Archived Easy4Learning homepage screenshot",
      width: 1440,
      height: 960,
    },
    stack: [
      "WordPress",
      "Content architecture",
      "Responsive templates",
      "Education UX",
    ],
    highlights: [
      "Built around clean educational content presentation and accessible page structure.",
      "Improved readability, responsiveness, and template quality for a content-heavy site.",
      "Presented transparently as archived work because the original domain is no longer active.",
    ],
    primaryCtaLabel: "View Archive",
    secondaryCtaLabel: "View Case Study",
  },
  {
    slug: "eventsys",
    title: "EventSys",
    featured: false,
    priority: 7,
    context: "Independent build • Event operations product",
    summary:
      "End-to-end event management system with ticketing, recommendations, and administrative tooling.",
    description:
      "Prototype event platform covering live weather, ticketing, authentication, event discovery, and an administrative event workflow.",
    caseStudy:
      "EventSys was a systems-focused build rather than a visual marketing exercise. It combined user flows, backend integration, and administrative tooling into one product concept, which makes it a strong example of full-stack thinking even without a public live launch.",
    role: "Full-stack Developer",
    timeline: "2023",
    status: "Prototype",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "OpenWeather API"],
    highlights: [
      "Combined ticketing, recommendations, weather data, and admin functionality in one platform.",
      "Built secure authentication flows and data-backed event management features.",
      "Used as a systems-thinking project rather than a visual-only portfolio piece.",
    ],
    repoUrl: "https://github.com/Abdoessam0",
    primaryCtaLabel: "View Project",
    secondaryCtaLabel: "Open Repository",
  },
  {
    slug: "yolov8-detection",
    title: "YOLOv8 Real-Time Object Detection",
    featured: false,
    priority: 8,
    context: "Independent build • Computer vision system",
    summary:
      "Real-time detection workflow built around YOLOv8, WebRTC capture, and analytics dashboards.",
    description:
      "Computer vision project combining live camera input, inference, and analytics visualization with performance-oriented model tuning.",
    caseStudy:
      "While this project sits outside traditional frontend work, it demonstrates the same product mindset: make a technical system observable, usable, and structured enough for people to trust the output. That required dashboard thinking as much as model integration.",
    role: "Computer Vision Developer",
    timeline: "2024",
    status: "Prototype",
    stack: ["Python", "YOLOv8", "PyTorch", "OpenCV", "Streamlit", "WebRTC"],
    highlights: [
      "Processed live camera input with real-time detection and analytics feedback.",
      "Built dashboard-style interfaces for performance metrics and object tracking insights.",
      "Focused on usable system feedback instead of model output alone.",
    ],
    repoUrl: "https://github.com/Abdoessam0",
    primaryCtaLabel: "View Project",
    secondaryCtaLabel: "Open Repository",
  },
  {
    slug: "library-management",
    title: "Library Management System",
    featured: false,
    priority: 9,
    context: "Academic build • Desktop operations tool",
    summary:
      "Desktop system for library operations with rule-driven database behavior and reporting.",
    description:
      "C# Windows Forms application backed by SQL Server procedures, triggers, functions, and reporting views for library workflows.",
    caseStudy:
      "This project is less about visual polish and more about dependable operational logic. It demonstrates structured data thinking, business rule enforcement, and end-to-end workflow design at the database and application level.",
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
    secondaryCtaLabel: "Open Repository",
  },
];
