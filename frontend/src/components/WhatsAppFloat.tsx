"use client";

import { useLanguage } from "@/context/LanguageContext";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Floating WhatsApp call-to-action.
 *
 * Always visible on the left side of the viewport, regardless of scroll or
 * page. The number and default message are read from env at build time:
 *   - NEXT_PUBLIC_WHATSAPP_NUMBER  (digits only, including country code; no '+')
 *   - NEXT_PUBLIC_WHATSAPP_MESSAGE (optional default prefilled message)
 *
 * If NEXT_PUBLIC_WHATSAPP_NUMBER is not set we fall back to a placeholder —
 * the button still renders so the deployment is obvious during QA.
 */
export default function WhatsAppFloat() {
  const { t, locale } = useLanguage();

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966000000000";
  // wa.me expects a digits-only number, no '+' or spaces.
  const number = rawNumber.replace(/[^0-9]/g, "");

  const defaultMessage =
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    (locale === "ar"
      ? "مرحباً، أود الاستفسار عن خدماتكم."
      : "Hello, I'd like to enquire about your services.");

  const href = `https://wa.me/${number}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp", "aria_label")}
      className="whatsapp-float group"
    >
      <FaWhatsapp className="whatsapp-float-icon" />
      <span className="whatsapp-float-label">
        {t("whatsapp", "label")}
      </span>

      <style jsx>{`
        .whatsapp-float {
          position: fixed;
          left: 20px;
          bottom: 24px;
          z-index: 60;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #25d366;
          color: #ffffff;
          padding: 14px 16px;
          border-radius: 9999px;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.35),
            0 4px 10px rgba(0, 0, 0, 0.15);
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease,
            padding 0.25s ease;
          animation: wa-bob 2.8s ease-in-out infinite;
        }

        .whatsapp-float:hover {
          transform: translateY(-2px) scale(1.04);
          background: #1ebe5a;
          box-shadow: 0 14px 30px rgba(37, 211, 102, 0.5),
            0 6px 14px rgba(0, 0, 0, 0.2);
          animation-play-state: paused;
        }

        .whatsapp-float-icon {
          font-size: 28px;
        }

        .whatsapp-float-label {
          white-space: nowrap;
        }

        @keyframes wa-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        /* On small screens, collapse to a circular icon-only button to save space */
        @media (max-width: 640px) {
          .whatsapp-float {
            padding: 14px;
            left: 16px;
            bottom: 16px;
          }
          .whatsapp-float-label {
            display: none;
          }
        }
      `}</style>
    </a>
  );
}
