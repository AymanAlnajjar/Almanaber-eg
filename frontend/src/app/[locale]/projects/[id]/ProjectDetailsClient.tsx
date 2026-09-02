"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import ContactForm from '@/components/ContactForm';

interface Project {
  id: number;
  name_en: string;
  name_ar: string;
  area_en: string;
  area_ar: string;
  location_en: string;
  location_ar: string;
  project_area_en: string;
  project_area_ar: string;
  mission_en: string;
  mission_ar: string;
  components_en: string;
  components_ar: string;
  client_en: string;
  client_ar: string;
  types?: string[];
  services?: string[];
  main_image: string;
  gallery_images: string[];
}

interface ProjectDetailsClientProps {
  project: Project;
  locale: string;
}

export default function ProjectDetailsClient({ project, locale }: ProjectDetailsClientProps) {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Combine main image with gallery images
  const allImages = [project.main_image, ...(project.gallery_images || [])];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 text-[#1a2950] hover:text-blue-600 transition-colors mb-4"
        >
          <FiArrowLeft />
          {t('project_details', 'back_to_projects')}
        </Link>
        {/* Single H1 = the project name (SEO audit §3.4). */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a2950] mt-2">
          {locale === 'ar' ? project.name_ar : project.name_en}
        </h1>
      </div>

      {/* Main Project Image */}
      <section className="px-4 md:px-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-[280px] md:h-[380px] lg:h-[440px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={allImages[selectedImageIndex] || '/placeholder.svg'}
              alt={locale === 'ar' ? project.name_ar : project.name_en}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Thumbnail Images */}
      <section className="px-4 md:px-8 mb-10">
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
                  src={image}
                  alt={`${locale === 'ar' ? project.name_ar : project.name_en} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Details — order-1: left in English (LTR), right in Arabic (RTL) */}
            <div className="lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2950] mb-8">
                {t('project_details', 'project_details')}
              </h2>

              <div className="space-y-6 text-lg">
                <div>
                  <h3 className="font-bold text-[#1a2950] mb-2">
                    {t('project_details', 'project_name')}: {locale === 'ar' ? project.name_ar : project.name_en}
                  </h3>
                </div>

                <div>
                  <h3 className="font-bold text-[#1a2950] mb-2">
                    {t('project_details', 'client')}:
                  </h3>
                  <p className="text-gray-700">
                    {locale === 'ar' ? project.client_ar : project.client_en}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#1a2950] mb-2">
                    {t('project_details', 'project_area')}:
                  </h3>
                  <p className="text-gray-700">
                    {locale === 'ar' ? project.project_area_ar : project.project_area_en}
                  </p>
                </div>
              </div>
            </div>

            {/* Project Data Box — order-2: right in English (LTR), left in Arabic (RTL) */}
            <div className="lg:order-2">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#1a2950] mb-2">
                      {t('project_details', 'location')}:
                    </h3>
                    <p className="text-gray-700">
                      {locale === 'ar' ? project.location_ar : project.location_en}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#1a2950] mb-2">
                      {t('project_details', 'our_mission')}:
                    </h3>
                    <p className="text-gray-700">
                      {locale === 'ar' ? project.mission_ar : project.mission_en}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead-capture contact form — SEO/lead-gen per marketing */}
      <section className="px-4 md:px-8 pb-20 bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#092754] mb-3">
              {t('contact_form', 'project_enquiry_title')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('contact_form', 'project_enquiry_subtitle')}
            </p>
          </div>
          <ContactForm
            source={`project:${project.name_en}`}
            lockedSubject={`Project enquiry: ${project.name_en}`}
          />
        </div>
      </section>
    </div>
  );
}
