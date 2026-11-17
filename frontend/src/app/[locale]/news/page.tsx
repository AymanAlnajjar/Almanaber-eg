import NewsPageClient, { type NewsItem } from "./NewsPageClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${API_URL.replace(/\/$/, "")}/news`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return [];
    const data: unknown = await response.json();
    return Array.isArray(data) ? (data as NewsItem[]) : [];
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  return <NewsPageClient initialNews={await getNews()} />;
}
