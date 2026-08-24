import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Stay updated with the latest news from AlMnaber Consulting: project completions, milestones, company achievements, and industry insights.",
  openGraph: {
    title: "News & Updates | AlMnaber",
    description:
      "Latest news about project completions, milestones, and company achievements from AlMnaber Consulting.",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
