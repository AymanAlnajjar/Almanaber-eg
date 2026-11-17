import { pageMetadata, type SiteLocale } from "@/lib/seo";
import ClientsPageClient from "./ClientsPageClient";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return pageMetadata({
    locale,
    path: "/clients",
    title: isAr ? "عملاؤنا" : "Our Clients",
    description: isAr
      ? "تعرّف على الجهات التي تعاونت مع المنابر في مشاريع وخدمات الاستشارات الهندسية."
      : "Meet organizations that have worked with AMCE on engineering projects and consultancy services.",
  });
}

export default async function ClientsPage() {
  const clients = await fetch(`${API.replace(/\/$/, "")}/clients`, {
    next: { revalidate: 300 },
  })
    .then((response) => (response.ok ? response.json() : []))
    .catch(() => []);

  return <ClientsPageClient clients={Array.isArray(clients) ? clients : []} />;
}
