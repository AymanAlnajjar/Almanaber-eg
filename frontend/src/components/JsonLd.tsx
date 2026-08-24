"use client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://almnaber.com";

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AlMnaber Consulting Professional Co.",
    alternateName: "AlMnaber",
    url: SITE_URL,
    logo: `${SITE_URL}/almnabr-logo.png`,
    description:
      "Leading Saudi engineering consultancy specializing in architectural design, structural engineering, fire & life safety, infrastructure, and project management.",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
    ],
    sameAs: [],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 30.049593,
        longitude: 31.38347,
      },
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AlMnaber Consulting Professional Co.",
    url: SITE_URL,
    logo: `${SITE_URL}/almnabr-logo.png`,
    image: `${SITE_URL}/almnabr-logo.png`,
    description:
      "Engineering consultancy firm providing architectural design, structural engineering, fire & life safety, infrastructure, and project management services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    priceRange: "$$",
    areaServed: ["Saudi Arabia", "Middle East"],
    knowsAbout: [
      "Architectural Design",
      "Structural Engineering",
      "Fire & Life Safety",
      "Infrastructure Design",
      "Project Management",
      "Building Permits",
      "Construction Supervision",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AlMnaber Consulting Professional Co.",
    url: SITE_URL,
    inLanguage: ["en", "ar"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/en/projects?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

// Reusable JSON-LD for individual news articles
export function NewsArticleJsonLd({
  title,
  description,
  image,
  publishDate,
  author,
  url,
}: {
  title: string;
  description: string;
  image: string;
  publishDate: string;
  author: string;
  url: string;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description,
    image: image,
    datePublished: publishDate,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "AlMnaber Consulting Professional Co.",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/almnabr-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

// Reusable JSON-LD for project pages
export function ProjectJsonLd({
  name,
  description,
  image,
  url,
  location,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
  location?: string;
}) {
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: name,
    description: description,
    image: image,
    url: url,
    creator: {
      "@type": "Organization",
      name: "AlMnaber Consulting Professional Co.",
    },
    ...(location && {
      locationCreated: {
        "@type": "Place",
        name: location,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
    />
  );
}

// Breadcrumb JSON-LD
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
