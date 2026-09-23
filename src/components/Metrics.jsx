import React from 'react';
import { TrendingUp, Users, Smartphone, Globe2, MousePointerClick } from 'lucide-react';
import Reveal from './Reveal';
import { useCountUp } from '../hooks/useCountUp';

/** Metric that counts up from zero the first time it enters the viewport. */
function CountUpValue({ value }) {
  const { ref, text } = useCountUp(value);
  return (
    <div
      ref={ref}
      className="text-4xl sm:text-5xl font-black tracking-tight text-black mb-2 font-mono tabular-nums"
    >
      {text}
    </div>
  );
}

export default function Metrics({ t, lang }) {
  const metricIcons = [TrendingUp, Globe2, Smartphone, Users, MousePointerClick];

  return (
    <section id="metrics" className="py-24 sm:py-32 px-6 sm:px-8 bg-[#EFEFEF] border-t border-black/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header (Consistent 2-Line Editorial Hierarchy) */}
        <Reveal className="mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black">
            {t.metrics.tag}
          </h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-medium tracking-normal text-[#727272] uppercase max-w-2xl">
            {t.metrics.headline}
          </p>
        </Reveal>

        {/* 5 Impact Metrics Cards */}
        <Reveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {t.metrics.stats.map((stat, idx) => {
            const Icon = metricIcons[idx % metricIcons.length];
            return (
              <div
                key={stat.label}
                className="p-7 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-[#727272] group-hover:text-white group-hover:bg-black transition-colors mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <CountUpValue value={stat.value} />
                  <div className="text-xs font-bold tracking-wider uppercase text-[#111111] mb-1">
                    {stat.label}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-black/5 text-[11px] text-[#727272] leading-normal font-normal">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
