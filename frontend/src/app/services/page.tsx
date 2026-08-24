import { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore AlMnaber's comprehensive engineering services: architectural design, structural engineering, fire & life safety, infrastructure, building permits, and project management.",
  openGraph: {
    title: "Engineering Services | AlMnaber",
    description:
      "Comprehensive engineering consultancy services including architectural design, fire safety, infrastructure, and project management.",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
