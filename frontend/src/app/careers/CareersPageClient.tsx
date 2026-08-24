"use client";

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { useState } from 'react';
import { HiChevronDown, HiSearch } from 'react-icons/hi';

interface Job {
  id: number;
  titleKey: string;
  departmentKey: string;
  locationKey: string;
  typeKey: string;
}

const jobs: Job[] = [
  {
    id: 1,
    titleKey: "principal_mechanical_engineer",
    departmentKey: "building_design_engineering",
    locationKey: "riyadh_saudi_arabia",
    typeKey: "full_time"
  },
  {
    id: 2,
    titleKey: "senior_project_manager",
    departmentKey: "corporate",
    locationKey: "mecca_saudi_arabia",
    typeKey: "full_time"
  },
  {
    id: 3,
    titleKey: "principal_architect",
    departmentKey: "architecture_building_design",
    locationKey: "egypt",
    typeKey: "full_time"
  },
  {
    id: 4,
    titleKey: "fire_safety_consultant",
    departmentKey: "fire_life_safety",
    locationKey: "jeddah_saudi_arabia",
    typeKey: "contract"
  },
  {
    id: 5,
    titleKey: "infrastructure_engineer",
    departmentKey: "infrastructure_services",
    locationKey: "dammam_saudi_arabia",
    typeKey: "full_time"
  },
  {
    id: 6,
    titleKey: "interior_design_specialist",
    departmentKey: "architecture_building_design",
    locationKey: "riyadh_saudi_arabia",
    typeKey: "part_time"
  }
];

export default function CareersPageClient() {
  const { t, locale } = useLanguage();
  const isRTL = locale === 'ar';
  
  const [selectedDepartment, setSelectedDepartment] = useState("all_departments");
  const [selectedJobType, setSelectedJobType] = useState("all_job_types");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);

  const departments = [
    { key: "all_departments", label: t('careers_filters', 'all_departments') },
    { key: "building_design_engineering", label: t('careers', 'building_design_engineering') },
    { key: "corporate", label: t('careers', 'corporate') },
    { key: "architecture_building_design", label: t('careers', 'architecture_building_design') },
    { key: "fire_life_safety", label: t('careers', 'fire_life_safety') },
    { key: "infrastructure_services", label: t('careers', 'infrastructure_services') }
  ];

  const jobTypes = [
    { key: "all_job_types", label: t('careers_filters', 'all_job_types') },
    { key: "full_time", label: t('careers', 'full_time') },
    { key: "part_time", label: t('careers', 'part_time') },
    { key: "contract", label: t('careers', 'contract') },
    { key: "internship", label: t('careers', 'internship') }
  ];

  const locations = [
    { key: "egypt", label: t('careers_filters', 'egypt'), color: "bg-red-500" },
    { key: "saudi", label: t('careers_filters', 'saudi'), color: "bg-green-500" }
  ];

  const handleLocationToggle = (locationKey: string) => {
    setSelectedLocations(prev => 
      prev.includes(locationKey) 
        ? prev.filter(loc => loc !== locationKey)
        : [...prev, locationKey]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const departmentMatch = selectedDepartment === "all_departments" || job.departmentKey === selectedDepartment;
    const typeMatch = selectedJobType === "all_job_types" || job.typeKey === selectedJobType;
    
    // Location filtering - check if job location matches any selected location
    const locationMatch = selectedLocations.length === 0 || 
      selectedLocations.some(loc => {
        if (loc === "egypt") return job.locationKey === "egypt";
        if (loc === "saudi") return job.locationKey.includes("saudi_arabia");
        return false;
      });
    
    // Search filtering - search in title, department, and location
    const searchMatch = searchQuery === "" || 
      t('careers', job.titleKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t('careers', job.departmentKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t('careers', job.locationKey).toLowerCase().includes(searchQuery.toLowerCase());
    
    return departmentMatch && typeMatch && locationMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a2551] mb-4">
            {t('careers', 'title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('careers', 'subtitle')}
          </p>
        </div>

        {/* Information Note */}
        <div className="mb-8">
          <div className="bg-[#FDF4EB] border border-[#FDF4EB] rounded-lg p-4 flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full border-2 border-[#D97706] flex items-center justify-center">
                <span className="text-[#D97706] text-sm font-bold">i</span>
              </div>
            </div>
            <p className="text-[#D97706] text-sm">
              {t('careers_filters', 'note_text')}{' '}
              <Link 
                href="/careers/apply" 
                className="text-[#2563EB] underline hover:text-[#1D4ED8] transition-colors"
              >
                {t('careers_filters', 'apply_here')}
              </Link>
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-12">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('careers_filters', 'filter_by_location')}
              </label>
              <div className="flex gap-6">
                {locations.map((location) => (
                  <label key={location.key} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(location.key)}
                      onChange={() => handleLocationToggle(location.key)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className={`w-3 h-3 rounded-full ${location.color} ml-2 mr-2`}></div>
                    <span className="text-gray-700">{location.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <div>
              <div className="relative">
                <div className={`absolute inset-y-0 flex items-center pointer-events-none ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'}`}>
                  <HiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={t('careers_filters', 'search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`block w-full py-3 border border-gray-300 rounded-md bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'pl-3 pr-10' : 'pl-10 pr-3'}`}
                />
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsDepartmentOpen(!isDepartmentOpen);
                  setIsJobTypeOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="text-gray-700">{departments.find(d => d.key === selectedDepartment)?.label}</span>
                <HiChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDepartmentOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDepartmentOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {departments.map((dept) => (
                    <button
                      key={dept.key}
                      onClick={() => {
                        setSelectedDepartment(dept.key);
                        setIsDepartmentOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      {dept.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Job Type Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsJobTypeOpen(!isJobTypeOpen);
                  setIsDepartmentOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="text-gray-700">{jobTypes.find(t => t.key === selectedJobType)?.label}</span>
                <HiChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isJobTypeOpen ? 'rotate-180' : ''}`} />
              </button>
              {isJobTypeOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {jobTypes.map((type) => (
                    <button
                      key={type.key}
                      onClick={() => {
                        setSelectedJobType(type.key);
                        setIsJobTypeOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div key={job.id}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#0a2551] mb-2">
                        {t('careers', job.titleKey)}
                      </h3>
                      <p className="text-gray-600 mb-1">
                        {t('careers', job.departmentKey)}
                      </p>
                      <p className="text-gray-600">
                        {t('careers', job.locationKey)}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Link 
                        href={`/careers/${job.id}`}
                        className="text-[#0a2551] font-medium hover:underline flex items-center"
                      >
                        {t('careers', 'learn_more')} &gt;
                      </Link>
                    </div>
                  </div>
                </div>
                {index < filteredJobs.length - 1 && (
                  <hr className="border-gray-200 my-6" />
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {t('careers', 'no_jobs_found')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
