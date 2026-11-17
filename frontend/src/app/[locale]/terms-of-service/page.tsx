import { pageMetadata, type SiteLocale } from "@/lib/seo";
import TermsOfServiceClient from "./TermsOfServiceClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/terms-of-service",
    title: isAr ? "شروط الاستخدام" : "Terms of Service",
    description: isAr
      ? "شروط استخدام موقع المنابر للاستشارات الهندسية."
      : "Terms for using the Almnabr Consulting Engineering website.",
  });
}

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />;
}
