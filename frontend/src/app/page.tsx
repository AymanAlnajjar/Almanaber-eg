import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import News from "@/components/News";
import Blogs from "@/components/Blogs";
import FindUs from "@/components/FindUs";
import JsonLd from "@/components/JsonLd";

// Incremental Static Regeneration: render once, serve cached HTML for 5 min,
// then re-render in the background. Cuts server response time from ~3.7s to ~50ms.
// CMS edits appear within the revalidate window (see also the fetch revalidate below).
export const revalidate = 300;

const API = process.env.NEXT_PUBLIC_API_URL;

// Always returns an array, no matter what the API sends back
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const safeArray = (data: any) => (Array.isArray(data) ? data : data?.data && Array.isArray(data.data) ? data.data : []);

const safeFetch = (url: string) =>
  fetch(url, { next: { revalidate: 300 } })
    .then(r => (r.ok ? r.json() : []))
    .then(safeArray)
    .catch(() => []);

async function fetchHomeData() {
  const [slides, stats, services, projects, clients, news, blogs] = await Promise.all([
    safeFetch(`${API}/hero-slides`),
    safeFetch(`${API}/stats`),
    safeFetch(`${API}/services`),
    safeFetch(`${API}/projects/homepage`),
    safeFetch(`${API}/clients`),
    safeFetch(`${API}/news/homepage`),
    safeFetch(`${API}/blogs/homepage`),
  ]);
  return { slides, stats, services, projects, clients, news, blogs };
}

export default async function HomePage() {
  const data = await fetchHomeData();
  return (
    <main>
      <JsonLd />
      <Hero slides={data.slides} />
      <Stats stats={data.stats} />
      <Services services={data.services} />
      <Projects projects={data.projects} />
      <Clients clients={data.clients} />
      <News news={data.news} />
      <Blogs blogs={data.blogs} />
      <FindUs />
    </main>
  );
}
