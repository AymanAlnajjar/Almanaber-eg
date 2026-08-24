"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function PageTracker() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const lastTracked = useRef<string>("");

  useEffect(() => {
    if (!API || lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const referrer = document.referrer || undefined;

    fetch(`${API}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, locale, referrer }),
    }).catch(() => {});
  }, [pathname, locale]);

  return null;
}
