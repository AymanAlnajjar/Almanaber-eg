"use client";

import { useLanguage } from "@/context/LanguageContext";
import { apiClient } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FiSend } from "react-icons/fi";

interface ContactFormProps {
  /**
   * Where the form was submitted from. Examples:
   *  - "contact-page" (default)
   *  - "service:Architectural Design"
   *  - "project:Villa X"
   * Stored alongside the submission in the backend for lead attribution & SEO.
   */
  source?: string;
  /**
   * Override the default subject input.
   * If provided, the subject field is hidden and this value is sent instead.
   */
  lockedSubject?: string;
  /** Extra class names for the outer container. */
  className?: string;
  /** Visual variant. "card" wraps in a white rounded box; "plain" is transparent. */
  variant?: "card" | "plain";
  /** Where to redirect on success. Defaults to "/thank-you". */
  successRedirect?: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  // Honeypot — must stay empty
  website: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

export default function ContactForm({
  source = "contact-page",
  lockedSubject,
  className = "",
  variant = "card",
  successRedirect = "/thank-you",
}: ContactFormProps) {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const isRTL = locale === "ar";

  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [genericError, setGenericError] = useState<string | null>(null);

  const updateField = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = t("contact_form", "name_required");
    if (!form.email.trim()) {
      next.email = t("contact_form", "email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t("contact_form", "email_invalid");
    }
    if (!form.message.trim()) next.message = t("contact_form", "message_required");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGenericError(null);
    if (!validate()) return;

    setSubmitting(true);
    const response = await apiClient.submitContact({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      subject: lockedSubject || form.subject.trim() || undefined,
      message: form.message.trim(),
      source,
      locale,
      website: form.website,
    });
    setSubmitting(false);

    if (response.validationErrors) {
      const flattened: Record<string, string> = {};
      for (const [field, msgs] of Object.entries(response.validationErrors)) {
        flattened[field] = Array.isArray(msgs) ? msgs[0] : String(msgs);
      }
      setErrors(flattened);
      return;
    }
    if (response.error) {
      setGenericError(response.error);
      return;
    }

    // Success — redirect to the thank-you page.
    router.push(successRedirect);
  };

  const wrapperClass =
    variant === "card"
      ? `bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 ${className}`
      : className;

  const labelCls = "block text-sm font-medium text-[#1a2950] mb-1";
  const inputCls =
    "w-full px-4 py-3 border border-gray-300 rounded-lg text-[#1a2950] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a2950] focus:border-transparent transition-colors";
  const errorCls = "mt-1 text-xs text-red-600";

  return (
    <form
      onSubmit={handleSubmit}
      className={wrapperClass}
      dir={isRTL ? "rtl" : "ltr"}
      noValidate
    >
      {/* Honeypot — hidden from humans, tempting to bots */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={updateField("website")}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div>
          <label htmlFor="contact-name" className={labelCls}>
            {t("contact_form", "name")} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={updateField("name")}
            className={inputCls}
            placeholder={t("contact_form", "name_placeholder")}
            autoComplete="name"
          />
          {errors.name && <p className={errorCls}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelCls}>
            {t("contact_form", "email")} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={updateField("email")}
            className={inputCls}
            placeholder={t("contact_form", "email_placeholder")}
            autoComplete="email"
          />
          {errors.email && <p className={errorCls}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelCls}>
            {t("contact_form", "phone")}
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={updateField("phone")}
            className={inputCls}
            placeholder={t("contact_form", "phone_placeholder")}
            autoComplete="tel"
          />
          {errors.phone && <p className={errorCls}>{errors.phone}</p>}
        </div>

        {!lockedSubject && (
          <div>
            <label htmlFor="contact-subject" className={labelCls}>
              {t("contact_form", "subject")}
            </label>
            <input
              id="contact-subject"
              type="text"
              value={form.subject}
              onChange={updateField("subject")}
              className={inputCls}
              placeholder={t("contact_form", "subject_placeholder")}
            />
            {errors.subject && <p className={errorCls}>{errors.subject}</p>}
          </div>
        )}
      </div>

      <div className="mt-4 md:mt-5">
        <label htmlFor="contact-message" className={labelCls}>
          {t("contact_form", "message")} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={updateField("message")}
          className={inputCls}
          placeholder={t("contact_form", "message_placeholder")}
        />
        {errors.message && <p className={errorCls}>{errors.message}</p>}
      </div>

      {genericError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {genericError}
        </div>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 bg-[#092754] hover:bg-[#0b3570] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-colors w-full md:w-auto"
        >
          <FiSend />
          {submitting ? t("contact_form", "submitting") : t("contact_form", "submit")}
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        {t("contact_form", "privacy_note")}
      </p>
    </form>
  );
}
