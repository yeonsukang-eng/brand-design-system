"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

type Locale = "ko" | "en";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: <T extends ReactNode>(ko: T, en: T) => T;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "ko",
  setLocale: () => {},
  t: (ko) => ko,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("axflow-locale");
    if (saved === "en" || saved === "ko") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("axflow-locale", l);
  }, []);

  const t = useCallback(
    <T extends ReactNode>(ko: T, en: T): T => (locale === "en" ? en : ko),
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
