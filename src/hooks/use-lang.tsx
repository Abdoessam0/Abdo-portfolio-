"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type Lang, dict } from "@/lib/i18n";

const STORAGE_KEY = "portfolio-lang";

type LangContextValue = {
  lang: Lang;
  t: (typeof dict)[Lang];
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "ar" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  // Sync <html> lang and dir attributes when language changes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", dict[lang].dir);
  }, [lang]);


  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "ar" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, t: dict[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a <LangProvider>");
  }
  return ctx;
}
