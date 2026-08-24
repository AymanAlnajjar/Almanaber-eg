"use client";

import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

interface NewsItem {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  category: string;
  author: string;
  read_time: number;
  publish_date: string;
  main_image: string;
}

interface NewsProps {
  news: NewsItem[];
}

export default function News({ news }: NewsProps) {
  const { t, locale } = useLanguage();

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-[#092754] text-3xl md:text-4xl font-extrabold mb-2">
              {t("news", "title")}
            </h2>
            <p className="text-[#092754] text-base md:text-lg">{t("news", "subtitle")}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href={`/${locale}/news`}
              className="border border-[#092754] text-[#092754] px-6 py-2 rounded hover:bg-white hover:text-[#092754]/60 transition-colors duration-200 font-medium inline-block"
            >
              {t("news", "view_all")}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.length > 0 ? (
            news.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/news/${item.id}`}
                className="news-card bg-gray-50 rounded-lg overflow-hidden flex flex-col block"
              >
                <div className="relative w-full h-56 md:h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.main_image || "/placeholder.svg"}
                    alt={locale === "ar" ? item.title_ar : item.title_en}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-[#092754] text-xl font-bold mb-2">
                    {locale === "ar" ? item.title_ar : item.title_en}
                  </h3>
                  <p className="text-[#092754] text-base mb-4 flex-1">
                    {locale === "ar" ? item.description_ar : item.description_en}
                  </p>
                  <div className="text-[#092754] font-medium flex items-center gap-1 hover:underline mt-auto transition-all duration-300 hover:gap-2">
                    {t("news", "get_directions")}
                    {locale === "ar" ? (
                      <FiChevronLeft className="inline-block text-lg transition-transform duration-300" />
                    ) : (
                      <FiChevronRight className="inline-block text-lg transition-transform duration-300" />
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[#092754] text-lg">No news available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
