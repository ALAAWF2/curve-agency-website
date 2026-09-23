import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Ecosystem from './components/Ecosystem';
import SelectedWork from './components/SelectedWork';
import Metrics from './components/Metrics';
import Clients from './components/Clients';
import Process from './components/Process';
import Contact from './components/Contact';
import { translations } from './data/translations';
import IntroCurtain from './components/IntroCurtain';

export default function App() {
  // Default to English as requested (Arabic preserved and ready to toggle back anytime)
  const [lang, setLang] = useState('en');

  // Sync document direction and lang attribute
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  return (
    <div className={`min-h-screen bg-[#EFEFEF] text-[#111111] selection:bg-black selection:text-white ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <IntroCurtain />

      {/* Floating Header */}
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {/* Main Page Content */}
      <main>
        {/* Kinetic Hero */}
        <Hero t={t} lang={lang} />

        {/* Agency Philosophy & 4 Pillars */}
        <Philosophy t={t} lang={lang} />

        {/* The 6 Specialized Studios Ecosystem */}
        <Ecosystem t={t} lang={lang} />

        {/* Filterable Selected Work & Case Studies */}
        <SelectedWork t={t} lang={lang} />

        {/* Measured Impact & Market Stats */}
        <Metrics t={t} lang={lang} />

        {/* National & Global Partners / Marquee */}
        <Clients t={t} lang={lang} />

        {/* Methodology: 4-Step Process */}
        <Process t={t} lang={lang} />
      </main>

      {/* Footer & Consultation Drawer */}
      <Contact t={t} lang={lang} />
    </div>
  );
}
