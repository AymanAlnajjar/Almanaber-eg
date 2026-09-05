import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://almnabr.eg";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const LOCALES = ["ar", "en"] as const;

// Emit one entry per locale for a given path suffix (e.g. "" for home,
// "/about"), each carrying hreflang alternates to its sibling locale. Now that
// real /ar and /en routing exists, these alternates resolve instead of 404ing.
function localized(
  path: string,
  opts: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  }
): MetadataRoute.Sitemap {
  return LOCALES.map((l) => ({
    url: `${SITE_URL}/${l}${path}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: {
      languages: {
        ar: `${SITE_URL}/ar${path}`,
        en: `${SITE_URL}/en${path}`,
        "x-default": `${SITE_URL}/ar${path}`,
      },
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    ...localized("", { changeFrequency: "weekly", priority: 1 }),
    ...localized("/about", { changeFrequency: "monthly", priority: 0.8 }),
    ...localized("/services", { changeFrequency: "monthly", priority: 0.8 }),
    ...localized("/projects", { changeFrequency: "weekly", priority: 0.9 }),
    ...localized("/clients", { changeFrequency: "monthly", priority: 0.6 }),
    ...localized("/news", { changeFrequency: "daily", priority: 0.8 }),
    ...localized("/blogs", { changeFrequency: "weekly", priority: 0.6 }),
    ...localized("/careers", { changeFrequency: "weekly", priority: 0.7 }),
    ...localized("/contact", { changeFrequency: "yearly", priority: 0.5 }),
  ];

  // Dynamic project pages
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/projects`, { cache: "no-store" });
    if (res.ok) {
      const projects = await res.json();
      projectPages = (Array.isArray(projects) ? projects : []).flatMap(
        (project: { id: number }) =>
          localized(`/projects/${project.id}`, {
            changeFrequency: "monthly",
            priority: 0.7,
          })
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
      servicePages = (Array.isArray(services) ? services : [])
        .filter((s: { slug?: string }) => s.slug)
        .flatMap((service: { slug: string }) =>
          localized(`/services/${service.slug}`, {
            changeFrequency: "monthly",
            priority: 0.8,
          })
        );
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
      newsPages = (Array.isArray(news) ? news : []).flatMap(
        (item: { id: number; publish_date?: string }) =>
          localized(`/news/${item.id}`, {
            changeFrequency: "monthly",
            priority: 0.6,
            lastModified: item.publish_date
              ? new Date(item.publish_date)
              : new Date(),
          })
      );
    }
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
  }

  return [...staticPages, ...servicePages, ...projectPages, ...newsPages];
}
