"use client";

import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { useLanguage } from "@/context/LanguageContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Client {
  id: number;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  logo: string;
  website: string | null;
  sort_order: number;
}

interface ClientsProps {
  clients: Client[];
}

export default function Clients({ clients }: ClientsProps) {
  const { t, locale } = useLanguage();

  // react-slick clones slides (and breaks its layout, stacking them) when there
  // are fewer clients than slidesToShow in infinite mode. So cap slidesToShow to
  // the number of logos and only loop/autoplay/show-arrows when there are more
  // logos than fit. Renders correctly for any count, including a single client.
  const count = clients.length;
  const cap = (n: number) => Math.max(1, Math.min(n, count));
  const responsiveShow = (desired: number) => {
    const show = cap(desired);
    const loop = count > show;
    return { slidesToShow: show, slidesToScroll: 1, infinite: loop, arrows: loop };
  };
  const baseShow = cap(5);
  const baseLoop = count > baseShow;
  const sliderSettings = {
    dots: false,
    infinite: baseLoop,
    speed: 500,
    slidesToShow: baseShow,
    slidesToScroll: 1,
    autoplay: baseLoop,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: baseLoop,
    rtl: locale === "ar",
    responsive: [
      { breakpoint: 1280, settings: responsiveShow(7) },
      { breakpoint: 1024, settings: responsiveShow(5) },
      { breakpoint: 640, settings: responsiveShow(3) },
      { breakpoint: 480, settings: responsiveShow(2) },
    ],
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl 2xl:text-5xl 4k:text-6xl font-bold text-[#092754] mb-4">
          {t("clients", "title")}
        </h2>
        <p className="text-base md:text-lg 2xl:text-xl 4k:text-2xl text-[#092754] mb-10">
          {t("clients", "subtitle")}
        </p>

        {clients.length === 0 ? (
          <div className="py-12">
            <p className="text-[#092754] text-lg">No clients available</p>
          </div>
        ) : (
          <div className="relative clients-slider-container">
            <Slider {...sliderSettings} className="py-6 clients-slider">
              {clients.map((client) => (
                <div key={client.id} className="px-3">
                  <div className="flex items-center justify-center h-28 md:h-32 lg:h-36">
                    {/* Size logos by a fixed height with auto width — the standard
                        logo-strip pattern. Avoids the width-collapse you get from a
                        stretchy w-full box, and makes every logo a consistent size. */}
                    <Image
                      src={client.logo || "/placeholder.png"}
                      alt={locale === "ar" ? client.name_ar : client.name_en}
                      width={260}
                      height={140}
                      className="w-auto h-16 md:h-20 lg:h-24 object-contain"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link href={`/${locale}/clients`}>
            <button className="border-2 border-[#092754] text-[#092754] px-8 py-3 rounded transition-colors duration-200 font-semibold text-lg hover:bg-white hover:text-[#092754]/60">
              {t("clients", "learn_more")}
            </button>
          </Link>
        </div>
      </div>
      <style>{`
        .clients-slider-container .slick-prev,
        .clients-slider-container .slick-next {
          color: #092754 !important; top: 50% !important;
          transform: translateY(-50%) !important; width: 40px !important;
          height: 40px !important; background: rgba(255,255,255,0.9) !important;
          border-radius: 50% !important; box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
          z-index: 10 !important;
        }
        .clients-slider-container .slick-prev:before,
        .clients-slider-container .slick-next:before {
          color: #092754 !important; font-size: 18px !important; font-weight: bold !important;
        }
        .clients-slider-container .slick-next { right: 20px !important; }
        .clients-slider-container .slick-prev { left: 20px !important; }
        [dir="rtl"] .clients-slider-container .slick-next { left: 20px !important; right: auto !important; }
        [dir="rtl"] .clients-slider-container .slick-prev { right: 20px !important; left: auto !important; }
      `}</style>
    </section>
  );
}
