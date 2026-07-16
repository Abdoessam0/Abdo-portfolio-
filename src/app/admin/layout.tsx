import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PORTFOLIO_OWNER_NAME } from "@/data/profile";

export const metadata: Metadata = {
  title: `Admin | ${PORTFOLIO_OWNER_NAME} Portfolio`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
