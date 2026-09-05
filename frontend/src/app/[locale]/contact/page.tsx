import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AlMnaber Consulting Professional Co. — reach us about engineering services, project enquiries, or partnership opportunities.",
  openGraph: {
    title: "Contact Us | AlMnaber",
    description:
      "Send us a message and our team will get back to you within one business day.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
