import { Metadata } from "next";
import { Suspense } from "react";
import ApplyPageClient from "./ApplyPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "التقديم على وظيفة" : "Apply for a Position",
    description: isAr
      ? "قدّم طلبك للانضمام إلى فريق شركة المنابر للاستشارات الهندسية."
      : "Submit your application to join AlMnaber Consulting Professional Co. team.",
  };
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplyPageClient />
    </Suspense>
  );
}
