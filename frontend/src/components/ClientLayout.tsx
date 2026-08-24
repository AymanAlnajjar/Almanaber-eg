"use client";
import { useLanguage } from "@/context/LanguageContext";
import { ReactNode, useEffect } from "react";
import Nav from "@/components/Navigation";
import PageTracker from "@/components/PageTracker";
import WhatsAppFloat from "@/components/WhatsAppFloat";

function LangHtmlWrapper({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);
  return <>{children}</>;
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LangHtmlWrapper>
      <PageTracker />
      <Nav />
      {children}
      <WhatsAppFloat />
    </LangHtmlWrapper>
  );
}
