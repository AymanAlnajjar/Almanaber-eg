import type { Metadata } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://almnabr.eg"
).replace(/\/+$/, "");

export const SITE_NAME_EN = "Almnabr Consulting Engineering";
export const SITE_NAME_AR = "المنابر للاستشارات الهندسية";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export type SiteLocale = "ar" | "en";

function routePath(path: string): string {
  if (!path || path === "/") return "";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function localizedUrl(locale: SiteLocale, path = ""): string {
  return `${SITE_URL}/${locale}${routePath(path)}`;
}

export function localizedAlternates(path = ""): Metadata["alternates"] {
  return {
    languages: {
      ar: localizedUrl("ar", path),
      en: localizedUrl("en", path),
      "x-default": localizedUrl("ar", path),
    },
  };
}

export function absoluteUrl(value?: string | null): string | undefined {
  if (!value) return undefined;

  try {
    return new URL(value, `${SITE_URL}/`).toString();
  } catch {
    return undefined;
  }
}

type PageMetadataOptions = {
  locale: SiteLocale;
  path?: string;
  title: string;
  description: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string | string[];
  robots?: Metadata["robots"];
};

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  robots,
}: PageMetadataOptions): Metadata {
  const canonical = localizedUrl(locale, path);
  const socialImage = absoluteUrl(image) || `${SITE_URL}/almnabr-logo.png`;

  return {
    title,
    description,
    keywords,
    robots,
    alternates: {
      ...localizedAlternates(path),
      canonical,
    },
    openGraph: {
      type,
      url: canonical,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      siteName: locale === "ar" ? SITE_NAME_AR : SITE_NAME_EN,
      title,
      description,
      images: [{ url: socialImage }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
