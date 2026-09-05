"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://almnabr.eg";

// Localized label lookups (translation group + key) for known sections.
const SECTION_LABELS: Record<string, [string, string]> = {
  about: ["navbar", "about"],
  services: ["navbar", "services"],
  projects: ["navbar", "projects"],
  clients: ["navbar", "clients"],
  news: ["navbar", "news"],
  blogs: ["navbar", "blogs"],
  careers: ["navbar", "careers"],
  contact: ["navbar", "contact_us"],
};

// Emits BreadcrumbList structured data derived from the URL (SEO audit #20).
// Rendered on every page via ClientLayout; the home page (locale root only)
// gets no breadcrumb.
export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const { t, locale } = useLanguage();

  const segments = pathname.split("/").filter(Boolean); // e.g. ["ar", "about"]
  if (segments.length <= 1) return null; // locale root (home) — skip

  const [loc, ...rest] = segments;
  const items: { name: string; url: string }[] = [
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `${SITE_URL}/${loc}` },
  ];

  let acc = `${SITE_URL}/${loc}`;
  for (const seg of rest) {
    acc += `/${seg}`;
    const label = SECTION_LABELS[seg];
    items.push({
      name: label ? t(label[0], label[1]) : decodeURIComponent(seg),
      url: acc,
    });
  }

  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
