"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type Lang, dict } from "@/lib/i18n";

const STORAGE_KEY = "portfolio-lang";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

type LangContextValue = {
  lang: Lang;
  t: (typeof dict)[Lang];
  setLang: (next: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

function isLang(value: string | null | undefined): value is Lang {
  return value === "ar" || value === "en";
}

function readCookieLang() {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${STORAGE_KEY}=([^;]*)`),
  );
  const value = match ? decodeURIComponent(match[1]) : null;

  return isLang(value) ? value : null;
}

function readStoredLang() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : readCookieLang();
  } catch {
    return readCookieLang();
  }
}

function persistLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage can be blocked; the cookie keeps the preference available.
  }

  document.cookie = `${STORAGE_KEY}=${encodeURIComponent(
    lang,
  )}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = readStoredLang();
    if (stored) {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", dict[lang].dir);
    html.dataset.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && isLang(event.newValue)) {
        setLangState(event.newValue);
      }
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persistLang(next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "ar" : "en";
      persistLang(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ lang, t: dict[lang], setLang, toggle }),
    [lang, setLang, toggle],
  );

  return (
    <LangContext.Provider value={value}>{children}</LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a <LangProvider>");
  }
  return ctx;
}
