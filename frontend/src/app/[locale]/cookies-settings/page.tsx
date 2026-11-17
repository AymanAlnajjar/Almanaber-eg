import { pageMetadata, type SiteLocale } from "@/lib/seo";
import CookiesSettingsClient from "./CookiesSettingsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/cookies-settings",
    title: isAr ? "إعدادات ملفات الارتباط" : "Cookie Settings",
    description: isAr
      ? "إدارة تفضيلات ملفات الارتباط لموقع المنابر."
      : "Manage cookie preferences for the AMCE website.",
    robots: { index: false, follow: true },
  });
}

export default function CookiesSettingsPage() {
  return <CookiesSettingsClient />;
}
