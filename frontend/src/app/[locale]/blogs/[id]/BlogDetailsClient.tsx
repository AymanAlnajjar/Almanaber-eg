"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiUser, FiClock } from "react-icons/fi";
import ContactForm from "@/components/ContactForm";

interface Blog {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  content_en: string;
  content_ar: string;
  publish_date: string;
  author: string;
  category: string;
  read_time: number;
  main_image: string;
  gallery_images: string[];
}

interface Props {
  blog: Blog;
  locale: string;
}

export default function BlogDetailsClient({ blog, locale }: Props) {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const allImages = [blog.main_image, ...(blog.gallery_images || [])].filter(Boolean);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <Link
          href={`/${locale}/blogs`}
          className="inline-flex items-center gap-2 text-[#1a2950] hover:text-blue-600 transition-colors mb-8"
        >
          <FiArrowLeft />
          {t("blog_details", "back_to_blogs")}
        </Link>
      </div>

      {/* Main image */}
      <section className="px-4 md:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={allImages[selectedImageIndex] || "/placeholder.svg"}
              alt={locale === "ar" ? blog.title_ar : blog.title_en}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Gallery thumbs */}
      {allImages.length > 1 && (
        <section className="px-4 md:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative flex-shrink-0 w-48 h-32 md:w-64 md:h-40 rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedImageIndex === index
                      ? "ring-4 ring-[#1a2950] shadow-lg"
                      : "hover:shadow-md"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${locale === "ar" ? blog.title_ar : blog.title_en} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="px-4 md:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className={`lg:col-span-2 ${locale === "ar" ? "lg:order-2" : "lg:order-1"}`}>
              <div className="mb-8">
                <div className="mb-4">
                  <span className="bg-[#1a2950] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t("blogs_page", blog.category)}
                  </span>
                </div>

                <h1
                  className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2950] mb-6 ${
                    locale === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {locale === "ar" ? blog.title_ar : blog.title_en}
                </h1>

                <p
                  className={`text-xl text-gray-600 mb-6 leading-relaxed ${
                    locale === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {locale === "ar" ? blog.description_ar : blog.description_en}
                </p>

                <div
                  className={`flex items-center text-gray-500 mb-8 ${
                    locale === "ar" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    <span>{formatDate(blog.publish_date)}</span>
                  </div>
                  <span className="mx-3">•</span>
                  <div className="flex items-center">
                    <FiUser className="mr-2" />
                    <span>{blog.author}</span>
                  </div>
                  <span className="mx-3">•</span>
                  <div className="flex items-center">
                    <FiClock className="mr-2" />
                    <span>
                      {blog.read_time} {t("blogs_page", "min_read")}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`prose prose-lg max-w-none ${locale === "ar" ? "text-right" : "text-left"}`}>
                <div
                  className="text-gray-700 leading-relaxed text-lg space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: locale === "ar" ? blog.content_ar : blog.content_en,
                  }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className={`${locale === "ar" ? "lg:order-1" : "lg:order-2"}`}>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 sticky top-24">
                <h3
                  className={`font-bold text-[#1a2950] mb-6 text-xl ${
                    locale === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("blog_details", "article_info")}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className={`font-semibold text-[#1a2950] mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {t("blog_details", "category")}:
                    </h4>
                    <p className={`text-gray-700 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {t("blogs_page", blog.category)}
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-semibold text-[#1a2950] mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {t("blog_details", "published_date")}:
                    </h4>
                    <p className={`text-gray-700 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {formatDate(blog.publish_date)}
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-semibold text-[#1a2950] mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {t("blog_details", "author")}:
                    </h4>
                    <p className={`text-gray-700 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {blog.author}
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-semibold text-[#1a2950] mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {t("blog_details", "read_time")}:
                    </h4>
                    <p className={`text-gray-700 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {blog.read_time} {t("blogs_page", "min_read")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead-capture contact form at the bottom of every blog — SEO-driven */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#092754] mb-3">
              {t("contact_form", "have_question_title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("contact_form", "have_question_subtitle")}
            </p>
          </div>
          <ContactForm
            source={`blog:${blog.title_en}`}
            lockedSubject={`Blog enquiry: ${blog.title_en}`}
          />
        </div>
      </section>
    </div>
  );
}
