import { pageMetadata, type SiteLocale } from "@/lib/seo";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/contact",
    title: isAr ? "اتصل بنا" : "Contact Us",
    description: isAr
      ? "تواصل مع المنابر للاستفسار عن الخدمات الهندسية أو المشاريع أو فرص التعاون."
      : "Contact Almnabr Consulting Engineering about engineering services, projects, or collaboration opportunities.",
  });
}

export default function ContactPage() {
  return <ContactPageClient />;
}
