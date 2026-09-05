import "./globals.css";
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://almnabr.eg";

// Site-wide metadata defaults. Per-locale title/description/openGraph/hreflang
// are set in app/[locale]/layout.tsx and merged over these.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "AlMnaber Consulting Professional Co." }],
  creator: "AlMnaber Consulting Professional Co.",
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
