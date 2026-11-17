import { notFound } from "next/navigation";
import { ProjectJsonLd } from "@/components/JsonLd";
import {
  localizedUrl,
  pageMetadata,
  type SiteLocale,
} from "@/lib/seo";
import ProjectDetailsClient from "./ProjectDetailsClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getProject(id: string) {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: SiteLocale }>;
}) {
  const { id, locale } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: locale === "ar" ? "المشروع غير موجود" : "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const isAr = locale === "ar";
  const seo = project.seo || {};
  const title =
    (isAr ? seo.meta_title_ar : seo.meta_title_en) ||
    (isAr ? project.name_ar : project.name_en);
  const description =
    (isAr ? seo.meta_description_ar : seo.meta_description_en) ||
    (isAr
      ? project.mission_ar || project.area_ar
      : project.mission_en || project.area_en) ||
    (isAr
      ? `مشروع هندسي من تنفيذ المنابر: ${title}`
      : `Engineering project by AMCE: ${title}`);

  return pageMetadata({
    locale,
    path: `/projects/${id}`,
    title,
    description,
    image: seo.og_image || project.main_image,
    keywords: isAr ? seo.meta_keywords_ar : seo.meta_keywords_en,
  });
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string; locale: SiteLocale }>;
}) {
  const { id, locale } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  const isAr = locale === "ar";
  const name = isAr ? project.name_ar : project.name_en;
  const description =
    (isAr ? project.mission_ar || project.area_ar : project.mission_en || project.area_en) ||
    name;

  return (
    <>
      <ProjectJsonLd
        name={name}
        description={description}
        image={project.main_image}
        url={localizedUrl(locale, `/projects/${id}`)}
        location={isAr ? project.location_ar : project.location_en}
      />
      <ProjectDetailsClient project={project} locale={locale} />
    </>
  );
}
