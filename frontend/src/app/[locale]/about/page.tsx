import { pageMetadata, type SiteLocale } from "@/lib/seo";
import AboutUsClient, {
  type AboutInitialData,
  type AboutPageSettings,
  type Award,
  type Partner,
  type TeamMember,
  type Value,
} from "./AboutUsClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/about",
    title: isAr ? "من نحن" : "About Us",
    description: isAr
      ? "تعرّف على شركة المنابر للاستشارات الهندسية وخبراتها وقيمها وخدماتها الهندسية."
      : "Learn about Almnabr Consulting Engineering, its experience, values, and engineering consultancy services.",
  });
}

async function fetchJson<T>(
  path: string,
  fallback: T
): Promise<{ data: T; ok: boolean }> {
  try {
    const response = await fetch(`${API_URL.replace(/\/$/, "")}/${path}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return { data: fallback, ok: false };
    return { data: (await response.json()) as T, ok: true };
  } catch {
    return { data: fallback, ok: false };
  }
}

async function getAboutData(): Promise<AboutInitialData> {
  const [settings, values, awards, team, partners] = await Promise.all([
    fetchJson<AboutPageSettings | null>("about-page", null),
    fetchJson<Value[]>("values", []),
    fetchJson<Award[]>("awards", []),
    fetchJson<TeamMember[]>("team-members", []),
    fetchJson<Partner[]>("partners", []),
  ]);

  return {
    settings: settings.data,
    values: Array.isArray(values.data) ? values.data : [],
    awards: Array.isArray(awards.data) ? awards.data : [],
    leadershipTeam: Array.isArray(team.data) ? team.data : [],
    partners: Array.isArray(partners.data) ? partners.data : [],
    retryClient:
      !settings.ok || !values.ok || !awards.ok || !team.ok || !partners.ok,
  };
}

export default async function AboutUsPage() {
  return <AboutUsClient initialData={await getAboutData()} />;
}
