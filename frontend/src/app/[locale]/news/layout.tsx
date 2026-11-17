import { pageMetadata, type SiteLocale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/news",
    title: isAr ? "الأخبار والتحديثات" : "News & Updates",
    description: isAr
      ? "تابع أحدث أخبار ومشاريع وتحديثات المنابر للاستشارات الهندسية."
      : "Read the latest AMCE company, project, and engineering updates.",
  });
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
