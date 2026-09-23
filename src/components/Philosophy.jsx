import React from 'react';
import { Compass, Layers, TrendingUp, Zap } from 'lucide-react';
import Reveal from './Reveal';

export default function Philosophy({ t, lang }) {
  const icons = [Compass, Layers, TrendingUp, Zap];

  return (
    <section id="philosophy" className="py-24 sm:py-32 px-6 sm:px-8 border-t border-black/10 bg-[#EFEFEF] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (Consistent 2-Line Editorial Hierarchy) */}
        <Reveal className="mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black">
            {t.philosophy.tag}
          </h2>
          <p className="mt-1 sm:mt-2 text-base sm:text-lg lg:text-xl font-medium tracking-normal text-[#727272] uppercase max-w-4xl">
            {t.philosophy.headline}
          </p>
        </Reveal>

        {/* Two-Column Deep Narrative */}
        <Reveal delay={60} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-10 mb-20 text-[#555550] text-base sm:text-lg leading-relaxed font-normal">
          <p className="border-l-2 border-black/30 pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
            {t.philosophy.body1}
          </p>
          <p>
            {t.philosophy.body2}
          </p>
        </Reveal>

        {/* 4 Pillars Grid in Crisp White Cards */}
        <Reveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.philosophy.pillars.map((pillar, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div 
                key={pillar.num}
                className="group relative p-8 rounded-2xl bg-[#FFFFFF] border border-black/10 hover:border-black/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  {/* Big Accent Number */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-mono font-bold tracking-tighter text-[#A0A098] group-hover:text-black transition-colors duration-500">
                      {pillar.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#888880] group-hover:text-black transition-colors duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold tracking-wider uppercase text-[#111111] mb-3 group-hover:text-black transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#727272] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5 flex items-center gap-2 text-[10px] tracking-widest text-[#8E8E85] uppercase font-mono">
                  <span>CURVE PRINCIPLE</span>
                  <span className="w-1 h-1 rounded-full bg-black/30"></span>
                  <span>EST. 2026</span>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
