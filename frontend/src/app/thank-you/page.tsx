import { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for contacting AlMnaber Consulting. We have received your message.",
  // Thank-you pages shouldn't clog search results
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}
