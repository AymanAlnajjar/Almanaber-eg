import { Metadata } from "next";
import ClientsPageClient from "./ClientsPageClient";

export const metadata: Metadata = {
  title: "Our Clients",
  description:
    "Trusted by leading organizations across Saudi Arabia. See the clients who trust AlMnaber Consulting for their engineering and architectural projects.",
  openGraph: {
    title: "Our Clients | AlMnaber",
    description:
      "Leading organizations across Saudi Arabia trust AlMnaber Consulting for engineering excellence.",
  },
};

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function ClientsPage() {
  const clients = await fetch(`${API}/clients`, { next: { revalidate: 300 } })
    .then((r) => r.json())
    .catch(() => []);

  return <ClientsPageClient clients={clients} />;
}
