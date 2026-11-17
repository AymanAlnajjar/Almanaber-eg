import { pageMetadata, type SiteLocale } from "@/lib/seo";
import CareersPageClient from "./CareersPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/careers",
    title: isAr ? "الوظائف" : "Careers",
    description: isAr
      ? "استكشف فرص العمل المتاحة لدى المنابر للاستشارات الهندسية."
      : "Explore career opportunities at Almnabr Consulting Engineering.",
  });
}

export default function CareersPage() {
  return <CareersPageClient />;
}
