import { API_BASE_URL } from "@/lib/api";
import { pageMetadata, type SiteLocale } from "@/lib/seo";
import ServicesPageClient, { type Service } from "./ServicesPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/services",
    title: isAr ? "خدماتنا الهندسية" : "Engineering Services",
    description: isAr
      ? "استكشف خدمات المنابر في التصميم المعماري والهندسة الإنشائية وتصميم أنظمة الميكانيكا والكهرباء والحماية من الحريق والسلامة."
      : "Explore AMCE services in architectural design, structural engineering, MEP design, and fire and life safety engineering.",
  });
}

async function fetchServices(): Promise<Service[] | null> {
  try {
    const response = await fetch(API_BASE_URL.replace(/\/$/, "") + "/services", {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export default async function ServicesPage() {
  return <ServicesPageClient services={await fetchServices()} />;
}
