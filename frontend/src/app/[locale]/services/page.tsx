import { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

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

export default function ServicesPage() {
  return <ServicesPageClient />;
}
