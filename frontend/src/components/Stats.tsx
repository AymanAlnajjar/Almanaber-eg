"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useCounter } from "./useCounter";
import { useInView } from "./useInView";

interface Stat {
  id: number;
  label_en: string;
  label_ar: string;
  value: number;
  icon: string | null;
  prefix: string;
  suffix: string | null;
  sort_order: number;
}

interface StatsProps {
  stats: Stat[];
}

export default function Stats({ stats }: StatsProps) {
  const { t, locale } = useLanguage();
  const isRTL = locale === "ar";
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} className="bg-[#092754] py-16 2xl:py-24 4k:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 2xl:gap-20 4k:gap-32 items-start lg:items-center">
          <div className="lg:w-1/3">
            <p className="text-white text-lg 2xl:text-xl 4k:text-2xl leading-relaxed mb-6 2xl:mb-10 4k:mb-14">
              {t("stats", "description")}
            </p>
            <a
              href="#"
              className="text-white font-semibold hover:underline inline-flex items-center gap-2 text-base 2xl:text-lg 4k:text-2xl"
            >
              {t("stats", "button")} &gt;
            </a>
          </div>

          <div className="lg:w-2/3">
            <h2
              className={`text-white text-2xl 2xl:text-3xl 4k:text-5xl font-bold mb-8 2xl:mb-12 4k:mb-16 text-center lg:text-left ${
                isRTL ? "lg:text-right" : ""
              }`}
            >
              {t("stats", "title")}
            </h2>

            {stats.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white text-lg">No statistics available</p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                {stats.map((stat, index) => (
                  <StatItem
                    key={stat.id}
                    label={locale === "ar" ? stat.label_ar : stat.label_en}
                    value={stat.value}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix || ""}
                    isRTL={isRTL}
                    isLast={index === stats.length - 1}
                    inView={inView}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  isRTL: boolean;
  isLast: boolean;
  inView: boolean;
}

function StatItem({ label, value, prefix, suffix, isRTL, isLast, inView }: StatItemProps) {
  const counter = useCounter(value, 1000, inView);
  return (
    <div
      className={`flex-1 flex flex-col justify-center ${
        isRTL ? "border-r pr-4 pl-0" : "border-l pl-4 pr-0"
      } border-white ${isRTL ? "text-right" : "text-left"} ${
        isLast ? "" : "mb-8 md:mb-0"
      }`}
    >
      <div className="text-white text-6xl md:text-5xl 2xl:text-6xl 4k:text-8xl font-bold mb-2 2xl:mb-4 4k:mb-6">
        {prefix}
        {counter}
        {suffix}
      </div>
      <div className="text-white text-sm 2xl:text-lg 4k:text-xl font-medium">
        {label}
      </div>
    </div>
  );
}
