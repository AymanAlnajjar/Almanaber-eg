"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { HiArrowLeft, HiUpload, HiX } from 'react-icons/hi';

interface JobDetails {
  id: number;
  titleKey: string;
  departmentKey: string;
  locationKey: string;
  typeKey: string;
}

const jobDetails: JobDetails[] = [
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

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentCompany: string;
  currentPosition: string;
  experience: string;
  education: string;
  coverLetter: string;
  resume: File | null;
  portfolio: File | null;
  linkedin: string;
  website: string;
  noticePeriod: string;
  availableStartDate: string;
  howDidYouHear: string;
  additionalInfo: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  currentCompany?: string;
  currentPosition?: string;
  experience?: string;
  education?: string;
  coverLetter?: string;
  resume?: string;
  portfolio?: string;
  linkedin?: string;
  website?: string;
  noticePeriod?: string;
  availableStartDate?: string;
  howDidYouHear?: string;
  additionalInfo?: string;
}

export default function ApplyPageClient() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const jobId = searchParams.get('jobId');
  const job = jobDetails.find(j => j.id === parseInt(jobId || '0'));
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentCompany: '',
    currentPosition: '',
    experience: '',
    education: '',
    coverLetter: '',
    resume: null,
    portfolio: null,
    linkedin: '',
    website: '',
    noticePeriod: '',
    availableStartDate: '',
    howDidYouHear: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: Exclude<keyof FormData, 'resume' | 'portfolio'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (field: 'resume' | 'portfolio', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = t('apply', 'first_name_required');
    if (!formData.lastName.trim()) newErrors.lastName = t('apply', 'last_name_required');
    if (!formData.email.trim()) {
      newErrors.email = t('apply', 'email_required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('apply', 'email_invalid');
    }
    if (!formData.phone.trim()) newErrors.phone = t('apply', 'phone_required');
    if (!formData.experience.trim()) newErrors.experience = t('apply', 'experience_required');
    if (!formData.education.trim()) newErrors.education = t('apply', 'education_required');
    if (!formData.coverLetter.trim()) newErrors.coverLetter = t('apply', 'cover_letter_required');
    if (!formData.resume) newErrors.resume = t('apply', 'resume_required');
    if (!formData.availableStartDate.trim()) newErrors.availableStartDate = t('apply', 'start_date_required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Application submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t('apply', 'job_not_found')}
            </h1>
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {t('apply', 'back_to_careers')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <h1 className="text-2xl font-bold mb-2">{t('apply', 'application_submitted')}</h1>
              <p>{t('apply', 'application_submitted_message')}</p>
            </div>
            <button
              onClick={() => router.push('/careers')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t('apply', 'back_to_careers')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            {t('apply', 'back_to_job')}
          </button>
        </div>

        {/* Job Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#0a2551] mb-2">
            {t('apply', 'apply_for_position')}: {t('careers', job.titleKey)}
          </h1>
          <p className="text-gray-600">
            {t('careers', job.departmentKey)} • {t('careers', job.locationKey)} • {t('careers', job.typeKey)}
          </p>
        </div>

        {/* Application Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-[#0a2551] mb-4">
                {t('apply', 'personal_information')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'first_name')} *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'last_name')} *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'email')} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'phone')} *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Current Employment */}
            <div>
              <h2 className="text-xl font-bold text-[#0a2551] mb-4">
                {t('apply', 'current_employment')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'current_company')}
                  </label>
                  <input
                    type="text"
                    value={formData.currentCompany}
                    onChange={(e) => handleInputChange('currentCompany', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'current_position')}
                  </label>
                  <input
                    type="text"
                    value={formData.currentPosition}
                    onChange={(e) => handleInputChange('currentPosition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Experience & Education */}
            <div>
              <h2 className="text-xl font-bold text-[#0a2551] mb-4">
                {t('apply', 'experience_education')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'years_of_experience')} *
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder={t('apply', 'experience_placeholder')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.experience ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'highest_education')} *
                  </label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    placeholder={t('apply', 'education_placeholder')}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.education ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.education && (
                    <p className="text-red-500 text-sm mt-1">{errors.education}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('apply', 'cover_letter')} *
              </label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                rows={6}
                placeholder={t('apply', 'cover_letter_placeholder')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.coverLetter ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.coverLetter && (
                <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>
              )}
            </div>

            {/* File Uploads */}
            <div>
              <h2 className="text-xl font-bold text-[#0a2551] mb-4">
                {t('apply', 'documents')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'resume_cv')} *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {formData.resume ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{formData.resume.name}</span>
                        <button
                          type="button"
                          onClick={() => handleFileChange('resume', null)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <HiX className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <HiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange('resume', e.target.files?.[0] || null)}
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                        >
                          {t('apply', 'upload_resume')}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                      </div>
                    )}
                  </div>
                  {errors.resume && (
                    <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'portfolio')} ({t('apply', 'optional')})
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {formData.portfolio ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{formData.portfolio.name}</span>
                        <button
                          type="button"
                          onClick={() => handleFileChange('portfolio', null)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <HiX className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <HiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <input
                          type="file"
                          accept=".pdf,.zip"
                          onChange={(e) => handleFileChange('portfolio', e.target.files?.[0] || null)}
                          className="hidden"
                          id="portfolio-upload"
                        />
                        <label
                          htmlFor="portfolio-upload"
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                        >
                          {t('apply', 'upload_portfolio')}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">PDF, ZIP (Max 10MB)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-xl font-bold text-[#0a2551] mb-4">
                {t('apply', 'additional_information')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn {t('apply', 'profile')}
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'personal_website')}
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'notice_period')}
                  </label>
                  <select
                    value={formData.noticePeriod}
                    onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{t('apply', 'select_notice_period')}</option>
                    <option value="immediate">{t('apply', 'immediate')}</option>
                    <option value="1_week">{t('apply', '1_week')}</option>
                    <option value="2_weeks">{t('apply', '2_weeks')}</option>
                    <option value="1_month">{t('apply', '1_month')}</option>
                    <option value="2_months">{t('apply', '2_months')}</option>
                    <option value="3_months">{t('apply', '3_months')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'available_start_date')} *
                  </label>
                  <input
                    type="date"
                    value={formData.availableStartDate}
                    onChange={(e) => handleInputChange('availableStartDate', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.availableStartDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.availableStartDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.availableStartDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('apply', 'how_did_you_hear')}
                  </label>
                  <select
                    value={formData.howDidYouHear}
                    onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{t('apply', 'select_source')}</option>
                    <option value="website">{t('apply', 'company_website')}</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="indeed">Indeed</option>
                    <option value="referral">{t('apply', 'employee_referral')}</option>
                    <option value="social_media">{t('apply', 'social_media')}</option>
                    <option value="other">{t('apply', 'other')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('apply', 'additional_comments')}
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                rows={4}
                placeholder={t('apply', 'additional_comments_placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('apply', 'submitting') : t('apply', 'submit_application')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
