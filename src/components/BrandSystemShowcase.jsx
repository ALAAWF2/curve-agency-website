import React, { useState } from 'react';
import { Grid, Maximize2, Sparkles, Layers } from 'lucide-react';

import { asset } from '../lib/asset';
export default function BrandSystemShowcase({ t, lang }) {
  const [activeElement, setActiveElement] = useState(1);

  const patterns = [
    { id: 1, name: "Wave Curve Arc", file: asset("/assets/svg/PATTERN & ELEMENTS-0١.svg") },
    { id: 2, name: "Inverted Tangent", file: asset("/assets/svg/PATTERN & ELEMENTS-0٢.svg") },
    { id: 3, name: "Geometric Block", file: asset("/assets/svg/PATTERN & ELEMENTS-0٣.svg") },
    { id: 4, name: "Structural Grid", file: asset("/assets/svg/PATTERN & ELEMENTS-0٤.svg") },
    { id: 5, name: "Circular Quadrant", file: asset("/assets/svg/PATTERN & ELEMENTS-0٥.svg") },
    { id: 6, name: "Dynamic Petal", file: asset("/assets/svg/PATTERN & ELEMENTS-0٦.svg") },
  ];

  return (
    <section id="system" className="py-24 sm:py-32 px-6 sm:px-8 border-t border-black/10 bg-[#EFEFEF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 bg-black"></span>
              <span className="text-xs tracking-[0.25em] font-semibold text-[#727272] uppercase">
                {t.brandSystem.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111111]">
              {t.brandSystem.headline}
            </h2>
          </div>
          <p className="text-[#727272] text-sm sm:text-base max-w-md font-normal">
            {t.brandSystem.desc}
          </p>
        </div>

        {/* Dynamic Interactive Identity Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Showcase: Construction & The Dynamic 'R' Mark */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white border border-black/10 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="px-3 py-1 rounded-full bg-black/5 text-[10px] tracking-widest text-[#444444] uppercase font-mono">
                  SYMBOL: THE DYNAMIC (R) ANCHOR
                </span>
                <span className="text-xs text-[#727272] font-mono">UNIT (X) GRID</span>
              </div>

              {/* Centered Large SVG Icon Mark */}
              <div className="py-12 flex items-center justify-center">
                <img
                  src={asset("/assets/svg/curve_icon_black.svg")}
                  alt="Curve Icon Mark"
                  className="w-48 sm:w-64 h-auto object-contain opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#727272]">
              <div>
                <span className="text-black font-bold">Concept:</span> Fluid Curvature Reflecting Flexibility & Momentum
              </div>
              <div className="font-mono text-[10px] text-[#727272]">
                RATIO: 1X : 1X • TANGENT: 45° / 90°
              </div>
            </div>
          </div>

          {/* Side Showcase: Brand Billboard Mockup ("We move DIFFERENTLY") */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden bg-white border border-black/10 shadow-sm relative group">
            <img
              src={asset("/assets/images/page_24.png")}
              alt="Curve Agency Billboard — We move DIFFERENTLY"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="text-[10px] font-mono tracking-widest text-[#E0E0E0] uppercase mb-1">
                OUTDOOR APPLICATION
              </div>
              <div className="text-lg font-bold uppercase text-white tracking-wide">
                "WE MOVE DIFFERENTLY"
              </div>
            </div>
          </div>
        </div>

        {/* 4 Identity Features & Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.brandSystem.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-black/10 hover:border-black/30 hover:shadow-lg hover:shadow-black/5 transition-all"
            >
              <div className="text-xs font-mono text-[#727272] mb-4">
                SYSTEM 0{idx + 1}
              </div>
              <h4 className="text-base font-bold text-[#111111] uppercase mb-2">
                {feat.title}
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed font-normal">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Pattern & Elements Carousel / Strip */}
        <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold tracking-widest text-[#111111] uppercase">
              MODULAR PATTERNS & ELEMENTS
            </span>
            <span className="text-xs text-[#727272] font-mono">
              DERIVED FROM CURVE SEGMENTS
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {patterns.map((p) => (
              <div
                key={p.id}
                onClick={() => setActiveElement(p.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center min-h-[110px] ${
                  activeElement === p.id
                    ? 'bg-black border-black text-white scale-105 shadow-md'
                    : 'bg-[#F9F9F9] border-black/10 text-[#727272] hover:border-black/30 hover:text-black'
                }`}
              >
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img
                    src={p.file}
                    alt={p.name}
                    className={`w-full h-full object-contain ${activeElement === p.id ? 'filter invert' : 'opacity-80'}`}
                  />
                </div>
                <span className="text-[10px] font-mono text-center truncate w-full">
                  0{p.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
