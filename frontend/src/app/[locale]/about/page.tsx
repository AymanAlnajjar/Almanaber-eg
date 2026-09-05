import { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "من نحن" : "About Us",
    description: isAr
      ? "تعرّف على شركة المنابر للاستشارات الهندسية، بيت خبرة هندسي رائد متخصص في التصميم المعماري والهندسة الإنشائية وإدارة المشاريع."
      : "Learn about AlMnaber Consulting Professional Co., a leading engineering consultancy with expertise in architectural design, structural engineering, and project management.",
    openGraph: {
      title: isAr
        ? "من نحن | المنابر للاستشارات الهندسية"
        : "About AlMnaber Consulting Professional Co.",
      description: isAr
        ? "اكتشف قصتنا وقيمنا وفريق القيادة وخدماتنا الهندسية الحائزة على الجوائز."
        : "Discover our story, values, leadership team, and award-winning engineering consultancy services.",
    },
  };
}

export default function AboutUsPage() {
  return <AboutUsClient />;
}
