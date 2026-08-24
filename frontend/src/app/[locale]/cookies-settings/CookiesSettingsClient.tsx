"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function CookiesSettingsClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t("legal", "cookies_settings_title")}
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t("legal", "cookies_settings_section1_title")}
            </h2>
            <p className="mb-4">
              {t("legal", "cookies_settings_section1_content")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t("legal", "cookies_settings_section2_title")}
            </h2>
            <p className="mb-4">{t("legal", "cookies_settings_section2_content")}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("legal", "cookies_settings_section2_item1")}</li>
              <li>{t("legal", "cookies_settings_section2_item2")}</li>
              <li>{t("legal", "cookies_settings_section2_item3")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t("legal", "cookies_settings_section3_title")}
            </h2>
            <p className="mb-4">
              {t("legal", "cookies_settings_section3_content")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t("legal", "cookies_settings_section4_title")}
            </h2>
            <p className="mb-4">
              {t("legal", "cookies_settings_section4_content")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t("legal", "cookies_settings_section5_title")}
            </h2>
            <p className="mb-4">
              {t("legal", "cookies_settings_section5_content")}
            </p>
          </section>

          <div className="text-sm text-gray-500 mt-12 pt-8 border-t">
            {t("legal", "cookies_settings_last_updated")}: {t("legal", "last_updated_date")}
          </div>
        </div>
      </div>
    </div>
  );
}
