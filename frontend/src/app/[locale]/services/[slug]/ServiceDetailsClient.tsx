"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ContactForm from "@/components/ContactForm";

interface RelatedProject {
  id: number;
  name_en: string;
  name_ar: string;
  area_en: string | null;
  area_ar: string | null;
  type: string | null;
  main_image: string | null;
}

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
  projects?: RelatedProject[];
}

interface Props {
  service: Service;
}

export default function ServiceDetailsClient({ service }: Props) {
  const { t, locale } = useLanguage();
  const isArabic = locale === "ar";

  const title = isArabic ? service.title_ar : service.title_en;
  const description = isArabic ? service.description_ar : service.description_en;
  const details = isArabic ? service.details_ar : service.details_en;
  const relatedProjects = service.projects || [];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <Link
          href={`/${locale}/services`}
          className="inline-flex items-center gap-2 text-[#092754] hover:text-blue-600 transition-colors mb-6"
        >
          {isArabic ? <FiArrowRight /> : <FiArrowLeft />}
          {t("service_details", "back_to_services")}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative w-full h-[380px] md:h-[460px] lg:h-[520px] overflow-hidden">
        {service.background_image ? (
          <Image
            src={service.background_image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#092754] to-[#1a4078]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pb-10 md:pb-14">
            <div className={isArabic ? "text-right" : "text-left"}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl drop-shadow">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div
            className={`prose prose-lg max-w-none ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#092754] mb-6">
              {t("service_details", "service_overview")}
            </h2>
            <div
              className="text-gray-700 leading-relaxed text-lg space-y-6"
              dangerouslySetInnerHTML={{ __html: details || "" }}
            />
          </div>
        </div>
      </section>

      {/* Latest projects for this service */}
      {relatedProjects.length > 0 && (
        <section className="px-4 md:px-8 py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className={`mb-8 ${isArabic ? "text-right" : "text-left"}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-[#092754] mb-2">
                {isArabic ? "أحدث المشاريع" : "Latest projects"}
              </h2>
              <p className="text-gray-600">
                {isArabic
                  ? `مشاريع ضمن خدمة ${title}`
                  : `Projects delivered under ${title}`}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/${locale}/projects/${project.id}`}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 block bg-white"
                >
                  <div className="relative h-56 bg-gray-200">
                    {project.main_image ? (
                      <Image
                        src={project.main_image}
                        alt={isArabic ? project.name_ar : project.name_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#092754] to-[#1a4078]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div
                      className={`absolute bottom-0 inset-x-0 p-5 ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    >
                      <h3 className="text-white text-lg font-bold drop-shadow line-clamp-2">
                        {isArabic ? project.name_ar : project.name_en}
                      </h3>
                      {(isArabic ? project.area_ar : project.area_en) && (
                        <p className="text-white/80 text-sm mt-1 drop-shadow">
                          {isArabic ? project.area_ar : project.area_en}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead-capture contact form — SEO/lead-gen per marketing */}
      <section className="px-4 md:px-8 pb-20 bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#092754] mb-3">
              {t("contact_form", "service_enquiry_title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("contact_form", "service_enquiry_subtitle")}
            </p>
          </div>
          <ContactForm
            source={`service:${service.title_en}`}
            lockedSubject={`Service enquiry: ${service.title_en}`}
          />
        </div>
      </section>
    </div>
  );
}
