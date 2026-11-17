import type { MetadataRoute } from "next";
import { localizedUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
).replace(/\/+$/, "");

const LOCALES = ["ar", "en"] as const;

type SitemapRecord = {
  id: number;
  updated_at?: string | null;
  publish_date?: string | null;
};

type ServiceSitemapRecord = SitemapRecord & {
  slug_en?: string | null;
};

type SitemapData = {
  projects?: SitemapRecord[];
  news?: SitemapRecord[];
  blogs?: SitemapRecord[];
  services?: ServiceSitemapRecord[];
};

function validDate(value?: string | null): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function localized(
  path: string,
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  }
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: localizedUrl(locale, path),
    ...(options.lastModified ? { lastModified: options.lastModified } : {}),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: {
        ar: localizedUrl("ar", path),
        en: localizedUrl("en", path),
        "x-default": localizedUrl("ar", path),
      },
    },
  }));
}

async function fetchSitemapData(): Promise<SitemapData> {
  try {
    const response = await fetch(`${API_URL}/sitemap-data`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) return {};
    const data: unknown = await response.json();
    return data && typeof data === "object" ? (data as SitemapData) : {};
  } catch (error) {
    console.error("Unable to load dynamic sitemap data", error);
    return {};
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    ...localized("", { changeFrequency: "weekly", priority: 1 }),
    ...localized("/about", { changeFrequency: "monthly", priority: 0.8 }),
    ...localized("/services", { changeFrequency: "monthly", priority: 0.9 }),
    ...localized("/projects", { changeFrequency: "weekly", priority: 0.9 }),
    ...localized("/clients", { changeFrequency: "monthly", priority: 0.6 }),
    ...localized("/news", { changeFrequency: "weekly", priority: 0.7 }),
    ...localized("/blogs", { changeFrequency: "weekly", priority: 0.7 }),
    ...localized("/careers", { changeFrequency: "weekly", priority: 0.5 }),
    ...localized("/contact", { changeFrequency: "yearly", priority: 0.6 }),
    ...localized("/privacy-policy", { changeFrequency: "yearly", priority: 0.2 }),
    ...localized("/terms-of-service", { changeFrequency: "yearly", priority: 0.2 }),
  ];

  const data = await fetchSitemapData();

  const projectPages = (data.projects ?? []).flatMap((project) =>
    localized(`/projects/${project.id}`, {
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: validDate(project.updated_at),
    })
  );

  const servicePages = (data.services ?? [])
    .filter((service): service is ServiceSitemapRecord & { slug_en: string } =>
      Boolean(service.slug_en)
    )
    .flatMap((service) =>
      localized(`/services/${service.slug_en}`, {
        changeFrequency: "monthly",
        priority: 0.8,
        lastModified: validDate(service.updated_at),
      })
    );

  const newsPages = (data.news ?? []).flatMap((item) =>
    localized(`/news/${item.id}`, {
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: validDate(item.updated_at || item.publish_date),
    })
  );

  const blogPages = (data.blogs ?? []).flatMap((item) =>
    localized(`/blogs/${item.id}`, {
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: validDate(item.updated_at || item.publish_date),
    })
  );

  return [
    ...staticPages,
    ...servicePages,
    ...projectPages,
    ...newsPages,
    ...blogPages,
  ];
}
