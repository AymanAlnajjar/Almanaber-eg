import { notFound } from "next/navigation";
import { Metadata } from "next";
import NewsDetailsClient from "./NewsDetailsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getNews(id: string) {
  try {
    const res = await fetch(`${API_URL}/news/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const news = await getNews(resolvedParams.id);

  if (!news) {
    return { title: "Article Not Found" };
  }

  const locale = resolvedParams.locale;
  const seo = news.seo || {};

  // Use SEO fields from admin panel, fall back to content fields
  const title =
    (locale === "ar" ? seo.meta_title_ar : seo.meta_title_en) ||
    (locale === "ar" ? news.title_ar : news.title_en);
  const description =
    (locale === "ar" ? seo.meta_description_ar : seo.meta_description_en) ||
    (locale === "ar" ? news.description_ar : news.description_en);
  const keywords =
    (locale === "ar" ? seo.meta_keywords_ar : seo.meta_keywords_en) || "";
  const ogImage = seo.og_image || news.main_image;

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      type: "article",
      title: title,
      description: description,
      images: ogImage ? [{ url: ogImage }] : [],
      publishedTime: news.publish_date,
      authors: [news.author],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function NewsDetailsPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const resolvedParams = await params;
  const news = await getNews(resolvedParams.id);

  if (!news) {
    notFound();
  }

  return <NewsDetailsClient news={news} locale={resolvedParams.locale} />;
}
