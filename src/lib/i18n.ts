/**
 * Simple bilingual dictionary - no external i18n library needed.
 * Visible homepage and shared layout copy should live here.
 */

export type Lang = "en" | "ar";
export type Dir = "ltr" | "rtl";

export type ProjectCtaService = {
  title: string;
  body: string;
};

export type ProjectCtaCopy = {
  connector: string;
  badge: string;
  title: string;
  description: string;
  btnEmail: string;
  btnWhatsapp: string;
  email: string;
  emailHref: string;
  whatsappHref: string;
  whatsappDisplay: string;
  cardEmailTitle: string;
  cardEmailDesc: string;
  cardWhatsappTitle: string;
  cardWhatsappDesc: string;
  services: [ProjectCtaService, ProjectCtaService, ProjectCtaService];
};

export type FloatingWhatsappCopy = {
  ariaLabel: string;
  hoverLabel: string;
};

type SectionHeadingCopy = {
  eyebrow: string;
  title: string;
  description?: string;
};

type LabelValueCopy = {
  label: string;
  value: string;
  helper?: string;
  description?: string;
};

type ContactChannelCopy = {
  label: string;
  value?: string;
  note: string;
};

type ProjectFilterCopy = {
  label: string;
  helper: string;
  description: string;
};

type ProjectItemCopy = {
  title?: string;
  context: string;
  projectType: string;
  description: string;
  primaryCtaLabel: string;
};

type ExperienceItemCopy = {
  role: string;
  location: string;
  period: string;
  summary: string;
  impact: string[];
  metrics?: LabelValueCopy[];
  documents?: Record<string, string>;
};

type SiteCopy = {
  dir: Dir;
  label: string;
  headline: string;
  sub: string;
  cta1: string;
  cta2: string;
  cta3: string;
  toggle: string;
  marquee: string;
  language: {
    toggleLabel: string;
    en: string;
    ar: string;
    switchToEnglish: string;
    switchToArabic: string;
  };
  nav: {
    about: string;
    projects: string;
    experience: string;
    skills: string;
    contact: string;
    credentials: string;
  };
  common: {
    core: string;
    more: string;
    viewProject: string;
    liveSite: string;
    github: string;
    openPdf: string;
    downloadCv: string;
  };
  founder: {
    eyebrow: string;
    title: string;
    description: string;
    proof: string[];
    primaryCta: string;
    secondaryCta: string;
    companyProject: string;
    offerings: string[];
    trust: LabelValueCopy[];
  };
  about: {
    heading: SectionHeadingCopy;
    intro: string;
    badges: string[];
    story: string[];
    workLabel: string;
    workItems: string[];
    focusAreas: LabelValueCopy[];
    glanceLabel: string;
    factCards: LabelValueCopy[];
    educationLabel: string;
    education: Array<{
      degree: string;
      institution: string;
      location: string;
      period: string;
    }>;
    howIWorkLabel: string;
    principles: string[];
  };
  projects: {
    heading: SectionHeadingCopy;
    stats: {
      projects: LabelValueCopy;
      live: LabelValueCopy;
      clientWork: LabelValueCopy;
    };
    browseByType: string;
    filters: Record<
      "all" | "Client Work" | "Independent" | "Prototype" | "Academic",
      ProjectFilterCopy
    >;
    shown: string;
    shownSingular: string;
    shownPlural: string;
    filterAriaLabel: string;
    collectionLabels: Record<string, string>;
    statusLabels: Record<string, string>;
    items: Record<string, ProjectItemCopy>;
  };
  experience: {
    heading: SectionHeadingCopy;
    labels: {
      documents: string;
      links: string;
      relatedWork: string;
      details: string;
      moments: string;
      momentsTitle: string;
      momentsDescription: string;
      momentsSub: string;
    };
    items: Record<string, ExperienceItemCopy>;
  };
  skills: {
    heading: SectionHeadingCopy;
    coreWorkflow: string;
    aiTitle: string;
    aiDescription: string;
    aiChips: string[];
    categoryTitles: Record<string, string>;
    categorySummaries: Record<string, string>;
  };
  credentials: {
    heading: SectionHeadingCopy;
    education: string;
    volunteering: string;
    certificates: string;
    volunteeringItems: Record<
      string,
      {
        title: string;
        location: string;
        period: string;
        linkLabel?: string;
      }
    >;
  };
  contact: {
    heading: SectionHeadingCopy;
    panelEyebrow: string;
    openToWork: string;
    availability: string;
    description: string;
    channels: Record<
      "email" | "whatsapp" | "linkedin" | "github" | "instagram" | "resume",
      ContactChannelCopy
    >;
  };
  footer: {
    description: string;
    builtWith: string;
    rights: string;
  };
  cv: {
    pill: string;
    title: string;
    description: string;
    download: string;
    openPdf: string;
  };
  floatingWhatsapp: FloatingWhatsappCopy;
  projectCta: ProjectCtaCopy;
};

export const dict: Record<Lang, SiteCopy> = {
  en: {
    dir: "ltr",
    label: "Abdo Essam - Computer Engineering Graduate / Junior Full-Stack Developer",
    headline: "I build websites, dashboards, and web platforms\nfor real business work.",
    sub: "Computer Engineering graduate, frontend-first and full-stack capable. I work with Next.js, React, TypeScript, Tailwind, PHP/Laravel, MySQL, REST APIs, and AI-assisted coding workflows to ship practical digital products.",
    cta1: "View My Work",
    cta2: "Download CV",
    cta3: "Let's Talk",
    toggle: "عربي",
    marquee:
      "ABDO ESSAM - SOFTWARE ENGINEER - NEXT.JS - REACT - TYPESCRIPT - PRODUCTION WEB APPS - UI/UX - API SYSTEMS - ",
    language: {
      toggleLabel: "Choose language",
      en: "EN",
      ar: "عربي",
      switchToEnglish: "Switch to English",
      switchToArabic: "Switch to Arabic",
    },
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact",
      credentials: "Credentials",
    },
    common: {
      core: "Core",
      more: "more",
      viewProject: "View Project",
      liveSite: "Live Site",
      github: "GitHub",
      openPdf: "Open PDF",
      downloadCv: "Download CV",
    },
    founder: {
      eyebrow: "Case Study",
      title: "Kolaytec Business Platform",
      description:
        "Kolaytec is a company I founded for building practical websites, admin panels, dashboards, and business platforms. Through it, I turn client needs into clean, usable, production-ready web products.",
      proof: [
        "Business websites",
        "Admin panels and dashboards",
        "Full-stack delivery",
      ],
      primaryCta: "Visit Kolaytec",
      secondaryCta: "Let's Talk",
      companyProject: "Company project",
      offerings: ["Websites", "Dashboards", "Admin panels"],
      trust: [
        {
          label: "Production",
          value: "Production web platforms",
          description: "Real websites, dashboards, and product pages built for public use.",
        },
        {
          label: "Delivery",
          value: "Frontend + full-stack delivery",
          description: "React/Next.js interfaces with API-connected workflows and data handling.",
        },
        {
          label: "Experience",
          value: "IME and international experience",
          description: "FeinSoft İME internship, Erasmus+ software work in Portugal, and client-facing support in Saudi Arabia.",
        },
        {
          label: "Systems",
          value: "Admin panels and dashboards",
          description: "Interfaces for managing data, events, content, and operational workflows.",
        },
      ],
    },
    about: {
      heading: {
        eyebrow: "About",
        title: "Software Engineer, frontend-first.",
      },
      intro: "Software Engineer / Full-Stack Developer / Frontend-First",
      badges: ["Ankara, Turkey", "Egyptian", "GMT+3"],
      story: [
        "I am Abdo Essam, a Computer Engineering graduate from Atatürk University who builds practical web products for real users.",
        "My work is strongest around frontend implementation, API-connected workflows, admin panels, dashboards, business websites, and applied AI/computer vision interfaces.",
        "My background includes a FeinSoft İME internship in Ankara, Erasmus+ traineeship experience in Portugal, client-facing technical support in Saudi Arabia, and freelance production web work.",
        "I am interested in junior software engineering, full-stack, frontend, and AI-assisted coding roles where clean delivery, communication, and reliability matter.",
      ],
      workLabel: "Work",
      workItems: ["Websites", "Dashboards", "Full-stack systems", "AI-assisted workflows"],
      focusAreas: [
        {
          label: "Frontend",
          value: "Frontend",
          description: "Responsive interfaces, clean component systems, and polished product pages.",
        },
        {
          label: "Full-stack",
          value: "Full-stack",
          description: "API-connected workflows, dashboards, admin panels, and business systems.",
        },
        {
          label: "Delivery",
          value: "Delivery",
          description: "Clear communication, debugging, performance, and reliable launch work.",
        },
      ],
      glanceLabel: "At a glance",
      factCards: [
        {
          label: "Role",
          value: "Junior Software Engineer / Full-Stack Developer",
          description: "B.Sc. Computer Engineering from Atatürk University, ALX Full-Stack diploma, and production web delivery.",
        },
        {
          label: "Build",
          value: "Websites, dashboards, and platforms",
          description: "Frontend-first, full-stack capable across real product work.",
        },
        {
          label: "Focus",
          value: "Clean delivery for real users",
          description: "Production UI, API-connected systems, admin panels, and client work.",
        },
      ],
      educationLabel: "Education",
      education: [
        {
          degree: "B.Sc. Computer Engineering",
          institution: "Atatürk University",
          location: "Erzurum, Turkey",
          period: "Graduated Jun 2026",
        },
        {
          degree: "Full-Stack Software Engineer Diploma",
          institution: "ALX",
          location: "Remote",
          period: "Oct 2023 - Nov 2024",
        },
      ],
      howIWorkLabel: "How I work",
      principles: [
        "Production web platforms",
        "API-driven systems",
        "Client-facing support",
        "AI-assisted coding workflows",
      ],
    },
    projects: {
      heading: {
        eyebrow: "Projects",
        title: "Projects in one clean, filterable view",
        description:
          "Everything is shown together in a single grid, ordered from newest to oldest so the latest work appears first and stays easy to browse.",
      },
      stats: {
        projects: {
          label: "Projects",
          value: "selected",
          helper: "Client work, shipped products, and prototypes",
        },
        live: {
          label: "Live",
          value: "public launches",
          helper: "Confirmed live links and production sites",
        },
        clientWork: {
          label: "Client work",
          value: "recent builds",
          helper: "Freelance and production delivery work",
        },
      },
      browseByType: "Browse by type",
      filters: {
        all: {
          label: "All work",
          helper: "Newest first",
          description:
            "All projects are shown together in one grid, ordered from newest to oldest, with filtering still available.",
        },
        "Client Work": {
          label: "Client Work",
          helper: "Live builds",
          description:
            "Live and production-facing work for business, education, and admissions projects.",
        },
        Independent: {
          label: "Independent",
          helper: "Product work",
          description:
            "Independent products built around marketplace, platform, and civic workflows.",
        },
        Prototype: {
          label: "Prototypes",
          helper: "Concepts and systems",
          description:
            "Exploratory builds focused on product flow, interfaces, and technical execution.",
        },
        Academic: {
          label: "Academic",
          helper: "Coursework",
          description:
            "Academic project work with implementation depth and complete workflows.",
        },
      },
      shown: "shown",
      shownSingular: "project",
      shownPlural: "projects",
      filterAriaLabel: "Filter portfolio projects",
      collectionLabels: {
        "Client Work": "Client Work",
        Independent: "Independent",
        Prototype: "Prototype",
        Academic: "Academic",
      },
      statusLabels: {
        Production: "Production",
        Live: "Live",
        Prototype: "Prototype",
        Completed: "Completed",
      },
      items: {
        easypick: {
          context: "Interactive Smart Table Prototype",
          projectType: "Restaurant Decision-Support Platform",
          description:
            "Smart-table restaurant experience with mood-based and preference-based meal recommendations, comparison, and QR confirmation.",
          primaryCtaLabel: "Live Demo",
        },
        "real-estate-platforms": {
          title: "RE/MAX Algarve and Wise Real Estate Platforms",
          context: "RE/MAX Wise",
          projectType: "Multi-Site Real Estate Platform",
          description:
            "Reusable UI, SEO-safe routing, and shared layouts across live Algarve, Lisbon, and 5 Steps real estate platforms.",
          primaryCtaLabel: "Live Site",
        },
        trustedbuildr: {
          context: "Independent Product",
          projectType: "Marketplace Platform",
          description:
            "Verified property marketplace with bilingual browsing, SEO-ready pages, and location-based discovery.",
          primaryCtaLabel: "Live Site",
        },
        "erzurum-sikayet": {
          context: "Independent Product",
          projectType: "Civic Platform",
          description:
            "City complaint platform with public flows, dashboard tools, and admin-side management.",
          primaryCtaLabel: "Live Site",
        },
        "campus-safety-app": {
          context: "Atatürk University",
          projectType: "Mobile Safety App",
          description:
            "Mobile safety app for alerts, incident reporting, profile tools, and admin-side workflows.",
          primaryCtaLabel: "Live Site",
        },
        eventsys: {
          context: "Independent Prototype",
          projectType: "Event Platform",
          description:
            "Event platform prototype with auth, ticketing, weather data, and admin tools.",
          primaryCtaLabel: "Live Site",
        },
        "yolov8-detection": {
          context: "Independent Prototype",
          projectType: "Computer Vision System",
          description:
            "Real-time detection system with live inference, analytics, and a Streamlit monitoring layer.",
          primaryCtaLabel: "Live Site",
        },
        "library-management": {
          context: "Academic Project",
          projectType: "Desktop Management System",
          description:
            "Desktop library system for books, students, issuing, returns, and reports.",
          primaryCtaLabel: "Live Site",
        },
        "kolaytec-business-platform": {
          context: "Kolaytec",
          projectType: "Business Website",
          description:
            "Company website, service pages, multilingual content, contact flow, SEO setup, and production deployment.",
          primaryCtaLabel: "Live Site",
        },
        portfolio: {
          context: "Personal Project",
          projectType: "Personal Portfolio",
          description:
            "Next.js portfolio with structured sections, project detail pages, CV links, SEO metadata, and recruiter-friendly positioning.",
          primaryCtaLabel: "Live Site",
        },
        easy4learning: {
          context: "Freelance Client",
          projectType: "Education Website",
          description:
            "Improved content structure, responsive layout, and readability for course pages.",
          primaryCtaLabel: "Live Site",
        },
        "future-intelligen": {
          context: "Freelance Client",
          projectType: "Business Website",
          description:
            "Clarified service presentation, strengthened hierarchy, and improved responsive behavior for a business website.",
          primaryCtaLabel: "Live Site",
        },
        "ustunler-et-borsasi": {
          title: "Üstünler Et Borsası",
          context: "Freelance Client",
          projectType: "Business Website",
          description:
            "Improved navigation, page flow, and responsive UI for the Et Borsası business website.",
          primaryCtaLabel: "Live Site",
        },
        "bels-digital-application-system": {
          title: "BELS Digital Campus",
          context: "Freelance Client",
          projectType: "Digital Campus / Admissions Platform",
          description:
            "Improved form flow, action clarity, and interface structure for a digital campus admissions workflow.",
          primaryCtaLabel: "Live Site",
        },
      },
    },
    experience: {
      heading: {
        eyebrow: "Experience",
        title: "Experience",
      },
      labels: {
        documents: "Documents",
        links: "Links",
        relatedWork: "Related work",
        details: "View experience details",
        moments: "Moments",
        momentsTitle: "Photos from my internship in Riyadh.",
        momentsDescription: "Team moments and certificate handoff during the role.",
        momentsSub: "Technical Support Internship, 2024",
      },
      items: {
        feinsoft: {
          role: "İME Software Engineering Intern",
          location: "Ankara, Türkiye",
          period: "2026 - 4 months",
          summary:
            "Atatürk University İME internship during my final year of Computer Engineering, focused on frontend implementation, software development tasks, and real business website work.",
          impact: [
            "Worked on business-facing web interfaces and frontend implementation.",
            "Supported software development tasks in a real company environment.",
            "Gained practical experience with client requirements, team workflows, and delivery expectations.",
          ],
        },
        "remax-wise": {
          role: "Software Developer",
          location: "Lisbon, Portugal",
          period: "Sep 2025 - Nov 2025",
          summary: "Worked on production real estate websites during an Erasmus+ traineeship in Lisbon.",
          impact: [
            "Built reusable UI components and shared layouts across multiple sites.",
            "Improved page structure, routing, and internal linking.",
            "Helped keep site launches clean, consistent, and easier to maintain.",
          ],
          metrics: [
            { label: "Sites", value: "3", helper: "Lisbon, Algarve, and 5 Steps" },
            { label: "Focus", value: "UI and routing" },
          ],
        },
        afaqy: {
          role: "Technical Support Engineer",
          location: "Riyadh, Saudi Arabia",
          period: "Jul 2024 - Sep 2024",
          summary: "Supported fleet management systems across 650+ GPS devices.",
          impact: [
            "Handled diagnostics, customer support, and follow-ups.",
            "Guided users on AFAQY Pro and resolved day-to-day issues.",
            "Helped keep data accurate across internal systems.",
          ],
          metrics: [
            { label: "Devices", value: "650+", helper: "Fleet GPS systems" },
            { label: "Focus", value: "Diagnostics + reliability" },
          ],
          documents: {
            "View PDF": "View PDF",
            Certificate: "Certificate",
          },
        },
        "nfs-soft": {
          role: "WordPress Developer Intern",
          location: "Erzurum, Turkey",
          period: "Oct 2022 - Dec 2022",
          summary: "Built multilingual websites and custom WordPress templates.",
          impact: [
            "Improved responsive layout and content structure.",
            "Helped with hosting, updates, and client delivery.",
            "Built websites for business and education clients.",
          ],
          metrics: [
            { label: "Strengths", value: "Frontend quality + content systems" },
            { label: "Context", value: "Business and education websites" },
          ],
        },
      },
    },
    skills: {
      heading: {
        eyebrow: "Skills",
        title: "Skills",
        description:
          "A compact view of the technologies I use most across production websites, dashboards, backend work, mobile apps, and AI-assisted workflows.",
      },
      coreWorkflow: "Core workflow",
      aiTitle: "AI Agents & Workflow",
      aiDescription:
        "Comfortable using AI coding agents to plan, build, debug, refactor, review, and ship software faster while keeping control over code quality.",
      aiChips: [
        "AI Coding Agents",
        "Prompt Engineering",
        "Workflow Automation",
        "Debugging",
        "Code Review",
        "Faster Prototyping",
      ],
      categoryTitles: {
        Frontend: "Frontend",
        "Backend and APIs": "Backend and APIs",
        Mobile: "Mobile",
        Databases: "Databases",
        "AI and Computer Vision": "AI and Computer Vision",
        "CMS and Platforms": "CMS and Platforms",
        "Deployment and DevOps": "Deployment and DevOps",
        "SEO and Product Engineering": "SEO and Product Engineering",
        Tools: "Tools",
      },
      categorySummaries: {
        Frontend: "UI engineering for production web apps and client work.",
        "Backend and APIs": "Server-side logic, integration work, and API-driven features.",
        Mobile: "Mobile app development with React Native and Expo.",
        Databases: "Relational and document databases across web and desktop systems.",
        "AI and Computer Vision": "Applied machine learning for real-time detection systems.",
        "CMS and Platforms": "Client delivery and content-driven site work.",
        "Deployment and DevOps": "Deployment and environment work used in production projects.",
        "SEO and Product Engineering": "Technical SEO applied to production websites.",
        Tools: "Everyday tools for building, testing, and collaboration.",
      },
    },
    credentials: {
      heading: {
        eyebrow: "Credentials",
        title: "Education, certificates, and volunteering",
      },
      education: "Education",
      volunteering: "Volunteering",
      certificates: "Certificates",
      volunteeringItems: {
        "youth-summer-fest": {
          title: "Volunteer Facilitator",
          location: "Romania",
          period: "Aug 2025 - Sep 2025",
          linkLabel: "View document",
        },
        "erasmus-structured-dialogue": {
          title: "Structured Dialogue Participant",
          location: "Istanbul, Turkiye",
          period: "Mar 2021 - Apr 2023",
          linkLabel: "View document",
        },
        "snowboard-worldcup": {
          title: "Volunteer Translator",
          location: "Erzurum (Palandoken), Turkiye",
          period: "Feb 2025 - Mar 2025",
        },
        "damla-volunteering": {
          title: "Volunteer Participant",
          location: "Erzincan, Turkiye",
          period: "Sep 2023",
          linkLabel: "View document",
        },
      },
    },
    contact: {
      heading: {
        eyebrow: "Contact",
        title: "Open to full-time roles, freelance work, and collaborations.",
        description: "The best way to reach me is by email, LinkedIn, or Instagram.",
      },
      panelEyebrow: "Contact",
      openToWork: "Open to work",
      availability: "If you have a role or project in mind, feel free to reach out.",
      description: "The best way to reach me is by email, LinkedIn, or Instagram.",
      channels: {
        email: { label: "Email", note: "Direct contact" },
        linkedin: { label: "LinkedIn", note: "Roles and connections" },
        github: { label: "GitHub", note: "Code and project work" },
        instagram: { label: "Instagram", note: "Updates and contact" },
        whatsapp: { label: "WhatsApp", note: "Quick follow-up" },
        resume: { label: "CV", value: "Download CV", note: "Resume PDF" },
      },
    },
    footer: {
      description: "Software Engineer building websites, dashboards, and business platforms.",
      builtWith: "Built with Next.js, TypeScript, and Tailwind CSS",
      rights: "All rights reserved.",
    },
    cv: {
      pill: "CV",
      title: "Recruiter-ready resume download",
      description:
        "The latest CV is provided as a direct PDF for fast recruiter review. Use the primary action below for the downloadable version or open it in a new tab for a quick skim.",
      download: "Download CV",
      openPdf: "Open PDF",
    },
    floatingWhatsapp: {
      ariaLabel: "Message Abdo Essam on WhatsApp",
      hoverLabel: "Message me",
    },
    projectCta: {
      connector:
        "If my work feels close to what you need, send me the idea and I will help you shape the next step.",
      badge: "Quick start",
      title: "Let's build your next project.",
      description:
        "Tell me what you want to build, improve, or fix. I can help with clean frontend interfaces, API-connected dashboards, performance improvements, and production-ready web applications.",
      btnEmail: "Start by Email",
      btnWhatsapp: "Message on WhatsApp",
      email: "abdoessammo@gmail.com",
      emailHref: "mailto:abdoessammo@gmail.com",
      whatsappHref: "https://wa.me/905527508202",
      whatsappDisplay: "+90 552 750 82 02",
      cardEmailTitle: "Email",
      cardEmailDesc: "Send project details, links, or a short brief.",
      cardWhatsappTitle: "WhatsApp",
      cardWhatsappDesc: "For quick questions, project ideas, or availability.",
      services: [
        {
          title: "Frontend build",
          body: "Clean, responsive interfaces with React, Next.js, and Tailwind.",
        },
        {
          title: "API dashboards",
          body: "Dashboards and workflows connected to REST APIs, databases, and admin systems.",
        },
        {
          title: "Performance fixes",
          body: "Speed, UX, accessibility, and deployment stability improvements.",
        },
      ],
    },
  },
  ar: {
    dir: "rtl",
    label: "عبدو عصام - مهندس برمجيات / مطور Full-Stack",
    headline: "أبني مواقع ولوحات تحكم ومنصات ويب\nتخدم العمل الحقيقي.",
    sub: "أعمل على الواجهات أولًا، ومعي خبرة Full-Stack. أستخدم Next.js و React و TypeScript و Tailwind و PHP/Laravel و MySQL و REST APIs لبناء منتجات عملية.",
    cta1: "شاهد أعمالي",
    cta2: "تحميل السيرة الذاتية",
    cta3: "تواصل معي",
    toggle: "EN",
    marquee:
      "عبدو عصام - مهندس برمجيات - Next.js - React - TypeScript - تطبيقات ويب عملية - واجهات مستخدم - أنظمة API - ",
    language: {
      toggleLabel: "اختيار اللغة",
      en: "EN",
      ar: "عربي",
      switchToEnglish: "التبديل إلى الإنجليزية",
      switchToArabic: "التبديل إلى العربية",
    },
    nav: {
      about: "عنّي",
      projects: "المشاريع",
      experience: "الخبرة",
      skills: "المهارات",
      contact: "تواصل",
      credentials: "الشهادات",
    },
    common: {
      core: "أساسي",
      more: "أخرى",
      viewProject: "عرض المشروع",
      liveSite: "الموقع",
      github: "GitHub",
      openPdf: "فتح PDF",
      downloadCv: "تحميل السيرة الذاتية",
    },
    founder: {
      eyebrow: "المؤسس",
      title: "Kolaytec - مشروع شركة وموقع ويب",
      description:
        "Kolaytec شركة أسستها لبناء مواقع عملية ولوحات إدارة ولوحات تحكم ومنصات أعمال. من خلالها أحوّل احتياج العميل إلى منتج ويب واضح وجاهز للاستخدام.",
      proof: ["مواقع أعمال", "لوحات إدارة وتحكم", "تنفيذ Full-Stack"],
      primaryCta: "زيارة Kolaytec",
      secondaryCta: "تواصل معي",
      companyProject: "مشروع شركة",
      offerings: ["مواقع", "لوحات تحكم", "لوحات إدارة"],
      trust: [
        {
          label: "إنتاج",
          value: "منصات ويب منشورة",
          description: "مواقع ولوحات تحكم وصفحات منتجات موجهة للاستخدام العام.",
        },
        {
          label: "تنفيذ",
          value: "واجهات + Full-Stack",
          description: "واجهات React/Next.js مرتبطة بتدفقات API وإدارة بيانات.",
        },
        {
          label: "خبرة",
          value: "تدريب دولي عملي",
          description: "عمل برمجي ودعم عملاء في البرتغال والسعودية وتركيا.",
        },
        {
          label: "أنظمة",
          value: "لوحات إدارة وتحكم",
          description: "واجهات لإدارة البيانات والفعاليات والمحتوى وسير العمل.",
        },
      ],
    },
    about: {
      heading: {
        eyebrow: "عنّي",
        title: "مهندس برمجيات بتركيز قوي على الواجهات.",
      },
      intro: "مهندس برمجيات / مؤسس / Frontend-First",
      badges: ["أنقرة، تركيا", "مصري", "GMT+3"],
      story: [
        "أنا عبدو عصام، مهندس برمجيات أبني منتجات ويب عملية لمستخدمين حقيقيين.",
        "أقوى أعمالي في تنفيذ الواجهات، ربط APIs، لوحات الإدارة، لوحات التحكم، ومواقع الأعمال.",
        "أبحث عن أدوار برمجية أو عمل منتج يهتم بجودة التنفيذ، التواصل الواضح، والاعتمادية.",
      ],
      workLabel: "العمل",
      workItems: ["مواقع", "لوحات تحكم", "أنظمة Full-Stack", "تطبيقات إنتاج"],
      focusAreas: [
        {
          label: "الواجهات",
          value: "الواجهات",
          description: "واجهات متجاوبة، مكونات منظمة، وصفحات منتجات مصقولة.",
        },
        {
          label: "Full-Stack",
          value: "Full-Stack",
          description: "تدفقات مرتبطة بـ APIs، لوحات تحكم، لوحات إدارة، وأنظمة أعمال.",
        },
        {
          label: "التنفيذ",
          value: "التنفيذ",
          description: "تواصل واضح، معالجة أخطاء، تحسين أداء، وإطلاق مستقر.",
        },
      ],
      glanceLabel: "نظرة سريعة",
      factCards: [
        {
          label: "الدور",
          value: "مهندس برمجيات + مؤسس",
          description: "بكالوريوس هندسة الحاسوب، دبلومة ALX Full-Stack، ومؤسس مستقل.",
        },
        {
          label: "البناء",
          value: "مواقع ولوحات تحكم ومنصات",
          description: "أبدأ من الواجهة ومعي قدرة Full-Stack في مشاريع عملية.",
        },
        {
          label: "التركيز",
          value: "تنفيذ واضح لمستخدمين حقيقيين",
          description: "واجهات إنتاج، أنظمة مرتبطة بـ API، لوحات إدارة، وعملاء.",
        },
      ],
      educationLabel: "التعليم",
      education: [
        {
          degree: "بكالوريوس هندسة الحاسوب",
          institution: "Atatürk University",
          location: "أرضروم، تركيا",
          period: "تخرج في يونيو 2026",
        },
        {
          degree: "دبلومة Full-Stack Software Engineer",
          institution: "ALX",
          location: "عن بعد",
          period: "أكتوبر 2023 - نوفمبر 2024",
        },
      ],
      howIWorkLabel: "طريقة عملي",
      principles: [
        "منصات ويب إنتاجية",
        "أنظمة تعتمد على API",
        "تواصل مباشر مع العملاء",
        "تنفيذ موثوق",
      ],
    },
    projects: {
      heading: {
        eyebrow: "المشاريع",
        title: "مشاريع مرتبة في عرض واحد قابل للتصفية",
        description:
          "كل المشاريع معروضة في شبكة واحدة من الأحدث إلى الأقدم، مع تصفية بسيطة لتصفح العمل بسرعة.",
      },
      stats: {
        projects: {
          label: "المشاريع",
          value: "مختارة",
          helper: "عملاء، منتجات منشورة، ونماذج أولية",
        },
        live: {
          label: "منشور",
          value: "إطلاقات عامة",
          helper: "روابط مباشرة ومواقع إنتاج",
        },
        clientWork: {
          label: "عملاء",
          value: "مشاريع حديثة",
          helper: "تنفيذ Freelance ومشاريع إنتاج",
        },
      },
      browseByType: "تصفح حسب النوع",
      filters: {
        all: {
          label: "كل الأعمال",
          helper: "الأحدث أولًا",
          description:
            "كل المشاريع معروضة في شبكة واحدة من الأحدث إلى الأقدم، مع إمكانية التصفية عند الحاجة.",
        },
        "Client Work": {
          label: "عملاء",
          helper: "مشاريع منشورة",
          description:
            "أعمال حقيقية وموجهة للإنتاج في مجالات الأعمال والتعليم والتقديمات.",
        },
        Independent: {
          label: "مستقل",
          helper: "منتجات",
          description:
            "منتجات مستقلة حول الأسواق والمنصات وسير العمل الخدمي.",
        },
        Prototype: {
          label: "نماذج",
          helper: "أفكار وأنظمة",
          description:
            "نماذج استكشافية تركز على تدفق المنتج والواجهة والتنفيذ التقني.",
        },
        Academic: {
          label: "أكاديمي",
          helper: "مشاريع دراسة",
          description: "مشاريع أكاديمية بتفاصيل تنفيذ وتدفقات كاملة.",
        },
      },
      shown: "معروضة",
      shownSingular: "مشروع",
      shownPlural: "مشاريع",
      filterAriaLabel: "تصفية مشاريع البورتفوليو",
      collectionLabels: {
        "Client Work": "عملاء",
        Independent: "مستقل",
        Prototype: "نموذج",
        Academic: "أكاديمي",
      },
      statusLabels: {
        Production: "إنتاج",
        Live: "منشور",
        Prototype: "نموذج",
        Completed: "مكتمل",
      },
      items: {
        easypick: {
          context: "نموذج أولي لطاولة ذكية تفاعلية",
          projectType: "منصة دعم قرار للمطاعم",
          description:
            "تجربة مطعم لطاولة ذكية تقدم ترشيحات وجبات حسب المزاج والتفضيلات، مع المقارنة وتأكيد الطلب عبر QR.",
          primaryCtaLabel: "العرض المباشر",
        },
        "real-estate-platforms": {
          context: "RE/MAX Wise",
          projectType: "منصة عقارية متعددة المواقع",
          description:
            "واجهات قابلة لإعادة الاستخدام، Routing مناسب للـ SEO، وتخطيطات مشتركة لثلاث منصات عقارية منشورة.",
          primaryCtaLabel: "الموقع",
        },
        trustedbuildr: {
          context: "منتج مستقل",
          projectType: "منصة Marketplace",
          description:
            "Marketplace للعقارات الموثقة مع تصفح ثنائي اللغة، صفحات SEO، واكتشاف حسب الموقع.",
          primaryCtaLabel: "الموقع",
        },
        "erzurum-sikayet": {
          context: "منتج مستقل",
          projectType: "منصة شكاوى",
          description:
            "منصة شكاوى ومراجعات للمدينة بتدفقات عامة ولوحات تحكم وإدارة للمحتوى.",
          primaryCtaLabel: "الموقع",
        },
        "campus-safety-app": {
          context: "Atatürk University",
          projectType: "تطبيق سلامة جامعية",
          description:
            "تطبيق موبايل للتنبيهات، بلاغات الحوادث، أدوات الحساب، وسير عمل الإدارة.",
          primaryCtaLabel: "الموقع",
        },
        eventsys: {
          context: "نموذج مستقل",
          projectType: "منصة فعاليات",
          description:
            "نموذج منصة فعاليات مع تسجيل دخول، تذاكر، بيانات طقس، وأدوات إدارة.",
          primaryCtaLabel: "الموقع",
        },
        "yolov8-detection": {
          context: "نموذج مستقل",
          projectType: "نظام رؤية حاسوبية",
          description:
            "نظام كشف لحظي مع واجهة عرض، تحليلات، وطبقة مراقبة باستخدام Streamlit.",
          primaryCtaLabel: "الموقع",
        },
        "library-management": {
          context: "مشروع أكاديمي",
          projectType: "نظام إدارة مكتبة",
          description:
            "نظام سطح مكتب لإدارة الكتب والطلاب والإعارة والإرجاع والتقارير.",
          primaryCtaLabel: "الموقع",
        },
        easy4learning: {
          context: "عميل Freelance",
          projectType: "موقع تعليمي",
          description:
            "تحسين بنية المحتوى، تجاوب الصفحات، وقابلية قراءة صفحات الدورات.",
          primaryCtaLabel: "الموقع",
        },
        "future-intelligen": {
          context: "عميل Freelance",
          projectType: "موقع أعمال",
          description:
            "توضيح عرض الخدمات، تقوية التسلسل البصري، وتحسين تجاوب موقع أعمال.",
          primaryCtaLabel: "الموقع",
        },
        "ustunler-et-borsasi": {
          context: "عميل Freelance",
          projectType: "موقع أعمال",
          description:
            "تحسين التنقل، تدفق الصفحات، وتجربة الواجهة المتجاوبة لموقع أعمال.",
          primaryCtaLabel: "الموقع",
        },
        "bels-digital-application-system": {
          context: "عميل Freelance",
          projectType: "منصة تقديمات",
          description:
            "تحسين تدفق النماذج، وضوح الإجراءات، وبنية واجهة التقديم المدرسي.",
          primaryCtaLabel: "الموقع",
        },
      },
    },
    experience: {
      heading: {
        eyebrow: "الخبرة",
        title: "الخبرة",
      },
      labels: {
        documents: "المستندات",
        links: "الروابط",
        relatedWork: "أعمال مرتبطة",
        details: "عرض تفاصيل الخبرة",
        moments: "لحظات",
        momentsTitle: "صور من فترة التدريب في الرياض.",
        momentsDescription: "لقطات من الفريق وتسليم الشهادة أثناء الدور.",
        momentsSub: "تدريب دعم فني، 2024",
      },
      items: {
        feinsoft: {
          role: "متدرب برمجة طويل المدى",
          location: "أنقرة، تركيا",
          period: "2026 - 4 أشهر",
          summary:
            "تدريب طويل خلال السنة الأخيرة من هندسة الحاسوب، ركز على تنفيذ الواجهات ومهام تطوير برمجية ومواقع أعمال حقيقية.",
          impact: [
            "عملت على واجهات ويب موجهة للأعمال وتنفيذ Frontend.",
            "دعمت مهام تطوير برمجية داخل بيئة شركة حقيقية.",
            "اكتسبت خبرة عملية مع متطلبات العملاء وسير التسليم.",
          ],
        },
        "remax-wise": {
          role: "مطور برمجيات",
          location: "لشبونة، البرتغال",
          period: "سبتمبر 2025 - نوفمبر 2025",
          summary: "عملت على مواقع عقارية حقيقية في بيئة إنتاج.",
          impact: [
            "بنيت مكونات واجهة قابلة لإعادة الاستخدام وتخطيطات مشتركة بين عدة مواقع.",
            "حسنت بنية الصفحات، Routing، والروابط الداخلية.",
            "ساعدت في إبقاء الإطلاقات واضحة ومتسقة.",
          ],
          metrics: [
            { label: "المواقع", value: "3", helper: "Lisbon و Algarve و 5 Steps" },
            { label: "التركيز", value: "الواجهة و Routing" },
          ],
        },
        afaqy: {
          role: "مهندس دعم فني",
          location: "الرياض، السعودية",
          period: "يوليو 2024 - سبتمبر 2024",
          summary: "دعمت أنظمة إدارة أساطيل تعمل على أكثر من 650 جهاز GPS.",
          impact: [
            "تعاملت مع التشخيص، دعم العملاء، والمتابعة.",
            "أرشدت المستخدمين على AFAQY Pro وحللت المشاكل اليومية.",
            "ساعدت في الحفاظ على دقة البيانات داخل الأنظمة الداخلية.",
          ],
          metrics: [
            { label: "الأجهزة", value: "650+", helper: "أنظمة GPS للأساطيل" },
            { label: "التركيز", value: "التشخيص والاعتمادية" },
          ],
          documents: {
            "View PDF": "عرض PDF",
            Certificate: "الشهادة",
          },
        },
        "nfs-soft": {
          role: "متدرب WordPress Developer",
          location: "أرضروم، تركيا",
          period: "أكتوبر 2022 - ديسمبر 2022",
          summary: "بنيت مواقع متعددة اللغة وقوالب WordPress مخصصة.",
          impact: [
            "حسنت تجاوب الصفحات وبنية المحتوى.",
            "ساعدت في الاستضافة والتحديثات وتسليم العملاء.",
            "بنيت مواقع لأعمال ومؤسسات تعليمية.",
          ],
          metrics: [
            { label: "القوة", value: "جودة الواجهة وأنظمة المحتوى" },
            { label: "السياق", value: "مواقع أعمال وتعليم" },
          ],
        },
      },
    },
    skills: {
      heading: {
        eyebrow: "المهارات",
        title: "المهارات",
        description:
          "نظرة مختصرة على التقنيات التي أستخدمها في مواقع الإنتاج، لوحات التحكم، Backend، تطبيقات الموبايل، وسير العمل المدعوم بالذكاء الاصطناعي.",
      },
      coreWorkflow: "سير العمل الأساسي",
      aiTitle: "AI Agents وسير العمل",
      aiDescription:
        "أستخدم AI coding agents في التخطيط والبناء والتصحيح وإعادة التنظيم والمراجعة لتسريع التنفيذ مع الحفاظ على جودة الكود.",
      aiChips: [
        "AI Coding Agents",
        "Prompt Engineering",
        "أتمتة سير العمل",
        "تصحيح الأخطاء",
        "مراجعة الكود",
        "نمذجة أسرع",
      ],
      categoryTitles: {
        Frontend: "الواجهات",
        "Backend and APIs": "Backend و APIs",
        Mobile: "الموبايل",
        Databases: "قواعد البيانات",
        "AI and Computer Vision": "الذكاء الاصطناعي والرؤية الحاسوبية",
        "CMS and Platforms": "CMS والمنصات",
        "Deployment and DevOps": "النشر و DevOps",
        "SEO and Product Engineering": "SEO وهندسة المنتج",
        Tools: "الأدوات",
      },
      categorySummaries: {
        Frontend: "بناء واجهات لمواقع إنتاج ومشاريع عملاء.",
        "Backend and APIs": "منطق خادمي، تكاملات، وميزات تعتمد على API.",
        Mobile: "تطوير تطبيقات موبايل باستخدام React Native و Expo.",
        Databases: "قواعد بيانات علائقية ووثائقية لمشاريع ويب وسطح مكتب.",
        "AI and Computer Vision": "تطبيقات تعلم آلي لأنظمة كشف لحظية.",
        "CMS and Platforms": "تسليم مواقع عملاء وأنظمة محتوى.",
        "Deployment and DevOps": "إعداد النشر والبيئات لمشاريع إنتاج.",
        "SEO and Product Engineering": "SEO تقني مطبق على مواقع إنتاج.",
        Tools: "أدوات يومية للبناء والاختبار والتعاون.",
      },
    },
    credentials: {
      heading: {
        eyebrow: "الشهادات",
        title: "التعليم والشهادات والتطوع",
      },
      education: "التعليم",
      volunteering: "التطوع",
      certificates: "الشهادات",
      volunteeringItems: {
        "youth-summer-fest": {
          title: "منسق متطوع",
          location: "رومانيا",
          period: "أغسطس 2025 - سبتمبر 2025",
          linkLabel: "عرض المستند",
        },
        "erasmus-structured-dialogue": {
          title: "مشارك في حوار منظم",
          location: "إسطنبول، تركيا",
          period: "مارس 2021 - أبريل 2023",
          linkLabel: "عرض المستند",
        },
        "snowboard-worldcup": {
          title: "مترجم متطوع",
          location: "أرضروم (Palandoken)، تركيا",
          period: "فبراير 2025 - مارس 2025",
        },
        "damla-volunteering": {
          title: "مشارك متطوع",
          location: "أرزنجان، تركيا",
          period: "سبتمبر 2023",
          linkLabel: "عرض المستند",
        },
      },
    },
    contact: {
      heading: {
        eyebrow: "تواصل",
        title: "متاح لوظائف بدوام كامل، عمل حر، وتعاون.",
        description: "أفضل طريقة للتواصل معي هي البريد الإلكتروني أو LinkedIn أو Instagram.",
      },
      panelEyebrow: "تواصل",
      openToWork: "متاح للعمل",
      availability: "إذا كان لديك وظيفة أو مشروع مناسب، يسعدني أن تتواصل معي.",
      description: "أفضل طريقة للتواصل معي هي البريد الإلكتروني أو LinkedIn أو Instagram.",
      channels: {
        email: { label: "البريد", note: "تواصل مباشر" },
        linkedin: { label: "LinkedIn", note: "وظائف وعلاقات مهنية" },
        github: { label: "GitHub", note: "الكود والمشاريع" },
        instagram: { label: "Instagram", note: "تحديثات وتواصل" },
        whatsapp: { label: "WhatsApp", note: "متابعة سريعة" },
        resume: {
          label: "CV",
          value: "تحميل السيرة الذاتية",
          note: "ملف PDF",
        },
      },
    },
    footer: {
      description: "مهندس برمجيات يبني مواقع ولوحات تحكم ومنصات أعمال.",
      builtWith: "مبني باستخدام Next.js و TypeScript و Tailwind CSS",
      rights: "جميع الحقوق محفوظة.",
    },
    cv: {
      pill: "CV",
      title: "تحميل سيرة ذاتية جاهزة للمراجعة",
      description:
        "السيرة الذاتية متاحة كملف PDF مباشر لسهولة المراجعة. يمكنك تحميلها أو فتحها في تبويب جديد.",
      download: "تحميل السيرة الذاتية",
      openPdf: "فتح PDF",
    },
    floatingWhatsapp: {
      ariaLabel: "راسل عبدو عصام على واتساب",
      hoverLabel: "راسلني",
    },
    projectCta: {
      connector:
        "لو شغلي قريب مما تحتاجه، أرسل لي الفكرة وسأساعدك في تحديد الخطوة التالية.",
      badge: "بداية سريعة",
      title: "خلينا نبني مشروعك القادم.",
      description:
        "اكتب لي فكرتك أو المشكلة التي تريد حلها. أقدر أساعدك في بناء واجهات نظيفة، لوحات تحكم مرتبطة بـ APIs، تحسين الأداء، وتطبيقات ويب جاهزة للعمل الحقيقي.",
      btnEmail: "ابدأ بالإيميل",
      btnWhatsapp: "راسلني واتساب",
      email: "abdoessammo@gmail.com",
      emailHref: "mailto:abdoessammo@gmail.com",
      whatsappHref: "https://wa.me/905527508202",
      whatsappDisplay: "+90 552 750 82 02",
      cardEmailTitle: "البريد الإلكتروني",
      cardEmailDesc: "أرسل تفاصيل المشروع أو الروابط أو وصفًا مختصرًا.",
      cardWhatsappTitle: "واتساب",
      cardWhatsappDesc: "للأسئلة السريعة أو أفكار المشاريع أو معرفة التوفر.",
      services: [
        {
          title: "بناء الواجهات",
          body: "واجهات نظيفة ومتجاوبة باستخدام React و Next.js و Tailwind.",
        },
        {
          title: "لوحات تحكم و APIs",
          body: "لوحات تحكم وسير عمل مرتبطة بـ REST APIs وقواعد البيانات وأنظمة الإدارة.",
        },
        {
          title: "تحسين الأداء",
          body: "تحسين السرعة وتجربة الاستخدام والوصول واستقرار النشر.",
        },
      ],
    },
  },
};
