import { pageMetadata, type SiteLocale } from "@/lib/seo";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/privacy-policy",
    title: isAr ? "سياسة الخصوصية" : "Privacy Policy",
    description: isAr
      ? "سياسة الخصوصية الخاصة بموقع المنابر للاستشارات الهندسية."
      : "Privacy policy for the Almnabr Consulting Engineering website.",
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
