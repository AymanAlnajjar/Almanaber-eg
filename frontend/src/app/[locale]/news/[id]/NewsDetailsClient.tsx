"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiUser, FiClock } from 'react-icons/fi';

interface News {
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

interface NewsDetailsClientProps {
  news: News;
  locale: string;
}

export default function NewsDetailsClient({ news, locale }: NewsDetailsClientProps) {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Combine main_image with gallery_images
  const allImages = [news.main_image, ...(news.gallery_images || [])];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center gap-2 text-[#1a2950] hover:text-blue-600 transition-colors mb-8"
        >
          <FiArrowLeft />
          {t('news_details', 'back_to_news')}
        </Link>
      </div>

      {/* Main News Image */}
      <section className="px-4 md:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={allImages[selectedImageIndex] || '/placeholder.svg'}
              alt={locale === 'ar' ? news.title_ar : news.title_en}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Thumbnail Images */}
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
                      ? 'ring-4 ring-[#1a2950] shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                >
                  <Image
                    src={image || '/placeholder.svg'}
                    alt={`${locale === 'ar' ? news.title_ar : news.title_en} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News Content Section */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className={`lg:col-span-2 ${locale === 'ar' ? 'lg:order-2' : 'lg:order-1'}`}>
              {/* News Header */}
              <div className="mb-8">
                <div className="mb-4">
                  <span className="bg-[#1a2950] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t('news_page', news.category)}
                  </span>
                </div>

                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2950] mb-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' ? news.title_ar : news.title_en}
                </h1>

                <p className={`text-xl text-gray-600 mb-6 leading-relaxed ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {locale === 'ar' ? news.description_ar : news.description_en}
                </p>

                {/* Meta Information */}
                <div className={`flex items-center text-gray-500 mb-8 ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    <span>{formatDate(news.publish_date)}</span>
                  </div>
                  <span className="mx-3">•</span>
                  <div className="flex items-center">
                    <FiUser className="mr-2" />
                    <span>{news.author}</span>
                  </div>
                  <span className="mx-3">•</span>
                  <div className="flex items-center">
                    <FiClock className="mr-2" />
                    <span>{news.read_time} min read</span>
                  </div>
                </div>
              </div>

              {/* News Content */}
              <div className={`prose prose-lg max-w-none ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <div
                  className="text-gray-700 leading-relaxed text-lg space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: locale === 'ar' ? news.content_ar : news.content_en
                  }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className={`${locale === 'ar' ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 sticky top-24">
                <h3 className={`font-bold text-[#1a2950] mb-6 text-xl ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {t('news_details', 'article_info')}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className={`font-semibold text-[#1a2950] mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {t('news_details', 'category')}:
                    </h4>
                    <p className={`text-gray-700 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {t('news_page', news.category)}
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-semibold text-[#1a2950] mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {t('news_details', 'published_date')}:
                    </h4>
                    <p className={`text-gray-700 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {formatDate(news.publish_date)}
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-semibold text-[#1a2950] mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {t('news_details', 'author')}:
                    </h4>
                    <p className={`text-gray-700 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {news.author}
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-semibold text-[#1a2950] mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {t('news_details', 'read_time')}:
                    </h4>
                    <p className={`text-gray-700 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {news.read_time} min read
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
