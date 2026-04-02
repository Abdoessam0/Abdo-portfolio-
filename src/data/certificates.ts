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
    title: "RE/MAX Erasmus Traineeship",
    issuer: "RE/MAX Wise / Erasmus+",
    date: "2025",
    description: "Real estate website work in Lisbon.",
    link: "https://drive.google.com/file/d/1osHUIPXYgXq8VExX5IS30YS8s0N7pkl4/view",
  },
  {
    id: "afaqy-support",
    title: "AFAQY Technical Support Certificate",
    issuer: "AFAQY",
    date: "2024",
    description: "Technical support for fleet and GPS systems.",
    link: "https://drive.google.com/file/d/12n9q_PXELFOZc_10Ih2ru4vFmHvBB3Fl/view",
  },
  {
    id: "wordpress-internship",
    title: "WordPress Internship",
    issuer: "NFS Soft",
    date: "2022",
    description: "Website building and responsive layout.",
    file: "wordpress-internship.png",
    link: "https://drive.google.com/file/d/1cwgI7_pCaVFcKhjyxm98mqz1JYaoc_ga/view",
  },
  {
    id: "alx-fullstack",
    title: "ALX Full-Stack Software Engineer",
    issuer: "ALX",
    date: "2024",
    description: "Full-stack software engineering diploma.",
    link: "https://drive.google.com/file/d/14OYXQ_t77mkbKoG0yessXT2EesEtAi97/view",
  },
  {
    id: "vtest-english",
    title: "English Exam Certificate",
    issuer: "Vtest",
    date: "2024",
    description: "English exam certificate.",
    link: "https://drive.google.com/file/d/1d5ZCyurh2emBA2YNlaBtu3_zn6qYeIqE/view",
  },
  {
    id: "rosetta-english",
    title: "English Proficiency Certificate",
    issuer: "Rosetta Stone",
    date: "2024",
    description: "English proficiency certificate.",
    link: "https://drive.google.com/file/d/1S0MxDsl8DGfv_ZB6YlQXSW_KBtK_JcEU/view",
  },
];
