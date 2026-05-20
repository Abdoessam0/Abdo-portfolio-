/**
 * Simple bilingual dictionary — no external i18n library needed.
 * Add keys here as the redesign grows.
 */

export type Lang = "en" | "ar";

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

export const dict = {
  en: {
    dir: "ltr" as const,
    label: "Abdo Essam - Software Engineer / Founder of Kolaytec",
    headline: "I build websites, dashboards, and web platforms\nfor real business work.",
    sub: "Frontend-first and full-stack capable. I work with Next.js, React, TypeScript, Tailwind, PHP/Laravel, MySQL, and REST APIs to ship practical digital products.",
    cta1: "View My Work",
    cta2: "Download CV",
    cta3: "Let's Talk",
    toggle: "عربي",
    marquee: "ABDO ESSAM - KOLAYTEC - SOFTWARE ENGINEER - NEXT.JS - REACT - TYPESCRIPT - PRODUCTION WEB APPS - UI/UX - API SYSTEMS - ",
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact",
    },
    floatingWhatsapp: {
      ariaLabel: "Message Abdo Essam on WhatsApp",
      hoverLabel: "Message me",
    } satisfies FloatingWhatsappCopy,
    projectCta: {
      connector:
        "If my work feels close to what you need, send me the idea and I’ll help you shape the next step.",
      badge: "Quick start",
      title: "Let’s build your next project.",
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
    } satisfies ProjectCtaCopy,
  },
  ar: {
    dir: "rtl" as const,
    label: "عبدو عصام - مهندس برمجيات / مؤسس Kolaytec",
    headline: "أبني تطبيقات ويب سريعة وموثوقة\nبتجربة استخدام نظيفة.",
    sub: "أركز على الواجهات الحديثة، الأنظمة المعتمدة على APIs، الأداء، وإطلاق منتجات تعمل فعليًا في بيئة إنتاج.",
    cta1: "شاهد أعمالي",
    cta2: "تحميل السيرة الذاتية",
    cta3: "تواصل معي",
    toggle: "EN",
    marquee: "مهندس برمجيات • واجهات حديثة • تطبيقات ويب حقيقية • React • Next.js • TypeScript • ",
    nav: {
      about: "عنّي",
      projects: "المشاريع",
      experience: "الخبرة",
      skills: "المهارات",
      contact: "تواصل",
    },
    floatingWhatsapp: {
      ariaLabel: "راسل عبدو عصام على واتساب",
      hoverLabel: "راسلني",
    } satisfies FloatingWhatsappCopy,
    projectCta: {
      connector:
        "لو شغلي قريب مما تحتاجه، أرسل لي الفكرة وسأساعدك في تحديد الخطوة التالية.",
      badge: "بداية سريعة",
      title: "خلينا نبني مشروعك القادم.",
      description:
        "اكتب لي فكرتك أو المشكلة التي تريد حلها. أقدر أساعدك في بناء واجهات نظيفة، لوحات تحكم مرتبطة بالـ APIs، تحسين الأداء، وتطبيقات ويب جاهزة للعمل الحقيقي.",
      btnEmail: "ابدأ بالإيميل",
      btnWhatsapp: "راسلني واتساب",
      email: "abdoessammo@gmail.com",
      emailHref: "mailto:abdoessammo@gmail.com",
      whatsappHref: "https://wa.me/905527508202",
      whatsappDisplay: "+90 552 750 82 02",
      cardEmailTitle: "البريد الإلكتروني",
      cardEmailDesc: "أرسل تفاصيل المشروع، الروابط، أو وصفًا مختصرًا.",
      cardWhatsappTitle: "واتساب",
      cardWhatsappDesc: "للأسئلة السريعة، أفكار المشاريع، أو معرفة التوفر.",
      services: [
        {
          title: "بناء الواجهات",
          body: "واجهات نظيفة ومتجاوبة باستخدام React و Next.js و Tailwind.",
        },
        {
          title: "لوحات تحكم و APIs",
          body: "لوحات تحكم ومسارات عمل مرتبطة بالـ REST APIs وقواعد البيانات وأنظمة الإدارة.",
        },
        {
          title: "تحسين الأداء",
          body: "تحسين السرعة، تجربة الاستخدام، الوصول، واستقرار النشر.",
        },
      ],
    } satisfies ProjectCtaCopy,
  },
} satisfies Record<Lang, object>;
