import { API_BASE_URL } from "@/lib/api";
import { pageMetadata, type SiteLocale } from "@/lib/seo";
import ProjectsPageClient, {
  type Project,
  type ServiceOption,
} from "./ProjectsPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/projects",
    title: isAr ? "مشاريعنا" : "Engineering Projects",
    description: isAr
      ? "استعرض مجموعة من مشاريع المنابر وخبراتها في التصميم والاستشارات الهندسية."
      : "Explore selected AMCE projects and experience across engineering design and consultancy services.",
  });
}

async function fetchList<T>(path: string): Promise<T[] | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL.replace(/\/$/, "")}/${path}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
      }
    );
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export default async function ProjectsPage() {
  const [projects, services] = await Promise.all([
    fetchList<Project>("projects"),
    fetchList<ServiceOption>("services"),
  ]);

  return (
    <ProjectsPageClient
      projects={projects}
      services={services?.filter((service) => service.slug) ?? []}
    />
  );
}
