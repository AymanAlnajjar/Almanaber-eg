"use client";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { HiDownload, HiStar, HiBadgeCheck, HiEmojiHappy, HiLightBulb, HiHand, HiUsers, HiEye, HiTrendingUp, HiShieldCheck, HiGlobe } from "react-icons/hi";
import { HiTrophy } from "react-icons/hi2";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from "react";
import Partners from "@/components/Partners";

// --- Interfaces ---

interface AboutPageSettings {
  hero_title_en: string;
  hero_title_ar: string;
  hero_subtitle_en: string;
  hero_subtitle_ar: string;
  hero_background_image: string | null;
  who_we_are_title_en: string;
  who_we_are_title_ar: string;
  who_we_are_content_en: string;
  who_we_are_content_ar: string;
  values_section_title_en: string;
  values_section_title_ar: string;
  leadership_title_en: string;
  leadership_title_ar: string;
  awards_title_en: string;
  awards_title_ar: string;
  portfolio_title_en: string;
  portfolio_title_ar: string;
  portfolio_description_en: string;
  portfolio_description_ar: string;
  portfolio_button_text_en: string;
  portfolio_button_text_ar: string;
  portfolio_file: string | null;
}

interface Value {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  icon: string | null;
  color: string;
  sort_order: number;
}

interface Award {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  icon: string | null;
  icon_color: string;
  sort_order: number;
}

interface TeamMember {
  id: number;
  name_en: string;
  name_ar: string;
  position_en: string;
  position_ar: string;
  bio_en: string | null;
  bio_ar: string | null;
  image: string;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  sort_order: number;
}

interface Partner {
  id: number;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  logo: string;
  website: string | null;
  sort_order: number;
}

// --- Icon mapping for awards and values ---
// Admin enters an icon name (e.g. "star", "badge-check") and it maps to a React Icon component.

const ICON_MAP: Record<string, React.ElementType> = {
  "star": HiStar,
  "badge-check": HiBadgeCheck,
  "emoji-happy": HiEmojiHappy,
  "lightbulb": HiLightBulb,
  "hand": HiHand,
  "users": HiUsers,
  "eye": HiEye,
  "trending-up": HiTrendingUp,
  "shield-check": HiShieldCheck,
  "globe": HiGlobe,
  "trophy": HiTrophy,
};

function getIcon(name: string | null, className: string) {
  const IconComponent = (name && ICON_MAP[name]) ? ICON_MAP[name] : HiStar;
  return <IconComponent className={className} />;
}

// --- Main Component ---

export default function AboutUsClient() {
  const { t, locale } = useLanguage();
  const isRTL = locale === "ar";

  const [settings, setSettings] = useState<AboutPageSettings | null>(null);
  const [values, setValues] = useState<Value[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [leadershipTeam, setLeadershipTeam] = useState<TeamMember[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL;
    Promise.all([
      fetch(`${API}/about-page`).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${API}/values`).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API}/awards`).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API}/team-members`).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API}/partners`).then(r => r.ok ? r.json() : []).catch(() => []),
    ]).then(([settingsData, valuesData, awardsData, teamData, partnersData]) => {
      setSettings(settingsData);
      // Guard every list against a non-array API response — mapping over a
      // non-array would throw and blank the page (SEO audit §3.1, item 4).
      setValues(Array.isArray(valuesData) ? valuesData : []);
      setAwards(Array.isArray(awardsData) ? awardsData : []);
      setLeadershipTeam(Array.isArray(teamData) ? teamData : []);
      setPartners(Array.isArray(partnersData) ? partnersData : []);
    }).finally(() => setLoading(false));
  }, []);

  // Helper: get localised field from settings, fall back to translation string
  const s = (enKey: keyof AboutPageSettings, arKey: keyof AboutPageSettings, fallbackNs: string, fallbackKey: string): string => {
    if (!settings) return t(fallbackNs, fallbackKey);
    const val = locale === "ar" ? settings[arKey] : settings[enKey];
    return (val as string) || t(fallbackNs, fallbackKey);
  };

  const handleDownloadPortfolio = () => {
    const fileUrl = settings?.portfolio_file || '/portfolio.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'AlMnabr-Portfolio.pdf';
    link.target = '_blank';
    link.click();
  };

  const heroImage = settings?.hero_background_image || '/project5.jpg';

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="AlMnabr Consulting Building"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {s("hero_title_en", "hero_title_ar", "about", "hero_title")}
          </h1>
          <p className="text-xl md:text-2xl font-light">
            {s("hero_subtitle_en", "hero_subtitle_ar", "about", "hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#092754] mb-8">
              {s("who_we_are_title_en", "who_we_are_title_ar", "about", "who_we_are_title")}
            </h2>
            <div className="w-24 h-1 bg-[#092754] mx-auto mb-8"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div
              className="text-lg md:text-xl text-gray-700 leading-relaxed text-center"
              dangerouslySetInnerHTML={{
                __html: s("who_we_are_content_en", "who_we_are_content_ar", "about", "who_we_are_content")
              }}
            />
          </div>
        </div>
      </section>

      {/* Our Values Section — hidden entirely when there's no content (SEO audit) */}
      {values.length > 0 && (
      <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-gray-50">
        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[#092754] bg-clip-text">
              {s("values_section_title_en", "values_section_title_ar", "about", "our_values_title")}
            </h2>
            <div className="w-24 h-1.5 bg-[#092754] mx-auto rounded-full" />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-[#092754] text-lg">{t("common", "loading")}</p>
            </div>
          ) : values.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No values available</p>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6 relative" style={{ zIndex: 1 }}>
              {values.map((value, index) => {
                const isEven = index % 2 === 0;
                const color = value.color || "from-blue-800 to-blue-600";

                return (
                  <div
                    key={value.id}
                    className={`flex flex-col md:flex-row items-center gap-2 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    style={{
                      animation: "fadeInUp 0.8s ease-out forwards",
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      transform: "translateY(30px)"
                    }}
                  >
                    <div
                      className={`flex-1 ${
                        isEven ? "md:text-right" : "md:text-left"
                      } text-center md:max-w-lg group`}
                    >
                      <h3 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-br ${color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block`}>
                        {locale === "ar" ? value.title_ar : value.title_en}
                      </h3>
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        {locale === "ar" ? value.description_ar : value.description_en}
                      </p>
                      <div
                        className={`mt-4 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${color} rounded-full ${
                          isEven ? "md:ml-auto" : "md:mr-auto"
                        } mx-auto md:mx-0`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
      )}

      {/* Our Leadership Section — hidden entirely when there's no content (SEO audit) */}
      {leadershipTeam.length > 0 && (
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#092754] mb-8">
              {s("leadership_title_en", "leadership_title_ar", "about", "our_leadership_title")}
            </h2>
            <div className="w-24 h-1 bg-[#092754] mx-auto mb-8"></div>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-[#092754] text-lg">Loading team members...</p>
            </div>
          ) : leadershipTeam.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#092754] text-lg">No team members available</p>
            </div>
          ) : (
            <div className="relative leadership-slider-container">
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={4}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={4000}
                pauseOnHover={true}
                rtl={isRTL}
                responsive={[
                  { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
                  { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                  { breakpoint: 768,  settings: { slidesToShow: 2, slidesToScroll: 1 } },
                  { breakpoint: 480,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
                ]}
                className="py-6 leadership-slider"
              >
                {leadershipTeam.map((member) => (
                  <div key={member.id} className="px-4">
                    <div className="text-center group">
                      <div className="relative mb-6 overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src={member.image || '/leadership-placeholder.svg'}
                          alt={isRTL ? member.name_ar : member.name_en}
                          width={300}
                          height={300}
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-[#092754] mb-2">
                        {isRTL ? member.name_ar : member.name_en}
                      </h3>
                      <p className="text-gray-600">
                        {isRTL ? member.position_ar : member.position_en}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
        <style>{`
          .leadership-slider-container .slick-prev,
          .leadership-slider-container .slick-next {
            color: #092754 !important; top: 50% !important;
            transform: translateY(-50%) !important; width: 40px !important;
            height: 40px !important; background: rgba(9, 39, 84, 0.9) !important;
            border-radius: 50% !important; box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            z-index: 10 !important;
          }
          .leadership-slider-container .slick-prev:before,
          .leadership-slider-container .slick-next:before {
            color: white !important; font-size: 18px !important; font-weight: bold !important;
          }
          .leadership-slider-container .slick-next { right: 20px !important; }
          .leadership-slider-container .slick-prev { left: 20px !important; }
          [dir="rtl"] .leadership-slider-container .slick-next { left: 20px !important; right: auto !important; }
          [dir="rtl"] .leadership-slider-container .slick-prev { right: 20px !important; left: auto !important; }
          .leadership-slider-container .slick-dots { bottom: -50px !important; }
          .leadership-slider-container .slick-dots li button:before { color: #092754 !important; font-size: 12px !important; }
          .leadership-slider-container .slick-dots li.slick-active button:before { color: #092754 !important; }
        `}</style>
      </section>
      )}

      {/* Awards and Achievements Section — hidden entirely when there's no content (SEO audit) */}
      {awards.length > 0 && (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#092754] mb-8">
              {s("awards_title_en", "awards_title_ar", "about", "awards_title")}
            </h2>
            <div className="w-24 h-1 bg-[#092754] mx-auto mb-8"></div>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-[#092754] text-lg">{t("common", "loading")}</p>
            </div>
          ) : awards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No awards available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {awards.map((award) => (
                <div key={award.id} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-4">
                    {getIcon(award.icon, `w-8 h-8 ${award.icon_color || "text-yellow-500"}`)}
                  </div>
                  <h3 className="text-xl font-bold text-[#092754] mb-4">
                    {locale === "ar" ? award.title_ar : award.title_en}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {locale === "ar" ? award.description_ar : award.description_en}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      {/* Partners Section — CMS-managed logo carousel (hidden when empty) */}
      <Partners partners={partners} />

      {/* Download Portfolio Section */}
      <section className="py-20 bg-[#092754]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {s("portfolio_title_en", "portfolio_title_ar", "about", "download_portfolio_title")}
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl text-gray-200 mb-12 leading-relaxed">
            {s("portfolio_description_en", "portfolio_description_ar", "about", "download_portfolio_desc")}
          </p>
          {settings?.portfolio_file ? (
            <button
              onClick={handleDownloadPortfolio}
              className="inline-flex items-center px-8 py-4 bg-white text-[#092754] font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <HiDownload className="w-6 h-6 mr-3" />
              {s("portfolio_button_text_en", "portfolio_button_text_ar", "about", "download_button")}
            </button>
          ) : (
            // No portfolio PDF uploaded yet — keep the section actionable with a
            // link to the projects page (SEO audit item 27: section had no action).
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center px-8 py-4 bg-white text-[#092754] font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {t("thank_you", "explore_projects")}
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
