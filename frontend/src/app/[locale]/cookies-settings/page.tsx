import { Metadata } from "next";
import CookiesSettingsClient from "./CookiesSettingsClient";

export const metadata: Metadata = {
  title: "Cookie Settings",
  description: "Manage your cookie preferences for the AlMnaber Consulting website.",
};

export default function CookiesSettingsPage() {
  return <CookiesSettingsClient />;
}
