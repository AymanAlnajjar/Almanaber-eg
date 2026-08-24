"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Nav() {
  const { t, locale, setLocale } = useLanguage();
  const isRTL = locale === "ar";
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Listen for scroll to update navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine navbar background and shadow
  let navBg = "";
  let navShadow = "";
  if (isHome && !scrolled) {
    navBg = "bg-transparent";
    navShadow = "";
  } else {
    navBg = "bg-[#092754]";
    navShadow = "shadow-lg";
  }

  return (
    <nav
      className={`${navBg} ${navShadow} transition-colors duration-300 ${isRTL ? "text-right" : "text-left"} pt-2 pb-2 2xl:pt-4 2xl:pb-4 4k:pt-6 4k:pb-6`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between w-full">
          {/* Logo */}
          <div className={`flex-1 flex ${isRTL ? "justify-start" : "justify-start"}`}>
            <Link href="/" className="text-2xl font-bold text-white">
              <Image src="/almnabr-logo.png" alt="Almnabr logo" width={128} height={128} className="w-16 2xl:w-24 4k:w-32 h-auto" />
            </Link>
          </div>
          {/* Hamburger for mobile */}
          <div className="flex items-center justify-end md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <HiX className="w-8 h-8" />
              ) : (
                <HiMenu className="w-8 h-8" />
              )}
            </button>
          </div>
          {/* Tabs */}
          <div className="flex-1 justify-center hidden md:flex">
            <div className="flex space-x-4">
              {[
                { key: "about", href: "/about" },
                { key: "services", href: "/services" },
                { key: "projects", href: `/${locale}/projects` },
                { key: "clients", href: `/${locale}/clients` },
                { key: "news", href: `/${locale}/news` },
                { key: "blogs", href: `/${locale}/blogs` },
                { key: "careers", href: "/careers" },
              ].map((tab) => (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className={`text-white hover:text-gray-100 px-3 py-2 rounded-md text-md 2xl:text-lg 4k:text-2xl whitespace-nowrap 2xl:px-5 4k:px-8 ${isHome && !scrolled ? 'drop-shadow' : ''}`}
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
                >
                  {t("navbar", tab.key)}
                </Link>
              ))}
            </div>
          </div>
          {/* Language toggle & Contact Us */}
          <div className={`flex-1 flex ${isRTL ? "justify-end" : "justify-end"} items-center gap-2 hidden md:flex`}>
            <button
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="text-white hover:text-gray-100 px-3 py-1 text-sm 2xl:text-lg 4k:text-2xl font-medium mx-2 2xl:px-5 4k:px-8"
            >
              {locale === "en" ? t("navbar", "language_ar") : t("navbar", "language_en")}
            </button>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-4 py-2 2xl:px-6 2xl:py-3 4k:px-10 4k:py-5 rounded-md text-sm 2xl:text-lg 4k:text-2xl font-medium hover:bg-blue-700"
            >
              {t("navbar", "contact_us")}
            </Link>
          </div>
          {/* Mobile menu overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex flex-col md:hidden">
              <div className="bg-[#092754] w-3/4 max-w-xs h-full p-6 flex flex-col gap-6" style={{direction: isRTL ? 'rtl' : 'ltr'}}>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="self-end text-white mb-4"
                  aria-label="Close menu"
                >
                  <HiX className="w-8 h-8" />
                </button>
                <nav className="flex flex-col gap-4">
                  {[
                    { key: "about", href: "/about" },
                    { key: "services", href: "/services" },
                    { key: "projects", href: `/${locale}/projects` },
                    { key: "clients", href: `/${locale}/clients` },
                    { key: "news", href: `/${locale}/news` },
                    { key: "blogs", href: `/${locale}/blogs` },
                    { key: "careers", href: "/careers" },
                  ].map((tab) => (
                    <Link
                      key={tab.key}
                      href={tab.href}
                      className="text-white text-lg font-medium whitespace-nowrap py-2 px-2 rounded hover:bg-blue-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("navbar", tab.key)}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-4 mt-8">
                  <button
                    onClick={() => { setLocale(locale === "en" ? "ar" : "en"); setIsMenuOpen(false); }}
                    className="text-white hover:text-gray-100 px-3 py-2 text-md font-medium rounded bg-blue-600 hover:bg-blue-700"
                  >
                    {locale === "en" ? t("navbar", "language_ar") : t("navbar", "language_en")}
                  </button>
                  <Link
                    href="/contact"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-md font-medium hover:bg-blue-700 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("navbar", "contact_us")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 