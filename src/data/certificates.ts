export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  file?: string;
  link?: string;
  thumbnail?: string;
  credentialId?: string;
  skills?: string[];
  verifyUrl?: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    id: "remax-erasmus",
    title: "RE/MAX Wise Erasmus+ Internship",
    issuer: "RE/MAX Wise / Erasmus+",
    date: "2025",
    description:
      "Software development internship building production real-estate platforms in Lisbon.",
    link: "https://drive.google.com/file/d/1osHUIPXYgXq8VExX5IS30YS8s0N7pkl4/view",
  },
  {
    id: "afaqy-support",
    title: "AFAQY Technical Support Certificate",
    issuer: "AFAQY",
    date: "2024",
    description:
      "Technical support engineering for fleet management and GPS operations in Riyadh.",
    link: "https://drive.google.com/file/d/12n9q_PXELFOZc_10Ih2ru4vFmHvBB3Fl/view",
  },
  {
    id: "wordpress-internship",
    title: "WordPress Development Internship",
    issuer: "NFS Soft",
    date: "2022",
    description:
      "WordPress theme development, plugin customization, and responsive web design.",
    file: "wordpress-internship.png",
    link: "https://drive.google.com/file/d/1cwgI7_pCaVFcKhjyxm98mqz1JYaoc_ga/view",
  },
  {
    id: "alx-fullstack",
    title: "Full-Stack Software Engineer Diploma",
    issuer: "ALX",
    date: "2024",
    description:
      "Intensive full-stack software engineering program covering front-end, back-end, and systems design.",
    link: "https://drive.google.com/file/d/14OYXQ_t77mkbKoG0yessXT2EesEtAi97/view",
  },
  {
    id: "vtest-english",
    title: "Vtest English Exam – CEFR C1.1",
    issuer: "Vtest",
    date: "2024",
    description:
      "Advanced English proficiency certification at CEFR C1.1 level.",
    link: "https://drive.google.com/file/d/1d5ZCyurh2emBA2YNlaBtu3_zn6qYeIqE/view",
  },
  {
    id: "rosetta-english",
    title: "Rosetta Stone English – CEFR C1",
    issuer: "Rosetta Stone",
    date: "2024",
    description:
      "English language proficiency at CEFR C1 level.",
    link: "https://drive.google.com/file/d/1S0MxDsl8DGfv_ZB6YlQXSW_KBtK_JcEU/view",
  },
];
