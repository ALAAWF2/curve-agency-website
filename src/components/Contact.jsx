import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';

import { asset } from '../lib/asset';
export default function Contact({ t, lang }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: t.contact.serviceOptions[0],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate brief sending transition
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const whatsappUrl = `https://wa.me/966564029787?text=${encodeURIComponent(
    lang === 'ar' 
      ? 'مرحباً وكالة كيرف، أود الاستفسار عن مشروع جديد.'
      : 'Hello Curve Agency, I would like to initiate a new project inquiry.'
  )}`;

  return (
    <footer id="contact" className="pt-24 sm:pt-32 pb-16 px-6 sm:px-8 border-t border-black/10 bg-[#E8E8E8] relative">
      <div className="max-w-7xl mx-auto">
        {/* Main Section Header (Consistent 2-Line Editorial Hierarchy) */}
        <Reveal className="mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black">
            {t.contact.tag}
          </h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-medium tracking-normal text-[#727272] uppercase max-w-2xl">
            {t.contact.headline}
          </p>
        </Reveal>

        {/* Two-Column Grid: Form & Studio Direct Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-black/10">
          {/* Inquiry Form Column */}
          <Reveal delay={80} className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-black/10 shadow-xl">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold uppercase text-[#111111]">
                  {lang === 'ar' ? 'تم استلام طلبك بنجاح' : 'Inquiry Received'}
                </h3>
                <p className="text-sm text-[#555555] max-w-md mx-auto">
                  {t.contact.successMsg}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full border border-black/20 text-xs font-semibold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
                >
                  {lang === 'ar' ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-[#555550] uppercase mb-2">
                      {t.contact.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-black/15 text-black placeholder-[#999999] text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-[#555550] uppercase mb-2">
                      {t.contact.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-black/15 text-black placeholder-[#999999] text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-[#555550] uppercase mb-2">
                    {t.contact.serviceLabel}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-black/15 text-black text-sm focus:outline-none focus:border-black transition-colors"
                  >
                    {t.contact.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-[#555550] uppercase mb-2">
                    {t.contact.messageLabel} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-black/15 text-black placeholder-[#999999] text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-black text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-neutral-800 transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-xl shadow-black/10"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? t.contact.sendingBtn : t.contact.sendBtn}</span>
                </button>
              </form>
            )}
          </Reveal>

          {/* Studio Contact & Location Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div className="space-y-6">
              {/* WhatsApp Direct Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 hover:border-emerald-500 hover:bg-emerald-100/60 transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wider text-emerald-800 uppercase">
                      WHATSAPP BUSINESS
                    </div>
                    <div className="text-base font-bold text-emerald-950">
                      {t.contact.whatsappDirect}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-700 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              {/* Direct Details Card */}
              <div className="p-8 rounded-2xl bg-white border border-black/10 space-y-6 shadow-sm">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-[#727272] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#727272] uppercase">
                      STUDIO LOCATION
                    </div>
                    <div className="text-sm font-semibold text-black mt-1">
                      {t.contact.studioLocation}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-[#727272] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#727272] uppercase">
                      DIRECT LINE
                    </div>
                    <a
                      href="tel:+966564029787"
                      className="text-sm font-semibold text-black mt-1 block hover:underline"
                    >
                      {t.contact.studioPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-[#727272] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#727272] uppercase">
                      OFFICIAL EMAIL
                    </div>
                    <a
                      href="mailto:info@curveagency.sa"
                      className="text-sm font-semibold text-black mt-1 block hover:underline"
                    >
                      {t.contact.studioEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Stamp */}
            <div className="p-6 rounded-2xl border border-dashed border-black/15 bg-black/[0.02]">
              <p className="text-xs text-[#555550] leading-relaxed italic">
                {lang === 'ar'
                  ? '«لأن المسار الذكي كالانحناء، ليس دائمًا الأقصر.. بل الأكثر قدرة على التكيف والتأثير.»'
                  : '"Because just like a curve, the smartest path forward isn\'t always the shortest one — it\'s the one that adjusts, responds, and keeps moving."'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer: Logo & Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={asset("/assets/svg/curve_logo_black.svg")}
              alt="Curve Agency"
              className="h-6 w-auto object-contain"
            />
          </div>

          <div className="text-xs text-[#727272] font-mono tracking-wider text-center">
            {t.contact.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
