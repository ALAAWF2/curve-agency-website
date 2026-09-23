import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import SectionIndex, { ReadingBar } from './ReadingProgress';

import { asset } from '../lib/asset';
export default function Header({ lang, setLang, t }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#work", label: t.nav.work },
    { href: "#services", label: t.nav.services },
    { href: "#studio", label: t.nav.studio },
    { href: "#metrics", label: t.nav.metrics },
    { href: "#clients", label: t.nav.clients },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3.5 bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40' 
          : 'py-5 bg-black/90 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a href="#" className="flex items-center group">
          <div className="relative">
            <img 
              src={asset("/assets/svg/curve_logo_white.svg")} 
              alt="Curve Agency" 
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.18em] font-semibold text-[#A0A098]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors duration-300 hover:text-white uppercase group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Action Cluster: live section index + LET'S TALK */}
        <div className="hidden sm:flex items-center gap-4">
          <SectionIndex lang={lang} />
          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-[11px] font-bold tracking-wider uppercase transition-all shadow-md hover:scale-105"
          >
            <span>{lang === 'ar' ? 'تواصل معنا' : "LET'S TALK"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-neutral-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[65px] bg-black/98 backdrop-blur-2xl border-b border-white/15 px-6 py-8 flex flex-col gap-5 text-center shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-bold tracking-widest text-neutral-300 hover:text-white py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-semibold shadow-md uppercase tracking-wider text-xs"
            >
              <span>{lang === 'ar' ? 'تواصل معنا' : "LET'S TALK"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Reading progress rail, glued to the header's bottom edge */}
      <ReadingBar />
    </header>
  );
}
