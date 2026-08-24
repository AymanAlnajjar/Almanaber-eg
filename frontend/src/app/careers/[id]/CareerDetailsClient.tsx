"use client";

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiArrowLeft, HiLocationMarker, HiBriefcase, HiClock, HiAcademicCap } from 'react-icons/hi';

interface JobDetails {
  id: number;
  titleKey: string;
  departmentKey: string;
  locationKey: string;
  typeKey: string;
  descriptionKey: string;
  requirementsKey: string;
  responsibilitiesKey: string;
  benefitsKey: string;
  experienceLevel: string;
  educationLevel: string;
}

const jobDetails: JobDetails[] = [
  {
    id: 1,
    titleKey: "principal_mechanical_engineer",
    departmentKey: "building_design_engineering",
    locationKey: "riyadh_saudi_arabia",
    typeKey: "full_time",
    descriptionKey: "principal_mechanical_engineer_description",
    requirementsKey: "principal_mechanical_engineer_requirements",
    responsibilitiesKey: "principal_mechanical_engineer_responsibilities",
    benefitsKey: "principal_mechanical_engineer_benefits",
    experienceLevel: "8-12 years",
    educationLevel: "Bachelor's in Mechanical Engineering",
  },
  {
    id: 2,
    titleKey: "senior_project_manager",
    departmentKey: "corporate",
    locationKey: "mecca_saudi_arabia",
    typeKey: "full_time",
    descriptionKey: "senior_project_manager_description",
    requirementsKey: "senior_project_manager_requirements",
    responsibilitiesKey: "senior_project_manager_responsibilities",
    benefitsKey: "senior_project_manager_benefits",
    experienceLevel: "10-15 years",
    educationLevel: "Bachelor's in Engineering or Business",
  },
  {
    id: 3,
    titleKey: "principal_architect",
    departmentKey: "architecture_building_design",
    locationKey: "egypt",
    typeKey: "full_time",
    descriptionKey: "principal_architect_description",
    requirementsKey: "principal_architect_requirements",
    responsibilitiesKey: "principal_architect_responsibilities",
    benefitsKey: "principal_architect_benefits",
    experienceLevel: "12-18 years",
    educationLevel: "Bachelor's in Architecture",
  },
  {
    id: 4,
    titleKey: "fire_safety_consultant",
    departmentKey: "fire_life_safety",
    locationKey: "jeddah_saudi_arabia",
    typeKey: "contract",
    descriptionKey: "fire_safety_consultant_description",
    requirementsKey: "fire_safety_consultant_requirements",
    responsibilitiesKey: "fire_safety_consultant_responsibilities",
    benefitsKey: "fire_safety_consultant_benefits",
    experienceLevel: "5-8 years",
    educationLevel: "Bachelor's in Fire Safety or Engineering",
  },
  {
    id: 5,
    titleKey: "infrastructure_engineer",
    departmentKey: "infrastructure_services",
    locationKey: "dammam_saudi_arabia",
    typeKey: "full_time",
    descriptionKey: "infrastructure_engineer_description",
    requirementsKey: "infrastructure_engineer_requirements",
    responsibilitiesKey: "infrastructure_engineer_responsibilities",
    benefitsKey: "infrastructure_engineer_benefits",
    experienceLevel: "6-10 years",
    educationLevel: "Bachelor's in Civil Engineering",
  },
  {
    id: 6,
    titleKey: "interior_design_specialist",
    departmentKey: "architecture_building_design",
    locationKey: "riyadh_saudi_arabia",
    typeKey: "part_time",
    descriptionKey: "interior_design_specialist_description",
    requirementsKey: "interior_design_specialist_requirements",
    responsibilitiesKey: "interior_design_specialist_responsibilities",
    benefitsKey: "interior_design_specialist_benefits",
    experienceLevel: "4-7 years",
    educationLevel: "Bachelor's in Interior Design",
  }
];

export default function CareerDetailsClient({ jobId }: { jobId: string }) {
  const { t } = useLanguage();
  const router = useRouter();
  
  const job = jobDetails.find(j => j.id === parseInt(jobId));
  
  if (!job) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t('career_details', 'job_not_found')}
            </h1>
            <Link 
              href="/careers"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {t('career_details', 'back_to_careers')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    router.push(`/careers/apply?jobId=${job.id}`);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            {t('career_details', 'back_to_careers')}
          </button>
        </div>

        {/* Job Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#0a2551] mb-4">
                {t('careers', job.titleKey)}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {t('career_details', job.descriptionKey)}
              </p>
              
              {/* Job Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center text-gray-600">
                  <HiLocationMarker className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{t('careers', job.locationKey)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HiBriefcase className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{t('careers', job.departmentKey)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HiClock className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{t('careers', job.typeKey)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HiAcademicCap className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{job.experienceLevel}</span>
                </div>
              </div>
            </div>
            
            {/* Apply Button */}
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <button
                onClick={handleApply}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full lg:w-auto"
              >
                {t('career_details', 'apply_now')}
              </button>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#0a2551] mb-4">
                {t('career_details', 'job_description')}
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{t('career_details', job.descriptionKey)}</p>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#0a2551] mb-4">
                {t('career_details', 'responsibilities')}
              </h2>
              <div className="prose max-w-none text-gray-700">
                <div className="whitespace-pre-line">{t('career_details', job.responsibilitiesKey)}</div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#0a2551] mb-4">
                {t('career_details', 'requirements')}
              </h2>
              <div className="prose max-w-none text-gray-700">
                <div className="whitespace-pre-line">{t('career_details', job.requirementsKey)}</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#0a2551] mb-4">
                {t('career_details', 'job_summary')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('career_details', 'experience')}:</span>
                  <span className="font-medium">{job.experienceLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('career_details', 'education')}:</span>
                  <span className="font-medium">{job.educationLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('career_details', 'location')}:</span>
                  <span className="font-medium">{t('careers', job.locationKey)}</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#0a2551] mb-4">
                {t('career_details', 'benefits')}
              </h3>
              <div className="prose max-w-none text-gray-700">
                <div className="whitespace-pre-line">{t('career_details', job.benefitsKey)}</div>
              </div>
            </div>

            {/* Apply Button (Mobile) */}
            <div className="lg:hidden">
              <button
                onClick={handleApply}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
              >
                {t('career_details', 'apply_now')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
