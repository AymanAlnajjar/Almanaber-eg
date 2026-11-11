import { API_BASE_URL } from '@/lib/api';
import ProjectsPageClient, { type Project, type ServiceOption } from './ProjectsPageClient';

async function fetchList<T>(path: string): Promise<T[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/${path}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export default async function ProjectsPage() {
  // Fetch on the server so browser CORS restrictions cannot hide the listings.
  const [projects, services] = await Promise.all([
    fetchList<Project>('projects'),
    fetchList<ServiceOption>('services'),
  ]);

  return <ProjectsPageClient projects={projects} services={services?.filter(service => service.slug) ?? []} />;
}
