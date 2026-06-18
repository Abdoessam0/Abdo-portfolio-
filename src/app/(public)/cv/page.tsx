import type { Metadata } from "next";
import { CvPageContent } from "@/components/cv-page-content";
import { getProfileSettings } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Download the CV of Abdo Essam, Software Engineer and Full-Stack Developer.",
};

export default async function CvPage() {
  const profileSettings = await getProfileSettings();
  return <CvPageContent cvUrl={profileSettings.cvUrl} />;
}
