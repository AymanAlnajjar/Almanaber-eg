"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

interface Service {
  id: number;
  slug?: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  details_en: string;
  details_ar: string;
  icon: string | null;
  background_image: string | null;
  sort_order: number;
}

export default function ServicesPageClient() {
  const { t, locale } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const isArabic = locale === "ar";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#092754] mb-4">
            {t("services", "title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("services", "subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">{t("common", "loading")}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">{t("common", "no_services")}</p>
          </div>
        ) : (
          <div className="space-y-20 md:space-y-28">
            {services.map((service, index) => {
              const even = index % 2 === 0;
              const title = isArabic ? service.title_ar : service.title_en;
              const description = isArabic
                ? service.description_ar
                : service.description_en;
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug || service.id}`}
                  className={`group flex flex-col items-center gap-8 md:gap-14 ${
                    even ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div className="w-full md:w-[55%]">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
                      {service.background_image ? (
                        <Image
                          src={service.background_image}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 55vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#092754] to-[#1a4078]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`w-full md:w-[45%] ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    <span className="block text-6xl md:text-7xl font-bold text-[#092754]/10 leading-none mb-3 select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#092754] mb-4">
                      {title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-7">
                      {description}
                    </p>

                    <span
                      className={`inline-flex items-center gap-2 border border-[#092754] text-[#092754] px-6 py-2.5 rounded font-semibold group-hover:bg-[#092754] group-hover:text-white group-hover:gap-3 transition-all duration-300 ${
                        isArabic ? "flex-row-reverse" : ""
                      }`}
                    >
                      {t("services", "view_details")}
                      {isArabic ? <FiChevronLeft /> : <FiChevronRight />}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
