import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "اتصل بنا" : "Contact Us",
    description: isAr
      ? "تواصل مع شركة المنابر للاستشارات الهندسية — نستقبل استفساراتك حول الخدمات الهندسية أو المشاريع أو فرص الشراكة."
      : "Get in touch with AlMnaber Consulting Professional Co. — reach us about engineering services, project enquiries, or partnership opportunities.",
    openGraph: {
      title: isAr ? "اتصل بنا | المنابر" : "Contact Us | AlMnaber",
      description: isAr
        ? "أرسل لنا رسالة وسيعاود فريقنا التواصل معك خلال يوم عمل واحد."
        : "Send us a message and our team will get back to you within one business day.",
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
