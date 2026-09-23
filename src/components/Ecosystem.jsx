import React from 'react';
import { Palette, Film, BarChart3, Video, Share2, Users, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

export default function Ecosystem({ t, lang }) {
  const studioIcons = {
    branding: Palette,
    production: Film,
    marketing: BarChart3,
    content: Video,
    social: Share2,
    influencers: Users,
  };

  return (
    <section id="services" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto border-t border-black/10">
      {/* Section Header (Consistent 2-Line Editorial Hierarchy) */}
      <Reveal className="mb-16">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black">
          {t.ecosystem.tag}
        </h2>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-medium tracking-normal text-[#727272] uppercase max-w-2xl">
          {t.ecosystem.headline}
        </p>
      </Reveal>

      {/* 6 Studios Grid */}
      <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.ecosystem.studios.map((studio, idx) => {
          const Icon = studioIcons[studio.id] || Palette;
          return (
            <div
              key={studio.id}
              className="group p-8 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon & Index */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
                  <div className="w-12 h-12 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-[#727272] group-hover:text-black transition-colors">
                    STUDIO 0{idx + 1}
                  </span>
                </div>

                {/* Studio Title */}
                <h3 className="text-xl font-bold tracking-tight text-[#111111] mb-2 group-hover:text-black transition-colors uppercase">
                  {lang === 'ar' ? studio.title : studio.title}
                </h3>
                {/* Secondary title (hidden for now as requested, preserved for future re-enable) */}
                {false && lang !== 'ar' && studio.arabicTitle && (
                  <p className="text-xs font-semibold text-[#727272] mb-4">
                    {studio.arabicTitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-[#555555] leading-relaxed mb-8 font-normal">
                  {studio.desc}
                </p>
              </div>

              {/* Tags / Deliverables */}
              <div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5">
                  {studio.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-[#F2F2F2] border border-black/5 text-[11px] font-medium text-[#444444] tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
