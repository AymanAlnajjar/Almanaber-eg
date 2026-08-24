"use client"
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import { useLanguage } from '@/context/LanguageContext';

const socialLinks = [
  { icon: <FaFacebookF />, href: '#' },
  { icon: <FaInstagram />, href: '#' },
  { icon: <FaXTwitter />, href: '#' },
  { icon: <FaLinkedinIn />, href: '#' },
  { icon: <FaYoutube />, href: '#' },
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
        {/* Social Icons */}
        <div className="flex gap-4">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-white 2xl:text-lg 4k:text-2xl hover:text-blue-300">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <hr className="my-8 border-gray-300" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white text-sm">
        <div>{t('footer', 'copyright')}</div>
        <div className="flex gap-6 flex-wrap justify-center">
          <Link href={`/${locale}/privacy-policy`} className="underline">{t('footer', 'privacy_policy')}</Link>
          <Link href={`/${locale}/terms-of-service`} className="underline">{t('footer', 'terms_of_service')}</Link>
          <Link href={`/${locale}/cookies-settings`} className="underline">{t('footer', 'cookies_settings')}</Link>
        </div>
      </div>
    </footer>
  );
} 