"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useScrollFade } from "@/components/useScrollFade";

interface Client {
  id: number;
  name_en: string;
  name_ar: string;
  logo: string;
  website: string | null;
}

interface ClientsPageClientProps {
  clients: Client[];
}

export default function ClientsPageClient({ clients }: ClientsPageClientProps) {
  const { t, locale } = useLanguage();

  const [headerRef, headerOpacity] = useScrollFade({
    threshold: 0.2,
    rootMargin: "-50px 0px",
  });

  const [gridRef, gridOpacity] = useScrollFade({
    threshold: 0.3,
    rootMargin: "-30px 0px",
  });

  return (
    <div className="bg-white min-h-screen pt-32 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div
          ref={headerRef}
          style={{
            opacity: headerOpacity,
            transform: `translateY(${20 - headerOpacity * 20}px)`,
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-bold text-[#092754] mb-6">
            {t("clients_page", "title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("clients_page", "subtitle")}
          </p>
        </div>

        {/* Clients Grid */}
        <div
          ref={gridRef}
          style={{
            opacity: gridOpacity,
            transform: `translateY(${25 - gridOpacity * 25}px)`,
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12"
        >
          {clients.map((client, index) => {
            const card = (
              <div className="relative w-full h-32 md:h-40 lg:h-48 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                <Image
                  src={client.logo || "/placeholder.png"}
                  alt={locale === "ar" ? client.name_ar : client.name_en}
                  width={200}
                  height={120}
                  className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                />
              </div>
            );

            return (
              <div
                key={client.id}
                className="flex items-center justify-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {client.website ? (
                  <a href={client.website} target="_blank" rel="noopener noreferrer" className="w-full">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            );
          })}

          {clients.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-500">
              {t("clients_page", "no_clients")}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-20 pt-16 border-t border-gray-200">
          <h3 className="text-2xl md:text-3xl font-bold text-[#092754] mb-4">
            {t("clients_page", "cta_title")}
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {t("clients_page", "cta_description")}
          </p>
          <Link href="/contact">
            <button className="bg-[#092754] text-white px-8 py-3 rounded-lg hover:bg-[#1a2950] transition-colors duration-300 text-lg font-medium">
              {t("clients_page", "contact_us")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
