import type { Metadata } from "next";
import { CvPageContent } from "@/components/cv-page-content";
import { PORTFOLIO_OWNER_NAME } from "@/data/profile";
import { getProfileSettings } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "CV",
  description:
    `Download the CV of ${PORTFOLIO_OWNER_NAME}, Software Engineer and Full-Stack Developer.`,
};

export default async function CvPage() {
  const profileSettings = await getProfileSettings();
  return <CvPageContent cvUrl={profileSettings.cvUrl} />;
}
