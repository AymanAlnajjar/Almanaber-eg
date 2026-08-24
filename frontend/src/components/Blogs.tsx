"use client";

import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

interface BlogItem {
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

interface BlogsProps {
  blogs: BlogItem[];
}

export default function Blogs({ blogs }: BlogsProps) {
  const { t, locale } = useLanguage();

  if (blogs.length === 0) return null;

  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-[#092754] text-3xl md:text-4xl font-extrabold mb-2">
              {t("blogs", "title")}
            </h2>
            <p className="text-[#092754] text-base md:text-lg">{t("blogs", "subtitle")}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href={`/${locale}/blogs`}
              className="border border-[#092754] text-[#092754] px-6 py-2 rounded hover:bg-[#092754] hover:text-white transition-colors duration-200 font-medium inline-block"
            >
              {t("blogs", "view_all")}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/blogs/${item.id}`}
              className="bg-gray-50 rounded-lg overflow-hidden flex flex-col block hover:shadow-lg transition-shadow duration-300"
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
                  {t("blogs", "read_more")}
                  {locale === "ar" ? (
                    <FiChevronLeft className="inline-block text-lg" />
                  ) : (
                    <FiChevronRight className="inline-block text-lg" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
