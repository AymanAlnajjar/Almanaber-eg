"use client";
import React, { createContext, useContext, useState } from "react";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const translations = { en, ar };

const LanguageContext = createContext({
  locale: "en",
  setLocale: (() => {}) as React.Dispatch<React.SetStateAction<"en" | "ar">>,
  t: (label: string, key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<"en" | "ar">("ar");
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