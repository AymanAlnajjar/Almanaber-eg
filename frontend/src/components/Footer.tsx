"use client"
import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { useLanguage } from '@/context/LanguageContext';

const socialLinks = [
  { icon: FaFacebookF, href: 'https://www.facebook.com/almanabercairo', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/almnabr_ce/', label: 'Instagram' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/almanaberconsultingengineering/posts/?feedView=all', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:info@almnabr.eg', label: 'info@almnabr.eg' },
];

export default function Footer() {
  const { t, locale } = useLanguage();
  
  const navKeys = [
    { key: 'nav_about', href: '/about' },
    { key: 'nav_services', href: `/${locale}/services` },
    { key: 'nav_projects', href: `/${locale}/projects` },
    { key: 'nav_clients', href: `/${locale}/clients` },
    { key: 'nav_news', href: `/${locale}/news` },
    { key: 'nav_blogs', href: `/${locale}/blogs` },
    { key: 'nav_careers', href: '/careers' },
  ];

  return (
    <footer className="bg-[#0a2551] pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Logo */}
        <div className="mb-6 md:mb-0 flex-shrink-0">
          <Image src="/almnabr-logo.png" alt="Logo" width={80} height={80} className="w-20 h-auto" />
        </div>
        {/* Navigation */}
        <nav className="flex-1 flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
          {navKeys.map((item) => (
            <Link key={item.href} href={item.href} className="text-white hover:underline 2xl:text-lg 4k:text-2xl">
              {t('footer', item.key)}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 flex-wrap justify-center gap-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('https:') ? '_blank' : undefined}
              rel={href.startsWith('https:') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-lg text-white transition-colors hover:bg-white hover:text-[#0a2551] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <hr className="my-8 border-gray-300" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white text-sm">
        <div>{t('footer', 'copyright').replace('{year}', String(new Date().getFullYear()))}</div>
        <div className="flex gap-6 flex-wrap justify-center">
          <Link href={`/${locale}/privacy-policy`} className="underline">{t('footer', 'privacy_policy')}</Link>
          <Link href={`/${locale}/terms-of-service`} className="underline">{t('footer', 'terms_of_service')}</Link>
          <Link href={`/${locale}/cookies-settings`} className="underline">{t('footer', 'cookies_settings')}</Link>
        </div>
      </div>
    </footer>
  );
}
