import { notFound } from "next/navigation";
import { ServiceJsonLd } from "@/components/JsonLd";
import {
  localizedUrl,
  pageMetadata,
  type SiteLocale,
} from "@/lib/seo";
import ServiceDetailsClient from "./ServiceDetailsClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getService(slug: string) {
  try {
    const response = await fetch(`${API_URL}/services/${slug}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: locale === "ar" ? "الخدمة غير موجودة" : "Service Not Found",
      robots: { index: false, follow: false },
    };
  }

  const isAr = locale === "ar";
  const seo = service.seo || {};
  const title =
    (isAr ? seo.meta_title_ar : seo.meta_title_en) ||
    (isAr ? service.title_ar : service.title_en);
  const description =
    (isAr ? seo.meta_description_ar : seo.meta_description_en) ||
    (isAr ? service.description_ar : service.description_en) ||
    (isAr
      ? `خدمة ${title} من المنابر للاستشارات الهندسية.`
      : `${title} engineering consultancy service from AMCE.`);

  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title,
    description,
    image: seo.og_image || service.background_image,
    keywords: isAr ? seo.meta_keywords_ar : seo.meta_keywords_en,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const isAr = locale === "ar";
  const name = isAr ? service.title_ar : service.title_en;
  const description =
    (isAr ? service.description_ar : service.description_en) || name;

  return (
    <>
      <ServiceJsonLd
        name={name}
        description={description}
        image={service.background_image}
        url={localizedUrl(locale, `/services/${slug}`)}
      />
      <ServiceDetailsClient service={service} />
    </>
  );
}
