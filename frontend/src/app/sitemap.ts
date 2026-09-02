import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://almnaber.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      // No hreflang alternates here yet — bare /en and /ar have no route and 404
      // (SEO audit §3.6). Restore per-locale alternates once real [locale] routing
      // (audit §3.2) exists.
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/en/clients`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/ar/clients`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/en/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ar/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/en/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ar/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Dynamic project pages
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/projects`, { cache: "no-store" });
    if (res.ok) {
      const projects = await res.json();
      projectPages = projects.flatMap(
        (project: { id: number }) => [
          {
            url: `${SITE_URL}/en/projects/${project.id}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
          {
            url: `${SITE_URL}/ar/projects/${project.id}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
        ]
      );
    }
  } catch (error) {
    console.error("Error fetching projects for sitemap:", error);
  }

  // Dynamic service pages (slug-based SEO URLs)
  let servicePages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/services`, { cache: "no-store" });
    if (res.ok) {
      const services = await res.json();
      servicePages = services
        .filter((s: { slug?: string }) => s.slug)
        .map((service: { slug: string }) => ({
          url: `${SITE_URL}/services/${service.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.error("Error fetching services for sitemap:", error);
  }

  // Dynamic news pages
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/news`, { cache: "no-store" });
    if (res.ok) {
      const news = await res.json();
      newsPages = news.flatMap(
        (item: { id: number; publish_date?: string }) => [
          {
            url: `${SITE_URL}/en/news/${item.id}`,
            lastModified: item.publish_date
              ? new Date(item.publish_date)
              : new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
          {
            url: `${SITE_URL}/ar/news/${item.id}`,
            lastModified: item.publish_date
              ? new Date(item.publish_date)
              : new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ]
      );
    }
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
  }

  return [...staticPages, ...servicePages, ...projectPages, ...newsPages];
}
