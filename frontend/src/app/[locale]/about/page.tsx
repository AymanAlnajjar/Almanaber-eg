import { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AlMnaber Consulting Professional Co., a leading Saudi engineering consultancy with expertise in architectural design, structural engineering, and project management.",
  openGraph: {
    title: "About AlMnaber Consulting Professional Co.",
    description:
      "Discover our story, values, leadership team, and award-winning engineering consultancy services across Saudi Arabia.",
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
