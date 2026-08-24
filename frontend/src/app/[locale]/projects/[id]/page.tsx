import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectDetailsClient from "./ProjectDetailsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getProject(id: string) {
  try {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const locale = resolvedParams.locale;
  const seo = project.seo || {};

  // Use SEO fields from admin panel, fall back to content fields
  const title =
    (locale === "ar" ? seo.meta_title_ar : seo.meta_title_en) ||
    (locale === "ar" ? project.name_ar : project.name_en);
  const description =
    (locale === "ar" ? seo.meta_description_ar : seo.meta_description_en) ||
    (locale === "ar" ? project.mission_ar || project.area_ar : project.mission_en || project.area_en);
  const keywords =
    (locale === "ar" ? seo.meta_keywords_ar : seo.meta_keywords_en) || "";
  const ogImage = seo.og_image || project.main_image;

  return {
    title: title,
    description: description || `${title} - AlMnaber Engineering Project`,
    keywords: keywords,
    openGraph: {
      title: `${title} | AlMnaber Projects`,
      description: description || `${title} - Engineering project by AlMnaber Consulting`,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} locale={resolvedParams.locale} />;
}
