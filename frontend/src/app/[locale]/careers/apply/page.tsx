import { Suspense } from "react";
import { pageMetadata, type SiteLocale } from "@/lib/seo";
import ApplyPageClient from "./ApplyPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/careers/apply",
    title: isAr ? "التقديم على وظيفة" : "Apply for a Position",
    description: isAr
      ? "قدّم طلبك للانضمام إلى فريق المنابر للاستشارات الهندسية."
      : "Submit an application to join the AMCE team.",
    robots: { index: false, follow: true },
  });
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplyPageClient />
    </Suspense>
  );
}
