import React from 'react';
import { Search, Compass, Palette, Rocket } from 'lucide-react';
import Reveal from './Reveal';

export default function Process({ t, lang }) {
  const stepIcons = [Search, Compass, Palette, Rocket];

  return (
    <section id="process" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto border-t border-black/10">
      {/* Section Header (Consistent 2-Line Editorial Hierarchy) */}
      <Reveal className="mb-16">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black">
          {t.process.tag}
        </h2>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-medium tracking-normal text-[#727272] uppercase max-w-2xl">
          {t.process.headline}
        </p>
      </Reveal>

      {/* 4 Process Steps in Horizontal Grid with Connectors */}
      <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {t.process.steps.map((step, idx) => {
          const Icon = stepIcons[idx];
          return (
            <div
              key={step.num}
              className="relative p-8 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 flex flex-col justify-between min-h-[280px] group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-mono font-bold text-black/25 group-hover:text-black transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-[#111111] mb-3 uppercase group-hover:text-black transition-colors">
                  {step.name}
                </h3>

                <p className="text-sm text-[#555555] leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-black/5 flex items-center gap-2 text-[10px] tracking-widest text-[#727272] font-mono uppercase">
                <span>STAGE 0{idx + 1} OF 04</span>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
