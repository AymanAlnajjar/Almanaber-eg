"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  name_en: string;
  name_ar: string;
  area_en: string;
  area_ar: string;
  types?: string[];
  services?: string[];
  main_image: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { t, locale } = useLanguage();
  const isRTL = locale === "ar";

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-[#092754] text-3xl md:text-4xl 2xl:text-5xl 4k:text-6xl font-bold mb-2 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("projects", "title") || "Our Projects"}
        </h2>
        <p
          className={`text-[#092754] text-base md:text-lg 2xl:text-xl 4k:text-2xl mb-8 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("projects", "subtitle") || ""}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {projects.length > 0 ? (
            projects.map((project: Project) => (
              <Link
                key={project.id}
                href={`/${locale}/projects/${project.id}`}
                className="relative group aspect-[4/3] overflow-hidden shadow-lg block"
              >
                <Image
                  src={project.main_image || "/placeholder.svg"}
                  alt={locale === "ar" ? project.name_ar : project.name_en}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full p-4 2xl:p-6 4k:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg">
                    <p
                      className={`text-white text-lg md:text-xl 2xl:text-2xl 4k:text-3xl font-bold mb-1 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {locale === "ar" ? project.name_ar : project.name_en}
                    </p>
                    <p
                      className={`text-white text-sm md:text-base 2xl:text-lg 4k:text-xl ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {locale === "ar" ? project.area_ar : project.area_en}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[#092754] text-lg">No projects available</p>
            </div>
          )}
        </div>

        <div style={{ height: 40 }} />

        <div className="flex justify-center">
          <Link href={`/${locale}/projects`}>
            <button className="border border-[#092754] text-[#092754] px-6 py-2 rounded hover:bg-white hover:text-[#092754]/60 transition-colors duration-200 font-semibold">
              {t("projects", "see_more") || "See More"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
