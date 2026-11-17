import BlogsPageClient, { type BlogItem } from "./BlogsPageClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function getBlogs(): Promise<BlogItem[]> {
  try {
    const response = await fetch(`${API_URL.replace(/\/$/, "")}/blogs`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return [];
    const data: unknown = await response.json();
    return Array.isArray(data) ? (data as BlogItem[]) : [];
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  return <BlogsPageClient initialBlogs={await getBlogs()} />;
}
