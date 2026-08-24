"use client";
import { useLanguage } from "@/context/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlLocationPin } from "react-icons/sl";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface HeroSlide {
  id: number;
  title_en: string;
  title_ar: string;
  area_en: string;
  area_ar: string;
  image: string;
  sort_order: number;
}

interface HeroProps {
  slides: HeroSlide[];
}

export default function Hero({ slides }: HeroProps) {
  const { locale } = useLanguage();

  if (slides.length === 0) {
    return (
      <div className="w-full h-[90vh] md:h-[100vh] relative overflow-hidden bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600 text-xl">No slides available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[90vh] md:h-[100vh] relative overflow-hidden">
      <Swiper
        key={locale}
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={slides.length > 1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        dir="ltr"
        style={{ direction: "ltr", height: "100%" }}
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[90vh] md:h-[100vh]">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={locale === "ar" ? slide.title_ar : slide.title_en}
                fill
                className="object-cover"
                priority={idx === 0}
                style={{ objectPosition: "center" }}
              />
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-transparent"
                style={{ opacity: 0.7 }}
              />
              <div
                className={`flex flex-row absolute bottom-8 ${
                  locale === "ar" ? "right-8" : "left-8"
                } px-6 py-3 max-w-xs rounded-lg`}
              >
                {locale === "ar" ? (
                  <>
                    <div
                      className="text-right text-white text-lg mr-2"
                      style={{ direction: "rtl" }}
                    >
                      <p>{slide.title_ar}</p>
                      <p>{slide.area_ar}</p>
                    </div>
                    <SlLocationPin className="text-white text-2xl" />
                  </>
                ) : (
                  <>
                    <SlLocationPin className="text-white text-2xl mr-2" />
                    <div
                      className="text-left text-white text-lg"
                      style={{ direction: "ltr" }}
                    >
                      <p>{slide.title_en}</p>
                      <p>{slide.area_en}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .swiper-pagination { bottom: 16px !important; }
        .swiper-pagination-bullets { display: flex; justify-content: center; width: 100%; }
        .swiper-button-next, .swiper-button-prev {
          color: #fff !important; width: 48px; height: 48px;
          top: 50%; transform: translateY(-50%); border-radius: 50%; z-index: 10;
        }
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 24px; font-weight: bold; }
        .swiper-container { direction: ltr !important; }
        .swiper-wrapper { direction: ltr !important; }
        .swiper-slide img {
          -webkit-backface-visibility: hidden; backface-visibility: hidden;
          -webkit-transform: translateZ(0); transform: translateZ(0);
        }
        @media (max-width: 767px) {
          .swiper-button-next, .swiper-button-prev { display: none !important; }
        }
      `}</style>
    </div>
  );
}
