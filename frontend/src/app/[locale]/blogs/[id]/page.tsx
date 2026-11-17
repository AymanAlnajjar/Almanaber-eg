import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/JsonLd";
import {
  localizedUrl,
  pageMetadata,
  type SiteLocale,
} from "@/lib/seo";
import BlogDetailsClient from "./BlogDetailsClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getBlog(id: string) {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: SiteLocale }>;
}) {
  const { id, locale } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return {
      title: locale === "ar" ? "المقال غير موجود" : "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const isAr = locale === "ar";
  const seo = blog.seo || {};
  const title =
    (isAr ? seo.meta_title_ar : seo.meta_title_en) ||
    (isAr ? blog.title_ar : blog.title_en);
  const description =
    (isAr ? seo.meta_description_ar : seo.meta_description_en) ||
    (isAr ? blog.description_ar : blog.description_en);

  return pageMetadata({
    locale,
    path: `/blogs/${id}`,
    title,
    description,
    image: seo.og_image || blog.main_image,
    type: "article",
    publishedTime: blog.publish_date,
    authors: blog.author ? [blog.author] : undefined,
    keywords: isAr ? seo.meta_keywords_ar : seo.meta_keywords_en,
  });
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string; locale: SiteLocale }>;
}) {
  const { id, locale } = await params;
  const blog = await getBlog(id);
  if (!blog) notFound();

  const isAr = locale === "ar";
  const title = isAr ? blog.title_ar : blog.title_en;
  const description = isAr ? blog.description_ar : blog.description_en;
  const url = localizedUrl(locale, `/blogs/${id}`);

  return (
    <>
      <ArticleJsonLd
        title={title}
        description={description}
        image={blog.main_image}
        publishDate={blog.publish_date}
        author={blog.author || "AMCE"}
        url={url}
      />
      <BlogDetailsClient blog={blog} locale={locale} />
    </>
  );
}
