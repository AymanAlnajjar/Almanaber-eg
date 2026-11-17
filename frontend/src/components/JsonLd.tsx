import {
  ORGANIZATION_ID,
  SITE_NAME_AR,
  SITE_NAME_EN,
  SITE_URL,
} from "@/lib/seo";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME_EN,
    alternateName: [SITE_NAME_AR, "AMCE"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/almnabr-logo.png`,
    },
    description:
      "Engineering consultancy providing architectural, structural, MEP, and fire and life safety design services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME_EN,
    alternateName: SITE_NAME_AR,
    url: SITE_URL,
    inLanguage: ["ar", "en"],
    publisher: { "@id": ORGANIZATION_ID },
  };

  return (
    <>
      <JsonLdScript data={organizationSchema} />
      <JsonLdScript data={websiteSchema} />
    </>
  );
}

export function ArticleJsonLd({
  articleType = "BlogPosting",
  title,
  description,
  image,
  publishDate,
  modifiedDate,
  author,
  url,
}: {
  articleType?: "BlogPosting" | "NewsArticle";
  title: string;
  description: string;
  image?: string | null;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  url: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": articleType,
        headline: title,
        description,
        ...(image ? { image } : {}),
        datePublished: publishDate,
        ...(modifiedDate ? { dateModified: modifiedDate } : {}),
        author: { "@type": "Person", name: author },
        publisher: { "@id": ORGANIZATION_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  image,
  url,
}: {
  name: string;
  description: string;
  image?: string | null;
  url: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        ...(image ? { image } : {}),
        url,
        provider: { "@id": ORGANIZATION_ID },
      }}
    />
  );
}

export function ProjectJsonLd({
  name,
  description,
  image,
  url,
  location,
}: {
  name: string;
  description: string;
  image?: string | null;
  url: string;
  location?: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name,
        description,
        ...(image ? { image } : {}),
        url,
        creator: { "@id": ORGANIZATION_ID },
        ...(location
          ? { locationCreated: { "@type": "Place", name: location } }
          : {}),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
