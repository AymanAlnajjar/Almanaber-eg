"use client";

import ContactForm from "@/components/ContactForm";
import FindUs from "@/components/FindUs";
import { useLanguage } from "@/context/LanguageContext";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export default function ContactPageClient() {
  const { t, locale } = useLanguage();
  const isRTL = locale === "ar";

  return (
    <div className="min-h-screen bg-white pt-20" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Header */}
      <section className="relative bg-[#092754] text-white py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t("contact_page", "title")}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {t("contact_page", "subtitle")}
          </p>
        </div>
      </section>

      {/* Form + Quick-contact grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left column — form (spans 3 of 5) */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#092754] mb-2">
              {t("contact_page", "form_title")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("contact_page", "form_subtitle")}
            </p>
            <ContactForm source="contact-page" />
          </div>

          {/* Right column — quick contact info (spans 2 of 5) */}
          <aside className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100 h-full">
              <h3 className="text-xl font-bold text-[#092754] mb-6">
                {t("contact_page", "reach_us")}
              </h3>

              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <FiMapPin className="text-[#092754] mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-[#092754]">
                      {t("findus", "cairo_title")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("findus", "cairo_address")}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FiPhone className="text-[#092754] mt-1 flex-shrink-0" size={20} />
                  <a
                    href="tel:+201555410885"
                    className="text-sm text-gray-700 hover:text-[#092754] transition-colors"
                  >
                    {t("findus", "cairo_phone")}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FiMail className="text-[#092754] mt-1 flex-shrink-0" size={20} />
                  <a
                    href="mailto:Cairo@Almanabr.com"
                    className="text-sm text-gray-700 hover:text-[#092754] transition-colors"
                  >
                    {t("findus", "cairo_email")}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Reuse existing FindUs map/offices block */}
      <FindUs />
    </div>
  );
}
