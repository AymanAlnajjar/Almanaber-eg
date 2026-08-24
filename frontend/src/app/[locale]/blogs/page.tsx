"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import {
  FiChevronDown,
  FiCalendar,
  FiUser,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

interface BlogItem {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  category: string;
  author: string;
  read_time: number;
  publish_date: string;
  main_image: string;
}

// Blog categories — mirror the backend enum in BlogResource.php
const blogCategories = [
  { value: "all", label: "all_blogs" },
  { value: "company_news", label: "company_news" },
  { value: "tips_and_guides", label: "tips_and_guides" },
  { value: "industry_trends", label: "industry_trends" },
  { value: "case_studies", label: "case_studies" },
  { value: "announcements", label: "announcements" },
];

export default function BlogsPage() {
  const { t, locale } = useLanguage();
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const url =
          selectedCategory === "all"
            ? `${process.env.NEXT_PUBLIC_API_URL}/blogs`
            : `${process.env.NEXT_PUBLIC_API_URL}/blogs?category=${selectedCategory}`;
        const response = await fetch(url);
        const data = await response.json();
        setBlogItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [selectedCategory]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {/* Header */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-bold text-[#1a2950] mb-6">
            {t("blogs_page", "title")}
          </h1>
          <p className="text-lg md:text-xl 2xl:text-2xl text-[#1a2950] mb-12 max-w-4xl mx-auto">
            {t("blogs_page", "subtitle")}
          </p>

          {/* Category Filter */}
          <div className="flex justify-center items-center mb-12">
            <div className="relative w-full md:w-64" ref={categoryDropdownRef}>
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between text-left hover:border-gray-400 transition-colors"
              >
                <span className="text-gray-700">
                  {selectedCategory === "all"
                    ? t("blogs_page", "select_category")
                    : t(
                        "blogs_page",
                        blogCategories.find((c) => c.value === selectedCategory)?.label || ""
                      )}
                </span>
                <FiChevronDown
                  className={`text-gray-500 transition-transform ${
                    showCategoryDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {blogCategories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {t("blogs_page", category.label)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                {t("blogs_page", "loading")}
              </p>
            </div>
          ) : blogItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 4k:grid-cols-3 gap-8">
              {blogItems.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/${locale}/blogs/${blog.id}`}
                  className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg block"
                >
                  <div className="relative h-48 md:h-56 lg:h-64 2xl:h-72 4k:h-80">
                    <Image
                      src={blog.main_image || "/placeholder.svg"}
                      alt={locale === "ar" ? blog.title_ar : blog.title_en}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#1a2950] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {t("blogs_page", blog.category)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div
                      className={`flex items-center text-sm text-gray-500 mb-3 ${
                        locale === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" />
                        <span>{formatDate(blog.publish_date)}</span>
                      </div>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <FiUser className="mr-1" />
                        <span>{blog.author}</span>
                      </div>
                      <span className="mx-2">•</span>
                      <span>
                        {blog.read_time} {t("blogs_page", "min_read")}
                      </span>
                    </div>

                    <h3
                      className={`text-xl font-bold text-[#1a2950] mb-3 line-clamp-2 ${
                        locale === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {locale === "ar" ? blog.title_ar : blog.title_en}
                    </h3>

                    <p
                      className={`text-gray-600 mb-4 line-clamp-3 ${
                        locale === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {locale === "ar" ? blog.description_ar : blog.description_en}
                    </p>

                    <div className="inline-flex items-center text-[#1a2950] font-semibold hover:text-[#2d4a7c] transition-colors">
                      {t("blogs_page", "read_more")}
                      {locale === "ar" ? (
                        <FiChevronLeft className="inline-block text-lg transition-transform duration-300" />
                      ) : (
                        <FiChevronRight className="inline-block text-lg transition-transform duration-300" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                {t("blogs_page", "no_blogs_found")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
