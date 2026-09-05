"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const translations = { en, ar };
export type Locale = "en" | "ar";

const LanguageContext = createContext({
  locale: "ar" as Locale,
  setLocale: (() => {}) as React.Dispatch<React.SetStateAction<Locale>>,
  t: (label: string, key: string) => key,
});

export function LanguageProvider({
  children,
  initialLocale = "ar",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // The locale now comes from the URL ([locale] segment). When the user
  // navigates between /ar and /en, the [locale] layout re-renders and passes
  // the new value down here, keeping the client context in sync with the URL.
  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale]);

  const t = (label: string, key: string) => {
    const group = ((translations[locale] as unknown) as Array<{ label: string; translations: Record<string, string> }>).find((g) => g.label === label);
    if (group && group.translations && key in group.translations) {
      return group.translations[key];
    }
    return key;
  };
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
