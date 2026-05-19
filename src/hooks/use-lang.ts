"use client";

import { useCallback, useEffect, useState } from "react";
import { type Lang, dict } from "@/lib/i18n";

const STORAGE_KEY = "portfolio-lang";

export function useLang() {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "ar" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "ar" : "en");
  }, [lang, setLang]);

  return { lang, t: dict[lang], toggle };
}
