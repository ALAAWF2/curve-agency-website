import React, { useRef } from 'react';
import { partnerLogos } from '../data/projectsData';
import Reveal from './Reveal';
import { useMarqueeKinetics } from '../hooks/useMarqueeKinetics';

export default function Clients({ t, lang }) {
  const disciplines = [
    "BRANDING", "CAMPAIGNS", "FILM PRODUCTION", "PHOTOGRAPHY", "DIGITAL STRATEGY",
    "SOUND DESIGN", "REELS & MOTION", "INFLUENCER NETWORK", "PERFORMANCE MEDIA", "EXPERIENCE"
  ];

  const arabicDisciplines = [
    "الهوية البصرية", "الحملات الإعلانية", "الإنتاج السينمائي", "التصوير الفوتوغرافي", "الاستراتيجية الرقمية",
    "الهندسة الصوتية", "الريلز والموشن", "شبكة المؤثرين", "إعلانات الأداء", "التجارب والفعاليات"
  ];

  const activeDisciplines = lang === 'ar' ? arabicDisciplines : disciplines;

  // Kinetic ribbons: speed follows the reader's scroll, drag (mouse or thumb) to scrub.
  const rowOneRef = useRef(null);
  const rowTwoRef = useRef(null);
  useMarqueeKinetics(rowOneRef);
  useMarqueeKinetics(rowTwoRef, { reverse: true });

  return (
    <section id="clients" className="py-24 sm:py-32 border-t border-black/10 bg-[#EFEFEF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        {/* Section Header (Consistent 2-Line Editorial Hierarchy) */}
        <Reveal>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black">
            {t.clients.tag}
          </h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-medium tracking-normal text-[#727272] uppercase max-w-2xl">
            {t.clients.headline}
          </p>
        </Reveal>
      </div>

      {/* Marquee Row 1: Partner Brands & Government Entities */}
      <div className="relative py-4 border-y border-black/10 bg-[#E5E5E5]">
        <div ref={rowOneRef} className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...partnerLogos, ...partnerLogos].map((partner, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-black/10 hover:border-black/30 transition-all hover:bg-neutral-50 cursor-default group shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-black/40 group-hover:bg-black transition-colors" />
              <span className="text-sm sm:text-base font-bold tracking-wider text-[#111111] group-hover:text-black uppercase transition-colors">
                {lang === 'ar' ? partner.name : partner.enName}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/5 text-[#727272] uppercase tracking-widest font-mono">
                {partner.tier}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2: Creative Disciplines Stream */}
      <div className="relative py-4 border-b border-black/10 bg-[#EFEFEF]">
        <div ref={rowTwoRef} className="animate-marquee flex items-center gap-8 whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
          {[...activeDisciplines, ...activeDisciplines, ...activeDisciplines].map((disc, index) => (
            <div key={index} className="inline-flex items-center gap-4 text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#727272] uppercase hover:text-black transition-colors cursor-default">
              <span>{disc}</span>
              <span className="text-black/30">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Featured Partner Tiers */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16">
        <Reveal stagger className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {partnerLogos.map((partner, idx) => (
            <div
              key={idx}
              className="h-28 sm:h-32 p-5 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all duration-300 flex items-center justify-center group shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.enName || partner.name}
                  className="max-h-12 sm:max-h-14 max-w-[140px] w-auto h-auto object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  loading="lazy"
                />
              ) : (
                <span className="text-xs sm:text-sm font-bold text-[#222220] uppercase tracking-wide text-center">
                  {partner.enName}
                </span>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
