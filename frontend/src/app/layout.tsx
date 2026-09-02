import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Tajawal } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const tajawal = Tajawal({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"], display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://almnaber.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Al Manaber Consulting Engineering",
    template: "%s | Al Manaber",
  },
  description:
    "AlMnaber Consulting Professional Co. is a leading Saudi engineering consultancy specializing in architectural design, structural engineering, fire & life safety, infrastructure, and project management.",
  // Meta keywords intentionally omitted — Google ignores them (SEO audit §3.3).
  authors: [{ name: "AlMnaber Consulting Professional Co." }],
  creator: "AlMnaber Consulting Professional Co.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    url: SITE_URL,
    siteName: "AlMnaber Consulting Professional Co.",
    title: "AlMnaber Consulting Professional Co. | Engineering & Architecture",
    description:
      "Leading Saudi engineering consultancy specializing in architectural design, structural engineering, fire & life safety, infrastructure, and project management.",
    images: [
      {
        url: "/almnabr-logo.png",
        width: 512,
        height: 512,
        alt: "AlMnaber Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlMnaber Consulting Professional Co.",
    description:
      "Leading Saudi engineering consultancy specializing in architectural design, structural engineering, and project management.",
    images: ["/almnabr-logo.png"],
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
  alternates: {
    canonical: SITE_URL,
    // Per-locale hreflang intentionally omitted until real [locale] routing exists
    // (SEO audit §3.2/§3.6) — bare /en and /ar currently 404.
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <LanguageProvider>
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
} 