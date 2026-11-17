import ClientLayout from "@/components/ClientLayout";
import { Tajawal } from "next/font/google";
import { LanguageProvider, type Locale } from "@/context/LanguageContext";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME_AR, SITE_NAME_EN, SITE_URL } from "@/lib/seo";

const tajawal = Tajawal({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"], display: "swap" });

// Pre-render both language trees at build time.
export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

// Per-locale metadata: Google now sees an Arabic title/description on /ar and an
// English one on /en, plus valid hreflang alternates (both URLs really exist).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr ? SITE_NAME_AR : SITE_NAME_EN;
  const description = isAr
    ? "المنابر للاستشارات الهندسية تقدم خدمات التصميم المعماري والهندسة الإنشائية وتصميم أنظمة الميكانيكا والكهرباء والحماية من الحريق والسلامة."
    : "Almnabr Consulting Engineering provides architectural, structural, MEP, and fire and life safety engineering services.";

  return {
    title: {
      default: title,
      template: "%s | AMCE",
    },
    description,
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_EG",
      url: `${SITE_URL}/${isAr ? "ar" : "en"}`,
      siteName: title,
      title,
      description,
      images: [
        { url: "/almnabr-logo.png", width: 512, height: 512, alt: "AlMnaber Logo" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/almnabr-logo.png"],
    },
    alternates: {
      canonical: `${SITE_URL}/${isAr ? "ar" : "en"}`,
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/ar`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ar" && locale !== "en") notFound();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className={tajawal.className}>
        <LanguageProvider initialLocale={locale as Locale}>
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
