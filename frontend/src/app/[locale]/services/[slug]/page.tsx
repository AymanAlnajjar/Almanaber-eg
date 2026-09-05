import { notFound } from "next/navigation";
import { Metadata } from "next";
import ServiceDetailsClient from "./ServiceDetailsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getService(id: string) {
  try {
    const res = await fetch(`${API_URL}/services/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const isAr = resolvedParams.locale === "ar";
  const service = await getService(resolvedParams.slug);

  if (!service) {
    return { title: isAr ? "الخدمة غير موجودة" : "Service Not Found" };
  }

  const seo = service.seo || {};

  // Use the locale's SEO fields, falling back to the localized service content.
  const title =
    (isAr ? seo.meta_title_ar : seo.meta_title_en) ||
    (isAr ? service.title_ar : service.title_en);
  const description =
    (isAr ? seo.meta_description_ar : seo.meta_description_en) ||
    (isAr ? service.description_ar : service.description_en) ||
    (isAr
      ? `${service.title_ar} – خدمة استشارات هندسية من المنابر.`
      : `${service.title_en} – engineering consultancy service by AlMnaber.`);
  const keywords = (isAr ? seo.meta_keywords_ar : seo.meta_keywords_en) || "";
  const ogImage = seo.og_image || service.background_image;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${title} | AlMnaber Services`,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailsClient service={service} />;
}
