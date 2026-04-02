export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "cover" | "contain";
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
    context: "RE/MAX Wise · Production",
    employer: "RE/MAX Wise",
    summary:
      "Production real estate platform for RE/MAX Wise. I built shared UI components, improved page structure and routing, and helped keep multiple site launches consistent.",
    description:
      "I worked on shared UI components, page structure, and routing used across multiple launches.",
    caseStudy:
      "Real production work for RE/MAX Wise. I helped build shared UI and keep multiple launches clean and consistent.",
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
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
    ],
    highlights: [
      "Built shared UI components and reusable layouts.",
      "Improved page structure and routing.",
      "Helped keep launches consistent across sites.",
    ],
    metrics: [
      { label: "Sites", value: "3 live sites" },
      { label: "Focus", value: "UI and routing" },
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
    context: "Freelance · Education Website",
    employer: "Freelance",
    summary:
      "An education website for courses and learning content. I improved page structure, readability, and responsive layout to make the content easier to follow.",
    description:
      "I improved content layout, page structure, and responsive templates so course pages were easier to follow.",
    caseStudy:
      "I worked on layout and content structure so users could read and follow the content more easily.",
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
      "Responsive templates",
      "Content structure",
    ],
    highlights: [
      "Improved page structure and readability.",
      "Built responsive templates for course pages.",
      "Made the content easier to follow.",
    ],
    metrics: [
      { label: "Context", value: "Education website" },
      { label: "Focus", value: "Content and layout" },
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
    context: "Freelance · Business Website",
    employer: "Freelance",
    summary:
      "A business website focused on trust and clear navigation. I improved the layout, page flow, and mobile experience.",
    description:
      "I worked on layout, navigation, and responsive UI to make the site easier to use.",
    caseStudy:
      "I focused on trust, structure, and a better mobile experience.",
    role: "Software Engineer",
    timeline: "2026",
    status: "Live",
    cover: {
      src: "/projects/ustunler-et-borsasi-cover.png",
      alt: "Ustunler Et Borsasi homepage",
      width: 1440,
      height: 960,
    },
    stack: ["Next.js", "React", "Responsive UI"],
    highlights: [
      "Improved layout and page flow.",
      "Improved the mobile experience.",
      "Kept the UI clear and simple.",
    ],
    metrics: [
      { label: "Context", value: "Business website" },
      { label: "Focus", value: "Layout and mobile UI" },
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
    context: "Freelance · School System",
    employer: "Freelance",
    summary:
      "A school admissions system. I worked on form flow, clearer actions, and a cleaner interface for students and parents.",
    description:
      "I worked on the application flow and made the main actions easier to follow.",
    caseStudy:
      "I focused on task order, clearer actions, and a simpler interface.",
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
      "Form UX",
      "Application workflows",
    ],
    highlights: [
      "Improved form flow and key actions.",
      "Made the interface clearer for students and parents.",
      "Helped the admissions process feel simpler.",
    ],
    metrics: [
      { label: "Use case", value: "Online admissions" },
      { label: "Focus", value: "Form flow" },
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
    context: "Freelance · Civic Platform",
    employer: "Freelance",
    summary:
      "A public complaint platform with admin features. I built user flows for submitting complaints, listing content, and managing the admin side.",
    description:
      "I built complaint flows, content listing, and admin features for public reports.",
    caseStudy:
      "I focused on clear flows for users and simple tools for admin work.",
    role: "Full-stack Developer",
    timeline: "2026",
    status: "Live",
    cover: {
      src: "/projects/erzurum-sikayet-cover.png",
      alt: "Erzurum Sikayet homepage",
      width: 1440,
      height: 960,
    },
    stack: ["Laravel", "Blade", "Alpine.js", "MySQL"],
    highlights: [
      "Built complaint submission and listing flows.",
      "Added admin features for management.",
      "Kept the public UI clear and easy to use.",
    ],
    metrics: [
      { label: "System", value: "Public and admin" },
      { label: "Focus", value: "Complaints and management" },
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
    context: "Independent · Property Marketplace",
    summary:
      "A property marketplace for verified listings. I built the product with a focus on trust signals, SEO, bilingual pages, and easy browsing.",
    description:
      "I built the product around verified listings, SEO, bilingual pages, and easy browsing.",
    caseStudy:
      "I focused on trust signals, SEO, and support for more than one language.",
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
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Leaflet",
    ],
    highlights: [
      "Built pages for verified listings.",
      "Worked on SEO and bilingual support.",
      "Kept browsing clean and easy to follow.",
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
    context: "Independent · Event Platform",
    summary:
      "An event management system prototype. I built features for login, ticketing, event discovery, weather data, and admin tools.",
    description:
      "I built the main app flow for users and admins, including tickets, weather data, and login.",
    caseStudy:
      "I worked on the main user and admin flows and connected the app data together.",
    role: "Full-stack Developer",
    timeline: "2023",
    status: "Prototype",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "OpenWeather API"],
    highlights: [
      "Built login, ticketing, and event discovery.",
      "Added weather data and admin tools.",
      "Connected the main app flows into one system.",
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
    context: "Independent · Computer Vision",
    summary:
      "A computer vision project with live camera input. I built the interface for live detection, object tracking, and basic performance feedback.",
    description:
      "I built the interface for live detection and basic analytics from camera input.",
    caseStudy:
      "I worked on the interface layer that shows detection results in real time.",
    role: "Computer Vision Developer",
    timeline: "2024",
    status: "Prototype",
    stack: ["Python", "YOLOv8", "PyTorch", "OpenCV", "Streamlit"],
    highlights: [
      "Built the interface for live detection.",
      "Added object tracking and simple feedback.",
      "Focused on clear system output in real time.",
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
    context: "Academic · Desktop App",
    summary:
      "A desktop app for library operations. I built issue and return flows, stock tracking, and reports with SQL-based logic.",
    description:
      "I built key desktop flows for issuing books, returns, stock tracking, and reports.",
    caseStudy:
      "I used C# forms and SQL logic to handle day-to-day library tasks.",
    role: "Desktop Developer",
    timeline: "2022",
    status: "Completed",
    stack: [
      "C#",
      "Windows Forms",
      "SQL Server",
    ],
    highlights: [
      "Built issue and return flows.",
      "Added stock tracking and reports.",
      "Used SQL rules to support daily library work.",
    ],
    repoUrl: "https://github.com/Abdoessam0",
    primaryCtaLabel: "View Project",
    secondaryCtaLabel: "Details",
  },
];
