import { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "شكراً لك" : "Thank You",
    description: isAr
      ? "شكراً لتواصلك مع شركة المنابر للاستشارات الهندسية. لقد استلمنا رسالتك."
      : "Thank you for contacting AlMnaber Consulting. We have received your message.",
    // Thank-you pages shouldn't clog search results
    robots: { index: false, follow: false },
  };
}

export default function ThankYouPage() {
  return <ThankYouClient />;
}
