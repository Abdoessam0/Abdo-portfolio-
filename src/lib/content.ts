export type SiteContent = {
  name: string;
  subline: string;
  socials: {
    github: string;
    linkedin: string;
    email?: string;
  };
  profileImage: string;
  cvUrl: string;
  about: {
    location: string;
    languages: string;
    narrative1: string;
    narrative2: string;
  };
};

export const defaultContent: SiteContent = {
  name: "Abdelrahman Mohamed",
  subline: "Full Stack Developer • Open Source Contributor • Tech Explorer",
  socials: {
    github: "https://github.com/Abdoessam0", // TODO: confirm
    linkedin: "https://www.linkedin.com/in/", // TODO: add handle
    email: "",
  },
  profileImage: "/next.svg", // safe built-in asset
  cvUrl: "#", // TODO: replace with hosted CV link
  about: {
    location: "Nationality: Egyptian, Based in Erzurum, Türkiye.",
    languages: "Languages: Arabic (Native), English (C1), Turkish (C1).",
    narrative1:
      "Technical Passion: I build reliable, accessible interfaces and data-driven backends. I love Next.js, React, and modern tooling. I care about clean architecture, performance, and DX.",
    narrative2:
      "Global Mindset: I thrive in multicultural teams and fast-paced environments. I enjoy solving real problems and learning from diverse perspectives.",
  },
};

const STORAGE_KEY = "portfolio.content.v1";

export function loadContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw);
    return { ...defaultContent, ...parsed, socials: { ...defaultContent.socials, ...(parsed?.socials || {}) }, about: { ...defaultContent.about, ...(parsed?.about || {}) } } as SiteContent;
  } catch {
    return defaultContent;
  }
}

export function saveContent(content: Partial<SiteContent>) {
  if (typeof window === "undefined") return;
  const merged = { ...loadContent(), ...content, socials: { ...loadContent().socials, ...(content.socials || {}) }, about: { ...loadContent().about, ...(content.about || {}) } } as SiteContent;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export function clearContent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}


