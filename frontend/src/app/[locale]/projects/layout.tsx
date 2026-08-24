import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore AlMnaber's portfolio of engineering projects: housing, commercial, industrial, medical, governmental, and infrastructure projects across Saudi Arabia.",
  openGraph: {
    title: "Engineering Projects Portfolio | AlMnaber",
    description:
      "Browse our diverse portfolio of architectural and engineering projects across Saudi Arabia.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
