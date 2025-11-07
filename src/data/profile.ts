export type Person = {
  name: string;
  role: string;
  tagline: string;
  summary: string;
  location: string;
  timezone: string;
  availability: string;
  relocation: string;
  languages: string[];
  phone: string;
  email: string;
};

export type Links = {
  portfolio: string;
  github: string;
  linkedin: string;
  resume: string;
  calendly?: string;
};

export type HeroContent = {
  intro: string;
  bullets: string[];
  ctas: {
    label: string;
    href: string;
    ariaLabel: string;
  }[];
};

export type HeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export type Metric = {
  label: string;
  value: string;
  helper?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type TechPanel = {
  id: string;
  title: string;
  badge: string;
  summary: string;
  achievements: string[];
  snippet: {
    language: string;
    code: string;
  };
  metrics: Metric[];
  links?: { label: string; href: string }[];
};

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  ariaLabel: string;
};

export type Profile = {
  person: Person;
  links: Links;
  hero: HeroContent;
  heroImage: HeroImage;
  metrics: Metric[];
  skills: SkillGroup[];
  techPanels: TechPanel[];
  contact: {
    availability: string;
    locationNote: string;
    channels: ContactChannel[];
  };
};

export const PROFILE: Profile = {
  person: {
    name: "Abdelrahman Mohamed",
    role: "Full-Stack Engineer & Computer Engineering Student",
    tagline: "Next.js / React Native / Java",
    summary:
      "Full-stack engineer shipping multilingual marketing systems, ops-ready React Native apps, and typed Java services for RE/MAX Portugal, AFAQY, and Erasmus+ teams.",
    location: "Türkiye",
    timezone: "GMT+0 winter / GMT+3 summer",
    availability: "Accepting full-time and senior freelance engagements from December 2025",
    relocation: "Open to EU relocation with sponsorship",
    languages: ["Arabic (native)", "English (C1)", "Turkish (C1)", "Portuguese (A2)"],
    phone: "+90 552 750 8202",
    email: "abdoessammo@gmail.com",
  },
  links: {
    portfolio: "https://abdoessamcv.vercel.app",
    github: "https://github.com/Abdoessam0",
    linkedin: "https://www.linkedin.com/in/abdo-mo",
    resume: "https://drive.google.com/file/d/1XAbdoCVyNz0/view?usp=sharing",
    calendly: "https://calendly.com/abdoessam/intro",
  },
  hero: {
    intro: "I pair design systems thinking with operations discipline so every launch feels calm even when stakes are high.",
    bullets: [
      "Next.js 15 platforms tuned for <=2 s LCP on Vercel across Algarve & Lisbon real-estate funnels.",
      "React Native logistics companion with offline sync, biometrics, and OTA updates for 650+ AFAQY devices.",
      "Spring Boot + Supabase services with observability baked in from sprint zero.",
    ],
    ctas: [
      { label: "View My Work", href: "#projects", ariaLabel: "Jump to featured projects" },
      { label: "Get In Touch", href: "#contact", ariaLabel: "Scroll to contact ways" },
    ],
  },
  heroImage: {
    src: "/profile/cvphoto.jpg",
    alt: "Abdelrahman Mohamed smiling during a client call",
    width: 563,
    height: 708,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/xcAAmMBgJ6Ar6MAAAAASUVORK5CYII=",
  },
  metrics: [
    { label: "Production launches", value: "18", helper: "Marketing, ops, and internal tools" },
    { label: "Avg. INP (hero builds)", value: "162 ms", helper: "Measured on Vercel Speed Insights" },
    { label: "Design systems shipped", value: "4", helper: "RE/MAX, TrustedBuildr, Erasmus+" },
    { label: "Teams supported", value: "9", helper: "Portugal, KSA, Romania, remote-first" },
  ],
  skills: [
    {
      title: "Web Platforms",
      items: ["Next.js 15", "React Server Components", "Tailwind CSS", "Supabase", "tRPC", "Zod"],
    },
    {
      title: "Mobile & Desktop",
      items: ["React Native", "Expo", "Zustand", "SQLite", "Reanimated 3", "App Store Connect"],
    },
    {
      title: "Backend & Cloud",
      items: ["Node.js", "Java 17", "Spring Boot", "Supabase Edge Functions", "Postgres", "Docker", "Vercel"],
    },
    {
      title: "Product Toolkit",
      items: ["Figma", "Linear", "Looker Studio", "Mixpanel", "A/B testing", "Accessibility QA"],
    },
  ],
  techPanels: [
    {
      id: "react",
      title: "React Systems",
      badge: "React",
      summary: "Built RE/MAX Portugal’s reusable hero, proof, and roadmap blocks consumed by Algarve + Lisbon funnels.",
      achievements: [
        "CLS held at 0.03 by streaming hero media with suspense fallbacks and asset budgets.",
        "Supplied schema-driven copy docs so marketing can launch English + Portuguese variants in <20 minutes.",
      ],
      snippet: {
        language: "tsx",
        code: `const usePrefetchProject = (slug: string) => {
  const router = useRouter();
  useEffect(() => {
    const timeout = window.setTimeout(() => router.prefetch(\`/projects/\${slug}\`), 160);
    return () => window.clearTimeout(timeout);
  }, [router, slug]);
};`,
      },
      metrics: [
        { label: "Shipments", value: "11" },
        { label: "Median LCP", value: "1.8 s" },
      ],
      links: [{ label: "RE/MAX detail", href: "/experience/remax-wise" }],
    },
    {
      id: "react-native",
      title: "React Native Ops",
      badge: "React Native",
      summary: "Offline-first logistics companion for AFAQY field engineers with camera uploads and biometrics.",
      achievements: [
        "Synced 650+ devices by batching SQLite writes and replaying queues once LTE returns.",
        "Provisioned OTA updates using Expo EAS, cutting rollout from weeks to hours.",
      ],
      snippet: {
        language: "tsx",
        code: `export function useOfflineSync() {
  const client = useQueryClient();
  useEffect(() => {
    function hydrate() {
      client.invalidateQueries({ queryKey: ["tickets"] }).catch(console.error);
    }
    const unsub = AppState.addEventListener("change", (state) => {
      if (state === "active") hydrate();
    });
    hydrate();
    return () => unsub.remove();
  }, [client]);
}`,
      },
      metrics: [
        { label: "Crash-free", value: "99.4%" },
        { label: "Offline cases", value: "18" },
      ],
      links: [{ label: "Ops playbook", href: "https://github.com/Abdoessam0" }],
    },
    {
      id: "java",
      title: "Java Services",
      badge: "Java",
      summary: "Spring Boot + Supabase integrations powering TrustedBuildr automations and analytics exports.",
      achievements: [
        "Replaced flaky cron jobs with observability-friendly scheduled tasks and structured logging.",
        "Implemented signed webhook ingestion that withstood internal penetration tests.",
      ],
      snippet: {
        language: "java",
        code: `public record PaymentPayload(BigDecimal amount, Currency currency) {
  public PaymentPayload validate() {
    if (amount.compareTo(BigDecimal.ZERO) <= 0) {
      throw new IllegalArgumentException("Amount must be positive");
    }
    return this;
  }
}`,
      },
      metrics: [
        { label: "Uptime", value: "99.95%" },
        { label: "Latency p95", value: "112 ms" },
      ],
      links: [{ label: "Service notes", href: "#experience" }],
    },
  ],
  contact: {
    availability: "Replies within 24 hours, GMT+0 to GMT+3 friendly.",
    locationNote: "Based in Türkiye with availability across EMEA.",
    channels: [
      {
        label: "Email",
        value: "abdoessammo@gmail.com",
        href: "mailto:abdoessammo@gmail.com",
        ariaLabel: "Send an email to Abdelrahman",
      },
      {
        label: "Phone",
        value: "+90 552 750 8202",
        href: "tel:+905527508202",
        ariaLabel: "Call Abdelrahman",
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/abdo-mo",
        href: "https://www.linkedin.com/in/abdo-mo",
        ariaLabel: "Open Abdelrahman's LinkedIn profile",
      },
      {
        label: "GitHub",
        value: "github.com/Abdoessam0",
        href: "https://github.com/Abdoessam0",
        ariaLabel: "Open Abdelrahman's GitHub profile",
      },
    ],
  },
};
