export type ProjectCollection =
  | "Client Work"
  | "Independent"
  | "Prototype"
  | "Academic";

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

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  featured: boolean;
  priority: number;
  year: number;
  collection: ProjectCollection;
  projectType: string;
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
  additionalLinks?: ProjectLink[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export function sortProjects(projects: Project[]) {
  return [...projects].sort((left, right) => {
    if (left.year !== right.year) {
      return right.year - left.year;
    }

    return left.priority - right.priority;
  });
}

export function getProjectPrimaryUrl(project: Project) {
  return project.archived ? project.archiveUrl : project.liveUrl;
}

export const PROJECTS: Project[] = [
  {
    slug: "real-estate-platforms",
    title: "Real Estate Funnels & Multi-Site Platform",
    featured: true,
    priority: 1,
    year: 2025,
    collection: "Client Work",
    projectType: "Multi-Site Real Estate Platform",
    context: "RE/MAX Wise",
    employer: "RE/MAX Wise",
    summary:
      "Built reusable UI and SEO-safe routing across three live real estate sites, improving launch consistency, page quality, and maintainability.",
    description:
      "Reusable UI, SEO-safe routing, and shared layouts across three production real estate platforms.",
    caseStudy:
      "This work covered three live real estate platforms built for different audiences on the same product base. I focused on reusable UI, SEO-safe routing, shared layouts, and launch stability so new site work could ship faster without breaking the desktop or mobile experience.",
    role: "Software Developer",
    timeline: "2025",
    status: "Production",
    cover: {
      src: "/projects/real-estate-platforms-cover.png",
      alt: "Composite cover showing the Algarve, Lisbon, and 5 Steps real estate platforms",
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        src: "/images/real-estate-platforms/algarve-home.png",
        alt: "Real Estate Algarve live homepage",
        width: 1440,
        height: 960,
      },
      {
        src: "/images/real-estate-platforms/lisbon-home.png",
        alt: "Real Estate Lisbon live homepage",
        width: 1440,
        height: 960,
      },
      {
        src: "/images/real-estate-platforms/five-steps-home.png",
        alt: "5 Steps Real Estate live homepage",
        width: 1440,
        height: 960,
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
      "SEO",
      "Reusable UI",
    ],
    highlights: [
      "Built reusable UI and shared layout patterns.",
      "Improved routing and page structure for SEO-safe launches.",
      "Kept multi-site releases consistent across desktop and mobile.",
    ],
    metrics: [
      { label: "Sites", value: "3 live platforms" },
      { label: "Focus", value: "Shared UI and routing" },
    ],
    liveUrl: "https://www.realestate-algarve.co/",
    additionalLinks: [
      { label: "Lisbon Site", url: "https://www.realestate-lisbon.com/" },
      { label: "5 Steps Site", url: "https://www.5stepsrealestate.com/" },
    ],
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
  {
    slug: "trustedbuildr",
    title: "TrustedBuildr.pt",
    featured: true,
    priority: 5,
    year: 2025,
    collection: "Independent",
    projectType: "Marketplace Platform",
    context: "Independent Product",
    summary:
      "Built a bilingual marketplace for verified developers, land listings, and construction projects with scalable structure and search-ready SEO.",
    description:
      "Verified property marketplace with bilingual browsing, SEO-ready pages, and location-based discovery.",
    caseStudy:
      "TrustedBuildr.pt was built as a full-stack marketplace for verified land and construction opportunities. I worked on the product structure, bilingual content flow, SEO-friendly pages, and scalable data handling so the browsing experience stayed clear as the platform grew.",
    role: "Full-Stack Software Engineer",
    timeline: "2025",
    status: "Production",
    cover: {
      src: "/projects/trustedbuildr-cover.png",
      alt: "TrustedBuildr.pt homepage with verified property marketplace messaging",
      width: 1440,
      height: 960,
    },
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Supabase Postgres",
      "next-intl",
      "Leaflet",
    ],
    highlights: [
      "Built bilingual listing and project pages.",
      "Added SEO structure for marketplace discovery.",
      "Designed trust-first browsing for verified listings.",
    ],
    metrics: [
      { label: "Audience", value: "Buyers, landowners, and developers" },
      { label: "Focus", value: "SEO, trust, and scale" },
    ],
    liveUrl: "https://www.trustedbuildr.com/",
    repoUrl: "https://github.com/Abdoessam0/trustbuildrr",
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
  {
    slug: "erzurum-sikayet",
    title: "ErzurumSikayet",
    featured: true,
    priority: 7,
    year: 2025,
    collection: "Independent",
    projectType: "Civic Platform",
    context: "Independent Product",
    summary:
      "Built a complaint and review platform with public flows, dashboards, moderation tools, and production deployment for real user submissions.",
    description:
      "City complaint platform with public flows, dashboard tools, and admin-side management.",
    caseStudy:
      "ErzurumSikayet was built as a full-stack review and complaint platform for local services. I handled the public complaint flow, category browsing, and the dashboard structure for companies and admins so the product could support real reports and moderation work.",
    role: "Full-Stack Software Engineer",
    timeline: "2025",
    status: "Production",
    cover: {
      src: "/projects/erzurum-sikayet-cover.png",
      alt: "ErzurumSikayet homepage showing complaint search and dashboard metrics",
      width: 1440,
      height: 960,
    },
    stack: [
      "Laravel",
      "PHP",
      "Blade",
      "MySQL",
      "Tailwind CSS",
      "Alpine.js",
      "cPanel",
    ],
    highlights: [
      "Built user, company, and admin dashboards.",
      "Implemented complaint submission, category filters, and listing flows.",
      "Deployed the platform for real production use.",
    ],
    metrics: [
      { label: "Areas", value: "Public, company, and admin dashboards" },
      { label: "Focus", value: "Complaint flow and moderation" },
    ],
    liveUrl: "https://erzurumsikayet.com/",
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
  {
    slug: "campus-safety-app",
    title: "Campus Safety App",
    featured: true,
    priority: 6,
    year: 2025,
    collection: "Prototype",
    projectType: "Mobile Safety App",
    context: "Ataturk University",
    summary:
      "Built a campus safety mobile app prototype with emergency alerts, map-based incident reporting, account flows, and admin-side safety workflows.",
    description:
      "Mobile safety app for alerts, incident reporting, profile tools, and admin-side workflows.",
    caseStudy:
      "This mobile app was designed for campus safety workflows at Ataturk University. I worked on the product flow for emergency alerts, incident reporting, profile management, notification preferences, and the admin-side tools needed to manage safety updates.",
    role: "Mobile App Developer",
    timeline: "2025",
    status: "Prototype",
    cover: {
      src: "/projects/campus-safety-cover.png",
      alt: "Campus Safety App cover showing account, feed, map, and report screens",
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        src: "/images/campus-safety/campus-register.png",
        alt: "Campus Safety App account creation screen",
        width: 390,
        height: 844,
        fit: "contain",
      },
      {
        src: "/images/campus-safety/campus-feed.png",
        alt: "Campus Safety App incident feed and emergency alert screen",
        width: 390,
        height: 844,
        fit: "contain",
      },
      {
        src: "/images/campus-safety/campus-map.png",
        alt: "Campus Safety App map screen with incident markers",
        width: 390,
        height: 844,
        fit: "contain",
      },
      {
        src: "/images/campus-safety/campus-report.png",
        alt: "Campus Safety App incident report submission screen",
        width: 390,
        height: 844,
        fit: "contain",
      },
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Expo Router",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "Lucide React Native",
    ],
    highlights: [
      "Built emergency alert and incident reporting flows.",
      "Added profile tools, notification settings, and map-based views.",
      "Connected the app structure to Firebase auth and data services.",
    ],
    metrics: [
      { label: "Platform", value: "Mobile app for campus safety" },
      { label: "Focus", value: "Alerts, reporting, and map views" },
    ],
    repoUrl:
      "https://github.com/Campus-Safety-App-Team/campus-safety-mobile-app",
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
  {
    slug: "eventsys",
    title: "EventSys",
    featured: true,
    priority: 9,
    year: 2023,
    collection: "Prototype",
    projectType: "Event Platform",
    context: "Independent Prototype",
    summary:
      "Built an event management system prototype with authentication, ticketing, weather integration, event discovery, and admin event tools.",
    description:
      "Event platform prototype with auth, ticketing, weather data, and admin tools.",
    caseStudy:
      "EventSys was built as a full-stack event workflow that covers account access, event discovery, ticket purchases, and admin updates. I worked across the React frontend and Node.js backend, including the event feed, purchase flow, and weather data integration.",
    role: "Full-Stack Software Engineer",
    timeline: "2023",
    status: "Prototype",
    cover: {
      src: "/projects/eventsys-cover.png",
      alt: "EventSys cover showing dashboard, admin panel, and ticket purchase views",
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        src: "/images/eventsys/eventsys-dashboard.png",
        alt: "EventSys dashboard with recommended events and event list",
        width: 1918,
        height: 849,
        fit: "contain",
      },
      {
        src: "/images/eventsys/eventsys-admin.png",
        alt: "EventSys admin panel for event and announcement management",
        width: 1915,
        height: 728,
        fit: "contain",
      },
      {
        src: "/images/eventsys/eventsys-purchase.png",
        alt: "EventSys event ticket purchase screen",
        width: 1907,
        height: 650,
        fit: "contain",
      },
    ],
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "OpenWeather API",
    ],
    highlights: [
      "Implemented authentication and password flow logic.",
      "Built ticket purchase and event discovery features.",
      "Added admin tools and weather data integration.",
    ],
    metrics: [
      { label: "Scope", value: "Users, admins, tickets, and events" },
      { label: "Focus", value: "Full-stack workflow" },
    ],
    repoUrl: "https://github.com/Abdoessam0/event-management-system",
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
  {
    slug: "yolov8-detection",
    title: "YOLOv8 Real-Time Object Detection System",
    featured: true,
    priority: 8,
    year: 2024,
    collection: "Prototype",
    projectType: "Computer Vision System",
    context: "Independent Prototype",
    summary:
      "Built a real-time computer vision interface with live detection, model analytics, and a Streamlit monitoring layer for reviewing output.",
    description:
      "Real-time detection system with live inference, analytics, and a Streamlit monitoring layer.",
    caseStudy:
      "This project combined model evaluation with a browser-based monitoring interface for real-time object detection. I focused on the interface and presentation layer that showed live detections, model setup, analytics, and training results in a way that was easier to review and explain.",
    role: "Computer Vision Developer",
    timeline: "2024",
    status: "Prototype",
    cover: {
      src: "/projects/yolo-detection-cover.png",
      alt: "YOLO project cover showing the monitoring interface, live detection, and training metrics",
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        src: "/images/object-detection/yolo-overview.jpeg",
        alt: "YOLO monitoring interface overview screen",
        width: 1600,
        height: 753,
        fit: "contain",
      },
      {
        src: "/images/object-detection/yolo-live-detection.png",
        alt: "YOLO live detection interface tracking an orange in real time",
        width: 1063,
        height: 664,
        fit: "contain",
      },
      {
        src: "/images/object-detection/yolo-street-detection.png",
        alt: "YOLO street scene detection output with object labels",
        width: 747,
        height: 494,
        fit: "contain",
      },
      {
        src: "/images/object-detection/yolo-training-metrics.jpg",
        alt: "YOLO training metrics and benchmark charts",
        width: 1600,
        height: 800,
        fit: "contain",
      },
    ],
    stack: ["Python", "YOLOv8", "PyTorch", "OpenCV", "Streamlit"],
    highlights: [
      "Built a monitoring interface for live detection output.",
      "Added analytics views for model setup and results.",
      "Presented training and performance data in one workflow.",
    ],
    metrics: [
      { label: "Interface", value: "Live detection plus monitoring" },
      { label: "Focus", value: "Inference and analytics" },
    ],
    repoUrl:
      "https://github.com/Object-Detection-Team/object-detection-localization",
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
  {
    slug: "library-management",
    title: "Library Management System",
    featured: false,
    priority: 10,
    year: 2022,
    collection: "Academic",
    projectType: "Desktop Management System",
    context: "Academic Project",
    summary:
      "Built a desktop library automation system for books, students, issuing, returns, and reporting on top of a strong SQL Server backend.",
    description:
      "Desktop library system for books, students, issuing, returns, and reports.",
    caseStudy:
      "This project was built as a desktop workflow for day-to-day library operations. I used Windows Forms and SQL Server to handle book records, student records, issue and return logic, and reporting for staff use.",
    role: "Desktop Developer",
    timeline: "2022",
    status: "Completed",
    cover: {
      src: "/images/library-management/library-dashboard.png",
      alt: "Library Management System dashboard screen",
      width: 1408,
      height: 680,
      fit: "contain",
    },
    gallery: [
      {
        src: "/images/library-management/library-dashboard.png",
        alt: "Library Management System dashboard screen",
        width: 1408,
        height: 680,
        fit: "contain",
      },
      {
        src: "/images/library-management/library-add-book.jpeg",
        alt: "Add book screen in the Library Management System",
        width: 1237,
        height: 587,
        fit: "contain",
      },
      {
        src: "/images/library-management/library-add-student.jpeg",
        alt: "Add student screen in the Library Management System",
        width: 581,
        height: 423,
        fit: "contain",
      },
      {
        src: "/images/library-management/library-issue-books.jpeg",
        alt: "Issue books screen in the Library Management System",
        width: 660,
        height: 436,
        fit: "contain",
      },
      {
        src: "/images/library-management/library-view-students.jpeg",
        alt: "View students screen in the Library Management System",
        width: 787,
        height: 486,
        fit: "contain",
      },
      {
        src: "/images/library-management/library-issued-returned.png",
        alt: "Issued and returned books report screen in the Library Management System",
        width: 1414,
        height: 968,
        fit: "contain",
      },
    ],
    stack: ["C# Windows Forms", "SQL Server", "T-SQL"],
    highlights: [
      "Built book, student, issue, and return workflows.",
      "Added stock tracking and reporting screens.",
      "Used SQL rules to support daily desktop operations.",
    ],
    metrics: [
      { label: "Platform", value: "Windows desktop app" },
      { label: "Focus", value: "Issuing, returns, and reports" },
    ],
    repoUrl: "https://github.com/Abdoessam0/Library-Management-System",
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
  {
    slug: "easy4learning",
    title: "Easy4Learning",
    featured: false,
    priority: 4,
    year: 2026,
    collection: "Client Work",
    projectType: "Education Website",
    context: "Freelance Client",
    employer: "Freelance",
    summary:
      "Improved an education website with cleaner content structure, stronger readability, and more reliable responsive behavior across learning pages.",
    description:
      "Improved content structure, responsive layout, and readability for course pages.",
    caseStudy:
      "This project focused on making course content easier to scan and easier to use across devices. I improved page structure, reading flow, and responsive layout so the site could present learning content more clearly.",
    role: "Web Developer",
    timeline: "2026",
    status: "Live",
    cover: {
      src: "/projects/easy-learning-archive-cover.png",
      alt: "Easy4Learning website homepage",
      width: 1902,
      height: 856,
    },
    stack: ["WordPress", "Responsive Templates", "Content Structure"],
    highlights: [
      "Improved page structure and content flow.",
      "Built responsive layouts for learning pages.",
      "Made longer content easier to read.",
    ],
    metrics: [
      { label: "Type", value: "Education website" },
      { label: "Focus", value: "Readability and layout" },
    ],
    liveUrl: "https://easyforlearn.vercel.app/",
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
  {
    slug: "future-intelligen",
    title: "Future Intelligen",
    featured: true,
    priority: 5,
    year: 2026,
    collection: "Client Work",
    projectType: "Business Website",
    context: "Freelance Client",
    employer: "Freelance",
    summary:
      "Built and improved a business and technology company website with clearer service presentation, stronger visual hierarchy, improved mobile responsiveness, and a more polished user-facing experience.",
    description:
      "Clarified service presentation, strengthened hierarchy, and improved responsive behavior for a business website.",
    caseStudy:
      "Future Intelligen focused on making a business and technology brand feel clearer, more polished, and easier to trust. I improved the service presentation, tightened the visual hierarchy, refined mobile responsiveness, and cleaned up the overall frontend experience so visitors could understand the offer faster.",
    role: "Frontend Engineer",
    timeline: "2026",
    status: "Live",
    cover: {
      src: "/projects/future-intelligen-cover.svg",
      alt: "Future Intelligen homepage concept showing the hero section, call to action, and analytics-style illustration",
      width: 1600,
      height: 1000,
      fit: "contain",
    },
    gallery: [
      {
        src: "/projects/future-intelligen-cover.svg",
        alt: "Future Intelligen homepage concept showing the hero section, call to action, and analytics-style illustration",
        width: 1600,
        height: 1000,
        fit: "contain",
      },
      {
        src: "/images/future-intelligen/future-intelligen-responsive.svg",
        alt: "Responsive concept for Future Intelligen showing desktop and mobile layouts with service cards",
        width: 1600,
        height: 1000,
        fit: "contain",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "Responsive UI",
      "Business Website",
      "Frontend Improvement",
    ],
    highlights: [
      "Made the service offering easier to scan and compare.",
      "Improved hierarchy, spacing, and call-to-action clarity.",
      "Tightened mobile responsiveness and overall polish.",
    ],
    metrics: [
      { label: "Type", value: "Business and technology website" },
      { label: "Focus", value: "Hierarchy, responsiveness, and polish" },
    ],
    liveUrl: "https://futureintelligen.com/",
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
  {
    slug: "ustunler-et-borsasi",
    title: "Ustunler Et Borsasi",
    featured: false,
    priority: 2,
    year: 2026,
    collection: "Client Work",
    projectType: "Business Website",
    context: "Freelance Client",
    employer: "Freelance",
    summary:
      "Built and improved a business website with clearer page structure, better mobile flow, stronger content hierarchy, and cleaner navigation.",
    description:
      "Improved navigation, page flow, and responsive UI for a business website.",
    caseStudy:
      "I worked on the structure and frontend flow of this business website so the content stayed clear and the mobile experience felt more reliable. The main work was around layout, navigation, and cleaner page transitions.",
    role: "Software Engineer",
    timeline: "2026",
    status: "Live",
    cover: {
      src: "/projects/ustunler-et-borsasi-cover.png",
      alt: "Ustunler Et Borsasi business website homepage",
      width: 1440,
      height: 960,
    },
    stack: ["Next.js", "React", "Responsive UI"],
    highlights: [
      "Improved page flow and site navigation.",
      "Tightened the mobile browsing experience.",
      "Kept the layout clear and easy to scan.",
    ],
    metrics: [
      { label: "Type", value: "Business website" },
      { label: "Focus", value: "Navigation and mobile UI" },
    ],
    liveUrl: "https://ustunleretborsasi.com/",
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
  {
    slug: "bels-digital-application-system",
    title: "BELS Digital Application System",
    featured: false,
    priority: 3,
    year: 2026,
    collection: "Client Work",
    projectType: "Admissions Platform",
    context: "Freelance Client",
    employer: "Freelance",
    summary:
      "Built a digital school admissions system with clearer forms, guided application steps, cleaner actions, and more structured student and parent workflows.",
    description:
      "Improved form flow, action clarity, and interface structure for school admissions.",
    caseStudy:
      "This admissions system focused on making form-heavy tasks easier for students and parents. I worked on the application flow, the order of actions, and the clarity of the interface so users could move through the process with less confusion.",
    role: "Software Engineer",
    timeline: "2026",
    status: "Live",
    cover: {
      src: "/projects/bels-application-system-cover.png",
      alt: "BELS digital application system homepage",
      width: 1440,
      height: 960,
    },
    stack: ["React", "Form UX", "Application Workflows"],
    highlights: [
      "Improved the main admissions form flow.",
      "Made actions clearer for parents and students.",
      "Simplified the task order across the application steps.",
    ],
    metrics: [
      { label: "Use Case", value: "Online school admissions" },
      { label: "Focus", value: "Form flow and clarity" },
    ],
    liveUrl: "https://basvuru.bels.k12.tr/",
    primaryCtaLabel: "Live Site",
    secondaryCtaLabel: "View Project",
  },
];
