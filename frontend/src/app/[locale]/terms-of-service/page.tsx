import { Metadata } from "next";
import TermsOfServiceClient from "./TermsOfServiceClient";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "AlMnaber Consulting Professional Co. terms of service. Read our terms and conditions for using our website and services.",
};

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />;
}
