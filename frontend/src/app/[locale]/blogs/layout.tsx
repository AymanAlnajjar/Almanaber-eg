import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tips, industry trends, and case studies from AlMnaber Consulting — architecture, engineering, and construction expertise.",
  openGraph: {
    title: "Blog | AlMnaber",
    description:
      "Insights, tips, industry trends, and case studies from AlMnaber Consulting.",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
