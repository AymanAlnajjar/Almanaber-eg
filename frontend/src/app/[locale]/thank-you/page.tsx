import { pageMetadata, type SiteLocale } from "@/lib/seo";
import ThankYouClient from "./ThankYouClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/thank-you",
    title: isAr ? "شكراً لك" : "Thank You",
    description: isAr
      ? "شكراً لتواصلك مع المنابر للاستشارات الهندسية."
      : "Thank you for contacting Almnabr Consulting Engineering.",
    robots: { index: false, follow: false },
  });
}

export default function ThankYouPage() {
  return <ThankYouClient />;
}
