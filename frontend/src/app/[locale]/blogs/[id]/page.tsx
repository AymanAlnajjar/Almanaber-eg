import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetailsClient from "./BlogDetailsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getBlog(id: string) {
  try {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.id);

  if (!blog) {
    return { title: "Blog Post Not Found" };
  }

  const locale = resolvedParams.locale;
  const seo = blog.seo || {};

  const title =
    (locale === "ar" ? seo.meta_title_ar : seo.meta_title_en) ||
    (locale === "ar" ? blog.title_ar : blog.title_en);
  const description =
    (locale === "ar" ? seo.meta_description_ar : seo.meta_description_en) ||
    (locale === "ar" ? blog.description_ar : blog.description_en);
  const keywords =
    (locale === "ar" ? seo.meta_keywords_ar : seo.meta_keywords_en) || "";
  const ogImage = seo.og_image || blog.main_image;

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "article",
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
      publishedTime: blog.publish_date,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.id);

  if (!blog) {
    notFound();
  }

  return <BlogDetailsClient blog={blog} locale={resolvedParams.locale} />;
}
