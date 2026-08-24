"use client";

import Image from "next/image";
import Slider from "react-slick";
import { useLanguage } from "@/context/LanguageContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

interface PartnersProps {
  partners: Partner[];
}

export default function Partners({ partners }: PartnersProps) {
  const { t, locale } = useLanguage();

  // Nothing to show yet — hide the whole section rather than render an empty band.
  if (!partners || partners.length === 0) return null;

  // Same slider hardening as the Clients carousel: cap slidesToShow to the number
  // of logos and only loop/autoplay/show-arrows when there are more logos than fit,
  // so react-slick never clones a short list into broken, stacked duplicates.
  const count = partners.length;
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
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl 2xl:text-5xl 4k:text-6xl font-bold text-[#092754] mb-4">
          {t("partners", "title")}
        </h2>
        <p className="text-base md:text-lg 2xl:text-xl 4k:text-2xl text-[#092754] mb-10">
          {t("partners", "subtitle")}
        </p>

        <div className="relative partners-slider-container">
          <Slider {...sliderSettings} className="py-6 partners-slider">
            {partners.map((partner) => (
              <div key={partner.id} className="px-3">
                <div className="flex items-center justify-center h-28 md:h-32 lg:h-36">
                  <Image
                    src={partner.logo || "/placeholder.png"}
                    alt={locale === "ar" ? partner.name_ar : partner.name_en}
                    width={260}
                    height={140}
                    className="w-auto h-16 md:h-20 lg:h-24 object-contain"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <style>{`
        .partners-slider-container .slick-prev,
        .partners-slider-container .slick-next {
          color: #092754 !important; top: 50% !important;
          transform: translateY(-50%) !important; width: 40px !important;
          height: 40px !important; background: rgba(255,255,255,0.9) !important;
          border-radius: 50% !important; box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
          z-index: 10 !important;
        }
        .partners-slider-container .slick-prev:before,
        .partners-slider-container .slick-next:before {
          color: #092754 !important; font-size: 18px !important; font-weight: bold !important;
        }
        .partners-slider-container .slick-next { right: 20px !important; }
        .partners-slider-container .slick-prev { left: 20px !important; }
        [dir="rtl"] .partners-slider-container .slick-next { left: 20px !important; right: auto !important; }
        [dir="rtl"] .partners-slider-container .slick-prev { right: 20px !important; left: auto !important; }
      `}</style>
    </section>
  );
}
