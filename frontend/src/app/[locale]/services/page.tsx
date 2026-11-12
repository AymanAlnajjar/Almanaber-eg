import { Metadata } from "next";
import { API_BASE_URL } from "@/lib/api";
import ServicesPageClient, { type Service } from "./ServicesPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "خدماتنا" : "Our Services",
    description: isAr
      ? "اكتشف خدمات المنابر الهندسية الشاملة: التصميم المعماري والهندسة الإنشائية والحماية من الحريق والسلامة والبنية التحتية وتصاريح البناء وإدارة المشاريع."
      : "Explore AlMnaber's comprehensive engineering services: architectural design, structural engineering, fire & life safety, infrastructure, building permits, and project management.",
    openGraph: {
      title: isAr ? "الخدمات الهندسية | المنابر" : "Engineering Services | AlMnaber",
      description: isAr
        ? "خدمات استشارات هندسية شاملة تشمل التصميم المعماري والحماية من الحريق والبنية التحتية وإدارة المشاريع."
        : "Comprehensive engineering consultancy services including architectural design, fire safety, infrastructure, and project management.",
    },
  };
}

async function fetchServices(): Promise<Service[] | null> {
  try {
    const response = await fetch(API_BASE_URL.replace(/\/$/, "") + "/services", {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
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
