"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

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

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  const { t, locale } = useLanguage();

  return (
    <section className="py-20 px-4 md:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#092754] mb-6">
            {t("services", "title")}
          </h2>
          <p className="text-lg md:text-xl text-[#092754]/80 max-w-3xl mx-auto">
            {t("services", "subtitle")}
          </p>
        </div>

        <div className="services-gallery">
          {services.length === 0 ? (
            <div className="text-center text-[#092754] py-20">
              <p className="text-xl">{t("common", "no_services")}</p>
            </div>
          ) : (
            services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug || service.id}`}
                className="service-card"
                style={{
                  backgroundImage: service.background_image
                    ? `url(${service.background_image})`
                    : "linear-gradient(135deg, #092754 0%, #1a4078 100%)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="service-title-visible">
                  <h3 className="service-title-text">
                    {locale === "ar" ? service.title_ar : service.title_en}
                  </h3>
                </div>

                <div className="service-overlay">
                  <div className="service-content">
                    {/* Not a heading — the always-visible label above is the single
                        <h3> for this card (SEO audit §5: duplicated headings). */}
                    <div className="service-title">
                      {locale === "ar" ? service.title_ar : service.title_en}
                    </div>
                    <p className="service-description">
                      {locale === "ar" ? service.description_ar : service.description_en}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-block border border-[#092754] text-[#092754] px-6 py-2 rounded hover:bg-[#092754] hover:text-white transition-colors duration-200 font-semibold"
          >
            {t("services", "learn_more")}
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .services-gallery {
          width: 100%;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .service-card {
          flex: 1 1 0;
          min-width: 0;
          height: 100%;
          transition: all ease-out 0.5s;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .service-card:hover { flex: 3 1 0; border-color: rgba(255, 255, 255, 0.8); }
        .service-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(9,39,84,0.4) 0%, rgba(9,39,84,0.3) 50%, rgba(9,39,84,0.4) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          text-align: center;
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
        .service-card:hover .service-overlay { opacity: 1; }
        .service-title-visible {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(9,39,84,0.95) 0%, rgba(9,39,84,0.8) 70%, rgba(9,39,84,0.3) 100%);
          padding: 12px 8px 8px 8px;
          z-index: 5;
          transition: opacity 0.3s ease-out;
        }
        .service-card:hover .service-title-visible { opacity: 0; }
        .service-title-text {
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          text-align: center;
          margin: 0;
          line-height: 1.2;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .service-icon { margin-bottom: 16px; transition: transform 0.3s ease-out; }
        .service-card:hover .service-icon { transform: scale(1.1); }
        .service-content { max-width: 100%; }
        .service-title { font-size: 1.5rem; font-weight: bold; color: white; margin-bottom: 12px; line-height: 1.2; }
        .service-description {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.9);
          line-height: 1.4;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }
        .service-card:hover .service-description { max-height: 200px; }
        @media (max-width: 1024px) {
          .services-gallery { height: 350px; }
          .service-card:hover { flex: 3 1 0; }
        }
        @media (max-width: 768px) {
          .services-gallery { height: auto; flex-direction: column; gap: 16px; padding: 20px 0; }
          .service-card { flex: 0 0 auto; width: 100%; height: 200px; border-radius: 12px; }
          .service-card:hover { flex: 0 0 auto; width: 100%; height: 200px; }
          .service-overlay { opacity: 1; }
          .service-title-visible { opacity: 0; }
        }
        @media (max-width: 480px) {
          .services-gallery { gap: 12px; padding: 16px 0; }
          .service-card { height: 180px; }
          .service-card:hover { height: 180px; }
        }
      `}</style>
    </section>
  );
}
