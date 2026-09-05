import { Metadata } from "next";
import CareerDetailsClient from "./CareerDetailsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "فرصة عمل" : "Career Opportunity",
    description: isAr
      ? "اطّلع على تفاصيل الوظيفة وقدّم على شاغر في شركة المنابر للاستشارات الهندسية."
      : "View job details and apply for a position at AlMnaber Consulting Professional Co.",
  };
}

export default async function CareerDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  return <CareerDetailsClient jobId={id} />;
}
