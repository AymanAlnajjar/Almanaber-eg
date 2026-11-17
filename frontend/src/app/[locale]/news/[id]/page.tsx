import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/JsonLd";
import {
  localizedUrl,
  pageMetadata,
  type SiteLocale,
} from "@/lib/seo";
import NewsDetailsClient from "./NewsDetailsClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getNews(id: string) {
  try {
    const response = await fetch(`${API_URL}/news/${id}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: SiteLocale }>;
}) {
  const { id, locale } = await params;
  const article = await getNews(id);

  if (!article) {
    return {
      title: locale === "ar" ? "الخبر غير موجود" : "News Item Not Found",
      robots: { index: false, follow: false },
    };
  }

  const isAr = locale === "ar";
  const seo = article.seo || {};
  const title =
    (isAr ? seo.meta_title_ar : seo.meta_title_en) ||
    (isAr ? article.title_ar : article.title_en);
  const description =
    (isAr ? seo.meta_description_ar : seo.meta_description_en) ||
    (isAr ? article.description_ar : article.description_en);

  return pageMetadata({
    locale,
    path: `/news/${id}`,
    title,
    description,
    image: seo.og_image || article.main_image,
    type: "article",
    publishedTime: article.publish_date,
    authors: article.author ? [article.author] : undefined,
    keywords: isAr ? seo.meta_keywords_ar : seo.meta_keywords_en,
  });
}

export default async function NewsDetailsPage({
  params,
}: {
  params: Promise<{ id: string; locale: SiteLocale }>;
}) {
  const { id, locale } = await params;
  const article = await getNews(id);
  if (!article) notFound();

  const isAr = locale === "ar";
  const title = isAr ? article.title_ar : article.title_en;
  const description = isAr
    ? article.description_ar
    : article.description_en;
  const url = localizedUrl(locale, `/news/${id}`);

  return (
    <>
      <ArticleJsonLd
        articleType="NewsArticle"
        title={title}
        description={description}
        image={article.main_image}
        publishDate={article.publish_date}
        author={article.author || "AMCE"}
        url={url}
      />
      <NewsDetailsClient news={article} locale={locale} />
    </>
  );
}
