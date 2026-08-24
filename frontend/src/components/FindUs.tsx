"use client";
import { FaMapMarkerAlt, FaPhone, FaFax, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

interface OfficeLocationProps {
  title: string;
  address: string;
  poBox: string;
  phone: string;
  fax: string;
  email: string;
  align: string;
}

function OfficeLocation({ title, address, poBox, phone, fax, email, align }: OfficeLocationProps) {
  return (
    <div className={`flex flex-col gap-4 text-[#092754] ${align} mb-8`}>
      <h3 className={`text-2xl md:text-3xl font-bold mb-4 text-center md:${align} text-[#092754]`}>{title}</h3>
      <div className="flex items-start gap-2 text-lg md:text-xl mb-2">
        <FaMapMarkerAlt className="mt-1" />
        <span>{address}</span>
      </div>
      <div className="flex items-start gap-2 text-lg md:text-xl mb-2">
        <FaMapMarkerAlt className="mt-1" />
        <span>{poBox}</span>
      </div>
      <div className="flex items-start gap-2 text-lg md:text-xl mb-2">
        <FaPhone className="mt-1" />
        <span>{phone}</span>
      </div>
      <div className="flex items-start gap-2 text-lg md:text-xl mb-2">
        <FaFax className="mt-1" />
        <span>{fax}</span>
      </div>
      <div className="flex items-start gap-2 text-lg md:text-xl">
        <FaEnvelope className="mt-1" />
        <span>{email}</span>
      </div>
    </div>
  );
}

export default function FindUs() {
  const { t, locale } = useLanguage();
  const isRTL = locale === 'ar';
  const align = isRTL ? 'text-right' : 'text-left';
  const [activeLocation, setActiveLocation] = useState(0);
  
  const locations = [
    {
      id: 'cairo',
      title: t('findus', 'cairo_title'),
      // Real office location (Plus Code) — Dr El-Sheemy, At Taseah, Nasr City, Cairo
      coordinates: '393F+4VG Nasr City, Cairo Governorate, Egypt',
      address: t('findus', 'cairo_address'),
      poBox: t('findus', 'cairo_po_box'),
      phone: t('findus', 'cairo_phone'),
      fax: t('findus', 'cairo_fax'),
      email: t('findus', 'cairo_email'),
    }
  ];

  const switchLocation = (index: number) => {
    setActiveLocation(index);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Pills — only shown when there is more than one office */}
        {locations.length > 1 && (
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-full p-2 space-x-2">
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  onClick={() => switchLocation(index)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeLocation === index
                      ? 'bg-white text-[#092754] shadow-lg transform scale-105'
                      : 'text-[#092754] hover:bg-white/20'
                  }`}
                >
                  {location.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Sticky Map Container */}
          <div className="lg:sticky lg:top-24">
            <h2 className={`text-3xl md:text-4xl font-bold text-[#092754] mb-8 text-center md:${align}`}>
              {t('findus', 'map_title')}
            </h2>
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                key={activeLocation}
                src={`https://www.google.com/maps?q=${encodeURIComponent(locations[activeLocation].coordinates)}&z=16&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Almanabr ${locations[activeLocation].title} Location`}
              ></iframe>
            </div>
          </div>
          
          {/* Contact info section */}
          <div className="space-y-16">
            <div className={`text-center lg:${align}`}>
              <h2 className={`text-3xl md:text-4xl font-bold text-[#092754] mb-4`}>
                {t('findus', 'contact_title')}
              </h2>
              <p className={`text-xl font-medium text-[#092754]/80`}>
                {t('findus', 'contact_subtitle')}
              </p>
            </div>
            
            <div>
              <OfficeLocation
                title={locations[activeLocation].title}
                address={locations[activeLocation].address}
                poBox={locations[activeLocation].poBox}
                phone={locations[activeLocation].phone}
                fax={locations[activeLocation].fax}
                email={locations[activeLocation].email}
                align={align}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 