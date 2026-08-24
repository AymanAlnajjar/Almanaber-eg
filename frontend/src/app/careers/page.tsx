import { Metadata } from "next";
import CareersPageClient from "./CareersPageClient";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join AlMnaber Consulting Professional Co. Explore career opportunities in engineering, architecture, project management, and more across Saudi Arabia.",
  openGraph: {
    title: "Careers at AlMnaber",
    description:
      "Explore career opportunities at a leading Saudi engineering consultancy. Join our team of professionals.",
  },
};

export default function CareersPage() {
  return <CareersPageClient />;
}
