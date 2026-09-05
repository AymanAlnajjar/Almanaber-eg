import { Metadata } from "next";
import CareersPageClient from "./CareersPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "الوظائف" : "Careers",
    description: isAr
      ? "انضم إلى شركة المنابر للاستشارات الهندسية. اكتشف فرص العمل في الهندسة والعمارة وإدارة المشاريع وغيرها."
      : "Join AlMnaber Consulting Professional Co. Explore career opportunities in engineering, architecture, project management, and more.",
    openGraph: {
      title: isAr ? "الوظائف في المنابر" : "Careers at AlMnaber",
      description: isAr
        ? "اكتشف فرص العمل في بيت خبرة هندسي رائد وانضم إلى فريقنا من المحترفين."
        : "Explore career opportunities at a leading engineering consultancy. Join our team of professionals.",
    },
  };
}

export default function CareersPage() {
  return <CareersPageClient />;
}
