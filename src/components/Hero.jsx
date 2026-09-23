import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

export default function Hero({ t, lang }) {
  return (
    <section id="about" className="relative pt-28 sm:pt-32 pb-16 px-6 sm:px-8 max-w-7xl mx-auto bg-[#EFEFEF]">
      {/* Official "IN MOTION" Brand Banner (from panner-01.svg) */}
      <Reveal delay={80} className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/5 bg-[#EFEFEF] group transition-all duration-700 hover:shadow-black/10 mb-12">
        <div className="relative aspect-[16/8.2] sm:aspect-[16/7.5] w-full flex items-center justify-center overflow-hidden">
          {/* Render the official panner-01.svg banner */}
          <img
            src="/assets/svg/hero_banner_in_motion.svg"
            alt="Curve Agency — IN MOTION"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </Reveal>

      {/* Headline & Brand Manifesto Block */}
      <Reveal delay={140} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Column: Massive Editorial Typography */}
        <div className="lg:col-span-7">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-black">
              {lang === 'ar' ? 'عن كيرف' : 'ABOUT CURVE'}
            </h2>
            <p className="mt-1 sm:mt-1.5 text-sm sm:text-base lg:text-lg font-medium tracking-normal text-[#727272] uppercase">
              {lang === 'ar' ? 'نصنع هويات ترفض الثبات.' : 'WE SHAPE BRANDS THAT REFUSE TO STAND STILL.'}
            </p>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#000000] leading-[0.95]">
            <span className="block">{t.hero.headlineLine1}</span>
            <span className="block text-[#727272]">{t.hero.headlineLine2}</span>
          </h1>
        </div>

        {/* Right Column: Narrative Paragraph & CTAs */}
        <div className="lg:col-span-5 flex flex-col justify-between pt-2">
          <p className="text-base sm:text-lg text-[#505048] leading-relaxed font-normal mb-8">
            {t.hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#222222] transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-black/10"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-black/20 bg-white text-black font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
            >
              <span>{lang === 'ar' ? 'تواصل معنا' : "LET'S TALK"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Reveal>

      {/* Bottom Status Ticker */}
      <div className="mt-14 pt-6 border-t border-black/10 flex items-center justify-between text-xs tracking-[0.2em] text-[#727272] uppercase font-semibold">
        <div className="flex items-center gap-3">
          <span className="text-black font-bold">PHILOSOPHY:</span>
          <span>BENDING • ADAPTING • FLOWING</span>
        </div>
      </div>
    </section>
  );
}
