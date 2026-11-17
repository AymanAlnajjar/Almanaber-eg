import { pageMetadata, type SiteLocale } from "@/lib/seo";
import CareerDetailsClient from "./CareerDetailsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale; id: string }>;
}) {
  const { locale, id } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: `/careers/${id}`,
    title: isAr ? "فرصة عمل" : "Career Opportunity",
    description: isAr
      ? "تفاصيل فرصة عمل لدى المنابر للاستشارات الهندسية."
      : "View career opportunity details at Almnabr Consulting Engineering.",
    robots: { index: false, follow: true },
  });
}

export default async function CareerDetailsPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale; id: string }>;
}) {
  const { id } = await params;
  return <CareerDetailsClient jobId={id} />;
}
