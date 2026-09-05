"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CtaLink } from "@/components/ui/Button";
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from "react-icons/fi";

export default function ThankYouClient() {
  const { t, locale } = useLanguage();
  const isRTL = locale === "ar";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#092754] via-[#0b3570] to-[#092754] pt-20 flex items-center justify-center px-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        {/* Animated check icon */}
        <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100">
          <FiCheckCircle className="text-green-600" size={56} />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#092754] mb-4">
          {t("thank_you", "title")}
        </h1>

        <p className="text-lg text-gray-600 mb-2">
          {t("thank_you", "message")}
        </p>
        <p className="text-base text-gray-500 mb-8">
          {t("thank_you", "follow_up")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CtaLink href={`/${locale}`} variant="primary">
            {isRTL ? <FiArrowRight /> : <FiArrowLeft />}
            {t("thank_you", "back_home")}
          </CtaLink>
          <CtaLink href={`/${locale}/projects`} variant="outline">
            {t("thank_you", "explore_projects")}
          </CtaLink>
        </div>
      </div>
    </div>
  );
}
