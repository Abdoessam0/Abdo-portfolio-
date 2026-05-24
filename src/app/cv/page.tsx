import type { Metadata } from "next";
import { CvPageContent } from "@/components/cv-page-content";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Download the CV of Abdo Essam, Software Engineer and Full-Stack Developer.",
};

export default function CvPage() {
  return <CvPageContent />;
}
