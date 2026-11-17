import "./globals.css";
import { Metadata } from "next";
import { SITE_NAME_EN, SITE_URL } from "@/lib/seo";

// Site-wide metadata defaults. Per-locale title/description/openGraph/hreflang
// are set in app/[locale]/layout.tsx and merged over these.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: SITE_NAME_EN }],
  creator: SITE_NAME_EN,
  publisher: SITE_NAME_EN,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// The real <html>/<body> live in app/[locale]/layout.tsx so that the lang/dir
// attributes are server-rendered per locale. This root layout is a passthrough.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
