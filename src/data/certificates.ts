export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  file: string;
  thumbnail?: string;
  description: string;
  skills: string[];
  verifyUrl?: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    id: "vtest-english-c1-1",
    title: "VTest English Exam – CEFR Level C1.1",
    issuer: "VTest",
    date: "2024-03",
    credentialId: "C1.1",
    file: "english-exam-vtest.pdf",
    description: "Confirmed C1.1 English proficiency across listening, reading, and written communication.",
    skills: ["English C1.1", "Academic writing", "Listening & reading comprehension"],
    verifyUrl: "https://www.vtest.com/",
  },
  {
    id: "rosetta-english-c1",
    title: "Rosetta Stone English Exam – CEFR Level C1",
    issuer: "Rosetta Stone",
    date: "2024-05",
    credentialId: "C1",
    file: "english-exam-rosetta-stone.pdf",
    description: "C1 English certification focused on professional fluency and clear communication.",
    skills: ["English C1", "Professional communication", "Listening & speaking"],
    verifyUrl: "https://www.rosettastone.com/",
  },
];
