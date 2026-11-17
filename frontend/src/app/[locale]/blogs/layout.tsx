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
    path: "/blogs",
    title: isAr ? "المدونة" : "Engineering Insights",
    description: isAr
      ? "مقالات ورؤى المنابر في التصميم والهندسة والاستشارات."
      : "Articles and insights from AMCE about design, engineering, and consultancy.",
  });
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
